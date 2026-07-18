import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "递归定义", premise: "递归定义由基例和缩小规则组成。汉诺塔、阶乘、斐波那契和递归图形展示同一模式：把规模n的问题归约为更小问题，并明确如何组合答案。程序实现还必须分析调用树、栈深和重复子问题。", transform: "对象通过更小规模的同类对象定义，同时必须给出不再递归的基例。", evidence: "用定义、边界样例和反例验证递归定义", invariant: "递归定义：对象通过更小规模的同类对象定义，同时必须给出不再递归的基例。" },
  { label: "递推关系", premise: "递归定义", transform: "用相邻规模的数值关系描述成本或答案，是从程序结构到数学模型的桥梁。", evidence: "用定义、边界样例和反例验证递推关系", invariant: "递推关系：用相邻规模的数值关系描述成本或答案，是从程序结构到数学模型的桥梁。" },
  { label: "调用栈", premise: "递推关系", transform: "每次调用保存参数、局部状态和返回位置；深度过大可能耗尽栈空间。", evidence: "用定义、边界样例和反例验证调用栈", invariant: "调用栈：每次调用保存参数、局部状态和返回位置；深度过大可能耗尽栈空间。" },
  { label: "重复子问题", premise: "调用栈", transform: "不同分支计算同一输入时，朴素递归会指数重复，可用记忆化或迭代消除。", evidence: "用定义、边界样例和反例验证重复子问题", invariant: "重复子问题：不同分支计算同一输入时，朴素递归会指数重复，可用记忆化或迭代消除。" },
  { label: "结构递归", premise: "重复子问题", transform: "沿树、列表或语法结构下降，正确性依赖每一步都进入严格更小的子结构。", evidence: "遍历目录树是结构递归：文件是基例，目录的结果由子项结果组合。工程实现必须处理符号链接环、权限失败、深度限制和部分结果。数学上的树若被现实链接变成图，就需要已访问集合恢复“规模严格减小”的前提。", invariant: "结构递归：沿树、列表或语法结构下降，正确性依赖每一步都进入严格更小的子结构。" },
];
export function Pm1RecursionModelLab(){return <ProgrammerMathSeriesLab title="第6章 递归：用自身定义自身：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm1RecursionBoundaryLab(){return <ProgrammerMathSeriesLab title="第6章 递归：用自身定义自身：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm1RecursionEvidenceLab(){return <ProgrammerMathSeriesLab title="第6章 递归：用自身定义自身：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
