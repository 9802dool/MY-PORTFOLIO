import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

/** Production TTPSSWA site when `EXPO_PUBLIC_API_BASE_URL` is not set (e.g. local Expo Go). */
const DEFAULT_PUBLIC_SITE = 'https://ttpsswa.vercel.app';

/**
 * Base URL of the TTPSSWA web deployment only (no trailing slash).
 * Override with `EXPO_PUBLIC_API_BASE_URL` in `.env` for staging or another host.
 */
export const API_BASE = trimTrailingSlash(
  (process.env.EXPO_PUBLIC_API_BASE_URL?.trim() || DEFAULT_PUBLIC_SITE) as string
);

export function hasApiBase(): boolean {
  return API_BASE.length > 0;
}

export function alertMissingApiBase(): void {
  Alert.alert(
    'TTPSSWA site URL not set',
    'Set EXPO_PUBLIC_API_BASE_URL in ttpsswa-mobile/.env (no trailing slash).'
  );
}

/**
 * For native API calls: only fails if the base URL were ever empty (should not happen with default).
 */
export function ensureApiBase(): boolean {
  if (hasApiBase()) return true;
  alertMissingApiBase();
  return false;
}

function openExternalUrl(url: string): void {
  void (async () => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch {
      Alert.alert(
        'Could not open page',
        'Open this link in your browser:\n\n' + url
      );
    }
  })();
}

export function openTtpsswaUrl(path: string): void {
  const suffix = path.startsWith('/') ? path : `/${path}`;
  openExternalUrl(`${API_BASE}${suffix}`);
}

export function openTtpsswaHome(): void {
  openExternalUrl(API_BASE);
}
