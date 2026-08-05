"use client";

import { useState } from "react";
export function GreatestSumRecurrenceDiagram() {
  const values = [1, -2, 3, 10, -4, 7, 2, -5];
  const currents = [1, -1, 3, 13, 9, 16, 18, 13];
  const cellW = 76;
  const cellH = 52;
  const gapW = 8;
  const rowX = 78;
  const cx = (i: number) => rowX + i * (cellW + gapW);
  const inBest = (i: number) => i >= 2 && i <= 6;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 400"
          role="img"
          aria-label="最大子数组和动态规划图。数组 1、-2、3、10、-4、7、2、-5。current 表示必须以当前位置结尾的最大子数组和：此前 current 大于 0 就延续旧段，否则从当前元素重启。各位置 current 依次为 1、-1、3、13、9、16、18、13，best 取最大值 18，对应下标 2 到 6 的段 3、10、-4、7、2。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">current = 以当前位置结尾的最大和；best = 全程最大</text>
          {/* 数组行 */}
          {values.map((v, i) => (
            <g key={"v" + i}>
              <rect x={cx(i)} y={64} width={cellW} height={cellH} rx="6" fill={inBest(i) ? "var(--success)" : "var(--bg)"} fillOpacity={inBest(i) ? 0.12 : 1} stroke={inBest(i) ? "var(--success)" : "var(--border)"} strokeWidth={inBest(i) ? 1.6 : 1.2} />
              <text x={cx(i) + cellW / 2} y={64 + cellH / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="700" fontFamily="monospace" fill={inBest(i) ? "var(--success)" : "var(--text-primary)"}>{v}</text>
            </g>
          ))}
          {/* current 行 */}
          <text x={rowX - 12} y={150} textAnchor="end" fontSize="11" fill="var(--text-secondary)">current</text>
          {currents.map((c, i) => (
            <text key={"c" + i} x={cx(i) + cellW / 2} y={150} textAnchor="middle" fontSize="14" fontWeight={c === 18 ? 800 : 600} fontFamily="monospace" fill={c === 18 ? "var(--success)" : "var(--accent)"}>{c}</text>
          ))}
          {/* 最佳段括号 */}
          <path d={`M ${cx(2)} 168 L ${cx(2)} 176 L ${cx(6) + cellW} 176 L ${cx(6) + cellW} 168`} fill="none" stroke="var(--success)" strokeWidth="2" />
          <text x={(cx(2) + cx(6) + cellW) / 2} y={196} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">最佳段 [2..6]：3+10-4+7+2 = 18 = best</text>
          {/* 递推规则 */}
          <text x="410" y="236" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">递推：此前 current &gt; 0 → current + value（延续旧段）</text>
          <text x="410" y="260" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">此前 current ≤ 0 → value（负前缀只会拖低后续，从当前重启）</text>
          <text x="410" y="284" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">每步 best = max(best, current)，汇总所有结尾位置</text>
          <text x="410" y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">例：到 -2 时 current=-1（延续）；到 3 时此前 current 不正→从 3 重启；best 从最小整数起计，全负数组也能选中最大单元素。</text>
          <text x="410" y="346" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">一次遍历 O(n) 时间、O(1) 空间。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        current只表示“必须以当前位置结尾”的最佳非空子数组，best再汇总所有结尾位置。
      </figcaption>
    </figure>
  );
}
export function GreatestSumAllNegativeDiagram() {
  const rows = [
    ["-2", "-2", "-2", "首个非空候选"],
    ["-8", "-8", "-2", "此前和不正，从-8重启"],
    ["-1", "-1", "-1", "最大单元素刷新答案"],
    ["-5", "-5", "-1", "重启但不刷新"],
    ["-9", "-9", "-1", "最终答案不是0"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["当前值", "current", "best", "非空语义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        best从最小整数而非0开始，确保全负数组选择最大的单个元素-1。
      </figcaption>
    </figure>
  );
}

export function GreatestSumContractDiagram() {
  const rows = [
    ["有效数组，最大和为0", "0 / false", "例如-1,0,-2", "必须读取标志"],
    ["空指针或长度不正", "0 / true", "立即返回", "全局状态表达失败"],
    ["0x80000000初始化", "MSVC常得到INT_MIN", "跨实现转换有风险", "用numeric_limits最低值"],
    ["current加法", "int相加", "溢出是未定义行为", "提升到int64_t或检查"],
    ["并发调用", "共享g_InvalidInput", "线程互相覆盖", "值与状态绑定返回"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["场景", "作者结果", "风险", "工程修复"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者用返回0加全局标志区分无效输入；现代接口应避免哨兵、全局状态和有符号溢出。
      </figcaption>
    </figure>
  );
}
