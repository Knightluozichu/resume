import type { ReviewQuestion } from "./types";

export const jfsReactEssentialsQuestions: ReviewQuestion[] = [
  {
    id: "jfs-react-essentials-1",
    chapter: "jfs-react-essentials",
    level: 2,
    question: "为什么 React 要用虚拟 DOM，而不是直接操作真实 DOM？",
    answer:
      "虚拟 DOM 的核心价值不是绝对性能，而是「抽象层」。直接操作真实 DOM 需手动追踪「当前 DOM 是什么样、该改哪里」，状态一复杂就极易脱节。虚拟 DOM 让开发者写声明式代码「状态 N 时界面应长这样」，React 在内存中用 JS 对象树模拟 DOM，状态变化时生成新树与旧树做 diff，算出最小变更集再批量提交真实 DOM。这把「命令式 DOM 操作」降级为「声明式状态描述」，同时通过批量更新和同层 diff 把性能控制在可接受范围。代价是多一层内存开销和 diff 成本，极高性能场景不如精细的手动 DOM 操作。",
    tags: ["虚拟DOM", "声明式渲染"],
  },
  {
    id: "jfs-react-essentials-2",
    chapter: "jfs-react-essentials",
    level: 2,
    question: "useState 和 useRef 有什么本质区别？什么时候该用哪个？",
    answer:
      "useState 的更新会触发组件重渲染，适合「需要反映到界面上的数据」；useRef 修改 .current 不会触发重渲染，适合「需要在渲染之间保持但不显示的值」。useState 是异步批量更新（同一事件中多次 setCount 只触发一次重渲染，基于闭包快照），ref 是同步立即可见。判断标准：这个值变化时界面要不要变？要变用 state，不变用 ref。典型 ref 场景：访问 DOM 节点（input.focus()）、存定时器 id、缓存上一次的值。误用 ref 当 state 会导致界面不更新；误用 state 当 ref 会导致无谓重渲染。",
    tags: ["Hooks", "useState", "useRef"],
  },
  {
    id: "jfs-react-essentials-3",
    chapter: "jfs-react-essentials",
    level: 3,
    question: "useEffect 的依赖数组填错会有什么后果？正确做法是什么？",
    answer:
      "省略依赖数组会让 effect 每次渲染都执行，造成无限请求/死循环；填错依赖（漏掉用到的响应式变量）会让闭包捕获过期的旧值，出现「数据不更新」的诡异 bug——因为 effect 用的是首次渲染时的闭包快照。正确做法：把 effect 内引用的所有响应式变量（state/props）都写进依赖数组；需要「只在挂载时执行一次」时确保逻辑确实不依赖任何响应式值；配合 ESLint 的 exhaustive-deps 规则自动捕获遗漏。清理函数（return）必须在依赖变化或卸载时释放资源，否则内存泄漏。",
    tags: ["useEffect", "依赖数组", "闭包"],
  },
  {
    id: "jfs-react-essentials-4",
    chapter: "jfs-react-essentials",
    level: 3,
    question: "React 的 reconciliation 算法如何把树对比降到 O(n)？key 的作用是什么？",
    answer:
      "reconciliation 用两个假设把 O(n³) 的树对比降到 O(n)：①不同类型的元素产生不同树（div 变 span 直接替换整棵子树，不深比）；②同层兄弟节点靠 key 标识复用/移动。diff 时同层比较：类型相同则复用 DOM 节点、只更新属性；类型不同则卸载旧的、挂载新的。key 在列表中决定「这个元素是原来的那个还是新的」——有稳定 key，React 识别出是「移动」而非「销毁+新建」，能保留组件状态、复用 DOM；用数组 index 当 key 在增删时会导致状态错乱（index 变了，React 以为是不同元素）。key 必须稳定、唯一、与数据身份对应。",
    tags: ["reconciliation", "diff", "key"],
  },
];
