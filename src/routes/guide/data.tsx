import "./data.css";
import { Box } from "@mantine/core";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { MRTable } from "src/components/MRTable";

const CareerFairTable = ({ isLoading }: { isLoading?: boolean }) => {
    const companies = useLoaderData({ from: "/guide/data" });

    return (
        <Box
            style={{
                position: "relative",
                display: "flex",
                flex: 1,
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "0.5rem",
            }}
        >
            <MRTable data={companies ?? []} isLoading={!!isLoading} />
        </Box>
    );
};

export const Route = createFileRoute("/guide/data")({
    loader: ({ context: { fetchData } }) => fetchData(),
    pendingComponent: () => <CareerFairTable isLoading />,
    staleTime: 600000, // Invalidate cache after 10 mins
    component: CareerFairTable,
});
