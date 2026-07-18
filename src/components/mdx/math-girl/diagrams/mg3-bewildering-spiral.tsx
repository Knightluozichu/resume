"use client";

import { MathGirlOfficialLab } from "./official-lab";

const unitCircleCases = [
  {
    label: "单位圆坐标",
    fields: [
      ["圆周点", "P=(cos θ, sin θ)"],
      ["正弦", "P的纵坐标y"],
      ["余弦", "P的横坐标x"],
    ],
  },
  {
    label: "45度",
    fields: [
      ["几何", "等腰直角三角形"],
      ["方程", "y²+y²=1"],
      ["结果", "sin 45°=√2/2"],
    ],
  },
  {
    label: "60度",
    fields: [
      ["几何", "单位边长正三角形的一半"],
      ["方程", "y²+(1/2)²=1"],
      ["结果", "sin 60°=√3/2"],
    ],
  },
  {
    label: "圆的对称",
    fields: [
      ["左右对称", "sin 120°=sin 60°"],
      ["上下对称", "sin(180°+θ)=-sin θ"],
      ["值域", "-1≤sin θ≤1"],
    ],
    alert: "角度加倍不会让正弦值线性加倍。特殊角的值来自单位圆中的几何约束，而不是角度数字的比例。",
  },
] as const;

const sineCurveCases = [
  {
    label: "离散采样",
    fields: [
      ["角度", "0°, 30°, 45°, 60°, 90°"],
      ["高度", "0, 1/2, √2/2, √3/2, 1"],
      ["动作", "标出(θ, sin θ)"],
    ],
  },
  {
    label: "连接成曲线",
    fields: [
      ["横轴", "角度θ"],
      ["纵轴", "高度y=sin θ"],
      ["结果", "正弦曲线"],
    ],
  },
  {
    label: "两张不同的图",
    fields: [
      ["单位圆", "横轴x，纵轴y"],
      ["正弦图", "横轴θ，纵轴y"],
      ["共同来源", "同一个圆周点的运动"],
    ],
  },
  {
    label: "周期展开",
    fields: [
      ["转一圈", "θ增加2π"],
      ["高度", "保持相同"],
      ["公式", "sin(θ+2π)=sin θ"],
    ],
    alert: "单位圆和正弦曲线不是同一张坐标图。前者记录位置(x,y)，后者把运动参数θ与高度y重新配对。",
  },
] as const;

const radiansCases = [
  {
    label: "弧长比",
    fields: [
      ["弧长", "s"],
      ["半径", "r"],
      ["弧度", "θ=s/r"],
    ],
  },
  {
    label: "完整一圈",
    fields: [
      ["圆周长", "s=2πr"],
      ["相除", "s/r=2π"],
      ["换算", "360°=2π rad"],
    ],
  },
  {
    label: "特殊角",
    fields: [
      ["180°", "π rad"],
      ["90°", "π/2 rad"],
      ["60°", "π/3 rad"],
    ],
  },
  {
    label: "缩放圆",
    fields: [
      ["半径变为kr", "弧长变为ks"],
      ["比值", "ks/(kr)=s/r"],
      ["结论", "角度与圆的大小无关"],
    ],
    alert: "弧长本身依赖半径，弧长与半径的比才只依赖中心角。这正是弧度能测量角度的原因。",
  },
] as const;

const quotientCases = [
  {
    label: "转圈取余",
    fields: [
      ["输入", "任意实数角θ"],
      ["周期", "2π"],
      ["标准位置", "θ mod 2π"],
    ],
  },
  {
    label: "同余关系",
    fields: [
      ["条件", "x-y=2πn"],
      ["记号", "x≡y (mod 2π)"],
      ["性质", "自反、对称、传递"],
    ],
  },
  {
    label: "角的商集",
    fields: [
      ["原集合", "实数R"],
      ["一个角", "{θ+2πn | n∈Z}"],
      ["商集", "R/(2πZ)"],
    ],
  },
  {
    label: "螺旋投影",
    fields: [
      ["三维轨迹", "(cos t, sin t, ct)"],
      ["俯视投影", "(cos t, sin t)"],
      ["含义", "投影重合，所在高度仍不同"],
    ],
    alert: "模2π只保留圆周位置，会忘掉转过多少圈。灯塔螺旋楼梯补回高度，说明反复经过同一方向不等于停在原地。",
  },
] as const;

export function Mg3UnitCircleLab() {
  return (
    <MathGirlOfficialLab
      cases={unitCircleCases}
      caption="从圆周点的纵坐标定义正弦，再借45度、60度三角形和圆的对称性求出一圈内的关键值。"
      tone="cyan"
    />
  );
}

export function Mg3SineCurveLab() {
  return (
    <MathGirlOfficialLab
      cases={sineCurveCases}
      caption="把单位圆运动重新编码成(角度, 高度)点列，离散采样便展开为周期性的正弦曲线。"
      tone="violet"
    />
  );
}

export function Mg3RadiansLab() {
  return (
    <MathGirlOfficialLab
      cases={radiansCases}
      caption="弧度用弧长与半径的无量纲比测量角度，因此完整一圈自然得到2π，而不是人为选定的360。"
      tone="emerald"
    />
  );
}

export function Mg3AngleQuotientLab() {
  return (
    <MathGirlOfficialLab
      cases={quotientCases}
      caption="角度模2π把无数实数压成同一圆周位置；螺旋楼梯则展示被商映射遗忘的圈数与高度。"
      tone="amber"
    />
  );
}
