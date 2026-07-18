import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"数据审计",data:"总复习要求从问题类型选择图表、分布、抽样与推断方法，并把效应、误差和失败边界放在同一份报告中。15章的知识必须形成从数据生成到决策的闭环。",model:"核对单位、缺失、分组和图形形态。",evidence:"用计数、图形和反例验证数据审计",warning:"把统计显著当业务显著或因果证明。"},
  {label:"模型选择",data:"数据审计",model:"从生成机制而不是曲线外观选择分布。",evidence:"用计数、图形和反例验证模型选择",warning:"只发布结论截图，不保留数据版本、排除规则和代码。"},
  {label:"抽样设计",data:"模型选择",model:"让样本选择过程支持目标总体推断。",evidence:"用计数、图形和反例验证抽样设计",warning:"把统计显著当业务显著或因果证明。"},
  {label:"误差控制",data:"抽样设计",model:"同时报告区间、第一二类错误和功效。",evidence:"用计数、图形和反例验证误差控制",warning:"只发布结论截图，不保留数据版本、排除规则和代码。"},
  {label:"可复现报告",data:"误差控制",model:"保存数据版本、代码、种子和未覆盖范围。",evidence:"综合验收用一次A/B实验：检查分流与缺失，画连续指标分布和分类列联表，估计均值差与区间，预设检验和功效，再用回归检查协变量。结果附效应、残差和敏感性分析。",warning:"把统计显著当业务显著或因果证明。"},
];
export function HfsOfficialFinalReviewDataLab(){return <HeadFirstStatsLab title="《深入浅出统计学》15章总复习：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsOfficialFinalReviewModelLab(){return <HeadFirstStatsLab title="《深入浅出统计学》15章总复习：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsOfficialFinalReviewEvidenceLab(){return <HeadFirstStatsLab title="《深入浅出统计学》15章总复习：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
