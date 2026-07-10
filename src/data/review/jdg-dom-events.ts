import type { ReviewQuestion } from "./types";

export const jdgDomEventsQuestions: ReviewQuestion[] = [
  {
    id: "jdg-dom-events-1",
    chapter: "jdg-dom-events",
    level: 2,
    question: `事件流三阶段是什么？addEventListener 第三参的作用？target 和 currentTarget 的区别？`,
    answer:
      `三阶段：①捕获阶段——window → document → 祖先 → 目标父（向下传播）；②目标阶段——在 event.target 上触发；③冒泡阶段——目标父 → 祖先 → document → window（向上传播）。addEventListener 第三参 useCapture：true 时在捕获阶段触发，默认 false 在冒泡阶段触发（也可传 {capture:true, passive:true} 对象）。target 是事件的实际源头（被点击的元素），currentTarget 是当前绑定监听器的元素——在冒泡过程中 currentTarget 会逐层变化（从内到外），而 target 始终是最初的事件源。事件委托中 target 用来判断实际子元素，currentTarget 始终是绑监听器的父元素。`,
    tags: ["事件流", "捕获", "冒泡", "target"],
  },
  {
    id: "jdg-dom-events-2",
    chapter: "jdg-dom-events",
    level: 3,
    question: `事件委托是什么？它解决了什么问题？如何用 closest 精确匹配？`,
    answer:
      `事件委托是利用冒泡在父元素注册一个监听器统一处理所有子元素事件。解决三个问题：①减少监听器数量——100 个子元素只需 1 个父级监听器，省内存；②初始化效率——一次绑定而非逐个；③动态元素覆盖——运行时新增子元素自动被父级监听器覆盖，无需重新绑定。实现：父元素 addEventListener，回调中 e.target 获取实际点击子元素，但 e.target 可能是子元素的子元素（如 li 里的 span），用 e.target.closest('.item') 向上查找最近匹配元素，确保匹配到列表项而非内部元素。判断 if (item) 排除点击空白区域。e.currentTarget 始终是绑监听器的父元素。`,
    tags: ["事件委托", "closest", "冒泡"],
  },
  {
    id: "jdg-dom-events-3",
    chapter: "jdg-dom-events",
    level: 3,
    question: `stopPropagation 和 preventDefault 的区别？什么时候该用/不该用？`,
    answer:
      `stopPropagation() 阻止事件在 DOM 树中继续传播（冒泡或捕获），但当前元素上其他监听器仍执行（要阻止同元素其他监听器用 stopImmediatePropagation）。preventDefault() 阻止元素默认行为（链接跳转、表单提交、复选框勾选），不影响事件传播。两者独立。该用 stopPropagation：弹窗内部点击不触发 document 关闭弹窗监听、嵌套组件隔离事件。不该用：无脑给所有监听器加会破坏父级事件委托——子元素 stopPropagation 让父元素靠冒泡的委托失效。该用 preventDefault：表单校验失败阻止提交、链接用 JS 处理而非跳转、自定义右键菜单。原则：只在确有需求时用，不要习惯性加。`,
    tags: ["stopPropagation", "preventDefault", "事件传播"],
  },
  {
    id: "jdg-dom-events-4",
    chapter: "jdg-dom-events",
    level: 4,
    question: `MutationObserver 的工作原理是什么？相比已废弃的 mutation events 有什么优势？`,
    answer:
      `MutationObserver 异步监听 DOM 变更：new MutationObserver(callback) 创建观察者，observe(root, options) 开始观察，options 配置 childList（子节点增删）、subtree（整个子树）、attributes（属性变化）、characterData（文本变化）、attributeFilter（指定属性）。变更在微任务中批量回调——callback 收到 mutations 数组，每个 mutation 含 type/addedNodes/removedNodes/attributeName 等。disconnect() 停止观察，takeRecords() 取出待处理记录。相比已废弃 mutation events 的优势：①异步批量回调而非每次变更同步触发，避免频繁回调卡顿；②只观察指定节点和指定变更类型，精确控制；③微任务调度，性能更好。用途：监听动态内容、第三方库 DOM 操作追踪、虚拟列表与实际 DOM 同步。`,
    tags: ["MutationObserver", "微任务", "DOM变更"],
  },
];
