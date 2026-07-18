"use client";

import { MathGirlOfficialLab } from "./official-lab";

const sequenceCases = [
  {
    label: "直觉疑问",
    fields: [
      ["能否碰到A", "可以有aₖ=A"],
      ["能否越过A", "可以左右振荡"],
      ["真正要求", "尾部全部进入任意ε邻域"],
    ],
  },
  {
    label: "ε挑战",
    fields: [
      ["对方先给", "任意ε>0"],
      ["目标区域", "(A-ε,A+ε)"],
      ["端点", "距离必须严格小于ε"],
    ],
  },
  {
    label: "N应战",
    fields: [
      ["我方再选", "N=N(ε)"],
      ["丢掉", "前N项"],
      ["保留", "所有n>N的项"],
    ],
  },
  {
    label: "量词全貌",
    fields: [
      ["顺序", "∀ε ∃N ∀n"],
      ["条件", "n>N ⇒ |aₙ-A|<ε"],
      ["含义", "每次挑战都能锁住整个尾部"],
    ],
    alert: "ε不是“无穷小数”，N也不是无穷。两者都有限；力量来自对每个正ε都能选出对应的有限N。",
  },
] as const;

const functionCases = [
  {
    label: "极限目标",
    fields: [
      ["输入", "x趋向a但不取a"],
      ["输出", "f(x)趋向A"],
      ["记号", "lim(x→a)f(x)=A"],
    ],
  },
  {
    label: "ε挑战",
    fields: [
      ["先给", "输出误差ε>0"],
      ["输出带", "|f(x)-A|<ε"],
      ["责任", "证明者控制输入距离"],
    ],
  },
  {
    label: "δ应战",
    fields: [
      ["后选", "输入半径δ>0"],
      ["去心邻域", "0<|x-a|<δ"],
      ["保证", "每个这样的x都进入输出带"],
    ],
  },
  {
    label: "线性示例",
    fields: [
      ["函数", "f(x)=2x+3"],
      ["距离放大", "|f(x)-f(a)|=2|x-a|"],
      ["选择", "δ=ε/2"],
    ],
    alert: "δ可以依赖ε和固定点a，但不能依赖随后任取的x；否则无法一次覆盖整个输入邻域。",
  },
] as const;

const continuityCases = [
  {
    label: "一点连续",
    fields: [
      ["等式", "lim(x→a)f(x)=f(a)"],
      ["量词", "∀ε ∃δ ∀x"],
      ["输出中心", "函数在点上的实际值f(a)"],
    ],
  },
  {
    label: "否定量词",
    fields: [
      ["连续", "∀ε ∃δ ∀x P"],
      ["不连续", "∃ε₀ ∀δ ∃x ¬P"],
      ["变化", "∀与∃逐层交换"],
    ],
  },
  {
    label: "无理数测定仪",
    fields: [
      ["有理x", "d(x)=0"],
      ["无理x", "d(x)=1"],
      ["密度", "任意邻域两类数都有"],
    ],
  },
  {
    label: "处处不连续",
    fields: [
      ["固定挑战", "ε₀=1/2"],
      ["任意δ", "选择与a类别相反的近点x"],
      ["输出跳跃", "|d(x)-d(a)|=1"],
    ],
    alert: "图像画不成一条普通曲线并不妨碍它是函数；定义只要求每个输入拥有唯一输出。",
  },
] as const;

const onePointCases = [
  {
    label: "构造g",
    fields: [
      ["有理x", "g(x)=0"],
      ["无理x", "g(x)=x"],
      ["图像直觉", "把无理数层倾斜到过原点"],
    ],
  },
  {
    label: "在0连续",
    fields: [
      ["g(0)", "0"],
      ["统一估计", "|g(x)|≤|x|"],
      ["选择", "δ=ε"],
    ],
  },
  {
    label: "非零点断裂",
    fields: [
      ["a≠0", "取ε₀=|a|/2"],
      ["邻域", "有理与无理点都稠密"],
      ["结果", "总能找到输出相差至少ε₀的点"],
    ],
  },
  {
    label: "三件工具",
    fields: [
      ["旧例", "无理数测定仪"],
      ["严格语言", "ε-δ"],
      ["表征", "心中画出的图"],
    ],
    alert: "先由图像猜构造，再由ε-δ分别证明“在0连续”和“别处不连续”，直觉与逻辑各自完成一半工作。",
  },
] as const;

export function Mg3SequenceLimitLab() {
  return (
    <MathGirlOfficialLab
      cases={sequenceCases}
      caption="把“无限接近”拆成ε挑战、N应战和整个尾部的承诺，碰到、越过或振荡都由同一量词公式裁决。"
      tone="cyan"
    />
  );
}

export function Mg3FunctionLimitLab() {
  return (
    <MathGirlOfficialLab
      cases={functionCases}
      caption="ε控制输出误差，δ控制输入距离；先后顺序把模糊的双重“接近”变成可计算的保证。"
      tone="violet"
    />
  );
}

export function Mg3ContinuityNegationLab() {
  return (
    <MathGirlOfficialLab
      cases={continuityCases}
      caption="连续公式逐层否定后得到固定反例误差；有理数与无理数的稠密性交付每个δ所需的坏点。"
      tone="rose"
    />
  );
}

export function Mg3OnePointContinuityLab() {
  return (
    <MathGirlOfficialLab
      cases={onePointCases}
      caption="同一分段函数在原点被统一估计压进误差带，却在每个非零点被两类稠密输入撕开。"
      tone="emerald"
    />
  );
}
