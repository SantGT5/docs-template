import { Box, Flex, Text } from "@chakra-ui/react";
import { Children, isValidElement, type ReactNode } from "react";
import { CopyButton } from "./CopyButton";

interface CommandBoxProps {
  /**
   * The command(s) to display. In MDX this may arrive as a string (inline form)
   * or wrapped in a paragraph (block form with blank lines) — both are handled.
   * Multiple lines are split on `\n`.
   */
  children: ReactNode;
  /** Hide the leading "$" prompt (e.g. for non-shell snippets). */
  noPrompt?: boolean;
}

/** Recursively extracts the plain text from arbitrary MDX/React children. */
function toText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return toText(node.props.children);
  }
  return "";
}

/**
 * A terminal-style command line with a copy button. Copying yields the raw
 * command(s) without the "$" prompt.
 *
 * ```mdx
 * <CommandBox>npm install</CommandBox>
 * ```
 */
export function CommandBox({ children, noPrompt }: CommandBoxProps) {
  const raw = toText(Children.toArray(children)).trim();
  const lines = raw.split("\n");

  return (
    <Flex
      role="group"
      align="center"
      gap="3"
      my="5"
      ps="4"
      pe="2"
      py="2"
      borderWidth="1px"
      borderColor="border"
      borderRadius="lg"
      bg="bg.muted"
    >
      <Box flex="1" overflowX="auto" fontFamily="mono" fontSize="sm" py="1">
        {lines.map((line, index) => (
          <Flex key={index} gap="2" whiteSpace="pre">
            {!noPrompt && (
              <Text as="span" color="brand.fg" userSelect="none" aria-hidden>
                $
              </Text>
            )}
            <Text as="span" color="fg">
              {line}
            </Text>
          </Flex>
        ))}
      </Box>
      <CopyButton value={raw} size="xs" aria-label="Copy command" />
    </Flex>
  );
}
