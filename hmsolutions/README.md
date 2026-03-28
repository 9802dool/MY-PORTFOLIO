# HMSolutions

Web app for **logistics and inventory**: SKUs and stock levels, reorder signals, and shipments with line items. Data is stored in **localStorage** in the browser (no server required for the demo).

## Run locally

```bash
cd hmsolutions
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel (this repo is a monorepo)

HMSolutions is **not** the repo root. Your portfolio repo contains multiple apps (for example `TTPSSWA/` and `hmsolutions/`). Each app needs **its own Vercel project** with the correct **Root Directory**.

1. Go to [vercel.com](https://vercel.com) → **Add New…** → **Project**.
2. **Import** the same Git repository you use for GitHub (e.g. `MY-PORTFOLIO` / `my-portfolio`).
3. Before you deploy, open **Configure Project**:
   - **Root Directory** → **Edit** → select the `hmsolutions` folder (or type `hmsolutions`).  
     Vercel will run `npm install` and `npm run build` **inside** that folder.
   - Framework Preset should stay **Next.js** (auto-detected).
4. **Deploy**.

You should then see a new project in your Vercel dashboard (e.g. `hmsolutions` or whatever you name it), separate from TTPSSWA.

**If you only ever created one Vercel project** from this repo and pointed it at `TTPSSWA`, that deployment **only** builds TTPSSWA — HMSolutions will not appear until you add a second project with root `hmsolutions`.

## Features

- **Dashboard** — SKU count, total units, in-transit shipments, low-stock list, recent freight.
- **Inventory** — Add/edit/delete items (SKU, name, quantity, unit, bin location, reorder point).
- **Logistics** — Create shipments with reference, origin/destination, carrier, ETA, status, and SKU lines (`SKU quantity` per line).

## Stack

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS.

## Next steps (ideas)

- REST API + PostgreSQL or Supabase for multi-user data.
- Barcode scanning, CSV import/export, and role-based access.
- Stock reservations when shipments move to “in transit”.
