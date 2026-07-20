"use client";

import { useState, type ReactNode } from "react";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const surface = "var(--bg)";
const elevated = "var(--bg-elevated)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

type SmellId = "copy" | "flaky" | "deprecated";
type TeamChoice = "leave" | "copyOnce" | "repair";
type EntropyState = "baseline" | "unguarded" | "guarded";

const smells = {
  copy: {
    label: "重复的税率判断",
    crack: "结算服务和退款服务各自复制了税率例外判断",
    spread: ["新地区规则只改了结算", "退款继续按旧税率", "客服收到两种金额"],
    repair: "提取唯一税率规则，并让两个入口调用同一处",
    guard: "在两个入口写同一组边界样本，阻止再次复制",
  },
  flaky: {
    label: "偶发的异步测试",
    crack: "测试依赖固定等待 200ms，而不是等待实际事件",
    spread: [
      "重跑被视为正常",
      "失败日志不再被阅读",
      "相邻测试开始共享脆弱等待",
    ],
    repair: "等待可观察事件，并保留超时诊断信息",
    guard: "CI 将重复失败标为阻断，不能用重跑掩盖",
  },
  deprecated: {
    label: "过期的配置开关",
    crack: "旧开关仍在生产路径，但没人能解释它的拥有者",
    spread: ["新功能沿用旧默认值", "排障时切错开关", "清理成本随依赖增长"],
    repair: "记录拥有者和替代开关，删除无效分支",
    guard: "配置评审要求到期日、所有者和移除验证",
  },
} as const;

const choices = {
  leave: {
    label: "先不碰它",
    consequence: "下一次需求会把这处异常当作既有规范。",
    next: "坏味道仍在，默认容忍开始形成。",
    color: danger,
  },
  copyOnce: {
    label: "只复制这一次",
    consequence: "局部交付变快，但两个位置从此需要同步理解。",
    next: "复制扩散；下一位开发者看见的是两份“真相”。",
    color: warning,
  },
  repair: {
    label: "先修小边界",
    consequence: "以一个受控改动消除异常，并让检查守住修复。",
    next: "修复成为新默认；后续变化有单一入口。",
    color: success,
  },
} as const;

const stateCopy = {
  baseline: {
    label: "基线：发现裂缝后立即标记",
    detail: "一处坏味道仍可定位；团队还没有把它当成普通做法。",
  },
  unguarded: {
    label: "故障：修复没有守护",
    detail: "即使这次补了洞，下一次复制仍会把裂缝带回系统。",
  },
  guarded: {
    label: "恢复：修复与守护同时存在",
    detail: "规则、边界样本和责任人共同阻止熵重新扩散。",
  },
} as const;

function Frame({
  eyebrow,
  title,
  description,
  kind,
  onReset,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  kind: string;
  onReset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated text-primary shadow-sm"
      aria-label={`${title}实验`}
      data-tpp20-unit="tpp20-topic-03-software-entropy"
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

function EntropySystemDiagram({
  smellId,
  activeStep,
  onStep,
}: {
  smellId: SmellId;
  activeStep: number;
  onStep: (value: number) => void;
}) {
  const model = smells[smellId];
  const nodes = [
    ["坏味道", model.crack, danger],
    ["默认容忍", "“以后再说”让异常变成下一次改动的背景。", warning],
    ["复制扩散", model.spread[activeStep], danger],
    ["修复", model.repair, accent],
    ["守护", model.guard, success],
  ] as const;
  return (
    <>
      <svg
        viewBox="0 0 980 522"
        role="img"
        aria-label={`${model.label}从一处裂缝演变为默认容忍和复制扩散，再由修复与守护阻断的破窗模型`}
        className="hidden h-auto w-full md:block"
      >
        <defs>
          <marker
            id="entropy-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={accent} />
          </marker>
          <marker
            id="entropy-danger"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={danger} />
          </marker>
        </defs>
        <text x="34" y="36" fontSize="13" fontWeight="700" fill={primary}>
          熵不是数字：它是“这次容忍”如何改变下一位开发者会复制什么的路径
        </text>
        <path
          d="M168 177 H198"
          stroke={danger}
          strokeWidth="3"
          markerEnd="url(#entropy-danger)"
        />
        <path
          d="M358 177 H388"
          stroke={danger}
          strokeWidth="3"
          markerEnd="url(#entropy-danger)"
        />
        <path
          d="M548 177 H578"
          stroke={accent}
          strokeWidth="3"
          markerEnd="url(#entropy-arrow)"
        />
        <path
          d="M738 177 H768"
          stroke={success}
          strokeWidth="3"
          markerEnd="url(#entropy-arrow)"
        />
        {nodes.map(([label, detail, color], index) => {
          const x = 20 + index * 190;
          const active = index === 2 || activeStep === index;
          return (
            <g key={label} opacity={active ? 1 : 0.7}>
              <path
                d={`M${x} 94 H${x + 132} L${x + 152} 114 V240 L${x + 132} 260 H${x} Z`}
                fill={color}
                fillOpacity={active ? 0.1 : 0.045}
                stroke={color}
                strokeWidth={active ? 2.5 : 1.5}
              />
              <circle cx={x + 24} cy="122" r="12" fill={color} />
              <text
                x={x + 24}
                y="127"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={surface}
              >
                {index + 1}
              </text>
              <text
                x={x + 45}
                y="127"
                fontSize="13"
                fontWeight="700"
                fill={primary}
              >
                {label}
              </text>
              <foreignObject x={x + 18} y="150" width="116" height="78">
                <p className="m-0 text-xs leading-5 text-secondary">{detail}</p>
              </foreignObject>
            </g>
          );
        })}
        <path
          d="M854 260 V316 Q854 338 832 338 H164 Q142 338 142 316 V276"
          fill="none"
          stroke={success}
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#entropy-arrow)"
        />
        <text
          x="466"
          y="326"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={success}
        >
          守护把下一次改动送回单一规则，而不是送回新的复制
        </text>
        <rect
          x="74"
          y="390"
          width="832"
          height="72"
          rx="12"
          fill={elevated}
          stroke={border}
        />
        <text x="98" y="420" fontSize="12" fontWeight="700" fill={primary}>
          点击复制痕迹，检查“坏味道”如何沿团队行为传播
        </text>
        {model.spread.map((item, index) => (
          <g
            key={item}
            role="button"
            tabIndex={0}
            aria-label={`查看第${index + 1}条扩散痕迹：${item}`}
            aria-pressed={activeStep === index}
            className="cursor-pointer"
            onClick={() => onStep(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onStep(index);
              }
            }}
          >
            <rect
              x={98 + index * 260}
              y="430"
              width="238"
              height="24"
              rx="12"
              fill={activeStep === index ? danger : surface}
              fillOpacity={activeStep === index ? 0.18 : 1}
              stroke={activeStep === index ? danger : border}
            />
            <text
              x={217 + index * 260}
              y="447"
              textAnchor="middle"
              fontSize="11.5"
              fill={primary}
            >
              {item}
            </text>
          </g>
        ))}
      </svg>
      <div className="grid gap-3 md:hidden">
        {nodes.map(([label, detail, color], index) => (
          <div key={label}>
            <div
              className={`rounded-control border-l-4 bg-bg p-3 ${index < 3 ? "border-danger" : index === 3 ? "border-accent" : "border-success"}`}
            >
              <p className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {label}
              </p>
              <p className="mt-1 text-sm leading-5 text-primary">{detail}</p>
            </div>
            {index < nodes.length - 1 && (
              <div
                className="py-1 text-center text-xl text-accent"
                aria-hidden="true"
              >
                ↓
              </div>
            )}
          </div>
        ))}
        <div>
          <p className="mb-2 text-xs font-semibold text-danger">复制痕迹</p>
          <div className="grid gap-2">
            {model.spread.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => onStep(index)}
                aria-pressed={activeStep === index}
                className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs ${activeStep === index ? "border-danger bg-danger/10 text-primary" : "border-border bg-bg text-secondary"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function Tpp20Topic03SoftwareEntropySystemLab() {
  const [smellId, setSmellId] = useState<SmellId>("copy");
  const [activeStep, setActiveStep] = useState(0);
  const reset = () => {
    setSmellId("copy");
    setActiveStep(0);
  };
  return (
    <Frame
      eyebrow="第 1 章专属解剖图 · 破窗与熵"
      title="看见裂缝如何改变团队的默认动作"
      description="选择一种真实坏味道，再沿“容忍—复制—修复—守护”追踪它。图中没有伪造熵分数，只有可检查的传播痕迹。"
      kind="software-entropy-window"
      onReset={reset}
    >
      <div className="p-4">
        <div className="flex flex-wrap gap-2" aria-label="选择软件坏味道">
          {(Object.keys(smells) as SmellId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setSmellId(id);
                setActiveStep(0);
              }}
              aria-pressed={smellId === id}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs font-semibold ${smellId === id ? "border-danger bg-danger/10 text-primary" : "border-border bg-bg text-secondary"}`}
            >
              {smells[id].label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-card border border-border bg-bg p-3 sm:p-4">
          <EntropySystemDiagram
            smellId={smellId}
            activeStep={activeStep}
            onStep={setActiveStep}
          />
        </div>
      </div>
    </Frame>
  );
}

function ChoiceDiagram({ choiceId }: { choiceId: TeamChoice }) {
  const choice = choices[choiceId];
  return (
    <>
      <svg
        viewBox="0 0 980 438"
        role="img"
        aria-label={`面对重复税率判断时选择${choice.label}，展示它对下一次改动默认行为的影响`}
        className="hidden h-auto w-full md:block"
      >
        <defs>
          <marker
            id="choice-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={choice.color} />
          </marker>
        </defs>
        <text x="34" y="36" fontSize="13" fontWeight="700" fill={primary}>
          只改变团队的一个决定：留下、复制或修复；观察下一次改动继承的默认行为
        </text>
        <g>
          <path
            d="M54 104 H260 Q280 104 280 124 V254 Q280 274 260 274 H54 Z"
            fill={danger}
            fillOpacity="0.07"
            stroke={danger}
            strokeWidth="2"
          />
          <text x="78" y="137" fontSize="12" fontWeight="700" fill={danger}>
            现在看见的裂缝
          </text>
          <text x="78" y="172" fontSize="15" fontWeight="700" fill={primary}>
            两处税率规则不同步
          </text>
          <text x="78" y="207" fontSize="12" fill={secondary}>
            同一个业务问题已有两份实现
          </text>
        </g>
        <path
          d="M280 189 H370"
          stroke={choice.color}
          strokeWidth="3"
          markerEnd="url(#choice-arrow)"
        />
        <g>
          <path
            d="M390 104 H592 Q612 104 612 124 V254 Q612 274 592 274 H390 Z"
            fill={choice.color}
            fillOpacity="0.08"
            stroke={choice.color}
            strokeWidth="2"
          />
          <text
            x="414"
            y="137"
            fontSize="12"
            fontWeight="700"
            fill={choice.color}
          >
            这次团队选择
          </text>
          <text x="414" y="177" fontSize="17" fontWeight="700" fill={primary}>
            {choice.label}
          </text>
          <foreignObject x="414" y="196" width="162" height="50">
            <p className="m-0 text-xs leading-5 text-secondary">
              {choice.consequence}
            </p>
          </foreignObject>
        </g>
        <path
          d="M612 189 H702"
          stroke={choice.color}
          strokeWidth="3"
          markerEnd="url(#choice-arrow)"
        />
        <g>
          <path
            d="M722 104 H924 Q944 104 944 124 V254 Q944 274 924 274 H722 Z"
            fill={choice.color}
            fillOpacity="0.08"
            stroke={choice.color}
            strokeWidth="2"
          />
          <text
            x="746"
            y="137"
            fontSize="12"
            fontWeight="700"
            fill={choice.color}
          >
            下一次改动看到的默认
          </text>
          <foreignObject x="746" y="162" width="156" height="65">
            <p className="m-0 text-sm font-semibold leading-5 text-primary">
              {choice.next}
            </p>
          </foreignObject>
        </g>
        <path
          d="M500 274 V334"
          stroke={choice.color}
          strokeWidth="3"
          markerEnd="url(#choice-arrow)"
        />
        <rect
          x="238"
          y="334"
          width="524"
          height="56"
          rx="28"
          fill={choice.color}
          fillOpacity="0.08"
          stroke={choice.color}
        />
        <text
          x="500"
          y="367"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={primary}
        >
          {choiceId === "repair"
            ? "修复的价值在于改变后续行为，不是单次整洁。"
            : "这次小妥协会成为下一次“合理的做法”。"}
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <div className="rounded-control border-l-4 border-danger bg-elevated p-3">
          <p className="text-xs font-semibold text-danger">现在的裂缝</p>
          <p className="mt-1 text-sm text-primary">两处税率规则不同步。</p>
        </div>
        <div
          className="text-center text-xl"
          style={{ color: choice.color }}
          aria-hidden="true"
        >
          ↓
        </div>
        <div
          className="rounded-control border-2 bg-bg p-3"
          style={{ borderColor: choice.color }}
        >
          <p className="text-xs font-semibold" style={{ color: choice.color }}>
            这次选择：{choice.label}
          </p>
          <p className="mt-1 text-sm text-primary">{choice.consequence}</p>
        </div>
        <div
          className="text-center text-xl"
          style={{ color: choice.color }}
          aria-hidden="true"
        >
          ↓
        </div>
        <div
          className="rounded-control border p-3"
          style={{ borderColor: choice.color }}
        >
          <p className="text-xs font-semibold" style={{ color: choice.color }}>
            下一次默认
          </p>
          <p className="mt-1 text-sm text-primary">{choice.next}</p>
        </div>
      </div>
    </>
  );
}

export function Tpp20Topic03SoftwareEntropyFeedbackLab() {
  const [choiceId, setChoiceId] = useState<TeamChoice>("repair");
  const reset = () => setChoiceId("repair");
  return (
    <Frame
      eyebrow="第 1 章专属交互图 · 默认行为"
      title="一次选择怎样塑造下一次复制"
      description="这里不以“债务指数”评分。只改变这次面对裂缝的行动，观察下一位开发者会继承哪一种默认做法。"
      kind="entropy-default-propagation"
      onReset={reset}
    >
      <div className="p-4">
        <div
          className="grid gap-2 sm:grid-cols-3"
          aria-label="选择团队面对裂缝的行动"
        >
          {(Object.keys(choices) as TeamChoice[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setChoiceId(id)}
              aria-pressed={choiceId === id}
              className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs font-semibold ${choiceId === id ? (id === "repair" ? "border-success bg-success/10 text-primary" : "border-danger bg-danger/10 text-primary") : "border-border bg-bg text-secondary"}`}
            >
              {choices[id].label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-card border border-border bg-bg p-3 sm:p-4">
          <ChoiceDiagram choiceId={choiceId} />
        </div>
      </div>
    </Frame>
  );
}

function GuardDiagram({ state }: { state: EntropyState }) {
  const unguarded = state === "unguarded";
  const guarded = state === "guarded";
  const color = unguarded ? danger : success;
  return (
    <>
      <svg
        viewBox="0 0 980 454"
        role="img"
        aria-label={`${stateCopy[state].label}，展示修复后是否有规则、测试和所有者阻止同类复制`}
        className="hidden h-auto w-full md:block"
      >
        <defs>
          <marker
            id="guard-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={color} />
          </marker>
        </defs>
        <text x="34" y="36" fontSize="13" fontWeight="700" fill={primary}>
          {stateCopy[state].label}
        </text>
        <g>
          <circle
            cx="152"
            cy="189"
            r="82"
            fill={danger}
            fillOpacity="0.07"
            stroke={danger}
            strokeWidth="2"
          />
          <text
            x="152"
            y="160"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={danger}
          >
            原始裂缝
          </text>
          <text
            x="152"
            y="190"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={primary}
          >
            重复税率判断
          </text>
          <text
            x="152"
            y="216"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            两处实现开始不同步
          </text>
        </g>
        <path
          d="M234 189 H322"
          stroke={color}
          strokeWidth="3"
          markerEnd="url(#guard-arrow)"
        />
        <g>
          <path
            d="M342 105 H592 Q612 105 612 125 V253 Q612 273 592 273 H342 Z"
            fill={accent}
            fillOpacity="0.06"
            stroke={color}
            strokeWidth="2"
          />
          <text x="366" y="140" fontSize="12" fontWeight="700" fill={color}>
            这次修复
          </text>
          <text x="366" y="174" fontSize="15" fontWeight="700" fill={primary}>
            提取唯一税率规则
          </text>
          <text x="366" y="205" fontSize="12" fill={secondary}>
            结算与退款从同一入口读取规则
          </text>
        </g>
        {unguarded ? (
          <g>
            <path
              d="M612 189 H682"
              stroke={danger}
              strokeWidth="3"
              strokeDasharray="8 6"
            />
            <path
              d="M642 170 L668 208 M668 170 L642 208"
              stroke={danger}
              strokeWidth="5"
            />
            <text
              x="655"
              y="234"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={danger}
            >
              没有守护
            </text>
          </g>
        ) : (
          <path
            d="M612 189 H702"
            stroke={success}
            strokeWidth="3"
            markerEnd="url(#guard-arrow)"
          />
        )}
        <g opacity={unguarded ? 0.3 : 1}>
          <path
            d="M722 105 H924 Q944 105 944 125 V253 Q944 273 924 273 H722 Z"
            fill={success}
            fillOpacity="0.07"
            stroke={success}
            strokeWidth="2"
          />
          <text x="746" y="140" fontSize="12" fontWeight="700" fill={success}>
            守护网
          </text>
          <text x="746" y="171" fontSize="12" fill={primary}>
            规则拥有者
          </text>
          <text x="746" y="198" fontSize="12" fill={primary}>
            {guarded ? "双入口边界测试 + CI 阻断" : "等待下一次复制再次暴露"}
          </text>
          <text x="746" y="228" fontSize="12" fill={secondary}>
            {guarded ? "同类异常不能静默进入主干" : "修复只是一份局部记忆"}
          </text>
        </g>
        {!unguarded && (
          <path
            d="M820 273 V330 Q820 348 802 348 H152 Q132 348 132 328 V285"
            fill="none"
            stroke={success}
            strokeWidth="3"
            strokeDasharray="8 6"
            markerEnd="url(#guard-arrow)"
          />
        )}
        <rect
          x="54"
          y="380"
          width="870"
          height="48"
          rx="10"
          fill={color}
          fillOpacity="0.07"
          stroke={color}
        />
        <text x="76" y="410" fontSize="12" fontWeight="700" fill={color}>
          {unguarded ? "首差：" : guarded ? "恢复证据：" : "基线检查："}
        </text>
        <text x="148" y="410" fontSize="12" fill={primary}>
          {stateCopy[state].detail}
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <div className="rounded-control border-l-4 border-danger bg-elevated p-3">
          <p className="text-xs font-semibold text-danger">原始裂缝</p>
          <p className="mt-1 text-sm text-primary">
            重复税率判断，两个入口已不同步。
          </p>
        </div>
        <div className="text-center text-xl text-secondary" aria-hidden="true">
          ↓
        </div>
        <div className="rounded-control border-2 border-accent bg-accent/5 p-3">
          <p className="text-xs font-semibold text-accent">这次修复</p>
          <p className="mt-1 text-sm text-primary">
            提取唯一税率规则，让两个入口调用同一处。
          </p>
        </div>
        <div className="text-center text-xl text-secondary" aria-hidden="true">
          ↓
        </div>
        <div
          className={`rounded-control border p-3 ${unguarded ? "border-dashed border-danger opacity-55" : "border-success"}`}
        >
          <p className="text-xs font-semibold text-success">守护网</p>
          <p className="mt-1 text-sm text-primary">
            {unguarded
              ? "没有拥有者和边界测试；下一次复制仍可进入。"
              : guarded
                ? "拥有者、双入口边界测试和 CI 阻断同时存在。"
                : "修复已完成，尚待确认守护是否存在。"}
          </p>
        </div>
        <p
          className={`rounded-control border-l-4 p-3 text-xs leading-5 ${unguarded ? "border-danger text-danger" : "border-success text-secondary"}`}
        >
          {stateCopy[state].detail}
        </p>
      </div>
    </>
  );
}

export function Tpp20Topic03SoftwareEntropyEvidenceLab() {
  const [state, setState] = useState<EntropyState>("baseline");
  const reset = () => setState("baseline");
  return (
    <Frame
      eyebrow="第 1 章专属故障图 · 守护缺口"
      title="修复不是终点：撤掉守护，裂缝会回来"
      description="比较基线、没有守护和恢复后的路径。故障不应在“修复完成”处被隐藏，而要明确停在规则缺少所有者与边界测试的位置。"
      kind="entropy-guard-recovery"
      onReset={reset}
    >
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2" aria-label="选择熵修复状态">
          {(
            [
              ["baseline", "基线"],
              ["unguarded", "撤掉守护"],
              ["guarded", "恢复守护"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setState(id)}
              aria-pressed={state === id}
              className={`min-h-11 rounded-control border px-2 py-2 text-xs font-semibold ${state === id ? (id === "unguarded" ? "border-danger bg-danger/10 text-primary" : "border-success bg-success/10 text-primary") : "border-border bg-bg text-secondary"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-card border border-border bg-bg p-3 sm:p-4">
          <GuardDiagram state={state} />
        </div>
      </div>
    </Frame>
  );
}
