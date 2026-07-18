"use client";

import { MathGirlOfficialLab } from "./official-lab";

const auditCases = [
  {
    label: "整数加法",
    fields: [
      ["闭合", "整数加整数仍是整数"],
      ["单位元", "0"],
      ["逆元", "a的逆元是-a"],
    ],
  },
  {
    label: "奇数加法",
    fields: [
      ["测试", "1+3=4"],
      ["失败点", "结果不是奇数"],
      ["结论", "不满足闭合性，不是群"],
    ],
  },
  {
    label: "偶数加法",
    fields: [
      ["闭合", "偶数加偶数仍是偶数"],
      ["单位元", "0是偶数"],
      ["逆元", "偶数a的-a仍是偶数"],
    ],
  },
  {
    label: "整数乘法",
    fields: [
      ["闭合与结合", "成立"],
      ["单位元", "1"],
      ["失败点", "2在整数中没有乘法逆元"],
    ],
    alert: "集合本身不能脱离运算被称为群；同一个Z关于加法是群，关于乘法却不是群。",
  },
] as const;

const tinyCases = [
  {
    label: "最小群",
    fields: [
      ["集合", "{e}"],
      ["运算", "e*e=e"],
      ["逆元", "e自身"],
    ],
  },
  {
    label: "二元素群",
    fields: [
      ["集合", "{e,a}"],
      ["强制项", "e*a=a*e=a"],
      ["剩余项", "a*a=e"],
    ],
  },
  {
    label: "错误表",
    fields: [
      ["若a*a", "等于a"],
      ["问题", "a所在行没有e"],
      ["失败点", "a没有逆元"],
    ],
  },
  {
    label: "同构",
    fields: [
      ["抽象表", "{e,a}"],
      ["奇偶表", "{偶,奇}关于加法"],
      ["符号表", "{+1,-1}关于乘法"],
    ],
    alert: "元素名字和运算符号可以不同；只要存在保持运算的一一对应，它们表达的群结构就相同。",
  },
] as const;

const abelianCases = [
  {
    label: "两种律",
    fields: [
      ["结合律", "(a*b)*c=a*(b*c)"],
      ["交换律", "a*b=b*a"],
      ["区别", "前者移括号，后者换元素位置"],
    ],
  },
  {
    label: "阿贝尔群",
    fields: [
      ["基础", "满足全部群公理"],
      ["额外条件", "任意两元素可交换"],
      ["反例方向", "矩阵乘法群一般不交换"],
    ],
  },
  {
    label: "单位根",
    fields: [
      ["集合", "{1,zeta,...,zeta^(n-1)}"],
      ["运算", "复数乘法"],
      ["几何", "正n边形顶点按角度相加"],
    ],
  },
  {
    label: "读数学句",
    fields: [
      ["对象", "椭圆曲线上的点集"],
      ["需要定义", "点之间的运算"],
      ["必须验证", "四条群公理加交换律"],
    ],
    alert: "“有阿贝尔群结构”不是说对象长得像群，而是说存在一个具体运算，使该集合逐条满足阿贝尔群公理。",
  },
] as const;

export function Mg2GroupAxiomAuditLab() {
  return <MathGirlOfficialLab cases={auditCases} caption="把集合与运算一起送入四条群公理，最快的失败项就决定它是不是群。" tone="amber" />;
}

export function Mg2TinyGroupIsomorphismLab() {
  return <MathGirlOfficialLab cases={tinyCases} caption="单位元、逆元与闭合性强制填满小群运算表，同构则抹去元素名字的表面差异。" tone="cyan" />;
}

export function Mg2AbelianRootsLab() {
  return <MathGirlOfficialLab cases={abelianCases} caption="交换律把群升级为阿贝尔群，单位根在复平面上把抽象公理画成正多边形。" tone="emerald" />;
}
