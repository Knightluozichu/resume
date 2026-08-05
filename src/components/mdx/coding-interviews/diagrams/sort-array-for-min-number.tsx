"use client";

import { useState } from "react";
export function MinNumberSortDiagram() {
  const cellW = 88;
  const cellH = 46;
  const gapW = 10;
  const rowX = 250;
  const cx = (i: number) => rowX + i * (cellW + gapW);
  const Box = ({ i, label, tone }: { i: number; label: string; tone: string }) => (
    <g>
      <rect x={cx(i)} y={0} width={cellW} height={cellH} rx="6" fill={tone} fillOpacity="0.12" stroke={tone} strokeWidth="1.4" />
      <text x={cx(i) + cellW / 2} y={cellH / 2 + 6} textAnchor="middle" fontSize="16" fontWeight="800" fontFamily="monospace" fill={tone}>{label}</text>
    </g>
  );
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 420"
          role="img"
          aria-label="把数组排成最小数图。不比较单个数值大小，而是比较两种拼接：对 m、n 比较 mn 与 nm，哪个拼接更小就让谁排在前面。例 3 与 32：332 大于 323，所以 32 排在 3 前。对 3、32、321 按此比较排序得 321、32、3，拼接输出 321323。相邻交换论证：若存在逆序对（mn 大于 nm），交换后整体更小，故无逆序时即全局最小。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <defs>
            <marker id="mn-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
          </defs>
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">比较拼接 mn 与 nm：更小的组合排在前面</text>
          {/* 比较示例 */}
          <text x="410" y="60" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">例：3 与 32 → 332 vs 323，323 更小 → 32 排在 3 前</text>
          {/* 初始 */}
          <text x={rowX - 16} y={104} textAnchor="end" fontSize="12" fontWeight="700" fill="var(--text-primary)">初始</text>
          <g transform="translate(0,80)">
            <Box i={0} label="3" tone="var(--text-secondary)" />
            <Box i={1} label="32" tone="var(--text-secondary)" />
            <Box i={2} label="321" tone="var(--text-secondary)" />
          </g>
          <path d="M 410 132 L 410 156" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#mn-arrow)" />
          <text x="560" y="150" fontSize="11" fill="var(--accent)">按拼接比较排序</text>
          {/* 排序后 */}
          <text x={rowX - 16} y={196} textAnchor="end" fontSize="12" fontWeight="700" fill="var(--success)">排序后</text>
          <g transform="translate(0,172)">
            <Box i={0} label="321" tone="var(--success)" />
            <Box i={1} label="32" tone="var(--success)" />
            <Box i={2} label="3" tone="var(--success)" />
          </g>
          {/* 拼接 */}
          <path d="M 410 224 L 410 248" stroke="var(--success)" strokeWidth="2" markerEnd="url(#mn-arrow)" />
          <text x="410" y="278" textAnchor="middle" fontSize="15" fontWeight="800" fontFamily="monospace" fill="var(--success)">拼接输出：321323</text>
          {/* 论证 */}
          <text x="410" y="318" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">比较规则：mn &lt; nm → m 在前；mn &gt; nm → n 在前；mn = nm → 等价（任意顺序）。</text>
          <text x="410" y="344" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">相邻交换论证：若存在逆序对（mn&gt;nm），交换后整体更小；无逆序时即全局最小。</text>
          <text x="410" y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">比较关系具传递性，可用任意排序算法实现；注意前导零与负数边界。</text>
        </svg>
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
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 3 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
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
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者算法思想正确，但原始内存分配、全局缓冲与打印式测试不应直接进入现代64位代码。
      </figcaption>
    </figure>
  );
}
