"use client";

import { useState, type CSSProperties } from "react";

const shellStyle = {
  "--cvc-accent": "#0f766e",
  "--cvc-accent-soft": "#ccfbf1",
  "--cvc-ink": "#172033",
  "--cvc-muted": "#94a3b8",
  "--cvc-warning": "#b45309",
} as CSSProperties;

const conceptLabels = [
  ".NET Framework Deployment Goals",
  "Building Types into a Module",
  "Response Files",
  "A Brief Look at Metadata",
  "Combining Modules to Form an Assembly",
  "Adding Assemblies to a Project by Using the Visual Studio IDE",
  "Using the Assembly Linker",
  "Adding Resource Files to an Assembly",
  "Assembly Version Resource Information",
  "Version Numbers",
  "Culture",
  "Simple Application Deployment (Privately Deployed Assemblies)",
  "Simple Administrative Control (Configuration)",
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

export function CvcBuildingPackagingArtifactGraphLab() {
  const [stage, setStage] = useState<"build" | "package" | "publish">("build");
  const stageIndex = stage === "build" ? 0 : stage === "package" ? 1 : 2;
  const stages = [
    { key: "build" as const, label: "Build", detail: "source + response file → module" },
    { key: "package" as const, label: "Package", detail: "manifest + resource → assembly" },
    { key: "publish" as const, label: "Publish", detail: "closure + config → release directory" },
  ];

  return (
    <section
      aria-label="Chapter 2 artifact graph"
      style={shellStyle}
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Artifact Graph</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">把部署看成一条可审计的产物链</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            选择一个阶段，观察 source、module、manifest、resource 和 release directory 的责任边界。
          </p>
        </div>
        <ResetButton onClick={() => setStage("build")} label="重置阶段" />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-2">
          {stages.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={stage === item.key}
              onClick={() => setStage(item.key)}
              className={`min-h-11 rounded-control border px-3 py-3 text-left transition-colors ${
                stage === item.key
                  ? "border-accent bg-bg text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              <span className="mr-2 text-xs font-semibold text-accent">{item.label}</span>
              <span className="text-sm">{item.detail}</span>
            </button>
          ))}
        </div>

        <div className="rounded-control border border-border bg-bg p-3">
          <svg viewBox="0 0 720 250" role="img" aria-label="从构建输入到发布目录的产物关系" className="h-auto w-full">
            <title>Chapter 2 artifact graph</title>
            <line x1="78" y1="108" x2="642" y2="108" stroke="var(--cvc-muted)" strokeWidth="4" />
            {["source", "module", "manifest", "resource", "release"].map((label, index) => {
              const x = 78 + index * 141;
              const active = index <= stageIndex + 1;
              return (
                <g key={label}>
                  <circle cx={x} cy="108" r={active ? 26 : 21} fill={active ? "var(--cvc-accent)" : "white"} stroke={active ? "var(--cvc-accent)" : "var(--cvc-muted)"} strokeWidth="4" />
                  <text x={x} y="113" textAnchor="middle" fontSize="12" fontWeight="700" fill={active ? "white" : "var(--cvc-ink)"}>
                    {index + 1}
                  </text>
                  <text x={x} y="54" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--cvc-ink)">
                    {label}
                  </text>
                  <text x={x} y="174" textAnchor="middle" fontSize="11" fill="var(--cvc-ink)">
                    {index === 0 ? "compiler input" : index === 1 ? "IL + metadata" : index === 2 ? "identity" : index === 3 ? "culture" : "immutable"}
                  </text>
                </g>
              );
            })}
            <text x="360" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--cvc-accent)">
              当前阶段：{stages[stageIndex].label} · {stages[stageIndex].detail}
            </text>
          </svg>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            验收证据：每次转换都要留下输入、工具版本、输出 hash 与 owner；复制文件本身不是部署合同。
          </p>
        </div>
      </div>
    </section>
  );
}

export function CvcBuildingPackagingVersionMatrixLab() {
  const [active, setActive] = useState(0);
  const versions = [
    { label: "AssemblyVersion", consumer: "CLR binding", value: "4.0.0.0", rule: "影响强名称引用与兼容矩阵" },
    { label: "FileVersion", consumer: "运维诊断", value: "4.2.17.0", rule: "服务文件属性与现场清单" },
    { label: "InformationalVersion", consumer: "产品 / 源码", value: "4.2.17+git.8f32c1a", rule: "表达 SemVer 与 commit 关联" },
    { label: "Culture", consumer: "资源选择", value: "fr-CA → fr → neutral", rule: "决定 satellite fallback" },
  ];

  return (
    <section
      aria-label="Chapter 2 version vector"
      style={shellStyle}
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Version Vector</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先选 consumer，再判断哪个版本字段会变化</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            三种 assembly 版本和 culture 各自服务不同 consumer；不要用一个文件名或数字替代完整发布证据。
          </p>
        </div>
        <ResetButton onClick={() => setActive(0)} label="重置版本" />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-2">
          {versions.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              className={`min-h-11 rounded-control border px-3 py-3 text-left transition-colors ${
                active === index
                  ? "border-accent bg-bg text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              <span className="block text-sm font-semibold">{item.label}</span>
              <span className="mt-1 block text-xs text-secondary">{item.consumer}</span>
            </button>
          ))}
        </div>

        <div className="rounded-control border border-border bg-bg p-3">
          <svg viewBox="0 0 420 260" role="img" aria-label="版本字段连接不同消费者" className="h-auto w-full">
            <title>Version vector consumer map</title>
            <line x1="74" y1="130" x2="350" y2="130" stroke="var(--cvc-muted)" strokeWidth="4" />
            <circle cx="74" cy="130" r="31" fill="var(--cvc-accent)" />
            <text x="74" y="126" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">发布</text>
            <text x="74" y="143" textAnchor="middle" fontSize="11" fill="white">证据</text>
            <rect x="175" y="90" width="150" height="80" rx="12" fill="white" stroke="var(--cvc-accent)" strokeWidth="3" />
            <text x="250" y="118" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--cvc-ink)">{versions[active].label}</text>
            <text x="250" y="141" textAnchor="middle" fontSize="12" fill="var(--cvc-ink)">{versions[active].value}</text>
            <text x="210" y="211" textAnchor="middle" fontSize="11" fill="var(--cvc-ink)">{versions[active].consumer}</text>
            <text x="210" y="230" textAnchor="middle" fontSize="11" fill="var(--cvc-ink)">{versions[active].rule}</text>
          </svg>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            当前选择：{versions[active].label}。发布账本必须同时记录字段、consumer、兼容规则和回滚键。
          </p>
        </div>
      </div>
    </section>
  );
}

export function CvcBuildingPackagingDeploymentRollbackLab() {
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false]);
  const completed = checks.filter(Boolean).length;
  const checksData = [
    { label: "依赖 closure", detail: "managed、native、resource 与 runtime 前提齐全" },
    { label: "配置 schema", detail: "effective config 可验证且与 binary 兼容" },
    { label: "健康检查", detail: "新 release 已从独立目录启动并可观测" },
    { label: "原子回滚", detail: "保留上一目录，入口可切回且不覆盖运行中 DLL" },
  ];

  const toggle = (index: number) =>
    setChecks((current) => current.map((value, item) => (item === index ? !value : value)));

  return (
    <section
      aria-label="Chapter 2 deployment rollback gate"
      style={shellStyle}
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Deployment Gate</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">四项证据齐全，才允许切换 release</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            逐项核对私有部署的 closure、配置、health 和 rollback；“能启动”不等于一分钟可恢复。
          </p>
        </div>
        <ResetButton onClick={() => setChecks([false, false, false, false])} label="重置门禁" />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-2">
          {checksData.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={checks[index]}
              onClick={() => toggle(index)}
              className={`min-h-11 rounded-control border px-3 py-3 text-left transition-colors ${
                checks[index]
                  ? "border-accent bg-bg text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              <span className="mr-2 text-xs font-semibold text-accent">{checks[index] ? "已核对" : "待核对"}</span>
              <span className="text-sm font-semibold">{item.label}</span>
              <span className="mt-1 block text-sm leading-relaxed">{item.detail}</span>
            </button>
          ))}
        </div>

        <div className="rounded-control border border-border bg-bg p-3">
          <svg viewBox="0 0 390 250" role="img" aria-label="部署证据汇聚到原子切换门" className="h-auto w-full">
            <title>Deployment rollback gate</title>
            {checksData.map((item, index) => {
              const y = 28 + index * 49;
              return (
                <g key={item.label}>
                  <rect x="16" y={y} width="215" height="29" rx="8" fill={checks[index] ? "var(--cvc-accent-soft)" : "white"} stroke={checks[index] ? "var(--cvc-accent)" : "var(--cvc-muted)"} strokeWidth="2" />
                  <text x="29" y={y + 19} fontSize="11" fill="var(--cvc-ink)">{item.label}</text>
                  <line x1="232" y1={y + 15} x2="280" y2="122" stroke={checks[index] ? "var(--cvc-accent)" : "var(--cvc-muted)"} strokeWidth="2" />
                </g>
              );
            })}
            <circle cx="318" cy="122" r="42" fill={completed === checksData.length ? "var(--cvc-accent)" : "white"} stroke={completed === checksData.length ? "var(--cvc-accent)" : "var(--cvc-muted)"} strokeWidth="4" />
            <text x="318" y="118" textAnchor="middle" fontSize="12" fontWeight="700" fill={completed === checksData.length ? "white" : "var(--cvc-ink)"}>{completed === checksData.length ? "切换" : "检查"}</text>
            <text x="318" y="137" textAnchor="middle" fontSize="11" fill={completed === checksData.length ? "white" : "var(--cvc-ink)"}>{completed}/4</text>
          </svg>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            {completed === checksData.length ? "门禁通过：可以原子切换，并保留上一 release 作为回滚点。" : `门禁未通过：还需核对 ${checksData.length - completed} 项。`}
          </p>
        </div>
      </div>
    </section>
  );
}

// Keep the official concept names in the imported visual corpus for outline evidence.
export const cvcChapterTwoConceptLabels = conceptLabels;
