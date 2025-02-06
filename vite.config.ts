import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [react(), TanStackRouterVite()],
        server: {
            proxy: {
                "/data": process.env.VITE_BASE_URL ?? "http://localhost:8007",
            },
        },
        resolve: {
            alias: {
                src: "/src",
                public: "/public",
            },
        },
    });
});
