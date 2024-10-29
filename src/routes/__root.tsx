import "./__root.css";

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { fetchData } from "src/api";
import { TopBar } from "src/components/TopBar";

export const Route = createRootRouteWithContext<{ fetchData: typeof fetchData }>()({
    component: () => (
        <>
            <TopBar />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
});
