import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "反证法", premise: "本章用反证法、可数性、对角论证和停机问题说明：有些问题不是资源不足，而是不存在对所有输入都正确的算法。认识不可判定边界，能防止把静态分析、验证和安全扫描承诺成不可能的万能工具。", transform: "假设结论的否定成立，并推导矛盾；矛盾必须来自假设与已知规则。", evidence: "用定义、边界样例和反例验证反证法", invariant: "反证法：假设结论的否定成立，并推导矛盾；矛盾必须来自假设与已知规则。" },
  { label: "可数集合", premise: "反证法", transform: "能与自然数建立一一对应；有限字符串和程序文本虽无限但可枚举。", evidence: "用定义、边界样例和反例验证可数集合", invariant: "可数集合：能与自然数建立一一对应；有限字符串和程序文本虽无限但可枚举。" },
  { label: "对角论证", premise: "可数集合", transform: "构造一个在第n位不同于第n个对象的新对象，证明任何枚举都不完整。", evidence: "用定义、边界样例和反例验证对角论证", invariant: "对角论证：构造一个在第n位不同于第n个对象的新对象，证明任何枚举都不完整。" },
  { label: "停机问题", premise: "对角论证", transform: "不存在一个程序能对任意程序及输入总是判定其最终是否停止。", evidence: "用定义、边界样例和反例验证停机问题", invariant: "停机问题：不存在一个程序能对任意程序及输入总是判定其最终是否停止。" },
  { label: "半判定", premise: "停机问题", transform: "某些问题找到证据时可以确认，但无证据分支可能永不结束；超时不等于逻辑否定。", evidence: "静态分析器可以对受限语言、有限状态或特定缺陷给出可靠结论，却不能普遍判定任意程序所有运行性质。工程文档必须区分已证明安全、找到反例、分析超时和超出模型四种状态，不能把“未发现问题”写成“没有问题”。", invariant: "半判定：某些问题找到证据时可以确认，但无证据分支可能永不结束；超时不等于逻辑否定。" },
];
export function Pm1UndecidableProblemsModelLab(){return <ProgrammerMathSeriesLab title="第8章 不可解问题：程序能力的边界：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm1UndecidableProblemsBoundaryLab(){return <ProgrammerMathSeriesLab title="第8章 不可解问题：程序能力的边界：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm1UndecidableProblemsEvidenceLab(){return <ProgrammerMathSeriesLab title="第8章 不可解问题：程序能力的边界：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
