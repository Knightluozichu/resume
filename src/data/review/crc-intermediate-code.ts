import { ReviewQuestion } from "../types";

export const crcIntermediateCodeQuestions: ReviewQuestion[] = [
  {
    id: "crc-intermediate-code-1",
    chapter: "crc-intermediate-code",
    level: 1,
    question: "中间代码（IR）的作用是什么？为什么不在 AST 上直接生成目标代码？",
    answer:
      "中间代码是介于 AST 和目标代码之间的机器无关表示。作用：①解耦前端与后端——前端输出 AST，中端翻译为 IR，后端从 IR 生成目标代码，两端独立 ②优化友好——IR 形式简单（线性指令），比 AST 更容易做数据流分析和各种优化 ③多平台复用——同一份 IR 可生成不同平台的目标代码，优化只需做一次。不直接在 AST 上生成目标代码是因为 AST 层次结构复杂、与源语言耦合紧密，直接生成会混杂语法结构与机器细节，难以做机器无关优化，也无法复用后端。",
    tags: ["中间代码", "IR", "解耦", "优化", "机器无关"],
  },
  {
    id: "crc-intermediate-code-2",
    chapter: "crc-intermediate-code",
    level: 2,
    question: "三地址码（TAC）的格式是什么？以 `a = b + c * 2` 为例说明 AST 如何翻译为三地址码。",
    answer:
      "三地址码每条指令最多包含三个操作数（两个源 + 一个目的），形式如 x = y op z。以 a = b + c * 2 为例：AST 的 Assign 节点右子树是 BinOp(+)，其右操作数是 BinOp(*)。翻译过程（语法制导，自底向上）：①为 c * 2 生成临时变量 t1，emit `t1 = c * 2` ②为 b + t1 生成临时变量 t2，emit `t2 = b + t1` ③生成赋值 `a = t2`。临时变量 t1、t2 存储中间结果，将嵌套表达式展平为线性指令序列。",
    tags: ["三地址码", "TAC", "临时变量", "语法制导翻译", "AST翻译"],
  },
  {
    id: "crc-intermediate-code-3",
    chapter: "crc-intermediate-code",
    level: 3,
    question: "三地址码（TAC）、SSA 形式和控制流图（CFG）这三种 IR 各有什么特点？",
    answer:
      "三地址码（TAC）：线性指令序列，每条指令最多三个操作数，简单易生成，是最基础的 IR 形式。SSA（静态单赋值）形式：在 TAC 基础上要求每个变量只被赋值一次，在控制流汇合点用 φ（phi）函数合并不同路径的值。SSA 使数据流分析更精确、优化更高效（如常量传播、死代码消除），是现代编译器（LLVM IR）的主流形式。控制流图（CFG）：将基本块作为节点、跳转作为边的图结构，显式表达程序的控制流（分支、循环），是数据流分析（到达定值、活跃变量等）的基础数据结构。三者可组合使用：SSA 形式的指令组织在 CFG 的基本块中。",
    tags: ["三地址码", "SSA", "控制流图", "基本块", "phi函数"],
  },
  {
    id: "crc-intermediate-code-4",
    chapter: "crc-intermediate-code",
    level: 2,
    question: "语法制导翻译（SDT）中的综合属性和继承属性是什么？在 IR 生成中各起什么作用？",
    answer:
      "综合属性（Synthesized）：子节点的属性值由其子树计算，自底向上传递。如表达式节点 E 的 addr 属性 = new_temp() 生成临时变量存放计算结果，子表达式先算好 addr 传给父节点。继承属性（Inherited）：节点的属性值由父节点或兄弟节点传入，自顶向下传递。如语句节点的 next 属性（下一条指令的标号）由父控制结构传入，使 break/continue 知道跳转目标。IR 生成主要用综合属性（为表达式分配临时变量并 emit 指令），控制流翻译需用继承属性（传递跳转标号、循环入口/出口等上下文信息）。两者配合完成完整的 AST → IR 翻译。",
    tags: ["语法制导翻译", "综合属性", "继承属性", "自底向上", "自顶向下"],
  },
];
