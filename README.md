# gemkit example

A blog written with [Gem](https://github.com/mantou132/gem) and gemkit: file-based routing, nested layouts,
i18n (`/` and `/zh`), server-side rendering and prerendering, plus a guestbook rendered on every request with
cookies and form actions.

Posts are markdown files in `content/posts`, read with `node:fs` and rendered with `marked` by the server element
`<app-markdown>`, which only runs on the server.

## Features

| Feature | Where |
| --- | --- |
| File-based routing, static and dynamic routes | `src/pages/index.ts`, `src/pages/blog/[slug].ts` |
| Catch-all route `[...path]` | `src/pages/blog/archive/[...path].ts` (`/blog/archive/2026`, `/blog/archive/2026/10`) |
| Nested layouts, `<gemkit-outlet>` | `src/pages/_layout.ts`, `src/pages/blog/_layout.ts` |
| 404 page | `src/pages/_404.ts` |
| Page `title`, isomorphic `load` and `paths` | `src/pages/blog/archive/[...path].ts` |
| Server-only data `*.server.ts`, `load` receives the server data | `src/pages/blog/[slug].server.ts`, `src/pages/blog/[slug].ts` |
| Layout data: isomorphic `@layout({ load })` and `_layout.server.ts` | `src/pages/_layout.ts`, `src/pages/blog/_layout.server.ts` |
| Store sync, updated on the server and used by hydration | `src/stores.ts`, `@server` in `src/pages/_layout.ts` |
| `@server` element state and streaming of slow content | `src/elements/server-info.ts` on `/about` |
| Server element, `node:fs` and `marked` stay on the server | `src/elements/markdown.ts` on blog posts |
| Lazy view, loaded on the first click | `src/elements/like-button.ts` on blog posts |
| i18n, `$gemkit/i18n` | `src/locales`, language switch in `src/pages/_layout.ts` |
| Global styles | `src/app.ts` |
| Auto-imported `app-*` elements | `src/elements` |
| Custom HTML template | `src/index.html` |
| Prerendering, `__data.json` for static hosting | `pnpm build`, `dist/web` |
| `cookies` in `load`, `prerender = false` | `src/pages/guestbook.server.ts` (`/guestbook`) |
| Form `actions` with `redirect`, works without JS | `src/pages/guestbook.server.ts` |
| `submitAction`: submit without reloading, show the action result | `src/pages/guestbook.ts` |
| Query-only navigation reloads data (`?page=2`) | pagination in `src/pages/guestbook.ts` |

```bash
pnpm install
pnpm dev      # dev server with SSR
pnpm build    # dist/web can be deployed to any static host (except the guestbook)
pnpm start    # serve dist with SSR fallback
```

`@mantou/gemkit` is not published yet, the dependencies link to a local checkout of the Gem repo at `../gem`.
