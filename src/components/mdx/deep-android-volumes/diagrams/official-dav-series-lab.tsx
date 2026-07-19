"use client";

import { useMemo, useState, type ReactNode } from "react";

export type DavCoverageNode = {
  label: string;
  stage: string;
  mechanism: string;
  probe: string;
};

export type DavCausalModel = {
  sourceTag: string;
  sourcePath: string;
  invariant: string;
  fault: string;
  evidence: string;
  boundary: string;
};

type Mode = "pipeline" | "experiment" | "evidence";
type Scenario = "normal" | "mismatch" | "dead-owner" | "stall";
type RecoveryPhase = "baseline" | "fault" | "recovery";

type Props = {
  mode: Mode;
  unitTitle: string;
  focus: string;
  nodes: DavCoverageNode[];
  versions: string[];
  stages: string[];
  model: DavCausalModel;
};

const scenarioLabels: Record<Scenario, string> = {
  normal: "同标签正常路径",
  mismatch: "跨版本错配",
  "dead-owner": "所有者死亡",
  stall: "队列或线程停滞",
};

const recoveryLabels: Record<RecoveryPhase, string> = {
  baseline: "正常基线",
  fault: "首个故障",
  recovery: "恢复重放",
};

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="min-h-11 rounded border border-zinc-400 bg-white px-4 text-sm font-semibold text-zinc-900 hover:border-emerald-700 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
    >
      重置实验
    </button>
  );
}

function LabShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b border-zinc-200 bg-emerald-50 px-4 py-3 dark:border-zinc-800 dark:bg-emerald-950/40">
        <p className="m-0 text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
          {eyebrow}
        </p>
        <h3 className="m-0 mt-1 text-base font-bold">{title}</h3>
      </header>
      {children}
    </section>
  );
}

export function OfficialDavSeriesLab({
  mode,
  unitTitle,
  focus,
  nodes,
  versions,
  stages,
  model,
}: Props) {
  const [selectedNode, setSelectedNode] = useState(0);
  const [selectedStage, setSelectedStage] = useState(0);
  const [version, setVersion] = useState(0);
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [phase, setPhase] = useState<RecoveryPhase>("baseline");

  const node = nodes[selectedNode] ?? nodes[0];
  const selectedVersion = versions[version] ?? versions[0] ?? model.sourceTag;
  const result = useMemo(() => {
    if (scenario === "normal")
      return {
        status: "可复现",
        detail: `在 ${selectedVersion} 上沿 ${model.sourcePath} 保存同一对象与结果，${model.invariant}。`,
      };
    if (scenario === "mismatch")
      return {
        status: "拒绝拼接",
        detail: `输入未变但源码标签或接口身份改变；在进入 ${model.boundary} 前停止，不把当前实现倒填成历史结论。`,
      };
    if (scenario === "dead-owner")
      return {
        status: "检查回收",
        detail: `终止状态所有者，观察死亡通知、引用或资源释放；由 ${model.evidence} 判断陈旧状态是否仍影响请求。`,
      };
    return {
      status: "定位停滞",
      detail: `延迟消费线程或队列，只改变时序；比较入口时间、阻塞点、超时与恢复后结果，验证 ${model.fault}。`,
    };
  }, [model, scenario, selectedVersion]);

  if (mode === "pipeline") {
    return (
      <LabShell
        title={`${unitTitle} · 全节点机制图`}
        eyebrow="Source → owner → state → observation"
      >
        <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="max-h-[620px] overflow-y-auto border-b border-zinc-200 p-4 md:border-b-0 md:border-r dark:border-zinc-800">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {nodes.map((item, index) => (
                <button
                  key={`${index}-${item.label}`}
                  type="button"
                  onClick={() => {
                    setSelectedNode(index);
                    setSelectedStage(stages.indexOf(item.stage));
                  }}
                  aria-pressed={selectedNode === index}
                  className={`${
                    selectedNode === index
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
                  } min-h-12 min-w-0 break-words rounded border px-3 py-2 text-left text-xs font-medium [overflow-wrap:anywhere]`}
                >
                  {String(index + 1).padStart(2, "0")} {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="min-w-0 p-4">
            <p className="m-0 text-xs font-semibold text-rose-700 dark:text-rose-300">
              当前目录坐标
            </p>
            <p className="mt-2 break-words text-sm font-bold">{node?.label}</p>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              {stages.map((stage, index) => (
                <button
                  key={stage}
                  type="button"
                  onClick={() => setSelectedStage(index)}
                  aria-pressed={selectedStage === index}
                  className={`${
                    selectedStage === index
                      ? "border-cyan-700 bg-cyan-700 text-white"
                      : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950"
                  } min-h-11 rounded border px-2 text-xs font-semibold`}
                >
                  {stage}
                </button>
              ))}
            </div>
            <dl className="mt-4 space-y-3 text-sm leading-6">
              <div>
                <dt className="font-semibold">机制反馈</dt>
                <dd className="m-0 break-words [overflow-wrap:anywhere]">
                  {node?.mechanism}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">可执行探针</dt>
                <dd className="m-0 break-words [overflow-wrap:anywhere]">
                  {node?.probe}
                </dd>
              </div>
            </dl>
            <div className="mt-4">
              <ResetButton
                onReset={() => {
                  setSelectedNode(0);
                  setSelectedStage(0);
                }}
              />
            </div>
          </div>
        </div>
      </LabShell>
    );
  }

  if (mode === "experiment") {
    return (
      <LabShell
        title={`${unitTitle} · 版本与因果实验`}
        eyebrow="Same input, one changed condition"
      >
        <div className="p-4">
          <p className="text-sm leading-6">{focus}</p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {versions.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setVersion(index)}
                aria-pressed={version === index}
                className={`${
                  version === index
                    ? "border-cyan-700 bg-cyan-700 text-white"
                    : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
                } min-h-11 rounded border px-2 text-xs font-semibold`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(scenarioLabels) as Scenario[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setScenario(item)}
                aria-pressed={scenario === item}
                className={`${
                  scenario === item
                    ? "border-rose-700 bg-rose-700 text-white"
                    : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
                } min-h-11 rounded border px-2 text-xs font-semibold`}
              >
                {scenarioLabels[item]}
              </button>
            ))}
          </div>
          <output className="mt-4 block rounded border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <strong className="text-lg text-rose-700 dark:text-rose-300">
              {result.status}
            </strong>
            <span className="mt-2 block text-sm leading-6">
              {result.detail}
            </span>
          </output>
          <div className="mt-4">
            <ResetButton
              onReset={() => {
                setVersion(0);
                setScenario("normal");
              }}
            />
          </div>
        </div>
      </LabShell>
    );
  }

  const recoveryCopy: Record<RecoveryPhase, string> = {
    baseline: `使用 ${model.sourceTag} 与固定输入保存 ${model.evidence}；先确认 ${model.invariant}。`,
    fault: `主动制造“${model.fault}”，保存首个分叉、错误返回和未释放状态，不先改代码。`,
    recovery: `恢复正确标签和状态所有者，以完全相同输入重放；只有 ${model.evidence} 回到基线才算恢复。`,
  };

  return (
    <LabShell
      title={`${unitTitle} · 故障恢复证据链`}
      eyebrow="Baseline → fault → recovery → reset"
    >
      <div className="p-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(Object.keys(recoveryLabels) as RecoveryPhase[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPhase(item)}
              aria-pressed={phase === item}
              className={`${
                phase === item
                  ? "border-emerald-700 bg-emerald-700 text-white"
                  : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
              } min-h-11 rounded border px-3 text-sm font-semibold`}
            >
              {recoveryLabels[item]}
            </button>
          ))}
        </div>
        <output className="mt-4 block min-h-28 rounded border border-zinc-300 bg-zinc-50 p-4 text-sm leading-6 dark:border-zinc-700 dark:bg-zinc-900">
          <strong className="block text-emerald-800 dark:text-emerald-300">
            {recoveryLabels[phase]}
          </strong>
          {recoveryCopy[phase]}
        </output>
        <p className="mt-4 break-all text-xs leading-5 text-zinc-600 dark:text-zinc-400">
          源码坐标：{model.sourcePath}
        </p>
        <ResetButton onReset={() => setPhase("baseline")} />
      </div>
    </LabShell>
  );
}
