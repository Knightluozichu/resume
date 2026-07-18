"use client";

import { useId, useMemo, useState } from "react";

type Mode = "topology" | "reliability" | "evidence";

type Props = {
  mode: Mode;
  unitTitle: string;
  focus: string;
  invariant: string;
  artifact: string;
  nodes: readonly string[];
};

const evidenceGates = [
  "第2版目录、Kafka与客户端版本",
  "主题、分区、副本与配置快照",
  "键、消息ID、偏移量与确认轨迹",
  "吞吐、分位延迟、滞后、ISR与磁盘",
  "重试、再均衡、broker与网络故障",
  "业务对账、恢复、回退与责任人",
] as const;

export function OfficialKafka2Lab({
  mode,
  unitTitle,
  focus,
  invariant,
  artifact,
  nodes,
}: Props) {
  const id = useId();
  const [nodeIndex, setNodeIndex] = useState(0);
  const [partitions, setPartitions] = useState(4);
  const [replicas, setReplicas] = useState(3);
  const [keySeed, setKeySeed] = useState(7);
  const [messageRate, setMessageRate] = useState(12000);
  const [batchKiB, setBatchKiB] = useState(32);
  const [minIsr, setMinIsr] = useState(2);
  const [acks, setAcks] = useState<"0" | "1" | "all">("all");
  const [slowConsumer, setSlowConsumer] = useState(false);
  const [failedReplica, setFailedReplica] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() =>
    evidenceGates.map(() => false),
  );

  const selectedNode = nodes[nodeIndex] ?? unitTitle;
  const selectedPartition = keySeed % partitions;
  const healthyReplicas = Math.max(1, replicas - (failedReplica ? 1 : 0));
  const result = useMemo(() => {
    const batching = Math.min(2.4, 0.7 + batchKiB / 48);
    const ackCost = acks === "0" ? 0.62 : acks === "1" ? 0.84 : 1.15;
    const capacity = Math.round((partitions * 5200 * batching) / ackCost);
    const utilization = messageRate / Math.max(1, capacity);
    const p99 = Math.round(
      8 +
        utilization ** 2 * 85 +
        (acks === "all" ? 9 : 0) +
        (failedReplica ? 34 : 0),
    );
    const lag = slowConsumer
      ? Math.round(Math.max(0, messageRate - partitions * 1800) * 12)
      : Math.round(Math.max(0, messageRate - partitions * 4200) * 4);
    const writable = acks !== "all" || healthyReplicas >= minIsr;
    const durability =
      acks === "all" && minIsr >= 2
        ? "强约束"
        : acks === "1"
          ? "仅首领确认"
          : "高风险";
    return { capacity, durability, lag, p99, utilization, writable };
  }, [
    acks,
    batchKiB,
    failedReplica,
    healthyReplicas,
    messageRate,
    minIsr,
    partitions,
    slowConsumer,
  ]);

  if (mode === "topology") {
    return (
      <section
        className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        aria-label={unitTitle + "分区拓扑实验"}
      >
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            主题、分区与副本拓扑
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
          <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {focus}
          </p>
        </header>
        <div className="grid lg:grid-cols-[minmax(14rem,0.72fr)_minmax(0,1.4fr)]">
          <div className="max-h-96 overflow-auto border-b p-3 lg:border-b-0 lg:border-r dark:border-zinc-800">
            <p className="mb-2 text-xs font-semibold text-zinc-500">
              正式目录节点 {nodeIndex + 1}/{nodes.length}
            </p>
            {nodes.map((node, index) => (
              <button
                key={node + index}
                type="button"
                onClick={() => setNodeIndex(index)}
                className={
                  "mb-1 min-h-9 w-full rounded px-2 py-1.5 text-left text-xs " +
                  (index === nodeIndex
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800")
                }
              >
                {node}
              </button>
            ))}
          </div>
          <div className="p-4">
            <p className="text-xs text-zinc-500">当前问题</p>
            <p className="mt-1 text-sm font-semibold">{selectedNode}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <label
                className="text-xs font-semibold"
                htmlFor={id + "-partitions"}
              >
                分区：{partitions}
                <input
                  id={id + "-partitions"}
                  className="mt-2 w-full accent-emerald-600"
                  type="range"
                  min="1"
                  max="8"
                  value={partitions}
                  onChange={(event) =>
                    setPartitions(Number(event.target.value))
                  }
                />
              </label>
              <label
                className="text-xs font-semibold"
                htmlFor={id + "-replicas"}
              >
                副本：{replicas}
                <input
                  id={id + "-replicas"}
                  className="mt-2 w-full accent-sky-600"
                  type="range"
                  min="1"
                  max="4"
                  value={replicas}
                  onChange={(event) => setReplicas(Number(event.target.value))}
                />
              </label>
              <label className="text-xs font-semibold" htmlFor={id + "-key"}>
                键样本：{keySeed}
                <input
                  id={id + "-key"}
                  className="mt-2 w-full accent-amber-600"
                  type="range"
                  min="0"
                  max="31"
                  value={keySeed}
                  onChange={(event) => setKeySeed(Number(event.target.value))}
                />
              </label>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {Array.from({ length: partitions }, (_, partition) => (
                <div
                  key={partition}
                  className={
                    "min-h-24 border p-3 " +
                    (partition === selectedPartition
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30"
                      : "border-zinc-300 dark:border-zinc-700")
                  }
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Partition {partition}</span>
                    <span>
                      {partition === selectedPartition ? "key命中" : "待命"}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-1">
                    {Array.from({ length: replicas }, (_, replica) => (
                      <span
                        key={replica}
                        className={
                          "flex min-h-10 flex-1 items-center justify-center border text-xs " +
                          (replica === 0
                            ? "border-sky-600 bg-sky-100 dark:bg-sky-950/40"
                            : "border-zinc-300 dark:border-zinc-700")
                        }
                      >
                        {replica === 0 ? "Leader" : "F" + replica}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 border-l-4 border-emerald-600 bg-emerald-50 p-3 text-xs leading-5 dark:bg-emerald-950/30">
              <strong>验收不变量：</strong>
              {invariant}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "reliability") {
    return (
      <section
        className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        aria-label={unitTitle + "吞吐可靠性实验"}
      >
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
            吞吐、确认与故障窗口
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </header>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {(["0", "1", "all"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAcks(value)}
                aria-pressed={acks === value}
                className={
                  "min-h-11 rounded border px-2 text-sm font-semibold " +
                  (acks === value
                    ? "border-sky-700 bg-sky-700 text-white"
                    : "border-zinc-300 dark:border-zinc-700")
                }
              >
                acks={value}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <label className="text-xs font-semibold" htmlFor={id + "-rate"}>
              消息率：{messageRate.toLocaleString()}/s
              <input
                id={id + "-rate"}
                className="mt-2 w-full accent-sky-600"
                type="range"
                min="1000"
                max="60000"
                step="1000"
                value={messageRate}
                onChange={(event) => setMessageRate(Number(event.target.value))}
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-batch"}>
              批次：{batchKiB} KiB
              <input
                id={id + "-batch"}
                className="mt-2 w-full accent-violet-600"
                type="range"
                min="1"
                max="128"
                value={batchKiB}
                onChange={(event) => setBatchKiB(Number(event.target.value))}
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-isr"}>
              min ISR：{minIsr}
              <input
                id={id + "-isr"}
                className="mt-2 w-full accent-emerald-600"
                type="range"
                min="1"
                max={Math.max(1, replicas)}
                value={Math.min(minIsr, replicas)}
                onChange={(event) => setMinIsr(Number(event.target.value))}
              />
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setFailedReplica((value) => !value)}
                aria-pressed={failedReplica}
                className="min-h-10 w-full rounded border px-2 text-xs"
              >
                {failedReplica ? "恢复副本" : "故障一个副本"}
              </button>
              <button
                type="button"
                onClick={() => setSlowConsumer((value) => !value)}
                aria-pressed={slowConsumer}
                className="min-h-10 w-full rounded border px-2 text-xs"
              >
                {slowConsumer ? "恢复消费者" : "降低消费速率"}
              </button>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-6">
            {[
              ["健康副本", healthyReplicas + "/" + replicas],
              ["估算容量", result.capacity + "/s"],
              ["利用率", Math.round(result.utilization * 100) + "%"],
              ["P99", result.p99 + " ms"],
              ["消费滞后", result.lag.toLocaleString()],
              ["写入门", result.writable ? "允许" : "拒绝"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="min-h-20 border border-zinc-300 p-3 dark:border-zinc-700"
              >
                <p className="text-xs text-zinc-500">{label}</p>
                <p className="mt-2 font-mono text-sm font-bold">{value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6">
            <strong>持久性判断：</strong>
            {result.durability}
            。模拟值用于比较方向，不代替真实压测、故障注入和消息对账。
          </p>
        </div>
      </section>
    );
  }

  const score = Math.round(
    (checked.filter(Boolean).length / evidenceGates.length) * 100,
  );
  return (
    <section
      className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={unitTitle + "证据门"}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
            端到端证据门
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </div>
        <output className="min-w-16 border border-zinc-300 px-3 py-2 text-center text-lg font-bold dark:border-zinc-700">
          {score}%
        </output>
      </div>
      <div className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {evidenceGates.map((gate, index) => (
          <button
            key={gate}
            type="button"
            onClick={() =>
              setChecked((current) =>
                current.map((value, itemIndex) =>
                  itemIndex === index ? !value : value,
                ),
              )
            }
            aria-pressed={checked[index]}
            className="flex min-h-11 w-full items-center justify-between gap-3 px-2 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            <span>{gate}</span>
            <span
              className={
                "inline-flex h-6 w-6 items-center justify-center border font-bold " +
                (checked[index]
                  ? "border-emerald-700 bg-emerald-700 text-white"
                  : "border-zinc-400 text-transparent")
              }
            >
              ✓
            </span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6">
        {score === 100
          ? "证据齐全：交给未参与实现的人更换键、负载和故障点独立重放。"
          : "尚未闭环：配置、轨迹、指标、故障和对账缺一不可。"}
      </p>
      <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
        交付物：{artifact}
      </p>
    </section>
  );
}
