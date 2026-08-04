"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type Phase = { id: string; label: string; desc: string };
const PHASES: Phase[] = [
  { id: "handshake", label: "握手", desc: "从库 SLAVEOF 主库，建立 TCP 连接并同步 runid/offset。" },
  { id: "fullsync", label: "全量同步", desc: "主库 BGSAVE 生成 RDB 发送，从库加载，期间命令进积压缓冲区。" },
  { id: "catchup", label: "追增量", desc: "RDB 加载完成后，从库追平缓冲区中的增量命令。" },
  { id: "steady", label: "命令传播", desc: "进入稳定态：主库每个写命令实时传播给从库。" },
];

export function RdiReplicationLab() {
  const [phase, setPhase] = useState(0);
  const [replBacklog, setReplBacklog] = useState(500);
  const [connected, setConnected] = useState(true);
  const [log, setLog] = useState<string[]>([
    "复制：全量同步（RDB）+ 命令传播（增量）+ PSYNC 断线续传。",
  ]);

  const advance = useCallback(() => {
    if (phase < PHASES.length - 1) {
      const next = phase + 1;
      setPhase(next);
      setLog((prev) => [...prev, `阶段 ${next + 1}：${PHASES[next].label}——${PHASES[next].desc}`]);
    }
  }, [phase]);

  const writeCommand = useCallback(() => {
    setLog((prev) => [...prev, `主库执行写命令，传播给从库（offset+1）。`]);
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setPhase(2);
    setLog((prev) => [...prev, "⚠️ 从库断线：offset 停在当前值。若重连时 offset 仍在 repl-backlog 内，可部分同步（PSYNC）。"]);
  }, []);

  const reconnect = useCallback(() => {
    setConnected(true);
    setReplBacklog(500);
    setLog((prev) => [...prev, `✅ 从库重连：offset 在 repl-backlog（${replBacklog} 字节）覆盖范围内，仅同步增量，免全量。`]);
  }, [replBacklog]);

  const reset = useCallback(() => {
    setPhase(0);
    setReplBacklog(500);
    setConnected(true);
    setLog(["复制：全量同步（RDB）+ 命令传播（增量）+ PSYNC 断线续传。"]);
  }, []);

  const viewW = 820;
  const viewH = 330;
  const nodeW = 150;
  const nodeH = 50;
  const startX = 60;
  const y = 120;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 主从复制与同步流程</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="主从复制">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            主从复制（当前阶段：{PHASES[phase].label}）
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            {connected ? "连接正常" : "⚠️ 从库已断线"}
          </text>

          {/* Master */}
          <rect x={startX} y={y} width={nodeW} height={nodeH} rx={8} fill={C.accent} opacity={0.85} />
          <text x={startX + nodeW / 2} y={y + 26} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.bg}>Master</text>
          <text x={startX + nodeW / 2} y={y + 42} textAnchor="middle" fontSize={11} fill="rgba(255,255,255,0.85)">BGSAVE / 传播命令</text>

          {/* 箭头 + 数据流 */}
          <text x={startX + nodeW + 60} y={y + nodeH / 2 + 4} textAnchor="middle" fontSize={16} fill={C.accent}>
            {phase === 1 ? "RDB ⬇" : phase === 3 ? "命令 ⬇" : "⇄"}
          </text>

          {/* Slave */}
          <rect x={startX + nodeW + 130} y={y} width={nodeW} height={nodeH} rx={8} fill={connected ? C.success : C.danger} opacity={connected ? 0.85 : 0.6} />
          <text x={startX + nodeW + 130 + nodeW / 2} y={y + 26} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.bg}>Slave</text>
          <text x={startX + nodeW + 130 + nodeW / 2} y={y + 42} textAnchor="middle" fontSize={11} fill="rgba(255,255,255,0.85)">
            {phase === 1 ? "加载 RDB" : connected ? "同步执行命令" : "断线"}
          </text>

          {/* 阶段步骤 */}
          <g>
            {PHASES.map((p, i) => {
              const x = startX + i * 140;
              const y2 = y + nodeH + 60;
              const isActive = i === phase;
              const isDone = i < phase;
              return (
                <g key={p.id}>
                  <circle cx={x + 10} cy={y2} r={8} fill={isDone ? C.success : isActive ? C.accent : C.bg} stroke={C.border} strokeWidth={1.5} />
                  <text x={x + 10} y={y2 + 4} textAnchor="middle" fontSize={11} fontWeight={600} fill={isDone || isActive ? C.bg : C.secondary}>{i + 1}</text>
                  <text x={x + 10} y={y2 + 22} textAnchor="middle" fontSize={11} fill={isActive ? C.primary : C.secondary} fontWeight={isActive ? 600 : 400}>{p.label}</text>
                </g>
              );
            })}
          </g>

          {/* 积压缓冲区 */}
          <text x={viewW / 2} y={y + nodeH + 110} textAnchor="middle" fontSize={11} fill={C.secondary}>
            repl-backlog = {replBacklog} 字节（PSYNC 部分同步的覆盖窗口）
          </text>
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={advance}
            disabled={phase >= PHASES.length - 1}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10 disabled:opacity-40"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            {phase >= PHASES.length - 1 ? "✅ 已同步" : "推进同步阶段"}
          </button>
          <button
            onClick={writeCommand}
            disabled={!connected || phase < 3}
            className="rounded-control border border-success px-3 py-1.5 text-xs font-medium transition-colors hover:bg-success/10 disabled:opacity-40"
            style={{ color: C.success, borderColor: C.success }}
          >
            写命令传播
          </button>
          <button
            onClick={disconnect}
            disabled={!connected}
            className="rounded-control border border-danger px-3 py-1.5 text-xs font-medium transition-colors hover:bg-danger/10 disabled:opacity-40"
            style={{ color: C.danger, borderColor: C.danger }}
          >
            模拟断线
          </button>
          <button
            onClick={reconnect}
            disabled={connected}
            className="rounded-control border border-warning px-3 py-1.5 text-xs font-medium transition-colors hover:bg-warning/10 disabled:opacity-40"
            style={{ color: C.warning, borderColor: C.warning }}
          >
            PSYNC 重连（部分同步）
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 说明 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs leading-relaxed" style={{ color: C.secondary }}>
            全量同步打底、命令传播保一致、PSYNC 用 offset 判断能否部分同步。repl-backlog 太小会退化为全量重传；从库默认只读防止数据分叉。主库侧写命令会进入积压缓冲区以支撑断线续传。
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