"use client";

import { MathGirlOfficialLab } from "./official-lab";

const operatorCases = [
  {
    label: "连续邻点",
    fields: [
      ["位置", "x与x+h，令h趋近0"],
      ["变化率", "(f(x+h)-f(x))/h"],
      ["结果", "极限若存在，得到Df(x)"],
    ],
  },
  {
    label: "离散邻点",
    fields: [
      ["位置", "整数格点x与x+1"],
      ["变化量", "f(x+1)-f(x)"],
      ["结果", "无需取极限，得到Delta f(x)"],
    ],
  },
  {
    label: "共同结构",
    fields: [
      ["输入", "一个函数与相邻位置"],
      ["动作", "比较函数值变化"],
      ["目标", "构造降低复杂度的变化算子"],
    ],
  },
  {
    label: "关键差别",
    fields: [
      ["微分", "观察无限小尺度的局部斜率"],
      ["差分", "观察一个离散步长的精确变化"],
      ["警戒", "h=1的割线一般不等于h趋零的切线"],
    ],
    alert: "差分不是把导数公式里的h随手换成1；两者共享变化思想，但作用对象、尺度和自然基底不同。",
  },
] as const;

const basisCases = [
  {
    label: "一次",
    fields: [
      ["连续", "D x=1"],
      ["离散", "Delta x=1"],
      ["观察", "普通幂在一次时恰好对齐"],
    ],
  },
  {
    label: "二次",
    fields: [
      ["普通幂", "D x^2=2x，但Delta x^2=2x+1"],
      ["离散基底", "x下划2=x(x-1)"],
      ["对齐", "Delta x下划2=2x"],
    ],
  },
  {
    label: "三次",
    fields: [
      ["连续", "D x^3=3x^2"],
      ["离散", "Delta[x(x-1)(x-2)]=3x(x-1)"],
      ["结构", "次数降低1，前面的系数为3"],
    ],
  },
  {
    label: "一般n次",
    fields: [
      ["连续", "D x^n=n x^(n-1)"],
      ["离散", "Delta x下划n=n x下划(n-1)"],
      ["翻译", "普通幂对应下降阶乘幂"],
    ],
    alert: "要建立算子对应，不能强迫两个世界使用同一组表达式；选择让算子规则同形的自然基底才是关键。",
  },
] as const;

const travelCases = [
  {
    label: "连续指数",
    fields: [
      ["函数", "f(x)=e^x"],
      ["方程", "Df=f"],
      ["初值", "f(0)=1"],
    ],
  },
  {
    label: "离散指数",
    fields: [
      ["方程", "Delta E=E"],
      ["递推", "E(x+1)=2E(x)"],
      ["初值与解", "E(0)=1，所以E(x)=2^x"],
    ],
  },
  {
    label: "逆向运算",
    fields: [
      ["连续", "微分的逆向由积分恢复到常数"],
      ["离散", "差分的逆向由求和恢复到常数"],
      ["共同歧义", "变化算子会丢失加法常数"],
    ],
  },
  {
    label: "基本定理",
    fields: [
      ["连续", "积分导数得到端点函数值之差"],
      ["离散", "sum Delta f(k)=f(b)-f(a)"],
      ["机制", "中间项逐项抵消，只留边界"],
    ],
    alert: "对应关系保留的是算子结构，不是符号外观：e^x对应2^x，积分对应求和，普通幂对应下降阶乘幂。",
  },
] as const;

export function Mg1DerivativeDifferenceLab() {
  return <MathGirlOfficialLab cases={operatorCases} caption="连续世界把邻点距离压到0，离散世界把一步邻点当作不可再分的单位。" tone="cyan" />;
}

export function Mg1PowerBasisLab() {
  return <MathGirlOfficialLab cases={basisCases} caption="微分作用于普通幂，差分作用于下降阶乘幂时遵循同形的降次规则。" tone="violet" />;
}

export function Mg1TwoWorldTravelLab() {
  return <MathGirlOfficialLab cases={travelCases} caption="通过方程、基底和逆运算，在连续函数与离散函数两个世界之间翻译。" tone="emerald" />;
}
