"use client";

import { MathGirlOfficialLab } from "./official-lab";

const nineSequenceCases = [
  {
    label: "有限小数",
    fields: [
      ["第1项", "a₁=0.9"],
      ["第2项", "a₂=0.99"],
      ["第n项", "aₙ=1-10⁻ⁿ"],
    ],
  },
  {
    label: "每项都小",
    fields: [
      ["差", "1-aₙ=10⁻ⁿ"],
      ["有限n", "10⁻ⁿ>0"],
      ["结论", "每个aₙ都小于1"],
    ],
  },
  {
    label: "距离归零",
    fields: [
      ["距离", "|aₙ-1|=10⁻ⁿ"],
      ["趋势", "n增大时任意小"],
      ["结论", "aₙ趋于1"],
    ],
  },
  {
    label: "项与目的地",
    fields: [
      ["0.999...9", "某个有限项aₙ"],
      ["0.999...", "整列部分和的极限"],
      ["目的地", "极限值等于1"],
    ],
    alert: "不存在“最后一个有限项”。每项小于1与数列极限等于1同时成立，二者回答的是不同问题。",
  },
] as const;

const notationCases = [
  {
    label: "引入字母",
    fields: [
      ["数列", "a₁,a₂,...,aₙ,..."],
      ["下标", "n标记第几项"],
      ["通项", "aₙ=1-10⁻ⁿ"],
    ],
  },
  {
    label: "有限极限",
    fields: [
      ["记号", "lim(n→∞)aₙ=A"],
      ["A的身份", "固定实数"],
      ["收敛", "距离|aₙ-A|可任意小"],
    ],
  },
  {
    label: "发散到无穷",
    fields: [
      ["例子", "bₙ=10ⁿ"],
      ["含义", "最终超过任意给定界M"],
      ["注意", "+∞不是有限实数极限"],
    ],
  },
  {
    label: "量词骨架",
    fields: [
      ["先给", "任意误差ε>0"],
      ["再找", "一个门槛N"],
      ["门槛之后", "n≥N时|aₙ-A|<ε"],
    ],
    alert: "“越来越近”是图像；误差、门槛和量词顺序才是可以检查的数学陈述。",
  },
] as const;

const geometricCases = [
  {
    label: "部分和",
    fields: [
      ["定义", "sₙ=9/10+...+9/10ⁿ"],
      ["十进制", "sₙ=0.999...9"],
      ["项数", "恰有n个9"],
    ],
  },
  {
    label: "整体乘10",
    fields: [
      ["原式", "sₙ=9/10+...+9/10ⁿ"],
      ["平移", "10sₙ=9+...+9/10ⁿ⁻¹"],
      ["作用", "中间项可以消去"],
    ],
  },
  {
    label: "相减求和",
    fields: [
      ["相减", "9sₙ=9-9/10ⁿ"],
      ["化简", "sₙ=1-10⁻ⁿ"],
      ["余量", "1-sₙ=10⁻ⁿ"],
    ],
  },
  {
    label: "定义循环小数",
    fields: [
      ["定义", "0.999... := lim sₙ"],
      ["极限", "lim(1-10⁻ⁿ)=1"],
      ["结论", "0.999...=1"],
    ],
    alert: "代数移位不是魔法；先把循环小数定义为收敛部分和的极限，移位、相减和取极限才有严格对象。",
  },
] as const;

const representationCases = [
  {
    label: "尤里的直觉",
    fields: [
      ["观察", "每个有限小数都不到1"],
      ["疑问", "一直不到会不会小于1"],
      ["缺口", "把极限误当成后继项"],
    ],
  },
  {
    label: "爱心记号",
    fields: [
      ["设想", "给目的地另起名字"],
      ["价值", "不与aₙ混为一谈"],
      ["数学记号", "A=lim aₙ"],
    ],
  },
  {
    label: "声音与乐谱",
    fields: [
      ["声音", "连续流逝的体验"],
      ["乐谱", "可反复检查的表示"],
      ["数学", "公式固定关系与量词"],
    ],
  },
  {
    label: "走向严格定义",
    fields: [
      ["Cauchy", "系统使用极限思想"],
      ["Weierstrass", "用误差与量词严密化"],
      ["下一步", "ε-N定义与ε-δ定义"],
    ],
    alert: "自然语言帮助形成图像，公式负责消除歧义；二者不是互相排斥，而是承担不同阶段的工作。",
  },
] as const;

export function Mg3NineSequenceLab() {
  return (
    <MathGirlOfficialLab
      cases={nineSequenceCases}
      caption="沿有限项、正距离和极限目的地逐层切换，亲眼看见“始终小于1”与“极限等于1”可以同时为真。"
      tone="cyan"
    />
  );
}

export function Mg3LimitNotationLab() {
  return (
    <MathGirlOfficialLab
      cases={notationCases}
      caption="下标把每个有限项固定下来，极限记号再把整列数的长期行为压缩成可检验的量词条件。"
      tone="violet"
    />
  );
}

export function Mg3GeometricSumLab() {
  return (
    <MathGirlOfficialLab
      cases={geometricCases}
      caption="把n个9写成有限等比和，先求精确通式再取极限，循环小数等式便不再依赖视觉想象。"
      tone="emerald"
    />
  );
}

export function Mg3RepresentationLab() {
  return (
    <MathGirlOfficialLab
      cases={representationCases}
      caption="从直觉、临时记号、乐谱类比走向误差量词，表示方式逐步把“无限接近”变成严格命题。"
      tone="amber"
    />
  );
}
