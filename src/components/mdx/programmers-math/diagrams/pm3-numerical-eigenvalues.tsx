import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "幂法", premise: "五次以上一般多项式没有统一根式公式，数值特征值计算必须通过迭代。幂法寻找主特征对，QR迭代逐步显露全部特征值；停止条件、缩放、移位和残差决定答案是否可信。", transform: "重复乘矩阵并归一化，在主特征值唯一且初始向量有投影时收敛。", evidence: "用定义、边界样例和反例验证幂法", invariant: "幂法：重复乘矩阵并归一化，在主特征值唯一且初始向量有投影时收敛。" },
  { label: "Rayleigh商", premise: "幂法", transform: "用v转置Av除以v转置v估计与v对应的特征值。", evidence: "用定义、边界样例和反例验证Rayleigh商", invariant: "Rayleigh商：用v转置Av除以v转置v估计与v对应的特征值。" },
  { label: "QR分解", premise: "Rayleigh商", transform: "把矩阵分成正交Q与上三角R，为稳定迭代和最小二乘提供基础。", evidence: "用定义、边界样例和反例验证QR分解", invariant: "QR分解：把矩阵分成正交Q与上三角R，为稳定迭代和最小二乘提供基础。" },
  { label: "QR迭代", premise: "QR分解", transform: "反复QR分解并交换RQ，保持相似性并趋向上三角或准上三角。", evidence: "用定义、边界样例和反例验证QR迭代", invariant: "QR迭代：反复QR分解并交换RQ，保持相似性并趋向上三角或准上三角。" },
  { label: "特征残差", premise: "QR迭代", transform: "范数Av减lambda v直接衡量特征对满足程度，是停止与验收证据。", evidence: "主成分分析不应显式构造巨大稠密协方差矩阵再求全部谱。若只需前几个方向，可对中心化数据使用迭代SVD或随机方法；验收要报告解释方差、正交误差、残差和不同种子的稳定性。", invariant: "特征残差：范数Av减lambda v直接衡量特征对满足程度，是停止与验收证据。" },
];
export function Pm3NumericalEigenvaluesModelLab(){return <ProgrammerMathSeriesLab title="第5章 计算机上的计算（二）：特征值算法：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm3NumericalEigenvaluesBoundaryLab(){return <ProgrammerMathSeriesLab title="第5章 计算机上的计算（二）：特征值算法：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm3NumericalEigenvaluesEvidenceLab(){return <ProgrammerMathSeriesLab title="第5章 计算机上的计算（二）：特征值算法：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
