import { ConcreteMathOfficialLab, type ConcreteSnapshot } from "./official-lab";
const snapshots:ConcreteSnapshot[]=[
  {
    "label": "二项式系数",
    "object": "n选k计数k元素子集，并通过广义定义扩展到更多参数。",
    "transform": "改变n并观察二项式系数的结构",
    "certificate": "用小规模枚举与公式重算二项式系数",
    "warning": "把组合定义域限制在教科书正整数后，又在变换中静默使用广义二项式。"
  },
  {
    "label": "Pascal恒等式",
    "object": "按是否包含指定元素分组，得到相邻两项之和。",
    "transform": "改变n并观察Pascal恒等式的结构",
    "certificate": "用小规模枚举与公式重算Pascal恒等式",
    "warning": "机械求和只输出闭式，不保存望远镜证书或递推初值。"
  },
  {
    "label": "Vandermonde卷积",
    "object": "按从两个集合分别选取多少元素对同一对象双重计数。",
    "transform": "从r加s个元素中选n个，可直接计数得到右侧；也可按从前r个元素中选k个分类并对所有k求和，得到左侧。两种方法计数同一集合。",
    "certificate": "用小规模枚举与公式重算Vandermonde卷积",
    "warning": "把组合定义域限制在教科书正整数后，又在变换中静默使用广义二项式。"
  },
  {
    "label": "超几何项",
    "object": "相邻项比值是索引的有理函数，适合机械化求和。",
    "transform": "改变n并观察超几何项的结构",
    "certificate": "用小规模枚举与公式重算超几何项",
    "warning": "机械求和只输出闭式，不保存望远镜证书或递推初值。"
  },
  {
    "label": "求和证书",
    "object": "把目标和写成望远镜差分或参数递推，提供可检查证明。",
    "transform": "改变n并观察求和证书的结构",
    "certificate": "组合恒等式优先寻找双重计数解释，再用符号变换或机械证书补充。程序验收覆盖k小于零、大于n和边界n为零。",
    "warning": "把组合定义域限制在教科书正整数后，又在变换中静默使用广义二项式。"
  }
];
export function Cm2BinomialCoefficientsObjectLab(){return <ConcreteMathOfficialLab title="第5章 二项式系数 · 对象" caption="改变规模，先观察离散对象与边界。" mode="binomial" snapshots={snapshots}/>}
export function Cm2BinomialCoefficientsDerivationLab(){return <ConcreteMathOfficialLab title="第5章 二项式系数 · 推导" caption="推进变换，保留索引、初值与边界项。" mode="binomial" snapshots={snapshots} initial={1}/>}
export function Cm2BinomialCoefficientsEvidenceLab(){return <ConcreteMathOfficialLab title="第5章 二项式系数 · 证书" caption="用反例、误差和重放完成验收。" mode="binomial" snapshots={snapshots} initial={2}/>}
