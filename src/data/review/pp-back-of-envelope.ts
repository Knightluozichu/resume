import type { ReviewQuestion } from "./types";

/** 粗略估算 复习题 */
export const ppBackOfEnvelopeQuestions: ReviewQuestion[] = [
  {
    id: "pp-back-of-envelope-1",
    chapter: "pp-back-of-envelope",
    level: 1,
    question: `什么是72法则？`,
    answer: `x%年增长率下翻倍时间约72/x年。如7%增长→约10年翻倍。用于快速估算指数增长趋势。`,
    tags: ["72法则"],
  },
  {
    id: "pp-back-of-envelope-2",
    chapter: "pp-back-of-envelope",
    level: 2,
    question: `Little定律是什么？如何应用？`,
    answer: `系统中平均请求数=到达率*平均停留时间。如每秒100请求每个处理0.5秒→系统中平均50个请求。用于排队系统容量估算。`,
    tags: ["Little定律"],
  },
  {
    id: "pp-back-of-envelope-3",
    chapter: "pp-back-of-envelope",
    level: 3,
    question: `列出常用系统延迟的数量级。`,
    answer: `L1缓存~1ns，L2~4ns，内存~100ns，SSD~100us，磁盘~10ms，网络同城~1ms，跨洋~100ms。内存比磁盘快10万倍，这些差异决定架构选择。`,
    tags: ["系统延迟", "数量级"],
  },
  {
    id: "pp-back-of-envelope-4",
    chapter: "pp-back-of-envelope",
    level: 4,
    question: `用粗略估算设计一个短链接服务。`,
    answer: `写入：1亿/天/86400≈1200写/秒。读取：1亿*100/天/86400≈12万读/秒。存储：1亿*500B=50GB/天，10年约180TB。缓存：20%热门*500B=10GB入Redis。服务器：60万读QPS/5000=120台读，6000写/2000=3台写。结论：可行，瓶颈是读取，需缓存+副本。`,
    tags: ["综合", "粗略估算", "系统设计"],
  },
];
