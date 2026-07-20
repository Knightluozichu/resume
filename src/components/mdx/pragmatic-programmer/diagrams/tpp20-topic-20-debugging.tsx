"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-20-debugging";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const investigations = {
  guesses: {
    label: "凭症状猜原因",
    stages: [
      ["用户报告", "“信用卡扣了两次”", c.warning],
      ["猜测 A", "支付网关偶发重复", c.danger],
      ["猜测 B", "用户双击按钮", c.danger],
      ["动作", "同时加按钮防抖和网关重试", c.danger],
    ],
    firstDifference: "没有冻结 request、commit、订单和时间窗，无法定位首差。",
    verdict: "两个补丁同时改变系统；即使事故消失，也不知道哪条假设成立。",
    color: c.danger,
  },
  trace: {
    label: "按 request id 对齐轨迹",
    stages: [
      ["浏览器", "1 次 POST · idem=K-42", c.success],
      ["API", "超时后内部重试 2 次", c.warning],
      ["队列", "2 条 charge · idem header 丢失", c.danger],
      ["数据库", "charge C-81 与 C-82", c.danger],
    ],
    firstDifference: "首差：API → 队列映射没有复制 Idempotency-Key。",
    verdict: "浏览器与网关都符合合同；先修消息映射，不改无关按钮与支付 SDK。",
    color: c.success,
  },
} as const;
type InvestigationId = keyof typeof investigations;

export function Tpp20Topic20DebuggingSystemLab() {
  const [id, setId] = useState<InvestigationId>("guesses");
  const investigation = investigations[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 20 专属解剖图 · 重复扣款的首差"
      title="同一笔订单在哪个真实边界第一次变成两次？"
      description="切换症状猜测与 trace 对齐。固定 order O-17、request R-7F2、commit 91c 和 10:04:12–10:04:15 时间窗。"
      kind="debugging-duplicate-charge-trace"
      reset={() => setId("guesses")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(investigations) as InvestigationId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {investigations[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {investigation.stages.map(([stage, evidence, color], index) => (
            <div
              key={stage}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {stage}
              </span>
              <strong className="mt-2 block text-sm leading-5">
                {evidence}
              </strong>
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
        <p
          className="mt-3 rounded-control border border-border bg-bg p-3 font-mono text-xs"
          style={{ color: investigation.color }}
        >
          {investigation.firstDifference}
        </p>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: investigation.color }}
        >
          {investigation.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const errors = {
  generic: {
    label: "泛化错误",
    response: "HTTP 500 Internal Server Error",
    log: "charge failed",
    context: [
      ["request", "未知", c.danger],
      ["order", "未知", c.danger],
      ["attempt", "未知", c.danger],
      ["invariant", "未知", c.danger],
    ],
    next: "只能在整份日志里按时间猜测，重跑会产生新的扣款风险。",
    color: c.danger,
  },
  contextual: {
    label: "带领域上下文的错误",
    response: "HTTP 409 DUPLICATE_CHARGE",
    log: "R-7F2 O-17 idem=K-42 attempt=2 existing=C-81",
    context: [
      ["request", "R-7F2", c.success],
      ["order", "O-17", c.success],
      ["attempt", "2", c.warning],
      ["invariant", "one charge per idem key", c.success],
    ],
    next: "无需再次扣款即可定位 attempt=2；错误同时给出已有 charge C-81。",
    color: c.success,
  },
  noisy: {
    label: "故障：有堆栈但无对象",
    response: "HTTP 500 NullPointerException at RetryHandler:88",
    log: "237 行堆栈，没有 request/order/idem",
    context: [
      ["代码位置", "RetryHandler:88", c.warning],
      ["request", "未知", c.danger],
      ["输入", "未知", c.danger],
      ["业务状态", "未知", c.danger],
    ],
    next: "堆栈说明在哪里崩溃，却不能说明是哪笔业务对象或哪条不变量被破坏。",
    color: c.warning,
  },
} as const;
type ErrorId = keyof typeof errors;

export function Tpp20Topic20DebuggingFeedbackLab() {
  const [id, setId] = useState<ErrorId>("generic");
  const error = errors[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 20 专属实验 · 错误信息改变可检验假设"
      title="只改变错误上下文，下一步实验会落到哪里？"
      description="三个样本共享同一重复扣款。比较响应、日志和可关联字段；好的错误不泄露秘密，但保留定位因果所需的对象身份。"
      kind="debugging-error-context"
      reset={() => setId("generic")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(errors) as ErrorId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {errors[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-control border border-border bg-bg p-4">
            <span className="text-xs font-semibold text-secondary">
              客户端响应
            </span>
            <code
              className="mt-2 block text-xs leading-5"
              style={{ color: error.color }}
            >
              {error.response}
            </code>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <span className="text-xs font-semibold text-secondary">
              服务日志
            </span>
            <code
              className="mt-2 block text-xs leading-5"
              style={{ color: error.color }}
            >
              {error.log}
            </code>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {error.context.map(([field, value, color]) => (
            <div
              key={field}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {field}
              </span>
              <strong className="mt-1 block text-sm">{value}</strong>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: error.color }}
        >
          {error.next}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const reproductions = {
  production: {
    label: "整套生产事故",
    inputs: [
      "Chrome 126",
      "API 12 pods",
      "Kafka 18 partitions",
      "真实支付网关",
      "4 小时日志",
    ],
    steps: ["用户结账", "偶发超时", "后台自动重试", "数分钟后查看账单"],
    result: "20 次尝试出现 1 次重复；每次可能产生真实资金副作用。",
    regression: "不可放入 CI，不能稳定制造首差。",
    color: c.danger,
  },
  minimal: {
    label: "最小复现",
    inputs: [
      "commit 91c",
      "内存队列",
      "fake gateway",
      "order O-17",
      "idem K-42",
    ],
    steps: [
      "POST charge(K-42)",
      "模拟 ACK 丢失",
      "再次 POST charge(K-42)",
      "读取 charge rows",
    ],
    result: "每次都得到 2 行：C-81、C-82；失败耗时 38 ms。",
    regression: "断言同一 idem key 只能有 1 行，先红后绿。",
    color: c.warning,
  },
  fixed: {
    label: "修复与回归",
    inputs: [
      "commit f02",
      "同一内存队列",
      "同一 fake gateway",
      "order O-17",
      "idem K-42",
    ],
    steps: [
      "POST charge(K-42)",
      "模拟 ACK 丢失",
      "再次 POST charge(K-42)",
      "读取 charge rows",
    ],
    result: "第二次返回 existing C-81；数据库始终只有 1 行。",
    regression: "最小样本 + 相邻 K-43 + 并发双请求共 12/12。",
    color: c.success,
  },
} as const;
type ReproductionId = keyof typeof reproductions;

export function Tpp20Topic20DebuggingEvidenceLab() {
  const [id, setId] = useState<ReproductionId>("production");
  const reproduction = reproductions[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 20 专属复核 · 从事故缩到两次请求"
      title="移除浏览器、Kafka 与真网关后，重复扣款仍稳定出现吗？"
      description="依次查看生产事故、最小失败样本和修复回归。最小化只能删除无关变量，不能删掉 ACK 丢失与相同幂等键。"
      kind="debugging-minimal-reproduction"
      reset={() => setId("production")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(reproductions) as ReproductionId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {reproductions[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-control border border-border bg-bg p-3">
            <strong className="text-xs text-secondary">冻结输入</strong>
            <ul className="mt-2 space-y-1 text-sm">
              {reproduction.inputs.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {reproduction.steps.map((step, index) => (
              <div
                key={step}
                className="rounded-control border bg-bg p-3"
                style={{ borderColor: reproduction.color }}
              >
                <span
                  className="text-xs font-semibold"
                  style={{ color: reproduction.color }}
                >
                  {index + 1}
                </span>
                <strong className="ml-2 text-sm">{step}</strong>
              </div>
            ))}
          </div>
        </div>
        <p
          className="mt-3 rounded-control border border-border bg-bg p-3 text-sm"
          style={{ color: reproduction.color }}
        >
          {reproduction.result}
        </p>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: reproduction.color }}
        >
          <strong>回归：</strong> {reproduction.regression}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
