import { LinearAlgebraOfficialLab, type LinearSnapshot } from "./official-lab";
const snapshots:LinearSnapshot[]=[
  {
    "label": "内积",
    "definition": "满足共轭对称、线性和正定的标量函数，用于定义长度与角度。",
    "step": "从内积的定义写出对象与量词",
    "invariant": "保持内积相关的子空间、维数或表示不变量",
    "counterexample": "在复内积空间忘记一个槽需要共轭，导致所谓范数不再总是实非负。"
  },
  {
    "label": "正交规范基",
    "definition": "基向量两两正交且长度为一，坐标直接由内积取得。",
    "step": "从正交规范基的定义写出对象与量词",
    "invariant": "保持正交规范基相关的子空间、维数或表示不变量",
    "counterexample": "Gram-Schmidt遇到近相关向量仍继续除以极小范数，放大舍入误差。"
  },
  {
    "label": "Gram-Schmidt",
    "definition": "按顺序减去已有正交方向上的投影，把独立列表转成正交规范列表。",
    "step": "对任意u属于U，将v-u拆成(v-P_Uv)+(P_Uv-u)。第一项属于U的正交补，第二项属于U，勾股等式说明距离平方至少为第一项长度平方，且u=P_Uv时取到最小值。",
    "invariant": "保持Gram-Schmidt相关的子空间、维数或表示不变量",
    "counterexample": "在复内积空间忘记一个槽需要共轭，导致所谓范数不再总是实非负。"
  },
  {
    "label": "正交补",
    "definition": "与子空间中每个向量都正交的向量集合，并给出V等于U直和U正交补。",
    "step": "从正交补的定义写出对象与量词",
    "invariant": "保持正交补相关的子空间、维数或表示不变量",
    "counterexample": "Gram-Schmidt遇到近相关向量仍继续除以极小范数，放大舍入误差。"
  },
  {
    "label": "伪逆",
    "definition": "把目标投影到range T后求最小范数原像，统一最小二乘与欠定问题。",
    "step": "从伪逆的定义写出对象与量词",
    "invariant": "最小二乘应同时输出投影、残差和正规方程残差；若列向量近线性相关，不直接求逆正规矩阵，而使用QR或SVD构造伪逆。",
    "counterexample": "在复内积空间忘记一个槽需要共轭，导致所谓范数不再总是实非负。"
  }
];
export function Lad4InnerProductSpacesStructureLab(){return <LinearAlgebraOfficialLab title="第6章 内积空间 · 结构" caption="切换核心定义，观察对象、子空间与映射关系。" mode="inner" snapshots={snapshots}/>}
export function Lad4InnerProductSpacesProofLab(){return <LinearAlgebraOfficialLab title="第6章 内积空间 · 证明" caption="推进证明，定位构造、引理与不变量。" mode="inner" snapshots={snapshots} initial={1}/>}
export function Lad4InnerProductSpacesEvidenceLab(){return <LinearAlgebraOfficialLab title="第6章 内积空间 · 证据" caption="用反例、残差与重构检查结论边界。" mode="inner" snapshots={snapshots} initial={2}/>}
