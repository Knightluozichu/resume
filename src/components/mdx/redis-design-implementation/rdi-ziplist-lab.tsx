"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type Entry = { id: number; value: string; len: number };

const INITIAL: Entry[] = [
  { id: 1, value: "ab", len: 2 },
  { id: 2, value: "cde", len: 3 },
  { id: 3, value: "f", len: 1 },
  { id: 4, value: "ghij", len: 4 },
];

export function RdiZiplistLab() {
  const [entries, setEntries] = useState<Entry[]>(INITIAL);
  const [chainUpdate, setChainUpdate] = useState(false);
  const [nextId, setNextId] = useState(5);
  const [log, setLog] = useState<string[]>([
    "初始压缩列表：zlbytes + zltail + zllen + 4 个 entry + zlend。每 entry 用变长编码记录 prevlen 与 encoding。",
  ]);

  const addSmall = useCallback(() => {
    const entry: Entry = { id: nextId, value: "xy", len: 2 };
    setEntries((prev) => [...prev, entry]);
    setNextId((p) => p + 1);
    setChainUpdate(false);
    setLog((prev) => [...prev, `插入短 entry "xy"（2 字节）：prevlen 用 1 字节，不影响后续节点。`]);
  }, [nextId]);

  const addHuge = useCallback(() => {
    // 插入 300 字节超长 entry 触发连锁更新
    const value = "Z".repeat(300);
    const entry: Entry = { id: nextId, value: "Z…(300B)", len: 300 };
    setEntries((prev) => [entry, ...prev]);
    setNextId((p) => p + 1);
    setChainUpdate(true);
    setLog((prev) => [...prev, `头部插入 300 字节超长 entry：prevlen 需要 5 字节，后续所有节点的 prevlen 都要从 1 字节扩到 5 字节——连锁更新！`]);
  }, [nextId]);

  const reset = useCallback(() => {
    setEntries(INITIAL);
    setChainUpdate(false);
    setNextId(5);
    setLog(["初始压缩列表：zlbytes + zltail + zllen + 4 个 entry + zlend。每 entry 用变长编码记录 prevlen 与 encoding。"]);
  }, []);

  const viewW = 820;
  const viewH = 330;
  const headerW = 44;
  const entryH = 34;
  const startX = 20;
  const y = 110;
  const endW = 30;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 压缩列表内存布局与连锁更新</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="压缩列表">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            ziplist：一块连续内存中的紧凑存储
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            zlbytes / zltail / zllen + entry（prevlen + encoding + data）+ zlend
          </text>

          {/* 头部 */}
          <text x={startX + headerW / 2} y={y - 8} textAnchor="middle" fontSize={11} fill={C.secondary}>头部</text>
          <rect x={startX} y={y} width={headerW} height={entryH} rx={4} fill={C.elevated} stroke={C.border} strokeWidth={1} />
          <text x={startX + headerW / 2} y={y + entryH / 2 + 4} textAnchor="middle" fontSize={11} fill={C.secondary}>zlbytes</text>

          {/* entries */}
          {entries.map((e, i) => {
            const x = startX + headerW + 6 + i * 88;
            const isHuge = e.len > 100;
            const affected = chainUpdate && i > 0;
            return (
              <g key={e.id}>
                {/* prevlen 段 */}
                <rect
                  x={x} y={y} width={20} height={entryH} rx={2}
                  fill={affected ? C.danger : C.bg}
                  stroke={affected ? C.danger : C.border}
                  strokeWidth={affected ? 1.5 : 1}
                  opacity={affected ? 0.9 : 1}
                />
                {/* encoding 段 */}
                <rect
                  x={x + 21} y={y} width={26} height={entryH} rx={2}
                  fill={isHuge ? C.warning : C.accent}
                  stroke={isHuge ? C.warning : C.accent}
                  strokeWidth={1}
                  opacity={0.85}
                />
                {/* data 段 */}
                <rect
                  x={x + 48} y={y} width={36} height={entryH} rx={2}
                  fill={C.elevated} stroke={C.border} strokeWidth={1}
                />
                <text x={x + 66} y={y + entryH / 2 + 4} textAnchor="middle" fontSize={11} fill={C.primary} fontFamily="monospace">
                  {e.value.length > 10 ? e.value.slice(0, 8) + "…" : e.value}
                </text>
                {/* prevlen 标注 */}
                <text x={x + 10} y={y - 8} textAnchor="middle" fontSize={11} fill={affected ? C.danger : C.secondary}>
                  {affected ? "prevlen 5B" : "prevlen 1B"}
                </text>
                {/* 连锁更新标记 */}
                {affected && (
                  <text x={x + 26} y={y - 8} textAnchor="middle" fontSize={11} fill={C.danger} fontWeight={600}>
                    ⚡扩展
                  </text>
                )}
              </g>
            );
          })}

          {/* 结尾 */}
          <text x={startX + headerW + 6 + entries.length * 88 + 15} y={y - 8} textAnchor="middle" fontSize={11} fill={C.secondary}>结尾</text>
          <rect
            x={startX + headerW + 6 + entries.length * 88}
            y={y} width={endW} height={entryH} rx={4}
            fill={C.danger} opacity={0.15} stroke={C.danger} strokeWidth={1}
          />
          <text
            x={startX + headerW + 6 + entries.length * 88 + endW / 2}
            y={y + entryH / 2 + 4}
            textAnchor="middle" fontSize={11} fill={C.danger}
          >
            FF
          </text>

          {/* 内存标注 */}
          <text x={viewW / 2} y={y + entryH + 28} textAnchor="middle" fontSize={11} fill={C.secondary}>
            连续内存布局，无指针开销：比链表节点省一半以上空间（链表每节点约 40 字节）
          </text>
          {chainUpdate && (
            <text x={viewW / 2} y={y + entryH + 52} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>
              ⚠️ 连锁更新：超长 entry 使后续所有节点的 prevlen 从 1 字节扩展为 5 字节，最坏 O(N²)
            </text>
          )}
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={addSmall}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            插入短 entry（"xy"）
          </button>
          <button
            onClick={addHuge}
            className="rounded-control border border-danger px-3 py-1.5 text-xs font-medium transition-colors hover:bg-danger/10"
            style={{ color: C.danger, borderColor: C.danger }}
          >
            头部插入 300 字节超长 entry（触发连锁更新）
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 说明 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs leading-relaxed" style={{ color: C.secondary }}>
            压缩列表用于小规模列表/哈希（list-max-ziplist-entries 等阈值内）。变长编码让短元素只占一两字节；代价是头部插入超长元素时可能引发连锁更新。元素过多自动转为常规结构。
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