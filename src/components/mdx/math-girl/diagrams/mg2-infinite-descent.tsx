"use client";

import { MathGirlOfficialLab } from "./official-lab";

const triangleCases = [
  {
    label: "平方面积",
    fields: [
      ["直角条件", "A^2+B^2=C^2"],
      ["面积条件", "AB/2=D^2"],
      ["等价写法", "AB=2D^2"],
    ],
  },
  {
    label: "基本勾股数",
    fields: [
      ["约去公因子", "取gcd(A,B,C)=1"],
      ["奇偶", "A,B恰有一边为偶数"],
      ["目的", "启用勾股数一般形式"],
    ],
  },
  {
    label: "毕达哥拉参数",
    fields: [
      ["奇边", "A=m^2-n^2"],
      ["偶边", "B=2mn"],
      ["斜边", "C=m^2+n^2"],
    ],
  },
  {
    label: "旅行起点",
    fields: [
      ["代入面积", "D^2=mn(m+n)(m-n)"],
      ["关键条件", "四个因子两两互质"],
      ["下一步", "平方乘积迫使每因子为平方"],
    ],
    alert: "必须先约成基本勾股数并保留m、n互质且奇偶相反；否则四因子两两互质的武器并不成立。",
  },
] as const;

const particleCases = [
  {
    label: "原子到粒子",
    fields: [
      ["m", "e^2"],
      ["n", "f^2"],
      ["m+n 与 m-n", "s^2 与 t^2"],
    ],
  },
  {
    label: "研究和差",
    fields: [
      ["s,t", "互质奇数"],
      ["X=(s+t)/2", "整数"],
      ["Y=(s-t)/2", "整数且gcd(X,Y)=1"],
    ],
  },
  {
    label: "质因数分配",
    fields: [
      ["关系", "f^2=2XY"],
      ["一奇一偶", "X,Y恰有一个偶数"],
      ["结论", "{X,Y}={2u^2,v^2}"],
    ],
  },
  {
    label: "新三角形",
    fields: [
      ["两直角边", "A1=2u^2, B1=v^2"],
      ["斜边", "C1=e"],
      ["平方面积", "D1=uv"],
    ],
    alert: "新对象必须同时满足A1^2+B1^2=C1^2与A1B1=2D1^2；只找到一个更小数字还不构成无穷递降。",
  },
] as const;

const descentCases = [
  {
    label: "严格变小",
    fields: [
      ["旧斜边", "C=m^2+n^2"],
      ["中间关系", "m=e^2"],
      ["新斜边", "C1=e，因此C>e^2>e"],
    ],
  },
  {
    label: "最小反例",
    fields: [
      ["假设", "存在平方面积整数直角三角形"],
      ["良序性", "可选斜边最小者C"],
      ["矛盾", "又构造出更小的C1"],
    ],
  },
  {
    label: "无限链",
    fields: [
      ["重复构造", "C>C1>C2>..."],
      ["不可能性", "正整数不能无限严格下降"],
      ["结论", "原假设不成立"],
    ],
  },
  {
    label: "拼到FLT(4)",
    fields: [
      ["假设", "a^4+b^4=c^4"],
      ["构造", "A=b^4, B=2a^2c^2"],
      ["冲突", "所得整数直角三角形面积为(ab^2c)^2"],
    ],
    alert: "这里证明的是费马大定理的四次方情形。它是全定理的重要拼图，但不能冒充所有指数的完整证明。",
  },
] as const;

export function Mg2SquareAreaTriangleLab() {
  return <MathGirlOfficialLab cases={triangleCases} caption="把图形问题翻译成基本勾股数参数，得到平方数与四个互质因子的乘积。" tone="cyan" />;
}

export function Mg2ParticleFactorizationLab() {
  return <MathGirlOfficialLab cases={particleCases} caption="原子、基本粒子与夸克只是变量层级；每一层都在保存互质、奇偶和平方指数信息。" tone="amber" />;
}

export function Mg2DescentFltLab() {
  return <MathGirlOfficialLab cases={descentCases} caption="同型构造与严格变小共同触发无穷递降，再把结论嵌入费马四次方证明。" tone="emerald" />;
}
