"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const distributions = [
  { dice: 1, min: 1, counts: [1, 1, 1, 1, 1, 1] },
  { dice: 2, min: 2, counts: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1] },
  { dice: 3, min: 3, counts: [1, 3, 6, 10, 15, 21, 25, 27, 27, 25, 21, 15, 10, 6, 3, 1] },
  { dice: 4, min: 4, counts: [1, 4, 10, 20, 35, 56, 80, 104, 125, 140, 146, 140, 125, 104, 80, 56, 35, 20, 10, 4, 1] },
] as const;

const officialCases = [
  { label: "n = 1", fields: [["和范围", "1..6"], ["计数", "全部为 1"], ["总样本", "6"], ["两种方法", "均打印"]] },
  { label: "n = 2", fields: [["和范围", "2..12"], ["计数", "1,2,3,4,5,6,5,4,3,2,1"], ["峰值", "和 7，共 6 种"], ["总样本", "36"]] },
  { label: "n = 3", fields: [["和范围", "3..18"], ["峰值", "和 10、11"], ["峰值计数", "27"], ["总样本", "216"]] },
  { label: "n = 4", fields: [["和范围", "4..24"], ["峰值", "和 14"], ["峰值计数", "146"], ["总样本", "1296"]] },
  { label: "n = 11", fields: [["和范围", "11..66"], ["峰值", "和 38、39"], ["峰值计数", "25090131"], ["总样本", "362797056"]] },
  { label: "n = 0", fields: [["入口判断", "number < 1"], ["递归解", "不输出"], ["动态规划", "不输出"], ["用途", "无效输入"]] },
] as const;

export function DicesProbabilityStateDiagram() {
  const rows = [
    ["1 颗", "1..6", "6", "6"],
    ["2 颗", "2..12", "11", "36"],
    ["k 颗", "k..6k", "5k+1", "6^k"],
    ["n 颗", "n..6n", "5n+1", "6^n"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {["阶段", "可达点数和", "状态数量", "有序结果数量"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-border last:border-0">
                {row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        计数数组只需覆盖可达和；概率分母来自所有等可能的有序投掷结果。
      </figcaption>
    </figure>
  );
}

export function DicesProbabilityRecursiveLab() {
  const [first, setFirst] = useState(1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((face) => (
            <button
              key={face}
              type="button"
              onClick={() => setFirst(face)}
              aria-pressed={first === face}
              className={"h-11 border text-sm font-semibold " + (first === face ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}
            >
              首骰 {face}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((second) => (
            <div key={second} className="border border-border bg-background p-3 text-center">
              <div className="text-xs text-muted">{first} + {second}</div>
              <div className="mt-1 text-lg font-semibold text-primary">{first + second}</div>
            </div>
          ))}
        </div>
        <p className="mb-0 mt-4 border-l-4 border-accent bg-background p-3 text-sm text-secondary">
          外层固定第一颗骰子，递归层枚举第二颗；六个首分支各有六个叶子，共 36 条有序路径。
        </p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        点击首骰观察递归枚举如何把一条路径的点数和映射到计数桶。
      </figcaption>
    </figure>
  );
}

export function DicesProbabilityRollingLab() {
  const [cursor, setCursor] = useState(1);
  const state = distributions[cursor];
  const max = Math.max(...state.counts);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">
          {distributions.map((item, index) => (
            <button
              key={item.dice}
              type="button"
              onClick={() => setCursor(index)}
              aria-pressed={cursor === index}
              className={"h-11 border text-sm font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}
            >
              {item.dice} 颗
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto">
          <div className="flex min-w-max items-end gap-1 border-b border-border px-2 pt-4">
            {state.counts.map((count, index) => (
              <div key={index} className="flex w-9 flex-col items-center justify-end">
                <span className="mb-1 text-[10px] text-muted">{count}</span>
                <div className="w-6 bg-accent" style={{ height: 18 + Math.round((count / max) * 96) }} />
                <span className="mt-1 text-[10px] text-secondary">{state.min + index}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-sm text-secondary">可达和：{state.min}..{state.dice * 6}</div>
          <div className="border border-border bg-background p-3 text-sm text-secondary">计数和：{6 ** state.dice}</div>
          <div className="border border-success bg-success/10 p-3 text-sm font-semibold text-success">目标数组写完后翻转 flag</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两张数组交替保存上一轮和当前轮；每个柱高是点数和对应的有序结果数。
      </figcaption>
    </figure>
  );
}

export function DicesProbabilityDistributionChart() {
  const state = distributions[3];
  const max = Math.max(...state.counts);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <div className="flex min-w-[900px] items-end gap-2 border-b border-border px-2 pt-5">
          {state.counts.map((count, index) => (
            <div key={index} className="flex flex-1 flex-col items-center justify-end">
              <span className="mb-1 text-[10px] text-muted">{count}</span>
              <div className={(index === 10 ? "bg-success" : "bg-accent") + " w-full min-w-4"} style={{ height: 24 + Math.round((count / max) * 130) }} />
              <span className="mt-1 text-[10px] text-secondary">{state.min + index}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四颗骰子的计数关于和 14 对称，峰值 146；两端和 4、24 都只有一种路径。
      </figcaption>
    </figure>
  );
}

export function DicesProbabilityOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 main 依次运行 1、2、3、4、11、0，并让递归法与滚动动态规划分别打印同一分布。" />;
}
