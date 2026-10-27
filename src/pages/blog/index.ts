import { postList } from '../../posts';

const style = css`
  .posts {
    display: grid;
    gap: 1em;
  }
`;

@page({ title: () => i18n.get('blog') })
@adoptedStyle(style)
export default class BlogPage extends GemElement {
  @template()
  #content = () => html`
    <h1>${i18n.get('blog')}</h1>
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
