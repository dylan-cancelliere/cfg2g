import { Box, Group, Image, Title, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { createFileRoute, ReactNode } from "@tanstack/react-router";

function ImageFrame({ children }: ReactNode) {
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
}

function LandingPage() {
    const theme = useMantineTheme();
    const isBreakpoint = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);
    const fontSizeMultiplier = isBreakpoint ? 0.5 : 1;

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
        </Box>
    );
}

export const Route = createFileRoute("/")({
    component: LandingPage,
});
