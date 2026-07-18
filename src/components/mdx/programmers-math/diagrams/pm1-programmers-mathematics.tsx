import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "模式识别", premise: "总结篇把前八章收束为解决问题的方法：识别模式、选择表示、抽象不变量、分解规模、估计边界并承认证明能力的限制。程序员的数学不是公式目录，而是把模糊需求转化为可执行、可反驳模型的语言。", transform: "从不同表象中找到相同结构，如周期、树、状态空间或线性映射。", evidence: "用定义、边界样例和反例验证模式识别", invariant: "模式识别：从不同表象中找到相同结构，如周期、树、状态空间或线性映射。" },
  { label: "抽象化", premise: "模式识别", transform: "舍弃与目标无关的细节，同时明确保留哪些量、关系和约束。", evidence: "用定义、边界样例和反例验证抽象化", invariant: "抽象化：舍弃与目标无关的细节，同时明确保留哪些量、关系和约束。" },
  { label: "模型边界", premise: "抽象化", transform: "写清输入域、假设和失败条件，防止数学结论被越界使用。", evidence: "用定义、边界样例和反例验证模型边界", invariant: "模型边界：写清输入域、假设和失败条件，防止数学结论被越界使用。" },
  { label: "验证闭环", premise: "模型边界", transform: "推导、示例、代码实验和反例相互校验，但测试不能替代普遍证明。", evidence: "用定义、边界样例和反例验证验证闭环", invariant: "验证闭环：推导、示例、代码实验和反例相互校验，但测试不能替代普遍证明。" },
  { label: "复杂度意识", premise: "验证闭环", transform: "在实现前估算候选空间和资源增长，及时改变问题或算法。", evidence: "为任务调度器建模时，先把任务、依赖和资源表示为有向图与容量约束；再用无环性作为可执行前提，用拓扑序作为结果证据，用复杂度估算容量。线上出现环时应返回结构化反例，而不是让执行器静默等待。", invariant: "复杂度意识：在实现前估算候选空间和资源增长，及时改变问题或算法。" },
];
export function Pm1ProgrammersMathematicsModelLab(){return <ProgrammerMathSeriesLab title="第9章 什么是程序员的数学：总结篇：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm1ProgrammersMathematicsBoundaryLab(){return <ProgrammerMathSeriesLab title="第9章 什么是程序员的数学：总结篇：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm1ProgrammersMathematicsEvidenceLab(){return <ProgrammerMathSeriesLab title="第9章 什么是程序员的数学：总结篇：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
