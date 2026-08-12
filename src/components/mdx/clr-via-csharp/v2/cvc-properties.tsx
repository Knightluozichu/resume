"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--properties-accent": "#2563eb",
  "--properties-accent-soft": "#dbeafe",
  "--properties-ink": "#172033",
  "--properties-muted": "#94a3b8",
  "--properties-warning": "#b45309",
} as CSSProperties;

const conceptLabels = [
  "Parameterless Properties",
  "Automatically Implemented Properties",
  "Defining Properties Intelligently",
  "Object and Collection Initializers",
  "Anonymous Types",
  "The System.Tuple Type",
  "Parameterful Properties",
  "The Performance of Calling Property Accessor Methods",
  "Property Accessor Accessibility",
  "Generic Property Accessor Methods",
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

type AccessMode = "field" | "property" | "method";

export function CvcAccessorBehaviorLab() {
  const [mode, setMode] = useState<AccessMode>("property");
  const observable = mode !== "field";

  return (
    <LabShell
      label="Accessor Behavior"
      title="把点语法背后的行为画出来"
      description="先预测：切换 field、property、method，哪一种允许 validation、virtual dispatch、I/O 或显式失败？"
      onReset={() => setMode("property")}
    >
      <div className="flex flex-wrap gap-2">
        {(["field", "property", "method"] as const).map((item) => (
          <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{item}</button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} access path ${observable ? "executes behavior" : "reads storage directly"}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Property accessor behavior</title>
        <defs>
          <marker id="cvc-accessor-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={observable ? "var(--properties-accent)" : "var(--properties-muted)"} />
          </marker>
        </defs>
        <rect x="24" y="64" width="146" height="82" rx="12" fill="var(--properties-accent-soft)" stroke="var(--properties-accent)" strokeWidth="3" />
        <text x="97" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--properties-ink)">caller</text>
        <text x="97" y="122" textAnchor="middle" fontSize="12" fill="var(--properties-ink)">obj.Value</text>
        <line x1="188" y1="105" x2="282" y2="105" stroke={observable ? "var(--properties-accent)" : "var(--properties-muted)"} strokeWidth="4" markerEnd="url(#cvc-accessor-arrow)" strokeDasharray={observable ? undefined : "8 8"} />
        <rect x="298" y="38" width="154" height="130" rx="12" fill={observable ? "var(--properties-accent-soft)" : "white"} stroke={observable ? "var(--properties-accent)" : "var(--properties-muted)"} strokeWidth="3" />
        <text x="375" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--properties-ink)">{mode === "field" ? "storage" : mode === "property" ? "get accessor" : "named method"}</text>
        <text x="375" y="101" textAnchor="middle" fontSize="12" fill="var(--properties-ink)">{mode === "field" ? "direct read" : mode === "property" ? "validation / cache" : "action / failure"}</text>
        <text x="375" y="129" textAnchor="middle" fontSize="12" fill="var(--properties-ink)">{mode === "method" ? "explicit cost" : mode === "property" ? "value-like cost" : "no behavior"}</text>
        <line x1="472" y1="105" x2="558" y2="105" stroke={observable ? "var(--properties-accent)" : "var(--properties-muted)"} strokeWidth="4" markerEnd="url(#cvc-accessor-arrow)" strokeDasharray={observable ? undefined : "8 8"} />
        <rect x="574" y="64" width="122" height="82" rx="12" fill={observable ? "var(--properties-accent-soft)" : "white"} stroke={observable ? "var(--properties-accent)" : "var(--properties-muted)"} strokeWidth="3" />
        <text x="635" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--properties-ink)">observable</text>
        <text x="635" y="122" textAnchor="middle" fontSize="12" fill="var(--properties-ink)">{observable ? "contract behavior" : "raw state"}</text>
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill={observable ? "var(--properties-accent)" : "var(--properties-muted)"}>{mode === "field" ? "field：暴露存储，缺少验证与演进边界" : mode === "property" ? "property：保持 value-like，隐藏有限访问行为" : "method：动作、成本、失败都应显式命名"}</text>
      </svg>
    </LabShell>
  );
}

type InitMode = "object" | "collection" | "failed";

export function CvcInitializerSequencingLab() {
  const [mode, setMode] = useState<InitMode>("object");
  const stages = mode === "collection" ? ["new collection", "Add #1", "Add #2", "ready"] : mode === "failed" ? ["constructor", "setter #1", "setter #2", "throws"] : ["constructor", "init #1", "init #2", "published"];
  const failed = mode === "failed";

  return (
    <LabShell
      label="Initializer Sequencing"
      title="追踪 constructor 后的非原子初始化"
      description="动手试：切换 object initializer、collection initializer 和失败路径，观察每一步何时发生、哪些副作用已经落下。"
      onReset={() => setMode("object")}
    >
      <div className="flex flex-wrap gap-2">
        {(["object", "collection", "failed"] as const).map((item) => (
          <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{item === "object" ? "object init" : item === "collection" ? "collection init" : "注入失败"}</button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} initializer sequence ${failed ? "fails before publication" : "completes"}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Object and collection initializer sequence</title>
        <line x1="70" y1="112" x2="650" y2="112" stroke="var(--properties-muted)" strokeWidth="4" />
        {stages.map((stage, index) => {
          const x = 70 + index * 193;
          const warning = failed && index === 3;
          const terminal = index === stages.length - 1;
          return (
            <g key={stage}>
              <circle cx={x} cy="112" r={warning ? 30 : 24} fill={warning ? "#fef3c7" : terminal && !failed ? "var(--properties-accent)" : "white"} stroke={warning ? "var(--properties-warning)" : terminal && !failed ? "var(--properties-accent)" : "var(--properties-muted)"} strokeWidth="4" />
              <text x={x} y="117" textAnchor="middle" fontSize="12" fontWeight="700" fill={warning || !terminal ? "var(--properties-ink)" : "white"}>{index + 1}</text>
              <text x={x} y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--properties-ink)">{stage}</text>
              <text x={x} y="169" textAnchor="middle" fontSize="11" fill="var(--properties-ink)">{warning ? "partial side effects" : terminal ? (failed ? "not published" : "visible" ) : "already executed"}</text>
            </g>
          );
        })}
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill={failed ? "var(--properties-warning)" : "var(--properties-accent)"}>{failed ? "initializer 不是 transaction：用 factory/builder 验证和补偿" : mode === "collection" ? "construction 后逐个 Add，保持 collection ownership 明确" : "constructor 先建立基础 invariant，再按源顺序设置"}</text>
      </svg>
    </LabShell>
  );
}

type BoundaryMode = "indexer" | "visibility" | "generic";

export function CvcPropertyBoundaryLab() {
  const [mode, setMode] = useState<BoundaryMode>("indexer");
  const details = mode === "indexer"
    ? ["key / bounds", "missing policy", "cost + comparer"]
    : mode === "visibility"
      ? ["public get", "private set", "read surface"]
      : ["closed T owner", "PropertyInfo", "generic method for new T"];

  return (
    <LabShell
      label="Property Boundary"
      title="把 indexer、访问器和泛型边界写成契约"
      description="先预测：切换 indexer、accessor visibility、generic owner，哪个边界真正约束了 caller 的读写和生命周期？"
      onReset={() => setMode("indexer")}
    >
      <div className="flex flex-wrap gap-2">
        {(["indexer", "visibility", "generic"] as const).map((item) => (
          <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{item === "indexer" ? "indexer" : item === "visibility" ? "accessor visibility" : "generic owner"}</button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`Property boundary mode ${mode}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Property and accessor boundaries</title>
        <rect x="24" y="62" width="146" height="82" rx="12" fill="var(--properties-accent-soft)" stroke="var(--properties-accent)" strokeWidth="3" />
        <text x="97" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--properties-ink)">caller view</text>
        <text x="97" y="120" textAnchor="middle" fontSize="12" fill="var(--properties-ink)">{mode === "indexer" ? "obj[key]" : mode === "visibility" ? "obj.Value" : "box.Value"}</text>
        <line x1="188" y1="103" x2="282" y2="103" stroke="var(--properties-accent)" strokeWidth="4" />
        <polygon points="282,103 270,96 270,110" fill="var(--properties-accent)" />
        <rect x="298" y="38" width="154" height="130" rx="12" fill="white" stroke="var(--properties-muted)" strokeWidth="3" />
        <text x="375" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--properties-ink)">{mode === "indexer" ? "indexer contract" : mode === "visibility" ? "accessor surface" : "generic property"}</text>
        {details.map((detail, index) => (
          <g key={detail}>
            <circle cx="322" cy={101 + index * 22} r="5" fill="var(--properties-accent)" />
            <text x="336" y={105 + index * 22} fontSize="11" fill="var(--properties-ink)">{detail}</text>
          </g>
        ))}
        <line x1="472" y1="103" x2="558" y2="103" stroke="var(--properties-accent)" strokeWidth="4" />
        <polygon points="558,103 546,96 546,110" fill="var(--properties-accent)" />
        <rect x="574" y="62" width="122" height="82" rx="12" fill="var(--properties-accent-soft)" stroke="var(--properties-accent)" strokeWidth="3" />
        <text x="635" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--properties-ink)">guarantee</text>
        <text x="635" y="120" textAnchor="middle" fontSize="12" fill="var(--properties-ink)">{mode === "indexer" ? "lookup policy" : mode === "visibility" ? "read/write split" : "closed type"}</text>
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--properties-accent)">{mode === "indexer" ? "indexer contract：missing、bounds、cost、comparer 都需明确" : mode === "visibility" ? "accessor visibility：缩小写入 owner，不等于深度 immutable" : "generic property 依赖 closed owner；新 T 需求改用 generic method"}</text>
      </svg>
    </LabShell>
  );
}

export const cvcPropertiesConceptLabels = conceptLabels;
