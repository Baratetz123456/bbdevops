# PowerShell Deployment Script for BBDevOps Serverless Contact API
param (
    [string]$StackName = "bbdevops-contact-api",
    [string]$Region = "ap-southeast-1",
    [string]$RecipientEmail = "baratetajayson.work@gmail.com"
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Deploying BBDevOps Serverless Contact API to AWS" -ForegroundColor Cyan
Write-Host " Stack Name: $StackName" -ForegroundColor Yellow
Write-Host " AWS Region: $Region" -ForegroundColor Yellow
Write-Host " Recipient:  $RecipientEmail" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# Deploy CloudFormation stack
aws cloudformation deploy `
    --template-file infrastructure/contact-service.yaml `
    --stack-name $StackName `
    --region $Region `
    --capabilities CAPABILITY_IAM `
    --parameter-overrides `
        RecipientEmail=$RecipientEmail `
        SenderEmail=$RecipientEmail

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nStack deployed successfully!" -ForegroundColor Green

    # Retrieve output URL
    $endpoint = aws cloudformation describe-stacks `
        --stack-name $StackName `
        --region $Region `
        --query "Stacks[0].Outputs[?OutputKey=='ContactApiUrl'].OutputValue" `
        --output text

    Write-Host "`n==========================================================" -ForegroundColor Green
    Write-Host " Contact API Endpoint URL:" -ForegroundColor Green
    Write-Host " $endpoint" -ForegroundColor Yellow
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "`nAdd this endpoint to your local .env or GitHub Repository Secrets:" -ForegroundColor Cyan
    Write-Host "VITE_CONTACT_API_URL=$endpoint" -ForegroundColor White
} else {
    Write-Host "`nDeployment failed. Check AWS credentials and permissions." -ForegroundColor Red
}
