# Tobago To The World (TTW)

Next.js site for Tobago hotels, attractions, taxis, boats, dining, and nightlife — with a shared booking cart ([`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) base).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

### This folder inside a monorepo

Import the parent repo and set **Root Directory** to `tobago-to-the-world`.

### Standalone GitHub repo (app at repository root)

The parent repo keeps a branch **`tobago-ttw-standalone`** whose root **is** this project (created with `git subtree split --prefix=tobago-to-the-world`). That branch is also on `origin` so the split history lives on GitHub.

1. On GitHub, create a **new empty** repository (no README), e.g. `tobago-to-the-world`.
2. From the **portfolio repo root** (`my-portfolio`), add the new remote and push:

```bash
git remote add ttw-standalone https://github.com/YOUR_USER/tobago-to-the-world.git
git push -u ttw-standalone tobago-ttw-standalone:main
```

Or on Windows, from the repo root:

```powershell
powershell -File tobago-to-the-world/scripts/push-standalone-to-new-remote.ps1 -RemoteUrl "https://github.com/YOUR_USER/tobago-to-the-world.git"
```

3. In Vercel: **Import** that new repo, leave **Root Directory** blank (or `.`), framework **Next.js**, then deploy.

### Optional: GitHub CLI

After `gh auth login`:

```bash
gh repo create YOUR_USER/tobago-to-the-world --public --description "Tobago To The World (TTW)"
git remote add ttw-standalone https://github.com/YOUR_USER/tobago-to-the-world.git
git push -u ttw-standalone tobago-ttw-standalone:main
```

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Next.js deployment](https://nextjs.org/docs/deployment)
