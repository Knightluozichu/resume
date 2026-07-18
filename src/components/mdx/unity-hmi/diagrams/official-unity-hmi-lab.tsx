"use client";

import { useMemo, useState } from "react";

type LabProps = { title: string; focus: string; stages: string[] };
const panel = "rounded-md border border-slate-200 bg-white p-4 shadow-sm";
const button = "min-h-9 border px-3 py-1.5 text-sm transition-colors";

export function Uhm24PlatformLab({ title, focus, stages }: LabProps) {
  const [active, setActive] = useState(0);
  return (
    <section className={panel} aria-label={title + " 平台路径"}>
      <div
        className="mb-3 flex flex-wrap gap-2"
        role="tablist"
        aria-label="HMI阶段"
      >
        {stages.map((stage, index) => (
          <button
            key={stage}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={
              button +
              (active === index
                ? " border-cyan-700 bg-cyan-50 text-cyan-950"
                : " border-slate-300 text-slate-700")
            }
            onClick={() => setActive(index)}
          >
            {index + 1}. {stage}
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="rounded border border-slate-200 bg-slate-50 p-3">
          <strong>输入合同</strong>
          <p className="mt-1 text-sm">{focus}</p>
        </div>
        <span className="text-center text-xl text-cyan-800" aria-hidden="true">
          →
        </span>
        <div className="rounded border border-emerald-200 bg-emerald-50 p-3">
          <strong>当前阶段</strong>
          <p className="mt-1 text-sm">{stages[active]}</p>
        </div>
      </div>
    </section>
  );
}

export function Uhm24BudgetLab({ title, focus, stages }: LabProps) {
  const [views, setViews] = useState(3);
  const [triangles, setTriangles] = useState(12);
  const [signals, setSignals] = useState(30);
  const estimate = useMemo(
    () => 5.8 + views * 1.45 + triangles * 0.31 + signals * 0.045,
    [views, triangles, signals],
  );
  const budget = 33.3;
  return (
    <section className={panel} aria-label={title + " 预算实验"}>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm">
          View数量：{views}
          <input
            className="mt-2 w-full"
            type="range"
            min="1"
            max="8"
            value={views}
            onChange={(e) => setViews(Number(e.target.value))}
          />
        </label>
        <label className="text-sm">
          三角面：{triangles}万
          <input
            className="mt-2 w-full"
            type="range"
            min="1"
            max="120"
            value={triangles}
            onChange={(e) => setTriangles(Number(e.target.value))}
          />
        </label>
        <label className="text-sm">
          信号频率：{signals}Hz
          <input
            className="mt-2 w-full"
            type="range"
            min="1"
            max="100"
            value={signals}
            onChange={(e) => setSignals(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded border border-slate-200 p-3">
          <span className="text-xs text-slate-500">估算帧时</span>
          <strong className="block text-xl">{estimate.toFixed(1)} ms</strong>
        </div>
        <div className="rounded border border-slate-200 p-3">
          <span className="text-xs text-slate-500">30 FPS预算</span>
          <strong className="block text-xl">{budget} ms</strong>
        </div>
        <div
          className={
            "rounded border p-3 " +
            (estimate <= budget
              ? "border-emerald-300 bg-emerald-50"
              : "border-rose-300 bg-rose-50")
          }
        >
          <span className="text-xs">判定</span>
          <strong className="block text-xl">
            {estimate <= budget ? "可进入目标机复测" : "预算超限"}
          </strong>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        模型只展示变量关系；正式结论必须来自固定平台与场景的Profiler捕获。
        {focus} · {stages.join(" → ")}
      </p>
    </section>
  );
}

export function Uhm24EvidenceLab({ title, focus, stages }: LabProps) {
  const faults = ["客户端退出", "Surface重建", "信号断连", "内存压力"];
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (fault: string) =>
    setSelected((current) =>
      current.includes(fault)
        ? current.filter((item) => item !== fault)
        : [...current, fault],
    );
  return (
    <section className={panel} aria-label={title + " 故障证据"}>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {faults.map((fault) => (
          <label
            key={fault}
            className="flex items-center gap-2 rounded border border-slate-200 p-3 text-sm"
          >
            <input
              type="checkbox"
              checked={selected.includes(fault)}
              onChange={() => toggle(fault)}
            />
            {fault}
          </label>
        ))}
      </div>
      <div className="mt-4 rounded border border-amber-200 bg-amber-50 p-3 text-sm">
        <strong>证据要求：</strong>
        {selected.length === 0
          ? "选择至少一种故障，先写预期降级与恢复结果。"
          : selected
              .map((fault) => fault + "：日志、画面、指标、恢复时刻")
              .join("；")}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        {focus} · {stages.join(" → ")}
      </p>
    </section>
  );
}
