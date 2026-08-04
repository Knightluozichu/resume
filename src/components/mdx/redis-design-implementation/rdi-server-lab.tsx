"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type Stage = { id: string; label: string; desc: string };
const STAGES: Stage[] = [
  { id: "read", label: "读取命令", desc: "从客户端输入缓冲区解析完整的命令请求。" },
  { id: "lookup", label: "查命令表", desc: "按命令名在命令表中查找对应处理函数与参数要求。" },
  { id: "exec", label: "执行", desc: "调用命令处理函数操作数据，记录执行耗时（慢日志候选）。" },
  { id: "reply", label: "写回复", desc: "把执行结果写入客户端输出缓冲区。" },
];

export function RdiServerLab() {
  const [stageIdx, setStageIdx] = useState(0);
  const [cronTicks, setCronTicks] = useState(0);
  const [log, setLog] = useState<string[]>([
    "服务器：命令从读取到回复走完整管线；serverCron 每秒 10 次做周期维护。",
  ]);

  const runCommand = useCallback(() => {
    setStageIdx(0);
    setLog((prev) => [...prev, "▶ 命令进入管线：读取命令。"]);
    const timers = STAGES.map((_, i) => setTimeout(() => {
      setStageIdx(i);
      setLog((prev) => [...prev, `  ${i + 1}. ${STAGES[i].label}——${STAGES[i].desc}`]);
    }, 500 * (i + 1)));
    // 500ms 后重置 stageIdx 保持高亮最后阶段
    setTimeout(() => { setStageIdx(3); }, 500 * STAGES.length + 300);
  }, []);

  const cronTick = useCallback(() => {
    setCronTicks((p) => p + 1);
    const t = cronTicks + 1;
    setLog((prev) => [...prev, `serverCron #${t}：过期键清理 ✓ / 渐进 rehash 推进 ✓ / 客户端心跳 ✓ / 复制握手 ✓`]);
  }, [cronTicks]);

  const reset = useCallback(() => {
    setStageIdx(0);
    setCronTicks(0);
    setLog(["服务器：命令从读取到回复走完整管线；serverCron 每秒 10 次做周期维护。"]);
  }, []);

  const viewW = 820;
  const viewH = 320;
  const stageW = 160;
  const stageH = 54;
  const gap = 24;
  const startX = (viewW - (stageW * 4 + gap * 3)) / 2;
  const y = 110;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 服务器命令管线与周期维护</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="服务器命令管线">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            命令处理管线（四阶段）
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            点击"执行命令"观察命令流经每个阶段
          </text>

          {STAGES.map((s, i) => {
            const x = startX + i * (stageW + gap);
            const isActive = i === stageIdx;
            const isDone = i < stageIdx;
            return (
              <g key={s.id}>
                <rect
                  x={x} y={y} width={stageW} height={stageH} rx={8}
                  fill={isActive ? C.accent : isDone ? C.success : C.bg}
                  stroke={isActive ? C.accent : isDone ? C.success : C.border}
                  strokeWidth={isActive ? 2 : 1}
                  opacity={isActive || isDone ? 0.9 : 1}
                />
                <text x={x + stageW / 2} y={y + 24} textAnchor="middle" fontSize={12} fontWeight={600} fill={isActive || isDone ? C.bg : C.primary}>
                  {i + 1}. {s.label}
                </text>
                <text x={x + stageW / 2} y={y + 44} textAnchor="middle" fontSize={11} fill={isActive || isDone ? "rgba(255,255,255,0.85)" : C.secondary}>
                  {s.desc.slice(0, 12)}…
                </text>
                {i < STAGES.length - 1 && (
                  <text x={x + stageW + gap / 2} y={y + stageH / 2 + 4} textAnchor="middle" fontSize={16} fill={C.border}>→</text>
                )}
              </g>
            );
          })}

          {/* serverCron 面板 */}
          <rect x={startX} y={y + stageH + 50} width={viewW - startX * 2} height={70} rx={8} fill={C.elevated} stroke={C.border} strokeWidth={1} />
          <text x={startX + 12} y={y + stageH + 74} fontSize={11} fontWeight={600} fill={C.primary}>
            serverCron（每秒 10 次）
          </text>
          <text x={startX + 12} y={y + stageH + 94} fontSize={11} fill={C.secondary}>
            过期键删除 · 渐进 rehash 推进 · 关闭空闲客户端 · 复制心跳 · 统计更新（已触发 {cronTicks} 次）
          </text>
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={runCommand}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            执行命令（观察管线）
          </button>
          <button
            onClick={cronTick}
            className="rounded-control border border-success px-3 py-1.5 text-xs font-medium transition-colors hover:bg-success/10"
            style={{ color: C.success, borderColor: C.success }}
          >
            触发一次 serverCron
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
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