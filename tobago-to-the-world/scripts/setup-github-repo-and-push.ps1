# After `gh auth login`, creates github.com/<you>/tobago-to-the-world (if missing) and pushes branch tobago-ttw-standalone as main.
# Run from the portfolio repo root: my-portfolio

$ErrorActionPreference = "Stop"
$gh = "C:\Program Files\GitHub CLI\gh.exe"

$prev = $ErrorActionPreference
$ErrorActionPreference = "SilentlyContinue"
& $gh auth status 2>&1 | Out-Null
$authOk = ($LASTEXITCODE -eq 0)
$ErrorActionPreference = $prev
if (-not $authOk) {
  Write-Host "Not logged in. Run first:" -ForegroundColor Yellow
  Write-Host "  powershell -File tobago-to-the-world/scripts/gh-auth-device.ps1" -ForegroundColor White
  exit 1
}

$portfolioRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
Set-Location $portfolioRoot

$user = (& $gh api user -q .login).Trim()
$repoName = "tobago-to-the-world"
$full = "$user/$repoName"
$remoteUrl = "https://github.com/$user/$repoName.git"

$ErrorActionPreference = "SilentlyContinue"
& $gh repo view $full 2>&1 | Out-Null
$missing = ($LASTEXITCODE -ne 0)
$ErrorActionPreference = "Stop"
if ($missing) {
  Write-Host "Creating $full ..." -ForegroundColor Cyan
  & $gh repo create $repoName --public --description "Tobago To The World (TTW) - Next.js tourism booking"
} else {
  Write-Host "Repo $full already exists." -ForegroundColor DarkGray
}

$remoteName = "ttw-standalone"
git remote remove $remoteName 2>$null
git remote add $remoteName $remoteUrl
Write-Host "Pushing tobago-ttw-standalone -> main on $remoteUrl ..." -ForegroundColor Cyan
git push -u $remoteName tobago-ttw-standalone:main

Write-Host "Done. Import $remoteUrl in Vercel (root directory empty, Next.js)." -ForegroundColor Green
