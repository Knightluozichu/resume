import type { ReviewQuestion } from "./types";

export const bdpSolidityBasicsQuestions: ReviewQuestion[] = [
  {
    id: "bdp-solidity-basics-01",
    chapter: "bdp-solidity-basics",
    level: 1,
    question: "一个 Solidity 合约由哪些主要组成部分构成？",
    answer: "主要由 pragma 版本声明、状态变量（storage）、事件 events、修饰器 modifiers、构造函数 constructor、函数 functions 组成。状态变量持久化上链，事件输出日志，修饰器复用校验逻辑，构造函数初始化，函数承载业务逻辑。",
    tags: ["合约结构", "Solidity", "组成部分"],
  },
  {
    id: "bdp-solidity-basics-02",
    chapter: "bdp-solidity-basics",
    level: 2,
    question: "storage、memory、calldata 三种数据位置的区别与 Gas 成本关系是什么？",
    answer: "storage 是持久化存储，写在链上，Gas 成本最高；memory 是函数内临时内存，函数结束即释放，成本中等；calldata 是只读的外部输入数据位置，不可修改，成本最低。原则是只读入参用 calldata，临时计算用 memory，必须持久化才用 storage。",
    tags: ["数据位置", "storage", "memory", "calldata", "Gas"],
  },
  {
    id: "bdp-solidity-basics-03",
    chapter: "bdp-solidity-basics",
    level: 2,
    question: "函数的可见性（public/external/internal/private）与状态变更性（view/pure/payable）分别控制什么？",
    answer: "可见性控制谁能调用：public 内外皆可、external 仅外部、internal 仅合约及子合约、private 仅本合约。状态变更性控制是否改链上状态：view 只读不改、pure 纯计算不读不写、payable 可接收以太币。call 调用不打包交易，transact 写状态需签名上链。",
    tags: ["可见性", "view", "pure", "payable", "函数修饰"],
  },
  {
    id: "bdp-solidity-basics-04",
    chapter: "bdp-solidity-basics",
    level: 3,
    question: "为什么 Solidity 0.8 之后不再需要 SafeMath？require/revert/自定义 error 在 Gas 上有何差异？",
    answer: "0.8 起内建整数溢出检查，溢出自动 revert，故 SafeMath 不再必需。require 字符串错误信息会消耗更多 Gas 存储字符串；revert 配合自定义 error（custom error）只在 revert 时编码选择器与参数，Gas 更省，尤其适合频繁触发的失败路径，因此推荐用自定义 error 替代 require 字符串。",
    tags: ["SafeMath", "整数溢出", "require", "revert", "custom error", "Gas 优化"],
  },
];
