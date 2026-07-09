import { ReviewQuestion } from "../types";

export const crcCompilerArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "crc-compiler-architecture-1",
    chapter: "crc-compiler-architecture",
    level: 1,
    question: "编译器的前端、中端、后端各自负责什么工作？",
    answer:
      "前端负责理解源代码结构：词法分析（源码 → Token 序列）+ 语法分析（Token → AST），输出抽象语法树。中端负责语义分析和优化：语义分析（类型检查、符号表）+ IR 生成（AST → 三地址码）+ 代码优化（常量折叠、死代码消除等），输出优化后的中间表示。后端负责生成目标代码：指令选择 + 寄存器分配 + 指令调度，输出目标机器的指令序列（目标文件）。",
    tags: ["前端", "中端", "后端", "编译器架构"],
  },
  {
    id: "crc-compiler-architecture-2",
    chapter: "crc-compiler-architecture",
    level: 2,
    question: "什么是编译 Pass（遍）？它在编译器架构中如何组织？",
    answer:
      "Pass（遍）是编译器中对中间表示做一次完整处理的过程。每个 Pass 读入一种 IR，做一种特定的变换，输出新的 IR，多个 Pass 串成流水线。典型 Pass 序列：Pass 1 构建 AST → Pass 2 生成 IR → Pass 3 做各种优化（可细分为多个子 Pass）→ Pass 4 生成目标代码。Pass 之间通过 IR 传递数据，每个 Pass 职责单一，便于独立开发、测试和复用。",
    tags: ["Pass", "遍", "流水线", "IR"],
  },
  {
    id: "crc-compiler-architecture-3",
    chapter: "crc-compiler-architecture",
    level: 2,
    question: "三段式架构如何实现多语言 × 多平台的复用？复杂度从 M×N 降到了什么？",
    answer:
      "如果没有中间表示，M 种语言 × N 种平台需要 M×N 个编译器。三段式架构通过统一的 IR 解耦：每种语言只需一个前端（M 个前端），每种平台只需一个后端（N 个后端），中端（含优化）只需一套。总复杂度从 M×N 降为 M+N+1。例如 GCC 支持 C/C++/Fortran 等多种语言和 x86/ARM/MIPS 等多种平台，正是依靠三段式架构和统一的 GIMPLE/RTL 中间表示。",
    tags: ["三段式", "多语言", "多平台", "复杂度", "复用"],
  },
  {
    id: "crc-compiler-architecture-4",
    chapter: "crc-compiler-architecture",
    level: 1,
    question: "AST、IR、目标指令序列这三种中间数据分别在哪个阶段产生？各自的作用是什么？",
    answer:
      "AST（抽象语法树）在前端产生——语法分析器根据文法规则将 Token 组织成树形结构，反映源代码的语法结构，是前端与中端的接口。IR（中间表示，如三地址码/SSA）在中端产生——语义分析后通过语法制导翻译从 AST 生成，是优化和后端的统一数据格式，与具体机器无关。目标指令序列在后端产生——从优化后的 IR 通过指令选择和寄存器分配生成，是具体机器的指令。三者层层递进：从语法结构到机器无关的中间代码再到机器相关的目标代码。",
    tags: ["AST", "IR", "目标指令", "中间数据", "接口"],
  },
];
