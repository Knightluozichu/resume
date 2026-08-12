"use client";

import { useState, type CSSProperties } from "react";

const shellStyle = {
  "--cvc-accent": "#2563eb",
  "--cvc-accent-soft": "#dbeafe",
  "--cvc-ink": "#172033",
  "--cvc-muted": "#94a3b8",
  "--cvc-warning": "#b45309",
} as CSSProperties;

const parts = [
  { label: "Part I", detail: "执行与部署", output: "IL、metadata、assembly" },
  { label: "Part II", detail: "设计类型", output: "type contract、dispatch" },
  { label: "Part III", detail: "核心类型", output: "identity、law、边界" },
  { label: "Part IV", detail: "核心设施", output: "owner、failure、lifetime" },
  { label: "Part V", detail: "线程体系", output: "queue、wait、同步" },
] as const;

const evidenceStages = [
  {
    label: "目录合同",
    detail: "确认5个Part和30章都在路线中。",
  },
  {
    label: "运行时因果链",
    detail: "从编译产物追到加载、对象、队列和同步。",
  },
  {
    label: "失败边界",
    detail: "只改变一个条件，定位首个可观测分岔。",
  },
  {
    label: "迁移检查",
    detail: "把同一推理链换到真实组件再复查。",
  },
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

export function CvcLearningMapContextContractLab() {
  const [active, setActive] = useState(0);

  return (
    <section
      aria-label="CLR五部分学习合同"
      style={shellStyle}
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">上下文合同</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            先选Part，再说它交付什么运行时证据
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            选择一个Part，观察它在整条CLR因果链中的位置；地图不是章节名称的平铺。
          </p>
        </div>
        <ResetButton onClick={() => setActive(0)} label="重置选择" />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-2">
          {parts.map((part, index) => (
            <button
              key={part.label}
              type="button"
              aria-pressed={index === active}
              onClick={() => setActive(index)}
              className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${
                index === active
                  ? "border-accent bg-bg font-semibold text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              <span className="mr-2 text-xs text-accent">{index + 1}</span>
              {part.label} · {part.detail}
            </button>
          ))}
        </div>

        <div className="rounded-control border border-border bg-bg p-3">
          <svg
            viewBox="0 0 720 230"
            role="img"
            aria-label="五部分从执行模型走向线程同步的因果链"
            className="h-auto w-full"
          >
            <title>CLR五部分运行时因果链</title>
            <line x1="70" y1="105" x2="650" y2="105" stroke="var(--cvc-muted)" strokeWidth="4" />
            {parts.map((part, index) => {
              const x = 70 + index * 145;
              const selected = index === active;
              return (
                <g key={part.label}>
                  <circle
                    cx={x}
                    cy="105"
                    r={selected ? 27 : 21}
                    fill={selected ? "var(--cvc-accent)" : "white"}
                    stroke={selected ? "var(--cvc-accent)" : "var(--cvc-muted)"}
                    strokeWidth="4"
                  />
                  <text x={x} y="111" textAnchor="middle" fontSize="12" fontWeight="700" fill={selected ? "white" : "var(--cvc-ink)"}>
                    {index + 1}
                  </text>
                  <text x={x} y="48" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--cvc-ink)">
                    {part.label}
                  </text>
                  <text x={x} y="174" textAnchor="middle" fontSize="11" fill="var(--cvc-ink)">
                    {part.output}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            当前焦点：{parts[active].label}。{parts[active].detail}它交付的是 {parts[active].output}。
          </p>
        </div>
      </div>
    </section>
  );
}

export function CvcLearningMapComputeTraceLab() {
  const [faultInjected, setFaultInjected] = useState(false);

  return (
    <section
      aria-label="CLR运行时因果链计算轨迹"
      style={shellStyle}
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">状态轨迹</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            只注入一个版本错位，观察首个分岔
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            参考路径从源代码到结果；故障路径只替换程序集 identity，检查错误在哪一层先出现。
          </p>
        </div>
        <ResetButton onClick={() => setFaultInjected(false)} label="重置轨迹" />
      </header>

      <div className="p-4">
        <svg
          viewBox="0 0 720 245"
          role="img"
          aria-label={faultInjected ? "程序集版本错位在加载阶段分岔" : "CLR从源代码到运行结果的参考轨迹"}
          className="h-auto w-full rounded-control border border-border bg-bg"
        >
          <title>{faultInjected ? "故障轨迹" : "参考轨迹"}</title>
          <line x1="80" y1="105" x2="640" y2="105" stroke="var(--cvc-muted)" strokeWidth="4" />
          {["source", "module", "load", "execute"].map((label, index) => {
            const x = 80 + index * 185;
            const failed = faultInjected && index === 2;
            return (
              <g key={label}>
                <rect x={x - 46} y="78" width="92" height="54" rx="12" fill={failed ? "#fef3c7" : "white"} stroke={failed ? "var(--cvc-warning)" : "var(--cvc-accent)"} strokeWidth="3" />
                <text x={x} y="101" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--cvc-ink)">
                  {label === "source" ? "源码" : label === "module" ? "module" : label === "load" ? "加载" : "执行"}
                </text>
                <text x={x} y="119" textAnchor="middle" fontSize="11" fill="var(--cvc-ink)">
                  {failed ? "identity mismatch" : index === 0 ? "compile" : index === 1 ? "IL + metadata" : index === 2 ? "binding" : "native code"}
                </text>
              </g>
            );
          })}
          <text x="360" y="184" textAnchor="middle" fontSize="12" fontWeight="700" fill={faultInjected ? "var(--cvc-warning)" : "var(--cvc-accent)"}>
            {faultInjected ? "首个分岔：加载阶段先失败，不能归因于执行逻辑" : "参考路径：每一层都保存可复查产物"}
          </text>
        </svg>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-relaxed text-secondary">
            当前状态：{faultInjected ? "已注入程序集版本错位" : "参考路径"}。
          </p>
          <button
            type="button"
            aria-pressed={faultInjected}
            onClick={() => setFaultInjected((value) => !value)}
            className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-warning hover:text-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {faultInjected ? "撤销版本错位" : "注入版本错位"}
          </button>
        </div>
      </div>
    </section>
  );
}

export function CvcLearningMapEvidenceGateLab() {
  const [verified, setVerified] = useState<boolean[]>(() => evidenceStages.map(() => false));
  const complete = verified.every(Boolean);

  return (
    <section
      aria-label="CLR跨章迁移检查"
      style={shellStyle}
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">证据门</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            Transfer Checkpoint：四项证据都能复查才放行
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            逐项勾选你能交付的产物；门禁只检查证据是否齐全，不把“读过”当成通过。
          </p>
        </div>
        <ResetButton onClick={() => setVerified(evidenceStages.map(() => false))} label="重置门禁" />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-2">
          {evidenceStages.map((stage, index) => (
            <button
              key={stage.label}
              type="button"
              aria-pressed={verified[index]}
              onClick={() => setVerified((current) => current.map((value, item) => (item === index ? !value : value)))}
              className={`min-h-11 rounded-control border px-3 py-3 text-left transition-colors ${
                verified[index]
                  ? "border-accent bg-bg text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              <span className="mr-2 text-sm font-semibold text-accent">{verified[index] ? "已核对" : "待核对"}</span>
              <span className="text-sm font-semibold">{stage.label}</span>
              <span className="mt-1 block text-sm leading-relaxed">{stage.detail}</span>
            </button>
          ))}
        </div>

        <div className="rounded-control border border-border bg-bg p-3">
          <svg viewBox="0 0 360 220" role="img" aria-label="四项证据汇聚到发布门" className="h-auto w-full">
            <title>证据门状态</title>
            {evidenceStages.map((stage, index) => {
              const y = 28 + index * 45;
              return (
                <g key={stage.label}>
                  <rect x="18" y={y} width="205" height="26" rx="8" fill={verified[index] ? "var(--cvc-accent-soft)" : "white"} stroke={verified[index] ? "var(--cvc-accent)" : "var(--cvc-muted)"} strokeWidth="2" />
                  <text x="30" y={y + 17} fontSize="11" fill="var(--cvc-ink)">{stage.label}</text>
                  <line x1="224" y1={y + 13} x2="268" y2="110" stroke={verified[index] ? "var(--cvc-accent)" : "var(--cvc-muted)"} strokeWidth="2" />
                </g>
              );
            })}
            <circle cx="292" cy="110" r="37" fill={complete ? "var(--cvc-accent)" : "white"} stroke={complete ? "var(--cvc-accent)" : "var(--cvc-muted)"} strokeWidth="4" />
            <text x="292" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill={complete ? "white" : "var(--cvc-ink)"}>{complete ? "放行" : "检查"}</text>
            <text x="292" y="123" textAnchor="middle" fontSize="11" fill={complete ? "white" : "var(--cvc-ink)"}>{verified.filter(Boolean).length}/4</text>
          </svg>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            {complete ? "证据门状态：可以进入发布前复核。" : `证据门状态：还需核对 ${4 - verified.filter(Boolean).length} 项。`}
          </p>
        </div>
      </div>
    </section>
  );
}
