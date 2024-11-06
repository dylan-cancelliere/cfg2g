import { useMantineTheme, Box, createTheme, MantineProvider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MRT_ColumnDef, useMantineReactTable, MantineReactTable } from "mantine-react-table";
import { useState, useEffect, useMemo } from "react";
import { Company, Severity, SeverityList } from "src/types";
import { SeverityChip } from "./SeverityChip";

export function MRTable({ data, isLoading }: { data: Company[]; isLoading: boolean }) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [colVisibility, setColVisibility] = useState({});
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

    useEffect(() => {
        if (isMobile) {
            setColVisibility({ notes: false });
        }
    }, [isMobile]);

    // Doing this to override the grid line color in the table. Surely a better way to do this???
    // see https://www.mantine-react-table.com/docs/guides/customize-components#important-theme-values-used-by-mantine-react-table
    const gray = theme.colors.gray;
    const newTheme = createTheme({
        colors: {
            gray: [gray[0], gray[1], gray[2], theme.colors.green[8], gray[4], gray[5], gray[6], gray[7], gray[8], gray[9]],
        },
    });

    const columns = useMemo<MRT_ColumnDef<Company>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                minSize: 200,
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
        enableStickyHeader: true,
        initialState: {
            isFullScreen: false,
            showColumnFilters: true,
        },
        mantineTableContainerProps: { style: { maxHeight: "73vh" } },
        mantinePaginationProps: {
            rowsPerPageOptions: ["10", "20", "50", "All"],
        },
        onPaginationChange: setPagination,
        onColumnVisibilityChange: setColVisibility,
        state: {
            pagination: {
                pageIndex: isNaN(pagination.pageSize) ? 0 : pagination.pageIndex,
                pageSize: isNaN(pagination.pageSize) ? 999 : pagination.pageSize,
            },
            columnVisibility: colVisibility,
            isLoading: isLoading,
        },
    });

    return (
        <Box w="100%" p="0 0.5rem 0.5rem 0.5rem">
            <MantineProvider theme={newTheme}>
                <MantineReactTable table={table} />
            </MantineProvider>
        </Box>
    );
}
