"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-27-headlights";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const horizons = {
  imagined: {
    label: "把远期猜测写成确定计划",
    segments: [
      ["今天", "old_plan 线上行为已知", c.success],
      ["第 1 周", "假设所有服务已兼容 new_plan", c.warning],
      ["第 2 周", "承诺删 old_plan", c.danger],
      ["第 3 月", "宣称无需回滚路径", c.danger],
    ],
    visible: "只有当前 schema 和现有订单样本可验证",
    unknown: "长尾退款、离线消费者、月底账单尚未出现",
    decision: "远期节点没有反馈入口，却被当成不可变交付合同。",
    color: c.danger,
  },
  headlights: {
    label: "只承诺到下一处可观察点",
    segments: [
      ["基线", "冻结退款/账单/写入指标", c.success],
      ["5%", "双写 30 min；比较 old/new", c.accent],
      ["停止线", "若首差>0，关 flag", c.warning],
      ["再规划", "通过后才决定 25% 样本", c.success],
    ],
    visible: "5% 流量、30 分钟、双写差异和回滚开关",
    unknown: "100% 容量与月底行为仍明确标为未知",
    decision: "计划的末端是下一次反馈，而不是一个没有证据的远期日期。",
    color: c.success,
  },
} as const;
type HorizonId = keyof typeof horizons;

export function Tpp20Topic27HeadlightsSystemLab() {
  const [id, setId] = useState<HorizonId>("imagined");
  const horizon = horizons[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 27 专属解剖图 · 套餐字段迁移的可见范围"
      title="哪些状态已有证据，哪些只是被日期伪装成确定性？"
      description="切换远期确定计划与前灯式计划。固定 old_plan → new_plan 迁移，逐节点标出可观察对象、未知量与下一条停止线。"
      kind="headlights-migration-horizon"
      reset={() => setId("imagined")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(horizons) as HorizonId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {horizons[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {horizon.segments.map(([time, state, color], index) => (
            <div
              key={time}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {time}
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
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            <strong className="text-success">可见：</strong> {horizon.visible}
          </p>
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            <strong className="text-warning">未知：</strong> {horizon.unknown}
          </p>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: horizon.color }}
        >
          {horizon.decision}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const radii = {
  five: {
    label: "5% · 30 分钟",
    exposure: "5,000 / 100,000 orders",
    feedback: ["双写差异 7", "退款样本 18", "p95 +12 ms", "可立即关 flag"],
    finding: "7 个离线续费仍读 old_plan；首差可定位到 consumer v3",
    next: "先修 consumer v3，再重放同 5% 样本",
    color: c.success,
  },
  quarter: {
    label: "25% · 6 小时",
    exposure: "25,000 orders",
    feedback: ["双写差异 0", "退款样本 211", "p95 +18 ms", "账单预演通过"],
    finding: "白天峰值仍在容量范围，但尚未覆盖午夜批处理",
    next: "保持双写，等待午夜批处理反馈后再扩",
    color: c.accent,
  },
  full: {
    label: "100% · 立即删旧字段",
    exposure: "100,000 orders + all consumers",
    feedback: [
      "没有对照读路径",
      "月底账单未发生",
      "退款长尾未知",
      "回滚需补数据",
    ],
    finding: "一次暴露所有未知量；出现差异时已无法读取 old_plan",
    next: "不是“更快反馈”，而是把反馈推迟到不可逆之后",
    color: c.danger,
  },
} as const;
type RadiusId = keyof typeof radii;

export function Tpp20Topic27HeadlightsFeedbackLab() {
  const [id, setId] = useState<RadiusId>("five");
  const radius = radii[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 27 专属实验 · 曝光范围与反馈半径"
      title="同一字段改动暴露给 5%、25% 或 100% 订单时，能看见什么？"
      description="切换流量阶段。每个阶段列出真实分母、可收集反馈、仍未知对象和下一步；不能用通过率替代样本身份。"
      kind="headlights-feedback-radius"
      reset={() => setId("five")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(radii) as RadiusId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {radii[key].label}
            </button>
          ))}
        </div>
        <code
          className="mt-4 block rounded-control border border-border bg-bg p-3 text-xs"
          style={{ color: radius.color }}
        >
          exposure: {radius.exposure}
        </code>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {radius.feedback.map((item, index) => (
            <div
              key={item}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: radius.color }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: radius.color }}
              >
                {index + 1}
              </span>
              <strong className="ml-2 text-sm">{item}</strong>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            <strong>本阶段发现：</strong> {radius.finding}
          </p>
          <p
            className="rounded-control border bg-bg p-3 text-sm"
            style={{ borderColor: radius.color }}
          >
            <strong>下一步：</strong> {radius.next}
          </p>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const stepPlans = {
  leap: {
    label: "一步跳跃",
    steps: [
      ["DDL", "rename old_plan → new_plan", c.warning],
      ["代码", "所有服务同一晚切读写", c.warning],
      ["清理", "立即 drop old_plan", c.danger],
      ["反馈", "等生产错误出现", c.danger],
    ],
    rollback: "旧字段和值已删除；回滚应用也无法读",
    evidence: "没有中间状态能比较 old/new 是否一致",
    verdict: "步长超过可观察范围，任何局部首差都会和多项同时变更纠缠。",
    color: c.danger,
  },
  expand: {
    label: "expand",
    steps: [
      ["schema", "新增 nullable new_plan", c.success],
      ["write", "服务开始 old/new 双写", c.accent],
      ["read", "仍只读 old_plan", c.success],
      ["反馈", "比较同订单双写差异", c.success],
    ],
    rollback: "关双写；所有读仍在旧路径",
    evidence: "每笔订单保存 old/new 差异，不影响用户结果",
    verdict: "这一步只验证写入兼容性，未提前承诺读取切换。",
    color: c.success,
  },
  migrate: {
    label: "migrate",
    steps: [
      ["backfill", "按 id 分批填 new_plan", c.accent],
      ["shadow read", "读两列，仍返回 old", c.success],
      ["flag", "5% 返回 new_plan", c.accent],
      ["反馈", "长尾/批处理/账单对照", c.success],
    ],
    rollback: "关读取 flag；new_plan 保留供诊断",
    evidence: "通过对象清单逐项清零后才进入 contract",
    verdict: "反馈半径逐步扩大，但每个阶段都保持可撤回读路径。",
    color: c.accent,
  },
  contract: {
    label: "contract（证据满足后）",
    steps: [
      ["precheck", "30 天无 old_plan 读取", c.success],
      ["backup", "旧列快照 + 恢复演练", c.success],
      ["drop", "删除 old_plan", c.warning],
      ["verify", "首/中/末样本与账单回归", c.success],
    ],
    rollback: "不可逆点被推迟到证据完成，并有独立快照恢复",
    evidence: "删除是最后一步，不是用来迫使前序迁移完成",
    verdict: "只有走到真实决策期限，才执行不可逆 contract。",
    color: c.warning,
  },
} as const;
type StepPlanId = keyof typeof stepPlans;

export function Tpp20Topic27HeadlightsEvidenceLab() {
  const [id, setId] = useState<StepPlanId>("leap");
  const plan = stepPlans[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 27 专属复核 · schema 迁移的可撤回步长"
      title="撤掉小步后，old_plan 在验证完成前就会消失吗？"
      description="比较一步跳跃与 expand–migrate–contract 三个阶段。每一阶段明确唯一学习问题、回滚动作和进入下一步的证据。"
      kind="headlights-expand-migrate-contract"
      reset={() => setId("leap")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(stepPlans) as StepPlanId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {stepPlans[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {plan.steps.map(([stage, action, color], index) => (
            <div
              key={stage}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {stage}
              </span>
              <strong className="mt-2 block text-sm leading-5">{action}</strong>
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
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            <strong>回滚：</strong> {plan.rollback}
          </p>
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            <strong>进入证据：</strong> {plan.evidence}
          </p>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: plan.color }}
        >
          {plan.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
