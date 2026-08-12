"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--arrays-accent": "#0369a1",
  "--arrays-accent-soft": "#e0f2fe",
  "--arrays-ink": "#172033",
  "--arrays-muted": "#94a3b8",
  "--arrays-warning": "#b45309",
  "--arrays-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "Initializing Array Elements",
  "Casting Arrays",
  "All Arrays Are Implicitly Derived from System.Array",
  "All Arrays Implicitly Implement IEnumerable, ICollection, and IList",
  "Passing and Returning Arrays",
  "Creating Non-Zero Lower Bound Arrays",
  "Array Internals",
  "Unsafe Array Access and Fixed-Size Arrays",
] as const;

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

type ShapeMode = "vector" | "rectangular" | "jagged" | "bounds";

export function CvcArrayShapeLab() {
  const [mode, setMode] = useState<ShapeMode>("vector");
  const details = {
    vector: ["rank 1", "0..4", "contiguous"],
    rectangular: ["rank 2", "2 × 3", "one object"],
    jagged: ["rank 1 + rows", "2 / 3 / 1", "row references"],
    bounds: ["rank 1", "5..9", "custom lower bound"],
  }[mode];

  return (
    <LabShell
      label="Array Runtime Shape"
      title="把 rank、bounds、storage 与访问路径同时画出"
      description="先预测：切换 vector、rectangular、jagged 和 custom bounds，Length、contiguity 与索引起点会怎样变化？"
      onReset={() => setMode("vector")}
    >
      <div className="flex flex-wrap gap-2">
        {(["vector", "rectangular", "jagged", "bounds"] as const).map((item) => (
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
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} array shape: ${details.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Array runtime shape and storage</title>
        {mode === "jagged" ? (
          <g>
            <rect x="30" y="76" width="132" height="58" rx="10" fill="var(--arrays-accent-soft)" stroke="var(--arrays-accent)" strokeWidth="3" />
            <text x="96" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--arrays-ink)">outer refs</text>
            {[0, 1, 2].map((row) => (
              <g key={row}>
                <line x1="178" y1="105" x2="260" y2={70 + row * 50} stroke="var(--arrays-accent)" strokeWidth="3" />
                <rect x="276" y={46 + row * 50} width={112 + row * 30} height="42" rx="8" fill="var(--arrays-surface)" stroke="var(--arrays-muted)" strokeWidth="3" />
                <text x={332 + row * 15} y={72 + row * 50} textAnchor="middle" fontSize="12" fill="var(--arrays-ink)">row {row + 1}: {details[1].split("/")[row]} elements</text>
              </g>
            ))}
            <text x="560" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--arrays-accent)">different row lengths</text>
          </g>
        ) : (
          <g>
            <rect x="28" y="62" width="170" height="84" rx="12" fill="var(--arrays-accent-soft)" stroke="var(--arrays-accent)" strokeWidth="3" />
            <text x="113" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--arrays-ink)">runtime shape</text>
            <text x="113" y="121" textAnchor="middle" fontSize="12" fill="var(--arrays-ink)">{details[0]} · {details[1]}</text>
            <line x1="222" y1="104" x2="274" y2="104" stroke="var(--arrays-accent)" strokeWidth="4" />
            <polygon points="274,104 262,97 262,111" fill="var(--arrays-accent)" />
            <rect x="290" y="38" width="166" height="132" rx="12" fill="var(--arrays-surface)" stroke="var(--arrays-muted)" strokeWidth="3" />
            <text x="373" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--arrays-ink)">storage</text>
            <text x="373" y="103" textAnchor="middle" fontSize="12" fill="var(--arrays-ink)">{details[2]}</text>
            <text x="373" y="132" textAnchor="middle" fontSize="12" fill="var(--arrays-ink)">{mode === "rectangular" ? "row-major shape" : mode === "bounds" ? "index starts at 5" : "element slots"}</text>
            <line x1="478" y1="104" x2="530" y2="104" stroke="var(--arrays-accent)" strokeWidth="4" />
            <polygon points="530,104 518,97 518,111" fill="var(--arrays-accent)" />
            <rect x="546" y="62" width="150" height="84" rx="12" fill="var(--arrays-accent-soft)" stroke="var(--arrays-accent)" strokeWidth="3" />
            <text x="621" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--arrays-ink)">access</text>
            <text x="621" y="121" textAnchor="middle" fontSize="12" fill="var(--arrays-ink)">{mode === "bounds" ? "GetLowerBound" : "indexing"}</text>
          </g>
        )}
        <text x="360" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--arrays-accent)">{mode === "vector" ? "vector：zero-based contiguous storage，Length 是元素总数" : mode === "rectangular" ? "rectangular：一个多维对象，rank 与每维 bounds 都是契约" : mode === "jagged" ? "jagged：outer array 保存 row references，行可有不同长度" : "custom bounds：不能把 lower bound 偷换成 0"}</text>
      </svg>
    </LabShell>
  );
}

type BoundaryMode = "covariance" | "system-array" | "ownership";

export function CvcArrayBoundaryLab() {
  const [mode, setMode] = useState<BoundaryMode>("covariance");
  const details = {
    covariance: ["string[]", "object[] view", "write check"],
    "system-array": ["T[]", "System.Array", "boxing / reflection"],
    ownership: ["private storage", "parameter / return", "alias policy"],
  }[mode];
  const warning = mode !== "ownership";

  return (
    <LabShell
      label="Array Boundary"
      title="观察类型安全、通用视图和 alias policy 的边界"
      description="动手试：切换 covariance、System.Array 和 ownership，找出哪一层把错误推迟到运行时，哪一层需要 snapshot 或 read-only view。"
      onReset={() => setMode("covariance")}
    >
      <div className="flex flex-wrap gap-2">
        {(["covariance", "system-array", "ownership"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "system-array" ? "System.Array" : item}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} array boundary: ${details.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Array type safety and ownership boundaries</title>
        <rect x="24" y="62" width="166" height="84" rx="12" fill="var(--arrays-accent-soft)" stroke="var(--arrays-accent)" strokeWidth="3" />
        <text x="107" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--arrays-ink)">caller view</text>
        <text x="107" y="121" textAnchor="middle" fontSize="12" fill="var(--arrays-ink)">{details[0]}</text>
        <line x1="214" y1="104" x2="278" y2="104" stroke="var(--arrays-accent)" strokeWidth="4" />
        <polygon points="278,104 266,97 266,111" fill="var(--arrays-accent)" />
        <rect x="294" y="38" width="166" height="132" rx="12" fill="var(--arrays-surface)" stroke="var(--arrays-muted)" strokeWidth="3" />
        <text x="377" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--arrays-ink)">{details[1]}</text>
        <text x="377" y="104" textAnchor="middle" fontSize="12" fill="var(--arrays-ink)">{details[2]}</text>
        <text x="377" y="134" textAnchor="middle" fontSize="12" fill={warning ? "var(--arrays-warning)" : "var(--arrays-ink)"}>{warning ? "runtime boundary" : "snapshot or lease"}</text>
        <line x1="484" y1="104" x2="538" y2="104" stroke="var(--arrays-accent)" strokeWidth="4" />
        <polygon points="538,104 526,97 526,111" fill="var(--arrays-accent)" />
        <rect x="554" y="62" width="142" height="84" rx="12" fill={warning ? "var(--arrays-surface)" : "var(--arrays-accent-soft)"} stroke={warning ? "var(--arrays-muted)" : "var(--arrays-accent)"} strokeWidth="3" />
        <text x="625" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--arrays-ink)">guarantee</text>
        <text x="625" y="121" textAnchor="middle" fontSize="12" fill="var(--arrays-ink)">{mode === "covariance" ? "ArrayTypeMismatch" : mode === "system-array" ? "typed helper" : "no hidden alias"}</text>
        <text x="360" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill={warning ? "var(--arrays-warning)" : "var(--arrays-accent)"}>{mode === "covariance" ? "covariance：read safe，不代表可以写任意 base value" : mode === "system-array" ? "System.Array：通用能力换来 boxing 与较弱静态保证" : "ownership：copy、read-only view 或 lease 必须写进 API contract"}</text>
      </svg>
    </LabShell>
  );
}

type LifetimeMode = "pass-return" | "pin" | "pool";

export function CvcArrayLifetimeLab() {
  const [mode, setMode] = useState<LifetimeMode>("pass-return");
  const details = {
    "pass-return": ["caller / callee", "same storage", "copy or view"],
    pin: ["managed array", "pinned address", "native callback"],
    pool: ["rented buffer", "logical length", "return + clear"],
  }[mode];
  const risk = mode === "pin" || mode === "pool";

  return (
    <LabShell
      label="Array Lifetime"
      title="把 alias、pin scope 与 pool lease 画成生命周期"
      description="先预测：切换 pass/return、pin 和 pool ownership，哪一步负责地址稳定、logical length、清理和归还？"
      onReset={() => setMode("pass-return")}
    >
      <div className="flex flex-wrap gap-2">
        {(["pass-return", "pin", "pool"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "pass-return" ? "pass / return" : item}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} array lifetime: ${details.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Array alias, pinning, and pool lifetime</title>
        <defs>
          <marker id="cvc-arrays-life-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--arrays-accent)" />
          </marker>
        </defs>
        <rect x="24" y="62" width="168" height="84" rx="12" fill="var(--arrays-accent-soft)" stroke="var(--arrays-accent)" strokeWidth="3" />
        <text x="108" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--arrays-ink)">{details[0]}</text>
        <text x="108" y="121" textAnchor="middle" fontSize="12" fill="var(--arrays-ink)">start</text>
        <line x1="216" y1="104" x2="278" y2="104" stroke="var(--arrays-accent)" strokeWidth="4" markerEnd="url(#cvc-arrays-life-arrow)" />
        <rect x="294" y="38" width="166" height="132" rx="12" fill="var(--arrays-surface)" stroke="var(--arrays-muted)" strokeWidth="3" />
        <text x="377" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--arrays-ink)">lifetime boundary</text>
        <text x="377" y="104" textAnchor="middle" fontSize="12" fill="var(--arrays-ink)">{details[1]}</text>
        <text x="377" y="134" textAnchor="middle" fontSize="12" fill={risk ? "var(--arrays-warning)" : "var(--arrays-ink)"}>{risk ? "scope must be explicit" : details[2]}</text>
        <line x1="484" y1="104" x2="538" y2="104" stroke="var(--arrays-accent)" strokeWidth="4" markerEnd="url(#cvc-arrays-life-arrow)" />
        <rect x="554" y="62" width="142" height="84" rx="12" fill={risk ? "var(--arrays-accent-soft)" : "var(--arrays-surface)"} stroke={risk ? "var(--arrays-accent)" : "var(--arrays-muted)"} strokeWidth="3" />
        <text x="625" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--arrays-ink)">end</text>
        <text x="625" y="121" textAnchor="middle" fontSize="12" fill="var(--arrays-ink)">{mode === "pool" ? "Return once" : mode === "pin" ? "unpin" : "copy / release"}</text>
        <text x="360" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill={risk ? "var(--arrays-warning)" : "var(--arrays-accent)"}>{mode === "pass-return" ? "pass/return：reference复制不复制元素，alias 责任必须显式" : mode === "pin" ? "pin：只稳定地址，不防并发写，也不延长 native 异步生命周期" : "pool：Rent 的 Length 可能更大，logical length 与 Return/clear 不可省略"}</text>
      </svg>
    </LabShell>
  );
}

export const cvcArraysConceptLabels = conceptLabels;
