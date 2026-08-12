"use client";

import { useState } from "react";

const BUTTON_CLASS =
  "min-h-11 rounded-control border border-border px-3 py-2 text-left text-sm text-secondary transition-colors hover:border-accent hover:text-primary";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
    >
      重置实验
    </button>
  );
}

function ChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`${BUTTON_CLASS}${active ? " border-accent bg-accent/10 text-accent" : ""}`}
    >
      {children}
    </button>
  );
}

const CONTRACT_LAYERS = [
  { label: "范围", detail: "九章与版本边界" },
  { label: "状态", detail: "对象、输入、后状态" },
  { label: "证据", detail: "日志、回执、失败" },
  { label: "迁移", detail: "现代工具与差异" },
] as const;

export function BpPrefaceLearningContractLab() {
  const [layer, setLayer] = useState(0);
  const [missing, setMissing] = useState(false);
  const active = CONTRACT_LAYERS[layer];

  function reset() {
    setLayer(0);
    setMissing(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-preface-learning-contract"
      aria-label={`前言学习合同实验：当前${active.label}，${missing ? "已注入合同缺口" : "合同完整"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Preface · 学习合同</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先约定如何学，再开始运行</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">沿范围、状态、证据和迁移推进，观察缺一项时合同如何停止。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择合同层</p>
          <div className="grid gap-2">
            {CONTRACT_LAYERS.map((item, index) => (
              <ChoiceButton key={item.label} active={layer === index} onClick={() => setLayer(index)}>
                {`${index + 1}. ${item.label}`}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={missing} onClick={() => setMissing((value) => !value)}>
            注入合同缺口
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前：{active.label}（{active.detail}）。{missing ? "缺口已注入，停在当前层并补齐证据。" : "先预测下一层需要什么，再继续推进。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`前言学习合同图：范围、状态、证据、迁移；当前${active.label}；${missing ? "合同有缺口" : "合同完整"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Scope → State → Evidence → Migration</text>
          {CONTRACT_LAYERS.map((item, index) => {
            const reached = layer >= index;
            const stopped = missing && index >= layer;
            const color = stopped ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 24 + index * 188;
            return (
              <g key={item.label}>
                <rect x={x} y="82" width="150" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 75} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{item.label}</text>
                <text x={x + 75} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{item.detail}</text>
                <text x={x + 75} y="178" textAnchor="middle" fontSize="11" fill={color}>{stopped ? "补齐" : reached ? "已锁定" : "待锁定"}</text>
                {index < CONTRACT_LAYERS.length - 1 ? <path d={`M${x + 156} 148 H${x + 180}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">学习合同把阅读、运行、失败和迁移放进同一条路线</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={missing ? "var(--warning)" : "var(--text-secondary)"}>{missing ? "停止：合同缺口必须先补齐" : `当前层：${active.label}`}</text>
        </svg>
      </div>
    </section>
  );
}

const LEARNING_STAGES = {
  understand: { label: "理解对象", detail: "账本、交易、状态", result: "能描述" },
  trust: { label: "解释可信", detail: "密码、共识、边界", result: "能验证" },
  build: { label: "动手搭建", detail: "平台、微链、回放", result: "能重放" },
} as const;

type LearningStage = keyof typeof LEARNING_STAGES;

export function BpPrefaceSequenceLab() {
  const [stage, setStage] = useState<LearningStage>("understand");
  const [evidence, setEvidence] = useState(false);
  const active = LEARNING_STAGES[stage];

  function reset() {
    setStage("understand");
    setEvidence(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-preface-sequence"
      aria-label={`前言学习递进实验：${active.label}，${evidence ? "证据已绑定" : "证据待绑定"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Preface · 九章递进</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从能描述走到能重放</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换理解、可信和搭建三个里程碑，再为里程碑绑定观察证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择学习里程碑</p>
          <div className="grid gap-2">
            {(Object.keys(LEARNING_STAGES) as LearningStage[]).map((value) => (
              <ChoiceButton key={value} active={stage === value} onClick={() => { setStage(value); setEvidence(false); }}>
                {LEARNING_STAGES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={evidence} onClick={() => setEvidence((value) => !value)}>
            {evidence ? "撤销里程碑证据" : "绑定里程碑证据"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。{evidence ? active.result + "的观察记录已绑定。" : "先预测这个里程碑应留下什么原始对象。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`前言学习递进图：理解对象、解释可信、动手搭建；当前${active.label}；${evidence ? "证据已绑定" : "证据待绑定"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Describe → Verify → Replay</text>
          {[
            { label: "理解", detail: "账本、交易、状态" },
            { label: "可信", detail: "密码、共识、边界" },
            { label: "搭建", detail: "平台、微链、回放" },
          ].map((node, index) => {
            const color = evidence ? "var(--success)" : "var(--accent)";
            const x = 54 + index * 238;
            return (
              <g key={node.label}>
                <rect x={x} y="88" width="190" height="116" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 95} y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 95} y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 95} y="181" textAnchor="middle" fontSize="11" fill={color}>{evidence ? "可追溯" : "待绑定"}</text>
                {index < 2 ? <path d={`M${x + 196} 146 H${x + 228}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="260" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">九章不是并列清单，而是从对象到实现的依赖路径</text>
          <text x="380" y="288" textAnchor="middle" fontSize="11" fill={evidence ? "var(--success)" : "var(--text-secondary)"}>{evidence ? "里程碑已绑定：可以进入下一层" : "里程碑待绑定：先补证据"}</text>
        </svg>
      </div>
    </section>
  );
}

const STOP_RULES = {
  version: { label: "版次不明", detail: "来源或工具无法定位", result: "停止查源" },
  state: { label: "状态不明", detail: "前后状态无法解释", result: "停止重放" },
  failure: { label: "失败不明", detail: "异常只有笼统文本", result: "停止扩展" },
} as const;

type StopRule = keyof typeof STOP_RULES;

export function BpPrefaceStopConditionLab() {
  const [rule, setRule] = useState<StopRule>("version");
  const [recovered, setRecovered] = useState(false);
  const active = STOP_RULES[rule];

  function reset() {
    setRule("version");
    setRecovered(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-preface-stop-condition"
      aria-label={`前言停机条件实验：${active.label}，${recovered ? "已恢复" : "等待恢复"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Preface · 停机条件</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">遇到证据断裂时先停下来</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择版次、状态或失败缺口，再执行恢复动作，避免用后续演示掩盖前置问题。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择停机条件</p>
          <div className="grid gap-2">
            {(Object.keys(STOP_RULES) as StopRule[]).map((value) => (
              <ChoiceButton key={value} active={rule === value} onClick={() => { setRule(value); setRecovered(false); }}>
                {STOP_RULES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={recovered} onClick={() => setRecovered((value) => !value)}>
            {recovered ? "撤销恢复记录" : "执行恢复动作"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。{recovered ? active.result + "完成，原失败记录已保留。" : "先预测正确的停机动作，再打开恢复记录。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`前言停机条件图：发现缺口、停机、恢复；当前${active.label}；${recovered ? "恢复完成" : "等待恢复"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Detect → Stop → Recover</text>
          {[
            { label: "发现", detail: active.label },
            { label: "停机", detail: active.detail },
            { label: "恢复", detail: active.result },
          ].map((node, index) => {
            const color = recovered ? "var(--success)" : "var(--warning)";
            const x = 54 + index * 238;
            return (
              <g key={node.label}>
                <rect x={x} y="88" width="190" height="116" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 95} y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 95} y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 95} y="181" textAnchor="middle" fontSize="11" fill={color}>{recovered ? "已记录" : "待处理"}</text>
                {index < 2 ? <path d={`M${x + 196} 146 H${x + 228}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="260" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">停机不是失败终点，而是保护证据和状态的动作</text>
          <text x="380" y="288" textAnchor="middle" fontSize="11" fill={recovered ? "var(--success)" : "var(--warning)"}>{recovered ? "恢复完成：回到相邻正常样本" : "等待处理：不要继续堆叠功能"}</text>
        </svg>
      </div>
    </section>
  );
}
