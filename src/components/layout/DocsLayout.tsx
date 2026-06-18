import { Box, Flex } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { CONTENT_MAX_WIDTH } from "@/config/layout";
import { findNavItem } from "@/config/navigation";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useHeadings } from "@/hooks/useHeadings";
import { DocPager } from "./DocPager";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { SkipToContent } from "./SkipToContent";
import { TableOfContents } from "./TableOfContents";

/** Three-column documentation shell: sidebar · content · table of contents. */
export function DocsLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const { headings, activeId } = useHeadings(contentRef, pathname);

  useDocumentTitle(findNavItem(pathname)?.title);

  return (
    <>
      <ScrollRestoration />
      <SkipToContent />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Flex
        maxW="8xl"
        mx="auto"
        px={{ base: "4", md: "6" }}
        align="flex-start"
        gap={{ base: "0", lg: "8" }}
      >
        <Sidebar />
        <Box
          as="main"
          id="main-content"
          tabIndex={-1}
          flex="1"
          minW="0"
          maxW={{ base: "full", xl: CONTENT_MAX_WIDTH }}
          mx="auto"
          py="8"
          outline="none"
        >
          <Box ref={contentRef}>
            <Outlet />
          </Box>
          <DocPager />
        </Box>
        <TableOfContents headings={headings} activeId={activeId} />
      </Flex>
    </>
  );
}
