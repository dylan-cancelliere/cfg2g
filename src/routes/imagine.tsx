import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/imagine")({
    beforeLoad: () => {
        throw redirect({ to: "/about/imagine" });
    },
});
