"use client";

import { useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";
import {
  TimelineControls,
  TEACHING_BEAT_MS,
} from "../../anim/timeline-controls";

// 本章三幅机制图均为确定性教学模拟；真实 SDK 传播断言在正文程序中。
const C = {
  bg: "var(--bg)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const button =
  "min-h-11 min-w-11 rounded-control border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent";
const spanSteps = [
  { label: "root-start", caption: "R 开始" },
  { label: "model-start", caption: "M 开始，parent = R" },
  { label: "model-end", caption: "M 结束" },
  { label: "tool-start", caption: "T 开始" },
  { label: "tool-terminal", caption: "T 终止：end 或 error" },
  { label: "root-terminal", caption: "R 终止" },
] as const;
const propagationSteps = [
  { label: "parent-start", caption: "父 run 开始：L 与 Q" },
  { label: "child-start", caption: "子 run 开始：继承 Q，局部 C" },
  { label: "child-end", caption: "子 run 结束" },
  { label: "parent-end", caption: "父 run 结束" },
] as const;
const queueSteps = [
  { label: "q0", caption: "空队列" },
  { label: "q1", caption: "第 1 拍：两条到达" },
  { label: "q2", caption: "第 2 拍：先消费，再到达" },
  { label: "q3", caption: "第 3 拍" },
  { label: "q4", caption: "第 4 拍" },
  { label: "q5", caption: "第 5 拍：核对事件守恒" },
] as const;

function useCallbackTimeline(steps: readonly TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build(tl) {
      const clock = { beat: 0 };
      steps.forEach((step, i) => {
        const start = i * TEACHING_BEAT_MS;
        tl.label(step.label, start);
        tl.add(clock, { beat: [i, i + 1], duration: TEACHING_BEAT_MS }, start);
      });
    },
  });
}

function Frame({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-callback-lab={id}
      data-visual-kind={`lcp08-${id}`}
      aria-label={title}
      className="lcp-callbacks-lab not-prose my-6 min-w-0 rounded-card border border-border bg-bg p-3 sm:p-5"
    >
      <h4 className="mb-3 text-lg font-semibold text-primary">{title}</h4>
      {children}
      <style>{`
        .lcp-callbacks-lab svg { display:block; width:100%; max-width:420px; height:auto; margin:auto; }
        .lcp-callbacks-lab svg text { fill:var(--text-primary); font-size:16px; }
        .lcp-callbacks-lab button, .lcp-callbacks-lab input, .lcp-callbacks-lab select { min-width:44px; min-height:44px; }
        .lcp-callbacks-lab button[aria-pressed=true] { border-color:var(--accent); color:var(--accent); }
        .lcp-callbacks-lab :is(button,input,select):focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
        .lcp-callbacks-lab ol[aria-hidden=true] { display:none; }
        .lcp-callbacks-lab .mt-4.flex { flex-wrap:wrap; }
      `}</style>
    </section>
  );
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={button}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Transport({
  timeline,
  reset,
}: {
  timeline: ReturnType<typeof useCallbackTimeline>;
  reset: () => void;
}) {
  return (
    <TimelineControls
      timeline={timeline}
      reset={{ label: "全部重置", onClick: reset }}
    />
  );
}

// 保留 registry 的旧 export 名；实际内容不再是版本合同。
export function Lcp08CallbacksVersionContractLab() {
  const timeline = useCallbackTimeline(spanSteps);
  const [toolMs, setToolMs] = useState(30);
  const [orphan, setOrphan] = useState(false);
  const [failure, setFailure] = useState(false);
  const end = 55 + toolMs;
  const rootEnd = end + 15;
  const now = [0, 10, 50, 55, end, rootEnd][timeline.currentStep];
  const x = (time: number) => 75 + time * 2;
  const runs = [
    { id: "R", name: "chain", start: 0, end: rootEnd, y: 85 },
    { id: "M", name: "model", start: 10, end: 50, y: 165 },
    { id: "T", name: "tool", start: 55, end, y: 245 },
  ];
  return (
    <Frame id="spans" title="实验 1 · run 树与事件跨度">
      <svg
        viewBox="0 0 340 405"
        role="img"
        aria-label="R 父 run 包含 M 模型和 T 工具的时间跨度，竖线为当前事件；丢父关联会断开 T 连线。"
      >
        <text x="15" y="26">
          连线 = 父子；横长 = 时间
        </text>
        <path
          d="M22 85 V165 H45"
          fill="none"
          stroke={C.accent}
          strokeWidth="2"
        />
        {!orphan && (
          <path
            data-parent-edge="T"
            d="M22 165 V245 H45"
            fill="none"
            stroke={C.accent}
            strokeWidth="2"
          />
        )}
        {runs.map((run, i) => {
          const started = timeline.currentStep >= [0, 1, 3][i];
          const terminal = timeline.currentStep >= [5, 2, 4][i];
          const errored = failure && i !== 1 && terminal;
          const width = Math.max(0, Math.min(now, run.end) - run.start) * 2;
          return (
            <g key={run.id}>
              <circle
                cx={i === 0 ? 22 : 45}
                cy={run.y}
                r="6"
                fill={started ? C.accent : C.bg}
                stroke={C.accent}
              />
              <text x="75" y={run.y - 20}>
                {run.id} · {run.name}
              </text>
              <rect
                x={x(run.start)}
                y={run.y - 5}
                width={(run.end - run.start) * 2}
                height="18"
                rx="3"
                fill="none"
                stroke={C.border}
                strokeDasharray="4 3"
              />
              {width > 0 && (
                <rect
                  data-span={run.id}
                  x={x(run.start)}
                  y={run.y - 5}
                  width={width}
                  height="18"
                  rx="3"
                  fill={errored ? C.danger : C.accent}
                  opacity="0.7"
                />
              )}
              {terminal && (
                <path
                  d={`M${x(run.end) - 4} ${run.y - 9} l8 26 m-8 0 l8 -26`}
                  stroke={errored ? C.danger : C.text}
                  strokeWidth="2"
                />
              )}
              <text x="75" y={run.y + 38}>
                {run.end - run.start} ms ·{" "}
                {terminal
                  ? errored
                    ? "error"
                    : "end"
                  : started
                    ? "运行中"
                    : "待开始"}
              </text>
            </g>
          );
        })}
        {runs.map((run) => (
          <line
            key={`cursor-${run.id}`}
            data-time-cursor={run.id}
            x1={x(now)}
            y1={run.y - 5}
            x2={x(now)}
            y2={run.y + 13}
            stroke={C.text}
            strokeDasharray="3 4"
          />
        ))}
        <line x1="75" y1="308" x2="305" y2="308" stroke={C.border} />
        <text x="75" y="333">
          0
        </text>
        <text x="240" y="333">
          {now} ms
        </text>
        <text x="15" y="366">
          T.parent = {orphan ? "null：孤儿" : "R：同一父 run"}
        </text>
        <text x="15" y="393">
          虚线框为预设范围，非实测延迟
        </text>
      </svg>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <label className="text-sm">
          工具耗时 {toolMs} ms
          <input
            className="block w-full accent-accent"
            aria-label="工具耗时"
            type="range"
            min="20"
            max="40"
            step="5"
            value={toolMs}
            onChange={(e) => setToolMs(Number(e.target.value))}
          />
        </label>
        <Toggle active={orphan} onClick={() => setOrphan(!orphan)}>
          丢父关联
        </Toggle>
        <Toggle active={failure} onClick={() => setFailure(!failure)}>
          工具失败
        </Toggle>
      </div>
      <p className="mt-3 text-sm" aria-live="polite">
        {failure
          ? "本模拟：父编排器不捕获工具异常，故父 run 最终也 error。"
          : "顺序调用：父耗时包含子耗时，不能把三条跨度相加。"}{" "}
        {orphan
          ? "缺 parent ID 不能靠日志顺序补造父子关系。"
          : "M 与 T 为兄弟，不是彼此的父子。"}
      </p>
      <Transport
        timeline={timeline}
        reset={() => {
          timeline.goToStep(0);
          setToolMs(30);
          setOrphan(false);
          setFailure(false);
        }}
      />
    </Frame>
  );
}

export function Lcp08CallbacksRunnableTraceLab() {
  const timeline = useCallbackTimeline(propagationSteps);
  const [request, setRequest] = useState(true);
  const [modelLocal, setModelLocal] = useState(true);
  const [broken, setBroken] = useState(false);
  const step = timeline.currentStep;
  const parentEvents = step === 3 ? 2 : 1;
  const childEvents = step === 0 ? 0 : step === 1 ? 1 : 2;
  const childX = broken ? 65 : 110;
  return (
    <Frame id="propagation" title="实验 2 · 局部与继承在哪里分叉">
      <svg
        viewBox="0 0 340 425"
        role="img"
        aria-label="父 R 的局部 L 止于父 run；请求 Q 经 get_child 到子 M；模型构造器 C 只看 M。断传递时 M 移到孤立分支。"
      >
        <text x="15" y="27">
          实线 Q 可继承；空心 L/C 局部
        </text>
        <circle
          cx="110"
          cy="100"
          r="29"
          fill={C.bg}
          stroke={C.accent}
          strokeWidth="2"
        />
        <text x="110" y="106" textAnchor="middle">
          R
        </text>
        <path
          d="M139 100 H246 M233 92 V108"
          stroke={C.muted}
          fill="none"
          strokeWidth="2"
        />
        <circle
          cx="268"
          cy="100"
          r="20"
          fill={C.bg}
          stroke={C.muted}
          strokeWidth="2"
        />
        <text x="268" y="106" textAnchor="middle">
          L
        </text>
        <text x="204" y="143">
          父局部：止步
        </text>
        {!broken && (
          <path
            data-inherit-edge="Q"
            d="M110 129 V226"
            stroke={request ? C.accent : C.border}
            strokeWidth="3"
            fill="none"
          />
        )}
        {broken && (
          <path
            d="M110 129 V165 M100 165 L120 180 M120 165 L100 180"
            stroke={C.danger}
            strokeWidth="2"
          />
        )}
        {request && (
          <g>
            <circle cx="40" cy="65" r="16" fill={C.accent} />
            <text x="40" y="71" textAnchor="middle" style={{ fill: C.bg }}>
              Q
            </text>
            <path d="M56 65 L86 81" stroke={C.accent} strokeWidth="2" />
            {!broken && <circle cx="110" cy="185" r="8" fill={C.accent} />}
          </g>
        )}
        <text x="130" y="195">
          {broken ? "未传子管理器" : "get_child()"}
        </text>
        <circle
          cx={childX}
          cy="255"
          r="29"
          fill={C.bg}
          stroke={broken ? C.danger : C.accent}
          strokeWidth="2"
        />
        <text x={childX} y="261" textAnchor="middle">
          M
        </text>
        {modelLocal && (
          <g>
            <path
              d={`M${childX + 29} 255 H246`}
              stroke={C.muted}
              strokeWidth="2"
            />
            <circle
              cx="268"
              cy="255"
              r="20"
              fill={C.bg}
              stroke={C.muted}
              strokeWidth="2"
            />
            <text x="268" y="261" textAnchor="middle">
              C
            </text>
          </g>
        )}
        <text x="15" y="316">
          M.parent = {broken ? "null" : "R"}
        </text>
        <text x="15" y="349">
          收到事件：L {parentEvents} · Q{" "}
          {request ? parentEvents + (broken ? 0 : childEvents) : 0} · C{" "}
          {modelLocal ? childEvents : 0}
        </text>
        <text x="15" y="382">
          L 不进入子管理器的继承列表
        </text>
        <text x="15" y="412">
          C 不向上回流；Q 不是全局变量
        </text>
      </svg>
      <div className="mt-3 flex flex-wrap gap-2">
        <Toggle active={request} onClick={() => setRequest(!request)}>
          请求 Q
        </Toggle>
        <Toggle active={modelLocal} onClick={() => setModelLocal(!modelLocal)}>
          模型构造 C
        </Toggle>
        <Toggle active={broken} onClick={() => setBroken(!broken)}>
          断开 get_child
        </Toggle>
      </div>
      <p className="mt-3 text-sm" aria-live="polite">
        {broken
          ? `子调用显式传 callbacks=[]：请求处理器不进入 M；${modelLocal ? "模型自己的 C 仍能看见。" : "模型构造器 C 已关闭。"}`
          : "手动编排示例：L 以 local_callbacks 注册；C 是模型构造器 callbacks。二者都不是自动向子调用传播。"}
      </p>
      <Transport
        timeline={timeline}
        reset={() => {
          timeline.goToStep(0);
          setRequest(true);
          setModelLocal(true);
          setBroken(false);
        }}
      />
    </Frame>
  );
}

function bufferState(
  ticks: number,
  capacity: number,
  stalled: boolean,
  failing: boolean,
) {
  const queue: number[] = [];
  const dropped: number[] = [];
  let sent = 0;
  let failed = 0;
  for (let tick = 0; tick < ticks; tick++) {
    if (!stalled && queue.length) {
      queue.shift();
      if (failing) failed++;
      else sent++;
    }
    for (let i = 1; i <= 2; i++) {
      const id = tick * 2 + i;
      if (queue.length < capacity) queue.push(id);
      else dropped.push(id);
    }
  }
  return { queue, dropped, sent, failed, total: ticks * 2 };
}

export function Lcp08CallbacksReleaseGateLab() {
  const timeline = useCallbackTimeline(queueSteps);
  const [capacity, setCapacity] = useState(2);
  const [stalled, setStalled] = useState(false);
  const [failing, setFailing] = useState(false);
  const [unsafe, setUnsafe] = useState(false);
  const state = bufferState(timeline.currentStep, capacity, stalled, failing);
  return (
    <Frame id="buffer" title="实验 3 · 脱敏、背压与丢事件边界">
      <svg
        viewBox="0 0 340 470"
        role="img"
        aria-label="事件经过脱敏闸进入有界队列，满时丢新事件；先消费再到达，导出异常单独计数，不等于业务错误。"
      >
        <text x="15" y="28">
          每拍到达 2 条；先消费，后入队
        </text>
        <text x="15" y="65">
          仅虚构数据：key=DEMO
        </text>
        <path
          d="M80 78 V126 H130"
          stroke={C.accent}
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M130 102 L165 126 L130 150 Z"
          stroke={unsafe ? C.danger : C.accent}
          fill={C.bg}
          strokeWidth="2"
        />
        <text x="182" y="122">
          {unsafe ? "DEMO" : "••••"}
        </text>
        <text x="182" y="149">
          {unsafe ? "未脱敏" : "仅保留安全字段"}
        </text>
        <path
          d="M165 126 H315 V203 H35"
          stroke={unsafe ? C.danger : C.accent}
          strokeWidth="2"
          fill="none"
        />
        <text x="15" y="187">
          缓冲区：{state.queue.length} / {capacity}
        </text>
        {Array.from({ length: capacity }, (_, i) => (
          <g key={i}>
            <rect
              data-queue-slot={i}
              x={27 + i * 76}
              y="214"
              width="58"
              height="43"
              rx="4"
              fill={i < state.queue.length ? C.accent : C.bg}
              opacity={i < state.queue.length ? 0.75 : 1}
              stroke={C.border}
            />
            <text x={56 + i * 76} y="242" textAnchor="middle">
              {state.queue[i] ? `E${state.queue[i]}` : "空"}
            </text>
          </g>
        ))}
        <path
          d="M56 257 V307 H130 M130 298 L142 307 L130 316"
          stroke={failing ? C.danger : C.accent}
          strokeWidth={stalled ? 1 : 3}
          strokeDasharray={stalled ? "4 4" : undefined}
          fill="none"
        />
        <text x="151" y="302">
          成功 {state.sent}
        </text>
        <text x="151" y="330">
          导出异常 {state.failed}
        </text>
        <path
          d="M315 203 V365 H160"
          stroke={state.dropped.length ? C.danger : C.border}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M112 355 H158 L150 389 H120 Z M106 349 H164"
          stroke={C.danger}
          fill={C.bg}
          strokeWidth="2"
        />
        <text x="15" y="420">
          满队丢新：{state.dropped.length} 条（不重试）
        </text>
        <text x="15" y="453">
          产生 {state.total} = 成功 + 异常 + 队列 + 丢弃
        </text>
      </svg>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <label className="text-sm">
          容量{" "}
          <select
            className={`${button} bg-bg`}
            aria-label="队列容量"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
          </select>
        </label>
        <Toggle active={stalled} onClick={() => setStalled(!stalled)}>
          消费停滞
        </Toggle>
        <Toggle active={failing} onClick={() => setFailing(!failing)}>
          插件异常
        </Toggle>
        <Toggle active={unsafe} onClick={() => setUnsafe(!unsafe)}>
          关闭脱敏
        </Toggle>
      </div>
      <p className="mt-3 text-sm" aria-live="polite">
        离散模拟，不是 LangSmith 服务或 SDK 内置队列。
        {stalled
          ? "消费者停滞，没有消费便不会触发导出异常。"
          : failing
            ? "出队后导出失败且不重试，计入异常而非满队丢弃。"
            : "消费者每拍最多取 1 条。"}{" "}
        {unsafe
          ? "故障：虚构敏感字段进入缓冲区；生产中须在入队前过滤。"
          : "显示遮罩只演示位置；真实插件应删掉未允许字段。"}
      </p>
      <Transport
        timeline={timeline}
        reset={() => {
          timeline.goToStep(0);
          setCapacity(2);
          setStalled(false);
          setFailing(false);
          setUnsafe(false);
        }}
      />
    </Frame>
  );
}
