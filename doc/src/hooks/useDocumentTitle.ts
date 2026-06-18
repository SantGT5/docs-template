import { useEffect } from "react"

import { siteConfig } from "@/config/site"

/**
 * Sets the browser tab title. Pass a page title to get
 * `"{pageTitle} · {siteConfig.name}"`; pass nothing for the site's full title.
 */
export function useDocumentTitle(pageTitle?: string) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} · ${siteConfig.name}` : siteConfig.title
  }, [pageTitle])
}
