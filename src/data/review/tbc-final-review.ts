import { ReviewQuestion } from "../types";

export const tbcFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "tbc-final-review-1",
    chapter: "tbc-final-review",
    level: 2,
    question: "请完整描述从 Tiger 源码到目标代码的端到端编译流程，每个阶段的输入输出是什么？",
    answer:
      "①词法分析：输入源码字符流，输出 Token 序列（ML-Lex 表驱动 DFA）②语法分析：输入 Token，输出 AST（ML-Yacc LALR(1) 移进归约）③语义分析与类型：输入 AST + 双环境，输出带类型结果 (exp, ty)（环境查表 + 类型规则）④翻译到 IR：输入带类型 AST，输出 Tree IR（Ex/Nx/Cx 三形式）⑤规范化：输入 Tree IR（含 ESEQ/嵌套 CALL），输出规范化 IR（无 ESEQ、CALL 顶层、线性）⑥基本块与 trace：输入规范化 IR，输出线性基本块序列 ⑦指令选择：输入基本块，输出含 TEMP 的机器指令（Maximal Munch 树覆盖）⑧寄存器分配：输入含 TEMP 指令，输出物理寄存器目标代码（干涉图着色 + 溢出）。全程 Tree IR 解耦前后端，Frame 抽象贯穿。",
    tags: ["端到端流程", "编译阶段", "输入输出", "Tree IR", "Frame"],
  },
  {
    id: "tbc-final-review-2",
    chapter: "tbc-final-review",
    level: 3,
    question: "Tree IR 在前后端解耦中起什么作用？虎书的解耦架构有哪些具体好处？",
    answer:
      "Tree IR 是介于带类型 AST 和目标机器指令之间的树形中间表示，是前后端的契约：前端把 Tiger 翻译成 Tree IR，后端从 Tree IR 生成目标代码。好处：①前端关注源语言（词法/语法/语义/类型），后端关注目标机器（指令选择/寄存器分配），互不耦合 ②支持多语言×多平台——M 个前端 + N 个后端共享一套 Tree IR，避免 M×N 组合爆炸 ③Tree IR 设计成树形，便于后端用 Maximal Munch 做树覆盖指令选择 ④规范化让 IR 变纯净，使指令选择和寄存器分配各自独立 ⑤TEMP 虚拟寄存器解耦指令选择与寄存器分配。这是 GCC、LLVM 等工业编译器的标准架构思想。",
    tags: ["Tree IR", "解耦", "前后端", "复用", "虚拟寄存器"],
  },
  {
    id: "tbc-final-review-3",
    chapter: "tbc-final-review",
    level: 3,
    question: "Frame 抽象如何贯穿前后端？它解决了什么问题？",
    answer:
      "Frame 抽象封装活动记录（栈帧），提供 newFrame/formals/allocLocal 等平台无关接口，让前端只关心 escape 判定与 static link，具体栈帧布局交给后端实现。贯穿方式：前端语义分析时判定哪些变量 escape（被嵌套函数引用）→ allocLocal(true) 在栈帧分配；翻译 IR 时通过 Frame 拿到变量访问方式（fp 偏移）生成 MEM 节点；static link 作为 escape 变量存栈帧，支持嵌套函数访问外层变量；后端寄存器分配溢出时也用 Frame 的栈空间存溢出变量。解决的问题：把「变量存哪」这一与机器强相关的决策抽象化，前端写一次即可适配多平台，后端按机器特性实现布局。",
    tags: ["Frame 抽象", "escape", "static link", "平台无关", "贯穿前后端"],
  },
  {
    id: "tbc-final-review-4",
    chapter: "tbc-final-review",
    level: 4,
    question: "虎书的核心思想是什么？它如何体现「端到端实现一个完整编译器」的工程导向？",
    answer:
      "核心思想：围绕 Tiger 语言端到端实现一个完整可运行的编译器，以 Tree IR 为解耦枢纽，每个阶段有明确的输入输出和可落地的算法。工程导向体现：①不空谈理论，每个概念都对应具体实现——ML-Lex 生成扫描器、ML-Yacc 生成分析器、Frame 接口管理栈帧、Maximal Munch 做指令选择、Chaitin-Briggs 算法做寄存器分配 ②数据结构贯穿始终——Symbol 表、双环境、Tree IR、干涉图，环环相扣 ③关注实现细节——escape 判定、static link、ESEQ 消除、trace 调度、move coalescing、溢出重写，都是工程中的真实问题 ④分阶段解耦让每部分可独立实现、测试、替换。虎书是「做出来」的编译器教材，与偏理论的龙书互补。",
    tags: ["核心思想", "工程导向", "端到端", "Tiger 语言", "虎书特色"],
  },
];
