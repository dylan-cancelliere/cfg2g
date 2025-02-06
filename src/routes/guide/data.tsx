import { useDisclosure } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Anchor, Box, createTheme, Image, MantineProvider, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
    MantineReactTable,
    MRT_ColumnDef,
    MRT_ColumnFiltersState,
    MRT_RowVirtualizer,
    MRT_SortingState,
    useMantineReactTable,
} from "mantine-react-table";
import { useState, useRef, useMemo, useCallback, useEffect, type UIEvent } from "react";
import { CompanyModal } from "src/components/CompanyModal";
import { SeverityChip } from "src/components/SeverityChip";
import { infiniteQueryFn, parseSheetData } from "src/shared/api";
import { Company, SeverityList } from "src/shared/types";
import classes from "./data.module.css";
import { useIsMobile } from "src/shared/hooks";

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

const TABLE_HEIGHT = "calc(86vh - 0.5rem)";

export const MRTable = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

    const nav = useNavigate({ from: Route.fullPath });
    const theme = useMantineTheme();
    const isMobile = useIsMobile();
    const { filters: initialFilters, sorting: initialSorting } = Route.useSearch();

    const [company, setCompany] = useState<Company>();
    const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);
    const [sorting, setSorting] = useState<MRT_SortingState>(initialSorting ?? []);
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(initialFilters ?? []);

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
                    return <SeverityChip severity={renderedCellValue as string} hideText={isMobile} />;
                },
                filterVariant: "multi-select",
                mantineFilterMultiSelectProps: () => {
                    return { data: SeverityList, placeholder: isMobile ? "Severity" : "Filter by Severity" };
                },
                size: isMobile ? 115 : 275,
                // minSize: isMobile ? 110 : 275,
                grow: false,
            },
            {
                accessorKey: "reason",
                header: "Reason",
                enableSorting: false,
                grow: true,
            },
        ],
        [isMobile],
    );

    const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery({
        queryKey: ["table-data", columnFilters, sorting],
        queryFn: ({ pageParam, signal }) => infiniteQueryFn({ pageParam, signal, columnFilters, sorting }),
        getNextPageParam: (_lastGroup, groups) => groups.length,
        initialPageParam: 0,
        refetchOnWindowFocus: false,
        staleTime: 600_000, // 10 mins
        throwOnError: true,
    });
    const flatData = useMemo(() => data?.pages.flatMap((page) => parseSheetData(page.data)) ?? [], [data]);
    const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
    const totalFetched = flatData.length;

    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
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

        nav({
            search: { sorting: sorting.length > 0 ? sorting : undefined, filters: columnFilters.length > 0 ? columnFilters : undefined },
        });
    }, [nav, sorting, columnFilters]);

    useEffect(() => {
        fetchMoreOnBottomReached(tableContainerRef.current);
    }, [fetchMoreOnBottomReached]);

    const table = useMantineReactTable({
        columns,
        data: flatData,
        enablePagination: false,
        enableStickyHeader: true,
        enableBottomToolbar: false,
        enableTopToolbar: false,
        enableColumnActions: false,
        manualFiltering: true,
        manualSorting: true,
        initialState: {
            isFullScreen: false,
            showColumnFilters: true,
        },
        mantinePaperProps: {
            className: classes.root,
        },
        mantineTableContainerProps: {
            ref: tableContainerRef,
            style: { height: TABLE_HEIGHT, maxHeight: TABLE_HEIGHT },
            onScroll: (event: UIEvent<HTMLDivElement>) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
        },
        onColumnFiltersChange: (data) => {
            setColumnFilters(data);
        },
        onSortingChange: setSorting,
        state: {
            columnFilters,
            isLoading,
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
        layoutMode: "grid",
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

type TableSearchParams = {
    filters?: MRT_ColumnFiltersState;
    sorting?: MRT_SortingState;
};

export const Route = createFileRoute("/guide/data")({
    pendingComponent: CareerFairTable,
    staleTime: 600000, // Invalidate cache after 10 mins
    component: CareerFairTable,
    errorComponent: ErrorComponent,
    validateSearch: (search: Record<string, unknown>): TableSearchParams => ({
        filters: (search.filters as MRT_ColumnFiltersState) || undefined,
        sorting: (search.sorting as MRT_SortingState) || undefined,
    }),
});
