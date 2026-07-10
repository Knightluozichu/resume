import type { ReviewQuestion } from "./types";

export const vdiDiffAlgorithmQuestions: ReviewQuestion[] = [
  {
    id: "vdi-diff-algorithm-1",
    chapter: "vdi-diff-algorithm",
    level: 2,
    question: `为什么需要 Diff 算法？它解决什么问题？`,
    answer:
      `patch 更新子节点时，最暴力的做法是把旧子节点全删、新子节点全建，但浪费严重——明明只移动了一个节点却要全部重建。Diff 算法解决「怎么最小化 DOM 操作」：比对新旧 children，找出哪些能复用（key 相同）、哪些要新增、哪些要删除、哪些要移动。复用（patch 内容）比重建（removeChild + createElement + appendChild）开销小得多。Diff 的目标是「在正确反映新结构的前提下，尽量复用已有 DOM，尽量少移动」。DOM 操作是渲染性能瓶颈，减少 DOM 操作是 Diff 的核心价值。`,
    tags: ["Diff", "DOM操作", "性能"],
  },
  {
    id: "vdi-diff-algorithm-2",
    chapter: "vdi-diff-algorithm",
    level: 3,
    question: `双端 Diff 的四步交叉比对是什么？`,
    answer:
      `双端 Diff 维护四个指针 oldStart/oldEnd/newStart/newEnd，每轮做四步尝试：①头头比（oldStart vs newStart），key 同则 patch 复用、两指针后移；②尾尾比（oldEnd vs newEnd），key 同则 patch、两指针前移；③头尾交叉（oldStart vs newEnd），key 同则 patch 并把旧头节点移到旧尾后；④尾头交叉（oldEnd vs newStart），key 同则 patch 并把旧尾节点移到旧头前。四步都不中时用 key 在旧 children 中找位置。循环到指针交叉结束，剩余新增或删除。双端 Diff 对纯头尾移动友好，但中间大段移动效率差。`,
    tags: ["双端Diff", "交叉比对"],
  },
  {
    id: "vdi-diff-algorithm-3",
    chapter: "vdi-diff-algorithm",
    level: 3,
    question: `快速 Diff（Vue 3 采用）的三阶段是什么？比双端 Diff 好在哪？`,
    answer:
      `快速 Diff 三阶段：①头部预处理——从头比 key 相同的直接 patch 跳过；②尾部预处理——从尾比 key 相同的直接 patch 跳过；③中间未知序列——新有旧无的新增、旧有新无的删除、都有的用最长递增子序列（LIS）确定无需移动的节点，只移动 LIS 外的节点。比双端 Diff 好在：①头尾预处理跳过大量公共前后缀（实际场景前后不变多），减少比对；②LIS 让移动次数达理论最少（移动数 = 总数 - LIS 长度）。双端 Diff 遇到中间大段移动时效率差，快速 Diff 综合更优。`,
    tags: ["快速Diff", "LIS", "预处理"],
  },
  {
    id: "vdi-diff-algorithm-4",
    chapter: "vdi-diff-algorithm",
    level: 4,
    question: `为什么不能用 index 做 key？用 index 做 key 会导致什么问题？`,
    answer:
      `key 是节点身份标识，Diff 用 key 判断新旧节点是否同一个。用 index 做 key 时，列表顺序变化（插入/删除/排序）会导致 index 重新分配：原来在位置 0 的节点 key=0，插入新节点后它跑到位置 1 变成 key=1，而新节点占了 key=0。Diff 按 key 匹配会认为「key=0 还是原来那个」，强行 patch 旧节点的内容为新节点的内容，导致：①组件内部状态错乱（输入框值、子组件状态跟错数据）；②本可复用的节点被错误 patch；③性能下降（本只需移动却变成内容更新）。正确做法用数据唯一 ID 做 key，让节点身份稳定不随位置变化。只有列表纯追加且不涉及组件状态时 index 才勉强可用。`,
    tags: ["key", "index", "Diff", "常见陷阱"],
  },
];
