"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-24-dead-programs-tell-no-lies";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const workers = {
  swallowed: {
    label: "吞掉异常继续运行",
    stages: [
      ["reserve", "stock 2 - qty 3 = -1", c.danger],
      ["catch", "log warn；返回 Reservation?", c.warning],
      ["ack", "消息 M-42 已确认", c.danger],
      ["publish", "shipment S-9 qty=3", c.danger],
    ],
    process: "worker-7 仍显示 healthy",
    state: "库存、预留和发货彼此矛盾；原消息已无法自动重放",
    verdict: "程序用一个假成功掩盖不可信状态，谎言扩散到发货边界。",
    color: c.danger,
  },
  crashed: {
    label: "不变量失败后退出进程",
    stages: [
      ["reserve", "assert stock >= qty 失败", c.danger],
      ["context", "M-42 sku=P-7 stock=2 qty=3", c.success],
      ["stop", "worker-7 exit 70；不 ack", c.warning],
      ["isolate", "M-42 进入 retry/quarantine", c.success],
    ],
    process: "supervisor 启动干净的 worker-8",
    state: "数据库事务回滚到 stock=2；没有 shipment 事件",
    verdict: "退出使失败可见，并阻止未知内存/事务状态处理下一条消息。",
    color: c.success,
  },
  recovered: {
    label: "修正输入后重放",
    stages: [
      ["inspect", "M-42 请求 qty=3，库存仅 2", c.accent],
      ["decision", "业务拒绝 OUT_OF_STOCK", c.success],
      ["record", "reservation=REJECTED", c.success],
      ["ack", "M-42 完成；无 shipment", c.success],
    ],
    process: "worker-8 处理同一消息身份",
    state: "stock=2；拒绝状态可由订单查询",
    verdict: "恢复不是手工把库存改大；让同一输入按明确业务合同结束。",
    color: c.accent,
  },
} as const;
type WorkerId = keyof typeof workers;

export function Tpp20Topic24DeadProgramsTellNoLiesSystemLab() {
  const [id, setId] = useState<WorkerId>("swallowed");
  const worker = workers[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 24 专属解剖图 · 库存 worker 的可信边界"
      title="库存已经变成 -1 后，worker 还能安全处理下一步吗？"
      description="比较吞异常、进程退出和业务拒绝重放。固定 message M-42、sku P-7、stock=2、qty=3，观察 ack 与 shipment 是否越过失败。"
      kind="dead-program-inventory-worker"
      reset={() => setId("swallowed")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(workers) as WorkerId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {workers[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {worker.stages.map(([stage, state, color], index) => (
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
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            process: {worker.process}
          </code>
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            state: {worker.state}
          </code>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: worker.color }}
        >
          {worker.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const deaths = {
  beforeCommit: {
    label: "提交前死亡",
    timeline: [
      ["begin TX", "reservation R-9 pending", c.success],
      ["write stock", "事务内 stock 2→1", c.success],
      ["process dies", "commit 尚未执行", c.danger],
      ["DB cleanup", "连接断开自动 rollback", c.success],
    ],
    query: "idempotency K-42 → no row",
    retry: "安全重放：创建 R-9，stock=1",
    warning: "依据数据库事实，而不是依据进程有没有返回响应。",
    color: c.success,
  },
  afterCommit: {
    label: "提交后、响应前死亡",
    timeline: [
      ["begin TX", "reservation R-9 pending", c.success],
      ["commit", "R-9 committed；stock=1", c.success],
      ["process dies", "ACK/HTTP 响应未发送", c.danger],
      ["delivery retry", "同一 K-42 再次到达", c.warning],
    ],
    query: "idempotency K-42 → existing R-9 committed",
    retry: "返回 existing R-9；不得再扣库存",
    warning: "“调用失败”不等于“操作未发生”；先查询提交身份。",
    color: c.warning,
  },
  unknown: {
    label: "故障：没有幂等身份",
    timeline: [
      ["request", "没有 K-42", c.danger],
      ["可能 commit", "日志止于 connection reset", c.warning],
      ["process dies", "调用者不知道结果", c.danger],
      ["blind retry", "可能生成 R-10 再扣一次", c.danger],
    ],
    query: "无法按业务意图查询；只能按时间/账户猜测",
    retry: "阻塞并人工核对，不允许自动重试",
    warning: "不可信状态需要隔离；“让程序死”必须配合可辨识的操作身份。",
    color: c.danger,
  },
} as const;
type DeathId = keyof typeof deaths;

export function Tpp20Topic24DeadProgramsTellNoLiesFeedbackLab() {
  const [id, setId] = useState<DeathId>("beforeCommit");
  const death = deaths[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 24 专属实验 · 死亡发生在 commit 两侧"
      title="进程没有返回时，重试前怎样判断操作是否已经发生？"
      description="选择提交前死亡、提交后死亡或缺少幂等身份。恢复决策只根据数据库提交事实与 K-42，不根据客户端超时猜测。"
      kind="dead-program-commit-ambiguity"
      reset={() => setId("beforeCommit")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(deaths) as DeathId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {deaths[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {death.timeline.map(([stage, state, color], index) => (
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
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            query: {death.query}
          </code>
          <code
            className="rounded-control border border-border bg-bg p-3 text-xs"
            style={{ color: death.color }}
          >
            decision: {death.retry}
          </code>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: death.color }}
        >
          {death.warning}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const propagation = {
  converted: {
    label: "错误被转成 null",
    frames: [
      ["StockRepo", "DB timeout → return null", c.danger],
      ["Reserve", "null 当作 stock=0", c.warning],
      ["Order", "标记 OUT_OF_STOCK", c.warning],
      ["Customer", "显示“商品售罄”", c.danger],
    ],
    cause: "原始 DB timeout 与 connection id 已丢失",
    damage: "业务指标误报售罄，自动补货可能被触发",
    color: c.danger,
  },
  propagated: {
    label: "保留 cause 与业务上下文",
    frames: [
      ["StockRepo", "DbTimeout cause=conn-7", c.danger],
      ["Reserve", "wrap InventoryUnavailable sku=P-7", c.warning],
      ["Order", "停止，不改订单状态", c.success],
      ["Boundary", "503 + retry-after + request R-91", c.success],
    ],
    cause: "cause chain：DbTimeout ← InventoryUnavailable ← request R-91",
    damage: "库存事实未知被准确表达，未伪装成 stock=0",
    color: c.success,
  },
  recovered: {
    label: "恢复后同输入重放",
    frames: [
      ["StockRepo", "stock P-7 = 2", c.success],
      ["Reserve", "qty 1 → R-9", c.success],
      ["Order", "状态 RESERVED", c.success],
      ["Boundary", "200 reservation R-9", c.success],
    ],
    cause: "旧失败 trace 与新成功 trace 都链接 request R-91/K-42",
    damage: "重放后状态明确；不删除最初 DbTimeout 证据",
    color: c.accent,
  },
} as const;
type PropagationId = keyof typeof propagation;

export function Tpp20Topic24DeadProgramsTellNoLiesEvidenceLab() {
  const [id, setId] = useState<PropagationId>("converted");
  const flow = propagation[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 24 专属复核 · 错误传播不能改写事实"
      title="数据库超时为什么不能被翻译成“库存为 0”？"
      description="比较 null 转换、保留 cause chain 和恢复重放。每一层只能增加自己的上下文，不能把未知状态伪造成业务结果。"
      kind="dead-program-error-cause-chain"
      reset={() => setId("converted")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(propagation) as PropagationId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {propagation[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {flow.frames.map(([layer, state, color], index) => (
            <div
              key={layer}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {layer}
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
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            {flow.cause}
          </code>
          <p
            className="rounded-control border bg-bg p-3 text-sm"
            style={{ borderColor: flow.color }}
          >
            {flow.damage}
          </p>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}
