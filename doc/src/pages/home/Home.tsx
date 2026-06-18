import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react"

import type { IconType } from "react-icons"
import { LuArrowRight, LuComponent, LuFileText, LuMoonStar, LuRocket, LuZap } from "react-icons/lu"
import { Link as RouterLink } from "react-router"

import { CommandBox } from "@/components/content/CommandBox"
import { docsBasePath } from "@/config/navigation"
import { siteConfig } from "@/config/site"
import { useDocumentTitle } from "@/hooks/useDocumentTitle"

const FEATURES: { icon: IconType; title: string; description: string }[] = [
  {
    icon: LuFileText,
    title: "Write in MDX",
    description:
      "Author pages in Markdown and drop real React components in line — no context switching.",
  },
  {
    icon: LuComponent,
    title: "Reusable components",
    description:
      "Ship with CodeBox, CommandBox, Callout and Steps. Add your own and use them anywhere.",
  },
  {
    icon: LuMoonStar,
    title: "Dark & light mode",
    description: "A polished theme that adapts to system preference, with a one-click toggle.",
  },
  {
    icon: LuZap,
    title: "Config-driven nav",
    description:
      "One navigation file powers the sidebar, routes and prev/next paging automatically.",
  },
]

export function Home() {
  useDocumentTitle()

  return (
    <Box>
      {/* Hero */}
      <Container
        maxW="4xl"
        pt={{ base: "16", md: "24" }}
        pb={{ base: "10", md: "16" }}
        textAlign="center"
      >
        <Stack gap="6" align="center">
          <Badge colorPalette="brand" variant="subtle" size="lg" rounded="full" px="3">
            Documentation template
          </Badge>
          <Heading
            as="h1"
            size={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            letterSpacing="tight"
            lineHeight="1.1"
          >
            {siteConfig.title}
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color="fg.muted" maxW="2xl">
            {siteConfig.tagline}
          </Text>
          <Flex gap="3" wrap="wrap" justify="center" pt="2">
            <Button asChild colorPalette="brand" size="lg">
              <RouterLink to={docsBasePath}>
                Get started <LuArrowRight />
              </RouterLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={siteConfig.github} target="_blank" rel="noreferrer noopener">
                View on GitHub
              </a>
            </Button>
          </Flex>
          <Box w="full" maxW="md" pt="4">
            <CommandBox>npx degit your-org/your-repo my-docs</CommandBox>
          </Box>
        </Stack>
      </Container>

      {/* Features */}
      <Container maxW="6xl" pb={{ base: "16", md: "24" }}>
        <VisuallyHidden asChild>
          <Heading as="h2">Features</Heading>
        </VisuallyHidden>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="5">
          {FEATURES.map(feature => (
            <Stack
              key={feature.title}
              gap="3"
              p="6"
              borderWidth="1px"
              borderColor="border"
              borderRadius="xl"
              bg="bg.panel"
              _hover={{ borderColor: "brand.emphasized" }}
              transition="border-color 0.2s"
            >
              <Flex
                align="center"
                justify="center"
                boxSize="10"
                borderRadius="lg"
                bg="brand.subtle"
                color="brand.fg"
              >
                <Icon asChild boxSize="5">
                  <feature.icon />
                </Icon>
              </Flex>
              <Heading as="h3" size="md">
                {feature.title}
              </Heading>
              <Text fontSize="sm" color="fg.muted" lineHeight="1.6">
                {feature.description}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>

        <Flex justify="center" mt="12">
          <Button asChild variant="ghost" colorPalette="brand">
            <RouterLink to={docsBasePath}>
              <LuRocket /> Read the documentation
            </RouterLink>
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
