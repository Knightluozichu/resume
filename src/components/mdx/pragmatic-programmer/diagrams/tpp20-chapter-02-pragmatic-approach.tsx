"use client";

import { useState, type ReactNode } from "react";

const c = {
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
  eyebrow,
  title,
  description,
  kind,
  reset,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  kind: string;
  reset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated text-primary shadow-sm"
      aria-label={`${title}实验`}
      data-tpp20-unit="tpp20-chapter-02-pragmatic-approach"
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

const changes = {
  region: {
    label: "新增欧洲税率例外",
    request: "退款路径按地区选择规则",
    facts: [
      "规则在结算与退款各复制一份",
      "欧洲只影响退款入口",
      "可先在沙盒订单验证",
    ],
    moves: [
      ["DRY", "把规则收回唯一入口"],
      ["正交", "地区变化不改退款流程"],
      ["可逆", "先用规则 v42 的开关"],
      ["曳光", "一笔欧洲订单穿过全链路"],
    ],
    color: c.accent,
  },
  provider: {
    label: "支付服务商接口变更",
    request: "新回调增加签名字段",
    facts: [
      "回调验证与入账耦在一起",
      "旧签名仍要保留 30 天",
      "可捕获真实回调重放",
    ],
    moves: [
      ["ETC", "把验签约束写在边界"],
      ["正交", "验证失败不改变入账状态机"],
      ["可逆", "双验签并记录命中路径"],
      ["曳光", "一笔回调从验签到对账"],
    ],
    color: c.success,
  },
  wording: {
    label: "客服话术需要更新",
    request: "退款延迟时解释下一步",
    facts: [
      "话术散落在三个页面",
      "更新时间必须与状态页同源",
      "可由客服演练验证",
    ],
    moves: [
      ["DRY", "状态文案从一个源生成"],
      ["正交", "话术变化不改退款裁决"],
      ["可逆", "保留旧话术回退"],
      ["曳光", "一次延迟演练走到用户回复"],
    ],
    color: c.warning,
  },
} as const;
type ChangeId = keyof typeof changes;

export function Tpp20Chapter02PragmaticApproachSystemLab() {
  const [changeId, setChangeId] = useState<ChangeId>("region");
  const change = changes[changeId];
  return (
    <Frame
      eyebrow="第 2 章专属总览图 · 易变更不是原则清单"
      title="把一个真实变更请求拆成能独立移动、验证和回退的部件"
      description="选择一个退款系统的变化。DRY、正交、可逆和曳光并非四张贴纸：每个动作都要改变具体的代码边界、验证路径或回退开关。"
      kind="pragmatic-change-map"
      reset={() => setChangeId("region")}
    >
      <div className="grid gap-4 p-4 lg:grid-cols-[244px_1fr]">
        <div className="grid gap-2" aria-label="变更请求选择">
          {(Object.keys(changes) as ChangeId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setChangeId(id)}
              aria-pressed={changeId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${changeId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="block text-sm font-semibold text-primary">
                {changes[id].label}
              </span>
              <span className="mt-1 block text-xs text-secondary">
                {changes[id].request}
              </span>
            </button>
          ))}
        </div>
        <div>
          <svg
            viewBox="0 0 790 350"
            role="img"
            aria-label={`${change.label}的务实变更路线图`}
            className="hidden h-auto w-full sm:block"
          >
            <defs>
              <marker
                id="approach-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 Z" fill={change.color} />
              </marker>
            </defs>
            <text x="28" y="32" fontSize="13" fontWeight="700" fill={c.text}>
              变化目标固定，四个实践动作分别处理事实来源、独立性、回退和真实反馈
            </text>
            <rect
              x="30"
              y="68"
              width="215"
              height="228"
              rx="15"
              fill={c.bg}
              stroke={change.color}
              strokeWidth="2"
            />
            <text x="54" y="103" fontSize="13" fontWeight="700" fill={c.text}>
              变更请求
            </text>
            <text x="54" y="133" fontSize="13" fill={change.color}>
              {change.request}
            </text>
            {change.facts.map((fact, index) => (
              <text
                key={fact}
                x="54"
                y={178 + index * 29}
                fontSize="11.5"
                fill={c.muted}
              >
                • {fact}
              </text>
            ))}
            <path
              d="M245 182 H303"
              stroke={change.color}
              strokeWidth="3"
              markerEnd="url(#approach-arrow)"
            />
            {change.moves.map(([name, action], index) => {
              const x = 326 + (index % 2) * 214;
              const y = 70 + Math.floor(index / 2) * 121;
              return (
                <g key={name}>
                  <rect
                    x={x}
                    y={y}
                    width="190"
                    height="93"
                    rx="13"
                    fill={change.color}
                    fillOpacity={index === 0 ? "0.1" : "0.04"}
                    stroke={change.color}
                  />
                  <text
                    x={x + 18}
                    y={y + 31}
                    fontSize="13"
                    fontWeight="700"
                    fill={change.color}
                  >
                    {name}
                  </text>
                  <text x={x + 18} y={y + 58} fontSize="11.5" fill={c.text}>
                    {action}
                  </text>
                </g>
              );
            })}
            <rect
              x="326"
              y="297"
              width="404"
              height="28"
              rx="9"
              fill={change.color}
              fillOpacity="0.1"
              stroke={change.color}
            />
            <text
              x="344"
              y="317"
              fontSize="11.5"
              fontWeight="700"
              fill={c.text}
            >
              验收：变更只在声明的边界发生，且可用一笔真实输入复现
            </text>
          </svg>
          <div className="space-y-3 sm:hidden">
            <p
              className="rounded-control border p-3 text-sm text-primary"
              style={{ borderColor: change.color }}
            >
              <strong>请求：</strong>
              {change.request}
            </p>
            {change.moves.map(([name, action]) => (
              <p
                key={name}
                className="rounded-control border border-border bg-bg p-3 text-sm text-primary"
              >
                <strong style={{ color: change.color }}>{name}：</strong>
                {action}
              </p>
            ))}
            <p
              className="rounded-control border-l-4 bg-bg p-3 text-sm text-primary"
              style={{ borderColor: change.color }}
            >
              验收：变更只在声明边界发生，且可用真实输入复现。
            </p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

const rolloutCases = {
  tracer: {
    label: "曳光：一笔沙盒订单",
    path: ["规则 v42", "退款服务", "客服轨迹卡", "沙盒验收"],
    change: "只有一个欧洲订单走新路径",
    feedback: "发现规则名无法被客服理解，停在轨迹卡",
    recovery: "改显示名后重放同一订单",
    color: c.success,
  },
  irreversible: {
    label: "一次替换全部规则",
    path: ["规则 v42", "全量生产", "数千笔退款", "事后排障"],
    change: "同时删除旧规则和回退开关",
    feedback: "错误被大规模流量掩盖",
    recovery: "没有可重放的旧路径",
    color: c.danger,
  },
  prototype: {
    label: "原型：只做界面演示",
    path: ["静态界面", "无规则输入", "演示截图", "主观同意"],
    change: "先验证视觉，不连接真实订单",
    feedback: "无法证明规则到金额的因果",
    recovery: "补接一笔沙盒订单",
    color: c.warning,
  },
} as const;
type RolloutId = keyof typeof rolloutCases;

export function Tpp20Chapter02PragmaticApproachFeedbackLab() {
  const [caseId, setCaseId] = useState<RolloutId>("tracer");
  const model = rolloutCases[caseId];
  return (
    <Frame
      eyebrow="第 2 章专属实验 · 反馈必须穿过真实边界"
      title="选择交付方式，观察反馈最早在哪里出现，以及是否仍能回退"
      description="固定变化为欧洲税率例外。只改变探索方式：曳光路径需要带着一笔真实格式的输入走过系统；原型和全量替换在不同位置丢失反馈。"
      kind="tracer-feedback-path"
      reset={() => setCaseId("tracer")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(rolloutCases) as RolloutId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setCaseId(id)}
              aria-pressed={caseId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${caseId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="text-sm font-semibold text-primary">
                {rolloutCases[id].label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {model.path.map((item, index) => (
            <div
              key={item}
              className="relative rounded-control border bg-bg p-3 text-sm text-primary"
              style={{ borderColor: model.color }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: model.color }}
              >
                {index + 1}
              </span>
              <span className="mt-1 block font-semibold">{item}</span>
              {index < model.path.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-xl md:block"
                  style={{ color: model.color }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <p className="rounded-control border border-border bg-bg p-3 text-sm text-primary">
            <strong>唯一改变：</strong>
            {model.change}
          </p>
          <p className="rounded-control border border-border bg-bg p-3 text-sm text-primary">
            <strong>首个反馈：</strong>
            {model.feedback}
          </p>
          <p
            className="rounded-control border-l-4 bg-bg p-3 text-sm text-primary"
            style={{ borderColor: model.color }}
          >
            <strong>恢复：</strong>
            {model.recovery}
          </p>
        </div>
      </div>
    </Frame>
  );
}

const decisionCases = {
  bounded: {
    label: "基线：只改规则显示名",
    rows: [
      ["变更边界", "客服轨迹卡", true],
      ["回退开关", "规则 v42 → v41", true],
      ["真实反馈", "一笔欧洲沙盒订单", true],
      ["下一次估算", "根据首差更新", true],
    ],
    result: "证据闭合：可进入小范围发布",
    color: c.success,
  },
  coupled: {
    label: "故障：同时改规则与界面",
    rows: [
      ["变更边界", "规则、退款流程、话术一起改", false],
      ["回退开关", "无法只退一个改动", false],
      ["真实反馈", "结果无法归因", false],
      ["下一次估算", "只是猜测", false],
    ],
    result: "停止：拆回单一变量再重放",
    color: c.danger,
  },
  recovered: {
    label: "恢复：先切出显示名",
    rows: [
      ["变更边界", "客服轨迹卡", true],
      ["回退开关", "规则 v42 → v41", true],
      ["真实反馈", "同一笔欧洲订单", true],
      ["下一次估算", "记录实际耗时", true],
    ],
    result: "从原始输入重放后恢复估算",
    color: c.accent,
  },
} as const;
type DecisionId = keyof typeof decisionCases;

export function Tpp20Chapter02PragmaticApproachEvidenceLab() {
  const [caseId, setCaseId] = useState<DecisionId>("bounded");
  const model = decisionCases[caseId];
  return (
    <Frame
      eyebrow="第 2 章专属验收 · 用首差修正下一次估算"
      title="证据账本要暴露耦合，而不是用一次成功掩盖它"
      description="切换三种变更记录。务实方法的验收不是“完成多少”，而是能否指出边界、回退、首个反馈和下一次估算来自何处。"
      kind="pragmatic-evidence-ledger"
      reset={() => setCaseId("bounded")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(decisionCases) as DecisionId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setCaseId(id)}
              aria-pressed={caseId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${caseId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="text-sm font-semibold text-primary">
                {decisionCases[id].label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_300px]">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-semibold text-accent">
              欧洲税率例外 · 变更证据
            </p>
            <div className="mt-3 grid gap-2">
              {model.rows.map(([label, value, ok]) => (
                <div
                  key={label}
                  className={`rounded-control border p-3 text-sm ${ok ? "border-success bg-success/10 text-primary" : "border-danger bg-danger/10 text-primary"}`}
                >
                  <span className="font-semibold">{label}</span>
                  <span
                    className="mt-1 block"
                    style={{ color: ok ? c.success : c.danger }}
                  >
                    {ok ? "✓ " : "× "}
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <aside
            className="rounded-control border bg-bg p-4"
            style={{ borderColor: model.color }}
          >
            <p className="text-xs font-semibold" style={{ color: model.color }}>
              结论
            </p>
            <p className="mt-2 text-sm font-semibold text-primary">
              {model.result}
            </p>
            <p className="mt-3 text-xs leading-5 text-secondary">
              保存实际耗时、首差和回退结果；它们才是下一次估算可以使用的输入。
            </p>
          </aside>
        </div>
      </div>
    </Frame>
  );
}
