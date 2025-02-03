import "./MRTable.css";
import { useMantineTheme, Box, createTheme, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    MRT_ColumnDef,
    useMantineReactTable,
    MantineReactTable,
    MRT_RowVirtualizer,
    MRT_ColumnFiltersState,
    MRT_SortingState,
} from "mantine-react-table";
import { useState, useMemo, useRef, useCallback, useEffect, type UIEvent } from "react";
import { Company } from "src/shared/types";
import { SeverityChip } from "./SeverityChip";
import { CompanyModal } from "./CompanyModal";
import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteQueryFn, parseSheetData } from "src/shared/api";

const TABLE_HEIGHT = "calc(86vh - 0.5rem)";

export const MRTable = () => {
    const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);
    const [company, setCompany] = useState<Company>();

    const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events
    const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState<string>();
    const [sorting, setSorting] = useState<MRT_SortingState>([]);

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
                enableSorting: false,
            },
            {
                accessorKey: "reason",
                header: "Reason",
                enableSorting: false,
            },
        ],
        [],
    );

    const { data, fetchNextPage, isError, isFetching, isLoading } = useInfiniteQuery({
        queryKey: ["table-data", columnFilters, globalFilter, sorting],
        queryFn: ({ pageParam, signal }) => infiniteQueryFn({ pageParam, signal, columnFilters, globalFilter, sorting }),
        getNextPageParam: (_lastGroup, groups) => groups.length,
        initialPageParam: 0,
        refetchOnWindowFocus: false,
        staleTime: 600_000, // 10 mins
    });
    const flatData = useMemo(() => data?.pages.flatMap((page) => parseSheetData(page.data)) ?? [], [data]);
    const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
    const totalFetched = flatData.length;

    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
                //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
                if (scrollHeight - scrollTop - clientHeight < 400 && !isFetching && totalFetched < totalDBRowCount) {
                    fetchNextPage();
                }
            }
        },
        [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
    );

    useEffect(() => {
        if (rowVirtualizerInstanceRef.current) {
            try {
                rowVirtualizerInstanceRef.current.scrollToIndex(0);
            } catch (e) {
                console.error(e);
            }
        }
    }, [sorting, columnFilters, globalFilter]);

    useEffect(() => {
        fetchMoreOnBottomReached(tableContainerRef.current);
    }, [fetchMoreOnBottomReached]);

    const table = useMantineReactTable({
        columns,
        data: flatData,
        enablePagination: false,
        enableFacetedValues: true,
        enableStickyHeader: true,
        enableBottomToolbar: false,
        enableTopToolbar: false,
        manualFiltering: true,
        manualSorting: true,
        initialState: {
            isFullScreen: false,
            showColumnFilters: true,
        },
        mantineTableContainerProps: {
            ref: tableContainerRef,
            style: { height: TABLE_HEIGHT, maxHeight: TABLE_HEIGHT },
            onScroll: (event: UIEvent<HTMLDivElement>) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
        },
        mantineToolbarAlertBannerProps: {
            color: "red",
            children: "Error loading data",
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            showAlertBanner: isError,
            showProgressBars: isFetching,
            sorting,
        },
        mantineTableBodyRowProps: ({ row }) => ({
            onClick: () => {
                setCompany(flatData[parseInt(row.id)]);
                openModal();
            },
            style: {
                cursor: "pointer",
            },
        }),
    });

    return (
        <>
            {!!company && <CompanyModal company={company} opened={modalOpened} onClose={closeModal} />}
            <Box w="100%" h="100%">
                <MantineProvider theme={newTheme}>
                    <MantineReactTable table={table} />
                </MantineProvider>
            </Box>
        </>
    );
};
