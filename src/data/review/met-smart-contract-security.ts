import type { ReviewQuestion } from "./types";

export const metSmartContractSecurityQuestions: ReviewQuestion[] = [
  {
    id: "met-smart-contract-security-01",
    chapter: "met-smart-contract-security",
    level: 1,
    question: "重入攻击的原理是什么？如何用检查-生效-交互模式防护？",
    answer: "重入攻击原理：合约在更新余额状态前调用外部合约，外部合约借机回调本合约的提款函数，此时余额尚未扣减，攻击者反复提款。检查-生效-交互模式防护：① 检查——先校验条件（如余额足够）；② 生效——立即更新状态（扣减余额）；③ 交互——最后才做外部调用。这样即使外部调用回调，状态已更新，重入无法套利。也可用 ReentrancyGuard 锁。",
    tags: ["重入攻击", "检查-生效-交互", "防护模式", "ReentrancyGuard"],
  },
  {
    id: "met-smart-contract-security-02",
    chapter: "met-smart-contract-security",
    level: 2,
    question: "Solidity 0.8 如何解决整数溢出问题？之前用什么方案？",
    answer: "Solidity 0.8 起内置溢出检查——算术运算溢出时自动回滚（revert），无需手动引入库。0.8 之前需要用 OpenZeppelin 的 SafeMath 库，用 safeAdd/safeSub 等函数替代原生运算符，函数内部检查溢出并回滚。0.8+ 若确实需要无检查运算（如绕过检查省 Gas），可用 unchecked 块显式声明。",
    tags: ["整数溢出", "SafeMath", "Solidity 0.8", "unchecked"],
  },
  {
    id: "met-smart-contract-security-03",
    chapter: "met-smart-contract-security",
    level: 2,
    question: "为什么依赖 block.timestamp 做随机数不安全？如何改进？",
    answer: "block.timestamp 由矿工/验证者在一定范围内微调（几秒），攻击者（尤其是矿工）可操纵时间戳影响结果，因此依赖它做随机数或时间判断不安全。改进方案：① commit-reveal 方案——先提交哈希承诺，后续揭示，减少操纵空间；② 使用 Chainlink VRF 等可验证随机数预言机；③ 结合多个区块哈希增加熵。完全链上无法实现真随机数。",
    tags: ["时间戳依赖", "随机数", "commit-reveal", "Chainlink VRF"],
  },
  {
    id: "met-smart-contract-security-04",
    chapter: "met-smart-contract-security",
    level: 3,
    question: "描述安全工程闭环的六个环节，各环节的作用是什么？",
    answer: "六环节：① 单元测试——覆盖边界情况验证函数行为；② 形式化验证——用数学方法证明关键不变量成立；③ 第三方审计——专业审计团队人工审查发现隐藏漏洞；④ 漏洞赏金——悬赏社区白帽黑客发现漏洞；⑤ 监控告警——实时监控合约异常交易与状态；⑥ 应急响应——如暂停开关、多签升级在事发时止损。各环节层层把关，形成贯穿合约生命周期的纵深防御。",
    tags: ["安全工程", "单元测试", "形式化验证", "审计", "漏洞赏金", "监控", "应急响应"],
  },
];
