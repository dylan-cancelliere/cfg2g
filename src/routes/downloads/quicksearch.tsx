import { Button, Stack } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/downloads/quicksearch")({
    component: () => (
        <Stack h="100%" w="100%">
            <Button
                variant="white"
                color="var(--mantine-color-green-8)"
                size="lg"
                maw="100%"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                component="a"
                download
                href="/files/quicksearch.py"
                m="auto"
                leftSection={<IconDownload />}
            >
                Download QuickSearch.py
            </Button>
        </Stack>
    ),
});
