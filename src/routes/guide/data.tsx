import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
    ActionIcon,
    Anchor,
    Box,
    Button,
    Chip,
    Group,
    Image,
    Modal,
    MultiSelect,
    Stack,
    Text,
    TextInput,
    Title,
    Tooltip,
    useMantineTheme,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
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

const FilterModal = ({ opened, onClose, onNameChange }: { opened: boolean; onClose: () => void; onNameChange: (name: string) => void }) => {
    const nav = Route.useNavigate();
    const theme = useMantineTheme();
    const { filters, keyword } = Route.useSearch();

    const { data, isLoading } = useQuery({ queryKey: ["tags"], queryFn: ({ signal }) => fetchTagsQueryFn(signal) });

    const initialValues = useMemo(
        () => ({
            name:
                filters
                    ?.filter((f) => f.id == "name")
                    .map((f) => f.value as string)
                    .join() ?? "",
            severity:
                filters
                    ?.filter((f) => f.id == "severity")
                    .map((f) => f.value as string[])
                    .flat() ?? [],
            reason:
                filters
                    ?.filter((f) => f.id == "reason")
                    .map((f) => f.value as string)
                    .join() ?? "",
            tags:
                filters
                    ?.filter((f) => f.id == "tags")
                    .map((f) => f.value as string[])
                    .flat() ?? [],
            keyword: keyword ?? "",
        }),
        [filters, keyword],
    );

    const { isDirty, getInputProps, onSubmit, setValues, setInitialValues } = useForm({
        mode: "controlled",
        initialValues,
    });

    useEffect(() => {
        setInitialValues(initialValues);
        setValues(initialValues);
    }, [filters, keyword, initialValues, setValues, setInitialValues]);

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            withCloseButton={false}
            centered
            styles={{ body: { backgroundColor: theme.colors.green[0] } }}
        >
            <form
                onSubmit={onSubmit((data) => {
                    const returnFilters: MRT_ColumnFiltersState = [];

                    if (data.severity.length > 0) returnFilters.push({ id: "severity", value: data.severity });
                    if (data.reason.length > 0) returnFilters.push({ id: "reason", value: data.reason });
                    if (data.tags.length > 0) returnFilters.push({ id: "tags", value: data.tags });
                    nav({
                        search: (prev) => ({
                            ...prev,
                            filters: returnFilters.length > 0 ? returnFilters : undefined,
                            keyword: data.keyword.length > 0 ? data.keyword : undefined,
                        }),
                        replace: true,
                    });
                    onClose();
                    if (data.name.length > 0) onNameChange(data.name);
                })}
            >
                <Stack>
                    <TextInput placeholder="Enter company name..." label="Company Name" {...getInputProps("name")} />
                    <MultiSelect data={SeverityList} placeholder="Pick severity..." label="Severity" {...getInputProps("severity")} />
                    <TextInput placeholder="Enter reason..." label="Reason" {...getInputProps("reason")} />
                    <MultiSelect
                        data={data?.tags}
                        disabled={isLoading}
                        label="Tags"
                        placeholder="Pick tags..."
                        {...getInputProps("tags")}
                    />
                    <TextInput
                        placeholder="Enter keyword"
                        label="Keyword"
                        description="Searches all columns and tags"
                        {...getInputProps("keyword")}
                    />
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
        </Modal>
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

const TableHeader = () => {
    const nav = Route.useNavigate();
    const theme = useMantineTheme();
    const { filters, keyword } = Route.useSearch();
    const [nameFilter, setNameFilter] = useState((filters?.find((filter) => filter.id == "name")?.value as string | undefined) ?? "");
    const [debouncedName] = useDebouncedValue(nameFilter, 500);
    const [opened, { open, close }] = useDisclosure();

    useEffect(() => {
        const maybeNameFilter = filters?.find((f) => f.id == "name")?.value as string | undefined;
        if ((maybeNameFilter ?? "") == debouncedName) return;

        nav({
            search: (prev) => {
                const newName = debouncedName.length ? debouncedName : undefined;
                const hasNameFilter = prev.filters?.some((f) => f.id == "name");
                const newFilters: MRT_ColumnFiltersState = [];
                if (prev?.filters) newFilters.push(...prev.filters);
                return {
                    ...prev,
                    filters: newName
                        ? hasNameFilter
                            ? newFilters.map((f) => (f.id == "name" ? { id: "name", value: newName } : f))
                            : newFilters.concat({ id: "name", value: newName })
                        : newFilters.filter((f) => f.id != "name"),
                };
            },
        });
    }, [nav, debouncedName, filters]);

    useEffect(() => {
        const maybeNameFilter = filters?.find((f) => f.id == "name")?.value as string | undefined;
        setNameFilter(maybeNameFilter ?? "");
    }, [filters]);

    return (
        <>
            <FilterModal opened={opened} onClose={close} onNameChange={setNameFilter} />
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
                    <ActionIcon variant="transparent" color="var(--mantine-color-text)" onClick={open}>
                        <IconFilter />
                    </ActionIcon>
                </Tooltip>
                <TextInput
                    leftSection={<IconSearch />}
                    placeholder="Search..."
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.currentTarget.value)}
                    miw={100}
                />
                {(filters?.length ?? 0) > 0 && (
                    <Button
                        variant="subtle"
                        w="min-content"
                        style={{ flexShrink: 0 }}
                        leftSection={<IconX size={16} />}
                        color={theme.colors.green[8]}
                        onClick={() => nav({ search: (prev) => ({ ...prev, filters: undefined, keyword: undefined }) })}
                    >
                        Clear Filters
                    </Button>
                )}
                {!!keyword && (
                    <FilterChip
                        label={`Keyword: ${keyword}`}
                        onRemove={() =>
                            nav({
                                search: (prev) => ({
                                    ...prev,
                                    keyword: undefined,
                                }),
                            })
                        }
                    />
                )}
                {filters?.map((f) =>
                    f.id == "severity" || f.id == "tags" ? (
                        (f.value as string[]).map((val) => (
                            <FilterChip
                                label={`${capitalize(f.id)}: ${val}`}
                                onRemove={() => {
                                    nav({
                                        search: (prev) => ({
                                            ...prev,
                                            filters:
                                                (f.value as string[]).length > 1
                                                    ? filters.map((col) =>
                                                          col.id == f.id
                                                              ? { id: col.id, value: (col.value as string[]).filter((c) => c != val) }
                                                              : col,
                                                      )
                                                    : filters.filter((col) => col.id != f.id),
                                        }),
                                    });
                                }}
                                key={val}
                            />
                        ))
                    ) : (
                        <FilterChip
                            label={`${capitalize(f.id)}: ${f.value}`}
                            onRemove={() => {
                                if (f.id == "name") setNameFilter("");
                                else
                                    nav({
                                        search: (prev) => ({
                                            ...prev,
                                            filters: filters.filter((col) => col.id != f.id),
                                        }),
                                    });
                            }}
                            key={f.value as string}
                        />
                    ),
                )}
            </Group>
        </>
    );
};

const CareerFairTable = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

    const nav = Route.useNavigate();
    const theme = useMantineTheme();
    const isMobile = useIsMobile();
    const { filters, sorting: initialSorting, keyword } = Route.useSearch();

    const [company, setCompany] = useState<Company>();
    const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);
    const [sorting, setSorting] = useState<MRT_SortingState>(initialSorting ?? []);

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
        queryKey: ["table-data", filters, sorting, keyword],
        queryFn: ({ pageParam, signal }) =>
            infiniteQueryFn({ pageParam, signal, columnFilters: filters ?? [], sorting, globalFilter: keyword }),
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
                filters: (filters?.length ?? 0) > 0 ? filters : undefined,
                keyword: (keyword?.length ?? 0) > 0 ? keyword : undefined,
            },
            replace: true,
        });
    }, [nav, sorting, filters, keyword]);

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
                    <TableHeader />
                    <MRT_TableContainer table={table} style={{ borderRadius: "var(--mantine-radius-default)" }} h="78vh" />
                </Box>
            </Box>
        </>
    );
};

type TableSearchParams = {
    filters?: MRT_ColumnFiltersState;
    sorting?: MRT_SortingState;
    keyword?: string;
};

export const Route = createFileRoute("/guide/data")({
    pendingComponent: CareerFairTable,
    staleTime: 600000, // Invalidate cache after 10 mins
    component: CareerFairTable,
    errorComponent: ErrorComponent,
    validateSearch: (search: Record<string, unknown>): TableSearchParams => ({
        filters: (search.filters as MRT_ColumnFiltersState) || undefined,
        sorting: (search.sorting as MRT_SortingState) || undefined,
        keyword: (search.keyword as string) || undefined,
    }),
});
