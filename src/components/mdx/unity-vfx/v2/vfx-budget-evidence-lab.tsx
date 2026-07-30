"use client";

import { useMemo, useState } from "react";

export type UnityVfxEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  contracts: readonly {
    phase: string;
    asset: string;
    emitter: string;
    material: string;
    camera: string;
    observation: string;
  }[];
  captures: readonly {
    name: string;
    setup: string;
    prediction: string;
    boundary: string;
  }[];
  gates: readonly { label: string; detail: string }[];
};

type Props = {
  model: UnityVfxEvidenceModel;
  view: "effect-contract" | "budget-model" | "capture-gate";
};

const controlClass =
  "min-h-11 rounded-control border border-border bg-background px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-50";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button type="button" className={controlClass} onClick={onReset}>
      重置本实验
    </button>
  );
}

function EffectContract({ model }: { model: UnityVfxEvidenceModel }) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [track, setTrack] = useState<"first-edition" | "current">(
    "first-edition",
  );
  const contract = model.contracts[phaseIndex] ?? model.contracts[0];

  function reset() {
    setConceptIndex(0);
    setPhaseIndex(0);
    setTrack("first-edition");
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="unity-vfx-effect-contract"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            坐标—阶段—渲染合同
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            选择正式目录坐标、特效阶段与时代轨道，再检查资源、发射、材质、摄像机和应见画面。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            正式目录坐标
            <select
              className="mt-1 min-h-11 w-full rounded-control border border-border bg-background px-3 py-2 text-sm"
              value={conceptIndex}
              onChange={(event) => setConceptIndex(Number(event.target.value))}
            >
              {model.concepts.map((concept, index) => (
                <option key={`${concept}-${index}`} value={index}>
                  {concept}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-2">
            {(["first-edition", "current"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={`${controlClass} ${track === item ? "border-primary bg-primary/10" : ""}`}
                aria-pressed={track === item}
                onClick={() => setTrack(item)}
              >
                {item === "first-edition"
                  ? "2017 首版范围"
                  : "Unity 6·3 LTS 当前轨"}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {model.contracts.map((item, index) => (
              <button
                key={item.phase}
                type="button"
                className={`${controlClass} w-full ${phaseIndex === index ? "border-primary bg-primary/10" : ""}`}
                aria-pressed={phaseIndex === index}
                onClick={() => setPhaseIndex(index)}
              >
                <span className="mr-2 font-mono text-xs text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.phase}
              </button>
            ))}
          </div>
        </div>

        <article
          className="rounded-card border border-border bg-background p-4"
          aria-live="polite"
        >
          <p className="text-xs text-muted-foreground">
            {track === "first-edition"
              ? "公开目录限定的历史工作流"
              : "Unity 6·3 LTS 项目迁移"}{" "}
            · 坐标 {conceptIndex + 1}/{model.concepts.length}
          </p>
          <h4 className="mt-1 font-semibold text-foreground">
            {contract?.phase}
          </h4>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">资源输入</dt>
              <dd className="mt-1 text-foreground">{contract?.asset}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">发射与生命周期</dt>
              <dd className="mt-1 text-foreground">{contract?.emitter}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">材质与混合</dt>
              <dd className="mt-1 text-foreground">{contract?.material}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">摄像机与空间</dt>
              <dd className="mt-1 text-foreground">{contract?.camera}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground">应见观察</dt>
              <dd className="mt-1 text-foreground">
                {contract?.observation}
                {track === "current"
                  ? "；另记录实际编辑器补丁、渲染管线、色彩空间、质量级别与目标设备。"
                  : "；不把当前 VFX Graph、URP 或 HDRP 能力倒写成 2017 年原书内容。"}
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-card border border-border bg-background p-3 text-sm">
      <span className="flex items-center justify-between gap-3">
        <span className="font-medium text-foreground">{label}</span>
        <output className="font-mono text-primary">
          {value.toLocaleString("zh-CN")} {unit}
        </output>
      </span>
      <input
        className="mt-3 min-h-11 w-full accent-[var(--primary)]"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function BudgetModel({ model }: { model: UnityVfxEvidenceModel }) {
  const [spawnRate, setSpawnRate] = useState(80);
  const [lifetime, setLifetime] = useState(1.5);
  const [burst, setBurst] = useState(40);
  const [overdrawLayers, setOverdrawLayers] = useState(3);
  const [screenFraction, setScreenFraction] = useState(12);
  const [materialPasses, setMaterialPasses] = useState(1);

  const estimate = useMemo(() => {
    const steadyParticles = spawnRate * lifetime + burst;
    const screenPixels = 1920 * 1080;
    const fragmentWork =
      screenPixels * (screenFraction / 100) * overdrawLayers * materialPasses;
    return { steadyParticles, screenPixels, fragmentWork };
  }, [
    burst,
    lifetime,
    materialPasses,
    overdrawLayers,
    screenFraction,
    spawnRate,
  ]);

  function reset() {
    setSpawnRate(80);
    setLifetime(1.5);
    setBurst(40);
    setOverdrawLayers(3);
    setScreenFraction(12);
    setMaterialPasses(1);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="unity-vfx-particle-fragment-budget"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            粒子存量与片元工作量估算
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            参数变化先转成可解释量，再到目标设备测量
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            这里是 1920×1080 参考帧的上界近似，不是 Profiler、Frame Debugger 或
            GPU 捕获结果。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <RangeControl
          label="持续发射率"
          value={spawnRate}
          min={0}
          max={600}
          step={10}
          unit="粒子/秒"
          onChange={setSpawnRate}
        />
        <RangeControl
          label="粒子寿命"
          value={lifetime}
          min={0.1}
          max={8}
          step={0.1}
          unit="秒"
          onChange={setLifetime}
        />
        <RangeControl
          label="单次 Burst"
          value={burst}
          min={0}
          max={1000}
          step={10}
          unit="粒子"
          onChange={setBurst}
        />
        <RangeControl
          label="聚合透明叠层"
          value={overdrawLayers}
          min={1}
          max={12}
          step={1}
          unit="层"
          onChange={setOverdrawLayers}
        />
        <RangeControl
          label="画面覆盖比例"
          value={screenFraction}
          min={1}
          max={100}
          step={1}
          unit="%"
          onChange={setScreenFraction}
        />
        <RangeControl
          label="材质 Pass 数"
          value={materialPasses}
          min={1}
          max={6}
          step={1}
          unit="Pass"
          onChange={setMaterialPasses}
        />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2" aria-live="polite">
        <article className="rounded-card border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">估算稳态存量上界</p>
          <strong className="mt-1 block text-2xl text-foreground">
            {Math.round(estimate.steadyParticles).toLocaleString("zh-CN")} 粒子
          </strong>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            持续发射率 × 寿命 + 单次 Burst。它忽略停止发射、提前死亡、循环和多个
            Burst，只用于暴露参数量级。
          </p>
        </article>
        <article className="rounded-card border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">估算每帧片元工作量</p>
          <strong className="mt-1 block text-2xl text-foreground">
            {Math.round(estimate.fragmentWork).toLocaleString("zh-CN")} 片元
          </strong>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            {estimate.screenPixels.toLocaleString("zh-CN")} 像素 × 覆盖比例 ×
            聚合叠层 × Pass。叠层已经汇总重叠，不再乘粒子数。
          </p>
        </article>
      </div>

      <p className="mt-4 rounded-control bg-muted px-3 py-2 text-sm text-foreground">
        裁决边界：这个模型只帮助预注册“哪个旋钮可能放大存量或透明片元工作量”；真正结论必须来自目标设备、相同摄像机、相同渲染管线下的
        CPU/GPU Profiler、Frame Debugger 或图形捕获。
      </p>
    </section>
  );
}

function CaptureGate({ model }: { model: UnityVfxEvidenceModel }) {
  const [captureIndex, setCaptureIndex] = useState(0);
  const [openGates, setOpenGates] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const capture = model.captures[captureIndex] ?? model.captures[0];
  const complete = openGates.length === model.gates.length;

  function reset() {
    setCaptureIndex(0);
    setOpenGates([]);
    setStep(0);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="unity-vfx-reproduction-capture-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            基线—故障—恢复捕获门
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.question}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            先选捕获情景并逐步展开，再闭合来源、版本、资产、渲染、测量与恢复门。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          {model.captures.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`${controlClass} w-full ${captureIndex === index ? "border-primary bg-primary/10" : ""}`}
              aria-pressed={captureIndex === index}
              onClick={() => {
                setCaptureIndex(index);
                setOpenGates([]);
                setStep(0);
              }}
            >
              <span className="block font-semibold">{item.name}</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {item.setup}
              </span>
            </button>
          ))}

          <article
            className="rounded-card border border-border bg-background p-3 text-sm"
            aria-live="polite"
          >
            <p className="font-semibold">步骤 {step + 1}/3</p>
            <p className="mt-1 text-muted-foreground">
              {step === 0
                ? capture?.setup
                : step === 1
                  ? capture?.prediction
                  : capture?.boundary}
            </p>
          </article>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={controlClass}
              disabled={step === 0}
              onClick={() => setStep((value) => Math.max(0, value - 1))}
            >
              上一步
            </button>
            <button
              type="button"
              className={controlClass}
              disabled={step === 2}
              onClick={() => setStep((value) => Math.min(2, value + 1))}
            >
              下一步
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {model.gates.map((gate, index) => {
            const open = openGates.includes(index);
            return (
              <article
                key={gate.label}
                className="rounded-card border border-border bg-background p-3"
              >
                <button
                  type="button"
                  className="flex min-h-11 w-full items-center justify-between gap-3 text-left"
                  aria-expanded={open}
                  onClick={() =>
                    setOpenGates((current) =>
                      current.includes(index)
                        ? current.filter((item) => item !== index)
                        : [...current, index],
                    )
                  }
                >
                  <span className="font-semibold">{gate.label}</span>
                  <span className="text-sm text-primary">
                    {open ? "已核对" : "待核对"}
                  </span>
                </button>
                {open ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {gate.detail}
                  </p>
                ) : null}
              </article>
            );
          })}
          <p
            className={`rounded-card border p-3 text-sm ${
              complete
                ? "border-primary/30 bg-primary/5"
                : "border-border bg-muted"
            }`}
            aria-live="polite"
          >
            {complete
              ? `门禁闭合，可以交付：${model.artifact}`
              : `尚有 ${model.gates.length - openGates.length} 项门禁未核对，不能发布效果或性能结论。`}
          </p>
        </div>
      </div>
    </section>
  );
}

export function UnityVfxEvidenceLab({ model, view }: Props) {
  if (view === "effect-contract") return <EffectContract model={model} />;
  if (view === "budget-model") return <BudgetModel model={model} />;
  return <CaptureGate model={model} />;
}
