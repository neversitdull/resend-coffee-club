## Resend Coffee Club (DX Take‑Home)

Next.js + Resend demo for the Resend DX Engineer Take‑Home Challenge. It:

- Subscribes an email to a Resend Audience and sends a welcome email
- Schedules a follow‑up email for delivery “in 1 min”
- Sends a sample receipt email with a PDF attachment
- Implements a webhook to send sign-ups to Slack

Challenge brief: [Resend DX Engineer Take‑Home Challenge](https://resend.notion.site/DX-Engineer-Take-Home-Challenge-107c40d6c4ef80d9beacde49b2f9c9b4)

### Quick start

1. Install deps

```bash
pnpm install
```

2. Create `.env`

```bash
RESEND_API_KEY=your_resend_api_key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXX/XXXXX/XXXXX
```

3. Run dev server

```bash
pnpm dev
```

Open `http://localhost:3000`.

### Demo

- Subscribe: visit `/`, enter your email, click Subscribe
  - You’ll get a welcome email immediately, then one in ~1 minute
- Webhook: send a test payload to Slack

```bash
curl -X POST http://localhost:3000/api/webhooks/subscribe \
  -H "Content-Type: application/json" \
  -d '{"event":"demo","message":"hello"}'
```

- Receipt: set your email in `src/app/api/send-receipt/route.ts`, then open `http://localhost:3000/api/send-receipt`

### Key files

- `src/app/page.tsx` — subscribe + send now + schedule later
- `src/app/api/webhooks/subscribe/route.ts` — relay POST body to Slack
- `src/app/api/send-receipt/route.ts` — send email with PDF, redirect to `/thanks`
- `src/components/*template*.tsx` — simple email templates

### Notes

- Replace the demo `from` and `audienceId` with your own (env‑driven in real apps)
- Tech: Next.js 15, React 19, Tailwind 4, Resend Node SDK
- Scripts: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm format`

### Subscribe flow (home page `src/app/page.tsx`)

- A server action handles the form submit, using the Resend SDK to:
  - **Create a contact** in a Resend Audience (`audienceId` is hardcoded for the demo)
  - **Send a welcome email** immediately using `WelcomeEmailTemplate`
  - **Schedule a follow-up email** using `ScheduledEmailTemplate` with `scheduledAt: "in 1 min"`
- Requires `RESEND_API_KEY` to be present in the environment.

Key files:

- `src/app/page.tsx`
- `src/components/welcome-template.tsx`
- `src/components/scheduled-template.tsx`

What to customize:

- Replace the `from` address (`"Josh from CC <hi@mail.resend.coffee>"`) with a sender that works for your Resend account (verified domain or allowed address).
- Replace the demo `audienceId` with your own Audience ID from Resend.

### Webhook relay to Slack (`src/app/api/webhooks/subscribe/route.ts`)

- Accepts a POST with any JSON payload and forwards it to the Slack Incoming Webhook URL in `SLACK_WEBHOOK_URL`.
- Useful for quickly seeing webhook payloads in Slack.

Test with curl:

```bash
curl -X POST http://localhost:3000/api/webhooks/subscribe \
  -H "Content-Type: application/json" \
  -d '{"event":"test","data":{"hello":"world"}}'
```

Note that this is using a simple Slack Workflow. You can learn more on how to set this up via thier [site/docs](https://slack.com/features/workflow-automation)

### Sample receipt with PDF attachment (`src/app/api/send-receipt/route.ts`)

- GET `/api/send-receipt` sends an email with a small PDF attachment and redirects to `/thanks`.
- Update the hardcoded recipient before you test.

Key files:

- `src/app/api/send-receipt/route.ts`
- `src/components/receipt-template.tsx`
- Success page: `src/app/thanks/page.tsx`

## Environment variables

Provide these in `.env`:

- **RESEND_API_KEY**: API key from Resend.
- **SLACK_WEBHOOK_URL**: Slack Incoming Webhook URL used by the webhook relay.

## Running the demo

- **Subscribe flow**: visit `/`, enter your email, click Subscribe. You should receive a welcome email immediately and another in ~1 minute.
- **Webhook relay**: use the curl command above and confirm the message appears in the configured Slack channel.
- **Receipt email**: set your email in `src/app/api/send-receipt/route.ts`, then open `http://localhost:3000/api/send-receipt`.

## Configuration notes

- **Sender (from)**: Use a verified domain or an allowed Resend-provided address.
- **Audience ID**: Replace the demo value with your own from the Resend dashboard.
- **Scheduling**: `scheduledAt` accepts natural language (e.g., `"in 1 min"`) or an ISO timestamp.

## Notes

- This repository is demo-focused; it purposely keeps the email templates simple. You can swap them for `react-email`-rendered components if desired.
