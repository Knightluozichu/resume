import type { ReviewQuestion } from "./types";

export const metEvmBytecodeQuestions: ReviewQuestion[] = [
  {
    id: "met-evm-bytecode-01",
    chapter: "met-evm-bytecode",
    level: 1,
    question: "为什么说 EVM 是「准」图灵完备？Gas 机制如何阻止无限循环？",
    answer: "EVM 理论上可执行任意复杂逻辑（图灵完备），但 Gas 机制限制了计算量——每条操作码消耗固定 Gas，交易预设 gasLimit 上限。一旦 Gas 耗尽即 Out of Gas 回滚。攻击者必须为每次计算付费，无限循环会耗尽 Gas 被强制停止，因此称为「准」图灵完备：能力上图灵完备，但受 Gas 经济约束停机。",
    tags: ["准图灵完备", "Gas", "停机", "无限循环"],
  },
  {
    id: "met-evm-bytecode-02",
    chapter: "met-evm-bytecode",
    level: 2,
    question: "EVM 的栈、内存、存储有什么区别？哪个最昂贵？为什么？",
    answer: "栈：1024 深、256 位字、LIFO，所有运算在此进行，Gas 便宜。内存 memory：临时字节数组、按执行存在、易失，中等 Gas。存储 storage：持久键值对、256 位 key/value、永久链上，最昂贵（SSTORE 写入约 20000 Gas）。存储最贵因为每个节点都要永久维护这些数据，占用全局状态空间；而栈和内存在执行结束即释放。",
    tags: ["栈", "内存", "存储", "Gas成本", "SSTORE"],
  },
  {
    id: "met-evm-bytecode-03",
    chapter: "met-evm-bytecode",
    level: 2,
    question: "描述从 Solidity 源码到链上合约的完整编译部署流程。",
    answer: "流程：① 用 Solidity 编写合约源码；② 用 solc 编译器做语法分析与优化，生成 EVM 字节码和 ABI 接口定义；③ 构造部署交易（to 字段为空，data 为字节码）；④ 交易广播上链，EVM 执行字节码的初始化逻辑；⑤ 字节码永久存储，按发送方地址+nonce 生成合约地址（CA）。部署后字节码不可变。",
    tags: ["编译流程", "solc", "字节码", "部署", "ABI", "合约地址"],
  },
  {
    id: "met-evm-bytecode-04",
    chapter: "met-evm-bytecode",
    level: 3,
    question: "合约字节码为什么不可变？这对合约安全意味着什么？",
    answer: "合约部署后字节码存储在链上，EVM 不提供修改已部署字节码的操作码（只能通过 selfdestruct 删除合约但无法改代码）。这是以太坊的核心设计——不可篡改性保证合约规则可信。对安全意味着：漏洞一旦被利用无法直接打补丁修复，只能通过代理模式（delegatecall 分离存储与逻辑）提前预留升级入口，或部署新合约迁移状态。安全必须在部署前做到位。",
    tags: ["字节码不可变", "不可篡改", "合约安全", "代理模式", "selfdestruct"],
  },
];
