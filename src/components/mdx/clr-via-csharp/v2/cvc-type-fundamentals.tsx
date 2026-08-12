"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--types-accent": "#0f766e",
  "--types-accent-soft": "#ccfbf1",
  "--types-ink": "#172033",
  "--types-muted": "#94a3b8",
  "--types-warning": "#b45309",
  "--types-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "All Types Are Derived from System.Object",
  "Casting Between Types",
  "Casting with the C# is and as Operators",
  "Namespaces and Assemblies",
  "How Things Relate at Run Time",
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

type StorageMode = "reference" | "value" | "boxed";

export function CvcTypeStorageLab() {
  const [mode, setMode] = useState<StorageMode>("boxed");
  const isBoxed = mode === "boxed";
  const isValue = mode === "value";
  const labels = isBoxed
    ? ["object x", "box + object header", "Int32 value 42"]
    : isValue
      ? ["int x", "value storage", "Int32 value 42"]
      : ["Order x", "reference storage", "heap instance"];

  return (
    <LabShell
      label="Type Storage"
      title="把静态类型、存储形态和 Object 协议分开"
      description="先预测：切换 reference、value 和 boxed，哪一步复制值、哪一步产生对象头，后续修改谁还能观察？"
      onReset={() => setMode("boxed")}
    >
      <div className="flex flex-wrap gap-2">
        {(["reference", "value", "boxed"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "reference" ? "reference" : item === "value" ? "value" : "boxing"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} storage path from a variable to an Object-compatible runtime value`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Reference, value, and boxed storage paths</title>
        <defs>
          <marker id="cvc-types-storage-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--types-accent)" />
          </marker>
        </defs>
        <rect x="24" y="62" width="150" height="84" rx="12" fill="var(--types-accent-soft)" stroke="var(--types-accent)" strokeWidth="3" />
        <text x="99" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--types-ink)">static view</text>
        <text x="99" y="121" textAnchor="middle" fontSize="12" fill="var(--types-ink)">{labels[0]}</text>
        <line x1="192" y1="104" x2="278" y2="104" stroke="var(--types-accent)" strokeWidth="4" markerEnd="url(#cvc-types-storage-arrow)" />
        <rect x="294" y="38" width="164" height="132" rx="12" fill="var(--types-surface)" stroke="var(--types-muted)" strokeWidth="3" />
        <text x="376" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--types-ink)">{labels[1]}</text>
        <text x="376" y="103" textAnchor="middle" fontSize="12" fill="var(--types-ink)">{isBoxed ? "copy 42 into box" : isValue ? "copy / inline value" : "reference to heap"}</text>
        <text x="376" y="132" textAnchor="middle" fontSize="12" fill="var(--types-ink)">{isBoxed ? "GetType + Object methods" : isValue ? "no Object reference yet" : "same instance identity"}</text>
        <line x1="476" y1="104" x2="562" y2="104" stroke="var(--types-accent)" strokeWidth="4" markerEnd="url(#cvc-types-storage-arrow)" />
        <rect x="578" y="62" width="118" height="84" rx="12" fill={isBoxed ? "var(--types-accent-soft)" : "var(--types-surface)"} stroke={isBoxed ? "var(--types-accent)" : "var(--types-muted)"} strokeWidth="3" />
        <text x="637" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--types-ink)">runtime</text>
        <text x="637" y="121" textAnchor="middle" fontSize="12" fill="var(--types-ink)">{labels[2]}</text>
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill={isBoxed ? "var(--types-accent)" : "var(--types-muted)"}>{isBoxed ? "boxing 复制值并建立可被 Object 观察的实例" : isValue ? "值类型仍是值；只有需要引用协议时才装箱" : "引用变量改变观察角度，不复制 heap instance"}</text>
      </svg>
    </LabShell>
  );
}

type CastMode = "implicit" | "explicit" | "is" | "as";

export function CvcConversionContractLab() {
  const [mode, setMode] = useState<CastMode>("is");
  const details = {
    implicit: ["derived → base", "compile-time proof", "no failure branch"],
    explicit: ["base → derived", "runtime check", "InvalidCastException"],
    is: ["value is Target t", "test + binding", "false branch"],
    as: ["value as Target", "nullable reference", "null branch"],
  }[mode];
  const failure = mode === "explicit" || mode === "as";

  return (
    <LabShell
      label="Conversion Contract"
      title="让 cast 的检查时机和失败方式可见"
      description="动手试：切换四种转换入口，比较编译期保证、运行时检查、异常、false 与 null 各自属于哪条契约。"
      onReset={() => setMode("is")}
    >
      <div className="flex flex-wrap gap-2">
        {(["implicit", "explicit", "is", "as"] as const).map((item) => (
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
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} conversion: ${details[0]}, ${details[1]}, failure result ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Conversion timing and failure contract</title>
        <line x1="72" y1="112" x2="648" y2="112" stroke="var(--types-muted)" strokeWidth="4" />
        {["source static type", "check point", "caller branch"].map((label, index) => {
          const x = 110 + index * 250;
          const active = index === 1 || (index === 2 && failure);
          return (
            <g key={label}>
              <circle cx={x} cy="112" r={active ? 28 : 23} fill={active ? "var(--types-accent-soft)" : "var(--types-surface)"} stroke={active ? "var(--types-accent)" : "var(--types-muted)"} strokeWidth="4" />
              <text x={x} y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--types-ink)">{index + 1}</text>
              <text x={x} y="61" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--types-ink)">{label}</text>
              <text x={x} y="169" textAnchor="middle" fontSize="12" fill="var(--types-ink)">{index === 0 ? details[0] : index === 1 ? details[1] : details[2]}</text>
            </g>
          );
        })}
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill={failure ? "var(--types-warning)" : "var(--types-accent)"}>{mode === "implicit" ? "implicit conversion：安全性由静态继承关系证明" : mode === "explicit" ? "explicit cast：必须准备异常路径并确认 runtime type" : mode === "is" ? "is pattern：一次完成检查与局部绑定" : "as：预期不匹配时返回 null，不要吞掉必需契约错误"}</text>
      </svg>
    </LabShell>
  );
}

type IdentityMode = "namespace" | "assembly" | "context";

export function CvcRuntimeIdentityLab() {
  const [mode, setMode] = useState<IdentityMode>("context");
  const layers = mode === "namespace"
    ? ["namespace name", "source grouping", "same logical label"]
    : mode === "assembly"
      ? ["assembly identity", "version + contract", "deployment boundary"]
      : ["load context A", "contract assembly", "load context B"];
  const conflict = mode === "context";

  return (
    <LabShell
      label="Runtime Type Identity"
      title="追踪 FullName 之外的类型身份边界"
      description="先预测：只打印 FullName 能否证明两个插件对象可 cast？切换 namespace、assembly 和 load context，观察身份链缺哪一层。"
      onReset={() => setMode("context")}
    >
      <div className="flex flex-wrap gap-2">
        {(["namespace", "assembly", "context"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "namespace" ? "namespace" : item === "assembly" ? "assembly" : "load context"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} runtime type identity chain: ${layers.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Namespace, assembly, and load context identity chain</title>
        <defs>
          <marker id="cvc-types-identity-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--types-accent)" />
          </marker>
        </defs>
        {layers.map((layer, index) => {
          const x = 26 + index * 240;
          const active = index === 1 || (conflict && index === 2);
          return (
            <g key={layer}>
              <rect x={x} y="64" width="172" height="84" rx="12" fill={active ? "var(--types-accent-soft)" : "var(--types-surface)"} stroke={active ? "var(--types-accent)" : "var(--types-muted)"} strokeWidth="3" />
              <text x={x + 86} y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--types-ink)">{layer}</text>
              <text x={x + 86} y="122" textAnchor="middle" fontSize="12" fill="var(--types-ink)">{index === 0 ? "logical" : index === 1 ? "loader-visible" : conflict ? "identity split" : "runtime owner"}</text>
              {index < layers.length - 1 ? <line x1={x + 184} y1="106" x2={x + 226} y2="106" stroke="var(--types-accent)" strokeWidth="4" markerEnd="url(#cvc-types-identity-arrow)" /> : null}
            </g>
          );
        })}
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill={conflict ? "var(--types-warning)" : "var(--types-accent)"}>{conflict ? "同名 contract 的副本仍是不同 Type；共享 contract assembly 才能恢复 cast" : mode === "assembly" ? "assembly identity 参与版本与契约边界，FullName 不是全部证明" : "namespace 只组织名字，不负责部署、版本或 runtime identity"}</text>
      </svg>
    </LabShell>
  );
}

export const cvcTypeFundamentalsConceptLabels = conceptLabels;
