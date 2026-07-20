"use client";

import { useState, type ReactNode } from "react";

const colors = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  bg: "var(--bg)",
  raised: "var(--bg-elevated)",
  border: "var(--border)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

function LabFrame({
  title,
  eyebrow,
  summary,
  kind,
  onReset,
  children,
}: {
  title: string;
  eyebrow: string;
  summary: string;
  kind: string;
  onReset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated text-primary shadow-sm"
      aria-label={`${title}实验`}
      data-tpp20-unit="tpp20-topic-04-stone-soup-boiled-frogs"
      data-visual-kind={kind}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border bg-bg/70 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-accent">{eyebrow}</p>
          <h3 className="mt-1 text-base font-semibold">{title}</h3>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-secondary">
            {summary}
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
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

const prototypeSteps = [
  {
    id: "vision",
    label: "问题卡",
    detail: "客服无法解释退款金额为何变化",
    owner: "产品",
    output: "只验证：例外税率是否可追溯",
  },
  {
    id: "demo",
    label: "可丢弃原型",
    detail: "一张退款轨迹卡：地区、规则、金额",
    owner: "开发",
    output: "录屏 + 假数据；不接生产",
  },
  {
    id: "invite",
    label: "具体参与",
    detail: "客服标出解释缺口；财务核对规则名",
    owner: "客服 / 财务",
    output: "两条可观察反例",
  },
  {
    id: "increment",
    label: "小增量",
    detail: "把轨迹接到一个沙盒订单",
    owner: "开发",
    output: "一个可回滚接口",
  },
  {
    id: "review",
    label: "全景复核",
    detail: "范围、客服工时、退款风险是否仍在边界内",
    owner: "共同",
    output: "继续 / 停止 / 缩小",
  },
] as const;

export function Tpp20Topic04StoneSoupBoiledFrogsSystemLab() {
  const [active, setActive] = useState(0);
  const item = prototypeSteps[active];
  return (
    <LabFrame
      eyebrow="第 4 章专属解剖图 · 原型如何催化参与"
      title="让一件可丢弃的东西，换来下一位参与者的具体证据"
      summary="这里的“石头”不是口号：它是不能直接上线、但能让客服与财务指出真实分歧的退款轨迹原型。点击任一步，查看交付物如何把责任交给下一位。"
      kind="prototype-catalyst-map"
      onReset={() => setActive(0)}
    >
      <div className="p-4">
        <svg
          viewBox="0 0 1040 390"
          role="img"
          aria-label="退款轨迹原型从问题卡到全景复核，逐步吸引产品、开发、客服和财务参与的因果图"
          className="hidden h-auto w-full md:block"
        >
          <defs>
            <marker
              id="stone-soup-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={colors.accent} />
            </marker>
          </defs>
          <text x="32" y="34" fontSize="13" fontWeight="700" fill={colors.text}>
            一个可丢弃的退款轨迹卡如何把“愿景”变成可参与的事实
          </text>
          <path
            d="M207 158 H233 M407 158 H433 M607 158 H633 M807 158 H833"
            stroke={colors.accent}
            strokeWidth="3"
            markerEnd="url(#stone-soup-arrow)"
          />
          {prototypeSteps.map((step, index) => {
            const x = 32 + index * 200;
            const isActive = active === index;
            return (
              <g
                key={step.id}
                role="button"
                tabIndex={0}
                className="cursor-pointer"
                aria-label={`查看${step.label}`}
                aria-pressed={isActive}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActive(index);
                  }
                }}
              >
                <rect
                  x={x}
                  y="87"
                  width="175"
                  height="145"
                  rx="14"
                  fill={isActive ? colors.accent : colors.bg}
                  fillOpacity={isActive ? 0.12 : 1}
                  stroke={isActive ? colors.accent : colors.border}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <circle
                  cx={x + 24}
                  cy="113"
                  r="13"
                  fill={isActive ? colors.accent : colors.muted}
                />
                <text
                  x={x + 24}
                  y="117"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={colors.bg}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 46}
                  y="118"
                  fontSize="13"
                  fontWeight="700"
                  fill={colors.text}
                >
                  {step.label}
                </text>
                <text x={x + 16} y="148" fontSize="11.5" fill={colors.muted}>
                  {step.detail.slice(0, 13)}
                </text>
                <text x={x + 16} y="168" fontSize="11.5" fill={colors.muted}>
                  {step.detail.slice(13)}
                </text>
                <text
                  x={x + 16}
                  y="205"
                  fontSize="11.5"
                  fontWeight="700"
                  fill={colors.success}
                >
                  交给：{step.owner}
                </text>
              </g>
            );
          })}
          <rect
            x="58"
            y="280"
            width="924"
            height="70"
            rx="12"
            fill={colors.bg}
            stroke={colors.border}
          />
          <text
            x="82"
            y="309"
            fontSize="12"
            fontWeight="700"
            fill={colors.text}
          >
            当前步骤的可验证输出
          </text>
          <text x="82" y="333" fontSize="13" fill={colors.accent}>
            {item.output}
          </text>
          <text
            x="692"
            y="309"
            fontSize="12"
            fontWeight="700"
            fill={colors.text}
          >
            故意保留的边界
          </text>
          <text x="692" y="333" fontSize="12" fill={colors.muted}>
            原型不能替代生产实现；它只让分歧在低成本时出现。
          </text>
        </svg>
        <div className="grid gap-2 md:hidden">
          {prototypeSteps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={active === index}
              className={`min-h-11 rounded-control border p-3 text-left ${active === index ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="text-xs font-semibold text-accent">
                {index + 1}. {step.label} · {step.owner}
              </span>
              <span className="mt-1 block text-sm text-primary">
                {step.detail}
              </span>
            </button>
          ))}
          <p className="rounded-control border border-success bg-success/10 p-3 text-sm text-primary">
            <strong>可验证输出：</strong>
            {item.output}
          </p>
        </div>
      </div>
    </LabFrame>
  );
}

const costs = {
  low: {
    label: "15 分钟看录屏",
    people: ["客服", "财务"],
    evidence: "各自指出一处解释不了的字段",
    effect: "低成本足以暴露术语分歧，但不能确认真实订单路径。",
    color: colors.success,
  },
  medium: {
    label: "45 分钟共看沙盒订单",
    people: ["客服", "财务", "开发"],
    evidence: "一笔订单的规则、金额和话术能逐格核对",
    effect: "参与者能共同决定最小接口，但范围仍被冻结。",
    color: colors.accent,
  },
  high: {
    label: "先开一周全量改造会",
    people: ["负责人"],
    evidence: "没有可被外部检查的订单轨迹",
    effect: "成本先于证据；原本能参与的人被会议门槛排除。",
    color: colors.warning,
  },
} as const;

type CostId = keyof typeof costs;

export function Tpp20Topic04StoneSoupBoiledFrogsFeedbackLab() {
  const [costId, setCostId] = useState<CostId>("low");
  const model = costs[costId];
  return (
    <LabFrame
      eyebrow="第 4 章专属实验 · 只改变参与成本"
      title="同一个退款原型，参与门槛会改变谁带来哪一种证据"
      summary="催化剂固定为“退款轨迹卡”。选择一次参与的成本；观察首先改变的不是团队热情，而是能够抵达原型、提出反例的人和证据种类。"
      kind="participation-cost-loop"
      onReset={() => setCostId("low")}
    >
      <div className="grid gap-4 p-4 lg:grid-cols-[280px_1fr]">
        <div className="grid gap-2" aria-label="参与成本选择">
          {(Object.keys(costs) as CostId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setCostId(id)}
              aria-pressed={costId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${costId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="block text-sm font-semibold text-primary">
                {costs[id].label}
              </span>
              <span className="mt-1 block text-xs text-secondary">
                只改变这一个条件
              </span>
            </button>
          ))}
        </div>
        <div>
          <svg
            viewBox="0 0 740 310"
            role="img"
            aria-label={`${model.label}时，参与者和反馈证据的变化图`}
            className="hidden h-auto w-full sm:block"
          >
            <defs>
              <marker
                id="cost-arrow"
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
              x="28"
              y="32"
              fontSize="13"
              fontWeight="700"
              fill={colors.text}
            >
              固定原型，唯一变量是“加入一次需要付出的时间”
            </text>
            <rect
              x="30"
              y="71"
              width="178"
              height="122"
              rx="14"
              fill={colors.bg}
              stroke={colors.border}
            />
            <text
              x="54"
              y="104"
              fontSize="13"
              fontWeight="700"
              fill={colors.text}
            >
              退款轨迹卡
            </text>
            <text x="54" y="132" fontSize="12" fill={colors.muted}>
              地区 · 规则 · 金额
            </text>
            <text x="54" y="154" fontSize="12" fill={colors.muted}>
              同一份可丢弃原型
            </text>
            <path
              d="M208 132 H275"
              stroke={model.color}
              strokeWidth="3"
              markerEnd="url(#cost-arrow)"
            />
            <rect
              x="285"
              y="71"
              width="178"
              height="122"
              rx="14"
              fill={model.color}
              fillOpacity="0.1"
              stroke={model.color}
              strokeWidth="2"
            />
            <text
              x="309"
              y="104"
              fontSize="13"
              fontWeight="700"
              fill={colors.text}
            >
              参与成本
            </text>
            <text
              x="309"
              y="138"
              fontSize="14"
              fontWeight="700"
              fill={model.color}
            >
              {model.label}
            </text>
            <text x="309" y="164" fontSize="11.5" fill={colors.muted}>
              首个变化：谁能到场
            </text>
            <path
              d="M463 132 H530"
              stroke={model.color}
              strokeWidth="3"
              markerEnd="url(#cost-arrow)"
            />
            <rect
              x="540"
              y="52"
              width="170"
              height="160"
              rx="14"
              fill={colors.bg}
              stroke={colors.border}
            />
            <text
              x="564"
              y="86"
              fontSize="13"
              fontWeight="700"
              fill={colors.text}
            >
              实际反馈
            </text>
            {model.people.map((person, index) => (
              <g key={person}>
                <circle
                  cx="574"
                  cy={116 + index * 26}
                  r="8"
                  fill={model.color}
                />
                <text
                  x="590"
                  y={121 + index * 26}
                  fontSize="12"
                  fill={colors.text}
                >
                  {person}
                </text>
              </g>
            ))}
            <rect
              x="30"
              y="240"
              width="680"
              height="44"
              rx="10"
              fill={colors.bg}
              stroke={colors.border}
            />
            <text x="48" y="268" fontSize="12" fill={colors.text}>
              留下的证据：{model.evidence}
            </text>
          </svg>
          <div className="sm:hidden rounded-control border border-border bg-bg p-3 text-sm text-primary">
            <p>
              <strong>固定对象：</strong>退款轨迹卡（地区、规则、金额）
            </p>
            <p className="mt-2">
              <strong>首先变化：</strong>谁能参与 — {model.people.join("、")}
            </p>
            <p className="mt-2">
              <strong>留下证据：</strong>
              {model.evidence}
            </p>
          </div>
          <p
            className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm text-primary"
            style={{ borderColor: model.color }}
          >
            {model.effect}
          </p>
        </div>
      </div>
    </LabFrame>
  );
}

const driftStates = {
  baseline: {
    label: "基线：每个增量回到边界",
    scope: ["退款轨迹", "一个沙盒订单", "客服话术"],
    checkpoint: "每周复核范围、工时、退款风险",
    outcome: "继续下一个小增量",
    color: colors.success,
  },
  hidden: {
    label: "故障：慢慢加项但不复核",
    scope: ["退款轨迹", "生产改造", "全量账务重算", "客服培训"],
    checkpoint: "“先做完再看”",
    outcome: "停止条件失效；风险已跨出原型边界",
    color: colors.danger,
  },
  recovered: {
    label: "恢复：删回原假设，再作决定",
    scope: ["退款轨迹", "一个沙盒订单", "明确不做生产迁移"],
    checkpoint: "记录被拒绝的扩项与下一次复核日期",
    outcome: "缩小范围后继续验证",
    color: colors.accent,
  },
} as const;
type DriftId = keyof typeof driftStates;

export function Tpp20Topic04StoneSoupBoiledFrogsEvidenceLab() {
  const [stateId, setStateId] = useState<DriftId>("baseline");
  const state = driftStates[stateId];
  return (
    <LabFrame
      eyebrow="第 4 章专属诊断 · 缓慢范围漂移"
      title="复核点不是汇报会：它必须能阻止一个具体扩项进入原型"
      summary="切换基线、未复核的漂移和恢复状态。范围卡越过虚线时，系统应在“参与 / 增量”附近停下，而不是把失控包装成完成。"
      kind="scope-drift-recovery"
      onReset={() => setStateId("baseline")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(driftStates) as DriftId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setStateId(id)}
              aria-pressed={stateId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${stateId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="text-sm font-semibold text-primary">
                {driftStates[id].label}
              </span>
            </button>
          ))}
        </div>
        <svg
          viewBox="0 0 980 324"
          role="img"
          aria-label={`${state.label}下退款轨迹原型的范围漂移和复核结果`}
          className="mt-4 hidden h-auto w-full md:block"
        >
          <text x="30" y="33" fontSize="13" fontWeight="700" fill={colors.text}>
            范围卡必须留在原型边界内；越线的那一刻就是需要停止或缩小的可观察事件
          </text>
          <rect
            x="36"
            y="72"
            width="560"
            height="170"
            rx="16"
            fill={colors.bg}
            stroke={colors.accent}
            strokeWidth="2"
            strokeDasharray="8 6"
          />
          <text
            x="56"
            y="101"
            fontSize="12"
            fontWeight="700"
            fill={colors.accent}
          >
            原型边界：只验证“退款能否被解释”
          </text>
          {state.scope.map((item, index) => {
            const beyond = index > 2;
            return (
              <g key={item}>
                <rect
                  x={64 + index * 154}
                  y={132}
                  width="132"
                  height="54"
                  rx="10"
                  fill={beyond ? colors.danger : state.color}
                  fillOpacity={beyond ? 0.12 : 0.1}
                  stroke={beyond ? colors.danger : state.color}
                />
                <text
                  x={130 + index * 154}
                  y={164}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={colors.text}
                >
                  {item}
                </text>
              </g>
            );
          })}
          <path d="M624 158 H668" stroke={state.color} strokeWidth="3" />
          <path d="M668 158 l-10 -7 v14 z" fill={state.color} />
          <rect
            x="690"
            y="82"
            width="244"
            height="142"
            rx="14"
            fill={state.color}
            fillOpacity="0.1"
            stroke={state.color}
            strokeWidth="2"
          />
          <text
            x="712"
            y="115"
            fontSize="13"
            fontWeight="700"
            fill={colors.text}
          >
            全景复核点
          </text>
          <text x="712" y="147" fontSize="12" fill={colors.muted}>
            {state.checkpoint}
          </text>
          <text
            x="712"
            y="188"
            fontSize="13"
            fontWeight="700"
            fill={state.color}
          >
            {state.outcome}
          </text>
          {stateId === "hidden" && (
            <text
              x="476"
              y="221"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={colors.danger}
            >
              越过原型边界，却没有一个停止动作
            </text>
          )}
        </svg>
        <div className="mt-4 grid gap-3 md:hidden">
          <p className="text-xs font-semibold text-accent">
            原型边界：只验证退款能否被解释
          </p>
          {state.scope.map((item, index) => (
            <div
              key={item}
              className={`rounded-control border p-3 text-sm font-semibold ${index > 2 ? "border-danger bg-danger/10 text-primary" : "border-accent bg-bg text-primary"}`}
            >
              {item}
              {index > 2 ? "（越过边界）" : ""}
            </div>
          ))}
          <p
            className="rounded-control border-l-4 bg-bg p-3 text-sm text-primary"
            style={{ borderColor: state.color }}
          >
            <strong>复核点：</strong>
            {state.checkpoint}
            <br />
            <strong>结果：</strong>
            {state.outcome}
          </p>
        </div>
      </div>
    </LabFrame>
  );
}
