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

const BLOCK_CASES = {
  valid: { label: "有效区块", detail: "previous、交易集合和当前 hash 相互匹配", result: "可以追加" },
  tamper: { label: "篡改交易", detail: "区块内交易改变，重算后的 hash 不再匹配", result: "拒绝区块" },
  broken: { label: "断开链接", detail: "previous 不等于本地链尾 hash", result: "拒绝分叉" },
} as const;

type BlockCase = keyof typeof BLOCK_CASES;

export function BpMiniChainBlockIntegrityLab() {
  const [blockCase, setBlockCase] = useState<BlockCase>("valid");
  const [recalculate, setRecalculate] = useState(false);
  const active = BLOCK_CASES[blockCase];
  const rejected = blockCase !== "valid";

  function reset() {
    setBlockCase("valid");
    setRecalculate(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-mini-chain-block-integrity"
      aria-label={`微链区块完整性实验：${active.label}，${recalculate ? "重算哈希后仍需检查链接" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 8 · 区块结构</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">哈希能发现改变，链接才决定历史</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换有效区块、交易篡改和断链，再重算候选 hash，观察为什么还要校验 previous。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择区块样本</p>
          <div className="grid gap-2">
            {(Object.keys(BLOCK_CASES) as BlockCase[]).map((value) => (
              <ChoiceButton key={value} active={blockCase === value} onClick={() => setBlockCase(value)}>
                {BLOCK_CASES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={recalculate} onClick={() => setRecalculate((value) => !value)}>
            {recalculate ? "停止重算 hash" : "重算候选 hash"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{recalculate && blockCase === "tamper" ? "局部 hash 可以自洽，但后续链接和全链校验仍会暴露改变" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`微链区块完整性图：前块、候选区块、hash 和验证；当前${active.label}；${recalculate ? "重算 hash" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Previous Hash → Block Data → Recomputed Hash</text>
          <rect x="30" y="94" width="168" height="118" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="3" />
          <text x="114" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">前块</text>
          <text x="114" y="160" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">height 11</text>
          <text x="114" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">hash = a91f…</text>
          <path d="M206 153 H264" stroke="var(--border)" strokeWidth="3" />
          <polygon points="264,153 250,145 250,161" fill="var(--border)" />
          <rect x="268" y="80" width="184" height="146" rx="14" fill={rejected ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={rejected ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="360" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">候选区块</text>
          <text x="360" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{blockCase === "tamper" ? "交易金额改变" : "交易集合"}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{blockCase === "broken" ? "previous 错误" : "previous = a91f…"}</text>
          <text x="360" y="206" textAnchor="middle" fontSize="11" fill={rejected ? "var(--warning)" : "var(--text-secondary)"}>{recalculate ? "重新计算" : "待验证"}</text>
          <path d="M468 153 H526" stroke="var(--border)" strokeWidth="3" />
          <polygon points="526,153 512,145 512,161" fill="var(--border)" />
          <rect x="530" y="94" width="196" height="118" rx="14" fill={rejected ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={rejected ? "var(--warning)" : "var(--success)"} strokeWidth="3" />
          <text x="628" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">验证结果</text>
          <text x="628" y="160" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{recalculate && blockCase === "tamper" ? "局部 hash 新值" : active.result}</text>
          <text x="628" y="190" textAnchor="middle" fontSize="11" fill={rejected ? "var(--warning)" : "var(--success)"}>{rejected ? "不追加" : "链接成立"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">局部摘要正确不代表区块属于当前规范历史</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={rejected ? "var(--warning)" : "var(--text-secondary)"}>{rejected ? "失败证据：记录 hash 差异或 previous 断裂" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}

const UTXO_CASES = {
  normal: { label: "正常花费", detail: "输入存在、未花费且价值覆盖输出", result: "交易有效" },
  doubleSpend: { label: "重复花费", detail: "两个候选交易引用同一个已花费输入", result: "只保留一个" },
  overspend: { label: "价值超支", detail: "输出总额超过输入总额，破坏价值守恒", result: "交易拒绝" },
} as const;

type UTXOCase = keyof typeof UTXO_CASES;

export function BpMiniChainUtxoValidationLab() {
  const [utxoCase, setUtxoCase] = useState<UTXOCase>("normal");
  const [signatureError, setSignatureError] = useState(false);
  const active = UTXO_CASES[utxoCase];
  const rejected = signatureError || utxoCase !== "normal";

  function reset() {
    setUtxoCase("normal");
    setSignatureError(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-mini-chain-utxo-validation"
      aria-label={`微链 UTXO 验证实验：${active.label}，${signatureError ? "签名错误" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 8 · 交易验证</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">签名、未花费性和价值守恒缺一不可</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换正常、双花和超支交易，再破坏签名，观察微链为什么不能只验证格式。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择交易样本</p>
          <div className="grid gap-2">
            {(Object.keys(UTXO_CASES) as UTXOCase[]).map((value) => (
              <ChoiceButton key={value} active={utxoCase === value} onClick={() => setUtxoCase(value)}>
                {UTXO_CASES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={signatureError} onClick={() => setSignatureError((value) => !value)}>
            {signatureError ? "恢复正确签名" : "破坏签名"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{signatureError ? "授权失败，节点不能把输入从 UTXO 集合中移除" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`微链 UTXO 验证图：输入、签名、价值守恒和 UTXO 集合；当前${active.label}；${signatureError ? "签名错误" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">UTXO Input → Signature → Value Check → UTXO Set</text>
          <rect x="28" y="94" width="154" height="118" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="3" />
          <text x="105" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">输入</text>
          <text x="105" y="160" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">A: 7 + 4</text>
          <text x="105" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{utxoCase === "doubleSpend" ? "同一输入两次" : "未花费引用"}</text>
          <path d="M190 153 H244" stroke="var(--border)" strokeWidth="3" />
          <polygon points="244,153 230,145 230,161" fill="var(--border)" />
          <rect x="248" y="94" width="148" height="118" rx="14" fill={signatureError ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={signatureError ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="322" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">签名</text>
          <text x="322" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{signatureError ? "公钥不匹配" : "授权有效"}</text>
          <text x="322" y="190" textAnchor="middle" fontSize="11" fill={signatureError ? "var(--warning)" : "var(--text-secondary)"}>{signatureError ? "拒绝" : "可继续"}</text>
          <path d="M404 153 H458" stroke="var(--border)" strokeWidth="3" />
          <polygon points="458,153 444,145 444,161" fill="var(--border)" />
          <rect x="462" y="80" width="142" height="146" rx="14" fill={rejected ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={rejected ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="533" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">规则</text>
          <text x="533" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">未花费性</text>
          <text x="533" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">输入 ≥ 输出</text>
          <text x="533" y="206" textAnchor="middle" fontSize="11" fill={rejected ? "var(--warning)" : "var(--success)"}>{rejected ? "失败" : "通过"}</text>
          <path d="M612 153 H666" stroke="var(--border)" strokeWidth="3" />
          <polygon points="666,153 652,145 652,161" fill="var(--border)" />
          <rect x="670" y="94" width="68" height="118" rx="14" fill={rejected ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={rejected ? "var(--warning)" : "var(--success)"} strokeWidth="3" />
          <text x="704" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">集合</text>
          <text x="704" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{rejected ? "不变" : "更新"}</text>
          <text x="704" y="190" textAnchor="middle" fontSize="11" fill={rejected ? "var(--warning)" : "var(--success)"}>{rejected ? "拒绝" : "提交"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">交易有效是多个不变量同时成立，而不是签名一个条件成立</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={rejected ? "var(--warning)" : "var(--text-secondary)"}>{signatureError ? "失败证据：授权无效，UTXO 状态不能改变" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}

const SYNC_CASES = {
  healthy: { label: "完整同步", detail: "节点逐块验证链接、交易和状态后追上链尾", result: "接受链" },
  damaged: { label: "历史损坏", detail: "中间区块数据改变，后续 hash 链无法闭合", result: "停止同步" },
  partial: { label: "半写区块", detail: "进程中断后只写入部分数据，存储状态没有原子完成", result: "恢复或回滚" },
} as const;

type SyncCase = keyof typeof SYNC_CASES;

export function BpMiniChainSyncPersistenceLab() {
  const [syncCase, setSyncCase] = useState<SyncCase>("healthy");
  const [replay, setReplay] = useState(false);
  const active = SYNC_CASES[syncCase];
  const failed = syncCase !== "healthy";

  function reset() {
    setSyncCase("healthy");
    setReplay(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bp-mini-chain-sync-persistence"
      aria-label={`微链同步与持久化实验：${active.label}，${replay ? "逐块重放" : active.result}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 8 · 同步与存储</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">节点同步必须验证全链，存储必须原子落盘</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换完整、损坏和半写状态，再逐块重放，观察同步节点如何停止传播坏历史。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择同步与存储样本</p>
          <div className="grid gap-2">
            {(Object.keys(SYNC_CASES) as SyncCase[]).map((value) => (
              <ChoiceButton key={value} active={syncCase === value} onClick={() => setSyncCase(value)}>
                {SYNC_CASES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={replay} onClick={() => setReplay((value) => !value)}>
            {replay ? "停止逐块重放" : "逐块重放验证"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.detail}。结论：{replay && syncCase === "damaged" ? "重放在损坏高度停止，不接受最后一个 hash 看似正确的链" : active.result}。
          </p>
        </div>

        <svg viewBox="0 0 760 330" role="img" aria-label={`微链同步图：磁盘、逐块验证、状态提交和链尾；当前${active.label}；${replay ? "逐块重放" : active.result}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Disk → Replay Blocks → Validate → Chain Tip</text>
          <rect x="28" y="94" width="154" height="118" rx="14" fill={syncCase === "partial" ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={syncCase === "partial" ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="105" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">磁盘</text>
          <text x="105" y="160" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{syncCase === "partial" ? "半写文件" : "区块文件"}</text>
          <text x="105" y="190" textAnchor="middle" fontSize="11" fill={syncCase === "partial" ? "var(--warning)" : "var(--text-secondary)"}>{syncCase === "partial" ? "需恢复" : "完整读取"}</text>
          <path d="M190 153 H246" stroke="var(--border)" strokeWidth="3" />
          <polygon points="246,153 232,145 232,161" fill="var(--border)" />
          <rect x="250" y="80" width="164" height="146" rx="14" fill={failed ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={failed ? "var(--warning)" : "var(--accent)"} strokeWidth="3" />
          <text x="332" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">逐块重放</text>
          <text x="332" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">previous / hash</text>
          <text x="332" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">交易 / UTXO</text>
          <text x="332" y="206" textAnchor="middle" fontSize="11" fill={failed ? "var(--warning)" : "var(--text-secondary)"}>{replay ? (failed ? "发现异常" : "逐块通过") : "等待验证"}</text>
          <path d="M432 153 H488" stroke="var(--border)" strokeWidth="3" />
          <polygon points="488,153 474,145 474,161" fill="var(--border)" />
          <rect x="492" y="94" width="112" height="118" rx="14" fill={failed ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={failed ? "var(--warning)" : "var(--success)"} strokeWidth="3" />
          <text x="548" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">状态</text>
          <text x="548" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{failed ? "不提交" : "原子提交"}</text>
          <text x="548" y="190" textAnchor="middle" fontSize="11" fill={failed ? "var(--warning)" : "var(--success)"}>{failed ? "隔离" : "更新"}</text>
          <path d="M622 153 H666" stroke="var(--border)" strokeWidth="3" />
          <polygon points="666,153 652,145 652,161" fill="var(--border)" />
          <rect x="670" y="94" width="68" height="118" rx="14" fill={failed ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={failed ? "var(--warning)" : "var(--success)"} strokeWidth="3" />
          <text x="704" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">链尾</text>
          <text x="704" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{failed ? "停住" : "追上"}</text>
          <text x="704" y="190" textAnchor="middle" fontSize="11" fill={failed ? "var(--warning)" : "var(--success)"}>{failed ? "拒绝" : "接受"}</text>
          <text x="380" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">节点同步是重新验证历史，不是把远端最后一个 hash 当作事实</text>
          <text x="380" y="298" textAnchor="middle" fontSize="11" fill={failed ? "var(--warning)" : "var(--text-secondary)"}>{failed ? "失败证据：在异常高度停止并保留恢复边界" : `当前观察：${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}
