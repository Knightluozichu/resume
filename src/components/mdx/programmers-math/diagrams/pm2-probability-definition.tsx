import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "样本空间", premise: "概率从样本空间、事件和概率测度开始。蒙提霍尔问题揭示直觉容易忽略主持人的条件化行为；频率实验能帮助校验，但有限模拟不是定义本身。模型必须说明等可能性从何而来。", transform: "一次随机试验所有可能基本结果的集合；遗漏结果会破坏后续概率。", evidence: "用定义、边界样例和反例验证样本空间", invariant: "样本空间：一次随机试验所有可能基本结果的集合；遗漏结果会破坏后续概率。" },
  { label: "事件", premise: "样本空间", transform: "样本空间的子集；事件发生表示实际结果落在该子集中。", evidence: "用定义、边界样例和反例验证事件", invariant: "事件：样本空间的子集；事件发生表示实际结果落在该子集中。" },
  { label: "概率公理", premise: "事件", transform: "非负、全集概率为1、互斥事件可列可加，其他规则由此推出。", evidence: "用定义、边界样例和反例验证概率公理", invariant: "概率公理：非负、全集概率为1、互斥事件可列可加，其他规则由此推出。" },
  { label: "条件信息", premise: "概率公理", transform: "观察或机制改变后应缩小样本空间并重新归一化，而非沿用先验直觉。", evidence: "用定义、边界样例和反例验证条件信息", invariant: "条件信息：观察或机制改变后应缩小样本空间并重新归一化，而非沿用先验直觉。" },
  { label: "蒙提霍尔问题", premise: "条件信息", transform: "主持人知道奖品位置且必开空门，这个选择机制保留了初选门的三分之一概率。", evidence: "A/B实验的样本空间不仅是点击或未点击，还包含分流规则、曝光成功与机器人过滤。若随机分配在客户端失败，实际概率模型已改变。数据管道应记录分桶依据和排除原因，才能解释频率是否估计了目标概率。", invariant: "蒙提霍尔问题：主持人知道奖品位置且必开空门，这个选择机制保留了初选门的三分之一概率。" },
];
export function Pm2ProbabilityDefinitionModelLab(){return <ProgrammerMathSeriesLab title="第1章 概率的定义：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm2ProbabilityDefinitionBoundaryLab(){return <ProgrammerMathSeriesLab title="第1章 概率的定义：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm2ProbabilityDefinitionEvidenceLab(){return <ProgrammerMathSeriesLab title="第1章 概率的定义：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
