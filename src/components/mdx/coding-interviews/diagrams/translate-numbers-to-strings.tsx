"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const dpSteps = [
  { index: 4, digit: "8", pair: "—", singleWays: 1, pairWays: 0, total: 1, suffix: "8" },
  { index: 3, digit: "5", pair: "58无效", singleWays: 1, pairWays: 0, total: 1, suffix: "58" },
  { index: 2, digit: "2", pair: "25有效", singleWays: 1, pairWays: 1, total: 2, suffix: "258" },
  { index: 1, digit: "2", pair: "22有效", singleWays: 2, pairWays: 1, total: 3, suffix: "2258" },
  { index: 0, digit: "1", pair: "12有效", singleWays: 3, pairWays: 2, total: 5, suffix: "12258" },
] as const;

const officialCases = [
  { label: "0", fields: [["单字符", "0→a"], ["双字符", "无"], ["期望", "1"], ["覆盖", "零可翻译"]] },
  { label: "10", fields: [["切分", "1|0 / 10"], ["翻译", "ba / k"], ["期望", "2"], ["覆盖", "下边界10"]] },
  { label: "125", fields: [["切分", "1|2|5 / 1|25 / 12|5"], ["翻译", "bcf / bz / mf"], ["期望", "3"], ["覆盖", "两处有效对"]] },
  { label: "126", fields: [["有效双位", "12"], ["无效双位", "26"], ["期望", "2"], ["覆盖", "上边界外26"]] },
  { label: "426", fields: [["双位", "42与26均无效"], ["路径", "4|2|6"], ["期望", "1"], ["覆盖", "只有单字符"]] },
  { label: "100", fields: [["切分", "1|0|0 / 10|0"], ["00", "无效双位"], ["期望", "2"], ["覆盖", "连续0"]] },
  { label: "101", fields: [["切分", "1|0|1 / 10|1"], ["01", "无效双位"], ["期望", "2"], ["覆盖", "前导零对"]] },
  { label: "12258", fields: [["有效双位", "12,22,25"], ["路径数", "5"], ["期望", "5"], ["覆盖", "重叠子问题"]] },
  { label: "-100", fields: [["入口", "负数"], ["动作", "直接返回0"], ["期望", "0"], ["覆盖", "无效输入"]] },
] as const;

export function TranslationMappingDiagram() {
  const rows = [
    ["0", "a", "单字符0合法", "不是经典1到26解码"],
    ["1", "b", "单字符1合法", "所有单个数字都合法"],
    ["9", "j", "单字符9合法", "个位映射结束"],
    ["10", "k", "双字符下边界", "01不等于双字符1"],
    ["12", "m", "12258可选12", "与1|2形成不同路径"],
    ["25", "z", "双字符上边界", "26无效"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[840px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["编码", "字母", "合法性", "边界意义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者映射从0到25对应a到z；单个0合法，双字符必须是10到25。
      </figcaption>
    </figure>
  );
}

export function TranslationCountLab() {
  const [cursor, setCursor] = useState(dpSteps.length - 1);
  const step = dpSteps[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-5 gap-2">
          {dpSteps.map((item, index) => <button key={item.index} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-10 border text-sm font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.suffix}</button>)}
        </div>
        <div className="mt-4 grid min-h-[88px] grid-cols-5 gap-2 border-y border-border py-3 text-center">
          <div><div className="text-xs text-muted">下标</div><div className="mt-1 font-semibold text-primary">{step.index}</div></div>
          <div><div className="text-xs text-muted">单字符</div><div className="mt-1 font-semibold text-primary">{step.singleWays}</div></div>
          <div><div className="text-xs text-muted">两字符</div><div className="mt-1 font-semibold text-primary">{step.pairWays}</div></div>
          <div><div className="text-xs text-muted">组合判断</div><div className="mt-1 font-semibold text-accent">{step.pair}</div></div>
          <div><div className="text-xs text-muted">总数</div><div className="mt-1 font-semibold text-success">{step.total}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从右向左回放12258；每个状态由取一位和合法时取两位的后缀方法数相加。
      </figcaption>
    </figure>
  );
}

export function TranslationPathsDiagram() {
  const rows = [
    ["1 | 2 | 2 | 5 | 8", "b | c | c | f | i", "bccfi"],
    ["1 | 22 | 5 | 8", "b | w | f | i", "bwfi"],
    ["1 | 2 | 25 | 8", "b | c | z | i", "bczi"],
    ["12 | 2 | 5 | 8", "m | c | f | i", "mcfi"],
    ["12 | 25 | 8", "m | z | i", "mzi"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["数字切分", "逐段映射", "翻译结果"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者题干列出的12258五种翻译；计数算法不构造字符串，但必须与这五条路径一一对应。
      </figcaption>
    </figure>
  );
}

export function TranslationContractDiagram() {
  const rows = [
    ["数字0", "一种：0→a", "作者Test1", "不能按1到26规则拒绝0"],
    ["组合01", "不能作为双字符1", "converted为1，小于10", "仍可各自单字符翻译"],
    ["组合10", "合法双字符k", "下边界", "也可切成1|0"],
    ["组合25 / 26", "25合法，26无效", "上边界", "条件是闭区间10..25"],
    ["负整数", "入口返回0", "不转换负号", "无效输入语义"],
    ["空string辅助调用", "源码counts[0]越界", "公开int入口不会产生", "扩展接口需拒绝"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[940px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["输入/组合", "作者语义", "依据", "注意"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        本题是0到25编码，不是常见1到26字母解码；零和两位边界必须按作者契约处理。
      </figcaption>
    </figure>
  );
}

export function TranslateNumbersOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者9组断言，核对0、10/25/26边界、连续零、12258与负数。" />;
}
