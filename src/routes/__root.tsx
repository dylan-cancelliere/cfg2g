import { Stack } from "@mantine/core";
import "./__root.css";

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { fetchData } from "src/shared/api";
import { TopBar } from "src/components/TopBar";

export const Route = createRootRouteWithContext<{ fetchData: typeof fetchData }>()({
    component: () => (
        <Stack mah="100vh" gap={0}>
            <TopBar />
            <Outlet />
        </Stack>
    ),
});
