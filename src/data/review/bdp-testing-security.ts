import type { ReviewQuestion } from "./types";

export const bdpTestingSecurityQuestions: ReviewQuestion[] = [
  {
    id: "bdp-testing-security-01",
    chapter: "bdp-testing-security",
    level: 1,
    question: `智能合约测试金字塔从底到顶包含哪些层级？`,
    answer: `从底到顶为：单元测试 Unit（数量多成本低）、集成与分叉测试（在真实主网状态上联调）、模糊测试 Fuzz（随机输入找边界）、不变式测试 Invariant（断言系统不变性质）、形式化验证（数学证明，成本最高数量最少）。层级越高越能发现深层漏洞但成本越高。`,
    tags: ["测试金字塔", "单元测试", "模糊测试", "不变式", "形式化验证"],
  },
  {
    id: "bdp-testing-security-02",
    chapter: "bdp-testing-security",
    level: 2,
    question: `Slither、Mythril、Echidna 分别用什么技术检测漏洞？`,
    answer: `Slither 用静态分析快速扫描重入、未初始化等模式问题；Mythril 用符号执行探索深层执行路径，发现复杂漏洞；Echidna 用基于属性的模糊测试，反复调用合约试图破坏开发者定义的不变式。三者互补：静态快、符号深、模糊真。`,
    tags: ["Slither", "Mythril", "Echidna", "静态分析", "符号执行", "模糊测试"],
  },
  {
    id: "bdp-testing-security-03",
    chapter: "bdp-testing-security",
    level: 2,
    question: `列出至少三类高危智能合约漏洞及其成因。`,
    answer: `重入攻击：外部调用回调改写未更新状态；整数溢出：0.8 前无内建检查导致数值绕过；访问控制缺失：关键函数无权限校验被任意调用；预言机操纵：攻击者用闪电贷瞬时操纵去中心化交易所价格影响预言机报价。每类都需对应防御模式。`,
    tags: ["重入", "整数溢出", "访问控制", "预言机操纵", "高危漏洞"],
  },
  {
    id: "bdp-testing-security-04",
    chapter: "bdp-testing-security",
    level: 3,
    question: `为什么主网上线前要「充分测试覆盖 + 多轮审计 + 赏金兜底」多管齐下？`,
    answer: `合约部署后不可撤销，漏洞直接造成资金损失，单一手段都有盲区：自动化测试覆盖已知模式但难发现逻辑漏洞；静态/符号工具误报漏报并存；人工审计能查逻辑但可能遗漏；赏金计划借助社区发现长尾问题。多层叠加才能把残余风险压到最低，这是合约安全与普通软件安全的关键差异。`,
    tags: ["安全审计", "测试覆盖", "赏金计划", "风险收敛", "工程实践"],
  },
];
