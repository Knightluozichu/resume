"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const pairCases = [
  { left: "3", right: "32", lr: "332", rl: "323", first: "32", reason: "323更小" },
  { left: "32", right: "321", lr: "32321", rl: "32132", first: "321", reason: "32132更小" },
  { left: "3", right: "323", lr: "3323", rl: "3233", first: "323", reason: "3233更小" },
  { left: "323", right: "32123", lr: "32332123", rl: "32123323", first: "32123", reason: "32123323更小" },
  { left: "1", right: "11", lr: "111", rl: "111", first: "等价", reason: "两种拼接相同" },
] as const;

const officialCases = [
  { label: "普通一位数", fields: [["输入", "3,5,1,4,2"], ["排序", "1,2,3,4,5"], ["期望", "12345"], ["验证", "人工打印"]] },
  { label: "前缀嵌套", fields: [["输入", "3,32,321"], ["排序", "321,32,3"], ["期望", "321323"], ["验证", "人工打印"]] },
  { label: "长前缀", fields: [["输入", "3,323,32123"], ["排序", "32123,323,3"], ["期望", "321233233"], ["验证", "人工打印"]] },
  { label: "拼接等价", fields: [["输入", "1,11,111"], ["两两拼接", "均为重复1"], ["期望", "111111"], ["验证", "人工打印"]] },
  { label: "单元素", fields: [["输入", "321"], ["排序", "无需比较"], ["期望", "321"], ["验证", "人工打印"]] },
  { label: "空指针", fields: [["输入", "nullptr,0"], ["函数", "直接return"], ["期望", "不打印数字"], ["验证", "人工观察"]] },
] as const;

export function MinNumberComparatorLab() {
  const [cursor, setCursor] = useState(0);
  const item = pairCases[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-5 gap-2">
          {pairCases.map((pair, index) => <button key={pair.left + pair.right} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-10 border text-sm font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{pair.left} / {pair.right}</button>)}
        </div>
        <div className="mt-4 grid min-h-[88px] grid-cols-4 gap-2 border-y border-border py-3 text-center">
          <div><div className="text-xs text-muted">m+n</div><div className="mt-1 font-semibold text-primary">{item.lr}</div></div>
          <div><div className="text-xs text-muted">n+m</div><div className="mt-1 font-semibold text-primary">{item.rl}</div></div>
          <div><div className="text-xs text-muted">应在前</div><div className="mt-1 font-semibold text-accent">{item.first}</div></div>
          <div><div className="text-xs text-muted">依据</div><div className="mt-1 font-semibold text-success">{item.reason}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        不比较单个数值大小，只比较两种相邻拼接；相等时两个顺序产生同一子串。
      </figcaption>
    </figure>
  );
}

export function MinNumberSortDiagram() {
  const rows = [
    ["初始", "3 | 32 | 321", "不能按数值直接升序", "待比较"],
    ["321 与 32", "32132 < 32321", "321在32前", "321 | 32 | 3"],
    ["32 与 3", "323 < 332", "32在3前", "321 | 32 | 3"],
    ["最终拼接", "321 + 32 + 3", "所有相邻对已无逆序", "321323"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["阶段", "比较/排列", "结论", "当前结果"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者Test2按拼接比较得到321、32、3，输出321323。
      </figcaption>
    </figure>
  );
}

export function MinNumberExchangeProofDiagram() {
  const rows = [
    ["公共前缀P", "P + mn + S", "P + nm + S", "P不影响首次差异"],
    ["若mn大于nm", "当前相邻对是逆序", "交换后整体更小", "应换成n,m"],
    ["若mn小于nm", "当前顺序局部最优", "交换会变大", "保留m,n"],
    ["若mn等于nm", "两种整体字符串相同", "排序可任选顺序", "形成等价类"],
    ["全部相邻无逆序", "任意逆序交换都不会更小", "排序结果达到全局最小", "完成"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["条件", "交换前", "交换后", "结论"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        相邻交换论证把两元素拼接比较扩展到整个排列；比较关系的传递性保证排序可执行。
      </figcaption>
    </figure>
  );
}

export function MinNumberMemoryContractDiagram() {
  const rows = [
    ["指针数组分配", "new int[length]再强转char**", "64位指针槽不足且删除类型不匹配", "new char*[length]或vector<string>"],
    ["拼接缓冲", "两个全局21字节char数组", "并发比较会互相覆盖", "比较器局部string"],
    ["数字长度", "按正int最多10位", "负数含负号可超缓冲且题意未定义", "拒绝负数"],
    ["前导零", "按排序结果原样printf", "0,1输出01", "不可擅自压成0"],
    ["测试判定", "只打印expected与actual", "不会自动报告内容差异", "返回string并assert"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["边界", "作者实现", "风险/语义", "工程修复"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者算法思想正确，但原始内存分配、全局缓冲与打印式测试不应直接进入现代64位代码。
      </figcaption>
    </figure>
  );
}

export function SortArrayMinNumberOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者6组打印测试，核对普通、前缀、等价、单元素与空输入输出。" />;
}
