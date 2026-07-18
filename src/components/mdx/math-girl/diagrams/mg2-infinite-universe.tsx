"use client";

import { MathGirlOfficialLab } from "./official-lab";

const propertyCases = [
  {
    label: "末位",
    fields: [
      ["对象", "101, 321, 681, 991, 450, 811"],
      ["判据", "只有450不以1结尾"],
      ["提醒", "答案必须连同区分性质一起给出"],
    ],
  },
  {
    label: "质合",
    fields: [
      ["对象", "11, 31, 41, 51, 61, 71"],
      ["判据", "51=3x17，是唯一合数"],
      ["工具", "试除到平方根即可判定"],
    ],
  },
  {
    label: "平方",
    fields: [
      ["对象", "100, 225, 121, 256, 288, 361"],
      ["判据", "只有288不是整数平方"],
      ["结构", "其余分别为10,15,11,16,19的平方"],
    ],
  },
  {
    label: "模4",
    fields: [
      ["对象", "239, 251, 257, 263, 271, 283"],
      ["判据", "只有257除以4余1，其余余3"],
      ["伏笔", "余数分类将在高斯整数中再次出现"],
    ],
    alert: "“看起来不同”不是数学答案；必须先声明同一判别性质，再验证它对一个对象失败而对其余对象成立。",
  },
] as const;

const orbitCases = [
  {
    label: "步长2",
    fields: [
      ["序列", "2,4,6,8,10,12"],
      ["访问数", "6"],
      ["图形", "六边形，只经过偶数"],
    ],
  },
  {
    label: "步长3",
    fields: [
      ["序列", "3,6,9,12"],
      ["访问数", "4"],
      ["最小巡回数", "3"],
    ],
  },
  {
    label: "步长5",
    fields: [
      ["序列", "5,10,3,8,1,6,11,4,9,2,7,12"],
      ["访问数", "12"],
      ["结论", "完全巡回"],
    ],
  },
  {
    label: "步长7",
    fields: [
      ["序列", "7,2,9,4,11,6,1,8,3,10,5,12"],
      ["对称", "与步长5经过同一组点，方向相反"],
      ["原因", "7=12-5，对应每次走负5步"],
    ],
    alert: "图形画得封闭不等于完全巡回；必须核对是否在第一次返回起点前访问了全部表盘位置。",
  },
] as const;

const gcdCases = [
  {
    label: "分解",
    fields: [
      ["设定", "d=gcd(n,k), n=d*n', k=d*k'"],
      ["约化", "gcd(n',k')=1"],
      ["返回条件", "n整除r*k，等价于n'整除r"],
    ],
  },
  {
    label: "轨道长度",
    fields: [
      ["首次返回", "r=n'=n/d"],
      ["访问数", "n/gcd(n,k)"],
      ["访问位置", "d,2d,...,n"],
    ],
  },
  {
    label: "完全巡回",
    fields: [
      ["条件", "访问数等于n"],
      ["等价", "gcd(n,k)=1"],
      ["名称", "n与k互质"],
    ],
  },
  {
    label: "超大表盘",
    fields: [
      ["规模", "100, 1000或100000000都适用"],
      ["计算", "只求一次最大公约数"],
      ["意义", "有限规律替代无法完成的逐点穷举"],
    ],
    alert: "从12点表盘观察出的模式只是猜想；一般n的结论要由整除关系证明，不能把有限样本直接当作全称证据。",
  },
] as const;

export function Mg2PropertyLensLab() {
  return <MathGirlOfficialLab cases={propertyCases} caption="同一组数字可从末位、因数、平方或余数等不同视角观察，关键是明确并验证判别性质。" tone="violet" />;
}

export function Mg2ClockOrbitLab() {
  return <MathGirlOfficialLab cases={orbitCases} caption="时钟巡回把反复加同一步长变成有限轨道；互补步长经过相同位置但方向相反。" tone="cyan" />;
}

export function Mg2GcdCriterionLab() {
  return <MathGirlOfficialLab cases={gcdCases} caption="最大公约数同时决定最小巡回数、轨道长度和能否完全巡回，把有限实验提升为任意规模定理。" tone="emerald" />;
}
