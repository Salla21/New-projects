# Technical Standards

## Language & Runtime
- TypeScript with strict mode enabled
- Node.js (current LTS)

## Framework
- Next.js (current supported Active LTS) with App Router
- React
- Static export only: `output: "export"` in next.config
- Deployable as HTML, CSS, and JavaScript files without a permanent Next.js server

## UI Libraries
- Tailwind CSS
- shadcn/ui where useful
- Lucide Icons
- Minimal CSS transitions only

## Package Manager
- npm (or pnpm if preferred, but keep consistent)

## Code Style
- ESLint with strict TypeScript rules
- Prettier for formatting
- Strict TypeScript (`strict: true`)
- No `any` types unless absolutely unavoidable with documented reason

## Testing
- Vitest for unit and integration tests
- React Testing Library for component tests
- Playwright for essential end-to-end tests
- No Lorem Ipsum in test fixtures — use realistic Gambian content samples

## Infrastructure as Code
- Terraform for all AWS infrastructure
- GitHub Actions for CI/CD
- AWS OIDC for authentication — no long-lived AWS access keys

## Prohibited Technologies
Do NOT use:
- EC2, ECS, EKS, or Kubernetes
- RDS or Aurora
- OpenSearch
- Redis
- NAT Gateway
- Application Load Balancer
- Permanent backend servers
- Paid AI services
- Heavy animation libraries
- Three.js
- Video storage in AWS
- Automatic copying of complete third-party articles

## Performance
- Optimise for mobile readers and low-bandwidth connections
- Good Core Web Vitals scores
- Lazy-load noncritical media
- Keep JavaScript bundle small
- Third-party social embeds load only after user clicks play/view button
- Loading skeletons for async content

## Error Handling
- Clear error states for all async operations
- Graceful degradation when external sources are unavailable
- If one source fails, remaining sources continue processing

## Security
- No hard-coded secrets
- External API keys as optional environment variables in .env.example
- Never commit credentials
- Secure by default
- AWS OIDC — no long-lived keys

## Dependencies
- Minimal dependencies
- Prefer well-maintained, small packages
- Pin exact versions
