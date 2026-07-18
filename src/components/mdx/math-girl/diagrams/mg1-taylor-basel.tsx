"use client";

import { MathGirlOfficialLab } from "./official-lab";

const taylorCases = [
  {
    label: "幂级数",
    fields: [
      ["假设", "f(x)=sum a(n)x^n"],
      ["目标", "从函数本身恢复所有系数"],
      ["工具", "反复微分后代入x=0"],
    ],
  },
  {
    label: "系数提取",
    fields: [
      ["m次微分", "f^(m)(0)=m!*a(m)"],
      ["系数", "a(m)=f^(m)(0)/m!"],
      ["边界", "逐项微分需要收敛与可微条件"],
    ],
  },
  {
    label: "正弦周期",
    fields: [
      ["导数", "sin, cos, -sin, -cos四步循环"],
      ["偶次系数", "全部为0"],
      ["奇次系数", "符号交替，分母为(2k+1)!"],
    ],
  },
  {
    label: "近似验收",
    fields: [
      ["部分和", "x-x^3/3!+...+(-1)^m x^(2m+1)/(2m+1)!"],
      ["误差", "下一阶余项受阶乘快速压低"],
      ["图像", "次数提高后在更大区间贴近sin x"],
    ],
    alert: "写出若干系数不等于证明函数等于其泰勒级数；还要控制余项趋于0并说明逐项运算的合法区间。",
  },
] as const;

const factorCases = [
  {
    label: "有限多项式",
    fields: [
      ["定理", "复系数n次多项式有n个根，重数计入"],
      ["分解", "P(x)=a(n) product(x-r(k))"],
      ["规模", "根之外还需最高次系数"],
    ],
  },
  {
    label: "正弦零点",
    fields: [
      ["零点", "x=0, ±pi, ±2pi,..."],
      ["配对", "正负根合成1-x^2/(n^2*pi^2)"],
      ["规范化", "除以x后在x趋0时极限为1"],
    ],
  },
  {
    label: "无限乘积",
    fields: [
      ["候选", "sin(x)/x=product(1-x^2/(n^2*pi^2))"],
      ["必要证据", "收敛、零点重数、规范化与增长控制"],
      ["风险", "同一零点集合仍可乘非零函数"],
    ],
  },
  {
    label: "有限截断",
    fields: [
      ["做法", "先展开前N个因子"],
      ["x^2系数", "-sum(n=1..N)1/(n^2*pi^2)"],
      ["极限", "利用sum 1/n^2收敛再令N趋于无穷"],
    ],
    alert: "零点列表只能提示因子，不能单独确定整函数；无限情形没有“最高次系数”可自动调整整体规模。",
  },
] as const;

const baselCases = [
  {
    label: "和的形式",
    fields: [
      ["展开", "sin(x)/x=1-x^2/3!+x^4/5!-..."],
      ["x^2系数", "-1/6"],
      ["来源", "正弦泰勒展开"],
    ],
  },
  {
    label: "积的形式",
    fields: [
      ["展开", "product(1-x^2/(n^2*pi^2))"],
      ["x^2系数", "-(1/pi^2)sum 1/n^2"],
      ["来源", "每次只从一个因子选择x^2项"],
    ],
  },
  {
    label: "比较系数",
    fields: [
      ["等式", "-1/6=-(1/pi^2)zeta(2)"],
      ["结果", "zeta(2)=pi^2/6"],
      ["检查", "部分和数值约为1.644934"],
    ],
  },
  {
    label: "继续挑战",
    fields: [
      ["x^4系数", "给出成对倒数乘积之和"],
      ["结合zeta(2)", "可推出zeta(4)=pi^4/90"],
      ["一般现象", "zeta(2m)是pi^(2m)乘有理数"],
    ],
    alert: "数值逼近只能验证结果，真正桥梁是同一函数的和式与积式在合法展开后拥有相同系数。",
  },
] as const;

export function Mg1TaylorCoefficientLab() {
  return <MathGirlOfficialLab cases={taylorCases} caption="反复微分把幂级数系数逐个送到常数项，余项控制负责把形式计算升级为函数等式。" tone="cyan" />;
}

export function Mg1SineFactorizationLab() {
  return <MathGirlOfficialLab cases={factorCases} caption="有限多项式的根与因式启发正弦无限乘积，但无限情形还需收敛、规模和增长证据。" tone="violet" />;
}

export function Mg1BaselCoefficientLab() {
  return <MathGirlOfficialLab cases={baselCases} caption="同一函数的和式与积式比较x平方系数，把正弦零点中的pi带入整数平方倒数和。" tone="emerald" />;
}
