import { createBrowserRouter } from "react-router"

import { DocsLayout } from "@/components/layout/DocsLayout"
import { RootLayout } from "@/components/layout/RootLayout"
import { docsBasePath } from "@/config/navigation"
import { docsRoutes } from "@/pages/docs/routes"
import { NotFound } from "@/pages/error"
import { Home } from "@/pages/home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, Component: Home }],
  },
  {
    path: docsBasePath,
    element: <DocsLayout />,
    children: docsRoutes,
  },
  {
    path: "*",
    element: (
      <RootLayout>
        <NotFound />
      </RootLayout>
    ),
  },
])

export { router }
