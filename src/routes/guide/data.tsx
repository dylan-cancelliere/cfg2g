import "./data.css";
import { Anchor, Box, Image, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { MRTable } from "src/components/MRTable";

const CareerFairTable = () => {
    return (
        <Box
            h="89vh"
            mah="89vh"
            pos="relative"
            mx="0.5rem"
            style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <MRTable />
        </Box>
    );
};

const ErrorComponent = () => {
    const theme = useMantineTheme();

    return (
        <Stack h="100%" w="100%" p="sm" align="center" justify="center">
            <Image maw={300} mah={300} src="/logo.png" style={{ filter: "drop-shadow(0 0 0.75rem rgba(149, 157, 165, 0.2))" }} />
            <Title ff="Noe Bold" c={theme.colors.green[8]}>
                We ran into an error connecting to the server
            </Title>
            <Text>
                Check the website discussion channel in the <Anchor href="https://discord.gg/hVAYhyu326">Discord</Anchor> for updates on the
                timeline for a fix
            </Text>
        </Stack>
    );
};

export const Route = createFileRoute("/guide/data")({
    pendingComponent: () => <CareerFairTable />,
    staleTime: 600000, // Invalidate cache after 10 mins
    component: CareerFairTable,
    errorComponent: ErrorComponent,
});
