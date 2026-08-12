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

const CLAIM_LAYERS = [
  { label: "声明", detail: "原书句子与范围" },
  { label: "对象", detail: "代码、协议或工具" },
  { label: "反例", detail: "会推翻声明的输入" },
  { label: "边界", detail: "今天仍成立的部分" },
] as const;

export function BpTechnicalReviewClaimLab() {
  const [layer, setLayer] = useState(0);
  const [counterexample, setCounterexample] = useState(false);
  const active = CLAIM_LAYERS[layer];

  function reset() {
    setLayer(0);
    setCounterexample(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-technical-review-claim"
      aria-label={`技术声明审校实验：当前${active.label}，${counterexample ? "已注入反例" : "未注入反例"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Technical review · 声明拆解</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先拆声明，再判断它是否成立</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">沿声明、对象、反例和边界推进，避免把类比当成协议保证。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择审校层</p>
          <div className="grid gap-2">
            {CLAIM_LAYERS.map((item, index) => (
              <ChoiceButton key={item.label} active={layer === index} onClick={() => setLayer(index)}>
                {`${index + 1}. ${item.label}`}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={counterexample} onClick={() => setCounterexample((value) => !value)}>
            注入反例输入
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前：{active.label}（{active.detail}）。{counterexample ? "反例已注入，检查声明在哪个范围失效。" : "先预测下一层要补哪种证据。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`技术声明审校图：声明、对象、反例、边界；当前${active.label}；${counterexample ? "反例已注入" : "声明待审"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Claim → Object → Counterexample → Boundary</text>
          {CLAIM_LAYERS.map((item, index) => {
            const reached = layer >= index;
            const stopped = counterexample && index >= layer;
            const color = stopped ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 24 + index * 188;
            return (
              <g key={item.label}>
                <rect x={x} y="82" width="150" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 75} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{item.label}</text>
                <text x={x + 75} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{item.detail}</text>
                <text x={x + 75} y="178" textAnchor="middle" fontSize="11" fill={color}>{stopped ? "检查" : reached ? "已记录" : "待记录"}</text>
                {index < CLAIM_LAYERS.length - 1 ? <path d={`M${x + 156} 148 H${x + 180}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">“不可篡改”“安全”“去中心化”都必须落到可观察边界</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={counterexample ? "var(--warning)" : "var(--text-secondary)"}>{counterexample ? "反例路径：记录失效范围，不删除原声明" : `当前层：${active.label}`}</text>
        </svg>
      </div>
    </section>
  );
}

const VERSION_PROFILES = {
  historical: { label: "2017 基线", detail: "原书工具与默认值", result: "保留历史语境" },
  current: { label: "现代替代", detail: "当前工具与官方文档", result: "单列兼容差异" },
  mismatch: { label: "错配环境", detail: "版本或网络不一致", result: "停止并回退" },
} as const;

type VersionProfile = keyof typeof VERSION_PROFILES;

export function BpTechnicalReviewVersionLab() {
  const [profile, setProfile] = useState<VersionProfile>("historical");
  const [verified, setVerified] = useState(false);
  const active = VERSION_PROFILES[profile];

  function reset() {
    setProfile("historical");
    setVerified(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-technical-review-version"
      aria-label={`技术版本审校实验：${active.label}，${verified ? "已核验" : "未核验"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Technical review · 版本矩阵</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">能运行不等于版本等价</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换历史基线、现代替代和错配环境，观察迁移需要补哪些证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择版本档案</p>
          <div className="grid gap-2">
            {(Object.keys(VERSION_PROFILES) as VersionProfile[]).map((value) => (
              <ChoiceButton key={value} active={profile === value} onClick={() => { setProfile(value); setVerified(false); }}>
                {VERSION_PROFILES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={verified} onClick={() => setVerified((value) => !value)}>
            {verified ? "撤销版本核验" : "核验版本、网络和输出"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。{verified ? active.result + "，并保存差异表。" : "先预测当前档案会改变哪一个观察结果。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`技术版本矩阵图：工具、网络、输出；当前${active.label}；${verified ? "已核验" : "待核验"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Tool → Network → Output</text>
          {[
            { label: "工具", detail: active.detail },
            { label: "网络", detail: profile === "mismatch" ? "不一致" : "已标注" },
            { label: "输出", detail: profile === "mismatch" ? "不可比较" : "待对照" },
          ].map((node, index) => {
            const invalid = profile === "mismatch" && index > 0;
            const color = invalid ? "var(--warning)" : verified ? "var(--success)" : "var(--accent)";
            const x = 54 + index * 238;
            return (
              <g key={node.label}>
                <rect x={x} y="88" width="190" height="116" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 95} y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 95} y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 95} y="181" textAnchor="middle" fontSize="11" fill={color}>{invalid ? "回退" : verified ? "已核验" : "待核验"}</text>
                {index < 2 ? <path d={`M${x + 196} 146 H${x + 228}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="260" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">版本、网络和输出必须进入同一份差异表</text>
          <text x="380" y="288" textAnchor="middle" fontSize="11" fill={profile === "mismatch" ? "var(--warning)" : verified ? "var(--success)" : "var(--text-secondary)"}>{profile === "mismatch" ? "停止：先恢复到一致环境" : verified ? "迁移边界已记录" : "版本边界待核验"}</text>
        </svg>
      </div>
    </section>
  );
}

const FAILURE_MODES = {
  hash: { label: "摘要链接", detail: "修改区块字段", result: "后续链接失效" },
  signature: { label: "签名授权", detail: "更换签名或公钥", result: "验证拒绝" },
  context: { label: "安全上下文", detail: "更换网络或权限", result: "结论降级" },
} as const;

type FailureMode = keyof typeof FAILURE_MODES;

export function BpTechnicalReviewFailureLab() {
  const [failure, setFailure] = useState<FailureMode>("hash");
  const [replayed, setReplayed] = useState(false);
  const active = FAILURE_MODES[failure];

  function reset() {
    setFailure("hash");
    setReplayed(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-technical-review-failure"
      aria-label={`技术失败回放实验：${active.label}，${replayed ? "已完成回放" : "等待回放"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Technical review · 反例回放</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">负面声明必须能被反例击中</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择摘要、签名或上下文故障，再记录首个异常和恢复动作。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择反例</p>
          <div className="grid gap-2">
            {(Object.keys(FAILURE_MODES) as FailureMode[]).map((value) => (
              <ChoiceButton key={value} active={failure === value} onClick={() => { setFailure(value); setReplayed(false); }}>
                {FAILURE_MODES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={replayed} onClick={() => setReplayed((value) => !value)}>
            {replayed ? "撤销反例回放" : "执行反例回放"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。{replayed ? active.result + "；保存首个异常与回退点。" : "先预测哪个字段会最先改变。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`技术失败回放图：输入、验证、结果；当前${active.label}；${replayed ? "回放完成" : "回放待执行"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Input → Verify → Result</text>
          {[
            { label: "输入", detail: active.detail },
            { label: "验证", detail: "规则与上下文" },
            { label: "结果", detail: active.result },
          ].map((node, index) => {
            const color = replayed ? "var(--warning)" : "var(--accent)";
            const x = 54 + index * 238;
            return (
              <g key={node.label}>
                <rect x={x} y="88" width="190" height="116" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 95} y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 95} y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 95} y="181" textAnchor="middle" fontSize="11" fill={color}>{replayed ? "已定位" : "待定位"}</text>
                {index < 2 ? <path d={`M${x + 196} 146 H${x + 228}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="260" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">反例不是破坏性演示，而是声明范围的测量工具</text>
          <text x="380" y="288" textAnchor="middle" fontSize="11" fill={replayed ? "var(--warning)" : "var(--text-secondary)"}>{replayed ? "回放完成：错误对象、首个异常和恢复点已记录" : "回放未完成：先选择一个反例"}</text>
        </svg>
      </div>
    </section>
  );
}
