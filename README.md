# Docs Template

<img width="2139" height="1373" alt="Image" src="https://github.com/user-attachments/assets/e898a5f4-46c4-4bac-b6f3-d23754c1af8f" />

A clean, component-driven documentation template built with **React 19**,
**Vite**, **Chakra UI v3** and **MDX**. Clone it, change a few config values, and
write your docs in Markdown — dropping in real React components wherever you need
them.

## Features

- **MDX authoring** — write Markdown and use React components inline. Standard
  Markdown is auto-styled to match the theme.
- **Three-column layout** — sticky header, navigation sidebar, and an automatic
  "On this page" table of contents with scroll-spy.
- **Dark & light mode** — powered by `next-themes` with a toggle in the header.
- **Reusable content components** — `CodeBox`, `CommandBox`, `Callout` and
  `Steps`, available in every MDX page without imports.
- **Single source of truth** — one `navigation.ts` drives the sidebar, the
  routes, and prev/next paging.
- **One-value theming** — swap the `brand` color ramp to re-brand the whole site.

## Getting started

The project runs in Docker and is driven through `make`.

```bash
make install      # install pre-commit hooks + npm dependencies
make start/local  # build and start the local environment
```

Then open the printed URL (`http://localhost:5173`).

### Commands

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `make help`         | Show the command list (default target)       |
| `make install`      | Install pre-commit & npm dependencies        |
| `make install/ci`   | Install npm dependencies only (used by CI)   |
| `make quality`      | Run the pre-commit tasks across all files    |
| `make start/local`  | Start the local environment                  |
| `make urls`         | Show the URLs to the running apps            |

## Quality & pre-commit

`make install` sets up [pre-commit](https://pre-commit.com/) hooks so checks run
automatically on every commit:

- **Conventional Commits** — commit messages are validated against the
  Conventional Commits spec (`feat`, `fix`, `docs`, `chore`, …).
- **File hygiene** — trailing whitespace, end-of-file, line endings, large
  files, merge conflicts, private keys, and YAML/JSON/TOML validity.
- **Code quality gate** — ESLint + TypeScript (`tsc`) over the `doc/` app.

Run the full suite manually at any time with `make quality`.

## Continuous integration

A GitHub Actions workflow ([`.github/workflows/ci.yml`](.github/workflows/ci.yml))
runs on every push and pull request to `main`. It installs dependencies
(`make install/ci`), runs the pre-commit checks across all files, and builds the
Docker image to ensure it stays buildable.

## Project structure

```
doc/src/
├─ components/
│  ├─ content/      # CodeBox, CommandBox, Callout, Steps, CopyButton
│  ├─ layout/       # Header, Sidebar, TableOfContents, DocsLayout, RootLayout…
│  ├─ mdx/          # Markdown → Chakra element mapping (MDXComponents)
│  └─ ui/           # Chakra provider, color-mode, tooltip, toaster
├─ config/
│  ├─ navigation.ts # Sidebar + routes + paging (single source of truth)
│  └─ site.ts       # Site name, description, links
├─ hooks/           # useCopyToClipboard, useHeadings (TOC scroll-spy)
├─ pages/
│  ├─ docs/
│  │  ├─ content/   # Your .mdx documentation pages live here
│  │  └─ routes/    # Routes generated from navigation.ts
│  ├─ home/         # Landing page
│  └─ error/        # 404
├─ theme/           # Chakra system: brand palette, tokens, global CSS
├─ router/          # React Router setup
└─ App.tsx
```

## Adding a page

1. Create an MDX file in `doc/src/pages/docs/content/`, e.g. `guides.mdx`:

   ```mdx
   # Guides

   Write **Markdown** here, and use components when you need them.

   <Callout type="tip">Standard Markdown is styled automatically.</Callout>
   ```

2. Register it in `doc/src/config/navigation.ts`:

   ```ts
   {
     title: "Guides",
     path: "/docs/guides",
     load: () => import("@/pages/docs/content/guides.mdx"),
   }
   ```

The sidebar link, route, and prev/next paging update automatically. The page at
path `/docs` is the documentation index.

## Content components

Available in any `.mdx` file without importing:

| Component      | Usage                                                              |
| -------------- | ------------------------------------------------------------------ |
| `CodeBox`      | Rendered automatically for fenced ```code blocks (with copy)       |
| `CommandBox`   | `<CommandBox>npm install</CommandBox>`                             |
| `Callout`      | `<Callout type="info\|tip\|warning\|danger" title="…">…</Callout>` |
| `Steps`/`Step` | `<Steps><Step title="…">…</Step></Steps>`                          |

See `/docs/components` in the running app for live examples.

## Customizing

- **Branding & metadata** — edit `doc/src/config/site.ts` (name, description, GitHub).
- **Accent color** — change the `brand` ramp in `doc/src/theme/index.ts`.
- **Navigation** — edit `doc/src/config/navigation.ts`.

## Tech stack

React 19 · Vite · TypeScript · Chakra UI v3 · MDX · React Router · `next-themes`
· `prism-react-renderer`.
