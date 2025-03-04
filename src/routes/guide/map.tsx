import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/guide/map")({
    beforeLoad: () => {
        window.open("/spring-25-map.pdf");
        throw redirect({ to: "/" });
    },
});
