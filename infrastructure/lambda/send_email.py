"""
AWS Lambda Function: BBDevOps Contact Form Email Dispatcher
Runtime: Python 3.12 / 3.11
Service: Amazon Simple Email Service (SES)
"""

import json
import os
import re
import html
import boto3
from botocore.exceptions import ClientError

# Configuration via Environment Variables
RECIPIENT_EMAIL = os.environ.get("RECIPIENT_EMAIL", "baratetajayson.work@gmail.com")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "baratetajayson.work@gmail.com")
AWS_REGION = os.environ.get("AWS_REGION", "ap-southeast-1")

ses_client = boto3.client("ses", region_name=AWS_REGION)

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Requested-With",
    "Content-Type": "application/json",
}


def build_response(status_code: int, body: dict) -> dict:
    return {
        "statusCode": status_code,
        "headers": CORS_HEADERS,
        "body": json.dumps(body),
    }


def is_valid_email(email: str) -> bool:
    regex = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    return bool(re.match(regex, email))


def lambda_handler(event, context):
    # Handle CORS Preflight OPTIONS request
    http_method = event.get("requestContext", {}).get("http", {}).get("method", "")
    if http_method == "OPTIONS":
        return build_response(200, {"message": "CORS preflight OK"})

    # Parse JSON Body
    try:
        body_raw = event.get("body", "{}")
        if event.get("isBase64Encoded", False):
            import base64
            body_raw = base64.b64decode(body_raw).decode("utf-8")
        data = json.loads(body_raw) if isinstance(body_raw, str) else body_raw
    except Exception as e:
        return build_response(400, {"error": "Invalid JSON payload", "details": str(e)})

    # Anti-Spam Honeypot Check
    # If the hidden '_gotcha' field is populated, a bot filled it.
    if data.get("_gotcha"):
        # Silently return success to waste bot operator time
        return build_response(200, {"message": "Message sent successfully"})

    # Extract and sanitize fields
    name = html.escape(str(data.get("name", "")).strip())
    email = str(data.get("email", "")).strip()
    message = html.escape(str(data.get("message", "")).strip())

    # Validation
    if not name or len(name) < 2 or len(name) > 100:
        return build_response(400, {"error": "A valid name is required (2-100 characters)."})

    if not email or not is_valid_email(email):
        return build_response(400, {"error": "A valid email address is required."})

    if not message or len(message) < 5 or len(message) > 5000:
        return build_response(400, {"error": "Message must be between 5 and 5,000 characters long."})

    # Build Email Content
    subject = f"🚀 New Contact Form Inquiry from {name} (BBDevOps)"

    text_body = f"""New Contact Form Submission:
----------------------------------
From: {name}
Email: {email}

Message:
{message}
----------------------------------
Sent from bbdevops.dev portfolio
"""

    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF3EA; margin: 0; padding: 20px; }}
            .card {{ background-color: #ffffff; border-radius: 16px; padding: 28px; max-width: 600px; margin: 0 auto; border: 1px solid #EBDDCD; box-shadow: 0 4px 20px rgba(62, 44, 35, 0.08); }}
            .header {{ border-bottom: 2px solid #E07A5F; padding-bottom: 16px; margin-bottom: 20px; }}
            .badge {{ display: inline-block; background-color: rgba(224, 122, 95, 0.15); color: #E07A5F; font-weight: 700; font-size: 11px; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 8px; }}
            h2 {{ color: #3E2C23; margin: 0 0 4px 0; font-size: 20px; }}
            .meta-item {{ margin: 8px 0; font-size: 14px; color: #7D6355; }}
            .meta-item strong {{ color: #3E2C23; }}
            .message-box {{ background-color: #FBF6EF; border-left: 4px solid #E07A5F; padding: 16px; border-radius: 8px; margin-top: 16px; font-size: 14px; line-height: 1.6; color: #3E2C23; white-space: pre-wrap; }}
            .footer {{ margin-top: 24px; font-size: 12px; color: #A89083; text-align: center; }}
        </style>
    </head>
    <body>
        <div class="card">
            <div class="header">
                <span class="badge">Portfolio Inquiry</span>
                <h2>New Message from {name}</h2>
                <div class="meta-item"><strong>Sender Email:</strong> <a href="mailto:{email}">{email}</a></div>
            </div>
            <div>
                <strong>Message:</strong>
                <div class="message-box">{message}</div>
            </div>
            <div class="footer">
                Delivered via AWS Serverless Contact API • BBDevOps Portfolio
            </div>
        </div>
    </body>
    </html>
    """

    # Send via Amazon SES
    try:
        response = ses_client.send_email(
            Source=SENDER_EMAIL,
            Destination={"ToAddresses": [RECIPIENT_EMAIL]},
            Message={
                "Subject": {"Data": subject, "Charset": "UTF-8"},
                "Body": {
                    "Text": {"Data": text_body, "Charset": "UTF-8"},
                    "Html": {"Data": html_body, "Charset": "UTF-8"},
                },
            },
            ReplyToAddresses=[email],
        )

        message_id = response.get("MessageId", "unknown")
        return build_response(
            200,
            {
                "success": True,
                "message": "Thank you! Your message has been delivered directly to Jayson.",
                "messageId": message_id,
            },
        )

    except ClientError as e:
        error_code = e.response.get("Error", {}).get("Code", "Unknown")
        error_msg = e.response.get("Error", {}).get("Message", str(e))

        # Helpful diagnosis for SES Sandbox restriction
        if "MessageRejected" in error_code or "not verified" in error_msg.lower():
            hint = f"Make sure '{RECIPIENT_EMAIL}' is verified in the AWS SES Console in region '{AWS_REGION}'."
            return build_response(500, {"error": "SES Identity Error", "details": error_msg, "hint": hint})

        return build_response(500, {"error": "Failed to send email via SES", "code": error_code, "details": error_msg})

    except Exception as e:
        return build_response(500, {"error": "Internal Server Error", "details": str(e)})
