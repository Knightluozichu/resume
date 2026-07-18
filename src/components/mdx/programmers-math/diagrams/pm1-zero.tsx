import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "按位计数法", premise: "本章从十进制和二进制的按位计数出发，解释零既是数值，也是占位符和规则统一器。关键不是背进制转换步骤，而是看见有限符号如何借位置权重表示无限多整数，以及计算机为何偏爱两种稳定状态。", transform: "每一位的符号乘以该位置的基数幂；位置改变，同一符号的权重也改变。", evidence: "用定义、边界样例和反例验证按位计数法", invariant: "按位计数法：每一位的符号乘以该位置的基数幂；位置改变，同一符号的权重也改变。" },
  { label: "二进制", premise: "按位计数法", transform: "只用0和1表示数，位权依次为1、2、4、8；它适合用高低电平实现。", evidence: "用定义、边界样例和反例验证二进制", invariant: "二进制：只用0和1表示数，位权依次为1、2、4、8；它适合用高低电平实现。" },
  { label: "基数转换", premise: "二进制", transform: "整数不断除以目标基数并逆序收集余数；验证时应重新按位展开。", evidence: "用定义、边界样例和反例验证基数转换", invariant: "基数转换：整数不断除以目标基数并逆序收集余数；验证时应重新按位展开。" },
  { label: "零的占位作用", premise: "基数转换", transform: "零保留缺失位的位置，让2503中的百位缺失不会改变其他位的权重。", evidence: "用定义、边界样例和反例验证零的占位作用", invariant: "零的占位作用：零保留缺失位的位置，让2503中的百位缺失不会改变其他位的权重。" },
  { label: "指数法则", premise: "零的占位作用", transform: "零次幂把边界规则统一为1，负指数把位权扩展到小数方向。", evidence: "权限位是零的工程化应用：每个二进制位代表一项独立能力，按位或负责授予，按位与负责查询，按位异或负责翻转。表示很紧凑，但位号、掩码和默认值必须进入协议文档，否则一个移位错误就会改变权限边界。", invariant: "指数法则：零次幂把边界规则统一为1，负指数把位权扩展到小数方向。" },
];
export function Pm1ZeroModelLab(){return <ProgrammerMathSeriesLab title="第1章 0的故事：无即是有：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm1ZeroBoundaryLab(){return <ProgrammerMathSeriesLab title="第1章 0的故事：无即是有：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm1ZeroEvidenceLab(){return <ProgrammerMathSeriesLab title="第1章 0的故事：无即是有：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
