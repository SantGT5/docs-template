"use client"

import { Box, ChakraProvider } from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"

import type { ReactNode } from "react"

import { mdxComponents } from "@/components/mdx/MDXComponents"
import { system } from "@/theme"

import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode"

interface ProviderProps extends ColorModeProviderProps {
  children: ReactNode
}

export function Provider({ children, ...colorModeProps }: ProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...colorModeProps}>
        <MDXProvider components={mdxComponents}>
          {/* `colorPalette="brand"` makes brand the default accent everywhere. */}
          <Box colorPalette="brand" minH="100dvh" bg="bg" color="fg">
            {children}
          </Box>
        </MDXProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}
