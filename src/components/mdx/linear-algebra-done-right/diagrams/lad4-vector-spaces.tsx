import { LinearAlgebraOfficialLab, type LinearSnapshot } from "./official-lab";
const snapshots:LinearSnapshot[]=[
  {
    "label": "向量空间",
    "definition": "集合连同向量加法和标量乘法满足八条公理，标量域取实数或复数。",
    "step": "从向量空间的定义写出对象与量词",
    "invariant": "保持向量空间相关的子空间、维数或表示不变量",
    "counterexample": "只验证集合含零向量就称为子空间，漏掉加法与标量乘封闭。"
  },
  {
    "label": "子空间",
    "definition": "向量空间的子集若含零向量且对加法和标量乘封闭，则自身也是向量空间。",
    "step": "从子空间的定义写出对象与量词",
    "invariant": "保持子空间相关的子空间、维数或表示不变量",
    "counterexample": "把子空间和与集合并集混淆；两个子空间的并集通常不对加法封闭。"
  },
  {
    "label": "子空间和",
    "definition": "多个子空间中各取一个向量相加所得的最小包含它们的子空间。",
    "step": "若一个向量有两种分解，两式相减得到来自各子空间的零和；直和条件迫使每个差都为零，所以分解唯一。反过来，零向量若有非平凡分解，就同时拥有该分解和全零分解，违反唯一性。",
    "invariant": "保持子空间和相关的子空间、维数或表示不变量",
    "counterexample": "只验证集合含零向量就称为子空间，漏掉加法与标量乘封闭。"
  },
  {
    "label": "直和",
    "definition": "子空间和中的表示唯一；两个子空间时等价于交集只有零向量。",
    "step": "从直和的定义写出对象与量词",
    "invariant": "保持直和相关的子空间、维数或表示不变量",
    "counterexample": "把子空间和与集合并集混淆；两个子空间的并集通常不对加法封闭。"
  },
  {
    "label": "标量域",
    "definition": "实数域与复数域决定特征值、内积和算子结构的差异。",
    "step": "从标量域的定义写出对象与量词",
    "invariant": "把多项式、函数和矩阵都当向量后，只需验证封闭性就能复用同一套线性结构；证明时必须说明标量域，因为某些实空间的算子在复数域上才有特征值。",
    "counterexample": "只验证集合含零向量就称为子空间，漏掉加法与标量乘封闭。"
  }
];
export function Lad4VectorSpacesStructureLab(){return <LinearAlgebraOfficialLab title="第1章 向量空间 · 结构" caption="切换核心定义，观察对象、子空间与映射关系。" mode="spaces" snapshots={snapshots}/>}
export function Lad4VectorSpacesProofLab(){return <LinearAlgebraOfficialLab title="第1章 向量空间 · 证明" caption="推进证明，定位构造、引理与不变量。" mode="spaces" snapshots={snapshots} initial={1}/>}
export function Lad4VectorSpacesEvidenceLab(){return <LinearAlgebraOfficialLab title="第1章 向量空间 · 证据" caption="用反例、残差与重构检查结论边界。" mode="spaces" snapshots={snapshots} initial={2}/>}
