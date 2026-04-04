# TTPSSWA (Expo)

Expo Router app for the association: native (iOS/Android) and a static **web** build you can host separately.

This project uses **Expo SDK 54** so it matches current **Expo Go** (“Supported SDK 54” in app info). Install Expo Go from the [App Store](https://apps.apple.com/app/expo-go/id982107779) / [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent). If Expo Go is newer than your project SDK, upgrade this app with `npx expo install expo@^54 --fix` (see [upgrade guide](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)).

## “No production deployment” / v0 project with nothing built

Projects such as [v0-mobile-app-for-ttpsswa](https://vercel.com/simeon-doolarsinghs-projects/v0-mobile-app-for-ttpsswa) are often created **without a Git repository**, so Vercel never runs a build. Fix it by connecting this app’s source:

1. Push this repo (including the **`ttpsswa-mobile/`** folder, `vercel.json`, and `package-lock.json`) to GitHub/GitLab/Bitbucket.
2. Open your Vercel project → **Settings** → [**Git**](https://vercel.com/docs/git#deploying-a-git-repository) → **Connect Git Repository** and choose that repository.
3. Still under **Settings** → **General**, set **Root Directory** to **`ttpsswa-mobile`** (Edit → enter `ttpsswa-mobile` → Save). This monorepo’s Next.js site lives elsewhere; the mobile **web** export must build from this subfolder only.
4. **Settings** → **Environment Variables**: add **`EXPO_PUBLIC_API_BASE_URL`** (your TTPSSWA site URL, no trailing slash) for **Production** (and Preview if you want).
5. **Deployments** → **⋯** on the latest deployment → **Redeploy**, or push a new commit to `main` (or your production branch).

Until Git is connected and a deploy finishes successfully, **Production Deployment** stays empty. Deleting the empty v0 project and using **Add New… → Project** → import the same repo with **Root Directory `ttpsswa-mobile`** is equivalent and sometimes simpler.

### After `vercel git connect` (monorepo)

If the repo is **MY-PORTFOLIO** (or any monorepo), open the project on Vercel → **Settings** → **General** → **Root Directory** → **Edit** → set **`ttpsswa-mobile`** → **Save**. If this stays **`.`**, Git-based builds use the repo root (your Next.js portfolio), not the Expo app, and deploys will fail or build the wrong site.

You can link the local app and connect Git from a terminal (with [Vercel CLI](https://vercel.com/docs/cli) logged in):

```bash
cd ttpsswa-mobile
npx vercel link --yes --scope YOUR_TEAM_SLUG --project v0-mobile-app-for-ttpsswa
npx vercel git connect https://github.com/9802dool/MY-PORTFOLIO.git
```

## Deploy the web build on Vercel

Use a **dedicated Vercel project** (not your portfolio site).

1. [Vercel](https://vercel.com) → **Add New…** → **Project** → import this repository.
2. Set **Root Directory** to **`ttpsswa-mobile`**.
3. Under **Environment Variables**, add **`EXPO_PUBLIC_API_BASE_URL`** with your TTPSSWA Next.js deployment URL (same value as in [TTPSSWA/README.md](../TTPSSWA/README.md)—no trailing slash).
4. On the **TTPSSWA** Vercel project (the API), add **`MOBILE_WEB_ORIGINS`** with this Expo web deployment’s full origin (e.g. `https://your-app.vercel.app`), or set **`MOBILE_WEB_ALLOW_ALL_VERCEL=1`** while testing previews. Redeploy TTPSSWA so CORS applies.
5. Deploy this app. Vercel runs `npm install`, then `npm run build` (`expo export -p web`), and serves the **`dist`** output.

`vercel.json` in this folder sets the build and output directory so you do not have to configure them manually.

### Monorepo + Root Directory `ttpsswa-mobile`

With **Root Directory** set to `ttpsswa-mobile` on Vercel, **production builds should run from Git** (push to `main` on the linked repo). Running `vercel deploy` from *inside* `ttpsswa-mobile` makes the CLI look for `ttpsswa-mobile/ttpsswa-mobile` and fails. `vercel redeploy` of an old upload-only deployment can fail for the same reason—use a fresh Git deployment instead.

### CORS and the live TTPSSWA API

If **https://ttpsswa.vercel.app** is deployed from the separate GitHub repo [**TTPSSWA**](https://github.com/9802dool/TTPSSWA) (not from `MY-PORTFOLIO`), add the CORS helper there: copy **`middleware.ts`** and **`lib/mobile-web-cors.ts`** from this monorepo’s **`TTPSSWA/`** folder into that repository, commit, and deploy. The env vars **`MOBILE_WEB_ORIGINS`** / **`MOBILE_WEB_ALLOW_ALL_VERCEL`** only take effect once that code is live on the API.

## Local development

```bash
cd ttpsswa-mobile
npm install
cp .env.example .env
# Edit .env — set EXPO_PUBLIC_API_BASE_URL to your TTPSSWA API origin

npm run start
```

`npm run start` uses **`--lan`** so Expo Go gets a real `exp://192.168.x.x:8081` URL (not useless localhost). If LAN still fails, use **`npm run start:tunnel`** once and scan the new QR (works through the internet; needs a working tunnel/ngrok).

- Native: **Expo Go** or `npm run ios` / `npm run android`.
- Web dev: `npm run web`.

### Windows: phone can’t connect (firewall) — fix once

1. Set your Wi‑Fi network to **Private** (not Public): **Settings → Network & internet → Wi‑Fi → your network → Network profile → Private**.
2. Open **PowerShell as Administrator** (Start → type PowerShell → right‑click → **Run as administrator**).
3. Run (use your real path to this repo):

   ```powershell
   cd "C:\Users\Simeon\OneDrive\Documents\my-portfolio\ttpsswa-mobile"
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
   .\scripts\allow-expo-windows-firewall.ps1
   ```

4. Start the app again: `npm run start`. In Expo Go use **Enter URL**: `exp://YOUR_PC_IP:8081` (IP from `ipconfig` under **Wireless LAN adapter Wi‑Fi** → **IPv4**). Port **8082** if the terminal says Metro chose 8082.

### Phone not reading the QR code / project won’t open

1. **Use Expo Go’s scanner** (inside the app), not only the phone camera.
2. **Same Wi‑Fi** as your PC, network profile **Private** on Windows.
3. **Firewall:** run `scripts\allow-expo-windows-firewall.ps1` as Administrator (see above), or `npm run start:tunnel`.
4. **Manual URL:** Expo Go → *Enter URL* → `exp://YOUR_PC_LAN_IP:8081` (match the port shown in the terminal).
5. QR image: `powershell -File scripts/open-expo-qr.ps1` (add `-Port 8082` if needed).

## Native builds

Use [EAS Build](https://docs.expo.dev/build/introduction/) for store builds; set `EXPO_PUBLIC_API_BASE_URL` in EAS secrets or `eas.json` env for production.
