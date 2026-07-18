import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "空间想象", premise: "线性代数的价值不止是解方程。向量把对象放进空间，矩阵表达映射，局部线性化让复杂非线性问题可计算。动机章要求读者先看见几何和程序中的用途，再进入符号推导。", transform: "把多个数视为一个点或方向，关系、距离和变换因而可视化。", evidence: "用定义、边界样例和反例验证空间想象", invariant: "空间想象：把多个数视为一个点或方向，关系、距离和变换因而可视化。" },
  { label: "向量表示", premise: "空间想象", transform: "按固定顺序收集特征；每一维的语义、单位和基底必须明确。", evidence: "用定义、边界样例和反例验证向量表示", invariant: "向量表示：按固定顺序收集特征；每一维的语义、单位和基底必须明确。" },
  { label: "线性映射", premise: "向量表示", transform: "保持加法与数乘的变换，可由矩阵统一表示并组合。", evidence: "用定义、边界样例和反例验证线性映射", invariant: "线性映射：保持加法与数乘的变换，可由矩阵统一表示并组合。" },
  { label: "线性近似", premise: "线性映射", transform: "在局部用切线或雅可比矩阵逼近非线性函数，误差随步长增大。", evidence: "用定义、边界样例和反例验证线性近似", invariant: "线性近似：在局部用切线或雅可比矩阵逼近非线性函数，误差随步长增大。" },
  { label: "数值证据", premise: "线性近似", transform: "图形直觉、代数等式和程序计算相互检查，尤其关注尺度与舍入。", evidence: "相机标定把三维点通过投影映射到像素。完整模型非线性，但在当前参数附近可以用雅可比预测微小参数调整如何改变重投影误差。迭代优化每步都依赖局部近似，步长过大会离开可信邻域。", invariant: "数值证据：图形直觉、代数等式和程序计算相互检查，尤其关注尺度与舍入。" },
];
export function Pm3MotivationModelLab(){return <ProgrammerMathSeriesLab title="第0章 动机：空间想象与线性近似：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm3MotivationBoundaryLab(){return <ProgrammerMathSeriesLab title="第0章 动机：空间想象与线性近似：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm3MotivationEvidenceLab(){return <ProgrammerMathSeriesLab title="第0章 动机：空间想象与线性近似：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
