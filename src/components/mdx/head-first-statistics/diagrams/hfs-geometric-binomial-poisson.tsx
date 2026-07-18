import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"几何分布",data:"三种离散分布对应三种问题：几何分布等到首次成功，二项分布数固定试验中的成功次数，泊松分布数固定区间内的稀疏事件。模型选择由生成过程决定。",model:"独立伯努利试验直到首次成功的试验次数，期望为1除以p。",evidence:"用计数、图形和反例验证几何分布",warning:"数据是计数就自动套泊松，没有检查稳定率与独立增量。"},
  {label:"二项分布",data:"几何分布",model:"固定n次独立同概率试验中的成功次数。",evidence:"用计数、图形和反例验证二项分布",warning:"把几何分布的取值从0开始还是1开始混用，造成期望和概率偏一。"},
  {label:"泊松分布",data:"二项分布",model:"固定区间内独立稀疏到达次数，均值与方差都为lambda。",evidence:"用计数、图形和反例验证泊松分布",warning:"数据是计数就自动套泊松，没有检查稳定率与独立增量。"},
  {label:"参数假设",data:"泊松分布",model:"独立、固定概率或稳定到达率是公式成立的核心。",evidence:"用计数、图形和反例验证参数假设",warning:"把几何分布的取值从0开始还是1开始混用，造成期望和概率偏一。"},
  {label:"分布可加性",data:"参数假设",model:"独立泊松变量相加仍为泊松，参数相加。",evidence:"每分钟请求到达数可近似泊松，但发布或故障会产生突发和相关。应按时间段检验均值方差关系与过度离散，再决定使用泊松、负二项或经验模型。",warning:"数据是计数就自动套泊松，没有检查稳定率与独立增量。"},
];
export function HfsGeometricBinomialPoissonDataLab(){return <HeadFirstStatsLab title="第7章 几何、二项与泊松分布：离散模型：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsGeometricBinomialPoissonModelLab(){return <HeadFirstStatsLab title="第7章 几何、二项与泊松分布：离散模型：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsGeometricBinomialPoissonEvidenceLab(){return <HeadFirstStatsLab title="第7章 几何、二项与泊松分布：离散模型：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
