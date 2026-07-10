import type { ReviewQuestion } from "./types";

/** 竞赛基础：I/O、复杂度与调试 复习题 */
export const caContestBasicsQuestions: ReviewQuestion[] = [
  {
    id: "ca-contest-basics-1",
    chapter: "ca-contest-basics",
    level: 1,
    question: `1 秒准则是什么？`,
    answer: `1 秒约能执行 10^8 次基本运算。据此根据数据规模判断算法复杂度是否可接受。`,
    tags: ["复杂度"],
  },
  {
    id: "ca-contest-basics-2",
    chapter: "ca-contest-basics",
    level: 2,
    question: `为什么竞赛中要用快速读入？`,
    answer: `cin/cout 默认与 stdio 同步，大数据量时慢 5-10 倍。快速读入用 getchar 逐字符解析，显著减少 I/O 时间，避免 TLE。`,
    tags: ["I/O优化"],
  },
  {
    id: "ca-contest-basics-3",
    chapter: "ca-contest-basics",
    level: 3,
    question: `n=10^5 时限 1 秒，O(n^2) 算法能过吗？`,
    answer: `不能。O(n^2) 约 10^10 次运算，远超 10^8 上限。需优化到 O(n log n) 约 1.7×10^6 次。`,
    tags: ["复杂度", "应用"],
  },
  {
    id: "ca-contest-basics-4",
    chapter: "ca-contest-basics",
    level: 4,
    question: `对拍调试的完整流程是什么？`,
    answer: `1.写暴力解（保证正确但慢）；2.写待测解（可能错但快）；3.写数据生成器（小规模随机）；4.循环运行比较输出；5.发现不一致即找到反例。`,
    tags: ["对拍", "调试"],
  },
];
