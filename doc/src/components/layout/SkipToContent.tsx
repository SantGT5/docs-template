import { chakra } from "@chakra-ui/react"

/**
 * Visually-hidden-until-focused link that lets keyboard users jump past the
 * header and navigation straight to the main content (WCAG 2.4.1).
 * Targets the `#main-content` element rendered by the layouts.
 */
export function SkipToContent() {
  return (
    <chakra.a
      href="#main-content"
      position="absolute"
      left="-9999px"
      top="2"
      zIndex="2000"
      bg="bg.panel"
      color="brand.fg"
      px="4"
      py="2"
      rounded="md"
      borderWidth="1px"
      borderColor="border"
      fontWeight="medium"
      fontSize="sm"
      _focusVisible={{ left: "2" }}
    >
      Skip to content
    </chakra.a>
  )
}
