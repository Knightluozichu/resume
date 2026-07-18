"use client";

import { MathGirlOfficialLab } from "./official-lab";

const structureCases = [
  {
    label: "基本对象",
    fields: [
      ["方程", "a^2+b^2=c^2"],
      ["自然数", "a,b,c均为正整数"],
      ["基本", "gcd(a,b,c)=1"],
    ],
  },
  {
    label: "奇偶约束",
    fields: [
      ["不可能", "a,b同偶会与基本条件冲突"],
      ["不可能", "a,b同奇会使模4左右矛盾"],
      ["结论", "a,b一奇一偶，c为奇数"],
    ],
  },
  {
    label: "乘积形式",
    fields: [
      ["移项", "b^2=c^2-a^2"],
      ["分解", "b^2=(c-a)(c+a)"],
      ["减半", "c-a=2A, b=2B, c+a=2C"],
    ],
  },
  {
    label: "平方拆分",
    fields: [
      ["关系", "B^2=AC"],
      ["条件", "gcd(A,C)=1"],
      ["唯一分解", "A与C分别必须是平方数"],
    ],
    alert: "从B^2=AC直接断言A、C为平方数是错的；A与C互质这一条件负责阻止同一质因数的奇指数分散在两边。",
  },
] as const;

const parameterCases = [
  {
    label: "输入",
    fields: [
      ["参数", "m>n>0"],
      ["互质", "gcd(m,n)=1"],
      ["奇偶", "m,n一奇一偶"],
    ],
  },
  {
    label: "榨汁公式",
    fields: [
      ["直角边", "a=m^2-n^2"],
      ["另一直角边", "b=2mn"],
      ["斜边", "c=m^2+n^2"],
    ],
  },
  {
    label: "验算",
    fields: [
      ["平方和", "(m^2-n^2)^2+(2mn)^2"],
      ["展开", "m^4+2m^2n^2+n^4"],
      ["结果", "(m^2+n^2)^2"],
    ],
  },
  {
    label: "无穷构造",
    fields: [
      ["固定", "n=2"],
      ["变化", "m取任意大于2的奇质数"],
      ["结论", "得到无穷多个不同基本勾股数"],
    ],
    alert: "公式给出勾股数还不自动保证“基本”；参数互质且奇偶相反正是排除公共因子的必要约束。",
  },
] as const;

const circleCases = [
  {
    label: "单位圆",
    fields: [
      ["方程", "x^2+y^2=1"],
      ["固定点", "P=(-1,0)"],
      ["参数", "过P作斜率为t的直线"],
    ],
  },
  {
    label: "联立",
    fields: [
      ["直线", "y=t(x+1)"],
      ["已知根", "x=-1对应固定点P"],
      ["另一交点", "Q=((1-t^2)/(1+t^2), 2t/(1+t^2))"],
    ],
  },
  {
    label: "有理性",
    fields: [
      ["若t有理", "Q的两个坐标均有理"],
      ["若Q不是P", "连线PQ的斜率t有理"],
      ["对应", "有理斜率与圆上有理点一一对应"],
    ],
  },
  {
    label: "两世界",
    fields: [
      ["整数到圆", "(a,b,c)映到(a/c,b/c)"],
      ["圆到整数", "有理坐标清除分母后得到勾股数"],
      ["本质", "代数方程解与几何圆点是同一结构"],
    ],
    alert: "参数t取遍有理数会覆盖除P以外的圆上有理点；固定点P需要单独补回，不能在消去已知根时悄悄遗失。",
  },
] as const;

export function Mg2PythagoreanStructureLab() {
  return <MathGirlOfficialLab cases={structureCases} caption="奇偶性、乘积形式、互质与唯一分解逐步把一个平方和方程拆成两个独立平方。" tone="amber" />;
}

export function Mg2PythagoreanJuicerLab() {
  return <MathGirlOfficialLab cases={parameterCases} caption="互质且奇偶相反的两个参数进入公式，产出且仅产出基本勾股数的标准形。" tone="cyan" />;
}

export function Mg2UnitCircleBridgeLab() {
  return <MathGirlOfficialLab cases={circleCases} caption="过固定有理点的有理斜率直线参数化单位圆，并把整数勾股数与几何有理点连接起来。" tone="emerald" />;
}
