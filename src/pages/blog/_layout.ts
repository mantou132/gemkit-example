import { adoptedStyle, css, GemElement, html, template } from '@mantou/gem';

import { i18n } from '$gemkit/i18n';
import { postList } from '../../posts';

import '@mantou/gem/elements/link';

const style = css`
  :scope {
    display: grid;
    grid-template-columns: 14em 1fr;
    gap: 3em;
  }
  aside {
    position: sticky;
    top: 5em;
    align-self: start;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    font-size: 0.9em;
  }
  aside h4 {
    margin: 0 0 0.5em;
    color: var(--muted);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  gem-active-link {
    color: var(--muted);
  }
  gem-active-link:state(active) {
    color: var(--accent);
  }
  @media (width < 720px) {
    :scope {
      grid-template-columns: 1fr;
    }
    aside {
      display: none;
    }
  }
`;

// 在文章之间导航时 layout 保持不变
@adoptedStyle(style)
export default class BlogLayout extends GemElement {
  @template()
  #content = () => html`
    <aside>
      <h4>${i18n.get('allPosts')}</h4>
      ${postList.map((post) => html`<gem-active-link path=${`/blog/${post.slug}`}>${post.title}</gem-active-link>`)}
    </aside>
    <div><gemkit-outlet></gemkit-outlet></div>
  `;
}
