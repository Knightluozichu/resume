import { LinearAlgebraOfficialLab, type LinearSnapshot } from "./official-lab";
const snapshots:LinearSnapshot[]=[
  {
    "label": "张成",
    "definition": "一个向量列表所有线性组合构成的集合，是包含该列表的最小子空间。",
    "step": "从张成的定义写出对象与量词",
    "invariant": "保持张成相关的子空间、维数或表示不变量",
    "counterexample": "把张成空间的生成列表当成基，未检查其中是否存在冗余向量。"
  },
  {
    "label": "线性无关",
    "definition": "只有全零系数才能给出零向量的线性组合，意味着表示没有冗余。",
    "step": "从线性无关的定义写出对象与量词",
    "invariant": "保持线性无关相关的子空间、维数或表示不变量",
    "counterexample": "认为维数依赖所选坐标系，忽略任意两组基长度相同。"
  },
  {
    "label": "基",
    "definition": "既线性无关又张成空间的向量列表，使每个向量拥有唯一坐标。",
    "step": "用线性相关引理逐个把张成列表中的向量替换为独立列表中的向量，同时保持张成不变。每次替换消耗一个原列表位置，因此独立列表长度不能超过任一张成列表长度。",
    "invariant": "保持基相关的子空间、维数或表示不变量",
    "counterexample": "把张成空间的生成列表当成基，未检查其中是否存在冗余向量。"
  },
  {
    "label": "维数",
    "definition": "有限维空间任意基的长度相同，这个长度是空间的不变量。",
    "step": "从维数的定义写出对象与量词",
    "invariant": "保持维数相关的子空间、维数或表示不变量",
    "counterexample": "认为维数依赖所选坐标系，忽略任意两组基长度相同。"
  },
  {
    "label": "基扩充",
    "definition": "线性无关列表可扩充为基，张成列表可删减为基。",
    "step": "从基扩充的定义写出对象与量词",
    "invariant": "数据特征列是否冗余可转化为线性无关问题；选基不是寻找唯一的一组向量，而是在保持张成的同时删除冗余，并用秩或重构残差验收。",
    "counterexample": "把张成空间的生成列表当成基，未检查其中是否存在冗余向量。"
  }
];
export function Lad4FiniteDimensionalVectorSpacesStructureLab(){return <LinearAlgebraOfficialLab title="第2章 有限维向量空间 · 结构" caption="切换核心定义，观察对象、子空间与映射关系。" mode="basis" snapshots={snapshots}/>}
export function Lad4FiniteDimensionalVectorSpacesProofLab(){return <LinearAlgebraOfficialLab title="第2章 有限维向量空间 · 证明" caption="推进证明，定位构造、引理与不变量。" mode="basis" snapshots={snapshots} initial={1}/>}
export function Lad4FiniteDimensionalVectorSpacesEvidenceLab(){return <LinearAlgebraOfficialLab title="第2章 有限维向量空间 · 证据" caption="用反例、残差与重构检查结论边界。" mode="basis" snapshots={snapshots} initial={2}/>}
