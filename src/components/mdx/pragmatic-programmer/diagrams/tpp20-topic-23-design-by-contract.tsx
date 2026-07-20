"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-23-design-by-contract";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const transfers = {
  valid: {
    label: "合法：A → B 转 CNY 300",
    before: "A=1000；B=400；holds(A)=100",
    checks: [
      ["amount > 0", "300 > 0", c.success],
      ["currency 相同", "A/B/amount 都是 CNY", c.success],
      ["available >= amount", "1000-100 >= 300", c.success],
    ],
    execution: "transaction TX-81：debit A 300；credit B 300",
    post: "A'=700；B'=700；TX-81 已持久化",
    invariant: "A+B = 1400；前后总额守恒",
    color: c.success,
  },
  invalid: {
    label: "非法：A → B 转 CNY -300",
    before: "A=1000；B=400；holds(A)=100",
    checks: [
      ["amount > 0", "-300 > 0 → false", c.danger],
      ["currency 相同", "不再检查", c.warning],
      ["available >= amount", "不再检查", c.warning],
    ],
    execution: "实现不应被调用；责任在调用者输入边界",
    post: "A/B 不变；没有 transaction id",
    invariant: "总额守恒，但更重要的是非法操作没有开始",
    color: c.danger,
  },
  currency: {
    label: "非法：CNY 账户 → USD 账户",
    before: "A(CNY)=1000；B(USD)=400；amount=CNY 300",
    checks: [
      ["amount > 0", "300 > 0", c.success],
      ["currency 相同", "CNY != USD → false", c.danger],
      ["available >= amount", "不跨币种比较", c.warning],
    ],
    execution: "拒绝 CONTRACT_CURRENCY_MISMATCH",
    post: "A/B 不变；要求显式换汇契约",
    invariant: "不能把 1 CNY 与 1 USD 当同一守恒单位",
    color: c.warning,
  },
} as const;
type TransferId = keyof typeof transfers;

export function Tpp20Topic23DesignByContractSystemLab() {
  const [id, setId] = useState<TransferId>("valid");
  const transfer = transfers[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 23 专属解剖图 · 一笔账户转账的双方责任"
      title="调用者义务、实现承诺和系统不变量分别检查什么？"
      description="选择合法、负金额或跨币种转账。每个样本固定转账前状态，并把前置条件、执行、后置条件与守恒检查分开。"
      kind="contract-bank-transfer-anatomy"
      reset={() => setId("valid")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(transfers) as TransferId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {transfers[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block rounded-control border border-border bg-bg p-3 text-xs">
          before: {transfer.before}
        </code>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {transfer.checks.map(([condition, evidence, color]) => (
            <div
              key={condition}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                requires {condition}
              </span>
              <strong className="mt-2 block text-sm">{evidence}</strong>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {[
            ["实现", transfer.execution],
            ["后置条件", transfer.post],
            ["不变量", transfer.invariant],
          ].map(([label, value], index) => (
            <div
              key={label}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: transfer.color }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: transfer.color }}
              >
                {index + 1}. {label}
              </span>
              <p className="mt-2 text-sm leading-5">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const availabilityContracts = {
  balance: {
    label: "前置条件：balance >= amount",
    account: "balance=1000；pending holds=800；available=200",
    amount: "transfer CNY 300",
    check: "1000 >= 300 → 通过",
    downstream: "扣款后 balance=700，但 800 holds 无法兑现",
    responsibility: "契约检查了账面余额，却忽略已承诺资金。",
    color: c.danger,
  },
  available: {
    label: "前置条件：available >= amount",
    account: "balance=1000；pending holds=800；available=200",
    amount: "transfer CNY 300",
    check: "200 >= 300 → 拒绝 INSUFFICIENT_AVAILABLE",
    downstream: "没有 transaction；balance/holds 保持原值",
    responsibility: "调用者可先减少金额或释放 hold；实现不接收无法兑现的承诺。",
    color: c.success,
  },
  exact: {
    label: "边界：available 恰好等于 amount",
    account: "balance=1000；pending holds=700；available=300",
    amount: "transfer CNY 300",
    check: "300 >= 300 → 通过",
    downstream: "balance=700；available=0；holds=700",
    responsibility: "包含边界由 >= 明确；相邻 299.99/300/300.01 进入测试。",
    color: c.accent,
  },
} as const;
type AvailabilityId = keyof typeof availabilityContracts;

export function Tpp20Topic23DesignByContractFeedbackLab() {
  const [id, setId] = useState<AvailabilityId>("balance");
  const contract = availabilityContracts[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 23 专属实验 · 只改变可用资金前置条件"
      title="账户有 1000 元但 800 元已被 hold，能否再转 300？"
      description="固定账户、hold 和转账金额，只改变前置条件使用账面余额还是可用余额；边界样本验证恰好等于。"
      kind="contract-available-balance-boundary"
      reset={() => setId("balance")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(availabilityContracts) as AvailabilityId[]).map(
            (key) => (
              <button
                key={key}
                type="button"
                onClick={() => setId(key)}
                aria-pressed={id === key}
                className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
              >
                {availabilityContracts[key].label}
              </button>
            ),
          )}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            {contract.account}
          </code>
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            {contract.amount}
          </code>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {[
            ["检查", contract.check],
            ["下游状态", contract.downstream],
            ["责任裁决", contract.responsibility],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: contract.color }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: contract.color }}
              >
                {label}
              </span>
              <p className="mt-2 text-sm leading-5">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const commitPaths = {
  unchecked: {
    label: "撤掉后置条件",
    stages: [
      ["debit A", "A: 1000 → 700", c.success],
      ["credit B", "数据库超时，未写入", c.danger],
      ["commit", "仍提交 debit", c.danger],
      ["response", "返回 500，状态未知", c.danger],
    ],
    total: "before A+B=1400；after A+B=1100",
    transaction: "没有 TX id 能同时引用 debit 与 credit",
    verdict:
      "实现没有履行“双方余额按同一金额改变”的承诺，300 元从系统状态消失。",
    color: c.danger,
  },
  checked: {
    label: "提交前检查后置条件/不变量",
    stages: [
      ["debit A", "事务内 A: 1000 → 700", c.success],
      ["credit B", "数据库超时", c.danger],
      ["check", "delta(A)+delta(B) = -300 != 0", c.warning],
      ["rollback", "A 恢复 1000；B=400", c.success],
    ],
    total: "before=1400；rollback after=1400",
    transaction: "TX-81 状态=failed；没有部分成功事件",
    verdict: "失败被包含在数据库事务；调用者收到可重试的明确结果。",
    color: c.success,
  },
  recovered: {
    label: "恢复：同一 TX id 重试",
    stages: [
      ["lookup TX-81", "状态 failed，无余额变化", c.success],
      ["debit A", "A: 1000 → 700", c.success],
      ["credit B", "B: 400 → 700", c.success],
      ["commit", "TX-81 状态=completed", c.success],
    ],
    total: "before=1400；after=1400",
    transaction: "后置：A'=700、B'=700、TX-81=completed",
    verdict: "重试沿同一交易身份完成，不生成第二笔转账。",
    color: c.accent,
  },
} as const;
type CommitPathId = keyof typeof commitPaths;

export function Tpp20Topic23DesignByContractEvidenceLab() {
  const [id, setId] = useState<CommitPathId>("unchecked");
  const path = commitPaths[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 23 专属复核 · 已扣款但入账失败"
      title="后置条件不成立时，部分状态能否越过 commit？"
      description="模拟 B 账户写入超时。比较无检查、事务内守恒检查和同一交易 id 恢复，直接观察两账户总额。"
      kind="contract-postcondition-rollback"
      reset={() => setId("unchecked")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(commitPaths) as CommitPathId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {commitPaths[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {path.stages.map(([stage, state, color], index) => (
            <div
              key={stage}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {stage}
              </span>
              <strong className="mt-2 block text-sm leading-5">{state}</strong>
              {index < 3 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg md:block"
                  style={{ color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <code
            className="rounded-control border border-border bg-bg p-3 text-xs"
            style={{ color: path.color }}
          >
            {path.total}
          </code>
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            {path.transaction}
          </code>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: path.color }}
        >
          {path.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
