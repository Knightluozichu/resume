import { LinearAlgebraOfficialLab, type LinearSnapshot } from "./official-lab";
const snapshots:LinearSnapshot[]=[
  {
    "label": "算子中心路线",
    "definition": "先研究空间与线性映射结构，最后才把行列式作为多线性不变量引入。",
    "step": "从算子中心路线的定义写出对象与量词",
    "invariant": "保持算子中心路线相关的子空间、维数或表示不变量",
    "counterexample": "沿第三版目录学习，漏掉第四版新增的多线性代数与扩展SVD。"
  },
  {
    "label": "有限维结构",
    "definition": "基和维数把抽象空间变成有限信息，同时保留换基不变量。",
    "step": "从有限维结构的定义写出对象与量词",
    "invariant": "保持有限维结构相关的子空间、维数或表示不变量",
    "counterexample": "把矩阵运算当主线，未区分线性映射与它在某组基下的坐标表示。"
  },
  {
    "label": "最小多项式",
    "definition": "以消去算子的最低次多项式统一特征值、三角化和对角化。",
    "step": "每一阶段都减少坐标偶然性：基给坐标但不改变空间，矩阵表示映射但不等于映射，特征值与最小多项式提取换基不变量，内积恢复几何，多线性形式最终给出行列式。",
    "invariant": "保持最小多项式相关的子空间、维数或表示不变量",
    "counterexample": "沿第三版目录学习，漏掉第四版新增的多线性代数与扩展SVD。"
  },
  {
    "label": "谱与奇异值",
    "definition": "谱定理描述正规结构，SVD则适用于任意线性映射。",
    "step": "从谱与奇异值的定义写出对象与量词",
    "invariant": "保持谱与奇异值相关的子空间、维数或表示不变量",
    "counterexample": "把矩阵运算当主线，未区分线性映射与它在某组基下的坐标表示。"
  },
  {
    "label": "第四版新增内容",
    "definition": "扩展SVD及后果，并新增多线性代数、二次型、行列式和张量积整章。",
    "step": "从第四版新增内容的定义写出对象与量词",
    "invariant": "维护同一个三维算子T：先证明定义域结构和核像，再写不同基下矩阵，求最小多项式与谱，做SVD，最后用行列式和张量积解释体积及双线性关系。",
    "counterexample": "沿第三版目录学习，漏掉第四版新增的多线性代数与扩展SVD。"
  }
];
export function Lad4OfficialLearningMapStructureLab(){return <LinearAlgebraOfficialLab title="《线性代数应该这样学》第四版导览 · 结构" caption="切换核心定义，观察对象、子空间与映射关系。" mode="roadmap" snapshots={snapshots}/>}
export function Lad4OfficialLearningMapProofLab(){return <LinearAlgebraOfficialLab title="《线性代数应该这样学》第四版导览 · 证明" caption="推进证明，定位构造、引理与不变量。" mode="roadmap" snapshots={snapshots} initial={1}/>}
export function Lad4OfficialLearningMapEvidenceLab(){return <LinearAlgebraOfficialLab title="《线性代数应该这样学》第四版导览 · 证据" caption="用反例、残差与重构检查结论边界。" mode="roadmap" snapshots={snapshots} initial={2}/>}
