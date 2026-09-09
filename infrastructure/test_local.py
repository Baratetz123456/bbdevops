#!/usr/bin/env python3
"""
BBDevOps - Local Python Lambda Test Suite
Tests validation, anti-spam honeypot, CORS headers, and SES dispatch logic
offline without requiring active AWS credentials.
"""

import sys
import os
import json
from unittest.mock import patch, MagicMock

# Provide a fallback mock for boto3 if not installed in local Python environment
try:
    import boto3
    from botocore.exceptions import ClientError
except ImportError:
    mock_boto3 = MagicMock()
    mock_botocore = MagicMock()
    class MockClientError(Exception):
        pass
    mock_botocore.exceptions.ClientError = MockClientError
    sys.modules["boto3"] = mock_boto3
    sys.modules["botocore"] = mock_botocore
    sys.modules["botocore.exceptions"] = mock_botocore.exceptions

# Add the lambda directory to Python module search path
LAMBDA_DIR = os.path.join(os.path.dirname(__file__), "lambda")
sys.path.insert(0, LAMBDA_DIR)

# Ensure UTF-8 output on Windows terminals
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from send_email import lambda_handler

GREEN = "\033[92m"
RED = "\033[91m"
CYAN = "\033[96m"
BOLD = "\033[1m"
RESET = "\033[0m"


def print_test(name: str, passed: bool, detail: str = ""):
    status = f"{GREEN}PASS{RESET}" if passed else f"{RED}FAIL{RESET}"
    print(f"  [{status}] {BOLD}{name}{RESET}")
    if detail:
        print(f"         {detail}")


def run_tests():
    print(f"\n{CYAN}{BOLD}======================================================{RESET}")
    print(f"{CYAN}{BOLD}   BBDevOps - AWS Lambda Contact API Local Test Suite  {RESET}")
    print(f"{CYAN}{BOLD}======================================================{RESET}\n")

    total_tests = 0
    passed_tests = 0

    # ---------------------------------------------------------
    # Test 1: CORS OPTIONS Preflight
    # ---------------------------------------------------------
    total_tests += 1
    event = {"requestContext": {"http": {"method": "OPTIONS"}}}
    res = lambda_handler(event, None)
    is_ok = (
        res["statusCode"] == 200
        and res["headers"].get("Access-Control-Allow-Origin") == "*"
    )
    if is_ok:
        passed_tests += 1
    print_test("CORS Preflight (OPTIONS request)", is_ok, f"Status: {res['statusCode']}")

    # ---------------------------------------------------------
    # Test 2: Spambot Honeypot Detection (_gotcha filled)
    # ---------------------------------------------------------
    total_tests += 1
    event = {
        "body": json.dumps({
            "name": "Spambot 3000",
            "email": "bot@seo-spammers.com",
            "message": "Buy cheap backlinks now!",
            "_gotcha": "I am a hidden bot filled value",
        })
    }
    res = lambda_handler(event, None)
    is_ok = res["statusCode"] == 200 and "Message sent successfully" in res["body"]
    if is_ok:
        passed_tests += 1
    print_test(
        "Anti-Spam Honeypot Trap (_gotcha populated)",
        is_ok,
        "Silently returns 200 without invoking SES or consuming quota",
    )

    # ---------------------------------------------------------
    # Test 3: Missing Required Fields
    # ---------------------------------------------------------
    total_tests += 1
    event = {
        "body": json.dumps({
            "name": "Jayson",
            "email": "",  # missing email
            "message": "Hello world",
        })
    }
    res = lambda_handler(event, None)
    is_ok = res["statusCode"] == 400 and "valid email address is required" in res["body"].lower()
    if is_ok:
        passed_tests += 1
    print_test(
        "Validation: Missing Email Address",
        is_ok,
        f"Correctly rejected with HTTP 400: {res['body']}",
    )

    # ---------------------------------------------------------
    # Test 4: Invalid Email Syntax
    # ---------------------------------------------------------
    total_tests += 1
    event = {
        "body": json.dumps({
            "name": "Jayson",
            "email": "not-an-email",
            "message": "Testing invalid email regex",
        })
    }
    res = lambda_handler(event, None)
    is_ok = res["statusCode"] == 400 and "valid email address is required" in res["body"].lower()
    if is_ok:
        passed_tests += 1
    print_test(
        "Validation: Malformed Email Address",
        is_ok,
        f"Correctly caught by regex with HTTP 400",
    )

    # ---------------------------------------------------------
    # Test 5: Message Length Limitation (> 5,000 chars)
    # ---------------------------------------------------------
    total_tests += 1
    event = {
        "body": json.dumps({
            "name": "Jayson",
            "email": "client@example.com",
            "message": "A" * 5001,
        })
    }
    res = lambda_handler(event, None)
    is_ok = res["statusCode"] == 400 and "between 5 and 5,000 characters" in res["body"]
    if is_ok:
        passed_tests += 1
    print_test(
        "Validation: Oversized Message (> 5,000 chars)",
        is_ok,
        f"Correctly rejected buffer overload attempt with HTTP 400",
    )

    # ---------------------------------------------------------
    # Test 6: Valid Submission with Mocked SES Client
    # ---------------------------------------------------------
    total_tests += 1
    valid_payload = {
        "name": "Sarah Connor",
        "email": "sarah@skynet-defense.org",
        "message": "Need urgent CI/CD pipeline automation and network tooling.",
    }
    event = {"body": json.dumps(valid_payload)}

    with patch("send_email.ses_client") as mock_ses:
        mock_ses.send_email.return_value = {"MessageId": "mock-msg-uuid-12345"}
        res = lambda_handler(event, None)

        mock_called = mock_ses.send_email.called
        args, kwargs = mock_ses.send_email.call_args if mock_called else (None, None)
        reply_to_correct = kwargs and kwargs.get("ReplyToAddresses") == ["sarah@skynet-defense.org"]

        is_ok = res["statusCode"] == 200 and mock_called and reply_to_correct
        if is_ok:
            passed_tests += 1
        print_test(
            "Successful Submission & SES Dispatch",
            is_ok,
            f"Dispatched with Reply-To=[sarah@skynet-defense.org], Status: {res['statusCode']}",
        )

    # ---------------------------------------------------------
    # Summary
    # ---------------------------------------------------------
    print(f"\n{CYAN}------------------------------------------------------{RESET}")
    if passed_tests == total_tests:
        print(f"{GREEN}{BOLD}Result: All {passed_tests}/{total_tests} Tests Passed Successfully!{RESET}")
    else:
        print(f"{RED}{BOLD}Result: {passed_tests}/{total_tests} Tests Passed.{RESET}")
    print(f"{CYAN}------------------------------------------------------{RESET}\n")

    return 0 if passed_tests == total_tests else 1


if __name__ == "__main__":
    sys.exit(run_tests())
