"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type FsyncMode = "always" | "everysec" | "no";

const STRATEGIES: { id: FsyncMode; label: string; desc: string; safety: number; speed: number; risk: string }[] = [
  { id: "always", label: "always", desc: "每条命令写入 AOF 缓冲区后立即 fsync 落盘", safety: 95, speed: 30, risk: "极大拖慢写入吞吐，QPS 下降 50%~80%" },
  { id: "everysec", label: "everysec", desc: "每秒一次 fsync，将缓冲区中的全部写入落盘", safety: 80, speed: 85, risk: "操作系统崩溃最多丢 1 秒数据" },
  { id: "no", label: "no", desc: "不主动 fsync，交给操作系统决定何时刷盘", safety: 40, speed: 100, risk: "操作系统崩溃丢大量数据，页面换出也可能丢" },
];

export function RdiAofFsyncLab() {
  const [selected, setSelected] = useState<FsyncMode>("everysec");
  const [writeCount, setWriteCount] = useState(0);
  const [simulateCrash, setSimulateCrash] = useState(false);
  const [log, setLog] = useState<string[]>([
    "AOF 三种 fsync 策略：always / everysec / no。点击策略卡片查看详情，点击写入模拟观察行为。",
  ]);

  const simulateWrite = useCallback(() => {
    setWriteCount((prev) => prev + 1);
    const mode = selected;
    if (mode === "always") {
      setLog((prev) => [...prev, `写入 #${writeCount + 1}：always 策略，立即 fsync，数据已落盘 ✅`]);
    } else if (mode === "everysec") {
      const fsynced = (writeCount + 1) % 3 === 0;
      setLog((prev) => [...prev, `写入 #${writeCount + 1}：everysec 策略，缓冲区缓存，${fsynced ? "每秒 fsync 触发 ⏱" : "等待 fsync"}。`]);
    } else {
      setLog((prev) => [...prev, `写入 #${writeCount + 1}：no 策略，数据在 OS 页面缓存中，fsync 由内核决定 💤`]);
    }
  }, [selected, writeCount]);

  const crash = useCallback(() => {
    setSimulateCrash(true);
    if (selected === "always") {
      setLog((prev) => [...prev, "⚠️ 崩溃模拟：always 策略，全部数据已落盘，AOF 恢复后数据完整 ✅"]);
    } else if (selected === "everysec") {
      const lost = (writeCount % 3);
      setLog((prev) => [...prev, `⚠️ 崩溃模拟：everysec 策略，最多丢 ${lost} 秒数据（约 ${lost} 条写入），重启后恢复剩余数据 ⚠️`]);
    } else {
      const lost = Math.floor(writeCount * 0.7);
      setLog((prev) => [...prev, `⚠️ 崩溃模拟：no 策略，约 ${lost} 条写入丢失（OS 页面缓存尚未刷盘）❌`]);
    }
  }, [selected, writeCount]);

  const reset = useCallback(() => {
    setSelected("everysec");
    setWriteCount(0);
    setSimulateCrash(false);
    setLog(["AOF 三种 fsync 策略：always / everysec / no。点击策略卡片查看详情，点击写入模拟观察行为。"]);
  }, []);

  const viewW = 780;
  const viewH = 280;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ AOF 三种 fsync 策略对照实验台</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="AOF fsync 策略对比">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            AOF 写入路径与 fsync 策略
          </text>

          {/* 写入路径管道 */}
          <text x={viewW / 2} y={72} textAnchor="middle" fontSize={11} fill={C.secondary}>
            写入命令 → AOF 缓冲区 ← fsync → 内核页面缓存 → 磁盘
          </text>

          {/* 三条策略对比 */}
          {STRATEGIES.map((s, i) => {
            const x = 20 + i * 260;
            const isSel = selected === s.id;
            const barH = (s.speed / 100) * 100;
            const safetyBar = (s.safety / 100) * 100;
            return (
              <g key={s.id} onClick={() => setSelected(s.id)} className="cursor-pointer">
                <rect
                  x={x} y={90} width={240} height={160} rx={8}
                  fill={isSel ? C.elevated : C.bg}
                  stroke={isSel ? C.accent : C.border}
                  strokeWidth={isSel ? 2 : 1}
                />
                <text x={x + 120} y={116} textAnchor="middle" fontSize={13} fill={isSel ? C.accent : C.primary} fontWeight={600}>
                  {s.label}
                </text>
                {/* 速度条 */}
                <text x={x + 16} y={138} fontSize={11} fill={C.secondary}>速度</text>
                <rect x={x + 50} y={126} width={140} height={10} rx={4} fill={C.bg} />
                <rect x={x + 50} y={126} width={barH * 1.4} height={10} rx={4} fill={s.id === "always" ? C.danger : s.id === "everysec" ? C.success : C.warning} />
                {/* 安全条 */}
                <text x={x + 16} y={156} fontSize={11} fill={C.secondary}>安全</text>
                <rect x={x + 50} y={144} width={140} height={10} rx={4} fill={C.bg} />
                <rect x={x + 50} y={144} width={safetyBar * 1.4} height={10} rx={4} fill={safetyBar > 70 ? C.success : safetyBar > 50 ? C.warning : C.danger} />
                {/* 风险 */}
                <text x={x + 120} y={178} textAnchor="middle" fontSize={11} fill={safetyBar > 70 ? C.success : C.danger}>
                  {s.risk.length > 20 ? s.risk.slice(0, 20) + "..." : s.risk}
                </text>
                {/* 推荐标记 */}
                {s.id === "everysec" && (
                  <text x={x + 120} y={238} textAnchor="middle" fontSize={11} fill={C.success} fontWeight={600}>
                    ⭐ 推荐折中
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={simulateWrite}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            写入一次（{selected}）
          </button>
          <button
            onClick={crash}
            disabled={simulateCrash}
            className="rounded-control border border-danger px-3 py-1.5 text-xs font-medium transition-colors hover:bg-danger/10 disabled:opacity-40"
            style={{ color: C.danger, borderColor: C.danger }}
          >
            {simulateCrash ? "已崩溃" : "模拟崩溃"}
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 详情 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs font-semibold" style={{ color: C.primary }}>{selected}：{STRATEGIES.find((s) => s.id === selected)?.desc}</div>
          <div className="mt-1 text-xs" style={{ color: C.secondary }}>{STRATEGIES.find((s) => s.id === selected)?.risk}</div>
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