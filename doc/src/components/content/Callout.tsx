import { Box, Flex, Icon, Text } from "@chakra-ui/react"

import type { ReactNode } from "react"

import type { IconType } from "react-icons"
import { LuCircleAlert, LuInfo, LuLightbulb, LuTriangleAlert } from "react-icons/lu"

type CalloutType = "info" | "tip" | "warning" | "danger"

const VARIANTS: Record<CalloutType, { icon: IconType; palette: string; label: string }> = {
  info: { icon: LuInfo, palette: "blue", label: "Note" },
  tip: { icon: LuLightbulb, palette: "green", label: "Tip" },
  warning: { icon: LuTriangleAlert, palette: "orange", label: "Warning" },
  danger: { icon: LuCircleAlert, palette: "red", label: "Caution" },
}

interface CalloutProps {
  type?: CalloutType
  /** Heading shown above the body. Defaults to the variant label. */
  title?: string
  children: ReactNode
}

/**
 * A highlighted admonition box for notes, tips, warnings and cautions.
 *
 * ```mdx
 * <Callout type="warning" title="Heads up">…</Callout>
 * ```
 */
export function Callout({ type = "info", title, children }: CalloutProps) {
  const variant = VARIANTS[type]

  return (
    <Box
      colorPalette={variant.palette}
      my="5"
      px="4"
      py="3"
      borderWidth="1px"
      borderInlineStartWidth="4px"
      borderColor="border"
      borderInlineStartColor="colorPalette.solid"
      borderRadius="md"
      bg="colorPalette.subtle"
    >
      <Flex gap="3" align="flex-start">
        <Icon asChild color="colorPalette.fg" boxSize="5" mt="0.5" flexShrink="0">
          <variant.icon />
        </Icon>
        <Box
          flex="1"
          minW="0"
          css={{
            "& > :first-child": { marginTop: 0 },
            "& > :last-child": { marginBottom: 0 },
          }}
        >
          <Text fontWeight="semibold" color="colorPalette.fg" mb="1">
            {title ?? variant.label}
          </Text>
          <Box color="fg.muted" fontSize="sm" css={{ "& a": { color: "colorPalette.fg" } }}>
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
