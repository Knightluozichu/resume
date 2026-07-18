import { LinearAlgebraOfficialLab, type LinearSnapshot } from "./official-lab";
const snapshots:LinearSnapshot[]=[
  {
    "label": "定义-定理链",
    "definition": "每个结论都能回到已声明的空间、标量域、有限维和内积假设。",
    "step": "从定义-定理链的定义写出对象与量词",
    "invariant": "保持定义-定理链相关的子空间、维数或表示不变量",
    "counterexample": "只会套数值库，却不能说清定理假设和结果为何成立。"
  },
  {
    "label": "反例",
    "definition": "删除一个假设后给出最小反例，说明定理边界而非只背结论。",
    "step": "从反例的定义写出对象与量词",
    "invariant": "保持反例相关的子空间、维数或表示不变量",
    "counterexample": "只写抽象证明，不用具体矩阵、反例和残差检查符号与边界。"
  },
  {
    "label": "表示不变量",
    "definition": "换基会改变矩阵，却不改变维数、最小多项式、特征值、迹和行列式。",
    "step": "总复习沿映射而非术语表组织：核像给结构，最小多项式和谱给不变方向，内积和SVD给几何与逼近，广义特征空间处理不可对角化部分，多线性形式给出行列式和张量积。",
    "invariant": "保持表示不变量相关的子空间、维数或表示不变量",
    "counterexample": "只会套数值库，却不能说清定理假设和结果为何成立。"
  },
  {
    "label": "数值证据",
    "definition": "秩、正交性、重构、残差与奇异值阈值共同验收计算。",
    "step": "从数值证据的定义写出对象与量词",
    "invariant": "保持数值证据相关的子空间、维数或表示不变量",
    "counterexample": "只写抽象证明，不用具体矩阵、反例和残差检查符号与边界。"
  },
  {
    "label": "综合迁移",
    "definition": "同一线性映射可在基、矩阵、谱、几何和多线性视角间往返。",
    "step": "从综合迁移的定义写出对象与量词",
    "invariant": "选择一个既非正规又不可对角化的复算子和一个矩形线性映射：分别完成Jordan链、迹与最小多项式，以及SVD、伪逆和低秩近似，最后比较结构结论与浮点证据。",
    "counterexample": "只会套数值库，却不能说清定理假设和结果为何成立。"
  }
];
export function Lad4OfficialFinalReviewStructureLab(){return <LinearAlgebraOfficialLab title="《线性代数应该这样学》第四版总复习 · 结构" caption="切换核心定义，观察对象、子空间与映射关系。" mode="roadmap" snapshots={snapshots}/>}
export function Lad4OfficialFinalReviewProofLab(){return <LinearAlgebraOfficialLab title="《线性代数应该这样学》第四版总复习 · 证明" caption="推进证明，定位构造、引理与不变量。" mode="roadmap" snapshots={snapshots} initial={1}/>}
export function Lad4OfficialFinalReviewEvidenceLab(){return <LinearAlgebraOfficialLab title="《线性代数应该这样学》第四版总复习 · 证据" caption="用反例、残差与重构检查结论边界。" mode="roadmap" snapshots={snapshots} initial={2}/>}
