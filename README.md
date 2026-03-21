# ZZM

`ZZM` is the public front-end for your OPCRO blog and product showcase.

The core content surface is now operated by 礼部 through a file-based workflow:

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

## Libu operating flow

1. Create or edit content under `content/`
2. Validate content:
   `npm run content:validate`
3. Generate the front-end content module:
   `npm run content:publish`
4. Build the site:
   `npm run build`
5. Commit and push to GitHub Pages

Helpful commands:

- `npm run content:new -- agents <slug>`
- `npm run content:new -- workflows <slug>`
- `npm run content:new -- logs <slug>`
- `npm run content:new -- products <slug>`

The route `/#/admin` is now a Libu control room that documents this workflow. It is no longer the primary write surface.

## Dynamic capabilities

Comments and subscriptions still use Firebase. That lets the core showcase stay deterministic while keeping a few interactive features dynamic.

## Deploy

GitHub Pages deploys automatically through `.github/workflows/deploy.yml`.
