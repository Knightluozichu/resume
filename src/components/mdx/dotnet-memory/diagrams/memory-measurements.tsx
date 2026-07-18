"use client";

import { useState } from "react";

const evidenceLayers = [
  {
    layer: "01 detect",
    source: "continuous counters",
    answers: "何时开始异常？速率、堆大小、GC 次数如何变化？",
    cost: "低开销，适合持续趋势与告警",
    output: "time series",
    className: "border-cyan-500/35 bg-cyan-500/10",
  },
  {
    layer: "02 explain",
    source: "event trace",
    answers: "谁在分配？哪次 GC 暂停？线程与请求如何重叠？",
    cost: "中等开销，限制窗口和 provider",
    output: "timeline + stacks",
    className: "border-amber-500/35 bg-amber-500/10",
  },
  {
    layer: "03 prove",
    source: "heap dump",
    answers: "当前有哪些对象？谁在保留它？从哪条根路径可达？",
    cost: "高开销且含敏感数据，按事件采集",
    output: "object graph",
    className: "border-rose-500/35 bg-rose-500/10",
  },
  {
    layer: "04 verify",
    source: "controlled reproduction",
    answers: "修复后同负载、同窗口、同版本是否改善？",
    cost: "需要可重复场景和前后对照",
    output: "comparable evidence",
    className: "border-emerald-500/35 bg-emerald-500/10",
  },
] as const;

export function DnmMeasurementDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从持续计数器发现异常，经事件轨迹解释、堆转储证明，到受控复现验证的内存诊断证据链"
          className="grid gap-3 lg:grid-cols-4"
        >
          {evidenceLayers.map((item) => (
            <section key={item.layer} className={`min-h-64 border p-4 ${item.className}`}>
              <span className="text-xs text-secondary">{item.layer}</span>
              <strong className="mt-2 block text-sm text-primary">{item.source}</strong>
              <p className="mb-0 mt-4 text-xs text-primary">{item.answers}</p>
              <p className="mb-0 mt-4 border-t border-border pt-3 text-xs text-secondary">cost · {item.cost}</p>
              <code className="mt-3 block text-xs text-accent">{item.output}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        指标用于发现，轨迹用于解释，转储用于证明保留路径；修复必须回到同口径对照，而不是换一个工具宣布成功。
      </figcaption>
    </figure>
  );
}

type ScenarioId = "allocation" | "retention" | "pause" | "native";

const scenarios: Array<{
  id: ScenarioId;
  label: string;
  symptom: string;
  metrics: Array<{ name: string; value: string; state: "high" | "flat" | "normal" }>;
  next: string;
  falseLead: string;
}> = [
  {
    id: "allocation",
    label: "分配洪峰",
    symptom: "吞吐下降，但进程内存回落",
    metrics: [
      { name: "allocation rate", value: "420 MB/s", state: "high" },
      { name: "managed heap", value: "620 → 650 MB", state: "flat" },
      { name: "Gen 0 / min", value: "180", state: "high" },
      { name: "pause p99", value: "18 ms", state: "normal" },
    ],
    next: "采集短事件轨迹与分配调用栈，按累计字节排序热点",
    falseLead: "只比较两个堆快照，可能看不到已经死亡的海量短命对象",
  },
  {
    id: "retention",
    label: "逻辑保留",
    symptom: "低峰后堆基线仍持续抬升",
    metrics: [
      { name: "allocation rate", value: "28 MB/s", state: "normal" },
      { name: "managed heap", value: "600 → 1,480 MB", state: "high" },
      { name: "Gen 2 size", value: "410 → 1,210 MB", state: "high" },
      { name: "pause p99", value: "95 ms", state: "high" },
    ],
    next: "在相同低峰点采集前后堆转储，比较增长类型并读取到根路径",
    falseLead: "只看 GC 次数，会把可达缓存增长误判为回收器不工作",
  },
  {
    id: "pause",
    label: "长暂停",
    symptom: "内存稳定，但请求尾延迟周期性尖峰",
    metrics: [
      { name: "allocation rate", value: "85 MB/s", state: "normal" },
      { name: "managed heap", value: "2.4 GB", state: "flat" },
      { name: "GC pause p99", value: "280 ms", state: "high" },
      { name: "Gen 2 / min", value: "2", state: "normal" },
    ],
    next: "关联请求时间线与 GCStart/GCEnd，区分暂停、挂起和回收阶段",
    falseLead: "平均暂停可能很低，无法代表少量但关键的 p99 尖峰",
  },
  {
    id: "native",
    label: "托管外增长",
    symptom: "进程 RSS 上升，托管堆基本不变",
    metrics: [
      { name: "allocation rate", value: "32 MB/s", state: "normal" },
      { name: "managed heap", value: "740 MB", state: "flat" },
      { name: "working set", value: "1.1 → 3.8 GB", state: "high" },
      { name: "GC pause p99", value: "14 ms", state: "normal" },
    ],
    next: "转向本机分配、映射、线程栈、JIT 与运行时组件口径，不继续只调 GC",
    falseLead: "用托管堆转储解释全部进程内存，证据范围不匹配",
  },
];

export function DnmSignalCorrelationLab() {
  const [active, setActive] = useState<ScenarioId>("allocation");
  const scenario = scenarios.find((item) => item.id === active) ?? scenarios[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择内存诊断场景" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {scenarios.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === item.id}
              onClick={() => setActive(item.id)}
              className={`min-h-11 border px-3 py-2 text-sm transition-colors ${
                active === item.id
                  ? "border-cyan-500 bg-cyan-500/15 text-primary"
                  : "border-border bg-background text-secondary hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <section role="tabpanel" className="mt-4 min-h-96 border border-border bg-background/60 p-4">
          <span className="text-xs text-secondary">用户现象</span>
          <strong className="mt-2 block text-base text-primary">{scenario.symptom}</strong>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {scenario.metrics.map((metric) => (
              <div
                key={metric.name}
                className={`min-h-28 border p-3 ${
                  metric.state === "high"
                    ? "border-rose-500/40 bg-rose-500/10"
                    : metric.state === "flat"
                      ? "border-amber-500/40 bg-amber-500/10"
                      : "border-emerald-500/40 bg-emerald-500/10"
                }`}
              >
                <span className="text-xs text-secondary">{metric.name}</span>
                <strong className="mt-2 block text-sm text-primary">{metric.value}</strong>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">下一份证据</span>
              <p className="mb-0 mt-2 text-xs text-primary">{scenario.next}</p>
            </div>
            <div className="border border-rose-500/35 bg-rose-500/10 p-4">
              <span className="text-xs text-secondary">常见误导</span>
              <p className="mb-0 mt-2 text-xs text-primary">{scenario.falseLead}</p>
            </div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换场景前先预测哪组信号会分叉；单个“内存高”指标无法区分短命分配、长期保留、长暂停与托管外增长。
      </figcaption>
    </figure>
  );
}

type DumpScenario = "bounded" | "leaking" | "churn";

const dumpScenarios: Record<DumpScenario, {
  label: string;
  baseline: Array<{ type: string; count: number; size: number }>;
  current: Array<{ type: string; count: number; size: number }>;
  interpretation: string;
}> = {
  bounded: {
    label: "有界缓存",
    baseline: [
      { type: "CacheEntry", count: 10000, size: 120 },
      { type: "Byte[]", count: 10000, size: 480 },
      { type: "Order", count: 42000, size: 96 },
    ],
    current: [
      { type: "CacheEntry", count: 10030, size: 121 },
      { type: "Byte[]", count: 10030, size: 482 },
      { type: "Order", count: 42500, size: 97 },
    ],
    interpretation: "同一低峰点对象规模基本稳定，支持缓存上限有效，但仍需结合业务吞吐确认窗口可比。",
  },
  leaking: {
    label: "订阅保留",
    baseline: [
      { type: "Subscriber", count: 8000, size: 90 },
      { type: "EventHandler", count: 8000, size: 64 },
      { type: "ViewModel", count: 7800, size: 210 },
    ],
    current: [
      { type: "Subscriber", count: 54000, size: 608 },
      { type: "EventHandler", count: 54000, size: 432 },
      { type: "ViewModel", count: 53200, size: 1430 },
    ],
    interpretation: "多个关联类型按相同比例增长，应抽样读取 gcroot，确认发布者或静态事件是否形成共同保留路径。",
  },
  churn: {
    label: "短命分配",
    baseline: [
      { type: "String", count: 120000, size: 18 },
      { type: "Char[]", count: 80000, size: 22 },
      { type: "RequestState", count: 1200, size: 8 },
    ],
    current: [
      { type: "String", count: 121500, size: 19 },
      { type: "Char[]", count: 80800, size: 22 },
      { type: "RequestState", count: 1180, size: 8 },
    ],
    interpretation: "快照几乎不变不能否定高分配；已死亡对象不会留在堆里，应转向分配事件和调用栈。",
  },
};

export function DnmHeapDeltaLab() {
  const [active, setActive] = useState<DumpScenario>("leaking");
  const scenario = dumpScenarios[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择堆快照比较场景" className="grid grid-cols-3 gap-2">
          {(Object.entries(dumpScenarios) as Array<[DumpScenario, typeof scenario]>).map(([id, item]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active === id}
              onClick={() => setActive(id)}
              className={`min-h-11 border px-2 py-2 text-sm transition-colors ${
                active === id
                  ? "border-cyan-500 bg-cyan-500/15 text-primary"
                  : "border-border bg-background text-secondary hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4">
          <div className="grid gap-2 text-xs">
            <div className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr] gap-2 text-secondary">
              <span>type</span><span>baseline MB</span><span>current MB</span><span>delta MB</span>
            </div>
            {scenario.current.map((item, index) => {
              const baseline = scenario.baseline[index];
              const delta = item.size - baseline.size;
              return (
                <div key={item.type} className="grid min-h-12 grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr] items-center gap-2 border-t border-border text-primary">
                  <strong>{item.type}</strong>
                  <span>{baseline.size}</span>
                  <span>{item.size}</span>
                  <span className={delta > 100 ? "text-rose-400" : "text-secondary"}>+{delta}</span>
                </div>
              );
            })}
          </div>
          <p className="mb-0 mt-5 border-t border-border pt-4 text-xs text-secondary">{scenario.interpretation}</p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两个快照必须处于可比负载阶段；类型差值提出“谁增长”，到根路径才回答“为什么还活着”。
      </figcaption>
    </figure>
  );
}
