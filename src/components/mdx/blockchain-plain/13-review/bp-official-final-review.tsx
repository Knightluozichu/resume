"use client";

import { useState } from "react";

const BUTTON_CLASS =
  "min-h-11 rounded-lg border border-border bg-background px-3 py-2 text-left text-sm transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]";

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={BUTTON_CLASS} onClick={onClick} type="button">
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
      aria-pressed={active}
      className={`${BUTTON_CLASS} ${
        active
          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
          : ""
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

type ReplayMode = "transaction" | "consensus" | "execution";

const replayModes: Record<
  ReplayMode,
  { label: string; input: string; rule: string; output: string }
> = {
  transaction: {
    label: "交易验证",
    input: "签名、输入与输出",
    rule: "授权与价值守恒",
    output: "候选交易",
  },
  consensus: {
    label: "共识选择",
    input: "节点消息与候选块",
    rule: "故障模型与排序",
    output: "规范历史",
  },
  execution: {
    label: "平台执行",
    input: "调用者、字节码与状态",
    rule: "Gas、权限与回滚",
    output: "后状态与事件",
  },
};

export function BpFinalReviewStateReplayLab() {
  const [mode, setMode] = useState<ReplayMode>("transaction");
  const [tampered, setTampered] = useState(false);
  const scenario = replayModes[mode];

  return (
    <section
      aria-label="全书状态重放实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-final-review-state-replay"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            State replay
          </p>
          <h3 className="mt-1 text-lg font-semibold">把复习变成一条可重放的状态链</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            先预测规则会保留哪个状态，再注入一个中间字段变化，定位拒绝位置。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("transaction");
            setTampered(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(replayModes) as ReplayMode[]).map((id) => (
          <ChoiceButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {replayModes[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={tampered}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setTampered(event.target.checked)}
          type="checkbox"
        />
        改动中间状态后再提交
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="输入经过规则验证形成可复核输出的状态重放链"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bp-final-review-replay-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前复习路径：{scenario.label} · 验证：{scenario.rule}
          </text>
          {[
            { x: 35, label: "输入", value: scenario.input },
            { x: 215, label: "规则", value: scenario.rule },
            { x: 395, label: "中间状态", value: tampered ? "被改动" : "保持一致" },
            { x: 575, label: "输出", value: tampered ? "拒绝并保留旧状态" : scenario.output },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={tampered && index >= 2 ? "var(--danger)" : "var(--border)"}
                strokeWidth="2"
                width="145"
                x={node.x}
                y="92"
              />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">
                {node.value}
              </text>
              {index < nodes.length - 1 ? (
                <line
                  markerEnd="url(#bp-final-review-replay-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 145}
                  x2={nodes[index + 1].x - 12}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={tampered ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={tampered ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {tampered
              ? "拒绝点：中间状态不再满足不变量；旧状态未被覆盖。"
              : "通过点：同一输入、规则和版本得到可复核的后状态。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {tampered
          ? "观察：失败不是一个模糊的报错，而是能指出哪条状态不变量被破坏。"
          : `观察：${scenario.label}先把“${scenario.input}”交给“${scenario.rule}”，再形成${scenario.output}。`}
      </p>
    </section>
  );
}

type FailureCase = "authorization" | "ordering" | "resource";

const failureCases: Record<
  FailureCase,
  { label: string; trigger: string; evidence: string; recovery: string }
> = {
  authorization: {
    label: "授权失败",
    trigger: "签名与调用者不匹配",
    evidence: "公钥、签名和拒绝原因",
    recovery: "不提交状态，重新授权",
  },
  ordering: {
    label: "排序失败",
    trigger: "消息顺序不满足协议假设",
    evidence: "序列号、超时和候选集合",
    recovery: "切换视图或等待确认",
  },
  resource: {
    label: "资源失败",
    trigger: "Gas、容量或网络预算耗尽",
    evidence: "资源计数、边界输入和回滚记录",
    recovery: "限制输入，保留原状态",
  },
};

export function BpFinalReviewFailureMatrixLab() {
  const [failure, setFailure] = useState<FailureCase>("authorization");
  const [evidenceHidden, setEvidenceHidden] = useState(false);
  const scenario = failureCases[failure];

  return (
    <section
      aria-label="全书故障证据矩阵实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-final-review-failure-matrix"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Failure evidence
          </p>
          <h3 className="mt-1 text-lg font-semibold">同一套证据，区分三类失败</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            切换故障来源，检查触发、证据和恢复动作是否仍然一一对应。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setFailure("authorization");
            setEvidenceHidden(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(failureCases) as FailureCase[]).map((id) => (
          <ChoiceButton active={failure === id} key={id} onClick={() => setFailure(id)}>
            {failureCases[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={evidenceHidden}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setEvidenceHidden(event.target.checked)}
          type="checkbox"
        />
        隐藏失败证据
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="故障触发、失败证据和恢复动作的矩阵"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前故障：{scenario.label} · 触发：{scenario.trigger}
          </text>
          <text fill="var(--muted)" fontSize="11" x="55" y="72">
            故障维度
          </text>
          <text fill="var(--muted)" fontSize="11" x="285" y="72">
            可观察证据
          </text>
          <text fill="var(--muted)" fontSize="11" x="550" y="72">
            恢复边界
          </text>
          {[
            { y: 95, label: "触发", value: scenario.trigger },
            { y: 153, label: "证据", value: evidenceHidden ? "未记录" : scenario.evidence },
            { y: 211, label: "动作", value: scenario.recovery },
          ].map((row) => (
            <g key={row.label}>
              <rect fill="var(--surface)" height="42" rx="8" stroke="var(--border)" width="180" x="35" y={row.y} />
              <text fill="var(--accent)" fontSize="12" fontWeight="700" x="52" y={row.y + 26}>
                {row.label}
              </text>
              <rect
                fill={row.label === "证据" && evidenceHidden ? "var(--danger-soft)" : "var(--surface)"}
                height="42"
                rx="8"
                stroke={row.label === "证据" && evidenceHidden ? "var(--danger)" : "var(--border)"}
                width="250"
                x="235"
                y={row.y}
              />
              <text fill="var(--text)" fontSize="11" x="250" y={row.y + 26}>
                {row.value}
              </text>
              <rect fill="var(--surface)" height="42" rx="8" stroke="var(--border)" width="220" x="515" y={row.y} />
              <text fill="var(--text)" fontSize="11" x="530" y={row.y + 26}>
                {row.label === "证据" && evidenceHidden ? "无法复核" : row.label === "动作" ? row.value : "保留轨迹"}
              </text>
            </g>
          ))}
          <rect
            fill={evidenceHidden ? "var(--danger-soft)" : "var(--surface)"}
            height="43"
            rx="9"
            stroke={evidenceHidden ? "var(--danger)" : "var(--border)"}
            width="700"
            x="35"
            y="273"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="385" y="300">
            {evidenceHidden
              ? "没有证据就没有可审计的恢复：先补记录，再决定是否继续。"
              : "证据闭环：触发、拒绝原因和恢复动作必须来自同一次重放。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {evidenceHidden
          ? "观察：隐藏证据会让恢复动作失去可解释性，发布门禁应阻止这条路径。"
          : `观察：${scenario.label}使用“${scenario.evidence}”定位问题，再执行“${scenario.recovery}”。`}
      </p>
    </section>
  );
}

type GateStage = "source" | "replay" | "release";

const gateStages: Record<
  GateStage,
  { label: string; artifact: string; owner: string; ready: number }
> = {
  source: { label: "来源核对", artifact: "版本、目录与来源说明", owner: "复核者", ready: 0 },
  replay: { label: "实验重放", artifact: "正常、边界与失败轨迹", owner: "实现者与复核者", ready: 1 },
  release: { label: "发布判断", artifact: "链接、视觉与审计报告", owner: "发布负责人", ready: 2 },
};

export function BpFinalReviewReleaseGateLab() {
  const [stage, setStage] = useState<GateStage>("source");
  const [missingArtifact, setMissingArtifact] = useState(false);
  const current = gateStages[stage];
  const pass = stage === "release" && !missingArtifact;

  return (
    <section
      aria-label="全书发布门禁实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-final-review-release-gate"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Release gate
          </p>
          <h3 className="mt-1 text-lg font-semibold">从理解到发布，证据必须逐层交接</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            先预测当前阶段的责任，再切换到最终判断，观察缺少一项证据的影响。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setStage("source");
            setMissingArtifact(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(gateStages) as GateStage[]).map((id) => (
          <ChoiceButton active={stage === id} key={id} onClick={() => setStage(id)}>
            {gateStages[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={missingArtifact}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setMissingArtifact(event.target.checked)}
          type="checkbox"
        />
        移除当前阶段的一项证据
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="来源、重放、发布三个阶段的交接门禁"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bp-final-review-gate-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前阶段：{current.label} · 责任主体：{current.owner}
          </text>
          {[
            { x: 35, label: "来源", value: "目录与版本" },
            { x: 215, label: "重放", value: "输入与失败轨迹" },
            { x: 395, label: "复核", value: "视觉与链接" },
            { x: 575, label: "发布", value: pass ? "允许" : "等待证据" },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={index === current.ready ? "var(--accent)" : missingArtifact && index >= current.ready ? "var(--danger)" : "var(--border)"}
                strokeWidth="2"
                width="145"
                x={node.x}
                y="92"
              />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">
                {node.value}
              </text>
              {index < nodes.length - 1 ? (
                <line
                  markerEnd="url(#bp-final-review-gate-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 145}
                  x2={nodes[index + 1].x - 12}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={missingArtifact ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={missingArtifact ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {missingArtifact
              ? "缺证据：不能以页面可打开替代内容、视觉和失败路径的共同验收。"
              : "发布条件：来源、理解、重放、视觉和门禁结果彼此可追溯。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {missingArtifact
          ? "观察：缺一项证据就停在当前阶段，修复后才能交给下一责任主体。"
          : `观察：${current.label}交付“${current.artifact}”，发布负责人再做最终判断。`}
      </p>
    </section>
  );
}
