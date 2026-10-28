# b3-portal-admin

Next.js (App Router, JSX). Talks to the API only through its own server routes (BFF).

```bash
cp .env.local.example .env.local   # API_URL + ADMIN public key
npm run dev -- -p 3001
```
Dependencies to add later: `jose` (already needed by middleware), `tus-js-client` (video upload), `@dnd-kit/core` (lesson ordering).
