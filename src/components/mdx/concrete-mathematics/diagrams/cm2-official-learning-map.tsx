import { ConcreteMathOfficialLab, type ConcreteSnapshot } from "./official-lab";
const snapshots:ConcreteSnapshot[]=[
  {
    "label": "递归到闭式",
    "object": "从小规模关系出发，经求和、生成函数或特征方法得到可计算表达。",
    "transform": "改变n并观察递归到闭式的结构",
    "certificate": "用小规模枚举与公式重算递归到闭式",
    "warning": "只背公式，未记录索引域、初值和变量趋向。"
  },
  {
    "label": "离散连续类比",
    "object": "差分对应导数，求和对应积分，二项式基对应幂函数基。",
    "transform": "改变n并观察离散连续类比的结构",
    "certificate": "用小规模枚举与公式重算离散连续类比",
    "warning": "沿旧站内主题学习而漏掉特殊数与渐近分析两个正式章节。"
  },
  {
    "label": "组合恒等式",
    "object": "通过双重计数、生成函数和机械证书连接符号与对象。",
    "transform": "递推描述局部变化，求和积累变化，整数与数论控制离散边界，组合数与生成函数提供代数变换，概率和渐近法最终回答规模增长与平均行为。",
    "certificate": "用小规模枚举与公式重算组合恒等式",
    "warning": "只背公式，未记录索引域、初值和变量趋向。"
  },
  {
    "label": "概率与算法",
    "object": "指示变量、PGF和哈希案例把离散结构转为平均行为。",
    "transform": "改变n并观察概率与算法的结构",
    "certificate": "用小规模枚举与公式重算概率与算法",
    "warning": "沿旧站内主题学习而漏掉特殊数与渐近分析两个正式章节。"
  },
  {
    "label": "渐近验收",
    "object": "主导项必须携带误差项、适用范围和精确小样例。",
    "transform": "改变n并观察渐近验收的结构",
    "certificate": "用同一个哈希与递归分析笔记贯穿全书：精确计数、取整边界、组合恒等式、PGF和渐近误差都保留可复算样例。",
    "warning": "只背公式，未记录索引域、初值和变量趋向。"
  }
];
export function Cm2OfficialLearningMapObjectLab(){return <ConcreteMathOfficialLab title="《具体数学》第二版全书导览 · 对象" caption="改变规模，先观察离散对象与边界。" mode="roadmap" snapshots={snapshots}/>}
export function Cm2OfficialLearningMapDerivationLab(){return <ConcreteMathOfficialLab title="《具体数学》第二版全书导览 · 推导" caption="推进变换，保留索引、初值与边界项。" mode="roadmap" snapshots={snapshots} initial={1}/>}
export function Cm2OfficialLearningMapEvidenceLab(){return <ConcreteMathOfficialLab title="《具体数学》第二版全书导览 · 证书" caption="用反例、误差和重放完成验收。" mode="roadmap" snapshots={snapshots} initial={2}/>}
