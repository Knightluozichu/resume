import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "核空间", premise: "解Ax=b是在结果中追溯原因。逆矩阵只适用于方阵满秩的良性情形；核、像和秩解释信息被保留或压扁的维数。病态矩阵即使可逆，也会放大微小输入误差。", transform: "被映射到零的输入方向；非零核表示不同输入可能产生同一输出。", evidence: "用定义、边界样例和反例验证核空间", invariant: "核空间：被映射到零的输入方向；非零核表示不同输入可能产生同一输出。" },
  { label: "像空间", premise: "核空间", transform: "所有可达输出组成的子空间，维数就是矩阵秩。", evidence: "用定义、边界样例和反例验证像空间", invariant: "像空间：所有可达输出组成的子空间，维数就是矩阵秩。" },
  { label: "秩", premise: "像空间", transform: "独立列或独立行的数量，表示映射实际保留的独立信息维数。", evidence: "用定义、边界样例和反例验证秩", invariant: "秩：独立列或独立行的数量，表示映射实际保留的独立信息维数。" },
  { label: "逆矩阵", premise: "秩", transform: "撤销双射线性映射；存在性等价于方阵满秩和零核。", evidence: "用定义、边界样例和反例验证逆矩阵", invariant: "逆矩阵：撤销双射线性映射；存在性等价于方阵满秩和零核。" },
  { label: "最小二乘与正则化", premise: "逆矩阵", transform: "无精确解或病态时最小化残差，并用惩罚项限制不稳定方向。", evidence: "传感器标定方程可能因两个特征几乎共线而近奇异。直接求逆会放大测量噪声；更稳妥的做法是用带主元分解求解，报告条件数，并在必要时增加独立观测或使用正则化，而不是把巨大系数当真实信号。", invariant: "最小二乘与正则化：无精确解或病态时最小化残差，并用惩罚项限制不稳定方向。" },
];
export function Pm3RankInverseEquationsModelLab(){return <ProgrammerMathSeriesLab title="第2章 秩、逆矩阵与线性方程组：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm3RankInverseEquationsBoundaryLab(){return <ProgrammerMathSeriesLab title="第2章 秩、逆矩阵与线性方程组：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm3RankInverseEquationsEvidenceLab(){return <ProgrammerMathSeriesLab title="第2章 秩、逆矩阵与线性方程组：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
