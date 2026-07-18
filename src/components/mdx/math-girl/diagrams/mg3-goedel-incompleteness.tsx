"use client";

import { MathGirlOfficialLab } from "./official-lab";

const hilbertCases = [
  {
    label: "形式化",
    fields: [
      ["对象", "符号、公式、公理、推理规则"],
      ["证明", "可机械核验的有限公式序列"],
      ["目标", "把数学变成可研究的对象"],
    ],
  },
  {
    label: "相容性",
    fields: [
      ["禁止", "A与¬A同时可证"],
      ["原因", "矛盾系统中一切公式都可证"],
      ["目标", "证明系统没有矛盾"],
    ],
  },
  {
    label: "完备性",
    fields: [
      ["对每个语句A", "A或¬A至少一方可证"],
      ["含义", "没有判定不到的语句"],
      ["注意", "矛盾系统反而满足此定义"],
    ],
  },
  {
    label: "不完备定理",
    fields: [
      ["第一定理", "存在A与¬A都不可证"],
      ["第二定理", "系统不能证明自身相容"],
      ["条件", "相容、含自然数算术、可有效公理化"],
    ],
    alert: "定理针对满足条件的形式系统，不是“数学含有矛盾”或“理性已被数学证明存在界限”。",
  },
] as const;

const formalSystemCases = [
  {
    label: "基本符号",
    fields: [
      ["常量", "0, f, ¬, ∨, ∀, (, )"],
      ["变量", "第1型、第2型、第3型……"],
      ["数项", "0, f0, ff0, fff0……"],
    ],
  },
  {
    label: "公式语法",
    fields: [
      ["起点", "基本公式a(b)"],
      ["闭包", "¬(a), (a)∨(b), ∀x(a)"],
      ["边界", "只有有限生成得到的串才是公式"],
    ],
  },
  {
    label: "公理族",
    fields: [
      ["I", "皮亚诺算术"],
      ["II与III", "命题逻辑与谓词逻辑"],
      ["IV与V", "集合内涵与外延"],
    ],
  },
  {
    label: "形式证明",
    fields: [
      ["每一行", "公理或此前行的直接推论"],
      ["规则", "假言推理与全称化"],
      ["末行", "该形式证明所证的定理"],
    ],
    alert: "形式证明属于符号世界；数学家写下的非形式证明属于含义世界。两者相关，但不能在推理中悄悄互换。",
  },
] as const;

const goedelCases = [
  {
    label: "符号编码",
    fields: [
      ["常量", "1,3,5,7,9,11,13"],
      ["第n型变量", "大于13的质数的n次幂"],
      ["目的", "每个基本符号得到唯一数"],
    ],
  },
  {
    label: "序列编码",
    fields: [
      ["序列", "(n₁,n₂,…,nₖ)"],
      ["编码", "2^n₁·3^n₂···pₖ^nₖ"],
      ["解码", "读取各质数指数"],
    ],
  },
  {
    label: "ff0示例",
    fields: [
      ["符号码", "f=3, f=3, 0=1"],
      ["乘积", "2³·3³·5¹"],
      ["哥德尔数", "1080"],
    ],
  },
  {
    label: "算术化",
    fields: [
      ["逻辑公式", "符号序列的数"],
      ["形式证明", "公式序列的数"],
      ["结果", "用数论谈语法与证明"],
    ],
    alert: "哥德尔数不是公式的数学含义，而是公式的可逆编码。关键是编码与解码都能被算术有效处理。",
  },
] as const;

const recursiveCases = [
  {
    label: "原始递归",
    fields: [
      ["基础", "常量、后继、投影"],
      ["封闭", "复合与原始递归"],
      ["直觉", "计算所需重复次数有输入给出的上限"],
    ],
  },
  {
    label: "表现定理",
    fields: [
      ["输入", "原始递归谓词R"],
      ["输出", "形式系统P中的公式r"],
      ["桥梁", "真假分别对应r或¬r的形式证明"],
    ],
  },
  {
    label: "定义1至45",
    fields: [
      ["数与序列", "整除、质数、长度、连接"],
      ["公式与代换", "IsForm、IsFree、subst"],
      ["证明", "IsAxiom、IsProof、Proves"],
    ],
  },
  {
    label: "定义46",
    fields: [
      ["IsProvable(x)", "存在p使Proves(p,x)"],
      ["差异", "存在量词没有预设上界"],
      ["结论", "不再保证是原始递归谓词"],
    ],
    alert: "验证一个给定证明是有界、机械的；搜索某语句是否存在任意长度的证明没有预先上界。这是Proves与IsProvable的关键差异。",
  },
] as const;

const proofCases = [
  {
    label: "五个季节",
    fields: [
      ["春夏", "形式系统P与哥德尔数"],
      ["秋冬", "表现定理与Proves"],
      ["新春", "构造不可判定语句g"],
    ],
  },
  {
    label: "对角化",
    fields: [
      ["谓词Q(x,y)", "x不是y对角化结果的证明"],
      ["固定点g", "g表达“g不可证明”"],
      ["机制", "用公式自身的数项代回其自由变量"],
    ],
  },
  {
    label: "第一定理",
    fields: [
      ["若P相容", "g不可证"],
      ["若P具所需强相容条件", "¬g也不可证"],
      ["结论", "P不完备"],
    ],
  },
  {
    label: "第二定理",
    fields: [
      ["语句c", "P自身相容"],
      ["内部化第一证明", "c推出g不可证"],
      ["结论", "若P相容，则P不能证明c"],
    ],
    alert: "“g为真但不可证”需要区分元数学真理与系统内部可证性；第一定理的核心结论首先是g及其否定在系统内都没有形式证明。",
  },
] as const;

export function Mg3HilbertProgramLab() {
  return (
    <MathGirlOfficialLab
      cases={hilbertCases}
      caption="希尔伯特计划依次要求形式化、相容与完备；不完备定理精确限制了满足条件的形式系统能在内部完成什么。"
      tone="cyan"
    />
  );
}

export function Mg3FormalSystemPLab() {
  return (
    <MathGirlOfficialLab
      cases={formalSystemCases}
      caption="形式系统P从七个常量、多型变量和递归语法出发，以公理与两条推理规则定义可机械核验的形式证明。"
      tone="violet"
    />
  );
}

export function Mg3GoedelNumberLab() {
  return (
    <MathGirlOfficialLab
      cases={goedelCases}
      caption="质数指数编码把符号、公式和证明变成可逆的自然数对象，使语法问题可以进入数论。"
      tone="amber"
    />
  );
}

export function Mg3PrimitiveRecursiveLab() {
  return (
    <MathGirlOfficialLab
      cases={recursiveCases}
      caption="原始递归性给表现定理提供通行证；定义1至45机械刻画证明检查，定义46则跨入无界的证明存在性。"
      tone="emerald"
    />
  );
}

export function Mg3IncompletenessProofLab() {
  return (
    <MathGirlOfficialLab
      cases={proofCases}
      caption="五季准备在对角化处闭环：系统中的语句g谈论自身不可证，由相容性推出g与其否定都不可证。"
      tone="rose"
    />
  );
}
