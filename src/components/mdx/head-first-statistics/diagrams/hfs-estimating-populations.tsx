import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"参数与统计量",data:"点估计用样本统计量近似总体参数。本章推导均值、方差、比例的估计量及其抽样分布，并用中心极限定理解释为何大样本均值常可用正态近似。",model:"参数描述总体且固定未知，统计量由随机样本计算因而有分布。",evidence:"用计数、图形和反例验证参数与统计量",warning:"把样本统计量当固定真值，不报告抽样误差。"},
  {label:"点估计量",data:"参数与统计量",model:"用统计量猜测参数，应评价偏差、方差和一致性。",evidence:"用计数、图形和反例验证点估计量",warning:"把相关日志行当独立观测，虚增样本量并低估标准误。"},
  {label:"样本比例",data:"点估计量",model:"成功数除以样本量，期望为总体比例，方差随n下降。",evidence:"用计数、图形和反例验证样本比例",warning:"把样本统计量当固定真值，不报告抽样误差。"},
  {label:"抽样分布",data:"样本比例",model:"重复抽样时统计量的概率分布，是不确定性量化基础。",evidence:"用计数、图形和反例验证抽样分布",warning:"把相关日志行当独立观测，虚增样本量并低估标准误。"},
  {label:"中心极限定理",data:"抽样分布",model:"独立同分布且方差有限时，大样本标准化均值趋近正态。",evidence:"上线指标的单日均值不是总体参数本身。应按用户或实验单位定义独立性，估计抽样分布并检查重尾。若同一用户贡献多条记录，按记录当独立样本会夸大有效样本量。",warning:"把样本统计量当固定真值，不报告抽样误差。"},
];
export function HfsEstimatingPopulationsDataLab(){return <HeadFirstStatsLab title="第11章 估计总体与样本：做出预测：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsEstimatingPopulationsModelLab(){return <HeadFirstStatsLab title="第11章 估计总体与样本：做出预测：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsEstimatingPopulationsEvidenceLab(){return <HeadFirstStatsLab title="第11章 估计总体与样本：做出预测：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
