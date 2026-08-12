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
      className={BUTTON_CLASS + (active ? " border-accent bg-accent/10 text-accent" : "")}
    >
      {children}
    </button>
  );
}

const LIFECYCLE_STAGES = [
  { label: "待签名", evidence: "意图、账户、chain ID" },
  { label: "已广播", evidence: "交易哈希、provider" },
  { label: "已打包", evidence: "Receipt、区块" },
  { label: "已确认", evidence: "确认深度、状态" },
  { label: "失败", evidence: "错误、原状态" },
] as const;

export function BdpCh11LifecycleLab() {
  const [stage, setStage] = useState(0);
  const [wrongNetwork, setWrongNetwork] = useState(false);

  function reset() {
    setStage(0);
    setWrongNetwork(false);
  }

  const active = LIFECYCLE_STAGES[stage];
  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch11-transaction-lifecycle"
      aria-label={`DApp 交易生命周期：当前状态${active.label}，${wrongNetwork ? "网络不匹配" : "网络已匹配"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 11 · 交易生命周期</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">按钮反馈不是链上事实</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">推进发布状态，观察每一阶段应该保存的证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择状态与故障</p>
          <div className="grid gap-2">
            {LIFECYCLE_STAGES.map((item, index) => (
              <ChoiceButton key={item.label} active={stage === index} onClick={() => setStage(index)}>
                {`${index + 1}. ${item.label}`}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={wrongNetwork} onClick={() => setWrongNetwork((value) => !value)}>注入网络错误</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：应保存{active.evidence}。{wrongNetwork ? "chain ID 不匹配，停止等待并保留错误。" : "先预测状态，再决定是否可以更新界面。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`交易生命周期图：${LIFECYCLE_STAGES.map((item) => item.label).join("、")}；当前${active.label}；${wrongNetwork ? "网络错误已注入" : "网络正常"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Sign → Broadcast → Mine → Confirm → Recover</text>
          {LIFECYCLE_STAGES.map((item, index) => {
            const reached = stage >= index && index < 4;
            const failed = index === 4 && stage === 4;
            const color = wrongNetwork && index >= 1 ? "var(--warning)" : failed ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 14 + index * 148;
            return (
              <g key={item.label}>
                <rect x={x} y="82" width="118" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 59} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{item.label}</text>
                <text x={x + 59} y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{item.evidence.split("、")[0]}</text>
                <text x={x + 59} y="176" textAnchor="middle" fontSize="11" fill={color}>{failed || (wrongNetwork && index >= 1) ? "STOP" : reached ? "已记录" : "待记录"}</text>
                {index < LIFECYCLE_STAGES.length - 1 ? <path d={`M${x + 124} 148 H${x + 142}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">交易哈希只说明请求被看到；Receipt 与确认才说明执行阶段</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={wrongNetwork || stage === 4 ? "var(--warning)" : "var(--text-secondary)"}>{wrongNetwork ? "网络错误：保留 provider、chain ID 与原状态" : `当前状态：${active.label} · ${active.evidence}`}</text>
        </svg>
      </div>
    </section>
  );
}

const CONTEXT_MODES = {
  fresh: { label: "新鲜上下文", account: "当前账户", network: "目标 chain ID", result: "可以请求签名" },
  switched: { label: "账户已切换", account: "新账户", network: "目标 chain ID", result: "清理旧地址后重读" },
  stale: { label: "陈旧上下文", account: "旧账户缓存", network: "未知 chain ID", result: "拒绝提交并提示重连" },
} as const;

type ContextMode = keyof typeof CONTEXT_MODES;

export function BdpCh11ContextLab() {
  const [mode, setMode] = useState<ContextMode>("fresh");
  const [verified, setVerified] = useState(false);
  const active = CONTEXT_MODES[mode];

  function reset() {
    setMode("fresh");
    setVerified(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch11-wallet-context"
      aria-label={`钱包上下文实验：${active.label}，账户为${active.account}，网络为${active.network}，${verified ? "已验证" : "未验证"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 11 · 钱包上下文</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">账户与网络必须成对校验</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">模拟钱包切换和陈旧缓存，决定前端是否允许提交。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择上下文</p>
          <div className="grid gap-2">
            {(Object.keys(CONTEXT_MODES) as ContextMode[]).map((value) => (
              <ChoiceButton
                key={value}
                active={mode === value}
                onClick={() => {
                  setMode(value);
                  setVerified(false);
                }}
              >
                {CONTEXT_MODES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={verified} onClick={() => setVerified((value) => !value)}>
            {verified ? "撤销上下文核验" : "核验账户与网络"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.account} + {active.network}。{verified ? active.result + "。" : "先读取钱包事件，再比较当前账户、chain ID 与合约地址。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`钱包上下文图：前端、钱包、provider、链；当前${active.label}，${verified ? "核验通过" : "等待核验"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Frontend → Wallet → Provider → Chain</text>
          {[
            { label: "前端", detail: "清理缓存" },
            { label: "钱包", detail: active.account },
            { label: "provider", detail: active.network },
            { label: "链上", detail: "地址 + code" },
          ].map((node, index) => {
            const valid = verified && mode !== "stale";
            const color = mode === "stale" && index > 0 ? "var(--warning)" : valid ? "var(--success)" : "var(--accent)";
            const x = 28 + index * 184;
            return (
              <g key={node.label}>
                <rect x={x} y="82" width="146" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 73} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 73} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 73} y="178" textAnchor="middle" fontSize="11" fill={color}>{mode === "stale" && index > 0 ? "需刷新" : valid ? "已核验" : "待核验"}</text>
                {index < 3 ? <path d={`M${x + 152} 148 H${x + 176}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">账户切换、网络切换和 provider 变化都要触发上下文重建</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={mode === "stale" ? "var(--warning)" : verified ? "var(--success)" : "var(--text-secondary)"}>{mode === "stale" ? "陈旧上下文：拒绝使用旧地址提交" : verified ? "上下文已核验：可以进入签名阶段" : "上下文待核验：不要复用旧状态"}</text>
        </svg>
      </div>
    </section>
  );
}

const POST_SAMPLES = {
  short: { label: "普通微博", input: "作者 + 内容摘要", hash: "hash-A", result: "创建一条记录" },
  edge: { label: "边界内容", input: "最大长度 + 空白检查", hash: "hash-B", result: "按规则接受或拒绝" },
  duplicate: { label: "重复提交", input: "同一摘要 + 新 nonce", hash: "hash-A", result: "显示已有请求并防重复" },
} as const;

type PostSample = keyof typeof POST_SAMPLES;

export function BdpCh11PostLab() {
  const [sample, setSample] = useState<PostSample>("short");
  const [published, setPublished] = useState(false);
  const [replayed, setReplayed] = useState(false);
  const active = POST_SAMPLES[sample];

  function reset() {
    setSample("short");
    setPublished(false);
    setReplayed(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch11-microblog-evidence"
      aria-label={`去中心化微博实验：${active.label}，${published ? "已发布" : "未发布"}，${replayed ? "已开启重放" : "未开启重放"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 11 · 微博证据</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">事件是线索，状态才是事实</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择内容样本，模拟发布与重放，检查摘要、交易和状态是否相符。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择微博样本</p>
          <div className="grid gap-2">
            {(Object.keys(POST_SAMPLES) as PostSample[]).map((value) => (
              <ChoiceButton
                key={value}
                active={sample === value}
                onClick={() => {
                  setSample(value);
                  setPublished(false);
                  setReplayed(false);
                }}
              >
                {POST_SAMPLES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <ChoiceButton active={published} onClick={() => setPublished((value) => !value)}>{published ? "撤销发布状态" : "提交微博"}</ChoiceButton>
            <ChoiceButton active={replayed} onClick={() => setReplayed((value) => !value)}>切换重放检查</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.input}，得到 {active.hash}。{replayed ? "重放时比较摘要、nonce、Receipt 和链上内容。" : published ? active.result + "，等待 Receipt 与确认。" : "先预测链上记录，再提交请求。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`微博证据图：输入、摘要、交易、链上状态；当前${active.label}，${published ? "请求已提交" : "请求未提交"}，${replayed ? "正在重放核验" : "未重放核验"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Post → Digest → Transaction → Chain State</text>
          {[
            { label: "内容", detail: active.input.split(" + ")[0] },
            { label: "摘要", detail: active.hash },
            { label: "交易", detail: published ? "Receipt" : "待签名" },
            { label: "状态", detail: published ? "微博记录" : "未写入" },
          ].map((node, index) => {
            const color = replayed && index > 0 ? "var(--success)" : published && index >= 2 ? "var(--success)" : "var(--accent)";
            const x = 28 + index * 184;
            return (
              <g key={node.label}>
                <rect x={x} y="82" width="146" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 73} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 73} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 73} y="178" textAnchor="middle" fontSize="11" fill={color}>{replayed && index > 0 ? "已核对" : published || index < 2 ? "已记录" : "待记录"}</text>
                {index < 3 ? <path d={`M${x + 152} 148 H${x + 176}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">同一内容摘要可能被重复请求；nonce、Receipt 和链上状态要一起核对</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={replayed ? "var(--success)" : "var(--text-secondary)"}>{replayed ? "重放通过：事件与链上状态相互印证" : `当前样本：${active.label} · ${published ? "等待确认" : "等待提交"}`}</text>
        </svg>
      </div>
    </section>
  );
}
