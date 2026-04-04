# Tobago To The World (TTW)

Next.js site for Tobago hotels, attractions, taxis, boats, dining, and nightlife — with a shared booking cart ([`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) base).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

Vercel does **not** list projects until you **import** a Git repository. Use one of the flows below.

### Monorepo (this app lives inside `MY-PORTFOLIO`)

Use this if you have not created a separate `tobago-to-the-world` GitHub repo.

1. Open [vercel.com/new](https://vercel.com/new) (log in if needed).
2. **Add New… → Project** → **Import Git Repository**.
3. If **`9802dool/MY-PORTFOLIO`** is missing, click **Adjust GitHub App Permissions** / **Configure GitHub App** and grant access to that repo (or “All repositories”), then refresh the list.
4. Select **`9802dool/MY-PORTFOLIO`**.
5. Before **Deploy**, expand **Root Directory** → **Edit** → select **`tobago-to-the-world`** (required — do not leave the repo root).
6. Framework: **Next.js** (auto). **Deploy**.
7. Optional: **Project → Settings → General** → change the project name to **Tobago To The World** or **TTW**.

This folder includes a root [`vercel.json`](./vercel.json) so Vercel pins the Next.js install/build commands.

From the portfolio root you can open Vercel in the browser:

```powershell
powershell -File tobago-to-the-world/scripts/open-vercel-new-project.ps1
```

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

3. In Vercel: **Import** that new repo, leave **Root Directory** empty (app is already at repo root), framework **Next.js**, then deploy.

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
