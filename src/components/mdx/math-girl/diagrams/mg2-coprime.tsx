"use client";

import { MathGirlOfficialLab } from "./official-lab";

const fractionCases = [
  {
    label: "通分",
    fields: [
      ["分母", "6与10"],
      ["最小公倍数", "lcm(6,10)=30"],
      ["作用", "把两个分数放到同一分母"],
    ],
  },
  {
    label: "约分",
    fields: [
      ["原分数", "8/30"],
      ["最大公约数", "gcd(8,30)=2"],
      ["结果", "8/30=4/15"],
    ],
  },
  {
    label: "实例",
    fields: [
      ["输入", "a=18, b=24"],
      ["gcd与lcm", "M=6, L=72"],
      ["核对", "18x24=6x72=432"],
    ],
  },
  {
    label: "恒等式",
    fields: [
      ["逐质数", "min(alpha,beta)+max(alpha,beta)"],
      ["等于", "alpha+beta"],
      ["结论", "ab=gcd(a,b)lcm(a,b)"],
    ],
    alert: "最大公约数只拿共同质因数的较小指数，最小公倍数拿覆盖两数所需的较大指数；二者相乘时既没有遗漏，也没有重复计算。",
  },
] as const;

const exponentCases = [
  {
    label: "280",
    fields: [
      ["分解", "280=2^3 x 3^0 x 5 x 7"],
      ["向量", "<3,0,1,1,0,...>"],
      ["坐标顺序", "2,3,5,7,11,..."],
    ],
  },
  {
    label: "50",
    fields: [
      ["向量", "<1,0,2,0,0,...>"],
      ["还原", "2^1 x 5^2"],
      ["自然数", "50"],
    ],
  },
  {
    label: "1与质数",
    fields: [
      ["1", "<0,0,0,0,...>"],
      ["质数", "恰有一个坐标为1"],
      ["其余坐标", "全部为0"],
    ],
  },
  {
    label: "平方数",
    fields: [
      ["判据", "所有质数指数均为偶数"],
      ["1", "所有坐标为0，所以也是平方数"],
      ["例子", "100=<2,0,2,0,...>"],
    ],
    alert: "全零向量表示1而不是0：每一项都是p^0=1，有限乘积的结果仍是1。",
  },
] as const;

const geometryCases = [
  {
    label: "乘法",
    fields: [
      ["数的世界", "a x b"],
      ["向量世界", "v(ab)=v(a)+v(b)"],
      ["原因", "同底数幂相乘，指数相加"],
    ],
  },
  {
    label: "gcd/lcm",
    fields: [
      ["最大公约数", "逐坐标取min"],
      ["最小公倍数", "逐坐标取max"],
      ["单位元", "1对应全零向量"],
    ],
  },
  {
    label: "不互质",
    fields: [
      ["18", "<1,2,0,0,...>"],
      ["24", "<3,1,0,0,...>"],
      ["共同投影", "2轴和3轴都同时非零"],
    ],
  },
  {
    label: "互质",
    fields: [
      ["20", "<2,0,1,0,...>"],
      ["21", "<0,1,0,1,...>"],
      ["几何", "支撑不相交，内积为0"],
    ],
    alert: "互质不要求两个数本身都是质数。20与21都是合数，但没有共同质因数，因此它们的质数指数向量仍然垂直。",
  },
] as const;

export function Mg2FractionGcdLcmLab() {
  return <MathGirlOfficialLab cases={fractionCases} caption="通分、约分与乘积恒等式把分数运算中的gcd和lcm放进同一张质因数账本。" tone="amber" />;
}

export function Mg2PrimeExponentLab() {
  return <MathGirlOfficialLab cases={exponentCases} caption="质数指数记数法用固定的质数坐标保存一个自然数的完整乘法结构。" tone="cyan" />;
}

export function Mg2CoprimeGeometryLab() {
  return <MathGirlOfficialLab cases={geometryCases} caption="乘法、gcd、lcm与互质在质数坐标空间中分别变成加法、min、max与垂直。" tone="emerald" />;
}
