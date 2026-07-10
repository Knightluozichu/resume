import { ReviewQuestion } from "./types";

export const eacLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "eac-learning-map-1",
    chapter: "eac-learning-map",
    level: 1,
    question: `《编译器设计》（Cooper & Torczon）的整体目标是什么？编译器的三段式架构是什么？`,
    answer:
      `整体目标是系统讲解编译器的设计与实现原理，覆盖从源代码到目标机器码的完整翻译流程。三段式架构：①前端（Frontend）——词法扫描 + 语法分析 + 上下文相关分析，将源码转为中间表示（IR）②中端（Middle-end）——IR 优化器，在机器无关层做数据流分析与冗余消除 ③后端（Backend）——指令选择 + 寄存器分配 + 指令调度，将 IR 转为目标机器码。三段通过 IR 解耦，前端与后端独立演进。`,
    tags: ["编译器架构", "三段式", "前端", "中端", "后端", "IR"],
  },
  {
    id: "eac-learning-map-2",
    chapter: "eac-learning-map",
    level: 2,
    question: `编译器的完整流水线是什么？数据在各个阶段如何变换形态？`,
    answer:
      `完整流水线：源码文本 → 词法扫描 → Token 序列 → 语法分析 → AST → 上下文相关分析（属性文法+类型检查）→ 带注解 AST/IR → IR 生成 → 三地址码/SSA → 优化 → 优化后 IR → 指令选择 → 目标指令序列 → 寄存器分配 → 分配寄存器的指令 → 指令调度 → 最终机器码。数据形态经历了从文本到结构化树（AST）、再到线性机器无关指令（IR）、最后到机器相关指令序列的逐步变换，每个阶段输出是下一阶段的输入。`,
    tags: ["流水线", "数据形态", "Token", "AST", "IR", "机器码"],
  },
  {
    id: "eac-learning-map-3",
    chapter: "eac-learning-map",
    level: 1,
    question: `全书 10 章的学习路径是什么？各章之间的依赖关系是什么？`,
    answer:
      `路径：ch0 学习地图 → ch1 编译器概述与设计 → ch2 词法扫描器 → ch3 语法分析器 → ch4 上下文相关分析 → ch5 中间表示生成 → ch6 代码优化原理 → ch7 指令选择 → ch8 寄存器分配 → ch9 全书复习。依赖：ch1 是架构总览，ch2-ch4 构成前端（扫描→语法→上下文），ch5-ch6 构成中端（IR 生成→优化），ch7-ch8 构成后端（指令选择→寄存器分配），前端→中端→后端层层递进，后端依赖中端输出的优化后 IR。`,
    tags: ["学习路径", "章节依赖", "知识体系"],
  },
  {
    id: "eac-learning-map-4",
    chapter: "eac-learning-map",
    level: 2,
    question: `为什么编译器采用三段式架构？中间表示（IR）在其中起什么作用？`,
    answer:
      `三段式架构的核心优势是解耦与复用：①多语言支持（M×1）——M 种语言只需 M 个前端，共享同一中端和后端 ②多平台支持（1×N）——统一 IR 只需 N 个后端即可支持 N 种机器 ③优化复用——IR 层优化只写一次，对所有语言和平台同时生效。中间表示（IR）是三段之间的契约：前端输出 IR，中端在 IR 层做分析和优化，后端从 IR 生成目标代码。IR 让前端不必关心目标机器，后端不必关心源语言，两端独立演进。`,
    tags: ["三段式架构", "中间表示", "IR", "解耦", "复用"],
  },
];
