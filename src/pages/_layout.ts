import { adoptedStyle, classMap, connectStore, css, GemElement, history, html, template } from '@mantou/gem';

import { i18n, languages, localizePath } from '$gemkit/i18n';

import '@mantou/gem/elements/link';

const style = css`
  :scope {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .header {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 2em;
    padding: 1em max(1.5em, calc(50vw - 30em));
    border-bottom: 1px solid var(--border);
    background: color-mix(in srgb, var(--bg) 85%, transparent);
    backdrop-filter: blur(8px);
  }
  .logo {
    font-weight: 700;
    font-size: 1.2em;
  }
  nav {
    display: flex;
    gap: 1.25em;
    flex: 1;
  }
  gem-active-link {
    color: var(--muted);
  }
  gem-active-link:state(active) {
    color: var(--fg);
  }
  .langs {
    display: flex;
    gap: 0.5em;
    font-size: 0.85em;
    text-transform: uppercase;
  }
  .langs a {
    color: var(--muted);
    text-decoration: none;
  }
  .langs a.active {
    color: var(--fg);
    font-weight: 600;
  }
  main {
    flex: 1;
    width: min(60em, 100% - 3em);
    margin: 0 auto;
    padding: 2em 0 4em;
  }
  footer {
    padding: 2em;
    text-align: center;
    color: var(--muted);
    font-size: 0.85em;
    border-top: 1px solid var(--border);
  }
`;

@adoptedStyle(style)
@connectStore(history.store)
export default class RootLayout extends GemElement {
  @template()
  #content = () => html`
    <header class="header">
      <gem-link class="logo" path="/">Gemkit</gem-link>
      <nav>
        <gem-active-link path="/">${i18n.get('home')}</gem-active-link>
        <gem-active-link path="/blog" pattern="/blog/*">${i18n.get('blog')}</gem-active-link>
        <gem-active-link path="/about">${i18n.get('about')}</gem-active-link>
      </nav>
      <div class="langs">
        ${languages.map(
          (lang) =>
            html`<a class=${classMap({ active: lang === i18n.currentLanguage })} href=${localizePath(lang)}>${lang}</a>`,
        )}
      </div>
    </header>
    <main><gemkit-outlet></gemkit-outlet></main>
    <footer>Built with Gem + gemkit</footer>
  `;
}
