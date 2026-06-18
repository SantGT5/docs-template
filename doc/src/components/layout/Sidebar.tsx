import { Box } from "@chakra-ui/react"

import { BELOW_HEADER_HEIGHT, HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/config/layout"

import { SidebarNav } from "./SidebarNav"

/** Desktop sidebar. Sticky, scrolls independently, hidden below `md`. */
export function Sidebar() {
  return (
    <Box
      as="aside"
      display={{ base: "none", md: "block" }}
      position="sticky"
      top={HEADER_HEIGHT}
      alignSelf="flex-start"
      flexShrink="0"
      w={SIDEBAR_WIDTH}
      h={BELOW_HEADER_HEIGHT}
      overflowY="auto"
      py="8"
      pe="4"
    >
      <SidebarNav />
    </Box>
  )
}
