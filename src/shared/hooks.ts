import { em, px, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";

export function useIsMobile() {
    const theme = useMantineTheme();
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: calc(${theme.breakpoints.sm} - ${em(1)}))`);
        const onChange = () => {
            setIsMobile(window.innerWidth < parseInt(px(theme.breakpoints.sm).toString()));
        };
        mql.addEventListener("change", onChange);
        setIsMobile(window.innerWidth < parseInt(px(theme.breakpoints.sm).toString()));
        return () => mql.removeEventListener("change", onChange);
    }, [theme.breakpoints.sm]);

    return !!isMobile;
}

export const Margin_Full_Width = "calc(100vw - 2 * 8px)";
