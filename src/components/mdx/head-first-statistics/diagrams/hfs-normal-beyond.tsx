import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"正态线性组合",data:"本章研究正态变量的线性组合、独立观测的均值方差，以及用正态近似二项和泊松分布。连续近似离散计数时必须做连续性校正，并确认参数已进入近似可靠区间。",model:"独立正态变量的线性组合仍为正态，均值线性组合、方差平方加权。",evidence:"用计数、图形和反例验证正态线性组合",warning:"近似离散分布时忘记连续性校正，尤其在边界概率产生系统偏差。"},
  {label:"独立观测",data:"正态线性组合",model:"独立性让协方差为零，从而方差可直接相加。",evidence:"用计数、图形和反例验证独立观测",warning:"相关变量仍按独立公式相加方差，漏掉协方差。"},
  {label:"二项正态近似",data:"独立观测",model:"np和n(1-p)足够大时，可用同均值方差正态分布近似。",evidence:"用计数、图形和反例验证二项正态近似",warning:"近似离散分布时忘记连续性校正，尤其在边界概率产生系统偏差。"},
  {label:"泊松正态近似",data:"二项正态近似",model:"lambda较大时泊松形状趋近正态，均值方差均为lambda。",evidence:"用计数、图形和反例验证泊松正态近似",warning:"相关变量仍按独立公式相加方差，漏掉协方差。"},
  {label:"连续性校正",data:"泊松正态近似",model:"把离散整数事件扩成相邻半单位边界，减少连续面积近似误差。",evidence:"库存缺货概率若需求是大参数泊松可用正态快速近似，但阈值靠近尾部或lambda小应使用精确分布。系统可根据误差预算切换算法，并在监控中对比精确抽样。",warning:"近似离散分布时忘记连续性校正，尤其在边界概率产生系统偏差。"},
];
export function HfsNormalBeyondDataLab(){return <HeadFirstStatsLab title="第9章 正态分布进阶：超越正态：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsNormalBeyondModelLab(){return <HeadFirstStatsLab title="第9章 正态分布进阶：超越正态：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsNormalBeyondEvidenceLab(){return <HeadFirstStatsLab title="第9章 正态分布进阶：超越正态：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
