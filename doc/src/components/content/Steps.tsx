import { Box, Flex, Heading } from "@chakra-ui/react"

import { Children, isValidElement, type ReactElement, type ReactNode } from "react"

import { SCROLL_MARGIN_TOP } from "@/config/layout"

interface StepProps {
  /** Optional heading for the step. */
  title?: string
  children: ReactNode
}

/**
 * A single step. Use inside `<Steps>`; numbering is injected automatically.
 *
 * ```mdx
 * <Steps>
 *   <Step title="Install">…</Step>
 *   <Step title="Run">…</Step>
 * </Steps>
 * ```
 */
export function Step({ title, children }: StepProps) {
  // Rendered standalone (outside <Steps>) it still shows its content.
  return (
    <StepItem index={1} isLast title={title}>
      {children}
    </StepItem>
  )
}

function StepItem({
  index,
  isLast,
  title,
  children,
}: StepProps & { index: number; isLast: boolean }) {
  return (
    <Flex gap="4" align="stretch">
      <Flex direction="column" align="center">
        <Flex
          align="center"
          justify="center"
          boxSize="8"
          flexShrink="0"
          borderRadius="full"
          bg="brand.solid"
          color="brand.contrast"
          fontWeight="bold"
          fontSize="sm"
        >
          {index}
        </Flex>
        {!isLast && <Box flex="1" width="2px" bg="border" my="2" />}
      </Flex>
      <Box
        flex="1"
        minW="0"
        pb={isLast ? "0" : "8"}
        css={{
          "& > :first-child": { marginTop: 0 },
          "& > :last-child": { marginBottom: 0 },
        }}
      >
        {title && (
          <Heading as="h3" size="md" mt="1" mb="2" scrollMarginTop={SCROLL_MARGIN_TOP}>
            {title}
          </Heading>
        )}
        {children}
      </Box>
    </Flex>
  )
}

interface StepsProps {
  children: ReactNode
}

/** A vertical, numbered list of steps. See `Step`. */
export function Steps({ children }: StepsProps) {
  // Only count actual <Step> elements — stray prose/components inside <Steps>
  // (e.g. a paragraph from a blank line) must not be promoted to numbered steps.
  const steps = Children.toArray(children).filter(
    (child): child is ReactElement<StepProps> => isValidElement(child) && child.type === Step
  )

  return (
    <Box my="6">
      {steps.map((child, index) => (
        <StepItem
          key={index}
          index={index + 1}
          isLast={index === steps.length - 1}
          title={child.props.title}
        >
          {child.props.children}
        </StepItem>
      ))}
    </Box>
  )
}
