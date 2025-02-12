import "./route.css";
import { Divider, Group, Image, List, MantineStyleProp, Stack, Text, Title } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ReactNode } from "react";
import { useIsMobile } from "src/shared/hooks";

const TableOfContents = () => {
    return (
        <Stack
            p="xl"
            style={{
                backgroundColor: "var(--mantine-color-green-0)",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                borderRadius: 3,
            }}
        >
            <Title order={2} style={{ fontFamily: "Noe Bold", fontSize: "2em" }}>
                Table of Contents
            </Title>
            <Divider style={{ borderColor: "var(--mantine-color-text)" }} />
            <List type="ordered">
                <List.Item ff="serif">
                    <a href="#whoWeAre" className="tableOfContentsLink">
                        Who we are
                    </a>
                </List.Item>
                <List.Item ff="serif">
                    <a href="#whatWeBelieveIn" className="tableOfContentsLink">
                        What we believe in
                    </a>
                </List.Item>
                <List.Item ff="serif">
                    <a href="#aboutOurGuide" className="tableOfContentsLink">
                        About our guide
                    </a>
                </List.Item>
            </List>
        </Stack>
    );
};

export const BodyTextWrapper = ({ children, style }: { children: ReactNode; style?: MantineStyleProp }) => {
    const isMobile = useIsMobile();
    return (
        <Stack
            mt="xl"
            p="xl"
            style={{
                backgroundColor: "var(--mantine-color-green-0)",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                borderRadius: 3,
                width: isMobile ? "100%" : "45rem",
                ...style,
            }}
        >
            {children}
        </Stack>
    );
};

const AboutOurGuideText = () => {
    return (
        <BodyTextWrapper>
            <Title order={3} style={{ fontFamily: "Noe Bold", fontSize: "2em" }}>
                <a id="aboutOurGuide" className="headerText">
                    About our guide
                </a>
            </Title>
            <Text className="bodyText">
                In preparation for RIT's Fall 2024 University-Wide Career Fair, and in the wake of rapidly declining conditions for
                Palestinian civilians in Gaza who continue to face military bombardment, SJP@RIT volunteers have performed systematic
                research and analysis for all employers scheduled to appear at the event. This research is outlined and summarized in the{" "}
                <Link to="/guide" className="bodyLink">
                    Guide
                </Link>{" "}
                section of this website.
                <br />
                <br />
                Grouping each entry by ranked severity of involvement, we see that at least 66% (a vast majority) of employers represented
                at the Fall 2024 Career Fair are complicit in some way. More worryingly, at least 45% of employers were determined to be
                either moderately or severely involved in the ongoing genocide. This means that around half of the employers you'll walk
                past on the 25th have direct involvement with ongoing military operations in Gaza through the supply of weapons and military
                vehicles, direct investment and funding, alongside various other forms of material support to the Israeli Military.
                <br />
                <br />
                It's important to note that publicly available information is limited when it comes to private organizations, and the
                information included within the spreadsheet largely consists of: Information that made it past Corporate PR and was given to
                internal press and/or news publications Information listed and outlined within public US Govt. contract records
                (non-inclusive of private contracts and agreements) Information that has been dug up by investigative journalists and
                civilian reporters in the affected region. The percentages listed above likely represent a lower-bound of the real
                percentage of involved employers; corporations described as minimally involved or uninvolved due to a lack of information on
                current private defense supply contracts may have a more active role in the Genocide than outlined in their respective
                summaries.
                <br />
                <br />
                In its totality, this document and the associated spreadsheet should be viewed critically and understood to be a collection
                of analysis done by volunteers. If you intended on applying for positions at an organization determined to be directly
                involved in the Genocide, the summaries and links contained in the spreadsheet should be used as a starting point for your
                own research and used as part of your own moral judgement.
                <br />
                <br />
                SJP@RIT believes that all students who are entering the job market, whether in a STEM field or otherwise, should have
                knowledge of both the stated and unstated interests of prospective employers. Students and graduates alike deserve free and
                open access to all the information required to make informed, confident decisions regarding one of the most important and
                impactful choices one has make in their professional lives. Hopefully, compiling this information is a small step towards
                achieving this goal at RIT.
                <br />
                <br />
                To read more about our methodology, how you can contribute, and our future plans, check out the{" "}
                <Link to="/guide/info" className="bodyLink">
                    Guide Info
                </Link>{" "}
                page.
            </Text>
        </BodyTextWrapper>
    );
};

const WhatWeBelieveInText = () => {
    return (
        <BodyTextWrapper>
            <Title order={3} style={{ fontFamily: "Noe Bold", fontSize: "2em" }}>
                <a id="whatWeBelieveIn" className="headerText">
                    What we believe in
                </a>
            </Title>

            <List>
                <List.Item className="bodyText">Palestinians have the right to self determination on their homeland of Palestine</List.Item>
                <List.Item className="bodyText">
                    Zionism is a manifestation of settler colonialism which engages in an apartheid system against Palestinians
                </List.Item>
                <List.Item className="bodyText">
                    Palestinians are an occupied people, and as such have a right to resist their occupation by any means deemed necessary
                    as described in the 1970 United Nations General Assembly Resolution 2625
                </List.Item>
                <List.Item className="bodyText">
                    Palestinians and their descendents have a right to return which shall not be infringed as described in UN Resolution 194
                </List.Item>
                <List.Item className="bodyText">
                    The movement for a free Palestine is an anti-imperialist, anti-racist, anti-capitalist, internationalist, and
                    intersectional movement. This makes it inseparable from the liberation movements of all oppressed peoples, including
                    Black, Hispanic, and Native Americans, queer and disabled people, workers, and oppressed peoples of every nation
                </List.Item>
            </List>
        </BodyTextWrapper>
    );
};

const WhoWeAreText = () => {
    return (
        <BodyTextWrapper>
            <Title order={3} style={{ fontFamily: "Noe Bold", fontSize: "2em" }}>
                <a id="whoWeAre" className="headerText">
                    Who we are
                </a>
            </Title>
            <Text className="bodyText" component="span">
                Coming off the momentum generated by the Spring 2024 Student Intifada, Students for Justice in Palestine at Rochester
                Institute of Technology was founded to make space for students and community members to agitate, educate, and organize
                around the broader Palestinian solidarity movement. Our goals are as follows:
                <br />
                <br />
                <List type="ordered">
                    <List.Item className="bodyText">
                        Educate community members on the history of the Palestinian struggle since 1948 through means such as public seminar
                        and social media engagement
                    </List.Item>
                    <List.Item className="bodyText">
                        Identify local collaborators of the ongoing genocide in Gaza, like so-called "defense contractors", and provide
                        students with resources to avoid supporting these institutions while enrolled at RIT
                    </List.Item>
                    <List.Item className="bodyText">
                        Agitate, demonstrate, and otherwise make our voices heard on the RIT campus and within the greater Rochester
                        community when necessary to enact lasting change
                    </List.Item>
                    <List.Item className="bodyText">Express solidarity with members of the community that share our mission.</List.Item>
                </List>
            </Text>
        </BodyTextWrapper>
    );
};

const AboutComponent = () => {
    return (
        <Stack m="0.5rem" pb="2rem" align="center">
            <Group justify="center" gap="xl">
                <Group grow={true} maw="35rem">
                    <Title
                        order={1}
                        style={{
                            fontSize: "3em",
                            fontFamily: "Noe bold",
                            color: "var(--mantine-color-green-8)",
                        }}
                    >
                        About Students for Justice in Palestine at RIT
                    </Title>
                </Group>
                <Image src="/logo.png" mah="10rem" style={{ filter: "drop-shadow(0 0 0.75rem rgba(149, 157, 165, 0.2))" }} />
            </Group>
            <TableOfContents />
            <Divider style={{ borderColor: "var(--mantine-color-text)" }} />
            <WhoWeAreText />
            <WhatWeBelieveInText />
            <AboutOurGuideText />
        </Stack>
    );
};

export const Route = createFileRoute("/about")({
    component: AboutComponent,
});
