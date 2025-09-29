import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/guide/")({
    beforeLoad: () => {
        throw redirect({ to: "/guide/data", search: { filters: [{ id: "tags", value: ["RIT Fall 2025 Career Fair"] }] } });
    },
});
