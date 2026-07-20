"use client";

import { useState, type ReactNode } from "react";

const c = {
  border: "var(--border)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

function PrototypeFrame({
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
      data-tpp20-unit="tpp20-topic-13-prototypes-post-it-notes"
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

const briefs = {
  paper: {
    label: "纸卡：柜员能否识别过期预订？",
    question: "只问：柜员能否在 10 秒内从三种状态里找出“已过期”？",
    medium: "3 张索引卡 + 6 名柜员",
    include: ["有效 / 今日到期 / 已过期", "柜员的首次选择", "完成时间"],
    omit: ["登录", "数据库", "视觉品牌", "边缘权限"],
    exit: "6 人中至少 5 人首次选对；当日撕毁卡片，只保留状态命名决定。",
    color: c.success,
  },
  spike: {
    label: "性能 spike：索引能否压低查询尾延迟？",
    question: "只问：生产规模样本下，加组合索引能否让 p95 低于 200 ms？",
    medium: "一次性脚本 + 脱敏数据快照",
    include: ["同一 SQL", "固定数据量", "p50 / p95 与执行计划"],
    omit: ["页面", "API 鉴权", "重试", "部署流水线"],
    exit: "比较有/无索引的同一查询；保存计划与结论，删除脚本和数据快照。",
    color: c.accent,
  },
  miniProduct: {
    label: "伪原型：先做一个小产品",
    question: "同时想验证流程、性能、权限、文案和技术栈，没有单一学习问题。",
    medium: "生产框架 + 完整数据库 + 两周开发",
    include: ["所有页面", "完整领域模型", "动画与品牌", "部署配置"],
    omit: ["明确的未知量", "停止条件", "丢弃日期", "观察者"],
    exit: "没有退出合同；投入越多，团队越倾向把临时代码直接上线。",
    color: c.danger,
  },
} as const;
type BriefId = keyof typeof briefs;

export function Tpp20Topic13PrototypesPostItNotesSystemLab() {
  const [id, setId] = useState<BriefId>("miniProduct");
  const brief = briefs[id];
  return (
    <PrototypeFrame
      eyebrow="Topic 13 专属解剖图 · 学习问题决定原型材料"
      title="这个工件是在回答一个未知量，还是偷偷变成产品？"
      description="选择三份原型简报。每份都明确问题、材料、刻意保留与刻意省略的对象；原型边界由学习问题决定，不由代码量决定。"
      kind="prototype-learning-brief"
      reset={() => setId("miniProduct")}
    >
      <div className="p-4">
        <div className="grid gap-2 lg:grid-cols-3">
          {(Object.keys(briefs) as BriefId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {briefs[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-control border border-border bg-bg p-4">
          <p className="text-xs font-semibold text-secondary">唯一学习问题</p>
          <p
            className="mt-1 text-sm font-semibold leading-6"
            style={{ color: brief.color }}
          >
            {brief.question}
          </p>
          <p className="mt-3 rounded-control border border-border bg-elevated px-3 py-2 font-mono text-xs">
            材料：{brief.medium}
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div
              className="rounded-control border p-3"
              style={{ borderColor: brief.color }}
            >
              <strong className="text-xs" style={{ color: brief.color }}>
                为回答问题而保留
              </strong>
              <ul className="mt-2 space-y-1 text-sm">
                {brief.include.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-control border border-border p-3">
              <strong className="text-xs text-secondary">刻意不做</strong>
              <ul className="mt-2 space-y-1 text-sm text-secondary">
                {brief.omit.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: brief.color }}
        >
          <strong>退出合同：</strong> {brief.exit}
        </p>
      </div>
    </PrototypeFrame>
  );
}

const fidelities = {
  vague: {
    label: "过低：一张“完成”便签",
    artifact: ["搜索", "预订", "完成"],
    cost: "15 分钟",
    observation: "5 人都问：过期与冲突时会怎样？",
    answer: "没有画关键状态，无法回答原问题。",
    next: "增加“今日到期 / 已过期 / 已被他人预订”三张状态卡。",
    color: c.warning,
  },
  matched: {
    label: "匹配：可移动状态卡",
    artifact: ["今日到期", "已过期", "他人已预订"],
    cost: "45 分钟",
    observation: "6 人中 5 人首次把“已过期”移到拒绝区。",
    answer: "状态名称足以回答柜员识别问题。",
    next: "记录命名决定，丢弃纸卡；生产实现另立质量合同。",
    color: c.success,
  },
  polished: {
    label: "过高：可点击高保真页面",
    artifact: ["动画", "品牌色", "响应式", "真实组件库"],
    cost: "4 天",
    observation: "评审集中在阴影与颜色，没人重做状态识别任务。",
    answer: "精细外观制造完成错觉，反而遮住学习问题。",
    next: "退回状态卡；把视觉规范作为另一个问题单独验证。",
    color: c.danger,
  },
} as const;
type FidelityId = keyof typeof fidelities;

export function Tpp20Topic13PrototypesPostItNotesFeedbackLab() {
  const [id, setId] = useState<FidelityId>("vague");
  const fidelity = fidelities[id];
  return (
    <PrototypeFrame
      eyebrow="Topic 13 专属实验 · 保真度只服务当前问题"
      title="只改变保真度，哪一种工件最快得到可用观察？"
      description="三种工件都研究同一个“过期状态能否被识别”问题。比较实际材料、耗时、观察内容和下一步，不用精美程度充当进度。"
      kind="prototype-fidelity-fit"
      reset={() => setId("vague")}
    >
      <div className="grid gap-4 p-4 md:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-2">
          {(Object.keys(fidelities) as FidelityId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {fidelities[key].label}
            </button>
          ))}
        </div>
        <div className="rounded-control border border-border bg-bg p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <strong className="text-sm">桌面上的工件</strong>
            <span className="rounded-full border border-border px-2 py-1 text-xs">
              制作 {fidelity.cost}
            </span>
          </div>
          <div className="mt-3 flex min-h-28 flex-wrap content-start gap-2 rounded-control border border-dashed border-border bg-elevated p-3">
            {fidelity.artifact.map((item, index) => (
              <span
                key={item}
                className="inline-flex min-h-11 items-center rounded-sm border px-3 py-2 text-sm font-semibold shadow-sm"
                style={{
                  borderColor: fidelity.color,
                  transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <dl className="mt-3 grid gap-2 text-sm">
            <div>
              <dt className="text-xs font-semibold text-secondary">实际观察</dt>
              <dd className="mt-1">{fidelity.observation}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-secondary">能否回答</dt>
              <dd
                className="mt-1 font-semibold"
                style={{ color: fidelity.color }}
              >
                {fidelity.answer}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <p
        className="mx-4 mb-4 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
        style={{ borderColor: fidelity.color }}
      >
        <strong>下一步：</strong> {fidelity.next}
      </p>
    </PrototypeFrame>
  );
}

const lifecycles = {
  noNotes: {
    label: "故障：讨论后直接做结论",
    stages: [
      ["问题", "过期状态能否识别", c.success],
      ["试验", "6 名柜员移动纸卡", c.success],
      ["观察", "没有逐人记录", c.danger],
      ["决定", "凭印象宣布通过", c.danger],
      ["边界", "纸卡仍被当成 UI 规格", c.warning],
    ],
    verdict: "缺少观察记录后，结论无法复核；工件又越过了原型边界。",
    color: c.danger,
  },
  evidence: {
    label: "修复：先保存观察，再裁决",
    stages: [
      ["问题", "10 秒内识别已过期", c.success],
      ["试验", "同一组 3 张状态卡", c.success],
      ["观察", "5/6 首次正确；1 人混淆今日到期", c.success],
      ["决定", "保留命名，补边界文案", c.accent],
      ["边界", "撕毁卡片；只转移决定", c.success],
    ],
    verdict: "生产团队接收的是已验证的状态命名与反例，不是临时工件。",
    color: c.success,
  },
} as const;
type LifecycleId = keyof typeof lifecycles;

export function Tpp20Topic13PrototypesPostItNotesEvidenceLab() {
  const [id, setId] = useState<LifecycleId>("noNotes");
  const lifecycle = lifecycles[id];
  return (
    <PrototypeFrame
      eyebrow="Topic 13 专属复核 · 丢弃工件，转移学习"
      title="观察记录缺失时，结论还能穿过生产边界吗？"
      description="切换故障与修复。每格是一份必须存在的真实工件；最后一格明确原型被销毁，只有经复核的决定进入生产。"
      kind="prototype-disposal-evidence"
      reset={() => setId("noNotes")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(lifecycles) as LifecycleId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {lifecycles[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 lg:grid-cols-5">
          {lifecycle.stages.map(([stage, artifact, color], index) => (
            <div
              key={stage}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {stage}
              </span>
              <strong className="mt-2 block text-sm leading-5">
                {artifact}
              </strong>
              {index < lifecycle.stages.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 z-10 hidden text-lg lg:block"
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
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: lifecycle.color }}
        >
          {lifecycle.verdict}
        </p>
      </div>
    </PrototypeFrame>
  );
}
