"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

const STAGES = [
  { id: "cmd", label: "写命令", desc: "写入命令到达，修改内存数据页。" },
  { id: "fork", label: "fork 子进程", desc: "父进程 fork 出子进程，子进程获得内存快照。" },
  { id: "cow", label: "写时复制", desc: "子进程遍历内存写 RDB，父进程继续服务。父进程写入时复制页面，脏页累积。" },
  { id: "rdb", label: "RDB 文件", desc: "子进程将数据写入 RDB 临时文件，完成后 rename 覆盖旧文件。通知父进程。" },
];

export function RdiRdbLab() {
  const [stage, setStage] = useState(0);
  const [mode, setMode] = useState<"bgsave" | "save">("bgsave");
  const [log, setLog] = useState<string[]>([
    "RDB 持久化：BGSAVE 通过 fork 子进程异步生成快照，SAVE 全程阻塞服务。",
  ]);

  const advance = useCallback(() => {
    if (stage < STAGES.length - 1) {
      const next = stage + 1;
      setStage(next);
      setLog((prev) => [...prev, `${mode === "bgsave" ? "BGSAVE" : "SAVE"} 阶段 ${next + 1}：${STAGES[next].label}——${STAGES[next].desc}`]);
    }
  }, [stage, mode]);

  const reset = useCallback(() => {
    setStage(0);
    setLog(["RDB 持久化：BGSAVE 通过 fork 子进程异步生成快照，SAVE 全程阻塞服务。"]);
  }, []);

  const viewW = 820; const viewH = 340;
  const stageW = 160; const stageH = 54; const gap = 24;
  const startX = (viewW - (stageW * 4 + gap * 3)) / 2;
  const y = 110;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ RDB 持久化：BGSAVE 流程</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="RDB 持久化">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            {mode === "bgsave" ? "BGSAVE：fork → 写时复制 → RDB 文件" : "SAVE：全程阻塞，不 fork"}
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            {mode === "bgsave" ? "子进程写 RDB，父进程继续服务；写时复制使内存可能翻倍" : "主进程直接写 RDB，期间无法处理任何请求"}
          </text>

          {STAGES.map((s, i) => {
            const x = startX + i * (stageW + gap);
            const isActive = i === stage;
            const isDone = i < stage;
            const blocked = mode === "save" && isActive;
            return (
              <g key={s.id}>
                <rect
                  x={x} y={y} width={stageW} height={stageH} rx={8}
                  fill={isActive ? (blocked ? C.danger : C.accent) : isDone ? C.success : C.bg}
                  stroke={isActive ? (blocked ? C.danger : C.accent) : isDone ? C.success : C.border}
                  strokeWidth={isActive ? 2 : 1}
                  opacity={isActive || isDone ? 0.9 : 1}
                />
                <text x={x + stageW / 2} y={y + 22} textAnchor="middle" fontSize={12} fontWeight={600} fill={isActive || isDone ? C.bg : C.primary}>
                  {i + 1}. {s.label}
                </text>
                <text x={x + stageW / 2} y={y + 42} textAnchor="middle" fontSize={11} fill={isActive || isDone ? "rgba(255,255,255,0.85)" : C.secondary}>
                  {s.desc.slice(0, 14)}…
                </text>
                {blocked && <text x={x + stageW / 2} y={y + stageH + 16} textAnchor="middle" fontSize={11} fill={C.danger} fontWeight={600}>⚠️ 阻塞所有请求</text>}
                {i < STAGES.length - 1 && (
                  <text x={x + stageW + gap / 2} y={y + stageH / 2 + 4} textAnchor="middle" fontSize={16} fill={C.border}>→</text>
                )}
              </g>
            );
          })}

          <text x={viewW / 2} y={y + stageH + 60} textAnchor="middle" fontSize={11} fill={C.secondary}>
            fork 时父子共享内存页，父进程写入触发写时复制（COW），脏页累积最多与原内存相当。大实例（8GB+）fork 缓慢且 COW 可能翻倍内存。
          </text>
        </svg>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <select
            value={mode}
            onChange={(e) => { setMode(e.target.value as "bgsave" | "save"); setStage(0); }}
            className="rounded-control border border-border px-2 py-1.5 text-xs"
            style={{ background: C.bg, color: C.primary }}
          >
            <option value="bgsave">BGSAVE（异步，推荐）</option>
            <option value="save">SAVE（阻塞，生产禁用）</option>
          </select>
          <button
            onClick={advance}
            disabled={stage >= STAGES.length - 1}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10 disabled:opacity-40"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            {stage >= STAGES.length - 1 ? "✅ 完成" : "推进阶段"}
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="mb-1 text-xs font-semibold" style={{ color: C.primary }}>操作日志</div>
          <ol className="flex flex-col gap-1 text-xs" style={{ color: C.secondary }}>
            {log.map((line, i) => (<li key={i} className="leading-relaxed"><span className="mr-1 font-mono" style={{ color: C.accent }}>{i + 1}.</span>{line}</li>))}
          </ol>
        </div>
      </div>
    </div>
  );
}