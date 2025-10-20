# Agent Test Lab

A web-native workspace for rapidly evaluating autonomous agent personas across test scenarios. Configure personas, author mission playbooks, simulate expected performance, and capture transcripts and recommendations for each run.

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start a local dev server
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` to explore the Agent Test Lab.

## Available Scripts

- `npm run dev` – Launches the Next.js dev server with hot reloading
- `npm run build` – Produces an optimized production build
- `npm run start` – Serves the production build locally
- `npm run lint` – Lints the project using Next.js core web vitals rules

## Key Features

- Library of seed agent personas and mission scenarios to jump-start evaluations
- Simulation engine that generates deterministic performance metrics, transcripts, and tuning guidance
- Execution ledger with selectable history for comparing runs
- Forms for crafting new agents and scenarios without leaving the dashboard
- Responsive layout with light/dark friendly styling

## Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [React 18](https://react.dev/)
- TypeScript for end-to-end type safety

## Deployment

This project is preconfigured for seamless deployment to [Vercel](https://vercel.com/). Run:
```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN
```
The production deployment lives at `https://agentic-62e5c097.vercel.app`.
