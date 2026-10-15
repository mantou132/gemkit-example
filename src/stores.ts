// 模块顶层的 store 会自动添加 key，服务端渲染时更新的值会同步到客户端
export const renderStore = createStore({ renderedAt: '' });
