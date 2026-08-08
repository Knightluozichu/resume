"use client";

import { useState } from "react";

const OFFICIAL_CONCEPT_LABELS = [
  "smart pointers in standalone statements",
  "evaluation order",
  "resource leak",
  "function argument",
] as const;

type ScenarioId = "legacy" | "standalone" | "cpp17";

type Scenario = {
  id: ScenarioId;
  label: string;
  shortRule: string;
  observation: string;
  safeResult: string;
};

const SCENARIOS: readonly Scenario[] = [
  {
    id: "legacy",
    label: "旧规则 · 交错风险",
    shortRule: "new → function argument → owner constructor",
    observation:
      "旧规则允许一个 function argument 的子表达式插入 new 与 shared_ptr constructor 之间。",
    safeResult: "priority() 抛异常时 owner 尚未构造，形成 resource leak。",
  },
  {
    id: "standalone",
    label: "独立语句 · 先建 owner",
    shortRule: "owner statement → next function argument",
    observation:
      "把 smart pointer 放进 standalone statement；完整表达式结束后，owner 已经存在。",
    safeResult: "后续异常触发 owner 析构，资源释放一次。",
  },
  {
    id: "cpp17",
    label: "C++17 · 不交错但不定序",
    shortRule: "argument A ∥ argument B（不交错）",
    observation:
      "C++17 禁止不同实参子求值交错，但不承诺哪个实参先完成。",
    safeResult: "旧 leak 场景被语言规则消除；仍不要依赖实参先后副作用。",
  },
];

function laneColor(scenario: ScenarioId, throws: boolean) {
  if (scenario === "legacy" && throws) return "var(--danger)";
  if (scenario === "legacy") return "var(--warning)";
  return "var(--success)";
}

function laneEvents(scenario: ScenarioId, throws: boolean) {
  if (scenario === "legacy") {
    return throws
      ? ["new Widget", "priority() throws", "stack unwinds", "resource leak"]
      : ["new Widget", "priority() returns", "shared_ptr ctor", "owner ready"];
  }
  if (scenario === "standalone")
    return ["make_unique / shared", "owner ready", "priority() throws", "owner releases"];
  return ["new Widget", "argument A completes", "argument B completes", "owner is safe"];
}

export function EcppItem17OwnershipGapMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 960 430"
          role="img"
          aria-label="Item 17 ownership gap map：旧规则下 function argument 的 evaluation order 可能让 new 后先执行 priority，造成 resource leak；独立语句和 C++17 的不交错求值让 owner 边界可证明。"
          className="mx-auto block h-auto w-full max-w-[960px]"
        >
          <text x="480" y="30" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
            Item 17 · smart pointers in standalone statements
          </text>
          <text x="480" y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            先看 owner 何时出现，再判断 function argument 的 evaluation order
          </text>

          <text x="24" y="99" fontSize="14" fontWeight="700" fill="var(--danger)">旧规则</text>
          <rect x="112" y="72" width="180" height="54" rx="10" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
          <text x="202" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">new Widget</text>
          <text x="202" y="114" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">raw resource</text>
          <path d="M292 99 H335" stroke="var(--danger)" strokeWidth="2" />
          <path d="M327 92 L339 99 L327 106" fill="none" stroke="var(--danger)" strokeWidth="2" />
          <rect x="345" y="72" width="180" height="54" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
          <text x="435" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">priority()</text>
          <text x="435" y="114" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">another argument</text>
          <path d="M525 99 H568" stroke="var(--warning)" strokeWidth="2" strokeDasharray="5 4" />
          <path d="M560 92 L572 99 L560 106" fill="none" stroke="var(--warning)" strokeWidth="2" />
          <rect x="578" y="72" width="180" height="54" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
          <text x="668" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">shared_ptr ctor</text>
          <text x="668" y="114" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">owner arrives late</text>
          <text x="780" y="99" fontSize="13" fontWeight="700" fill="var(--danger)">resource leak</text>

          <text x="24" y="188" fontSize="14" fontWeight="700" fill="var(--success)">安全基线</text>
          <rect x="112" y="161" width="246" height="54" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
          <text x="235" y="184" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">standalone statement</text>
          <text x="235" y="203" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">make_unique / make_shared</text>
          <path d="M358 188 H400" stroke="var(--success)" strokeWidth="2" />
          <path d="M392 181 L404 188 L392 195" fill="none" stroke="var(--success)" strokeWidth="2" />
          <rect x="410" y="161" width="188" height="54" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
          <text x="504" y="184" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">owner exists</text>
          <text x="504" y="203" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">full-expression ends</text>
          <path d="M598 188 H640" stroke="var(--success)" strokeWidth="2" />
          <path d="M632 181 L644 188 L632 195" fill="none" stroke="var(--success)" strokeWidth="2" />
          <rect x="650" y="161" width="190" height="54" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
          <text x="745" y="184" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">exception-safe call</text>
          <text x="745" y="203" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">owner releases once</text>

          <line x1="24" y1="246" x2="936" y2="246" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="24" y="281" fontSize="14" fontWeight="700" fill="var(--accent)">C++17</text>
          <rect x="112" y="258" width="246" height="54" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
          <text x="235" y="281" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">argument A completes</text>
          <text x="235" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">no sub-expression interleaving</text>
          <text x="380" y="290" textAnchor="middle" fontSize="18" fill="var(--text-secondary)">∥</text>
          <rect x="410" y="258" width="246" height="54" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
          <text x="533" y="281" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">argument B completes</text>
          <text x="533" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">先后仍未指定</text>
          <rect x="708" y="258" width="196" height="54" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
          <text x="806" y="281" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">仍要显式 owner</text>
          <text x="806" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">不要依赖副作用顺序</text>

          <text x="480" y="365" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">检查问题</text>
          <text x="480" y="389" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">异常发生时，资源是否已经落入一个可证明的 owner 生命周期？</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        关键边界不是“源码写在同一行”，而是 owner 是否在下一次可能失败的 function argument 之前已经完成构造。
      </figcaption>
    </figure>
  );
}

export function EcppItem17SmartPointerLab() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("legacy");
  const [throws, setThrows] = useState(true);
  const scenario = SCENARIOS.find((item) => item.id === scenarioId) ?? SCENARIOS[0];
  const events = laneEvents(scenario.id, throws);
  const tone = laneColor(scenario.id, throws);
  const outcome = scenario.id === "legacy" && throws ? "会泄漏" : "释放一次";

  const reset = () => {
    setScenarioId("legacy");
    setThrows(true);
  };

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="ecpp-item-17-smart-pointer-lab"
      aria-label="Item 17 smart pointer 资源所有权实验"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Item 17 ownership lab</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">先预测：priority() 抛异常时，谁负责 Widget？</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            切换标准规则，再注入或取消异常；观察 evaluation order 如何改变 resource leak 的证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 17 smart pointer 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 17 求值规则场景" className="grid gap-2 md:grid-cols-3">
          {SCENARIOS.map((item) => {
            const selected = item.id === scenario.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-pressed={selected}
                onClick={() => setScenarioId(item.id)}
                className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <label className="mt-3 flex min-h-11 items-center gap-3 rounded-control border border-border px-3 py-2 text-sm text-secondary">
          <input
            type="checkbox"
            checked={throws}
            onChange={(event) => setThrows(event.target.checked)}
            className="h-5 w-5 accent-current"
          />
          注入 priority() 异常
        </label>
      </div>

      <div className="p-4">
        <svg
          viewBox="0 0 920 248"
          role="img"
          aria-label={`当前场景 ${scenario.label} 的求值轨迹：${events.join(" → ")}；结果：${outcome}`}
          className="mx-auto block h-auto w-full"
        >
          <text x="460" y="22" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            {scenario.shortRule}
          </text>
          {events.map((event, index) => {
            const x = 20 + index * 225;
            const isFailure = event.includes("leak") || event.includes("throws");
            const isSuccess = event.includes("ready") || event.includes("releases") || event.includes("safe");
            const color = isFailure ? "var(--danger)" : isSuccess ? "var(--success)" : tone;
            return (
              <g key={`${scenario.id}-${event}`}>
                <rect x={x} y="76" width="188" height="74" rx="12" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1.8" />
                <text x={x + 94} y="108" textAnchor="middle" fontSize="13" fontWeight="700" fill={color}>{event}</text>
                <text x={x + 94} y="130" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">step {index + 1}</text>
                {index < events.length - 1 ? (
                  <>
                    <path d={`M${x + 188} 113 H${x + 212}`} stroke="var(--text-secondary)" strokeWidth="2" />
                    <path d={`M${x + 205} 106 L${x + 217} 113 L${x + 205} 120`} fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
                  </>
                ) : null}
              </g>
            );
          })}
          <text x="24" y="190" fontSize="12" fontWeight="700" fill="var(--text-secondary)">观察</text>
          <text x="24" y="214" fontSize="12" fill="var(--text-primary)">{scenario.observation}</text>
          <text x="24" y="238" fontSize="12" fill={tone}>{scenario.safeResult}</text>
        </svg>

        <div className="mt-4 grid gap-3 sm:grid-cols-3" role="status" aria-live="polite">
          <div className="rounded-control border border-border bg-bg p-3">
            <p className="text-xs text-secondary">owner 状态</p>
            <p className="mt-1 text-sm font-semibold text-primary">
              {scenario.id === "legacy" && throws ? "尚未构造" : "已在生命周期内"}
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-3">
            <p className="text-xs text-secondary">resource ledger</p>
            <p className="mt-1 text-sm font-semibold" style={{ color: tone }}>{outcome}</p>
          </div>
          <div className="rounded-control border border-border bg-bg p-3">
            <p className="text-xs text-secondary">审查动作</p>
            <p className="mt-1 text-sm font-semibold text-primary">
              {scenario.id === "cpp17" ? "不依赖实参先后" : "把 owner 提前建立"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
