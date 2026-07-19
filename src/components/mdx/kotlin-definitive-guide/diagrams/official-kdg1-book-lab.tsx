"use client";

import { useState } from "react";

export type KdgCoverageNode = {
  label: string;
  stage: string;
  mechanism: string;
  probe: string;
};

export type KdgCausalModel = {
  historicalLabel: string;
  currentLabel: string;
  invariant: string;
  fault: string;
  evidence: string;
  boundary: string;
};

type LabProps = {
  title: string;
  focus: string;
  stages: string[];
  nodes: KdgCoverageNode[];
  model: KdgCausalModel;
};

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="min-h-11 rounded-control border border-border bg-canvas px-3 text-sm font-semibold text-primary"
    >
      重置实验
    </button>
  );
}

export function KdgCoverageLab({
  title,
  focus,
  stages,
  nodes,
  model,
}: LabProps) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const node = nodes[Math.min(nodeIndex, nodes.length - 1)];

  const reset = () => {
    setNodeIndex(0);
    setStageIndex(0);
  };

  return (
    <section
      aria-label={`${title} 全节点覆盖实验`}
      className="not-prose my-6 overflow-hidden rounded-card border border-emerald-300 bg-canvas shadow-sm dark:border-emerald-800"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-emerald-950 dark:text-emerald-100">
            {title} · 全节点因果地图
          </p>
          <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-300">
            {focus}
          </p>
        </div>
        <ResetButton onReset={reset} />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <label className="text-sm font-medium text-primary">
          正式目录节点（共 {nodes.length} 项）
          <select
            value={nodeIndex}
            onChange={(event) => setNodeIndex(Number(event.target.value))}
            className="mt-2 min-h-11 w-full rounded-control border border-border bg-canvas px-3 text-primary"
          >
            {nodes.map((item, index) => (
              <option key={`${item.label}-${index}`} value={index}>
                {String(index + 1).padStart(2, "0")} · {item.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {stages.map((stage, index) => (
            <button
              key={`${stage}-${index}`}
              type="button"
              aria-pressed={stageIndex === index}
              onClick={() => setStageIndex(index)}
              className={
                "min-h-11 rounded-control border px-2 text-xs font-semibold " +
                (stageIndex === index
                  ? "border-emerald-600 bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-100"
                  : "border-border bg-canvas text-secondary")
              }
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 border-t border-border p-4 md:grid-cols-3">
        <div className="rounded-card border border-border bg-elevated p-3">
          <p className="text-xs font-semibold text-secondary">当前节点</p>
          <p className="mt-2 text-sm font-semibold text-primary">
            {node.label}
          </p>
        </div>
        <div className="rounded-card border border-border bg-elevated p-3">
          <p className="text-xs font-semibold text-secondary">机制阶段</p>
          <p className="mt-2 text-sm text-primary">
            {stages[stageIndex]}：{node.mechanism}
          </p>
        </div>
        <div className="rounded-card border border-border bg-elevated p-3">
          <p className="text-xs font-semibold text-secondary">四级证据</p>
          <p className="mt-2 text-sm text-primary">{node.probe}</p>
        </div>
      </div>

      <p className="border-t border-border px-4 py-3 text-xs text-secondary">
        当前节点原始阶段：{node.stage}；不变量：{model.invariant}
      </p>
    </section>
  );
}

export function KdgContractLab({
  title,
  focus,
  stages,
  nodes,
  model,
}: LabProps) {
  const [current, setCurrent] = useState(false);
  const [scenario, setScenario] = useState<"normal" | "boundary" | "fault">(
    "normal",
  );
  const [guarded, setGuarded] = useState(true);

  const reset = () => {
    setCurrent(false);
    setScenario("normal");
    setGuarded(true);
  };

  const outcome =
    scenario === "normal"
      ? `合同成立：${model.invariant}`
      : scenario === "boundary"
        ? `边界可见：${model.boundary}`
        : guarded
          ? `合同拒绝故障：${model.fault}`
          : `故障进入运行时：${model.fault}`;

  return (
    <section
      aria-label={`${title} 历史合同迁移实验`}
      className="not-prose my-6 overflow-hidden rounded-card border border-cyan-300 bg-canvas shadow-sm dark:border-cyan-800"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900 dark:bg-cyan-950/30">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-cyan-950 dark:text-cyan-100">
            {title} · 历史合同与当前迁移
          </p>
          <p className="mt-1 text-sm text-cyan-800 dark:text-cyan-300">
            每次只改变技术坐标、输入场景或保护合同之一。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </header>

      <div className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-2">
          {[
            [false, model.historicalLabel],
            [true, model.currentLabel],
          ].map(([value, label]) => (
            <button
              key={String(label)}
              type="button"
              aria-pressed={current === value}
              onClick={() => setCurrent(Boolean(value))}
              className={
                "min-h-11 rounded-control border px-3 text-sm font-semibold " +
                (current === value
                  ? "border-cyan-600 bg-cyan-100 text-cyan-950 dark:bg-cyan-950 dark:text-cyan-100"
                  : "border-border bg-canvas text-secondary")
              }
            >
              {String(label)}
            </button>
          ))}
        </div>

        <div
          className="grid grid-cols-3 gap-2"
          role="group"
          aria-label="输入场景"
        >
          {(
            [
              ["normal", "正常输入"],
              ["boundary", "边界输入"],
              ["fault", "故障输入"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={scenario === value}
              onClick={() => setScenario(value)}
              className={
                "min-h-11 rounded-control border px-2 text-xs font-semibold sm:text-sm " +
                (scenario === value
                  ? "border-violet-600 bg-violet-100 text-violet-950 dark:bg-violet-950 dark:text-violet-100"
                  : "border-border bg-canvas text-secondary")
              }
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-pressed={guarded}
          onClick={() => setGuarded((value) => !value)}
          className={
            "min-h-11 w-full rounded-control border px-3 text-sm font-semibold " +
            (guarded
              ? "border-amber-600 bg-amber-100 text-amber-950 dark:bg-amber-950 dark:text-amber-100"
              : "border-rose-600 bg-rose-100 text-rose-950 dark:bg-rose-950 dark:text-rose-100")
          }
        >
          {guarded ? "显式类型与先决条件：开启" : "显式保护：关闭"}
        </button>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-card border border-border bg-elevated p-3">
            <p className="text-xs text-secondary">技术坐标</p>
            <p className="mt-2 text-sm font-semibold text-primary">
              {current ? model.currentLabel : model.historicalLabel}
            </p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-3 sm:col-span-2">
            <p className="text-xs text-secondary">可观察判定</p>
            <p
              className="mt-2 text-sm font-semibold text-primary"
              role="status"
            >
              {outcome}
            </p>
          </div>
        </div>
      </div>

      <p className="border-t border-border px-4 py-3 text-xs text-secondary">
        {focus}；证据口径：{model.evidence}；正式节点 {nodes.length}{" "}
        项；状态链：
        {stages.join(" → ")}。
      </p>
    </section>
  );
}

export function KdgRecoveryLab({
  title,
  focus,
  stages,
  nodes,
  model,
}: LabProps) {
  const [trace, setTrace] = useState<"normal" | "fault" | "recovery">("normal");
  const [nodeIndex, setNodeIndex] = useState(0);
  const node = nodes[Math.min(nodeIndex, nodes.length - 1)];
  const traces = {
    normal: {
      label: "正常轨迹",
      trigger: `${stages[0]}后沿${stages.slice(1).join("、")}完成`,
      result: `保持${model.invariant}`,
    },
    fault: {
      label: "首错轨迹",
      trigger: model.fault,
      result: `停在${node.stage}并保存${model.evidence}，不伪装成功`,
    },
    recovery: {
      label: "恢复重放",
      trigger: `恢复显式合同后以相同输入重跑${node.label}`,
      result: `正常、边界、失败三条记录重新支持${model.invariant}`,
    },
  } as const;
  const selected = traces[trace];

  const reset = () => {
    setTrace("normal");
    setNodeIndex(0);
  };

  return (
    <section
      aria-label={`${title} 故障恢复重放实验`}
      className="not-prose my-6 overflow-hidden rounded-card border border-violet-300 bg-canvas shadow-sm dark:border-violet-800"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-violet-200 bg-violet-50 p-4 dark:border-violet-900 dark:bg-violet-950/30">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-violet-950 dark:text-violet-100">
            {title} · 故障—恢复—同输入重放
          </p>
          <p className="mt-1 text-sm text-violet-800 dark:text-violet-300">
            {focus}
          </p>
        </div>
        <ResetButton onReset={reset} />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.3fr)]">
        <div className="space-y-3">
          <label className="text-sm font-medium text-primary">
            重放节点
            <select
              value={nodeIndex}
              onChange={(event) => setNodeIndex(Number(event.target.value))}
              className="mt-2 min-h-11 w-full rounded-control border border-border bg-canvas px-3 text-primary"
            >
              {nodes.map((item, index) => (
                <option key={`${item.label}-${index}`} value={index}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <div className="grid gap-2" role="group" aria-label="重放轨迹">
            {(Object.keys(traces) as Array<keyof typeof traces>).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={trace === key}
                onClick={() => setTrace(key)}
                className={
                  "min-h-11 rounded-control border px-3 text-left text-sm font-semibold " +
                  (trace === key
                    ? "border-violet-600 bg-violet-100 text-violet-950 dark:bg-violet-950 dark:text-violet-100"
                    : "border-border bg-canvas text-secondary")
                }
              >
                {traces[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-secondary">触发与首错</p>
            <p className="mt-2 text-sm text-primary">{selected.trigger}</p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-secondary">通过条件</p>
            <p className="mt-2 text-sm text-primary" role="status">
              {selected.result}
            </p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-4 sm:col-span-2">
            <p className="text-xs font-semibold text-secondary">当前节点证据</p>
            <p className="mt-2 text-sm text-primary">{node.probe}</p>
          </div>
        </div>
      </div>

      <p className="border-t border-border px-4 py-3 text-xs text-secondary">
        历史实现与当前迁移可以使用不同API，但必须消费相同输入、暴露相同失败边界，并凭相同证据判断不变量。
      </p>
    </section>
  );
}
