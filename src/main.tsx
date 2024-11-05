import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";

import { MantineProvider, createTheme } from "@mantine/core";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { fetchData } from "./api";

const theme = createTheme({
    autoContrast: true,
    colors: {
        green: ["#E1F4E2", "#C3E9C5", "#A6DEA8", "#88D38A", "#6AC86D", "#4CBD50", "#3DA440", "#328634", "#225923", "#163B17"],
    },
});

const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    context: {
        fetchData,
    },
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
    const root = createRoot(rootElement);
    root.render(
        <StrictMode>
            <MantineProvider theme={theme}>
                <RouterProvider router={router} />
            </MantineProvider>
        </StrictMode>,
    );
}
