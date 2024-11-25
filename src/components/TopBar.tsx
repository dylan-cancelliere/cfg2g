import "./TopBar.css";
import { Tooltip, ActionIcon, Group, Menu } from "@mantine/core";
import { IconBrandInstagram, IconBrandDiscord, IconBrandLinktree, IconCaretDownFilled } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";
import { Margin_Full_Width, useIsMobile } from "src/shared/hooks";

const SocialsIcon = ({ label, link, icon }: { label: string; link: string; icon: ReactNode }) => {
    return (
        <Tooltip label={label} openDelay={200} transitionProps={{ transition: "pop", duration: 300 }}>
            <ActionIcon
                variant="subtle"
                color="var(--mantine-color-green-8)"
                size="3rem"
                className="icon"
                component={Link}
                to={link}
                target="_blank"
            >
                {icon}
            </ActionIcon>
        </Tooltip>
    );
};

const TextDropdown = ({ label, items }: { label: string; items: ReactNode }) => {
    return (
        <Menu shadow="md" width="min-content" trigger="hover">
            <Menu.Target>
                <Group className="textDropdown" style={{ gap: 0, cursor: "pointer" }}>
                    <Link className="topBar" to="/guide" onClick={() => false}>
                        {label}
                    </Link>
                    <IconCaretDownFilled />
                </Group>
            </Menu.Target>

            <Menu.Dropdown style={{ display: "flex", flexDirection: "column" }}>{items}</Menu.Dropdown>
        </Menu>
    );
};

export function TopBar() {
    const isMobile = useIsMobile();

    return (
        <Group
            style={{
                border: ".5rem solid var(--mantine-color-green-0)",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                display: "flex",
                justifyContent: "space-between",
                margin: ".5rem",
                width: Margin_Full_Width,
            }}
        >
            <Group style={{ display: "flex", flexDirection: isMobile ? "column" : undefined }}>
                <Link to="/" className="topBar">
                    Home
                </Link>{" "}
                <Link to="/about" className="topBar">
                    About
                </Link>{" "}
                <TextDropdown
                    label="Guide"
                    items={[
                        <Link key="/guide/" className="topBar" to="/guide/data">
                            Data
                        </Link>,
                        <Link key="/guide/contribute" className="topBar" to="/guide/contribute">
                            Contribute
                        </Link>,
                    ]}
                />
                <Link to="/contact" className="topBar">
                    Contact
                </Link>
            </Group>
            <Group
                style={{
                    paddingRight: "1rem",
                    display: "flex",
                    flexDirection: isMobile ? "column" : undefined,
                }}
            >
                <SocialsIcon label="Instagram" link="https://www.instagram.com/sjp.rit/" icon={<IconBrandInstagram size="3rem" />} />
                <SocialsIcon label="Discord" link="https://discord.gg/hVAYhyu326" icon={<IconBrandDiscord size="3rem" />} />
                <SocialsIcon label="Linktree" link="https://linktr.ee/sjp.rit" icon={<IconBrandLinktree size="3rem" />} />
            </Group>
        </Group>
    );
}
