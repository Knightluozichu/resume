"use client";

import { useState } from "react";

type ReplacementScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
  route: string;
};

const SCENARIOS: readonly ReplacementScenario[] = [
  {
    label: "usage errors / debug path",
    observation:
      "前后 guard、state、poisoning 和 quarantine 能把越界、double delete 与 use-after-free 留在可复现窗口。",
    decision:
      "只在 debug 或受控 failure-injection 路径启用；先确认成熟 sanitizer 的覆盖和开销，避免复制一套更弱工具。",
    evidence:
      "记录 requested size、alignment、state 和真实 base；验证非法写入、重复释放与延迟重用都会被发现。",
    route: "diagnostic instrumentation → scoped debug allocator",
  },
  {
    label: "allocation statistics / performance",
    observation:
      "固定尺寸 pool 的 microbenchmark 可能很快，但真实 workload 还包含尺寸分布、寿命、线程和峰值 live set。",
    decision:
      "用预分配 ring buffer 记录 allocation trace，在 subsystem 内比较成熟 pool/pmr 与默认 allocator，不先改 global hook。",
    evidence:
      "回放同一 trace，观察 p50/p95/p99、吞吐、RSS、碎片、锁竞争和 cross-thread free；结果必须可重复。",
    route: "trace replay → local pool/resource → A/B evidence",
  },
  {
    label: "clustering / alignment",
    observation:
      "同场景同寿命对象适合 arena clustering；SIMD、DMA 或硬件 buffer 可能需要 over-aligned storage。",
    decision:
      "按访问关系和 alignment 选择 scoped arena 或 aligned allocation pair；跨线程写入要排除 false sharing。",
    evidence:
      "同时测 cache/TLB、遍历尾延迟、峰值内存和每种 delete 配对；保留普通 resource 的回退路径。",
    route: "lifetime domain + alignment → scoped resource → rollback",
  },
] as const;

export const OFFICIAL_CONCEPT_LABELS = [
  "replace new and delete",
  "usage errors",
  "performance",
  "allocation statistics",
  "clustering",
  "alignment",
] as const;

export function EcppItem50ReplacementDecisionMap() {
  return (
    <figure
      data-visual-kind="ecpp-item-50-replacement-decision-map"
      className="mdx-figure not-prose mx-auto my-6"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 1040 470"
          role="img"
          aria-label="Item 50 替换 new 和 delete 的决策图：从 usage errors、allocation statistics、performance、clustering 和 alignment 证据出发，优先选择 scoped resource，再验证完整契约和回退。"
          className="mx-auto block h-auto w-full max-w-[1040px]"
        >
          <text
            x="520"
            y="30"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            When replacement makes sense
          </text>
          <text
            x="520"
            y="54"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            先证明缺口，再限制作用域，最后用真实轨迹验收
          </text>

          <rect
            x="36"
            y="86"
            width="232"
            height="226"
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.07"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x="152"
            y="116"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--accent)"
          >
            1 · 证据动机
          </text>
          <text x="58" y="151" fontSize="12" fill="var(--text-primary)">
            usage errors
          </text>
          <text x="58" y="177" fontSize="12" fill="var(--text-primary)">
            allocation statistics
          </text>
          <text x="58" y="203" fontSize="12" fill="var(--text-primary)">
            performance / trace
          </text>
          <text x="58" y="229" fontSize="12" fill="var(--text-primary)">
            clustering / lifetime
          </text>
          <text x="58" y="255" fontSize="12" fill="var(--text-primary)">
            alignment / hardware
          </text>
          <text x="58" y="286" fontSize="11" fill="var(--text-secondary)">
            profiler、sanitizer、trace
          </text>

          <path
            d="M268 199 H306"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M298 192 L310 199 L298 206"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <rect
            x="312"
            y="86"
            width="232"
            height="226"
            rx="12"
            fill="var(--warning)"
            fillOpacity="0.07"
            stroke="var(--warning)"
            strokeWidth="1.6"
          />
          <text
            x="428"
            y="116"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--warning)"
          >
            2 · 最小作用域
          </text>
          <text x="334" y="154" fontSize="12" fill="var(--text-primary)">
            scoped memory resource
          </text>
          <text x="334" y="183" fontSize="12" fill="var(--text-primary)">
            class-specific replacement
          </text>
          <text x="334" y="212" fontSize="12" fill="var(--text-primary)">
            global replacement
          </text>
          <text x="334" y="255" fontSize="12" fill="var(--text-secondary)">
            先局部 prototype
          </text>
          <text x="334" y="281" fontSize="12" fill="var(--text-secondary)">
            再考虑进程边界
          </text>

          <path
            d="M544 199 H582"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M574 192 L586 199 L574 206"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <rect
            x="588"
            y="86"
            width="416"
            height="226"
            rx="12"
            fill="var(--success)"
            fillOpacity="0.07"
            stroke="var(--success)"
            strokeWidth="1.6"
          />
          <text
            x="796"
            y="116"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--success)"
          >
            3 · 完整契约 + 真实验证
          </text>
          <text x="610" y="153" fontSize="12" fill="var(--text-primary)">
            size 0 / failure / new-handler
          </text>
          <text x="610" y="180" fontSize="12" fill="var(--text-primary)">
            sized + aligned + nothrow forms
          </text>
          <text x="610" y="207" fontSize="12" fill="var(--text-primary)">
            thread safety / allocator identity
          </text>
          <text x="610" y="247" fontSize="12" fill="var(--text-primary)">
            p99 · RSS · fragmentation · locality
          </text>
          <text x="610" y="274" fontSize="12" fill="var(--text-primary)">
            feature flag + rollback threshold
          </text>

          <line
            x1="36"
            y1="350"
            x2="1004"
            y2="350"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="6 4"
          />
          <text
            x="520"
            y="382"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            replacement decision = measurable motive × bounded scope ×
            reversible evidence
          </text>
          <text
            x="520"
            y="410"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            没有真实 allocation trace 或完整配对契约，就停在 prototype，不替换
            global new/delete
          </text>
          <text
            x="520"
            y="445"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Item 50：不是“能不能写”，而是“何时值得承担系统边界风险”
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        五类动机不能直接推出 global
        replacement；它们必须经过作用域选择、完整契约检查与真实轨迹 A/B 验证。
      </figcaption>
    </figure>
  );
}

export function EcppItem50ReplacementLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 50 new/delete replacement 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="ecpp-item-50-replacement-lab"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">
            replacement evidence lab
          </p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            先预测：哪一种动机足以支持替换？
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            切换场景前，先写出作用域、allocation contract
            和必须观察的指标；实验不会替你生成一个总分。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 50 replacement 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div
          role="tablist"
          aria-label="Item 50 replacement 场景"
          className="grid gap-2 md:grid-cols-3"
        >
          {SCENARIOS.map((scenario, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={scenario.label}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-pressed={selected}
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
          <p className="text-xs font-medium text-accent">观察</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">
            {active.observation}
          </p>
          <p className="mt-4 text-xs font-medium text-warning">推荐路径</p>
          <p className="mt-2 break-words font-mono text-xs leading-relaxed text-secondary">
            {active.route}
          </p>
        </div>
        <div className="p-4">
          <div
            role="status"
            aria-live="polite"
            className="rounded-control border border-border bg-bg p-4"
          >
            <p className="text-xs font-medium text-accent">
              当前场景 · {active.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-primary">
              {active.decision}
            </p>
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
            <div className="mt-3 rounded-control border border-success bg-bg p-4">
              <p className="text-xs font-medium text-success">应观察到</p>
              <p className="mt-2 text-sm leading-relaxed text-primary">
                {active.evidence}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
