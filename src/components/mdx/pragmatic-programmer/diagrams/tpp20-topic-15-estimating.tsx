"use client";

import { useState, type ReactNode } from "react";

const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

function EstimateFrame({
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
      data-tpp20-unit="tpp20-topic-15-estimating"
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

const models = {
  point: {
    label: "单点承诺",
    rows: [
      ["对象量", "约一千万张照片", "没有查询快照"],
      ["吞吐", "大概很快", "没有测量单位"],
      ["失败", "应该不多", "没有重试分母"],
      ["停机", "忽略", "没有发布窗口"],
    ],
    equation: "完成时间 = 下周五",
    outcome: "日期无法从任何输入重算；输入变化时只能换一个更晚的日期。",
    color: c.danger,
  },
  model: {
    label: "可重算模型",
    rows: [
      ["对象量", "N = 12,000,000 张", "迁移前 SQL 快照"],
      ["吞吐", "r = 180 张/秒/worker", "10 万张样本 p50"],
      ["并发", "w = 4 workers", "暂存库连接上限"],
      ["重试", "e = 8%", "坏元数据样本"],
    ],
    equation: "T = N × (1 + e) ÷ (r × w) = 18,000 秒 ≈ 5 小时",
    outcome: "再加 1–2 小时校验与切换窗口，报告 6–7 小时，而不是承诺 5:00:00。",
    color: c.success,
  },
} as const;
type ModelId = keyof typeof models;

export function Tpp20Topic15EstimatingSystemLab() {
  const [id, setId] = useState<ModelId>("point");
  const model = models[id];
  return (
    <EstimateFrame
      eyebrow="Topic 15 专属解剖图 · 1200 万张照片迁移"
      title="这个完成时间能从对象量、吞吐和失败假设重新算出来吗？"
      description="切换单点承诺与可重算模型。所有数值绑定单位和来源；估算的价值在于暴露假设，而不是把小数位做得更漂亮。"
      kind="estimate-migration-equation"
      reset={() => setId("point")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(models) as ModelId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {models[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-control border border-border bg-bg">
          <div className="grid grid-cols-[0.7fr_1fr_1.3fr] gap-2 border-b border-border px-3 py-2 text-xs font-semibold text-secondary">
            <span>变量</span>
            <span>当前值</span>
            <span>证据/缺口</span>
          </div>
          {model.rows.map(([name, value, source]) => (
            <div
              key={name}
              className="grid grid-cols-[0.7fr_1fr_1.3fr] gap-2 border-b border-border px-3 py-3 text-sm last:border-b-0"
            >
              <strong style={{ color: model.color }}>{name}</strong>
              <code className="text-xs leading-5">{value}</code>
              <span className="text-secondary">{source}</span>
            </div>
          ))}
        </div>
        <code
          className="mt-3 block overflow-x-auto rounded-control border bg-bg p-3 text-sm leading-6"
          style={{ borderColor: model.color, color: model.color }}
        >
          {model.equation}
        </code>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: model.color }}
        >
          {model.outcome}
        </p>
      </div>
    </EstimateFrame>
  );
}

const retryCases = {
  clean: {
    label: "重试 0%",
    rate: 0,
    objects: "12,000,000",
    attempts: "12,000,000",
    run: "4 小时 38 分",
    window: "5–6 小时",
    evidence: "只适用于清洗过的理想样本，不能覆盖生产坏元数据。",
    color: c.warning,
  },
  sampled: {
    label: "重试 8%（样本）",
    rate: 8,
    objects: "12,000,000",
    attempts: "12,960,000",
    run: "5 小时",
    window: "6–7 小时",
    evidence: "来自 10 万张分层样本；保留失败类型和样本选择方法。",
    color: c.success,
  },
  incident: {
    label: "重试 25%（故障）",
    rate: 25,
    objects: "12,000,000",
    attempts: "15,000,000",
    run: "5 小时 47 分",
    window: "7–9 小时",
    evidence: "旧 EXIF 解析器退化；先修失败簇，比盲目加 worker 更有效。",
    color: c.danger,
  },
} as const;
type RetryId = keyof typeof retryCases;

export function Tpp20Topic15EstimatingFeedbackLab() {
  const [id, setId] = useState<RetryId>("clean");
  const scenario = retryCases[id];
  return (
    <EstimateFrame
      eyebrow="Topic 15 专属实验 · 只改变失败重试率"
      title="同一对象量和吞吐下，坏元数据怎样移动完成区间？"
      description="固定 1200 万张、180 张/秒/worker 和 4 workers，只改变重试率。表格把新增尝试次数传到运行时间与发布窗口。"
      kind="estimate-retry-sensitivity"
      reset={() => setId("clean")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(retryCases) as RetryId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {retryCases[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["原始对象", scenario.objects],
            ["实际尝试", scenario.attempts],
            ["纯运行", scenario.run],
            ["发布区间", scenario.window],
          ].map(([label, value], index) => (
            <div
              key={label}
              className="relative rounded-control border bg-bg p-4"
              style={{
                borderColor: index === 0 ? "var(--border)" : scenario.color,
              }}
            >
              <span className="text-xs font-semibold text-secondary">
                {label}
              </span>
              <strong
                className="mt-2 block font-mono text-lg"
                style={{ color: scenario.color }}
              >
                {value}
              </strong>
              {index < 3 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg lg:block"
                  style={{ color: scenario.color }}
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
          style={{ borderColor: scenario.color }}
        >
          <strong>假设来源：</strong> {scenario.evidence}
        </p>
      </div>
    </EstimateFrame>
  );
}

const checkpoints = {
  before: {
    label: "运行前",
    observed: "0 / 12M",
    throughput: "样本 150–210 张/秒/worker",
    remaining: "12M",
    forecast: "6–9 小时",
    marks: [32, 68],
    note: "区间宽，因为吞吐来自实验室样本；必须写明磁盘、连接池与坏元数据尚未验证。",
    color: c.warning,
  },
  batch1: {
    label: "首批 1M 后",
    observed: "1M / 12M",
    throughput: "生产 172–188 张/秒/worker",
    remaining: "11M",
    forecast: "6.1–7.2 小时",
    marks: [41, 58],
    note: "用首批真实吞吐替换样本假设；不能因为已经完成 8.3% 就线性宣布日期。",
    color: c.accent,
  },
  batch6: {
    label: "完成 6M 后",
    observed: "6M / 12M",
    throughput: "生产 179–184 张/秒/worker",
    remaining: "6M",
    forecast: "剩余 2.4–2.7 小时",
    marks: [47, 53],
    note: "范围收窄来自多个真实批次稳定，而不是项目经理要求一个更精确的数字。",
    color: c.success,
  },
  fault: {
    label: "EXIF 故障后",
    observed: "7.2M / 12M",
    throughput: "失败簇降至 96–122 张/秒/worker",
    remaining: "4.8M + 重放 0.4M",
    forecast: "新增 3.0–3.9 小时",
    marks: [56, 79],
    note: "新证据使区间再次变宽；诚实更新模型，比维持旧承诺更能支持发布决策。",
    color: c.danger,
  },
} as const;
type CheckpointId = keyof typeof checkpoints;

export function Tpp20Topic15EstimatingEvidenceLab() {
  const [id, setId] = useState<CheckpointId>("before");
  const checkpoint = checkpoints[id];
  const [start, end] = checkpoint.marks;
  return (
    <EstimateFrame
      eyebrow="Topic 15 专属复核 · 预测区间随真实批次更新"
      title="新样本到来时，完成范围为何收窄或重新变宽？"
      description="沿迁移时间线选择检查点。每次更新都保存已观察对象、实测吞吐、剩余量和预测区间，旧预测不会被覆盖删除。"
      kind="estimate-progress-forecast-interval"
      reset={() => setId("before")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(checkpoints) as CheckpointId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {checkpoints[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-control border border-border bg-bg p-4">
          <div className="relative h-16">
            <div className="absolute left-0 right-0 top-7 h-1 rounded-full bg-border" />
            <div
              className="absolute top-5 h-5 rounded-full opacity-70"
              style={{
                left: `${start}%`,
                width: `${end - start}%`,
                background: checkpoint.color,
              }}
              aria-label={`预测区间从刻度 ${start} 到 ${end}`}
            />
            <span
              className="absolute top-0 -translate-x-1/2 text-xs font-semibold"
              style={{ left: `${start}%`, color: checkpoint.color }}
            >
              最早
            </span>
            <span
              className="absolute top-0 -translate-x-1/2 text-xs font-semibold"
              style={{ left: `${end}%`, color: checkpoint.color }}
            >
              最晚
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              ["已观察", checkpoint.observed],
              ["实测吞吐", checkpoint.throughput],
              ["剩余对象", checkpoint.remaining],
              ["当前预测", checkpoint.forecast],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-control border border-border bg-elevated p-3"
              >
                <span className="text-xs font-semibold text-secondary">
                  {label}
                </span>
                <strong
                  className="mt-1 block text-sm"
                  style={{ color: checkpoint.color }}
                >
                  {value}
                </strong>
              </div>
            ))}
          </div>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: checkpoint.color }}
        >
          {checkpoint.note}
        </p>
      </div>
    </EstimateFrame>
  );
}
