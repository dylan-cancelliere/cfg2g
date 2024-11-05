import "./route.css";
import { Box, LoadingOverlay } from "@mantine/core";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { MRTable } from "src/components/MRTable";

const CareerFairTable = ({ isLoading }: { isLoading?: boolean }) => {
    const companies = useLoaderData({ from: "/guide" });

    return (
        <Box
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <LoadingOverlay visible={!!isLoading} zIndex={1000} overlayProps={{ blur: 1 }} />
            <MRTable data={companies ?? []} isLoading={!!isLoading} />
        </Box>
    );
};

export const Route = createFileRoute("/guide")({
    loader: ({ context: { fetchData } }) => fetchData(),
    pendingComponent: () => <CareerFairTable isLoading />,
    staleTime: 600000, // Invalidate cache after 10 mins
    component: CareerFairTable,
});
