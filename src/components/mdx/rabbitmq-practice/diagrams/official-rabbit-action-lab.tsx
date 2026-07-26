"use client";

import { useId, useMemo, useState } from "react";

type Mode = "topology" | "delivery" | "evidence";

type Props = {
  mode: Mode;
  unitTitle: string;
  focus: string;
  invariant: string;
  artifact: string;
  nodes: readonly string[];
};

const gates = [
  "原书目录、Erlang与RabbitMQ 2.7版本",
  "vhost、交换器、绑定、队列与消费者拓扑",
  "message id、路由键、confirm、delivery tag与ack轨迹",
  "吞吐、分位延迟、ready/unacked、内存与进程",
  "断线、节点停止、重启与消费者故障",
  "消息对账、恢复、回退与责任人",
] as const;

export function OfficialRabbitActionLab({
  mode,
  unitTitle,
  focus,
  invariant,
  artifact,
  nodes,
}: Props) {
  const id = useId();
  const [nodeIndex, setNodeIndex] = useState(0);
  const [exchangeType, setExchangeType] = useState<
    "direct" | "fanout" | "topic" | "headers"
  >("topic");
  const [routingKey, setRoutingKey] = useState("order.created.eu");
  const [rate, setRate] = useState(4000);
  const [prefetch, setPrefetch] = useState(16);
  const [durable, setDurable] = useState(true);
  const [persistent, setPersistent] = useState(true);
  const [confirm, setConfirm] = useState(true);
  const [manualAck, setManualAck] = useState(true);
  const [mirrored, setMirrored] = useState(false);
  const [nodeFailure, setNodeFailure] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() =>
    gates.map(() => false),
  );
  function resetExperiment() {
    setNodeIndex(0);
    setExchangeType("topic");
    setRoutingKey("order.created.eu");
    setRate(4000);
    setPrefetch(16);
    setDurable(true);
    setPersistent(true);
    setConfirm(true);
    setManualAck(true);
    setMirrored(false);
    setNodeFailure(false);
    setChecked(() =>
    gates.map(() => false));
  }


  const bindings = ["order.*.eu", "order.created.*", "#", "invoice.#"];
  const matches = bindings.map(
    (binding) =>
      exchangeType === "fanout" ||
      binding === "#" ||
      (exchangeType === "direct"
        ? binding === routingKey
        : routingKey.startsWith(binding.split("*")[0].split("#")[0])),
  );
  const result = useMemo(() => {
    const reliabilityCost =
      (persistent ? 1.45 : 1) * (confirm ? 1.25 : 1) * (mirrored ? 1.55 : 1);
    const capacity = Math.round(
      (18000 * Math.min(1.7, 0.7 + prefetch / 32)) / reliabilityCost,
    );
    const utilization = rate / Math.max(1, capacity);
    const p99 = Math.round(
      5 +
        utilization ** 2 * 75 +
        (persistent ? 12 : 0) +
        (nodeFailure ? 90 : 0),
    );
    const duplicateRisk =
      !confirm || !manualAck || nodeFailure ? "需要幂等对账" : "边界可控";
    const survivesRestart = durable && persistent;
    const survivesNode = !nodeFailure || mirrored;
    return {
      capacity,
      duplicateRisk,
      p99,
      survivesNode,
      survivesRestart,
      utilization,
    };
  }, [
    confirm,
    durable,
    manualAck,
    mirrored,
    nodeFailure,
    persistent,
    prefetch,
    rate,
  ]);

  if (mode === "topology") {
    return (
      <section
        className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        aria-label={unitTitle + "AMQP拓扑实验"}
      >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            RabbitMQ 2.7 AMQP拓扑
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
                  "mb-1 min-h-11 w-full rounded px-2 py-1.5 text-left text-xs " +
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
            <p className="mt-1 text-sm font-semibold">
              {nodes[nodeIndex] ?? unitTitle}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(["direct", "fanout", "topic", "headers"] as const).map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setExchangeType(type)}
                    aria-pressed={exchangeType === type}
                    className={
                      "min-h-11 rounded border px-2 text-xs font-semibold " +
                      (exchangeType === type
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-zinc-300 dark:border-zinc-700")
                    }
                  >
                    {type}
                  </button>
                ),
              )}
            </div>
            <label
              className="mt-4 block text-xs font-semibold"
              htmlFor={id + "-routing"}
            >
              Routing key
              <input
                id={id + "-routing"}
                value={routingKey}
                onChange={(event) => setRoutingKey(event.target.value)}
                className="mt-2 min-h-11 w-full rounded border border-zinc-300 bg-transparent px-3 font-mono dark:border-zinc-700"
              />
            </label>
            <div className="mt-5 grid grid-cols-[minmax(6rem,0.7fr)_minmax(7rem,0.8fr)_minmax(0,1.5fr)] gap-2 text-center text-xs">
              <div className="flex min-h-20 items-center justify-center border border-sky-500 bg-sky-50 p-2 dark:bg-sky-950/30">
                Producer
              </div>
              <div className="flex min-h-20 items-center justify-center border border-emerald-500 bg-emerald-50 p-2 dark:bg-emerald-950/30">
                {exchangeType} exchange
              </div>
              <div className="grid gap-1">
                {bindings.map((binding, index) => (
                  <div
                    key={binding}
                    className={
                      "flex min-h-11 items-center justify-between border px-2 " +
                      (matches[index]
                        ? "border-amber-600 bg-amber-50 dark:bg-amber-950/30"
                        : "border-zinc-300 opacity-60 dark:border-zinc-700")
                    }
                  >
                    <span>{binding}</span>
                    <strong>{matches[index] ? "入队" : "不匹配"}</strong>
                  </div>
                ))}
              </div>
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

  if (mode === "delivery") {
    const toggles = [
      ["durable拓扑", durable, setDurable],
      ["persistent消息", persistent, setPersistent],
      ["publisher confirm", confirm, setConfirm],
      ["manual ack", manualAck, setManualAck],
      ["经典镜像", mirrored, setMirrored],
      ["节点故障", nodeFailure, setNodeFailure],
    ] as const;
    return (
      <section
        className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        aria-label={unitTitle + "交付故障实验"}
      >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
            交付语义与故障窗口
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </header>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {toggles.map(([label, value, setter]) => (
              <button
                key={label}
                type="button"
                onClick={() => setter(!value)}
                aria-pressed={value}
                className={
                  "min-h-11 rounded border px-2 text-xs font-semibold " +
                  (value
                    ? "border-sky-700 bg-sky-700 text-white"
                    : "border-zinc-300 dark:border-zinc-700")
                }
              >
                {label} · {value ? "开" : "关"}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-semibold" htmlFor={id + "-rate"}>
              发布速率：{rate.toLocaleString()}/s
              <input
                id={id + "-rate"}
                type="range"
                min="100"
                max="30000"
                step="100"
                value={rate}
                onChange={(event) => setRate(Number(event.target.value))}
                className="mt-2 w-full accent-sky-600"
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-prefetch"}>
              prefetch：{prefetch}
              <input
                id={id + "-prefetch"}
                type="range"
                min="1"
                max="128"
                value={prefetch}
                onChange={(event) => setPrefetch(Number(event.target.value))}
                className="mt-2 w-full accent-violet-600"
              />
            </label>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-6">
            {[
              ["估算容量", result.capacity + "/s"],
              ["利用率", Math.round(result.utilization * 100) + "%"],
              ["P99", result.p99 + " ms"],
              ["重启存活", result.survivesRestart ? "是" : "否"],
              ["节点故障", result.survivesNode ? "可用" : "中断"],
              ["重复边界", result.duplicateRisk],
            ].map(([label, value]) => (
              <div
                key={label}
                className="min-h-20 border border-zinc-300 p-3 dark:border-zinc-700"
              >
                <p className="text-xs text-zinc-500">{label}</p>
                <p className="mt-2 text-sm font-bold">{value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
            模拟只比较方向；真实结论必须由RabbitMQ
            2.7压测、节点故障和message_id对账支持。
          </p>
        </div>
      </section>
    );
  }

  const score = Math.round(
    (checked.filter(Boolean).length / gates.length) * 100,
  );
  return (
    <section
      className="my-6 rounded-md border border-zinc-300 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={unitTitle + "证据门"}
    >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
            RabbitMQ 2.7证据门
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </div>
        <output className="min-w-16 border border-zinc-300 px-3 py-2 text-center text-lg font-bold dark:border-zinc-700">
          {score}%
        </output>
      </div>
      <div className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {gates.map((gate, index) => (
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
          ? "证据齐全：交给未参与实现的人更换拓扑、负载和故障点独立重放。"
          : "尚未闭环：版本、拓扑、轨迹、指标、故障和对账缺一不可。"}
      </p>
      <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
        交付物：{artifact}
      </p>
    </section>
  );
}
