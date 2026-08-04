"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type LNode = { id: number; value: string };

const INITIAL: LNode[] = [
  { id: 1, value: "A" }, { id: 2, value: "B" }, { id: 3, value: "C" }, { id: 4, value: "D" },
];

const NEW_VALUES = ["E", "F", "G", "H", "I", "J", "K", "L"];

export function RdiLinkedListLab() {
  const [nodes, setNodes] = useState<LNode[]>(INITIAL);
  const [nextId, setNextId] = useState(5);
  const [insertPos, setInsertPos] = useState<"head" | "tail">("head");
  const [log, setLog] = useState<string[]>([
    "初始链表：双端无环结构。head → A ⇄ B ⇄ C ⇄ D ← tail，len=4。",
  ]);

  const insert = useCallback(() => {
    const value = NEW_VALUES[(nextId - 5) % NEW_VALUES.length];
    const node: LNode = { id: nextId, value };
    const next = insertPos === "head" ? [node, ...nodes] : [...nodes, node];
    setNodes(next);
    setNextId((p) => p + 1);
    setLog((prev) => [...prev, `LPUSH/RPUSH "${value}"：${insertPos === "head" ? "插入表头" : "追加表尾"}，O(1)，len=${next.length}。`]);
  }, [nodes, insertPos, nextId]);

  const pop = useCallback(() => {
    if (nodes.length === 0) return;
    const removed = insertPos === "head" ? nodes[0] : nodes[nodes.length - 1];
    const next = insertPos === "head" ? nodes.slice(1) : nodes.slice(0, -1);
    setNodes(next);
    setLog((prev) => [...prev, `LPOP/RPOP "${removed.value}"：从${insertPos === "head" ? "表头" : "表尾"}移除，O(1)，len=${next.length}。`]);
  }, [nodes, insertPos]);

  const reset = useCallback(() => {
    setNodes(INITIAL);
    setNextId(5);
    setLog(["初始链表：双端无环结构。head → A ⇄ B ⇄ C ⇄ D ← tail，len=4。"]);
  }, []);

  const viewW = 820;
  const viewH = 300;
  const nodeW = 90;
  const nodeH = 44;
  const gap = 18;
  const totalW = nodes.length * nodeW + (nodes.length - 1) * gap;
  const startX = (viewW - totalW) / 2;
  const nodeY = 120;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 双端链表结构可视化</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="双端链表">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            双端无环链表（head / tail / len）
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            prev 与 next 双向指针；两端操作 O(1)；len 字段让计数 O(1)
          </text>

          {/* head 标记 */}
          <text x={startX - 60} y={nodeY + nodeH / 2 + 4} textAnchor="middle" fontSize={11} fill={C.accent} fontWeight={600}>
            head
          </text>

          {/* 节点 + 双向箭头 */}
          {nodes.map((n, i) => {
            const x = startX + i * (nodeW + gap);
            return (
              <g key={n.id}>
                <rect
                  x={x} y={nodeY} width={nodeW} height={nodeH} rx={6}
                  fill={C.elevated} stroke={C.accent} strokeWidth={1.5}
                />
                {/* prev 箭头 */}
                {i > 0 && (
                  <g>
                    <line x1={x - gap / 2 + 3} y1={nodeY + nodeH / 2 - 6} x2={x - 4} y2={nodeY + nodeH / 2 - 6} stroke={C.border} strokeWidth={1.2} />
                    <polygon points={`${x - 4},${nodeY + nodeH / 2 - 8} ${x - 4},${nodeY + nodeH / 2 - 4} ${x - 1},${nodeY + nodeH / 2 - 6}`} fill={C.border} />
                    <text x={x - gap / 2} y={nodeY + nodeH / 2 - 14} textAnchor="middle" fontSize={11} fill={C.secondary}>prev</text>
                  </g>
                )}
                {/* next 箭头 */}
                {i < nodes.length - 1 && (
                  <g>
                    <line x1={x + nodeW + 4} y1={nodeY + nodeH / 2 + 6} x2={x + nodeW + gap - 3} y2={nodeY + nodeH / 2 + 6} stroke={C.border} strokeWidth={1.2} />
                    <polygon points={`${x + nodeW + gap - 3},${nodeY + nodeH / 2 + 4} ${x + nodeW + gap - 3},${nodeY + nodeH / 2 + 8} ${x + nodeW + gap},${nodeY + nodeH / 2 + 6}`} fill={C.border} />
                    <text x={x + nodeW + gap / 2} y={nodeY + nodeH / 2 + 18} textAnchor="middle" fontSize={11} fill={C.secondary}>next</text>
                  </g>
                )}
                <text x={x + nodeW / 2} y={nodeY + nodeH / 2 + 4} textAnchor="middle" fontSize={14} fill={C.primary} fontWeight={600}>
                  {n.value}
                </text>
                {/* id */}
                <text x={x + nodeW / 2} y={nodeY + nodeH + 16} textAnchor="middle" fontSize={11} fill={C.secondary}>
                  N{n.id}
                </text>
              </g>
            );
          })}

          {/* tail 标记 */}
          {nodes.length > 0 && (
            <text x={startX + totalW + 60} y={nodeY + nodeH / 2 + 4} textAnchor="middle" fontSize={11} fill={C.accent} fontWeight={600}>
              tail
            </text>
          )}

          {/* len 信息 */}
          <text x={viewW / 2} y={nodeY + nodeH + 40} textAnchor="middle" fontSize={12} fill={C.secondary}>
            len = <tspan fontWeight={700} fill={C.accent}>{nodes.length}</tspan>（O(1) 读取，无需遍历）
          </text>
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <select
            value={insertPos}
            onChange={(e) => setInsertPos(e.target.value as "head" | "tail")}
            className="rounded-control border border-border px-2 py-1.5 text-xs"
            style={{ background: C.bg, color: C.primary }}
          >
            <option value="head">操作表头（LPUSH/LPOP）</option>
            <option value="tail">操作表尾（RPUSH/RPOP）</option>
          </select>
          <button
            onClick={insert}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            插入节点
          </button>
          <button
            onClick={pop}
            disabled={nodes.length === 0}
            className="rounded-control border border-danger px-3 py-1.5 text-xs font-medium transition-colors hover:bg-danger/10 disabled:opacity-40"
            style={{ color: C.danger, borderColor: C.danger }}
          >
            弹出节点
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 说明 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs leading-relaxed" style={{ color: C.secondary }}>
            链表用于列表键（元素多时）与发布订阅的订阅者表。相比压缩列表，链表的优势是两端操作 O(1) 且可容纳任意长度元素；代价是每个节点约 40 字节指针开销。Redis 3.2 后列表底层改为 quicklist（压缩列表分段 + 双向链表）。
          </div>
        </div>

        {/* 日志 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="mb-1 text-xs font-semibold" style={{ color: C.primary }}>操作日志</div>
          <ol className="flex flex-col gap-1 text-xs" style={{ color: C.secondary }}>
            {log.map((line, i) => (
              <li key={i} className="leading-relaxed">
                <span className="mr-1 font-mono" style={{ color: C.accent }}>{i + 1}.</span>
                {line}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}