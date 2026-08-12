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

const COMMAND_STAGES = [
  { label: "读取", detail: "网络与钱包" },
  { label: "构造", detail: "参数与输入" },
  { label: "签名", detail: "离线或钱包" },
  { label: "广播", detail: "交易 ID" },
] as const;

export function BdpAppendixBCommandLab() {
  const [stage, setStage] = useState(0);
  const [error, setError] = useState(false);
  const active = COMMAND_STAGES[stage];

  function reset() {
    setStage(0);
    setError(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-appendix-b-command-lifecycle"
      aria-label={`bitcoin-cli 命令生命周期：当前阶段${active.label}，${error ? "已注入上下文错误" : "上下文正常"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Appendix B · 命令生命周期</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">命令只是入口，证据跟着状态走</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">推进读取、构造、签名和广播，观察每步参数与返回值。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择命令阶段</p>
          <div className="grid gap-2">
            {COMMAND_STAGES.map((item, index) => (
              <ChoiceButton key={item.label} active={stage === index} onClick={() => setStage(index)}>
                {`${index + 1}. ${item.label}`}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={error} onClick={() => setError((value) => !value)}>注入参数错误</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前阶段：{active.label}，检查{active.detail}。{error ? "错误已注入，保存原始命令与错误对象并停止。" : "先预测输出，再进入下一阶段。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`bitcoin-cli 命令图：读取、构造、签名、广播；当前${active.label}；${error ? "参数错误已注入" : "参数正常"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Read → Build → Sign → Broadcast</text>
          {COMMAND_STAGES.map((item, index) => {
            const reached = stage >= index;
            const color = error && index >= 1 ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 28 + index * 184;
            return (
              <g key={item.label}>
                <rect x={x} y="82" width="146" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 73} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{item.label}</text>
                <text x={x + 73} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{item.detail}</text>
                <text x={x + 73} y="178" textAnchor="middle" fontSize="11" fill={color}>{error && index >= 1 ? "STOP" : reached ? "已记录" : "待记录"}</text>
                {index < COMMAND_STAGES.length - 1 ? <path d={`M${x + 152} 148 H${x + 176}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">网络、数据目录、钱包和参数要和原始命令一起保存</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={error ? "var(--warning)" : "var(--text-secondary)"}>{error ? "命令停止：错误不能被成功提示覆盖" : `当前阶段：${active.label} · ${active.detail}`}</text>
        </svg>
      </div>
    </section>
  );
}

const WALLET_PROFILES = {
  default: { label: "默认钱包", detail: "节点当前钱包", result: "可查询余额" },
  explicit: { label: "显式钱包", detail: "-rpcwallet=lab", result: "目标钱包已绑定" },
  mismatch: { label: "错误钱包", detail: "缓存钱包或未加载", result: "停止并加载目标钱包" },
} as const;

type WalletProfile = keyof typeof WALLET_PROFILES;

export function BdpAppendixBWalletLab() {
  const [profile, setProfile] = useState<WalletProfile>("explicit");
  const [verified, setVerified] = useState(false);
  const active = WALLET_PROFILES[profile];

  function reset() {
    setProfile("explicit");
    setVerified(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-appendix-b-wallet-context"
      aria-label={`bitcoin-cli 钱包上下文：${active.label}，${active.detail}，${verified ? "已核验" : "未核验"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Appendix B · 钱包上下文</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">同一节点也可能有不同钱包</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换默认、显式和错误钱包，检查命令作用域。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择钱包 profile</p>
          <div className="grid gap-2">
            {(Object.keys(WALLET_PROFILES) as WalletProfile[]).map((value) => (
              <ChoiceButton
                key={value}
                active={profile === value}
                onClick={() => {
                  setProfile(value);
                  setVerified(false);
                }}
              >
                {WALLET_PROFILES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={verified} onClick={() => setVerified((value) => !value)}>
            {verified ? "撤销钱包核验" : "核验钱包上下文"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。{verified ? active.result + "，继续检查网络和权限。" : "先确认钱包已加载，再解释余额、地址或签名结果。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`钱包上下文图：命令、RPC、钱包、UTXO；当前${active.label}；${verified ? "上下文已核验" : "上下文待核验"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">CLI → RPC → Wallet → UTXO View</text>
          {[
            { label: "CLI", detail: "命令" },
            { label: "RPC", detail: "上下文" },
            { label: "钱包", detail: active.detail },
            { label: "UTXO", detail: "余额视图" },
          ].map((node, index) => {
            const valid = verified && profile !== "mismatch";
            const color = profile === "mismatch" && index >= 2 ? "var(--warning)" : valid ? "var(--success)" : "var(--accent)";
            const x = 28 + index * 184;
            return (
              <g key={node.label}>
                <rect x={x} y="82" width="146" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 73} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 73} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 73} y="178" textAnchor="middle" fontSize="11" fill={color}>{profile === "mismatch" && index >= 2 ? "需修正" : valid ? "已核验" : "待核验"}</text>
                {index < 3 ? <path d={`M${x + 152} 148 H${x + 176}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">显式钱包名让同一节点上的余额和签名目标可复核</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={profile === "mismatch" ? "var(--warning)" : verified ? "var(--success)" : "var(--text-secondary)"}>{profile === "mismatch" ? "错误钱包：拒绝解释余额或签名" : verified ? "钱包上下文可继续使用" : "钱包上下文待核验"}</text>
        </svg>
      </div>
    </section>
  );
}

const BROADCAST_STATES = {
  mempool: { label: "内存池中", detail: "0 confirmations", result: "等待区块" },
  confirmed: { label: "已确认", detail: "6 confirmations", result: "可进入最终视图" },
  missing: { label: "未找到", detail: "无 mempool / block", result: "保留错误并排查" },
} as const;

type BroadcastState = keyof typeof BROADCAST_STATES;

export function BdpAppendixBBroadcastLab() {
  const [state, setState] = useState<BroadcastState>("mempool");
  const [rebroadcast, setRebroadcast] = useState(false);
  const active = BROADCAST_STATES[state];

  function reset() {
    setState("mempool");
    setRebroadcast(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-appendix-b-broadcast-evidence"
      aria-label={`交易广播实验：当前${active.label}，${rebroadcast ? "已打开重广播检查" : "未打开重广播检查"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Appendix B · 广播证据</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">交易 ID 不等于确认深度</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换交易状态，比较内存池、区块和确认查询的证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择广播状态</p>
          <div className="grid gap-2">
            {(Object.keys(BROADCAST_STATES) as BroadcastState[]).map((value) => (
              <ChoiceButton key={value} active={state === value} onClick={() => setState(value)}>
                {BROADCAST_STATES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={rebroadcast} onClick={() => setRebroadcast((value) => !value)}>打开重广播检查</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。{rebroadcast ? "同时比较 mempool、gettransaction 和当前高度，避免重复发送造成误判。" : active.result + "；先保存 txid 和原始 RPC 响应。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`交易广播图：交易 ID、内存池、区块、确认；当前${active.label}；${rebroadcast ? "重广播检查已开启" : "重广播检查未开启"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">txid → Mempool → Block → Confirmations</text>
          {[
            { label: "txid", detail: "已返回" },
            { label: "Mempool", detail: state === "mempool" ? "存在" : "查询" },
            { label: "Block", detail: state === "confirmed" ? "已包含" : "等待" },
            { label: "Confirm", detail: active.detail },
          ].map((node, index) => {
            const reached = state === "confirmed" || (state === "mempool" && index < 2);
            const color = state === "missing" ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 28 + index * 184;
            return (
              <g key={node.label}>
                <rect x={x} y="82" width="146" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 73} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 73} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 73} y="178" textAnchor="middle" fontSize="11" fill={color}>{state === "missing" ? "排查" : reached ? "已记录" : "待记录"}</text>
                {index < 3 ? <path d={`M${x + 152} 148 H${x + 176}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">状态查询要绑定网络、钱包、txid 和当前区块高度</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={state === "missing" ? "var(--warning)" : state === "confirmed" ? "var(--success)" : "var(--text-secondary)"}>{state === "missing" ? "未找到：不要自动重复广播，先保存错误上下文" : `当前状态：${active.label} · ${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}
