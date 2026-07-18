import type { ReviewQuestion } from "./types";

/** Pro .NET Memory Management, Second Edition · 15 章综合复习题 */
export const dnmFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "dnm-final-review-1",
    chapter: "dnm-final-review",
    level: 1,
    question: "如何用在哪里、谁拥有、何时触发、状态怎样变化、哪层证据证明五个问题压缩全书 15 章？",
    answer: "Ch1-5 回答对象/页/CLR/heap 在哪里；Ch6/12-14 回答 allocation、root、resource/buffer owner；Ch3/7/11/15 回答时间窗、budget/config/API；Ch8-10 重建 mark/plan/reclaim；Ch3/15 用 counters、EventPipe、dump、ClrMD 逐层证明。",
    tags: ["15 章", "证据链", "所有权"],
  },
  {
    id: "dnm-final-review-2",
    chapter: "dnm-final-review",
    level: 2,
    question: "高 allocation、post-GC retention、fragmentation 与 RSS/native 增长分别怎样定义，为什么不能用一次 GC.Collect 同时修复？",
    answer: "allocation 是时间窗累计创建，retention 是覆盖回收后仍有 root 的 live graph，fragmentation 是 committed heap 内分散 free space，RSS 还含 native/stack/JIT/mapping。Collect 只能请求回收不可达托管对象，不能断开 root、释放外部资源或合并所有空洞，还可能增加 pause/promotion。",
    tags: ["分配", "保留", "碎片", "RSS"],
  },
  {
    id: "dnm-final-review-3",
    chapter: "dnm-final-review",
    level: 3,
    question: "怎样重建一次 full blocking GC，并把 high survival、pins 和 LOH fragmentation 与暂停证据对齐？",
    answer: "从 trigger/generation selection/SuspendEE 开始，mark roots/handles/cards，plan 以 live plugs/gaps/pins 选择 sweep/compact，随后 rebuild/resume。高存活放大搬运，pins 切断 plugs，LOH 空洞受连续尺寸限制；用 GCStart/Stop、survival/promotion、PinnedObjectsCount、GenerationInfo、Compacted、pause/p99 验证。",
    tags: ["GC 阶段", "存活率", "固定", "LOH"],
  },
  {
    id: "dnm-final-review-4",
    chapter: "dnm-final-review",
    level: 4,
    question: "一个 ArrayPool/Span 优化在 microbenchmark 中 alloc=0，最终上线门禁还必须覆盖什么？",
    answer: "必须证明 owner/lease：所有 Task/callback/pointer 在 Return 前结束，finally 覆盖异常取消，无重复归还、归还后使用和敏感数据泄露；测试边界/最大尺寸/并发。再在真实负载比较 CPU、throughput、p99、live heap、RSS、pool high-water，并设正确性与资源阈值回滚。",
    tags: ["ArrayPool", "Span", "归还后使用", "验收"],
  },
];
