import { Stack } from "@mantine/core";
import "./__root.css";

import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TopBar } from "src/components/TopBar";

export const Route = createRootRoute({
    component: () => (
        <Stack h="100vh" mah="100vh" gap={0}>
            <TopBar />
            <Outlet />
        </Stack>
    ),
});
