import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { Box, Loader, Text } from "@mantine/core";
import { getSeverityChips } from "./severity";
import { Company, Severity, SeverityList } from "./types";

type Cell = {
    values: { effectiveFormat: unknown; effectiveValue: unknown; formattedValue: string; userEnteredValue: unknown }[];
};

function Table({ data }: { data: Company[] }) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const columns = useMemo<MRT_ColumnDef<Company>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "notes",
                header: "Notes",
            },
            {
                accessorKey: "severity",
                header: "Severity",
                Cell: ({ renderedCellValue }) => {
                    return getSeverityChips(renderedCellValue as string);
                },
                filterVariant: "multi-select",
                sortingFn: (a, b, colId) => {
                    const aVal: Severity = a.getValue(colId);
                    const bVal: Severity = b.getValue(colId);
                    return SeverityList.indexOf(aVal) - SeverityList.indexOf(bVal);
                },
            },
        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data,
        enableFacetedValues: true,
        initialState: {
            isFullScreen: true,
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
        <>
            <MantineReactTable table={table} />
        </>
    );
}

export default function App() {
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
