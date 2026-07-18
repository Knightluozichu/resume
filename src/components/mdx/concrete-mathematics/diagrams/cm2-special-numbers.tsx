import { ConcreteMathOfficialLab, type ConcreteSnapshot } from "./official-lab";
const snapshots:ConcreteSnapshot[]=[
  {
    "label": "Stirling数",
    "object": "第一类连接排列循环与升降阶乘，第二类计数集合划分。",
    "transform": "改变n并观察Stirling数的结构",
    "certificate": "用小规模枚举与公式重算Stirling数",
    "warning": "把两类Stirling数的对象和符号混用。"
  },
  {
    "label": "Eulerian数",
    "object": "按上升或下降次数细分排列，并形成多项式恒等式。",
    "transform": "改变n并观察Eulerian数的结构",
    "certificate": "用小规模枚举与公式重算Eulerian数",
    "warning": "使用Bernoulli数时未声明B1符号约定，导致公式整体差一项。"
  },
  {
    "label": "调和数",
    "object": "前n个倒数之和，常出现在平均复杂度和随机过程。",
    "transform": "划分n元素到k个非空块：新元素要么加入k个已有块之一，要么单独成块并把其余元素划为k减1块。两种互斥情况相加得到Stirling第二类递推。",
    "certificate": "用小规模枚举与公式重算调和数",
    "warning": "把两类Stirling数的对象和符号混用。"
  },
  {
    "label": "Bernoulli数",
    "object": "通过生成函数定义并编码幂和与Euler求和公式。",
    "transform": "改变n并观察Bernoulli数的结构",
    "certificate": "用小规模枚举与公式重算Bernoulli数",
    "warning": "使用Bernoulli数时未声明B1符号约定，导致公式整体差一项。"
  },
  {
    "label": "Fibonacci与continuant",
    "object": "二阶递推、矩阵幂和连分数行列式共享同一结构。",
    "transform": "改变n并观察Fibonacci与continuant的结构",
    "certificate": "不要把特殊数当表格记忆；为每个序列保留组合对象、递推、生成函数和前几项，用两种定义交叉验收。",
    "warning": "把两类Stirling数的对象和符号混用。"
  }
];
export function Cm2SpecialNumbersObjectLab(){return <ConcreteMathOfficialLab title="第6章 特殊数 · 对象" caption="改变规模，先观察离散对象与边界。" mode="sequences" snapshots={snapshots}/>}
export function Cm2SpecialNumbersDerivationLab(){return <ConcreteMathOfficialLab title="第6章 特殊数 · 推导" caption="推进变换，保留索引、初值与边界项。" mode="sequences" snapshots={snapshots} initial={1}/>}
export function Cm2SpecialNumbersEvidenceLab(){return <ConcreteMathOfficialLab title="第6章 特殊数 · 证书" caption="用反例、误差和重放完成验收。" mode="sequences" snapshots={snapshots} initial={2}/>}
