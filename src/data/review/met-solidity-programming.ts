import type { ReviewQuestion } from "./types";

export const metSolidityProgrammingQuestions: ReviewQuestion[] = [
  {
    id: "met-solidity-programming-01",
    chapter: "met-solidity-programming",
    level: 1,
    question: "Solidity 合约包含哪四大组成部分？各有什么作用？",
    answer: "四大组成部分：① 状态变量——持久化到 storage 的数据，代表合约状态；② 函数——可执行逻辑，定义合约行为；③ 事件——上链日志，供链下应用检索监听；④ 修饰符 modifier——可复用的函数校验逻辑，如权限控制。合约部署后状态变量持久化链上，函数编译为 EVM 字节码。",
    tags: ["合约结构", "状态变量", "函数", "事件", "修饰符"],
  },
  {
    id: "met-solidity-programming-02",
    chapter: "met-solidity-programming",
    level: 2,
    question: "public、external、internal、private 四种可见性的区别是什么？",
    answer: "public：内部和外部都可调用，自动生成 getter；external：仅能从外部调用（其他合约或交易），不能内部直接调用（可用 this.f() 绕过）；internal：本合约及继承的子合约可调用，默认可见性；private：仅本合约可调用，子合约也不可。可见性控制函数的访问范围，但不等于隐私——所有链上数据都是公开的。",
    tags: ["可见性", "public", "external", "internal", "private"],
  },
  {
    id: "met-solidity-programming-03",
    chapter: "met-solidity-programming",
    level: 2,
    question: "storage、memory、calldata 三种数据位置有何区别？对 Gas 有什么影响？",
    answer: "storage：链上持久存储，合约状态变量默认位置，读写最昂贵（SSTORE 约 20000 Gas）。memory：临时内存，函数执行期间存在，执行结束销毁，中等成本。calldata：只读的外部调用入参，不可修改，Gas 最省。频繁读写 storage 会大幅增加成本，所以函数内应尽量用 memory 做中间计算，最后再写回 storage 以优化 Gas。",
    tags: ["数据位置", "storage", "memory", "calldata", "Gas优化"],
  },
  {
    id: "met-solidity-programming-04",
    chapter: "met-solidity-programming",
    level: 3,
    question: "事件（event）的作用是什么？为什么合约不能读取自己的事件日志？",
    answer: "事件是合约向外界通信的机制：用 emit 触发后，事件数据写入交易收据的日志区，链下应用可高效检索监听，这是 DApp 前端监听链上状态变化的主要方式。合约不能读取自己的事件日志，因为 EVM 不提供读取日志的操作码——日志设计为只写不读，目的是让节点可修剪历史日志以节省存储，同时保证合约逻辑不依赖日志（否则会破坏确定性）。事件是「向外广播」而非「向内存储」。",
    tags: ["事件", "emit", "日志", "检索", "确定性"],
  },
];
