import { defineConfig } from "@playwright/test";

export default defineConfig({
  globalTimeout: 3_600_000, // Tüm test süresi: 1 saat
  timeout: 360_000, // Her bir test için: 60 saniye

  use: {
    actionTimeout: 10_000, // Her bir adım (click, fill, etc.) için: 10 saniye
    // Diğer ayarlar burada olabilir, örneğin:
    headless: true,
    viewport: { width: 1280, height: 720 },
    baseURL: "https://www.hepsiburada.com",
  },
});
