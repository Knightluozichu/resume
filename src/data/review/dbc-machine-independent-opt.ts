import { ReviewQuestion } from "../types";

export const dbcMachineIndependentOptQuestions: ReviewQuestion[] = [
  {
    id: "dbc-machine-independent-opt-1",
    chapter: "dbc-machine-independent-opt",
    level: 1,
    question: "机器无关优化的目标是什么？数据流分析的迭代求解是如何工作的？",
    answer:
      "目标：在 IR 层做等价变换，产出更快或更短的代码，不改变程序语义，且不依赖目标机器特性。数据流分析迭代求解：①为每个基本块初始化 IN/OUT 值 ②反复应用传递函数（OUT[b]=F_b(IN[b])）和交汇运算（前向：IN[b]=∧OUT[p]，后向：OUT[b]=∧IN[s]）更新各块值 ③当所有值不再变化时达到不动点，求解完成。因值域是有限格且传递函数单调，迭代一定收敛。分析结果是保守近似——宁可漏报优化机会也不能误报改变语义。",
    tags: ["机器无关优化", "数据流分析", "不动点迭代", "传递函数", "交汇运算"],
  },
  {
    id: "dbc-machine-independent-opt-2",
    chapter: "dbc-machine-independent-opt",
    level: 2,
    question: "到达定义分析、可用表达式分析和活跃变量分析的区别是什么？",
    answer:
      "三者方向、交汇和用途不同：①到达定义分析——前向、并集交汇，找出哪些变量定义能到达某点（OUT=GEN∪(IN-KILL)）。用于未初始化变量检测、UD 链构建。②可用表达式分析——前向、交集交汇，找出已计算且操作数未变的表达式（IN=∩OUT[p]）。交集保证「所有前驱都可用才可用」（保守）。用于全局公共子表达式消除。③活跃变量分析——后向、并集交汇，找出变量在之后是否被使用（OUT=∪IN[s], IN=(OUT-DEF)∪USE）。用于死代码消除和寄存器分配。前两者前向传播「有什么」，后者后向传播「需要什么」。",
    tags: ["到达定义", "可用表达式", "活跃变量", "前向", "后向", "交集", "并集"],
  },
  {
    id: "dbc-machine-independent-opt-3",
    chapter: "dbc-machine-independent-opt",
    level: 3,
    question: "公共子表达式消除（CSE）和常量传播是如何工作的？",
    answer:
      "CSE：基于可用表达式分析。若表达式 `b+c` 已在某点计算过且 b、c 未被重定义（即表达式可用），则后续 `b+c` 可直接复用之前的结果而非重新计算。例如 `a=b+c; d=b+c` → `a=b+c; d=a`。常量传播：前向数据流分析，值域为 {⊥（未定义）, c（常量值）, NAC（非常量）, ⊤（不确定）}。若变量 x 在所有到达路径上都是同一常量 c，则用 c 替换 x 的引用。例如 `x=5; y=x+1` → `x=5; y=6`。常量传播可与折叠结合（编译期算出 6），进一步触发死代码消除（删除 x=5 若 x 不再使用）。",
    tags: ["CSE", "公共子表达式", "常量传播", "可用表达式", "常量折叠"],
  },
  {
    id: "dbc-machine-independent-opt-4",
    chapter: "dbc-machine-independent-opt",
    level: 2,
    question: "循环优化中的代码外提、归纳变量优化和强度削弱各是什么？",
    answer:
      "代码外提（LICM）：循环中每次迭代结果都相同的计算（循环不变量）移到循环外只算一次，如 `for i: a[i]=x*y+i` 中 `x*y` 不变，外提为 `t=x*y; for i: a[i]=t+i`。需确保不在异常路径、无副作用。归纳变量优化：循环中多个同步递增的归纳变量（如 `i++` 和 `j=i*4`）删除冗余的，只保留最便宜的。强度削弱：用更便宜的运算替代昂贵的，如 `j=i*4` 在循环内每次 `i++` 后改为 `j+=4`（加法替代乘法）。三者都依赖循环识别（通过支配关系和回边找自然循环），是中端性能提升的核心。",
    tags: ["循环优化", "代码外提", "LICM", "归纳变量", "强度削弱", "支配关系"],
  },
];
