"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--methods-accent": "#2563eb",
  "--methods-accent-soft": "#dbeafe",
  "--methods-ink": "#172033",
  "--methods-muted": "#94a3b8",
  "--methods-warning": "#b45309",
} as CSSProperties;

const conceptLabels = [
  "Instance Constructors and Classes (Reference Types)",
  "Instance Constructors and Structures (Value Types)",
  "Type Constructors",
  "Operator Overload Methods",
  "Operators and Programming Language Interoperability",
  "Conversion Operator Methods",
  "Extension Methods",
  "Rules and Guidelines",
  "Extending Various Types with Extension Methods",
  "The Extension Attribute",
  "Partial Methods",
] as const;

function ResetButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
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
    <section aria-label={label} style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
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

type ConstructionMode = "class" | "struct" | "type";

export function CvcConstructionFailureLab() {
  const [mode, setMode] = useState<ConstructionMode>("class");
  const [failed, setFailed] = useState(false);
  const stages = mode === "class"
    ? ["allocate + zero", "base init", "field init", failed ? "cleanup" : "invariant"]
    : mode === "struct"
      ? ["value storage", "definite assign", "default path", failed ? "invalid value" : "usable value"]
      : ["static fields", "cctor", failed ? "cached failure" : "ready state", "next access"];

  return (
    <LabShell
      label="Construction Failure"
      title="把初始化顺序和失败边界画出来"
      description="先预测：在不同构造路径的第三步注入异常，哪些资源必须回滚，哪些失败会被 runtime 缓存？"
      onReset={() => { setMode("class"); setFailed(false); }}
    >
      <div className="flex flex-wrap gap-2">
        {(["class", "struct", "type"] as const).map((item) => (
          <button key={item} type="button" aria-pressed={mode === item} onClick={() => { setMode(item); setFailed(false); }} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{item === "class" ? "class" : item === "struct" ? "struct" : "type constructor"}</button>
        ))}
        <button type="button" aria-pressed={failed} onClick={() => setFailed((value) => !value)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${failed ? "border-warning bg-bg text-primary" : "border-border text-secondary"}`}>{failed ? "恢复成功路径" : "注入第三步失败"}</button>
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} construction timeline ${failed ? "with failure and cleanup" : "completed successfully"}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Construction and failure timeline</title>
        <line x1="70" y1="112" x2="650" y2="112" stroke="var(--methods-muted)" strokeWidth="4" />
        {stages.map((stage, index) => {
          const x = 70 + index * 193;
          const warning = failed && index === 2;
          const terminal = index === stages.length - 1;
          return (
            <g key={stage}>
              <circle cx={x} cy="112" r={warning ? 30 : 24} fill={warning ? "#fef3c7" : terminal && !failed ? "var(--methods-accent)" : "white"} stroke={warning ? "var(--methods-warning)" : terminal && !failed ? "var(--methods-accent)" : "var(--methods-muted)"} strokeWidth="4" />
              <text x={x} y="117" textAnchor="middle" fontSize="12" fontWeight="700" fill={warning || !terminal ? "var(--methods-ink)" : "white"}>{index + 1}</text>
              <text x={x} y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--methods-ink)">{stage}</text>
              <text x={x} y="169" textAnchor="middle" fontSize="11" fill="var(--methods-ink)">{warning ? "release partial work" : terminal ? (failed ? "not published" : "observable") : "private step"}</text>
            </g>
          );
        })}
        <text x="360" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill={failed ? "var(--methods-warning)" : "var(--methods-accent)"}>{failed ? (mode === "type" ? "TypeInitializationException：后续访问继续失败" : "失败路径：释放局部资源，禁止发布半初始化对象") : "成功路径：建立 invariant 后再发布"}</text>
      </svg>
    </LabShell>
  );
}

type ConversionMode = "implicit" | "explicit" | "try";

export function CvcConversionPolicyLab() {
  const [mode, setMode] = useState<ConversionMode>("explicit");
  const safe = mode === "implicit";
  const named = mode === "try";

  return (
    <LabShell
      label="Conversion Policy"
      title="让信息损失和失败显式可见"
      description="动手试：把 Money 转成 decimal，切换 implicit、explicit、Try 方法，观察 unit、failure 和成本如何暴露。"
      onReset={() => setMode("explicit")}
    >
      <div className="flex flex-wrap gap-2">
        {(["implicit", "explicit", "try"] as const).map((item) => (
          <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{item === "try" ? "Try / Result" : item}</button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`Conversion policy ${mode} from Money to decimal`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Conversion loss policy</title>
        <defs>
          <marker id="cvc-conversion-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={safe ? "var(--methods-accent)" : "var(--methods-warning)"} />
          </marker>
        </defs>
        <rect x="24" y="64" width="152" height="82" rx="12" fill="var(--methods-accent-soft)" stroke="var(--methods-accent)" strokeWidth="3" />
        <text x="100" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--methods-ink)">Money</text>
        <text x="100" y="122" textAnchor="middle" fontSize="12" fill="var(--methods-ink)">amount + currency</text>
        <line x1="194" y1="105" x2="280" y2="105" stroke={safe ? "var(--methods-accent)" : "var(--methods-warning)"} strokeWidth="4" markerEnd="url(#cvc-conversion-arrow)" />
        <rect x="296" y="40" width="154" height="130" rx="12" fill={safe ? "var(--methods-accent-soft)" : "#fef3c7"} stroke={safe ? "var(--methods-accent)" : "var(--methods-warning)"} strokeWidth="3" />
        <text x="373" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--methods-ink)">{mode === "implicit" ? "implicit cast" : mode === "explicit" ? "explicit cast" : "TryGetAmount"}</text>
        <text x="373" y="101" textAnchor="middle" fontSize="12" fill="var(--methods-ink)">{safe ? "no visible failure" : named ? "bool + output" : "caller acknowledges"}</text>
        <text x="373" y="128" textAnchor="middle" fontSize="12" fill="var(--methods-ink)">{safe ? "only lossless" : named ? "unit checked" : "loss / throw"}</text>
        <line x1="468" y1="105" x2="554" y2="105" stroke={safe ? "var(--methods-accent)" : "var(--methods-warning)"} strokeWidth="4" markerEnd="url(#cvc-conversion-arrow)" />
        <rect x="570" y="64" width="126" height="82" rx="12" fill="var(--methods-accent-soft)" stroke="var(--methods-accent)" strokeWidth="3" />
        <text x="633" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--methods-ink)">decimal</text>
        <text x="633" y="122" textAnchor="middle" fontSize="12" fill="var(--methods-ink)">{named ? "Result value" : "raw amount"}</text>
        <text x="360" y="215" textAnchor="middle" fontSize="12" fontWeight="700" fill={safe ? "var(--methods-accent)" : "var(--methods-warning)"}>{safe ? "只有确认不丢信息时才适合 implicit" : named ? "复杂转换：用命名 API 说明依赖与 failure" : "可能损失或失败：让 caller 明确承担"}</text>
      </svg>
    </LabShell>
  );
}

export function CvcBindingRebindLab() {
  const [recompiled, setRecompiled] = useState(false);
  const [instanceAdded, setInstanceAdded] = useState(false);
  const target = instanceAdded && recompiled ? "new instance member" : "static extension";

  return (
    <LabShell
      label="Extension Binding"
      title="复现旧 binary 与新 source 的分派差异"
      description="先预测：library 新增同名 instance member 后，旧 binary 和重新编译的 source 会不会指向同一 target？"
      onReset={() => { setRecompiled(false); setInstanceAdded(false); }}
    >
      <div className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={instanceAdded} onClick={() => setInstanceAdded((value) => !value)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${instanceAdded ? "border-warning bg-bg text-primary" : "border-border text-secondary"}`}>{instanceAdded ? "保留新增 instance" : "新增 instance member"}</button>
        <button type="button" aria-pressed={recompiled} onClick={() => setRecompiled((value) => !value)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${recompiled ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{recompiled ? "source 已重编译" : "切换到重新编译"}</button>
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`Extension binding target is ${target}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Extension method source rebinding</title>
        <defs>
          <marker id="cvc-binding-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={target === "new instance member" ? "var(--methods-warning)" : "var(--methods-accent)"} />
          </marker>
        </defs>
        <rect x="24" y="66" width="154" height="78" rx="12" fill="var(--methods-accent-soft)" stroke="var(--methods-accent)" strokeWidth="3" />
        <text x="101" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--methods-ink)">consumer source</text>
        <text x="101" y="122" textAnchor="middle" fontSize="12" fill="var(--methods-ink)">receiver.Method()</text>
        <line x1="196" y1="105" x2="282" y2="105" stroke={target === "new instance member" ? "var(--methods-warning)" : "var(--methods-accent)"} strokeWidth="4" markerEnd="url(#cvc-binding-arrow)" />
        <rect x="298" y="40" width="154" height="130" rx="12" fill={instanceAdded ? "#fef3c7" : "white"} stroke={instanceAdded ? "var(--methods-warning)" : "var(--methods-muted)"} strokeWidth="3" />
        <text x="375" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--methods-ink)">compiler lookup</text>
        <text x="375" y="102" textAnchor="middle" fontSize="12" fill="var(--methods-ink)">instance first</text>
        <text x="375" y="130" textAnchor="middle" fontSize="12" fill="var(--methods-ink)">{instanceAdded ? "extension fallback" : "extension candidate"}</text>
        <line x1="472" y1="105" x2="558" y2="105" stroke={target === "new instance member" ? "var(--methods-warning)" : "var(--methods-accent)"} strokeWidth="4" markerEnd="url(#cvc-binding-arrow)" />
        <rect x="574" y="66" width="122" height="78" rx="12" fill={target === "new instance member" ? "#fef3c7" : "var(--methods-accent-soft)"} stroke={target === "new instance member" ? "var(--methods-warning)" : "var(--methods-accent)"} strokeWidth="3" />
        <text x="635" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--methods-ink)">target</text>
        <text x="635" y="122" textAnchor="middle" fontSize="12" fill="var(--methods-ink)">{target}</text>
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill={target === "new instance member" ? "var(--methods-warning)" : "var(--methods-accent)"}>{instanceAdded && !recompiled ? "旧 binary 仍绑定已编译的 static extension" : target === "new instance member" ? "重编译 source：instance member 抢先" : "没有同名 instance：继续绑定 extension"}</text>
      </svg>
    </LabShell>
  );
}

export const cvcMethodsConceptLabels = conceptLabels;
