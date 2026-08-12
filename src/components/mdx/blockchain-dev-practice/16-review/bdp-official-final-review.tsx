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

const TRACE_STAGES = [
  { label: "来源", detail: "书目与源码摘要" },
  { label: "上下文", detail: "网络与运行时" },
  { label: "重放", detail: "输入与调用" },
  { label: "状态", detail: "回执与后状态" },
] as const;

export function BdpOfficialFinalReviewTraceLab() {
  const [stage, setStage] = useState(0);
  const [fault, setFault] = useState(false);
  const active = TRACE_STAGES[stage];

  function reset() {
    setStage(0);
    setFault(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-official-final-review-trace"
      aria-label={`终审证据轨迹实验：当前${active.label}，${fault ? "已注入上下文错误" : "未注入错误"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Final review · 证据轨迹</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先锁定坐标，再相信结果</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">推进来源、上下文、重放和状态，观察错误应在哪一格停下。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择复核阶段</p>
          <div className="grid gap-2">
            {TRACE_STAGES.map((item, index) => (
              <ChoiceButton key={item.label} active={stage === index} onClick={() => setStage(index)}>
                {`${index + 1}. ${item.label}`}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={fault} onClick={() => setFault((value) => !value)}>
            注入网络上下文错误
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前：{active.label}（{active.detail}）。{fault ? "网络不匹配，重放必须停止并保存错误对象。" : "先预测下一份证据，再推进一格。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`终审证据轨迹图：来源、上下文、重放、状态；当前${active.label}；${fault ? "网络错误已注入" : "轨迹正常"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Source → Context → Replay → State</text>
          {TRACE_STAGES.map((item, index) => {
            const reached = stage >= index;
            const stopped = fault && index >= 1;
            const color = stopped ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 24 + index * 188;
            return (
              <g key={item.label}>
                <rect x={x} y="82" width="150" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 75} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{item.label}</text>
                <text x={x + 75} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{item.detail}</text>
                <text x={x + 75} y="178" textAnchor="middle" fontSize="11" fill={color}>{stopped ? "STOP" : reached ? "已记录" : "待记录"}</text>
                {index < TRACE_STAGES.length - 1 ? <path d={`M${x + 156} 148 H${x + 180}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">每一格都能指向原始输入、版本、回执或错误对象</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={fault ? "var(--warning)" : "var(--text-secondary)"}>{fault ? "停止：上下文不一致，后状态不可接受" : `当前阶段：${active.label}`}</text>
        </svg>
      </div>
    </section>
  );
}

const REVIEW_SAMPLES = {
  normal: { label: "正常", detail: "合法输入，状态提交", result: "保留回执与确认" },
  boundary: { label: "边界", detail: "恰好阈值或余额", result: "记录判断分支" },
  fault: { label: "故障", detail: "签名或网络不匹配", result: "原状态保持不变" },
} as const;

type ReviewSample = keyof typeof REVIEW_SAMPLES;

export function BdpOfficialFinalReviewBoundaryLab() {
  const [sample, setSample] = useState<ReviewSample>("normal");
  const [observed, setObserved] = useState(false);
  const active = REVIEW_SAMPLES[sample];

  function reset() {
    setSample("normal");
    setObserved(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-official-final-review-boundary"
      aria-label={`终审样本矩阵实验：${active.label}，${observed ? "已观察" : "未观察"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Final review · 样本矩阵</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">只改变一个条件，才知道差异来自哪里</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换正常、边界和故障样本，再观察前状态是否被意外修改。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择样本</p>
          <div className="grid gap-2">
            {(Object.keys(REVIEW_SAMPLES) as ReviewSample[]).map((value) => (
              <ChoiceButton key={value} active={sample === value} onClick={() => { setSample(value); setObserved(false); }}>
                {REVIEW_SAMPLES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={observed} onClick={() => setObserved((value) => !value)}>
            {observed ? "撤销观察记录" : "记录前后状态"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。{observed ? active.result + "，并保存首个差异。" : "先预测结果，再打开观察记录。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`终审样本图：前状态、规则检查、后状态；当前${active.label}；${observed ? "已记录证据" : "等待记录"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Before → Check → After</text>
          {[
            { label: "前状态", detail: "固定快照" },
            { label: "规则检查", detail: active.detail },
            { label: "后状态", detail: active.result },
          ].map((node, index) => {
            const color = sample === "fault" && index > 0 ? "var(--warning)" : observed ? "var(--success)" : "var(--accent)";
            const x = 54 + index * 238;
            return (
              <g key={node.label}>
                <rect x={x} y="88" width="190" height="116" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 95} y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 95} y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 95} y="181" textAnchor="middle" fontSize="11" fill={color}>{sample === "fault" && index > 0 ? "拒绝" : observed ? "已记录" : "待观察"}</text>
                {index < 2 ? <path d={`M${x + 196} 146 H${x + 228}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="260" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">正常验证提交，边界验证规则，故障验证回退</text>
          <text x="380" y="288" textAnchor="middle" fontSize="11" fill={sample === "fault" ? "var(--warning)" : observed ? "var(--success)" : "var(--text-secondary)"}>{sample === "fault" ? "故障证据：拒绝且前状态不变" : observed ? "前后状态已绑定到同一观察合同" : "等待观察"}</text>
        </svg>
      </div>
    </section>
  );
}

const RELEASE_PATHS = {
  ethereum: { label: "以太坊轨迹", detail: "源码 → 编译 → 合约 → DApp", evidence: "字节码、调用回执、状态" },
  bitcoin: { label: "比特币轨迹", detail: "UTXO → 交易 → API → 确认", evidence: "原始交易、txid、区块上下文" },
} as const;

type ReleasePath = keyof typeof RELEASE_PATHS;

export function BdpOfficialFinalReviewReleaseLab() {
  const [path, setPath] = useState<ReleasePath>("ethereum");
  const [evidence, setEvidence] = useState(false);
  const active = RELEASE_PATHS[path];

  function reset() {
    setPath("ethereum");
    setEvidence(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-official-final-review-release"
      aria-label={`终审发布轨迹实验：${active.label}，${evidence ? "证据完整" : "证据待补"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Final review · 发布轨迹</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">两条链路，共用一份验收合同</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换以太坊和比特币轨迹，核对每一步能否回到原始证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择发布轨迹</p>
          <div className="grid gap-2">
            {(Object.keys(RELEASE_PATHS) as ReleasePath[]).map((value) => (
              <ChoiceButton key={value} active={path === value} onClick={() => { setPath(value); setEvidence(false); }}>
                {RELEASE_PATHS[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={evidence} onClick={() => setEvidence((value) => !value)}>
            {evidence ? "撤销证据核验" : "核验证据链"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。{evidence ? active.evidence + " 已关联到版本、输入和状态。" : "先预测发布前还缺哪一份原始对象。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`终审发布图：${active.label}；${active.detail}；${evidence ? "证据完整" : "证据待补"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">{active.label} · {active.detail}</text>
          {[
            { label: "输入", detail: path === "ethereum" ? "源码摘要" : "UTXO 集" },
            { label: "执行", detail: path === "ethereum" ? "调用回执" : "广播响应" },
            { label: "确认", detail: path === "ethereum" ? "后状态" : "区块深度" },
          ].map((node, index) => {
            const color = evidence ? "var(--success)" : "var(--accent)";
            const x = 54 + index * 238;
            return (
              <g key={node.label}>
                <rect x={x} y="88" width="190" height="116" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 95} y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 95} y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 95} y="181" textAnchor="middle" fontSize="11" fill={color}>{evidence ? "可复核" : "待补证"}</text>
                {index < 2 ? <path d={`M${x + 196} 146 H${x + 228}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="260" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">发布不接受“页面成功”作为唯一证据</text>
          <text x="380" y="288" textAnchor="middle" fontSize="11" fill={evidence ? "var(--success)" : "var(--text-secondary)"}>{evidence ? "证据链闭合：可以交给独立复核者" : "证据链未闭合：继续补齐原始对象"}</text>
        </svg>
      </div>
    </section>
  );
}
