import { ConcreteMathOfficialLab, type ConcreteSnapshot } from "./official-lab";
const snapshots:ConcreteSnapshot[]=[
  {
    "label": "整除",
    "object": "a整除b表示存在整数k使b=ak，是数论推导的基本关系。",
    "transform": "改变n并观察整除的结构",
    "certificate": "用小规模枚举与公式重算整除",
    "warning": "在使用模逆或CRT前没有检查互素条件。"
  },
  {
    "label": "最大公约数",
    "object": "Euclid算法用余数递减且保持公约数集合，最终得到gcd。",
    "transform": "改变n并观察最大公约数的结构",
    "certificate": "用小规模枚举与公式重算最大公约数",
    "warning": "把同余等式当普通整数等式，随意约去与模数不互素的因子。"
  },
  {
    "label": "同余",
    "object": "a与b模m同余等价于m整除a减b，可在等价类上运算。",
    "transform": "把a写成qb+r，任意同时整除a和b的数也整除r；反向同理，因此公约数集合保持不变。余数严格变小保证算法终止。",
    "certificate": "用小规模枚举与公式重算同余",
    "warning": "在使用模逆或CRT前没有检查互素条件。"
  },
  {
    "label": "中国剩余定理",
    "object": "两两互素模数下，一组余数在模乘积意义下唯一确定整数。",
    "transform": "改变n并观察中国剩余定理的结构",
    "certificate": "用小规模枚举与公式重算中国剩余定理",
    "warning": "把同余等式当普通整数等式，随意约去与模数不互素的因子。"
  },
  {
    "label": "Euler与Mobius函数",
    "object": "phi计数互素剩余类，mu通过平方因子与素因子数编码反演。",
    "transform": "改变n并观察Euler与Mobius函数的结构",
    "certificate": "哈希步长、周期调度和分片合并都依赖互素性。先用gcd验收模数条件，再用每个余数方程重放CRT结果，不能只检查一个最终整数。",
    "warning": "在使用模逆或CRT前没有检查互素条件。"
  }
];
export function Cm2NumberTheoryObjectLab(){return <ConcreteMathOfficialLab title="第4章 数论 · 对象" caption="改变规模，先观察离散对象与边界。" mode="number" snapshots={snapshots}/>}
export function Cm2NumberTheoryDerivationLab(){return <ConcreteMathOfficialLab title="第4章 数论 · 推导" caption="推进变换，保留索引、初值与边界项。" mode="number" snapshots={snapshots} initial={1}/>}
export function Cm2NumberTheoryEvidenceLab(){return <ConcreteMathOfficialLab title="第4章 数论 · 证书" caption="用反例、误差和重放完成验收。" mode="number" snapshots={snapshots} initial={2}/>}
