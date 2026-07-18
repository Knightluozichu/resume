"use client";

import { MathGirlOfficialLab } from "./official-lab";

const timelineCases = [
  {
    label: "初等数论",
    fields: [
      ["17至19世纪", "费马FLT(4)、欧拉FLT(3)"],
      ["继续推进", "狄利克雷与勒让德FLT(5)、拉梅FLT(7)"],
      ["主要武器", "整除、互质、质数、无穷递降"],
    ],
  },
  {
    label: "代数数论",
    fields: [
      ["障碍", "一般整数环未必唯一分解"],
      ["库默尔", "理想数与正规质数"],
      ["戴德金", "用理想恢复唯一分解"],
    ],
  },
  {
    label: "几何数论",
    fields: [
      ["1955", "谷山与志村提出模性猜想"],
      ["1985至1986", "Frey、Serre、Ribet接通FLT"],
      ["1993至1994", "Wiles宣布证明并与Taylor修补缺口"],
    ],
  },
  {
    label: "1986逻辑景观",
    fields: [
      ["反设", "存在FLT反例"],
      ["Frey与Ribet", "得到半稳定但非模的椭圆曲线"],
      ["待证目标", "半稳定椭圆曲线全部模"],
    ],
    alert: "怀尔斯无需先证明所有椭圆曲线都模。Frey曲线是半稳定的，因此证明半稳定情形已经足以制造矛盾。",
  },
] as const;

const ellipticCases = [
  {
    label: "有理数域",
    fields: [
      ["方程", "y^2=x^3+Ax^2+Bx+C"],
      ["条件", "右侧三次多项式无重根"],
      ["示例", "y^2=x^3-x"],
    ],
  },
  {
    label: "归约到有限域",
    fields: [
      ["操作", "系数与坐标都取mod p"],
      ["好归约", "三次多项式仍无重根"],
      ["坏归约", "归约后出现奇点"],
    ],
  },
  {
    label: "逐点计数",
    fields: [
      ["F2", "s(2)=2"],
      ["F3", "s(3)=3"],
      ["F5", "s(5)=7"],
    ],
  },
  {
    label: "棱镜数列",
    fields: [
      ["定义", "s(p)=仿射解的个数"],
      ["完整点数", "#E(F_p)=s(p)+1"],
      ["迹", "a_p=p-s(p)"],
    ],
    alert: "原章的s(p)不计无穷远点。标准椭圆曲线点数会再加1，因此标准公式a_p=p+1-#E(F_p)正好等于p-s(p)。",
  },
] as const;

const bridgeCases = [
  {
    label: "模形式",
    fields: [
      ["对象", "上半平面上的全纯函数"],
      ["变换", "f((az+b)/(cz+d))=(cz+d)^2 f(z)"],
      ["权", "指数2表示权为2"],
    ],
  },
  {
    label: "q展开",
    fields: [
      ["变量", "q=e^(2πiz)"],
      ["乘积", "qΠ(1-q^(4k))^2(1-q^(8k))^2"],
      ["系数", "F(q)=Σa(n)q^n"],
    ],
  },
  {
    label: "两个世界对应",
    fields: [
      ["椭圆曲线侧", "每个质数给出a_p=p-s(p)"],
      ["模形式侧", "q展开给出系数a(p)"],
      ["桥梁", "两侧质数系数相同"],
    ],
  },
  {
    label: "Frey矛盾",
    fields: [
      ["入口券", "FLT反例构造Frey曲线"],
      ["Wiles桥", "半稳定曲线必须对应模形式"],
      ["Ribet出口", "却迫使权2、level 2形式存在，而该空间为0"],
    ],
    alert: "Frey曲线不是“一个模形式”；它是椭圆曲线。所谓模性，是存在一个模形式，使两者的局部点数或L函数数据对应。",
  },
] as const;

const tripleCases = [
  {
    label: "相邻平方",
    fields: [
      ["平方", "(2k)^2与(2k+1)^2"],
      ["差", "4k+1"],
      ["目标", "令差成为奇数平方"],
    ],
  },
  {
    label: "参数选择",
    fields: [
      ["令", "k=j(j-1)"],
      ["奇边", "b=2j-1"],
      ["偶边", "a=2j(j-1)"],
    ],
  },
  {
    label: "勾股恒等式",
    fields: [
      ["斜边", "c=2j(j-1)+1"],
      ["关系", "a^2+b^2=c^2"],
      ["示例", "j=2给出(3,4,5)"],
    ],
  },
  {
    label: "基本性与无限性",
    fields: [
      ["相邻", "c-a=1"],
      ["互质", "a、b、c两两互质"],
      ["无限", "j=2,3,4,...给出无穷多组"],
    ],
    alert: "写出勾股恒等式还不够。必须补证两两互质，才能说明构造的是基本勾股数，而不是同一组边长的倍数。",
  },
] as const;

export function Mg2FltTimelineLab() {
  return <MathGirlOfficialLab cases={timelineCases} caption="从逐个指数到理想，再到Frey曲线与模性，历史每次受阻都推动了新结构诞生。" tone="amber" />;
}

export function Mg2FiniteFieldEllipticLab() {
  return <MathGirlOfficialLab cases={ellipticCases} caption="把一条有理椭圆曲线投影到每个有限域，逐点计数形成可与模形式比较的数列。" tone="cyan" />;
}

export function Mg2ModularityBridgeLab() {
  return <MathGirlOfficialLab cases={bridgeCases} caption="q展开系数与有限域点数在质数处对齐，模性把两个来源完全不同的世界连在一起。" tone="emerald" />;
}

export function Mg2PrimitiveTripleLab() {
  return <MathGirlOfficialLab cases={tripleCases} caption="庆功宴上的第二条路线：从相邻平方的差构造无穷多组基本勾股数。" tone="violet" />;
}
