import { ReviewQuestion } from "./types";

export const pdpMentalRepresentationsQuestions: ReviewQuestion[] = [
  {
    id: "pdp-mr-1",
    chapter: "pdp-mental-representations",
    level: 1,
    question: `什么是心理表征？它与单纯的记忆力有什么本质区别？`,
    answer: `心理表征是专家大脑中对应特定领域的高质量认知结构。它与记忆力的本质区别在于：不是记忆量的差异，而是信息组织方式的差异。国际象棋大师的记忆棋盘能力不是因为记忆力好，而是拥有数万个棋局模式的心理表征，能将信息组块为有意义的模式。`,
    tags: ["心理表征", "核心概念"],
  },
  {
    id: "pdp-mr-2",
    chapter: "pdp-mental-representations",
    level: 2,
    question: `新手与专家在信息处理上的根本差异是什么？心理表征如何改变工作记忆效率？`,
    answer: `新手的信息以孤立碎片存在，工作记忆迅速过载；专家的信息被组织为结构化组块和模式，工作记忆高效运转。心理表征通过组块将多个信息单元组织为一个有意义的模式，大大减少工作记忆的负担，使专家能在极短时间内做出高质量决策。`,
    tags: ["新手vs专家", "工作记忆", "组块"],
  },
  {
    id: "pdp-mr-3",
    chapter: "pdp-mental-representations",
    level: 2,
    question: `心理表征的三大功能分别是什么？请各举一个例子。`,
    answer: `三大功能：1. 识别模式——从海量信息中瞬间提取关键特征（如棋手看棋盘一眼识别局势）；2. 预判与规划——提前模拟可能发展并预演应对策略（如足球中场在接球前规划传球路线）；3. 自我监控——实时评估自己的表现并发现偏差（如音乐家听出自己演奏中的音准偏差）。`,
    tags: ["三大功能", "识别模式", "预判", "自我监控"],
  },
  {
    id: "pdp-mr-4",
    chapter: "pdp-mental-representations",
    level: 3,
    question: `描述心理表征升级循环，并解释它如何驱动持续进步。`,
    answer: `心理表征升级循环：练习技能 → 构建表征 → 表现提升 → 更高水平的练习需要更强表征 → 循环升级。这个循环驱动持续进步是因为每提升一个水平就需要更精细的心理表征来支撑，而更精细的心理表征又来自于更高质量的刻意练习，两者相互驱动形成螺旋上升。`,
    tags: ["升级循环", "持续进步"],
  },
];
