import "./route.css";
import { Box, Loader, Text } from "@mantine/core";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { MRTable } from "src/components/MRTable";

const CareerFairTable = () => {
    const companies = useLoaderData({ from: "/guide" });

    return (
        <Box
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {companies === undefined ? (
                <>
                    <Text>Loading...</Text>
                    <Loader />
                </>
            ) : (
                <MRTable data={companies} />
            )}
        </Box>
    );
};

export const Route = createFileRoute("/guide")({
    loader: ({ context: { fetchData } }) => fetchData(),
    staleTime: 600000, // Invalidate cache after 10 mins
    component: CareerFairTable,
});
