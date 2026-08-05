"use client";

import { useState } from "react";
export function BalancedBinaryTreeLocalRuleDiagram() {
  const cases = [
    { title: "完全树", left: 2, right: 2, diff: 0, ok: true, x: 150 },
    { title: "非完全但平衡", left: 3, right: 2, diff: 1, ok: true, x: 410 },
    { title: "局部偏斜", left: 3, right: 1, diff: 2, ok: false, x: 670 },
  ] as const;
  const N = ({ x, y, tone }: { x: number; y: number; tone: string }) => (
    <circle cx={x} cy={y} r="11" fill={tone} fillOpacity="0.15" stroke={tone} strokeWidth="1.5" />
  );
  const E = ({ x1, y1, x2, y2, tone }: { x1: number; y1: number; x2: number; y2: number; tone: string }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone} strokeWidth="1.4" />
  );
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 400"
          role="img"
          aria-label="平衡二叉树判定图。平衡指任一节点的左右子树深度差不超过 1。三种形态：完全树左右深度都 2、差 0，平衡；非完全但平衡的树左深 3 右深 2、差 1，仍平衡（完全不等于平衡）；局部偏斜的树左深 3 右深 1、差 2，失衡。平衡检查作用于每个节点，任一节点差值超过 1 就失败。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">平衡 = 任一节点左右深度差 ≤ 1</text>
          {cases.map((c) => {
            const tone = c.ok ? "var(--success)" : "var(--danger)";
            const rx = c.x;
            return (
              <g key={c.title}>
                <rect x={rx - 118} y={52} width={236} height={252} rx="10" fill={tone} fillOpacity="0.05" stroke={tone} strokeWidth="1.5" />
                <text x={rx} y={76} textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--text-primary)">{c.title}</text>
                {/* 小树 */}
                <E x1={rx} y1={104} x2={rx - 40} y2={140} tone={tone} />
                <E x1={rx} y1={104} x2={rx + 40} y2={140} tone={tone} />
                <N x={rx} y={96} tone={tone} />
                <N x={rx - 40} y={148} tone={tone} />
                <N x={rx + 40} y={148} tone={tone} />
                {/* 左侧深度 */}
                <E x1={rx - 40} y1={158} x2={rx - 56} y2={192} tone={tone} />
                <N x={rx - 56} y={200} tone={tone} />
                {c.left >= 3 && <g><E x1={rx - 56} y1={210} x2={rx - 66} y2={240} tone={tone} /><N x={rx - 66} y={248} tone={tone} /></g>}
                {/* 右侧深度 */}
                {c.right >= 2 && <g><E x1={rx + 40} y1={158} x2={rx + 56} y2={192} tone={tone} /><N x={rx + 56} y={200} tone={tone} /></g>}
                {c.right >= 3 && <g><E x1={rx + 56} y1={210} x2={rx + 66} y2={240} tone={tone} /><N x={rx + 66} y={248} tone={tone} /></g>}
                <text x={rx} y={280} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">左深 {c.left} / 右深 {c.right}，差 {c.diff}</text>
                <text x={rx} y={298} textAnchor="middle" fontSize="13" fontWeight="800" fill={tone}>{c.ok ? "平衡" : "失衡"}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        平衡检查作用于每个节点；非完全树也可以平衡，任一节点差值超过 1 就失败。
      </figcaption>
    </figure>
  );
}
export function BalancedBinaryTreeWorkDiagram() {
  const rows = [
    ["方案一", "当前节点先各求一次左右深度", "再递归检查两个孩子", "同一子树可能被反复求深度"],
    ["方案二", "孩子返回平衡状态与深度", "当前节点只做常数次比较", "每个节点只遍历一次"],
    ["哨兵版", "高度函数以 -1 表示失衡", "单一返回值携带两种状态", "与方案二语义等价"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[820px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["实现", "取得信息", "当前工作", "遍历代价"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者先给出重复求深度的直观方案，再用深度出参把平衡检查合并进一次后序遍历。
      </figcaption>
    </figure>
  );
}

export function BalancedBinaryTreeContractMap() {
  const rows = [
    ["空树", "平衡，深度 0", "true", "递归基例"],
    ["局部阈值", "左右深度差在 -1 到 1", "继续向父层", "包含正负方向"],
    ["子树失败", "布尔 false", "短路另一分支或父层", "深度值不可再读"],
    ["完全性", "不要求每层填满", "与平衡独立", "Test2 专门覆盖"],
    ["时间", "优化版每节点一次", "O(n)", "朴素版有重复深度计算"],
    ["空间", "递归栈 O(h)", "斜树 O(n)", "与上一题相同"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[820px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["维度", "作者契约", "结果", "说明"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        空树与单节点都平衡；优化版在 false 路径不承诺输出深度。
      </figcaption>
    </figure>
  );
}
