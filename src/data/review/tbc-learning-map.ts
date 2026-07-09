import { ReviewQuestion } from "../types";

export const tbcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "tbc-learning-map-1",
    chapter: "tbc-learning-map",
    level: 1,
    question: "虎书（现代编译器实现，Appel 著）的整体目标是什么？编译器的核心阶段有哪些？",
    answer:
      "整体目标是围绕 Tiger 语言端到端实现一个完整编译器，从源代码到目标代码全程可落地。核心阶段：①词法分析——源码→Token ②语法分析——Token→AST ③语义分析与类型检查——AST→带类型结果（exp, ty）④活动记录与栈帧——Frame 抽象管理调用栈 ⑤翻译到中间表示——AST→Tree IR ⑥规范化与基本块——IR→线性规范化 IR ⑦指令选择——IR→机器指令 ⑧寄存器分配——TEMP→机器寄存器。各阶段通过 Tree IR 解耦前后端。",
    tags: ["编译器架构", "编译阶段", "Tree IR", "虎书"],
  },
  {
    id: "tbc-learning-map-2",
    chapter: "tbc-learning-map",
    level: 2,
    question: "虎书 10 章的学习路径是什么？前端、IR 层、后端各覆盖哪些章节？",
    answer:
      "路径：ch0 学习地图 → ch1 词法分析 → ch2 语法分析 → ch3 语义分析与类型 → ch4 活动记录与栈帧 → ch5 翻译到中间表示 → ch6 规范化与基本块 → ch7 指令选择 → ch8 寄存器分配与图着色 → ch9 全书复习。前端覆盖 ch1-ch3（词法→语法→语义类型），IR 层覆盖 ch4-ch6（栈帧→翻译 IR→规范化，Tree IR 在此生成并规范化），后端覆盖 ch7-ch8（指令选择→寄存器分配），ch9 是端到端整合。",
    tags: ["学习路径", "章节依赖", "前端", "IR 层", "后端"],
  },
  {
    id: "tbc-learning-map-3",
    chapter: "tbc-learning-map",
    level: 2,
    question: "虎书为什么以 Tree IR 作为前后端的解耦枢纽？它带来什么好处？",
    answer:
      "Tree IR 是介于带类型 AST 和目标机器指令之间的树形中间表示。前端把 Tiger 源码翻译成 Tree IR（关注源语言），后端从 Tree IR 生成目标代码（关注目标机器），两者通过 Tree IR 解耦。好处：①前端不必关心目标机器，后端不必关心源语言 ②支持多语言×多平台复用，M 个前端 + N 个后端避免 M×N 组合爆炸 ③IR 层优化（如规范化、基本块）只写一次即覆盖所有组合 ④Tree IR 设计成树形，便于后端用 Maximal Munch 树覆盖做指令选择。",
    tags: ["Tree IR", "中间表示", "解耦", "复用"],
  },
  {
    id: "tbc-learning-map-4",
    chapter: "tbc-learning-map",
    level: 3,
    question: "虎书与龙书在内容侧重上有何异同？",
    answer:
      "相同点：都覆盖编译器完整流程（词法→语法→语义→IR→代码生成），都以分阶段架构为核心，都通过中间表示解耦前后端。不同点：虎书更偏工程实现——围绕 Tiger 语言端到端实现一个可运行的编译器，强调 Frame 抽象、Tree IR、Maximal Munch、图着色寄存器分配等可落地的算法与数据结构，采用函数式风格。龙书更偏理论奠基——系统讲解形式语言理论、自动机理论、语法制导翻译的形式化定义、类型系统的数学基础、数据流分析框架。虎书是「做出来」，龙书是「讲清楚为什么」。",
    tags: ["虎书", "龙书", "理论", "工程", "对比"],
  },
];
