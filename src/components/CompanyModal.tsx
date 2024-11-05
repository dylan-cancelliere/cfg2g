import { Anchor, Divider, Group, Modal, rem, Stack, Textarea, Title } from "@mantine/core";
import { Company } from "src/types";
import { SeverityChip } from "./SeverityChip";

export type CompanyModalProps = {
    opened: boolean;
    onClose: () => void;
    company: Company;
};

function SourceLink({ link, index }: { link: string; index: number }) {
    return (
        <Anchor href={link} target="_blank" c="var(--mantine-color-green-8)">
            [{index}:] {link}
        </Anchor>
    );
}

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
                <Group style={{ backgroundColor: "var(--mantine-color-green-0)" }} h={rem(100)} w="100%" p="md" justify="space-around">
                    <Title order={3}>{company.name}</Title>
                    <SeverityChip severity={company.severity} isMobile={false} />
                </Group>
                <Divider mx="md" color="var(--mantine-color-green-8)" />
            </Modal.Title>
            <Modal.Body style={{ backgroundColor: "var(--mantine-color-green-0)", rowGap: "2rem", overflowY: "auto" }} pt="md">
                <Stack>
                    <Group w="100%" justify="space-between">
                        <Title order={4}>Notes:</Title>
                        <Textarea readOnly value={company.notes ?? "None"} flex={10} autosize maxRows={10} maw="75%" />
                    </Group>
                    <Group w="100%" justify="space-between">
                        <Title order={4}>Sources:</Title>
                        <Stack
                            flex={10}
                            maw="75%"
                            mah={rem(200)}
                            style={{
                                backgroundColor: "var(--mantine-color-white)",
                                border: "calc(0.0625rem* var(--mantine-scale)) solid var(--mantine-color-gray-4)",
                                padding: `${rem(5.5)} ${rem(12)}`,
                                overflowY: "auto",
                            }}
                        >
                            {/* TODO: Replace with actual data when we update the doc */}
                            <SourceLink link="https://source1.com" index={1} />
                            <SourceLink link="https://source2.com" index={2} />
                            <SourceLink link="https://source3.com" index={3} />
                            <SourceLink link="https://source4.com" index={4} />
                            <SourceLink link="https://source5.com" index={5} />
                            <SourceLink link="https://source6.com" index={6} />
                        </Stack>
                    </Group>
                </Stack>
            </Modal.Body>
        </Modal>
    );
}
