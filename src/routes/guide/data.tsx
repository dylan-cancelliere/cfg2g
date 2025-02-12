import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
    ActionIcon,
    Anchor,
    Box,
    Button,
    Chip,
    Group,
    Image,
    MultiSelect,
    Stack,
    Text,
    TextInput,
    Title,
    Tooltip,
    useMantineTheme,
} from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
    MRT_ColumnDef,
    MRT_ColumnFiltersState,
    MRT_RowVirtualizer,
    MRT_SortingState,
    MRT_TableContainer,
    useMantineReactTable,
} from "mantine-react-table";
import { useState, useRef, useMemo, useCallback, useEffect, type UIEvent } from "react";
import { CompanyModal } from "src/components/CompanyModal";
import { SeverityChip } from "src/components/SeverityChip";
import { fetchTagsQueryFn, infiniteQueryFn, parseSheetData } from "src/shared/api";
import { Company, SeverityList } from "src/shared/types";
import classes from "./data.module.css";
import { useIsMobile } from "src/shared/hooks";
import { IconFilter, IconSearch, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useForm } from "@mantine/form";
import { capitalize } from "src/shared/fns";

const ErrorComponent = () => {
    const theme = useMantineTheme();

    return (
        <Stack h="100%" w="100%" p="sm" align="center" justify="center">
            <Image maw={300} mah={300} src="/logo.png" style={{ filter: "drop-shadow(0 0 0.75rem rgba(149, 157, 165, 0.2))" }} />
            <Title ff="Noe Bold" c={theme.colors.green[8]}>
                You've run into an error
            </Title>
            <Text>
                Check the website discussion channel in the <Anchor href="https://discord.gg/hVAYhyu326">Discord</Anchor> for updates on the
                timeline for a fix
            </Text>
        </Stack>
    );
};

const TABLE_HEIGHT = "calc(86vh - 0.5rem)";

const FilterForm = ({
    filters,
    handleSubmit,
}: {
    filters: MRT_ColumnFiltersState;
    handleSubmit: (data: MRT_ColumnFiltersState) => void;
}) => {
    const theme = useMantineTheme();

    const { data, isLoading } = useQuery({ queryKey: ["tags"], queryFn: ({ signal }) => fetchTagsQueryFn(signal) });

    const { isDirty, getInputProps, onSubmit } = useForm({
        mode: "uncontrolled",
        initialValues: {
            name: filters
                .filter((f) => f.id == "name")
                .map((f) => f.value)
                .join(),
            severity: filters
                .filter((f) => f.id == "severity")
                .map((f) => f.value)
                .flat(),
            reason: filters
                .filter((f) => f.id == "reason")
                .map((f) => f.value)
                .join(),
            tags: filters
                .filter((f) => f.id == "tags")
                .map((f) => f.value)
                .flat(),
        },
    });

    return (
        <form
            onSubmit={onSubmit((data) => {
                const returnData = [];
                if (data.name.length > 0) returnData.push({ id: "name", value: data.name });
                if (data.severity.length > 0) returnData.push({ id: "severity", value: data.severity });
                if (data.reason.length > 0) returnData.push({ id: "reason", value: data.reason });
                if (data.tags.length > 0) returnData.push({ id: "tags", value: data.tags });
                handleSubmit(returnData);
                modals.closeAll();
            })}
        >
            <Stack>
                <TextInput placeholder="Enter company name..." label="Company Name" {...getInputProps("name")} />
                <MultiSelect data={SeverityList} placeholder="Pick severity..." label="Severity" {...getInputProps("severity")} />
                <TextInput placeholder="Enter reason..." label="Reason" {...getInputProps("reason")} />
                <MultiSelect data={data?.tags} disabled={isLoading} label="Tags" placeholder="Pick tags..." {...getInputProps("tags")} />
                <Group w="100%">
                    <Button
                        variant="outline"
                        color={theme.colors.green[8]}
                        onClick={() => {
                            modals.closeAll();
                        }}
                        style={{ flexGrow: 1 }}
                    >
                        Cancel
                    </Button>
                    <Button disabled={!isDirty()} color={theme.colors.green[8]} type="submit" style={{ flexGrow: 1 }}>
                        Save
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};

const FilterChip = ({ label, onRemove }: { label: string; onRemove: () => void }) => {
    const theme = useMantineTheme();

    return (
        <Chip checked color={theme.colors.green[2]} icon={<IconX size={16} onClick={onRemove} />}>
            {label}
        </Chip>
    );
};

const TableHeader = ({
    columnFilters,
    initialGlobalFilter,
    onColumnFilterChange,
    onGlobalFilterChange,
}: {
    columnFilters: MRT_ColumnFiltersState;
    initialGlobalFilter: string;
    onColumnFilterChange: (filters: MRT_ColumnFiltersState) => void;
    onGlobalFilterChange: (filter: string) => void;
}) => {
    const theme = useMantineTheme();

    function openModal() {
        modals.open({
            children: <FilterForm filters={columnFilters} handleSubmit={onColumnFilterChange} />,
            withCloseButton: false,
            styles: { body: { backgroundColor: theme.colors.green[0] } },
            centered: true,
        });
    }

    return (
        <Group
            p="sm"
            pb="5px"
            wrap="nowrap"
            style={{
                backgroundColor: theme.colors.green[0],
                borderRadius: "var(--mantine-radius-default)",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                overflowX: "auto",
            }}
        >
            <Tooltip label="Show Filters">
                <ActionIcon variant="transparent" color="var(--mantine-color-text)" onClick={openModal}>
                    <IconFilter />
                </ActionIcon>
            </Tooltip>
            <TextInput
                leftSection={<IconSearch />}
                placeholder="Search..."
                defaultValue={initialGlobalFilter}
                onChange={(e) => onGlobalFilterChange(e.currentTarget.value)}
                miw={100}
            />
            {columnFilters.length > 0 && (
                <Button
                    variant="subtle"
                    w="min-content"
                    style={{ flexShrink: 0 }}
                    leftSection={<IconX size={16} />}
                    color={theme.colors.green[8]}
                    onClick={() => onColumnFilterChange([])}
                >
                    Clear Filters
                </Button>
            )}
            {columnFilters.map((f) =>
                f.id == "severity" || f.id == "tags" ? (
                    (f.value as string[]).map((val) => (
                        <FilterChip
                            label={`${capitalize(f.id)}: ${val}`}
                            onRemove={() => {
                                if ((f.value as string[]).length > 1) {
                                    onColumnFilterChange(
                                        columnFilters.map((col) =>
                                            col.id == f.id ? { id: col.id, value: (col.value as string[]).filter((c) => c != val) } : col,
                                        ),
                                    );
                                } else {
                                    onColumnFilterChange(columnFilters.filter((col) => col.id != f.id));
                                }
                            }}
                            key={val}
                        />
                    ))
                ) : (
                    <FilterChip
                        label={`${capitalize(f.id)}: ${f.value}`}
                        onRemove={() => onColumnFilterChange(columnFilters.filter((col) => col.id != f.id))}
                        key={f.value as string}
                    />
                ),
            )}
        </Group>
    );
};

const CareerFairTable = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

    const nav = useNavigate({ from: Route.fullPath });
    const theme = useMantineTheme();
    const isMobile = useIsMobile();
    const { filters: initialFilters, sorting: initialSorting, global: initialGlobal } = Route.useSearch();

    const [company, setCompany] = useState<Company>();
    const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);
    const [sorting, setSorting] = useState<MRT_SortingState>(initialSorting ?? []);
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(initialFilters ?? []);
    const [globalFilter, setGlobalFilter] = useDebouncedState(initialGlobal ?? "", 500);

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
                    return (
                        <SeverityChip
                            severity={
                                // @ts-expect-error this seems to have randomly changed from always a string to sometimes a node.
                                // should investigate why at some point
                                typeof renderedCellValue == "string" ? renderedCellValue : (renderedCellValue.props.children as string)
                            }
                            hideText={isMobile}
                        />
                    );
                },
                size: isMobile ? 115 : 275,
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
        queryKey: ["table-data", columnFilters, sorting, globalFilter],
        queryFn: ({ pageParam, signal }) => infiniteQueryFn({ pageParam, signal, columnFilters, sorting, globalFilter }),
        getNextPageParam: (_lastGroup, groups) => groups.length,
        initialPageParam: 0,
        refetchOnWindowFocus: false,
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
            search: {
                sorting: sorting.length > 0 ? sorting : undefined,
                filters: columnFilters.length > 0 ? columnFilters : undefined,
                global: globalFilter.length > 0 ? globalFilter : undefined,
            },
        });
    }, [nav, sorting, columnFilters, globalFilter]);

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
        manualSorting: true,
        enableFilters: false,
        initialState: {
            isFullScreen: false,
        },
        mantinePaperProps: {
            className: classes.root,
        },
        mantineTableContainerProps: {
            ref: tableContainerRef,
            style: { height: TABLE_HEIGHT, maxHeight: TABLE_HEIGHT },
            onScroll: (event: UIEvent<HTMLDivElement>) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
        },
        onSortingChange: setSorting,
        state: {
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
            <Box
                mah="86vh"
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
                <Box
                    w="100%"
                    h="min-content"
                    mah="100%"
                    style={{
                        border: `1px solid ${theme.colors.green[8]}`,
                        borderRadius: "var(--mantine-radius-default)",
                    }}
                >
                    <TableHeader
                        columnFilters={columnFilters}
                        initialGlobalFilter={initialGlobal ?? ""}
                        onColumnFilterChange={setColumnFilters}
                        onGlobalFilterChange={setGlobalFilter}
                    />
                    <MRT_TableContainer table={table} style={{ borderRadius: "var(--mantine-radius-default)" }} h="78vh" />
                </Box>
            </Box>
        </>
    );
};

type TableSearchParams = {
    filters?: MRT_ColumnFiltersState;
    sorting?: MRT_SortingState;
    global?: string;
};

export const Route = createFileRoute("/guide/data")({
    pendingComponent: CareerFairTable,
    staleTime: 600000, // Invalidate cache after 10 mins
    component: CareerFairTable,
    errorComponent: ErrorComponent,
    validateSearch: (search: Record<string, unknown>): TableSearchParams => ({
        filters: (search.filters as MRT_ColumnFiltersState) || undefined,
        sorting: (search.sorting as MRT_SortingState) || undefined,
        global: (search.global as string) || undefined,
    }),
});
