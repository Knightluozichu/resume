"use client";

import { useId, useState } from "react";

const VIEW_W = 1080;
const VIEW_H = 520;
const CARD_W = 196;
const CARD_H = 190;
const CARD_Y = 150;
const CARD_GAP = 18;
const CARD_X = 18;

const COLORS = {
  accent: "var(--accent)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  border: "var(--border)",
  elevated: "var(--bg-elevated)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const TOPIC_CONCEPTS = [
  "31 继承税",
  "提示51：不要付继承税",
  "提示52：尽量用接口来表达多态",
  "提示53：用委托提供服务：“有一个”胜过“是一个”",
  "提示54：利用 mixin 共享功能",
] as const;

const STAGES = [
  { key: "need", title: "需求", evidence: "只需 send", detail: "Message → Result", note: "调用者不认识供应商" },
  { key: "interface", title: "接口", evidence: "Notifier 合同", detail: "ok / timeout", note: "表达能力，不表达层级" },
  { key: "delegate", title: "委托", evidence: "拥有 Transport", detail: "has-a boundary", note: "依赖由组合根注入" },
  { key: "compose", title: "组合", evidence: "选择具体实现", detail: "Email / Queue", note: "替换不会改调用者" },
  { key: "replace", title: "替换", evidence: "合同仍成立", detail: "same input → result", note: "首差可定位、可回放" },
] as const;

type StageIndex = 0 | 1 | 2 | 3 | 4;

function stageX(index: number) {
  return CARD_X + index * (CARD_W + CARD_GAP);
}

function lessonFocus(step?: 1 | 2 | 3): StageIndex {
  if (step === 1) return 0;
  if (step === 2) return 2;
  if (step === 3) return 4;
  return 0;
}

function StageCard({
  stage,
  index,
  active,
  reached,
  fault,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  active: boolean;
  reached: boolean;
  fault: boolean;
}) {
  const tone = fault ? COLORS.danger : active ? COLORS.accent : COLORS.primary;
  const x = stageX(index);

  return (
    <g aria-label={`${stage.title}：${stage.evidence}`} opacity={reached ? 1 : 0.42}>
      <rect x={x} y={CARD_Y} width={CARD_W} height={CARD_H} rx="14" fill={COLORS.elevated} stroke={fault ? COLORS.danger : active ? COLORS.accent : COLORS.border} strokeWidth={fault || active ? "2" : "1.2"} />
      <rect x={x} y={CARD_Y} width={CARD_W} height="52" rx="14" fill={tone} fillOpacity={fault || active ? "0.16" : "0.07"} />
      <rect x={x} y={CARD_Y + 40} width={CARD_W} height="12" fill={tone} fillOpacity={fault || active ? "0.16" : "0.07"} />
      <circle cx={x + 26} cy={CARD_Y + 26} r="11" fill={tone} fillOpacity="0.18" stroke={tone} />
      <text x={x + 26} y={CARD_Y + 30} textAnchor="middle" fontSize="12" fontWeight="700" fill={tone}>{index + 1}</text>
      <text x={x + 111} y={CARD_Y + 32} textAnchor="middle" fontSize="15" fontWeight="700" fill={tone}>{fault ? "首差" : stage.title}</text>
      <text x={x + CARD_W / 2} y={CARD_Y + 86} textAnchor="middle" fontSize="12" fontWeight="700" fill={fault ? COLORS.danger : COLORS.primary}>{fault ? "继承税越过边界" : stage.evidence}</text>
      <text x={x + CARD_W / 2} y={CARD_Y + 119} textAnchor="middle" fontSize="12" fill={fault ? COLORS.danger : COLORS.secondary}>{fault ? "停止并保留证据" : stage.detail}</text>
      <line x1={x + 18} y1={CARD_Y + 141} x2={x + CARD_W - 18} y2={CARD_Y + 141} stroke={fault ? COLORS.danger : COLORS.border} strokeOpacity="0.8" />
      <text x={x + CARD_W / 2} y={CARD_Y + 166} textAnchor="middle" fontSize="11" fill={fault ? COLORS.danger : COLORS.secondary}>{fault ? "不要让调用者猜类型" : stage.note}</text>
    </g>
  );
}

function ContractChip({ x, label, tone, opacity = 1 }: { x: number; label: string; tone: string; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <rect x={x} y="86" width="172" height="36" rx="18" fill={tone} fillOpacity="0.12" stroke={tone} strokeWidth="1.2" />
      <text x={x + 86} y="109" textAnchor="middle" fontSize="12" fontWeight="700" fill={tone}>{label}</text>
    </g>
  );
}

function InheritanceTaxSvg({ focus, fault, markerId, ariaLabel }: { focus: StageIndex; fault: boolean; markerId: string; ariaLabel: string }) {
  const faultActive = fault && focus >= 2;

  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label={ariaLabel} className="mx-auto block h-auto w-full max-w-[1080px]">
      <defs>
        <marker id={markerId} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 z" fill={COLORS.accent} />
        </marker>
      </defs>
      <text x={VIEW_W / 2} y="31" textAnchor="middle" fontSize="18" fontWeight="700" fill={COLORS.primary}>继承税：从“是一个”退回“有一个”</text>
      <text x={VIEW_W / 2} y="59" textAnchor="middle" fontSize="12" fill={COLORS.secondary}>需求 → 接口 → 委托 → 组合 → 替换；每个边界都留下输入、结果和拒绝原因</text>

      <rect x="18" y="70" width="1044" height="66" rx="14" fill={faultActive ? COLORS.danger : COLORS.accent} fillOpacity="0.07" stroke={faultActive ? COLORS.danger : COLORS.border} />
      <text x="36" y="109" fontSize="12" fontWeight="700" fill={COLORS.primary}>合同</text>
      <ContractChip x={86} label="send(Message)" tone={COLORS.accent} />
      <ContractChip x={270} label="DeliveryResult" tone={COLORS.success} opacity={focus >= 1 ? 1 : 0.48} />
      <ContractChip x={454} label="Transport" tone={COLORS.accent} opacity={focus >= 2 ? 1 : 0.48} />
      <ContractChip x={638} label="组合根" tone={COLORS.accent} opacity={focus >= 3 ? 1 : 0.48} />
      <ContractChip x={822} label={faultActive ? "首差：具体父类" : "替换仍成立"} tone={faultActive ? COLORS.danger : COLORS.warning} opacity={focus >= 4 ? 1 : 0.48} />

      {STAGES.slice(0, -1).map((stage, index) => {
        const x1 = stageX(index) + CARD_W + 4;
        const x2 = stageX(index + 1) - 8;
        const y = CARD_Y + CARD_H / 2;
        const passed = index < focus;
        const broken = faultActive && index >= 2;
        return <line key={`${stage.key}-${STAGES[index + 1].key}`} x1={x1} y1={y} x2={x2} y2={y} stroke={broken ? COLORS.danger : passed ? COLORS.accent : COLORS.border} strokeWidth={broken || passed ? "2" : "1.2"} strokeDasharray={broken ? "7 4" : undefined} markerEnd={`url(#${markerId})`} />;
      })}
      {STAGES.map((stage, index) => <StageCard key={stage.key} stage={stage} index={index} active={index === focus} reached={index <= focus} fault={faultActive && index === 2} />)}

      <rect x="36" y="370" width="1008" height="106" rx="14" fill={faultActive ? COLORS.danger : COLORS.elevated} fillOpacity={faultActive ? "0.08" : "1"} stroke={faultActive ? COLORS.danger : COLORS.border} />
      <text x={VIEW_W / 2} y="404" textAnchor="middle" fontSize="14" fontWeight="700" fill={faultActive ? COLORS.danger : COLORS.success}>{faultActive ? "首差：具体父类把构造与受保护状态带进了调用者" : "验收合同：同一输入可替换实现，调用者只看能力结果"}</text>
      <text x={VIEW_W / 2} y="432" textAnchor="middle" fontSize="12" fill={COLORS.secondary}>{faultActive ? "修法：移除继承边，注入 Transport，按同一消息重放并比较 reason code" : "接口表达多态，委托表达服务；mixin 只共享无状态、可列出的横向行为"}</text>
      <text x={VIEW_W / 2} y="460" textAnchor="middle" fontSize="11" fill={COLORS.secondary}>{faultActive ? "最终结果看似成功，也不能抵消已经丢失的替换证据" : "先预测首差，再推进一个节点；不要把父类知识泄漏给所有调用者"}</text>
      <text x={VIEW_W / 2} y="505" textAnchor="middle" fontSize="12" fill={COLORS.secondary}>{`当前观察点：${STAGES[focus].title} · ${STAGES[focus].evidence}`}</text>
    </svg>
  );
}

const STEP_LABELS = {
  1: "需求与接口：只写调用者真正需要的 send 合同",
  2: "委托与组合：让协作者显式拥有 Transport",
  3: "替换与首差：注入唯一故障并重放同一消息",
} as const;

export function Tpp20Topic31InheritanceTaxDiagram({ step }: { step?: 1 | 2 | 3 }) {
  const markerId = `tpp20-topic31-arrow-${useId().replace(/:/g, "")}`;
  const focus = lessonFocus(step);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div data-visual-kind="tpp20-topic-31-inheritance-tax-diagram" className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <InheritanceTaxSvg focus={focus} fault={false} markerId={markerId} ariaLabel="31 继承税专属关系图，展示需求、接口、委托、组合和替换五个节点。" />
        <p className="mt-2 text-center text-xs text-secondary">{step ? STEP_LABELS[step] : "逐步观察：把复用责任从父类层级退回可替换的能力边界。"}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">继承税不是抽象分数，而是父类语义、初始化顺序和变更风险沿着继承边进入调用者的路径。</figcaption>
    </figure>
  );
}

export function Tpp20Topic31InheritanceTaxLab() {
  const [focus, setFocus] = useState<StageIndex>(0);
  const [faultInjected, setFaultInjected] = useState(false);
  const markerId = `tpp20-topic31-lab-${useId().replace(/:/g, "")}`;
  const faultActive = faultInjected && focus >= 2;
  const reset = () => { setFocus(0); setFaultInjected(false); };
  const status = faultActive
    ? "首差在委托边界出现：具体父类的状态与初始化顺序越界；请恢复接口并重放输入。"
    : faultInjected
      ? "故障已注入；推进到委托节点，观察继承税何时进入调用者。"
      : `第 ${focus + 1} / ${STAGES.length} 步：${STAGES[focus].title} 已留下合同证据。`;

  return (
    <section aria-label="继承税交互实验台" className="not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated p-5" data-visual-kind="tpp20-topic-31-inheritance-tax-lab">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">Topic 31 · 继承税实验台</span>
        <button type="button" aria-pressed={faultInjected} aria-label="注入具体父类故障" onClick={() => setFaultInjected((value) => !value)} className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${faultInjected ? "border-danger text-danger" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>
          {faultInjected ? "已注入：具体父类" : "注入具体父类故障"}
        </button>
      </div>
      <InheritanceTaxSvg focus={focus} fault={faultInjected} markerId={markerId} ariaLabel="31 继承税实验台，可推进五个边界并注入具体父类故障；故障在委托边界暴露。" />
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {STAGES.map((stage, index) => <button key={stage.key} type="button" aria-label={`观察${stage.title}边界`} aria-pressed={focus === index} onClick={() => setFocus(index as StageIndex)} className={`min-h-11 rounded-control border px-2 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${focus === index ? "border-accent text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{stage.title}</button>)}
      </div>
      <p className="mt-3 text-center text-xs text-secondary" role="status" aria-live="polite">{status}</p>
      <p className="mt-2 text-center text-xs text-secondary">题目覆盖：{TOPIC_CONCEPTS.join(" · ")}</p>
      <button type="button" onClick={reset} aria-label="重置继承税实验台" className="mx-auto mt-3 block min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary">重置实验台</button>
    </section>
  );
}
