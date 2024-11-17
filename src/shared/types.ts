export const SeverityList = ["No Significant Investment", "Minimal Involvement", "Moderate", "Severe"] as const;
export type SeverityTuple = typeof SeverityList;
export type Severity = SeverityTuple[number];
export type Company = {
    name: string;
    notes?: string;
    severity: string;
};
export type Cell = {
    values: { effectiveFormat: unknown; effectiveValue: unknown; formattedValue: string; userEnteredValue: unknown }[];
};
