import { ConcreteMathOfficialLab, type ConcreteSnapshot } from "./official-lab";
const snapshots:ConcreteSnapshot[]=[
  {
    "label": "普通生成函数",
    "object": "把序列a_n编码为A(z)=sum a_n z^n，不要求解析收敛也可形式运算。",
    "transform": "改变n并观察普通生成函数的结构",
    "certificate": "用小规模枚举与公式重算普通生成函数",
    "warning": "索引平移后遗漏初值修正项，得到看似漂亮但错误的有理函数。"
  },
  {
    "label": "系数提取",
    "object": "记号[z^n]A(z)返回z的n次项系数，把代数结果还原为序列。",
    "transform": "改变n并观察系数提取的结构",
    "certificate": "用小规模枚举与公式重算系数提取",
    "warning": "把形式幂级数恒等式与解析函数收敛结论混为一谈。"
  },
  {
    "label": "卷积",
    "object": "生成函数乘法的系数是两个序列的Cauchy卷积。",
    "transform": "形式乘法把每个a_k z^k与b_j z^j相乘；对固定总次数n收集所有k加j=n的项，就得到卷积系数。该推导只依赖形式幂级数，不需先讨论收敛半径。",
    "certificate": "用小规模枚举与公式重算卷积",
    "warning": "索引平移后遗漏初值修正项，得到看似漂亮但错误的有理函数。"
  },
  {
    "label": "指数生成函数",
    "object": "用a_n除以n阶乘作为系数，适合带标签组合对象。",
    "transform": "改变n并观察指数生成函数的结构",
    "certificate": "用小规模枚举与公式重算指数生成函数",
    "warning": "把形式幂级数恒等式与解析函数收敛结论混为一谈。"
  },
  {
    "label": "Dirichlet生成函数",
    "object": "用a_n除以n的s次方编码算术函数，使乘法对应Dirichlet卷积。",
    "transform": "改变n并观察Dirichlet生成函数的结构",
    "certificate": "解递推时先乘z的n次方并对合法n求和，单独处理被移位漏掉的初值项；最后用系数展开与原递推逐项对照。",
    "warning": "索引平移后遗漏初值修正项，得到看似漂亮但错误的有理函数。"
  }
];
export function Cm2GeneratingFunctionsObjectLab(){return <ConcreteMathOfficialLab title="第7章 生成函数 · 对象" caption="改变规模，先观察离散对象与边界。" mode="generating" snapshots={snapshots}/>}
export function Cm2GeneratingFunctionsDerivationLab(){return <ConcreteMathOfficialLab title="第7章 生成函数 · 推导" caption="推进变换，保留索引、初值与边界项。" mode="generating" snapshots={snapshots} initial={1}/>}
export function Cm2GeneratingFunctionsEvidenceLab(){return <ConcreteMathOfficialLab title="第7章 生成函数 · 证书" caption="用反例、误差和重放完成验收。" mode="generating" snapshots={snapshots} initial={2}/>}
