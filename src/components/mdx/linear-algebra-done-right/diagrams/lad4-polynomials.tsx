import { LinearAlgebraOfficialLab, type LinearSnapshot } from "./official-lab";
const snapshots:LinearSnapshot[]=[
  {
    "label": "多项式零点",
    "definition": "若p(lambda)为零，则lambda是p的零点且z减lambda整除p。",
    "step": "从多项式零点的定义写出对象与量词",
    "invariant": "保持多项式零点相关的子空间、维数或表示不变量",
    "counterexample": "把实系数多项式也默认能全部分解成实一次因子。"
  },
  {
    "label": "除法算法",
    "definition": "对非零多项式s，唯一存在q和r使p=sq+r且r次数低于s。",
    "step": "从除法算法的定义写出对象与量词",
    "invariant": "保持除法算法相关的子空间、维数或表示不变量",
    "counterexample": "在p(T)中把算子乘法当成逐元素乘法，而不是复合。"
  },
  {
    "label": "复数因式分解",
    "definition": "非常数复系数多项式可分解为一次因子的乘积。",
    "step": "每找到一个零点lambda，因式定理把多项式次数降低一。复数基本代数定理保证重复过程直到一次因子；实系数下非实零点成共轭对，两对应一次因子相乘得到不可约实二次因子。",
    "invariant": "保持复数因式分解相关的子空间、维数或表示不变量",
    "counterexample": "把实系数多项式也默认能全部分解成实一次因子。"
  },
  {
    "label": "实数因式分解",
    "definition": "实系数多项式分解为一次因子和不可约二次因子。",
    "step": "从实数因式分解的定义写出对象与量词",
    "invariant": "保持实数因式分解相关的子空间、维数或表示不变量",
    "counterexample": "在p(T)中把算子乘法当成逐元素乘法，而不是复合。"
  },
  {
    "label": "算子多项式",
    "definition": "把变量替换为线性算子并以复合作为乘法，为最小多项式提供语言。",
    "step": "从算子多项式的定义写出对象与量词",
    "invariant": "后续求最小多项式前先区分标量多项式p(z)与算子多项式p(T)。同一系数序列在算子环境中按复合求幂，验收点是p(T)作用于一组基是否全为零。",
    "counterexample": "把实系数多项式也默认能全部分解成实一次因子。"
  }
];
export function Lad4PolynomialsStructureLab(){return <LinearAlgebraOfficialLab title="第4章 多项式 · 结构" caption="切换核心定义，观察对象、子空间与映射关系。" mode="polynomial" snapshots={snapshots}/>}
export function Lad4PolynomialsProofLab(){return <LinearAlgebraOfficialLab title="第4章 多项式 · 证明" caption="推进证明，定位构造、引理与不变量。" mode="polynomial" snapshots={snapshots} initial={1}/>}
export function Lad4PolynomialsEvidenceLab(){return <LinearAlgebraOfficialLab title="第4章 多项式 · 证据" caption="用反例、残差与重构检查结论边界。" mode="polynomial" snapshots={snapshots} initial={2}/>}
