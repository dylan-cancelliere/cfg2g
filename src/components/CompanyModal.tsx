import { Divider, Group, Modal, rem, Stack, Text, Title } from "@mantine/core";
import { SeverityChip } from "./SeverityChip";
import { Company } from "src/shared/types";
import { ReactNode } from "react";

export type CompanyModalProps = {
    opened: boolean;
    onClose: () => void;
    company: Company;
};

const TextContainer = ({ children }: { children: ReactNode }) => {
    return (
        <Stack
            flex={10}
            maw="75%"
            mah={rem(200)}
            style={{
                backgroundColor: "var(--mantine-color-white)",
                border: "calc(0.0625rem* var(--mantine-scale)) solid var(--mantine-color-gray-4)",
                borderRadius: rem(4),
                padding: `${rem(5.5)} ${rem(12)}`,
                overflowY: "auto",
            }}
        >
            {children}
        </Stack>
    );
};

export function CompanyModal({ opened, onClose, company }: CompanyModalProps) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            style={{ backgroundColor: "var(--mantine-color-green-0)" }}
            size="xl"
            withCloseButton={false}
            centered
        >
            <Modal.Title>
                <Group
                    style={{ backgroundColor: "var(--mantine-color-green-0)", overflow: "auto" }}
                    h={rem(100)}
                    w="100%"
                    p="md"
                    justify="space-around"
                    wrap="nowrap"
                >
                    <Title order={3}>{company.name}</Title>
                    <SeverityChip severity={company.severity} />
                </Group>
                <Divider mx="md" color="var(--mantine-color-green-8)" />
            </Modal.Title>
            <Modal.Body style={{ backgroundColor: "var(--mantine-color-green-0)", rowGap: "2rem", overflowY: "auto" }} pt="md">
                <Stack>
                    <Group w="100%" justify="space-between">
                        <Title order={4}>Reason:</Title>
                        <TextContainer>
                            <Text fz="sm">{company.reason ?? "None"}</Text>
                        </TextContainer>
                    </Group>
                    <Group w="100%" justify="space-between">
                        <Title order={4}>Notes:</Title>
                        <TextContainer>
                            <Text fz="sm">{company.notes ?? "None"}</Text>
                        </TextContainer>
                    </Group>
                    <Group w="100%" justify="space-between">
                        <Title order={4}>Sources:</Title>
                        <TextContainer>
                            {/* TODO: Define consistent format for sources
                            & write parser to utilize SourceLinks */}
                            {company.sources.length > 0 ? company.sources.component : "No available sources"}
                        </TextContainer>
                    </Group>
                </Stack>
            </Modal.Body>
        </Modal>
    );
}
