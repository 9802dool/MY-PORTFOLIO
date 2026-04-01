import type { HmsolutionsAPI } from "../../../shared/hmsolutions-api";

export function getApi(): HmsolutionsAPI {
  const api = window.hmsolutions;
  if (!api) {
    throw new Error("HM SOLUTIONS API is not available. Run inside the desktop app.");
  }
  return api;
}
