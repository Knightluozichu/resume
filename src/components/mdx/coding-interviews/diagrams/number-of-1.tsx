"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const positionSteps = [
  { label: "个位", factor: 1, high: 2134, current: 5, low: 0, contribution: 2135, rule: "当前位大于1，多一整轮" },
  { label: "十位", factor: 10, high: 213, current: 4, low: 5, contribution: 2140, rule: "当前位大于1，多一整轮" },
  { label: "百位", factor: 100, high: 21, current: 3, low: 45, contribution: 2200, rule: "当前位大于1，多一整轮" },
  { label: "千位", factor: 1000, high: 2, current: 1, low: 345, contribution: 2346, rule: "当前位等于1，加低位345和端点" },
  { label: "万位", factor: 10000, high: 0, current: 2, low: 1345, contribution: 10000, rule: "当前位大于1，覆盖10000到19999" },
] as const;

const officialCases = [
  { label: "n=1", fields: [["范围", "1"], ["最高位", "1"], ["期望", "1"], ["两解法", "均通过"]] },
  { label: "n=5", fields: [["范围", "1..5"], ["含1数字", "1"], ["期望", "1"], ["两解法", "均通过"]] },
  { label: "n=10", fields: [["范围", "1..10"], ["贡献", "1与10"], ["期望", "2"], ["两解法", "均通过"]] },
  { label: "n=55", fields: [["位数", "2"], ["个位贡献", "6"], ["十位贡献", "10"], ["期望", "16"]] },
  { label: "n=99", fields: [["位数", "2"], ["个位贡献", "10"], ["十位贡献", "10"], ["期望", "20"]] },
  { label: "n=10000", fields: [["位数", "5"], ["1..9999", "4000"], ["端点10000", "1"], ["期望", "4001"]] },
  { label: "n=21345", fields: [["最高位贡献", "10000"], ["其余与递归", "8000+821"], ["期望", "18821"], ["两解法", "均通过"]] },
  { label: "n=0", fields: [["范围", "空"], ["逐数解法", "0"], ["递归解法", "0"], ["期望", "0"]] },
] as const;

export function NumberOf1RecursiveDecompositionDiagram() {
  const rows = [
    ["21345", "2 / 5", "10000", "8000", "F(1345)=821", "18821"],
    ["1345", "1 / 4", "346", "300", "F(345)=175", "821"],
    ["345", "3 / 3", "100", "60", "F(45)=15", "175"],
    ["45", "4 / 2", "10", "4", "F(5)=1", "15"],
    ["5", "5 / 1", "基例", "—", "—", "1"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["当前后缀", "首位/长度", "首位为1", "其余位为1", "递归后缀", "合计"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 5 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者每层把答案拆成最高位贡献、其余位贡献和去掉首字符后的递归贡献。
      </figcaption>
    </figure>
  );
}

export function NumberOf1PositionLab() {
  const [cursor, setCursor] = useState(positionSteps.length - 1);
  const step = positionSteps[cursor];
  const total = positionSteps.slice(0, cursor + 1).reduce((sum, item) => sum + item.contribution, 0);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-5 gap-2">
          {positionSteps.map((item, index) => <button key={item.label} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-10 border text-sm font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.label}</button>)}
        </div>
        <div className="mt-4 grid min-h-[86px] grid-cols-5 gap-2 border-y border-border py-3 text-center">
          <div><div className="text-xs text-muted">位权</div><div className="mt-1 font-semibold text-primary">{step.factor}</div></div>
          <div><div className="text-xs text-muted">高位</div><div className="mt-1 font-semibold text-primary">{step.high}</div></div>
          <div><div className="text-xs text-muted">当前位</div><div className="mt-1 font-semibold text-accent">{step.current}</div></div>
          <div><div className="text-xs text-muted">低位</div><div className="mt-1 font-semibold text-primary">{step.low}</div></div>
          <div><div className="text-xs text-muted">本位贡献</div><div className="mt-1 font-semibold text-success">{step.contribution}</div></div>
        </div>
        <div className="mt-4 flex min-h-10 items-center justify-between gap-3">
          <p className="m-0 text-sm text-secondary">{step.rule}</p>
          <div className="shrink-0 text-sm text-muted">截至本位合计 <strong className="text-primary">{total}</strong></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        等价的按位视角：21345五个十进制位置贡献相加也是18821。
      </figcaption>
    </figure>
  );
}

export function NumberOf1HighestDigitDiagram() {
  const rows = [
    ["first等于0", "0", "最高位范围尚未进入1区间", "递归处理后缀"],
    ["first等于1", "suffix + 1", "从10的幂到n，后缀从0走到suffix", "21345的千位递归层"],
    ["first大于1", "10的length-1次方", "完整覆盖首位为1的一整块", "21345贡献10000"],
    ["其余位置", "first × (length-1) × 10的length-2次方", "每个非首位在完整前缀块中均匀轮换", "21345贡献8000"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["首位条件", "贡献", "区间解释", "示例"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        首位是否越过1决定最高位贡献是零、部分区间还是完整一块。
      </figcaption>
    </figure>
  );
}

export function NumberOf1ComplexityDiagram() {
  const rows = [
    ["逐数拆位", "作者解法一", "O(n × 位数)", "O(1)", "简单参考实现"],
    ["字符串递归", "作者解法二", "源码约O(位数²)", "O(位数)栈", "每层strlen和幂循环"],
    ["high/cur/low迭代", "等价扩展", "O(位数)", "O(1)", "逐十进制位统计"],
    ["预计算幂的递归", "优化作者结构", "O(位数)", "O(位数)栈", "避免每层重复求幂"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["方法", "身份", "时间", "空间", "说明"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数学分解把对n个整数的枚举降为对十进制位的处理；源码常数虽小，仍应区分原实现与优化版。
      </figcaption>
    </figure>
  );
}

export function NumberOf1OfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者8组测试，两个解法分别比较期望值，覆盖个位、十位、全9边界、整十幂和21345。" />;
}
