"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const searchStates = [
  {
    range: "[0, 4]",
    middle: 2,
    value: 2,
    verdict: "值等于下标",
    action: "缺口必在右侧，left = 3",
  },
  {
    range: "[3, 4]",
    middle: 3,
    value: 4,
    verdict: "值不等于下标",
    action: "左邻仍一致，返回下标 3",
  },
] as const;

const officialCases = [
  {
    label: "缺失 0",
    fields: [["数组", "1,2,3,4,5"], ["长度", "5"], ["首个错位", "下标 0"], ["期望", "0"]],
  },
  {
    label: "缺失末值",
    fields: [["数组", "0,1,2,3,4"], ["长度", "5"], ["循环结束", "left == length"], ["期望", "5"]],
  },
  {
    label: "缺失中间值",
    fields: [["数组", "0,1,2,4,5"], ["长度", "5"], ["首个错位", "下标 3"], ["期望", "3"]],
  },
  {
    label: "单元素缺 0",
    fields: [["数组", "1"], ["长度", "1"], ["首个错位", "下标 0"], ["期望", "0"]],
  },
  {
    label: "单元素缺 1",
    fields: [["数组", "0"], ["长度", "1"], ["循环结束", "left == length"], ["期望", "1"]],
  },
  {
    label: "空指针",
    fields: [["数组", "nullptr"], ["长度", "0"], ["入口", "直接拒绝"], ["期望", "-1"]],
  },
] as const;

export function MissingNumberIndexShiftDiagram() {
  const values = [0, 1, 2, 4, 5];
  const cellW = 110;
  const cellH = 112;
  const gapW = 12;
  const rowX = 111;
  const cx = (i: number) => rowX + i * (cellW + gapW);
  const tone = (i: number) => (i === 3 ? "var(--danger)" : values[i] === i ? "var(--success)" : "var(--warning)");
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 360"
          role="img"
          aria-label="0 到 n-1 中缺失的数字图。数组 0、1、2、4、5 缺失 3。下标 0 到 2 处值与下标相等；从缺失位置开始，值整体比下标大 1。下标 3 是首个 值不等于下标 的位置，即答案。这个单调分界使二分成立：相等则缺口在右，偏移则缺口在左。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">缺失把 值=下标 切成两段：首个错位下标即答案</text>
          {values.map((value, index) => {
            const c = tone(index);
            const shifted = value !== index;
            return (
              <g key={index}>
                <rect x={cx(index)} y={64} width={cellW} height={cellH} rx="7" fill={c} fillOpacity={index === 3 ? 0.14 : 0.08} stroke={c} strokeWidth={index === 3 ? 2 : 1.3} />
                {index === 3 && <text x={cx(index) + cellW / 2} y={58} textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--danger)">首个错位</text>}
                <text x={cx(index) + cellW / 2} y={90} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">下标 {index}</text>
                <text x={cx(index) + cellW / 2} y={124} textAnchor="middle" fontSize="22" fontWeight="800" fontFamily="monospace" fill="var(--text-primary)">{value}</text>
                <text x={cx(index) + cellW / 2} y={154} textAnchor="middle" fontSize="11" fontWeight="700" fill={c}>{shifted ? "值 = 下标+1" : "值 = 下标"}</text>
              </g>
            );
          })}
          <text x="276" y="216" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">缺口之前：值 = 下标</text>
          <text x="570" y="216" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">缺口之后：值 = 下标 + 1</text>
          <text x="410" y="256" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">二分：numbers[mid] == mid → 缺口在右（left = mid+1）；numbers[mid] != mid → 缺口在左或即 mid。</text>
          <text x="410" y="280" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">全部一致时缺口是 n（返回 length）；每轮舍弃一半，O(log n)、O(1)。</text>
          <text x="410" y="316" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">例：0,1,2,4,5 → mid=2 相等→搜右；mid=3 不等且左邻一致→返回3。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        缺失 3 把相等关系切成两段；答案就是第一个数值不等于下标的位置。
      </figcaption>
    </figure>
  );
}

export function MissingNumberBinarySearchLab() {
  const [cursor, setCursor] = useState(0);
  const state = searchStates[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {searchStates.map((item, index) => (
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
            <div className="text-xs text-muted">搜索区间</div>
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
            <div className="text-xs text-muted">判定</div>
            <div className="mt-1 text-sm font-semibold text-accent">{state.verdict}</div>
          </div>
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">
          {state.action}
        </p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        二分始终寻找第一个错位下标；命中相等区就舍弃左半，命中偏移区就继续向左。
      </figcaption>
    </figure>
  );
}

export function MissingNumberEdgeCaseMap() {
  const rows = [
    ["缺失 0", "1,2,3,4,5", "下标 0 立即错位", "返回 0"],
    ["缺失中间值", "0,1,2,4,5", "下标 3 首次错位", "返回 3"],
    ["缺失 n", "0,1,2,3,4", "全部位置都一致", "返回 length"],
    ["单元素缺 0", "1", "下标 0 错位", "返回 0"],
    ["单元素缺 1", "0", "循环后 left 为 1", "返回 1"],
    ["空指针", "nullptr / 0", "入口拒绝", "返回 -1"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {["场景", "数组", "关键状态", "作者结果"].map((item) => (
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
        缺失 0 和缺失 n 分别落在二分断点的两端；作者把空输入单独定义为无效。
      </figcaption>
    </figure>
  );
}

export function MissingNumberContractDiagram() {
  const rows = [
    ["顺序", "严格递增", "值与下标关系才单调", "无序时二分无保证"],
    ["值域", "每项在 0 到 n 范围", "恰有一个数字缺失", "越界值需先校验"],
    ["唯一性", "所有已有数字互异", "错位后统一偏移 1", "重复会破坏结构"],
    ["输入权限", "const int 指针", "算法只读", "不会重排原数组"],
    ["空输入", "nullptr 或 length 不正", "返回 -1", "不代表数学上的缺 0"],
    ["中点", "left 与 right 相加后右移", "大下标存在溢出风险", "改用差值写法"],
    ["复杂度", "每轮舍弃一半", "O(log n) 时间", "O(1) 额外空间"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {["维度", "作者前提或实现", "为何重要", "工程处理"].map((item) => (
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
        二分的对数复杂度来自严格契约；源码不会完整验证排序、唯一性和值域。
      </figcaption>
    </figure>
  );
}

export function MissingNumberOfficialCaseLab() {
  return (
    <CodingInterviewLab
      cases={officialCases}
      caption="作者 main 执行 6 组测试，覆盖缺口在开头、中间、末端，两个单元素分支和空指针。"
    />
  );
}
