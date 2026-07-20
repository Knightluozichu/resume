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

function TracerFrame({
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
      data-tpp20-unit="tpp20-topic-12-tracer-bullets"
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

const slices = {
  horizontal: {
    label: "按层施工",
    lanes: [
      ["界面", "搜索页已做完", "100%", c.success],
      ["API", "预订接口未接", "0%", c.danger],
      ["数据", "没有真实 hold 记录", "0%", c.danger],
      ["观测", "没有 request id", "0%", c.danger],
    ],
    verdict: "每层都有局部进度，但用户仍不能完成一次预订，也没有真实着弹点。",
    color: c.danger,
  },
  tracer: {
    label: "最细纵切",
    lanes: [
      ["界面", "提交《领域驱动设计》", "1 条路径", c.accent],
      ["API", "POST /holds → 201", "1 个合同", c.accent],
      ["数据", "hold R-104 写入", "1 行数据", c.accent],
      ["观测", "trace 7F2 可追踪", "1 条轨迹", c.success],
    ],
    verdict: "功能很窄，却穿过所有真实边界；团队已能看到用户结果和下一枪方向。",
    color: c.success,
  },
} as const;
type SliceId = keyof typeof slices;

export function Tpp20Topic12TracerBulletsSystemLab() {
  const [id, setId] = useState<SliceId>("horizontal");
  const slice = slices[id];
  return (
    <TracerFrame
      eyebrow="Topic 12 专属解剖图 · 一次真实预订的纵切"
      title="进度是在层里横着堆，还是已经穿过全部边界？"
      description="切换施工方式。图中固定同一个图书预订目标；只比较交付切片如何穿过界面、API、数据库和运行观测。"
      kind="tracer-bullet-vertical-slice"
      reset={() => setId("horizontal")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(slices) as SliceId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {slices[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2">
          {slice.lanes.map(([layer, object, scope, color], index) => (
            <div
              key={layer}
              className="grid gap-2 rounded-control border bg-bg p-3 sm:grid-cols-[5rem_1fr_auto] sm:items-center"
              style={{ borderColor: color }}
            >
              <strong className="text-sm" style={{ color }}>
                {layer}
              </strong>
              <span className="font-mono text-xs leading-5">{object}</span>
              <span className="rounded-full border border-border px-2 py-1 text-xs font-semibold">
                {scope}
              </span>
              {id === "tracer" && index < slice.lanes.length - 1 && (
                <span
                  className="ml-5 hidden text-lg leading-none sm:block"
                  style={{ color: c.accent }}
                  aria-hidden="true"
                >
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: slice.color }}
        >
          {slice.verdict}
        </p>
      </div>
    </TracerFrame>
  );
}

const shots = {
  first: {
    label: "第 1 枪：先打通",
    aim: { x: 35, y: 32 },
    hit: { x: 72, y: 68 },
    miss: "偏差 52：用户找不到预订结果",
    correction: "下一枪：把成功页接到真实 hold id，而不是继续丰富搜索筛选。",
    color: c.danger,
  },
  second: {
    label: "第 2 枪：按反馈修正",
    aim: { x: 52, y: 48 },
    hit: { x: 58, y: 55 },
    miss: "偏差 9：结果已出现，但刷新后丢失",
    correction: "下一枪：补真实读取路径，并用同一个 R-104 重放。",
    color: c.warning,
  },
  third: {
    label: "第 3 枪：命中合同",
    aim: { x: 50, y: 50 },
    hit: { x: 51, y: 50 },
    miss: "偏差 1：R-104 写入、读取与 trace 一致",
    correction: "命中后再扩大输入范围；保留前三枪，不能只留下最终截图。",
    color: c.success,
  },
} as const;
type ShotId = keyof typeof shots;

export function Tpp20Topic12TracerBulletsFeedbackLab() {
  const [id, setId] = useState<ShotId>("first");
  const shot = shots[id];
  return (
    <TracerFrame
      eyebrow="Topic 12 专属实验 · 着弹—校准—再射击"
      title="真实着弹点怎样改变下一次实现方向？"
      description="依次查看三枪。圆心是用户可完成并可重放的预订合同；空心点是预期，实心点是运行后观察到的着弹位置。"
      kind="tracer-bullet-impact-correction"
      reset={() => setId("first")}
    >
      <div className="grid gap-4 p-4 md:grid-cols-[minmax(14rem,0.8fr)_1.2fr]">
        <div
          className="relative mx-auto aspect-square w-full max-w-72 overflow-hidden rounded-full border bg-bg"
          style={{ borderColor: c.border }}
          role="img"
          aria-label={`${shot.label}；${shot.miss}`}
        >
          {[82, 60, 38, 16].map((size, index) => (
            <span
              key={size}
              className="absolute left-1/2 top-1/2 rounded-full border"
              style={{
                width: `${size}%`,
                height: `${size}%`,
                transform: "translate(-50%, -50%)",
                borderColor: index % 2 === 0 ? c.border : c.accent,
              }}
              aria-hidden="true"
            />
          ))}
          <span
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-bg"
            style={{
              left: `${shot.aim.x}%`,
              top: `${shot.aim.y}%`,
              borderColor: c.accent,
            }}
            aria-hidden="true"
          />
          <span
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${shot.hit.x}%`,
              top: `${shot.hit.y}%`,
              background: shot.color,
            }}
            aria-hidden="true"
          />
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-elevated px-2 py-1 text-xs font-semibold">
            圆心：可重放的用户结果
          </span>
        </div>
        <div>
          <div className="grid gap-2">
            {(Object.keys(shots) as ShotId[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setId(key)}
                aria-pressed={id === key}
                className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
              >
                {shots[key].label}
              </button>
            ))}
          </div>
          <div className="mt-3 rounded-control border border-border bg-bg p-3">
            <p className="text-sm font-semibold" style={{ color: shot.color }}>
              {shot.miss}
            </p>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {shot.correction}
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-secondary">
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border-2 border-accent bg-bg" />
              预期着弹
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: shot.color }}
              />
              实际着弹
            </span>
          </div>
        </div>
      </div>
    </TracerFrame>
  );
}

const traces = {
  mock: {
    label: "伪路径：全部用桩",
    request: "demo-local",
    boundaries: [
      ["浏览器", "静态成功页", c.warning],
      ["API", "内存 stub", c.warning],
      ["数据库", "未连接", c.danger],
      ["观测", "无 request id", c.danger],
    ],
    verdict: "看似完成，却没有穿过真实边界；它不能告诉团队子弹会落在哪里。",
    color: c.danger,
  },
  broken: {
    label: "单故障：数据库合同不匹配",
    request: "trace-7F2",
    boundaries: [
      ["浏览器", "提交 book=42", c.success],
      ["API", "POST /holds", c.success],
      ["数据库", "缺少 expires_at", c.danger],
      ["观测", "首差=db.contract", c.warning],
    ],
    verdict:
      "真实边界让失败在数据库合同处显形；修复应瞄准首差，而不是重写已通过的界面。",
    color: c.warning,
  },
  real: {
    label: "真实路径：同一 request id 闭合",
    request: "trace-7F2",
    boundaries: [
      ["浏览器", "提交 book=42", c.success],
      ["API", "201 hold=R-104", c.success],
      ["数据库", "R-104 + expires_at", c.success],
      ["观测", "7F2 四段闭合", c.success],
    ],
    verdict:
      "同一身份贯穿输入、合同、持久化和 trace；独立复核者可从 7F2 重建整次着弹。",
    color: c.success,
  },
} as const;
type TraceId = keyof typeof traces;

export function Tpp20Topic12TracerBulletsEvidenceLab() {
  const [id, setId] = useState<TraceId>("mock");
  const trace = traces[id];
  return (
    <TracerFrame
      eyebrow="Topic 12 专属复核 · 同一身份穿越真实边界"
      title="这条路径有真实 trace，还是只有成功外观？"
      description="比较桩路径、单故障和恢复路径。四个边界共享同一个 request id；首差必须停在真正拒绝输入的位置。"
      kind="tracer-bullet-boundary-trace"
      reset={() => setId("mock")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(traces) as TraceId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {traces[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-control border border-border bg-bg">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
            <span className="text-xs font-semibold text-secondary">
              贯穿身份
            </span>
            <code className="rounded bg-elevated px-2 py-1 text-xs text-accent">
              {trace.request}
            </code>
          </div>
          <div className="grid gap-0 md:grid-cols-4">
            {trace.boundaries.map(([boundary, evidence, color], index) => (
              <div
                key={boundary}
                className="relative border-b border-border p-4 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <span className="text-xs font-semibold" style={{ color }}>
                  {index + 1}. {boundary}
                </span>
                <strong className="mt-2 block font-mono text-xs leading-5">
                  {evidence}
                </strong>
                {index < trace.boundaries.length - 1 && (
                  <span
                    className="absolute -right-2 top-1/2 z-10 hidden rounded-full bg-elevated text-base md:block"
                    style={{ color }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: trace.color }}
        >
          {trace.verdict}
        </p>
      </div>
    </TracerFrame>
  );
}
