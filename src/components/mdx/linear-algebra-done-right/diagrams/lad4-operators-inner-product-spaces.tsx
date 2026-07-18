import { LinearAlgebraOfficialLab, type LinearSnapshot } from "./official-lab";
const snapshots:LinearSnapshot[]=[
  {
    "label": "伴随算子",
    "definition": "T星满足内积Tv,w等于内积v,T星w，把映射从一个槽移到另一个槽。",
    "step": "从伴随算子的定义写出对象与量词",
    "invariant": "保持伴随算子相关的子空间、维数或表示不变量",
    "counterexample": "把任何可对角化算子都当正规算子，错误使用正交特征向量基。"
  },
  {
    "label": "谱定理",
    "definition": "复正规算子或实自伴算子存在正交规范特征向量基。",
    "step": "从谱定理的定义写出对象与量词",
    "invariant": "保持谱定理相关的子空间、维数或表示不变量",
    "counterexample": "对有负特征值或非对称输入直接做Cholesky分解。"
  },
  {
    "label": "正算子",
    "definition": "对所有v都有内积Tv,v非负，并且拥有唯一正平方根。",
    "step": "对正算子T星T应用谱定理，取其正交规范特征向量和非负特征值平方根作为奇异值。非零奇异值对应的Tv归一化后彼此正交，从而构造输出基并得到SVD。",
    "invariant": "保持正算子相关的子空间、维数或表示不变量",
    "counterexample": "把任何可对角化算子都当正规算子，错误使用正交特征向量基。"
  },
  {
    "label": "奇异值分解",
    "definition": "任意线性映射可由两个正交规范基和非负奇异值表示。",
    "step": "从奇异值分解的定义写出对象与量词",
    "invariant": "保持奇异值分解相关的子空间、维数或表示不变量",
    "counterexample": "对有负特征值或非对称输入直接做Cholesky分解。"
  },
  {
    "label": "低秩近似",
    "definition": "截断SVD在算子范数或Frobenius范数下给出最佳指定秩近似。",
    "step": "从低秩近似的定义写出对象与量词",
    "invariant": "压缩或降维时不能只给保留秩；应报告奇异值谱、截断误差、保留能量与下游任务变化。QR用于稳定正交化，Cholesky只适用于正定结构。",
    "counterexample": "把任何可对角化算子都当正规算子，错误使用正交特征向量基。"
  }
];
export function Lad4OperatorsInnerProductSpacesStructureLab(){return <LinearAlgebraOfficialLab title="第7章 内积空间上的算子 · 结构" caption="切换核心定义，观察对象、子空间与映射关系。" mode="svd" snapshots={snapshots}/>}
export function Lad4OperatorsInnerProductSpacesProofLab(){return <LinearAlgebraOfficialLab title="第7章 内积空间上的算子 · 证明" caption="推进证明，定位构造、引理与不变量。" mode="svd" snapshots={snapshots} initial={1}/>}
export function Lad4OperatorsInnerProductSpacesEvidenceLab(){return <LinearAlgebraOfficialLab title="第7章 内积空间上的算子 · 证据" caption="用反例、残差与重构检查结论边界。" mode="svd" snapshots={snapshots} initial={2}/>}
