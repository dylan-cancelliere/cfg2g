import { ReactNode } from "react";
import { Cell, Company } from "./types";
import { Anchor, Text } from "@mantine/core";

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

export const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/data`)
        .then(async (res) => {
            const { data } = await res.json();
            return data?.data?.sheets[0]?.data[0]?.rowData?.map(
                (raw: Cell) =>
                    ({
                        name: raw.values[1].formattedValue,
                        severity: raw.values[2].formattedValue,
                        reason: raw.values[3].formattedValue,
                        sources: parseLink(raw.values[4]),
                        notes: raw.values[5].formattedValue,
                    }) as Company,
            );
        })
        .catch((e) => console.warn("Error retrieving data:", e));
    return res as Company[];
};
