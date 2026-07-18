"use client";

import { MathGirlOfficialLab } from "./official-lab";

const complexCases = [
  {
    label: "方程定义",
    fields: [
      ["一次方程", "m+1=0定义m=-1"],
      ["二次方程", "i^2+1=0定义i"],
      ["两个解", "x^2=-1的解为+i与-i"],
    ],
  },
  {
    label: "复数加法",
    fields: [
      ["输入", "(1+2i)+(3+i)"],
      ["输出", "4+3i"],
      ["几何", "向量相加与平行四边形对角线"],
    ],
  },
  {
    label: "复数乘法",
    fields: [
      ["绝对值", "|zw|=|z||w|"],
      ["幅角", "arg(zw)=arg(z)+arg(w)"],
      ["几何", "缩放并旋转"],
    ],
  },
  {
    label: "正负i",
    fields: [
      ["+i", "长度1，角度+90度"],
      ["-i", "长度1，角度-90度"],
      ["平方", "两次旋转都到达-1"],
    ],
    alert: "x^2=-1有+i和-i两个解；只回答i会遗漏顺时针旋转90度后再旋转一次的第二条路线。",
  },
] as const;

const latticeCases = [
  {
    label: "目标",
    fields: [
      ["输入", "任意五个整数格点"],
      ["选择", "找到两点P与Q"],
      ["目标", "中点M仍是整数格点"],
    ],
  },
  {
    label: "四个类别",
    fields: [
      ["类别1", "(偶,偶)"],
      ["类别2/3", "(偶,奇)或(奇,偶)"],
      ["类别4", "(奇,奇)"],
    ],
  },
  {
    label: "鸽笼原理",
    fields: [
      ["鸽子", "五个格点"],
      ["鸽笼", "四种坐标奇偶类别"],
      ["保证", "至少两点落在同一类"],
    ],
  },
  {
    label: "中点",
    fields: [
      ["同奇偶横坐标", "x1+x2为偶数"],
      ["同奇偶纵坐标", "y1+y2为偶数"],
      ["结论", "各除以2仍为整数"],
    ],
    alert: "逐对试算只能验证某个例子；四类奇偶性加鸽笼原理才覆盖任意摆放的五个格点。",
  },
] as const;

const gaussianCases = [
  {
    label: "数域扩张",
    fields: [
      ["整数", "Z是一维数轴上的格点"],
      ["高斯整数", "Z[i]={a+bi | a,b属于Z}"],
      ["几何", "二维复平面上的全部整数格点"],
    ],
  },
  {
    label: "2的分裂",
    fields: [
      ["整数世界", "2是质数"],
      ["高斯整数世界", "2=(1+i)(1-i)"],
      ["范数", "两个因子的范数都为2"],
    ],
  },
  {
    label: "模4为1",
    fields: [
      ["例子", "5=(1+2i)(1-2i)"],
      ["一般形状", "p=a^2+b^2"],
      ["结果", "p=(a+bi)(a-bi)"],
    ],
  },
  {
    label: "模4为3",
    fields: [
      ["例子", "3,7,11,19"],
      ["平方和障碍", "a^2+b^2模4不可能为3"],
      ["结果", "这些有理质数在Z[i]中仍为质数"],
    ],
    alert: "“可以粉碎”依赖允许使用的因子集合。2在Z里不可分，在更大的Z[i]里却可分；质数性必须连同所在的数系一起说明。",
  },
] as const;

export function Mg2ComplexPlaneLab() {
  return <MathGirlOfficialLab cases={complexCases} caption="从方程定义新数，到复平面上把加法画成平移、把乘法画成缩放与旋转。" tone="cyan" />;
}

export function Mg2FiveLatticePointsLab() {
  return <MathGirlOfficialLab cases={latticeCases} caption="五个格点落入四种坐标奇偶类别，鸽笼原理强制出现一对整数中点。" tone="amber" />;
}

export function Mg2GaussianPrimeLab() {
  return <MathGirlOfficialLab cases={gaussianCases} caption="整数扩张到高斯整数后，质数的分裂行为由范数、平方和与模4余数组织起来。" tone="emerald" />;
}
