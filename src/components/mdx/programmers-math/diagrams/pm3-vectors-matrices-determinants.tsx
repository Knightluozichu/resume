import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "基底", premise: "向量描述空间中的点和方向，基底给出坐标语言，矩阵是线性映射在基底下的表示。矩阵乘法对应映射合成，行列式描述有向体积缩放；这些解释比手算规则更能预测结果。", transform: "一组线性无关且张成空间的向量，使每个向量拥有唯一坐标。", evidence: "用定义、边界样例和反例验证基底", invariant: "基底：一组线性无关且张成空间的向量，使每个向量拥有唯一坐标。" },
  { label: "坐标", premise: "基底", transform: "向量相对指定基底的系数；换基改变坐标，不改变抽象向量。", evidence: "用定义、边界样例和反例验证坐标", invariant: "坐标：向量相对指定基底的系数；换基改变坐标，不改变抽象向量。" },
  { label: "矩阵映射", premise: "坐标", transform: "矩阵列给出基向量的像，矩阵乘向量组合出任意输入的像。", evidence: "用定义、边界样例和反例验证矩阵映射", invariant: "矩阵映射：矩阵列给出基向量的像，矩阵乘向量组合出任意输入的像。" },
  { label: "矩阵乘法", premise: "矩阵映射", transform: "右侧映射先作用，左侧映射后作用；通常不满足交换律。", evidence: "用定义、边界样例和反例验证矩阵乘法", invariant: "矩阵乘法：右侧映射先作用，左侧映射后作用；通常不满足交换律。" },
  { label: "行列式", premise: "矩阵乘法", transform: "线性映射对有向面积或体积的缩放，零意味着维度被压扁。", evidence: "二维场景节点的缩放、旋转和平移通常组合为齐次矩阵。组合顺序不可交换：先绕原点旋转再平移，与先平移再绕原点旋转得到不同轨迹。引擎应固定列向量或行向量约定，并在API名称中明确局部与世界空间。", invariant: "行列式：线性映射对有向面积或体积的缩放，零意味着维度被压扁。" },
];
export function Pm3VectorsMatricesDeterminantsModelLab(){return <ProgrammerMathSeriesLab title="第1章 用空间语言表达向量、矩阵和行列式：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm3VectorsMatricesDeterminantsBoundaryLab(){return <ProgrammerMathSeriesLab title="第1章 用空间语言表达向量、矩阵和行列式：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm3VectorsMatricesDeterminantsEvidenceLab(){return <ProgrammerMathSeriesLab title="第1章 用空间语言表达向量、矩阵和行列式：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
