"use client";

import { MathGirlOfficialLab } from "./official-lab";

const permutationCases = [
  {
    label: "4张卡片",
    fields: [
      ["对象", "A、B、C、D"],
      ["要求", "排成一列，顺序重要"],
      ["计数原则", "不遗漏、不重复"],
    ],
  },
  {
    label: "前两层",
    fields: [
      ["第1个位置", "4种选择"],
      ["每条分支的第2位", "3种选择"],
      ["树枝数", "4×3=12"],
    ],
  },
  {
    label: "后两层",
    fields: [
      ["第3位", "每枝2种"],
      ["第4位", "每枝1种"],
      ["叶子数", "4×3×2×1=24"],
    ],
  },
  {
    label: "一般化",
    fields: [
      ["n张卡片", "n,n-1,...,2,1"],
      ["排列数", "n!"],
      ["学习道路", "具体示例→找规律→一般化"],
    ],
    alert: "阶乘公式不是从空中出现的：树形图每一层的分支数逐次减1，乘法来自“对应每一条已有分支”继续选择。",
  },
] as const;

const chooseCases = [
  {
    label: "取出且排序",
    fields: [
      ["从n个取k个", "顺序重要"],
      ["乘积", "n(n-1)…(n-k+1)"],
      ["排列数", "n!/(n-k)!"],
    ],
  },
  {
    label: "切掉尾巴",
    fields: [
      ["n!尾部", "(n-k)!"],
      ["不参与选择", "n-k个因子"],
      ["去除", "除以(n-k)!"],
    ],
  },
  {
    label: "忽略内部顺序",
    fields: [
      ["同一k元素集合", "被排列k!次"],
      ["组合数", "排列数/k!"],
      ["公式", "n!/[k!(n-k)!]"],
    ],
  },
  {
    label: "重复文字",
    fields: [
      ["六个字", "鲡鱼与绿鲤鱼"],
      ["相同文字", "两个“鱼”"],
      ["不同排法", "6!/2!=360"],
    ],
    alert: "组合公式中的除法不是碰巧约成整数，而是在消除每个无序结果被内部次序重复计算的k!份。",
  },
] as const;

const pascalCases = [
  {
    label: "二项展开",
    fields: [
      ["n个因式", "每个选a或b"],
      ["b选中k次", "得到a^(n-k)b^k"],
      ["系数", "从n处选k处的组合数"],
    ],
  },
  {
    label: "帕斯卡递推",
    fields: [
      ["选定元素A", "选A或不选A"],
      ["选A", "C(n-1,k-1)"],
      ["不选A", "C(n-1,k)"],
    ],
  },
  {
    label: "五比特分类",
    fields: [
      ["全部模式", "2^5=32"],
      ["按1的个数", "0,1,2,3,4,5"],
      ["组数", "1,5,10,10,5,1"],
    ],
  },
  {
    label: "2^n的分配",
    fields: [
      ["第k组", "C(n,k)"],
      ["行和", "ΣC(n,k)"],
      ["总数", "2^n"],
    ],
    alert: "帕斯卡三角形、二项式系数和位模式分类是同一结构的三种表示：递推、代数与计数。",
  },
] as const;

const explosionCases = [
  {
    label: "世界人口编号",
    fields: [
      ["目标", "至少100亿个编号"],
      ["33比特", "8,589,934,592"],
      ["34比特", "17,179,869,184"],
    ],
  },
  {
    label: "最少34比特",
    fields: [
      ["下界", "2^33 < 100亿"],
      ["上界", "100亿 < 2^34"],
      ["标题数字", "171亿7986万9184"],
    ],
  },
  {
    label: "280比特空间",
    fields: [
      ["宇宙体积估计", "约2^280 cm³"],
      ["划分精度", "每格1 cm³"],
      ["意义", "280个二分选择可定位一格"],
    ],
  },
  {
    label: "1比特的岔路",
    fields: [
      ["每天", "充满二选一的分杈"],
      ["尤里的伙伴", "将要转校"],
      ["数学回声", "一次分岔让道路远离"],
    ],
    alert: "指数能数清分支，却不能抵消离别。章末把“每次选择增加一比特”从编码问题转回了人的孤独。",
  },
] as const;

export function Mg4PermutationTreeLab() {
  return (
    <MathGirlOfficialLab
      cases={permutationCases}
      caption="四层树形图的分支数依次为4、3、2、1，24个叶子与四张卡片的24种排列一一对应。"
      tone="cyan"
    />
  );
}

export function Mg4PermutationCombinationLab() {
  return (
    <MathGirlOfficialLab
      cases={chooseCases}
      caption="排列先切掉n!中未使用的尾巴，再由组合除去每个k元素集合内部的k!种次序。"
      tone="amber"
    />
  );
}

export function Mg4PascalBitLab() {
  return (
    <MathGirlOfficialLab
      cases={pascalCases}
      caption="二项式系数、帕斯卡递推和按1的个数分类的位模式共同解释组合数如何把2^n分配到各层。"
      tone="violet"
    />
  );
}

export function Mg4ExponentialSolitudeLab() {
  return (
    <MathGirlOfficialLab
      cases={explosionCases}
      caption="34比特产生17179869184个编号；指数爆炸从全球人口与宇宙空间延伸到人生岔路和尤里的离别。"
      tone="emerald"
    />
  );
}
