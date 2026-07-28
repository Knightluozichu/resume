"use client";

import { useState } from "react";
export function ListIntersectionIdentityDiagram() {
  const nodeW = 56;
  const nodeH = 44;
  const Node = ({ x, y, label, shared = false }: { x: number; y: number; label: string; shared?: boolean }) => (
    <g>
      <rect x={x} y={y} width={nodeW} height={nodeH} rx="6" fill={shared ? "var(--success)" : "var(--bg)"} fillOpacity={shared ? 0.14 : 1} stroke={shared ? "var(--success)" : "var(--border)"} strokeWidth={shared ? 1.8 : 1.3} />
      <text x={x + nodeW / 2} y={y + nodeH / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="monospace" fill={shared ? "var(--success)" : "var(--text-primary)"}>{label}</text>
    </g>
  );
  const Arrow = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--border)" strokeWidth="1.6" markerEnd="url(#list-arrow)" />
  );
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 360"
          role="img"
          aria-label="两个链表的第一个公共节点图。链表 A 为 1、2、3，链表 B 为 4、5，两者的 next 都指向同一个节点 6，随后共享 6、7、null 整个后缀。相交指的是节点身份（地址）相同，而不只是数值相同；一旦共享某节点，之后只能沿同一条 next 链走到相同尾部。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <defs>
            <marker id="list-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--border)" /></marker>
          </defs>
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">两前缀 next 指向同一节点：共享的是身份与整个后缀</text>
          {/* 链表 A */}
          <text x="88" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">链表 A</text>
          <Node x={60} y={80} label="1" />
          <Node x={150} y={80} label="2" />
          <Node x={240} y={80} label="3" />
          <Arrow x1={116} y1={102} x2={148} y2={102} />
          <Arrow x1={206} y1={102} x2={238} y2={102} />
          {/* 链表 B */}
          <text x="133" y="212" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">链表 B</text>
          <Node x={105} y={226} label="4" />
          <Node x={195} y={226} label="5" />
          <Arrow x1={161} y1={248} x2={193} y2={248} />
          {/* 汇聚箭头 */}
          <Arrow x1={296} y1={110} x2={416} y2={158} />
          <Arrow x1={251} y1={240} x2={416} y2={182} />
          {/* 共享后缀 */}
          <Node x={420} y={150} label="6" shared />
          <Node x={540} y={150} label="7" shared />
          <Arrow x1={476} y1={172} x2={538} y2={172} />
          <text x={640} y={178} textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="monospace" fill="var(--text-secondary)">null</text>
          <Arrow x1={596} y1={172} x2={618} y2={172} />
          <text x={476} y={130} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--success)">共享后缀（同一组节点对象）</text>
          {/* 说明 */}
          <text x="410" y="316" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">判等用指针地址 pA == pB；值相同但地址不同的两个独立节点不算相交。</text>
          <text x="410" y="340" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">长度对齐：长链先走长度差步，再同步前进，首次地址相等即首个公共节点。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两个前缀都把next指向同一个节点6；共享的是节点身份及其整个后缀，不只是数值6。
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
