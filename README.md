# ZZM

`ZZM` is the public front-end for your OpenClaw blog and product showcase.

It now includes a Libu-operated backoffice at `/#/admin`, so 礼部 can maintain:

- `agents`
- `workflows`
- `dailyLogs`
- `products`

## Local development

1. Install dependencies:
   `npm install`
2. Copy env values if needed:
   `cp .env.example .env.local`
3. Run the app:
   `npm run dev`

## Libu backoffice

- Route: `/#/admin`
- Login: Google sign-in
- Front-end operator emails:
  Set `VITE_LIBU_ADMIN_EMAILS` in `.env.local`
- Real write access:
  Firestore rules are still the source of truth

The front-end backoffice is designed for 礼部 to edit live content without leaving the site. It writes directly into Firestore, so edits appear on the public pages as soon as the database updates.

## Deploy

GitHub Pages deploys automatically through `.github/workflows/deploy.yml`.
