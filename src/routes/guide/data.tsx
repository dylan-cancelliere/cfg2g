import "./data.css";
import { Box } from "@mantine/core";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { MRTable } from "src/components/MRTable";

const CareerFairTable = ({ isLoading }: { isLoading?: boolean }) => {
    const companies = useLoaderData({ from: "/guide/data" });

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
            <MRTable data={companies ?? []} isLoading={!!isLoading} />
        </Box>
    );
};

export const Route = createFileRoute("/guide/data")({
    pendingComponent: () => <CareerFairTable isLoading />,
    staleTime: 600000, // Invalidate cache after 10 mins
    component: CareerFairTable,
});
