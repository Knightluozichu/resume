"use client";

import { useCallback, useId, useMemo, useState } from "react";
import {
  TimelineControls,
  TEACHING_BEAT_MS,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type BuildTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";

type Mode = "count" | "bug" | "input";
type Phase =
  | "start"
  | "test"
  | "update"
  | "read"
  | "filter"
  | "print"
  | "continue"
  | "break"
  | "end"
  | "stalled";
type Frame = {
  phase: Phase;
  line: number;
  n: number;
  consumed: number;
  raw: string | null;
  output: string[];
  explanation: string;
};
const INPUTS = ["2", "", "quit", "4"];
const PHASE_LABELS: Record<Phase, string> = {
  start: "准备",
  test: "检查条件",
  update: "更新状态",
  read: "读取一行",
  filter: "判断分支",
  print: "输出",
  continue: "返回检查",
  break: "立即退出",
  end: "循环结束",
  stalled: "重复状态（演示截断）",
};
const C = {
  bg: "var(--bg)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};

export function whileLabCode(mode: Mode, limit: number): string[] {
  if (mode === "input")
    return [
      "while True:",
      '    raw = input("值或 quit: ").strip()',
      '    if raw == "quit":',
      "        break",
      '    if raw == "":',
      "        continue",
      "    print(raw)",
      'print("结束")',
    ];
  const first = ["n = 0", `while n < ${limit}:`];
  const filter = ["    if n % 2 == 0:", "        continue", "    print(n)"];
  return mode === "count"
    ? [...first, "    n += 1", ...filter, 'print("结束")']
    : [...first, ...filter, "    n += 1", 'print("结束")'];
}

/** Deterministic instruction snapshots, not an embedded Python interpreter. */
export function buildWhileTrace(mode: Mode, limit: number): Frame[] {
  const frames: Frame[] = [];
  let n = 0;
  let consumed = 0;
  let raw: string | null = null;
  const output: string[] = [];
  const record = (phase: Phase, line: number, explanation: string) => {
    frames.push({
      phase,
      line,
      n,
      consumed,
      raw,
      output: [...output],
      explanation,
    });
  };
  record(
    "start",
    mode === "input" ? -1 : 0,
    "先预测，再单步。代码高亮表示刚执行的语句；输出区只记录循环体的 print。",
  );
  if (mode === "input") {
    for (const item of INPUTS) {
      record(
        "test",
        0,
        "while True 的条件始终为真；只能靠循环体里的退出路径结束。",
      );
      raw = item;
      consumed += 1;
      record(
        "read",
        1,
        `input 取走第 ${consumed} 行，strip 后 raw = ${JSON.stringify(raw)}；数字外观仍然是字符串。`,
      );
      record(
        "filter",
        2,
        `raw == "quit" 为 ${raw === "quit" ? "True" : "False"}。`,
      );
      if (raw === "quit") {
        record(
          "break",
          3,
          "break 离开最近一层循环，不再检查 while True；第四行 4 未被读取。",
        );
        record(
          "end",
          7,
          "执行循环外的 print，另输出“结束”。循环体输出只有字符串 2。",
        );
        return frames;
      }
      record("filter", 4, `raw == "" 为 ${raw === "" ? "True" : "False"}。`);
      if (raw === "") {
        record(
          "continue",
          5,
          "空行不输出。continue 回到条件检查；下一轮会重新调用 input，所以仍能前进。",
        );
      } else {
        output.push(raw);
        record("print", 6, "print(raw) 执行一次；沿右侧回路重新检查条件。");
      }
    }
    return frames;
  }
  let repeats = 0;
  while (true) {
    record(
      "test",
      1,
      `检查 ${n} < ${limit}：${n < limit ? "True，进入循环体" : "False，直接离开循环"}。`,
    );
    if (n >= limit) {
      record(
        "end",
        6,
        "条件为假，执行循环外的 print，另输出“结束”。上限为 0 时循环体一次也不执行。",
      );
      return frames;
    }
    if (mode === "count") {
      n += 1;
      record(
        "update",
        2,
        `n 增加到 ${n}，剩余距离为 ${limit - n}。即使稍后 continue，这次推进也不会撤销。`,
      );
    }
    record(
      "filter",
      mode === "count" ? 3 : 2,
      `把 ${n} 个分成每组 2 个：有 ${Math.floor(n / 2)} 组，余 ${n % 2} 个。取模（modulo）得到 ${n} % 2 = ${n % 2}；${n % 2 === 0 ? "偶数，走 continue" : "奇数，走 print"}。`,
    );
    if (n % 2 === 0) {
      record(
        "continue",
        mode === "count" ? 4 : 3,
        mode === "bug"
          ? "continue 跳过下方 print 和 n += 1，回到 while 时 n 仍是 0。"
          : "continue 只跳过本轮 print，沿左侧回路再次检查 while。",
      );
      if (mode === "bug" && ++repeats === 2) {
        record(
          "stalled",
          3,
          "已两次回到相同状态 n=0。演示在此截断轨迹，不代表 Python 自动退出：真实程序会一直重复，可用 Ctrl+C 中断。",
        );
        return frames;
      }
      continue;
    }
    output.push(String(n));
    record(
      "print",
      mode === "count" ? 5 : 4,
      `输出 ${n}。注意输出条数不是循环轮数，偶数轮也执行过。`,
    );
    if (mode === "bug") {
      n += 1;
      record("update", 5, `n 更新为 ${n}。但偶数分支根本到不了这一行。`);
    }
  }
}

function WhilePlayback({ mode, limit }: { mode: Mode; limit: number }) {
  const marker = useId().replace(/:/g, "");
  const frames = useMemo(() => buildWhileTrace(mode, limit), [mode, limit]);
  const steps = useMemo(
    () =>
      frames.map((frame, i) => ({
        label: `${i + 1}：${PHASE_LABELS[frame.phase]}`,
      })),
    [frames],
  );
  const build = useCallback<BuildTimeline>(
    (tl) => {
      const clock = { tick: 0 };
      frames.forEach((_, i) => {
        tl.label(steps[i].label, i * TEACHING_BEAT_MS);
        tl.add(
          clock,
          { tick: i + 1, duration: TEACHING_BEAT_MS, ease: "linear" },
          i * TEACHING_BEAT_MS,
        );
      });
    },
    [frames, steps],
  );
  const timeline = useTeachingTimeline({ steps, build });
  const frame = frames[timeline.currentStep] ?? frames[0];
  const code = whileLabCode(mode, limit);
  const inputMode = mode === "input";
  const stopped = frame.phase === "end" || frame.phase === "break";
  const looping = frame.phase === "continue" || frame.phase === "stalled";
  const active = (phase: Phase) =>
    frame.phase === phase ? C.accent : C.border;
  const token = {
    start: [150, 18],
    test: [150, 35],
    update: mode === "bug" ? [282, 280] : [150, 122],
    read: [150, 122],
    filter: [150, 187],
    print: [110, 282],
    continue: [30, 219],
    break: [302, 143],
    end: [302, 44],
    stalled: [30, 219],
  }[frame.phase];
  return (
    <>
      <svg
        viewBox="0 0 360 510"
        role="img"
        className="mx-auto block w-full max-w-[420px]"
        aria-label={`循环执行轨迹。圆点为当前位置，左回路为 continue，右回路为正常返回，右上为退出。n=${frame.n}，已读 ${frame.consumed} 行，循环体输出 ${frame.output.join("、") || "空"}。`}
      >
        <defs>
          <marker
            id={marker}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
          </marker>
        </defs>
        <g fill="none" strokeWidth="2" markerEnd={`url(#${marker})`}>
          <path
            d={
              mode === "bug"
                ? "M150 20 V35 M150 100 V187 M150 258 V282"
                : "M150 20 V35 M150 100 V122 M150 165 V187 M150 258 V282"
            }
            stroke={C.border}
          />
          <path
            d={
              mode === "bug"
                ? "M195 301 H222 M282 280 V263 H258 V110 H209 L174 84"
                : "M150 320 V338 H258 V110 H209 L174 84"
            }
            stroke={frame.phase === "print" ? C.accent : C.border}
          />
          <path
            d="M102 222 H30 V67 H102"
            stroke={looping ? (mode === "bug" ? C.danger : C.accent) : C.border}
            strokeWidth={looping ? 4 : 2}
          />
          <path d="M198 67 H279" stroke={stopped ? C.accent : C.border} />
          {inputMode && (
            <path
              d="M198 211 H302 V89"
              stroke={frame.phase === "break" ? C.accent : C.border}
            />
          )}
        </g>
        <path
          d="M150 35 L198 67 L150 100 L102 67 Z"
          fill={C.bg}
          stroke={active("test")}
          strokeWidth="2"
        />
        <rect
          x={mode === "bug" ? 222 : 93}
          y={mode === "bug" ? 280 : 122}
          width="114"
          height="43"
          rx="18"
          fill={C.bg}
          stroke={inputMode ? active("read") : active("update")}
          strokeWidth="2"
          strokeDasharray={mode === "bug" ? "5 4" : undefined}
        />
        <path
          d="M150 187 L207 222 L150 258 L93 222 Z"
          fill={C.bg}
          stroke={active("filter")}
          strokeWidth="2"
        />
        <path
          d="M106 282 H212 L195 320 H89 Z"
          fill={C.bg}
          stroke={active("print")}
          strokeWidth="2"
        />
        <circle
          cx="302"
          cy="67"
          r="23"
          fill={C.bg}
          stroke={stopped ? C.accent : C.border}
          strokeWidth="3"
        />
        <g fill={C.primary} fontSize="16" textAnchor="middle">
          <text x="150" y="73">
            {inputMode ? "True" : `n < ${limit}`}
          </text>
          <text x={mode === "bug" ? 279 : 150} y={mode === "bug" ? 307 : 149}>
            {inputMode ? "input()" : "n += 1"}
          </text>
          <text x="150" y="228">
            {inputMode ? "quit / 空行?" : "n % 2 = 0?"}
          </text>
          <text x="150" y="307">
            print
          </text>
          <text x="302" y="73">
            退出
          </text>
          <text
            x="53"
            y="182"
            fill={mode === "bug" && looping ? C.danger : C.secondary}
          >
            跳过
          </text>
          <text x="292" y={mode === "bug" ? 250 : 295} fill={C.secondary}>
            返回
          </text>
          <text x="236" y="54" fill={C.secondary}>
            假
          </text>
          {inputMode && (
            <text x="303" y="182" fill={C.secondary}>
              break
            </text>
          )}
        </g>
        <circle
          cx={token[0]}
          cy={token[1]}
          r="7"
          fill={frame.phase === "stalled" ? C.danger : C.accent}
          stroke={C.bg}
          strokeWidth="2"
        />
        <g fontSize="16" fill={C.primary}>
          <text x="18" y="371">
            {inputMode
              ? `已读 ${frame.consumed}/4 行；未读项仍留在右侧`
              : `状态尺：n = ${frame.n}，上限 = ${limit}`}
          </text>
          {inputMode ? (
            INPUTS.map((value, i) => (
              <g key={i} opacity={i < frame.consumed - 1 ? 0.5 : 1}>
                <rect
                  x={18 + i * 83}
                  y="387"
                  width="75"
                  height="42"
                  rx="5"
                  fill={C.bg}
                  stroke={i === frame.consumed - 1 ? C.accent : C.border}
                  strokeWidth="2"
                />
                <text x={55 + i * 83} y="414" textAnchor="middle">
                  {value ? `"${value}"` : '""'}
                </text>
                {i < frame.consumed && (
                  <path
                    d={`M${43 + i * 83} 435 h24`}
                    stroke={C.accent}
                    strokeWidth="3"
                  />
                )}
              </g>
            ))
          ) : (
            <>
              <path d="M30 405 H324" stroke={C.border} strokeWidth="3" />
              <path
                d={`M30 405 H${30 + frame.n * 49}`}
                stroke={C.accent}
                strokeWidth="5"
              />
              {Array.from({ length: 7 }, (_, i) => (
                <g key={i}>
                  <path d={`M${30 + i * 49} 399 v12`} stroke={C.secondary} />
                  <text x={30 + i * 49} y="435" textAnchor="middle">
                    {i}
                  </text>
                </g>
              ))}
              <path
                d={`M${30 + limit * 49} 386 v30`}
                stroke={C.secondary}
                strokeDasharray="3 3"
              />
              <circle
                cx={30 + frame.n * 49}
                cy="405"
                r="9"
                fill={frame.phase === "stalled" ? C.danger : C.accent}
              />
            </>
          )}
          <text x="18" y="467">
            循环体输出（按先后顺序）：
          </text>
          {frame.output.length ? (
            frame.output.map((value, i) => (
              <g key={i}>
                <circle
                  cx={40 + i * 56}
                  cy="490"
                  r="17"
                  fill={C.bg}
                  stroke={C.accent}
                  strokeWidth="2"
                />
                <text x={40 + i * 56} y="496" textAnchor="middle">
                  {value}
                </text>
              </g>
            ))
          ) : (
            <text x="18" y="497" fill={C.secondary}>
              空
            </text>
          )}
        </g>
      </svg>
      <p className="text-sm text-secondary">
        实心点标记执行位置；状态尺/输入带和输出随执行更新。虚线更新框表示错误版本把更新移到了
        print 后面。
      </p>
      <div className="[&_ol]:hidden [&_button]:min-h-11 [&_button]:min-w-11 [&_button>span]:hidden [&_input]:min-h-11 [&_.justify-center]:flex-wrap">
        <TimelineControls
          timeline={timeline}
          caption="可播放、暂停、单步或拖动；切换场景会回到初始状态。"
          reset={{ label: "重置本次轨迹", onClick: () => timeline.goToStep(0) }}
        />
      </div>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="my-3 min-h-20 rounded-control border border-border p-3 text-sm text-primary"
      >
        {frame.explanation}
      </p>
      <pre
        aria-label="对应 Python 代码，高亮为刚执行的行"
        className="!whitespace-pre-wrap !break-words rounded-control border border-border bg-elevated p-3 text-xs leading-6"
      >
        <code>
          {code.map((line, i) => (
            <span
              key={i}
              className={`block ${frame.line === i ? "bg-accent/10 text-accent" : "text-secondary"}`}
              aria-current={frame.line === i ? "step" : undefined}
            >{`${i + 1}  ${line}`}</span>
          ))}
        </code>
      </pre>
      <p className="text-xs text-secondary">
        这是上述有限示例的执行模型，不是浏览器内 Python
        解释器。故障轨迹只展示两次重复，不会在网页执行无限循环。
      </p>
    </>
  );
}

export function PccUserInputWhileLab() {
  const [mode, setMode] = useState<Mode>("count");
  const [limit, setLimit] = useState(3);
  const [prediction, setPrediction] = useState("");
  const [revision, setRevision] = useState(0);
  const id = useId();
  return (
    <section
      aria-label="输入与 while 循环执行实验"
      className="not-prose my-8 min-w-0 rounded-card border border-border bg-elevated p-4 text-primary sm:p-6"
    >
      <h3 className="text-lg font-semibold">追踪一轮：状态是否真的前进？</h3>
      <p className="my-3 text-sm text-secondary">
        先预测：正常版到上限 3 会输出什么？更新移到 continue
        后面还能退出吗？输入 quit 后，第四行会被读取吗？
      </p>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <label className="min-w-0 text-sm" htmlFor={`${id}-mode`}>
          执行场景
          <select
            id={`${id}-mode`}
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="mt-1 min-h-11 w-full min-w-0 rounded-control border border-border bg-elevated px-2"
          >
            <option value="count">计数：先更新，再 continue</option>
            <option value="bug">故障：continue 跳过更新</option>
            <option value="input">输入：空行跳过，quit 退出</option>
          </select>
        </label>
        <label className="min-w-0 text-sm" htmlFor={`${id}-limit`}>
          计数上限（输入场景不使用）
          <select
            id={`${id}-limit`}
            value={limit}
            disabled={mode === "input"}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="mt-1 min-h-11 w-full rounded-control border border-border bg-elevated px-2 disabled:opacity-50"
          >
            {[0, 3, 6].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="my-3 block text-sm" htmlFor={`${id}-prediction`}>
        我的预测（不自动评分）
        <input
          id={`${id}-prediction`}
          value={prediction}
          onChange={(e) => setPrediction(e.target.value)}
          maxLength={160}
          placeholder="输出……；退出原因……"
          className="mt-1 min-h-11 w-full min-w-0 rounded-control border border-border bg-elevated px-3"
        />
      </label>
      <WhilePlayback
        key={`${mode}-${limit}-${revision}`}
        mode={mode}
        limit={limit}
      />
      <button
        type="button"
        onClick={() => {
          setMode("count");
          setLimit(3);
          setPrediction("");
          setRevision((value) => value + 1);
        }}
        className="mt-3 min-h-11 min-w-11 rounded-control border border-border px-3 text-sm"
      >
        重置全部：恢复默认并清空预测
      </button>
    </section>
  );
}
