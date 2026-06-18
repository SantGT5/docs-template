import { Box, chakra, Code, Heading, Link, Separator, Table, Text } from "@chakra-ui/react"
import type { MDXComponents } from "mdx/types"

import React, { type ComponentProps, isValidElement, type ReactNode } from "react"

import { LuExternalLink } from "react-icons/lu"
import { Link as RouterLink } from "react-router"

import { Callout } from "@/components/content/Callout"
import { CodeBox } from "@/components/content/CodeBox"
import { CommandBox } from "@/components/content/CommandBox"
import { Step, Steps } from "@/components/content/Steps"
import { SCROLL_MARGIN_TOP } from "@/config/layout"

/** HTML element props without `ref`, which MDX never forwards. */
type El<T extends keyof React.JSX.IntrinsicElements> = Omit<ComponentProps<T>, "ref">

const headingBase = {
  fontWeight: "bold",
  lineHeight: "1.3",
  scrollMarginTop: SCROLL_MARGIN_TOP,
  letterSpacing: "tight",
} as const

function Anchor({ href = "", children, ...rest }: El<"a">) {
  const linkStyles = {
    color: "brand.fg",
    fontWeight: "medium",
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  } as const

  if (href.startsWith("/")) {
    return (
      <Link asChild {...linkStyles}>
        <RouterLink to={href}>{children}</RouterLink>
      </Link>
    )
  }

  if (href.startsWith("#")) {
    return (
      <Link href={href} {...linkStyles} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <Link href={href} target="_blank" rel="noreferrer noopener" {...linkStyles} {...rest}>
      {children}
      <LuExternalLink
        style={{ display: "inline", marginInlineStart: "2px", verticalAlign: "middle" }}
      />
    </Link>
  )
}

function Pre({ children }: El<"pre">) {
  // MDX wraps a fenced block as <pre><code className="language-x">…</code></pre>.
  const code = isValidElement<{ className?: string; children?: ReactNode }>(children)
    ? children
    : null
  const className = code?.props.className ?? ""
  const language = className.replace(/language-/, "") || "text"
  const source = typeof code?.props.children === "string" ? code.props.children : ""

  return <CodeBox code={source} language={language} />
}

export const mdxComponents: MDXComponents = {
  h1: (props: El<"h1">) => <Heading as="h1" size="3xl" mt="0" mb="4" {...headingBase} {...props} />,
  h2: (props: El<"h2">) => (
    <Heading as="h2" size="2xl" mt="10" mb="4" {...headingBase} {...props} />
  ),
  h3: (props: El<"h3">) => <Heading as="h3" size="xl" mt="8" mb="3" {...headingBase} {...props} />,
  h4: (props: El<"h4">) => <Heading as="h4" size="lg" mt="6" mb="2" {...headingBase} {...props} />,
  p: (props: El<"p">) => <Text mb="4" lineHeight="1.75" color="fg" {...props} />,
  a: Anchor,
  ul: (props: El<"ul">) => (
    <chakra.ul
      ps="6"
      mb="4"
      display="flex"
      flexDirection="column"
      gap="2"
      listStyleType="disc"
      {...props}
    />
  ),
  ol: (props: El<"ol">) => (
    <chakra.ol
      ps="6"
      mb="4"
      display="flex"
      flexDirection="column"
      gap="2"
      listStyleType="decimal"
      {...props}
    />
  ),
  li: (props: El<"li">) => (
    <chakra.li lineHeight="1.75" ps="1" _marker={{ color: "fg.subtle" }} {...props} />
  ),
  blockquote: (props: El<"blockquote">) => (
    <chakra.blockquote
      my="5"
      ps="4"
      py="1"
      borderInlineStartWidth="4px"
      borderColor="brand.emphasized"
      color="fg.muted"
      fontStyle="italic"
      {...props}
    />
  ),
  code: (props: El<"code">) => (
    <Code
      colorPalette="gray"
      bg="bg.muted"
      color="fg"
      px="1.5"
      py="0.5"
      borderRadius="md"
      fontSize="0.85em"
      {...props}
    />
  ),
  pre: Pre,
  hr: () => <Separator my="8" />,
  table: (props: El<"table">) => (
    <Box overflowX="auto" my="5" borderWidth="1px" borderColor="border" borderRadius="lg">
      <Table.Root size="sm" {...props} />
    </Box>
  ),
  thead: (props: El<"thead">) => <Table.Header {...props} />,
  tbody: (props: El<"tbody">) => <Table.Body {...props} />,
  tr: (props: El<"tr">) => <Table.Row {...props} />,
  th: (props: El<"th">) => <Table.ColumnHeader fontWeight="semibold" {...props} />,
  td: (props: El<"td">) => <Table.Cell {...props} />,
  img: (props: El<"img">) => <chakra.img maxW="full" borderRadius="lg" my="4" {...props} />,

  // Custom doc components — usable directly in MDX without imports.
  Callout,
  CommandBox,
  CodeBox,
  Steps,
  Step,
}
