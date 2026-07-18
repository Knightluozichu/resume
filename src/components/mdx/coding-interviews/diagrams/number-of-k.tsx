"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const firstStates = [
  { range: "[0, 7]", mid: 3, value: 3, neighbor: "左邻下标2也是3", action: "命中但不是第一个，令end=2" },
  { range: "[0, 2]", mid: 1, value: 2, neighbor: "2小于目标3", action: "目标在右侧，令start=2" },
  { range: "[2, 2]", mid: 2, value: 3, neighbor: "左邻下标1是2", action: "命中且左邻不同，返回first=2" },
] as const;

const lastStates = [
  { range: "[0, 7]", mid: 3, value: 3, neighbor: "右邻下标4也是3", action: "命中但不是最后一个，令start=4" },
  { range: "[4, 7]", mid: 5, value: 3, neighbor: "右邻下标6是4", action: "命中且右邻不同，返回last=5" },
] as const;

const officialCases = [
  { label: "位于中间", fields: [["数组", "1,2,3,3,3,3,4,5"], ["k", "3"], ["first/last", "2 / 5"], ["期望", "4"]] },
  { label: "位于开头", fields: [["数组", "3,3,3,3,4,5"], ["k", "3"], ["first/last", "0 / 3"], ["期望", "4"]] },
  { label: "位于结尾", fields: [["数组", "1,2,3,3,3,3"], ["k", "3"], ["first/last", "2 / 5"], ["期望", "4"]] },
  { label: "中间缺失", fields: [["数组", "1,3,3,3,3,4,5"], ["k", "2"], ["边界", "-1 / -1"], ["期望", "0"]] },
  { label: "小于最小值", fields: [["数组", "1,3,3,3,3,4,5"], ["k", "0"], ["搜索", "持续向左"], ["期望", "0"]] },
  { label: "大于最大值", fields: [["数组", "1,3,3,3,3,4,5"], ["k", "6"], ["搜索", "持续向右"], ["期望", "0"]] },
  { label: "全部命中", fields: [["数组", "3,3,3,3"], ["k", "3"], ["first/last", "0 / 3"], ["期望", "4"]] },
  { label: "全部不命中", fields: [["数组", "3,3,3,3"], ["k", "4"], ["边界", "-1 / -1"], ["期望", "0"]] },
  { label: "单元素命中", fields: [["数组", "3"], ["k", "3"], ["first/last", "0 / 0"], ["期望", "1"]] },
  { label: "单元素缺失", fields: [["数组", "3"], ["k", "4"], ["边界", "-1 / -1"], ["期望", "0"]] },
  { label: "空指针", fields: [["数组", "nullptr"], ["长度", "0"], ["入口", "不搜索"], ["期望", "0"]] },
] as const;

export function NumberOfKSortedRunDiagram() {
  const values = [1, 2, 3, 3, 3, 3, 4, 5];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-8 gap-2">
          {values.map((value, index) => (
            <div key={index} className={"relative flex min-h-[68px] flex-col items-center justify-center border " + (value === 3 ? "border-success bg-success/12 text-success" : "border-border bg-background text-primary")}>
              <span className="text-lg font-semibold">{value}</span>
              <span className="mt-1 text-xs text-muted">{index}</span>
              {index === 2 && <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-success px-1 text-[10px] font-semibold text-white">first</span>}
              {index === 5 && <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-success px-1 text-[10px] font-semibold text-white">last</span>}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-sm text-secondary">出现次数 = 5 - 2 + 1 = <strong className="text-success">4</strong></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        排序保证所有3形成连续区间；只需找到左右边界，无需逐个扫描重复段。
      </figcaption>
    </figure>
  );
}

export function FirstKBoundaryLab() {
  const [cursor, setCursor] = useState(0);
  const state = firstStates[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {firstStates.map((item, index) => <button key={item.range} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-sm font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>第{index + 1}步</button>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">区间</div><div className="mt-1 font-semibold text-primary">{state.range}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">middle / 值</div><div className="mt-1 font-semibold text-primary">{state.mid} / {state.value}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">左邻判定</div><div className="mt-1 text-sm text-secondary">{state.neighbor}</div></div>
        </div>
        <p className="mb-0 mt-3 text-sm text-secondary">{state.action}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        命中k不立即返回；只有位于下标0或左邻不等于k时，才是第一个k。
      </figcaption>
    </figure>
  );
}

export function LastKBoundaryLab() {
  const [cursor, setCursor] = useState(0);
  const state = lastStates[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {lastStates.map((item, index) => <button key={item.range} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-sm font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>第{index + 1}步</button>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">区间</div><div className="mt-1 font-semibold text-primary">{state.range}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">middle / 值</div><div className="mt-1 font-semibold text-primary">{state.mid} / {state.value}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">右邻判定</div><div className="mt-1 text-sm text-secondary">{state.neighbor}</div></div>
        </div>
        <p className="mb-0 mt-3 text-sm text-secondary">{state.action}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        最后一个k使用镜像规则：命中后若右邻仍为k，就继续搜索右半段。
      </figcaption>
    </figure>
  );
}

export function NumberOfKContractDiagram() {
  const rows = [
    ["输入顺序", "必须非递减排序", "重复值形成连续区间", "无序输入结果无保证"],
    ["空输入", "nullptr或长度小于等于0", "返回0", "不进入两个递归搜索"],
    ["目标不存在", "first或last为-1", "返回0", "不做负下标差值"],
    ["边界命中", "下标0 / length-1", "无需读取越界邻居", "短路条件保护"],
    ["中点计算", "(start+end)/2", "超大下标可能溢出", "start+(end-start)/2"],
    ["重复段长度", "last-first+1", "闭区间计数", "不可漏加1"],
    ["标准库等价", "lower_bound / upper_bound", "两个对数搜索", "distance得到计数"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[940px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["维度", "作者契约/实现", "含义", "工程策略"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两个边界搜索共享排序前提，但向相反方向收缩；入口把无效输入与不存在统一为计数0。
      </figcaption>
    </figure>
  );
}

export function NumberOfKOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者main执行11组测试，覆盖重复段在中间、开头、结尾，以及各种不存在、全同、单元素和空指针。" />;
}
