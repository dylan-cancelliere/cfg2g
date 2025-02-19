import { ReactNode } from "react";
import { Cell, Company } from "./types";
import { Anchor, Text } from "@mantine/core";
import { MRT_ColumnFiltersState, MRT_SortingState } from "mantine-react-table";

export const paginatedChunkSize = 10;

type ApiResponse = {
    data: Cell[];
    meta: {
        totalRowCount: number;
    };
};

const parseLink = (raw: Cell["values"][0]) => {
    const formattedLinks: ReactNode[] = [];
    const runs = raw.textFormatRuns;
    if (runs && runs.length > 0) {
        let endIndex: number | undefined;
        for (let i = 0; i < runs.length; i++) {
            const run = runs[i];
            endIndex = i + 1 == runs.length ? undefined : runs[i + 1].startIndex;
            const text = raw.formattedValue.substring(run.startIndex ?? 0, endIndex);
            if (run.format.link) {
                formattedLinks.push(
                    <Anchor key={`[${text}](${run.format.link.uri})`} href={run.format.link.uri} target="_blank" style={{}} c="blue">
                        {text}
                    </Anchor>,
                );
            } else {
                formattedLinks.push(text);
            }
        }
    }
    return { length: formattedLinks.length, component: <Text>{formattedLinks}</Text> };
};

export function parseSheetData(data?: Cell[]) {
    return (
        data?.map(
            (raw: Cell) =>
                ({
                    name: raw.values[1].formattedValue,
                    severity: raw.values[2].formattedValue,
                    reason: raw.values[3].formattedValue,
                    sources: parseLink(raw.values[4]),
                    notes: raw.values[5].formattedValue,
                    tags: raw.values[6].formattedValue.split(", "),
                }) as Company,
        ) ?? []
    );
}

export async function fetchTagsQueryFn(signal: AbortSignal) {
    const url = new URL("/tags", import.meta.env.VITE_BASE_URL);
    const res = await fetch(url.href, { signal });
    const json = await res.json();
    return json as { tags: string[] };
}

export async function infiniteQueryFn({
    pageParam = 0,
    signal,
    columnFilters,
    globalFilter,
    sorting,
}: {
    pageParam: number;
    signal: AbortSignal;
    columnFilters: MRT_ColumnFiltersState;
    globalFilter?: string;
    sorting: MRT_SortingState;
}) {
    const url = new URL("/data", import.meta.env.VITE_BASE_URL);
    url.searchParams.set("offset", `${pageParam * paginatedChunkSize}`);
    url.searchParams.set("limit", `${paginatedChunkSize}`);
    if (columnFilters.length > 0) url.searchParams.set("filters", JSON.stringify(columnFilters));
    if (globalFilter) url.searchParams.set("globalFilter", globalFilter);
    if (sorting.length > 0) url.searchParams.set("sorting", JSON.stringify(sorting));

    const response = await fetch(url.href, { signal });
    const json = await response.json();
    return json as ApiResponse;
}
