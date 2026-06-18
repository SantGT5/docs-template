import type { RouteObject } from "react-router"

import { docsBasePath, flatNav } from "@/config/navigation"

/**
 * Routes for every documentation page, generated from the navigation config.
 *
 * Invariants (enforced by convention — keep them true when editing navigation):
 *   - Exactly ONE nav item has `path === docsBasePath`; it becomes the index
 *     route. Two such items would create duplicate index routes and throw.
 *   - Every other nav item's path starts with `${docsBasePath}/`.
 */
export const docsRoutes: RouteObject[] = flatNav.map(item => {
  const load = async () => {
    const mod = await item.load()

    return { Component: mod.default }
  }

  return item.path === docsBasePath
    ? { index: true, lazy: load }
    : { path: item.path.replace(`${docsBasePath}/`, ""), lazy: load }
})
