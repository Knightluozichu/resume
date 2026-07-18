import { ConcreteMathOfficialLab, type ConcreteSnapshot } from "./official-lab";
const snapshots:ConcreteSnapshot[]=[
  {
    "label": "下取整",
    "object": "floor x是小于等于x的最大整数，精确表达完整块数量。",
    "transform": "改变n并观察下取整的结构",
    "certificate": "用小规模枚举与公式重算下取整",
    "warning": "认为floor负数等于向零截断，导致负坐标分桶错误。"
  },
  {
    "label": "上取整",
    "object": "ceiling x是大于等于x的最小整数，精确表达覆盖需求。",
    "transform": "改变n并观察上取整的结构",
    "certificate": "用小规模枚举与公式重算上取整",
    "warning": "把编程语言的负数余数规则直接当作数学mod而未写适配。"
  },
  {
    "label": "取整谱",
    "object": "floor与ceiling通过负号、平移和分数部分形成可转换恒等式。",
    "transform": "下取整定义给出唯一相邻整数夹逼。对负x应用该夹逼并乘负一，不等号反向，得到上取整与负下取整的对偶关系。",
    "certificate": "用小规模枚举与公式重算取整谱",
    "warning": "认为floor负数等于向零截断，导致负坐标分桶错误。"
  },
  {
    "label": "模运算",
    "object": "a mod m给出除法余数；负数语义必须固定到数学约定。",
    "transform": "改变n并观察模运算的结构",
    "certificate": "用小规模枚举与公式重算模运算",
    "warning": "把编程语言的负数余数规则直接当作数学mod而未写适配。"
  },
  {
    "label": "取整和",
    "object": "通过格点计数、互补区域或分块计算包含floor的求和。",
    "transform": "改变n并观察取整和的结构",
    "certificate": "分页、环形缓冲和任务分片必须明确整数除法与负余数语义；用边界正好整除、少一和多一三组输入验证floor或ceiling选择。",
    "warning": "认为floor负数等于向零截断，导致负坐标分桶错误。"
  }
];
export function Cm2IntegerFunctionsObjectLab(){return <ConcreteMathOfficialLab title="第3章 整数函数 · 对象" caption="改变规模，先观察离散对象与边界。" mode="floors" snapshots={snapshots}/>}
export function Cm2IntegerFunctionsDerivationLab(){return <ConcreteMathOfficialLab title="第3章 整数函数 · 推导" caption="推进变换，保留索引、初值与边界项。" mode="floors" snapshots={snapshots} initial={1}/>}
export function Cm2IntegerFunctionsEvidenceLab(){return <ConcreteMathOfficialLab title="第3章 整数函数 · 证书" caption="用反例、误差和重放完成验收。" mode="floors" snapshots={snapshots} initial={2}/>}
