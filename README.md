# gemkit example

A blog written with [Gem](https://github.com/mantou132/gem) and gemkit: file-based routing, nested layouts,
i18n (`/` and `/zh`), server-side rendering and prerendering.

```bash
pnpm install
pnpm dev      # dev server with SSR
pnpm build    # dist/web can be deployed to any static host
pnpm start    # serve dist with SSR fallback
```

`@mantou/gemkit` is not published yet, the dependencies link to a local checkout of the Gem repo at `../gem`.
