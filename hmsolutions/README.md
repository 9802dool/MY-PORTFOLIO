# HMSolutions

Web app for **logistics and inventory**: SKUs and stock levels, reorder signals, and shipments with line items. Data is stored in **localStorage** in the browser (no server required for the demo).

## Run locally

```bash
cd hmsolutions
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
