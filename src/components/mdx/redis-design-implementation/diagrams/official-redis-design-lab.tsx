"use client";

import { useId, useMemo, useState } from "react";

type Mode = "structure" | "trace" | "evidence";

type Props = {
  mode: Mode;
  unitTitle: string;
  focus: string;
  invariant: string;
  artifact: string;
  nodes: string[];
};

const encodings = [
  { label: "SDS", structure: "sdshdr + buf", overhead: 9, lookup: "O(1)长度" },
  {
    label: "字典",
    structure: "dict + 两张哈希表",
    overhead: 28,
    lookup: "均摊O(1)",
  },
  {
    label: "跳跃表",
    structure: "zskiplist + 多层forward",
    overhead: 36,
    lookup: "平均O(log N)",
  },
  {
    label: "压缩列表",
    structure: "连续字节 + 变长节点",
    overhead: 4,
    lookup: "O(N)遍历",
  },
] as const;

const persistenceModes = [
  { label: "仅内存", writeCost: 1, lossWindow: "进程生命周期", recovery: 2 },
  { label: "RDB", writeCost: 1.15, lossWindow: "最近快照间隔", recovery: 18 },
  { label: "AOF everysec", writeCost: 1.55, lossWindow: "约1秒", recovery: 42 },
  { label: "AOF always", writeCost: 3.2, lossWindow: "单次写入", recovery: 48 },
] as const;

const gates = [
  "Redis 3.0版本与目录节点",
  "输入命令、键分布与对象编码",
  "函数、结构与事件循环轨迹",
  "内存、延迟、fork与I/O证据",
  "崩溃、断线、重试和切换反例",
  "数据对账、恢复、回退与责任人",
] as const;

export function OfficialRedisDesignLab({
  mode,
  unitTitle,
  focus,
  invariant,
  artifact,
  nodes,
}: Props) {
  const id = useId();
  const [nodeIndex, setNodeIndex] = useState(0);
  const [encodingIndex, setEncodingIndex] = useState(1);
  const [persistenceIndex, setPersistenceIndex] = useState(2);
  const [keyExponent, setKeyExponent] = useState(5);
  const [commandsPerSecond, setCommandsPerSecond] = useState(5000);
  const [payloadBytes, setPayloadBytes] = useState(256);
  const [forking, setForking] = useState(false);
  const [networkFault, setNetworkFault] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() =>
    gates.map(() => false),
  );

  const selectedNode = nodes[nodeIndex] ?? unitTitle;
  const encoding = encodings[encodingIndex];
  const persistence = persistenceModes[persistenceIndex];
  const checkedCount = checked.filter(Boolean).length;

  const estimate = useMemo(() => {
    const keys = 10 ** keyExponent;
    const memoryMiB =
      (keys * (payloadBytes + encoding.overhead + 48)) / 1024 ** 2;
    const saturation = commandsPerSecond / 25000;
    const forkPenalty = forking ? Math.max(8, memoryMiB / 180) : 0;
    const networkPenalty = networkFault ? 85 : 0;
    const p99 = Math.round(
      1 +
        saturation ** 2 * 35 * persistence.writeCost +
        forkPenalty +
        networkPenalty,
    );
    const backlog = Math.round(
      Math.max(0, commandsPerSecond - 18000 / persistence.writeCost) * 0.8,
    );
    return { backlog, keys, memoryMiB, p99 };
  }, [
    commandsPerSecond,
    encoding.overhead,
    forking,
    keyExponent,
    networkFault,
    payloadBytes,
    persistence.writeCost,
  ]);

  if (mode === "structure") {
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            Redis 3.0结构与编码观察器
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
          <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {focus}
          </p>
        </header>

        <div className="grid min-h-80 lg:grid-cols-[minmax(14rem,0.78fr)_minmax(0,1.35fr)]">
          <div className="max-h-96 overflow-auto border-b border-zinc-200 p-3 lg:border-b-0 lg:border-r dark:border-zinc-800">
            <p className="mb-2 text-xs font-semibold text-zinc-500">
              正式目录节点 · {nodeIndex + 1}/{nodes.length}
            </p>
            {nodes.map((node, index) => (
              <button
                key={`${node}-${index}`}
                type="button"
                onClick={() => setNodeIndex(index)}
                className={
                  "mb-1 min-h-9 w-full rounded px-2 py-1.5 text-left text-xs transition-colors " +
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
            <p className="text-xs text-zinc-500">当前源码问题</p>
            <p className="mt-1 text-sm font-semibold">{selectedNode}</p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {encodings.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setEncodingIndex(index)}
                  className={
                    "min-h-11 rounded border px-2 py-2 text-xs font-medium " +
                    (index === encodingIndex
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-zinc-300 dark:border-zinc-700")
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-[minmax(5rem,0.6fr)_minmax(0,1fr)_minmax(5rem,0.7fr)] gap-2 text-center text-xs">
              <div className="border border-zinc-300 p-3 dark:border-zinc-700">
                <span className="text-zinc-500">redisObject</span>
                <strong className="mt-2 block">type + encoding</strong>
              </div>
              <div className="border border-emerald-500 bg-emerald-50 p-3 dark:bg-emerald-950/30">
                <span className="text-zinc-500">ptr</span>
                <strong className="mt-2 block">{encoding.structure}</strong>
              </div>
              <div className="border border-sky-500 bg-sky-50 p-3 dark:bg-sky-950/30">
                <span className="text-zinc-500">访问</span>
                <strong className="mt-2 block">{encoding.lookup}</strong>
              </div>
            </div>

            <p className="mt-4 border-l-4 border-emerald-500 bg-emerald-50 p-3 text-xs leading-5 dark:bg-emerald-950/30">
              <span className="font-semibold">验收不变量：</span>
              {invariant}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "trace") {
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
            命令、事件循环与持久化轨迹
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </header>

        <div className="p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {persistenceModes.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setPersistenceIndex(index)}
                className={
                  "min-h-11 rounded border px-2 py-2 text-xs font-medium " +
                  (index === persistenceIndex
                    ? "border-sky-600 bg-sky-600 text-white"
                    : "border-zinc-300 dark:border-zinc-700")
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="text-xs font-semibold" htmlFor={id + "-keys"}>
              键数量：10^{keyExponent}
              <input
                id={id + "-keys"}
                type="range"
                min={3}
                max={7}
                step={1}
                value={keyExponent}
                onChange={(event) => setKeyExponent(Number(event.target.value))}
                className="mt-2 block w-full accent-sky-600"
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-qps"}>
              命令率：{commandsPerSecond.toLocaleString()}/s
              <input
                id={id + "-qps"}
                type="range"
                min={100}
                max={40000}
                step={100}
                value={commandsPerSecond}
                onChange={(event) =>
                  setCommandsPerSecond(Number(event.target.value))
                }
                className="mt-2 block w-full accent-sky-600"
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-payload"}>
              值大小：{payloadBytes} B
              <input
                id={id + "-payload"}
                type="range"
                min={16}
                max={4096}
                step={16}
                value={payloadBytes}
                onChange={(event) =>
                  setPayloadBytes(Number(event.target.value))
                }
                className="mt-2 block w-full accent-sky-600"
              />
            </label>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <label className="flex min-h-11 items-center gap-3 rounded border border-zinc-300 px-3 text-xs font-medium dark:border-zinc-700">
              <input
                type="checkbox"
                checked={forking}
                onChange={(event) => setForking(event.target.checked)}
                className="h-4 w-4 accent-amber-600"
              />
              注入BGSAVE/AOF重写fork
            </label>
            <label className="flex min-h-11 items-center gap-3 rounded border border-zinc-300 px-3 text-xs font-medium dark:border-zinc-700">
              <input
                type="checkbox"
                checked={networkFault}
                onChange={(event) => setNetworkFault(event.target.checked)}
                className="h-4 w-4 accent-rose-600"
              />
              注入复制或客户端断线
            </label>
          </div>

          <div className="mt-5 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
            {[
              ["内存模型", `${estimate.memoryMiB.toFixed(1)} MiB`],
              ["P99模型", `${estimate.p99} ms`],
              ["事件积压", estimate.backlog.toLocaleString()],
              ["崩溃丢失窗口", persistence.lossWindow],
            ].map(([label, value]) => (
              <div
                key={label}
                className="min-h-20 bg-white p-3 dark:bg-zinc-950"
              >
                <p className="text-xs text-zinc-500">{label}</p>
                <p className="mt-2 text-base font-semibold tabular-nums">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
            数值用于预测趋势，不替代Redis
            3.0源码、INFO、延迟监控、AOF/RDB校验和业务对账。恢复时间参考系数为
            {persistence.recovery}，必须在固定数据集上实测。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
          源码与运行证据门
        </p>
        <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {artifact}
        </p>
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.62fr)]">
        <div className="grid gap-2 sm:grid-cols-2">
          {gates.map((gate, index) => (
            <label
              key={gate}
              className="flex min-h-12 items-center gap-3 rounded border border-zinc-300 px-3 text-xs font-medium dark:border-zinc-700"
            >
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={(event) =>
                  setChecked((current) =>
                    current.map((value, itemIndex) =>
                      itemIndex === index ? event.target.checked : value,
                    ),
                  )
                }
                className="h-4 w-4 accent-amber-600"
              />
              {gate}
            </label>
          ))}
        </div>

        <div
          className={
            "rounded border p-4 " +
            (checkedCount === gates.length
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
              : "border-amber-500 bg-amber-50 dark:bg-amber-950/30")
          }
          aria-live="polite"
        >
          <p className="text-xs font-semibold">证据进度</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums">
            {checkedCount}/{gates.length}
          </p>
          <p className="mt-3 text-xs leading-5">
            {checkedCount === gates.length
              ? "材料足以交给另一位工程师在Redis 3.0基线复跑。"
              : "缺失证据时只能保留为源码阅读假设，不能宣布性能、持久性或故障转移结论成立。"}
          </p>
        </div>
      </div>
    </section>
  );
}
