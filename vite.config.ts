import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), TanStackRouterVite()],
    server: {
        proxy: {
            "/data": "http://localhost:8007",
        },
    },
    resolve: {
        alias: {
            src: "/src",
            public: "/public",
        },
    },
});
