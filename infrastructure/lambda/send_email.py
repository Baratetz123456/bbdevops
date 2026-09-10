"""
AWS Lambda Function: BBDevOps Contact Form Email Dispatcher
Runtime: Python 3.12 / 3.11
Service: Amazon Simple Email Service (SES)
"""

import json
import os
import re
import html
import datetime
import boto3
from botocore.exceptions import ClientError

# Configuration via Environment Variables
RECIPIENT_EMAIL = os.environ.get("RECIPIENT_EMAIL", "baratetajayson.work@gmail.com")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "baratetajayson.work@gmail.com")
SES_REGION = os.environ.get("SES_REGION") or os.environ.get("AWS_REGION", "ap-southeast-1")

ses_client = boto3.client("ses", region_name=SES_REGION)

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

    # Anti-Spam Honeypot Check (Silently drop bots without spending SES quota)
    if data.get("_gotcha"):
        return build_response(200, {"message": "Message sent successfully"})

    # Extract and sanitize fields
    name = html.escape(str(data.get("name", "")).strip())
    email = str(data.get("email", "")).strip()
    message = html.escape(str(data.get("message", "")).strip())

    # Security & Payload Constraints
    if not name or len(name) < 2 or len(name) > 100:
        return build_response(400, {"error": "Name must be between 2 and 100 characters."})

    if not email or not is_valid_email(email) or len(email) > 254:
        return build_response(400, {"error": "A valid email address is required."})

    if not message or len(message) < 5 or len(message) > 3000:
        return build_response(400, {"error": "Message must be between 5 and 3,000 characters."})

    timestamp_utc = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    subject = f"[BBDevOps] New Inquiry from {name}"

    text_body = f"""======================================================
NEW PORTFOLIO INQUIRY - BBDevOps
======================================================
From: {name}
Email: {email}
Timestamp: {timestamp_utc}

------------------------------------------------------
MESSAGE:
------------------------------------------------------
{message}

------------------------------------------------------
Direct Reply: mailto:{email}?subject=Re:%20Portfolio%20Inquiry%20-%20BBDevOps
Security: Honeypot passed (clean human) • HTML sanitized
Route: API Gateway (HTTP v2) -> AWS Lambda (Python 3.12) -> Amazon SES
======================================================
"""

    html_body = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Inquiry</title>
</head>
<body style="margin:0; padding:24px 12px; background-color:#F5EFEB; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#2D2825;">
  <div style="max-width:600px; margin:0 auto; background:#FFFFFF; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(74, 55, 40, 0.08); border:1px solid #EBDDCD;">
    
    <!-- Terracotta Brand Header -->
    <div style="background:linear-gradient(135deg, #E07A5F 0%, #D4A373 100%); padding:28px 24px; text-align:left;">
      <span style="display:inline-block; font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#FFFFFF; background:rgba(0,0,0,0.18); padding:4px 10px; border-radius:999px; margin-bottom:12px;">
        BBDevOps • Portfolio Inquiry
      </span>
      <h1 style="margin:0; color:#FFFFFF; font-size:22px; font-weight:700; line-height:1.3;">
        New Client Message Received
      </h1>
      <p style="margin:6px 0 0; color:rgba(255,255,255,0.92); font-size:13px;">
        Submitted via bbdevops.dev contact form
      </p>
    </div>

    <!-- Content -->
    <div style="padding:28px 24px;">

      <!-- Sender Info Card -->
      <table style="width:100%; border-collapse:collapse; background:#FAF3EA; border:1px solid #EBDDCD; border-radius:12px; margin-bottom:24px;">
        <tr>
          <td style="padding:16px 20px;">
            <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#9E7154; margin-bottom:4px;">
              Sender Details
            </div>
            <div style="font-size:16px; font-weight:700; color:#2D2825; margin-bottom:4px;">
              {name}
            </div>
            <div style="font-size:14px; color:#E07A5F;">
              <a href="mailto:{email}" style="color:#E07A5F; text-decoration:none; font-weight:500;">
                {email}
              </a>
            </div>
          </td>
          <td style="padding:16px 20px; text-align:right; vertical-align:middle;">
            <a href="mailto:{email}?subject=Re:%20Portfolio%20Inquiry%20-%20BBDevOps" 
               style="display:inline-block; background:#E07A5F; color:#FFFFFF; text-decoration:none; font-size:13px; font-weight:600; padding:10px 18px; border-radius:8px;">
              Reply
            </a>
          </td>
        </tr>
      </table>

      <!-- Message Section -->
      <div style="margin-bottom:24px;">
        <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#9E7154; margin-bottom:8px;">
          Project Details / Message
        </div>
        <div style="background:#FFFFFF; border-left:4px solid #E07A5F; border-top:1px solid #EBDDCD; border-right:1px solid #EBDDCD; border-bottom:1px solid #EBDDCD; border-radius:0 10px 10px 0; padding:18px 20px; font-size:14px; line-height:1.65; color:#3D3530; white-space:pre-wrap; word-break:break-word;">
{message}
        </div>
      </div>

    </div>

    <!-- Technical Audit & Diagnostics Footer -->
    <div style="background:#FAF3EA; border-top:1px solid #EBDDCD; padding:16px 24px; font-size:11px; color:#8C7769; line-height:1.6;">
      <strong>Security Audit:</strong> Honeypot passed (clean human) • HTML sanitized<br>
      <strong>Route:</strong> API Gateway (HTTP v2) → AWS Lambda (Python 3.12) → Amazon SES<br>
      <strong>Timestamp:</strong> {timestamp_utc}
    </div>

  </div>
</body>
</html>
"""

    # Send via Amazon SES
    try:
        sender_formatted = f"BBDevOps Portfolio <{SENDER_EMAIL}>"
        response = ses_client.send_email(
            Source=sender_formatted,
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
            hint = f"Make sure '{RECIPIENT_EMAIL}' is verified in the AWS SES Console in region '{SES_REGION}'."
            return build_response(500, {"error": "SES Identity Error", "details": error_msg, "hint": hint})

        return build_response(500, {"error": "Failed to send email via SES", "code": error_code, "details": error_msg})

    except Exception as e:
        return build_response(500, {"error": "Internal Server Error", "details": str(e)})
