import { ReviewQuestion } from "./types";

export const eacCompilerOverviewQuestions: ReviewQuestion[] = [
  {
    id: "eac-compiler-overview-1",
    chapter: "eac-compiler-overview",
    level: 1,
    question: `编译器三段式架构中前端、中端、后端各自的职责是什么？IR 在其中扮演什么角色？`,
    answer:
      `前端职责：词法扫描（源码→Token）、语法分析（Token→AST）、上下文相关分析（类型检查+符号表），最终输出机器无关的中间表示（IR）。中端职责：在 IR 层做数据流分析与各种优化（冗余消除、循环优化等），输出优化后的 IR，不涉及任何机器细节。后端职责：指令选择（IR→目标指令）、寄存器分配（虚拟寄存器→物理寄存器）、指令调度（重排指令避免流水线停顿），输出目标机器码。IR 是三段之间的契约与桥梁：前端只管源语言→IR，后端只管 IR→机器码，两端通过 IR 解耦独立演进。`,
    tags: ["三段式架构", "前端", "中端", "后端", "IR", "职责划分"],
  },
  {
    id: "eac-compiler-overview-2",
    chapter: "eac-compiler-overview",
    level: 2,
    question: `编译器的 M×N 复用矩阵是什么？为什么三段式架构能实现 M+N 而非 M×N？`,
    answer:
      `如果没有统一 IR，支持 M 种源语言和 N 种目标机需要 M×N 个独立编译器（每种语言×每种机器组合一套完整实现）。三段式架构通过引入机器无关的 IR 作为中间契约，将问题降为 M+N：只需 M 个前端（每种语言一个，输出统一 IR）+ 1 套中端优化器（复用）+ N 个后端（每种机器一个，从 IR 生成代码）。优化只需在 IR 层做一次，对所有语言和机器同时生效。这是 GCC、LLVM 等现代编译器能支持数十种语言和架构的根本原因。`,
    tags: ["复用矩阵", "M+N", "解耦", "IR", "工程优势"],
  },
  {
    id: "eac-compiler-overview-3",
    chapter: "eac-compiler-overview",
    level: 3,
    question: `编译器设计与解释器有什么本质区别？为什么编译器需要多个 Pass（遍）？`,
    answer:
      `本质区别：编译器将源代码翻译为等价的目标程序后退出，目标程序独立运行；解释器逐条执行源代码的语义，不生成独立的目标程序。编译器是「翻译器」，解释器是「执行器」。编译器需要多个 Pass 的原因：①每个 Pass 只做一种变换，职责单一便于实现和调试 ②后一个 Pass 依赖前一个 Pass 的结果（如优化依赖 IR 已建立的数据流信息）③多次遍历能发现单遍无法发现的优化机会（如全局优化需要完整的控制流图）④分离 Pass 使编译器可配置（如 -O0 跳过优化 Pass）。Pass 管道是现代编译器（LLVM opt、GCC GIMPLE passes）的核心架构。`,
    tags: ["编译器vs解释器", "Pass", "遍历", "优化管道"],
  },
  {
    id: "eac-compiler-overview-4",
    chapter: "eac-compiler-overview",
    level: 2,
    question: `编译器各个阶段处理的数据形态如何变换？为什么需要多种中间表示？`,
    answer:
      `数据形态变换链：源码文本（字符流）→词法扫描→Token 序列（线性带类型标记）→语法分析→AST（树形，反映语法结构）→上下文分析→带注解 AST（附加类型/符号信息）→IR 生成→三地址码/SSA（线性机器无关指令）→优化→优化后 IR→后端→目标指令序列（机器相关）→机器码（二进制）。需要多种中间表示的原因：每种表示服务于不同阶段的需求——AST 保留语法结构便于语义分析；线性 IR 便于数据流分析和优化；机器相关指令便于寄存器分配和调度。没有一种表示能同时高效地服务于所有阶段，故需在阶段间转换数据形态。`,
    tags: ["数据形态", "中间表示", "AST", "IR", "机器码"],
  },
];
