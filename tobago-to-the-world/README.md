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

### GitHub CLI (automated)

From the **portfolio repo root**, `setup-github-repo-and-push.ps1` will log in **without a browser** if it finds a token:

- Environment variable **`GH_TOKEN`** or **`GITHUB_TOKEN`** (classic PAT with **repo** scope), or
- A **token file** (single line, the PAT only), gitignored:
  - `%USERPROFILE%\.tobago-ttw-github-token`, or
  - `.github-token` in the portfolio root, or
  - `tobago-to-the-world/.github-token`

Create a token: [github.com/settings/tokens](https://github.com/settings/tokens) → Generate new token (classic) → enable **repo**.

Then either set a user env var in Windows, or save the PAT into one of the files above, then run:

```powershell
powershell -File tobago-to-the-world/scripts/setup-github-repo-and-push.ps1
```

To verify auth only:

```powershell
powershell -File tobago-to-the-world/scripts/gh-ensure-auth.ps1
gh auth status
```

**Optional (browser instead of token):**

```powershell
powershell -File tobago-to-the-world/scripts/gh-auth-device.ps1
```

Or manually after `gh auth login`:

```bash
gh repo create YOUR_USER/tobago-to-the-world --public --description "Tobago To The World (TTW)"
git remote add ttw-standalone https://github.com/YOUR_USER/tobago-to-the-world.git
git push -u ttw-standalone tobago-ttw-standalone:main
```

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Next.js deployment](https://nextjs.org/docs/deployment)
