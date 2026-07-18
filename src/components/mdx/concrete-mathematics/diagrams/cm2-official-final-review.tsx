import { ConcreteMathOfficialLab, type ConcreteSnapshot } from "./official-lab";
const snapshots:ConcreteSnapshot[]=[
  {
    "label": "精确层",
    "object": "递推、有限和和整数恒等式必须在合法索引域内逐项成立。",
    "transform": "改变n并观察精确层的结构",
    "certificate": "用小规模枚举与公式重算精确层",
    "warning": "跳过精确小样例直接相信符号化或渐近输出。"
  },
  {
    "label": "结构层",
    "object": "组合解释、同余类和生成函数揭示公式为何成立。",
    "transform": "改变n并观察结构层的结构",
    "certificate": "用小规模枚举与公式重算结构层",
    "warning": "只验证一个数值点，无法区分恒等式与偶然相等。"
  },
  {
    "label": "证书层",
    "object": "望远镜项、参数递推、初值和反例使机械结果可核查。",
    "transform": "综合验收从精确关系开始：先在小n枚举，再重建符号推导，随后破坏边界条件，最后才比较渐近主项。这样能区分偏一、假设错误和近似误差。",
    "certificate": "用小规模枚举与公式重算证书层",
    "warning": "跳过精确小样例直接相信符号化或渐近输出。"
  },
  {
    "label": "概率层",
    "object": "期望、方差与指示变量把随机算法转为可计算量。",
    "transform": "改变n并观察概率层的结构",
    "certificate": "用小规模枚举与公式重算概率层",
    "warning": "只验证一个数值点，无法区分恒等式与偶然相等。"
  },
  {
    "label": "渐近层",
    "object": "首项、次项、余项和适用规模共同构成性能结论。",
    "transform": "改变n并观察渐近层的结构",
    "certificate": "选择开放寻址哈希表：用数论选择步长，用指示变量分析碰撞，用生成函数编码探测长度，最后给出含误差范围的渐近结论。",
    "warning": "跳过精确小样例直接相信符号化或渐近输出。"
  }
];
export function Cm2OfficialFinalReviewObjectLab(){return <ConcreteMathOfficialLab title="《具体数学》第二版总复习 · 对象" caption="改变规模，先观察离散对象与边界。" mode="roadmap" snapshots={snapshots}/>}
export function Cm2OfficialFinalReviewDerivationLab(){return <ConcreteMathOfficialLab title="《具体数学》第二版总复习 · 推导" caption="推进变换，保留索引、初值与边界项。" mode="roadmap" snapshots={snapshots} initial={1}/>}
export function Cm2OfficialFinalReviewEvidenceLab(){return <ConcreteMathOfficialLab title="《具体数学》第二版总复习 · 证书" caption="用反例、误差和重放完成验收。" mode="roadmap" snapshots={snapshots} initial={2}/>}
