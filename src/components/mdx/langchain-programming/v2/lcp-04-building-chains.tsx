"use client";

import { useCallback, useState } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";

// 独立需求分析（batch-17）：25个目录坐标对应三类不同结构，而非证据/合同卡。
// 4.1/4.2/4.3.5：保留原输入的串联与同输入分叉DAG，甘特条按假设时长等比例。
// 4.2.1/4.3.1–4/4.3.6：类型谓词选边、旁路原值、输出类型错误及fallback新增路径。
// 4.2.2–5：chunk磁带、字符串累加和有序batch；invoke不暴露中间结果。
// 4.4/4.5通过正文和离线代码解释历史Chain及场景边界，不把v1/classic混为同代API。
// 原三个export只保留注册兼容。整数时钟、固定样本，不使用随机数/模型请求/浮点文本。
const C = {
  bg: "var(--bg)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
};
const ROOT =
  "not-prose my-6 rounded-xl border border-border bg-bg p-3 text-primary sm:p-4 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_select]:min-h-11 [&_.justify-center]:flex-wrap [&_ol[aria-hidden=true]]:hidden [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-accent [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-accent [&_select:focus-visible]:outline-2 [&_select:focus-visible]:outline-accent";
const BUTTON = "rounded-lg border border-border px-3 py-2 text-sm";
const NOTE = "mt-3 text-sm leading-6 text-secondary";
const SVG = "mx-auto mt-4 block w-full max-w-[420px]";
const STEPS = [
  { label: "start", caption: "输入" },
  { label: "prepared", caption: "准备完成" },
  { label: "first", caption: "第一分支完成" },
  { label: "second", caption: "第二分支完成" },
  { label: "joined", caption: "汇合" },
] as const;
// Distinct stable arrays also rebuild timing labels when the topology changes.
const SERIAL_STEPS = STEPS.map((step) => ({ ...step }));
const CHUNK_STEPS = [
  { label: "empty", caption: "尚无chunk" },
  { label: "one", caption: "第1次到达" },
  { label: "two", caption: "第2次到达" },
  { label: "three", caption: "第3次到达" },
] as const;

/** DAG节点以状态圆环和进度弧表达执行，不靠文字卡切换。 */
function RunNode({
  x,
  y,
  name,
  state,
}: {
  x: number;
  y: number;
  name: string;
  state: "waiting" | "running" | "done" | "error";
}) {
  const color =
    state === "error" ? C.danger : state === "waiting" ? C.border : C.accent;
  return (
    <g>
      <circle cx={x} cy={y} r="18" fill={C.bg} stroke={color} strokeWidth="3" />
      {state === "running" && (
        <path
          d={`M ${x} ${y - 12} A 12 12 0 0 1 ${x + 12} ${y}`}
          fill="none"
          stroke={C.accent}
          strokeWidth="4"
        />
      )}
      {state === "done" && (
        <path
          d={`M ${x - 8} ${y} l 5 6 l 12 -12`}
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
        />
      )}
      {state === "error" && (
        <path
          d={`M ${x - 7} ${y - 7} l 14 14 m 0 -14 l -14 14`}
          stroke={C.danger}
          strokeWidth="3"
        />
      )}
      <text x={x} y={y + 37} textAnchor="middle" fill={C.text} fontSize="16">
        {name}
      </text>
    </g>
  );
}

export function Lcp04BuildingChainsVersionContractLab() {
  const [parallel, setParallel] = useState(true);
  const [fault, setFault] = useState(false);
  const total = parallel ? 700 : 1000;
  const times = parallel ? [0, 100, 400, 600, 700] : [0, 100, 400, 900, 1000];
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      const clock = { value: 0 };
      tl.add(clock, { value: 1, duration: total * 4, ease: "linear" }, 0);
      const ticks = parallel
        ? [0, 100, 400, 600, 700]
        : [0, 100, 400, 900, 1000];
      STEPS.forEach((step, i) => tl.label(step.label, ticks[i] * 4));
    },
    [parallel, total],
  );
  // The shared hook rebuilds on steps identity, not on build identity.
  const timeline = useTeachingTimeline({
    steps: parallel ? STEPS : SERIAL_STEPS,
    build,
  });
  const time = Math.round(timeline.progress * total);
  const failed = fault && time >= times[3];
  const rows = [
    { name: "准备", start: 0, end: 100 },
    { name: "A ×2", start: 100, end: 400 },
    { name: "B +1", start: parallel ? 100 : 400, end: times[3] },
    { name: "汇合", start: times[3], end: total },
  ];
  const state = (i: number) => {
    if (i === 3 && failed) return "waiting" as const;
    if (i === 2 && failed) return "error" as const;
    return time >= rows[i].end
      ? ("done" as const)
      : time >= rows[i].start
        ? ("running" as const)
        : ("waiting" as const);
  };
  const reset = () => {
    setParallel(true);
    setFault(false);
    timeline.seek(0);
  };
  return (
    <section
      className={ROOT}
      data-visual-kind="lcp04-dag-timing"
      aria-label="串并行DAG与执行时间线实验"
    >
      <h3 className="font-semibold">01 / 同一输入的两项计算，何时能够汇合？</h3>
      <p className={NOTE}>
        本地调度示意：n=3，A算2n，B算n+1。串联保留原n再补字段；并行把同一n送两支。时长为教学假设，不是SDK或模型性能测量。
      </p>
      <div
        className="mt-3 flex flex-wrap gap-2"
        role="group"
        aria-label="组合方式"
      >
        <button
          className={BUTTON}
          type="button"
          aria-pressed={parallel}
          onClick={() => {
            timeline.seek(0);
            setParallel(true);
          }}
        >
          并行分叉
        </button>
        <button
          className={BUTTON}
          type="button"
          aria-pressed={!parallel}
          onClick={() => {
            timeline.seek(0);
            setParallel(false);
          }}
        >
          串联保留原值
        </button>
        <button
          className={BUTTON}
          type="button"
          aria-pressed={fault}
          onClick={() => {
            setFault(!fault);
            timeline.seek(0);
          }}
        >
          B分支故障
        </button>
      </div>
      <svg
        viewBox="0 0 300 495"
        className={SVG}
        role="img"
        aria-label={`${parallel ? "并行" : "串联"}DAG，时钟${time}毫秒，总时长${total}毫秒。${failed ? "B抛错，汇合被阻断" : time === total ? "汇合结果6+4=10" : "尚未完成汇合"}`}
      >
        <g fill="none" stroke={C.border} strokeWidth="2">
          {parallel ? (
            <>
              <path d="M150 86 L75 100 V113 M150 86 L225 100 V113" />
              <path d="M75 181 L150 210 M225 181 L150 210" />
            </>
          ) : (
            <path d="M150 72 V78 M150 140 V164 M150 226 V244" />
          )}
        </g>
        <RunNode
          x={150}
          y={parallel ? 40 : 28}
          name="准备 n=3"
          state={state(0)}
        />
        <RunNode
          x={parallel ? 75 : 150}
          y={parallel ? 132 : 96}
          name="A = 6"
          state={state(1)}
        />
        <RunNode
          x={parallel ? 225 : 150}
          y={parallel ? 132 : 182}
          name="B = 4"
          state={state(2)}
        />
        <RunNode
          x={150}
          y={parallel ? 228 : 262}
          name={failed ? "汇合被阻断" : "A+B = 10"}
          state={state(3)}
        />
        <text x="12" y="326" fill={C.text} fontSize="16">
          执行区间 / 毫秒
        </text>
        {rows.map((row, i) => {
          const x = 78 + Math.round((row.start / total) * 210);
          const w = Math.round(((row.end - row.start) / total) * 210);
          const elapsed =
            i === 3 && failed
              ? 0
              : Math.max(0, Math.min(time, row.end) - row.start);
          return (
            <g key={row.name}>
              <text x="12" y={359 + i * 30} fill={C.text} fontSize="16">
                {row.name}
              </text>
              <rect
                x={x}
                y={345 + i * 30}
                width={w}
                height="18"
                fill={C.bg}
                stroke={C.border}
              />
              <rect
                x={x}
                y={345 + i * 30}
                width={Math.round((elapsed / total) * 210)}
                height="18"
                fill={i === 2 && failed ? C.danger : C.accent}
              />
            </g>
          );
        })}
        <path
          d={`M${78 + Math.round((time / total) * 210)} 340 V458`}
          stroke={C.text}
          strokeDasharray="3 3"
        />
        <text x="78" y="484" fill={C.muted} fontSize="16">
          0
        </text>
        <text x="288" y="484" fill={C.muted} fontSize="16" textAnchor="end">
          {total} ms
        </text>
      </svg>
      <p className={NOTE} role="status" aria-live="polite">
        时钟 {time} / {total} ms；
        {failed
          ? "B已抛错；不能把A成功当作整个组合成功。"
          : time === total
            ? "完成：{a:6,b:4} → 10。"
            : "汇合等待所需结果。"}{" "}
        串联100+300+500+100=1000；并行100+max(300,500)+100=700。
      </p>
      <TimelineControls
        timeline={timeline}
        labelText={Object.fromEntries(STEPS.map((s) => [s.label, s.caption]))}
        reset={{ label: "重置DAG", onClick: reset }}
      />
    </section>
  );
}

export function Lcp04BuildingChainsRunnableTraceLab() {
  const [textInput, setTextInput] = useState(false);
  const [factor, setFactor] = useState(2);
  const [fault, setFault] = useState(false);
  const [fallback, setFallback] = useState(false);
  const bad = fault && !fallback;
  const scaled = fault && fallback ? 0 : 3 * factor;
  const reset = () => {
    setTextInput(false);
    setFactor(2);
    setFault(false);
    setFallback(false);
  };
  return (
    <section
      className={ROOT}
      data-visual-kind="lcp04-typed-routing"
      aria-label="类型路由与异常传播实验"
    >
      <h3 className="font-semibold">02 / 选中一支，不代表汇合类型一定正确</h3>
      <p className={NOTE}>
        本地类型示意。number与string选择不同处理器；两支正常时都返回number。旁路保留原值3。故障让处理器误返string；仅在边界校验抛错后，fallback才返回数值0。
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="text-sm">
          输入类型
          <select
            aria-label="输入类型"
            className="mt-1 block w-full rounded-lg border border-border bg-bg px-2"
            value={textInput ? "string" : "number"}
            onChange={(e) => setTextInput(e.target.value === "string")}
          >
            <option value="number">number：3</option>
            <option value="string">string：&quot;3&quot;</option>
          </select>
        </label>
        <label className="text-sm">
          配置 multiplier = {factor}
          <input
            className="mt-1 block w-full accent-accent"
            aria-label="multiplier配置"
            type="range"
            min="2"
            max="4"
            step="1"
            value={factor}
            onChange={(e) => setFactor(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={BUTTON}
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          错误输出类型
        </button>
        <button
          type="button"
          className={BUTTON}
          aria-pressed={fallback}
          onClick={() => setFallback(!fallback)}
        >
          启用fallback
        </button>
        <button type="button" className={BUTTON} onClick={reset}>
          重置路由
        </button>
      </div>
      <svg
        viewBox="0 0 300 470"
        className={SVG}
        role="img"
        aria-label={`输入${textInput ? 'string "3"，选择文本解析支路' : "number 3，选择数值支路"}，倍率${factor}。${bad ? "分支输出string，校验异常，汇合阻断" : `输出number ${scaled}，加原值3得${scaled + 3}`}${fault && fallback ? "，已走fallback路径" : ""}`}
      >
        <text x="12" y="24" fill={C.text} fontSize="16">
          输入：{textInput ? '"3" : string' : "3 : number"}
        </text>
        <path
          d="M150 40 L185 70 L150 100 L115 70 Z"
          fill={C.bg}
          stroke={C.accent}
          strokeWidth="2"
        />
        <text x="150" y="76" textAnchor="middle" fill={C.text} fontSize="16">
          类型?
        </text>
        <path
          d="M115 70 H65 V158 M185 70 H235 V158"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
        />
        <path
          d={textInput ? "M185 70 H235 V158" : "M115 70 H65 V158"}
          fill="none"
          stroke={C.accent}
          strokeWidth="4"
        />
        <path
          d="M150 100 V126 H18 V362 H132"
          fill="none"
          stroke={C.border}
          strokeDasharray="5 4"
          strokeWidth="2"
        />
        <text x="24" y="306" fill={C.muted} fontSize="16">
          旁路原值3
        </text>
        <RunNode
          x={65}
          y={176}
          name="数值 × 配置"
          state={textInput ? "waiting" : fault ? "error" : "done"}
        />
        <RunNode
          x={235}
          y={176}
          name="解析后 × 配置"
          state={!textInput ? "waiting" : fault ? "error" : "done"}
        />
        <path
          d={`M${textInput ? 235 : 65} 214 V236 H150 V256`}
          fill="none"
          stroke={fault ? C.danger : C.accent}
          strokeWidth="3"
        />
        <text
          x="150"
          y="279"
          textAnchor="middle"
          fill={fault ? C.danger : C.text}
          fontSize="16"
        >
          {fault ? `"${3 * factor}" : string` : `${3 * factor} : number`}
        </text>
        <path
          d="M150 290 V344"
          fill="none"
          stroke={bad ? C.danger : C.accent}
          strokeDasharray={bad ? "4 4" : undefined}
          strokeWidth="3"
        />
        {fault && fallback && (
          <g>
            <path
              d="M150 290 H278 V338 H168"
              fill="none"
              stroke={C.accent}
              strokeWidth="3"
            />
            <circle cx="278" cy="312" r="10" fill={C.accent} />
            <text x="268" y="329" textAnchor="end" fill={C.text} fontSize="16">
              fallback → 0
            </text>
          </g>
        )}
        <RunNode
          x={150}
          y={362}
          name={bad ? "类型校验抛错" : `number + 3 = ${scaled + 3}`}
          state={bad ? "error" : "done"}
        />
        <text x="12" y="435" fill={C.text} fontSize="16">
          {bad
            ? "下游未运行；不做隐式拼接"
            : fault && fallback
              ? "显式降级：0 + 3，不是原结果"
              : "校验number后才进入加法"}
        </text>
        <text x="12" y="459" fill={C.muted} fontSize="16">
          灰线未选 / 实线已选 / 红线异常
        </text>
      </svg>
      <p role="status" aria-live="polite" className={NOTE}>
        {bad
          ? "失败：处理器返回string，边界校验抛出TypeError；下游加法不执行。"
          : `结果 ${scaled + 3}。${fault && fallback ? "fallback已把失败转换为明确的降级值0；必须报告降级。" : "未选支路不执行，原值旁路参与最终相加。"}`}{" "}
        ConfigurableField只声明可配置字段；不会自动修复输出类型。
      </p>
    </section>
  );
}

const CHUNKS = ['{"', 'sum":', "9}"] as const;
export function Lcp04BuildingChainsReleaseGateLab() {
  const [mode, setMode] = useState("stream");
  const [fault, setFault] = useState(false);
  const [buffer, setBuffer] = useState(false);
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      const clock = { value: 0 };
      tl.add(clock, { value: 3, duration: 3600, ease: "linear" }, 0);
      CHUNK_STEPS.forEach((step, i) => tl.label(step.label, i * 1200));
    },
    [],
  );
  const timeline = useTeachingTimeline({ steps: CHUNK_STEPS, build });
  const count = timeline.currentStep;
  const received = CHUNKS.slice(0, count).filter((_, i) => !(fault && i === 1));
  const visible =
    mode === "invoke" || buffer
      ? count === 3
        ? received.join("")
        : ""
      : received.join("");
  const valid = count === 3 && !fault;
  const reset = () => {
    setMode("stream");
    setFault(false);
    setBuffer(false);
    timeline.seek(0);
  };
  return (
    <section
      className={ROOT}
      data-visual-kind="lcp04-chunk-aggregation"
      aria-label="流式chunk聚合与批量输出实验"
    >
      <h3 className="font-semibold">
        03 / chunk不是最终对象，batch也不是token流
      </h3>
      <p className={NOTE}>
        固定字符串片段来自本地生成器，不是真模型流。每次到达相隔一个教学节拍。聚合用字符串连接；仅在收齐后解析JSON。batch示意两个独立输入的有序结果。
      </p>
      <label className="mt-3 block text-sm">
        调用方式
        <select
          aria-label="调用方式"
          className="mt-1 block min-w-44 rounded-lg border border-border bg-bg px-2"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            timeline.seek(0);
          }}
        >
          <option value="stream">stream：逐片可见</option>
          <option value="invoke">invoke：只看最终值</option>
          <option value="batch">batch：两个输入</option>
        </select>
      </label>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={BUTTON}
          aria-pressed={fault}
          onClick={() => {
            setFault(!fault);
            timeline.seek(0);
          }}
        >
          {mode === "batch" ? "首项失败" : "丢失中间chunk"}
        </button>
        <button
          type="button"
          className={BUTTON}
          disabled={mode !== "stream"}
          aria-pressed={buffer}
          onClick={() => {
            setBuffer(!buffer);
            timeline.seek(0);
          }}
        >
          缓冲中间步骤
        </button>
      </div>
      <svg
        viewBox="0 0 300 410"
        className={SVG}
        role="img"
        aria-label={
          mode === "batch"
            ? `batch已到第${count}步，输入顺序3、4，${fault ? "首项失败，默认整体抛错" : count === 3 ? "结果列表9、12" : "等待结果齐备"}`
            : `到达${count}个chunk，当前可见${visible || "空"}。${count === 3 ? (valid ? "JSON解析成功" : "JSON解析失败") : "尚未最终解析"}`
        }
      >
        {mode === "batch" ? (
          <g>
            {[3, 4].map((n, i) => (
              <g key={n}>
                <circle
                  cx="30"
                  cy={68 + i * 100}
                  r="20"
                  fill={C.bg}
                  stroke={C.accent}
                  strokeWidth="2"
                />
                <text
                  x="30"
                  y={74 + i * 100}
                  textAnchor="middle"
                  fill={C.text}
                  fontSize="16"
                >
                  {n}
                </text>
                <path
                  d={`M52 ${68 + i * 100} H68 M242 ${68 + i * 100} H274 V270 H150`}
                  fill="none"
                  stroke={i === 0 && fault ? C.danger : C.border}
                  strokeWidth="2"
                />
                <rect
                  x="70"
                  y={50 + i * 100}
                  width={count >= (i === 0 ? 3 : 2) ? 170 : count * 30}
                  height="36"
                  fill={i === 0 && fault ? C.danger : C.accent}
                  opacity="0.3"
                />
                <text x="76" y={74 + i * 100} fill={C.text} fontSize="16">
                  {count >= (i === 0 ? 3 : 2)
                    ? i === 0 && fault
                      ? "TypeError"
                      : `结果 ${n * 3}`
                    : `输入[${i}]处理中`}
                </text>
              </g>
            ))}
            <text x="12" y="242" fill={C.muted} fontSize="16">
              完成先后 ≠ 输出列表顺序
            </text>
            <text
              x="150"
              y="310"
              textAnchor="middle"
              fill={fault && count >= 3 ? C.danger : C.text}
              fontSize="18"
            >
              {fault && count >= 3
                ? "整体抛错，无成功列表"
                : count === 3
                  ? "[9, 12]"
                  : "等待全部结果"}
            </text>
            <text x="12" y="366" fill={C.muted} fontSize="16">
              默认抛错；未启用
            </text>
            <text x="12" y="387" fill={C.muted} fontSize="16">
              return_exceptions
            </text>
          </g>
        ) : (
          <g>
            <text x="12" y="26" fill={C.text} fontSize="16">
              到达磁带（按顺序拼接）
            </text>
            {CHUNKS.map((chunk, i) => (
              <g key={i}>
                <rect
                  x={12 + i * 96}
                  y="48"
                  width="84"
                  height="45"
                  fill={C.bg}
                  stroke={
                    count > i
                      ? fault && i === 1
                        ? C.danger
                        : C.accent
                      : C.border
                  }
                  strokeWidth="2"
                  strokeDasharray={fault && i === 1 ? "4 3" : undefined}
                />
                <text
                  x={54 + i * 96}
                  y="77"
                  textAnchor="middle"
                  fill={C.text}
                  fontSize="16"
                >
                  {count > i
                    ? fault && i === 1
                      ? "丢失"
                      : chunk
                    : `chunk ${i + 1}`}
                </text>
              </g>
            ))}
            <path
              d="M54 98 V126 H150 V160 M150 98 V160 M246 98 V126 H150"
              fill="none"
              stroke={C.border}
              strokeWidth="2"
            />
            <text x="12" y="150" fill={C.text} fontSize="16">
              {buffer || mode === "invoke"
                ? "等待完整值才可见"
                : "累加器 += chunk"}
            </text>
            <rect
              x="12"
              y="174"
              width={Math.max(12, visible.length * 18 + 16)}
              height="42"
              fill={C.accent}
              opacity="0.2"
            />
            <text x="20" y="202" fill={C.text} fontSize="18">
              {visible || "∅"}
            </text>
            <path d="M150 224 V267" stroke={C.border} strokeWidth="2" />
            <circle
              cx="150"
              cy="290"
              r="22"
              fill={C.bg}
              stroke={count < 3 ? C.border : valid ? C.accent : C.danger}
              strokeWidth="3"
            />
            <text
              x="150"
              y="296"
              textAnchor="middle"
              fill={C.text}
              fontSize="16"
            >
              {count < 3 ? "…" : valid ? "9" : "×"}
            </text>
            <text
              x="150"
              y="343"
              textAnchor="middle"
              fill={count === 3 && !valid ? C.danger : C.text}
              fontSize="16"
            >
              {count < 3
                ? "暂不做最终JSON解析"
                : valid
                  ? "JSON.parse → {sum:9}"
                  : "缺片 → JSON解析失败"}
            </text>
            <text x="12" y="377" fill={C.muted} fontSize="16">
              可见长度：{visible.length} / 完整长度：9
            </text>
          </g>
        )}
      </svg>
      <p className={NOTE} role="status" aria-live="polite">
        {mode === "batch"
          ? fault && count >= 3
            ? "首项失败：默认batch抛出异常，不把第二项成功包装成全批成功。"
            : count === 3
              ? "按输入顺序返回[9,12]，不是按完成顺序返回。"
              : "等待独立输入完成。"
          : `收到${count}次到达；可见缓冲：${visible || "空"}。${count < 3 ? "尚未最终解析。" : valid ? "最终对象 {sum:9}。" : "缺失片段，最终JSON无效。"}`}
      </p>
      <TimelineControls
        timeline={timeline}
        labelText={Object.fromEntries(
          CHUNK_STEPS.map((s) => [s.label, s.caption]),
        )}
        reset={{ label: "重置流与批量", onClick: reset }}
      />
    </section>
  );
}
