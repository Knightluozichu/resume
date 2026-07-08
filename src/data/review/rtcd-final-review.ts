import type { ReviewQuestion } from "./types";

export const rtcdFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "rtcd-final-review-1",
    chapter: "rtcd-final-review",
    level: 1,
    question: "碰撞检测完整管线的四个阶段是什么？",
    answer: "包围体更新 → Broad Phase（粗筛产出候选对）→ Narrow Phase（精算确认碰撞）/ CCD（高速物体旁路）→ 碰撞响应。每帧物理步进按此顺序执行，优化层（SIMD/缓存/并行）贯穿全程。",
    tags: ["管线", "总复习"],
  },
  {
    id: "rtcd-final-review-2",
    chapter: "rtcd-final-review",
    level: 2,
    question: "Broad Phase 和 Narrow Phase 在管线中如何衔接？",
    answer: "Broad Phase 用包围体（AABB/球）快速排除不可能碰的对，输出「候选对」列表。Narrow Phase 只对候选对做精确检测（GJK/SAT），确认是否真正相交并求接触信息。候选对是两阶段的衔接点——Broad Phase 减量，Narrow Phase 精算，两阶段把 $O(n^2)$ 降到 $O(n \\log n)$。",
    tags: ["管线", "候选对"],
  },
  {
    id: "rtcd-final-review-3",
    chapter: "rtcd-final-review",
    level: 3,
    question: "CCD 在管线中是什么角色？它如何与 Narrow Phase 配合？",
    answer: "CCD 是高速物体的旁路。拿到候选对后按速度分流：普通物体走 Narrow Phase（GJK/SAT 离散精确检测），高速物体（一帧位移可能超过障碍厚度）走 CCD 用扫掠体求 $t_{hit}$ 防穿透。CCD 不替代 Narrow Phase，而是对 DCCD 无法处理的高速场景的补充，保证物理正确性。",
    tags: ["CCD", "旁路", "管线"],
  },
  {
    id: "rtcd-final-review-4",
    chapter: "rtcd-final-review",
    level: 4,
    question: "如果碰撞管线帧时间超标，应如何系统性地定位和优化？",
    answer: "①用 Profiler 定位瓶颈环节：Broad Phase 耗时还是 Narrow Phase 耗时。②Broad Phase 慢：检查候选对数量是否过多（包围体太松/空间分割不当），换更紧包围体或更合适的分割策略。③Narrow Phase 慢：检查候选对是否过多（Broad Phase 误判率高）或单次检测太慢（GJK 迭代过多），优化数据布局用 SIMD、多核并行分片。④高速物体穿透：检查 CCD 是否启用、速度阈值是否合理。核心原则：先测量定位再优化，数据布局是地基，切忌盲目优化算法而忽略管线全貌。",
    tags: ["综合", "性能调优", "管线"],
  },
];
