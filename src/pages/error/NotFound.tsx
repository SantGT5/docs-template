import { Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const NotFound = () => {
  useDocumentTitle("Page not found");

  return (
    <Center minH="60vh" px="6">
      <Stack gap="4" align="center" textAlign="center">
        <Text fontSize="6xl" fontWeight="extrabold" color="brand.fg" lineHeight="1">
          404
        </Text>
        <Heading size="lg">Page not found</Heading>
        <Text color="fg.muted" maxW="md">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </Text>
        <Button asChild colorPalette="brand" mt="2">
          <RouterLink to="/">Back to home</RouterLink>
        </Button>
      </Stack>
    </Center>
  );
};

export { NotFound };
