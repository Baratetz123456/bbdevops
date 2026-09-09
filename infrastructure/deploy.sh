#!/usr/bin/env bash
set -e

STACK_NAME="bbdevops-contact-api"
REGION="ap-southeast-1"
RECIPIENT_EMAIL="baratetajayson.work@gmail.com"

echo "=========================================================="
echo " Deploying BBDevOps Serverless Contact API to AWS"
echo " Stack Name: $STACK_NAME"
echo " AWS Region: $REGION"
echo " Recipient:  $RECIPIENT_EMAIL"
echo "=========================================================="

aws cloudformation deploy \
    --template-file infrastructure/contact-service.yaml \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides \
        RecipientEmail="$RECIPIENT_EMAIL" \
        SenderEmail="$RECIPIENT_EMAIL"

ENDPOINT=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query "Stacks[0].Outputs[?OutputKey=='ContactApiUrl'].OutputValue" \
    --output text)

echo ""
echo "=========================================================="
echo " Contact API Endpoint URL:"
echo " $ENDPOINT"
echo "=========================================================="
echo ""
echo "Set this in your .env or GitHub Secrets:"
echo "VITE_CONTACT_API_URL=$ENDPOINT"
