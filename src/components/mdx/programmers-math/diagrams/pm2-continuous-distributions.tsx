import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "概率密度", premise: "连续随机变量用密度描述区间概率，单点概率通常为零。累积分布函数统一离散与连续视角，均匀、指数和正态分布分别表达有限区间、无记忆等待和许多小扰动叠加。", transform: "密度值不是点概率，曲线在区间下的面积才是概率，总面积为1。", evidence: "用定义、边界样例和反例验证概率密度", invariant: "概率密度：密度值不是点概率，曲线在区间下的面积才是概率，总面积为1。" },
  { label: "累积分布函数", premise: "概率密度", transform: "给出X不大于x的概率，单调且从0趋近1，可统一处理分位数。", evidence: "用定义、边界样例和反例验证累积分布函数", invariant: "累积分布函数：给出X不大于x的概率，单调且从0趋近1，可统一处理分位数。" },
  { label: "均匀分布", premise: "累积分布函数", transform: "有限区间内密度恒定；端点和随机数离散化会影响实现。", evidence: "用定义、边界样例和反例验证均匀分布", invariant: "均匀分布：有限区间内密度恒定；端点和随机数离散化会影响实现。" },
  { label: "指数分布", premise: "均匀分布", transform: "恒定到达率下的等待时间模型，具有无记忆性。", evidence: "用定义、边界样例和反例验证指数分布", invariant: "指数分布：恒定到达率下的等待时间模型，具有无记忆性。" },
  { label: "正态分布", premise: "指数分布", transform: "由均值和方差决定的钟形分布，适合加性扰动但不自动适合所有数据。", evidence: "延迟分布通常右偏并有长尾，平均值和正态假设会掩盖少量严重慢请求。服务等级应使用经验分位数；若拟合对数正态或混合模型，需用留出数据检查尾部，而不是只看中部曲线贴合。", invariant: "正态分布：由均值和方差决定的钟形分布，适合加性扰动但不自动适合所有数据。" },
];
export function Pm2ContinuousDistributionsModelLab(){return <ProgrammerMathSeriesLab title="第4章 连续值的概率分布：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm2ContinuousDistributionsBoundaryLab(){return <ProgrammerMathSeriesLab title="第4章 连续值的概率分布：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm2ContinuousDistributionsEvidenceLab(){return <ProgrammerMathSeriesLab title="第4章 连续值的概率分布：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
