"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const alignmentStates = [
  { label: "起点", long: "1", short: "4", longRemaining: 5, shortRemaining: 4, action: "链A长5，链B长4；两指针距尾部不相等" },
  { label: "长链先走1步", long: "2", short: "4", longRemaining: 4, shortRemaining: 4, action: "长度差为1；现在两个指针到尾部的剩余节点数相等" },
  { label: "同步第1步", long: "2", short: "4", longRemaining: 4, shortRemaining: 4, action: "节点地址不同，同时前进" },
  { label: "同步第2步", long: "3", short: "5", longRemaining: 3, shortRemaining: 3, action: "节点地址仍不同，同时前进" },
  { label: "命中", long: "6", short: "6", longRemaining: 2, shortRemaining: 2, action: "两个指针指向同一个节点6；它就是第一个公共节点" },
] as const;

const officialCases = [
  { label: "中间相交", fields: [["链A", "1-2-3-6-7"], ["链B", "4-5-6-7"], ["期望", "节点6"], ["长度差", "1"]] },
  { label: "完全不交", fields: [["链A", "1-2-3-4"], ["链B", "5-6-7"], ["期望", "nullptr"], ["终点", "同时为空"]] },
  { label: "尾节点相交", fields: [["链A", "1-2-3-4-7"], ["链B", "5-6-7"], ["期望", "节点7"], ["长度差", "2"]] },
  { label: "同一头节点", fields: [["两条链", "完全重合"], ["期望", "节点1"], ["同步循环", "不进入"], ["覆盖", "首节点"]] },
  { label: "一条空链", fields: [["链A", "nullptr"], ["链B", "1-2-3-4-5"], ["期望", "nullptr"], ["对齐", "长链走5步"]] },
  { label: "两条空链", fields: [["链A", "nullptr"], ["链B", "nullptr"], ["期望", "nullptr"], ["长度", "0 / 0"]] },
] as const;

function NodeBox({ value, shared = false }: { value: string; shared?: boolean }) {
  return (
    <div className={"flex h-11 min-w-11 items-center justify-center border px-3 font-semibold " + (shared ? "border-success bg-success/15 text-success" : "border-border bg-background text-primary")}>
      {value}
    </div>
  );
}

export function ListIntersectionIdentityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 border border-border bg-elevated p-4 sm:p-5 lg:grid-cols-[1fr_1fr_1.1fr]">
        <div className="border border-border bg-background p-4">
          <div className="text-xs font-semibold text-accent">链表A独有前缀</div>
          <div className="mt-3 flex items-center gap-2"><NodeBox value="1" /><span>→</span><NodeBox value="2" /><span>→</span><NodeBox value="3" /></div>
        </div>
        <div className="border border-border bg-background p-4">
          <div className="text-xs font-semibold text-accent">链表B独有前缀</div>
          <div className="mt-3 flex items-center gap-2"><NodeBox value="4" /><span>→</span><NodeBox value="5" /></div>
        </div>
        <div className="border border-success bg-success/5 p-4">
          <div className="text-xs font-semibold text-success">同一组共享节点对象</div>
          <div className="mt-3 flex items-center gap-2"><NodeBox value="6" shared /><span>→</span><NodeBox value="7" shared /><span>→ null</span></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两个前缀都把next指向同一个节点6；共享的是节点身份及其整个后缀，不只是数值6。
      </figcaption>
    </figure>
  );
}

export function ListLengthAlignmentLab() {
  const [cursor, setCursor] = useState(0);
  const state = alignmentStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-5 gap-1.5">
          {alignmentStates.map((item, index) => (
            <button key={item.label} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"min-h-11 border px-1 text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.label}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className={"border p-4 " + (state.long === state.short ? "border-success bg-success/10" : "border-border bg-background")}>
            <div className="text-xs text-muted">长链指针 / 剩余节点</div>
            <div className="mt-2 text-xl font-semibold text-primary">{state.long} / {state.longRemaining}</div>
          </div>
          <div className={"border p-4 " + (state.long === state.short ? "border-success bg-success/10" : "border-border bg-background")}>
            <div className="text-xs text-muted">短链指针 / 剩余节点</div>
            <div className="mt-2 text-xl font-semibold text-primary">{state.short} / {state.shortRemaining}</div>
          </div>
        </div>
        <p className="mb-0 mt-3 text-sm text-secondary">{state.action}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        长链先消去长度差后，两指针到尾部距离相等；同步前进会在共享后缀入口同时到达。
      </figcaption>
    </figure>
  );
}

export function SharedSuffixProofMap() {
  const rows = [
    ["第一次指针相等", "pA与pB是同一地址", "返回该节点", "之前每一步地址都不同"],
    ["相交后的下一步", "同一节点只有一个next", "两个指针仍相等", "共享关系不能再次分叉"],
    ["没有公共节点", "对齐后剩余长度相同", "两者同时到nullptr", "返回nullptr"],
    ["值相同但地址不同", "两个独立节点都存6", "继续前进", "不属于公共节点"],
    ["同一头节点", "起点地址已经相等", "直接返回头", "它就是首个公共节点"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["情形", "结构事实", "算法动作", "结论"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        无环单链表一旦共享某节点，之后只能沿同一条next链走向相同尾部。
      </figcaption>
    </figure>
  );
}

export function ListIntersectionContractDiagram() {
  const rows = [
    ["节点判等", "比较指针地址", "值相同不算相交", "使用pA == pB"],
    ["链表结构", "无环单链表", "有环时长度遍历不结束", "先检测环或另定义问题"],
    ["空链表", "长度0", "一空或两空均返回nullptr", "作者Test5/6覆盖"],
    ["长度类型", "unsigned int", "极长链可能溢出", "使用size_t"],
    ["长度差", "先做无符号减法再转int", "短减长发生下溢后被分支覆盖", "选定长短后再相减"],
    ["输入修改", "只移动局部指针", "链表结构保持不变", "可接受const节点指针"],
    ["共享尾部释放", "同一节点属于两条视图", "分别DestroyList会双重释放", "明确唯一所有者"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["维度", "作者前提/行为", "风险", "工程处理"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        长度对齐法不改链表，但依赖无环结构、可靠长度类型和共享节点的清晰所有权。
      </figcaption>
    </figure>
  );
}

export function FirstCommonNodeOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者main执行6组测试，覆盖中间、末尾、首节点相交，以及不相交、一空、两空。" />;
}
