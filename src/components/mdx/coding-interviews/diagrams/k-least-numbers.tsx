"use client";

import { useMemo, useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const streamSteps = [
  { index: 0, value: 4, kept: [4], action: "候选不足4个，插入4" },
  { index: 1, value: 5, kept: [5, 4], action: "候选不足4个，插入5" },
  { index: 2, value: 1, kept: [5, 4, 1], action: "候选不足4个，插入1" },
  { index: 3, value: 6, kept: [6, 5, 4, 1], action: "填满4个候选，最大值是6" },
  { index: 4, value: 2, kept: [5, 4, 2, 1], action: "2小于6，删除6并插入2" },
  { index: 5, value: 7, kept: [5, 4, 2, 1], action: "7不小于5，直接丢弃" },
  { index: 6, value: 3, kept: [4, 3, 2, 1], action: "3小于5，删除5并插入3" },
  { index: 7, value: 8, kept: [4, 3, 2, 1], action: "8不小于4，最终候选不变" },
] as const;

const officialCases = [
  { label: "k小于n", fields: [["输入", "4,5,1,6,2,7,3,8"], ["k", "4"], ["期望集合", "1,2,3,4"], ["覆盖", "一般场景"]] },
  { label: "k等于n", fields: [["输入长度", "8"], ["k", "8"], ["期望集合", "全部元素"], ["覆盖", "选择右边界"]] },
  { label: "k大于n", fields: [["输入长度", "8"], ["k", "10"], ["期望", "无结果"], ["覆盖", "非法k"]] },
  { label: "k等于1", fields: [["输入长度", "8"], ["k", "1"], ["期望", "1"], ["覆盖", "最小值"]] },
  { label: "k等于0", fields: [["输入长度", "8"], ["k", "0"], ["期望", "无结果"], ["覆盖", "零k"]] },
  { label: "含重复值", fields: [["输入", "4,5,1,6,2,7,2,8"], ["k", "2"], ["期望集合", "1,2"], ["覆盖", "重复数字"]] },
  { label: "空输入", fields: [["输入", "nullptr"], ["n / k", "0 / 0"], ["期望", "无结果"], ["覆盖", "空指针"]] },
] as const;

export function KLeastPartitionDiagram() {
  const values = [1, 2, 3, 4, 6, 7, 5, 8];
  const k = 4;
  const cellW = 76;
  const cellH = 52;
  const gapW = 8;
  const rowX = 78;
  const cx = (i: number) => rowX + i * (cellW + gapW);
  const inAnswer = (i: number) => i < k;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 400"
          role="img"
          aria-label="最小 k 个数的分区选择图。对 4、5、1、6、2、7、3、8 按枢轴 4 分区后，枢轴落位到下标 3，即 k-1。此时前 4 个位置 1、2、3、4 就是最小的 4 个数（内部不保证有序），后面都是不小于枢轴的值。若枢轴落位大于 k-1 就只搜左半，小于 k-1 就只搜右半。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">分区让枢轴落位 k-1：前 k 个位置即答案（不排序）</text>
          {/* 答案区间括号 */}
          <path d={`M ${cx(0)} 56 L ${cx(0)} 48 L ${cx(k - 1) + cellW} 48 L ${cx(k - 1) + cellW} 56`} fill="none" stroke="var(--success)" strokeWidth="2" />
          <text x={(cx(0) + cx(k - 1) + cellW) / 2} y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">input[0..k-1] = 最小 k 个（无序）</text>
          {/* 数组行 */}
          {values.map((v, i) => (
            <g key={i}>
              <rect x={cx(i)} y={64} width={cellW} height={cellH} rx="6" fill={inAnswer(i) ? "var(--success)" : "var(--bg)"} fillOpacity={inAnswer(i) ? 0.12 : 1} stroke={inAnswer(i) ? "var(--success)" : "var(--border)"} strokeWidth={inAnswer(i) ? 1.6 : 1.2} />
              <text x={cx(i) + cellW / 2} y={64 + cellH / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="700" fontFamily="monospace" fill={inAnswer(i) ? "var(--success)" : "var(--text-primary)"}>{v}</text>
            </g>
          ))}
          {/* 枢轴标记 */}
          <text x={cx(k - 1) + cellW / 2} y={140} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--accent)">枢轴 4</text>
          <text x={cx(k - 1) + cellW / 2} y={158} textAnchor="middle" fontSize="11" fill="var(--accent)">落位 index = k-1 = 3</text>
          <path d={`M ${cx(k - 1) + cellW / 2} 122 L ${cx(k - 1) + cellW / 2} 130`} stroke="var(--accent)" strokeWidth="2" />
          {/* 分区性质 */}
          <text x={(cx(0) + cx(2) + cellW) / 2} y={192} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">≤ 枢轴</text>
          <text x={(cx(4) + cx(7) + cellW) / 2} y={192} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">＞ 枢轴</text>
          {/* 三分支决策 */}
          <text x="410" y="232" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">index == k-1 → 停止，前 k 项即答案</text>
          <text x="410" y="258" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">index &gt; k-1 → end = index-1（只搜左半）</text>
          <text x="410" y="284" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">index &lt; k-1 → start = index+1（只搜右半）</text>
          <text x="410" y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">目标是让下标 k-1 落位，不是把前 k 项排序；落位后前 k 项都不大于后续区间。</text>
          <text x="410" y="346" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">平均 O(n)、额外 O(1)，但会重排输入且需要完整数组（不适合流）。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        目标是让下标k-1落位，不是把前k项排序；落位后前k项都不大于后续区间。
      </figcaption>
    </figure>
  );
}

export function KLeastMultisetLab() {
  const [cursor, setCursor] = useState(streamSteps.length - 1);
  const step = streamSteps[cursor];
  const values = useMemo(() => streamSteps.map((item) => item.value), []);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-8 gap-1.5">
          {values.map((value, index) => (
            <div key={index} className={"flex aspect-square items-center justify-center border text-sm font-semibold " + (index === cursor ? "border-accent bg-accent/15 text-accent" : index < cursor ? "border-border bg-surface text-secondary" : "border-border bg-background text-muted")}>
              {value}
            </div>
          ))}
        </div>

        <div className="mt-4 min-h-[104px] border-y border-border py-4">
          <div className="text-xs text-muted">降序multiset候选，begin指向最大值</div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="flex h-10 items-center justify-center border border-border bg-background font-semibold text-primary">
                {step.kept[index] ?? "·"}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex min-h-11 items-center justify-between gap-3">
          <p className="m-0 text-sm text-secondary">{step.action}</p>
          <div className="flex shrink-0 items-center gap-1">
            <button type="button" title="上一步" aria-label="上一步" disabled={cursor === 0} onClick={() => setCursor((value) => Math.max(0, value - 1))} className="inline-flex size-9 items-center justify-center border border-border text-secondary disabled:opacity-35"><span aria-hidden="true" className="text-lg leading-none">←</span></button>
            <button type="button" title="重置" aria-label="重置" onClick={() => setCursor(0)} className="inline-flex size-9 items-center justify-center border border-border text-secondary"><span aria-hidden="true" className="text-lg leading-none">↻</span></button>
            <button type="button" title="下一步" aria-label="下一步" disabled={cursor === streamSteps.length - 1} onClick={() => setCursor((value) => Math.min(streamSteps.length - 1, value + 1))} className="inline-flex size-9 items-center justify-center border border-border text-secondary disabled:opacity-35"><span aria-hidden="true" className="text-lg leading-none">→</span></button>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者的greater比较器让最大候选位于begin；只有更小的新值才替换它。
      </figcaption>
    </figure>
  );
}

export function KLeastTradeoffDiagram() {
  const rows = [
    ["Partition选择", "平均O(n)，最坏O(n²)", "O(1)", "会重排", "需完整数组"],
    ["降序multiset", "O(n log k)", "O(k)", "不修改", "可逐项读取"],
    ["全量排序", "O(n log n)", "视排序实现", "可选择副本", "结果天然有序"],
    ["计数桶", "O(n + R)", "O(R)", "不修改", "只适合小值域"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[940px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["方案", "时间", "额外空间", "输入副作用", "数据条件"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者两案的核心权衡是可修改完整数组的平均线性选择，与只读/流式数据的有界候选结构。
      </figcaption>
    </figure>
  );
}

export function KLeastOutputContractDiagram() {
  const rows = [
    ["解法一有效", "写满output前k项", "不保证升序", "input被重排"],
    ["解法一无效", "立即return", "output保持原内容", "调用方不可读取"],
    ["解法二有效", "multiset含k项", "迭代时降序", "重复值保留"],
    ["解法二无效", "先clear再return", "结果容器为空", "状态确定"],
    ["作者Test", "打印结果", "未自动集合比较", "顺序错误不会判失败"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["路径", "输出状态", "顺序/数量", "调用契约"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        题目要求的是多重集合，不是统一顺序；若API承诺升序，必须显式排序或改变容器迭代方向。
      </figcaption>
    </figure>
  );
}

export function KLeastOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者7组测试，核对k边界、重复值与空输入；原测试只打印，不自动断言集合。" />;
}
