# Resend Coffee Club

Demo for the [Resend DX Engineer Take‑Home Challenge](https://resend.notion.site/DX-Engineer-Take-Home-Challenge-107c40d6c4ef80d9beacde49b2f9c9b4).

Features:

- Subscribe users to Resend Audience + send welcome email
- Schedule follow-up email delivery
- Forward webhooks to Slack
- Send receipt email with PDF attachment

## Setup

1. Install dependencies

```bash
pnpm install
```

2. Create `.env`

```bash
RESEND_API_KEY=your_resend_api_key
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

3. Start dev server

```bash
pnpm dev
```

Visit `http://localhost:3000`

## Usage

### Subscribe Flow

Visit the homepage, enter an email, and click Subscribe. You'll receive:

- Welcome email immediately
- Follow-up email in 1 minute

### Webhook Testing

```bash
curl -X POST http://localhost:3000/api/webhooks/subscribe \
  -H "Content-Type: application/json" \
  -d '{"event":"test","message":"hello"}'
```

### Receipt Email

Update the recipient in `src/app/api/send-receipt/route.ts`, then visit:
`http://localhost:3000/api/send-receipt`

## Configuration

Update these values in the code:

- `from` address: Replace `"Josh from CC <hi@mail.resend.coffee>"` with your verified sender
- `audienceId`: Replace with your Resend Audience ID

## Tech Stack

Next.js 15, React 19, Tailwind CSS, Resend SDK
