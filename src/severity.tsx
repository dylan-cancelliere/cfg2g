import {
    IconAlertTriangleFilled,
    IconCircleCheck,
    IconHelpHexagonFilled,
    IconInfoCircle,
    IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import { Chip, Popover, Text } from "@mantine/core";
import { ReactNode } from "react";

export function TableChip({ text, color, isMobile, icon }: { text: string; color: string; isMobile: boolean; icon: ReactNode }) {
    return isMobile ? (
        <Popover>
            <Popover.Target>
                <Chip checked color={color} icon={icon} classNames={{ iconWrapper: "iconWrapper" }}>
                    {" "}
                </Chip>
            </Popover.Target>
            <Popover.Dropdown>{text}</Popover.Dropdown>
        </Popover>
    ) : (
        <Chip checked color={color} icon={icon} classNames={{ iconWrapper: "iconWrapper" }}>
            <Text fw={500} pl="0.2rem">
                {text}
            </Text>
        </Chip>
    );
}

export function SeverityChip({ severity, isMobile }: { severity: string; isMobile: boolean }) {
    switch (severity) {
        case "No Significant Investment":
            return <TableChip text={severity} color="green" isMobile={isMobile} icon={<IconCircleCheck />} />;
        case "Minimal Involvement":
            return <TableChip text={severity} color="yellow" isMobile={isMobile} icon={<IconInfoCircle />} />;
        case "Moderate":
            return <TableChip text={severity} color="orange" isMobile={isMobile} icon={<IconAlertTriangleFilled />} />;
        case "Severe":
            return <TableChip text={severity} color="red" isMobile={isMobile} icon={<IconTriangleInvertedFilled />} />;
        default:
            return <TableChip text={severity} color="grey" isMobile={isMobile} icon={<IconHelpHexagonFilled />} />;
    }
}
