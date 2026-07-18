import { LinearAlgebraOfficialLab, type LinearSnapshot } from "./official-lab";
const snapshots:LinearSnapshot[]=[
  {
    "label": "广义特征向量",
    "definition": "非零v满足(T减lambda I)的某个正整数次幂作用后为零。",
    "step": "从广义特征向量的定义写出对象与量词",
    "invariant": "保持广义特征向量相关的子空间、维数或表示不变量",
    "counterexample": "把广义特征向量都当普通特征向量，忽略Jordan链中的层级。"
  },
  {
    "label": "幂零算子",
    "definition": "某个正整数次幂为零，存在由Jordan链构成的基。",
    "step": "从幂零算子的定义写出对象与量词",
    "invariant": "保持幂零算子相关的子空间、维数或表示不变量",
    "counterexample": "用浮点特征分解直接判断Jordan块大小，对微小扰动得出不稳定结论。"
  },
  {
    "label": "广义特征空间",
    "definition": "null(T减lambda I)的足够高次幂，维数给出特征值重数。",
    "step": "不同特征值对应的最小多项式因子互素，由Bezout恒等式得到广义特征空间直和分解。在每个分量上减去lambda I后得到幂零算子，再选择Jordan链基。",
    "invariant": "保持广义特征空间相关的子空间、维数或表示不变量",
    "counterexample": "把广义特征向量都当普通特征向量，忽略Jordan链中的层级。"
  },
  {
    "label": "Jordan形",
    "definition": "复向量空间上的算子在适当基下分块为特征值对角线加超对角线一。",
    "step": "从Jordan形的定义写出对象与量词",
    "invariant": "保持Jordan形相关的子空间、维数或表示不变量",
    "counterexample": "用浮点特征分解直接判断Jordan块大小，对微小扰动得出不稳定结论。"
  },
  {
    "label": "迹",
    "definition": "矩阵对角元之和，与基无关，也等于按重数计的特征值之和。",
    "step": "从迹的定义写出对象与量词",
    "invariant": "Jordan形适合解释理论结构，但数值上对扰动极敏感。工程计算用Schur或SVD，教学验收则检查链关系、分块维数、最小多项式和迹。",
    "counterexample": "把广义特征向量都当普通特征向量，忽略Jordan链中的层级。"
  }
];
export function Lad4OperatorsComplexVectorSpacesStructureLab(){return <LinearAlgebraOfficialLab title="第8章 复向量空间上的算子 · 结构" caption="切换核心定义，观察对象、子空间与映射关系。" mode="jordan" snapshots={snapshots}/>}
export function Lad4OperatorsComplexVectorSpacesProofLab(){return <LinearAlgebraOfficialLab title="第8章 复向量空间上的算子 · 证明" caption="推进证明，定位构造、引理与不变量。" mode="jordan" snapshots={snapshots} initial={1}/>}
export function Lad4OperatorsComplexVectorSpacesEvidenceLab(){return <LinearAlgebraOfficialLab title="第8章 复向量空间上的算子 · 证据" caption="用反例、残差与重构检查结论边界。" mode="jordan" snapshots={snapshots} initial={2}/>}
