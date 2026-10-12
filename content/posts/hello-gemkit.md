This post is a markdown file in `content/posts`. It is read with `node:fs` and converted to HTML in
`src/pages/blog/[slug].server.ts`, which only runs on the server, so `marked` and `fs` never reach the browser.

## Write a page

Create `src/pages/hello.ts` and it becomes `/hello`:

```ts
import { GemElement, html, template } from '@mantou/gem';
import { page } from '@mantou/gemkit';

@page('Hello')
export default class HelloPage extends GemElement {
  @template()
  #content = () => html`<h1>Hello</h1>`;
}
```

## Load data on the server

Put server-only code in a sibling `hello.server.ts`:

```ts
export async function load({ params, url }) {
  return { now: Date.now() }; // JSON only
}
```

The result is passed to the page as `data`. The first request embeds it in the HTML, client-side navigation
fetches `/hello/__data.json`.

## Ship it

`rsbuild build` prerenders every route and its data into `dist/web`, which can be deployed to any static host.
Run `gemkit start` instead when you need server-side rendering for dynamic routes.
