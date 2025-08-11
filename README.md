## Resend Coffee Club (DX Take‑Home)

Next.js + Resend demo for the Resend DX Engineer Take‑Home Challenge. The demo:

- Subscribes an email to a Resend Audience and sends a welcome email
- Schedules a follow‑up email for delivery “in 1 min”
- Sends a sample receipt email with a PDF attachment
- Implements a webhook to send sign-ups to Slack

Challenge brief: [Resend DX Engineer Take‑Home Challenge](https://resend.notion.site/DX-Engineer-Take-Home-Challenge-107c40d6c4ef80d9beacde49b2f9c9b4)

### Quick start

1. Install dependencies

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

### Notes

- Replace the demo `from` and `audienceId` with your own
- Tech: Next.js 15, React 19, Tailwind 4, Resend Node SDK

## Demo

### Subscribe flow (home page `src/app/page.tsx`)

- A server action handles the form submit, using the Resend SDK to:
  - **Create a contact** in a Resend Audience (`audienceId` is hardcoded for the demo)
  - **Send a welcome email** immediately using `WelcomeEmailTemplate`
  - **Schedule a follow-up email** using `ScheduledEmailTemplate` with `scheduledAt: "in 1 min"`
- Requires `RESEND_API_KEY`

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

This demo uses a simple base64-encoded string as a placeholder for the PDF attachment. For production, you’d typically generate a proper PDF using a dedicated library.

## Environment variables

Provide these in `.env`:

- **RESEND_API_KEY**: API key from Resend.
- **SLACK_WEBHOOK_URL**: Slack Incoming Webhook URL used by the webhook relay.

## Configuration notes

- **Sender (from)**: Use a verified domain or an allowed Resend-provided address.
- **Audience ID**: Replace the demo value with your own from the Resend dashboard.
- **Scheduling**: `scheduledAt` accepts natural language (e.g., `"in 1 min"`) or an ISO timestamp.

## Notes

- This repository is demo-focused; it purposely keeps the email templates simple. You can swap them for `react-email`-rendered components if desired.
