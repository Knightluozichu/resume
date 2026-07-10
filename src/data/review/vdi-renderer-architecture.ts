import type { ReviewQuestion } from "./types";

export const vdiRendererArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "vdi-renderer-architecture-1",
    chapter: "vdi-renderer-architecture",
    level: 2,
    question: `渲染器的 mount、unmount、patch 各自做什么？render 如何分发？`,
    answer:
      `mount 把 VNode 转为真实节点并插入容器（创建节点 → 设属性 → 递归挂子节点 → 插入）。unmount 把真实节点从容器移除。patch 比对新旧 VNode 更新差异（类型不同则 unmount+mount；同类型元素复用 el 更新属性和子节点；同类型组件更新 props 重渲染）。render(vnode, container) 的分发：若 container 已有旧 vnode 且新 vnode 存在 → patch；若无旧 vnode 且新 vnode 存在 → mount；若新 vnode 为空且有旧 vnode → unmount。`,
    tags: ["渲染器", "mount", "patch", "unmount"],
  },
  {
    id: "vdi-renderer-architecture-2",
    chapter: "vdi-renderer-architecture",
    level: 3,
    question: `createRenderer 如何实现平台解耦？为什么渲染器能与平台无关？`,
    answer:
      `createRenderer 把所有平台相关操作（createElement/insert/remove/patchProps 等）抽成 options 参数注入。渲染器核心逻辑（mount/unmount/patch/Diff）只调用 options 接口，不直接调用 document.* 或 ctx.*。浏览器渲染器注入 document.createElement、parent.appendChild 等；Canvas 渲染器注入 ctx.fillRect 等；SSR 渲染器注入字符串拼接逻辑。换 options 就换渲染目标，核心逻辑完全复用。这就是平台解耦——渲染器设计与平台无关，具体平台操作由调用方注入。`,
    tags: ["createRenderer", "平台解耦", "自定义渲染器"],
  },
  {
    id: "vdi-renderer-architecture-3",
    chapter: "vdi-renderer-architecture",
    level: 3,
    question: `patch 同类型元素时为什么能复用真实节点？复用体现在哪里？`,
    answer:
      `patch 同类型元素（如旧 div → 新 div）时，新旧 VNode 描述的是「同一种标签」，真实 DOM 节点无需重建——直接 n2.el = n1.el 复用旧的真实节点，只更新有变化的属性和子节点。复用体现在：①不调用 createElement 创建新节点；②不调用 removeChild 移除旧节点；③保留旧节点的 DOM 状态（如 input 的输入值、视频播放进度、滚动位置等）。创建新 DOM 节点发生在类型不同（div → span 则 unmount div + mount span）或首次 mount 时。复用避免了销毁重建的开销，是 patch 高效的关键。`,
    tags: ["patch", "复用", "VNode"],
  },
  {
    id: "vdi-renderer-architecture-4",
    chapter: "vdi-renderer-architecture",
    level: 4,
    question: `如果要实现一个渲染到字符串（SSR）的自定义渲染器，options 应该怎么设计？与浏览器渲染器有何本质区别？`,
    answer:
      `SSR 渲染器的 options：createElement 返回一个普通对象 { tag, attrs, children: [] }（不是真实 DOM）；insert 把子节点对象 push 到父节点的 children 数组；patchProps 把属性写入对象的 attrs；最后需要一个 serialize 函数把 vnode 对象树序列化成 HTML 字符串（如 \`<div class=\"x\">hello</div>\`）。本质区别：浏览器渲染器的「节点」是真实 DOM 元素（有 appendChild 等 API），SSR 渲染器的「节点」是普通对象（无 DOM API，靠序列化输出字符串）。但渲染器核心的 mount/patch/Diff 逻辑完全一样——因为核心只依赖 options 接口，不依赖节点是 DOM 还是对象。这正是 createRenderer 平台解耦的价值：一套核心逻辑服务多平台。`,
    tags: ["createRenderer", "SSR", "自定义渲染器", "设计动机"],
  },
];
