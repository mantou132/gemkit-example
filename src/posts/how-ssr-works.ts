import { html } from '@mantou/gem';

export default html`
  <p>When a request arrives, gemkit renders the page with <code>gem-ssr</code> in a simulated DOM:</p>
  <ol>
    <li>The router matches the URL and loads the layout and page modules.</li>
    <li>The page's <code>load</code> option fetches data, which is passed to the page as <code>data</code>.</li>
    <li>Elements render, shadow roots are serialized as declarative shadow DOM.</li>
  </ol>
  <p>
    The browser shows the HTML immediately. When the scripts arrive, elements are upgraded and reuse the existing DOM
    instead of rendering again, then navigation happens on the client.
  </p>
  <h2>Data loading</h2>
  <p>
    <code>load</code> runs on the server for the first request and in the browser for client-side navigation, so use
    isomorphic APIs such as <code>import()</code> and <code>fetch</code>.
  </p>
`;
