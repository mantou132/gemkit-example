import type { Params } from '@mantou/gemkit';

import type { actions, GuestbookData } from './guestbook.server';

const { sign } = formActions<typeof actions>();

const style = css`
  form {
    display: grid;
    gap: 0.75em;
    margin: 1.5em 0 2.5em;
    padding: 1.25em 1.5em;
    border-radius: 12px;
    background: var(--card);
    border: 1px solid var(--border);
  }
  input,
  textarea,
  button {
    font: inherit;
    color: inherit;
  }
  input,
  textarea {
    padding: 0.5em 0.75em;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg);
  }
  button {
    justify-self: start;
    padding: 0.4em 1.4em;
    border: none;
    border-radius: 999px;
    background: var(--accent);
    color: white;
    cursor: pointer;
  }
  .error {
    margin: 0;
    color: crimson;
  }
  ul {
    display: grid;
    gap: 1em;
    padding: 0;
    list-style: none;
  }
  li p {
    margin: 0.25em 0 0;
  }
  time,
  .empty {
    color: var(--muted);
    font-size: 0.9em;
  }
  nav {
    display: flex;
    gap: 1em;
  }
`;

@page<Params, GuestbookData>({ title: () => i18n.get('guestbook') })
@adoptedStyle(style)
export default class GuestbookPage extends GemElement {
  @property data?: GuestbookData;

  #state = createState({ error: '' });

  // 不刷新页面提交，没有 JS 时表单也能原生提交，成功后清空输入
  #onSign: Parameters<typeof sign>[0] = (result, form) => {
    this.#state({ error: result?.error || '' });
    if (!result) form.reset();
  };

  @template()
  #content = () => html`
    <h1>${i18n.get('guestbook')}</h1>
    <p>${i18n.get('guestbookDesc')}</p>
    <form ${sign(this.#onSign)}>
      <input name="name" placeholder=${i18n.get('name')} value=${this.data?.name || ''} />
      <textarea name="message" rows="3" maxlength="200" placeholder=${i18n.get('message')}></textarea>
      <p class="error" v-if=${!!this.#state.error}>${i18n.get('required')}</p>
      <button>${i18n.get('sign')}</button>
    </form>
    <ul>
      ${this.data?.entries.map(
        ({ name, message, date }) => html`<li><strong>${name}</strong> <time>${date}</time><p>${message}</p></li>`,
      )}
    </ul>
    <p class="empty" v-if=${!this.data?.entries.length}>${i18n.get('noEntries')}</p>
    <nav v-if=${(this.data?.pages || 1) > 1}>
      <gem-link v-if=${this.data!.page > 1} path="/guestbook" query=${`?page=${this.data!.page - 1}`}
        >${i18n.get('previous')}</gem-link
      >
      <span>${this.data!.page} / ${this.data!.pages}</span>
      <gem-link v-if=${this.data!.page < this.data!.pages} path="/guestbook" query=${`?page=${this.data!.page + 1}`}
        >${i18n.get('next')}</gem-link
      >
    </nav>
  `;
}
