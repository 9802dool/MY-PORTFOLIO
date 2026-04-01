/// <reference types="vite/client" />

import type { HmsolutionsAPI } from "../../shared/hmsolutions-api";

declare global {
  interface Window {
    hmsolutions: HmsolutionsAPI;
  }
}

export {};
