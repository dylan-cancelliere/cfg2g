import { ReactNode } from "react";

export const SeverityList = ["No Significant Involvement", "Minimal Involvement", "Moderate", "Severe"] as const;
export type SeverityTuple = typeof SeverityList;
export type Severity = SeverityTuple[number];
export type Company = {
    name: string;
    severity: string;
    reason?: string;
    sources: { length: number; component: ReactNode };
    notes?: string;
    tags: string[];
};
export type Cell = {
    values: {
        effectiveFormat: unknown;
        effectiveValue: unknown;
        formattedValue: string;
        userEnteredValue: unknown;
        textFormatRuns?: {
            startIndex?: number;
            format: {
                link?: {
                    uri: string;
                };
            };
        }[];
    }[];
};
