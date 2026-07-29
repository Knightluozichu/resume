"use client";

import { useState } from "react";

export interface DavCoverageNode {
  label: string;
  stage: string;
  mechanism: string;
  probe: string;
}

export interface DavCausalModel {
  sourceTag: string;
  sourcePath: string;
  invariant: string;
  fault: string;
  evidence: string;
  boundary: string;
}

interface OfficialDavSeriesLabProps {
  mode: "pipeline" | "experiment" | "evidence";
  unitTitle: string;
  focus: string;
  nodes: readonly DavCoverageNode[];
  versions: readonly string[];
  stages: readonly string[];
  model: DavCausalModel;
}

const SCENARIOS = [
  {
    id: "baseline",
    label: "同标签基线",
    summary: "入口、状态拥有者、结果与释放路径都按历史合同推进。",
  },
  {
    id: "tag-mismatch",
    label: "标签错配",
    summary: "文件名相似，但对象身份或返回语义在进入实验前就不再可信。",
  },
  {
    id: "owner-death",
    label: "所有者死亡",
    summary: "请求已经进入边界，状态拥有者却在完成或释放前退出。",
  },
  {
    id: "thread-stall",
    label: "消费线程停滞",
    summary: "输入仍可到达，但队列推进、回调或完成反馈不再发生。",
  },
] as const;

const EVIDENCE_CHECKS = [
  {
    label: "版本与输入基线",
    detail: "记录源码标签、构建目标、输入样本与开始时刻。",
  },
  {
    label: "首个状态分叉",
    detail: "保存PID/TID、对象身份、队列或事务的第一个异常变化。",
  },
  {
    label: "恢复后同输入重放",
    detail: "撤销单一故障，以完全相同输入重放正常轨迹。",
  },
  {
    label: "释放与复位",
    detail: "确认远端引用、线程、缓冲区或持久状态回到可再运行状态。",
  },
] as const;

function LabHeader({
  eyebrow,
  title,
  description,
  onReset,
}: {
  eyebrow: string;
  title: string;
  description: string;
  onReset: () => void;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-wide text-accent">
          {eyebrow}
        </p>
        <h3 className="mt-1 text-base font-semibold text-primary">{title}</h3>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
          {description}
        </p>
      </div>
      <button
        type="button"
        className="rounded-control border border-border bg-surface px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        onClick={onReset}
      >
        重置实验
      </button>
    </header>
  );
}

function PipelinePanel({
  unitTitle,
  focus,
  nodes,
  stages,
  model,
}: Omit<OfficialDavSeriesLabProps, "mode" | "versions">) {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeNode = nodes[activeNodeIndex] ?? nodes[0];

  const reset = () => {
    setActiveNodeIndex(0);
    setActiveStageIndex(0);
  };

  return (
    <>
      <LabHeader
        eyebrow="正式节点 → 运行机制 → 可执行探针"
        title={unitTitle}
        description={`选择目录节点和处理阶段，检查它怎样进入“${focus}”的真实因果链。`}
        onReset={reset}
      />
      <div className="grid min-w-0 gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)]">
        <section className="min-w-0 border-b border-border p-4 lg:border-r lg:border-b-0">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold text-primary">正式目录坐标</p>
            <p className="text-xs text-secondary">{nodes.length} 个节点</p>
          </div>
          <div
            className="max-h-80 space-y-2 overflow-y-auto pr-1"
            aria-label="正式目录节点"
          >
            {nodes.map((node, index) => {
              const selected = index === activeNodeIndex;
              return (
                <button
                  key={`${node.label}-${index}`}
                  type="button"
                  aria-pressed={selected}
                  className={`w-full rounded-control border px-3 py-2 text-left text-sm leading-5 transition-colors ${
                    selected
                      ? "border-accent bg-accent/10 text-primary"
                      : "border-border bg-surface text-secondary hover:text-primary"
                  }`}
                  onClick={() => {
                    setActiveNodeIndex(index);
                    const stageIndex = stages.indexOf(node.stage);
                    setActiveStageIndex(stageIndex >= 0 ? stageIndex : 0);
                  }}
                >
                  <span className="mr-2 font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {node.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="min-w-0 p-5" aria-live="polite">
          <div className="flex flex-wrap gap-2" aria-label="处理阶段">
            {stages.map((stage, index) => (
              <button
                key={`${stage}-${index}`}
                type="button"
                aria-pressed={index === activeStageIndex}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  index === activeStageIndex
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border bg-surface text-secondary hover:text-primary"
                }`}
                onClick={() => setActiveStageIndex(index)}
              >
                {index + 1}. {stage}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-card border border-border bg-surface p-4">
            <p className="text-xs font-semibold text-accent">
              {activeNode?.label ?? "暂无节点"}
            </p>
            <p className="mt-2 text-sm leading-6 text-primary">
              {activeNode?.mechanism ?? "未配置机制说明。"}
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-control border border-border bg-elevated p-3">
              <p className="text-xs font-semibold text-success">当前动作</p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {stages[activeStageIndex] ?? "锁定历史基线"}
              </p>
              <p className="mt-1 text-xs leading-5 text-secondary">
                {activeNode?.probe}
              </p>
            </div>
            <div className="rounded-control border border-border bg-elevated p-3">
              <p className="text-xs font-semibold text-warning">历史坐标</p>
              <p className="mt-2 break-words font-mono text-xs text-primary">
                {model.sourceTag}
              </p>
              <p className="mt-1 break-words font-mono text-xs leading-5 text-secondary">
                {model.sourcePath}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function ExperimentPanel({
  unitTitle,
  focus,
  versions,
  model,
}: Pick<
  OfficialDavSeriesLabProps,
  "unitTitle" | "focus" | "versions" | "model"
>) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [versionIndex, setVersionIndex] = useState(0);
  const scenario = SCENARIOS[scenarioIndex];
  const selectedVersion = versions[versionIndex] ?? model.sourceTag;
  const isBaseline = scenario.id === "baseline";

  const reset = () => {
    setScenarioIndex(0);
    setVersionIndex(0);
  };

  const causalCards = [
    {
      label: "输入合同",
      value: `${selectedVersion} · ${focus}`,
      tone: "text-accent",
    },
    {
      label: "首个边界",
      value: model.boundary,
      tone: "text-primary",
    },
    {
      label: "状态变化",
      value: isBaseline
        ? "真实所有者接收并推进状态"
        : `${scenario.label}使正常状态链在首个边界分叉`,
      tone: isBaseline ? "text-success" : "text-warning",
    },
    {
      label: "可见结果",
      value: isBaseline
        ? `不变量成立：${model.invariant}`
        : `拒绝强结论：${scenario.summary}`,
      tone: isBaseline ? "text-success" : "text-warning",
    },
  ];

  return (
    <>
      <LabHeader
        eyebrow="同输入反事实实验"
        title={unitTitle}
        description="固定章节输入，只切换历史坐标或一个故障条件，观察因果链在哪一步首次偏离。"
        onReset={reset}
      />
      <div className="space-y-5 p-5">
        <section>
          <p className="mb-2 text-xs font-semibold text-primary">历史版本</p>
          <div className="flex flex-wrap gap-2">
            {versions.map((version, index) => (
              <button
                key={`${version}-${index}`}
                type="button"
                aria-pressed={versionIndex === index}
                className={`rounded-control border px-3 py-2 text-xs transition-colors ${
                  versionIndex === index
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border bg-surface text-secondary hover:text-primary"
                }`}
                onClick={() => setVersionIndex(index)}
              >
                {version}
              </button>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-2 text-xs font-semibold text-primary">
            单一场景变量
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {SCENARIOS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={scenarioIndex === index}
                className={`rounded-control border p-3 text-left transition-colors ${
                  scenarioIndex === index
                    ? "border-accent bg-accent/10"
                    : "border-border bg-surface hover:border-accent"
                }`}
                onClick={() => setScenarioIndex(index)}
              >
                <span className="block text-xs font-semibold text-primary">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs leading-5 text-secondary">
                  {item.summary}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section
          className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
          aria-live="polite"
        >
          {causalCards.map((card, index) => (
            <div
              key={card.label}
              className="relative min-w-0 rounded-card border border-border bg-elevated p-4"
            >
              <p className="font-mono text-xs text-secondary">
                {String(index + 1).padStart(2, "0")} / {card.label}
              </p>
              <p className={`mt-2 break-words text-sm leading-6 ${card.tone}`}>
                {card.value}
              </p>
            </div>
          ))}
        </section>

        {!isBaseline ? (
          <div className="rounded-control border border-warning/40 bg-warning/10 p-4">
            <p className="text-xs font-semibold text-warning">本次反例</p>
            <p className="mt-2 text-sm leading-6 text-primary">{model.fault}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}

function EvidencePanel({
  unitTitle,
  model,
}: Pick<OfficialDavSeriesLabProps, "unitTitle" | "model">) {
  const [phase, setPhase] = useState<"baseline" | "fault" | "recovery">(
    "baseline",
  );
  const [checked, setChecked] = useState(() =>
    EVIDENCE_CHECKS.map(() => false),
  );

  const reset = () => {
    setPhase("baseline");
    setChecked(EVIDENCE_CHECKS.map(() => false));
  };

  const phaseText = {
    baseline: `先证明正常轨迹满足：${model.invariant}`,
    fault: `只注入一个反例并保存首错：${model.fault}`,
    recovery: `撤销故障，以同一输入重放并核对：${model.evidence}`,
  }[phase];

  return (
    <>
      <LabHeader
        eyebrow="基线 → 首错 → 恢复 → 复位"
        title={unitTitle}
        description="证据包不是完成度分数：每一项都必须能指回真实标签、对象身份和可重放观察。"
        onReset={reset}
      />
      <div className="grid gap-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.2fr)]">
        <section className="border-b border-border p-5 lg:border-r lg:border-b-0">
          <p className="text-xs font-semibold text-primary">实验阶段</p>
          <div className="mt-3 grid gap-2">
            {(
              [
                ["baseline", "1. 保存正常基线"],
                ["fault", "2. 注入单一故障"],
                ["recovery", "3. 恢复并同输入重放"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={phase === id}
                className={`rounded-control border px-3 py-3 text-left text-sm transition-colors ${
                  phase === id
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border bg-surface text-secondary hover:text-primary"
                }`}
                onClick={() => setPhase(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div
            className="mt-4 rounded-control border border-border bg-elevated p-4"
            aria-live="polite"
          >
            <p className="text-xs font-semibold text-accent">当前判据</p>
            <p className="mt-2 text-sm leading-6 text-primary">{phaseText}</p>
          </div>
        </section>

        <section className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold text-primary">四项交接证据</p>
            <p className="text-xs text-secondary">
              已确认 {checked.filter(Boolean).length}/{EVIDENCE_CHECKS.length}
            </p>
          </div>
          <div className="mt-3 space-y-2">
            {EVIDENCE_CHECKS.map((item, index) => (
              <button
                key={item.label}
                type="button"
                aria-pressed={checked[index]}
                className={`flex w-full items-start gap-3 rounded-control border p-3 text-left transition-colors ${
                  checked[index]
                    ? "border-success bg-success/10"
                    : "border-border bg-surface hover:border-accent"
                }`}
                onClick={() =>
                  setChecked((current) =>
                    current.map((value, itemIndex) =>
                      itemIndex === index ? !value : value,
                    ),
                  )
                }
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                    checked[index]
                      ? "border-success text-success"
                      : "border-border text-secondary"
                  }`}
                  aria-hidden="true"
                >
                  {checked[index] ? "✓" : index + 1}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-primary">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-secondary">
                    {item.detail}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-control border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-warning">拒绝交接的条件</p>
            <p className="mt-2 text-sm leading-6 text-primary">
              版本坐标不一致、首错不可定位、恢复后无法同输入重放，或资源没有释放，任一出现都应收窄结论并重新实验。
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export function OfficialDavSeriesLab(props: OfficialDavSeriesLabProps) {
  return (
    <figure
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind={`deep-android-versioned-causal-${props.mode}`}
    >
      {props.mode === "pipeline" ? (
        <PipelinePanel
          unitTitle={props.unitTitle}
          focus={props.focus}
          nodes={props.nodes}
          stages={props.stages}
          model={props.model}
        />
      ) : props.mode === "experiment" ? (
        <ExperimentPanel
          unitTitle={props.unitTitle}
          focus={props.focus}
          versions={props.versions}
          model={props.model}
        />
      ) : (
        <EvidencePanel unitTitle={props.unitTitle} model={props.model} />
      )}
      <figcaption className="border-t border-border px-5 py-3 text-xs leading-5 text-secondary">
        课程实验只说明独立重写的验证方法；历史实现必须回到
        {props.model.sourceTag} 与 {props.model.sourcePath} 核对。
      </figcaption>
    </figure>
  );
}
