import { Divider, List, Stack, Title, Text } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BodyTextWrapper } from "../about/route";

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
            <List>
                <List.Item>
                    <a href="#intro" className="tableOfContentsLink">
                        Intro
                    </a>
                    <List.Item fz="sm">
                        <a href="#noInvolvement" className="tableOfContentsLink">
                            No Significant Involvement
                        </a>
                    </List.Item>
                    <List.Item fz="sm">
                        <a href="#minimalInvolvement" className="tableOfContentsLink">
                            Minimal Involvement
                        </a>
                    </List.Item>
                    <List.Item fz="sm">
                        <a href="#moderateInvolvement" className="tableOfContentsLink">
                            Moderate Involvement
                        </a>
                    </List.Item>
                    <List.Item fz="sm">
                        <a href="#severeInvolvement" className="tableOfContentsLink">
                            Severe Involvement
                        </a>
                    </List.Item>
                </List.Item>
                <List.Item>
                    <a href="#severityGuidelines" className="tableOfContentsLink">
                        Severity Guidelines
                    </a>
                </List.Item>
                <List.Item>
                    <a href="#conclusion" className="tableOfContentsLink">
                        Conclusion
                    </a>
                </List.Item>
            </List>
        </Stack>
    );
};

const IntroText = () => {
    return (
        <BodyTextWrapper>
            <Title order={3} style={{ fontFamily: "Noe Bold", fontSize: "2em" }}>
                <a id="intro" className="headerText">
                    Intro
                </a>
            </Title>
            <Text className="bodyText">
                In preparation for RIT's Fall 2024 University-Wide Career Fair, and in the wake of rapidly declining conditions for
                Palestinian civilians in Gaza and the West Bank who continue to face military occupation, SJP@RIT volunteers have performed
                systematic research and analysis for all employers scheduled to appear at the event. Since then, we have expanded our scope
                to encompass more companies, more career fairs at RIT, and soon career fairs at other institutions.
            </Text>
            <Text className="bodyText">
                When using this guide, it's important to understand that our ratings are not an ethical judgement and in fact there are
                several companies marked{" "}
                <a className="bodyLink" href="#noInvolvement">
                    No Significant Involvement
                </a>{" "}
                which we the contributors to this guide find reprehensible. Rather, the goal is to provide data about one metric,
                involvement in the genocide in Palestine, and to let the reader use the information as they see fit.
            </Text>
            <Text className="bodyText">
                Further,{" "}
                <a className="bodyLink" href="#armsManufacturing">
                    No Significant Involvement
                </a>{" "}
                can be more accurately read as "No Public Involvement", meaning our best research efforts could not find any reasonable
                sources describing involvement in the genocide. If you, the reader, are in possession of info that would say otherwise,
                please submit it on our{" "}
                <Link className="bodyLink" to="/contact">
                    Contact Page
                </Link>{" "}
                or join our Discord and we can update our guide accordingly, pending review.
            </Text>
        </BodyTextWrapper>
    );
};

const NoInvolvementText = () => {
    return (
        <>
            <Title order={4} style={{ fontFamily: "Noe Bold" }} fz="2em">
                <a id="noInvolvement" className="headerText">
                    No Significant Involvement
                </a>
            </Title>
            <Text className="bodyText">Criteria:</Text>
            <List type="ordered">
                <List.Item className="bodyText">Does not do business with Israel</List.Item>
                <List.Item className="bodyText">
                    Not involved in{" "}
                    <a className="bodyLink" href="#armsManufacturing">
                        arms manufacturing
                    </a>
                </List.Item>
                <List.Item className="bodyText">
                    Zero or extremely{" "}
                    <a className="bodyLink" href="#limitedWork">
                        limited work
                    </a>{" "}
                    with the department of defense, Israeli occupation forces, defense contractors, the intelligence community (CIA, FBI,
                    Mossad, Shin Bet, Aman), etc
                </List.Item>
                <List.Item className="bodyText">
                    Work with DoD or defense contractors in a regulatory capacity, the absence of which would not result in a negative impact on their operations.
                </List.Item>
            </List>
            <Text className="bodyText">Source Requirements:</Text>
            <List>
                <List.Item className="bodyText">
                    Not on BDS or{" "}
                    <a className="bodyLink" href="http://mapliberation.org" target="_blank">
                        mapliberation.org
                    </a>
                </List.Item>
                <List.Item className="bodyText">
                    Any contracts on{" "}
                    <a className="bodyLink" href="https://www.fpds.gov/ezsearch/fpdsportal" target="_blank">
                        fpds.gov/ezsearch/fpdsportal
                    </a>{" "}
                    fall into the “limited” definition mentioned above
                </List.Item>
            </List>
        </>
    );
};

const MinimalText = () => {
    return (
        <>
            <Title order={4} style={{ fontFamily: "Noe Bold" }} fz="2em">
                <a id="minimalInvolvement" className="headerText">
                    Minimal Involvement
                </a>
            </Title>
            <Text className="bodyText">Criteria:</Text>
            <List type="ordered">
                <List.Item className="bodyText">Does not do business with Israel, or does business but in regular consumer goods</List.Item>
                <List pl="md">
                    <List.Item className="bodyText">
                        Evidence of specific differential treatment towards business with Palestine or Palestinians should escalate severity
                    </List.Item>
                </List>
                <List.Item className="bodyText">
                    Not involved in any sort of{" "}
                    <a className="bodyLink" href="#armsManufacturing">
                        arms manufacturing
                    </a>
                </List.Item>
                <List.Item className="bodyText">
                    <a className="bodyLink" href="#limitedWork">
                        Limited work
                    </a>{" "}
                    with the department of defense, Israeli occupation forces, defense contractors, the intelligence community (CIA, FBI,
                    Mossad, Shin Bet, Aman, etc)
                </List.Item>
                <List pl="md">
                    <List.Item className="bodyText">
                        Allow for the work to be a significant source of income so long as it is not a primary source of income. Otherwise
                        same definition as for No Significant Investment in terms of types of work.
                    </List.Item>
                </List>
                <List.Item className="bodyText">
                    Public statements from the company or high ranking officials (board members, C-level, etc) expressing (non-material)
                    support for apartheid, genocide, or Zionism
                </List.Item>
            </List>
            <Text className="bodyText">Source Requirements:</Text>
            <List>
                <List.Item className="bodyText">
                    Any contracts on{" "}
                    <a className="bodyLink" href="https://www.fpds.gov/ezsearch/fpdsportal" target="_blank">
                        fpds.gov/ezsearch/fpdsportal
                    </a>{" "}
                    fall into the{" "}
                    <a className="bodyLink" href="#limitedWork">
                        limited work
                    </a>{" "}
                    definition for Minimal Involvement
                </List.Item>
                <List.Item className="bodyText">
                    At least one primary or secondary source explaining the escalation from{" "}
                    <a className="bodyLink" href="#noInvolvement">
                        No Significant Involvement
                    </a>
                </List.Item>
                <List.Item className="bodyText">Any offending public statements</List.Item>
            </List>
        </>
    );
};

const ModerateText = () => {
    return (
        <>
            <Title order={4} style={{ fontFamily: "Noe Bold" }} fz="2em">
                <a id="moderateInvolvement" className="headerText">
                    Moderate Involvement
                </a>
            </Title>
            <Text className="bodyText">Criteria:</Text>
            <List type="ordered">
                <List.Item className="bodyText">Does significant business with or has significant investments in Israel</List.Item>
                <List.Item className="bodyText">
                    Indirectly involved in{" "}
                    <a className="bodyLink" href="#armsManufacturing">
                        arms manufacturing
                    </a>
                </List.Item>
                <List pl="md">
                    <List.Item className="bodyText">
                        For example, off-the-shelf components or raw materials would fall here, e.g. supplying aluminum to Lockheed Martin
                    </List.Item>
                    <List.Item className="bodyText">
                        Any supplied parts/materials which are primarily used in weapons, such as custom mechanical components or fuel
                        mixes, should escalate to Severe
                    </List.Item>
                </List>
                <List.Item className="bodyText">
                    Does significant business with or has significant investments from subcontracts under the department of defense, Israeli
                    occupation forces, defense contractors, the intelligence community (CIA, FBI, Mossad, Shin Bet, Aman), etc
                </List.Item>
                <List.Item className="bodyText">Current or previous material support for apartheid, genocide, or Zionism</List.Item>
                <List pl="md">
                    <List.Item className="bodyText">
                        ie board members who previously held high ranking positions at weapons manufacturers, public statements pledging
                        weapons/aid to Israeli occupation forces
                    </List.Item>
                </List>
            </List>
            <Text className="bodyText">Source Requirements:</Text>
            <List>
                <List.Item className="bodyText">At least one primary source OR two secondary sources justifying the criteria</List.Item>
            </List>
        </>
    );
};

const SevereText = () => {
    return (
        <>
            <Title order={4} style={{ fontFamily: "Noe Bold" }} fz="2em">
                <a id="severeInvolvement" className="headerText">
                    Severe Involvement
                </a>
            </Title>
            <Text className="bodyText">Criteria:</Text>
            <List type="ordered">
                <List.Item className="bodyText">
                    Directly involved in{" "}
                    <a className="bodyLink" href="#armsManufacturing">
                        arms manufacturing
                    </a>
                </List.Item>
                <List pl="md">
                    <List.Item className="bodyText">
                        Includes being involved indirectly through development of custom parts/materials
                    </List.Item>
                </List>
                <List.Item className="bodyText">Significant business or investment in Israel or the Israeli occupation forces</List.Item>
                <List.Item className="bodyText">
                    Significant business with or investments in other arms manufacturers or militaries
                </List.Item>
                <List.Item className="bodyText">Instances of “severe” differential treatment towards Palestine</List.Item>
                <List pl="md">
                    <List.Item className="bodyText">
                        ie pharmaceutical company refusing to send medicine or a bank freezing Palestinian assets
                    </List.Item>
                </List>
            </List>
            <Text className="bodyText">Source Requirements:</Text>
            <List>
                <List.Item className="bodyText">At least one primary source OR two secondary sources justifying the criteria</List.Item>
            </List>
        </>
    );
};

const SeverityGuidelines = () => {
    return (
        <BodyTextWrapper>
            <Title order={3} style={{ fontFamily: "Noe Bold", fontSize: "2em" }}>
                <a id="severityGuidelines" className="headerText">
                    Severity Guidelines
                </a>
            </Title>
            <Text className="bodyText">
                The following is the guidelines we use to calculate the severity rating of companies on our guide. There are some edge cases
                which do not conform to these rules, and in such cases there is a more detailed explanation in the notes section.
            </Text>
            <Text className="bodyText">First, some general definitions:</Text>
            <List>
                <Text className="bodyText" style={{ textDecoration: "underline" }}>
                    <a id="armsManufacturing" href="#armsManufacturing" className="glossaryLink">
                        Involved in arms manufacturing
                    </a>
                </Text>
                <List.Item className="bodyText">
                    A company that either directly partakes in arms manufacturing or sells a product/service to a company that directly
                    partakes in arms manufacturing
                </List.Item>
                <List.Item className="bodyText">
                    In other words, a software company that sells their software to a defense contractor would be considered “involved”, but
                    the office supply company for the software company would not be considered “involved”
                </List.Item>
                <List.Item className="bodyText">
                    Sometimes discretion needed. Probably the paperclip supplier is not really “involved” in arms manufacturing, but is the
                    payroll provider? The logistics company?
                </List.Item>
                <br />
                <Text className="bodyText" style={{ textDecoration: "underline" }}>
                    <a id="limitedWork" href="#limitedWork" className="glossaryLink">
                        Limited work with the department of defense, defense contractors, the intelligence community (CIA, FBI, Mossad, Shin
                        Bet, Aman), etc
                    </a>
                </Text>
                <List.Item className="bodyText">Explicitly “civilian” work, not a big part of the business model</List.Item>
                <List.Item className="bodyText">
                    Example of limited: an electrician company and they did the electrical work for a military base.
                </List.Item>
                <List.Item className="bodyText">
                    Example of non-limited: company that specializes in electrical work for military bases.
                </List.Item>
                <List.Item className="bodyText">Again, some discretion needed here</List.Item>
                <br />
                <Text className="bodyText" style={{ textDecoration: "underline" }}>
                    <a id="antiBoycott" href="#antiBoycott" className="glossaryLink">
                        Anti-boycott laws exception
                    </a>
                </Text>
                <List.Item className="bodyText">
                    Government entities that are bound by anti-boycott laws should not see the enforcement of that law as an indication of
                    their involvement
                </List.Item>
                <List.Item className="bodyText">
                    For example, the NY State Police are bound by anti-boycott laws, but so is the NY State Office of Parks
                </List.Item>
            </List>
            <Divider m="xl" style={{ borderColor: "var(--mantine-color-text)" }} />
            <NoInvolvementText />
            <Divider m="xl" style={{ borderColor: "var(--mantine-color-text)" }} />
            <MinimalText />
            <Divider m="xl" style={{ borderColor: "var(--mantine-color-text)" }} />
            <ModerateText />
            <Divider m="xl" style={{ borderColor: "var(--mantine-color-text)" }} />
            <SevereText />
        </BodyTextWrapper>
    );
};

const Conclusion = () => {
    return (
        <BodyTextWrapper>
            <Title order={3} style={{ fontFamily: "Noe Bold", fontSize: "2em" }}>
                <a id="conclusion" className="headerText">
                    Conclusion
                </a>
            </Title>
            <Text className="bodyText">
                In its totality, this document and the associated spreadsheet should be viewed critically and understood to be a collection
                of analysis done by volunteers. If you intended on applying for positions at an organization determined to be directly
                involved in the Genocide, the summaries and links contained in the spreadsheet should be used as a starting point for your
                own research and used as part of your own moral judgement.
            </Text>
            <Text className="bodyText">
                SJP@RIT believes that all students who are entering the job market, whether in a STEM field or otherwise, should have
                knowledge of both the stated and unstated interests of prospective employers. Students and graduates alike deserve free and
                open access to all the information required to make informed, confident decisions regarding one of the most important and
                impactful choices one has make in their professional lives. Hopefully, compiling this information is a small step towards
                achieving this goal at RIT.
            </Text>
            <Text className="bodyText">
                Again, if you would like to contribute to this guide, please join our discord or leave us a message by navigating to the{" "}
                <Link to="/contact" className="bodyLink">
                    Contact Page
                </Link>
                .
            </Text>
        </BodyTextWrapper>
    );
};

const InfoPage = () => {
    return (
        <Stack m="0.5rem" pb="2rem" align="center">
            <TableOfContents />
            <Divider style={{ borderColor: "var(--mantine-color-text)" }} />
            <IntroText />
            <SeverityGuidelines />
            <Conclusion />
        </Stack>
    );
};

export const Route = createFileRoute("/guide/info")({
    component: InfoPage,
});
