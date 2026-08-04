"use client";

import { useState, useCallback } from "react";
const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;
const MSG_TYPES = [
  { type: "MEET", desc: "新节点加入集群的握手请求" },
  { type: "PING", desc: "定期探测节点可达性" },
  { type: "PONG", desc: "PING 的回复，携带自身状态" },
  { type: "FAIL", desc: "报告某节点疑似下线" },
  { type: "PUBLISH", desc: "广播发布订阅消息" },
  { type: "UPDATE", desc: "通知槽位配置变更" },
];

export function RdiClusterMsgLab() {
  const [selected, setSelected] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const send = useCallback(() => {
    const m = MSG_TYPES[selected];
    setHistory((prev) => [`${m.type} 消息发出：${m.desc}`, ...prev].slice(0, 8));
  }, [selected]);
  const reset = useCallback(() => setHistory([]), []);
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 集群消息类型与处理</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox="0 0 820 300" className="w-full" role="img" aria-label="集群消息">
          <text x={410} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>集群消息类型</text>
          {MSG_TYPES.map((m, i) => {
            const x = 20 + i * 135; const isSel = selected === i;
            return (
              <g key={m.type} onClick={() => setSelected(i)} className="cursor-pointer">
                <rect x={x} y={70} width={125} height={56} rx={8} fill={isSel ? C.accent : C.bg} stroke={isSel ? C.accent : C.border} strokeWidth={isSel ? 2 : 1} />
                <text x={x + 62} y={94} textAnchor="middle" fontSize={12} fontWeight={600} fill={isSel ? C.bg : C.primary}>{m.type}</text>
                <text x={x + 62} y={114} textAnchor="middle" fontSize={11} fill={isSel ? "rgba(255,255,255,0.85)" : C.secondary}>{m.desc.slice(0, 14)}…</text>
              </g>
            );
          })}
          <rect x={20} y={150} width={780} height={100} rx={8} fill={C.bg} stroke={C.border} strokeWidth={1} />
          <text x={36} y={176} fontSize={12} fontWeight={600} fill={C.primary}>{MSG_TYPES[selected].type}</text>
          <text x={36} y={196} fontSize={11} fill={C.secondary}>{MSG_TYPES[selected].desc}</text>
          <text x={36} y={220} fontSize={11} fill={C.secondary}>消息携带：发送方节点信息、配置纪元、槽位图等。gossip 消息随机选择目标，降低网络开销。</text>
        </svg>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button onClick={send} className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10" style={{ color: C.accent }}>发送 {MSG_TYPES[selected].type}</button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="mb-1 text-xs font-semibold" style={{ color: C.primary }}>消息历史</div>
          {history.length === 0 ? <div className="text-xs" style={{ color: C.secondary }}>尚未发送消息</div> : history.map((h, i) => <div key={i} className="text-xs leading-relaxed" style={{ color: C.secondary }}>{h}</div>)}
        </div>
      </div>
    </div>
  );
}