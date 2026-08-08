"use client";

import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

const BEAT = TEACHING_BEAT_MS;

const ADOPTION_STEPS = [
  { label: "review", caption: "peer review" },
  { label: "portable", caption: "portable libraries" },
  { label: "standard", caption: "standardization" },
  { label: "adopt", caption: "component-level adoption" },
] as const satisfies readonly TeachingStep[];

const ADOPTION_LABELS = {
  review: "公开审查接口、测试与文档",
  portable: "在编译器与平台矩阵中验证",
  standard: "把实践证据带入标准化讨论",
  adopt: "按组件审计并用 adapter 隔离",
} as const;

type MigrationScenario = {
  label: string;
  signal: string;
  boundary: string;
  proof: string;
  decision: string;
  tone: string;
};

const MIGRATION_SCENARIOS: readonly MigrationScenario[] = [
  {
    label: "已有 std 对应物",
    signal: "std::filesystem / std::variant 已满足 baseline",
    boundary: "先保留内部 alias 或 adapter，不直接替换公共 ABI",
    proof: "API、异常、性能、ABI 与跨模块测试都通过后再收窄 Boost 依赖",
    decision: "优先规划渐进 Boost-to-std migration",
    tone: "var(--success)",
  },
  {
    label: "Boost contract 更完整",
    signal: "目标功能需要 MultiIndex / Asio 等标准尚未覆盖的 contract",
    boundary: "只引入一个组件，把 vendor types 留在 domain library adapter 后",
    proof: "记录版本、编译器矩阵、benchmark、license 和安全 owner",
    decision: "接受 component-level adoption，保留替换出口",
    tone: "var(--accent)",
  },
  {
    label: "旧 baseline 与 ABI 风险",
    signal: "客户仍依赖旧编译基线或跨模块 Boost ABI",
    boundary: "公共边界使用稳定领域类型，内部按版本切换实现",
    proof: "覆盖 old/new clients、custom deleter、异常、序列化和部署包",
    decision: "先治理依赖边界，再决定是否迁移",
    tone: "var(--warning)",
  },
] as const;

export function EcppItem55BoostLibraryMap() {
  return (
    <figure
      data-visual-kind="ecpp-item-55-boost-library-map"
      className="mdx-figure not-prose mx-auto my-8"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 980 360"
          role="img"
          aria-label="Boost library 生态图：peer review 形成证据，portable libraries 把证据带到多平台，standardization 吸收成熟实践，最终仍按组件选择并隔离依赖。"
          className="mx-auto block h-auto w-full max-w-[980px]"
        >
          <text
            x="490"
            y="30"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Boost：从实践证据到采用边界
          </text>
          <text
            x="490"
            y="55"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            生态角色不是“std 预览版”，而是一条可审计的证据链
          </text>

          <g>
            <rect
              x="34"
              y="96"
              width="202"
              height="152"
              rx="14"
              fill="var(--accent)"
              fillOpacity="0.1"
              stroke="var(--accent)"
              strokeWidth="1.8"
            />
            <text
              x="135"
              y="131"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="var(--accent)"
            >
              peer review
            </text>
            <text
              x="135"
              y="163"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              接口 · 实现 · 测试
            </text>
            <text
              x="135"
              y="188"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              文档与 generic contract
            </text>
            <text
              x="135"
              y="222"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              质量证据
            </text>
          </g>

          <path
            d="M236 172 H270"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M262 165 L274 172 L262 179"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="274"
              y="96"
              width="202"
              height="152"
              rx="14"
              fill="var(--success)"
              fillOpacity="0.1"
              stroke="var(--success)"
              strokeWidth="1.8"
            />
            <text
              x="375"
              y="131"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="var(--success)"
            >
              portable libraries
            </text>
            <text
              x="375"
              y="163"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              GCC · Clang · MSVC
            </text>
            <text
              x="375"
              y="188"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              OS / 标准库矩阵
            </text>
            <text
              x="375"
              y="222"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              可移植性证据
            </text>
          </g>

          <path
            d="M476 172 H510"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M502 165 L514 172 L502 179"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="514"
              y="96"
              width="202"
              height="152"
              rx="14"
              fill="var(--warning)"
              fillOpacity="0.1"
              stroke="var(--warning)"
              strokeWidth="1.8"
            />
            <text
              x="615"
              y="131"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="var(--warning)"
            >
              standardization
            </text>
            <text
              x="615"
              y="163"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              实现与用户反馈
            </text>
            <text
              x="615"
              y="188"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              提案 · 审议 · contract 调整
            </text>
            <text
              x="615"
              y="222"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              实践试验场
            </text>
          </g>

          <path
            d="M716 172 H750"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M742 165 L754 172 L742 179"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="754"
              y="96"
              width="192"
              height="152"
              rx="14"
              fill="var(--accent)"
              fillOpacity="0.06"
              stroke="var(--border)"
              strokeWidth="1.8"
            />
            <text
              x="850"
              y="131"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              component choice
            </text>
            <text
              x="850"
              y="163"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              Asio / MultiIndex / Math
            </text>
            <text
              x="850"
              y="188"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              adapter · 版本 · ABI
            </text>
            <text
              x="850"
              y="222"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              可撤销的采用决策
            </text>
          </g>

          <line
            x1="34"
            y1="292"
            x2="946"
            y2="292"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="6 5"
          />
          <text
            x="490"
            y="323"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            关键判断：证据可以进入标准化讨论，但采用决策仍以具体组件 contract
            为单位
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Boost 的价值在于把经过 peer review、portable libraries 和
        standardization 经验汇成可检查的组件选择证据。
      </figcaption>
    </figure>
  );
}

export function EcppItem55BoostAdoptionTimeline() {
  const reviewRef = useRef<SVGGElement | null>(null);
  const portableRef = useRef<SVGGElement | null>(null);
  const standardRef = useRef<SVGGElement | null>(null);
  const adoptRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: ADOPTION_STEPS,
    build: (tl) => {
      if (
        !reviewRef.current ||
        !portableRef.current ||
        !standardRef.current ||
        !adoptRef.current
      )
        return;
      tl.add(
        reviewRef.current,
        { opacity: [0, 1], duration: BEAT * 0.6, ease: "out(3)" },
        0,
      );
      tl.label("review", 0);
      tl.add(
        portableRef.current,
        { opacity: [0, 1], duration: BEAT * 0.6, ease: "out(3)" },
        BEAT,
      );
      tl.label("portable", BEAT);
      tl.add(
        standardRef.current,
        { opacity: [0, 1], duration: BEAT * 0.6, ease: "out(3)" },
        BEAT * 2,
      );
      tl.label("standard", BEAT * 2);
      tl.add(
        adoptRef.current,
        { opacity: [0, 1], duration: BEAT * 0.6, ease: "out(3)" },
        BEAT * 3,
      );
      tl.label("adopt", BEAT * 3);
    },
  });

  return (
    <figure
      data-visual-kind="ecpp-item-55-boost-adoption-timeline"
      className="mdx-figure not-prose mx-auto my-8"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 960 400"
          role="img"
          aria-label="Boost adoption workflow 教学时间线：peer review、portable libraries、standardization、component-level adoption 四个阶段可播放、单步和拖动查看。"
          className="mx-auto block h-auto w-full max-w-[960px]"
        >
          <text
            x="480"
            y="30"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Boost adoption workflow
          </text>
          <text
            x="480"
            y="55"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            每一步都要留下能让下一步复核的证据
          </text>
          <line
            x1="90"
            y1="190"
            x2="870"
            y2="190"
            stroke="var(--border)"
            strokeWidth="3"
          />

          <g ref={reviewRef} style={{ opacity: 0 }}>
            <circle
              cx="150"
              cy="190"
              r="34"
              fill="var(--accent)"
              fillOpacity="0.15"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x="150"
              y="185"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--accent)"
            >
              01
            </text>
            <text
              x="150"
              y="245"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              peer review
            </text>
            <text
              x="150"
              y="270"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              接口 / 测试 / 文档
            </text>
          </g>

          <g ref={portableRef} style={{ opacity: 0 }}>
            <circle
              cx="370"
              cy="190"
              r="34"
              fill="var(--success)"
              fillOpacity="0.15"
              stroke="var(--success)"
              strokeWidth="2"
            />
            <text
              x="370"
              y="185"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--success)"
            >
              02
            </text>
            <text
              x="370"
              y="245"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              portable libraries
            </text>
            <text
              x="370"
              y="270"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              平台 / 编译器矩阵
            </text>
          </g>

          <g ref={standardRef} style={{ opacity: 0 }}>
            <circle
              cx="590"
              cy="190"
              r="34"
              fill="var(--warning)"
              fillOpacity="0.15"
              stroke="var(--warning)"
              strokeWidth="2"
            />
            <text
              x="590"
              y="185"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--warning)"
            >
              03
            </text>
            <text
              x="590"
              y="245"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              standardization
            </text>
            <text
              x="590"
              y="270"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              实践反馈 / contract
            </text>
          </g>

          <g ref={adoptRef} style={{ opacity: 0 }}>
            <circle
              cx="810"
              cy="190"
              r="34"
              fill="var(--accent)"
              fillOpacity="0.15"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x="810"
              y="185"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--accent)"
            >
              04
            </text>
            <text
              x="810"
              y="245"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              component adoption
            </text>
            <text
              x="810"
              y="270"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              adapter / ABI / owner
            </text>
          </g>

          <path
            d="M190 190 H330 M410 190 H550 M630 190 H770"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M322 183 L334 190 L322 197 M542 183 L554 190 L542 197 M762 183 L774 190 L762 197"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <rect
            x="90"
            y="320"
            width="780"
            height="42"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <text
            x="480"
            y="346"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            当前阶段的证据必须能回答：为什么这个组件、这个版本、这个边界？
          </text>
        </svg>
        <TimelineControls
          timeline={timeline}
          labelText={ADOPTION_LABELS}
          caption="先停在任一步，检查它是否真的产生了可复核的采用证据。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Boost adoption workflow 时间线",
            onClick: () => timeline.goToStep(0),
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        采用流程把“Boost 很成熟”的直觉拆成 review、portability、standardization
        和组件审计四个可观察阶段。
      </figcaption>
    </figure>
  );
}

export function EcppItem55BoostMigrationLab() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario = MIGRATION_SCENARIOS[scenarioIndex];

  return (
    <section
      data-visual-kind="ecpp-item-55-boost-migration-lab"
      aria-label="Item 55 Boost-to-std migration 迁移决策实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4 sm:p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            Boost-to-std migration 决策实验
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测该场景应该替换、保留还是隔离 Boost，再查看边界与证据要求。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setScenarioIndex(0)}
          aria-label="重置 Boost-to-std migration 实验"
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div
        className="grid gap-3 border-b border-border p-4 sm:grid-cols-3 sm:p-5"
        role="tablist"
        aria-label="Boost 迁移场景"
      >
        {MIGRATION_SCENARIOS.map((item, index) => {
          const selected = index === scenarioIndex;
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-pressed={selected}
              onClick={() => setScenarioIndex(index)}
              className={`min-h-11 rounded-control border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                selected
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-accent"
              }`}
            >
              <span className="block font-semibold">{item.label}</span>
              <span className="mt-1 block text-xs opacity-80">
                场景 {index + 1}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_220px] sm:p-5">
        <div className="rounded-card border border-border p-4">
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: scenario.tone }}
              aria-hidden="true"
            />
            <p className="font-semibold text-primary">{scenario.signal}</p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="border-l-2 border-accent pl-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                边界
              </p>
              <p className="mt-1 text-sm leading-6 text-primary">
                {scenario.boundary}
              </p>
            </div>
            <div className="border-l-2 border-success pl-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                证据
              </p>
              <p className="mt-1 text-sm leading-6 text-primary">
                {scenario.proof}
              </p>
            </div>
            <div className="border-l-2 border-warning pl-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                判定
              </p>
              <p
                className="mt-1 text-sm font-semibold leading-6"
                style={{ color: scenario.tone }}
              >
                {scenario.decision}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-card border border-border bg-bg/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            检查顺序
          </p>
          <ol className="mt-3 space-y-3 text-sm text-primary">
            <li>
              <span className="mr-2 text-accent">01</span>先查 std contract
            </li>
            <li>
              <span className="mr-2 text-accent">02</span>再查 ABI 与 baseline
            </li>
            <li>
              <span className="mr-2 text-accent">03</span>最后定 adapter 边界
            </li>
          </ol>
        </div>
      </div>
      <p
        className="border-t border-border px-4 py-3 text-center text-xs text-secondary sm:px-5"
        role="status"
        aria-live="polite"
      >
        当前场景：{scenario.label}；迁移不是 namespace 替换，而是一次
        contract、证据和边界审计。
      </p>
    </section>
  );
}
