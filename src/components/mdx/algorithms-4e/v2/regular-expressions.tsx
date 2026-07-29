"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-5.4",
  title: "5.4 · Regular Expressions",
  focus: "把正则表达式编译为 Thompson NFA，并以 epsilon 闭包和字符转换执行识别",
  formula: "NFA 模拟对长度 M 的正则和长度 N 的文本最坏时间 O(MN)，空间 O(M)",
  invariant: "每轮状态集恰为读完当前文本前缀后可达的 NFA 状态 epsilon 闭包",
  fault:
    "构造交替或闭包时操作符栈配对错误，或字符转换后没有再次求 epsilon 闭包",
  evidence:
    "正则 token、操作符栈、epsilon 边、当前状态集、字符步、接受状态与小型枚举预言机",
  concepts: [
    "regular expressions",
    "正则表达式",
    "nondeterministic finite automata",
    "非确定有限状态自动机",
    "epsilon transitions",
    "空字符转换",
    "NFA simulation",
    "NFA模拟",
    "regular-expression grep",
    "正则表达式grep",
  ],
  trace: [
    "解析正则 token",
    "建立 epsilon 转换",
    "求初始闭包",
    "消费一个文本字符",
    "再闭包并判断接受",
  ],
  scenarios: [
    {
      label: "闭包路径",
      input: "正则 A*B，文本 AAAB",
      expected: "每次 A 后都可经 epsilon 返回闭包，最终 B 到达接受状态",
    },
    {
      label: "交替分支",
      input: "正则 (A|BC)D，分别输入 AD 与 BCD",
      expected: "两条分支都由 epsilon 边进入，并在 D 前汇合",
    },
  ],
} satisfies Algs4SectionModel;

export function RegularExpressionsModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function RegularExpressionsTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function RegularExpressionsCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
