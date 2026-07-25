import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const port = Number(process.env.PORT ?? 5000);
const envAllowedHosts = (process.env.VITE_ALLOWED_HOSTS ?? process.env.ALLOWED_HOSTS ?? "")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);
const allowedHosts = ["jksoft.app", "www.jksoft.app", ...envAllowedHosts];

export default defineConfig({
  vite: {
    server: {
      host: "0.0.0.0",
      port,
      strictPort: true,
      allowedHosts,
    },
    preview: {
      host: "0.0.0.0",
      port,
      strictPort: true,
      allowedHosts,
    },
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
