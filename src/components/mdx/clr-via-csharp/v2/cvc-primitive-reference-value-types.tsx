"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--primitive-accent": "#2563eb",
  "--primitive-accent-soft": "#dbeafe",
  "--primitive-ink": "#172033",
  "--primitive-muted": "#94a3b8",
  "--primitive-warning": "#b45309",
} as CSSProperties;

const conceptLabels = [
  "Programming Language Primitive Types",
  "Checked and Unchecked Primitive Type Operations",
  "Reference Types and Value Types",
  "Boxing and Unboxing Value Types",
  "Changing Fields in a Boxed Value Type by Using Interfaces (and Why You Shouldn't Do This)",
  "Object Equality and Identity",
  "Object Hash Codes",
  "The dynamic Primitive Type",
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

type StorageMode = "reference" | "value" | "array";

export function CvcStorageCopyLab() {
  const [mode, setMode] = useState<StorageMode>("reference");
  const shared = mode === "reference";
  const array = mode === "array";

  return (
    <LabShell
      label="Storage Semantics"
      title="把 alias、copy 和 inline storage 分开"
      description="先预测：赋值后修改右侧变量，左侧变量会不会看到变化？切换 class reference、struct value 和 struct array。"
      onReset={() => setMode("reference")}
    >
      <div className="flex flex-wrap gap-2">
        {(["reference", "value", "array"] as const).map((item) => (
          <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{item === "reference" ? "class reference" : item === "value" ? "struct value" : "struct array"}</button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} storage mode ${shared ? "shares an object" : "copies value fields"}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Reference and value storage semantics</title>
        <defs>
          <marker id="cvc-storage-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={shared ? "var(--primitive-accent)" : "var(--primitive-muted)"} />
          </marker>
        </defs>
        <rect x="24" y="62" width="146" height="82" rx="12" fill="var(--primitive-accent-soft)" stroke="var(--primitive-accent)" strokeWidth="3" />
        <text x="97" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--primitive-ink)">left variable</text>
        <text x="97" y="120" textAnchor="middle" fontSize="12" fill="var(--primitive-ink)">{array ? "array slot" : "field value"}</text>
        <line x1="188" y1="103" x2="282" y2="103" stroke={shared ? "var(--primitive-accent)" : "var(--primitive-muted)"} strokeWidth="4" markerEnd="url(#cvc-storage-arrow)" strokeDasharray={shared ? undefined : "8 8"} />
        <rect x="298" y="38" width="154" height="130" rx="12" fill={shared ? "var(--primitive-accent-soft)" : "white"} stroke={shared ? "var(--primitive-accent)" : "var(--primitive-muted)"} strokeWidth="3" />
        <text x="375" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--primitive-ink)">{shared ? "same object" : array ? "inline elements" : "copied fields"}</text>
        <text x="375" y="101" textAnchor="middle" fontSize="12" fill="var(--primitive-ink)">{shared ? "heap instance" : array ? "contiguous storage" : "independent value"}</text>
        <text x="375" y="129" textAnchor="middle" fontSize="12" fill="var(--primitive-ink)">{shared ? "alias" : "copy"}</text>
        <line x1="472" y1="103" x2="558" y2="103" stroke={shared ? "var(--primitive-accent)" : "var(--primitive-muted)"} strokeWidth="4" markerEnd="url(#cvc-storage-arrow)" strokeDasharray={shared ? undefined : "8 8"} />
        <rect x="574" y="62" width="122" height="82" rx="12" fill={shared ? "var(--primitive-accent-soft)" : "white"} stroke={shared ? "var(--primitive-accent)" : "var(--primitive-muted)"} strokeWidth="3" />
        <text x="635" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--primitive-ink)">right variable</text>
        <text x="635" y="120" textAnchor="middle" fontSize="12" fill="var(--primitive-ink)">{shared ? "sees mutation" : "keeps old value"}</text>
        <text x="360" y="213" textAnchor="middle" fontSize="12" fontWeight="700" fill={shared ? "var(--primitive-accent)" : "var(--primitive-muted)"}>{shared ? "reference assignment：复制地址语义，共享 identity" : array ? "struct array：元素值内联，但每项仍是 value" : "value assignment：复制字段，不复制 identity"}</text>
      </svg>
    </LabShell>
  );
}

type BoxingMode = "original" | "boxed" | "unboxed";

export function CvcBoxingOwnershipLab() {
  const [mode, setMode] = useState<BoxingMode>("boxed");
  const box = mode === "boxed";

  return (
    <LabShell
      label="Boxing Ownership"
      title="追踪原始 struct、box 和 unbox copy"
      description="动手试：通过 interface 调用 mutating method 后，哪个 Counter 副本改变？"
      onReset={() => setMode("boxed")}
    >
      <div className="flex flex-wrap gap-2">
        {(["original", "boxed", "unboxed"] as const).map((item) => (
          <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{item === "original" ? "原始 struct" : item === "boxed" ? "interface box" : "unbox copy"}</button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} boxing ownership mode`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Boxing and unboxing ownership</title>
        <defs>
          <marker id="cvc-boxing-ownership-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={box ? "var(--primitive-warning)" : "var(--primitive-accent)"} />
          </marker>
        </defs>
        <rect x="24" y="62" width="146" height="82" rx="12" fill="var(--primitive-accent-soft)" stroke="var(--primitive-accent)" strokeWidth="3" />
        <text x="97" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--primitive-ink)">Counter value</text>
        <text x="97" y="120" textAnchor="middle" fontSize="12" fill="var(--primitive-ink)">original = 1</text>
        <line x1="188" y1="103" x2="282" y2="103" stroke={box ? "var(--primitive-warning)" : "var(--primitive-accent)"} strokeWidth="4" markerEnd="url(#cvc-boxing-ownership-arrow)" />
        <rect x="298" y="38" width="154" height="130" rx="12" fill={box ? "#fef3c7" : "white"} stroke={box ? "var(--primitive-warning)" : "var(--primitive-muted)"} strokeWidth="3" />
        <text x="375" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--primitive-ink)">{box ? "box payload" : "value boundary"}</text>
        <text x="375" y="101" textAnchor="middle" fontSize="12" fill="var(--primitive-ink)">{box ? "copy = 1" : mode === "unboxed" ? "copy = 2" : "no allocation"}</text>
        <text x="375" y="129" textAnchor="middle" fontSize="12" fill="var(--primitive-ink)">{box ? "interface mutates box" : "separate storage"}</text>
        <line x1="472" y1="103" x2="558" y2="103" stroke={box ? "var(--primitive-warning)" : "var(--primitive-accent)"} strokeWidth="4" markerEnd="url(#cvc-boxing-ownership-arrow)" />
        <rect x="574" y="62" width="122" height="82" rx="12" fill={box ? "#fef3c7" : "var(--primitive-accent-soft)"} stroke={box ? "var(--primitive-warning)" : "var(--primitive-accent)"} strokeWidth="3" />
        <text x="635" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--primitive-ink)">observed value</text>
        <text x="635" y="120" textAnchor="middle" fontSize="12" fill="var(--primitive-ink)">{mode === "original" ? "original = 1" : mode === "boxed" ? "box = 2" : "copy = 2"}</text>
        <text x="360" y="213" textAnchor="middle" fontSize="12" fontWeight="700" fill={box ? "var(--primitive-warning)" : "var(--primitive-accent)"}>{box ? "interface call 改变 box，不会回写原始 struct" : "先明确 owner，再决定是否接受 boxing / copy 成本"}</text>
      </svg>
    </LabShell>
  );
}

type BindingMode = "equality" | "hash" | "dynamic";

export function CvcEqualityDynamicLab() {
  const [mode, setMode] = useState<BindingMode>("equality");
  const dynamic = mode === "dynamic";

  return (
    <LabShell
      label="Equality and Binding"
      title="把 identity、equality、hash 与 dynamic 时机对齐"
      description="先预测：两个不同 instance 但值相等时，identity、Equals、hash 和 dynamic member lookup 分别在哪一层决定？"
      onReset={() => setMode("equality")}
    >
      <div className="flex flex-wrap gap-2">
        {(["equality", "hash", "dynamic"] as const).map((item) => (
          <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{item}</button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} binding and equality layer`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Equality hash and dynamic binding</title>
        <rect x="24" y="62" width="146" height="82" rx="12" fill="var(--primitive-accent-soft)" stroke="var(--primitive-accent)" strokeWidth="3" />
        <text x="97" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--primitive-ink)">two values</text>
        <text x="97" y="120" textAnchor="middle" fontSize="12" fill="var(--primitive-ink)">{dynamic ? "runtime shape" : "same domain key"}</text>
        <line x1="188" y1="103" x2="282" y2="103" stroke="var(--primitive-accent)" strokeWidth="4" />
        <polygon points="282,103 270,96 270,110" fill="var(--primitive-accent)" />
        <rect x="298" y="38" width="154" height="130" rx="12" fill={dynamic ? "#fef3c7" : "white"} stroke={dynamic ? "var(--primitive-warning)" : "var(--primitive-muted)"} strokeWidth="3" />
        <text x="375" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--primitive-ink)">{dynamic ? "runtime binder" : mode === "hash" ? "comparer + hash" : "equality contract"}</text>
        <text x="375" y="101" textAnchor="middle" fontSize="12" fill="var(--primitive-ink)">{dynamic ? "member/operator lookup" : mode === "hash" ? "equal ⇒ same hash" : "Equals / identity"}</text>
        <text x="375" y="129" textAnchor="middle" fontSize="12" fill="var(--primitive-ink)">{dynamic ? "may fail at runtime" : "stable while keyed"}</text>
        <line x1="472" y1="103" x2="558" y2="103" stroke={dynamic ? "var(--primitive-warning)" : "var(--primitive-accent)"} strokeWidth="4" />
        <polygon points="558,103 546,96 546,110" fill={dynamic ? "var(--primitive-warning)" : "var(--primitive-accent)"} />
        <rect x="574" y="62" width="122" height="82" rx="12" fill={dynamic ? "#fef3c7" : "var(--primitive-accent-soft)"} stroke={dynamic ? "var(--primitive-warning)" : "var(--primitive-accent)"} strokeWidth="3" />
        <text x="635" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--primitive-ink)">{dynamic ? "call site" : "collection"}</text>
        <text x="635" y="120" textAnchor="middle" fontSize="12" fill="var(--primitive-ink)">{dynamic ? "RuntimeBinderException" : mode === "hash" ? "bucket lookup" : "same / different"}</text>
        <text x="360" y="213" textAnchor="middle" fontSize="12" fontWeight="700" fill={dynamic ? "var(--primitive-warning)" : "var(--primitive-accent)"}>{dynamic ? "dynamic：保留真实 CLR type，但把错误推迟到运行期" : mode === "hash" ? "hash 是定位工具，不是 identity；key 必须稳定" : "identity、value equality、hash 是不同问题"}</text>
      </svg>
    </LabShell>
  );
}

export const cvcPrimitiveReferenceValueConceptLabels = conceptLabels;
