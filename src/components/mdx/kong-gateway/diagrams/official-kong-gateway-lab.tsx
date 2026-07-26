"use client";

import { useId, useMemo, useState } from "react";

type Mode = "route" | "runtime" | "evidence";
type Props = {
  mode: Mode;
  unitTitle: string;
  focus: string;
  invariant: string;
  artifact: string;
  nodes: readonly string[];
};

const gates = [
  "原书目录、Kong 2.0.5与依赖版本",
  "配置来源、Route、Service、Plugin、Upstream与Target",
  "请求关联ID、匹配、插件阶段、重试与响应轨迹",
  "吞吐、分位延迟、错误率、worker、数据库与上游指标",
  "重载、节点、上游、数据库与外部平台故障",
  "业务对账、恢复、回退、审计与责任人",
] as const;

export function OfficialKongGatewayLab({
  mode,
  unitTitle,
  focus,
  invariant,
  artifact,
  nodes,
}: Props) {
  const id = useId();
  const [nodeIndex, setNodeIndex] = useState(0);
  const [host, setHost] = useState("api.example.test");
  const [requestPath, setRequestPath] = useState("/book/orders/42");
  const [method, setMethod] = useState<"GET" | "POST" | "PUT">("GET");
  const [authenticated, setAuthenticated] = useState(true);
  const [rate, setRate] = useState(4800);
  const [workers, setWorkers] = useState(4);
  const [targets, setTargets] = useState(3);
  const [dbLess, setDbLess] = useState(false);
  const [activeHealth, setActiveHealth] = useState(true);
  const [pluginTrace, setPluginTrace] = useState(true);
  const [nodeFailure, setNodeFailure] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() =>
    gates.map(() => false),
  );
  function resetExperiment() {
    setNodeIndex(0);
    setHost("api.example.test");
    setRequestPath("/book/orders/42");
    setMethod("GET");
    setAuthenticated(true);
    setRate(4800);
    setWorkers(4);
    setTargets(3);
    setDbLess(false);
    setActiveHealth(true);
    setPluginTrace(true);
    setNodeFailure(false);
    setChecked(() =>
    gates.map(() => false));
  }


  const route =
    host === "api.example.test" && requestPath.startsWith("/book")
      ? "book-route"
      : requestPath.startsWith("/health")
        ? "health-route"
        : "fallback-route";
  const denied = !authenticated && route !== "health-route";
  const result = useMemo(() => {
    const healthyTargets = Math.max(0, targets - (nodeFailure ? 1 : 0));
    const pluginCost = pluginTrace ? 0.82 : 1;
    const capacity = Math.round(
      workers * 2100 * Math.max(1, healthyTargets) * pluginCost,
    );
    const utilization = rate / Math.max(1, capacity);
    const p99 = Math.round(
      7 + utilization ** 2 * 110 + (nodeFailure ? 75 : 0) + (!dbLess ? 9 : 0),
    );
    return {
      capacity,
      healthyTargets,
      p99,
      utilization,
      available: healthyTargets > 0 && (!nodeFailure || activeHealth),
    };
  }, [activeHealth, dbLess, nodeFailure, pluginTrace, rate, targets, workers]);

  if (mode === "route") {
    return (
      <section
        className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        aria-label={unitTitle + "路由实验"}
      >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            Kong 2.0.5请求路径
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
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-semibold" htmlFor={id + "-host"}>
                Host
                <input
                  id={id + "-host"}
                  value={host}
                  onChange={(event) => setHost(event.target.value)}
                  className="mt-1 min-h-11 w-full rounded border border-zinc-300 bg-transparent px-3 font-mono dark:border-zinc-700"
                />
              </label>
              <label className="text-xs font-semibold" htmlFor={id + "-path"}>
                Path
                <input
                  id={id + "-path"}
                  value={requestPath}
                  onChange={(event) => setRequestPath(event.target.value)}
                  className="mt-1 min-h-11 w-full rounded border border-zinc-300 bg-transparent px-3 font-mono dark:border-zinc-700"
                />
              </label>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {(["GET", "POST", "PUT"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMethod(value)}
                  aria-pressed={method === value}
                  className={
                    "min-h-11 rounded border text-xs font-semibold " +
                    (method === value
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-zinc-300 dark:border-zinc-700")
                  }
                >
                  {value}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setAuthenticated((value) => !value)}
                aria-pressed={authenticated}
                className={
                  "min-h-11 rounded border text-xs font-semibold " +
                  (authenticated
                    ? "border-sky-700 bg-sky-700 text-white"
                    : "border-zinc-300 dark:border-zinc-700")
                }
              >
                {authenticated ? "已认证" : "匿名"}
              </button>
            </div>
            <div className="mt-5 grid grid-cols-[minmax(5rem,0.7fr)_minmax(6rem,0.9fr)_minmax(6rem,0.9fr)_minmax(5rem,0.7fr)] gap-2 text-center text-xs">
              {[
                method + " Client",
                route,
                denied ? "Auth拒绝" : "Plugin链",
                denied ? "401" : "Target",
              ].map((label, index) => (
                <div
                  key={label + index}
                  className={
                    "flex min-h-20 items-center justify-center border p-2 " +
                    (denied && index >= 2
                      ? "border-rose-500 bg-rose-50 dark:bg-rose-950/30"
                      : "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30")
                  }
                >
                  {label}
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

  if (mode === "runtime") {
    const toggles: Array<[string, boolean, (next: boolean) => void]> = [
      ["DB-less", dbLess, setDbLess],
      ["主动健康检查", activeHealth, setActiveHealth],
      ["插件追踪", pluginTrace, setPluginTrace],
      ["节点故障", nodeFailure, setNodeFailure],
    ];
    return (
      <section
        className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        aria-label={unitTitle + "运行实验"}
      >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
            容量、部署与故障窗口
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </header>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
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
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="text-xs font-semibold" htmlFor={id + "-rate"}>
              请求速率：{rate.toLocaleString()}/s
              <input
                id={id + "-rate"}
                type="range"
                min="100"
                max="40000"
                step="100"
                value={rate}
                onChange={(event) => setRate(Number(event.target.value))}
                className="mt-2 w-full accent-sky-600"
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-workers"}>
              worker：{workers}
              <input
                id={id + "-workers"}
                type="range"
                min="1"
                max="16"
                value={workers}
                onChange={(event) => setWorkers(Number(event.target.value))}
                className="mt-2 w-full accent-emerald-600"
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-targets"}>
              Target：{targets}
              <input
                id={id + "-targets"}
                type="range"
                min="1"
                max="12"
                value={targets}
                onChange={(event) => setTargets(Number(event.target.value))}
                className="mt-2 w-full accent-amber-600"
              />
            </label>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-5">
            {[
              ["估算容量", result.capacity + "/s"],
              ["利用率", Math.round(result.utilization * 100) + "%"],
              ["P99", result.p99 + " ms"],
              ["健康Target", result.healthyTargets],
              ["代理状态", result.available ? "可用" : "中断"],
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
            模拟只用于形成预测；真实结论必须由Kong
            2.0.5压测、故障注入和业务对账支持。
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
            Kong 2.0.5证据门
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
                current.map((value, item) => (item === index ? !value : value)),
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
