# Ensures GitHub CLI is logged in without a browser when possible.
# Uses (in order): process env GH_TOKEN / GITHUB_TOKEN, User/Machine env vars, then token files.
# Token: classic PAT with "repo" scope from https://github.com/settings/tokens
#
# Token files (single line, no spaces): gitignored — never commit.
#   %USERPROFILE%\.tobago-ttw-github-token
#   <portfolio root>\.github-token
#   <this folder>\..\..\.github-token  (same as portfolio when script is under tobago-to-the-world/scripts)

$ErrorActionPreference = "Stop"
$gh = if (Test-Path "C:\Program Files\GitHub CLI\gh.exe") {
  "C:\Program Files\GitHub CLI\gh.exe"
} else {
  "gh"
}

function Test-GhAuthed {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "SilentlyContinue"
  & $gh auth status 2>&1 | Out-Null
  $ok = ($LASTEXITCODE -eq 0)
  $ErrorActionPreference = $prev
  return $ok
}

if (Test-GhAuthed) {
  Write-Host "GitHub CLI already authenticated." -ForegroundColor DarkGray
  exit 0
}

function Get-PersistentEnvToken {
  foreach ($name in @("GH_TOKEN", "GITHUB_TOKEN")) {
    foreach ($target in @("User", "Machine")) {
      $v = [Environment]::GetEnvironmentVariable($name, $target)
      if (-not [string]::IsNullOrWhiteSpace($v)) {
        return $v.Trim()
      }
    }
  }
  return $null
}

$token = $env:GH_TOKEN
if ([string]::IsNullOrWhiteSpace($token)) { $token = $env:GITHUB_TOKEN }
if ([string]::IsNullOrWhiteSpace($token)) { $token = Get-PersistentEnvToken }

$portfolioRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$ttwRoot = Split-Path $PSScriptRoot -Parent
$candidateFiles = @(
  (Join-Path $env:USERPROFILE ".tobago-ttw-github-token")
  (Join-Path $portfolioRoot ".github-token")
  (Join-Path $ttwRoot ".github-token")
)

if ([string]::IsNullOrWhiteSpace($token)) {
  foreach ($f in $candidateFiles) {
    if (Test-Path -LiteralPath $f) {
      $raw = (Get-Content -LiteralPath $f -Raw).Trim()
      if (-not [string]::IsNullOrWhiteSpace($raw)) {
        $token = $raw
        Write-Host "Using token from file: $f" -ForegroundColor DarkGray
        break
      }
    }
  }
}

if ([string]::IsNullOrWhiteSpace($token)) {
  Write-Host "GitHub CLI is not logged in and no token was found." -ForegroundColor Yellow
  Write-Host ""
  Write-Host "Fix (pick one):" -ForegroundColor White
  Write-Host "  1) Set GH_TOKEN or GITHUB_TOKEN (User env var in Windows, or session: `$env:GH_TOKEN='ghp_...')" -ForegroundColor White
  Write-Host "  2) Create file (one line, PAT only): $env:USERPROFILE\.tobago-ttw-github-token" -ForegroundColor White
  Write-Host "     or: $portfolioRoot\.github-token" -ForegroundColor White
  Write-Host "  3) Browser once: powershell -File tobago-to-the-world/scripts/gh-auth-device.ps1" -ForegroundColor White
  Write-Host ""
  Write-Host "Create a classic token with 'repo' scope: https://github.com/settings/tokens" -ForegroundColor Cyan
  exit 1
}

$prev = $ErrorActionPreference
$ErrorActionPreference = "SilentlyContinue"
$token | & $gh auth login --hostname github.com --with-token 2>&1 | Out-Null
$loginOk = ($LASTEXITCODE -eq 0)
$ErrorActionPreference = $prev

if (-not $loginOk) {
  Write-Host "gh auth login --with-token failed. Regenerate a classic PAT with 'repo' scope." -ForegroundColor Red
  exit 1
}

Write-Host "GitHub CLI authenticated (token)." -ForegroundColor Green
exit 0
