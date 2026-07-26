"use client";

import { useId, useMemo, useState } from "react";

type Mode = "object" | "reconcile" | "evidence";
type Props = {
  mode: Mode;
  unitTitle: string;
  focus: string;
  invariant: string;
  artifact: string;
  nodes: readonly string[];
};
const gates = [
  "第1版目录、客户端、API服务器与运行时版本",
  "清单、UID、resourceVersion、ownerReference、spec与status",
  "API、watch、控制器、调度器、kubelet与事件轨迹",
  "期望、当前、就绪、重启、Pending、吞吐与尾延迟",
  "Pod、节点、网络、存储、控制面与权限故障",
  "业务对账、恢复、回退、审计与责任人",
] as const;

export function OfficialKubernetesActionLab({
  mode,
  unitTitle,
  focus,
  invariant,
  artifact,
  nodes,
}: Props) {
  const id = useId();
  const [nodeIndex, setNodeIndex] = useState(0);
  const [desired, setDesired] = useState(3);
  const [current, setCurrent] = useState(2);
  const [ready, setReady] = useState(1);
  const [load, setLoad] = useState(1800);
  const [cpuRequest, setCpuRequest] = useState(250);
  const [cpuLimit, setCpuLimit] = useState(500);
  const [nodesCount, setNodesCount] = useState(3);
  const [probeFailure, setProbeFailure] = useState(false);
  const [nodeFailure, setNodeFailure] = useState(false);
  const [networkPolicy, setNetworkPolicy] = useState(true);
  const [checked, setChecked] = useState<boolean[]>(() =>
    gates.map(() => false),
  );
  function resetExperiment() {
    setNodeIndex(0);
    setDesired(3);
    setCurrent(2);
    setReady(1);
    setLoad(1800);
    setCpuRequest(250);
    setCpuLimit(500);
    setNodesCount(3);
    setProbeFailure(false);
    setNodeFailure(false);
    setNetworkPolicy(true);
    setChecked(() =>
    gates.map(() => false));
  }

  const result = useMemo(() => {
    const activeNodes = Math.max(0, nodesCount - (nodeFailure ? 1 : 0));
    const schedulable = Math.min(
      desired,
      activeNodes * Math.max(1, Math.floor(2000 / Math.max(1, cpuRequest))),
    );
    const available = Math.max(
      0,
      Math.min(schedulable, desired) - (probeFailure ? 1 : 0),
    );
    const capacity = Math.round(available * Math.max(100, cpuLimit) * 4.2);
    const utilization = load / Math.max(1, capacity);
    const p99 = Math.round(
      8 +
        utilization ** 2 * 140 +
        (nodeFailure ? 90 : 0) +
        (probeFailure ? 55 : 0),
    );
    return {
      activeNodes,
      available,
      capacity,
      p99,
      pending: Math.max(0, desired - schedulable),
      utilization,
    };
  }, [
    cpuLimit,
    cpuRequest,
    desired,
    load,
    nodeFailure,
    nodesCount,
    probeFailure,
  ]);

  if (mode === "object") {
    const replicaControls: Array<[string, number, (next: number) => void]> = [
      ["期望副本", desired, (next) => setDesired(next)],
      ["当前副本", current, (next) => setCurrent(next)],
      ["就绪副本", ready, (next) => setReady(next)],
    ];

    return (
      <section
        className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        aria-label={unitTitle + "对象实验"}
      >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            Kubernetes 1.8对象与控制循环
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
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {replicaControls.map(([label, value, setter]) => (
                <label key={String(label)} className="text-xs font-semibold">
                  {label}
                  <input
                    type="number"
                    min="0"
                    max="12"
                    value={Number(value)}
                    onChange={(event) => setter(Number(event.target.value))}
                    className="mt-1 min-h-11 w-full rounded border border-zinc-300 bg-transparent px-3 dark:border-zinc-700"
                  />
                </label>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs sm:grid-cols-6">
              {[
                "kubectl",
                "API Server",
                "etcd",
                "Controller",
                current < desired ? "Scheduler" : "Watch",
                ready < current ? "Kubelet/Probe" : "Ready",
              ].map((label, index) => (
                <div
                  key={label}
                  className={
                    "flex min-h-16 items-center justify-center border p-2 " +
                    (index >= 3 && ready < desired
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                      : "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30")
                  }
                >
                  {label}
                </div>
              ))}
            </div>
            <p className="mt-4 border-l-4 border-emerald-600 bg-emerald-50 p-3 text-xs leading-5 dark:bg-emerald-950/30">
              <strong>状态差：</strong>desired={desired}，current={current}
              ，ready={ready}。<br />
              <strong>验收：</strong>
              {invariant}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "reconcile") {
    const toggles: Array<[string, boolean, (next: boolean) => void]> = [
      ["探针失败", probeFailure, setProbeFailure],
      ["节点故障", nodeFailure, setNodeFailure],
      ["NetworkPolicy", networkPolicy, setNetworkPolicy],
    ];
    return (
      <section
        className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        aria-label={unitTitle + "调谐实验"}
      >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
            资源、调谐与故障窗口
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </header>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2">
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
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-xs font-semibold" htmlFor={id + "-load"}>
              请求速率：{load}/s
              <input
                id={id + "-load"}
                type="range"
                min="100"
                max="20000"
                step="100"
                value={load}
                onChange={(event) => setLoad(Number(event.target.value))}
                className="mt-2 w-full accent-sky-600"
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-request"}>
              CPU request：{cpuRequest}m
              <input
                id={id + "-request"}
                type="range"
                min="50"
                max="2000"
                step="50"
                value={cpuRequest}
                onChange={(event) => setCpuRequest(Number(event.target.value))}
                className="mt-2 w-full accent-emerald-600"
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-limit"}>
              CPU limit：{cpuLimit}m
              <input
                id={id + "-limit"}
                type="range"
                min="100"
                max="4000"
                step="100"
                value={cpuLimit}
                onChange={(event) => setCpuLimit(Number(event.target.value))}
                className="mt-2 w-full accent-amber-600"
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-nodes"}>
              节点：{nodesCount}
              <input
                id={id + "-nodes"}
                type="range"
                min="1"
                max="10"
                value={nodesCount}
                onChange={(event) => setNodesCount(Number(event.target.value))}
                className="mt-2 w-full accent-violet-600"
              />
            </label>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-6">
            {[
              ["活动节点", result.activeNodes],
              ["可用副本", result.available],
              ["Pending", result.pending],
              ["估算容量", result.capacity + "/s"],
              ["利用率", Math.round(result.utilization * 100) + "%"],
              ["P99", result.p99 + " ms"],
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
            模拟只用于形成预测；真实结论必须由Kubernetes
            1.8对象、事件、压测、故障注入和业务对账支持。
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
            Kubernetes 1.8证据门
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
              setChecked((values) =>
                values.map((value, item) => (item === index ? !value : value)),
              )
            }
            aria-pressed={checked[index]}
            className="flex min-h-11 w-full items-center gap-3 px-2 text-left text-xs"
          >
            <span
              className={
                "flex size-5 shrink-0 items-center justify-center border " +
                (checked[index]
                  ? "border-emerald-700 bg-emerald-700 text-white"
                  : "border-zinc-400")
              }
            >
              {checked[index] ? "✓" : ""}
            </span>
            <span>{gate}</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5">
        <strong>交付物：</strong>
        {artifact}
      </p>
      <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
        低于100%只表示形成假设，不表示可以交接。
      </p>
    </section>
  );
}
