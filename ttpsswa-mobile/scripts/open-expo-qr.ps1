# Run `npx expo start` (or `--lan --port 8082` if 8081 is busy). Same Wi‑Fi as your phone.
# Then: powershell -File scripts/open-expo-qr.ps1
# Opens a QR image for Expo Go and the dev tools page.

param([int]$Port = 8081)

$ip = (
  Get-NetIPAddress -AddressFamily IPv4 |
  Where-Object {
    $_.IPAddress -match '^192\.168\.|^10\.|^172\.(1[6-9]|2\d|3[01])\.' -and
    $_.IPAddress -notmatch '^169\.'
  } |
  Select-Object -First 1 -ExpandProperty IPAddress
)
if (-not $ip) {
  Write-Error "No LAN IPv4 found. Connect Wi‑Fi or set your PC IP manually."
  exit 1
}

$exp = "exp://${ip}:${Port}"
$enc = [uri]::EscapeDataString($exp)
$qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=$enc"
$root = Split-Path $PSScriptRoot -Parent
$out = Join-Path $root "expo-qr.png"

Write-Host "Expo URL: $exp" -ForegroundColor Cyan
Invoke-WebRequest -Uri $qrUrl -OutFile $out -UseBasicParsing
Start-Process $out
Start-Process "http://localhost:$Port"
