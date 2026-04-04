# One-time: allow your phone (Expo Go) to reach Metro on this PC over Wi‑Fi.
# MUST run in an elevated PowerShell: Start menu → "PowerShell" → Right‑click → Run as administrator
#   cd "...\ttpsswa-mobile"
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
#   .\scripts\allow-expo-windows-firewall.ps1

#Requires -RunAsAdministrator

$ruleName = "TTPSSWA Expo Metro (TCP 8081-8095, Private/Domain)"

Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue |
  Remove-NetFirewallRule -ErrorAction SilentlyContinue

New-NetFirewallRule `
  -DisplayName $ruleName `
  -Direction Inbound `
  -Action Allow `
  -Protocol TCP `
  -LocalPort 8081-8095 `
  -Profile Private, Domain `
  -Description "Inbound Metro bundler ports for Expo Go / React Native (TTPSSWA mobile)."

Write-Host "OK: Firewall rule added — $ruleName" -ForegroundColor Green
Write-Host "Wi‑Fi profile must be Private (Settings → Network → your Wi‑Fi → Private)." -ForegroundColor Cyan
Write-Host "Then: npm run start   and in Expo Go use exp://THIS_PC_IP:8081" -ForegroundColor Cyan
