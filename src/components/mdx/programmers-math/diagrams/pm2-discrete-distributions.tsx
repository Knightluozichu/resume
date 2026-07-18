import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "概率质量函数", premise: "离散随机变量通过概率质量函数分配可数结果。伯努利、二项、几何和泊松分布对应不同生成机制；期望与方差压缩中心和波动，但不能唯一决定整个分布。选分布应从试验结构出发。", transform: "为每个离散取值分配非负概率，所有取值概率之和为1。", evidence: "用定义、边界样例和反例验证概率质量函数", invariant: "概率质量函数：为每个离散取值分配非负概率，所有取值概率之和为1。" },
  { label: "伯努利分布", premise: "概率质量函数", transform: "一次成功或失败试验，参数p描述成功概率。", evidence: "用定义、边界样例和反例验证伯努利分布", invariant: "伯努利分布：一次成功或失败试验，参数p描述成功概率。" },
  { label: "二项分布", premise: "伯努利分布", transform: "n次独立同分布伯努利试验中的成功次数；独立和固定p是关键假设。", evidence: "用定义、边界样例和反例验证二项分布", invariant: "二项分布：n次独立同分布伯努利试验中的成功次数；独立和固定p是关键假设。" },
  { label: "期望", premise: "二项分布", transform: "按概率加权的长期平均，可用线性性拆分，即使变量不独立也成立。", evidence: "用定义、边界样例和反例验证期望", invariant: "期望：按概率加权的长期平均，可用线性性拆分，即使变量不独立也成立。" },
  { label: "方差", premise: "期望", transform: "平方偏差的期望，衡量离均值的扩散；标准差恢复原量纲。", evidence: "请求重试次数若每次成功概率固定且尝试独立，可用几何分布估计尾部；但真实服务的故障会成批相关，p随时间变化。工程上应先画经验分布和条件分层，再决定经典分布是否只是近似。", invariant: "方差：平方偏差的期望，衡量离均值的扩散；标准差恢复原量纲。" },
];
export function Pm2DiscreteDistributionsModelLab(){return <ProgrammerMathSeriesLab title="第3章 离散值的概率分布：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm2DiscreteDistributionsBoundaryLab(){return <ProgrammerMathSeriesLab title="第3章 离散值的概率分布：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm2DiscreteDistributionsEvidenceLab(){return <ProgrammerMathSeriesLab title="第3章 离散值的概率分布：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
