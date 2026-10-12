import { html } from '@mantou/gem';

export default html`
  <p>
    This post is a Gem template. It is imported by the post page with <code>import()</code>, so every post is its own
    chunk and the page only downloads what it shows.
  </p>
  <h2>Write a page</h2>
  <p>Create <code>src/pages/hello.ts</code> and it becomes <code>/hello</code>:</p>
  <pre><code>import { GemElement, html, template } from '@mantou/gem';
import { page } from '@mantou/gemkit';

@page('Hello')
export default class HelloPage extends GemElement {
  @template()
  #content = () => html\`&lt;h1&gt;Hello&lt;/h1&gt;\`;
}</code></pre>
  <h2>Ship it</h2>
  <p>
    <code>rsbuild build</code> prerenders every static route into <code>dist/web</code>, which can be deployed to any
    static host. Run <code>gemkit start</code> instead when you also need server-side rendering for dynamic routes.
  </p>
`;
