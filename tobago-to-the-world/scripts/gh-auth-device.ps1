# One-time GitHub CLI login (device flow). Opens the activation page and copies the code to the clipboard.
# Paste the code on https://github.com/login/device and authorize "GitHub CLI".

$ErrorActionPreference = "Stop"
Write-Host "Opening GitHub device activation page..." -ForegroundColor Cyan
Start-Process "https://github.com/login/device"
& "C:\Program Files\GitHub CLI\gh.exe" auth login --hostname github.com --git-protocol https --web --clipboard
& "C:\Program Files\GitHub CLI\gh.exe" auth status
