import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "联合分布", premise: "联合分布描述变量如何共同出现，边缘分布只看其中一部分，条件概率则在观察信息后重新分配质量。独立性是联合分布可分解的强假设，相关或条件关系不能凭变量名称猜测。", transform: "为变量组合分配概率，完整保留相互作用，是边缘与条件计算的来源。", evidence: "用定义、边界样例和反例验证联合分布", invariant: "联合分布：为变量组合分配概率，完整保留相互作用，是边缘与条件计算的来源。" },
  { label: "边缘分布", premise: "联合分布", transform: "对其他变量求和或积分后得到单个变量分布，会丢失依赖结构。", evidence: "用定义、边界样例和反例验证边缘分布", invariant: "边缘分布：对其他变量求和或积分后得到单个变量分布，会丢失依赖结构。" },
  { label: "条件概率", premise: "边缘分布", transform: "已知事件B后，只在B内部重新归一化A所占的概率质量。", evidence: "用定义、边界样例和反例验证条件概率", invariant: "条件概率：已知事件B后，只在B内部重新归一化A所占的概率质量。" },
  { label: "独立性", premise: "条件概率", transform: "联合概率等于边缘概率乘积；零相关通常不足以推出独立。", evidence: "用定义、边界样例和反例验证独立性", invariant: "独立性：联合概率等于边缘概率乘积；零相关通常不足以推出独立。" },
  { label: "贝叶斯公式", premise: "独立性", transform: "把似然与先验组合成后验，同时用证据概率完成归一化。", evidence: "异常检测器命中率很高，但若真实异常极少，阳性样本中仍可能多数是假警报。计算后验必须带入异常先验、召回率和误报率。监控面板只展示“准确率”而不展示基率，会让值班人员高估告警可信度。", invariant: "贝叶斯公式：把似然与先验组合成后验，同时用证据概率完成归一化。" },
];
export function Pm2MultipleRandomVariablesModelLab(){return <ProgrammerMathSeriesLab title="第2章 多个随机变量的相互影响：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm2MultipleRandomVariablesBoundaryLab(){return <ProgrammerMathSeriesLab title="第2章 多个随机变量的相互影响：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm2MultipleRandomVariablesEvidenceLab(){return <ProgrammerMathSeriesLab title="第2章 多个随机变量的相互影响：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
