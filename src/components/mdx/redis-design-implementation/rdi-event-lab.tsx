"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type FdEvent = { id: number; kind: "accept" | "read" | "write"; label: string };

const FD_POOL = [
  { kind: "accept" as const, label: "新连接" },
  { kind: "read" as const, label: "命令到达" },
  { kind: "read" as const, label: "命令到达" },
  { kind: "write" as const, label: "回复就绪" },
  { kind: "read" as const, label: "命令到达" },
];

export function RdiEventLab() {
  const [events, setEvents] = useState<FdEvent[]>([]);
  const [timeEvents, setTimeEvents] = useState(0);
  const [nextId, setNextId] = useState(1);
  const [blocked, setBlocked] = useState(false);
  const [log, setLog] = useState<string[]>([
    "事件循环：文件事件（I/O 就绪）与时间事件（serverCron）在同一单线程循环中调度。",
  ]);

  const newConnection = useCallback(() => {
    const ev = FD_POOL[(nextId - 1) % FD_POOL.length];
    setEvents((prev) => [...prev, { id: nextId, kind: ev.kind, label: ev.label }]);
    setNextId((p) => p + 1);
    setLog((prev) => [...prev, `文件事件 #${nextId}：${ev.label} 就绪，加入事件队列等待分发。`]);
  }, [nextId]);

  const processOne = useCallback(() => {
    if (events.length === 0) return;
    const ev = events[0];
    setEvents((prev) => prev.slice(1));
    if (ev.kind === "accept") {
      setLog((prev) => [...prev, `处理 accept 事件：接受新连接，注册 read 事件。`]);
    } else if (ev.kind === "read") {
      setLog((prev) => [...prev, `处理 read 事件：读取并执行命令，回复写入后注册 write 事件。`]);
    } else {
      setLog((prev) => [...prev, `处理 write 事件：把回复发送给客户端。`]);
    }
  }, [events]);

  const slowCommand = useCallback(() => {
    setBlocked(true);
    setLog((prev) => [...prev, "⚠️ 慢命令（如 KEYS *）阻塞事件循环：期间所有事件排队等待。"]);
    setTimeout(() => {
      setBlocked(false);
      setLog((prev) => [...prev, "慢命令执行完毕，事件循环恢复，排队事件被处理。"]);
    }, 1500);
  }, []);

  const cronTick = useCallback(() => {
    setTimeEvents((p) => p + 1);
    setLog((prev) => [...prev, `时间事件触发：serverCron 执行周期任务（第 ${timeEvents + 1} 次）。`]);
  }, [timeEvents]);

  const reset = useCallback(() => {
    setEvents([]);
    setTimeEvents(0);
    setNextId(1);
    setBlocked(false);
    setLog(["事件循环：文件事件（I/O 就绪）与时间事件（serverCron）在同一单线程循环中调度。"]);
  }, []);

  const viewW = 820;
  const viewH = 320;
  const evW = 110;
  const evH = 40;
  const startX = 60;
  const y = 100;

  const kindColor = (kind: string) => kind === "accept" ? C.accent : kind === "read" ? C.success : C.warning;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 事件循环：文件事件 + 时间事件</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="事件循环">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            Reactor 单线程事件循环
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            {blocked ? "⚠️ 事件循环被慢命令阻塞" : "文件事件就绪 → 多路复用 → 分发到处理器"}
          </text>

          {/* 事件队列 */}
          <text x={startX} y={y - 12} fontSize={11} fill={C.secondary} fontWeight={600}>
            事件队列（{events.length}）
          </text>
          {events.slice(0, 6).map((ev, i) => {
            const x = startX + i * (evW + 8);
            return (
              <g key={ev.id}>
                <rect
                  x={x} y={y} width={evW} height={evH} rx={5}
                  fill={blocked ? C.danger : kindColor(ev.kind)}
                  opacity={blocked ? 0.35 : 0.85}
                  stroke={kindColor(ev.kind)}
                  strokeWidth={1}
                />
                <text x={x + evW / 2} y={y + evH / 2 + 4} textAnchor="middle" fontSize={11} fill={C.bg} fontWeight={600}>
                  {ev.kind} #{ev.id}
                </text>
              </g>
            );
          })}
          {events.length === 0 && (
            <text x={startX} y={y + evH / 2 + 4} fontSize={11} fill={C.secondary}>
              空（等待文件事件就绪）
            </text>
          )}

          {/* 多路复用器 */}
          <text x={startX} y={y + evH + 40} fontSize={11} fill={C.secondary} fontWeight={600}>多路复用器（epoll/kqueue）</text>
          <rect x={startX} y={y + evH + 50} width={300} height={36} rx={6} fill={C.elevated} stroke={C.accent} strokeWidth={1.5} />
          <text x={startX + 150} y={y + evH + 73} textAnchor="middle" fontSize={11} fill={C.primary}>
            监听所有套接字就绪事件
          </text>

          {/* 时间事件 */}
          <text x={startX + 460} y={y - 12} fontSize={11} fill={C.secondary} fontWeight={600}>时间事件（serverCron）</text>
          <rect x={startX + 460} y={y} width={220} height={evH} rx={6} fill={C.elevated} stroke={C.success} strokeWidth={1.5} />
          <text x={startX + 570} y={y + evH / 2 + 4} textAnchor="middle" fontSize={11} fill={C.primary}>
            serverCron（已触发 {timeEvents} 次）
          </text>
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={newConnection}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            产生文件事件
          </button>
          <button
            onClick={processOne}
            disabled={events.length === 0 || blocked}
            className="rounded-control border border-success px-3 py-1.5 text-xs font-medium transition-colors hover:bg-success/10 disabled:opacity-40"
            style={{ color: C.success, borderColor: C.success }}
          >
            处理一个事件
          </button>
          <button
            onClick={slowCommand}
            className="rounded-control border border-danger px-3 py-1.5 text-xs font-medium transition-colors hover:bg-danger/10"
            style={{ color: C.danger, borderColor: C.danger }}
          >
            触发慢命令（阻塞循环）
          </button>
          <button
            onClick={cronTick}
            className="rounded-control border border-warning px-3 py-1.5 text-xs font-medium transition-colors hover:bg-warning/10"
            style={{ color: C.warning, borderColor: C.warning }}
          >
            触发时间事件
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 说明 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs leading-relaxed" style={{ color: C.secondary }}>
            单线程模型：所有连接共用一个事件循环，没有锁与上下文切换。代价是任何慢命令都会阻塞全部连接——这是 KEYS、大范围操作成为事故源的根本原因。
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