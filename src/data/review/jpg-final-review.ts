import type { ReviewQuestion } from "./types";

export const jpgFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "jpg-final-review-1",
    chapter: "jpg-final-review",
    level: 3,
    question: "用「一次点击 → 发请求 → 更新页面」描述五层知识点如何协同。",
    answer:
      "① 语言基础：事件处理用箭头函数形成闭包，捕获 display 等 DOM 引用；变量用 const 声明，作用域正确。② 对象与原型：fetch 返回的 Response 对象、data 对象都继承自原型链，调用的 .json()、JSON.stringify 等方法来自原型。③ 异步模型：await fetchData 暂停 async 函数（不阻塞主线程），fetch 的网络 I/O 由浏览器 Web API 处理，回调进入微任务队列，事件循环在同步代码后调度。④ DOM/BOM：addEventListener 监听点击，textContent 更新触发重排重绘（事件循环渲染阶段），可用事件委托减少监听器。⑤ 模块系统：fetchData/format 通过 ESM import 静态加载，支持 tree-shaking 减小包体积。4 行代码，五层全部参与。",
    tags: ["五层协同", "运行时旅程", "架构"],
  },
  {
    id: "jpg-final-review-2",
    chapter: "jpg-final-review",
    level: 4,
    question: "什么是工程判断力三问？各自解决什么典型问题？",
    answer:
      "三问：① 数据是值还是引用？——判断赋值/传参后修改是否影响外部。原始类型拷贝值（互不影响），对象拷贝地址（共享同对象）。误判导致「改了不生效」（原始类型期望共享）或「不该变却变了」（对象意外共享）。典型：React 状态必须返回新对象（引用改变才触发渲染）。② 异步用 Promise 还是回调？——默认 Promise/async-await（微任务，优先级高，可链式可组合），只有 scroll 等高频事件才用回调+节流。误判导致回调地狱、竞态、未处理 rejection。③ 瓶颈在 DOM 还是计算？——DOM 问题用 rAF/Fragment/transform（减少重排），计算问题用 Worker/防抖/算法（减少主线程占用）。误判导致优化无效。三问覆盖前端工程 90% 的常见决策。",
    tags: ["工程判断力", "值与引用", "异步选择", "性能瓶颈"],
  },
  {
    id: "jpg-final-review-3",
    chapter: "jpg-final-review",
    level: 4,
    question: "五层知识的交叉点有哪些典型问题？为什么交叉点是真正考点？",
    answer:
      "典型交叉点：① 闭包捕获 DOM 引用不释放 → 内存泄漏（语言基础+DOM）；② async 函数里的 this 若不绑定会丢失（语言基础+对象）；③ Promise 链中操作 DOM 不批处理 → 布局抖动（异步+DOM）；④ ESM 循环依赖遇到实时绑定，行为与 CJS 值拷贝不同（对象+模块）；⑤ 闭包捕获的引用类型变量被外部修改影响闭包内逻辑（语言基础+值引用）。交叉点是真正考点，因为：单层知识点（如「let 是块级作用域」）照文档抄就会，但「闭包捕获的 let 变量在循环中如何表现」「async 中 this 如何绑定」需要综合多层理解。面试和实战考的恰恰是这些协同与冲突，而非孤立知识点。掌握交叉点标志从「会写」到「懂运行时」的跨越。",
    tags: ["交叉点", "五层协同", "内存泄漏", "this 绑定", "布局抖动"],
  },
  {
    id: "jpg-final-review-4",
    chapter: "jpg-final-review",
    level: 4,
    question: "如何判断一段 JavaScript 性能问题的瓶颈在 DOM 还是计算？如何分别优化？",
    answer:
      "判断方法：用 Chrome DevTools Performance 面板录制。若主要时间在 Layout/Paint/Composite（紫色绿色块），瓶颈在 DOM——重排重绘过多；若主要时间在 Scripting（黄色块）且主线程长任务（>50ms）多，瓶颈在计算——CPU 密集逻辑。DOM 优化：① 批量操作用 DocumentFragment 只触发一次重排；② 读写分离避免布局抖动；③ 动画用 transform/opacity 走合成层不触发重排；④ 视觉更新用 rAF 与刷新同步；⑤ 减少节点数量与嵌套深度。计算优化：① CPU 密集任务移到 Web Worker 不阻塞主线程；② 高频事件（scroll/resize）用防抖节流；③ 大列表用虚拟滚动减少 DOM；④ 算法复杂度优化（O(n²)→O(n log n)）；⑤ 避免同步 JSON.parse 巨型字符串。误判方向会导致优化无效。",
    tags: ["性能优化", "DOM 瓶颈", "计算瓶颈", "DevTools", "Web Worker"],
  },
];
