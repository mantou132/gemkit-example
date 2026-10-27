import { postList } from '../posts';

const style = css`
  .hero {
    padding: 4em 0 3em;
    text-align: center;
  }
  h1 {
    margin: 0 auto;
    max-width: 14em;
    font-size: clamp(2em, 6vw, 3.25em);
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
  .subtitle {
    margin: 1em auto 2em;
    max-width: 36em;
    color: var(--muted);
    font-size: 1.1em;
  }
  .actions {
    display: flex;
    justify-content: center;
    gap: 1em;
  }
  .button {
    padding: 0.6em 1.4em;
    border-radius: 999px;
    border: 1px solid var(--border);
  }
  .button.primary {
    background: var(--accent);
    border-color: var(--accent);
    color: white;
  }
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
    gap: 1em;
    margin: 2em 0 4em;
  }
  .feature {
    padding: 1.25em 1.5em;
    border-radius: 12px;
    background: var(--card);
    border: 1px solid var(--border);
  }
  .feature h3 {
    margin: 0 0 0.5em;
  }
  .feature p {
    margin: 0;
    color: var(--muted);
  }
  .posts {
    display: grid;
    gap: 1em;
  }
`;

@page()
@adoptedStyle(style)
export default class HomePage extends GemElement {
  @template()
  #content = () => html`
    <section class="hero">
      <h1>${i18n.get('heroTitle')}</h1>
      <p class="subtitle">${i18n.get('heroSubtitle')}</p>
      <div class="actions">
        <gem-link class="button primary" path="/blog">${i18n.get('readBlog')}</gem-link>
        <gem-link class="button" path="/about">${i18n.get('learnMore')}</gem-link>
      </div>
    </section>
    <section class="features">
      <div class="feature">
        <h3>${i18n.get('featureRouting')}</h3>
        <p>${i18n.get('featureRoutingDesc')}</p>
      </div>
      <div class="feature">
        <h3>${i18n.get('featureSSR')}</h3>
        <p>${i18n.get('featureSSRDesc')}</p>
      </div>
      <div class="feature">
        <h3>${i18n.get('featureI18n')}</h3>
        <p>${i18n.get('featureI18nDesc')}</p>
      </div>
    </section>
    <h2>${i18n.get('latestPosts')}</h2>
    <div class="posts">
      ${postList.map(
        (post) =>
          html`<app-post-card
            slug=${post.slug}
            heading=${post.title}
            date=${post.date}
            summary=${post.summary}
          ></app-post-card>`,
      )}
    </div>
  `;
}
