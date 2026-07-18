import { LinearAlgebraOfficialLab, type LinearSnapshot } from "./official-lab";
const snapshots:LinearSnapshot[]=[
  {
    "label": "线性映射",
    "definition": "保持向量加法和标量乘法的映射，由一组基上的取值唯一确定。",
    "step": "从线性映射的定义写出对象与量词",
    "invariant": "保持线性映射相关的子空间、维数或表示不变量",
    "counterexample": "把零空间与值为零的单个向量混淆，或把像误认为整个陪域。"
  },
  {
    "label": "核与像",
    "definition": "核记录被映到零的方向，像记录可以到达的输出。",
    "step": "从核与像的定义写出对象与量词",
    "invariant": "保持核与像相关的子空间、维数或表示不变量",
    "counterexample": "看到方阵就默认可逆，没有分别证明单射、满射或零核。"
  },
  {
    "label": "秩-零度定理",
    "definition": "有限维定义域的维数等于核维数与像维数之和。",
    "step": "先取核的一组基并扩充为定义域V的基。核基向量都映到零；扩充部分的像既线性无关又张成range T，因此扩充向量数等于像维数，与核基长度相加就是dim V。",
    "invariant": "保持秩-零度定理相关的子空间、维数或表示不变量",
    "counterexample": "把零空间与值为零的单个向量混淆，或把像误认为整个陪域。"
  },
  {
    "label": "商空间",
    "definition": "把相差某子空间向量的元素视为同一个陪集，从而消去指定方向。",
    "step": "从商空间的定义写出对象与量词",
    "invariant": "保持商空间相关的子空间、维数或表示不变量",
    "counterexample": "看到方阵就默认可逆，没有分别证明单射、满射或零核。"
  },
  {
    "label": "对偶映射",
    "definition": "把输出空间上的线性泛函拉回定义域，揭示核、像和转置矩阵关系。",
    "step": "从对偶映射的定义写出对象与量词",
    "invariant": "接口只暴露矩阵会隐藏定义域、陪域和基。应同时记录T的输入空间、输出空间、核基、像基与换基矩阵，用秩-零度和往返映射作为验收不变量。",
    "counterexample": "把零空间与值为零的单个向量混淆，或把像误认为整个陪域。"
  }
];
export function Lad4LinearMapsStructureLab(){return <LinearAlgebraOfficialLab title="第3章 线性映射 · 结构" caption="切换核心定义，观察对象、子空间与映射关系。" mode="maps" snapshots={snapshots}/>}
export function Lad4LinearMapsProofLab(){return <LinearAlgebraOfficialLab title="第3章 线性映射 · 证明" caption="推进证明，定位构造、引理与不变量。" mode="maps" snapshots={snapshots} initial={1}/>}
export function Lad4LinearMapsEvidenceLab(){return <LinearAlgebraOfficialLab title="第3章 线性映射 · 证据" caption="用反例、残差与重构检查结论边界。" mode="maps" snapshots={snapshots} initial={2}/>}
