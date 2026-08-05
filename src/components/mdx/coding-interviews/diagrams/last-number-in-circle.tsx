"use client";

import { useState } from "react";
export function LastNumberCircleDiagram() {
  const cx = 410;
  const cy = 188;
  const R = 128;
  const r = 24;
  const pos = (i: number) => {
    const a = ((-90 + i * 72) * Math.PI) / 180;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  };
  const tone = (v: number) => (v === 2 ? "var(--danger)" : v === 0 ? "var(--accent)" : "var(--border)");
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 420"
          role="img"
          aria-label="圆圈中最后剩下的数字（约瑟夫环）图。0、1、2、3、4 围成一圈，n=5、m=3。从 0 开始报数，把当前节点算第一个，数到第 3 个删除：首次删除 2，下一轮从 3 重新报数。依次删除 2、0、4、1，最后剩下 3。递推公式 f(n,m) = (f(n-1,m)+m) % n，f(1,m)=0，不必真的维护圆圈。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">约瑟夫环：从 0 报数，数到第 m 个删除，后继重新报数</text>
          {/* 圆圈 */}
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--border)" strokeWidth="1.4" strokeDasharray="4 4" />
          {[0, 1, 2, 3, 4].map((v) => {
            const p = pos(v);
            const c = tone(v);
            const special = v === 2 || v === 0;
            return (
              <g key={v}>
                <circle cx={p.x} cy={p.y} r={r} fill={special ? c : "var(--bg)"} fillOpacity={special ? 0.14 : 1} stroke={c} strokeWidth={v === 2 ? 2 : 1.4} />
                <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="16" fontWeight="800" fontFamily="monospace" fill={special ? c : "var(--text-primary)"}>{v}</text>
              </g>
            );
          })}
          {/* 中心说明 */}
          <text x={cx} y={cy - 8} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">n=5, m=3</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--danger)">首次删除 2</text>
          <text x={cx} y={cy + 30} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">下一轮从 3 开始</text>
          {/* 起点标注 */}
          <text x={pos(0).x} y={pos(0).y - 32} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">起点 0</text>
          {/* 删除顺序与递推 */}
          <text x="410" y="348" textAnchor="middle" fontSize="13" fill="var(--text-primary)">删除顺序：2 → 0 → 4 → 1，最后剩下 <tspan fontWeight="800" fill="var(--success)">3</tspan></text>
          <text x="410" y="376" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">递推：f(n,m) = (f(n-1,m) + m) % n，f(1,m) = 0</text>
          <text x="410" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从 f(1,3)=0 逐步恢复到 f(5,3)=3；O(n) 时间、O(1) 空间，无需维护圆圈。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从 0 开始把当前节点算第一个；每次删除后，从它的后继重新报数。
      </figcaption>
    </figure>
  );
}
export function LastNumberRelabelMap() {
  const rows = [
    ["新编号 0", "旧编号 3", "(0+3)%5", "删除 2 后的新起点"],
    ["新编号 1", "旧编号 4", "(1+3)%5", "顺时针下一项"],
    ["新编号 2", "旧编号 0", "(2+3)%5", "跨过环尾"],
    ["新编号 3", "旧编号 1", "(3+3)%5", "删除点之前"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["长度 4 子问题", "原长度 5 编号", "逆向映射", "含义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        删除旧编号 2 后，把旧编号 3 当作新 0；新结果加 m 再模 n 即映回旧坐标。
      </figcaption>
    </figure>
  );
}
