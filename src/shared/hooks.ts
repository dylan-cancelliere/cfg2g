import { px, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";

export const useIsMobile = () => {
    const theme = useMantineTheme();
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: 961px)`);
        const onChange = () => {
            setIsMobile(window.innerWidth < parseInt(px(theme.breakpoints.sm).toString()));
        };
        mql.addEventListener("change", onChange);
        setIsMobile(window.innerWidth < 962);
        return () => mql.removeEventListener("change", onChange);
    }, [theme.breakpoints.sm]);

    return !!isMobile;
};
