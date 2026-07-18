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

const VIEW_LABELS: Record<View, string> = {
  map: "依赖图",
  experiment: "预算实验",
  evidence: "证据轨迹",
};

export function OfficialGea3Lab({
  unitId,
  title,
  nodes,
  focuses,
  initialView,
}: Props) {
  const markerId = useId().replace(/:/g, "");
  const [view, setView] = useState<View>(initialView);
  const [load, setLoad] = useState(58);
  const [workers, setWorkers] = useState(3);
  const [buffer, setBuffer] = useState(2);
  const [running, setRunning] = useState(true);

  const metrics = useMemo(() => {
    const cpu = 2.8 + load * 0.105 + nodes.length * 0.18;
    const gpu = 3.5 + load * 0.112;
    const io = Math.max(0.3, 3.6 - buffer * 0.72);
    const sync = 0.35 + workers * 0.18 + Math.max(0, workers - 5) * 0.38;
    const frame = Math.max(cpu / Math.min(workers, 5), gpu) + io + sync;
    return { cpu, gpu, io, sync, frame, headroom: 16.67 - frame };
  }, [buffer, load, nodes.length, workers]);

  const active = running
    ? Math.min(nodes.length - 1, Math.floor((load / 101) * nodes.length))
    : 0;

  const reset = () => {
    setLoad(58);
    setWorkers(3);
    setBuffer(2);
    setRunning(true);
  };

  return (
    <section className="not-prose my-6 overflow-hidden border-y border-border bg-elevated">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-accent">GEA3 · {unitId}</p>
          <h4 className="truncate text-base font-semibold text-primary">
            {title}
          </h4>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            title={running ? "暂停轨迹" : "继续轨迹"}
            aria-label={running ? "暂停轨迹" : "继续轨迹"}
            onClick={() => setRunning((value) => !value)}
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
        aria-label="架构实验视图"
      >
        {(Object.keys(VIEW_LABELS) as View[]).map((key) => (
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
            {VIEW_LABELS[key]}
          </button>
        ))}
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-h-80 p-4">
          {view === "map" ? (
            <DependencyMap nodes={nodes} active={active} markerId={markerId} />
          ) : view === "experiment" ? (
            <BudgetExperiment metrics={metrics} />
          ) : (
            <EvidenceTrace
              nodes={nodes}
              focuses={focuses}
              active={active}
              metrics={metrics}
            />
          )}
        </div>

        <div className="grid content-center gap-4 border-t border-border p-4 lg:border-l lg:border-t-0">
          <Control
            label="工作负载"
            value={load}
            min={10}
            max={100}
            suffix="%"
            onChange={setLoad}
          />
          <Control
            label="工作线程"
            value={workers}
            min={1}
            max={8}
            suffix=""
            onChange={setWorkers}
          />
          <Control
            label="流送缓冲"
            value={buffer}
            min={0}
            max={5}
            suffix=" 帧"
            onChange={setBuffer}
          />
          <dl className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-border pt-3 text-xs">
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
          </dl>
        </div>
      </div>
    </section>
  );
}

function DependencyMap({
  nodes,
  active,
  markerId,
}: {
  nodes: string[];
  active: number;
  markerId: string;
}) {
  return (
    <svg
      viewBox="0 0 760 300"
      role="img"
      aria-label="运行时依赖与关键路径"
      className="h-full min-h-72 w-full"
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0 0 8 4 0 8Z" className="fill-accent" />
        </marker>
      </defs>
      <line
        x1="65"
        y1="235"
        x2="695"
        y2="235"
        className="stroke-border"
        strokeWidth="1"
      />
      {nodes.map((label, index) => {
        const x = 82 + index * (596 / Math.max(1, nodes.length - 1));
        const y = 74 + (index % 2) * 82;
        const nextX = 82 + (index + 1) * (596 / Math.max(1, nodes.length - 1));
        const nextY = 74 + ((index + 1) % 2) * 82;
        return (
          <g key={label}>
            {index < nodes.length - 1 ? (
              <line
                x1={x + 52}
                y1={y + 26}
                x2={nextX - 52}
                y2={nextY + 26}
                className={index < active ? "stroke-accent" : "stroke-border"}
                strokeWidth={index < active ? 3 : 1.5}
                markerEnd={index < active ? `url(#${markerId})` : undefined}
              />
            ) : null}
            <rect
              x={x - 54}
              y={y}
              width="108"
              height="52"
              rx="6"
              className={
                index <= active
                  ? "fill-accent-glow stroke-accent"
                  : "fill-bg stroke-border"
              }
            />
            <text
              x={x}
              y={y + 22}
              textAnchor="middle"
              className="fill-primary text-[11px] font-medium"
            >
              {shorten(label, 8)}
            </text>
            <text
              x={x}
              y={y + 38}
              textAnchor="middle"
              className="fill-secondary text-[9px]"
            >
              stage {index + 1}
            </text>
            <line
              x1={x}
              y1={y + 52}
              x2={x}
              y2="235"
              className="stroke-border"
              strokeDasharray="3 4"
            />
          </g>
        );
      })}
      <text x="65" y="260" className="fill-secondary text-[10px]">
        frame start
      </text>
      <text
        x="695"
        y="260"
        textAnchor="end"
        className="fill-secondary text-[10px]"
      >
        present
      </text>
    </svg>
  );
}

function BudgetExperiment({
  metrics,
}: {
  metrics: {
    cpu: number;
    gpu: number;
    io: number;
    sync: number;
    frame: number;
    headroom: number;
  };
}) {
  const rows = [
    ["CPU work", metrics.cpu, "fill-accent"],
    ["GPU work", metrics.gpu, "fill-info"],
    ["I/O wait", metrics.io, "fill-warning"],
    ["Sync", metrics.sync, "fill-danger"],
  ] as const;
  return (
    <svg
      viewBox="0 0 760 300"
      role="img"
      aria-label="帧预算实验"
      className="h-full min-h-72 w-full"
    >
      <line
        x1="638"
        y1="35"
        x2="638"
        y2="252"
        className="stroke-danger"
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <text
        x="638"
        y="25"
        textAnchor="middle"
        className="fill-danger text-[10px]"
      >
        16.67 ms
      </text>
      {rows.map(([label, value, fill], index) => {
        const y = 52 + index * 56;
        const width = Math.min(570, value * 34);
        return (
          <g key={label}>
            <text x="22" y={y + 19} className="fill-secondary text-[11px]">
              {label}
            </text>
            <rect
              x="118"
              y={y}
              width="570"
              height="28"
              rx="4"
              className="fill-bg stroke-border"
            />
            <rect
              x="118"
              y={y}
              width={width}
              height="28"
              rx="4"
              className={fill}
              opacity="0.8"
            />
            <text
              x={Math.min(674, 126 + width)}
              y={y + 19}
              className="fill-primary text-[10px] font-medium"
            >
              {value.toFixed(2)} ms
            </text>
          </g>
        );
      })}
      <text
        x="22"
        y="285"
        className={
          metrics.headroom >= 0
            ? "fill-success text-[12px] font-medium"
            : "fill-danger text-[12px] font-medium"
        }
      >
        {metrics.headroom >= 0 ? "within budget" : "budget exceeded"} · frame{" "}
        {metrics.frame.toFixed(2)} ms
      </text>
    </svg>
  );
}

function EvidenceTrace({
  nodes,
  focuses,
  active,
  metrics,
}: {
  nodes: string[];
  focuses: string[];
  active: number;
  metrics: { frame: number; headroom: number };
}) {
  return (
    <div className="grid min-h-72 content-center gap-3">
      <div className="grid grid-cols-[5rem_minmax(0,1fr)_5rem] border-b border-border pb-2 text-xs text-secondary">
        <span>frame</span>
        <span>event</span>
        <span className="text-right">state</span>
      </div>
      {nodes.map((label, index) => (
        <div
          key={label}
          className="grid grid-cols-[5rem_minmax(0,1fr)_5rem] items-center gap-2 border-b border-border/60 pb-2 text-xs"
        >
          <span className="font-mono text-secondary">N+{index}</span>
          <span className="truncate text-primary">
            {label} · {focuses[index % focuses.length]}
          </span>
          <span
            className={
              index <= active
                ? "text-right text-success"
                : "text-right text-secondary"
            }
          >
            {index <= active ? "verified" : "queued"}
          </span>
        </div>
      ))}
      <div
        className={
          metrics.headroom >= 0
            ? "border-l-2 border-success pl-3 text-xs text-secondary"
            : "border-l-2 border-danger pl-3 text-xs text-secondary"
        }
      >
        trace span {metrics.frame.toFixed(2)} ms ·{" "}
        {metrics.headroom >= 0
          ? "budget retained"
          : "first over-budget frame captured"}
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
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-1 text-xs text-secondary">
      <span className="flex items-center justify-between gap-3">
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
        onChange={(event) => onChange(Number(event.target.value))}
        className="mdx-range h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
      />
    </label>
  );
}

function shorten(value: string, length: number) {
  return value.length > length ? `${value.slice(0, length)}…` : value;
}
