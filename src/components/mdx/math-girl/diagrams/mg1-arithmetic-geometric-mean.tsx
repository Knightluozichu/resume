"use client";

import { MathGirlOfficialLab } from "./official-lab";

const meanCases = [
  {
    label: "算术平均",
    fields: [
      ["定义", "A=(a+b)/2"],
      ["直觉", "把总量a+b平均分成两份"],
      ["定义域", "对任意实数都有意义"],
    ],
  },
  {
    label: "几何平均",
    fields: [
      ["定义", "G=sqrt(ab)"],
      ["直觉", "与a乘b具有相同面积的正方形边长"],
      ["定义域", "本章要求a,b均为非负实数"],
    ],
  },
  {
    label: "比较",
    fields: [
      ["结论", "A>=G"],
      ["差距", "A-G=(sqrt(a)-sqrt(b))^2/2"],
      ["含义", "两个输入越不均衡，平均值差距越明显"],
    ],
  },
  {
    label: "等号",
    fields: [
      ["条件", "a=b"],
      ["理由", "平方差为0当且仅当sqrt(a)=sqrt(b)"],
      ["检查", "只写不等号而漏掉等号条件是不完整结论"],
    ],
    alert: "几何平均的实数版本需要非负条件；把两个负数直接代入，会得到有意义的平方根却破坏A>=G。",
  },
] as const;

const proofCases = [
  {
    label: "平方差",
    fields: [
      ["起点", "(sqrt(a)-sqrt(b))^2>=0"],
      ["展开", "a+b-2sqrt(ab)>=0"],
      ["终点", "(a+b)/2>=sqrt(ab)"],
    ],
  },
  {
    label: "差的分解",
    fields: [
      ["恒等式", "A-G=(sqrt(a)-sqrt(b))^2/2"],
      ["优势", "同时给出非负性和等号条件"],
      ["证据", "每步只用平方非负与等价整理"],
    ],
  },
  {
    label: "平方比较",
    fields: [
      ["起点", "(a-b)^2>=0"],
      ["得到", "(a+b)^2>=4ab"],
      ["边界", "因两边非负，才能安全开平方"],
    ],
  },
  {
    label: "归一化",
    fields: [
      ["设定", "b>0，令t=sqrt(a/b)"],
      ["等价", "A/G=(t+1/t)/2"],
      ["检查", "t+1/t>=2，等号t=1"],
    ],
    alert: "证明路线可以不同，但都必须标出定义域与可逆步骤；平方后开方若忽略符号，会把不等式方向或等价性弄错。",
  },
] as const;

const applicationCases = [
  {
    label: "固定和",
    fields: [
      ["条件", "a+b=S，a,b>=0"],
      ["界", "ab<=S^2/4"],
      ["最优", "a=b=S/2时乘积最大"],
    ],
  },
  {
    label: "固定积",
    fields: [
      ["条件", "ab=P，a,b>=0"],
      ["界", "a+b>=2sqrt(P)"],
      ["最优", "a=b=sqrt(P)时和最小"],
    ],
  },
  {
    label: "矩形",
    fields: [
      ["固定周长", "边长和固定"],
      ["目标", "面积ab最大"],
      ["结论", "正方形达到唯一最大值"],
    ],
  },
  {
    label: "验收",
    fields: [
      ["边界", "先确认变量非负且约束固定"],
      ["方向", "判断题目需要上界还是下界"],
      ["可达", "证明等号条件满足原约束"],
    ],
    alert: "不等式给出界以后，还必须证明等号可在原问题中达到；否则只有估计，没有完成最值证明。",
  },
] as const;

export function Mg1MeanDefinitionLab() {
  return <MathGirlOfficialLab cases={meanCases} caption="两个平均数的定义、适用范围、差距和等号条件必须一起阅读。" tone="cyan" />;
}

export function Mg1AmGmProofLab() {
  return <MathGirlOfficialLab cases={proofCases} caption="不同证明把同一个非负量改写成适合任务的形式。" tone="violet" />;
}

export function Mg1AmGmApplicationLab() {
  return <MathGirlOfficialLab cases={applicationCases} caption="固定和控制乘积上界，固定积控制和的下界，等号负责证明最优值可达。" tone="emerald" />;
}
