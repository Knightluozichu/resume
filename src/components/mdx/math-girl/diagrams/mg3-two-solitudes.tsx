"use client";

import { MathGirlOfficialLab } from "./official-lab";

const overlapCases = [
  {
    label: "卡片定义",
    fields: [
      ["对象", "正自然数对(a,b)"],
      ["重叠", "a+d=b+c"],
      ["记号", "(a,b)~(c,d)"],
    ],
  },
  {
    label: "具体例子",
    fields: [
      ["(1,2)与(2,3)", "1+3=2+2"],
      ["(3,1)与(4,2)", "3+2=1+4"],
      ["观察", "外项之和等于内项之和"],
    ],
  },
  {
    label: "差值压缩",
    fields: [
      ["若已知整数", "a-b=c-d"],
      ["同一类", "拥有相同形式差值"],
      ["限制", "定义本身不能预用负数减法"],
    ],
  },
  {
    label: "格点斜线",
    fields: [
      ["平面", "(a,b)是第一象限格点"],
      ["等价类", "斜率1的平行格点线"],
      ["射影", "每条线对应一个整数"],
    ],
    alert: "a-b帮助发现结构，但从自然数构造整数时，真正定义必须保留只含自然数加法的a+d=b+c。",
  },
] as const;

const integerCases = [
  {
    label: "商集整数",
    fields: [
      ["全集", "S=N₊×N₊"],
      ["整数", "Z:=S/~"],
      ["元素", "等价类[a,b]"],
    ],
  },
  {
    label: "逐分量加法",
    fields: [
      ["定义", "[a,b]+[c,d]=[a+c,b+d]"],
      ["零元", "[1,1]代表0"],
      ["负元", "-[a,b]=[b,a]"],
    ],
  },
  {
    label: "代表元变化",
    fields: [
      ["同一整数", "[1,2]=[2,3]=[3,4]"],
      ["选择", "计算可从任意代表开始"],
      ["风险", "结果可能依赖选择"],
    ],
  },
  {
    label: "良定义",
    fields: [
      ["前提", "(a,b)~(a',b')且(c,d)~(c',d')"],
      ["推出", "(a+c,b+d)~(a'+c',b'+d')"],
      ["结论", "和的等价类与代表元无关"],
    ],
    alert: "商集上的运算只有在代表元更换不改变结果等价类时才真正成立。",
  },
] as const;

const equivalenceCases = [
  {
    label: "自反律",
    fields: [
      ["公式", "x~x"],
      ["重叠关系", "a+b=b+a"],
      ["含义", "每个元素与自身同类"],
    ],
  },
  {
    label: "对称律",
    fields: [
      ["公式", "x~y ⇒ y~x"],
      ["动作", "交换关系两端"],
      ["重叠关系", "由a+d=b+c得c+b=d+a"],
    ],
  },
  {
    label: "传递律",
    fields: [
      ["公式", "x~y且y~z ⇒ x~z"],
      ["动作", "跨过中间元素"],
      ["证明", "相加两式并消去中间项"],
    ],
  },
  {
    label: "关系对比",
    fields: [
      ["等号", "三条都成立"],
      ["小于", "只有传递"],
      ["不等于", "只有对称"],
    ],
    alert: "性质必须对集合中所有元素成立；一个反例足以否定某条律，若干成功例子却不能替代全称证明。",
  },
] as const;

const quotientCases = [
  {
    label: "整数商集",
    fields: [
      ["原集合", "正自然数对"],
      ["关系", "外项之和=内项之和"],
      ["商集", "每个差值类成为一个整数"],
    ],
  },
  {
    label: "有理数商集",
    fields: [
      ["原集合", "整数与非零整数的对"],
      ["关系", "(a,b)~(c,d) iff ad=bc"],
      ["商集", "每个比值类成为一个有理数"],
    ],
  },
  {
    label: "模3商集",
    fields: [
      ["原集合", "整数Z"],
      ["关系", "差是3的倍数"],
      ["商集", "余0、余1、余2三类"],
    ],
  },
  {
    label: "同年级商集",
    fields: [
      ["原集合", "学校所有学生"],
      ["关系", "属于同一年级"],
      ["商集", "高一、高二、高三三个集合"],
    ],
    alert: "商集的元素不是原来的单个对象，而是由彼此等价的原对象组成的集合。",
  },
] as const;

export function Mg3OverlapPairsLab() {
  return (
    <MathGirlOfficialLab
      cases={overlapCases}
      caption="从卡片上的交叉和条件走到差值与格点斜线，同一整数逐渐显现为一整类重叠的自然数对。"
      tone="cyan"
    />
  );
}

export function Mg3IntegerQuotientLab() {
  return (
    <MathGirlOfficialLab
      cases={integerCases}
      caption="商集把每条斜线压成一个整数，逐分量加法只有通过代表元无关性检验后才能落到这些类上。"
      tone="emerald"
    />
  );
}

export function Mg3EquivalenceRelationLab() {
  return (
    <MathGirlOfficialLab
      cases={equivalenceCases}
      caption="自反、对称、传递从等号中被抽取出来，成为判断任意关系能否稳定分组的三项合同。"
      tone="violet"
    />
  );
}

export function Mg3QuotientExamplesLab() {
  return (
    <MathGirlOfficialLab
      cases={quotientCases}
      caption="整数、有理数、模运算和年级分组共享同一骨架：原集合按等价关系被划分为互不相交的类。"
      tone="amber"
    />
  );
}
