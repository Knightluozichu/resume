import { ConcreteMathOfficialLab, type ConcreteSnapshot } from "./official-lab";
const snapshots:ConcreteSnapshot[]=[
  {
    "label": "概率空间",
    "object": "样本空间、事件和概率测度共同定义随机试验。",
    "transform": "改变n并观察概率空间的结构",
    "certificate": "用小规模枚举与公式重算概率空间",
    "warning": "误以为期望线性要求随机变量相互独立。"
  },
  {
    "label": "期望线性",
    "object": "无论随机变量是否独立，有限和的期望等于期望之和。",
    "transform": "改变n并观察期望线性的结构",
    "certificate": "用小规模枚举与公式重算期望线性",
    "warning": "把均值相同当作分布相同，忽略方差和尾部风险。"
  },
  {
    "label": "方差",
    "object": "测量相对均值的平方偏差；协方差决定和的方差能否相加。",
    "transform": "有限求和与加权概率和可以交换顺序，因此期望线性不需要独立。对PGF逐项求导并令z为一，系数n p_n之和正是期望。",
    "certificate": "用小规模枚举与公式重算方差",
    "warning": "误以为期望线性要求随机变量相互独立。"
  },
  {
    "label": "概率生成函数",
    "object": "离散非负整数变量的PGF编码概率，导数在一处给阶乘矩。",
    "transform": "改变n并观察概率生成函数的结构",
    "certificate": "用小规模枚举与公式重算概率生成函数",
    "warning": "把均值相同当作分布相同，忽略方差和尾部风险。"
  },
  {
    "label": "指示变量",
    "object": "把事件表示为零一变量，使计数的期望转化为事件概率之和。",
    "transform": "改变n并观察指示变量的结构",
    "certificate": "哈希碰撞数写成每对键是否碰撞的指示变量之和，即使这些事件不独立也能直接求期望；方差分析再单独检查协方差。",
    "warning": "误以为期望线性要求随机变量相互独立。"
  }
];
export function Cm2DiscreteProbabilityObjectLab(){return <ConcreteMathOfficialLab title="第8章 离散概率 · 对象" caption="改变规模，先观察离散对象与边界。" mode="probability" snapshots={snapshots}/>}
export function Cm2DiscreteProbabilityDerivationLab(){return <ConcreteMathOfficialLab title="第8章 离散概率 · 推导" caption="推进变换，保留索引、初值与边界项。" mode="probability" snapshots={snapshots} initial={1}/>}
export function Cm2DiscreteProbabilityEvidenceLab(){return <ConcreteMathOfficialLab title="第8章 离散概率 · 证书" caption="用反例、误差和重放完成验收。" mode="probability" snapshots={snapshots} initial={2}/>}
