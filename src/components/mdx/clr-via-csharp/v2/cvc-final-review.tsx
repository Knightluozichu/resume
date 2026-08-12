"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--review-accent": "#be123c",
  "--review-accent-soft": "#ffe4e6",
  "--review-ink": "#172033",
  "--review-muted": "#94a3b8",
  "--review-warning": "#b45309",
  "--review-surface": "#ffffff",
} as CSSProperties;

function ResetButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {label}
    </button>
  );
}

function LabShell({
  label,
  title,
  description,
  onReset,
  children,
}: {
  label: string;
  title: string;
  description: string;
  onReset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={label}
      style={shellStyle}
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">{label}</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">{description}</p>
        </div>
        <ResetButton onClick={onReset} label="重置实验" />
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

type ChainMode = "load" | "execute" | "retain" | "coordinate";

export function CvcEvidenceChainLab() {
  const [mode, setMode] = useState<ChainMode>("load");
  const details = {
    load: ["request", "identity", "loaded type"],
    execute: ["IL / call", "dispatch", "exception state"],
    retain: ["allocation", "root path", "cleanup"],
    coordinate: ["admission", "work state", "result / shutdown"],
  }[mode];

  return (
    <LabShell
      label="Evidence Chains"
      title="沿一条证据链把局部章节接成运行时模型"
      description="先预测：切换 load、execute、retain、coordinate，哪一条链最先能区分“症状相同、owner不同”的故障？"
      onReset={() => setMode("load")}
    >
      <div className="flex flex-wrap gap-2">
        {(["load", "execute", "retain", "coordinate"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} evidence chain: ${details.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Runtime evidence chain</title>
        <defs>
          <marker id="cvc-review-chain-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--review-accent)" />
          </marker>
        </defs>
        {details.map((detail, index) => {
          const x = 26 + index * 240;
          return (
            <g key={detail}>
              <rect x={x} y="62" width="172" height="84" rx="12" fill={index === 1 ? "var(--review-accent-soft)" : "var(--review-surface)"} stroke={index === 1 ? "var(--review-accent)" : "var(--review-muted)"} strokeWidth="3" />
              <text x={x + 86} y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--review-ink)">stage {index + 1}</text>
              <text x={x + 86} y="121" textAnchor="middle" fontSize="12" fill="var(--review-ink)">{detail}</text>
              {index < details.length - 1 ? <line x1={x + 184} y1="104" x2={x + 226} y2="104" stroke="var(--review-accent)" strokeWidth="4" markerEnd="url(#cvc-review-chain-arrow)" /> : null}
            </g>
          );
        })}
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--review-accent)">{mode === "load" ? "load：requested identity → actual assembly → assignable Type" : mode === "execute" ? "execute：call site → mapping → recoverable failure boundary" : mode === "retain" ? "retain：allocation rate 与 retention root path 必须分开测量" : "coordinate：admit → run/wait → result/cancel → drain"}</text>
      </svg>
    </LabShell>
  );
}

type FaultMode = "identity" | "memory" | "latency" | "boundary";

export function CvcFaultEvidenceLab() {
  const [mode, setMode] = useState<FaultMode>("identity");
  const details = {
    identity: ["MissingMethod", "requested / actual identity", "assembly + load context"],
    memory: ["heap rising", "allocation or survivors", "root path + owner"],
    latency: ["CPU low", "queue / await / lock", "timeline + capacity"],
    boundary: ["round-trip fails", "schema / ABI / type", "old-new matrix"],
  }[mode];

  return (
    <LabShell
      label="Fault Evidence"
      title="从生产现象选择能区分假设的第一份证据"
      description="动手试：切换四类症状，观察不能只看一个指标；每种现象都要把 competing hypotheses 压缩到可验证的 evidence。"
      onReset={() => setMode("identity")}
    >
      <div className="flex flex-wrap gap-2">
        {(["identity", "memory", "latency", "boundary"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} fault evidence: symptom ${details[0]}, discriminator ${details[1]}, first evidence ${details[2]}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Fault symptom to discriminating evidence</title>
        <rect x="24" y="62" width="172" height="84" rx="12" fill="var(--review-accent-soft)" stroke="var(--review-accent)" strokeWidth="3" />
        <text x="110" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--review-ink)">symptom</text>
        <text x="110" y="121" textAnchor="middle" fontSize="12" fill="var(--review-ink)">{details[0]}</text>
        <line x1="216" y1="104" x2="286" y2="104" stroke="var(--review-accent)" strokeWidth="4" />
        <polygon points="286,104 274,97 274,111" fill="var(--review-accent)" />
        <rect x="302" y="38" width="156" height="132" rx="12" fill="var(--review-surface)" stroke="var(--review-muted)" strokeWidth="3" />
        <text x="380" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--review-ink)">discriminator</text>
        <text x="380" y="104" textAnchor="middle" fontSize="12" fill="var(--review-ink)">{details[1]}</text>
        <text x="380" y="134" textAnchor="middle" fontSize="12" fill="var(--review-ink)">competing hypotheses</text>
        <line x1="478" y1="104" x2="536" y2="104" stroke="var(--review-accent)" strokeWidth="4" />
        <polygon points="536,104 524,97 524,111" fill="var(--review-accent)" />
        <rect x="552" y="62" width="144" height="84" rx="12" fill="var(--review-accent-soft)" stroke="var(--review-accent)" strokeWidth="3" />
        <text x="624" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--review-ink)">first evidence</text>
        <text x="624" y="121" textAnchor="middle" fontSize="12" fill="var(--review-ink)">{details[2]}</text>
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--review-accent)">{mode === "identity" ? "不要用同名字符串代替 Type identity proof" : mode === "memory" ? "强制 GC 只能帮助比较，不能代替 root ownership 修复" : mode === "latency" ? "把 p99 拆成 queue、running、await、lock 与外部 deadline" : "round-trip 成功不足以证明旧写者与新读者兼容"}</text>
      </svg>
    </LabShell>
  );
}

type GateMode = "success" | "fault" | "cancel" | "pressure";

export function CvcAcceptanceMatrixLab() {
  const [mode, setMode] = useState<GateMode>("success");
  const rows = mode === "success"
    ? ["invariant holds", "result observed", "shutdown drains"]
    : mode === "fault"
      ? ["context preserved", "owner isolated", "rollback tested"]
      : mode === "cancel"
        ? ["cancel propagates", "permit released", "caller sees outcome"]
        : ["admission bounded", "wait measured", "race reproduced"];

  return (
    <LabShell
      label="Acceptance Matrix"
      title="用 success、fault、cancel、pressure 验收迁移能力"
      description="先预测：切换四种验收模式，哪一条证据能证明修复不是只在 happy path 上成立？"
      onReset={() => setMode("success")}
    >
      <div className="flex flex-wrap gap-2">
        {(["success", "fault", "cancel", "pressure"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} acceptance matrix: ${rows.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Acceptance matrix for runtime fixes</title>
        <rect x="24" y="45" width="672" height="128" rx="12" fill="var(--review-surface)" stroke="var(--review-muted)" strokeWidth="3" />
        <text x="110" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--review-ink)">mode</text>
        <text x="350" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--review-ink)">{mode}</text>
        <text x="590" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--review-ink)">evidence</text>
        <line x1="236" y1="55" x2="236" y2="163" stroke="var(--review-muted)" strokeWidth="2" />
        <line x1="476" y1="55" x2="476" y2="163" stroke="var(--review-muted)" strokeWidth="2" />
        {rows.map((row, index) => {
          const y = 104 + index * 22;
          return (
            <g key={row}>
              <circle cx="80" cy={y - 4} r="6" fill="var(--review-accent)" />
              <text x="98" y={y} fontSize="12" fill="var(--review-ink)">{index + 1}</text>
              <text x="350" y={y} textAnchor="middle" fontSize="12" fill="var(--review-ink)">{row}</text>
              <text x="590" y={y} textAnchor="middle" fontSize="12" fill="var(--review-ink)">{index === 0 ? "state" : index === 1 ? "owner" : "replay"}</text>
            </g>
          );
        })}
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--review-accent)">{mode === "success" ? "success：结果正确还不够，还要证明 shutdown 与 ownership" : mode === "fault" ? "fault：保留上下文、隔离失败并证明可回滚" : mode === "cancel" ? "cancel：观察传播、资源归还与调用者可见结果" : "pressure：在容量、竞争和 race 下重放同一 invariant"}</text>
      </svg>
    </LabShell>
  );
}
