"use client";

import { useState, useCallback } from "react";
const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;
const NODES = ["N1:7000", "N2:7001", "N3:7002", "N4:7003", "N5:7004", "N6:7005"];
export function RdiClusterDiscoveryLab() {
  const [nodes, setNodes] = useState<string[]>(["N1:7000", "N2:7001"]);
  const [log, setLog] = useState<string[]>([
    "集群节点发现：通过 gossip 协议在节点间交换拓扑信息，新节点加入后逐步被全网感知。",
  ]);
  const addNode = useCallback(() => {
    if (nodes.length >= 6) return;
    const next = [...nodes, NODES[nodes.length]];
    setNodes(next);
    setLog((prev) => [...prev, `${NODES[nodes.length]} 加入：发送 MEET 消息握手，开始 gossip 交换。`]);
  }, [nodes]);
  const reset = useCallback(() => {
    setNodes(["N1:7000", "N2:7001"]);
    setLog(["集群节点发现：通过 gossip 协议在节点间交换拓扑信息，新节点加入后逐步被全网感知。"]);
  }, []);
  const viewW = 820; const viewH = 300; const r = 28;
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 集群节点发现与握手</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="集群节点发现">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>集群节点发现与握手（{nodes.length} 节点）</text>
          {nodes.map((n, i) => {
            const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
            const cx = viewW / 2 + Math.cos(angle) * 180;
            const cy = 120 + Math.sin(angle) * 80;
            return (
              <g key={n}>
                <circle cx={cx} cy={cy} r={r} fill={C.accent} opacity={0.85} />
                <text x={cx} y={cy + 4} textAnchor="middle" fontSize={11} fill={C.bg} fontWeight={600}>{n}</text>
                {nodes.slice(0, i).map((_, j) => {
                  const a2 = (j / nodes.length) * Math.PI * 2 - Math.PI / 2;
                  const cx2 = viewW / 2 + Math.cos(a2) * 180;
                  const cy2 = 120 + Math.sin(a2) * 80;
                  return <line key={`${i}-${j}`} x1={cx} y1={cy} x2={cx2} y2={cy2} stroke={C.border} strokeWidth={0.8} opacity={0.5} />;
                })}
              </g>
            );
          })}
          <text x={viewW / 2} y={viewH - 40} textAnchor="middle" fontSize={11} fill={C.secondary}>gossip 协议：PING/PONG 携带随机节点信息，使拓扑收敛</text>
        </svg>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button onClick={addNode} disabled={nodes.length >= 6} className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10 disabled:opacity-40" style={{ color: C.accent }}>+ 加入节点</button>
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