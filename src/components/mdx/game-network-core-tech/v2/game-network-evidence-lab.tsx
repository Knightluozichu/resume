"use client";

import { useMemo, useState } from "react";

export type GameNetworkEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  topologies: readonly {
    name: string;
    owner: string;
    input: string;
    validation: string;
    fanout: string;
    reconciliation: string;
  }[];
  traces: readonly {
    name: string;
    steps: readonly string[];
    verdict: string;
  }[];
  gates: readonly { label: string; detail: string }[];
};

type Props = {
  model: GameNetworkEvidenceModel;
  view: "authority-contract" | "traffic-budget" | "trace-gate";
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

function AuthorityContract({ model }: { model: GameNetworkEvidenceModel }) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [topologyIndex, setTopologyIndex] = useState(0);
  const [track, setTrack] = useState<"original" | "translation" | "current">(
    "original",
  );
  const topology = model.topologies[topologyIndex] ?? model.topologies[0];

  function reset() {
    setConceptIndex(0);
    setTopologyIndex(0);
    setTrack("original");
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="game-network-authority-contract"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            坐标—拓扑—权威状态合同
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            先选正式目录坐标与时代轨，再决定谁接收输入、验证意图、推进状态、广播结果并处理分歧。
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

          <div className="grid gap-2 sm:grid-cols-3">
            {(["original", "translation", "current"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={`${controlClass} ${track === item ? "border-primary bg-primary/10" : ""}`}
                aria-pressed={track === item}
                onClick={() => setTrack(item)}
              >
                {item === "original"
                  ? "2011 日文原版"
                  : item === "translation"
                    ? "2014 中文译本"
                    : "当前标准轨"}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {model.topologies.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={`${controlClass} w-full ${topologyIndex === index ? "border-primary bg-primary/10" : ""}`}
                aria-pressed={topologyIndex === index}
                onClick={() => setTopologyIndex(index)}
              >
                <span className="mr-2 font-mono text-xs text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <article
          className="rounded-card border border-border bg-background p-4"
          aria-live="polite"
        >
          <p className="text-xs text-muted-foreground">
            {track === "original"
              ? "出版社原版目录与作者样例固定快照"
              : track === "translation"
                ? "中文译本公开358分节范围"
                : "当前RFC、部署与可观察性依据"}{" "}
            · 坐标 {conceptIndex + 1}/{model.concepts.length}
          </p>
          <h4 className="mt-1 font-semibold text-foreground">
            {topology?.name}
          </h4>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">权威状态所有者</dt>
              <dd className="mt-1 text-foreground">{topology?.owner}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">接收的输入</dt>
              <dd className="mt-1 text-foreground">{topology?.input}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">验证与状态迁移</dt>
              <dd className="mt-1 text-foreground">{topology?.validation}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">广播与兴趣管理</dt>
              <dd className="mt-1 text-foreground">{topology?.fanout}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground">分歧处理</dt>
              <dd className="mt-1 text-foreground">
                {topology?.reconciliation}
                {track === "current"
                  ? "；另记录实际传输协议、TLS版本、序列号空间、tick、区域、部署和客户端构建。"
                  : "；历史样例只说明当时工程身份，不能替代当前安全、NAT、平台和运行测量。"}
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

function TrafficBudget({ model }: { model: GameNetworkEvidenceModel }) {
  const [tickRate, setTickRate] = useState(20);
  const [players, setPlayers] = useState(64);
  const [entities, setEntities] = useState(24);
  const [bytesPerEntity, setBytesPerEntity] = useState(28);
  const [overhead, setOverhead] = useState(35);
  const [rtt, setRtt] = useState(80);
  const [jitterBuffer, setJitterBuffer] = useState(30);

  const estimate = useMemo(() => {
    const payloadPerTick = entities * bytesPerEntity;
    const downstreamKib =
      (tickRate * payloadPerTick * (1 + overhead / 100)) / 1024;
    const serverMib = (downstreamKib * players) / 1024;
    const tickWait = 1000 / tickRate;
    const presentationDelay = rtt / 2 + jitterBuffer + tickWait;
    return { payloadPerTick, downstreamKib, serverMib, presentationDelay };
  }, [
    bytesPerEntity,
    entities,
    jitterBuffer,
    overhead,
    players,
    rtt,
    tickRate,
  ]);

  function reset() {
    setTickRate(20);
    setPlayers(64);
    setEntities(24);
    setBytesPerEntity(28);
    setOverhead(35);
    setRtt(80);
    setJitterBuffer(30);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="game-network-traffic-latency-budget"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            状态复制流量与呈现延迟估算
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            把tick、兴趣实体、编码和网络条件转成可复算预算
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            这是不含重传、突发、拥塞、加密实现细节和服务器逻辑成本的容量近似，不是抓包或压测结果。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <RangeControl
          label="状态tick"
          value={tickRate}
          min={1}
          max={120}
          step={1}
          unit="Hz"
          onChange={setTickRate}
        />
        <RangeControl
          label="同一分片玩家"
          value={players}
          min={2}
          max={1000}
          step={2}
          unit="人"
          onChange={setPlayers}
        />
        <RangeControl
          label="每玩家兴趣实体"
          value={entities}
          min={1}
          max={300}
          step={1}
          unit="个"
          onChange={setEntities}
        />
        <RangeControl
          label="每实体编码"
          value={bytesPerEntity}
          min={4}
          max={256}
          step={4}
          unit="字节"
          onChange={setBytesPerEntity}
        />
        <RangeControl
          label="协议与封装附加比例"
          value={overhead}
          min={0}
          max={200}
          step={5}
          unit="%"
          onChange={setOverhead}
        />
        <RangeControl
          label="往返时延"
          value={rtt}
          min={2}
          max={500}
          step={2}
          unit="ms"
          onChange={setRtt}
        />
        <RangeControl
          label="抖动缓冲"
          value={jitterBuffer}
          min={0}
          max={250}
          step={5}
          unit="ms"
          onChange={setJitterBuffer}
        />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3" aria-live="polite">
        <article className="rounded-card border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">单客户端估算下行</p>
          <strong className="mt-1 block text-2xl text-foreground">
            {estimate.downstreamKib.toFixed(1)} KiB/s
          </strong>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            {estimate.payloadPerTick.toLocaleString("zh-CN")} 字节/tick ×{" "}
            {tickRate} tick/s × 附加比例。
          </p>
        </article>
        <article className="rounded-card border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">分片估算总下行</p>
          <strong className="mt-1 block text-2xl text-foreground">
            {estimate.serverMib.toFixed(2)} MiB/s
          </strong>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            单客户端下行 × {players}{" "}
            人；未扣除共享、多播或差分压缩，也未计入重传。
          </p>
        </article>
        <article className="rounded-card border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">估算呈现等待</p>
          <strong className="mt-1 block text-2xl text-foreground">
            {estimate.presentationDelay.toFixed(0)} ms
          </strong>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            RTT/2 + 抖动缓冲 +
            最坏一整个tick等待；不含输入队列、服务器计算、丢包恢复和渲染。
          </p>
        </article>
      </div>

      <p className="mt-4 rounded-control bg-muted px-3 py-2 text-sm text-foreground">
        裁决边界：公式只预注册量级和敏感参数；交付结论要来自同一客户端构建、区域、协议和负载下的原始抓包、服务端计数器、时钟同步、分位时延、丢包与恢复轨迹。
      </p>
    </section>
  );
}

function TraceGate({ model }: { model: GameNetworkEvidenceModel }) {
  const [traceIndex, setTraceIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [openGates, setOpenGates] = useState<number[]>([]);
  const trace = model.traces[traceIndex] ?? model.traces[0];
  const complete = openGates.length === model.gates.length;

  function reset() {
    setTraceIndex(0);
    setStep(0);
    setOpenGates([]);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="game-network-fault-recovery-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            基线—故障—恢复消息轨迹
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.question}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            一次只改变一个网络或状态条件，逐消息找到首个分歧，再闭合六道发布门。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          {model.traces.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`${controlClass} w-full ${traceIndex === index ? "border-primary bg-primary/10" : ""}`}
              aria-pressed={traceIndex === index}
              onClick={() => {
                setTraceIndex(index);
                setStep(0);
                setOpenGates([]);
              }}
            >
              {item.name}
            </button>
          ))}

          <ol className="space-y-2" aria-live="polite">
            {trace?.steps.slice(0, step + 1).map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex gap-3 rounded-card border border-border bg-background p-3 text-sm"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
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
              disabled={step >= (trace?.steps.length ?? 1) - 1}
              onClick={() =>
                setStep((value) =>
                  Math.min((trace?.steps.length ?? 1) - 1, value + 1),
                )
              }
            >
              下一步
            </button>
          </div>
          <p className="rounded-control bg-muted px-3 py-2 text-sm">
            当前裁决：{trace?.verdict}
          </p>
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
              : `尚有 ${model.gates.length - openGates.length} 项门禁未核对，不能发布正确性、容量或恢复结论。`}
          </p>
        </div>
      </div>
    </section>
  );
}

export function GameNetworkEvidenceLab({ model, view }: Props) {
  if (view === "authority-contract") return <AuthorityContract model={model} />;
  if (view === "traffic-budget") return <TrafficBudget model={model} />;
  return <TraceGate model={model} />;
}
