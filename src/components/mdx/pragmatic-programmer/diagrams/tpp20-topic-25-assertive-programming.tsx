"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-25-assertive-programming";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const cases = {
  invalid: {
    label: "qty = -1",
    origin: "HTTP 请求体（不可信输入）",
    condition: "Number.isInteger(qty) && qty >= 1",
    classification: "输入校验失败",
    behavior: "400 INVALID_QUANTITY；进程继续；记录 request id，不记堆栈",
    reason: "调用者可以修正输入；负数不是程序内部的“不可能状态”。",
    color: c.warning,
  },
  soldOut: {
    label: "余票 2，申请 3",
    origin: "合法输入遇到当前业务状态",
    condition: "available >= qty → false",
    classification: "可恢复业务结果",
    behavior: "409 SOLD_OUT；返回 available=2；允许用户改数量",
    reason: "售罄完全可能发生，不应触发 crash 或报警。",
    color: c.accent,
  },
  impossible: {
    label: "reserved = 11，capacity = 10",
    origin: "事务提交后的内部聚合状态",
    condition: "assert 0 <= reserved && reserved <= capacity",
    classification: "不变量断言失败",
    behavior: "rollback；隔离 event E-42；worker exit；告警包含聚合版本",
    reason:
      "如果所有写入都遵守锁与版本合同，这个状态不应存在；继续运行会扩散损坏。",
    color: c.danger,
  },
} as const;
type CaseId = keyof typeof cases;

export function Tpp20Topic25AssertiveProgrammingSystemLab() {
  const [id, setId] = useState<CaseId>("invalid");
  const scenario = cases[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 25 专属解剖图 · 座位预订的三类失败"
      title="这个条件应当拒绝输入、返回业务结果，还是让进程停止？"
      description="选择负数量、售罄或超容量状态。图中固定 capacity=10，并把来源、条件、分类与生产行为逐项绑定。"
      kind="assertion-seat-failure-classification"
      reset={() => setId("invalid")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(cases) as CaseId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {cases[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-control border border-border bg-bg">
          {[
            ["来源", scenario.origin],
            ["可执行条件", scenario.condition],
            ["分类", scenario.classification],
            ["生产行为", scenario.behavior],
          ].map(([label, value], index) => (
            <div
              key={label}
              className="grid gap-1 border-b border-border px-3 py-3 last:border-b-0 sm:grid-cols-[7rem_1fr]"
            >
              <strong className="text-xs" style={{ color: scenario.color }}>
                {index + 1}. {label}
              </strong>
              <code className="text-xs leading-5">{value}</code>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: scenario.color }}
        >
          {scenario.reason}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const states = {
  baseline: {
    label: "基线：reserved 8 / capacity 10",
    before: "aggregate version=17；reserved=8",
    command: "reserve(qty=2, expectedVersion=17)",
    after: "reserved=10；version=18",
    assertion: "0 <= 10 <= 10 → pass",
    next: "event SeatsReserved(qty=2, version=18)",
    color: c.success,
  },
  race: {
    label: "故障：两个写者绕过版本检查",
    before: "writer A/B 都读取 version=17；reserved=8",
    command: "A reserve 2；B reserve 1；错误地合并为 +3",
    after: "reserved=11；version=18",
    assertion: "0 <= 11 <= 10 → FAIL",
    next: "事务 rollback；保存 A/B event id；停止 worker",
    color: c.danger,
  },
  fixed: {
    label: "修复：乐观版本冲突",
    before: "A/B 都读取 version=17；reserved=8",
    command: "A 写 version=18；B compare-and-swap 失败",
    after: "reserved=10；version=18；B 收到 conflict",
    assertion: "0 <= 10 <= 10 → pass",
    next: "B 重新读取 available=0，返回 SOLD_OUT",
    color: c.accent,
  },
} as const;
type StateId = keyof typeof states;

export function Tpp20Topic25AssertiveProgrammingFeedbackLab() {
  const [id, setId] = useState<StateId>("baseline");
  const state = states[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 25 专属实验 · 超容量不变量暴露并发缺陷"
      title="reserved 从 8 变成 11 时，断言能指向哪条被破坏的内部假设？"
      description="比较合法边界、绕过版本检查的竞争和修复后的冲突路径。断言保存聚合版本与两个 event id，不只写“assert failed”。"
      kind="assertion-seat-capacity-race"
      reset={() => setId("baseline")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(states) as StateId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {states[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {[
            ["初始", state.before],
            ["操作", state.command],
            ["候选状态", state.after],
            ["断言", state.assertion],
          ].map(([label, value], index) => (
            <div
              key={label}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: state.color }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: state.color }}
              >
                {index + 1}. {label}
              </span>
              <code className="mt-2 block text-xs leading-5">{value}</code>
              {index < 3 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg md:block"
                  style={{ color: state.color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: state.color }}
        >
          <strong>下一步：</strong> {state.next}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const guards = {
  assertionOnly: {
    label: "故障：用 assert 校验所有输入",
    input: "POST /reserve { qty: -1 }",
    boundary: "没有 schema 校验",
    internal: "assert qty >= 1 → process abort",
    response: "连接断开；客户端不知道如何修正",
    operations: "每个恶意负数都能重启 worker",
    verdict: "把预期会出现的坏输入当成程序缺陷，造成拒绝服务。",
    color: c.danger,
  },
  validationOnly: {
    label: "故障：只做输入校验",
    input: "两个合法 qty=2/1 并发请求",
    boundary: "两个请求均通过 schema",
    internal: "没有 reserved <= capacity 断言",
    response: "两个请求都返回成功",
    operations: "reserved=11 静默提交",
    verdict: "合法输入仍可因内部竞争产生不可能状态；输入校验覆盖不到这里。",
    color: c.warning,
  },
  layered: {
    label: "分层：校验 + 业务结果 + 断言",
    input: "负数在 HTTP；售罄在领域；超容量在事务",
    boundary: "schema 拒绝 qty<1",
    internal: "available 不足返回 SOLD_OUT；候选状态断言容量",
    response: "4xx 可修正；业务 409；内部失败隔离并告警",
    operations: "每类条件有不同责任人和恢复动作",
    verdict: "断言没有替代校验；校验也没有削弱内部不变量。",
    color: c.success,
  },
} as const;
type GuardId = keyof typeof guards;

export function Tpp20Topic25AssertiveProgrammingEvidenceLab() {
  const [id, setId] = useState<GuardId>("assertionOnly");
  const guard = guards[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 25 专属复核 · 校验与断言不能互相替代"
      title="撤掉输入校验或内部断言，哪一类失败会越过边界？"
      description="比较只用 assert、只用 schema 和分层防线。固定座位聚合，直接查看客户端响应与运维后果。"
      kind="assertion-validation-layers"
      reset={() => setId("assertionOnly")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(guards) as GuardId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {guards[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-control border border-border bg-bg">
          {[
            ["输入", guard.input],
            ["边界", guard.boundary],
            ["内部", guard.internal],
            ["响应", guard.response],
            ["运维", guard.operations],
          ].map(([label, value], index) => (
            <div
              key={label}
              className="grid gap-1 border-b border-border px-3 py-3 last:border-b-0 sm:grid-cols-[5rem_1fr]"
            >
              <strong className="text-xs" style={{ color: guard.color }}>
                {index + 1}. {label}
              </strong>
              <span className="text-sm">{value}</span>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: guard.color }}
        >
          {guard.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
