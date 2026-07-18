"use client";

import { useId, useMemo, useState } from "react";

type View = "map" | "experiment" | "evidence";
type Props = {
  unitId: string;
  title: string;
  nodes: string[];
  focuses: string[];
  initialView: View;
};
const labels: Record<View, string> = {
  map: "状态依赖",
  experiment: "规模实验",
  evidence: "故障证据",
};

export function OfficialGep1Lab({
  unitId,
  title,
  nodes,
  focuses,
  initialView,
}: Props) {
  const marker = useId().replace(/:/g, "");
  const [view, setView] = useState<View>(initialView);
  const [objects, setObjects] = useState(48);
  const [cache, setCache] = useState(82);
  const [lod, setLod] = useState(56);
  const [running, setRunning] = useState(true);
  const metrics = useMemo(() => {
    const update = 1.2 + objects * 0.075;
    const render = 2.4 + objects * 0.09 * (lod / 60);
    const wait = Math.max(0.2, (100 - cache) * 0.055);
    const memory = 42 + objects * 1.25 + (100 - lod) * 0.45;
    const frame = Math.max(update, render) + wait;
    return { update, render, wait, memory, frame, headroom: 16.67 - frame };
  }, [cache, lod, objects]);
  const active = running
    ? Math.min(nodes.length - 1, Math.floor((objects / 81) * nodes.length))
    : 0;
  const reset = () => {
    setObjects(48);
    setCache(82);
    setLod(56);
    setRunning(true);
  };

  return (
    <section className="not-prose my-6 overflow-hidden border-y border-border bg-elevated">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-accent">GEP1 · {unitId}</p>
          <h4 className="truncate text-base font-semibold text-primary">
            {title}
          </h4>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            title={running ? "暂停轨迹" : "继续轨迹"}
            aria-label={running ? "暂停轨迹" : "继续轨迹"}
            onClick={() => setRunning((v) => !v)}
            className="grid size-8 place-items-center rounded-control border border-border text-secondary hover:border-accent hover:text-primary"
          >
            <span aria-hidden="true">{running ? "⏸" : "▶"}</span>
          </button>
          <button
            type="button"
            title="重置实验"
            aria-label="重置实验"
            onClick={reset}
            className="grid size-8 place-items-center rounded-control border border-border text-secondary hover:border-accent hover:text-primary"
          >
            <span aria-hidden="true">↺</span>
          </button>
        </div>
      </div>
      <div
        className="flex overflow-x-auto border-b border-border px-4"
        role="tablist"
        aria-label="基础框架实验视图"
      >
        {(Object.keys(labels) as View[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={view === key}
            onClick={() => setView(key)}
            className={
              view === key
                ? "border-b-2 border-accent px-3 py-2 text-xs font-medium text-primary"
                : "border-b-2 border-transparent px-3 py-2 text-xs text-secondary hover:text-primary"
            }
          >
            {labels[key]}
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-h-80 p-4">
          {view === "map" ? (
            <MapView nodes={nodes} active={active} marker={marker} />
          ) : view === "experiment" ? (
            <ExperimentView metrics={metrics} />
          ) : (
            <EvidenceView
              nodes={nodes}
              focuses={focuses}
              active={active}
              over={metrics.headroom < 0}
            />
          )}
        </div>
        <div className="grid content-center gap-4 border-t border-border p-4 lg:border-l lg:border-t-0">
          <Control
            label="对象规模"
            value={objects}
            min={8}
            max={80}
            suffix=""
            set={setObjects}
          />
          <Control
            label="缓存命中"
            value={cache}
            min={30}
            max={100}
            suffix="%"
            set={setCache}
          />
          <Control
            label="LOD质量"
            value={lod}
            min={20}
            max={100}
            suffix="%"
            set={setLod}
          />
          <dl className="grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs">
            <dt className="text-secondary">帧时间</dt>
            <dd className="text-right font-mono text-primary">
              {metrics.frame.toFixed(2)} ms
            </dd>
            <dt className="text-secondary">预算余量</dt>
            <dd
              className={
                metrics.headroom >= 0
                  ? "text-right font-mono text-success"
                  : "text-right font-mono text-danger"
              }
            >
              {metrics.headroom.toFixed(2)} ms
            </dd>
            <dt className="text-secondary">内存</dt>
            <dd className="text-right font-mono text-primary">
              {metrics.memory.toFixed(0)} MB
            </dd>
          </dl>
        </div>
      </div>
    </section>
  );
}

function MapView({
  nodes,
  active,
  marker,
}: {
  nodes: string[];
  active: number;
  marker: string;
}) {
  return (
    <svg
      viewBox="0 0 760 300"
      role="img"
      aria-label="对象资源状态依赖图"
      className="h-full min-h-72 w-full"
    >
      <defs>
        <marker
          id={marker}
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0 0 8 4 0 8Z" className="fill-accent" />
        </marker>
      </defs>
      {nodes.map((label, i) => {
        const x = 80 + i * (600 / Math.max(1, nodes.length - 1));
        const y = 82 + (i % 2) * 92;
        const nx = 80 + (i + 1) * (600 / Math.max(1, nodes.length - 1));
        const ny = 82 + ((i + 1) % 2) * 92;
        return (
          <g key={label}>
            {i < nodes.length - 1 ? (
              <line
                x1={x + 50}
                y1={y + 24}
                x2={nx - 50}
                y2={ny + 24}
                className={i < active ? "stroke-accent" : "stroke-border"}
                strokeWidth={i < active ? 3 : 1.5}
                markerEnd={i < active ? `url(#${marker})` : undefined}
              />
            ) : null}
            <rect
              x={x - 52}
              y={y}
              width="104"
              height="48"
              rx="6"
              className={
                i <= active
                  ? "fill-accent-glow stroke-accent"
                  : "fill-bg stroke-border"
              }
            />
            <text
              x={x}
              y={y + 21}
              textAnchor="middle"
              className="fill-primary text-[10px] font-medium"
            >
              {short(label, 8)}
            </text>
            <text
              x={x}
              y={y + 36}
              textAnchor="middle"
              className="fill-secondary text-[9px]"
            >
              state {i + 1}
            </text>
          </g>
        );
      })}
      <line x1="55" y1="248" x2="705" y2="248" className="stroke-border" />
      <text x="55" y="270" className="fill-secondary text-[10px]">
        create
      </text>
      <text
        x="705"
        y="270"
        textAnchor="end"
        className="fill-secondary text-[10px]"
      >
        retire
      </text>
    </svg>
  );
}

function ExperimentView({
  metrics,
}: {
  metrics: {
    update: number;
    render: number;
    wait: number;
    memory: number;
    frame: number;
    headroom: number;
  };
}) {
  const rows = [
    ["Update", metrics.update, "fill-accent"],
    ["Render", metrics.render, "fill-info"],
    ["I/O wait", metrics.wait, "fill-warning"],
    ["Memory / 10", metrics.memory / 10, "fill-success"],
  ] as const;
  return (
    <svg
      viewBox="0 0 760 300"
      role="img"
      aria-label="对象资源规模实验"
      className="h-full min-h-72 w-full"
    >
      <line
        x1="640"
        y1="34"
        x2="640"
        y2="255"
        className="stroke-danger"
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <text
        x="640"
        y="25"
        textAnchor="middle"
        className="fill-danger text-[10px]"
      >
        16.67 ms
      </text>
      {rows.map(([label, value, fill], i) => {
        const y = 52 + i * 55,
          w = Math.min(565, value * 34);
        return (
          <g key={label}>
            <text x="20" y={y + 19} className="fill-secondary text-[11px]">
              {label}
            </text>
            <rect
              x="120"
              y={y}
              width="565"
              height="28"
              rx="4"
              className="fill-bg stroke-border"
            />
            <rect
              x="120"
              y={y}
              width={w}
              height="28"
              rx="4"
              className={fill}
              opacity="0.8"
            />
            <text
              x={Math.min(674, 128 + w)}
              y={y + 19}
              className="fill-primary text-[10px]"
            >
              {value.toFixed(2)}
            </text>
          </g>
        );
      })}
      <text
        x="20"
        y="285"
        className={
          metrics.headroom >= 0
            ? "fill-success text-[12px] font-medium"
            : "fill-danger text-[12px] font-medium"
        }
      >
        {metrics.headroom >= 0
          ? "frame budget retained"
          : "frame budget exceeded"}{" "}
        · {metrics.frame.toFixed(2)} ms
      </text>
    </svg>
  );
}

function EvidenceView({
  nodes,
  focuses,
  active,
  over,
}: {
  nodes: string[];
  focuses: string[];
  active: number;
  over: boolean;
}) {
  return (
    <div className="grid min-h-72 content-center gap-3">
      <div className="grid grid-cols-[5rem_minmax(0,1fr)_5rem] border-b border-border pb-2 text-xs text-secondary">
        <span>object</span>
        <span>trace</span>
        <span className="text-right">state</span>
      </div>
      {nodes.map((label, i) => (
        <div
          key={label}
          className="grid grid-cols-[5rem_minmax(0,1fr)_5rem] gap-2 border-b border-border/60 pb-2 text-xs"
        >
          <span className="font-mono text-secondary">
            G{i + 1}:R{i + 8}
          </span>
          <span className="truncate text-primary">
            {label} · {focuses[i % focuses.length]}
          </span>
          <span
            className={
              i <= active
                ? "text-right text-success"
                : "text-right text-secondary"
            }
          >
            {i <= active ? "verified" : "queued"}
          </span>
        </div>
      ))}
      <div
        className={
          over
            ? "border-l-2 border-danger pl-3 text-xs text-secondary"
            : "border-l-2 border-success pl-3 text-xs text-secondary"
        }
      >
        {over
          ? "first over-budget frame retained"
          : "normal, pressure and failure traces aligned"}
      </div>
    </div>
  );
}
function Control({
  label,
  value,
  min,
  max,
  suffix,
  set,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  set: (value: number) => void;
}) {
  return (
    <label className="grid gap-1 text-xs text-secondary">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        <span className="font-mono text-primary">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="mdx-range h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
      />
    </label>
  );
}
function short(value: string, length: number) {
  return value.length > length ? `${value.slice(0, length)}…` : value;
}
