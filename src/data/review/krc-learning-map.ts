/** 复习题库 · C 程序设计语言全书学习地图（krc-learning-map）。K&R 导论改编章节。 */

import type { ReviewQuestion } from "./types";

export const krcLearningMapQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "krc-lm-1",
    chapter: "krc-learning-map",
    level: 1,
    question: `K&R《C 程序设计语言》全书分哪几个主要板块？按学习顺序列出。`,
    answer:
      `五个板块：① C 语言概览（设计哲学与学习路径）② 类型与运算符（基本类型、表达式、类型转换）③ 控制流与函数（分支循环、函数定义、作用域）④ 指针与数组（指针算术、字符串、命令行参数）⑤ 结构体与IO（结构体联合、标准I/O、UNIX接口）。`,
    tags: ["全书结构", "学习路径"],
  },
  // ── L2 理解 ──
  {
    id: "krc-lm-2",
    chapter: "krc-learning-map",
    level: 2,
    question: `K&R 这本书为什么被认为是 C 语言的权威教材？它的写作风格有什么特点？`,
    answer:
      `因为作者 Brian Kernighan 和 Dennis Ritchie 分别是 C 语言的设计者（Ritchie）和早期文档的撰写者（Kernighan）。写作风格极其精炼：用最短的篇幅讲清核心概念，每个概念配以可直接编译运行的小例子，绝不冗余。全书不到 300 页，却覆盖了 C 语言的全部核心。`,
    tags: ["K&R风格", "设计哲学"],
  },
  // ── L3 应用 ──
  {
    id: "krc-lm-3",
    chapter: "krc-learning-map",
    level: 3,
    question: `C 语言的设计哲学是「信任程序员」——这体现在哪些方面？举例说明这种设计带来的利弊。`,
    answer:
      `体现在：① 不做数组越界检查（\`a[100]\` 越界不报错，直接读写相邻内存）② 不初始化局部变量（值是内存残留的随机值）③ 指针可以任意转换类型（\`int *p = (int*)malloc(1)\` 不报错）④ 无垃圾回收（手动 malloc/free，忘 free 就泄漏）。利：极致性能和灵活性，运行时零开销。弊：内存安全漏洞（缓冲区溢出、悬空指针），需程序员自己保证正确性。`,
    tags: ["设计哲学", "信任程序员", "内存安全"],
  },
  // ── L4 综合 ──
  {
    id: "krc-lm-4",
    chapter: "krc-learning-map",
    level: 4,
    question: `有人说「学 C 语言就该直接读 K&R」，也有人建议先读更厚的入门书。结合 K&R 的特点和现代学习场景，分析两种路径的适用人群。`,
    answer:
      `直接读 K&R 适合：已有编程基础（懂其他语言）、追求精炼表达、愿意自己动手写代码验证每个例子的学习者。K&R 篇幅短但密度高，例子虽精妙却不展开解释，零基础容易卡壳。\n先读更厚的入门书（如 C Primer Plus）适合：零编程基础、需要大量比喻和展开解释、希望每个概念配多个练习的学习者。厚书把 K&R 一页讲完的内容扩展成一整章，降低了认知陡度。\n推荐路径：零基础先读厚书打基础，再用 K&R 精炼巩固、查漏补缺；有基础者可直接读 K&R 并配合动手实现书中所有例子。`,
    tags: ["学习路径", "综合分析", "K&R vs 入门书"],
  },
];

export default krcLearningMapQuestions;
