# Pushes the git subtree branch `tobago-ttw-standalone` (Next.js at repo root) to a NEW empty GitHub repo.
#
# Prerequisite: create an empty repository on GitHub (no README), e.g. github.com/new → name: tobago-to-the-world
#
# Usage (from anywhere):
#   powershell -File "path\to\my-portfolio\tobago-to-the-world\scripts\push-standalone-to-new-remote.ps1" -RemoteUrl "https://github.com/YOUR_USER/tobago-to-the-world.git"

param(
  [Parameter(Mandatory = $true)]
  [string]$RemoteUrl
)

$ErrorActionPreference = "Stop"
$portfolioRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
Set-Location $portfolioRoot

$remoteName = "ttw-standalone"
git remote remove $remoteName 2>$null
git remote add $remoteName $RemoteUrl
git push -u $remoteName tobago-ttw-standalone:main

Write-Host "Done. Default branch on the new repo should be main with the TTW app at the root (no subfolder). Deploy on Vercel with root . and Framework Next.js." -ForegroundColor Green
