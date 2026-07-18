import { LinearAlgebraOfficialLab, type LinearSnapshot } from "./official-lab";
const snapshots:LinearSnapshot[]=[
  {
    "label": "双线性形式",
    "definition": "对两个输入槽分别线性的标量函数；对称形式对应二次型。",
    "step": "从双线性形式的定义写出对象与量词",
    "invariant": "保持双线性形式相关的子空间、维数或表示不变量",
    "counterexample": "把行列式只当递归展开公式，忘记其基无关与体积缩放含义。"
  },
  {
    "label": "交替多线性形式",
    "definition": "任意两个输入相同即为零，交换两个槽会改变符号。",
    "step": "从交替多线性形式的定义写出对象与量词",
    "invariant": "保持交替多线性形式相关的子空间、维数或表示不变量",
    "counterexample": "认为张量积中的每个元素都能写成单个纯张量v张量w。"
  },
  {
    "label": "行列式",
    "definition": "算子对最高阶交替形式的缩放因子，因而是与基无关的不变量。",
    "step": "n维空间上的交替n线性形式空间是一维。把每个输入先经T得到的新交替形式，必然是原非零形式的某个标量倍数；这个与基无关的标量定义为det T，并立即推出乘法性。",
    "invariant": "保持行列式相关的子空间、维数或表示不变量",
    "counterexample": "把行列式只当递归展开公式，忘记其基无关与体积缩放含义。"
  },
  {
    "label": "张量积",
    "definition": "把双线性映射统一转化为从新向量空间出发的线性映射。",
    "step": "从张量积的定义写出对象与量词",
    "invariant": "保持张量积相关的子空间、维数或表示不变量",
    "counterexample": "认为张量积中的每个元素都能写成单个纯张量v张量w。"
  },
  {
    "label": "体积解释",
    "definition": "行列式绝对值给有向平行多面体体积缩放，奇异值乘积给体积因子。",
    "step": "从体积解释的定义写出对象与量词",
    "invariant": "第四版把行列式放在多线性结构之后：先说明它缩放交替体积，再计算矩阵公式。张量接口则用维数、基张量和双线性泛性质验收。",
    "counterexample": "把行列式只当递归展开公式，忘记其基无关与体积缩放含义。"
  }
];
export function Lad4MultilinearAlgebraDeterminantsStructureLab(){return <LinearAlgebraOfficialLab title="第9章 多线性代数与行列式 · 结构" caption="切换核心定义，观察对象、子空间与映射关系。" mode="multilinear" snapshots={snapshots}/>}
export function Lad4MultilinearAlgebraDeterminantsProofLab(){return <LinearAlgebraOfficialLab title="第9章 多线性代数与行列式 · 证明" caption="推进证明，定位构造、引理与不变量。" mode="multilinear" snapshots={snapshots} initial={1}/>}
export function Lad4MultilinearAlgebraDeterminantsEvidenceLab(){return <LinearAlgebraOfficialLab title="第9章 多线性代数与行列式 · 证据" caption="用反例、残差与重构检查结论边界。" mode="multilinear" snapshots={snapshots} initial={2}/>}
