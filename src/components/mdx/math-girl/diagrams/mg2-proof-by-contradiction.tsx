"use client";

import { MathGirlOfficialLab } from "./official-lab";

const languageCases = [
  {
    label: "定义",
    fields: [
      ["sqrt(2)", "平方后等于2的正数"],
      ["有理数", "可写成两个整数之比"],
      ["附加条件", "分母不为0"],
    ],
  },
  {
    label: "命题",
    fields: [
      ["要求", "可以确定真或假"],
      ["真命题", "1+1=2"],
      ["假命题", "1+1=3仍然是命题"],
    ],
  },
  {
    label: "公式",
    fields: [
      ["目标", "不存在合格整数a,b"],
      ["变量", "a,b属于整数且a不为0"],
      ["最简形式", "gcd(a,b)=1"],
    ],
  },
  {
    label: "量词否定",
    fields: [
      ["原命题", "对所有n，P(n)成立"],
      ["否定", "存在n，使P(n)不成立"],
      ["提醒", "不是对所有n都不成立"],
    ],
    alert: "反证法的第一步是写出目标命题的准确否定；量词一旦否定错，后面的推导即使每行都正确，也证明不了原目标。",
  },
] as const;

const parityProofCases = [
  {
    label: "假设",
    fields: [
      ["否定目标", "假设sqrt(2)是有理数"],
      ["最简分数", "sqrt(2)=b/a"],
      ["条件", "a,b互质且a不为0"],
    ],
  },
  {
    label: "分子偶",
    fields: [
      ["平方去分母", "2a^2=b^2"],
      ["右边", "b^2为偶数"],
      ["推出", "b为偶数，写成b=2B"],
    ],
  },
  {
    label: "分母偶",
    fields: [
      ["代入", "2a^2=(2B)^2"],
      ["约去2", "a^2=2B^2"],
      ["推出", "a也为偶数"],
    ],
  },
  {
    label: "矛盾",
    fields: [
      ["假设给出", "gcd(a,b)=1"],
      ["推导给出", "2同时整除a,b"],
      ["结论", "假设为假，sqrt(2)无理"],
    ],
    alert: "“a与b都偶”本身不是矛盾；它必须与最简分数带来的“a与b互质”并列，才构成P与非P。",
  },
] as const;

const exponentCases = [
  {
    label: "左边",
    fields: [
      ["等式", "2a^2=b^2"],
      ["2的指数", "1+2v2(a)"],
      ["奇偶", "一定是奇数"],
    ],
  },
  {
    label: "右边",
    fields: [
      ["对象", "平方数b^2"],
      ["2的指数", "2v2(b)"],
      ["奇偶", "一定是偶数"],
    ],
  },
  {
    label: "唯一分解",
    fields: [
      ["等式要求", "两边每个质数指数相同"],
      ["实际", "2的指数一奇一偶"],
      ["结论", "等式不可能成立"],
    ],
  },
  {
    label: "逻辑骨架",
    fields: [
      ["起点", "假设not Q"],
      ["终点", "推出P且not P"],
      ["反证", "not Q为假，所以Q为真"],
    ],
    alert: "第二种证明不需要先把分数约成最简形式；质因数2的指数奇偶已经直接排除了任何整数分子、分母。",
  },
] as const;

export function Mg2ProofLanguageLab() {
  return <MathGirlOfficialLab cases={languageCases} caption="定义、命题、变量条件与量词否定共同决定了反证法究竟从哪里出发。" tone="amber" />;
}

export function Mg2SqrtTwoParityLab() {
  return <MathGirlOfficialLab cases={parityProofCases} caption="最简分数假设沿奇偶性传递到分子、分母同偶，最终撞上互质条件。" tone="cyan" />;
}

export function Mg2SqrtTwoExponentLab() {
  return <MathGirlOfficialLab cases={exponentCases} caption="质因数2的指数在等式两边一奇一偶，唯一分解把结构差异直接变成矛盾。" tone="emerald" />;
}
