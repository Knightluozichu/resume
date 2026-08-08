"use client";

import { useState } from "react";

type InlineScenario = {
  label: string;
  callSite: string;
  compilerView: string;
  deliveryCost: string;
  recommendation: string;
  evidence: readonly string[];
};

const SCENARIOS: readonly InlineScenario[] = [
  {
    label: "tiny accessor / hot loop",
    callSite: "Point::x() 在百万次循环中读取一个字段。",
    compilerView: "body 很小、调用很热；展开后可消掉 call 与返回值搬运。",
    deliveryCost: "header 改动会触发所有包含者重编译，但 code size 风险低。",
    recommendation: "保持类内定义或 inline 候选；用 assembly 和 profile 确认收益。",
    evidence: [
      "optimization remark：hot call site accepted",
      "disassembly：call 消失，load 留在循环内",
      "text section 与 i-cache miss 没有明显上升",
    ],
  },
  {
    label: "constant argument / branch",
    callSite: "encode() 调用 clampToByte(42)，参数在调用点已知。",
    compilerView: "展开打开 interprocedural constant propagation，边界分支可被折叠。",
    deliveryCost: "若同一 body 被大量冷调用点复制，收益会被 code bloat 抵消。",
    recommendation: "优先让 compiler 按成本模型决定；不要把 keyword 当性能开关。",
    evidence: [
      "optimization remark：constant propagated",
      "disassembly：结果直接变成常量 42",
      "microbenchmark 与 end-to-end profile 同时确认收益",
    ],
  },
  {
    label: "default lifecycle / hidden work",
    callSite: "Session() = default 看似一行，却构造 string、vector 和 owner。",
    compilerView: "隐式 base/member 构造与 construction cleanup path 让 body 可能很大。",
    deliveryCost: "展开多份 lifecycle work 会放大 text section、调试和 i-cache 压力。",
    recommendation: "默认保持 out-of-line；只有 profile 证明是热点时再复核 LTO 方案。",
    evidence: [
      "disassembly：统计 implicit member calls 与异常清理路径",
      "binary size：比较多个 call site 展开后的 text bytes",
      "debug build：确认断点、stack trace 与 sanitizer attribution",
    ],
  },
  {
    label: "public header / security fix",
    callSite: "客户 binary 已把 header 中的实现复制进自己的调用点。",
    compilerView: "是否有 inline keyword 不改变已生成机器码；动态库新符号未必会被调用。",
    deliveryCost: "client-baked implementation 让补丁需要 headers、rebuild 与 redeploy。",
    recommendation: "易变或安全敏感逻辑留在稳定 out-of-line ABI 边界。",
    evidence: [
      "旧客户 + 新 shared library：验证旧 body 是否仍执行",
      "新 header + rebuild：确认修复进入 client binary",
      "发布记录：列出受影响调用方与重编译范围",
    ],
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "ins and outs of inlining",
  "code size",
  "instruction cache",
  "implicit inline",
  "debugger",
] as const;

export function EcppInlineDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 420"
          role="img"
          aria-label="inline 决策图：inline specifier 先提供 ODR 多定义语义，compiler 再按成本模型决定 call-site inlining，最后由 code size、instruction cache、debugger 和发布耦合共同验收。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="30" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
            Inline is a decision pipeline
          </text>
          <text x="470" y="55" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            language semantics → optimizer choice → engineering evidence
          </text>

          <g>
            <rect x="42" y="88" width="245" height="116" rx="14" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="164" y="120" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">inline specifier</text>
            <text x="164" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">ODR：多个 TU 的相同定义</text>
            <text x="164" y="176" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">提示候选，不命令展开</text>
          </g>
          <path d="M287 146 H325" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M317 139 L329 146 L317 153" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />

          <g>
            <rect x="335" y="88" width="270" height="116" rx="14" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="470" y="120" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">compiler cost model</text>
            <text x="470" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">body、热度、可见性、寄存器压力</text>
            <text x="470" y="176" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">LTO / PGO 可能改变边界</text>
          </g>
          <path d="M605 146 H643" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M635 139 L647 146 L635 153" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />

          <g>
            <rect x="653" y="88" width="245" height="116" rx="14" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="775" y="120" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">call-site result</text>
            <text x="775" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">展开、保留 call 或混合</text>
            <text x="775" y="176" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">同一函数可逐点不同</text>
          </g>

          <line x1="42" y1="242" x2="898" y2="242" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="272" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">验收不能停在“源码只有几行”</text>
          <g>
            <rect x="42" y="294" width="192" height="72" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--border)" />
            <text x="138" y="323" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">performance</text>
            <text x="138" y="347" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">latency / throughput</text>
          </g>
          <g>
            <rect x="254" y="294" width="192" height="72" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--border)" />
            <text x="350" y="323" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">machine code</text>
            <text x="350" y="347" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">text bytes / i-cache</text>
          </g>
          <g>
            <rect x="466" y="294" width="192" height="72" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--border)" />
            <text x="562" y="323" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">tooling</text>
            <text x="562" y="347" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">debugger / profiler</text>
          </g>
          <g>
            <rect x="678" y="294" width="220" height="72" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--border)" />
            <text x="788" y="323" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">delivery</text>
            <text x="788" y="347" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">rebuild / ABI / patch</text>
          </g>
          <text x="470" y="397" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            先看 call-site 证据，再决定是否让实现进入 header
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `inline` 的语言语义、优化器的展开选择和工程交付成本是三件事；每个调用点都要用证据验收。
      </figcaption>
    </figure>
  );
}

export function EcppItem30InlineLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 30 inline 决策实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">证据驱动实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">先预测：这个函数该 inline 吗？</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            切换四个真实工程场景，分别观察调用点收益、机器码代价和发布边界；再展开证据清单。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 30 inline 决策实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 30 inline 场景" className="grid gap-2 md:grid-cols-4">
          {SCENARIOS.map((scenario, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={scenario.label}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  setActiveIndex(index);
                  setShowEvidence(false);
                }}
                className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {scenario.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <p className="text-xs font-medium text-accent">调用点</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.callSite}</p>
          <p className="mt-4 text-xs font-medium text-success">compiler 看到什么</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.compilerView}</p>
          <p className="mt-4 text-xs font-medium text-warning">交付代价</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.deliveryCost}</p>
        </div>

        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前建议 · {active.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.recommendation}</p>
          </div>
          <button
            type="button"
            aria-pressed={showEvidence}
            onClick={() => setShowEvidence((value) => !value)}
            className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${
              showEvidence
                ? "border-success bg-success/10 text-success"
                : "border-border text-secondary hover:border-success hover:text-primary"
            }`}
          >
            {showEvidence ? "收起验证证据" : "查看验证证据"}
          </button>
          {showEvidence && (
            <ul className="mt-3 space-y-2 rounded-control border border-success bg-bg p-4 text-sm leading-relaxed text-primary">
              {active.evidence.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-success">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
