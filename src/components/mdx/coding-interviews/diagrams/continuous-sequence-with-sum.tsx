"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const traceStates = [
  { window: "[1, 2]", sum: 3, relation: "小于 15", action: "big 扩张到 3" },
  { window: "[1, 5]", sum: 15, relation: "等于 15", action: "打印 1 到 5，再扩张到 6" },
  { window: "[1, 6]", sum: 21, relation: "大于 15", action: "连续移除 1、2、3" },
  { window: "[4, 6]", sum: 15, relation: "等于 15", action: "收缩途中打印 4 到 6" },
  { window: "[6, 7]", sum: 13, relation: "小于 15", action: "big 扩张到 8" },
  { window: "[7, 8]", sum: 15, relation: "等于 15", action: "打印 7 到 8" },
] as const;

const officialCases = [
  { label: "sum = 1", fields: [["入口", "小于 3"], ["窗口", "不创建"], ["输出", "无"], ["用途", "提前返回"]] },
  { label: "sum = 3", fields: [["序列", "1 到 2"], ["数量", "1"], ["最小合法和", "覆盖"], ["输出", "1 2"]] },
  { label: "sum = 4", fields: [["候选", "无连续正整数"], ["数量", "0"], ["输出", "无"], ["用途", "无解"]] },
  { label: "sum = 9", fields: [["序列一", "2 到 4"], ["序列二", "4 到 5"], ["数量", "2"], ["输出", "两行"]] },
  { label: "sum = 15", fields: [["序列一", "1 到 5"], ["序列二", "4 到 6"], ["序列三", "7 到 8"], ["数量", "3"]] },
  { label: "sum = 100", fields: [["序列一", "9 到 16"], ["序列二", "18 到 22"], ["数量", "2"], ["输出", "两行"]] },
] as const;

export function ContinuousSequenceWindowDiagram() {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const cellW = 60;
  const cellH = 52;
  const gapW = 8;
  const rowX = 108;
  const cx = (i: number) => rowX + i * (cellW + gapW);
  const inWindow = (v: number) => v >= 1 && v <= 5;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 330"
          role="img"
          aria-label="和为 s 的连续正整数序列双指针图。正整数 1 到 9 排成一行，small 指向 1、big 指向 5，闭区间窗口 1 到 5 被高亮。窗口和 1+2+3+4+5=15 等于目标 s，输出一组解。和小于 s 时 big 右移扩张，和大于 s 时 small 右移收缩，两指针均不回退。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">双指针滑动窗口：[small, big] 闭区间和与 s 比较</text>
          {/* 窗口范围括号 */}
          <path d={`M ${cx(0)} 62 L ${cx(0)} 54 L ${cx(4) + cellW} 54 L ${cx(4) + cellW} 62`} fill="none" stroke="var(--success)" strokeWidth="2" />
          <text x={(cx(0) + cx(4) + cellW) / 2} y="48" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">窗口 [small, big] = [1, 5]</text>
          {/* 数字行 */}
          {values.map((v, i) => (
            <g key={v}>
              <rect x={cx(i)} y={72} width={cellW} height={cellH} rx="6" fill={inWindow(v) ? "var(--success)" : "var(--bg)"} fillOpacity={inWindow(v) ? 0.12 : 1} stroke={inWindow(v) ? "var(--success)" : "var(--border)"} strokeWidth={inWindow(v) ? 1.6 : 1.2} />
              <text x={cx(i) + cellW / 2} y={72 + cellH / 2 + 6} textAnchor="middle" fontSize="18" fontWeight="700" fontFamily="monospace" fill={inWindow(v) ? "var(--success)" : "var(--text-primary)"}>{v}</text>
            </g>
          ))}
          {/* small / big 指针 */}
          <text x={cx(0) + cellW / 2} y={152} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">small</text>
          <path d={`M ${cx(0) + cellW / 2} 140 L ${cx(0) + cellW / 2} 128`} stroke="var(--accent)" strokeWidth="2" />
          <text x={cx(4) + cellW / 2} y={152} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">big</text>
          <path d={`M ${cx(4) + cellW / 2} 140 L ${cx(4) + cellW / 2} 128`} stroke="var(--accent)" strokeWidth="2" />
          {/* 求和 */}
          <text x="410" y="196" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">1 + 2 + 3 + 4 + 5 = 15 = s → 输出一组解</text>
          {/* 移动规则 */}
          <text x="410" y="236" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">和 &lt; s：big 右移一位（扩张，和严格增）</text>
          <text x="410" y="258" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">和 &gt; s：small 右移一位（收缩，和严格减）</text>
          <text x="410" y="280" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">和 = s：打印 [small, big]，随后仍扩张继续找下一组</text>
          <text x="410" y="310" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">正数保证和单调变化，两指针只需单向移动，总复杂度 O(s)。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        small 和 big 表示当前连续正整数窗口的两个闭区间端点。
      </figcaption>
    </figure>
  );
}

export function ContinuousSequenceTraceLab() {
  const [cursor, setCursor] = useState(0);
  const state = traceStates[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">{traceStates.map((item, index) => <button key={index} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>第 {index + 1} 步</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3"><div className="text-xs text-muted">窗口</div><div className="mt-1 font-semibold text-primary">{state.window}</div></div><div className="border border-border bg-background p-3"><div className="text-xs text-muted">窗口和</div><div className="mt-1 font-semibold text-primary">{state.sum}</div></div><div className="border border-accent bg-accent/10 p-3"><div className="text-xs text-muted">与目标关系</div><div className="mt-1 font-semibold text-accent">{state.relation}</div></div></div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.action}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        目标 15 的三组结果分别在扩张前检查或连续收缩途中被发现。
      </figcaption>
    </figure>
  );
}

export function ContinuousSequenceMovementMap() {
  const rows = [
    ["curSum 小于 s", "加入 big 后继", "窗口和严格增加", "寻找更大和"],
    ["curSum 等于 s", "打印当前闭区间", "作者随后仍扩张 big", "继续找其他解"],
    ["curSum 大于 s", "移除 small 并右移", "窗口和严格减小", "可连续收缩"],
    ["small 到达 middle", "最短两数和已超界", "停止", "不含单元素序列"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[820px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["状态", "动作", "单调变化", "目的"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        正数保证扩张只增、收缩只减，所以两个指针都无需回退。
      </figcaption>
    </figure>
  );
}

export function ContinuousSequenceContractDiagram() {
  const rows = [
    ["输入", "正整数 s", "s 小于 3 无解", "最小序列 1+2"],
    ["序列元素", "连续正整数", "从 1 开始搜索", "不含 0 和负数"],
    ["序列长度", "至少 2", "small 小于 middle", "单元素 s 不输出"],
    ["结果数量", "打印全部序列", "不在首次命中停止", "输出顺序按起点递增"],
    ["整数类型", "源码使用 int", "小输入正常", "大 s 的 1+s 与窗口和可溢出"],
    ["复杂度", "双指针单向移动", "O(s) 搜索", "打印成本另计"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[860px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["维度", "作者契约或实现", "结论", "边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者函数直接打印且没有返回集合；测试是示例运行，不是自动断言。
      </figcaption>
    </figure>
  );
}

export function ContinuousSequenceOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 main 展示 6 个输入：提前返回、最小解、无解、两组解、三组解和较大目标。" />;
}
