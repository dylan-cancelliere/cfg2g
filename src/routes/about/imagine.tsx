import { Box, Divider, Group, Image, List, MantineStyleProp, Stack, Text, Title } from "@mantine/core";
import { createFileRoute, Link, ReactNode } from "@tanstack/react-router";
import { BodyTextWrapper } from "./info";
import { useIsMobile } from "src/shared/hooks";

const ImageFrame = ({ children, style }: { children: ReactNode; style?: MantineStyleProp }) => {
    return (
        <Box
            style={{
                width: "fit-content",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                borderRadius: 3,
                marginBottom: "1rem",
                ...style,
            }}
        >
            {children}
        </Box>
    );
};

const WhyWeAreHere = () => {
    const isMobile = useIsMobile();

    return (
        <BodyTextWrapper style={{ width: "fit-content" }}>
            <Title order={3} style={{ fontFamily: "Noe Bold", fontSize: "2em" }}>
                <a className="headerText">Why We Are here</a>
            </Title>
            <Group wrap={isMobile ? "wrap" : "nowrap"} justify="space-around">
                <Stack>
                    <Title order={4} style={{ fontFamily: "Noe Bold Italic", fontSize: "1em" }}>
                        RIT Is Funded by War:
                    </Title>
                    <Text className="bodyText" maw="25rem">
                        RIT has millions of dollars of research and engineering contracts with companies that profit off of and directly
                        contribute to war and genocide, like Lockheed Martin, L3 Harris, and RTX (Raytheon). Additionally, RIT is deeply
                        involved directly with the Department of “Defense” and CIA, who both have the blood of countless atrocities and wars
                        on their hands.
                    </Text>
                </Stack>
                <ImageFrame>
                    <Image src="/posters/rit_funded_by_genocide.jpg" h={300} radius={3} />
                </ImageFrame>
            </Group>
            <Divider m="xl" style={{ borderColor: "var(--mantine-color-text)" }} />
            <Group wrap={isMobile ? "wrap" : "nowrap"} justify="space-around">
                <ImageFrame>
                    <Image src="/posters/rit_funds_war.webp" h={300} radius={3} />
                </ImageFrame>
                <Stack>
                    <Title order={4} style={{ fontFamily: "Noe Bold Italic", fontSize: "1em" }}>
                        RIT Will Not Disclose its Investments:
                    </Title>
                    <Text className="bodyText" maw="25rem">
                        RIT has not disclosed where it invests our tuition money, and will not respond to requests for information. Given
                        their other involvement, we suspect they may be heavily invested in war and genocide.
                    </Text>
                </Stack>
            </Group>
            <Divider m="xl" style={{ borderColor: "var(--mantine-color-text)" }} />
            <Group wrap={isMobile ? "wrap" : "nowrap"} justify="space-around">
                <Stack>
                    <Title order={4} style={{ fontFamily: "Noe Bold Italic", fontSize: "1em" }}>
                        RIT Silences Student Speech:
                    </Title>
                    <Text className="bodyText" maw="25rem">
                        RIT has repressed student pro-Palestine speech and criticism of the university, by threatened or actual disciplinary
                        proceedings, selective enforcement of obscure rules, canceling reservations for meeting spaces, and threatening
                        clubs with de-recognition for expressing support for Palestine. Before Imagine last year, RIT threatened a student
                        who merely floated the idea of a protest during Imagine on social media with disciplinary action if anyone
                        protested, even if the student was not involved.
                    </Text>
                </Stack>
                <ImageFrame>
                    <Image src="/posters/protect_students_free_speech.jpg" h={300} radius={3} />
                </ImageFrame>
            </Group>
        </BodyTextWrapper>
    );
};

const WhatYouCanDo = () => {
    return (
        <BodyTextWrapper style={{ width: "fit-content" }}>
            <Title order={3} style={{ fontFamily: "Noe Bold", fontSize: "2em" }}>
                <a className="headerText">What You Can Do</a>
            </Title>

            <Title order={4} style={{ fontFamily: "Noe Bold Italic", fontSize: "1em" }}>
                Visitors and Alumni:
            </Title>
            <List className="bodyText" maw="25rem" mb="xl">
                <List.Item>Don’t donate, apply to, or otherwise support RIT until they divest from war</List.Item>
                <List.Item>Contact RIT and tell them about your commitment to do so, and what they can do to regain your support</List.Item>
                <List.Item>Spread the word</List.Item>
                <List.Item>
                    Follow us on Instagram at{" "}
                    <a href="https://www.instagram.com/sjp.rit/" target="_blank" className="bodyLink">
                        sjp.rit
                    </a>
                </List.Item>
            </List>
            <Title order={4} style={{ fontFamily: "Noe Bold Italic", fontSize: "1em" }}>
                Students:
            </Title>
            <List className="bodyText" maw="25rem" mb="xl">
                <List.Item>
                    Join Students for Justice In Palestine: join our{" "}
                    <a href="https://discord.gg/hVAYhyu326" target="_blank" className="bodyLink">
                        Discord
                    </a>{" "}
                    and show up to a meeting next semester •
                </List.Item>
                <List.Item>Spread the word</List.Item>
                <List.Item>
                    Look at the{" "}
                    <Link to="/guide" target="_blank" className="bodyLink">
                        Career Fair Guide to Genocide
                    </Link>{" "}
                    to learn which companies who come to career fair are invested in genocide
                </List.Item>
                <List.Item>Graduating students: don’t pay your senior gift</List.Item>
            </List>
            <ImageFrame>
                <Image src="/posters/students_support_palestine.jpg" mah={300} miw={300} radius={3} />
            </ImageFrame>
        </BodyTextWrapper>
    );
};

const ImagineComponent = () => {
    return (
        <Stack m="0.5rem" pb="2rem" align="center" justify="center">
            <WhyWeAreHere />
            <WhatYouCanDo />
        </Stack>
    );
};

export const Route = createFileRoute("/about/imagine")({
    component: ImagineComponent,
});
