"use client";

import { useState, useCallback } from "react";
const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;
const TOTAL = 8;
export function RdiClusterMigrateLab() {
  const [srcSlots, setSrcSlots] = useState(5);
  const [dstSlots, setDstSlots] = useState(3);
  const [migrating, setMigrating] = useState(false);
  const [done, setDone] = useState(false);
  const [log, setLog] = useState<string[]>([
    "集群键迁移：重新分片将槽从源节点批量迁移到目标节点，期间 ASK 转向保证访问不中断。",
  ]);
  const migrate = useCallback(() => {
    if (srcSlots <= 0 || migrating) return;
    setMigrating(true);
    setLog((prev) => [...prev, `迁移启动：源节点导出槽，目标节点导入槽，设置 migrating 状态。`]);
    const batch = Math.min(2, srcSlots);
    setTimeout(() => {
      setSrcSlots((p) => p - batch);
      setDstSlots((p) => p + batch);
      setMigrating(false);
      if (srcSlots - batch <= 0) setDone(true);
      setLog((prev) => [...prev, `迁移 ${batch} 个槽成功：源剩余 ${srcSlots - batch}，目标 ${dstSlots + batch}。`]);
    }, 800);
  }, [srcSlots, dstSlots, migrating]);
  const reset = useCallback(() => {
    setSrcSlots(5); setDstSlots(3); setMigrating(false); setDone(false);
    setLog(["集群键迁移：重新分片将槽从源节点批量迁移到目标节点，期间 ASK 转向保证访问不中断。"]);
  }, []);
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 集群键迁移与一致性</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox="0 0 820 320" className="w-full" role="img" aria-label="集群键迁移">
          <text x={410} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>集群键迁移：重新分片过程</text>
          <text x={410} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>{done ? "✅ 迁移完成" : migrating ? "⏳ 迁移中…" : "点击按钮开始迁移"}</text>
          <rect x={80} y={90} width={200} height={140} rx={12} fill={C.accent} opacity={0.12} stroke={C.accent} strokeWidth={2} />
          <text x={180} y={120} textAnchor="middle" fontSize={13} fontWeight={600} fill={C.primary}>源节点</text>
          <text x={180} y={142} textAnchor="middle" fontSize={11} fill={C.secondary}>槽数：{srcSlots}</text>
          <text x={180} y={162} textAnchor="middle" fontSize={11} fill={C.secondary}>状态：{done ? "已空" : migrating ? "导出中" : "就绪"}</text>
          <rect x={80} y={180} width={200} height={36} rx={6} fill={C.bg} stroke={C.border} strokeWidth={1} />
          {Array.from({ length: srcSlots }).map((_, i) => (<rect key={`s${i}`} x={84 + i * 28} y={184} width={24} height={28} rx={3} fill={C.accent} opacity={0.8} />))}
          <text x={410} y={160} textAnchor="middle" fontSize={22} fill={C.accent}>{migrating ? "⏩" : "→"}</text>
          <rect x={540} y={90} width={200} height={140} rx={12} fill={C.success} opacity={0.12} stroke={C.success} strokeWidth={2} />
          <text x={640} y={120} textAnchor="middle" fontSize={13} fontWeight={600} fill={C.primary}>目标节点</text>
          <text x={640} y={142} textAnchor="middle" fontSize={11} fill={C.secondary}>槽数：{dstSlots}</text>
          <text x={640} y={162} textAnchor="middle" fontSize={11} fill={C.secondary}>状态：{done ? "已接收" : migrating ? "导入中" : "就绪"}</text>
          <rect x={540} y={180} width={200} height={36} rx={6} fill={C.bg} stroke={C.border} strokeWidth={1} />
          {Array.from({ length: dstSlots }).map((_, i) => (<rect key={`d${i}`} x={544 + i * 28} y={184} width={24} height={28} rx={3} fill={C.success} opacity={0.8} />))}
          <text x={410} y={270} textAnchor="middle" fontSize={11} fill={C.secondary}>迁移期间：源节点返回 ASK 转向，客户端重定向到目标节点，保证访问不中断。</text>
        </svg>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button onClick={migrate} disabled={migrating || done || srcSlots <= 0} className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10 disabled:opacity-40" style={{ color: C.accent }}>{done ? "✅ 已完成" : migrating ? "⏳ 迁移中" : "迁移一批槽"}</button>
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