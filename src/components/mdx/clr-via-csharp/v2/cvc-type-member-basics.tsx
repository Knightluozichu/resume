"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--members-accent": "#7c3aed",
  "--members-accent-soft": "#ede9fe",
  "--members-ink": "#172033",
  "--members-muted": "#94a3b8",
  "--members-warning": "#b45309",
  "--members-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "The Different Kinds of Type Members",
  "Type Visibility",
  "Friend Assemblies",
  "Member Accessibility",
  "Static Classes",
  "Partial Classes, Structures, and Interfaces",
  "Components, Polymorphism, and Versioning",
  "How the CLR Calls Virtual Methods, Properties, and Events",
  "Using Type Visibility and Member Accessibility Intelligently",
  "Dealing with Virtual Methods When Versioning Types",
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

type MemberMode = "field" | "property" | "event" | "nested";

export function CvcMemberShapeLab() {
  const [mode, setMode] = useState<MemberMode>("property");
  const details = {
    field: ["FieldDef", "storage", "direct state"],
    property: ["Property row", "get/set MethodDef", "value-like contract"],
    event: ["Event row", "add/remove MethodDef", "subscription protocol"],
    nested: ["nested TypeDef", "name + visibility", "independent identity"],
  }[mode];

  return (
    <LabShell
      label="Member Shape"
      title="把语法成员还原成 metadata 与 consumer 契约"
      description="先预测：切换 field、property、event 和 nested type，哪一种暴露存储，哪一种通过 MethodDef 控制行为？"
      onReset={() => setMode("property")}
    >
      <div className="flex flex-wrap gap-2">
        {(["field", "property", "event", "nested"] as const).map((item) => (
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
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} member shape: ${details.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Member syntax, metadata shape, and consumer contract</title>
        <defs>
          <marker id="cvc-members-shape-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--members-accent)" />
          </marker>
        </defs>
        <rect x="24" y="62" width="150" height="84" rx="12" fill="var(--members-accent-soft)" stroke="var(--members-accent)" strokeWidth="3" />
        <text x="99" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--members-ink)">C# syntax</text>
        <text x="99" y="121" textAnchor="middle" fontSize="12" fill="var(--members-ink)">{mode}</text>
        <line x1="192" y1="104" x2="278" y2="104" stroke="var(--members-accent)" strokeWidth="4" markerEnd="url(#cvc-members-shape-arrow)" />
        <rect x="294" y="38" width="164" height="132" rx="12" fill="var(--members-surface)" stroke="var(--members-muted)" strokeWidth="3" />
        <text x="376" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--members-ink)">{details[0]}</text>
        <text x="376" y="103" textAnchor="middle" fontSize="12" fill="var(--members-ink)">{details[1]}</text>
        <text x="376" y="132" textAnchor="middle" fontSize="12" fill="var(--members-ink)">{mode === "field" ? "no accessor" : mode === "nested" ? "own TypeDef" : "special-name method"}</text>
        <line x1="476" y1="104" x2="562" y2="104" stroke="var(--members-accent)" strokeWidth="4" markerEnd="url(#cvc-members-shape-arrow)" />
        <rect x="578" y="62" width="118" height="84" rx="12" fill="var(--members-accent-soft)" stroke="var(--members-accent)" strokeWidth="3" />
        <text x="637" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--members-ink)">consumer sees</text>
        <text x="637" y="121" textAnchor="middle" fontSize="12" fill="var(--members-ink)">{details[2]}</text>
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--members-accent)">{mode === "field" ? "field：真实存储与可见性直接冻结" : mode === "property" ? "property：点语法背后是可演进的 accessor contract" : mode === "event" ? "event：add/remove 控制订阅，不等于公开 delegate 字段" : "nested type：命名嵌套不代表绑定外部 instance"}</text>
      </svg>
    </LabShell>
  );
}

type AccessMode = "public" | "internal" | "protected" | "friend";

export function CvcAccessibilityBoundaryLab() {
  const [mode, setMode] = useState<AccessMode>("internal");
  const details = {
    public: ["external caller", "all references", "large API surface"],
    internal: ["same assembly", "implementation team", "refactor room"],
    protected: ["derived type", "subclass protocol", "override risk"],
    friend: ["named assembly", "InternalsVisibleTo", "key + coupling"],
  }[mode];
  const risky = mode === "public" || mode === "protected" || mode === "friend";

  return (
    <LabShell
      label="Accessibility Boundary"
      title="用 consumer 证据决定可见性，而不是凭便利扩大 API"
      description="动手试：切换 public、internal、protected 和 friend，观察边界外谁能命名成员，以及哪种授权会增加版本成本。"
      onReset={() => setMode("internal")}
    >
      <div className="flex flex-wrap gap-2">
        {(["public", "internal", "protected", "friend"] as const).map((item) => (
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
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} accessibility boundary: ${details.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Type and member accessibility boundaries</title>
        <rect x="24" y="55" width="184" height="102" rx="12" fill="var(--members-accent-soft)" stroke="var(--members-accent)" strokeWidth="3" />
        <text x="116" y="87" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--members-ink)">consumer zone</text>
        <text x="116" y="116" textAnchor="middle" fontSize="12" fill="var(--members-ink)">{details[0]}</text>
        <text x="116" y="141" textAnchor="middle" fontSize="12" fill="var(--members-ink)">{details[1]}</text>
        <line x1="228" y1="106" x2="286" y2="106" stroke="var(--members-accent)" strokeWidth="4" />
        <polygon points="286,106 274,99 274,113" fill="var(--members-accent)" />
        <rect x="302" y="34" width="156" height="144" rx="12" fill="var(--members-surface)" stroke="var(--members-muted)" strokeWidth="3" />
        <text x="380" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--members-ink)">{mode} boundary</text>
        <line x1="326" y1="90" x2="434" y2="90" stroke="var(--members-muted)" strokeWidth="3" />
        <text x="380" y="119" textAnchor="middle" fontSize="12" fill="var(--members-ink)">{details[2]}</text>
        <text x="380" y="147" textAnchor="middle" fontSize="12" fill={risky ? "var(--members-warning)" : "var(--members-ink)"}>{risky ? "review contract" : "default safe choice"}</text>
        <line x1="478" y1="106" x2="536" y2="106" stroke="var(--members-accent)" strokeWidth="4" />
        <polygon points="536,106 524,99 524,113" fill="var(--members-accent)" />
        <rect x="552" y="55" width="144" height="102" rx="12" fill={risky ? "var(--members-accent-soft)" : "var(--members-surface)"} stroke={risky ? "var(--members-accent)" : "var(--members-muted)"} strokeWidth="3" />
        <text x="624" y="87" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--members-ink)">API promise</text>
        <text x="624" y="116" textAnchor="middle" fontSize="12" fill="var(--members-ink)">{mode === "public" ? "source + binary" : mode === "protected" ? "subclass behavior" : mode === "friend" ? "named identity" : "assembly-local"}</text>
        <text x="360" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill={risky ? "var(--members-warning)" : "var(--members-accent)"}>{mode === "public" ? "public：只有稳定 consumer 证据才值得承担最大兼容面" : mode === "protected" ? "protected：子类协议同样是长期 surface，不是免费扩展点" : mode === "friend" ? "friend：精确 assembly identity 换来测试或协作耦合" : "internal：先保留实现自由，再按真实 consumer 证据扩大"}</text>
      </svg>
    </LabShell>
  );
}

type DispatchMode = "static" | "nonvirtual" | "virtual" | "interface";

export function CvcDispatchVersioningLab() {
  const [mode, setMode] = useState<DispatchMode>("virtual");
  const details = {
    static: ["declaring Type", "direct target", "no receiver dispatch"],
    nonvirtual: ["member reference", "declared implementation", "fixed body"],
    virtual: ["runtime object", "method slot", "override"],
    interface: ["interface map", "implementation", "contract dispatch"],
  }[mode];
  const extensible = mode === "virtual" || mode === "interface";

  return (
    <LabShell
      label="Dispatch and Versioning"
      title="把调用入口、runtime mapping 与版本风险连起来"
      description="先预测：切换 static、nonvirtual、virtual 和 interface，哪一种依赖 receiver 的 runtime mapping，哪一种最容易改变旧派生类行为？"
      onReset={() => setMode("virtual")}
    >
      <div className="flex flex-wrap gap-2">
        {(["static", "nonvirtual", "virtual", "interface"] as const).map((item) => (
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
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} dispatch path: ${details.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>CLR dispatch path and versioning boundary</title>
        <defs>
          <marker id="cvc-members-dispatch-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--members-accent)" />
          </marker>
        </defs>
        <rect x="24" y="62" width="150" height="84" rx="12" fill="var(--members-accent-soft)" stroke="var(--members-accent)" strokeWidth="3" />
        <text x="99" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--members-ink)">call site</text>
        <text x="99" y="121" textAnchor="middle" fontSize="12" fill="var(--members-ink)">{details[0]}</text>
        <line x1="192" y1="104" x2="278" y2="104" stroke="var(--members-accent)" strokeWidth="4" markerEnd="url(#cvc-members-dispatch-arrow)" />
        <rect x="294" y="38" width="164" height="132" rx="12" fill="var(--members-surface)" stroke="var(--members-muted)" strokeWidth="3" />
        <text x="376" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--members-ink)">{details[1]}</text>
        <text x="376" y="103" textAnchor="middle" fontSize="12" fill="var(--members-ink)">{mode === "virtual" ? "receiver runtime type" : mode === "interface" ? "interface map" : "metadata target"}</text>
        <text x="376" y="132" textAnchor="middle" fontSize="12" fill="var(--members-ink)">{details[2]}</text>
        <line x1="476" y1="104" x2="562" y2="104" stroke="var(--members-accent)" strokeWidth="4" markerEnd="url(#cvc-members-dispatch-arrow)" />
        <rect x="578" y="62" width="118" height="84" rx="12" fill={extensible ? "var(--members-accent-soft)" : "var(--members-surface)"} stroke={extensible ? "var(--members-accent)" : "var(--members-muted)"} strokeWidth="3" />
        <text x="637" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--members-ink)">version</text>
        <text x="637" y="121" textAnchor="middle" fontSize="12" fill="var(--members-ink)">{extensible ? "hook / contract" : "fixed body"}</text>
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill={extensible ? "var(--members-warning)" : "var(--members-accent)"}>{mode === "virtual" ? "virtual：新增调用点可能触达旧 derived，必须做 adversarial fixture" : mode === "interface" ? "interface：contract map 清晰，但新增 abstract member 会破坏 implementer" : mode === "static" ? "static：不依赖 instance，但共享状态仍有 lifetime 与并发风险" : "nonvirtual：目标固定，不等于整个 API 没有版本成本"}</text>
      </svg>
    </LabShell>
  );
}

export const cvcTypeMemberBasicsConceptLabels = conceptLabels;
