import { Box, Flex, Link, Text } from "@chakra-ui/react"

import { LuArrowLeft, LuArrowRight } from "react-icons/lu"
import { Link as RouterLink, useLocation } from "react-router"

import { flatNav, type NavItem, normalizePath } from "@/config/navigation"

function PagerLink({ item, direction }: { item: NavItem; direction: "prev" | "next" }) {
  const isNext = direction === "next"

  return (
    <Link
      asChild
      flex="1"
      maxW="50%"
      _hover={{ textDecoration: "none", borderColor: "brand.solid" }}
      borderWidth="1px"
      borderColor="border"
      borderRadius="lg"
      p="4"
    >
      <RouterLink to={item.path}>
        <Flex direction="column" align={isNext ? "flex-end" : "flex-start"} gap="1">
          <Flex align="center" gap="1" color="fg.muted" fontSize="xs">
            {!isNext && <LuArrowLeft size={14} />}
            {isNext ? "Next" : "Previous"}
            {isNext && <LuArrowRight size={14} />}
          </Flex>
          <Text fontWeight="semibold" color="fg">
            {item.title}
          </Text>
        </Flex>
      </RouterLink>
    </Link>
  )
}

/** Previous / next links derived from the navigation order. */
export function DocPager() {
  const { pathname } = useLocation()
  const current = normalizePath(pathname)
  const index = flatNav.findIndex(item => normalizePath(item.path) === current)

  if (index === -1) return null

  const prev = flatNav[index - 1]
  const next = flatNav[index + 1]

  if (!prev && !next) return null

  return (
    <Flex mt="12" pt="6" borderTopWidth="1px" borderColor="border" gap="4" justify="space-between">
      {prev ? <PagerLink item={prev} direction="prev" /> : <Box flex="1" maxW="50%" />}
      {next ? <PagerLink item={next} direction="next" /> : <Box flex="1" maxW="50%" />}
    </Flex>
  )
}
