"use client";

import { useState, type ReactNode } from "react";

const palette = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  bg: "var(--bg)",
  border: "var(--border)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

function Frame({
  title,
  eyebrow,
  description,
  kind,
  reset,
  children,
}: {
  title: string;
  eyebrow: string;
  description: string;
  kind: string;
  reset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated text-primary shadow-sm"
      aria-label={`${title}实验`}
      data-tpp20-unit="tpp20-topic-05-good-enough-software"
      data-visual-kind={kind}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border bg-bg/70 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-accent">{eyebrow}</p>
          <h3 className="mt-1 text-base font-semibold">{title}</h3>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-secondary">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-control border border-border bg-bg px-3 text-sm font-semibold hover:border-accent"
          aria-label={`重置${title}实验`}
        >
          <span aria-hidden="true">↺</span>
          <span className="ml-2">重置</span>
        </button>
      </header>
      {children}
    </section>
  );
}

const scenarios = {
  emergency: {
    label: "紧急退款解释",
    user: "客服主管",
    goal: "30 秒内解释一笔退款为何不同",
    priority: ["可追溯", "可用性", "延迟"],
    threshold: "地区、规则版本和金额必须同屏；查询 P95 ≤ 2 秒",
    excluded: "不承诺在本周替换全部账务系统",
    color: palette.success,
  },
  export: {
    label: "月末财务导出",
    user: "财务复核员",
    goal: "在关账前复核所有例外税率",
    priority: ["正确性", "可追溯", "吞吐"],
    threshold: "每条例外能回到原始规则；异常行必须被标出",
    excluded: "不以实时查询速度换取规则缺失",
    color: palette.accent,
  },
  audit: {
    label: "外部争议审计",
    user: "合规审计员",
    goal: "重放某日一笔退款的裁决",
    priority: ["不可抵赖", "正确性", "可读性"],
    threshold: "原始输入、规则版本、操作者和结果可重放",
    excluded: "不接受“当前配置”代替历史证据",
    color: palette.warning,
  },
} as const;
type ScenarioId = keyof typeof scenarios;

export function Tpp20Topic05GoodEnoughSoftwareSystemLab() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("emergency");
  const model = scenarios[scenarioId];
  return (
    <Frame
      eyebrow="第 5 章专属解剖图 · 质量是用户需求"
      title="同一套退款系统，在不同用户任务下“够好”的阈值并不相同"
      description="选择一个真实任务。质量属性不能由开发者暗中排序：用户目标先决定优先级，再写成能拒绝实现的最低阈值。"
      kind="quality-demand-contract"
      reset={() => setScenarioId("emergency")}
    >
      <div className="grid gap-4 p-4 lg:grid-cols-[248px_1fr]">
        <div className="grid gap-2" aria-label="用户任务选择">
          {(Object.keys(scenarios) as ScenarioId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setScenarioId(id)}
              aria-pressed={scenarioId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${scenarioId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="block text-sm font-semibold text-primary">
                {scenarios[id].label}
              </span>
              <span className="mt-1 block text-xs text-secondary">
                用户：{scenarios[id].user}
              </span>
            </button>
          ))}
        </div>
        <div>
          <svg
            viewBox="0 0 760 334"
            role="img"
            aria-label={`${model.label}的质量需求、阈值和验收合同`}
            className="hidden h-auto w-full sm:block"
          >
            <defs>
              <marker
                id="quality-contract-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 Z" fill={model.color} />
              </marker>
            </defs>
            <text
              x="30"
              y="34"
              fontSize="13"
              fontWeight="700"
              fill={palette.text}
            >
              用户任务 → 排序后的质量属性 → 能拒绝实现的阈值 → 明示验收
            </text>
            <rect
              x="30"
              y="74"
              width="190"
              height="154"
              rx="14"
              fill={palette.bg}
              stroke={palette.border}
            />
            <text
              x="52"
              y="108"
              fontSize="13"
              fontWeight="700"
              fill={palette.text}
            >
              用户正在做什么？
            </text>
            <text
              x="52"
              y="140"
              fontSize="14"
              fontWeight="700"
              fill={model.color}
            >
              {model.goal.slice(0, 15)}
            </text>
            <text
              x="52"
              y="164"
              fontSize="14"
              fontWeight="700"
              fill={model.color}
            >
              {model.goal.slice(15)}
            </text>
            <text x="52" y="202" fontSize="12" fill={palette.muted}>
              裁决者：{model.user}
            </text>
            <path
              d="M220 151 H276"
              stroke={model.color}
              strokeWidth="3"
              markerEnd="url(#quality-contract-arrow)"
            />
            <rect
              x="288"
              y="74"
              width="174"
              height="154"
              rx="14"
              fill={model.color}
              fillOpacity="0.1"
              stroke={model.color}
              strokeWidth="2"
            />
            <text
              x="310"
              y="108"
              fontSize="13"
              fontWeight="700"
              fill={palette.text}
            >
              优先级（不是总分）
            </text>
            {model.priority.map((value, index) => (
              <g key={value}>
                <circle
                  cx="316"
                  cy={140 + index * 25}
                  r="9"
                  fill={model.color}
                />
                <text
                  x="316"
                  y={144 + index * 25}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={palette.bg}
                >
                  {index + 1}
                </text>
                <text
                  x="334"
                  y={144 + index * 25}
                  fontSize="12.5"
                  fill={palette.text}
                >
                  {value}
                </text>
              </g>
            ))}
            <path
              d="M462 151 H518"
              stroke={model.color}
              strokeWidth="3"
              markerEnd="url(#quality-contract-arrow)"
            />
            <rect
              x="530"
              y="74"
              width="198"
              height="154"
              rx="14"
              fill={palette.bg}
              stroke={palette.border}
            />
            <text
              x="552"
              y="108"
              fontSize="13"
              fontWeight="700"
              fill={palette.text}
            >
              最低可接受阈值
            </text>
            <text x="552" y="141" fontSize="12" fill={palette.muted}>
              {model.threshold.slice(0, 16)}
            </text>
            <text x="552" y="163" fontSize="12" fill={palette.muted}>
              {model.threshold.slice(16)}
            </text>
            <text
              x="552"
              y="201"
              fontSize="12"
              fontWeight="700"
              fill={palette.danger}
            >
              达不到：拒绝验收
            </text>
            <rect
              x="30"
              y="264"
              width="698"
              height="42"
              rx="10"
              fill={palette.bg}
              stroke={palette.border}
            />
            <text x="48" y="290" fontSize="12" fill={palette.text}>
              本轮明确不做：{model.excluded}
            </text>
          </svg>
          <div className="space-y-3 sm:hidden">
            <p className="rounded-control border border-border bg-bg p-3 text-sm text-primary">
              <strong>用户目标：</strong>
              {model.goal}
            </p>
            <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm text-primary">
              <strong>优先级：</strong>
              {model.priority.join(" → ")}
            </p>
            <p
              className="rounded-control border-l-4 bg-bg p-3 text-sm text-primary"
              style={{ borderColor: model.color }}
            >
              <strong>最低阈值：</strong>
              {model.threshold}
              <br />
              <strong>达不到：</strong>拒绝验收
            </p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

const proposals = {
  trace: {
    label: "保留规则版本和轨迹",
    benefit: "客服可解释，财务可追溯",
    cost: "本周多做一个只读查询接口",
    result: "满足已排序的前两项",
    color: palette.success,
  },
  cosmetic: {
    label: "先把页面改得更好看",
    benefit: "演示更顺滑",
    cost: "规则为何变化仍无答案",
    result: "没有触及用户阈值",
    color: palette.warning,
  },
  rewrite: {
    label: "顺便重写整套账务",
    benefit: "想象中的长期整洁",
    cost: "扩大到无法在当前任务验收",
    result: "范围失控，暂不接受",
    color: palette.danger,
  },
} as const;
type ProposalId = keyof typeof proposals;

export function Tpp20Topic05GoodEnoughSoftwareFeedbackLab() {
  const [proposalId, setProposalId] = useState<ProposalId>("trace");
  const proposal = proposals[proposalId];
  return (
    <Frame
      eyebrow="第 5 章专属决策 · 取舍必须可解释"
      title="把一个候选方案放到已同意的阈值前，而不是让开发者替用户做偏好判断"
      description="固定场景为“紧急退款解释”：规则版本、金额和地区要在同一轨迹里；查询 P95 要在两秒内。选择方案，查看它因何被接受、延期或拒绝。"
      kind="quality-tradeoff-decision"
      reset={() => setProposalId("trace")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(proposals) as ProposalId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setProposalId(id)}
              aria-pressed={proposalId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${proposalId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="text-sm font-semibold text-primary">
                {proposals[id].label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <article className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-semibold text-accent">冻结的用户阈值</p>
            <p className="mt-2 text-sm text-primary">
              地区、规则版本、金额同屏；P95 ≤ 2 秒。任一项缺失即不验收。
            </p>
          </article>
          <article
            className="rounded-control border p-4"
            style={{
              borderColor: proposal.color,
              backgroundColor:
                "color-mix(in srgb, var(--bg) 88%, var(--accent))",
            }}
          >
            <p
              className="text-xs font-semibold"
              style={{ color: proposal.color }}
            >
              当前方案
            </p>
            <p className="mt-2 text-sm font-semibold text-primary">
              {proposal.label}
            </p>
            <p className="mt-2 text-xs leading-5 text-secondary">
              {proposal.benefit}
            </p>
            <p className="mt-2 text-xs leading-5 text-secondary">
              代价：{proposal.cost}
            </p>
          </article>
          <article className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-semibold text-accent">用户裁决</p>
            <p
              className="mt-2 text-sm font-semibold"
              style={{ color: proposal.color }}
            >
              {proposal.result}
            </p>
            <p className="mt-2 text-xs text-secondary">
              这不是质量打分；理由必须能回到已写下的阈值。
            </p>
          </article>
        </div>
      </div>
    </Frame>
  );
}

const acceptanceStates = {
  accepted: {
    label: "显式同意：先交付轨迹查询",
    checks: ["规则版本存在", "地区与金额同屏", "P95 1.6 秒"],
    decision: "接受：范围冻结在只读查询",
    color: palette.success,
  },
  silent: {
    label: "静默降级：删掉规则版本",
    checks: ["规则版本缺失", "地区与金额同屏", "P95 1.1 秒"],
    decision: "拒绝：更快不能抵消不可追溯",
    color: palette.danger,
  },
  revised: {
    label: "重新协商：性能窗口放宽",
    checks: ["规则版本存在", "地区与金额同屏", "P95 2.4 秒（用户签字）"],
    decision: "接受：阈值变更和原因被记录",
    color: palette.accent,
  },
} as const;
type AcceptanceId = keyof typeof acceptanceStates;

export function Tpp20Topic05GoodEnoughSoftwareEvidenceLab() {
  const [stateId, setStateId] = useState<AcceptanceId>("accepted");
  const state = acceptanceStates[stateId];
  return (
    <Frame
      eyebrow="第 5 章专属验收 · 拒绝静默降级"
      title="验收记录要同时保存实际检查与谁同意改变阈值"
      description="切换三份验收记录。只有所有检查通过，或用户明确重写了阈值，才可交付；速度提升不能偷偷换走可追溯性。"
      kind="quality-acceptance-ledger"
      reset={() => setStateId("accepted")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(acceptanceStates) as AcceptanceId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setStateId(id)}
              aria-pressed={stateId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${stateId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="text-sm font-semibold text-primary">
                {acceptanceStates[id].label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_280px]">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-semibold text-accent">
              退款轨迹验收记录
            </p>
            <div className="mt-3 grid gap-2">
              {state.checks.map((check) => {
                const failed = check.includes("缺失");
                return (
                  <div
                    key={check}
                    className={`flex min-h-11 items-center rounded-control border px-3 text-sm ${failed ? "border-danger bg-danger/10 text-primary" : "border-success bg-success/10 text-primary"}`}
                  >
                    <span
                      className="mr-2 font-bold"
                      style={{
                        color: failed ? palette.danger : palette.success,
                      }}
                    >
                      {failed ? "×" : "✓"}
                    </span>
                    {check}
                  </div>
                );
              })}
            </div>
          </div>
          <aside
            className="rounded-control border p-4"
            style={{ borderColor: state.color }}
          >
            <p className="text-xs font-semibold" style={{ color: state.color }}>
              裁决与证据
            </p>
            <p className="mt-2 text-sm font-semibold text-primary">
              {state.decision}
            </p>
            <p className="mt-3 text-xs leading-5 text-secondary">
              若阈值改变，记录用户、时间、旧阈值、
              新阈值和不做什么；否则这一页是失败证据，不是发布许可。
            </p>
          </aside>
        </div>
      </div>
    </Frame>
  );
}
