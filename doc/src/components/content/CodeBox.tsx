import { Box, Flex, Text } from "@chakra-ui/react"
import { Highlight, themes } from "prism-react-renderer"

import { useColorMode } from "@/components/ui/color-mode"

import { CopyButton } from "./CopyButton"

/**
 * prism-react-renderer bundles a fixed set of grammars. Map languages it
 * doesn't ship to a close one it does, so blocks still get highlighted
 * (the original label is still shown in the header bar).
 */
const LANGUAGE_ALIASES: Record<string, string> = {
  mdx: "jsx",
  md: "markdown",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  yml: "yaml",
}

interface CodeBoxProps {
  /** Raw source code to highlight. */
  code: string
  /** Prism language id, e.g. "tsx", "bash", "json". */
  language?: string
  /** Optional filename/title shown in a header bar. */
  title?: string
  /** Render a gutter with line numbers. */
  showLineNumbers?: boolean
}

/**
 * A syntax-highlighted code block with a copy button. Themed for both light
 * and dark mode. In MDX, fenced code blocks (```ts) render through this
 * component automatically (see `MDXComponents`).
 */
export function CodeBox({ code, language = "text", title, showLineNumbers }: CodeBoxProps) {
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark"
  const theme = isDark ? themes.nightOwl : themes.github
  const trimmed = code.replace(/\n$/, "")
  const grammar = LANGUAGE_ALIASES[language] ?? language
  const barBg = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)"

  return (
    <Box
      role="group"
      position="relative"
      my="5"
      borderWidth="1px"
      borderColor="border"
      borderRadius="lg"
      overflow="hidden"
      bg={isDark ? "#011627" : "#ffffff"}
    >
      {title ? (
        <Flex
          align="center"
          justify="space-between"
          ps="4"
          pe="2"
          py="1.5"
          borderBottomWidth="1px"
          borderColor="border"
          bg={barBg}
        >
          <Text fontSize="xs" fontFamily="mono" color="fg.muted">
            {title}
          </Text>
          <Flex align="center" gap="2">
            {language !== "text" && (
              <Text
                fontSize="2xs"
                textTransform="uppercase"
                letterSpacing="wider"
                color="fg.subtle"
              >
                {language}
              </Text>
            )}
            <CopyButton value={trimmed} size="xs" aria-label="Copy code" />
          </Flex>
        </Flex>
      ) : (
        <Box position="absolute" top="1.5" insetEnd="1.5" zIndex="1">
          <CopyButton value={trimmed} size="xs" aria-label="Copy code" />
        </Box>
      )}

      <Highlight theme={theme} code={trimmed} language={grammar}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Box
            as="pre"
            className={className}
            style={{ ...style, background: "transparent", margin: 0 }}
            overflowX="auto"
            px="4"
            py="4"
            fontSize="sm"
            fontFamily="mono"
            lineHeight="1.7"
          >
            {tokens.map((line, lineIndex) => {
              const lineProps = getLineProps({ line })

              return (
                <Box as="div" key={lineIndex} {...lineProps} style={lineProps.style}>
                  {showLineNumbers && (
                    <Box
                      as="span"
                      display="inline-block"
                      width="8"
                      me="4"
                      textAlign="right"
                      color="fg.subtle"
                      userSelect="none"
                    >
                      {lineIndex + 1}
                    </Box>
                  )}
                  {line.map((token, tokenIndex) => {
                    const tokenProps = getTokenProps({ token })

                    return <span key={tokenIndex} {...tokenProps} style={tokenProps.style} />
                  })}
                </Box>
              )
            })}
          </Box>
        )}
      </Highlight>
    </Box>
  )
}
