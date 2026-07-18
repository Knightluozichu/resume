"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const splitStates = [
  { stage: "全体异或", xor: "0010", bit: "尚未选择", groupOne: "-", groupZero: "-", note: "成对数字抵消，只剩 4 xor 6 = 2" },
  { stage: "定位置位", xor: "0010", bit: "从右第 1 位", groupOne: "-", groupZero: "-", note: "该位为 1，说明 4 与 6 在这里不同" },
  { stage: "按位分组", xor: "0010", bit: "掩码 0010", groupOne: "2,3,6,3,2", groupZero: "4,5,5", note: "相同数字必定进入同一组，两个目标进入不同组" },
  { stage: "组内异或", xor: "0010", bit: "掩码 0010", groupOne: "结果 6", groupZero: "结果 4", note: "每组偶数次元素抵消，各留下一个目标" },
] as const;

const officialCases = [
  { label: "普通配对", fields: [["数组", "2,4,3,6,3,2,5,5"], ["总体异或", "2"], ["分组结果", "6 / 4"], ["期望", "4 与 6"]] },
  { label: "仅两个元素", fields: [["数组", "4,6"], ["重复项", "无"], ["分组", "直接分开"], ["期望", "4 与 6"]] },
  { label: "偶数次扩展", fields: [["数组", "4,6,1,1,1,1"], ["数字 1", "出现 4 次"], ["抵消", "仍为 0"], ["期望", "4 与 6"]] },
] as const;

export function NumbersAppearOnceXorDiagram() {
  const items = [
    ["2", "配对 A"], ["4", "目标"], ["3", "配对 B"], ["6", "目标"],
    ["3", "配对 B"], ["2", "配对 A"], ["5", "配对 C"], ["5", "配对 C"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {items.map((item, index) => <div key={index} className={"border p-2 text-center " + (item[1] === "目标" ? "border-warning bg-warning/10" : "border-border bg-background")}><div className="font-semibold text-primary">{item[0]}</div><div className="mt-1 text-[10px] text-muted">{item[1]}</div></div>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          {["2 xor 2 = 0", "3 xor 3 = 0", "5 xor 5 = 0", "4 xor 6 = 2"].map((item, index) => <div key={item} className={"border p-3 text-center text-xs font-semibold " + (index === 3 ? "border-accent bg-accent/10 text-accent" : "border-success bg-success/10 text-success")}>{item}</div>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全部数字异或后，成对项归零，只剩两个只出现一次数字的异或结果。
      </figcaption>
    </figure>
  );
}

export function NumbersAppearOnceSplitBitLab() {
  const [cursor, setCursor] = useState(0);
  const state = splitStates[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {splitStates.map((item, index) => <button key={item.stage} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.stage}</button>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">总体异或</div><div className="mt-1 font-mono font-semibold text-primary">{state.xor}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">分组位</div><div className="mt-1 text-sm font-semibold text-accent">{state.bit}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">位为 1 组</div><div className="mt-1 text-sm text-primary">{state.groupOne}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">位为 0 组</div><div className="mt-1 text-sm text-primary">{state.groupZero}</div></div>
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先提取两个目标的不同位，再保持每一对重复数字完整落入同一组。
      </figcaption>
    </figure>
  );
}

export function NumbersAppearOnceGroupMap() {
  const rows = [
    ["位为 1", "2,3,6,3,2", "2 与 2、3 与 3 抵消", "6"],
    ["位为 0", "4,5,5", "5 与 5 抵消", "4"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[700px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["组", "成员", "组内抵消", "剩余目标"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分组只看同一个二进制位，因此两个相同数字永远不会被拆散。
      </figcaption>
    </figure>
  );
}

export function NumbersAppearOnceContractDiagram() {
  const rows = [
    ["目标数量", "恰有两个且互不相同", "总体异或非 0", "否则无可用分组位"],
    ["其他数字", "题面要求各出现两次", "组内成对抵消", "偶数次也可抵消"],
    ["输出顺序", "不承诺", "两答案可交换", "测试接受两种顺序"],
    ["无效输入", "空指针或长度小于 2", "直接返回", "输出保持原值"],
    ["输出指针", "必须有效", "源码直接解引用", "未做空指针检查"],
    ["位操作", "作者使用 signed int 右移", "常见平台可工作", "负数可移植性需无符号版"],
    ["复杂度", "两次线性扫描", "O(n) 时间", "O(1) 空间"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[900px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["维度", "作者契约或实现", "作用", "边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        源码依赖题目契约，不会验证总体异或非零，也不会检查两个输出指针。
      </figcaption>
    </figure>
  );
}

export function NumbersAppearOnceOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 main 执行 3 组测试：普通配对、最小两元素和一个重复值出现 4 次的偶数次扩展。" />;
}
