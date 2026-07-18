"use client";

import { MathGirlOfficialLab } from "./official-lab";

const axiomCases = [
  {
    label: "PA1 起点",
    fields: [
      ["断言", "1属于N"],
      ["职责", "给后继链一个锚点"],
      ["尚未得到", "2、加法、大小关系"],
    ],
  },
  {
    label: "PA2 生长",
    fields: [
      ["断言", "n属于N则S(n)属于N"],
      ["重复使用", "1,S(1),S(S(1)),..."],
      ["职责", "对后继运算封闭"],
    ],
  },
  {
    label: "PA3 与 PA4",
    fields: [
      ["PA3", "S(n)不等于1"],
      ["PA4", "S(m)=S(n)推出m=n"],
      ["职责", "无回到起点、无路径会合"],
    ],
  },
  {
    label: "PA5 归纳",
    fields: [
      ["基步", "P(1)"],
      ["传递步", "对任意k，P(k)推出P(S(k))"],
      ["结论", "对任意n，P(n)"],
    ],
    alert: "五条公理不是五种计算技巧。它们共同规定起点、后继结构和可对全部自然数使用的归纳原则。",
  },
] as const;

const modelCases = [
  {
    label: "缺 PA3",
    fields: [
      ["仍有", "起点、闭包、后继单射"],
      ["可能模型", "...→a→1→S(1)→..."],
      ["异常", "1也可能有前驱"],
    ],
  },
  {
    label: "缺 PA4",
    fields: [
      ["仍有", "1不是任何后继"],
      ["可能模型", "外来元素a的后继接入主链"],
      ["异常", "两条路径会合"],
    ],
  },
  {
    label: "缺 PA5",
    fields: [
      ["仍有", "从1出发的标准链"],
      ["可能模型", "另有不从1抵达的后继分量"],
      ["异常", "集合含多余元素"],
    ],
  },
  {
    label: "形式化提醒",
    fields: [
      ["二阶版本", "可刻画标准自然数到同构"],
      ["一阶PA", "PA5是归纳公理模式"],
      ["后果", "仍存在非标准模型"],
    ],
    alert: "“PA5排除所有额外元素”适合二阶版本。第一阶皮亚诺算术受紧致性等结果限制，仍有非标准模型。",
  },
] as const;

const inductionCases = [
  {
    label: "先做实例",
    fields: [
      ["n=1", "1=1^2"],
      ["n=2", "1+3=2^2"],
      ["n=3", "1+3+5=3^2"],
    ],
  },
  {
    label: "基步",
    fields: [
      ["谓词", "P(n): 前n个奇数之和=n^2"],
      ["代入", "P(1)"],
      ["结果", "成立"],
    ],
  },
  {
    label: "传递步",
    fields: [
      ["假设", "只假设固定k的P(k)"],
      ["两边添加", "2(k+1)-1"],
      ["化简", "k^2+2k+1=(k+1)^2"],
    ],
  },
  {
    label: "全称结论",
    fields: [
      ["已证", "P(1)且对所有k有P(k)→P(k+1)"],
      ["PA5", "连接起点与传递规则"],
      ["得到", "对所有n，P(n)"],
    ],
    alert: "归纳步证明的是一个对所有k成立的蕴含式，不是假设“对所有k，P(k)已经成立”。括号位置决定逻辑含义。",
  },
] as const;

const additionCases = [
  {
    label: "ADD1",
    fields: [
      ["规则", "m+1=S(m)"],
      ["作用", "第二个参数的递归基"],
      ["示例", "1+1=S(1)"],
    ],
  },
  {
    label: "ADD2",
    fields: [
      ["规则", "m+S(n)=S(m+n)"],
      ["作用", "剥掉第二参数一个后继"],
      ["终点", "反复归约到ADD1"],
    ],
  },
  {
    label: "计算 2+3",
    fields: [
      ["后继写法", "S(1)+S(S(1))"],
      ["展开", "S(S(S(S(1))))"],
      ["命名", "等于5"],
    ],
  },
  {
    label: "语言分层",
    fields: [
      ["算术符号", "1、S、+、×"],
      ["逻辑符号", "=、∀、→"],
      ["元层说明", "语法、语义与推理规则"],
    ],
    alert: "加法由递归方程定义；等号、量词和蕴含属于背景逻辑，不是再由某条算术公理临时创造。",
  },
] as const;

export function Mg3PeanoAxiomsLab() {
  return <MathGirlOfficialLab cases={axiomCases} caption="五条公理分别固定起点、后继闭包、起点无前驱、后继单射与归纳原则。" tone="cyan" />;
}

export function Mg3PeanoCountermodelLab() {
  return <MathGirlOfficialLab cases={modelCases} caption="删掉一条公理就主动构造异常模型，用反例看清每条规则真正排除了什么。" tone="amber" />;
}

export function Mg3InductionProofLab() {
  return <MathGirlOfficialLab cases={inductionCases} caption="实例发现模式，基步固定起点，传递步证明蕴含，PA5把局部规则提升到全称结论。" tone="emerald" />;
}

export function Mg3RecursiveAdditionLab() {
  return <MathGirlOfficialLab cases={additionCases} caption="以第二个参数递归定义加法，再区分算术对象语言与支撑它的背景逻辑。" tone="violet" />;
}
