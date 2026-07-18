import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"双变量数据",data:"散点图先揭示双变量形态，相关系数量化线性关联，最小二乘回归用一条直线预测响应。相关不等于因果，强相关也可能被离群点、非线性或潜在变量制造。",model:"每个观察单位提供成对x与y，配对关系不能在聚合中丢失。",evidence:"用计数、图形和反例验证双变量数据",warning:"相关系数接近零就断言没有关系，忽略曲线关系与分群。"},
  {label:"散点图",data:"双变量数据",model:"展示方向、形态、强度、离群点和分群，是计算相关前的必要检查。",evidence:"用计数、图形和反例验证散点图",warning:"在观测区间外远距离外推回归线，假设线性机制永远不变。"},
  {label:"相关系数",data:"散点图",model:"标准化协方差，位于负1到1并仅衡量线性关联。",evidence:"用计数、图形和反例验证相关系数",warning:"相关系数接近零就断言没有关系，忽略曲线关系与分群。"},
  {label:"最小二乘线",data:"相关系数",model:"选择截距斜率使纵向残差平方和最小。",evidence:"用计数、图形和反例验证最小二乘线",warning:"在观测区间外远距离外推回归线，假设线性机制永远不变。"},
  {label:"残差分析",data:"最小二乘线",model:"观察预测误差是否随机、等方差且无结构，以检查线性模型。",evidence:"日照与演唱会出席相关不证明日照直接导致购买。天气可能同时影响营销、交通和日期选择。回归报告应展示散点、残差、区间和外推范围，并把因果结论留给随机实验或明确因果设计。",warning:"相关系数接近零就断言没有关系，忽略曲线关系与分群。"},
];
export function HfsCorrelationRegressionDataLab(){return <HeadFirstStatsLab title="第15章 相关与回归：最佳拟合线：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsCorrelationRegressionModelLab(){return <HeadFirstStatsLab title="第15章 相关与回归：最佳拟合线：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsCorrelationRegressionEvidenceLab(){return <HeadFirstStatsLab title="第15章 相关与回归：最佳拟合线：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
