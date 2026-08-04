"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

const COMMANDS = ["SET user:1 name", "GET user:1", "LPUSH queue task", "INCR counter", "HGETALL session:9"];

export function RdiClientLab() {
  const [inputBuf, setInputBuf] = useState<string[]>([]);
  const [outFixed, setOutFixed] = useState<string[]>([]);
  const [outVar, setOutVar] = useState<string[]>([]);
  const [connected, setConnected] = useState(true);
  const [nextCmd, setNextCmd] = useState(0);
  const [log, setLog] = useState<string[]>([
    "客户端状态：输入缓冲区接收命令，输出两级缓冲（固定 16KB + 可变链表）承载回复。",
  ]);

  const sendCommand = useCallback(() => {
    if (!connected) return;
    const cmd = COMMANDS[nextCmd % COMMANDS.length];
    setNextCmd((p) => p + 1);
    setInputBuf((prev) => [...prev, cmd]);
    setLog((prev) => [...prev, `客户端发送 "${cmd}"：进入输入缓冲区等待解析。`]);
    // 模拟处理：命令从输入缓冲移到输出
    setTimeout(() => {
      setInputBuf((prev) => prev.slice(1));
      setOutFixed((prev) => prev.length < 3 ? [...prev, `+OK (${cmd.split(" ")[0]})`] : prev);
      setOutVar((prev) => prev.length < 2 ? prev : prev);
      setLog((prevLog) => [...prevLog, `命令 "${cmd}" 已执行，回复写入输出缓冲区。`]);
    }, 600);
  }, [connected, nextCmd]);

  const slowClient = useCallback(() => {
    if (!connected) return;
    // 模拟慢客户端：大量回复积压
    setOutVar((prev) => [...prev, ...Array.from({ length: 5 }, (_, i) => `$1000 data block ${i + 1}`)]);
    setLog((prev) => [...prev, "⚠️ 慢客户端：回复超出固定缓冲，挂入可变链表。若持续积压将触发 client-output-buffer-limit 断开。"]);
  }, [connected]);

  const disconnect = useCallback(() => {
    setConnected(false);
    setLog((prev) => [...prev, "❌ 连接断开：输出缓冲达到 hard limit，服务器强制关闭该客户端。"]);
  }, []);

  const reset = useCallback(() => {
    setInputBuf([]);
    setOutFixed([]);
    setOutVar([]);
    setConnected(true);
    setNextCmd(0);
    setLog(["客户端状态：输入缓冲区接收命令，输出两级缓冲（固定 16KB + 可变链表）承载回复。"]);
  }, []);

  const viewW = 820;
  const viewH = 360;
  const boxW = 220;
  const boxH = 46;
  const startY = 120;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 客户端缓冲区与连接状态</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="客户端缓冲区">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            客户端连接：输入缓冲 → 执行 → 两级输出缓冲
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            连接状态：{connected ? "✅ 已连接" : "❌ 已断开"}
          </text>

          {/* 输入缓冲 */}
          <text x={40} y={startY - 12} fontSize={11} fill={C.secondary} fontWeight={600}>输入缓冲区（querybuf）</text>
          <rect x={40} y={startY} width={boxW} height={boxH} rx={6} fill={C.bg} stroke={C.accent} strokeWidth={1.5} />
          <text x={40 + boxW / 2} y={startY + boxH / 2 + 4} textAnchor="middle" fontSize={11} fill={C.secondary}>
            {inputBuf.length === 0 ? "空（等待命令）" : `${inputBuf[0]}…(+${inputBuf.length - 1})`}
          </text>

          {/* 执行 → 输出固定 */}
          <text x={300} y={startY - 12} fontSize={11} fill={C.secondary} fontWeight={600}>输出固定缓冲（16KB）</text>
          <rect x={300} y={startY} width={boxW} height={boxH} rx={6} fill={C.bg} stroke={C.success} strokeWidth={1.5} />
          <text x={300 + boxW / 2} y={startY + boxH / 2 + 4} textAnchor="middle" fontSize={11} fill={C.secondary}>
            {outFixed.length === 0 ? "空" : outFixed[0]}
          </text>

          {/* 输出可变链表 */}
          <text x={560} y={startY - 12} fontSize={11} fill={C.secondary} fontWeight={600}>输出可变链表</text>
          <rect x={560} y={startY} width={boxW} height={boxH} rx={6} fill={C.bg} stroke={C.warning} strokeWidth={1.5} />
          <text x={560 + boxW / 2} y={startY + boxH / 2 + 4} textAnchor="middle" fontSize={11} fill={C.secondary}>
            {outVar.length === 0 ? "空" : `${outVar.length} 个大数据块`}
          </text>

          {/* 状态条 */}
          <text x={viewW / 2} y={startY + boxH + 60} textAnchor="middle" fontSize={11} fill={C.secondary}>
            输入缓冲 = 待解析命令队列 · 输出 = 固定区（快） + 链表（慢客户端/大回复）
          </text>
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={sendCommand}
            disabled={!connected}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10 disabled:opacity-40"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            发送命令
          </button>
          <button
            onClick={slowClient}
            disabled={!connected}
            className="rounded-control border border-warning px-3 py-1.5 text-xs font-medium transition-colors hover:bg-warning/10 disabled:opacity-40"
            style={{ color: C.warning, borderColor: C.warning }}
          >
            模拟慢客户端（输出积压）
          </button>
          <button
            onClick={disconnect}
            disabled={!connected}
            className="rounded-control border border-danger px-3 py-1.5 text-xs font-medium transition-colors hover:bg-danger/10 disabled:opacity-40"
            style={{ color: C.danger, borderColor: C.danger }}
          >
            模拟超限断开
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 说明 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs leading-relaxed" style={{ color: C.secondary }}>
            服务器为每个客户端维护输入缓冲区、输出缓冲区与状态。输出缓冲有 hard limit / soft limit 两种限制，超限即断开，防止慢客户端拖垮内存。Pipeline 批量命令也走同一输入缓冲。
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