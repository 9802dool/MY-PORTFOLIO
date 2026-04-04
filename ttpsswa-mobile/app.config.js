/* eslint-env node */
/**
 * Dynamic Expo config so `extra.apiBaseUrl` is always set (Metro + EAS Update + dev client).
 * Replaces static app.json — keep fields in sync when you change app.json manually.
 */
const appJson = require('./app.json');

const envUrl =
  typeof process.env.EXPO_PUBLIC_API_BASE_URL === 'string'
    ? process.env.EXPO_PUBLIC_API_BASE_URL.trim()
    : '';

module.exports = {
  expo: {
    ...appJson.expo,
    extra: {
      ...(appJson.expo.extra || {}),
      apiBaseUrl: envUrl || 'https://ttpsswa.vercel.app',
    },
  },
};
