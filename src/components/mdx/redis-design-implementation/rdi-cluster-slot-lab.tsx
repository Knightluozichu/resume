"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

const TOTAL_SLOTS = 128; // 用 128 个槽代表 16384 个
const INITIAL_NODES = 3;
const NODE_COLORS = [C.accent, C.success, C.warning, C.danger, "#8b5cf6", "#ec4899"];

type SlotState = { owner: number; migrating: boolean };

export function RdiClusterSlotLab() {
  const [nodeCount, setNodeCount] = useState(INITIAL_NODES);
  const [slots, setSlots] = useState<SlotState[]>(() =>
    Array.from({ length: TOTAL_SLOTS }, (_, i) => ({ owner: i % INITIAL_NODES, migrating: false })));
  const [migrating, setMigrating] = useState(false);
  const [batch, setBatch] = useState(0);
  const [log, setLog] = useState<string[]>([
    `初始化：${TOTAL_SLOTS} 个槽均匀分布在 ${INITIAL_NODES} 个节点上。`,
  ]);

  const addNode = useCallback(() => {
    if (nodeCount >= 6) return;
    setNodeCount((p) => p + 1);
    setLog((prev) => [...prev, `新增节点 N${nodeCount + 1}，准备重新分片。`]);
  }, [nodeCount]);

  const migrateSlots = useCallback(() => {
    if (nodeCount < 4) return;
    const newOwner = nodeCount - 1;
    const slotsToMigrate = slots.filter((s) => s.owner === 0 && !s.migrating).slice(0, 8);
    if (slotsToMigrate.length === 0) return;
    const next = [...slots];
    let migrated = 0;
    for (const s of slotsToMigrate) {
      const idx = next.indexOf(s);
      if (idx >= 0) {
        next[idx] = { owner: newOwner, migrating: false };
        migrated++;
      }
    }
    setSlots(next);
    setBatch((p) => p + 1);
    setLog((prev) => [...prev, `迁移 ${migrated} 个槽到 N${newOwner + 1}（批次 ${batch + 1}）。`]);
  }, [slots, nodeCount, batch]);

  const reset = useCallback(() => {
    setNodeCount(INITIAL_NODES);
    setSlots(Array.from({ length: TOTAL_SLOTS }, (_, i) => ({ owner: i % INITIAL_NODES, migrating: false })));
    setMigrating(false);
    setBatch(0);
    setLog([`初始化：${TOTAL_SLOTS} 个槽均匀分布在 ${INITIAL_NODES} 个节点上。`]);
  }, []);

  const viewW = 820;
  const viewH = 440;
  const slotW = 6;
  const slotH = 12;
  const slotsPerRow = 64;
  const rows = Math.ceil(TOTAL_SLOTS / slotsPerRow);
  const gridW = slotsPerRow * (slotW + 1);
  const startX = (viewW - gridW) / 2;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ Redis 集群槽分配与迁移</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="Redis 集群槽分配">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            Redis 集群槽分配（{TOTAL_SLOTS} 个槽，{nodeCount} 个节点）
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            每格代表一个槽，颜色表示所属节点；新增节点后用迁移按钮重新分配
          </text>

          {/* 图例 */}
          <g>
            {Array.from({ length: nodeCount }).map((_, i) => (
              <g key={`legend-${i}`} transform={`translate(${50 + i * 120}, 75)`}>
                <rect x={0} y={0} width={12} height={12} rx={2} fill={NODE_COLORS[i % NODE_COLORS.length]} />
                <text x={18} y={10} fontSize={11} fill={C.primary}>N{i + 1}</text>
              </g>
            ))}
          </g>

          {/* 槽网格 */}
          {slots.map((s, i) => {
            const row = Math.floor(i / slotsPerRow);
            const col = i % slotsPerRow;
            const x = startX + col * (slotW + 1);
            const y = 100 + row * (slotH + 2);
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={slotW}
                height={slotH}
                rx={1}
                fill={NODE_COLORS[s.owner % NODE_COLORS.length]}
                opacity={s.migrating ? 0.5 : 0.85}
                stroke={s.migrating ? C.warning : "none"}
                strokeWidth={s.migrating ? 1 : 0}
              />
            );
          })}

          {/* 统计 */}
          <text x={viewW / 2} y={100 + rows * (slotH + 2) + 30} textAnchor="middle" fontSize={11} fill={C.secondary}>
            槽数：
            {Array.from({ length: nodeCount }).map((_, i) => {
              const count = slots.filter((s) => s.owner === i).length;
              return ` N${i + 1}=${count}`;
            })}
          </text>
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={addNode}
            disabled={nodeCount >= 6}
            className="rounded-control border border-success px-3 py-1.5 text-xs font-medium transition-colors hover:bg-success/10 disabled:opacity-40"
            style={{ color: C.success, borderColor: C.success }}
          >
            + 新增节点（{nodeCount}/6）
          </button>
          <button
            onClick={migrateSlots}
            disabled={nodeCount < 4}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10 disabled:opacity-40"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            迁移槽到新节点
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 说明 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs" style={{ color: C.secondary }}>
            16384 个槽是 Redis 集群的固定值。槽是键到节点的映射单位，也是重新分片的最小迁移单元。每个槽在迁移期间会返回 ASK 转向，客户端收到后重定向到目标节点。
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