import { type PostMeta, postList } from '../../../posts';

// `[...path]` 匹配 `/blog/archive/2026` 和 `/blog/archive/2026/10`，匹配的部分是参数 `path`
type ArchiveParams = { path: string };

const style = css`
  .posts {
    display: grid;
    gap: 1em;
  }
`;

@page<ArchiveParams, PostMeta[]>({
  // 同构的 `load`，服务端渲染、预渲染和客户端导航时都会执行
  load: ({ params: { path } }) => postList.filter((post) => post.date.startsWith(path.replaceAll('/', '-'))),
  title: ({ params: { path } }) => `${i18n.get('archive')} ${path}`,
  // 预渲染所有年份和月份
  paths: () =>
    [...new Set(postList.flatMap(({ date }) => [date.slice(0, 4), date.slice(0, 7).replace('-', '/')]))].map(
      (path) => ({ path }),
    ),
})
@adoptedStyle(style)
export default class ArchivePage extends GemElement {
  @property params?: ArchiveParams;
  @property data?: PostMeta[];

  @template()
  #content = () => html`
    <h1>${i18n.get('archive')} ${this.params?.path}</h1>
    <div class="posts">
      ${this.data?.map(
        (post) =>
          html`<app-post-card
            slug=${post.slug}
            heading=${post.title}
            date=${post.date}
            summary=${post.summary}
          ></app-post-card>`,
      )}
    </div>
    <p v-if=${!this.data?.length}>${i18n.get('noPosts')}</p>
  `;
}
