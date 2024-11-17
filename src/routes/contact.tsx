import "./contact.css";
import { Button, Checkbox, Group, rem, Stack, Text, Textarea, TextInput, Title, Tooltip } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

type ContributionsFormData = {
    contact: string;
    message: string;
    consent: boolean;
};

function ContactPage() {
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
                    <Title order={3}>Contact Us</Title>
                </Group>
                <Text>
                    Use this form to submit new companies to be added to the guide, additional info or corrections on existing companies, or
                    for general inquiry. When submitting new companies, please include sources backing any claims however obvious they may
                    seem.
                </Text>
                <Text></Text>
                <Text>
                    If you believe a correction should update our severity ranking, please indicate what the new ranking should be.
                    Information on how we rank severity can be found on our{" "}
                    <Link to="/about" className="inlineLink">
                        Severity Guidelines
                    </Link>{" "}
                    document.
                </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Group>
                        <TextInput {...register("contact")} label="Contact Info" placeholder="Enter email..." description="(Optional)" />
                    </Group>
                    <Group w="100%" pt="md">
                        <Textarea
                            {...register("message")}
                            label="Message"
                            placeholder="Enter a message..."
                            autosize
                            w="100%"
                            minRows={4}
                            withAsterisk
                        />
                    </Group>
                    <Group pt="md">
                        <Checkbox
                            {...register("consent")}
                            label="I consent to share this information with SJP @ RIT"
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
                                Submit
                            </Button>
                        </Tooltip>
                    </Group>
                </form>
            </Stack>
        </Stack>
    );
}

export const Route = createFileRoute("/contact")({
    component: ContactPage,
});