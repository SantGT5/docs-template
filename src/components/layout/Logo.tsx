import { HStack, Icon, Link, Text } from "@chakra-ui/react";
import { LuBookOpen } from "react-icons/lu";
import { Link as RouterLink } from "react-router";
import { siteConfig } from "@/config/site";

export function Logo() {
  return (
    <Link asChild _hover={{ textDecoration: "none" }} _focusVisible={{ outlineOffset: "2px" }}>
      <RouterLink to="/">
        <HStack gap="2">
          <Icon asChild color="brand.fg" boxSize="6">
            <LuBookOpen />
          </Icon>
          <Text fontWeight="bold" fontSize="lg" letterSpacing="tight" color="fg">
            {siteConfig.name}
          </Text>
        </HStack>
      </RouterLink>
    </Link>
  );
}
