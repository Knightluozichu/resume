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

const TRACE_STAGES = {
  sign: {
    label: "签名",
    object: "调用者、nonce、chain ID",
    output: "可广播的原始交易",
    check: "签名与网络身份匹配",
  },
  execute: {
    label: "执行",
    object: "当前状态、代码、Gas",
    output: "回执、日志或回滚",
    check: "状态前置条件与资源",
  },
  confirm: {
    label: "确认",
    object: "区块、深度、规范链",
    output: "稳定的状态证据",
    check: "包含位置与确认阈值",
  },
} as const;

type TraceStage = keyof typeof TRACE_STAGES;

export function BdpCh03TransactionTraceLab() {
  const [stage, setStage] = useState<TraceStage>("sign");
  const [captured, setCaptured] = useState(false);
  const active = TRACE_STAGES[stage];

  function reset() {
    setStage("sign");
    setCaptured(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch03-transaction-trace"
      aria-label={
        "交易轨迹实验：当前阶段为" +
        active.label +
        "，观察对象是" +
        active.object +
        "，输出是" +
        active.output +
        "；证据" +
        (captured ? "已保存" : "未保存") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 03 · 交易状态实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">不要把交易哈希当成最终状态</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换签名、执行和确认阶段，观察每个阶段拥有的证据以及尚未证明的事情。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择交易阶段</p>
          <div className="grid gap-2">
            <ChoiceButton active={stage === "sign"} onClick={() => setStage("sign")}>签名：准备广播</ChoiceButton>
            <ChoiceButton active={stage === "execute"} onClick={() => setStage("execute")}>执行：得到回执</ChoiceButton>
            <ChoiceButton active={stage === "confirm"} onClick={() => setStage("confirm")}>确认：达到深度</ChoiceButton>
          </div>
          <ChoiceButton active={captured} onClick={() => setCaptured((value) => !value)}>{captured ? "撤销原始证据" : "保存原始证据"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前：{active.label}。对象是“{active.object}”，可见输出是“{active.output}”。检查：{active.check}。{captured ? " 已保存阶段证据。" : " 尚未保存阶段证据。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "交易轨迹：签名、执行、确认三个阶段；当前为" +
            active.label +
            "，观察" +
            active.object +
            "，得到" +
            active.output +
            "，证据" +
            (captured ? "已保存" : "未保存") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Sign → Execute → Include → Confirm</text>
          <rect x="28" y="78" width="164" height="132" rx="14" fill={stage === "sign" ? "var(--accent)" : "var(--bg)"} fillOpacity={stage === "sign" ? 0.12 : 1} stroke={stage === "sign" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="110" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Sign</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">调用者与 nonce</text>
          <text x="110" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">原始交易</text>
          <path d="M214 144 H248" stroke="var(--border)" strokeWidth="3" />
          <rect x="260" y="78" width="164" height="132" rx="14" fill={stage === "execute" ? "var(--accent)" : "var(--bg)"} fillOpacity={stage === "execute" ? 0.12 : 1} stroke={stage === "execute" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="342" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Execute</text>
          <text x="342" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">状态与 Gas</text>
          <text x="342" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">回执或回滚</text>
          <path d="M446 144 H480" stroke="var(--border)" strokeWidth="3" />
          <rect x="492" y="78" width="240" height="132" rx="14" fill={captured && stage === "confirm" ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={captured && stage === "confirm" ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="612" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Confirm</text>
          <text x="612" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">区块与确认深度</text>
          <text x="612" y="178" textAnchor="middle" fontSize="11" fill={captured && stage === "confirm" ? "var(--success)" : "var(--warning)"}>{captured && stage === "confirm" ? "可复核" : "尚未证明"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">pending、included 与 confirmed 是不同证据等级</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.check}</text>
        </svg>
      </div>
    </section>
  );
}

const GAS_ACTIONS = {
  transfer: {
    label: "转账",
    estimate: "基础转账成本",
    resource: "签名、余额、nonce",
    failure: "余额或 Gas 预算不足",
  },
  call: {
    label: "合约调用",
    estimate: "执行路径与外部调用",
    resource: "代码、存储读取、Gas",
    failure: "前置条件失败或执行回滚",
  },
  storage: {
    label: "写入存储",
    estimate: "新旧存储槽变化",
    resource: "状态空间、Gas、区块上限",
    failure: "资源耗尽或区块上限约束",
  },
} as const;

type GasAction = keyof typeof GAS_ACTIONS;

export function BdpCh03GasBudgetLab() {
  const [action, setAction] = useState<GasAction>("transfer");
  const [budgeted, setBudgeted] = useState(false);
  const active = GAS_ACTIONS[action];

  function reset() {
    setAction("transfer");
    setBudgeted(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch03-gas-budget"
      aria-label={
        "Gas预算实验：当前操作为" +
        active.label +
        "，估算" +
        active.estimate +
        "，资源是" +
        active.resource +
        "，失败信号是" +
        active.failure +
        "；预算" +
        (budgeted ? "已记录" : "未记录") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 03 · Gas 预算实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">把 Gas 当作执行资源，不是成功按钮</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择操作类型，比较估算、预算、实际消耗和失败信号，避免只提高上限掩盖逻辑错误。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "Gas资源链路：" +
            active.label +
            "需要" +
            active.estimate +
            "，使用" +
            active.resource +
            "，失败信号是" +
            active.failure +
            "；预算" +
            (budgeted ? "已记录" : "未记录") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Action → Estimate → Gas Limit → Receipt</text>
          <rect x="28" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="110" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Action</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="110" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">状态变化</text>
          <path d="M214 144 H248" stroke="var(--border)" strokeWidth="3" />
          <rect x="260" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="342" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Estimate</text>
          <text x="342" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.estimate}</text>
          <text x="342" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">预期消耗</text>
          <path d="M446 144 H480" stroke="var(--border)" strokeWidth="3" />
          <rect x="492" y="78" width="240" height="132" rx="14" fill={budgeted ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={budgeted ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="612" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Receipt</text>
          <text x="612" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{budgeted ? "上限、消耗、状态" : "等待预算记录"}</text>
          <text x="612" y="178" textAnchor="middle" fontSize="11" fill={budgeted ? "var(--success)" : "var(--warning)"}>{budgeted ? "可解释" : "先检查预算"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Gas 不会修复权限、输入或合约逻辑错误</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.failure}</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择操作</p>
          <div className="grid gap-2">
            <ChoiceButton active={action === "transfer"} onClick={() => setAction("transfer")}>转账</ChoiceButton>
            <ChoiceButton active={action === "call"} onClick={() => setAction("call")}>合约调用</ChoiceButton>
            <ChoiceButton active={action === "storage"} onClick={() => setAction("storage")}>写入存储</ChoiceButton>
          </div>
          <ChoiceButton active={budgeted} onClick={() => setBudgeted((value) => !value)}>{budgeted ? "撤销 Gas 预算" : "记录 Gas 预算"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}需要“{active.estimate}”，涉及“{active.resource}”。失败信号：{active.failure}。{budgeted ? " 已同时记录上限、实际消耗和执行状态。" : " 尚未记录上限、实际消耗和执行状态。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const NETWORKS = {
  mainnet: {
    label: "主网",
    identity: "公开 chain ID 与规范历史",
    client: "生产节点与真实资产",
    boundary: "密钥、费用、确认和监管",
    result: "业务结果可能产生真实后果",
  },
  testnet: {
    label: "测试网",
    identity: "测试网络标识与测试资产",
    client: "公共或托管测试节点",
    boundary: "水龙头、限流、重置与可用性",
    result: "用于验证协议路径，不等价于主网",
  },
  private: {
    label: "私有链",
    identity: "自定义创世块与网络标识",
    client: "隔离客户端与测试账户",
    boundary: "创世配置、节点准入与治理",
    result: "适合本地复现，不能直接推断公开安全性",
  },
} as const;

type Network = keyof typeof NETWORKS;

export function BdpCh03NetworkLab() {
  const [network, setNetwork] = useState<Network>("private");
  const [matched, setMatched] = useState(false);
  const active = NETWORKS[network];

  function reset() {
    setNetwork("private");
    setMatched(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch03-network-boundary"
      aria-label={
        "网络边界实验：当前为" +
        active.label +
        "，身份是" +
        active.identity +
        "，客户端是" +
        active.client +
        "，边界是" +
        active.boundary +
        "；匹配" +
        (matched ? "已确认" : "未确认") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 03 · 网络边界实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">网络名称不是网络身份</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换主网、测试网和私有链，检查 chain ID、客户端、资产和治理边界是否互相匹配。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择网络</p>
          <div className="grid grid-cols-3 gap-2">
            <ChoiceButton active={network === "mainnet"} onClick={() => setNetwork("mainnet")}>主网</ChoiceButton>
            <ChoiceButton active={network === "testnet"} onClick={() => setNetwork("testnet")}>测试网</ChoiceButton>
            <ChoiceButton active={network === "private"} onClick={() => setNetwork("private")}>私有链</ChoiceButton>
          </div>
          <ChoiceButton active={matched} onClick={() => setMatched((value) => !value)}>{matched ? "撤销网络匹配" : "确认网络匹配"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.identity}，使用{active.client}。边界：{active.boundary}。{matched ? " 已核对网络身份与客户端。" : " 还要核对网络身份与客户端。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "网络边界链路：" +
            active.label +
            "具有" +
            active.identity +
            "，连接" +
            active.client +
            "，受到" +
            active.boundary +
            "约束；匹配" +
            (matched ? "已确认" : "未确认") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Network ID → Client → Asset → Governance</text>
          <rect x="28" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="110" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Network ID</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.identity}</text>
          <text x="110" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">chain ID / genesis</text>
          <path d="M214 144 H248" stroke="var(--border)" strokeWidth="3" />
          <rect x="260" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="342" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Client</text>
          <text x="342" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.client}</text>
          <text x="342" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">RPC / peer</text>
          <path d="M446 144 H480" stroke="var(--border)" strokeWidth="3" />
          <rect x="492" y="78" width="240" height="132" rx="14" fill={matched ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={matched ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="612" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Boundary</text>
          <text x="612" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.boundary}</text>
          <text x="612" y="178" textAnchor="middle" fontSize="11" fill={matched ? "var(--success)" : "var(--warning)"}>{matched ? "身份已匹配" : "先核对身份"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.result}</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">网络标签、chain ID 和创世配置必须分开记录</text>
        </svg>
      </div>
    </section>
  );
}
