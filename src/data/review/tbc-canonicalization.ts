import { ReviewQuestion } from "../types";

export const tbcCanonicalizationQuestions: ReviewQuestion[] = [
  {
    id: "tbc-canonicalization-1",
    chapter: "tbc-canonicalization",
    level: 1,
    question: "规范化的目标是什么？需要消除哪些结构？",
    answer:
      "规范化把翻译阶段产生的「不纯净」Tree IR 重写成便于后端处理的形式。目标：①消除 ESEQ——表达式内部不再夹杂语句，表达式树变纯净 ②提升 CALL——函数调用不再嵌套在表达式内部，结果存入临时变量 ③线性化 SEQ——把嵌套的 SEQ 展平为线性语句链。规范化后得到「规范 IR」：无 ESEQ、CALL 顶层、语句线性排列，便于划分基本块、做指令选择（树覆盖）和寄存器分配。",
    tags: ["规范化", "消除 ESEQ", "提升 CALL", "线性化", "规范 IR"],
  },
  {
    id: "tbc-canonicalization-2",
    chapter: "tbc-canonicalization",
    level: 3,
    question: "如何消除 ESEQ？commute 函数在其中起什么作用？",
    answer:
      "消除 ESEQ 用递归重写：ESEQ(stmt, e) 要把 stmt 提升到上层。关键用 commute(stmt, e) 判断 stmt 和 e 能否安全交换执行顺序——若 stmt 无副作用或与 e 无数据依赖则可 commute。当子树含 ESEQ 时，根据能否 commute 决定重写方式：能交换则把 stmt 提到外面，不能则保留顺序用 SEQ 串起来。例如 BINOP(op, ESEQ(s, e1), e2)，若 s 与 e2 commute 则重写为 ESEQ(s, BINOP(op, e1, e2))，把 s 逐层上提直到提到顶层。最终所有 ESEQ 被消除，表达式树只剩 CONST/TEMP/MEM/BINOP 等纯净节点。",
    tags: ["消除 ESEQ", "commute", "重写", "求值顺序"],
  },
  {
    id: "tbc-canonicalization-3",
    chapter: "tbc-canonicalization",
    level: 2,
    question: "什么是基本块？如何从规范 IR 划分基本块？",
    answer:
      "基本块（basic block）是单入口单出口的指令序列：首指令是入口（被跳转的 LABEL），末指令是出口（JUMP / CJUMP / 返回），中间无 LABEL 不被跳转进入。划分方法：①从规范 IR 的语句链开始 ②遇到 LABEL 开始一个新块 ③遇到 JUMP/CJUMP/返回结束当前块 ④跳转目标后的指令开始下一块。每个基本块内部指令顺序执行无分支，可独立做指令选择（把块内表达式树用 Maximal Munch 覆盖）。基本块是控制流分析和后端处理的基本单位。",
    tags: ["基本块", "单入口单出口", "LABEL", "CJUMP", "控制流"],
  },
  {
    id: "tbc-canonicalization-4",
    chapter: "tbc-canonicalization",
    level: 3,
    question: "trace 轨迹调度的作用是什么？它如何减少跳转指令？",
    answer:
      "trace 调度把基本块按控制流串成线性序列（一条轨迹），使后端生成的代码减少无条件跳转。原理：沿跳转边走一条轨迹，让 CJUMP 的真分支紧跟当前块——这样条件成立时顺序执行（落空即跳），无需额外 JUMP。若想假分支顺序执行，则翻转 CJUMP 的条件（如把 a&lt;b 翻转为 a&gt;=b）并交换真/假标签。轨迹内的块顺序排列，块间尽量用顺序落空代替 JUMP。最终输出一条便于指令选择的线性 IR 序列，既减少了跳转开销，又保持了控制流语义。",
    tags: ["trace 调度", "轨迹", "减少跳转", "翻转条件", "控制流"],
  },
];
