"use client";

import { useState, type CSSProperties } from "react";

const shellStyle = {
  "--clr-accent": "#7c3aed",
  "--clr-accent-soft": "#ede9fe",
  "--clr-ink": "#172033",
  "--clr-muted": "#94a3b8",
  "--clr-warning": "#b45309",
} as CSSProperties;

const conceptLabels = [
  "Compiling Source Code into Managed Modules",
  "Combining Managed Modules into Assemblies",
  "Loading the Common Language Runtime",
  "Executing Your Assembly's Code",
  "IL and Verification",
  "Unsafe Code",
  "The Native Code Generator Tool: NGen.exe",
  "The Framework Class Library",
  "The Common Type System",
  "The Common Language Specification",
  "Interoperability with Unmanaged Code",
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

export function CvcClrExecutionPipelineLab() {
  const [active, setActive] = useState(0);
  const stages = [
    { label: "source", detail: "compiler input" },
    { label: "module", detail: "IL + metadata" },
    { label: "assembly", detail: "identity" },
    { label: "loader", detail: "runtime resolve" },
    { label: "JIT", detail: "native code" },
  ];

  return (
    <section aria-label="CLR execution pipeline" style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Execution Pipeline</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">把失败放回它真正发生的阶段</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">选择 source、module、assembly、loader 或 JIT，观察每一层交付的证据。</p>
        </div>
        <ResetButton onClick={() => setActive(0)} label="重置阶段" />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-2">
          {stages.map((stage, index) => (
            <button key={stage.label} type="button" aria-pressed={active === index} onClick={() => setActive(index)} className={`min-h-11 rounded-control border px-3 py-3 text-left transition-colors ${active === index ? "border-accent bg-bg text-primary" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>
              <span className="mr-2 text-xs font-semibold text-accent">{index + 1}</span>
              <span className="text-sm font-semibold">{stage.label}</span>
              <span className="mt-1 block text-xs text-secondary">{stage.detail}</span>
            </button>
          ))}
        </div>

        <div className="rounded-control border border-border bg-bg p-3">
          <svg viewBox="0 0 720 250" role="img" aria-label="从源代码到JIT本机码的执行管线" className="h-auto w-full">
            <title>CLR execution pipeline</title>
            <line x1="78" y1="108" x2="642" y2="108" stroke="var(--clr-muted)" strokeWidth="4" />
            {stages.map((stage, index) => {
              const x = 78 + index * 141;
              const selected = index === active;
              return (
                <g key={stage.label}>
                  <circle cx={x} cy="108" r={selected ? 27 : 21} fill={selected ? "var(--clr-accent)" : "white"} stroke={selected ? "var(--clr-accent)" : "var(--clr-muted)"} strokeWidth="4" />
                  <text x={x} y="113" textAnchor="middle" fontSize="12" fontWeight="700" fill={selected ? "white" : "var(--clr-ink)"}>{index + 1}</text>
                  <text x={x} y="54" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--clr-ink)">{stage.label}</text>
                  <text x={x} y="174" textAnchor="middle" fontSize="11" fill="var(--clr-ink)">{stage.detail}</text>
                </g>
              );
            })}
            <text x="360" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--clr-accent)">当前焦点：{stages[active].label} · 失败证据必须在此层先出现</text>
          </svg>
          <p className="mt-2 text-sm leading-relaxed text-secondary">同一 IL 在不同 runtime、架构、泛型实例和 profile 下可能得到不同 native code；成功加载不等于方法已执行。</p>
        </div>
      </div>
    </section>
  );
}

export function CvcClrVerificationBoundaryLab() {
  const [invalid, setInvalid] = useState(false);
  const stack = invalid ? ["int32", "object"] : ["int32", "int32"];

  return (
    <section aria-label="IL verification boundary" style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Verification Boundary</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">只改变一个栈类型，定位验证分岔</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">参考路径让 add 消费两个 int32；故障路径把第二个值改成 object，观察结构与执行的边界。</p>
        </div>
        <ResetButton onClick={() => setInvalid(false)} label="重置栈" />
      </header>

      <div className="p-4">
        <svg viewBox="0 0 720 260" role="img" aria-label={invalid ? "IL求值栈类型不匹配" : "IL求值栈类型匹配"} className="h-auto w-full rounded-control border border-border bg-bg">
          <title>{invalid ? "Invalid verification path" : "Verifiable IL path"}</title>
          <text x="80" y="45" fontSize="12" fontWeight="700" fill="var(--clr-ink)">ldarg.0</text>
          <text x="260" y="45" fontSize="12" fontWeight="700" fill="var(--clr-ink)">ldarg.1</text>
          <text x="440" y="45" fontSize="12" fontWeight="700" fill="var(--clr-ink)">add</text>
          <text x="615" y="45" fontSize="12" fontWeight="700" fill="var(--clr-ink)">ret</text>
          <line x1="90" y1="76" x2="625" y2="76" stroke="var(--clr-muted)" strokeWidth="3" />
          {[80, 260].map((x, index) => (
            <g key={x}>
              <rect x={x - 48} y="102" width="96" height="55" rx="10" fill={invalid && index === 1 ? "#fef3c7" : "var(--clr-accent-soft)"} stroke={invalid && index === 1 ? "var(--clr-warning)" : "var(--clr-accent)"} strokeWidth="3" />
              <text x={x} y="135" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--clr-ink)">{stack[index]}</text>
            </g>
          ))}
          <rect x="395" y="102" width="100" height="55" rx="10" fill={invalid ? "#fef3c7" : "var(--clr-accent-soft)"} stroke={invalid ? "var(--clr-warning)" : "var(--clr-accent)"} strokeWidth="3" />
          <text x="445" y="135" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--clr-ink)">{invalid ? "拒绝" : "int32"}</text>
          <text x="360" y="205" textAnchor="middle" fontSize="12" fontWeight="700" fill={invalid ? "var(--clr-warning)" : "var(--clr-accent)"}>{invalid ? "verification boundary：stack 类型不一致" : "verification boundary：栈形状与返回类型一致"}</text>
        </svg>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-relaxed text-secondary">当前路径：{invalid ? "不可验证 IL，失败应归入验证/程序结构边界" : "可验证 IL，可继续观察运行时行为"}。</p>
          <button type="button" aria-pressed={invalid} onClick={() => setInvalid((value) => !value)} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-warning hover:text-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{invalid ? "恢复可验证栈" : "注入类型错位"}</button>
        </div>
      </div>
    </section>
  );
}

export function CvcClrInteropContractLab() {
  const [native, setNative] = useState(false);
  const checks = native ? ["ABI", "layout", "encoding", "ownership"] : ["metadata", "CLS", "exception", "lifetime"];

  return (
    <section aria-label="CLR managed and unmanaged interop contract" style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Interop Contract</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">切换托管与非托管边界，逐项检查契约</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">公共 CLR API 先看类型与 CLS；跨 native 边界再补 ABI、布局、编码和所有权。</p>
        </div>
        <ResetButton onClick={() => setNative(false)} label="重置边界" />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={!native} onClick={() => setNative(false)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${!native ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>托管契约</button>
          <button type="button" aria-pressed={native} onClick={() => setNative(true)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${native ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>非托管契约</button>
          <div className="w-full rounded-control border border-border bg-bg p-3">
            <p className="text-sm font-semibold text-primary">当前必须交付：</p>
            <ul className="mt-2 grid gap-1 text-sm text-secondary">
              {checks.map((check) => <li key={check}>· {check}</li>)}
            </ul>
          </div>
        </div>

        <div className="rounded-control border border-border bg-bg p-3">
          <svg viewBox="0 0 420 250" role="img" aria-label={native ? "托管代码与非托管ABI边界" : "托管类型与CLS边界"} className="h-auto w-full">
            <title>Interop contract boundary</title>
            <rect x="28" y="74" width="132" height="92" rx="14" fill="var(--clr-accent-soft)" stroke="var(--clr-accent)" strokeWidth="3" />
            <rect x="260" y="74" width="132" height="92" rx="14" fill={native ? "#fef3c7" : "white"} stroke={native ? "var(--clr-warning)" : "var(--clr-muted)"} strokeWidth="3" />
            <line x1="160" y1="120" x2="260" y2="120" stroke={native ? "var(--clr-warning)" : "var(--clr-accent)"} strokeWidth="4" />
            <text x="94" y="112" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--clr-ink)">CLR</text>
            <text x="94" y="133" textAnchor="middle" fontSize="11" fill="var(--clr-ink)">{native ? "managed" : "CTS / CLS"}</text>
            <text x="326" y="112" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--clr-ink)">{native ? "native" : "consumer"}</text>
            <text x="326" y="133" textAnchor="middle" fontSize="11" fill="var(--clr-ink)">{native ? "ABI / owner" : "cross-language"}</text>
            <text x="210" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill={native ? "var(--clr-warning)" : "var(--clr-accent)"}>{native ? "边界：布局、编码、线程与释放" : "边界：公共签名与语言兼容"}</text>
          </svg>
          <p className="mt-2 text-sm leading-relaxed text-secondary">{native ? "native 错误必须翻译为可观察的托管结果，并明确 buffer 与回调的 owner。" : "CTS 能表达的能力不都属于 CLS 公共 surface；要从第二种 CLR 语言实际编译调用。"}</p>
        </div>
      </div>
    </section>
  );
}

export const cvcClrExecutionConceptLabels = conceptLabels;
