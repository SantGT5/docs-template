import { Box, Flex, HStack, IconButton, Link, Spacer } from "@chakra-ui/react";
import { LuGithub, LuMenu } from "react-icons/lu";
import { NavLink } from "react-router";
import { ColorModeButton } from "@/components/ui/color-mode";
import { HEADER_HEIGHT } from "@/config/layout";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";

interface HeaderProps {
  /** Called when the mobile menu button is pressed. Omit to hide the button. */
  onMenuOpen?: () => void;
}

export function Header({ onMenuOpen }: HeaderProps) {
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="1000"
      bg="bg.panel"
      borderBottomWidth="1px"
      borderColor="border"
    >
      <Flex
        h={HEADER_HEIGHT}
        align="center"
        gap="3"
        px={{ base: "4", md: "6" }}
        maxW="8xl"
        mx="auto"
      >
        {onMenuOpen && (
          <IconButton
            aria-label="Open navigation menu"
            variant="ghost"
            display={{ base: "inline-flex", md: "none" }}
            onClick={onMenuOpen}
          >
            <LuMenu />
          </IconButton>
        )}
        <Logo />
        <Spacer />
        <HStack gap="1">
          <Link
            asChild
            display={{ base: "none", sm: "inline-flex" }}
            fontSize="sm"
            fontWeight="medium"
            color="fg.muted"
            px="3"
            py="2"
            rounded="md"
            _hover={{ bg: "bg.muted", color: "fg", textDecoration: "none" }}
          >
            <NavLink to="/docs">Documentation</NavLink>
          </Link>
          <IconButton asChild aria-label="GitHub repository" variant="ghost">
            <a href={siteConfig.github} target="_blank" rel="noreferrer noopener">
              <LuGithub />
            </a>
          </IconButton>
          <ColorModeButton />
        </HStack>
      </Flex>
    </Box>
  );
}
