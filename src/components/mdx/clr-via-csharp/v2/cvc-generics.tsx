"use client";

import { useState } from "react";

const conceptLabels = [
  "Generics in the Framework Class Library",
  "Generics Infrastructure",
  "Open and Closed Types",
  "Generic Types and Inheritance",
  "Generic Type Identity",
  "Code Explosion",
  "Generic Interfaces",
  "Generic Delegates",
  "Delegate and Interface Contravariant and Covariant Generic Type Arguments",
  "Generic Methods",
  "Generic Methods and Type Inference",
  "Generics and Other Members",
  "Verifiability and Constraints",
  "Primary Constraints",
  "Secondary Constraints",
  "Constructor Constraints",
  "Other Verifiability Issues",
  "Casting a Generic Type Variable",
  "Setting a Generic Type Variable to a Default Value",
  "Comparing a Generic Type Variable with null",
  "Comparing Two Generic Type Variables with Each Other",
  "Using Generic Type Variables as Operands",
] as const;

const panelStyle = {
  border: "1px solid var(--border-subtle, #d9e0e7)",
  borderRadius: 14,
  padding: 16,
  background: "var(--surface-raised, #ffffff)",
  color: "var(--text-primary, #17202a)",
} as const;

const buttonStyle = {
  border: "1px solid var(--border-subtle, #c9d2dc)",
  borderRadius: 8,
  padding: "7px 10px",
  background: "var(--surface-muted, #f4f7fa)",
  color: "var(--text-primary, #17202a)",
  cursor: "pointer",
  fontSize: 12,
} as const;

function LabFrame({
  title,
  question,
  children,
  onReset,
}: {
  title: string;
  question: string;
  children: React.ReactNode;
  onReset: () => void;
}) {
  return (
    <div style={{ ...panelStyle, display: "grid", gap: 12, margin: "12px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
        <div>
          <strong>{title}</strong>
          <div style={{ marginTop: 5, fontSize: 13, lineHeight: 1.5 }}>{question}</div>
        </div>
        <button type="button" style={buttonStyle} onClick={onReset}>
          重置
        </button>
      </div>
      {children}
    </div>
  );
}

export function CvcGenericIdentityLab() {
  const [closed, setClosed] = useState(true);

  return (
    <LabFrame
      title="Generic identity lab"
      question="猜一猜：把 open definition 切换成 closed construction，哪一层会获得自己的 static owner？"
      onReset={() => setClosed(true)}
    >
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" style={buttonStyle} onClick={() => setClosed(false)}>
          open Dictionary&lt;,&gt;
        </button>
        <button type="button" style={buttonStyle} onClick={() => setClosed(true)}>
          closed Dictionary&lt;string,int&gt;
        </button>
      </div>
      <svg
        viewBox="0 0 420 184"
        role="img"
        aria-label="Open generic definition becomes a closed construction with its own runtime identity and static storage."
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <marker id="cvc-generic-identity-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--accent, #2563eb)" />
          </marker>
        </defs>
        <rect x="12" y="42" width="116" height="66" rx="10" fill="var(--surface-muted, #f4f7fa)" stroke="var(--border-subtle, #c9d2dc)" />
        <text x="70" y="66" textAnchor="middle" fontSize="12" fill="var(--text-primary, #17202a)">open definition</text>
        <text x="70" y="86" textAnchor="middle" fontSize="12" fill="var(--text-secondary, #52606d)">Dictionary&lt;,&gt;</text>
        <line x1="134" y1="75" x2="180" y2="75" stroke="var(--accent, #2563eb)" strokeWidth="2" markerEnd="url(#cvc-generic-identity-arrow)" />
        <rect x="188" y="42" width="132" height="66" rx="10" fill={closed ? "var(--accent-soft, #dbeafe)" : "var(--surface-muted, #f4f7fa)"} stroke={closed ? "var(--accent, #2563eb)" : "var(--border-subtle, #c9d2dc)"} />
        <text x="254" y="66" textAnchor="middle" fontSize="12" fill="var(--text-primary, #17202a)">closed construction</text>
        <text x="254" y="86" textAnchor="middle" fontSize="12" fill="var(--text-secondary, #52606d)">Dictionary&lt;string,int&gt;</text>
        <line x1="326" y1="75" x2="370" y2="75" stroke="var(--accent, #2563eb)" strokeWidth="2" markerEnd="url(#cvc-generic-identity-arrow)" />
        <rect x="374" y="42" width="34" height="66" rx="10" fill="var(--surface-muted, #f4f7fa)" stroke="var(--border-subtle, #c9d2dc)" />
        <text x="391" y="66" textAnchor="middle" fontSize="11" fill="var(--text-primary, #17202a)">T</text>
        <text x="391" y="86" textAnchor="middle" fontSize="11" fill="var(--text-secondary, #52606d)">static</text>
        <text x="210" y="140" fontSize="12" fill="var(--text-secondary, #52606d)">
          {closed ? "closed type owns independent static state" : "definition has no concrete type arguments"}
        </text>
      </svg>
    </LabFrame>
  );
}

type VarianceMode = "invariant" | "covariant" | "contravariant";

export function CvcVarianceFlowLab() {
  const [mode, setMode] = useState<VarianceMode>("covariant");
  const allowed = mode !== "invariant";
  const label = mode === "covariant" ? "producer: string → object" : mode === "contravariant" ? "consumer: object → string" : "mutable storage: blocked";

  return (
    <LabFrame
      title="Variance flow lab"
      question="先预测：把 T 放在 producer、consumer 或同时读写的位置，哪一种转换仍然安全？"
      onReset={() => setMode("covariant")}
    >
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {(["covariant", "contravariant", "invariant"] as const).map((item) => (
          <button key={item} type="button" style={{ ...buttonStyle, background: mode === item ? "var(--accent-soft, #dbeafe)" : buttonStyle.background }} onClick={() => setMode(item)}>
            {item}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 420 178"
        role="img"
        aria-label="Variance flow shows a safe producer or consumer conversion and blocks mutable invariant storage."
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <marker id="cvc-variance-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--accent, #2563eb)" />
          </marker>
        </defs>
        <text x="18" y="28" fontSize="12" fill="var(--text-secondary, #52606d)">actual argument</text>
        <text x="314" y="28" fontSize="12" fill="var(--text-secondary, #52606d)">viewed contract</text>
        <rect x="18" y="54" width="112" height="52" rx="10" fill="var(--surface-muted, #f4f7fa)" stroke="var(--border-subtle, #c9d2dc)" />
        <text x="74" y="85" textAnchor="middle" fontSize="12" fill="var(--text-primary, #17202a)">{mode === "contravariant" ? "IComparer&lt;object&gt;" : "IEnumerable&lt;string&gt;"}</text>
        <line x1="142" y1="80" x2="278" y2="80" stroke="var(--accent, #2563eb)" strokeWidth="2" markerEnd="url(#cvc-variance-arrow)" />
        <text x="210" y="68" textAnchor="middle" fontSize="11" fill="var(--text-secondary, #52606d)">{mode === "invariant" ? "unsafe write" : "safe reference conversion"}</text>
        <rect x="290" y="54" width="112" height="52" rx="10" fill={allowed ? "var(--accent-soft, #dbeafe)" : "var(--warning-soft, #fef3c7)"} stroke={allowed ? "var(--accent, #2563eb)" : "var(--warning, #b45309)"} />
        <text x="346" y="85" textAnchor="middle" fontSize="12" fill="var(--text-primary, #17202a)">{mode === "contravariant" ? "IComparer&lt;string&gt;" : mode === "covariant" ? "IEnumerable&lt;object&gt;" : "IList&lt;object&gt;"}</text>
        <circle cx="210" cy="136" r="8" fill={allowed ? "var(--accent, #2563eb)" : "var(--warning, #b45309)"} />
        <text x="226" y="140" fontSize="12" fill="var(--text-primary, #17202a)">{allowed ? "allowed: position proves safety" : "blocked: producer + consumer breaks storage"}</text>
        <text x="18" y="158" fontSize="12" fill="var(--text-secondary, #52606d)">{label}</text>
      </svg>
    </LabFrame>
  );
}

type ConstraintState = "minimal" | "class-new" | "interface";

export function CvcConstraintProofLab() {
  const [state, setState] = useState<ConstraintState>("minimal");
  const rows = state === "minimal"
    ? ["T value/reference unknown", "default(T) only", "cast is unproven"]
    : state === "class-new"
      ? ["T : class, new()", "public construction", "null check is explicit"]
      : ["T : IComparable<T>", "Compare is proven", "ordering contract remains"];

  return (
    <LabFrame
      title="Constraint proof lab"
      question="动手试：从 generic body 的操作反推最小 constraint，再看哪些类型会被拒绝。"
      onReset={() => setState("minimal")}
    >
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {(["minimal", "class-new", "interface"] as const).map((item) => (
          <button key={item} type="button" style={{ ...buttonStyle, background: state === item ? "var(--accent-soft, #dbeafe)" : buttonStyle.background }} onClick={() => setState(item)}>
            {item === "minimal" ? "unconstrained T" : item === "class-new" ? "class + new()" : "IComparable&lt;T&gt;"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 420 182"
        role="img"
        aria-label="Constraint proof maps a generic body operation to the smallest constraint and shows the resulting capability evidence."
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <rect x="18" y="34" width="116" height="92" rx="10" fill="var(--surface-muted, #f4f7fa)" stroke="var(--border-subtle, #c9d2dc)" />
        <text x="76" y="57" textAnchor="middle" fontSize="12" fill="var(--text-primary, #17202a)">generic body</text>
        <text x="76" y="80" textAnchor="middle" fontSize="12" fill="var(--text-secondary, #52606d)">operation</text>
        <text x="76" y="102" textAnchor="middle" fontSize="12" fill="var(--text-secondary, #52606d)">{state === "interface" ? "Compare(T)" : state === "class-new" ? "new T()" : "cast / null"}</text>
        <line x1="148" y1="80" x2="270" y2="80" stroke="var(--accent, #2563eb)" strokeWidth="2" />
        <polygon points="270,80 259,74 259,86" fill="var(--accent, #2563eb)" />
        <rect x="282" y="20" width="120" height="126" rx="10" fill="var(--accent-soft, #dbeafe)" stroke="var(--accent, #2563eb)" />
        <text x="342" y="44" textAnchor="middle" fontSize="12" fill="var(--text-primary, #17202a)">capability proof</text>
        {rows.map((row, index) => (
          <g key={row}>
            <circle cx="304" cy={70 + index * 22} r="5" fill="var(--accent, #2563eb)" />
            <text x="316" y={74 + index * 22} fontSize="11" fill="var(--text-primary, #17202a)">{row}</text>
          </g>
        ))}
        <text x="18" y="164" fontSize="12" fill="var(--text-secondary, #52606d)">最小约束 = 可验证能力，不是运行时猜测</text>
      </svg>
    </LabFrame>
  );
}

export const cvcGenericsConceptLabels = conceptLabels;
