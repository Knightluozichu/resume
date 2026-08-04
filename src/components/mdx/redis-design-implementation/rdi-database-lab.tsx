"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type Key = { name: string; ttl: number | null; expired: boolean };

const INITIAL: Key[] = [
  { name: "user:1", ttl: null, expired: false },
  { name: "session:42", ttl: 8, expired: false },
  { name: "cart:7", ttl: null, expired: false },
  { name: "token:abc", ttl: 3, expired: false },
  { name: "counter", ttl: null, expired: false },
];

export function RdiDatabaseLab() {
  const [keys, setKeys] = useState<Key[]>(INITIAL);
  const [ticks, setTicks] = useState(0);
  const [mode, setMode] = useState<"lazy" | "active">("lazy");
  const [log, setLog] = useState<string[]>([
    "数据库由键空间字典 + 过期字典组成。带 TTL 的键登记在过期字典，到点后删除。",
  ]);

  const tick = useCallback(() => {
    setTicks((p) => p + 1);
    const t = ticks + 1;
    const next = keys.map((k) => ({
      ...k,
      expired: k.ttl !== null ? t >= k.ttl : false,
    }));
    setKeys(next);
    if (mode === "lazy") {
      const expiredNow = next.filter((k) => k.expired);
      if (expiredNow.length > 0) {
        setLog((prev) => [...prev, `t=${t}：惰性删除——下次访问 ${expiredNow.map((k) => k.name).join("、")} 时发现已过期，删除并返回 nil。`]);
      } else {
        setLog((prev) => [...prev, `t=${t}：惰性删除——暂无过期键（过期键只在被访问时才检查删除）。`]);
      }
    } else {
      const expiredNow = next.filter((k) => k.expired);
      if (expiredNow.length > 0) {
        setLog((prev) => [...prev, `t=${t}：定期删除——serverCron 随机抽查，删除已过期的 ${expiredNow.map((k) => k.name).join("、")}。`]);
      } else {
        setLog((prev) => [...prev, `t=${t}：定期删除——本轮抽查未发现过期键。`]);
      }
    }
  }, [ticks, keys, mode]);

  const reset = useCallback(() => {
    setKeys(INITIAL);
    setTicks(0);
    setLog(["数据库由键空间字典 + 过期字典组成。带 TTL 的键登记在过期字典，到点后删除。"]);
  }, []);

  const viewW = 820;
  const viewH = 380;
  const keyW = 130;
  const keyH = 40;
  const startX = 20;
  const y = 100;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 数据库键空间与过期策略</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="数据库键空间与过期">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            键空间字典 + 过期字典（t={ticks}）
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            红色键已过期；点击推进时间观察删除行为
          </text>

          {/* 键空间 */}
          <text x={startX} y={y - 12} fontSize={11} fill={C.secondary} fontWeight={600}>
            键空间（dict）
          </text>
          {keys.map((k, i) => {
            const x = startX + i * (keyW + 10);
            return (
              <g key={k.name}>
                <rect
                  x={x} y={y} width={keyW} height={keyH} rx={6}
                  fill={k.expired ? C.danger : C.accent}
                  stroke={k.expired ? C.danger : C.accent}
                  strokeWidth={1.5}
                  opacity={k.expired ? 0.25 : 0.85}
                />
                <text x={x + keyW / 2} y={y + 18} textAnchor="middle" fontSize={11} fill={C.bg} fontWeight={600}>
                  {k.name}
                </text>
                <text x={x + keyW / 2} y={y + 32} textAnchor="middle" fontSize={11} fill={k.expired ? C.bg : "rgba(255,255,255,0.8)"} fontFamily="monospace">
                  {k.ttl === null ? "无 TTL" : `TTL ${k.ttl}s${k.expired ? " ⚠过期" : ""}`}
                </text>
              </g>
            );
          })}

          {/* 过期字典 */}
          <text x={startX} y={y + keyH + 45} fontSize={11} fill={C.secondary} fontWeight={600}>
            过期字典（expires）——只有带 TTL 的键在这里
          </text>
          {keys.filter((k) => k.ttl !== null).map((k, i) => {
            const x = startX + i * (keyW + 10);
            return (
              <g key={`exp-${k.name}`}>
                <rect
                  x={x} y={y + keyH + 55} width={keyW} height={30} rx={4}
                  fill={k.expired ? C.danger : C.elevated}
                  stroke={k.expired ? C.danger : C.border}
                  strokeWidth={1}
                />
                <text x={x + keyW / 2} y={y + keyH + 55 + 20} textAnchor="middle" fontSize={11} fill={k.expired ? C.bg : C.primary}>
                  {k.name} @ t={k.ttl}
                </text>
              </g>
            );
          })}
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as "lazy" | "active")}
            className="rounded-control border border-border px-2 py-1.5 text-xs"
            style={{ background: C.bg, color: C.primary }}
          >
            <option value="lazy">惰性删除（访问时检查）</option>
            <option value="active">定期删除（周期抽查）</option>
          </select>
          <button
            onClick={tick}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            推进 1 秒（t={ticks + 1}）
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 说明 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs leading-relaxed" style={{ color: C.secondary }}>
            惰性删除省 CPU 但可能堆积内存；定期删除（serverCron 每秒 10 次随机抽查）兜底。两者配合：惰性为主、定期为辅，在内存与算力间平衡。
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