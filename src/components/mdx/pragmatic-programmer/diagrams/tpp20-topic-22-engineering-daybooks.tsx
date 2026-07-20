"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-22-engineering-daybooks";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const entries = {
  vague: {
    label: "流水账",
    fields: [
      ["时间", "下午", c.danger],
      ["问题", "支付好像重复了", c.warning],
      ["操作", "查日志、改了重试", c.warning],
      ["结果", "现在好了", c.danger],
      ["后续", "再观察", c.danger],
    ],
    reconstruction:
      "另一位工程师不知道订单、commit、命令、输入窗口或成功条件。",
    color: c.danger,
  },
  replayable: {
    label: "可重放条目",
    fields: [
      ["时间", "2026-07-20T10:14:32+08:00", c.success],
      ["问题", "order O-17 / request R-7F2 产生 2 个 charge", c.success],
      ["操作", "commit 91c；rg 'R-7F2' api.log queue.log", c.success],
      ["结果", "API retry=2；队列缺 Idempotency-Key；output c82…", c.success],
      ["后续", "最小复现 #842；验证同 key 只写 1 行", c.accent],
    ],
    reconstruction:
      "条目保存问题、冻结输入、真实命令、输出身份和未完成事项，可由他人接续。",
    color: c.success,
  },
} as const;
type EntryId = keyof typeof entries;

export function Tpp20Topic22EngineeringDaybooksSystemLab() {
  const [id, setId] = useState<EntryId>("vague");
  const entry = entries[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 22 专属解剖图 · incident #42 日记条目"
      title="六周后只读这页，能否重建当时的问题、操作和结果？"
      description="切换流水账与可重放条目。日记不是会议纪要模板；每个字段都绑定一次真实调试对象和可检查工件。"
      kind="daybook-replayable-entry"
      reset={() => setId("vague")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(entries) as EntryId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {entries[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-control border border-border bg-bg">
          {entry.fields.map(([field, value, color], index) => (
            <div
              key={field}
              className="grid gap-1 border-b border-border px-3 py-3 last:border-b-0 sm:grid-cols-[6rem_1fr]"
            >
              <strong className="text-xs" style={{ color }}>
                {index + 1}. {field}
              </strong>
              <code className="text-xs leading-5">{value}</code>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: entry.color }}
        >
          {entry.reconstruction}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const timelines = {
  local: {
    label: "各系统只记本地钟表",
    events: [
      ["10:04:12", "浏览器（Asia/Shanghai）", "POST O-17", c.success],
      ["02:04:13", "API（UTC）", "retry attempt=2", c.warning],
      ["10:04:12", "队列面板（浏览器本地）", "publish charge", c.danger],
      ["02:04:14", "数据库（UTC）", "insert C-82", c.danger],
    ],
    order:
      "按字符串排序会把 API/数据库放在浏览器之前，并把两个 10:04:12 当成同时。",
    color: c.danger,
  },
  normalized: {
    label: "ISO 8601 + offset + request id",
    events: [
      ["02:04:12.184Z", "browser R-7F2", "POST O-17", c.success],
      ["02:04:13.027Z", "API R-7F2", "retry attempt=2", c.warning],
      ["02:04:13.041Z", "queue R-7F2", "publish charge（idem 缺失）", c.danger],
      ["02:04:14.102Z", "DB R-7F2", "insert C-82", c.danger],
    ],
    order:
      "UTC 时间、毫秒、时区声明和同一 request id 共同恢复因果顺序；commit=91c 固定代码时间。",
    color: c.success,
  },
  clockSkew: {
    label: "反例：API 时钟快 3 秒",
    events: [
      ["02:04:12.184Z", "browser R-7F2", "POST O-17", c.success],
      ["02:04:16.027Z", "API R-7F2（clock +3s）", "retry attempt=2", c.warning],
      ["02:04:13.041Z", "queue R-7F2", "receive API message", c.danger],
      ["02:04:14.102Z", "DB R-7F2", "insert C-82", c.danger],
    ],
    order:
      "墙钟仍会误序；日记补充 trace span 父子关系和 NTP 偏差，不能只靠时间戳猜因果。",
    color: c.warning,
  },
} as const;
type TimelineId = keyof typeof timelines;

export function Tpp20Topic22EngineeringDaybooksFeedbackLab() {
  const [id, setId] = useState<TimelineId>("local");
  const timeline = timelines[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 22 专属实验 · 四个系统的时间坐标"
      title="只改变时间坐标，重复扣款事件的先后关系会怎样变化？"
      description="固定四条原始事件，比较本地钟表、规范化时间与时钟偏差反例。时间戳必须和对象身份、trace 关系一起使用。"
      kind="daybook-time-coordinate"
      reset={() => setId("local")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(timelines) as TimelineId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {timelines[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2">
          {timeline.events.map(([time, owner, event], index) => (
            <div
              key={`${time}-${owner}`}
              className="grid gap-2 rounded-control border bg-bg p-3 sm:grid-cols-[7rem_1fr_1.4fr] sm:items-center"
              style={{ borderColor: timeline.color }}
            >
              <code className="text-xs" style={{ color: timeline.color }}>
                {time}
              </code>
              <strong className="text-sm">{owner}</strong>
              <span className="text-sm text-secondary">
                {index + 1}. {event}
              </span>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: timeline.color }}
        >
          {timeline.order}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const decisions = {
  resultOnly: {
    label: "只记最终决定",
    context: "2026-07-20：选择队列消费者去重",
    assumptions: [
      "没有记录为什么不在网关去重",
      "没有记录吞吐与保留期",
      "没有失效条件",
    ],
    revisit: "六周后队列从单区迁到多区，团队只能重新争论全部方案。",
    action: "无法判断旧决定是否仍适用。",
    color: c.danger,
  },
  rationale: {
    label: "决定 + 理由 + 失效条件",
    context: "2026-07-20：选择消费者按 idem key 去重（ADR-17）",
    assumptions: [
      "网关不保证跨重试传递内部 request id",
      "队列保留 7 天，idem key 保留 8 天",
      "消费者单区串行处理同一 order",
    ],
    revisit: "失效条件：跨区并发可能同时看不到 idem row；迁多区前重新验证。",
    action: "启动条件已触发，转为数据库唯一约束 + 冲突返回 existing charge。",
    color: c.success,
  },
  updated: {
    label: "六周后追加新决定",
    context: "2026-08-31：ADR-17 superseded by ADR-24",
    assumptions: [
      "保留原 ADR-17，不改写历史",
      "记录多区并发失败样本",
      "新唯一约束迁移可回滚",
    ],
    revisit:
      "同一 O-17/K-42 并发 20 次，数据库只生成 C-81；旧单区样本继续通过。",
    action: "日记链接 ADR-17、ADR-24、migration 047 与回归输出哈希。",
    color: c.accent,
  },
} as const;
type DecisionId = keyof typeof decisions;

export function Tpp20Topic22EngineeringDaybooksEvidenceLab() {
  const [id, setId] = useState<DecisionId>("resultOnly");
  const decision = decisions[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 22 专属复核 · 理由让旧决定可以被重新裁决"
      title="六周后前提改变时，日记能否指出该继续、撤回还是替换？"
      description="比较只记结果、记录理由和追加新决定。工程日记不覆盖旧判断，而是保留当时前提与后来触发的失效条件。"
      kind="daybook-decision-revisit"
      reset={() => setId("resultOnly")}
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
        <div className="mt-4 rounded-control border border-border bg-bg p-4">
          <code className="text-xs" style={{ color: decision.color }}>
            {decision.context}
          </code>
          <ul className="mt-3 space-y-2 text-sm">
            {decision.assumptions.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-control border border-border bg-bg p-3">
            <span className="text-xs font-semibold text-secondary">
              重新查看的触发证据
            </span>
            <p className="mt-1 text-sm leading-6">{decision.revisit}</p>
          </div>
          <div
            className="rounded-control border bg-bg p-3"
            style={{ borderColor: decision.color }}
          >
            <span
              className="text-xs font-semibold"
              style={{ color: decision.color }}
            >
              当前动作
            </span>
            <p className="mt-1 text-sm leading-6">{decision.action}</p>
          </div>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}
