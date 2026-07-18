import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "点估计", premise: "统计推断用样本回答总体问题。点估计给一个数，区间估计表达不确定性；假设检验控制在原假设成立时误报的概率。p值不是原假设为真的概率，统计显著也不等于工程效果足够大。", transform: "用样本统计量估计总体参数，需讨论偏差、方差和一致性。", evidence: "用定义、边界样例和反例验证点估计", invariant: "点估计：用样本统计量估计总体参数，需讨论偏差、方差和一致性。" },
  { label: "置信区间", premise: "点估计", transform: "重复抽样程序中按指定比例覆盖真参数的区间，不是参数随机落入的概率。", evidence: "用定义、边界样例和反例验证置信区间", invariant: "置信区间：重复抽样程序中按指定比例覆盖真参数的区间，不是参数随机落入的概率。" },
  { label: "原假设", premise: "置信区间", transform: "检验暂时采用的基准模型，拒绝需要预先定义的统计量和显著性水平。", evidence: "用定义、边界样例和反例验证原假设", invariant: "原假设：检验暂时采用的基准模型，拒绝需要预先定义的统计量和显著性水平。" },
  { label: "p值", premise: "原假设", transform: "在原假设成立时观察到当前或更极端数据的概率，不是原假设后验概率。", evidence: "用定义、边界样例和反例验证p值", invariant: "p值：在原假设成立时观察到当前或更极端数据的概率，不是原假设后验概率。" },
  { label: "第一二类错误", premise: "p值", transform: "误拒真实原假设与未拒错误原假设之间存在取舍，功效随样本和效应变化。", evidence: "A/B测试应在实验前写主要指标、最小实际效应、样本量和停止规则。每天查看并在显著时停止会膨胀误报率。报告同时给效应差、置信区间、样本缺失与分流校验，才能判断是否值得发布。", invariant: "第一二类错误：误拒真实原假设与未拒错误原假设之间存在取舍，功效随样本和效应变化。" },
];
export function Pm2EstimationTestingModelLab(){return <ProgrammerMathSeriesLab title="第6章 估计与检验：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm2EstimationTestingBoundaryLab(){return <ProgrammerMathSeriesLab title="第6章 估计与检验：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm2EstimationTestingEvidenceLab(){return <ProgrammerMathSeriesLab title="第6章 估计与检验：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
