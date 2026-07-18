import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"置信水平",data:"置信区间由目标参数、抽样分布、置信水平和临界值共同构成。总体标准差已知或大样本可用z，小样本均值且标准差未知使用t分布；区间宽度体现精度而非真理概率。",model:"重复使用同一构造程序时覆盖真参数的长期比例。",evidence:"用计数、图形和反例验证置信水平",warning:"说“真参数有95%概率在这个已计算区间里”，混淆频率学派覆盖解释。"},
  {label:"标准误",data:"置信水平",model:"统计量抽样分布的标准差，量化样本到样本的波动。",evidence:"用计数、图形和反例验证标准误",warning:"小样本且总体标准差未知仍用z临界值，区间过窄。"},
  {label:"临界值",data:"标准误",model:"由置信水平和参考分布决定的标准化边界。",evidence:"用计数、图形和反例验证临界值",warning:"说“真参数有95%概率在这个已计算区间里”，混淆频率学派覆盖解释。"},
  {label:"z区间",data:"临界值",model:"已知总体标准差或大样本近似下使用标准正态临界值。",evidence:"用计数、图形和反例验证z区间",warning:"小样本且总体标准差未知仍用z临界值，区间过窄。"},
  {label:"t区间",data:"z区间",model:"小样本均值且总体标准差未知时，用更厚尾的t分布和n减1自由度。",evidence:"性能回归报告同时给平均差和95%区间。区间跨零不代表“没有差异”，而是当前数据无法排除零；区间若很宽，应增加独立样本或降低噪声，而不是只追求p值。",warning:"说“真参数有95%概率在这个已计算区间里”，混淆频率学派覆盖解释。"},
];
export function HfsConfidenceIntervalsDataLab(){return <HeadFirstStatsLab title="第12章 构造置信区间：有把握地猜：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsConfidenceIntervalsModelLab(){return <HeadFirstStatsLab title="第12章 构造置信区间：有把握地猜：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsConfidenceIntervalsEvidenceLab(){return <HeadFirstStatsLab title="第12章 构造置信区间：有把握地猜：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
