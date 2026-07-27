"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const traceStates = [
  {
    range: "[0, 4]",
    middle: 2,
    value: 1,
    difference: -1,
    action: "值小于下标，排除 0 到 2，left = 3",
  },
  {
    range: "[3, 4]",
    middle: 3,
    value: 3,
    difference: 0,
    action: "值等于下标，返回 3",
  },
] as const;

const officialCases = [
  {
    label: "解在中间",
    fields: [["数组", "-3,-1,1,3,5"], ["命中", "numbers[3] == 3"], ["搜索轮数", "2"], ["期望", "3"]],
  },
  {
    label: "多个合法解",
    fields: [["数组", "0,1,3,5,6"], ["合法解", "下标 0 和 1"], ["作者路径", "先左移再命中 0"], ["期望", "0"]],
  },
  {
    label: "解在末端",
    fields: [["数组", "-1,0,1,2,4"], ["命中", "numbers[4] == 4"], ["边界", "最后一个下标"], ["期望", "4"]],
  },
  {
    label: "跨过零点",
    fields: [["数组", "-1,0,1,2,5"], ["差值", "从负跳到正"], ["命中", "无"], ["期望", "-1"]],
  },
  {
    label: "单元素命中",
    fields: [["数组", "0"], ["下标", "0"], ["数值", "0"], ["期望", "0"]],
  },
  {
    label: "单元素不命中",
    fields: [["数组", "10"], ["下标", "0"], ["数值", "10"], ["期望", "-1"]],
  },
  {
    label: "空指针",
    fields: [["数组", "nullptr"], ["长度", "0"], ["入口", "直接返回"], ["期望", "-1"]],
  },
] as const;

export function IntegerIdenticalDifferenceDiagram() {
  const values = [-3, -1, 1, 3, 5];
  const cellW = 110;
  const cellH = 112;
  const gapW = 12;
  const rowX = 111;
  const cx = (i: number) => rowX + i * (cellW + gapW);
  const tone = (diff: number) => (diff === 0 ? "var(--success)" : diff < 0 ? "var(--accent)" : "var(--warning)");
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 360"
          role="img"
          aria-label="数组中数值与下标相等的元素图。数组 -3、-1、1、3、5，逐位计算差值 值减下标：-3、-2、-1、0、+1。差值严格递增（不下降），在下标 3 处差值为 0，即 numbers[3]=3 命中。差值为负说明该搜右边，为正说明该搜左边，因此可以二分。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">差值 = 值 − 下标：严格递增使差值不下降，零点即答案</text>
          {values.map((value, index) => {
            const diff = value - index;
            const c = tone(diff);
            return (
              <g key={index}>
                <rect x={cx(index)} y={64} width={cellW} height={cellH} rx="7" fill={c} fillOpacity={diff === 0 ? 0.14 : 0.08} stroke={c} strokeWidth={diff === 0 ? 2 : 1.3} />
                {diff === 0 && <text x={cx(index) + cellW / 2} y={58} textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--success)">命中</text>}
                <text x={cx(index) + cellW / 2} y={90} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">下标 {index}</text>
                <text x={cx(index) + cellW / 2} y={124} textAnchor="middle" fontSize="22" fontWeight="800" fontFamily="monospace" fill="var(--text-primary)">{value}</text>
                <text x={cx(index) + cellW / 2} y={154} textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="monospace" fill={c}>差值 {diff > 0 ? "+" : ""}{diff}</text>
              </g>
            );
          })}
          {/* 图例 */}
          <text x="150" y="216" fontSize="12" fontWeight="700" fill="var(--accent)">差值 &lt; 0 → 向右搜</text>
          <text x="360" y="216" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--success)">差值 = 0 → 命中</text>
          <text x="670" y="216" textAnchor="end" fontSize="12" fontWeight="700" fill="var(--warning)">差值 &gt; 0 → 向左搜</text>
          <text x="410" y="256" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">整数值严格递增 → 每向右一步，值至少 +1 而下标只 +1，差值不下降。</text>
          <text x="410" y="280" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">差值序列不下降，就能像有序数组一样二分：每轮排除一半区间，O(log n)。</text>
          <text x="410" y="316" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">例：-3,-1,1,3,5 → 差值 -3,-2,-1,0,+1；mid=2 差值-1&lt;0→排除左半，mid=3 差值0→返回3。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        严格递增整数数组使差值序列不下降；零点就是数组中数值和下标相等的元素。
      </figcaption>
    </figure>
  );
}

export function IntegerIdenticalBinarySearchLab() {
  const [cursor, setCursor] = useState(0);
  const state = traceStates[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {traceStates.map((item, index) => (
            <button
              key={item.range}
              type="button"
              onClick={() => setCursor(index)}
              aria-pressed={cursor === index}
              className={
                "h-11 border text-sm font-semibold " +
                (cursor === index
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-background text-secondary")
              }
            >
              第 {index + 1} 轮
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          <div className="border border-border bg-background p-3">
            <div className="text-xs text-muted">区间</div>
            <div className="mt-1 font-semibold text-primary">{state.range}</div>
          </div>
          <div className="border border-border bg-background p-3">
            <div className="text-xs text-muted">middle</div>
            <div className="mt-1 font-semibold text-primary">{state.middle}</div>
          </div>
          <div className="border border-border bg-background p-3">
            <div className="text-xs text-muted">numbers[middle]</div>
            <div className="mt-1 font-semibold text-primary">{state.value}</div>
          </div>
          <div className="border border-border bg-background p-3">
            <div className="text-xs text-muted">差值</div>
            <div className={"mt-1 font-semibold " + (state.difference === 0 ? "text-success" : "text-accent")}>{state.difference}</div>
          </div>
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">
          {state.action}
        </p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        对 -3、-1、1、3、5，第一次排除左半，第二次在下标 3 命中。
      </figcaption>
    </figure>
  );
}

export function IntegerIdenticalEliminationMap() {
  const rows = [
    ["numbers[mid] 小于 mid", "mid 左侧所有值都更小", "排除 left 到 mid", "left = mid + 1"],
    ["numbers[mid] 等于 mid", "找到一个合法不动点", "无需继续搜索", "返回 mid"],
    ["numbers[mid] 大于 mid", "mid 右侧所有值都更大", "排除 mid 到 right", "right = mid - 1"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {["中点关系", "严格递增推论", "可排除区间", "动作"].map((item) => (
                <th key={item} className="p-3 text-primary">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-border last:border-0">
                {row.map((cell, index) => (
                  <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        比较 numbers[mid] 与 mid 后可以二分排除一半区间，证明依赖整数值严格递增。
      </figcaption>
    </figure>
  );
}

export function IntegerIdenticalContractDiagram() {
  const rows = [
    ["排序", "单调递增数组", "数值严格上升", "无序输入无保证"],
    ["唯一性", "每个元素唯一", "相邻值至少增加 1", "重复值破坏差值单调性"],
    ["返回目标", "任意一个相等位置", "命中立即返回", "不是最左或最右"],
    ["负数", "允许", "答案下标仍非负", "测试覆盖负前缀"],
    ["空输入", "nullptr 或非正长度", "返回 -1", "不进入循环"],
    ["中点", "left 加区间差的一半", "避免直接相加溢出", "作者已采用稳健式"],
    ["复杂度", "每轮排除一半", "O(log n) 时间", "O(1) 空间"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {["维度", "作者契约或实现", "作用", "边界说明"].map((item) => (
                <th key={item} className="p-3 text-primary">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-border last:border-0">
                {row.map((cell, index) => (
                  <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        源码寻找任意解；若业务要求首个解，需要把命中分支改造成边界二分。
      </figcaption>
    </figure>
  );
}

export function IntegerIdenticalOfficialCaseLab() {
  return (
    <CodingInterviewLab
      cases={officialCases}
      caption="作者 main 执行 7 组测试，覆盖中间、开头、末端、无解、单元素与空指针；第 2 组还暴露任意解语义。"
    />
  );
}
