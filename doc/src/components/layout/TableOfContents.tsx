import { Box, Link, Text } from "@chakra-ui/react"

import React from "react"

import { BELOW_HEADER_HEIGHT, HEADER_HEIGHT, TOC_WIDTH } from "@/config/layout"
import type { TocHeading } from "@/hooks/useHeadings"

interface TableOfContentsProps {
  headings: TocHeading[]
  activeId: string
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Right-hand "On this page" navigation with scroll-spy. Hidden below `xl`. */
export function TableOfContents({ headings, activeId }: TableOfContentsProps) {
  // Keep the column reserved even when empty so the content stays centered.
  if (headings.length === 0) {
    return <Box as="aside" display={{ base: "none", xl: "block" }} w={TOC_WIDTH} flexShrink="0" />
  }

  const handleClick = (event: React.MouseEvent, id: string) => {
    event.preventDefault()
    const target = document.getElementById(id)

    if (!target) return
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
    // Move keyboard focus to the heading so reading/tabbing continues from it.
    target.setAttribute("tabindex", "-1")
    target.focus({ preventScroll: true })
    window.history.replaceState(null, "", `#${id}`)
  }

  return (
    <Box
      as="aside"
      display={{ base: "none", xl: "block" }}
      position="sticky"
      top={HEADER_HEIGHT}
      alignSelf="flex-start"
      flexShrink="0"
      w={TOC_WIDTH}
      h={BELOW_HEADER_HEIGHT}
      overflowY="auto"
      py="8"
      ps="4"
    >
      <Text
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wider"
        color="fg.muted"
        mb="3"
      >
        On this page
      </Text>
      <Box as="nav">
        {headings.map(heading => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            display="block"
            py="1"
            fontSize="sm"
            lineHeight="1.4"
            ps={heading.level === 3 ? "4" : "0"}
            color={activeId === heading.id ? "brand.fg" : "fg.muted"}
            fontWeight={activeId === heading.id ? "semibold" : "normal"}
            aria-current={activeId === heading.id ? "location" : undefined}
            _hover={{ color: "fg", textDecoration: "none" }}
            onClick={event => handleClick(event, heading.id)}
          >
            {heading.text}
          </Link>
        ))}
      </Box>
    </Box>
  )
}
