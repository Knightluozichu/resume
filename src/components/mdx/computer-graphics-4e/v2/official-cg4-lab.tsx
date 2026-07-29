"use client";

import { useState } from "react";

export interface GraphicsConceptNode {
  label: string;
  unit: string;
  mechanism: string;
  probe: string;
}

export interface GraphicsExperimentModel {
  focus: string;
  formula: string;
  invariant: string;
  fault: string;
  evidence: string;
  sourceLabel: string;
}

interface OfficialCg4LabProps {
  mode: "pipeline" | "algorithm" | "evidence";
  unitTitle: string;
  nodes: readonly GraphicsConceptNode[];
  model: GraphicsExperimentModel;
}

const PIPELINE = [
  { label: "模型/输入", detail: "定义图元、属性、数据或交互事件" },
  { label: "几何变换", detail: "明确模型、世界、观察与裁剪空间" },
  { label: "离散化", detail: "执行裁剪、覆盖、可见性或采样" },
  { label: "外观求值", detail: "计算颜色、纹理、光照或传递函数" },
  { label: "显示/交互", detail: "输出帧缓冲并接收下一次输入" },
] as const;

const ALGORITHM_CASES = [
  {
    id: "baseline",
    label: "参考实现",
    input: "坐标、属性、精度和状态都显式记录",
    result: "输出满足章节不变量",
  },
  {
    id: "space",
    label: "坐标空间错位",
    input: "把世界量当设备量或跳过齐次除法",
    result: "几何位置、深度或命中测试首先偏离",
  },
  {
    id: "state",
    label: "隐式状态泄漏",
    input: "沿用上一轮变换、深度或着色状态",
    result: "相同输入因运行顺序不同而产生不同输出",
  },
  {
    id: "precision",
    label: "离散精度不足",
    input: "提前取整、深度范围过大或采样步长过粗",
    result: "边界、遮挡或连续性证据出现可重现误差",
  },
] as const;

const CHECKS = [
  "声明每个量所在坐标空间与单位",
  "保存参考输入、算法状态与离散规则",
  "定位首个错误图元、像素或矩阵",
  "恢复后比较参考像素与交互状态",
] as const;

function Header({
  title,
  eyebrow,
  description,
  reset,
}: {
  title: string;
  eyebrow: string;
  description: string;
  reset: () => void;
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
        className="rounded-control border border-border bg-surface px-3 py-2 text-xs text-secondary hover:border-accent hover:text-primary"
        onClick={reset}
      >
        重置实验
      </button>
    </header>
  );
}

function PipelineView({
  unitTitle,
  nodes,
  model,
}: Omit<OfficialCg4LabProps, "mode">) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const active = nodes[nodeIndex] ?? nodes[0];
  const reset = () => {
    setNodeIndex(0);
    setStageIndex(0);
  };

  return (
    <>
      <Header
        eyebrow="图形管线坐标审计"
        title={unitTitle}
        description={`把${model.focus}放进输入、变换、离散、外观与显示五个责任阶段。`}
        reset={reset}
      />
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.35fr)]">
        <section className="min-w-0 border-b border-border p-4 lg:border-r lg:border-b-0">
          <p className="mb-3 text-xs font-semibold text-primary">正式概念</p>
          <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
            {nodes.map((node, index) => (
              <button
                key={`${node.label}-${index}`}
                type="button"
                aria-pressed={nodeIndex === index}
                className={`w-full rounded-control border px-3 py-2 text-left text-sm ${
                  nodeIndex === index
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border bg-surface text-secondary"
                }`}
                onClick={() => setNodeIndex(index)}
              >
                <span className="mr-2 font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {node.label}
              </button>
            ))}
          </div>
        </section>

        <section className="min-w-0 p-5" aria-live="polite">
          <div className="grid gap-2 sm:grid-cols-5">
            {PIPELINE.map((stage, index) => (
              <button
                key={stage.label}
                type="button"
                aria-pressed={stageIndex === index}
                className={`relative rounded-control border p-3 text-left ${
                  stageIndex === index
                    ? "border-accent bg-accent/10"
                    : "border-border bg-surface"
                }`}
                onClick={() => setStageIndex(index)}
              >
                <span className="block font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-xs font-semibold text-primary">
                  {stage.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold text-accent">
                {active?.unit} / {active?.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {active?.mechanism}
              </p>
            </div>
            <div className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold text-success">
                {PIPELINE[stageIndex].label}
              </p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {PIPELINE[stageIndex].detail}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                探针：{active?.probe}
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto rounded-control border border-border bg-surface p-4">
            <p className="text-xs font-semibold text-primary">当前公式坐标</p>
            <code className="mt-2 block min-w-max text-xs leading-5 text-secondary">
              {model.formula}
            </code>
          </div>
        </section>
      </div>
    </>
  );
}

function AlgorithmView({
  unitTitle,
  model,
}: Pick<OfficialCg4LabProps, "unitTitle" | "model">) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [point, setPoint] = useState<"origin" | "basis-x" | "sample">("sample");
  const active = ALGORITHM_CASES[caseIndex];
  const points = {
    origin: { label: "原点", input: "(0,0,0,1)", output: "平移分量可见" },
    "basis-x": { label: "x基向量", input: "(1,0,0,0)", output: "方向不受平移" },
    sample: { label: "测试点", input: "(2,1,0,1)", output: "完整组合路径" },
  } as const;
  const reset = () => {
    setCaseIndex(0);
    setPoint("sample");
  };

  return (
    <>
      <Header
        eyebrow="坐标、状态与离散误差反事实"
        title={unitTitle}
        description="使用同一测试点，只切换一种故障；原点与基向量用于分离平移、方向和投影错误。"
        reset={reset}
      />
      <div className="space-y-5 p-5">
        <section className="flex flex-wrap gap-2">
          {(Object.keys(points) as Array<keyof typeof points>).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={point === id}
              className={`rounded-control border px-3 py-2 text-xs ${
                point === id
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary"
              }`}
              onClick={() => setPoint(id)}
            >
              {points[id].label} {points[id].input}
            </button>
          ))}
        </section>

        <section className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {ALGORITHM_CASES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={caseIndex === index}
              className={`rounded-control border p-3 text-left ${
                caseIndex === index
                  ? "border-accent bg-accent/10"
                  : "border-border bg-surface"
              }`}
              onClick={() => setCaseIndex(index)}
            >
              <span className="block text-xs font-semibold text-primary">
                {item.label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-secondary">
                {item.input}
              </span>
            </button>
          ))}
        </section>

        <section className="grid gap-3 md:grid-cols-3" aria-live="polite">
          <div className="rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-accent">测试输入</p>
            <p className="mt-2 text-sm text-primary">
              {points[point].label} {points[point].input}
            </p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-warning">算法状态</p>
            <p className="mt-2 text-sm leading-6 text-primary">
              {active.result}
            </p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-success">验收输出</p>
            <p className="mt-2 text-sm leading-6 text-primary">
              {caseIndex === 0
                ? `${points[point].output}；${model.invariant}`
                : `由${model.evidence}定位后拒绝当前结果`}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

function EvidenceView({
  unitTitle,
  model,
}: Pick<OfficialCg4LabProps, "unitTitle" | "model">) {
  const [phase, setPhase] = useState<"reference" | "fault" | "replay">(
    "reference",
  );
  const [checked, setChecked] = useState(() => CHECKS.map(() => false));
  const reset = () => {
    setPhase("reference");
    setChecked(CHECKS.map(() => false));
  };
  const current = {
    reference: `建立参考：${model.invariant}`,
    fault: `注入单一偏差：${model.fault}`,
    replay: `恢复并核对：${model.evidence}`,
  }[phase];

  return (
    <>
      <Header
        eyebrow="图形算法证据矩阵"
        title={unitTitle}
        description="每项证据都要落到矩阵、图元、像素或交互状态；不能只保存最终截图。"
        reset={reset}
      />
      <div className="grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <section className="border-b border-border p-5 lg:border-r lg:border-b-0">
          <div className="grid gap-2">
            {(
              [
                ["reference", "1. 参考输入"],
                ["fault", "2. 单一偏差"],
                ["replay", "3. 恢复重放"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={phase === id}
                className={`rounded-control border px-3 py-3 text-left text-sm ${
                  phase === id
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border bg-surface text-secondary"
                }`}
                onClick={() => setPhase(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <p
            className="mt-4 rounded-control border border-border bg-elevated p-4 text-sm leading-6 text-primary"
            aria-live="polite"
          >
            {current}
          </p>
        </section>
        <section className="p-5">
          <p className="mb-3 text-xs font-semibold text-primary">
            已确认 {checked.filter(Boolean).length}/{CHECKS.length}
          </p>
          <div className="space-y-2">
            {CHECKS.map((item, index) => (
              <button
                key={item}
                type="button"
                aria-pressed={checked[index]}
                className={`flex w-full gap-3 rounded-control border p-3 text-left text-sm ${
                  checked[index]
                    ? "border-success bg-success/10 text-primary"
                    : "border-border bg-surface text-secondary"
                }`}
                onClick={() =>
                  setChecked((currentChecks) =>
                    currentChecks.map((value, itemIndex) =>
                      itemIndex === index ? !value : value,
                    ),
                  )
                }
              >
                <span className="font-mono text-xs text-accent">
                  {checked[index] ? "✓" : String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export function OfficialCg4Lab(props: OfficialCg4LabProps) {
  return (
    <figure
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind={`cg4-coordinate-pipeline-${props.mode}`}
    >
      {props.mode === "pipeline" ? (
        <PipelineView
          unitTitle={props.unitTitle}
          nodes={props.nodes}
          model={props.model}
        />
      ) : props.mode === "algorithm" ? (
        <AlgorithmView unitTitle={props.unitTitle} model={props.model} />
      ) : (
        <EvidenceView unitTitle={props.unitTitle} model={props.model} />
      )}
      <figcaption className="border-t border-border px-5 py-3 text-xs leading-5 text-secondary">
        原书边界：{props.model.sourceLabel}
        。课程实验显式标注坐标和状态，不把现代API示例冒充原书正文。
      </figcaption>
    </figure>
  );
}
