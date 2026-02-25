import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/guide/")({
    beforeLoad: () => {
        throw redirect({ to: "/guide/data", search: { filters: [{ id: "tags", value: ["RIT Spring 2026 Career Fair"] }] } });
    },
});
