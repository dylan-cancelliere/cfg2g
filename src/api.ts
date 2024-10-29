import { Cell, Company } from "./types";

export const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/data`)
        .then(async (res) => {
            const { data } = await res.json();
            return data?.data?.sheets[0]?.data[0]?.rowData?.map(
                (raw: Cell) =>
                    ({
                        name: raw.values[0].formattedValue,
                        notes: raw.values[1].formattedValue,
                        severity: raw.values[2].formattedValue,
                    }) as Company,
            );
        })
        .catch((e) => console.warn("Error retrieving data:", e));
    return res as Company[];
};
