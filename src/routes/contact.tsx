import "./contact.css";
import { Button, Checkbox, Group, rem, Stack, Text, Textarea, TextInput, Title, Tooltip, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { createFileRoute, Link } from "@tanstack/react-router";

type ContributionsFormData = {
    contact: string;
    message: string;
    consent: boolean;
};

const ContactPage = () => {
    const theme = useMantineTheme();

    const form = useForm({
        initialValues: {
            contact: "",
            message: "",
            consent: false,
        },
        validate: {
            message: (v) => (v.length < 5 ? "Enter a message" : null),
            consent: (v) => (!v ? "You must consent to sharing this information" : null),
        },
    });

    const onSubmit = (data: ContributionsFormData) => {
        fetch(`${import.meta.env.VITE_BASE_URL}/contact`, {
            method: "POST",
            body: JSON.stringify({ from: data.contact, message: data.message }),
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            form.reset();
            modals.open({
                children: (
                    <Stack justify="center">
                        <Title style={{ fontFamily: "Noe Bold", fontSize: "1.5em", textAlign: "center" }}>
                            Submission logged successfully{" "}
                        </Title>
                        <Button onClick={modals.closeAll} fullWidth color={theme.colors.green[8]}>
                            Ok
                        </Button>
                    </Stack>
                ),
                centered: true,
            });
        });
    };

    return (
        <Stack align="center" pt="xl">
            <Stack
                w="50%"
                miw={rem(350)}
                p="md"
                style={{
                    backgroundColor: "var(--mantine-color-green-0)",
                    border: "0px solid #fff",
                    borderRadius: "0.5rem",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
            >
                <Group justify="center">
                    <Title order={2} style={{ fontFamily: "Noe Bold", fontSize: "2em" }}>
                        Contact Us
                    </Title>
                </Group>
                <Text className="bodyText">
                    Use this form to submit new companies to be added to the guide, additional info or corrections on existing companies, or
                    for general inquiry. When submitting new companies, please include sources backing any claims however obvious they may
                    seem.
                </Text>
                <Text className="bodyText">
                    If you believe a correction should update our severity ranking, please indicate what the new ranking should be.
                    Information on how we rank severity, as well as the rest of our methodology can be found on the{" "}
                    <Link to="/guide/info" className="bodyLink">
                        Info
                    </Link>{" "}
                    page.
                </Text>
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Group>
                        <TextInput
                            {...form.getInputProps("contact")}
                            label={<Text className="bodyText">Contact Info</Text>}
                            placeholder="Enter contact info..."
                            description="(Optional)"
                        />
                    </Group>
                    <Group w="100%" pt="md">
                        <Textarea
                            {...form.getInputProps("message")}
                            label={<Text className="bodyText">Message</Text>}
                            placeholder="Enter a message..."
                            autosize
                            w="100%"
                            minRows={4}
                        />
                    </Group>
                    <Group pt="md">
                        <Checkbox
                            {...form.getInputProps("consent")}
                            label={<Text className="bodyText">I consent to share this information with SJP @ RIT</Text>}
                            color="var(--mantine-color-green-8)"
                        />
                        <Tooltip label="Make sure to click the consent checkbox in order to submit" disabled={form.isValid()}>
                            <Button
                                type="submit"
                                data-disabled={!form.isValid()}
                                className="submitButton"
                                color="var(--mantine-color-green-8)"
                            >
                                <Text className="bodyText">Submit</Text>
                            </Button>
                        </Tooltip>
                    </Group>
                </form>
            </Stack>
        </Stack>
    );
};

export const Route = createFileRoute("/contact")({
    component: ContactPage,
});
