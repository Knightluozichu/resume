"use client";

import { MathGirlOfficialLab } from "./official-lab";

const implicationCases = [
  {
    label: "前假后假",
    fields: [
      ["A", "假"],
      ["B", "假"],
      ["A⇒B", "真"],
    ],
    alert: "前件没有发生，就没有出现“前件为真而后件为假”的反例。",
  },
  {
    label: "前假后真",
    fields: [
      ["A", "假"],
      ["B", "真"],
      ["A⇒B", "真"],
    ],
  },
  {
    label: "前真后假",
    fields: [
      ["A", "真"],
      ["B", "假"],
      ["A⇒B", "假"],
    ],
    alert: "这是蕴含唯一失败的行：承诺的前件成立，后件却没有成立。",
  },
  {
    label: "前真后真",
    fields: [
      ["A", "真"],
      ["B", "真"],
      ["A⇒B", "真"],
    ],
  },
] as const;

const grammarCases = [
  {
    label: "F1 变量",
    fields: [
      ["输入", "A"],
      ["规则", "变量是逻辑公式"],
      ["结论", "A合法"],
    ],
  },
  {
    label: "F2 否定",
    fields: [
      ["已有", "A合法"],
      ["构造", "¬(A)"],
      ["可递归", "¬(¬(A))仍合法"],
    ],
  },
  {
    label: "F3 析取",
    fields: [
      ["已有", "x与y合法"],
      ["构造", "(x)∨(y)"],
      ["括号", "是字符串的一部分"],
    ],
  },
  {
    label: "F4 封口",
    fields: [
      ["A∧B", "未由F1-F3生成"],
      ["A∨B", "缺少规定的括号"],
      ["结论", "二者在H中都不合法"],
    ],
    alert: "熟悉的数学含义不能补写规则。形式语言只接受由生成规则实际构造出的字符串。",
  },
] as const;

const systemCases = [
  {
    label: "公理模式",
    fields: [
      ["P1-P4", "四种可实例化形式"],
      ["代入", "x,y,z可换成任意公式"],
      ["结果", "生成无数个公理实例"],
    ],
  },
  {
    label: "MP 规则",
    fields: [
      ["已有", "x"],
      ["另有", "x→y"],
      ["推出", "y"],
    ],
  },
  {
    label: "形式证明",
    fields: [
      ["对象", "有限公式序列"],
      ["每一行", "公理或由更早行MP得到"],
      ["顺序", "依据必须出现在结论之前"],
    ],
  },
  {
    label: "形式定理",
    fields: [
      ["定义", "存在形式证明的公式"],
      ["位置", "某个证明的最后一行"],
      ["区别", "可证明性不等同于真值"],
    ],
    alert: "语义问公式在解释下是否为真；句法问字符串能否由公理和规则生成。二者相关，但定义层面不能混用。",
  },
] as const;

const identityProofCases = [
  {
    label: "L1",
    fields: [
      ["来源", "P1，令x=A"],
      ["公式", "(A∨A)→A"],
      ["身份", "公理实例"],
    ],
  },
  {
    label: "L2",
    fields: [
      ["来源", "P4代入三个公式"],
      ["前件", "(A∨A)→A"],
      ["后件", "(¬A∨(A∨A))→(¬A∨A)"],
    ],
  },
  {
    label: "L3",
    fields: [
      ["来源", "P2，令x=y=A"],
      ["公式", "A→(A∨A)"],
      ["展开", "¬A∨(A∨A)"],
    ],
  },
  {
    label: "L4",
    fields: [
      ["来源", "L1与L2使用MP"],
      ["公式", "(A→(A∨A))→(A→A)"],
      ["作用", "搭好最后一次MP"],
    ],
  },
  {
    label: "L5",
    fields: [
      ["来源", "L3与L4使用MP"],
      ["公式", "A→A"],
      ["结论", "A→A是H的定理"],
    ],
    alert: "A→A不是P1-P4的直接实例；五行序列展示的是可检查的句法生成过程，而不是借用“显然为真”。",
  },
] as const;

export function Mg3ImplicationTruthLab() {
  return (
    <MathGirlOfficialLab
      cases={implicationCases}
      caption="逐行检查前件与后件，蕴含只排除“前件为真、后件为假”这一种反例。"
      tone="cyan"
    />
  );
}

export function Mg3FormalGrammarLab() {
  return (
    <MathGirlOfficialLab
      cases={grammarCases}
      caption="从变量出发递归生成字符串，F4封住所有旁门；熟悉的符号与省略的括号都不会自动合法。"
      tone="violet"
    />
  );
}

export function Mg3HilbertSystemLab() {
  return (
    <MathGirlOfficialLab
      cases={systemCases}
      caption="公理模式提供起点，MP提供唯一变换，有限序列把“有证明”变成可以逐行机械核查的性质。"
      tone="amber"
    />
  );
}

export function Mg3IdentityProofLab() {
  return (
    <MathGirlOfficialLab
      cases={identityProofCases}
      caption="沿L1至L5追踪公理实例和两次MP，最终在不调用真值含义的前提下生成A→A。"
      tone="emerald"
    />
  );
}
