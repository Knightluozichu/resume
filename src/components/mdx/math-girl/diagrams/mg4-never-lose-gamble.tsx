"use client";

import { MathGirlOfficialLab } from "./official-lab";

const diceCases = [
  {
    label: "全部结果",
    fields: [
      ["爱丽丝", "1至6"],
      ["鲍勃", "1至6"],
      ["等可能有序对", "6×6=36"],
    ],
  },
  {
    label: "平局",
    fields: [
      ["结果", "(1,1)至(6,6)"],
      ["数量", "6"],
      ["概率", "6/36=1/6"],
    ],
  },
  {
    label: "爱丽丝胜",
    fields: [
      ["条件", "Alice > Bob"],
      ["数量", "1+2+3+4+5=15"],
      ["概率", "15/36=5/12"],
    ],
  },
  {
    label: "对称性修正",
    fields: [
      ["两人胜率", "相同"],
      ["非平局概率", "30/36"],
      ["各自胜率", "(30/36)/2=5/12"],
    ],
    alert: "对称性只能说明两人的获胜概率相同，不能忽略平局。把全部概率1直接平分会得到错误的1/2。",
  },
] as const;

const coinCases = [
  {
    label: "原样本空间",
    fields: [
      ["结果", "HH, HT, TH, TT"],
      ["前一位", "百元硬币"],
      ["后一位", "十元硬币"],
    ],
  },
  {
    label: "已知至少一正",
    fields: [
      ["排除", "TT"],
      ["剩余", "HH, HT, TH"],
      ["条件后", "三种等可能"],
    ],
  },
  {
    label: "两枚都是正面",
    fields: [
      ["有利结果", "HH"],
      ["条件结果数", "3"],
      ["概率", "1/3"],
    ],
  },
  {
    label: "信息协议",
    fields: [
      ["事件条件", "只知道至少一正"],
      ["若指定硬币", "另一枚为正的概率1/2"],
      ["教训", "信息如何产生也属于模型"],
    ],
    alert: "“至少一枚是正面”和“指定的百元硬币是正面”不是同一条件。条件事件改变后，样本空间和答案都会改变。",
  },
] as const;

const memoryCases = [
  {
    label: "绝不会输",
    fields: [
      ["正面", "尤里赢"],
      ["反面", "哥哥输"],
      ["立起", "才轮到哥哥赢"],
    ],
  },
  {
    label: "正反标签",
    fields: [
      ["争议", "哪一面叫正面"],
      ["日本硬币约定", "印年号的一面为反面"],
      ["教训", "结果标签必须先约定"],
    ],
  },
  {
    label: "中奖彩票店",
    fields: [
      ["海报事实", "本店诞生了一等奖"],
      ["错误推断", "下次在本店更容易中"],
      ["原因", "彩票没有记忆力"],
    ],
  },
  {
    label: "独立诊断",
    fields: [
      ["过去事件", "该店曾售出中奖彩票"],
      ["未来事件", "下一张彩票中奖"],
      ["若规则不变", "过去不改变未来概率"],
    ],
    alert: "海报可以陈述真实历史，却利用读者把历史相关误当成未来概率提高。事实陈述与概率推断要分开检查。",
  },
] as const;

const montyCases = [
  {
    label: "主持规则",
    fields: [
      ["主持人", "知道奖品位置"],
      ["固定动作", "总从未选信封中打开空信封"],
      ["初选命中时", "在两个空信封中随机开一个"],
    ],
  },
  {
    label: "初始分配",
    fields: [
      ["手中信封中奖", "1/3"],
      ["桌上两封含奖", "2/3"],
      ["开空信封", "不改变初选是否命中"],
    ],
  },
  {
    label: "坚持或交换",
    fields: [
      ["坚持获胜", "初选就命中"],
      ["交换获胜", "初选为空"],
      ["胜率", "坚持1/3，交换2/3"],
    ],
  },
  {
    label: "一万封信",
    fields: [
      ["初选命中", "1/10000"],
      ["其余集合含奖", "9999/10000"],
      ["主持人开9998空封", "集合概率浓缩到剩余一封"],
    ],
    alert: "2/3结论依赖主持人的信息和固定协议。若主持人可能误开奖品、可能不打开，或有偏向策略，就必须重新建模。",
  },
] as const;

export function Mg4DiceOutcomeLab() {
  return (
    <MathGirlOfficialLab
      cases={diceCases}
      caption="36个等可能有序对先分出6个平局，再由对称性把剩余30个结果平分，爱丽丝获胜概率是5/12。"
      tone="cyan"
    />
  );
}

export function Mg4ConditionalCoinsLab() {
  return (
    <MathGirlOfficialLab
      cases={coinCases}
      caption="条件“至少一枚正面”排除TT，留下HH、HT、TH三个等可能结果，其中只有HH满足两枚都为正面。"
      tone="violet"
    />
  );
}

export function Mg4LotteryMemoryLab() {
  return (
    <MathGirlOfficialLab
      cases={memoryCases}
      caption="从不公平措辞、正反面标签到中奖彩票店海报，先明确规则和信息，再判断历史是否真的改变未来概率。"
      tone="amber"
    />
  );
}

export function Mg4MontyHallLab() {
  return (
    <MathGirlOfficialLab
      cases={montyCases}
      caption="初选把概率分成手中1/3与桌上集合2/3；知情主持人只删除空信封，交换继承桌上集合的2/3。"
      tone="emerald"
    />
  );
}
