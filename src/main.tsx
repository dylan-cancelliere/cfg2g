import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import classes from "./main.module.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider, createTheme } from "@mantine/core";
import { routeTree } from "./routeTree.gen";
import { ModalsProvider } from "@mantine/modals";

const theme = createTheme({
    autoContrast: true,
    colors: {
        green: ["#E1F4E2", "#C3E9C5", "#A6DEA8", "#88D38A", "#6AC86D", "#4CBD50", "#3DA440", "#328634", "#225923", "#163B17"],
    },
    focusClassName: classes.focusClass,
});

const router = createRouter({
    routeTree,
    defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export const queryClient = new QueryClient();

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
    const root = createRoot(rootElement);
    root.render(
        <StrictMode>
            <MantineProvider theme={theme}>
                <ModalsProvider>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                    </QueryClientProvider>
                </ModalsProvider>
            </MantineProvider>
        </StrictMode>,
    );
}
