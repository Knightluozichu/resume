import { ReviewQuestion } from "./types";

export const crcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "crc-learning-map-1",
    chapter: "crc-learning-map",
    level: 1,
    question: `《自制编译器》的整体目标是什么？编译器的三段式架构是什么？`,
    answer:
      `整体目标是从零构建一个完整的编译器，将源代码翻译为目标机器的可执行代码。三段式架构：①前端（Frontend）——词法分析 + 语法分析，将源码转为 AST ②中端（Middle-end）——语义分析 + IR 生成 + 优化，将 AST 转为优化后的中间表示 ③后端（Backend）——指令选择 + 寄存器分配，将 IR 转为目标代码。三段通过中间表示（IR）解耦，前端与后端独立开发。`,
    tags: ["编译器架构", "三段式", "前端", "中端", "后端"],
  },
  {
    id: "crc-learning-map-2",
    chapter: "crc-learning-map",
    level: 2,
    question: `编译器的完整流水线是什么？数据在各个阶段如何变换形态？`,
    answer:
      `完整流水线：源码文本 → 词法分析 → Token 序列 → 语法分析 → AST → 语义分析 → 带类型注解的 AST → IR 生成 → 三地址码 → 优化 → 优化后 IR → 代码生成 → 目标指令序列 → 目标文件（.o）→ 链接 → 可执行文件 → 加载 → 运行。数据形态经历了从文本到结构化树再到线性指令序列的变换，每个阶段输出是下一阶段的输入。`,
    tags: ["流水线", "数据形态", "Token", "AST", "IR"],
  },
  {
    id: "crc-learning-map-3",
    chapter: "crc-learning-map",
    level: 1,
    question: `全书 10 章的学习路径是什么？各章之间的依赖关系是什么？`,
    answer:
      `路径：ch0 学习地图 → ch1 编译器架构 → ch2 词法分析生成器 → ch3 语法分析生成器 → ch4 语义分析与类型检查 → ch5 中间代码生成 → ch6 代码优化 → ch7 目标代码生成 → ch8 链接与加载 → ch9 全书复习。依赖：ch1 是架构总览，ch2-ch3 构成前端，ch4-ch6 构成中端，ch7 构成后端，ch8 是链接加载，前端 → 中端 → 后端 → 链接层层递进，后端依赖中端的 IR。`,
    tags: ["学习路径", "章节依赖", "知识体系"],
  },
  {
    id: "crc-learning-map-4",
    chapter: "crc-learning-map",
    level: 2,
    question: `为什么编译器采用三段式架构？中间表示（IR）在其中起什么作用？`,
    answer:
      `三段式架构的核心优势是解耦与复用：①多语言支持（M×1）——M 种语言只需 M 个前端，共享同一中端和后端 ②多平台支持（1×N）——统一 IR 只需 N 个后端即可支持 N 种机器 ③优化复用——IR 层优化只写一次，对所有语言和平台同时生效。中间表示（IR）是三段之间的桥梁：前端输出 AST，中端在 IR 层做分析和优化，后端从 IR 生成目标代码。IR 让前端不必关心目标机器，后端不必关心源语言。`,
    tags: ["三段式架构", "中间表示", "IR", "解耦", "复用"],
  },
];
