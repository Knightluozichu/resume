import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"互斥事件",data:"本章用轮盘、Venn图和概率树连接补集、并集、交集、条件概率、全概率公式与贝叶斯定理。重点是先写事件和生成机制，再决定加法还是乘法，不能把条件方向凭直觉互换。",model:"两个事件不能同时发生，交集为空时并集概率可直接相加。",evidence:"用计数、图形和反例验证互斥事件",warning:"把互斥与独立混为一谈；正概率互斥事件反而不独立。"},
  {label:"条件概率",data:"互斥事件",model:"已知B发生后在B对应的子空间重新归一化A的概率。",evidence:"用计数、图形和反例验证条件概率",warning:"将P(A给定B)当成P(B给定A)，漏掉先验基率。"},
  {label:"概率树",data:"条件概率",model:"按时间或条件顺序展开分支，路径概率相乘、互斥路径概率相加。",evidence:"用计数、图形和反例验证概率树",warning:"把互斥与独立混为一谈；正概率互斥事件反而不独立。"},
  {label:"全概率公式",data:"概率树",model:"按互斥完备条件分区汇总目标事件概率。",evidence:"用计数、图形和反例验证全概率公式",warning:"将P(A给定B)当成P(B给定A)，漏掉先验基率。"},
  {label:"贝叶斯定理",data:"全概率公式",model:"用似然和先验更新后验，证据概率负责归一化。",evidence:"告警系统的后验可信度取决于故障基率、召回和误报率。即使召回很高，低基率也会让多数告警为假。看板应展示分子分母的真实计数，而不只展示一个“准确率”。",warning:"把互斥与独立混为一谈；正概率互斥事件反而不独立。"},
];
export function HfsCalculatingProbabilitiesDataLab(){return <HeadFirstStatsLab title="第4章 概率计算：把握机会：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsCalculatingProbabilitiesModelLab(){return <HeadFirstStatsLab title="第4章 概率计算：把握机会：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsCalculatingProbabilitiesEvidenceLab(){return <HeadFirstStatsLab title="第4章 概率计算：把握机会：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
