import type { ReviewQuestion } from "./types";

/** CPU眼里的C/C++ · 最终复盘题 */
export const cpcFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cpc-final-review-1",
    chapter: "cpc-final-review",
    level: 1,
    question: `用一条链串联源码、编译器、可执行文件与运行行为。`,
    answer: `source contract 先形成 type/lifetime/control constraints，compiler 经 IR 和 target ABI 生成 object/executable，loader 建立 mappings 与 startup context，thread 执行 instructions 并访问 translated memory，最终形成 observable behavior。每个箭头都可改变表面 code shape，但必须保持语言要求。`,
    tags: ["证据链", "全书复盘", "运行行为"],
  },
  {
    id: "cpc-final-review-2",
    chapter: "cpc-final-review",
    level: 2,
    question: `一个非空且已映射的 pointer 为什么仍可能是悬空访问？`,
    answer: `non-null 与 page mapping 只说明地址数值和页级访问条件；owner 释放后 object lifetime 已结束，即使 allocator 尚未复用 bytes、OS 仍保留 mapping，C++ 解引用也无效。用 ASan/allocation trace 证明 invalidation，修复 owner/borrow relationship，而不是只加判空。`,
    tags: ["悬空指针", "映射", "所有权"],
  },
  {
    id: "cpc-final-review-3",
    chapter: "cpc-final-review",
    level: 3,
    question: `optimized backtrace 少一帧时，如何区分 inline、tail call 与 unwind 失败？`,
    answer: `先锁定 build ID、raw PCs 与匹配 symbols/unwind metadata；查看 optimized assembly 和 inline debug info，确认函数是否内联或 call 是否变 tail jump；再检查 frame-pointer/unwind coverage 与 stack corruption。不能仅由显示行数判断。`,
    tags: ["backtrace", "inline", "tail call"],
  },
  {
    id: "cpc-final-review-4",
    chapter: "cpc-final-review",
    level: 4,
    question: `一次完整修复闭环包含哪些步骤，为什么“多跑几次不复现”不够？`,
    answer: `闭环包括固定复现、找到最早 broken invariant、列分层 hypotheses、收集控制变量 evidence、主动反证、恢复 type/lifetime/ownership/synchronization contract、加入旧实现会失败的回归、记录适用边界。低概率 bug 受 allocator 和 scheduler timing 影响，不复现只是弱证据，不能替代 invariant proof。`,
    tags: ["修复闭环", "反证", "回归验证"],
  },
];
