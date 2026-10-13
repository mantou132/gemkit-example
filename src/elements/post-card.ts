const style = css`
  :host {
    display: block;
  }
  gem-link {
    display: block;
    color: inherit;
    text-decoration: none;
    padding: 1.25em 1.5em;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--card);
    transition: border-color 0.2s;
  }
  gem-link:hover {
    border-color: var(--accent);
  }
  h3 {
    margin: 0 0 0.25em;
    font-size: 1.15em;
  }
  time,
  p {
    margin: 0;
    color: var(--muted);
    font-size: 0.9em;
  }
`;

@customElement('app-post-card')
@adoptedStyle(style)
@shadow()
export class AppPostCardElement extends GemElement {
  @attribute slug: string;
  @attribute heading: string;
  @attribute date: string;
  @attribute summary: string;

  @template()
  #content = () => html`
    <gem-link path=${`/blog/${this.slug}`}>
      <h3>${this.heading}</h3>
      <time>${this.date}</time>
      <p>${this.summary}</p>
    </gem-link>
  `;
}
