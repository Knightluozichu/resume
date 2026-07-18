import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "加法原理", premise: "计数不是套公式，而是先定义对象、选择顺序是否重要、判断步骤互斥还是连续，再决定加法原理、乘法原理、排列或组合。正确计数是概率分母、复杂度估计和测试空间设计的前提。", transform: "互斥方案的数量相加；若方案重叠，必须先消除交集或使用容斥。", evidence: "用定义、边界样例和反例验证加法原理", invariant: "加法原理：互斥方案的数量相加；若方案重叠，必须先消除交集或使用容斥。" },
  { label: "乘法原理", premise: "加法原理", transform: "连续选择的分支数相乘，每一步的可选数可以依赖前面的选择。", evidence: "用定义、边界样例和反例验证乘法原理", invariant: "乘法原理：连续选择的分支数相乘，每一步的可选数可以依赖前面的选择。" },
  { label: "排列", premise: "乘法原理", transform: "选择对象且顺序重要；无放回时后续可选数递减。", evidence: "用定义、边界样例和反例验证排列", invariant: "排列：选择对象且顺序重要；无放回时后续可选数递减。" },
  { label: "组合", premise: "排列", transform: "只关心选中集合，不关心内部顺序；可由排列除去k阶乘的重复次序。", evidence: "用定义、边界样例和反例验证组合", invariant: "组合：只关心选中集合，不关心内部顺序；可由排列除去k阶乘的重复次序。" },
  { label: "计数模型", premise: "组合", transform: "先建立对象与一一对应关系，再计算；公式只是模型的压缩结果。", evidence: "为三个浏览器、两种身份和四种网络状态设计测试，笛卡尔积有24种。但若访客身份不允许离线写入，部分组合无意义。测试设计应先列约束，再用覆盖目标压缩，而不是盲目宣称全组合或随意挑几个样例。", invariant: "计数模型：先建立对象与一一对应关系，再计算；公式只是模型的压缩结果。" },
];
export function Pm1CountingModelLab(){return <ProgrammerMathSeriesLab title="第5章 排列组合：不重不漏地计数：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm1CountingBoundaryLab(){return <ProgrammerMathSeriesLab title="第5章 排列组合：不重不漏地计数：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm1CountingEvidenceLab(){return <ProgrammerMathSeriesLab title="第5章 排列组合：不重不漏地计数：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
