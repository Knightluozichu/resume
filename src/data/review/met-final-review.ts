import type { ReviewQuestion } from "./types";

export const metFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "met-final-review-01",
    chapter: "met-final-review",
    level: 2,
    question: `用四层系统视角描述《精通以太坊》的知识体系结构。`,
    answer: `四层视角：认知层（世界计算机设计、账户模型、智能合约、PoS 共识，建立系统认知）；机制层（椭圆曲线密钥、EOA/CA 账户、交易结构、EIP-1559 Gas 模型，定义数据与费用）；执行层（EVM 虚拟机、栈/内存/存储三层数据、字节码执行、状态转换，定义运行逻辑）；应用层（Solidity 合约编程、合约安全工程、ERC 代币标准、DApp 与预言机，定义生态应用）。`,
    tags: ["四层视角", "认知层", "机制层", "执行层", "应用层", "知识体系"],
  },
  {
    id: "met-final-review-02",
    chapter: "met-final-review",
    level: 2,
    question: `合约调用决策链包含哪六个环节？`,
    answer: `六环节：① 用户发起——EOA 构造交易并用私钥签名；② 交易广播——附带 Gas 报价提交内存池；③ EVM 执行——验证者打包，EVM 运行字节码；④ 状态更新——存储写入，全局状态转换；⑤ 事件日志——emit 事件写入收据日志；⑥ 不可逆——区块确认后交易永久上链。决策链把从用户签名到不可逆确认串联成闭环。`,
    tags: ["决策链", "用户发起", "交易广播", "EVM执行", "状态更新", "事件日志", "不可逆"],
  },
  {
    id: "met-final-review-03",
    chapter: "met-final-review",
    level: 3,
    question: `综合全书，以太坊如何在去中心化前提下实现智能合约的安全执行？`,
    answer: `多层协同：密码层用椭圆曲线单向性保障私钥不可反推、ECDSA 签名不可伪造；执行层用 EVM 沙盒隔离（合约无法访问外部资源）+ Gas 计量限制资源滥用 + 确定性执行保证全网一致；共识层用 PoS 质押经济惩罚（作恶质押被罚没）+ 验证者随机选择保证去中心化；应用层用检查-生效-交互模式 + 权限控制 + 审计监控。没有中心机构，但每次合约调用经全网验证，篡改需控制大量质押且经济不划算，实现去中心化可信计算。`,
    tags: ["安全性", "去中心化", "密码层", "执行层", "共识层", "应用层", "PoS"],
  },
  {
    id: "met-final-review-04",
    chapter: "met-final-review",
    level: 3,
    question: `以太坊面临的核心挑战有哪些？Layer 2 如何解决可扩展性？`,
    answer: `核心挑战：可扩展性（主网 TPS 有限）、合约安全（不可篡改意味着漏洞不可修补）、预言机信任（链外数据真实性是信任边界）、升级治理（不可变与修复需求矛盾）、Gas 成本（存储昂贵限制应用复杂度）。Layer 2（如 Rollup）解决可扩展性：将计算与状态转移移至链下执行，只将结果数据压缩后提交到主链（Layer 1）保障安全。Optimistic Rollup 假设有效+挑战期，ZK Rollup 用零知识证明即时验证，大幅提升吞吐而不牺牲去中心化。`,
    tags: ["核心挑战", "可扩展性", "Layer2", "Rollup", "合约安全", "Gas成本"],
  },
];
