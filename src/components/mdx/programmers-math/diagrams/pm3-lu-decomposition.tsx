import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "高斯消元", premise: "LU分解把一般矩阵拆成下三角和上三角，复杂求解转为两次代入。对同一系数矩阵的多个右端项，分解成本只付一次；部分主元选取消除零主元并改善数值稳定性。", transform: "用行操作逐列消去下方元素，把系统化为上三角形式。", evidence: "用定义、边界样例和反例验证高斯消元", invariant: "高斯消元：用行操作逐列消去下方元素，把系统化为上三角形式。" },
  { label: "LU分解", premise: "高斯消元", transform: "把消元乘子存入L、消元结果存入U，复用一次消元过程。", evidence: "用定义、边界样例和反例验证LU分解", invariant: "LU分解：把消元乘子存入L、消元结果存入U，复用一次消元过程。" },
  { label: "前向后向代入", premise: "LU分解", transform: "三角系统按依赖顺序逐项求解，成本为平方量级。", evidence: "用定义、边界样例和反例验证前向后向代入", invariant: "前向后向代入：三角系统按依赖顺序逐项求解，成本为平方量级。" },
  { label: "部分主元", premise: "前向后向代入", transform: "每列选择绝对值较大的候选行交换到主元位置，避免除零并降低误差。", evidence: "用定义、边界样例和反例验证部分主元", invariant: "部分主元：每列选择绝对值较大的候选行交换到主元位置，避免除零并降低误差。" },
  { label: "残差", premise: "部分主元", transform: "用b减Ax检查方程满足程度；小残差仍需结合条件数判断解误差。", evidence: "电路仿真每个时间步可能共享同一拓扑矩阵却有不同激励向量。缓存带主元的LU分解能显著减少重复工作，但只在矩阵未变时有效；元件状态改变后必须失效缓存，并记录残差监控数值退化。", invariant: "残差：用b减Ax检查方程满足程度；小残差仍需结合条件数判断解误差。" },
];
export function Pm3LuDecompositionModelLab(){return <ProgrammerMathSeriesLab title="第3章 计算机上的计算（一）：LU分解：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm3LuDecompositionBoundaryLab(){return <ProgrammerMathSeriesLab title="第3章 计算机上的计算（一）：LU分解：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm3LuDecompositionEvidenceLab(){return <ProgrammerMathSeriesLab title="第3章 计算机上的计算（一）：LU分解：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
