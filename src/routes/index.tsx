import "./index.css";
import { Box, Button, Group, Image, Title, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowBigRightLinesFilled } from "@tabler/icons-react";
import { createFileRoute, ReactNode, useNavigate } from "@tanstack/react-router";

const ImageFrame = ({ children }: ReactNode) => {
    return (
        <Box
            style={{
                width: "min-content",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                border: "0.25rem solid var(--mantine-color-green-0)",
                marginBottom: "1rem",
            }}
        >
            {children}
        </Box>
    );
};

function LandingPage() {
    const theme = useMantineTheme();
    const isBreakpoint = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);
    const fontSizeMultiplier = isBreakpoint ? 0.5 : 1;
    const nav = useNavigate();

    return (
        <Box style={{ display: "flex", flexDirection: "column", margin: "0.5rem" }}>
            <Group style={{ textAlign: "right", paddingTop: "5rem", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Title
                    order={1}
                    style={{
                        fontFamily: "Noe Bold",
                        fontSize: `calc(10em * ${fontSizeMultiplier})`,
                        lineHeight: "1em",
                        color: "var(--mantine-color-green-8)",
                    }}
                >
                    Students for Justice in Palestine
                </Title>
                <Title
                    order={2}
                    c="var(--mantine-color-green-8)"
                    style={{ fontFamily: "Noe Bold Italic", fontSize: `calc(3em * ${fontSizeMultiplier})` }}
                >
                    at Rochester Institute of Technology
                </Title>
            </Group>
            <Box
                w="100%"
                style={{
                    display: "flex",
                    flexDirection: isBreakpoint ? "column" : "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: "5rem 0.5rem",
                    flexWrap: "wrap",
                }}
            >
                <ImageFrame>
                    <Image src="/landing-page.jpg" h="auto" w={isBreakpoint ? "80vw" : 380} style={{}} />
                </ImageFrame>
                <ImageFrame>
                    <Image src="/landing-page-2.jpg" h="auto" w={isBreakpoint ? "80vw" : 380} style={{}} />
                </ImageFrame>
                <ImageFrame>
                    <Image src="/landing-page-3.jpg" h="auto" w={isBreakpoint ? "80vw" : 380} style={{}} />
                </ImageFrame>
            </Box>
            <Group style={{ flexDirection: "column" }} pb="5rem">
                <Button
                    variant="white"
                    color="var(--mantine-color-green-8)"
                    size="xl"
                    onClick={() => {
                        throw nav({ to: "/guide" });
                    }}
                    ff="Noe Bold"
                    fz="2em"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                >
                    Check out our Career Fair Guide! <IconArrowBigRightLinesFilled style={{ marginLeft: "1rem" }} />
                </Button>
            </Group>
            {/* <Stack align="center" mb="0.5rem">
                <BodyTextWrapper style={{ width: "100%" }}>
                    <Title order={3} c="var(--mantine-color-green-8)">
                        <a className="tableOfContentsLink" href="https://www.instagram.com/sjp.rit/" target="_blank">
                            Recent Posts
                        </a>
                    </Title>
                    <iframe width="100%" height="440" src="https://rss.app/embed/v1/carousel/nnhKqChcElLTMh2G"></iframe>
                </BodyTextWrapper>
            </Stack> */}
        </Box>
    );
}

export const Route = createFileRoute("/")({
    component: LandingPage,
});
