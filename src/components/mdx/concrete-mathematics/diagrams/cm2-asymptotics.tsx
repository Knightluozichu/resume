import { ConcreteMathOfficialLab, type ConcreteSnapshot } from "./official-lab";
const snapshots:ConcreteSnapshot[]=[
  {
    "label": "增长层级",
    "object": "对数、幂、指数和阶乘形成严格增长关系，为主导项比较提供坐标。",
    "transform": "改变n并观察增长层级的结构",
    "certificate": "用小规模枚举与公式重算增长层级",
    "warning": "从f属于O(g)反推g属于O(f)，忽略大O只给单向上界。"
  },
  {
    "label": "大O记号",
    "object": "给出最终被常数倍上界控制的函数集合，必须声明变量趋向和参数一致性。",
    "transform": "改变n并观察大O记号的结构",
    "certificate": "用小规模枚举与公式重算大O记号",
    "warning": "把渐近公式用于很小n却不检查误差项，得到比精确计算更差的结论。"
  },
  {
    "label": "渐近等价",
    "object": "f除以g趋于一，比同阶大O保留更精确的首项信息。",
    "transform": "把每个单位区间上的函数积分与端点值比较，逐段累加后内部边界消去；重复应用分部积分得到由奇数阶导数与Bernoulli数构成的修正项。",
    "certificate": "用小规模枚举与公式重算渐近等价",
    "warning": "从f属于O(g)反推g属于O(f)，忽略大O只给单向上界。"
  },
  {
    "label": "Euler求和公式",
    "object": "以积分、端点和Bernoulli修正项连接离散和与连续积分。",
    "transform": "改变n并观察Euler求和公式的结构",
    "certificate": "用小规模枚举与公式重算Euler求和公式",
    "warning": "把渐近公式用于很小n却不检查误差项，得到比精确计算更差的结论。"
  },
  {
    "label": "误差项",
    "object": "渐近展开必须同时交付余项阶和适用范围，不能只写首项。",
    "transform": "改变n并观察误差项的结构",
    "certificate": "算法复杂度报告同时给精确小规模值、主导项、常数或次阶项与误差界；用比值或归一化残差检查数据是否进入渐近区间。",
    "warning": "从f属于O(g)反推g属于O(f)，忽略大O只给单向上界。"
  }
];
export function Cm2AsymptoticsObjectLab(){return <ConcreteMathOfficialLab title="第9章 渐近分析 · 对象" caption="改变规模，先观察离散对象与边界。" mode="asymptotics" snapshots={snapshots}/>}
export function Cm2AsymptoticsDerivationLab(){return <ConcreteMathOfficialLab title="第9章 渐近分析 · 推导" caption="推进变换，保留索引、初值与边界项。" mode="asymptotics" snapshots={snapshots} initial={1}/>}
export function Cm2AsymptoticsEvidenceLab(){return <ConcreteMathOfficialLab title="第9章 渐近分析 · 证书" caption="用反例、误差和重放完成验收。" mode="asymptotics" snapshots={snapshots} initial={2}/>}
