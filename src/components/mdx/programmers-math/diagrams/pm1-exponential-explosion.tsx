import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "问题空间", premise: "指数爆炸描述输入每增加一点，候选空间按固定倍数增长。棋盘、密码、子集和递归搜索都可能迅速越过硬件能力。对数帮助反推可承受输入规模，剪枝、近似、随机化和改变问题是常见应对方式。", transform: "算法可能检查的候选集合；先估计其大小，才能判断暴力法是否可行。", evidence: "用定义、边界样例和反例验证问题空间", invariant: "问题空间：算法可能检查的候选集合；先估计其大小，才能判断暴力法是否可行。" },
  { label: "指数增长", premise: "问题空间", transform: "输入增加1使规模乘常数，长期增长远快于任意固定次数多项式。", evidence: "用定义、边界样例和反例验证指数增长", invariant: "指数增长：输入增加1使规模乘常数，长期增长远快于任意固定次数多项式。" },
  { label: "对数尺度", premise: "指数增长", transform: "把乘法增长转换为加法，可反推位数、安全强度和最大可处理规模。", evidence: "用定义、边界样例和反例验证对数尺度", invariant: "对数尺度：把乘法增长转换为加法，可反推位数、安全强度和最大可处理规模。" },
  { label: "剪枝", premise: "对数尺度", transform: "利用约束提前排除整片候选空间；有效性依赖不会误删可行解的证明。", evidence: "用定义、边界样例和反例验证剪枝", invariant: "剪枝：利用约束提前排除整片候选空间；有效性依赖不会误删可行解的证明。" },
  { label: "复杂度策略", premise: "剪枝", transform: "减少输入、改进算法、接受近似或利用领域结构，而不是只寄希望于更快机器。", evidence: "功能开关组合测试有n个二元开关，完全枚举是2的n次方。团队应识别互斥约束、关键交互和风险优先级，用成对覆盖或性质测试压缩；同时保留少量端到端组合验证，不能把压缩后的覆盖误称为穷尽证明。", invariant: "复杂度策略：减少输入、改进算法、接受近似或利用领域结构，而不是只寄希望于更快机器。" },
];
export function Pm1ExponentialExplosionModelLab(){return <ProgrammerMathSeriesLab title="第7章 指数爆炸：识别问题空间：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm1ExponentialExplosionBoundaryLab(){return <ProgrammerMathSeriesLab title="第7章 指数爆炸：识别问题空间：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm1ExponentialExplosionEvidenceLab(){return <ProgrammerMathSeriesLab title="第7章 指数爆炸：识别问题空间：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
