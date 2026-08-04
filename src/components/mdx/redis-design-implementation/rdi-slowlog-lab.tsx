"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type SlowEntry = { id: number; cmd: string; us: number; reason: string };

const CMD_POOL = [
  ["KEYS *", 12000, "全库扫描所有键"],
  ["SMEMBERS users:set", 8500, "大集合全量返回"],
  ["SORT mylist", 6200, "大列表排序"],
  ["LRANGE list 0 -1", 4800, "大列表全范围返回"],
  ["HGETALL big:hash", 3500, "大哈希全量返回"],
  ["ZRANGE zset 0 -1", 2800, "大有序集合全量返回"],
];

export function RdiSlowlogLab() {
  const [entries, setEntries] = useState<SlowEntry[]>([]);
  const [threshold, setThreshold] = useState(5000);
  const [nextId, setNextId] = useState(1);
  const [log, setLog] = useState<string[]>([
    "慢查询日志：记录执行时间超过 slowlog-log-slower-than 微秒的命令。仅计执行时间，不含排队与网络。",
  ]);

  const execute = useCallback(() => {
    const [cmd, us, reason] = CMD_POOL[(nextId - 1) % CMD_POOL.length];
    const entry: SlowEntry = { id: nextId, cmd: cmd as string, us: us as number, reason: reason as string };
    setNextId((p) => p + 1);
    if (entry.us >= threshold) {
      setEntries((prev) => [entry, ...prev].slice(0, 10));
      setLog((prev) => [...prev, `⏱ ${entry.cmd}：${entry.us}μs > ${threshold}μs，已记录慢日志（ID=${entry.id}）。`]);
    } else {
      setLog((prev) => [...prev, `✓ ${entry.cmd}：${entry.us}μs < ${threshold}μs，正常范围，不记录。`]);
    }
  }, [threshold, nextId]);

  const reset = useCallback(() => {
    setEntries([]);
    setNextId(1);
    setLog(["慢查询日志：记录执行时间超过 slowlog-log-slower-than 微秒的命令。仅计执行时间，不含排队与网络。"]);
  }, []);

  const viewW = 820;
  const viewH = 340;
  const tableX = 30;
  const tableY = 100;
  const colW = [50, 200, 100, 300];

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 慢查询日志记录与分析</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="慢查询日志">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            慢查询日志（阈值：{threshold}μs，记录 {entries.length} 条）
          </text>

          {/* 阈值条 */}
          <rect x={60} y={60} width={600} height={20} rx={10} fill={C.elevated} stroke={C.border} strokeWidth={1} />
          <rect x={60} y={60} width={Math.min(600, (threshold / 15000) * 600)} height={20} rx={10} fill={C.warning} opacity={0.5} />
          <text x={60 + 600 + 8} y={75} fontSize={11} fill={C.secondary}>0μs — {threshold}μs — 15000μs</text>

          {/* 表头 */}
          <text x={tableX} y={tableY - 6} fontSize={11} fontWeight={600} fill={C.primary}>ID</text>
          <text x={tableX + colW[0]} y={tableY - 6} fontSize={11} fontWeight={600} fill={C.primary}>命令</text>
          <text x={tableX + colW[0] + colW[1]} y={tableY - 6} fontSize={11} fontWeight={600} fill={C.primary}>耗时</text>
          <text x={tableX + colW[0] + colW[1] + colW[2]} y={tableY - 6} fontSize={11} fontWeight={600} fill={C.primary}>说明</text>

          <line x1={tableX} y1={tableY + 2} x2={tableX + colW.reduce((a, b) => a + b)} y2={tableY + 2} stroke={C.border} strokeWidth={1} />

          {entries.slice(0, 6).map((e, i) => {
            const y = tableY + 20 + i * 28;
            const isSlow = e.us >= threshold;
            return (
              <g key={e.id}>
                <rect x={tableX} y={y - 4} width={colW.reduce((a, b) => a + b)} height={24} rx={4} fill={isSlow ? C.danger : C.bg} opacity={isSlow ? 0.06 : 0} />
                <text x={tableX + 6} y={y + 6} fontSize={11} fill={C.secondary} fontFamily="monospace">{e.id}</text>
                <text x={tableX + colW[0] + 6} y={y + 6} fontSize={11} fontFamily="monospace" fill={C.primary}>{e.cmd}</text>
                <text x={tableX + colW[0] + colW[1] + 6} y={y + 6} fontSize={11} fill={isSlow ? C.danger : C.success} fontWeight={600}>{e.us}μs</text>
                <text x={tableX + colW[0] + colW[1] + colW[2] + 6} y={y + 6} fontSize={11} fill={C.secondary}>{e.reason}</text>
              </g>
            );
          })}
          {entries.length === 0 && (
            <text x={tableX + colW[0]} y={tableY + 50} fontSize={11} fill={C.secondary}>（暂无慢查询，执行命令后超阈值的命令会出现在这里）</text>
          )}
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <select
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="rounded-control border border-border px-2 py-1.5 text-xs"
            style={{ background: C.bg, color: C.primary }}
          >
            <option value="1000">阈值 1000μs（1ms）</option>
            <option value="5000">阈值 5000μs（5ms）</option>
            <option value="10000">阈值 10000μs（10ms）</option>
          </select>
          <button
            onClick={execute}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            执行一条命令
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 说明 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs leading-relaxed" style={{ color: C.secondary }}>
            慢日志只计命令执行耗时，不含排队与网络传输。SLOWLOG GET 查看，SLOWLOG RESET 清理。生产环境阈值通常设为 10ms（10000μs），按业务延迟要求收紧。定期巡检可发现被忽略的性能问题。
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