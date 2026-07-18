"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const locations = [
  { index: 0, skipped: 0, digits: 1, offset: 0, number: 0, inside: 0, result: 0 },
  { index: 1, skipped: 0, digits: 1, offset: 1, number: 1, inside: 0, result: 1 },
  { index: 9, skipped: 0, digits: 1, offset: 9, number: 9, inside: 0, result: 9 },
  { index: 10, skipped: 10, digits: 2, offset: 0, number: 10, inside: 0, result: 1 },
  { index: 189, skipped: 10, digits: 2, offset: 179, number: 99, inside: 1, result: 9 },
  { index: 190, skipped: 190, digits: 3, offset: 0, number: 100, inside: 0, result: 1 },
  { index: 1000, skipped: 190, digits: 3, offset: 810, number: 370, inside: 0, result: 3 },
  { index: 1001, skipped: 190, digits: 3, offset: 811, number: 370, inside: 1, result: 7 },
  { index: 1002, skipped: 190, digits: 3, offset: 812, number: 370, inside: 2, result: 0 },
] as const;

const officialCases = locations.map((item) => ({
  label: "索引" + item.index,
  fields: [
    ["跳过位数", String(item.skipped)],
    ["目标数字", String(item.number)],
    ["数内下标", String(item.inside)],
    ["期望数字", String(item.result)],
  ],
})) as ReadonlyArray<{ label: string; fields: ReadonlyArray<readonly [string, string]> }>;

export function DigitSequenceBlocksDiagram() {
  const rows = [
    ["1", "0", "10", "10", "0..9"],
    ["2", "10", "90", "180", "10..189"],
    ["3", "100", "900", "2700", "190..2889"],
    ["4", "1000", "9000", "36000", "2890..38889"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["位数", "起始数字", "数字数量", "字符数量", "全局索引"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 4 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一位数块包含0到9共10项；从两位数起，每块有9乘10的位数减一次幂个数字。
      </figcaption>
    </figure>
  );
}

export function DigitSequenceLocationLab() {
  const [cursor, setCursor] = useState(locations.length - 3);
  const item = locations[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
          {locations.map((location, index) => <button key={location.index} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-10 border text-sm font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{location.index}</button>)}
        </div>
        <div className="mt-4 grid min-h-[86px] grid-cols-5 gap-2 border-y border-border py-3 text-center">
          <div><div className="text-xs text-muted">跳过</div><div className="mt-1 font-semibold text-primary">{item.skipped}</div></div>
          <div><div className="text-xs text-muted">块内偏移</div><div className="mt-1 font-semibold text-primary">{item.offset}</div></div>
          <div><div className="text-xs text-muted">目标数字</div><div className="mt-1 font-semibold text-accent">{item.number}</div></div>
          <div><div className="text-xs text-muted">数内下标</div><div className="mt-1 font-semibold text-primary">{item.inside}</div></div>
          <div><div className="text-xs text-muted">结果</div><div className="mt-1 font-semibold text-success">{item.result}</div></div>
        </div>
        <p className="mb-0 mt-4 text-sm text-secondary">索引 {item.index} 落在 {item.digits} 位数块，先整除定位数字，再取模定位数字内部字符。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换作者9个索引；1000、1001、1002分别命中370的3、7、0。
      </figcaption>
    </figure>
  );
}

export function DigitInsideNumberDiagram() {
  const rows = [
    ["块内偏移810", "810 / 3 = 270", "100 + 270 = 370", "810 % 3 = 0", "从右第3位", "3"],
    ["块内偏移811", "811 / 3 = 270", "100 + 270 = 370", "811 % 3 = 1", "从右第2位", "7"],
    ["块内偏移812", "812 / 3 = 270", "100 + 270 = 370", "812 % 3 = 2", "从右第1位", "0"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["偏移", "数字序号", "目标数字", "数内下标", "作者除法方向", "结果"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 5 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者把左侧0基下标换算为从右数第几位，再反复除10并取个位。
      </figcaption>
    </figure>
  );
}

export function DigitSequenceContractDiagram() {
  const rows = [
    ["index小于0", "立即返回-1", "唯一显式无效输入", "可用optional表达"],
    ["一位数块", "count为10，begin为0", "必须包含数字0", "索引0..9"],
    ["numbers × digits", "int乘法", "大索引可能溢出", "用64位并先检查乘法"],
    ["pow返回double", "强转int", "大次幂有舍入/越界风险", "整数递推位权"],
    ["无限序列", "理论任意非负索引", "实现受int范围限制", "公开输入域上限"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["场景", "作者行为", "风险", "工程策略"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数学序列无限，作者int实现有限；边界、位权和块长度都需要防溢出。
      </figcaption>
    </figure>
  );
}

export function DigitsInSequenceOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者9组断言，核对一位数末端、两位数末端、三位数起点和370三连位。" />;
}
