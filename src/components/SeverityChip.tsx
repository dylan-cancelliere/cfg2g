import {
    IconAlertTriangleFilled,
    IconCircleCheck,
    IconHelpHexagonFilled,
    IconInfoCircle,
    IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import { Chip, Text } from "@mantine/core";
import { ReactNode } from "react";

function TableChip({ text, color, icon }: { text: string; color: string; icon: ReactNode }) {
    return (
        <Chip checked color={color} icon={icon} classNames={{ iconWrapper: "iconWrapper" }}>
            <Text fw={500} pl="0.2rem">
                {text}
            </Text>
        </Chip>
    );
}

export function SeverityChip({ severity }: { severity: string }) {
    switch (severity) {
        case "No Significant Investment":
            return <TableChip text={severity} color="green" icon={<IconCircleCheck />} />;
        case "Minimal Involvement":
            return <TableChip text={severity} color="yellow" icon={<IconInfoCircle />} />;
        case "Moderate":
            return <TableChip text={severity} color="orange" icon={<IconAlertTriangleFilled />} />;
        case "Severe":
            return <TableChip text={severity} color="red" icon={<IconTriangleInvertedFilled />} />;
        default:
            return <TableChip text={severity} color="grey" icon={<IconHelpHexagonFilled />} />;
    }
}
