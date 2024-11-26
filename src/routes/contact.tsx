import "./contact.css";
import { Button, Checkbox, Group, rem, Stack, Text, Textarea, TextInput, Title, Tooltip } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

type ContributionsFormData = {
    contact: string;
    message: string;
    consent: boolean;
};

const ContactPage = () => {
    const { register, handleSubmit, watch } = useForm<ContributionsFormData>();
    const onSubmit = (data: ContributionsFormData) => console.log(data);
    const gaveConsent = watch("consent") && !!watch("message");
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Group>
                        <TextInput
                            {...register("contact")}
                            label={<Text className="bodyText">Contact Info</Text>}
                            placeholder="Enter email..."
                            description="(Optional)"
                        />
                    </Group>
                    <Group w="100%" pt="md">
                        <Textarea
                            {...register("message")}
                            label={<Text className="bodyText">Message</Text>}
                            placeholder="Enter a message..."
                            autosize
                            w="100%"
                            minRows={4}
                        />
                    </Group>
                    <Group pt="md">
                        <Checkbox
                            {...register("consent")}
                            label={<Text className="bodyText">I consent to share this information with SJP @ RIT</Text>}
                            color="var(--mantine-color-green-8)"
                        />
                        <Tooltip label="Click the consent checkbox in order to submit" disabled={gaveConsent}>
                            <Button
                                type="submit"
                                data-disabled={!gaveConsent}
                                className="submitButton"
                                color="var(--mantine-color-green-8)"
                                onClick={(e) => e.preventDefault()}
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
