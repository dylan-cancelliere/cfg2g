import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guide/map")({
    preload: false,
    loader: () => {
        window.open("/spring-26-map.pdf");
        window.history.back();
    },
});
