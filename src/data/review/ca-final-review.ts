import type { ReviewQuestion } from "./types";

/** 深入浅出竞赛算法总复习 复习题 */
export const caFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ca-final-review-1",
    chapter: "ca-final-review",
    level: 1,
    question: "竞赛中拿到题目后的第一步应该做什么？",
    answer: "看数据范围，用 1 秒准则（10^8 次/秒）倒推可接受的算法复杂度上界，再据此选择算法。",
    tags: ["竞赛策略"],
  },
  {
    id: "ca-final-review-2",
    chapter: "ca-final-review",
    level: 2,
    question: "区间更新+区间查询问题应该用什么算法？",
    answer: "线段树（带懒标记）。支持 O(log n) 的区间更新和区间查询。",
    tags: ["题型识别", "线段树"],
  },
  {
    id: "ca-final-review-3",
    chapter: "ca-final-review",
    level: 3,
    question: "竞赛中一道题卡了 30 分钟没进展怎么办？",
    answer: "换题。先做有把握的题拿基础分，难题留到最后。设定每题时间上限，避免死磕导致后面的题没时间。",
    tags: ["时间管理"],
  },
  {
    id: "ca-final-review-4",
    chapter: "ca-final-review",
    level: 4,
    question: "请描述从读题到 AC 的完整流程。",
    answer: "1.读题明确输入输出和约束；2.看数据范围估复杂度上界；3.识别题型匹配算法；4.写暴力解拿部分分；5.优化到目标复杂度；6.写代码+对拍验证；7.检查边界和溢出后提交。",
    tags: ["完整流程", "综合"],
  },
];
