import { Box, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { docsBasePath, navigation } from "@/config/navigation";

interface SidebarNavProps {
  /** Called after a link is clicked — used to close the mobile drawer. */
  onNavigate?: () => void;
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  return (
    <Stack as="nav" gap="6" aria-label="Documentation">
      {navigation.map((section) => (
        <Box key={section.title}>
          <Text
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            color="fg.muted"
            mb="2"
            px="3"
          >
            {section.title}
          </Text>
          <Stack gap="0.5">
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === docsBasePath}
                onClick={onNavigate}
                style={{ display: "block" }}
              >
                {({ isActive }) => (
                  <Box
                    px="3"
                    py="1.5"
                    rounded="md"
                    fontSize="sm"
                    fontWeight={isActive ? "semibold" : "medium"}
                    color={isActive ? "brand.fg" : "fg.muted"}
                    bg={isActive ? "brand.subtle" : "transparent"}
                    _hover={isActive ? undefined : { bg: "bg.muted", color: "fg" }}
                  >
                    {item.title}
                  </Box>
                )}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
