import "./MRTable.css";
import { useMantineTheme, Box, createTheme, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef, useMantineReactTable, MantineReactTable } from "mantine-react-table";
import { useState, useMemo } from "react";
import { Company, Severity, SeverityList } from "src/shared/types";
import { SeverityChip } from "./SeverityChip";
import { CompanyModal } from "./CompanyModal";

export const MRTable = ({ data, isLoading }: { data: Company[]; isLoading: boolean }) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [colVisibility, setColVisibility] = useState({});
    const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);
    const [company, setCompany] = useState(data[0]);

    const theme = useMantineTheme();

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
                    return <SeverityChip severity={renderedCellValue as string} />;
                },
                filterVariant: "multi-select",
                sortingFn: (a, b, colId) => {
                    const aVal: Severity = a.getValue(colId);
                    const bVal: Severity = b.getValue(colId);
                    return SeverityList.indexOf(aVal) - SeverityList.indexOf(bVal);
                },
            },
            {
                accessorKey: "reason",
                header: "Reason",
            },
        ],
        [],
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
        mantineTableBodyRowProps: ({ row }) => ({
            onClick: () => {
                setCompany(data[parseInt(row.id)]);
                openModal();
            },
            sx: {
                cursor: "pointer",
            },
        }),
    });

    return (
        <>
            <CompanyModal company={company} opened={modalOpened} onClose={closeModal} />
            <Box w="100%" h="100%">
                <MantineProvider theme={newTheme}>
                    <MantineReactTable table={table} />
                </MantineProvider>
            </Box>
        </>
    );
};
