import { LinearAlgebraOfficialLab, type LinearSnapshot } from "./official-lab";
const snapshots:LinearSnapshot[]=[
  {
    "label": "不变子空间",
    "definition": "子空间U满足T(U)包含于U，可在更小空间中研究算子结构。",
    "step": "从不变子空间的定义写出对象与量词",
    "invariant": "保持不变子空间相关的子空间、维数或表示不变量",
    "counterexample": "把零向量也称为特征向量，导致任意lambda都满足等式。"
  },
  {
    "label": "特征向量",
    "definition": "非零向量v满足Tv=lambda v，所在一维子空间在T下不变。",
    "step": "从特征向量的定义写出对象与量词",
    "invariant": "保持特征向量相关的子空间、维数或表示不变量",
    "counterexample": "只因矩阵有重复特征值就断言不可对角化，忽略特征空间维数。"
  },
  {
    "label": "最小多项式",
    "definition": "首一且次数最低、满足p(T)=0的多项式，其零点正是算子特征值。",
    "step": "若有特征向量基，T在该基下对角，所有不同特征值对应的一次因子乘积即可消去T。反向利用最小多项式互素因子，把空间分解为各特征空间的直和，因此可选特征向量基。",
    "invariant": "保持最小多项式相关的子空间、维数或表示不变量",
    "counterexample": "把零向量也称为特征向量，导致任意lambda都满足等式。"
  },
  {
    "label": "上三角化",
    "definition": "存在一组基使算子矩阵上三角；复向量空间上的每个算子都可上三角化。",
    "step": "从上三角化的定义写出对象与量词",
    "invariant": "保持上三角化相关的子空间、维数或表示不变量",
    "counterexample": "只因矩阵有重复特征值就断言不可对角化，忽略特征空间维数。"
  },
  {
    "label": "可对角化",
    "definition": "空间有一组特征向量基；等价于最小多项式分裂且没有重复根。",
    "step": "从可对角化的定义写出对象与量词",
    "invariant": "判断可对角化不要只数不同特征值；应比较每个特征空间维数、最小多项式根的重数与重构残差。Gershgorin圆盘可先给出特征值位置的便宜边界。",
    "counterexample": "把零向量也称为特征向量，导致任意lambda都满足等式。"
  }
];
export function Lad4EigenvaluesEigenvectorsStructureLab(){return <LinearAlgebraOfficialLab title="第5章 特征值与特征向量 · 结构" caption="切换核心定义，观察对象、子空间与映射关系。" mode="eigen" snapshots={snapshots}/>}
export function Lad4EigenvaluesEigenvectorsProofLab(){return <LinearAlgebraOfficialLab title="第5章 特征值与特征向量 · 证明" caption="推进证明，定位构造、引理与不变量。" mode="eigen" snapshots={snapshots} initial={1}/>}
export function Lad4EigenvaluesEigenvectorsEvidenceLab(){return <LinearAlgebraOfficialLab title="第5章 特征值与特征向量 · 证据" caption="用反例、残差与重构检查结论边界。" mode="eigen" snapshots={snapshots} initial={2}/>}
