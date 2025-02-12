import { ActionIcon, Badge, Divider, Group, Modal, rem, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { SeverityChip } from "./SeverityChip";
import { Company } from "src/shared/types";
import { ReactNode } from "react";
import { IconX } from "@tabler/icons-react";

export type CompanyModalProps = {
    opened: boolean;
    onClose: () => void;
    company: Company;
};

const TextContainer = ({ children }: { children: ReactNode }) => {
    return (
        <Group
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
        </Group>
    );
};

export function CompanyModal({ opened, onClose, company }: CompanyModalProps) {
    const theme = useMantineTheme();

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
                <Group p="md" style={{ backgroundColor: "var(--mantine-color-green-0)" }} h="min-content" w="100%" wrap="nowrap">
                    <Group
                        h="min-content"
                        w="100%"
                        justify="space-around"
                        style={{ backgroundColor: "var(--mantine-color-green-0)", overflowX: "visible", overflowY: "clip", flexGrow: 10 }}
                    >
                        <Title order={3}>{company.name}</Title>
                        <SeverityChip severity={company.severity} />
                    </Group>
                    <ActionIcon color="var(--mantine-color-text)" variant="transparent" onClick={onClose} style={{ flexShrink: 10 }}>
                        <IconX />
                    </ActionIcon>
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
                    <Group w="100%" justify="space-between">
                        <Title order={4}>Tags:</Title>
                        <TextContainer>
                            {company.tags.length == 0
                                ? "None"
                                : company.tags.map((tag) => (
                                      <Badge color={theme.colors.green[0]} key={tag}>
                                          {tag}
                                      </Badge>
                                  ))}
                        </TextContainer>
                    </Group>
                </Stack>
            </Modal.Body>
        </Modal>
    );
}
