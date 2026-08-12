"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--interface-accent": "#2563eb",
  "--interface-accent-soft": "#dbeafe",
  "--interface-ink": "#172033",
  "--interface-muted": "#94a3b8",
  "--interface-warning": "#b45309",
} as CSSProperties;

const conceptLabels = [
  "Class and Interface Inheritance",
  "Defining an Interface",
  "Inheriting an Interface",
  "More About Calling Interface Methods",
  "Implicit and Explicit Interface Method Implementations (What's Happening Behind the Scenes)",
  "Generic Interfaces",
  "Generics and Interface Constraints",
  "Implementing Multiple Interfaces That Have the Same Method Name and Signature",
  "Improving Compile-Time Type Safety with Explicit Interface Method Implementations",
  "Be Careful with Explicit Interface Method Implementations",
  "Design: Base Class or Interface?",
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

export function CvcInterfaceMapLab() {
  const [explicit, setExplicit] = useState(false);
  const target = explicit ? "ITextSerializer.Serialize" : "Record.Serialize";

  return (
    <LabShell
      label="Interface Map"
      title="把 static view 追到真正 target"
      description="猜一猜：切换 implicit / explicit 后，class view 与 interface view 会落到同一个 method 吗？"
      onReset={() => setExplicit(false)}
    >
      <div className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={!explicit} onClick={() => setExplicit(false)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${!explicit ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>implicit</button>
        <button type="button" aria-pressed={explicit} onClick={() => setExplicit(true)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${explicit ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>explicit</button>
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={explicit ? "Interface reference dispatches to explicit serializer method" : "Class and interface references dispatch to public serializer method"} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Interface map dispatch</title>
        <defs>
          <marker id="cvc-interface-map-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--interface-accent)" />
          </marker>
        </defs>
        <rect x="18" y="64" width="142" height="72" rx="12" fill="var(--interface-accent-soft)" stroke="var(--interface-accent)" strokeWidth="3" />
        <text x="89" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--interface-ink)">Record instance</text>
        <text x="89" y="116" textAnchor="middle" fontSize="12" fill="var(--interface-ink)">runtime type</text>
        <line x1="176" y1="100" x2="272" y2="100" stroke="var(--interface-accent)" strokeWidth="4" markerEnd="url(#cvc-interface-map-arrow)" />
        <rect x="286" y="42" width="148" height="116" rx="12" fill="white" stroke="var(--interface-muted)" strokeWidth="3" />
        <text x="360" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--interface-ink)">interface map</text>
        <text x="360" y="98" textAnchor="middle" fontSize="12" fill="var(--interface-ink)">class view</text>
        <text x="360" y="122" textAnchor="middle" fontSize="12" fill="var(--interface-ink)">{explicit ? "ITextSerializer" : "public member"}</text>
        <line x1="450" y1="100" x2="548" y2="100" stroke="var(--interface-accent)" strokeWidth="4" markerEnd="url(#cvc-interface-map-arrow)" />
        <rect x="562" y="64" width="140" height="72" rx="12" fill={explicit ? "#fef3c7" : "var(--interface-accent-soft)"} stroke={explicit ? "var(--interface-warning)" : "var(--interface-accent)"} strokeWidth="3" />
        <text x="632" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--interface-ink)">target method</text>
        <text x="632" y="116" textAnchor="middle" fontSize="12" fill="var(--interface-ink)">{target}</text>
        <text x="360" y="205" textAnchor="middle" fontSize="12" fontWeight="700" fill={explicit ? "var(--interface-warning)" : "var(--interface-accent)"}>{explicit ? "只有 interface view 能到 explicit surface" : "public member 可同时满足 class 与 interface view"}</text>
      </svg>
    </LabShell>
  );
}

export function CvcBoxingDispatchLab() {
  const [constrained, setConstrained] = useState(true);
  const boxed = !constrained;

  return (
    <LabShell
      label="Constrained Dispatch"
      title="区分 interface variable 与 constrained call"
      description="先预测：同一个 struct 实现 interface，先转成 interface variable 会不会产生 boxing？"
      onReset={() => setConstrained(true)}
    >
      <div className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={constrained} onClick={() => setConstrained(true)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${constrained ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>where T : IContract</button>
        <button type="button" aria-pressed={boxed} onClick={() => setConstrained(false)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${boxed ? "border-warning bg-bg text-primary" : "border-border text-secondary"}`}>interface variable</button>
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={boxed ? "Struct is boxed before interface dispatch" : "Generic constrained call dispatches directly without boxing"} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Struct interface dispatch and boxing</title>
        <defs>
          <marker id="cvc-boxing-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={boxed ? "var(--interface-warning)" : "var(--interface-accent)"} />
          </marker>
        </defs>
        <rect x="24" y="72" width="132" height="72" rx="12" fill="var(--interface-accent-soft)" stroke="var(--interface-accent)" strokeWidth="3" />
        <text x="90" y="101" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--interface-ink)">OrderId struct</text>
        <text x="90" y="125" textAnchor="middle" fontSize="12" fill="var(--interface-ink)">value storage</text>
        <line x1="172" y1="108" x2="268" y2="108" stroke={boxed ? "var(--interface-warning)" : "var(--interface-accent)"} strokeWidth="4" markerEnd="url(#cvc-boxing-arrow)" />
        <rect x="282" y="50" width="154" height="116" rx="12" fill={boxed ? "#fef3c7" : "white"} stroke={boxed ? "var(--interface-warning)" : "var(--interface-muted)"} strokeWidth="3" />
        <text x="359" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--interface-ink)">{boxed ? "boxing boundary" : "constrained prefix"}</text>
        <text x="359" y="108" textAnchor="middle" fontSize="12" fill="var(--interface-ink)">{boxed ? "heap object" : "T.Equals(T)"}</text>
        <text x="359" y="134" textAnchor="middle" fontSize="12" fill="var(--interface-ink)">{boxed ? "allocation" : "direct call"}</text>
        <line x1="452" y1="108" x2="548" y2="108" stroke={boxed ? "var(--interface-warning)" : "var(--interface-accent)"} strokeWidth="4" markerEnd="url(#cvc-boxing-arrow)" />
        <rect x="562" y="72" width="132" height="72" rx="12" fill={boxed ? "#fef3c7" : "var(--interface-accent-soft)"} stroke={boxed ? "var(--interface-warning)" : "var(--interface-accent)"} strokeWidth="3" />
        <text x="628" y="101" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--interface-ink)">IContract call</text>
        <text x="628" y="125" textAnchor="middle" fontSize="12" fill="var(--interface-ink)">{boxed ? "boxed receiver" : "value receiver"}</text>
        <text x="360" y="210" textAnchor="middle" fontSize="12" fontWeight="700" fill={boxed ? "var(--interface-warning)" : "var(--interface-accent)"}>{boxed ? "interface variable：先装箱，再分派" : "generic constraint：可验证且可避免装箱"}</text>
      </svg>
    </LabShell>
  );
}

type DesignMode = "base" | "interface" | "composition";

export function CvcContractChoiceLab() {
  const [mode, setMode] = useState<DesignMode>("interface");
  const details = mode === "base"
    ? ["shared state", "lifecycle owner", "single inheritance"]
    : mode === "composition"
      ? ["collaborator field", "adapter boundary", "no subtype claim"]
      : ["small capability", "many implementers", "multiple contracts"];

  return (
    <LabShell
      label="Contract Choice"
      title="把变化 owner 对齐到设计关系"
      description="动手试：切换 base class、interface、composition，观察 state、lifecycle 与 implementer ownership 的差异。"
      onReset={() => setMode("interface")}
    >
      <div className="flex flex-wrap gap-2">
        {(["base", "interface", "composition"] as const).map((item) => (
          <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{item}</button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`Design choice ${mode} shows the relationship between owner and capability`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Base class, interface, and composition choice</title>
        <rect x="26" y="64" width="150" height="82" rx="12" fill="var(--interface-accent-soft)" stroke="var(--interface-accent)" strokeWidth="3" />
        <text x="101" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--interface-ink)">change owner</text>
        <text x="101" y="122" textAnchor="middle" fontSize="12" fill="var(--interface-ink)">{mode === "base" ? "framework" : mode === "interface" ? "capability" : "collaborator"}</text>
        <line x1="198" y1="105" x2="290" y2="105" stroke="var(--interface-accent)" strokeWidth="4" />
        <polygon points="290,105 278,98 278,112" fill="var(--interface-accent)" />
        <rect x="304" y="30" width="164" height="150" rx="12" fill="white" stroke="var(--interface-muted)" strokeWidth="3" />
        <text x="386" y="60" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--interface-ink)">{mode === "base" ? "base class" : mode === "interface" ? "interface" : "composition"}</text>
        {details.map((detail, index) => (
          <g key={detail}>
            <circle cx="330" cy={91 + index * 26} r="5" fill="var(--interface-accent)" />
            <text x="344" y={95 + index * 26} fontSize="12" fill="var(--interface-ink)">{detail}</text>
          </g>
        ))}
        <line x1="490" y1="105" x2="582" y2="105" stroke="var(--interface-accent)" strokeWidth="4" />
        <polygon points="582,105 570,98 570,112" fill="var(--interface-accent)" />
        <rect x="596" y="64" width="102" height="82" rx="12" fill="var(--interface-accent-soft)" stroke="var(--interface-accent)" strokeWidth="3" />
        <text x="647" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--interface-ink)">consumer</text>
        <text x="647" y="122" textAnchor="middle" fontSize="12" fill="var(--interface-ink)">{mode === "base" ? "subtype" : mode === "interface" ? "capability" : "service"}</text>
        <text x="360" y="216" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--interface-accent)">{mode === "base" ? "共享不可分割 state/lifecycle 时选 base" : mode === "interface" ? "稳定能力、多实现时选 interface" : "只复用协作者行为时选 composition"}</text>
      </svg>
    </LabShell>
  );
}

export const cvcInterfacesConceptLabels = conceptLabels;
