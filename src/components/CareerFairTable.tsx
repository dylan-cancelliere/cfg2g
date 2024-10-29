import "./CareerFairTable.css";
import { useEffect, useMemo, useState } from "react";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { Box, Loader, Text, useMantineTheme } from "@mantine/core";
import { Company, Severity, SeverityList } from "src/types";
import { SeverityChip } from "src/severity";
import { useMediaQuery } from "@mantine/hooks";

type Cell = {
    values: { effectiveFormat: unknown; effectiveValue: unknown; formattedValue: string; userEnteredValue: unknown }[];
};

function Table({ data }: { data: Company[] }) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

    const columns = useMemo<MRT_ColumnDef<Company>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "severity",
                header: "Severity",
                Cell: ({ renderedCellValue }) => {
                    return <SeverityChip severity={renderedCellValue as string} isMobile={!!isMobile} />;
                },
                filterVariant: "multi-select",
                sortingFn: (a, b, colId) => {
                    const aVal: Severity = a.getValue(colId);
                    const bVal: Severity = b.getValue(colId);
                    return SeverityList.indexOf(aVal) - SeverityList.indexOf(bVal);
                },
            },
            {
                accessorKey: "notes",
                header: "Notes",
            },
        ],
        [isMobile],
    );

    const table = useMantineReactTable({
        columns,
        data,
        enableFacetedValues: true,
        enableFullScreenToggle: false,
        // enableColumnResizing: true,
        initialState: {
            isFullScreen: false,
            showColumnFilters: true,
        },
        mantinePaginationProps: {
            rowsPerPageOptions: ["10", "20", "50", "All"],
        },
        onPaginationChange: setPagination,
        state: {
            pagination: {
                pageIndex: isNaN(pagination.pageSize) ? 0 : pagination.pageIndex,
                pageSize: isNaN(pagination.pageSize) ? 999 : pagination.pageSize,
            },
        },
    });

    return (
        <Box style={{ width: "100%", height: "100%" }}>
            <MantineReactTable table={table} />
        </Box>
    );
}

export function CareerFairTable() {
    const [companies, setCompanies] = useState<Company[] | undefined>(undefined);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/data`)
            .then(async (res) => {
                const { data } = await res.json();
                setCompanies(
                    data?.data?.sheets[0]?.data[0]?.rowData?.map(
                        (raw: Cell) =>
                            ({
                                name: raw.values[0].formattedValue,
                                notes: raw.values[1].formattedValue,
                                severity: raw.values[2].formattedValue,
                            }) as Company,
                    ),
                );
            })
            .catch((e) => console.warn("Error retrieving data:", e));
    }, []);

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
            className="AHHHH"
        >
            {companies === undefined ? (
                <>
                    <Text>Loading...</Text>
                    <Loader />
                </>
            ) : (
                <Table data={companies} />
            )}
        </Box>
    );
}
