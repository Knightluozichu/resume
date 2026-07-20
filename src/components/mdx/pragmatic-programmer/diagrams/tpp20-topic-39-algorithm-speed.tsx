"use client";

import { useMemo, useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-39-algorithm-speed";
const color = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

export function Tpp20Topic39AlgorithmSpeedSystemLab() {
  const [n, setN] = useState(1000);
  const result = useMemo(() => {
    const currencies = 180;
    return {
      nested: n * currencies,
      indexed: currencies + n,
      ratio: (n * currencies) / (currencies + n),
    };
  }, [n]);
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 39 专属解剖图 · 订单导入的查找成本"
      title="输入放大十倍，比较次数为什么接近放大一百倍？"
      description="调整订单行数，比较逐行扫描 180 种货币与预建索引。操作计数来自循环结构，不用墙钟抖动猜数量级。"
      kind="algorithm-speed-operation-growth"
      reset={() => setN(1000)}
    >
      <div className="p-4">
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[1000, 5000, 10000].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setN(value)}
              aria-pressed={n === value}
              className={`min-h-11 rounded-control border p-2 text-sm font-semibold ${
                n === value
                  ? "border-accent bg-accent/10"
                  : "border-border bg-bg"
              }`}
            >
              n={value.toLocaleString()}
            </button>
          ))}
        </div>
        <label className="block rounded-control border border-border bg-bg p-3 text-sm">
          <span className="flex justify-between">
            <strong>订单行数 n</strong>
            <code>{n.toLocaleString()}</code>
          </span>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="mt-3 min-h-11 w-full accent-[var(--accent)]"
          />
        </label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-control border border-danger bg-bg p-4">
            <p className="text-xs font-semibold text-muted">
              嵌套扫描 · O(n×m)
            </p>
            <code className="mt-2 block text-lg">
              {result.nested.toLocaleString()} comparisons
            </code>
            <div className="mt-3 h-4 rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-danger"
                style={{ width: "100%" }}
              />
            </div>
            <p className="mt-2 text-xs">每行重新扫描 currencies[180]</p>
          </div>
          <div className="rounded-control border border-success bg-bg p-4">
            <p className="text-xs font-semibold text-muted">
              预建 Map · O(m+n)
            </p>
            <code className="mt-2 block text-lg">
              {result.indexed.toLocaleString()} operations
            </code>
            <div className="mt-3 h-4 rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-success"
                style={{
                  width: `${Math.max(2, (result.indexed / result.nested) * 100)}%`,
                }}
              />
            </div>
            <p className="mt-2 text-xs">建索引 180 次 + 每行查询一次</p>
          </div>
        </div>
        <p className="mt-3 rounded-control border-l-4 border-accent bg-bg p-3 text-sm">
          在 n={n.toLocaleString()} 时，嵌套扫描操作数约为索引方案的{" "}
          {result.ratio.toFixed(1)} 倍；常数会影响小输入，但不会消除增长阶差异。
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const distributions = {
  unique: {
    label: "全唯一",
    data: "10k 个不同 customerId",
    array: "49,995,000 comparisons",
    set: "10,000 hash lookups",
    note: "数组去重接近最坏 O(n²)",
    tone: color.danger,
  },
  early: {
    label: "很早重复",
    data: "第 2 项起都等于首项",
    array: "9,999 comparisons",
    set: "10,000 hash lookups",
    note: "特殊分布让线性扫描看似更快，但不代表一般增长",
    tone: color.warning,
  },
  clustered: {
    label: "100 个热点值",
    data: "10k 项均匀落在 100 IDs",
    array: "504,900 comparisons",
    set: "10,000 hash lookups",
    note: "分布改变常数与平均情况，仍需声明工作负载",
    tone: color.accent,
  },
  sorted: {
    label: "已排序",
    data: "10k IDs grouped and ordered",
    array: "9,999 adjacent comparisons",
    set: "10,000 hash lookups",
    note: "利用已声明的排序前提，可用一次相邻扫描 O(n)",
    tone: color.success,
  },
} as const;
type DistributionId = keyof typeof distributions;

export function Tpp20Topic39AlgorithmSpeedFeedbackLab() {
  const [id, setId] = useState<DistributionId>("unique");
  const d = distributions[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 39 专属实验 · 输入分布改变平均成本"
      title="同样是 10,000 项，为什么一次测量会误导算法选择？"
      description="切换唯一、早重复、热点和已排序数据。比较数组扫描、Set 与利用排序前提的相邻扫描。"
      kind="algorithm-speed-input-distribution"
      reset={() => setId("unique")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-4">
          {(Object.keys(distributions) as DistributionId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {distributions[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block rounded-control border border-border bg-bg p-3 text-xs">
          workload: {d.data}
        </code>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div
            className="rounded-control border bg-bg p-4"
            style={{ borderColor: d.tone }}
          >
            <p className="text-xs text-muted">Array.includes 去重</p>
            <code className="mt-2 block text-sm">{d.array}</code>
          </div>
          <div className="rounded-control border border-success bg-bg p-4">
            <p className="text-xs text-muted">Set.has 去重</p>
            <code className="mt-2 block text-sm">{d.set}</code>
          </div>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: d.tone }}
        >
          {d.note}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const benches = {
  clean: {
    label: "可信基准",
    setup: [
      "warmup 20",
      "samples 50",
      "fixed CPU governor",
      "same fixture hash",
    ],
    points: [
      [1, 1.2],
      [2, 2.3],
      [4, 4.7],
      [8, 9.5],
    ],
    cv: "2.8%",
    fit: "time ≈ 1.18n；R²=.998",
    decision: "支持线性增长；在目标 n=100k 实测 118ms",
    tone: color.success,
  },
  cold: {
    label: "混入冷启动",
    setup: ["warmup 0", "samples 3", "JIT enabled", "first run included"],
    points: [
      [1, 12],
      [2, 4],
      [4, 6],
      [8, 11],
    ],
    cv: "61%",
    fit: "无法稳定拟合",
    decision: "拒绝外推；先分离初始化与稳态",
    tone: color.danger,
  },
  tiny: {
    label: "只测微小输入",
    setup: ["warmup 20", "samples 50", "n≤80", "timer resolution 1ms"],
    points: [
      [1, 0.2],
      [2, 0.2],
      [4, 0.3],
      [8, 0.4],
    ],
    cv: "18%",
    fit: "常数与计时精度支配",
    decision: "不能用微小区间证明大输入增长阶",
    tone: color.warning,
  },
} as const;
type BenchId = keyof typeof benches;

export function Tpp20Topic39AlgorithmSpeedEvidenceLab() {
  const [id, setId] = useState<BenchId>("clean");
  const b = benches[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 39 专属复核 · 估算必须接受基准反驳"
      title="四个数字能证明 O(n) 吗？"
      description="比较稳态采样、冷启动污染和过小输入。图同时保存实验设置、散布、拟合与可用结论。"
      kind="algorithm-speed-benchmark-evidence"
      reset={() => setId("clean")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(benches) as BenchId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {benches[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-[.8fr_1.2fr]">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {b.setup.map((item) => (
              <code
                key={item}
                className="rounded-control border border-border bg-bg p-3 text-xs"
              >
                {item}
              </code>
            ))}
          </div>
          <div className="flex h-48 items-end gap-3 rounded-control border border-border bg-bg p-4">
            {b.points.map(([n, time]) => (
              <div key={n} className="flex flex-1 flex-col items-center">
                <code className="mb-2 text-xs">{time}ms</code>
                <div
                  className="w-full rounded-t-control"
                  style={{
                    height: `${Math.max(8, (time / 12) * 120)}px`,
                    background: b.tone,
                  }}
                />
                <code className="mt-2 text-xs">{n}×</code>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <code
            className="rounded-control border bg-bg p-3 text-xs"
            style={{ borderColor: b.tone }}
          >
            CV={b.cv} · {b.fit}
          </code>
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            {b.decision}
          </p>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}
