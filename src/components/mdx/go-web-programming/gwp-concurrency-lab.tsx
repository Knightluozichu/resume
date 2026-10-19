"use client";

import { useReducer } from "react";

type Scenario = "parallel" | "serial" | "backpressure" | "cancel" | "failure";
type Worker = { job: number; left: number } | null;
export type PoolState = {
  scenario: Scenario;
  cpus: number;
  tick: number;
  prediction: string;
  queue: number[];
  workers: Worker[];
  buffer: number[];
  tiles: number[];
  collector: boolean;
  closed: boolean;
  stopped: "" | "取消" | "失败";
  firstOutcome: string;
  retired: boolean;
  advanced: number[];
  note: string;
};
export const initialState: PoolState = {
  scenario: "parallel",
  cpus: 2,
  tick: 0,
  prediction: "",
  queue: [0, 1, 2, 3],
  workers: [null, null],
  buffer: [],
  tiles: [],
  collector: true,
  closed: false,
  firstOutcome: "",
  stopped: "",
  retired: false,
  advanced: [],
  note: "先预测，再分派四个编号格子。",
};
export const SCENARIOS = [
  ["parallel", "双工位成功", "完成"],
  ["serial", "单工位成功", "完成"],
  ["backpressure", "暂停收集", "阻塞"],
  ["cancel", "取消收敛", "取消"],
  ["failure", "匹配失败", "失败"],
] as const;
const duration = [2, 1, 2, 1];
export function poolStatus(s: PoolState): string {
  if (s.stopped)
    return s.retired
      ? `${s.stopped}：已等待退出并关闭`
      : `${s.stopped}：停止分派，等待退出`;
  if (s.closed && s.buffer.length === 0) return "完成：四格可提交";
  if (
    !s.collector &&
    s.buffer.length === 1 &&
    s.workers.some((w) => w?.left === 0)
  )
    return "阻塞：满槽等待接收";
  return s.tick === 0
    ? "等待预测"
    : s.closed
      ? "发送结束：关闭后排空"
      : "推进中";
}
type Action =
  | { type: "scenario"; value: Scenario }
  | { type: "cpus"; value: number }
  | { type: "predict"; value: string }
  | { type: "step" | "reset" | "collect" | "cancel" };
function transition(s: PoolState, a: Action): PoolState {
  if (a.type === "reset") return { ...initialState };
  if (a.type === "scenario" || a.type === "cpus") {
    const scenario = a.type === "scenario" ? a.value : s.scenario;
    return {
      ...initialState,
      scenario,
      cpus: a.type === "cpus" ? a.value : 2,
      workers: scenario === "serial" ? [null] : [null, null],
      collector: scenario !== "backpressure",
    };
  }
  if (a.type === "predict")
    return s.tick === 0 ? { ...s, prediction: a.value } : s;
  if (a.type === "collect")
    return {
      ...s,
      collector: !s.collector,
      note: s.collector
        ? "暂停收集；已完成结果仍占用槽位。"
        : "恢复收集；下一步先取出一个结果，释放发送空间。",
    };
  if (a.type === "cancel")
    return s.closed || !s.prediction
      ? s
      : {
          ...s,
          stopped: "取消",
          note: "取消是信号；还要推进一步等待合作工位退出。",
        };
  if (!s.prediction || s.retired || (s.closed && s.buffer.length === 0))
    return s;
  const n: PoolState = {
    ...s,
    tick: s.tick + 1,
    queue: [...s.queue],
    workers: s.workers.map((w) => (w ? { ...w } : null)),
    buffer: [...s.buffer],
    tiles: [...s.tiles],
    advanced: [],
  };
  if (n.stopped) {
    n.queue = [];
    n.workers = n.workers.map(() => null);
    n.buffer = [];
    n.closed = true;
    n.retired = true;
    n.note = "模型中的合作工位均退出；协调者关闭结果通道，丢弃未提交结果。";
    return n;
  }
  if (n.scenario === "cancel" && n.tick === 3) {
    n.stopped = "取消";
    n.note = "第3步撤回请求。停止新分派，但关闭必须等到工位退出。";
    return n;
  }
  const events: string[] = [];
  if (n.collector && n.buffer.length) {
    const j = n.buffer.shift()!;
    n.tiles.push(j);
    events.push(`收集格${j}`);
  }
  for (let i = 0; i < n.workers.length; i++) {
    const w = n.workers[i];
    if (w && w.left === 0 && n.buffer.length < 1) {
      n.buffer.push(w.job);
      n.workers[i] = null;
      events.push(`工位${i + 1}发送格${w.job}`);
    }
  }
  const order = Array.from(
    { length: n.workers.length },
    (_, k) => (k + n.tick) % n.workers.length,
  );
  for (const i of order) {
    const w = n.workers[i];
    if (w && w.left > 0 && n.advanced.length < n.cpus) {
      w.left--;
      n.advanced.push(i);
      events.push(`计算格${w.job}`);
      if (w.left === 0 && w.job === 1 && n.scenario === "failure") {
        n.stopped = "失败";
        n.note =
          "格1匹配报错；本模型立即通知取消，下一步等待其余合作工位退出。";
        return n;
      }
    }
  }
  for (let i = 0; i < n.workers.length; i++) {
    if (!n.workers[i] && n.queue.length) {
      const j = n.queue.shift()!;
      n.workers[i] = { job: j, left: duration[j] };
      events.push(`分派格${j}`);
    }
  }
  if (!n.queue.length && n.workers.every((w) => !w)) {
    n.closed = true;
    events.push("全部发送完成，协调者关闭");
  }
  n.note = events.join("；") || "无可推进的通信：结果槽满，需要接收或取消。";
  return n;
}

export function poolReducer(s: PoolState, a: Action): PoolState {
  const next = transition(s, a);
  if (next.firstOutcome) return next;
  const outcome = next.retired
    ? next.stopped
    : next.closed && next.buffer.length === 0
      ? "完成"
      : poolStatus(next).startsWith("阻塞")
        ? "阻塞"
        : "";
  return outcome ? { ...next, firstOutcome: outcome } : next;
}

export const PROBES = [
  {
    id: "rendezvous",
    label: "无缓冲会合",
    expected: "收到7",
    frames: ["发送者等待接收者", "接收7，发送者可退出"],
    output: "value=7 ok=true; sender joined",
    slots: [0, 0],
  },
  {
    id: "drain",
    label: "缓冲排空",
    expected: "先值后零值",
    frames: [
      "容量1：存入7",
      "close：7仍在槽中",
      "接收7，ok=true",
      "接收0，ok=false",
    ],
    output: "first=7,true; second=0,false",
    slots: [1, 1, 0, 0],
  },
  {
    id: "closed",
    label: "关闭后发送",
    expected: "panic",
    frames: ["唯一发送结束后关闭", "再次发送触发panic（测试捕获）"],
    output: "panic=send on closed channel",
    slots: [0, 0],
  },
  {
    id: "nil",
    label: "nil分支",
    expected: "default",
    frames: ["nil通道没有可进行的收发", "select跳过nil分支，选择default"],
    output: "selected=default",
    slots: [0, 0],
  },
  {
    id: "select",
    label: "双就绪select",
    expected: "不保证优先",
    frames: ["取消与结果均已就绪", "两种选择都被规范允许"],
    output: "allowed=cancel|result; no priority guarantee",
    slots: [1, 1],
  },
] as const;
const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border-color)",
  bg: "var(--bg-elevated)",
  accent: "var(--accent)",
  bad: "#d84949",
};
const colors = ["#dc3c3c", "#28aa64", "#3264dc", "#e6be32"];
const buttonStyle = {
  minWidth: 44,
  minHeight: 44,
  padding: "8px 12px",
  border: "1px solid var(--border-color)",
  borderRadius: 8,
};
export function PoolGeometry({ state: s }: { state: PoolState }) {
  return (
    <svg
      viewBox="0 0 260 360"
      width="260"
      height="360"
      style={{
        maxWidth: "100%",
        height: "auto",
        display: "block",
        margin: "0 auto",
      }}
      role="img"
      aria-label="任务队列、工位、结果槽和马赛克位置图"
    >
      <g fill="none" stroke={C.border} strokeWidth="2">
        <path d="M35 47V66H220V47M72 66V94M190 66V94M72 160V211L128 236M190 160V211L132 236M155 253H205V291" />
        {[0, 1].map((i) => (
          <rect
            key={i}
            x={10 + i * 130}
            y="88"
            width="110"
            height="78"
            rx="8"
            stroke={s.advanced.includes(i) ? C.accent : C.border}
            strokeWidth={s.advanced.includes(i) ? 4 : 2}
          />
        ))}
        <rect
          x="106"
          y="234"
          width="48"
          height="38"
          stroke={s.closed ? C.bad : C.border}
          strokeDasharray={s.closed ? "4 3" : undefined}
        />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={174 + (i % 2) * 32}
            y={292 + Math.floor(i / 2) * 30}
            width="28"
            height="26"
            fill={s.tiles.includes(i) ? colors[i] : C.bg}
          />
        ))}
        {s.workers.map((w, i) =>
          w?.left === 0 && s.buffer.length === 1 ? (
            <path
              key={i}
              d={`M${65 + i * 130} 191l12 12m0-12l-12 12`}
              stroke={C.bad}
              strokeWidth="4"
            />
          ) : null,
        )}
      </g>
      {s.queue.map((j, i) => (
        <g key={j}>
          <circle cx={35 + i * 59} cy="38" r="13" fill={colors[j]} />
          <text
            x={35 + i * 59}
            y="43"
            textAnchor="middle"
            fill="#101820"
            fontSize="14"
          >
            {j}
          </text>
        </g>
      ))}
      {s.workers.map((w, i) => (
        <g key={i}>
          {w && (
            <>
              <circle cx={35 + i * 130} cy="123" r="13" fill={colors[w.job]} />
              <text
                x={35 + i * 130}
                y="128"
                textAnchor="middle"
                fill="#101820"
                fontSize="14"
              >
                {w.job}
              </text>
              <rect
                x={18 + i * 130}
                y="148"
                width={94 * (1 - w.left / duration[w.job])}
                height="10"
                fill={C.accent}
              />
            </>
          )}
        </g>
      ))}
      {s.buffer.map((j) => (
        <g key={j}>
          <circle cx="130" cy="253" r="13" fill={colors[j]} />
          <text
            x="130"
            y="258"
            textAnchor="middle"
            fill="#101820"
            fontSize="14"
          >
            {j}
          </text>
        </g>
      ))}
      <g fill={C.ink} fontSize="14" textAnchor="middle">
        <text x="130" y="15">
          待分派队列（格子编号）
        </text>
        <text x="65" y="82">
          工位1
        </text>
        <text x="195" y="82">
          {s.workers.length === 2 ? "工位2" : "未启用"}
        </text>
        {s.workers.map((w, i) => (
          <text key={i} x={75 + i * 130} y="128">
            {!w ? "空闲" : w.left === 0 ? "待发送" : `余${w.left}`}
          </text>
        ))}
        <text x="130" y="184">
          本步计算槽 {s.advanced.length}/{s.cpus}
        </text>
        <text x="130" y="226">
          结果channel 容量1
        </text>
        <text x="65" y="301">
          {s.closed ? "已关闭" : "发送仍开放"}
        </text>
        <text x="65" y="324">
          {s.collector ? "收集者开启" : "收集者暂停"}
        </text>
        <text x="205" y="356">
          按Index装配
        </text>
      </g>
    </svg>
  );
}

export function GwpConcurrencyLab() {
  const [s, dispatch] = useReducer(poolReducer, initialState);
  const [probe, setProbe] = useReducer((_: number, n: number) => n, 0);
  const [frame, setFrame] = useReducer((_: number, n: number) => n, -1);
  const [guess, setGuess] = useReducer((_: string, n: string) => n, "");
  const p = PROBES[probe];
  const terminal = s.retired || (s.closed && s.buffer.length === 0);
  const reset = () => {
    dispatch({ type: "reset" });
    setProbe(0);
    setFrame(-1);
    setGuess("");
  };
  return (
    <section
      aria-label="并发马赛克实验台"
      className="my-8 space-y-5 rounded-xl border border-[var(--border-color)] p-3 sm:p-5"
      style={{ minWidth: 0 }}
    >
      <h3 className="text-lg font-semibold">任务流与退出闸门</h3>
      <p className="text-sm">
        每个工位代表一个goroutine，不代表一颗CPU。保留两个工位、切换1/2执行槽，观察进度条能否同时增长，检验“并发不是并行”。这是确定性教学模型，不是Go实际调度或计时；编号比颜色更重要。
      </p>
      <div role="group" aria-label="任务场景" className="flex flex-wrap gap-2">
        {SCENARIOS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            style={{
              ...buttonStyle,
              background: s.scenario === id ? C.bg : "transparent",
            }}
            aria-pressed={s.scenario === id}
            onClick={() => dispatch({ type: "scenario", value: id })}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        role="group"
        aria-label="逻辑执行槽"
        className="flex flex-wrap gap-2"
      >
        {[1, 2].map((n) => (
          <button
            key={n}
            type="button"
            style={buttonStyle}
            aria-pressed={s.cpus === n}
            onClick={() => dispatch({ type: "cpus", value: n })}
          >
            逻辑执行槽：{n}
          </button>
        ))}
      </div>
      <p className="text-sm">
        预测本场景首次停点。改场景或执行槽会清空推演；恢复收集后可以继续验证最终拼图。
      </p>
      <div role="group" aria-label="任务预测" className="flex flex-wrap gap-2">
        {["完成", "阻塞", "取消", "失败"].map((v) => (
          <button
            key={v}
            type="button"
            style={buttonStyle}
            disabled={s.tick > 0}
            aria-pressed={s.prediction === v}
            onClick={() => dispatch({ type: "predict", value: v })}
          >
            预测：{v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          style={buttonStyle}
          disabled={!s.prediction || terminal}
          onClick={() => dispatch({ type: "step" })}
        >
          推进一个逻辑步
        </button>
        <button
          type="button"
          style={buttonStyle}
          disabled={terminal}
          onClick={() => dispatch({ type: "collect" })}
        >
          {s.collector ? "暂停结果收集" : "恢复结果收集"}
        </button>
        <button
          type="button"
          style={buttonStyle}
          disabled={!s.prediction || s.closed || !!s.stopped}
          onClick={() => dispatch({ type: "cancel" })}
        >
          取消当前请求
        </button>
        <button type="button" style={buttonStyle} onClick={reset}>
          重置全部实验
        </button>
      </div>
      <p role="status" aria-label="任务状态">
        {poolStatus(s)}
      </p>
      <output aria-label="预测反馈">
        {s.firstOutcome
          ? s.prediction === s.firstOutcome
            ? "预测一致（实际首次停点）"
            : "预测需修正（实际首次停点）"
          : "等待抵达停点"}
      </output>
      <PoolGeometry state={s} />
      <dl className="grid grid-cols-2 gap-2 text-sm">
        <dt>逻辑步</dt>
        <dd>
          <output aria-label="逻辑步数">{s.tick}</output>
        </dd>
        <dt>待分派 / 占用工位</dt>
        <dd>
          <output aria-label="队列与工位">
            {s.queue.length} / {s.workers.filter(Boolean).length}
          </output>
        </dd>
        <dt>结果槽</dt>
        <dd>
          <output aria-label="结果槽内容">
            {s.buffer.length ? s.buffer.join(",") : "空"}
          </output>
        </dd>
        <dt>已装配编号</dt>
        <dd>
          <output aria-label="已装配编号">
            {[...s.tiles].sort().join(",") || "空"}
          </output>
        </dd>
        <dt>响应提交</dt>
        <dd>
          <output aria-label="响应闸门">
            {terminal && !s.stopped ? "允许完整提交" : "禁止提交"}
          </output>
        </dd>
      </dl>
      <p className="text-sm">
        Web应用中的并发还要收束请求生命周期：先分派，再收集；取消时先等待工位退出，最后才关闭。检查响应闸门，不把局部马赛克当成成功响应。
      </p>
      <p aria-label="任务机制解释" className="text-sm">
        {s.note}
      </p>
      <hr className="border-[var(--border-color)]" />
      <h3 className="text-lg font-semibold">channel边界：原生Go探针</h3>
      <p className="text-sm">
        下列结果来自有限原生探针；双就绪select展示允许结果集合，不伪造固定胜者。
      </p>
      <div
        role="group"
        aria-label="channel案例"
        className="flex flex-wrap gap-2"
      >
        {PROBES.map((v, i) => (
          <button
            key={v.id}
            type="button"
            style={buttonStyle}
            aria-pressed={i === probe}
            onClick={() => {
              setProbe(i);
              setFrame(-1);
              setGuess("");
            }}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div
        role="group"
        aria-label="channel预测"
        className="flex flex-wrap gap-2"
      >
        {["收到7", "先值后零值", "panic", "default", "不保证优先"].map((v) => (
          <button
            key={v}
            type="button"
            style={buttonStyle}
            aria-pressed={guess === v}
            disabled={frame >= 0}
            onClick={() => setGuess(v)}
          >
            边界预测：{v}
          </button>
        ))}
      </div>
      <button
        type="button"
        style={buttonStyle}
        disabled={!guess || frame === p.frames.length - 1}
        onClick={() => setFrame(frame + 1)}
      >
        推进channel事件
      </button>
      <svg
        width="260"
        height="145"
        viewBox="0 0 260 145"
        role="img"
        aria-label="channel会合、缓冲槽与关闭边界图"
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      >
        <path
          d={
            frame < 0
              ? "M20 55H60"
              : probe === 3
                ? "M20 55H75M70 45L85 65M85 45L70 65"
                : "M20 55H240"
          }
          fill="none"
          stroke={probe === 2 && frame === 1 ? C.bad : C.accent}
          strokeWidth="4"
        />
        <rect
          x="100"
          y="32"
          width="60"
          height="46"
          fill={C.bg}
          stroke={C.border}
          strokeWidth="2"
        />
        {frame >= 0 && p.slots[frame] === 1 && (
          <circle cx="130" cy="55" r="16" fill={C.accent} />
        )}
        {probe === 0 && frame === 1 && (
          <>
            <circle cx="95" cy="55" r="8" fill={C.accent} />
            <circle cx="165" cy="55" r="8" fill={C.accent} />
          </>
        )}
        {((probe === 2 && frame >= 0) || (probe === 1 && frame >= 1)) && (
          <path d="M100 28H160" stroke={C.bad} strokeWidth="5" />
        )}
        <g fontSize="14" textAnchor="middle" fill={C.ink}>
          <text x="45" y="20">
            发送
          </text>
          <text x="215" y="20">
            接收
          </text>
          <text x="130" y="112">
            {frame < 0
              ? "预测后推进"
              : `事件 ${frame + 1} / ${p.frames.length}`}
          </text>
          <text x="130" y="138">
            {probe === 3 ? "nil：分支不可进行" : "横线=通信路径，顶线=已关闭"}
          </text>
        </g>
      </svg>
      <p aria-label="channel事件解释" className="text-sm">
        {frame < 0 ? "预测后推进" : p.frames[frame]}
      </p>
      <output
        aria-label="channel原生结果"
        className="block whitespace-pre-wrap break-words text-sm"
      >
        {frame === p.frames.length - 1 ? p.output : "尚未完成探针"}
      </output>
      <p aria-label="channel预测反馈">
        {frame === p.frames.length - 1
          ? guess === p.expected
            ? "边界预测一致"
            : "边界预测需修正"
          : "等待探针完成"}
      </p>
    </section>
  );
}
