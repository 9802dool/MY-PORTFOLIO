import { Alert } from 'react-native';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

/** Last-resort origin if config + env are missing (e.g. very old OTA bundles). */
const FALLBACK_PUBLIC_SITE = 'https://ttpsswa.vercel.app';

function resolveApiBase(): string {
  const fromExtra = Constants.expoConfig?.extra?.apiBaseUrl;
  const extraStr = typeof fromExtra === 'string' ? fromExtra.trim() : '';
  const envStr =
    typeof process.env.EXPO_PUBLIC_API_BASE_URL === 'string'
      ? process.env.EXPO_PUBLIC_API_BASE_URL.trim()
      : '';
  const raw = extraStr || envStr || FALLBACK_PUBLIC_SITE;
  const base = trimTrailingSlash(raw);
  return base.length > 0 ? base : FALLBACK_PUBLIC_SITE;
}

/**
 * Base URL of the TTPSSWA web deployment (no trailing slash).
 * Order: app.config.js `extra.apiBaseUrl` → EXPO_PUBLIC_API_BASE_URL → production default.
 */
export const API_BASE = resolveApiBase();

export function hasApiBase(): boolean {
  return resolveApiBase().length > 0;
}

/**
 * Legacy guard for API screens. Always succeeds — URL is never empty (see resolveApiBase).
 * Does not show an alert (avoids blocking users on stale OTA / env quirks).
 */
export function ensureApiBase(): boolean {
  return true;
}

function openExternalUrl(url: string): void {
  void (async () => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch {
      Alert.alert('Could not open page', 'Open this link in your browser:\n\n' + url);
    }
  })();
}

export function openTtpsswaUrl(path: string): void {
  const suffix = path.startsWith('/') ? path : `/${path}`;
  openExternalUrl(`${resolveApiBase()}${suffix}`);
}

export function openTtpsswaHome(): void {
  openExternalUrl(resolveApiBase());
}
