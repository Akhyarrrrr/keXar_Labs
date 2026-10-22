import { defineConfig } from "astro/config";
export default defineConfig({
  output: "static",
  trailingSlash: "always",
  devToolbar: { enabled: false },
  site: process.env.PUBLIC_SITE_URL || undefined,
});
