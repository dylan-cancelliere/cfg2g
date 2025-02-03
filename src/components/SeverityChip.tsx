import {
    IconAlertTriangleFilled,
    IconCircleCheck,
    IconHelpHexagonFilled,
    IconInfoCircle,
    IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import { Chip, Text } from "@mantine/core";
import { ReactNode } from "react";

const TableChip = ({ text, color, icon }: { text: string; color: string; icon: ReactNode }) => {
    return (
        <Chip
            checked
            color={color}
            icon={icon}
            classNames={{ iconWrapper: "iconWrapper" }}
            tabIndex={-1}
            style={{ cursor: "default" }}
            component="div"
        >
            <Text fw={500} pl="0.2rem">
                {text}
            </Text>
        </Chip>
    );
};

export const SeverityChip = ({ severity }: { severity: string }) => {
    switch (severity) {
        case "No Significant Involvement":
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
};
