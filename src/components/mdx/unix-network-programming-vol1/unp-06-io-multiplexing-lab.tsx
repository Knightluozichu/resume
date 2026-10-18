"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useTeachingTimeline } from "../anim/use-teaching-timeline";
import { TimelineControls, TEACHING_BEAT_MS } from "../anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
} as const;

export type Scenario =
  | "split"
  | "both"
  | "eof"
  | "idle"
  | "eintr"
  | "race"
  | "batch";
export type Parameters = {
  scenario: Scenario;
  timeout: "block" | "finite" | "zero";
  fault: "none" | "reuse" | "nfds";
};
export const DEFAULT_PARAMETERS: Parameters = {
  scenario: "split",
  timeout: "block",
  fault: "none",
};
const SCENARIOS: [Scenario, string][] = [
  ["split", "分片：AB，再到 C\\n"],
  ["both", "两路同时可读"],
  ["eof", "AB 后收到 FIN（无换行）"],
  ["idle", "两轮均无事件"],
  ["eintr", "第一轮被信号中断"],
  ["race", "就绪后被其他读者取走"],
  ["batch", "stdin EOF，继续接收回射"],
];
const STAGES = [
  "登记兴趣",
  "第一次 select",
  "第一次 read",
  "重建集合",
  "第二次 select",
  "第二次 read",
  "检查消息与收尾",
];

type Event = { stdin: boolean; bytes: string; fin: boolean; signal: boolean };
function events(s: Scenario): [Event, Event] {
  const empty: Event = { stdin: false, bytes: "", fin: false, signal: false };
  switch (s) {
    case "split":
      return [
        { ...empty, bytes: "AB" },
        { ...empty, bytes: "C\n" },
      ];
    case "both":
      return [
        { ...empty, stdin: true, bytes: "AB" },
        { ...empty, bytes: "C\n" },
      ];
    case "eof":
      return [
        { ...empty, bytes: "AB", fin: true },
        { ...empty, fin: true },
      ];
    case "idle":
      return [empty, empty];
    case "eintr":
      return [
        { ...empty, signal: true },
        { ...empty, bytes: "AB" },
      ];
    case "race":
      return [
        { ...empty, bytes: "AB" },
        { ...empty, bytes: "AB" },
      ];
    case "batch":
      return [
        { ...empty, stdin: true },
        { ...empty, bytes: "OK\n", fin: true },
      ];
  }
}

/** 教学 oracle：只有 readfds；每次正长度 read 最多 4 字节，换行才构成完整帧。 */
export function multiplexingSnapshot(p: Parameters, frame: number) {
  const [first, second] = events(p.scenario);
  const nfds = p.fault === "nfds" ? 3 : 4;
  const select = (event: Event, interest: number[]) => {
    if (event.signal)
      return {
        result: "-1 / EINTR",
        ready: [] as number[],
        returned: true,
        valid: false,
      };
    const ready = interest.filter(
      (fd) =>
        fd < nfds &&
        (fd === 0 ? event.stdin : event.bytes.length > 0 || event.fin),
    );
    if (ready.length)
      return {
        result: String(ready.length),
        ready,
        returned: true,
        valid: true,
      };
    if (p.timeout === "block")
      return {
        result: "等待中（未返回）",
        ready,
        returned: false,
        valid: false,
      };
    return { result: "0", ready, returned: true, valid: true };
  };
  const a = select(first, [0, 3]);
  const firstRead =
    a.ready.includes(3) && p.scenario !== "race" ? first.bytes : "";
  const halfClosed = p.scenario === "batch" && a.ready.includes(0);
  // EINTR 后不得解释结果集合；即使开启故障也重建，避免把未指定结果编造成空集。
  const interest2 = (p.fault === "reuse" && a.valid ? a.ready : [0, 3]).filter(
    (fd) => !(halfClosed && fd === 0),
  );
  const nextEvent = {
    ...second,
    bytes: (a.ready.includes(3) ? "" : first.bytes) + second.bytes,
    fin: first.fin || second.fin,
  };
  const b = a.returned ? select(nextEvent, interest2) : { ...a };
  const inSecond = frame >= 3 && a.returned;
  const call = inSecond ? b : a;
  const event = inSecond ? nextEvent : first;
  const didRead = inSecond
    ? frame >= 5 && b.returned
    : frame >= 2 && a.returned;
  const readBytes = inSecond
    ? b.ready.includes(3)
      ? nextEvent.bytes.slice(0, 4)
      : ""
    : firstRead;
  const eof = didRead && call.ready.includes(3) && event.fin && !event.bytes;
  const raced =
    !inSecond && p.scenario === "race" && didRead && call.ready.includes(3);
  const appBytes =
    (frame >= 2 ? firstRead : "") + (inSecond && frame >= 5 ? readBytes : "");
  const queue = raced
    ? ""
    : didRead && call.ready.includes(3)
      ? event.bytes.slice(readBytes.length)
      : event.bytes;
  const selected = inSecond ? frame >= 4 : frame >= 1;
  const result = selected ? call.result : "尚未调用";
  const ready = selected && call.valid ? call.ready : [];
  const read = !didRead
    ? "尚未读取"
    : !call.valid
      ? "不读取：EINTR / 等待中"
      : raced
        ? "-1 / EAGAIN（非阻塞防线）"
        : eof
          ? "0：对端有序 EOF"
          : readBytes
            ? `${readBytes.length} 字节（短读合法）`
            : "无 socket 就绪位，不读 socket";
  return {
    nfds,
    interest: inSecond ? interest2 : [0, 3],
    ready,
    result,
    read,
    queue: frame === 0 ? "" : queue,
    appBytes,
    completeFrames: appBytes.split("\n").length - 1,
    eof,
    halfClosed: frame >= 2 && halfClosed,
    fin: frame >= 1 && event.fin,
    round: inSecond ? 2 : 1,
    selected,
    valid: selected && call.valid,
    pending: selected && !call.returned,
    firstResult: a.result,
    secondResult: b.result,
    interest2,
  };
}

const control =
  "min-h-11 min-w-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary";

export function UnpIoMultiplexingLab() {
  const id = useId().replace(/:/g, "");
  const [parameters, setParameters] = useState<Parameters>({
    ...DEFAULT_PARAMETERS,
  });
  // A blocking select has no later read frame. Truncate the teaching clock,
  // rather than fabricating a return when the user drags past the wait.
  const steps = useMemo(() => {
    const start = multiplexingSnapshot(parameters, 1);
    const next = multiplexingSnapshot(parameters, 4);
    const count = start.pending ? 2 : next.pending ? 5 : STAGES.length;
    return STAGES.slice(0, count).map((label) => ({ label }));
  }, [parameters]);
  const timeline = useTeachingTimeline({
    steps,
    build(tl) {
      const clock = { beat: 0 };
      steps.forEach((step, index) => {
        const at = index * TEACHING_BEAT_MS;
        tl.label(step.label, at);
        tl.add(
          clock,
          { beat: index + 1, duration: TEACHING_BEAT_MS, ease: "linear" },
          at,
        );
      });
    },
  });
  const frame = Math.min(timeline.currentStep, steps.length - 1);
  const reduced = timeline.reducedMotion;
  const state = multiplexingSnapshot(parameters, frame);
  const auto = timeline.isPlaying;

  // The shared hook owns/cancels the anime clock. Also stop immediately if the
  // OS preference changes during playback; removing the preference never plays.
  const { pause } = timeline;
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopOnReduce = () => {
      if (query.matches) pause();
    };
    stopOnReduce();
    query.addEventListener("change", stopOnReduce);
    return () => query.removeEventListener("change", stopOnReduce);
  }, [pause]);

  function change(next: Parameters) {
    timeline.pause();
    timeline.goToStep(0);
    setParameters(next);
  }
  function reset() {
    change({ ...DEFAULT_PARAMETERS });
  }

  return (
    <figure
      className="not-prose my-8 min-w-0 rounded-card border border-border bg-elevated p-3 sm:p-5"
      data-visual-kind="unp-06-select-loop"
      data-reduced-motion={String(reduced)}
    >
      <figcaption className="mb-4">
        <h3 className="text-lg font-semibold text-primary">
          两轮 select：位图不是消息边界
        </h3>
        <p className="mt-2 text-sm text-secondary">
          教学模型，不执行真实网络。fd 0 是标准输入，fd 3 是 TCP；正长度 read
          最多取 4
          字节。观察位图、扫描上界和字节搬运，而非把播放速度当作网络时钟。
        </p>
      </figcaption>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="grid gap-1 text-sm text-primary">
          输入情景
          <select
            className={control}
            value={parameters.scenario}
            onChange={(e) =>
              change({ ...parameters, scenario: e.target.value as Scenario })
            }
          >
            {SCENARIOS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm text-primary">
          等待方式
          <select
            className={control}
            value={parameters.timeout}
            onChange={(e) =>
              change({
                ...parameters,
                timeout: e.target.value as Parameters["timeout"],
              })
            }
          >
            <option value="block">NULL：无限等待</option>
            <option value="finite">2 秒：无事件返回 0</option>
            <option value="zero">零 timeval：立即检查</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm text-primary">
          错误模式
          <select
            className={control}
            value={parameters.fault}
            onChange={(e) =>
              change({
                ...parameters,
                fault: e.target.value as Parameters["fault"],
              })
            }
          >
            <option value="none">正确：每轮复制 master</option>
            <option value="reuse">错误：复用返回集合</option>
            <option value="nfds">错误：nfds 写成 3</option>
          </select>
        </label>
      </div>
      <p className="my-3 text-sm text-secondary">
        窄屏按位图、字节搬运、连接方向纵向阅读，无需横滚核心读数。深色实心位 =
        1，虚线位 = 0，红线是扫描上界。
        图示为逻辑集合而非内存布局；“—”表示未调用、无有效结果或未扫描，不解读为零。
      </p>
      <div
        className="grid min-w-0 gap-4"
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
        }}
      >
        <div className="min-w-0 rounded-control border border-border p-2">
          <svg
            viewBox="0 0 260 205"
            className="mx-auto block h-auto w-full max-w-[400px]"
            role="img"
            aria-labelledby={`${id}-bits-title ${id}-bits-desc`}
          >
            <title id={`${id}-bits-title`}>
              {`第 ${state.round} 轮 fd_set 输入与输出`}
            </title>
            <desc id={`${id}-bits-desc`}>
              兴趣 {state.interest.join(",")}；就绪{" "}
              {state.ready.join(",") || "无"}；nfds={state.nfds}
              。红线右侧不扫描。
            </desc>
            <text x="8" y="22" fontSize="15" fill={C.primary}>
              fd_set · nfds={state.nfds} · 第 {state.round} 轮
            </text>
            {[
              { label: "输入：本轮兴趣", bits: state.interest, y: 76 },
              {
                label: state.valid ? "输出：就绪集合" : "输出：未使用",
                bits: state.ready,
                y: 147,
              },
            ].map((row) => (
              <g key={row.label}>
                <text x="8" y={row.y - 25} fontSize="14" fill={C.primary}>
                  {row.label}
                </text>
                {[0, 1, 2, 3, 4, 5].map((fd) => (
                  <g key={fd}>
                    <rect
                      x={12 + fd * 40}
                      y={row.y}
                      width="32"
                      height="30"
                      rx="3"
                      fill={row.bits.includes(fd) ? C.accent : C.bg}
                      stroke={C.primary}
                      strokeDasharray={
                        row.bits.includes(fd) ? undefined : "4 3"
                      }
                    />
                    <text
                      x={28 + fd * 40}
                      y={row.y + 21}
                      textAnchor="middle"
                      fontSize="16"
                      fill={row.bits.includes(fd) ? C.bg : C.primary}
                    >
                      {row.y === 147 && (!state.valid || fd >= state.nfds)
                        ? "—"
                        : row.bits.includes(fd)
                          ? 1
                          : 0}
                    </text>
                    {row.y === 76 && (
                      <text
                        x={28 + fd * 40}
                        y="69"
                        textAnchor="middle"
                        fontSize="14"
                        fill={C.secondary}
                      >
                        {fd}
                      </text>
                    )}
                  </g>
                ))}
              </g>
            ))}
            <line
              x1={8 + state.nfds * 40}
              x2={8 + state.nfds * 40}
              y1="55"
              y2="181"
              stroke={C.danger}
              strokeWidth="3"
            />
            <text x="8" y="199" fontSize="14" fill={C.danger}>
              列号 = fd；只扫描 fd &lt; nfds
            </text>
          </svg>
          <p className="mt-2 break-words text-sm text-primary">
            select → {state.result}
          </p>
          <p className="mt-1 break-words text-sm text-secondary">
            read(fd 3) → {state.read}
          </p>
        </div>
        <div className="min-w-0 rounded-control border border-border p-2">
          <svg
            viewBox="0 0 260 250"
            className="mx-auto block h-auto w-full max-w-[400px]"
            role="img"
            aria-labelledby={`${id}-bytes-title ${id}-bytes-desc`}
          >
            <title id={`${id}-bytes-title`}>从内核字节队列搬运到应用组帧</title>
            <desc id={`${id}-bytes-desc`}>
              内核 {state.queue.length} 字节；应用 {state.appBytes.length}{" "}
              字节；完整行 {state.completeFrames}
              。read搬运字节，不创建消息边界。
            </desc>
            <defs>
              <marker
                id={`${id}-move`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={C.accent} />
              </marker>
            </defs>
            {[
              { label: "内核接收队列", bytes: state.queue, y: 45 },
              { label: "应用组帧缓冲", bytes: state.appBytes, y: 166 },
            ].map((row) => (
              <g key={row.label}>
                <text x="8" y={row.y - 15} fontSize="14" fill={C.primary}>
                  {row.label} · {row.bytes.length} 字节
                </text>
                {[0, 1, 2, 3].map((i) => (
                  <g key={i}>
                    <rect
                      x={10 + i * 60}
                      y={row.y}
                      width="48"
                      height="40"
                      fill={row.bytes[i] ? C.elevated : C.bg}
                      stroke={row.bytes[i] ? C.accent : C.border}
                      strokeWidth="2"
                    />
                    <text
                      x={34 + i * 60}
                      y={row.y + 27}
                      textAnchor="middle"
                      fontSize="17"
                      fill={C.primary}
                    >
                      {row.bytes[i] === "\n" ? "\\n" : row.bytes[i] || "·"}
                    </text>
                  </g>
                ))}
              </g>
            ))}
            <path
              d="M 130 91 L 130 133"
              stroke={C.accent}
              strokeWidth={state.appBytes.length ? 4 : 2}
              markerEnd={`url(#${id}-move)`}
            />
            <text x="145" y="118" fontSize="14" fill={C.primary}>
              read 搬运
            </text>
            <text
              x="8"
              y="235"
              fontSize="14"
              fill={state.completeFrames ? C.success : C.primary}
            >
              完整行 = {state.completeFrames} · 以换行分帧
            </text>
          </svg>
          <p className="mt-2 text-sm text-secondary">
            FIN：{state.fin ? "已到达；先取完排队数据" : "尚未到达"}。
            {state.eof && !state.completeFrames
              ? "EOF 留下未完整行，不补造换行。"
              : "一个就绪位不是一条完整消息。"}
          </p>
        </div>
        <div className="min-w-0 rounded-control border border-border p-2">
          <svg
            viewBox="0 0 260 145"
            className="mx-auto block h-auto w-full max-w-[400px]"
            role="img"
            aria-labelledby={`${id}-directions-title`}
          >
            <title
              id={`${id}-directions-title`}
            >{`TCP 双向连接：写方向${state.halfClosed ? "关闭" : "开启"}，读方向${state.eof ? "已观测EOF" : "继续接收"}`}</title>
            <defs>
              <marker
                id={`${id}-direction`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={C.accent} />
              </marker>
            </defs>
            <text x="8" y="23" fontSize="15" fill={C.primary}>
              客户端
            </text>
            <text x="197" y="23" fontSize="15" fill={C.primary}>
              对端
            </text>
            <path
              d="M 25 51 L 230 51"
              stroke={state.halfClosed ? C.border : C.accent}
              strokeWidth="3"
              strokeDasharray={state.halfClosed ? "6 4" : undefined}
              markerEnd={`url(#${id}-direction)`}
            />
            {state.halfClosed && (
              <path
                d="M 118 41 L 138 61 M 138 41 L 118 61"
                stroke={C.danger}
                strokeWidth="3"
              />
            )}
            <text x="8" y="82" fontSize="14" fill={C.primary}>
              {state.halfClosed ? "写：SHUT_WR 后关闭" : "写：开启"}
            </text>
            <path
              d="M 230 103 L 25 103"
              stroke={state.eof ? C.border : C.accent}
              strokeDasharray={state.eof ? "6 4" : undefined}
              strokeWidth="3"
              markerEnd={`url(#${id}-direction)`}
            />
            <text x="8" y="135" fontSize="14" fill={C.primary}>
              读：{state.eof ? "已观测 EOF" : "仍可接收"}
            </text>
          </svg>
          <p className="mt-2 text-sm text-secondary">
            SHUT_WR 只停止本端继续发送；接收仍可进行。正长度 read 返回 0
            才是这里的 EOF 观察。
          </p>
        </div>
      </div>
      <div className="[&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_.flex]:flex-wrap [&_ol]:hidden">
        <TimelineControls
          timeline={timeline}
          caption={
            state.pending
              ? "没有匹配的事件：时间线止于等待，不伪造 read。修改参数可重新实验。"
              : "单步或拖进度，比较就绪位与已搬运字节。"
          }
          reset={{ label: "完整重置", onClick: reset }}
        />
      </div>
      <p
        role="status"
        aria-live="polite"
        className="text-sm leading-6 text-primary"
      >
        帧 {frame + 1}/{steps.length} · {STAGES[frame]} ·{" "}
        {auto ? "播放中" : "已暂停"} · {state.result} · 应用{" "}
        {state.appBytes.length} 字节 / {state.completeFrames} 完整行。
        {state.pending
          ? "没有事件且无限等待：停在此处；更改参数重新实验。"
          : ""}
        {reduced ? "减少动态效果已启用：仅手动步进。" : ""}
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm text-primary">
          <caption className="mb-2 text-left">
            同一兴趣集合的 poll 对照（不是一次实际 poll 调用）
          </caption>
          <thead>
            <tr>
              <th className="p-2">fd</th>
              <th className="p-2">events</th>
              <th className="p-2">revents 含义</th>
            </tr>
          </thead>
          <tbody>
            {[0, 3].map((fd) => (
              <tr key={fd} className="border-t border-border">
                <td className="p-2">{fd}</td>
                <td className="p-2">
                  {state.interest.includes(fd) ? "POLLIN" : "移出数组 / fd=-1"}
                </td>
                <td className="p-2">
                  {!state.valid
                    ? "尚无有效结果"
                    : state.ready.includes(fd)
                      ? fd === 3 && state.fin
                        ? "挂断/可读：先排空，再判断 EOF"
                        : "POLLIN：可尝试读取"
                      : "0：无事件"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm leading-6 text-secondary">
        poll 没有 nfds 扫描上界的同类错误：这里的 nfds
        是数组条目数。错误模式“nfds=3”仅模拟 select，表中不声称给出真实 poll
        结果。EOF 情景下第二次 read=0 后应移除并关闭
        socket；批量输入情景假定发送队列已经排空，SHUT_WR 后读到 OK\\n，仍需后续
        read=0 才最终 close。零超时不会把 socket 自动设为非阻塞。
      </p>
    </figure>
  );
}
