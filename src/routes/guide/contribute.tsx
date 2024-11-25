import { Stack } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

function ContributePage() {
    return <Stack p="sm">Abc 123</Stack>;
}

export const Route = createFileRoute("/guide/contribute")({
    component: ContributePage,
});
