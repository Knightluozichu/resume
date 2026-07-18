import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"算术均值",data:"均值、中位数和众数回答不同的“典型值”问题。均值使用全部数值但受离群点影响，中位数只依赖顺序而稳健，众数适用于分类数据。选择中心指标必须结合分布形状和决策损失。",model:"所有观测总和除以数量，也是平方误差损失下的最佳常数预测。",evidence:"用计数、图形和反例验证算术均值",warning:"把“平均”默认写成算术均值，没有说明离群点、偏态和业务损失。"},
  {label:"加权均值",data:"算术均值",model:"频数或重要度作为权重时，用加权总和除以权重总和。",evidence:"用计数、图形和反例验证加权均值",warning:"分类编码为数字后计算均值；编码大小没有数量语义，结果不可解释。"},
  {label:"中位数",data:"加权均值",model:"排序后位于中间的值，最小化绝对误差并对极端值更稳健。",evidence:"用计数、图形和反例验证中位数",warning:"把“平均”默认写成算术均值，没有说明离群点、偏态和业务损失。"},
  {label:"众数",data:"中位数",model:"出现频数最高的取值，可有多个或不存在，适合分类变量。",evidence:"用计数、图形和反例验证众数",warning:"分类编码为数字后计算均值；编码大小没有数量语义，结果不可解释。"},
  {label:"离群点影响",data:"众数",model:"极端值能显著拉动均值，却通常不改变大多数样本的次序位置。",evidence:"薪资报告若只给均值，少量高薪会掩盖典型员工处境。应并列中位数、分位数和样本构成；若决策关心总成本，均值仍有意义。指标不是互相替代，而是回答不同问题。",warning:"把“平均”默认写成算术均值，没有说明离群点、偏态和业务损失。"},
];
export function HfsCentralTendencyDataLab(){return <HeadFirstStatsLab title="第2章 集中趋势：中间道路：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsCentralTendencyModelLab(){return <HeadFirstStatsLab title="第2章 集中趋势：中间道路：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsCentralTendencyEvidenceLab(){return <HeadFirstStatsLab title="第2章 集中趋势：中间道路：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
