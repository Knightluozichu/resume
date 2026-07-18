"use client";

import { MathGirlOfficialLab } from "./official-lab";

const countabilityCases = [
  {
    label: "整数",
    fields: [
      ["排列", "0,1,-1,2,-2,..."],
      ["编号", "每个整数获得唯一自然数"],
      ["结论", "Z可数"],
    ],
  },
  {
    label: "有理数",
    fields: [
      ["网格", "按分子分母之和走对角线"],
      ["去重", "跳过可约分的重复分数"],
      ["结论", "Q可数"],
    ],
  },
  {
    label: "有限小数",
    fields: [
      ["第k层", "小数位恰至多k位"],
      ["每层", "只有有限多个字符串"],
      ["并集", "所有终止小数可数"],
    ],
  },
  {
    label: "无限小数",
    fields: [
      ["对象", "无限数字序列"],
      ["误区", "没有“无限位”这个自然数层"],
      ["问题", "不能由逐层列完推出全体实数可数"],
    ],
    alert: "“每个有限长度都能列完”不等于“所有无限序列都能列完”；量词从任意有限长度跳到了一个并不存在的无限长度。",
  },
] as const;

const diagonalCases = [
  {
    label: "假设列表",
    fields: [
      ["假设", "(0,1)内实数可数"],
      ["列表", "A₁,A₂,A₃,..."],
      ["数字", "aₙ,ₖ是第n行第k位"],
    ],
  },
  {
    label: "读取对角线",
    fields: [
      ["选择", "a₁,₁,a₂,₂,a₃,₃,..."],
      ["覆盖", "第n行读取第n位"],
      ["目的", "为每一行预留一个不同位置"],
    ],
  },
  {
    label: "翻转数字",
    fields: [
      ["规则", "偶数改1，奇数改2"],
      ["新数", "B=0.b₁b₂b₃..."],
      ["保证", "bₙ≠aₙ,ₙ且无尾9歧义"],
    ],
  },
  {
    label: "推出矛盾",
    fields: [
      ["若B=Aₘ", "第m位应有bₘ=aₘ,ₘ"],
      ["按构造", "第m位又有bₘ≠aₘ,ₘ"],
      ["结论", "任何声称完整的列表都漏掉B"],
    ],
    alert: "把B追加到旧表只得到一张新表；对新表再次沿对角线翻转，仍会构造出未列出的新数。",
  },
] as const;

const propertyCases = [
  {
    label: "相容",
    fields: [
      ["禁止", "不存在φ同时可证φ与¬φ"],
      ["关注", "证明系统内部"],
      ["不保证", "每个语句都可判定"],
    ],
  },
  {
    label: "完备",
    fields: [
      ["范围", "每个无自由变量语句φ"],
      ["要求", "φ或¬φ至少一方可证"],
      ["不是", "两方都可证"],
    ],
  },
  {
    label: "不可判定",
    fields: [
      ["语句", "φ"],
      ["两边", "φ与¬φ都无形式证明"],
      ["结果", "系统不完备但仍可能相容"],
    ],
  },
  {
    label: "第一定理",
    fields: [
      ["对象", "一致、有效且足够强的算术理论"],
      ["结论", "存在不可判定语句"],
      ["边界", "关于形式系统，不是泛泛的理性极限"],
    ],
    alert: "相容只排除“两边都可证”；完备才要求“至少一边可证”。漏掉“两边都不可证”就会把两个性质混为一谈。",
  },
] as const;

const godelCases = [
  {
    label: "符号编码",
    fields: [
      ["第一步", "给每个符号分配自然数"],
      ["公式", "变成自然数有限序列"],
      ["特点", "编码可机械计算"],
    ],
  },
  {
    label: "质数打包",
    fields: [
      ["序列", "(s₁,...,sₖ)"],
      ["编码", "2ˢ¹3ˢ²...pₖˢᵏ"],
      ["解码", "唯一质因数分解"],
    ],
  },
  {
    label: "算术化句法",
    fields: [
      ["可判断", "公式码、公理码、证明码"],
      ["可定义", "Proof(p,y)"],
      ["可证明性", "Prov(y):=∃p Proof(p,y)"],
    ],
  },
  {
    label: "对角化",
    fields: [
      ["输入", "含一个自由变量的公式φ(x)"],
      ["自代入", "把公式编码的数项代回x"],
      ["目标", "构造谈论自身可证明性的语句"],
    ],
    alert: "哥德尔编码负责让句法成为算术对象；对角化负责让公式指向自己的编码。两步缺一不可。",
  },
] as const;

export function Mg3CountabilityLab() {
  return (
    <MathGirlOfficialLab
      cases={countabilityCases}
      caption="整数和有理数能沿明确路径逐一编号；有限小数的逐层枚举却不能越过到所有无限数字序列。"
      tone="cyan"
    />
  );
}

export function Mg3DiagonalArgumentLab() {
  return (
    <MathGirlOfficialLab
      cases={diagonalCases}
      caption="每一行都在自己的对角位被翻转，新数因此与列表中的每一项至少有一位不同。"
      tone="violet"
    />
  );
}

export function Mg3SystemPropertiesLab() {
  return (
    <MathGirlOfficialLab
      cases={propertyCases}
      caption="相容排除双边可证，完备排除双边不可证；第一不完备定理在明确系统条件下留下后一种空隙。"
      tone="amber"
    />
  );
}

export function Mg3GodelBridgeLab() {
  return (
    <MathGirlOfficialLab
      cases={godelCases}
      caption="符号、公式和证明被压成自然数后，形式系统便能在算术内部描述自己的句法，并为对角自指铺路。"
      tone="emerald"
    />
  );
}
