"use client";

import { useState, type ReactNode } from "react";

const c = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  bg: "var(--bg)",
  border: "var(--border)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

function ReversalFrame({
  eyebrow,
  title,
  description,
  kind,
  reset,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  kind: string;
  reset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated text-primary shadow-sm"
      aria-label={`${title}实验`}
      data-tpp20-unit="tpp20-topic-11-reversibility"
      data-visual-kind={kind}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border bg-bg/70 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-accent">{eyebrow}</p>
          <h3 className="mt-1 text-base font-semibold">{title}</h3>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-secondary">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-control border border-border bg-bg px-3 text-sm font-semibold hover:border-accent"
          aria-label={`重置${title}实验`}
        >
          <span aria-hidden="true">↺</span>
          <span className="ml-2">重置</span>
        </button>
      </header>
      {children}
    </section>
  );
}

const releases = {
  locked: {
    label: "锁死：迁移后立刻删除旧字段",
    stages: [
      ["写入", "只写 new_plan", c.warning],
      ["读取", "所有服务改读 new_plan", c.warning],
      ["回滚", "旧字段已删，无法恢复", c.danger],
      ["窗口", "没有验证窗口", c.danger],
    ],
    result: "方案把“是否继续新计费”的不确定性，过早变成不可撤回的数据事实。",
    color: c.danger,
  },
  reversible: {
    label: "可逆：双写 + 开关 + 截止日期",
    stages: [
      ["写入", "old_plan 与 new_plan 双写", c.success],
      ["读取", "feature flag 选择读取侧", c.success],
      ["回滚", "关开关，仍可读 old_plan", c.success],
      ["窗口", "7 天比较并记录截止", c.accent],
    ],
    result:
      "代价是暂时维护两条路径；收益是能用真实订单验证假设，并在窗口内撤回。",
    color: c.success,
  },
} as const;
type ReleaseId = keyof typeof releases;

export function Tpp20Topic11ReversibilitySystemLab() {
  const [id, setId] = useState<ReleaseId>("locked");
  const release = releases[id];
  return (
    <ReversalFrame
      eyebrow="Topic 11 专属解剖图 · 可撤回的计费迁移"
      title="把套餐字段从 old_plan 迁到 new_plan，撤回点还在吗？"
      description="切换发布结构。每一格是迁移中真实存在的数据写入、读取开关、回滚动作或观察期限；可逆性取决于这些对象是否仍在。"
      kind="reversibility-release-window"
      reset={() => setId("locked")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(releases) as ReleaseId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {releases[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {release.stages.map(([label, detail, color], index) => (
            <div
              key={label}
              className="relative rounded-control border bg-bg p-4"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {label}
              </span>
              <strong className="mt-2 block font-mono text-sm">{detail}</strong>
              {index < 3 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-xl md:block"
                  style={{ color }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: release.color }}
        >
          {release.result}
        </p>
      </div>
    </ReversalFrame>
  );
}

const decisions = {
  early: {
    label: "今天永久切换",
    rows: [
      ["假设", "新套餐转化率更好", c.warning],
      ["替代方案", "已被删除", c.danger],
      ["真正的截止", "今天部署时", c.danger],
    ],
    verdict:
      "把可稍后决定的事情提前锁死；生产数据一旦异常，只能做新补丁而不是回到已知状态。",
    color: c.danger,
  },
  staged: {
    label: "第 1 天 5% 流量，7 天后决定",
    rows: [
      ["假设", "新套餐转化率更好", c.warning],
      ["替代方案", "old_plan 仍可读", c.success],
      ["真正的截止", "第 7 天对比完成", c.success],
    ],
    verdict:
      "决策期限与技术切换分离：先收集同一队列上的转化和退款，再决定是否清理旧路径。",
    color: c.success,
  },
  failed: {
    label: "第 3 天退款率升高，关闭开关",
    rows: [
      ["观察", "退款率高于基线", c.danger],
      ["替代方案", "读取 old_plan", c.success],
      ["实际动作", "关闭 flag 并保留证据", c.success],
    ],
    verdict:
      "回滚不是删除失败记录；保留失败样本，缩小假设范围后再设计下一次试验。",
    color: c.accent,
  },
} as const;
type DecisionId = keyof typeof decisions;

export function Tpp20Topic11ReversibilityFeedbackLab() {
  const [id, setId] = useState<DecisionId>("staged");
  const decision = decisions[id];
  return (
    <ReversalFrame
      eyebrow="Topic 11 专属实验 · 决策期限"
      title="同一套餐假设，在什么时候必须真的做决定？"
      description="选择发布时间线。每行记录可观察的业务假设、替代路径和真正不可逆的时间点，避免用“可逆”一词掩盖没有回滚演练的发布。"
      kind="reversibility-decision-deadline"
      reset={() => setId("staged")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(decisions) as DecisionId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {decisions[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-control border border-border">
          {decision.rows.map(([name, value, color]) => (
            <div
              key={name}
              className="grid grid-cols-[0.8fr_2fr] border-b border-border px-3 py-3 last:border-b-0"
            >
              <strong className="text-sm">{name}</strong>
              <span className="text-sm" style={{ color }}>
                {value}
              </span>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: decision.color }}
        >
          {decision.verdict}
        </p>
      </div>
    </ReversalFrame>
  );
}

const drills = {
  untested: {
    label: "故障：开关存在但没人演练",
    flag: "new_plan = on",
    old: "old_plan 已删",
    check: "无法验证关闭后会发生什么",
    result: "失败：表面上有开关，但底层数据路径已经不可逆。",
    color: c.danger,
  },
  drilled: {
    label: "修复：用同一订单执行关闭开关",
    flag: "new_plan = off",
    old: "old_plan 仍可读",
    check: "订单 #7842 回到旧路径",
    result: "通过：保存开关事件、订单输入、两个读取结果和恢复耗时。",
    color: c.success,
  },
} as const;
type DrillId = keyof typeof drills;

export function Tpp20Topic11ReversibilityEvidenceLab() {
  const [id, setId] = useState<DrillId>("untested");
  const drill = drills[id];
  return (
    <ReversalFrame
      eyebrow="Topic 11 专属复核 · 实际回滚演练"
      title="切换 flag 后，同一笔订单能否回到旧路径？"
      description="此处的证据不是部署成功截图，而是同一订单在切换前后实际读取的字段和恢复耗时。重置回到未演练的失败状态。"
      kind="reversibility-rollback-drill"
      reset={() => setId("untested")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(drills) as DrillId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {drills[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            ["开关", drill.flag],
            ["旧数据", drill.old],
            ["回滚检查", drill.check],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-control border bg-bg p-4"
              style={{ borderColor: drill.color }}
            >
              <span className="text-xs font-semibold text-secondary">
                {label}
              </span>
              <strong
                className="mt-2 block text-sm"
                style={{ color: drill.color }}
              >
                {value}
              </strong>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: drill.color }}
        >
          {drill.result}
        </p>
      </div>
    </ReversalFrame>
  );
}
