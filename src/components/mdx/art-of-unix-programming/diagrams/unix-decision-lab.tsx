"use client";

import { useState } from "react";

type Scenario = "normal" | "boundary" | "fault";
type View = "topology" | "representation" | "evidence";

type Action = {
  label: string;
  detail: string;
};

export type UnixDecisionLabProps = {
  unitId: string;
  title: string;
  view: View;
  question: string;
  nodes: readonly string[];
  concepts: readonly string[];
  actions: readonly Action[];
  boundaryNote: string;
  faultNote: string;
};

const scenarioLabels: Record<Scenario, string> = {
  normal: "正常输入",
  boundary: "恰好边界",
  fault: "单点故障",
};

const viewLabels: Record<View, string> = {
  topology: "组合拓扑",
  representation: "表示选择",
  evidence: "证据门禁",
};

function decisionState(scenario: Scenario, actionIndex: number) {
  if (scenario === "fault") {
    return {
      label: "拒绝并定位",
      tone: "rose",
      detail: "单点故障必须停在首次偏离，不能继续传播或伪造成功输出。",
    } as const;
  }
  if (actionIndex === 2) {
    return {
      label: "动作越界",
      tone: "rose",
      detail: "当前动作绕过中间责任，必须回退后选择可撤销的局部改变。",
    } as const;
  }
  if (scenario === "boundary") {
    return {
      label: "补齐边界证据",
      tone: "amber",
      detail: "恰好边界不能靠默认值通过，需要写清停止条件和恢复路径。",
    } as const;
  }
  return {
    label: "可以继续",
    tone: "emerald",
    detail: "正常路径和责任链一致，可以进入下一节点，但仍须保存可重放记录。",
  } as const;
}

function TopologyView({
  nodes,
  concepts,
  nodeIndex,
  setNodeIndex,
}: {
  nodes: readonly string[];
  concepts: readonly string[];
  nodeIndex: number;
  setNodeIndex: (index: number) => void;
}) {
  return (
    <div className="min-w-0 rounded-xl bg-slate-950 p-4 text-slate-100">
      <p className="text-xs font-semibold tracking-[0.14em] text-cyan-300 uppercase">
        职责、接口与失败传播
      </p>
      <div className="mt-4 grid min-w-0 gap-2 sm:grid-cols-5">
        {nodes.map((node, index) => (
          <button
            aria-pressed={index === nodeIndex}
            className={`min-h-24 min-w-0 rounded-lg border p-3 text-left ${
              index === nodeIndex
                ? "border-cyan-300 bg-cyan-950"
                : index < nodeIndex
                  ? "border-emerald-800 bg-emerald-950"
                  : "border-slate-700 bg-slate-900"
            }`}
            key={`${node}-${index}`}
            onClick={() => setNodeIndex(index)}
            type="button"
          >
            <span className="text-xs text-slate-400">0{index + 1}</span>
            <strong className="mt-1 block break-words text-xs leading-5">
              {node}
            </strong>
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-slate-700 p-3 text-xs">
        <strong className="text-cyan-300">当前目录坐标</strong>
        <p className="mt-1 break-words leading-5 text-slate-300">
          {concepts[nodeIndex % Math.max(1, concepts.length)]}
        </p>
      </div>
    </div>
  );
}

function RepresentationView({
  nodes,
  concepts,
  action,
  nodeIndex,
}: {
  nodes: readonly string[];
  concepts: readonly string[];
  action: Action;
  nodeIndex: number;
}) {
  const stages = [
    {
      label: "可检查输入",
      detail: concepts[nodeIndex % Math.max(1, concepts.length)],
    },
    {
      label: "窄转换",
      detail: action.detail,
    },
    {
      label: "显式输出",
      detail: `输出必须能回到“${nodes[nodeIndex]}”的责任与退出状态。`,
    },
  ];
  return (
    <div className="min-w-0 rounded-xl bg-slate-950 p-4 text-slate-100">
      <p className="text-xs font-semibold tracking-[0.14em] text-violet-300 uppercase">
        表示、转换与可检查输出
      </p>
      <div className="mt-4 grid min-w-0 gap-3 md:grid-cols-3">
        {stages.map((stage, index) => (
          <div
            className="min-h-36 min-w-0 rounded-xl border border-violet-800 bg-violet-950/50 p-4"
            key={stage.label}
          >
            <span className="text-xs text-slate-400">阶段 {index + 1}</span>
            <strong className="mt-2 block break-words text-sm text-violet-200">
              {stage.label}
            </strong>
            <p className="mt-2 break-words text-xs leading-5 text-slate-300">
              {stage.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceView({
  scenario,
  state,
  boundaryNote,
  faultNote,
  runs,
}: {
  scenario: Scenario;
  state: ReturnType<typeof decisionState>;
  boundaryNote: string;
  faultNote: string;
  runs: number;
}) {
  const rows = [
    {
      label: "输入冻结",
      detail: "版本、样本、资源预算与通过条件在运行前固定",
      pass: true,
    },
    {
      label: "单变量动作",
      detail: state.detail,
      pass: state.tone !== "rose",
    },
    {
      label: "边界检查",
      detail: scenario === "boundary" ? boundaryNote : "当前输入未触及声明边界",
      pass: scenario !== "boundary",
    },
    {
      label: "故障拒绝",
      detail: scenario === "fault" ? faultNote : "故障未注入，保留正常路径基线",
      pass: scenario !== "fault",
    },
    {
      label: "同输入重放",
      detail: runs > 0 ? `已保存 ${runs} 次可比较运行` : "尚未保存运行证据",
      pass: runs > 0,
    },
  ];
  return (
    <div className="min-w-0 rounded-xl bg-slate-950 p-4 text-slate-100">
      <p className="text-xs font-semibold tracking-[0.14em] text-emerald-300 uppercase">
        从输入到恢复的证据链
      </p>
      <div className="mt-4 space-y-2">
        {rows.map((row, index) => (
          <div
            className={`grid min-w-0 gap-2 rounded-lg border p-3 sm:grid-cols-[2.5rem_8rem_1fr] sm:items-center ${
              row.pass
                ? "border-emerald-800 bg-emerald-950/50"
                : "border-rose-700 bg-rose-950/60"
            }`}
            key={row.label}
          >
            <span className="text-xs text-slate-400">0{index + 1}</span>
            <strong className="break-words text-xs">{row.label}</strong>
            <p className="m-0 break-words text-xs leading-5 text-slate-300">
              {row.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UnixDecisionLab({
  unitId,
  title,
  view,
  question,
  nodes,
  concepts,
  actions,
  boundaryNote,
  faultNote,
}: UnixDecisionLabProps) {
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [actionIndex, setActionIndex] = useState(0);
  const [nodeIndex, setNodeIndex] = useState(0);
  const [runs, setRuns] = useState(0);
  const action = actions[actionIndex] ?? actions[0];
  const state = decisionState(scenario, actionIndex);

  const reset = () => {
    setScenario("normal");
    setActionIndex(0);
    setNodeIndex(0);
    setRuns(0);
  };

  return (
    <section
      aria-label={`${title}${viewLabels[view]}实验`}
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
      data-visual-kind={`taoup-${view}-${unitId}`}
    >
      <header className="border-b border-slate-200 px-4 py-3 dark:border-slate-800 sm:px-5">
        <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.16em] text-cyan-700 uppercase dark:text-cyan-300">
              {unitId} · {viewLabels[view]}
            </p>
            <h3 className="mt-1 break-words font-semibold">{title}</h3>
            <p className="mt-1 break-words text-sm text-slate-600 dark:text-slate-300">
              {question}
            </p>
          </div>
          <button
            aria-label="重置实验"
            className="min-h-11 min-w-11 rounded-lg border border-slate-300 px-3 text-lg dark:border-slate-700"
            onClick={reset}
            title="重置实验"
            type="button"
          >
            ↺
          </button>
        </div>
      </header>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="min-w-0 space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-500">选择验证情境</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(Object.keys(scenarioLabels) as Scenario[]).map((key) => (
                <button
                  aria-pressed={scenario === key}
                  className={`min-h-11 min-w-0 rounded-lg border px-2 py-2 text-xs ${
                    scenario === key
                      ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                      : "border-slate-300 dark:border-slate-700"
                  }`}
                  key={key}
                  onClick={() => setScenario(key)}
                  type="button"
                >
                  <span className="block break-words">
                    {scenarioLabels[key]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500">选择工程动作</p>
            <div className="mt-2 space-y-2">
              {actions.map((item, index) => (
                <button
                  aria-pressed={actionIndex === index}
                  className={`min-h-11 w-full min-w-0 rounded-lg border p-3 text-left ${
                    actionIndex === index
                      ? "border-cyan-700 bg-cyan-50 dark:bg-cyan-950"
                      : "border-slate-300 dark:border-slate-700"
                  }`}
                  key={item.label}
                  onClick={() => setActionIndex(index)}
                  type="button"
                >
                  <strong className="block break-words text-xs">
                    {item.label}
                  </strong>
                  <span className="mt-1 block break-words text-xs leading-5 text-slate-600 dark:text-slate-300">
                    {item.detail}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div
            className={`rounded-lg border p-3 text-xs ${
              state.tone === "rose"
                ? "border-rose-500 bg-rose-50 dark:bg-rose-950"
                : state.tone === "amber"
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-950"
                  : "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
            }`}
          >
            <strong>{state.label}</strong>
            <p className="mt-1 break-words leading-5">{state.detail}</p>
          </div>

          <button
            className="min-h-11 w-full rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white"
            onClick={() => setRuns((value) => value + 1)}
            type="button"
          >
            运行并保存本次证据
          </button>
        </div>

        <div className="min-w-0">
          {view === "topology" ? (
            <TopologyView
              concepts={concepts}
              nodeIndex={nodeIndex}
              nodes={nodes}
              setNodeIndex={setNodeIndex}
            />
          ) : view === "representation" ? (
            <RepresentationView
              action={action}
              concepts={concepts}
              nodeIndex={nodeIndex}
              nodes={nodes}
            />
          ) : (
            <EvidenceView
              boundaryNote={boundaryNote}
              faultNote={faultNote}
              runs={runs}
              scenario={scenario}
              state={state}
            />
          )}
        </div>
      </div>
    </section>
  );
}
