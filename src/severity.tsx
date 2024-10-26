import {
    IconAlertTriangleFilled,
    IconCircleCheck,
    IconHelpHexagonFilled,
    IconInfoCircle,
    IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import { Chip, Text } from "@mantine/core";
import { ReactNode } from "react";

export function getSeverityChips(severity: string): ReactNode {
    switch (severity) {
        case "No Significant Investment":
            return (
                <Chip checked color="green" icon={<IconCircleCheck />} classNames={{ iconWrapper: "iconWrapper" }}>
                    <Text fw={500} pl="0.2rem">
                        {severity}
                    </Text>
                </Chip>
            );
        case "Minimal Involvement":
            return (
                <Chip checked color="yellow" icon={<IconInfoCircle />} classNames={{ iconWrapper: "iconWrapper" }}>
                    <Text fw={500} pl="0.2rem">
                        {severity}
                    </Text>
                </Chip>
            );
        case "Moderate":
            return (
                <Chip checked color="orange" icon={<IconAlertTriangleFilled />} classNames={{ iconWrapper: "iconWrapper" }}>
                    <Text fw={500} pl="0.2rem">
                        {severity}
                    </Text>
                </Chip>
            );
        case "Severe":
            return (
                <Chip checked color="red" icon={<IconTriangleInvertedFilled />} classNames={{ iconWrapper: "iconWrapper" }}>
                    <Text fw={500} pl="0.2rem">
                        {severity}
                    </Text>
                </Chip>
            );
        default:
            return (
                <Chip checked color="grey" icon={<IconHelpHexagonFilled />} classNames={{ iconWrapper: "iconWrapper" }}>
                    <Text fw={500} pl="0.2rem">
                        {severity}
                    </Text>
                </Chip>
            );
    }
}
