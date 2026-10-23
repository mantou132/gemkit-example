import { postList } from '../../posts';
import type { BlogLayoutData } from './_layout.server';

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
  .stats {
    margin: 1em 0 0;
    color: var(--muted);
    font-size: 0.85em;
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

// 数据来自 `_layout.server.ts`，在文章之间导航时 layout 保持不变，也不会重新加载数据
@layout()
@adoptedStyle(style)
export default class BlogLayout extends GemElement {
  @property data?: BlogLayoutData;

  @template()
  #content = () => html`
    <aside>
      <h4>${i18n.get('allPosts')}</h4>
      ${postList.map((post) => html`<gem-active-link path=${`/blog/${post.slug}`}>${post.title}</gem-active-link>`)}
      <h4>${i18n.get('archive')}</h4>
      ${this.data?.archive.map(
        ({ year, count }) =>
          html`<gem-active-link path=${`/blog/archive/${year}`} pattern=${`/blog/archive/${year}/*`}
            >${year} (${count})</gem-active-link
          >`,
      )}
      <p class="stats">${this.data?.words} ${i18n.get('words')}</p>
    </aside>
    <div><gemkit-outlet></gemkit-outlet></div>
  `;
}
