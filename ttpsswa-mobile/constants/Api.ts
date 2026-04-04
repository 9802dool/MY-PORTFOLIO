import { Alert, Linking } from 'react-native';

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

/**
 * Base URL of the TTPSSWA web deployment only (no trailing slash).
 * Do not point this at a personal portfolio or unrelated site.
 *
 * Set in `ttpsswa-mobile/.env`:
 * EXPO_PUBLIC_API_BASE_URL=https://your-ttpsswa-site.example.com
 */
export const API_BASE = trimTrailingSlash(process.env.EXPO_PUBLIC_API_BASE_URL ?? '');

export function hasApiBase(): boolean {
  return API_BASE.length > 0;
}

export function alertMissingApiBase(): void {
  Alert.alert(
    'TTPSSWA site URL not set',
    'Add EXPO_PUBLIC_API_BASE_URL to ttpsswa-mobile/.env (or Vercel env) with your TTPSSWA website URL (no trailing slash).'
  );
}

/** Returns false if EXPO_PUBLIC_API_BASE_URL is missing (after showing an alert). */
export function ensureApiBase(): boolean {
  if (hasApiBase()) return true;
  alertMissingApiBase();
  return false;
}

export function openTtpsswaUrl(path: string): void {
  if (!ensureApiBase()) return;
  const suffix = path.startsWith('/') ? path : `/${path}`;
  void Linking.openURL(`${API_BASE}${suffix}`);
}

export function openTtpsswaHome(): void {
  if (!ensureApiBase()) return;
  void Linking.openURL(API_BASE);
}
