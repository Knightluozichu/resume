import type { ReviewQuestion } from "./types";

export const vdiComponentModelQuestions: ReviewQuestion[] = [
  {
    id: "vdi-component-model-1",
    chapter: "vdi-component-model",
    level: 2,
    question: "组件的本质是什么？渲染器遇到组件类型的 VNode 怎么处理？",
    answer:
      "组件本质是一个返回 VNode 的函数，setup 提供响应式状态与副作用。在渲染器看来，组件是 VNode 的 type 为函数（或对象）的特殊节点。patch 遇到组件 VNode 时不创建 DOM 元素，而是：①创建组件实例 instance（存 props、setupResult、subTree 等）；②resolveProps 解析父传入的 props；③执行 setup(props, ctx) 拿到状态；④取 render 函数；⑤用 effect 包裹 render 建立响应式（render 内读响应式数据 track，数据变 trigger 重跑）；⑥执行 render 产出 subTree（VNode 树）；⑦patch(subTree) 递归挂载真实 DOM。组件就是把「一段可复用的 VNode 树」封装起来。",
    tags: ["组件", "VNode", "渲染器"],
  },
  {
    id: "vdi-component-model-2",
    chapter: "vdi-component-model",
    level: 3,
    question: "组件挂载的完整流程是什么？setup 和 render 各负责什么？",
    answer:
      "挂载流程：①创建组件实例 instance；②resolveProps 解析 props（只读）；③执行 setup(props, ctx) 拿 setupResult（响应式状态、副作用、暴露给 render 的数据）；④取 render 函数（手写或编译生成）；⑤用 effect 包裹 render 建立响应式；⑥执行 render 产出 subTree；⑦patch(subTree) 递归挂载 DOM。setup 负责初始化状态和注册副作用（执行一次，返回数据暴露给 render）；render 负责描述视图结构（返回 VNode 树，响应式数据变化时重跑产出新 subTree）。setup 执行一次，render 在数据变化时被 effect 重新执行。",
    tags: ["setup", "render", "组件挂载"],
  },
  {
    id: "vdi-component-model-3",
    chapter: "vdi-component-model",
    level: 3,
    question: "emit 的工作原理是什么？为什么 emit('add') 能触发父组件的 onAdd？",
    answer:
      "emit 基于「事件名 → props 名」的命名约定转换。子组件调用 ctx.emit('add', value) 时，渲染器把事件名 add 转成 props 名 onAdd（首字母大写加 on 前缀），然后从 instance.props 上找 onAdd 对应的函数执行。父组件写 `<Counter onAdd={handleAdd} />` 时，onAdd 作为普通 prop 传给子组件的 instance.props。所以 emit('add') → 找 props.onAdd → 执行 handleAdd(value)。这本质是用 props 传递回调函数，emit 只是查找并调用的语法糖。优点是声明式、子组件不直接依赖父组件的方法名，实现了单向数据流（子 → emit → 父）。",
    tags: ["emit", "props", "父子通信"],
  },
  {
    id: "vdi-component-model-4",
    chapter: "vdi-component-model",
    level: 4,
    question: "为什么 Props 设计为只读（单向数据流）？直接改 props 有什么问题？",
    answer:
      "Props 只读是为了保证数据流向可追溯：父 → props → 子，子 → emit → 父。如果子组件能直接改 props，数据流向就混乱——父组件的数据被子组件偷偷改了，父组件不知道，调试时无法追踪谁改了数据。直接改 props 的问题：①父组件重渲染时新 props 会覆盖子组件的修改，导致修改丢失；②多个子组件共享同一 props 源时互相干扰；③违背单向数据流，状态变化不可预测。正确做法：子组件要改数据就 emit 事件通知父组件，父组件改自己的数据，数据变经响应式触发父重渲染，新 props 流向子组件。这样数据流始终单向可追溯。",
    tags: ["props", "单向数据流", "设计动机"],
  },
];
