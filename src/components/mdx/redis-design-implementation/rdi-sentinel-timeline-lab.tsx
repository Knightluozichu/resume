"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type Step = {
  id: number;
  label: string;
  desc: string;
  details: { color: string; text: string }[];
};

const STEPS: Step[] = [
  { id: 1, label: "监控", desc: "哨兵每秒 PING 主从库与互哨兵，检查可达性。", details: [
    { color: C.accent, text: "Sentinel 1 → Master: PING" },
    { color: C.accent, text: "Sentinel 1 → Slave: PING" },
    { color: C.secondary, text: "Sentinel 1 → Sentinel 2: PING" },
    { color: C.secondary, text: "Sentinel 2 → Master: PING" },
  ]},
  { id: 2, label: "主观下线", desc: "单哨兵超时未收到 PONG，标记为主观下线（S_DOWN）。", details: [
    { color: C.warning, text: "Sentinel 1 → Master: ⏱ PONG 超时" },
    { color: C.warning, text: "Sentinel 1 标记 Master 为 s_down" },
    { color: C.secondary, text: "Sentinel 2 仍收到 Master 响应" },
  ]},
  { id: 3, label: "客观下线", desc: "达到 quorum 数量的哨兵确认主库不可达，标记为客观下线（O_DOWN）。", details: [
    { color: C.danger, text: "Sentinel 1: 请求 Sentinel 2 验证 Master" },
    { color: C.danger, text: "Sentinel 2 确认不可达，quorum 达成" },
    { color: C.danger, text: "Master 标记为 o_down，触发故障转移" },
  ]},
  { id: 4, label: "选举领头", desc: "哨兵间选举领头哨兵，由领头执行故障转移操作。", details: [
    { color: C.accent, text: "Sentinel 1 自荐为领头" },
    { color: C.accent, text: "Sentinel 2 投票给 Sentinel 1" },
    { color: C.accent, text: "Sentinel 3 投票给 Sentinel 1" },
    { color: C.success, text: "Sentinel 1 当选领头（3/3 票）" },
  ]},
  { id: 5, label: "故障转移", desc: "领头从从库中选一个升为新主库，改写其余从库复制方向。", details: [
    { color: C.success, text: "选 Slave 1 升为新主（复制偏移量最大）" },
    { color: C.accent, text: "SLAVEOF NO ONE → Slave 1 变 Master" },
    { color: C.accent, text: "Slave 2 → SLAVEOF new_master" },
    { color: C.accent, text: "通知客户端新主库地址" },
  ]},
  { id: 6, label: "恢复", desc: "旧主库恢复后降级为从库，系统恢复正常。", details: [
    { color: C.warning, text: "旧 Master 恢复上线" },
    { color: C.accent, text: "旧 Master → SLAVEOF new_master" },
    { color: C.success, text: "✅ 故障转移完成，系统恢复" },
  ]},
];

export function RdiSentinelTimelineLab() {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const reset = useCallback(() => { setStep(0); setAutoPlay(false); }, []);

  const next = useCallback(() => {
    if (step < STEPS.length - 1) setStep((p) => p + 1);
  }, [step]);

  const prev = useCallback(() => {
    if (step > 0) setStep((p) => p - 1);
  }, []);

  const current = STEPS[step];

  const viewW = 780;
  const viewH = 380;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 哨兵故障转移时序图</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="哨兵故障转移时序">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            哨兵故障转移六步流程
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            点击步骤推进，观察每个阶段的状态变化
          </text>

          {/* 步骤进度条 */}
          <g>
            {STEPS.map((s, i) => {
              const x = 20 + i * 128;
              const isActive = i === step;
              const isDone = i < step;
              return (
                <g key={s.id} onClick={() => setStep(i)} className="cursor-pointer">
                  <circle
                    cx={x + 8} cy={90} r={8}
                    fill={isDone ? C.success : isActive ? C.accent : C.bg}
                    stroke={isDone || isActive ? C.accent : C.border}
                    strokeWidth={1.5}
                  />
                  <text
                    x={x + 8} y={94}
                    textAnchor="middle" fontSize={11} fontWeight={600}
                    fill={isDone || isActive ? C.bg : C.secondary}
                  >
                    {s.id}
                  </text>
                  {i < STEPS.length - 1 && (
                    <line
                      x1={x + 16} y1={90} x2={x + 128} y2={90}
                      stroke={isDone ? C.success : C.border}
                      strokeWidth={1.5}
                    />
                  )}
                  <text x={x + 64} y={116} textAnchor="middle" fontSize={11} fill={isActive ? C.primary : C.secondary} fontWeight={isActive ? 600 : 400}>
                    {s.label}
                  </text>
                </g>
              );
            })}
          </g>

          {/* 当前步骤详情 */}
          <rect x={20} y={140} width={viewW - 40} height={220} rx={8} fill={C.bg} stroke={C.border} strokeWidth={1} />
          <text x={40} y={168} fontSize={13} fill={C.primary} fontWeight={600}>
            步骤 {current.id}：{current.label}
          </text>
          <text x={40} y={192} fontSize={11} fill={C.secondary}>
            {current.desc}
          </text>

          {/* 交互消息 */}
          <g>
            {current.details.map((d, i) => {
              const y = 216 + i * 28;
              return (
                <g key={`msg-${i}`}>
                  <rect x={40} y={y - 8} width={8} height={8} rx={2} fill={d.color} />
                  <text x={56} y={y + 1} fontSize={11} fill={C.primary}>{d.text}</text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={prev}
            disabled={step === 0}
            className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors disabled:opacity-40"
            style={{ color: C.secondary }}
          >
            ← 上一步
          </button>
          <button
            onClick={next}
            disabled={step >= STEPS.length - 1}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10 disabled:opacity-40"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            {step >= STEPS.length - 1 ? "✅ 完成" : `下一步 →`}
          </button>
          <span className="text-xs" style={{ color: C.secondary }}>
            {step + 1} / {STEPS.length}
          </span>
        </div>
      </div>
    </div>
  );
}