When a request arrives, gemkit renders the page with `gem-ssr` in a simulated DOM:

1. The router matches the URL and loads the layout and page modules.
2. The page's `*.server.ts` loads data, the page's `load` option can transform it on both sides.
3. Elements render, shadow roots are serialized as declarative shadow DOM.

The browser shows the HTML immediately. When the scripts arrive, elements are upgraded and reuse the existing DOM
instead of rendering again, then navigation happens on the client.

## Data loading

- `*.server.ts`: runs on the server only, returns JSON, can use `fs`, databases and secrets.
- `load` option: runs on the server for the first request and in the browser for client-side navigation.

When the site is prerendered, the server data of each page is written next to its HTML as `__data.json`,
so client-side navigation works on a static host too.
