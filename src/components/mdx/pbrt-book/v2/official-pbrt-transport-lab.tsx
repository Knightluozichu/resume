"use client";

import { useId, useMemo, useState } from "react";

export type PbrtExperimentModel = {
  title: string;
  unitTitle: string;
  focus: string;
  concepts: string[];
  fault: string;
  evidence: string;
  formula: string;
};

type LabMode = "path" | "estimator" | "evidence";

type Props = {
  model: PbrtExperimentModel;
  mode: LabMode;
};

const SAMPLE_COUNTS = [1, 4, 16, 64] as const;
const STRATEGIES = {
  uniform: { label: "均匀采样", variance: 1, pdf: 0.25 },
  importance: { label: "重要性采样", variance: 0.42, pdf: 0.58 },
  mis: { label: "MIS", variance: 0.24, pdf: 0.46 },
} as const;

type Strategy = keyof typeof STRATEGIES;

function PathLab({ model }: { model: PbrtExperimentModel }) {
  const markerId = useId().replaceAll(":", "");
  const [bounces, setBounces] = useState(3);
  const [directLighting, setDirectLighting] = useState(true);
  const nodes = [
    { x: 64, y: 116, label: "Film", role: "传感器" },
    { x: 210, y: 72, label: "x₁", role: "首个交点" },
    { x: 370, y: 142, label: "x₂", role: "散射事件" },
    { x: 540, y: 62, label: "Light", role: "发光端" },
  ].slice(0, Math.min(4, bounces + 1));
  const throughput = Math.pow(0.68, Math.max(0, nodes.length - 2));
  const estimate = directLighting ? throughput * 1.34 : throughput * 0.91;

  return (
    <div
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-slate-100 shadow-sm dark:border-slate-700"
      data-visual-kind={`pbrt-path-${model.unitTitle}`}
    >
      <div className="border-b border-slate-800 px-4 py-3 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.2em] text-amber-300 uppercase">
          Path-space inspection
        </p>
        <h3 className="mt-1 text-base font-semibold">{model.title}</h3>
        <p className="mt-1 break-words text-sm text-slate-300">{model.focus}</p>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-900/70 p-3">
          <svg
            aria-label={`${model.title} 的路径空间因果图`}
            className="h-auto w-full"
            viewBox="0 0 610 220"
          >
            <defs>
              <marker
                id={markerId}
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
              >
                <path d="M0,0 L8,4 L0,8 z" fill="#fbbf24" />
              </marker>
            </defs>
            <rect
              fill="#0f172a"
              height="196"
              rx="16"
              stroke="#334155"
              width="586"
              x="12"
              y="12"
            />
            {nodes.slice(0, -1).map((node, index) => {
              const next = nodes[index + 1];
              return (
                <line
                  key={`${node.label}-${next.label}`}
                  markerEnd={`url(#${markerId})`}
                  stroke={index === 0 ? "#38bdf8" : "#fbbf24"}
                  strokeDasharray={index === 0 ? undefined : "7 5"}
                  strokeWidth="4"
                  x1={node.x + 22}
                  x2={next.x - 24}
                  y1={node.y}
                  y2={next.y}
                />
              );
            })}
            {nodes.map((node, index) => (
              <g key={node.label}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  fill={index === 0 ? "#0369a1" : "#92400e"}
                  r="25"
                  stroke={index === 0 ? "#7dd3fc" : "#fcd34d"}
                  strokeWidth="3"
                />
                <text
                  fill="#f8fafc"
                  fontSize="13"
                  fontWeight="700"
                  textAnchor="middle"
                  x={node.x}
                  y={node.y + 4}
                >
                  {node.label}
                </text>
                <text
                  fill="#cbd5e1"
                  fontSize="11"
                  textAnchor="middle"
                  x={node.x}
                  y={node.y + 45}
                >
                  {node.role}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="min-w-0 space-y-3">
          <label className="block text-sm font-medium">
            路径顶点：{bounces}
            <input
              aria-label="路径顶点数"
              className="mt-2 w-full accent-amber-400"
              max="3"
              min="1"
              onChange={(event) => setBounces(Number(event.target.value))}
              type="range"
              value={bounces}
            />
          </label>
          <button
            className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${
              directLighting
                ? "border-emerald-400 bg-emerald-950 text-emerald-100"
                : "border-rose-400 bg-rose-950 text-rose-100"
            }`}
            onClick={() => setDirectLighting((value) => !value)}
            type="button"
          >
            下一事件估计：{directLighting ? "开启" : "关闭"}
          </button>
          <div className="rounded-lg bg-slate-900 p-3 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-slate-400">throughput</span>
              <code>{throughput.toFixed(3)}</code>
            </div>
            <div className="mt-2 flex justify-between gap-3">
              <span className="text-slate-400">估计贡献</span>
              <code>{estimate.toFixed(3)}</code>
            </div>
          </div>
          <p className="break-words text-xs text-slate-400">
            观察对象：{model.concepts.slice(0, 5).join("、")}
          </p>
        </div>
      </div>
    </div>
  );
}

function EstimatorLab({ model }: { model: PbrtExperimentModel }) {
  const [sampleIndex, setSampleIndex] = useState(2);
  const [strategy, setStrategy] = useState<Strategy>("mis");
  const sampleCount = SAMPLE_COUNTS[sampleIndex];
  const selected = STRATEGIES[strategy];
  const standardError = selected.variance / Math.sqrt(sampleCount);
  const samples = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => {
        const wave = Math.sin(
          (index + 1) * (strategy === "uniform" ? 1.7 : 1.1),
        );
        return Math.max(8, Math.min(92, 54 + wave * standardError * 125));
      }),
    [standardError, strategy],
  );

  return (
    <div
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-indigo-200 bg-indigo-50 shadow-sm dark:border-indigo-900 dark:bg-indigo-950/40"
      data-visual-kind={`pbrt-estimator-${model.unitTitle}`}
    >
      <div className="border-b border-indigo-200 px-4 py-3 dark:border-indigo-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.18em] text-indigo-700 uppercase dark:text-indigo-300">
          Estimator laboratory
        </p>
        <h3 className="mt-1 font-semibold text-slate-950 dark:text-slate-100">
          固定被积函数，比较估计量
        </h3>
      </div>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-2">
        <div className="min-w-0 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(STRATEGIES) as Strategy[]).map((key) => (
              <button
                className={`min-w-0 rounded-lg border px-2 py-2 text-xs font-medium ${
                  strategy === key
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-indigo-200 bg-white text-slate-700 dark:border-indigo-800 dark:bg-slate-950 dark:text-slate-200"
                }`}
                key={key}
                onClick={() => setStrategy(key)}
                type="button"
              >
                {STRATEGIES[key].label}
              </button>
            ))}
          </div>
          <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">
            样本数 N = {sampleCount}
            <input
              aria-label="蒙特卡洛样本数"
              className="mt-2 w-full accent-indigo-600"
              max={SAMPLE_COUNTS.length - 1}
              min="0"
              onChange={(event) => setSampleIndex(Number(event.target.value))}
              step="1"
              type="range"
              value={sampleIndex}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white p-3 dark:bg-slate-950">
              <p className="text-xs text-slate-500">PDF</p>
              <code className="text-lg">{selected.pdf.toFixed(2)}</code>
            </div>
            <div className="rounded-lg bg-white p-3 dark:bg-slate-950">
              <p className="text-xs text-slate-500">标准误差</p>
              <code className="text-lg">{standardError.toFixed(3)}</code>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-xl bg-white p-4 dark:bg-slate-950">
          <p className="text-xs text-slate-500">同一固定种子的贡献样本</p>
          <div
            className="mt-4 flex h-36 items-end gap-1.5"
            aria-label="样本贡献柱状图"
          >
            {samples.map((height, index) => (
              <div
                className="min-w-0 flex-1 rounded-t bg-indigo-500"
                key={`${strategy}-${index}`}
                style={{ height: `${height}%` }}
                title={`样本 ${index + 1}: ${height.toFixed(1)}`}
              />
            ))}
          </div>
          <p className="mt-3 break-words font-mono text-xs text-slate-600 dark:text-slate-300">
            {model.formula}
          </p>
        </div>
      </div>
    </div>
  );
}

function EvidenceLab({ model }: { model: PbrtExperimentModel }) {
  const [seed, setSeed] = useState(19);
  const [faultInjected, setFaultInjected] = useState(false);
  const checkpoints = [
    {
      name: "输入",
      value: `seed=${seed} · ${model.concepts.slice(0, 2).join("/")}`,
      pass: true,
    },
    {
      name: "机制",
      value: faultInjected ? model.fault : model.focus,
      pass: !faultInjected,
    },
    {
      name: "输出",
      value: faultInjected ? "参考差异扩大" : "固定输入可重放",
      pass: !faultInjected,
    },
  ];

  return (
    <div
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30"
      data-visual-kind={`pbrt-evidence-${model.unitTitle}`}
    >
      <div className="border-b border-emerald-200 px-4 py-3 dark:border-emerald-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase dark:text-emerald-300">
          Reproducible evidence
        </p>
        <h3 className="mt-1 font-semibold">正常、故障、恢复三次重放</h3>
      </div>
      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.65fr_1.35fr]">
        <div className="min-w-0 space-y-3">
          <label className="block text-sm font-medium">
            固定随机种子
            <select
              className="mt-2 w-full rounded-lg border border-emerald-300 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-slate-950"
              onChange={(event) => setSeed(Number(event.target.value))}
              value={seed}
            >
              {[7, 19, 43].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <button
            className={`w-full rounded-lg px-3 py-2 text-sm font-semibold ${
              faultInjected
                ? "bg-rose-600 text-white"
                : "bg-emerald-700 text-white"
            }`}
            onClick={() => setFaultInjected((value) => !value)}
            type="button"
          >
            {faultInjected ? "撤销单变量故障" : "注入单变量故障"}
          </button>
        </div>

        <div className="min-w-0 space-y-2">
          {checkpoints.map((checkpoint) => (
            <div
              className={`min-w-0 rounded-lg border p-3 ${
                checkpoint.pass
                  ? "border-emerald-300 bg-white dark:border-emerald-800 dark:bg-slate-950"
                  : "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/40"
              }`}
              key={checkpoint.name}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm">{checkpoint.name}</strong>
                <span className="text-xs">
                  {checkpoint.pass ? "一致" : "分叉"}
                </span>
              </div>
              <p className="mt-1 break-words text-xs text-slate-600 dark:text-slate-300">
                {checkpoint.value}
              </p>
            </div>
          ))}
          <p className="break-words pt-1 text-xs text-slate-500">
            必存证据：{model.evidence}
          </p>
        </div>
      </div>
    </div>
  );
}

export function OfficialPbrtTransportLab({ model, mode }: Props) {
  if (mode === "path") return <PathLab model={model} />;
  if (mode === "estimator") return <EstimatorLab model={model} />;
  return <EvidenceLab model={model} />;
}
