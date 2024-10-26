import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { MantineProvider, createTheme } from "@mantine/core";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";

const theme = createTheme({
    autoContrast: true,
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider theme={theme}>
            <App />
        </MantineProvider>
    </StrictMode>,
);
