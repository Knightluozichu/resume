import type { ReviewQuestion } from "./types";

export const metTransactionsGasQuestions: ReviewQuestion[] = [
  {
    id: "met-transactions-gas-01",
    chapter: "met-transactions-gas",
    level: 1,
    question: `以太坊交易包含哪些核心字段？nonce 的作用是什么？`,
    answer: `核心字段包括：from（发送方 EOA）、to（接收方 EOA 或 CA）、value（转账金额 wei）、data/input（合约调用数据）、nonce（发送方交易序号）、signature（r,s,v 签名）、gasLimit、maxFeePerGas、maxPriorityFeePerGas。nonce 是发送方交易序号，用于防止重放攻击并保证交易按序执行。`,
    tags: ["交易结构", "nonce", "交易字段", "防重放"],
  },
  {
    id: "met-transactions-gas-02",
    chapter: "met-transactions-gas",
    level: 2,
    question: `EIP-1559 如何拆分 Gas 费用？基础费为何要销毁？`,
    answer: `EIP-1559 将费用拆为基础费（baseFee）和小费（priorityFee）。基础费由协议根据区块拥堵自动调整，全部销毁不给验证者；小费是用户额外支付给验证者的激励。用户实际支付 maxFeePerGas × gasUsed。基础费销毁有两个目的：① 让费用更可预测（无需猜测竞拍价）；② 销毁抵消增发，抗通胀。区块越满 baseFee 越高，越空越低，形成负反馈调节。`,
    tags: ["EIP-1559", "基础费", "小费", "销毁", "Gas费用"],
  },
  {
    id: "met-transactions-gas-03",
    chapter: "met-transactions-gas",
    level: 2,
    question: `什么是 Out of Gas？为什么 Gas 耗尽后已付费用不退还？`,
    answer: `Out of Gas 指交易执行过程中 Gas 耗尽（gasLimit 不够），触发异常并回滚所有状态变更。已消耗的 Gas 费不予退还，因为验证者已经为执行这些操作付出了计算资源。这一机制防止了无限循环消耗网络资源——攻击者必须为每次计算付费，即使最终回滚也要承担成本。`,
    tags: ["Out of Gas", "回滚", "Gas计量", "资源限制"],
  },
  {
    id: "met-transactions-gas-04",
    chapter: "met-transactions-gas",
    level: 3,
    question: `三种交易类型分别是什么？合约部署交易的 to 字段是什么？`,
    answer: `三种类型：① 普通转账（EOA→EOA，仅 value 转账，固定 21000 Gas）；② 合约调用（EOA→CA，含 data 字段，Gas 按操作码计量）；③ 合约部署（to 字段为空，data 为编译后的字节码，部署后按发送方地址+nonce 生成合约地址）。合约部署交易的 to 为空是关键特征，EVM 据此识别部署并执行字节码的初始化逻辑。`,
    tags: ["交易类型", "普通转账", "合约调用", "合约部署", "to字段"],
  },
];
