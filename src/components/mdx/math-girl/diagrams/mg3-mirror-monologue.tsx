"use client";

import { MathGirlOfficialLab } from "./official-lab";

const honestCases = [
  {
    label: "五人版本",
    fields: [
      ["发言A_k", "这里有k个人说谎"],
      ["一致答案", "A_4说真话"],
      ["身份", "A_4老实，其余四人说谎"],
    ],
  },
  {
    label: "n人一般化",
    fields: [
      ["候选", "B_(n-1)"],
      ["它的发言", "这里有n-1个骗子"],
      ["固定点", "恰有1个老实人与n-1个骗子"],
    ],
  },
  {
    label: "边界n=1",
    fields: [
      ["唯一发言", "这里有1个人说谎"],
      ["设为老实", "内容为假"],
      ["设为骗子", "内容为真"],
    ],
  },
  {
    label: "一致性审计",
    fields: [
      ["方法", "枚举身份并回代每句真值"],
      ["有效模型", "身份与发言真值逐人匹配"],
      ["失败", "n=1没有任何有效模型"],
    ],
    alert: "“没有解”不是第三种身份。它表示题设要求的老实人/骗子二分，与这句自指发言无法共同成立。",
  },
] as const;

const answerCases = [
  {
    label: "问你老实吗",
    fields: [
      ["老实人", "答是，内容为真"],
      ["骗子", "答是，内容为假"],
      ["结果", "答案词相同，真值不同"],
    ],
  },
  {
    label: "问你是骗子吗",
    fields: [
      ["老实人", "答否，内容为真"],
      ["骗子", "答否，内容为假"],
      ["结果", "两人都说否"],
    ],
  },
  {
    label: "你会答否吗",
    fields: [
      ["老实答是", "实际未答否，所以为假"],
      ["老实答否", "实际答了否，所以仍为假"],
      ["结论", "老实人只能沉默"],
    ],
  },
  {
    label: "骗子仍可回答",
    fields: [
      ["答是", "所断言内容为假"],
      ["答否", "所断言内容也为假"],
      ["关键", "回答行为进入了句子内容"],
    ],
    alert: "“是/否”只是回答符号，不能脱离问题直接标成真或假。必须先还原它断言的完整命题，再计算真值。",
  },
] as const;

const gridCases = [
  {
    label: "录入三条线索",
    fields: [
      ["Alice手表", "黄色"],
      ["Boris手表", "不是绿色"],
      ["Chris帽子", "黄色"],
    ],
  },
  {
    label: "纵向唯一",
    fields: [
      ["三块手表", "黄、红、绿各一次"],
      ["推出Boris手表", "红色"],
      ["推出Chris手表", "绿色"],
    ],
  },
  {
    label: "横向唯一",
    fields: [
      ["Chris已有", "黄帽、绿表"],
      ["推出Chris上衣", "红色"],
      ["继续传播", "补齐其余格子"],
    ],
  },
  {
    label: "最终拉丁方",
    fields: [
      ["Alice", "红帽、黄表、绿衣"],
      ["Boris", "绿帽、红表、黄衣"],
      ["Chris", "黄帽、绿表、红衣"],
    ],
    alert: "删掉“Chris帽子黄色”后会留下两个解。线索不仅要能推出一个答案，还要检查它是否足以保证唯一性。",
  },
] as const;

const hatCases = [
  {
    label: "A说不知道",
    fields: [
      ["A看到", "B与C的帽子"],
      ["排除", "B、C不可能同时白"],
      ["公开信息", "B、C至少一人红"],
    ],
  },
  {
    label: "反设C为白",
    fields: [
      ["B看到", "A红、C白"],
      ["结合A沉默", "B不可能白"],
      ["B应推出", "自己的帽子红"],
    ],
  },
  {
    label: "B也说不知道",
    fields: [
      ["现实", "B没有推出自己红"],
      ["矛盾来源", "反设C白会让B知道"],
      ["结论", "C不是白，所以C红"],
    ],
  },
  {
    label: "验证C为红",
    fields: [
      ["A看到", "B红、C红，仍不能判断"],
      ["B看到", "A红、C红，仍不能判断"],
      ["一致性", "两次不知道都成立"],
    ],
    alert: "第二个“不知道”依赖第一个“不知道”已被所有人听见。信息不仅来自帽子颜色，也来自别人公开展示的知识状态。",
  },
] as const;

export function Mg3HonestLiarLab() {
  return <MathGirlOfficialLab cases={honestCases} caption="把身份假设回代到发言真值，寻找一致模型；n=1时两种身份都自我否定。" tone="amber" />;
}

export function Mg3AnswerSelfReferenceLab() {
  return <MathGirlOfficialLab cases={answerCases} caption="相同答案不等于相同真值；当回答行为被写进问题，自指会改变谁能够作答。" tone="violet" />;
}

export function Mg3LogicGridLab() {
  return <MathGirlOfficialLab cases={gridCases} caption="横向与纵向的唯一性约束轮流传播，把三条线索扩展成唯一的颜色拉丁方。" tone="cyan" />;
}

export function Mg3HatKnowledgeLab() {
  return <MathGirlOfficialLab cases={hatCases} caption="把“不知道”当成公开信息，在B的视角中嵌套A的视角，通过反事实分支确定C的红帽。" tone="emerald" />;
}
