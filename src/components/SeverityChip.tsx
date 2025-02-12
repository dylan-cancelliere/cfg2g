import {
    IconAlertTriangleFilled,
    IconCircleCheck,
    IconHelpHexagonFilled,
    IconInfoCircle,
    IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import { Chip, Text } from "@mantine/core";
import { ReactNode } from "react";

const TableChip = ({ text, color, icon, hideText }: { text: string; color: string; icon: ReactNode; hideText?: boolean }) => {
    return (
        <Chip
            checked
            color={color}
            icon={icon}
            styles={{ iconWrapper: { padding: "1rem 0" }, label: { margin: "auto" } }}
            tabIndex={-1}
            style={{ cursor: "default" }}
            component="div"
            w={hideText ? "100%" : "min-content"}
            display="flex"
        >
            {!hideText && (
                <Text fw={500} pl="0.2rem">
                    {text}
                </Text>
            )}
        </Chip>
    );
};

export const SeverityChip = ({ severity, hideText }: { severity: string; hideText?: boolean }) => {
    switch (severity) {
        case "No Significant Involvement":
            return <TableChip text={severity} color="green" icon={<IconCircleCheck />} hideText={hideText} />;
        case "Minimal Involvement":
            return <TableChip text={severity} color="yellow" icon={<IconInfoCircle />} hideText={hideText} />;
        case "Moderate":
            return <TableChip text={severity} color="orange" icon={<IconAlertTriangleFilled />} hideText={hideText} />;
        case "Severe":
            return <TableChip text={severity} color="#d8070b" icon={<IconTriangleInvertedFilled />} hideText={hideText} />;
        default:
            return <TableChip text={severity} color="grey" icon={<IconHelpHexagonFilled />} hideText={hideText} />;
    }
};
