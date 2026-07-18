import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "特征值", premise: "特征向量是在映射下方向不变的轴，特征值给出该轴的缩放。对角化把耦合系统变为独立标量模式；不可对角化时Jordan块揭示额外多项式增长。离散系统稳定性由特征值模控制。", transform: "沿某特殊方向的缩放因子，可能为复数并控制迭代增长或旋转。", evidence: "用定义、边界样例和反例验证特征值", invariant: "特征值：沿某特殊方向的缩放因子，可能为复数并控制迭代增长或旋转。" },
  { label: "特征向量", premise: "特征值", transform: "非零且映射后方向保持的向量，为系统提供自然坐标轴。", evidence: "用定义、边界样例和反例验证特征向量", invariant: "特征向量：非零且映射后方向保持的向量，为系统提供自然坐标轴。" },
  { label: "对角化", premise: "特征向量", transform: "拥有足够独立特征向量时换基到特征坐标，使矩阵变成对角。", evidence: "用定义、边界样例和反例验证对角化", invariant: "对角化：拥有足够独立特征向量时换基到特征坐标，使矩阵变成对角。" },
  { label: "稳定性", premise: "对角化", transform: "离散迭代中所有特征值模小于1通常衰减，大于1的模式会增长。", evidence: "用定义、边界样例和反例验证稳定性", invariant: "稳定性：离散迭代中所有特征值模小于1通常衰减，大于1的模式会增长。" },
  { label: "Jordan标准形", premise: "稳定性", transform: "特征向量不足时用广义特征向量形成块，幂中出现n等多项式因子。", evidence: "推荐系统的状态更新若每轮乘转移矩阵，最大特征值和对应向量决定长期分布。归一化可防数值发散，但若矩阵随时间变化或存在多个单位模模式，单一稳态解释不再成立，必须检查谱间隙和周期性。", invariant: "Jordan标准形：特征向量不足时用广义特征向量形成块，幂中出现n等多项式因子。" },
];
export function Pm3EigenvaluesJordanModelLab(){return <ProgrammerMathSeriesLab title="第4章 特征值、对角化与Jordan标准形：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm3EigenvaluesJordanBoundaryLab(){return <ProgrammerMathSeriesLab title="第4章 特征值、对角化与Jordan标准形：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm3EigenvaluesJordanEvidenceLab(){return <ProgrammerMathSeriesLab title="第4章 特征值、对角化与Jordan标准形：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
