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

const STATE_ACTIONS = {
  transfer: {
    label: "原生币转账",
    detail: "调用者签名、nonce 连续且余额足够，账户状态可以提交",
    result: "余额与 nonce 更新",
  },
  contract: {
    label: "合约调用",
    detail: "字节码读取前状态并产生写集、事件和 Gas 消耗",
    result: "执行结果写入状态根",
  },
  revert: {
    label: "显式回滚",
    detail: "执行中触发失败，临时写集被丢弃但已消耗 Gas 仍计费",
    result: "状态恢复到调用前",
  },
} as const;

type StateAction = keyof typeof STATE_ACTIONS;

export function BpEthereumStateTransitionLab() {
  const [action, setAction] = useState<StateAction>("transfer");
  const [badNonce, setBadNonce] = useState(false);
  const active = STATE_ACTIONS[action];

  function reset() {
    setAction("transfer");
    setBadNonce(false);
  }

  const rejected = badNonce || action === "revert";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-ethereum-state-transition"
      aria-label={`以太坊状态转移实验：${active.label}，${badNonce ? "nonce 不连续" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 6 · 状态机</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">同一前状态，才能重放同一后状态</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换转账、合约调用和回滚，再破坏 nonce，观察执行证据如何决定状态是否提交。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择调用类型</p>
          <div className="grid gap-2">
            {(Object.keys(STATE_ACTIONS) as StateAction[]).map((value) => (
              <ChoiceButton key={value} active={action === value} onClick={() => setAction(value)}>
                {STATE_ACTIONS[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={badNonce} onClick={() => setBadNonce((value) => !value)}>
            {badNonce ? "恢复连续 nonce" : "制造 nonce 间隙"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{badNonce ? "节点拒绝或暂存交易，不应把它写入后状态" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`以太坊状态转移图：前状态、EVM 执行、后状态；当前${active.label}；${badNonce ? "nonce 不连续" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Pre-state → EVM Execution → Post-state</text>
          <rect x="30" y="88" width="186" height="130" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="3" />
          <text x="123" y="123" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">前状态</text>
          <text x="123" y="155" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">余额 / nonce / storage</text>
          <text x="123" y="187" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">A=10 · n=7</text>
          <path d="M224 153 H284" stroke="var(--border)" strokeWidth="3" />
          <polygon points="284,153 270,145 270,161" fill="var(--border)" />
          <rect x="288" y="74" width="184" height="158" rx="14" fill={badNonce ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={badNonce ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="380" y="113" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">EVM 执行</text>
          <text x="380" y="145" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">签名 + nonce + Gas</text>
          <text x="380" y="175" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="380" y="205" textAnchor="middle" fontSize="11" fill={badNonce ? "var(--warning)" : "var(--text-secondary)"}>{badNonce ? "nonce 检查失败" : "执行证据产生"}</text>
          <path d="M480 153 H540" stroke="var(--border)" strokeWidth="3" />
          <polygon points="540,153 526,145 526,161" fill="var(--border)" />
          <rect x="544" y="88" width="186" height="130" rx="14" fill={rejected || badNonce ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={rejected || badNonce ? "var(--warning)" : "var(--success)"} strokeWidth="3" />
          <text x="637" y="123" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">后状态</text>
          <text x="637" y="155" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{badNonce ? "保持不变" : action === "revert" ? "恢复快照" : "状态根更新"}</text>
          <text x="637" y="187" textAnchor="middle" fontSize="11" fill={rejected || badNonce ? "var(--warning)" : "var(--success)"}>{badNonce ? "拒绝" : action === "revert" ? "回滚" : "提交"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">确定性只保证输入、代码和环境相同时重放结果一致</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={rejected || badNonce ? "var(--warning)" : "var(--text-secondary)"}>{badNonce ? "失败证据：nonce 间隙，不能跳过状态序列" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}

const GAS_CASES = {
  cheap: { label: "低成本调用", detail: "Gas Limit 足够覆盖执行路径", result: "提交写集" },
  boundary: { label: "边界预算", detail: "剩余 Gas 刚好覆盖最后一条指令", result: "谨慎提交" },
  exhaust: { label: "Gas 耗尽", detail: "执行未完成，临时状态写集必须回滚", result: "退回前状态" },
} as const;

type GasCase = keyof typeof GAS_CASES;

export function BpEthereumGasRollbackLab() {
  const [gasCase, setGasCase] = useState<GasCase>("cheap");
  const [tightLimit, setTightLimit] = useState(false);
  const active = GAS_CASES[gasCase];
  const exhausted = gasCase === "exhaust" || tightLimit;

  function reset() {
    setGasCase("cheap");
    setTightLimit(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-ethereum-gas-rollback"
      aria-label={`以太坊 Gas 回滚实验：${active.label}，${exhausted ? "回滚状态写集" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 6 · Gas 与回滚</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">回滚状态，不代表退还全部计算成本</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换执行预算和边界条件，区分临时写集、实际 Gas 消耗与最终状态。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择执行样本</p>
          <div className="grid gap-2">
            {(Object.keys(GAS_CASES) as GasCase[]).map((value) => (
              <ChoiceButton key={value} active={gasCase === value} onClick={() => setGasCase(value)}>
                {GAS_CASES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={tightLimit} onClick={() => setTightLimit((value) => !value)}>
            {tightLimit ? "恢复充足预算" : "压低 Gas Limit"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{exhausted ? "状态写入回滚，已消耗的 Gas 仍进入费用证据" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`Gas 回滚图：预算、执行、临时写集和提交；当前${active.label}；${exhausted ? "回滚状态写集" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Gas Limit → Execution Meter → Commit or Revert</text>
          <rect x="40" y="94" width="174" height="118" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="3" />
          <text x="127" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">预算</text>
          <text x="127" y="160" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{tightLimit ? "10,000 Gas" : "50,000 Gas"}</text>
          <text x="127" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">调用者先授权上限</text>
          <path d="M222 153 H284" stroke="var(--border)" strokeWidth="3" />
          <polygon points="284,153 270,145 270,161" fill="var(--border)" />
          <rect x="288" y="78" width="184" height="150" rx="14" fill={exhausted ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={exhausted ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="380" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">执行计量</text>
          <rect x="326" y="137" width="108" height="18" rx="9" fill="var(--border)" />
          <rect x="326" y="137" width={exhausted ? "94" : "62"} height="18" rx="9" fill={exhausted ? "var(--warning)" : "var(--success)"} />
          <text x="380" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{exhausted ? "预算耗尽" : "仍有余量"}</text>
          <text x="380" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">读集 / 临时写集 / 事件</text>
          <path d="M480 153 H540" stroke="var(--border)" strokeWidth="3" />
          <polygon points="540,153 526,145 526,161" fill="var(--border)" />
          <rect x="544" y="94" width="174" height="118" rx="14" fill={exhausted ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={exhausted ? "var(--warning)" : "var(--success)"} strokeWidth="3" />
          <text x="631" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{exhausted ? "回滚" : "提交"}</text>
          <text x="631" y="160" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{exhausted ? "状态恢复快照" : "写集进入后状态"}</text>
          <text x="631" y="190" textAnchor="middle" fontSize="11" fill={exhausted ? "var(--warning)" : "var(--success)"}>{exhausted ? "费用仍计" : "事件可索引"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Gas 是执行资源预算，不是“成功才收费”的押金</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={exhausted ? "var(--warning)" : "var(--text-secondary)"}>{exhausted ? "失败证据：写集丢弃，但 Gas 使用量保留" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}

const TOKEN_ROLES = {
  owner: { label: "Owner 管理员", detail: "拥有铸币或暂停权限，调用必须通过角色检查", result: "允许并记录事件" },
  user: { label: "普通持有者", detail: "只能在余额足够时转移自己的代币", result: "检查余额后转账" },
  stranger: { label: "未知调用者", detail: "不在授权集合中，不能冒充管理员改变全局状态", result: "拒绝调用" },
} as const;

type TokenRole = keyof typeof TOKEN_ROLES;

export function BpEthereumTokenAuthorityLab() {
  const [role, setRole] = useState<TokenRole>("owner");
  const [paused, setPaused] = useState(false);
  const active = TOKEN_ROLES[role];
  const accepted = role !== "stranger" && !paused;

  function reset() {
    setRole("owner");
    setPaused(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-ethereum-token-authority"
      aria-label={`代币权限实验：${active.label}，${paused ? "合约暂停" : accepted ? active.result : "拒绝调用"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 6 · 代币合约</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">代码能执行，不等于调用者有权执行</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换调用者和暂停开关，观察权限、余额、事件和后状态如何共同构成执行证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择调用者与全局状态</p>
          <div className="grid gap-2">
            {(Object.keys(TOKEN_ROLES) as TokenRole[]).map((value) => (
              <ChoiceButton key={value} active={role === value} onClick={() => setRole(value)}>
                {TOKEN_ROLES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={paused} onClick={() => setPaused((value) => !value)}>
            {paused ? "解除暂停" : "暂停合约"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{paused ? "全局暂停优先，普通转账和铸币都应拒绝" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`代币权限图：调用者、权限检查、事件与后状态；当前${active.label}；${paused ? "合约暂停" : accepted ? active.result : "拒绝调用"}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Caller → Permission Check → Event + State</text>
          <rect x="34" y="94" width="170" height="118" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="3" />
          <text x="119" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">调用者</text>
          <text x="119" y="160" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="119" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">签名地址进入 calldata</text>
          <path d="M212 153 H274" stroke="var(--border)" strokeWidth="3" />
          <polygon points="274,153 260,145 260,161" fill="var(--border)" />
          <rect x="278" y="78" width="204" height="150" rx="14" fill={paused || role === "stranger" ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={paused || role === "stranger" ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="380" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">权限检查</text>
          <text x="380" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">role / balance / paused</text>
          <text x="380" y="180" textAnchor="middle" fontSize="12" fill={paused || role === "stranger" ? "var(--warning)" : "var(--success)"}>{paused ? "暂停拒绝" : role === "stranger" ? "角色拒绝" : "检查通过"}</text>
          <text x="380" y="208" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">所有路径都记录原因</text>
          <path d="M490 153 H550" stroke="var(--border)" strokeWidth="3" />
          <polygon points="550,153 536,145 536,161" fill="var(--border)" />
          <rect x="554" y="94" width="172" height="118" rx="14" fill={accepted ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={accepted ? "var(--success)" : "var(--warning)"} strokeWidth="3" />
          <text x="640" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{accepted ? "后状态" : "拒绝"}</text>
          <text x="640" y="160" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{accepted ? "余额 / totalSupply" : "状态不变"}</text>
          <text x="640" y="190" textAnchor="middle" fontSize="11" fill={accepted ? "var(--success)" : "var(--warning)"}>{accepted ? "Transfer / Mint 事件" : "保留失败原因"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">权限审计要同时查看调用者、状态变量、事件和暂停路径</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={accepted ? "var(--text-secondary)" : "var(--warning)"}>{paused ? "失败证据：暂停优先级高于角色权限" : accepted ? `当前观察：${active.result}` : "失败证据：未知调用者不能升级权限"}</text>
        </svg>
      </div>
    </section>
  );
}
