import { ConcreteMathOfficialLab, type ConcreteSnapshot } from "./official-lab";
const snapshots:ConcreteSnapshot[]=[
  {
    "label": "递推式",
    "object": "用较小规模问题的值定义当前规模的值，并附带足够初值。",
    "transform": "改变n并观察递推式的结构",
    "certificate": "用小规模枚举与公式重算递推式",
    "warning": "只写递推关系却没有初值，导致无限多组序列都满足公式。"
  },
  {
    "label": "汉诺塔",
    "object": "移动n个圆盘的最少步数满足H_n=2H_{n-1}+1。",
    "transform": "改变n并观察汉诺塔的结构",
    "certificate": "用小规模枚举与公式重算汉诺塔",
    "warning": "在Josephus编号从零开始和从一开始之间切换时漏掉加一或取模偏移。"
  },
  {
    "label": "平面分割",
    "object": "一般位置直线带来的新增区域数转化为一阶差分求和。",
    "transform": "把最大片移到目标柱之前，必须把其上n减1片移开；之后再把它们移到目标柱，因此最优步数是两个子问题加一步。减去常数负一或展开几何级数即可得到闭式。",
    "certificate": "用小规模枚举与公式重算平面分割",
    "warning": "只写递推关系却没有初值，导致无限多组序列都满足公式。"
  },
  {
    "label": "Josephus问题",
    "object": "循环删除过程通过编号变换得到规模递减关系。",
    "transform": "改变n并观察Josephus问题的结构",
    "certificate": "用小规模枚举与公式重算Josephus问题",
    "warning": "在Josephus编号从零开始和从一开始之间切换时漏掉加一或取模偏移。"
  },
  {
    "label": "递归验收",
    "object": "同时核对初值、索引范围、展开式和小规模枚举。",
    "transform": "改变n并观察递归验收的结构",
    "certificate": "递归算法分析先从状态转移写递推，再用小规模枚举验证初值和偏移；闭式、递推计算与程序调用次数三路一致后才接受。",
    "warning": "只写递推关系却没有初值，导致无限多组序列都满足公式。"
  }
];
export function Cm2RecurrentProblemsObjectLab(){return <ConcreteMathOfficialLab title="第1章 递归问题 · 对象" caption="改变规模，先观察离散对象与边界。" mode="recurrence" snapshots={snapshots}/>}
export function Cm2RecurrentProblemsDerivationLab(){return <ConcreteMathOfficialLab title="第1章 递归问题 · 推导" caption="推进变换，保留索引、初值与边界项。" mode="recurrence" snapshots={snapshots} initial={1}/>}
export function Cm2RecurrentProblemsEvidenceLab(){return <ConcreteMathOfficialLab title="第1章 递归问题 · 证书" caption="用反例、误差和重放完成验收。" mode="recurrence" snapshots={snapshots} initial={2}/>}
