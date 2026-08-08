"use client";

import { useState } from "react";

const PRIMARY = "var(--text-primary)";
const SECONDARY = "var(--text-secondary)";
const ACCENT = "var(--accent)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";
const BORDER = "var(--border)";

const OFFICIAL_CONCEPT_LABELS = [
  "same form in new and delete",
  "new[] / delete[]",
  "typedef",
] as const;

type ProtocolScenario = {
  id: "single" | "array" | "typedef" | "mismatch";
  label: string;
  allocation: string;
  release: string;
  evidence: string;
  decision: string;
  tone: string;
  array: boolean;
};

const SCENARIOS: readonly ProtocolScenario[] = [
  {
    id: "single",
    label: "单对象",
    allocation: "new Widget",
    release: "delete pointer",
    evidence: "1 个对象构造 → 1 次析构 → 同一 deallocation family",
    decision: "匹配：single-object allocation form",
    tone: SUCCESS,
    array: false,
  },
  {
    id: "array",
    label: "数组 owner",
    allocation: "new Widget[4]",
    release: "delete[] pointer",
    evidence: "4 个元素 → 逆序析构 → cookie/数组释放入口完整回收",
    decision: "匹配：new[] / delete[]",
    tone: ACCENT,
    array: true,
  },
  {
    id: "typedef",
    label: "typedef 数组",
    allocation: "new AddressLines",
    release: "delete[] pointer",
    evidence: "别名隐藏数组性 → owner/接口仍必须保留 array form",
    decision: "可行但易误用：迁移到 std::array value",
    tone: WARNING,
    array: true,
  },
  {
    id: "mismatch",
    label: "故障注入",
    allocation: "new Widget[4]",
    release: "delete pointer",
    evidence:
      "析构数量、cookie 或 allocator family 不可证明；结果是 undefined behavior",
    decision: "失败：改用 unique_ptr<Widget[]> 或 vector ownership",
    tone: DANGER,
    array: true,
  },
];

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <>
      <line
        x1={x1}
        y1={y}
        x2={x2 - 12}
        y2={y}
        stroke={SECONDARY}
        strokeWidth="2"
      />
      <path
        d={`M${x2 - 18} ${y - 7} L${x2 - 6} ${y} L${x2 - 18} ${y + 7}`}
        fill="none"
        stroke={SECONDARY}
        strokeWidth="2"
      />
    </>
  );
}

export function EcppItem16ProtocolMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-8 min-w-0">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 900 360"
          role="img"
          aria-label="Effective C++ Item 16 协议图：same form in new and delete；new[] 必须对应 delete[]；typedef 可能隐藏数组性，typed owner 将释放形式编码进类型。"
          className="mx-auto block h-auto w-full max-w-[900px]"
        >
          <defs>
            <marker
              id="ecpp-item16-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L7 3 L0 6 z" fill={SECONDARY} />
            </marker>
          </defs>
          <text
            x="450"
            y="28"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill={PRIMARY}
          >
            same form in new and delete
          </text>
          <text
            x="450"
            y="52"
            textAnchor="middle"
            fontSize="12"
            fill={SECONDARY}
          >
            allocation form → object lifetime → deallocation family
          </text>

          <rect
            x="28"
            y="82"
            width="236"
            height="92"
            rx="12"
            fill={ACCENT}
            fillOpacity="0.08"
            stroke={ACCENT}
            strokeWidth="1.6"
          />
          <text
            x="146"
            y="110"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={ACCENT}
          >
            new / new[]
          </text>
          <text
            x="146"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={PRIMARY}
          >
            single object or array
          </text>
          <text
            x="146"
            y="158"
            textAnchor="middle"
            fontSize="12"
            fill={SECONDARY}
          >
            type + count + allocator family
          </text>

          <line
            x1="264"
            y1="128"
            x2="314"
            y2="128"
            stroke={SECONDARY}
            strokeWidth="2"
            markerEnd="url(#ecpp-item16-arrow)"
          />

          <rect
            x="332"
            y="82"
            width="236"
            height="92"
            rx="12"
            fill={SUCCESS}
            fillOpacity="0.08"
            stroke={SUCCESS}
            strokeWidth="1.6"
          />
          <text
            x="450"
            y="110"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={SUCCESS}
          >
            lifetime evidence
          </text>
          <text
            x="450"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={PRIMARY}
          >
            construct / destroy each element
          </text>
          <text
            x="450"
            y="158"
            textAnchor="middle"
            fontSize="12"
            fill={SECONDARY}
          >
            array cookie may store count
          </text>

          <line
            x1="568"
            y1="128"
            x2="618"
            y2="128"
            stroke={SECONDARY}
            strokeWidth="2"
            markerEnd="url(#ecpp-item16-arrow)"
          />

          <rect
            x="636"
            y="82"
            width="236"
            height="92"
            rx="12"
            fill={WARNING}
            fillOpacity="0.08"
            stroke={WARNING}
            strokeWidth="1.6"
          />
          <text
            x="754"
            y="110"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={WARNING}
          >
            delete / delete[]
          </text>
          <text
            x="754"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={PRIMARY}
          >
            matching release entry
          </text>
          <text
            x="754"
            y="158"
            textAnchor="middle"
            fontSize="12"
            fill={SECONDARY}
          >
            never infer from T* alone
          </text>

          <line
            x1="28"
            y1="210"
            x2="872"
            y2="210"
            stroke={BORDER}
            strokeWidth="1"
            strokeDasharray="6 4"
          />
          <text x="28" y="238" fontSize="14" fontWeight="700" fill={PRIMARY}>
            三个审计问题
          </text>
          <circle cx="48" cy="270" r="7" fill={ACCENT} />
          <text x="68" y="275" fontSize="12" fill={PRIMARY}>
            new[] / delete[]：数组形式是否成对？
          </text>
          <circle cx="340" cy="270" r="7" fill={WARNING} />
          <text x="360" y="275" fontSize="12" fill={PRIMARY}>
            typedef：别名是否隐藏了数组性？
          </text>
          <circle cx="625" cy="270" r="7" fill={DANGER} />
          <text x="645" y="275" fontSize="12" fill={PRIMARY}>
            跨 heap / malloc：释放家族是否一致？
          </text>
          <rect
            x="28"
            y="304"
            width="844"
            height="32"
            rx="8"
            fill={ACCENT}
            fillOpacity="0.05"
            stroke={BORDER}
          />
          <text
            x="450"
            y="325"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={ACCENT}
          >
            typed owner（vector / array / {"unique_ptr<T[]>"} / custom
            deleter）让协议可检查
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先锁定 allocation form，再追踪构造、析构和最终释放；pointer
        类型本身不能证明数组性。
      </figcaption>
    </figure>
  );
}

export function EcppItem16MatchNewDeleteLab() {
  const [scenarioId, setScenarioId] = useState<ProtocolScenario["id"]>("array");
  const scenario =
    SCENARIOS.find((item) => item.id === scenarioId) ?? SCENARIOS[1];

  const reset = () => setScenarioId("array");

  return (
    <section
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="ecpp-item-16-match-new-delete-lab"
      aria-label={`Effective C++ Item 16 matching allocation form 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4 sm:p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Protocol lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            先预测：哪一个 delete 能证明释放协议匹配？
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            选择 allocation form，观察构造/析构证据和最终 deallocation
            family；故障注入只改变释放形式。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 16 matching new delete 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4 sm:p-5">
        <div
          role="tablist"
          aria-label="Item 16 allocation form 场景"
          className="grid min-w-0 gap-2 sm:grid-cols-2 lg:grid-cols-4"
        >
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
                <span className="block font-semibold">{item.label}</span>
                <span className="mt-1 block text-xs opacity-80">
                  {item.allocation}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid min-w-0 gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0 border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 760 230"
            role="img"
            aria-label={`${scenario.allocation} 经过 construction、element-wise destruction 到 ${scenario.release} 的 ${scenario.decision}`}
            className="block h-auto w-full"
          >
            <text
              x="380"
              y="24"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill={PRIMARY}
            >
              {scenario.label} · protocol trace
            </text>
            <rect
              x="24"
              y="56"
              width="196"
              height="70"
              rx="10"
              fill={ACCENT}
              fillOpacity="0.08"
              stroke={ACCENT}
              strokeWidth="1.5"
            />
            <text
              x="122"
              y="84"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={ACCENT}
            >
              allocation
            </text>
            <text
              x="122"
              y="108"
              textAnchor="middle"
              fontSize="12"
              fill={PRIMARY}
            >
              {scenario.allocation}
            </text>
            <Arrow x1={220} x2={278} y={91} />
            <rect
              x="296"
              y="56"
              width="196"
              height="70"
              rx="10"
              fill={SUCCESS}
              fillOpacity="0.08"
              stroke={SUCCESS}
              strokeWidth="1.5"
            />
            <text
              x="394"
              y="84"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={SUCCESS}
            >
              lifetime
            </text>
            <text
              x="394"
              y="108"
              textAnchor="middle"
              fontSize="12"
              fill={PRIMARY}
            >
              {scenario.array ? "elements / cookie" : "one object"}
            </text>
            <Arrow x1={492} x2={550} y={91} />
            <rect
              x="568"
              y="56"
              width="168"
              height="70"
              rx="10"
              fill={scenario.tone}
              fillOpacity="0.08"
              stroke={scenario.tone}
              strokeWidth="1.5"
            />
            <text
              x="652"
              y="84"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={scenario.tone}
            >
              release
            </text>
            <text
              x="652"
              y="108"
              textAnchor="middle"
              fontSize="12"
              fill={PRIMARY}
            >
              {scenario.release}
            </text>
            <line
              x1="24"
              y1="158"
              x2="736"
              y2="158"
              stroke={BORDER}
              strokeWidth="1"
              strokeDasharray="5 4"
            />
            <text
              x="24"
              y="184"
              fontSize="12"
              fontWeight="700"
              fill={SECONDARY}
            >
              应保存证据
            </text>
            <text x="24" y="207" fontSize="12" fill={PRIMARY}>
              {scenario.evidence}
            </text>
          </svg>
        </div>
        <div className="min-w-0 p-4 sm:p-5">
          <div
            role="status"
            aria-live="polite"
            className="rounded-control border border-border bg-bg p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              当前判定
            </p>
            <p
              className="mt-2 text-base font-semibold"
              style={{ color: scenario.tone }}
            >
              {scenario.decision}
            </p>
            <p className="mt-3 break-words text-sm leading-relaxed text-secondary">
              {scenario.evidence}
            </p>
          </div>
          <p className="mt-4 text-xs leading-5 text-secondary">
            审计提示：不要根据一次“没崩”推断安全；用非平凡析构对象、sanitizer
            和真实 allocator 配置复核。
          </p>
        </div>
      </div>
    </section>
  );
}
