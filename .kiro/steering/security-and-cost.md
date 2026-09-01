# Security and Cost Guidelines

## Security Principles
- Secure by default
- No long-lived AWS access keys — use OIDC for GitHub Actions
- No hard-coded secrets in source code
- All secrets via environment variables documented in .env.example
- Never commit credentials or API keys
- S3 buckets are private — content served only via CloudFront with Origin Access Control
- HTTPS enforced via ACM certificates
- Input validation on all ingestion handlers
- No user-generated content in the MVP (no XSS vectors)

## Cost Awareness
The platform must be extremely cost-aware. Target monthly cost for MVP: under $10/month at low traffic.

### Cost-Saving Design Decisions
- Static site on S3 + CloudFront (no compute costs for page serves)
- Lambda for ingestion only (pay per invocation, not idle time)
- EventBridge Scheduler instead of always-running workers
- SQS for job queuing (extremely low cost)
- No NAT Gateway (significant savings)
- No RDS/Aurora (no per-hour database costs)
- No Redis/ElastiCache
- No ALB
- S3 lifecycle policies to manage storage growth
- CloudWatch log retention policies to limit log costs
- Dead-letter queues to prevent runaway retries

### AWS Services Budget
- S3: Storage for static site + JSON data files
- CloudFront: CDN distribution with free tier benefits
- Lambda: Lightweight ingestion functions (128-256MB, short duration)
- EventBridge Scheduler: Cron-based triggers
- SQS: Standard queues for job processing
- Route 53: DNS hosting (~$0.50/month per hosted zone)
- ACM: Free SSL certificates
- CloudWatch: Basic monitoring and alarms
- SNS: Email notifications for failures only
- AWS Budgets: Cost tracking and alerts
- Cost Anomaly Detection: Automated anomaly alerts

### Cost Controls
- Set AWS Budget alerts at $5, $10, and $20 thresholds
- Enable Cost Anomaly Detection
- S3 lifecycle rules to transition old archives to Infrequent Access
- CloudWatch log retention: 14 days for most logs, 30 days for errors
- Lambda concurrency limits to prevent runaway costs
- No provisioned concurrency

### Monitoring
- CloudWatch alarms for Lambda errors and duration
- SNS email notifications for important failures only (not every error)
- Dead-letter queue monitoring
- Monthly cost review via AWS Cost Explorer

## Data Retention
- Current content JSON: Standard S3 storage
- Archives older than 90 days: S3 Infrequent Access
- CloudWatch logs: 14-day retention (general), 30-day (errors)
- Dead-letter queue messages: 14-day retention

## Third-Party API Keys
- YouTube Data API key (optional, for enhanced metadata)
- All keys are optional — system must function without them
- Document all keys in .env.example with descriptions
- Never store keys in source code or Terraform state
