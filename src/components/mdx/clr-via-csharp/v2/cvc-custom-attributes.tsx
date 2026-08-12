"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--attribute-accent": "#0f766e",
  "--attribute-accent-soft": "#ccfbf1",
  "--attribute-ink": "#172033",
  "--attribute-muted": "#94a3b8",
  "--attribute-warning": "#b45309",
  "--attribute-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "Using Custom Attributes",
  "Defining Your Own Attribute Class",
  "Attribute Constructor and Field/Property Data Types",
  "Detecting the Use of a Custom Attribute",
  "Matching Two Attribute Instances Against Each Other",
  "Detecting the Use of a Custom Attribute Without Creating Attribute-Derived Objects",
  "Conditional Attribute Classes",
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

type DeclarationMode = "contract" | "payload" | "consumer";

export function CvcAttributeDeclarationLab() {
  const [mode, setMode] = useState<DeclarationMode>("contract");
  const details = {
    contract: ["AttributeUsage", "target + inherit + multiple", "声明边界"],
    payload: ["constructor + named data", "primitive / enum / Type / array", "metadata blob"],
    consumer: ["owner reads metadata", "validate before activation", "runtime policy"],
  }[mode];

  return (
    <LabShell
      label="Attribute Contract"
      title="把声明、payload 与 policy owner 接成一条可审计链"
      description="先预测：同一个 attribute 从 source 到 metadata 再到 consumer，哪一层负责限制 target、payload 和实际行为？"
      onReset={() => setMode("contract")}
    >
      <div className="flex flex-wrap gap-2">
        {(["contract", "payload", "consumer"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "contract" ? "usage contract" : item === "payload" ? "payload" : "consumer"}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} attribute flow: ${details.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Attribute declaration, metadata and policy ownership</title>
        <rect x="24" y="62" width="170" height="84" rx="12" fill="var(--attribute-accent-soft)" stroke="var(--attribute-accent)" strokeWidth="3" />
        <text x="109" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--attribute-ink)">source</text>
        <text x="109" y="121" textAnchor="middle" fontSize="12" fill="var(--attribute-ink)">[Policy(...)]</text>
        <line x1="216" y1="104" x2="278" y2="104" stroke="var(--attribute-accent)" strokeWidth="4" />
        <polygon points="278,104 266,97 266,111" fill="var(--attribute-accent)" />
        <rect x="294" y="38" width="166" height="132" rx="12" fill="var(--attribute-surface)" stroke="var(--attribute-muted)" strokeWidth="3" />
        <text x="377" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--attribute-ink)">{details[0]}</text>
        <text x="377" y="104" textAnchor="middle" fontSize="12" fill="var(--attribute-ink)">{details[1]}</text>
        <text x="377" y="134" textAnchor="middle" fontSize="12" fill="var(--attribute-ink)">metadata</text>
        <line x1="484" y1="104" x2="538" y2="104" stroke="var(--attribute-accent)" strokeWidth="4" />
        <polygon points="538,104 526,97 526,111" fill="var(--attribute-accent)" />
        <rect x="554" y="62" width="142" height="84" rx="12" fill={mode === "consumer" ? "var(--attribute-surface)" : "var(--attribute-accent-soft)"} stroke={mode === "consumer" ? "var(--attribute-muted)" : "var(--attribute-accent)"} strokeWidth="3" />
        <text x="625" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--attribute-ink)">owner</text>
        <text x="625" y="121" textAnchor="middle" fontSize="12" fill="var(--attribute-ink)">{details[2]}</text>
        <text x="360" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill={mode === "consumer" ? "var(--attribute-warning)" : "var(--attribute-accent)"}>{mode === "contract" ? "AttributeUsage 限制可放在哪里，不替 consumer 做授权" : mode === "payload" ? "metadata 只能编码有限常量类型，复杂配置要走 typed source" : "真正的资格来自 owner 的验证、失败模式与激活证据"}</text>
      </svg>
    </LabShell>
  );
}

type InspectionMode = "instantiate" | "presence" | "metadata" | "raw";

export function CvcAttributeInspectionLab() {
  const [mode, setMode] = useState<InspectionMode>("instantiate");
  const details = {
    instantiate: ["GetCustomAttributes", "constructor runs", "trusted activation"],
    presence: ["IsDefined", "presence only", "cheap gate"],
    metadata: ["CustomAttributeData", "values without instance", "inspect"],
    raw: ["PE metadata", "decode blob", "untrusted audit"],
  }[mode];
  const warning = mode === "instantiate";

  return (
    <LabShell
      label="Inspection Boundary"
      title="按风险选择 presence、实例、CustomAttributeData 或 raw metadata"
      description="动手试：切换四个读取级别，观察执行边界如何变化；读取越接近 activation，越需要 allowlist、隔离和失败控制。"
      onReset={() => setMode("instantiate")}
    >
      <div className="flex flex-wrap gap-2">
        {(["instantiate", "presence", "metadata", "raw"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "instantiate" ? "实例化" : item === "presence" ? "presence" : item === "metadata" ? "CustomAttributeData" : "raw metadata"}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} inspection: ${details.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Custom attribute inspection execution boundary</title>
        <rect x="24" y="62" width="170" height="84" rx="12" fill="var(--attribute-accent-soft)" stroke="var(--attribute-accent)" strokeWidth="3" />
        <text x="109" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--attribute-ink)">assembly</text>
        <text x="109" y="121" textAnchor="middle" fontSize="12" fill="var(--attribute-ink)">attribute blob</text>
        <line x1="216" y1="104" x2="278" y2="104" stroke="var(--attribute-accent)" strokeWidth="4" />
        <polygon points="278,104 266,97 266,111" fill="var(--attribute-accent)" />
        <rect x="294" y="38" width="166" height="132" rx="12" fill="var(--attribute-surface)" stroke="var(--attribute-muted)" strokeWidth="3" />
        <text x="377" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--attribute-ink)">{details[0]}</text>
        <text x="377" y="104" textAnchor="middle" fontSize="12" fill={warning ? "var(--attribute-warning)" : "var(--attribute-ink)"}>{details[1]}</text>
        <text x="377" y="134" textAnchor="middle" fontSize="12" fill="var(--attribute-ink)">load / decode boundary</text>
        <line x1="484" y1="104" x2="538" y2="104" stroke="var(--attribute-accent)" strokeWidth="4" />
        <polygon points="538,104 526,97 526,111" fill="var(--attribute-accent)" />
        <rect x="554" y="62" width="142" height="84" rx="12" fill={warning ? "var(--attribute-surface)" : "var(--attribute-accent-soft)"} stroke={warning ? "var(--attribute-muted)" : "var(--attribute-accent)"} strokeWidth="3" />
        <text x="625" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--attribute-ink)">next action</text>
        <text x="625" y="121" textAnchor="middle" fontSize="12" fill="var(--attribute-ink)">{details[2]}</text>
        <text x="360" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill={warning ? "var(--attribute-warning)" : "var(--attribute-accent)"}>{mode === "instantiate" ? "实例化会运行 constructor；不可信插件不要从这里开始" : mode === "presence" ? "IsDefined 只问是否存在，仍要核对 inherit 与 target traversal" : mode === "metadata" ? "CustomAttributeData 读值而不构造派生对象，但仍需限制解析与类型加载" : "raw metadata 适合批量静态审计，decode 后才允许受控 activation"}</text>
      </svg>
    </LabShell>
  );
}

type PolicyMode = "equality" | "conditional" | "enforce";

export function CvcAttributePolicyLab() {
  const [mode, setMode] = useState<PolicyMode>("equality");
  const details = {
    equality: ["stable identity key", "duplicate / priority", "deterministic merge"],
    conditional: ["compiler symbol", "usage may be omitted", "build inventory"],
    enforce: ["validated metadata", "failure mode", "runtime privilege"],
  }[mode];
  const warning = mode !== "enforce";

  return (
    <LabShell
      label="Policy and Release Boundary"
      title="把 equality、Conditional emission 与 enforcement 分成三份证据"
      description="先预测：attribute 被声明不等于 policy 已生效；切换后检查 identity、build configuration、trimming/AOT 与失败模式各自的证据。"
      onReset={() => setMode("equality")}
    >
      <div className="flex flex-wrap gap-2">
        {(["equality", "conditional", "enforce"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "equality" ? "equality / multiple" : item === "conditional" ? "conditional build" : "enforcement"}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} policy: ${details.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Attribute identity, conditional emission and enforcement</title>
        <rect x="24" y="62" width="170" height="84" rx="12" fill="var(--attribute-accent-soft)" stroke="var(--attribute-accent)" strokeWidth="3" />
        <text x="109" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--attribute-ink)">metadata set</text>
        <text x="109" y="121" textAnchor="middle" fontSize="12" fill="var(--attribute-ink)">possibly repeated</text>
        <line x1="216" y1="104" x2="278" y2="104" stroke="var(--attribute-accent)" strokeWidth="4" />
        <polygon points="278,104 266,97 266,111" fill="var(--attribute-accent)" />
        <rect x="294" y="38" width="166" height="132" rx="12" fill="var(--attribute-surface)" stroke="var(--attribute-muted)" strokeWidth="3" />
        <text x="377" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--attribute-ink)">{details[0]}</text>
        <text x="377" y="104" textAnchor="middle" fontSize="12" fill="var(--attribute-ink)">{details[1]}</text>
        <text x="377" y="134" textAnchor="middle" fontSize="12" fill={warning ? "var(--attribute-warning)" : "var(--attribute-ink)"}>release evidence</text>
        <line x1="484" y1="104" x2="538" y2="104" stroke="var(--attribute-accent)" strokeWidth="4" />
        <polygon points="538,104 526,97 526,111" fill="var(--attribute-accent)" />
        <rect x="554" y="62" width="142" height="84" rx="12" fill={warning ? "var(--attribute-surface)" : "var(--attribute-accent-soft)"} stroke={warning ? "var(--attribute-muted)" : "var(--attribute-accent)"} strokeWidth="3" />
        <text x="625" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--attribute-ink)">decision</text>
        <text x="625" y="121" textAnchor="middle" fontSize="12" fill="var(--attribute-ink)">{details[2]}</text>
        <text x="360" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill={warning ? "var(--attribute-warning)" : "var(--attribute-accent)"}>{mode === "equality" ? "AllowMultiple 只允许重复，不规定优先级；consumer 要定义 stable key 与合并规则" : mode === "conditional" ? "Conditional 由编译配置决定是否 emit，Debug/Release/trimmed 必须比较 inventory" : "enforcement 才把 metadata 变成权限；trimming/AOT 需保留或生成 registry 证据"}</text>
      </svg>
    </LabShell>
  );
}

export const cvcCustomAttributesConceptLabels = conceptLabels;
