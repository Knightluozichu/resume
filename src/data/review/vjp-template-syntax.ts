import type { ReviewQuestion } from "./types";

export const vjpTemplateSyntaxQuestions: ReviewQuestion[] = [
  {
    id: "vjp-template-syntax-1",
    chapter: "vjp-template-syntax",
    level: 2,
    question: "v-if 和 v-show 的区别？各自适用场景？",
    answer:
      "v-if 是「真条件渲染」：条件为 false 时元素根本不渲染到 DOM，切换时会销毁/重建子组件（触发 unmount/mount，重置内部状态）。v-show 是「显示控制」：元素始终渲染到 DOM，只是通过切换 display:none 控制显隐，切换开销小但不卸载组件、不释放资源。选择：频繁切换用 v-show（避免反复销毁重建）；条件很少变化、或初始可能为 false 且内容重时用 v-show 会浪费初始渲染，用 v-if 更省（按需渲染）。注意 v-if 和 v-for 不要同时用在同一元素（v-if 优先级在 Vue 3 高于 v-for，易出错），应分开。",
    tags: ["v-if", "v-show", "指令"],
  },
  {
    id: "vjp-template-syntax-2",
    chapter: "vjp-template-syntax",
    level: 2,
    question: "简述 Vue 模板编译流程。",
    answer:
      "编译期（构建时或首次挂载）：①模板字符串经 parse 解析成 AST 抽象语法树（节点含 Element/Interpolation/Directive 等）；②transform 变换阶段做静态提升（hoistStatic，把不变的部分提到 render 外复用）、把指令转成等价 JS（v-if → 三元表达式、v-for → renderList/ map、@click → 注册事件）、给动态节点打 PatchFlag 标记；③generate 生成渲染函数 render() 代码字符串。运行期：执行 render 读取响应式数据（触发 track 收集依赖）产出 VNode 树；数据变化时 trigger 重新执行 render 得到新 VNode，与旧 VNode 做 patch 比对，按 PatchFlag 只 diff 动态部分，最小化 DOM 操作。",
    tags: ["编译", "AST", "渲染函数", "VNode"],
  },
  {
    id: "vjp-template-syntax-3",
    chapter: "vjp-template-syntax",
    level: 3,
    question: "v-for 为什么要加 key？用 index 作 key 有什么问题？",
    answer:
      "key 是 diff 算法复用节点的身份标识。patch 比对新旧 VNode 列表时，按 key 判断「这个节点是不是同一个」，相同 key 复用 DOM 只更新变化属性，不同 key 才销毁重建。用 index 作 key 的问题：当列表顺序变化（如头部插入、删除中间项、拖拽排序），index 仍是 0,1,2...，但对应的实际数据变了，diff 会误判「同一个节点」继续复用 DOM，导致：①表单类组件状态错乱（输入框内容串到别的项）；②过渡动画异常；③子组件内部状态没重置却显示了新数据。正确做法用数据本身的稳定唯一 id 作 key。只有纯展示且永不变序的列表用 index 才安全。",
    tags: ["v-for", "key", "diff", "PatchFlag"],
  },
  {
    id: "vjp-template-syntax-4",
    chapter: "vjp-template-syntax",
    level: 4,
    question: "为什么说「指令本质是编译期的语法糖」而非字符串替换？",
    answer:
      "字符串替换（如 Mustache 字面替换）只是把 {{ }} 换成值，无法处理逻辑。Vue 指令在编译期被翻译成等价的 JavaScript 代码：v-if 变成三元表达式（条件为假时返回 null，元素不渲染）；v-for 变成 renderList 调用返回数组；:class 绑定变成 normalizeClass 把对象/数组规范化成字符串；@click 变成 createElement 时注册的事件回调；v-model 变成 value 绑定 + input 事件监听。这意味着指令不是运行时解析的字符串，而是编译期就确定了的 JS 逻辑，能享受 Tree-shaking、静态提升、PatchFlag 等优化。理解这一点就不会把模板当「字符串模板引擎」，而是「编译到 render 函数的声明式 DSL」。",
    tags: ["指令", "编译", "渲染函数"],
  },
];
