import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"随机变量",data:"离散概率分布列出随机变量每个取值及其概率。期望给长期平均，方差描述结果分散；线性变换和独立观测的规则允许不枚举完整联合分布就计算组合变量。",model:"把样本空间结果映射为数值，变量的分布由试验机制诱导。",evidence:"用计数、图形和反例验证随机变量",warning:"把期望解释为一次试验最可能出现的结果；期望甚至可能不是可取值。"},
  {label:"概率质量函数",data:"随机变量",model:"为每个离散取值分配非负概率且总和为1。",evidence:"用计数、图形和反例验证概率质量函数",warning:"相加相关变量时直接相加方差，遗漏协方差项。"},
  {label:"期望",data:"概率质量函数",model:"概率加权平均，具有线性性，即使变量不独立也可相加。",evidence:"用计数、图形和反例验证期望",warning:"把期望解释为一次试验最可能出现的结果；期望甚至可能不是可取值。"},
  {label:"方差",data:"期望",model:"围绕期望的平方偏差；独立变量方差相加。",evidence:"用计数、图形和反例验证方差",warning:"相加相关变量时直接相加方差，遗漏协方差项。"},
  {label:"线性变换",data:"方差",model:"Y等于aX加b时，期望变为aE[X]加b，方差变为a平方Var(X)。",evidence:"促销收益不能只看期望为正，还要看方差和最坏损失。两个游戏平均收益相同，尾部风险可能不同。模拟应与解析期望交叉验证，并记录独立性、赔付上限和样本误差。",warning:"把期望解释为一次试验最可能出现的结果；期望甚至可能不是可取值。"},
];
export function HfsDiscreteProbabilityDistributionsDataLab(){return <HeadFirstStatsLab title="第5章 离散概率分布：管理期望：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsDiscreteProbabilityDistributionsModelLab(){return <HeadFirstStatsLab title="第5章 离散概率分布：管理期望：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsDiscreteProbabilityDistributionsEvidenceLab(){return <HeadFirstStatsLab title="第5章 离散概率分布：管理期望：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
