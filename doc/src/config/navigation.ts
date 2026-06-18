import type { ComponentType } from "react"

/**
 * The navigation tree is the single source of truth for the docs.
 *
 * Each item drives BOTH:
 *   - the sidebar link (title + path), and
 *   - the route (path + lazily-loaded MDX page).
 *
 * To add a page: drop a `.mdx` file in `src/pages/docs/content/`, then add an
 * entry below. The sidebar link, the route, and prev/next paging update
 * automatically.
 */
export type NavItem = {
  /** Label shown in the sidebar and prev/next pager. */
  title: string
  /** Full route path. The docs index lives at exactly "/docs". */
  path: string
  /** Lazy import of the page module (MDX or TSX). */
  load: () => Promise<{ default: ComponentType }>
}

export type NavSection = {
  title: string
  items: NavItem[]
}

/** Base path that all documentation pages live under. */
export const docsBasePath = "/docs"

export const navigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        path: "/docs",
        load: () => import("@/pages/docs/content/introduction.mdx"),
      },
      {
        title: "Installation",
        path: "/docs/installation",
        load: () => import("@/pages/docs/content/installation.mdx"),
      },
      {
        title: "Quick Start",
        path: "/docs/quick-start",
        load: () => import("@/pages/docs/content/quick-start.mdx"),
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Overview",
        path: "/docs/components",
        load: () => import("@/pages/docs/content/components.mdx"),
      },
    ],
  },
]

/** Flattened list in document order — used for routing and prev/next paging. */
export const flatNav: NavItem[] = navigation.flatMap(section => section.items)

/**
 * Normalizes a pathname for comparison: drops trailing slashes and lowercases.
 * React Router matches routes case-insensitively and ignores trailing slashes,
 * so lookups against `flatNav` must do the same to stay in sync.
 */
export const normalizePath = (path: string): string =>
  (path.replace(/\/+$/, "") || "/").toLowerCase()

/** Finds the nav item for a given pathname, tolerant of slashes/casing. */
export const findNavItem = (pathname: string): NavItem | undefined =>
  flatNav.find(item => normalizePath(item.path) === normalizePath(pathname))
