"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Timeline } from "animejs";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

export type SourceVariant =
  | "normal"
  | "missing-header"
  | "syntax-error"
  | "undefined-symbol"
  | "segfault";

export type BuildInput = {
  variant: SourceVariant;
  debug: boolean;
  optimize: boolean;
  makefile: boolean;
};

export const INITIAL_BUILD_INPUT: BuildInput = {
  variant: "normal",
  debug: false,
  optimize: false,
  makefile: false,
};

const VARIANTS: {
  value: SourceVariant;
  label: string;
  desc: string;
}[] = [
  { value: "normal", label: "正常", desc: "hello.c 调用本文件函数" },
  {
    value: "missing-header",
    label: "缺头文件",
    desc: "#include <stdio.h> 找不到",
  },
  { value: "syntax-error", label: "语法错误", desc: "少写一个分号" },
  {
    value: "undefined-symbol",
    label: "未定义符号",
    desc: "调用未实现的 foo()",
  },
  { value: "segfault", label: "段错误", desc: "空指针解引用" },
];

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

function compileCase(input: BuildInput) {
  const flags: string[] = ["-Wall"];
  if (input.debug) flags.push("-g");
  if (input.optimize) flags.push("-O2");
  const flagText = flags.join(" ");

  const failStage =
    input.variant === "missing-header"
      ? "preprocess"
      : input.variant === "syntax-error"
        ? "compile"
        : input.variant === "undefined-symbol"
          ? "link"
          : input.variant === "segfault"
            ? "run"
            : null;

  const stageOk = (stage: string) => {
    const order = ["preprocess", "compile", "assemble", "link", "run"];
    if (!failStage) return true;
    return order.indexOf(stage) < order.indexOf(failStage);
  };

  const gdbRelevant = input.variant === "segfault" && input.debug;
  const backtrace = gdbRelevant
    ? [
        { frame: 0, func: "main", file: "hello.c:7" },
        { frame: 1, func: "__libc_start_main", file: "libc-start.c" },
      ]
    : [];

  const explanations: Record<SourceVariant, string> = {
    normal:
      "预处理展开头文件，编译生成汇编，汇编生成目标文件，链接解析符号，最后得到可执行文件。",
    "missing-header":
      "预处理阶段找不到 stdio.h。这是编译前期错误，尚未进入语法分析；检查头文件路径、拼写或交叉编译 sysroot。",
    "syntax-error":
      "预处理成功，但编译阶段语法检查失败。gcc 会指出行号；必须先修语法再谈逻辑。",
    "undefined-symbol":
      "编译、汇编都通过，但链接时找不到 foo() 的定义。检查是否漏编译某个 .c 或漏链库。",
    segfault: input.debug
      ? "程序运行时空指针解引用崩溃。因为加了 -g，GDB 可以定位到 hello.c:7；否则只能看到汇编地址。"
      : "程序运行时空指针解引用崩溃。未加 -g 时 core 文件或 GDB 只能显示地址，不利于定位源码。",
  };

  return {
    flagText,
    failStage,
    stageOk,
    gdbRelevant,
    backtrace,
    explanation: explanations[input.variant],
    command: input.makefile ? "make" : `gcc ${flagText} hello.c -o hello`,
  };
}

const STEPS = [
  { label: "input", caption: "准备源码与参数" },
  { label: "preprocess", caption: "预处理 cpp" },
  { label: "compile", caption: "编译 cc" },
  { label: "assemble", caption: "汇编 as" },
  { label: "link", caption: "链接 ld" },
  { label: "run", caption: "运行 / 调试" },
] as const;

const LABELS = Object.fromEntries(STEPS.map((s) => [s.label, s.caption]));
const BEAT_MS = 1000;

function buildTimeline(tl: Timeline) {
  const clock = { beat: 0 };
  STEPS.forEach((s, i) => tl.label(s.label, i * BEAT_MS));
  tl.add(clock, { beat: [0, 6], duration: 6 * BEAT_MS, ease: "linear" }, 0);
}

const controlClass =
  "min-h-11 min-w-11 rounded-control border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function FileBox({
  x,
  y,
  label,
  ext,
  active,
  error,
}: {
  x: number;
  y: number;
  label: string;
  ext: string;
  active: boolean;
  error?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={72}
        height={56}
        rx={5}
        fill={active ? C.elevated : C.bg}
        stroke={error ? C.danger : active ? C.accent : C.border}
        strokeWidth={error ? 3 : active ? 2 : 1.5}
      />
      <text
        x={x + 36}
        y={y + 26}
        textAnchor="middle"
        fontSize={13}
        fontWeight={600}
        fill={error ? C.danger : C.primary}
        fontFamily="monospace"
      >
        {ext}
      </text>
      <text
        x={x + 36}
        y={y + 44}
        textAnchor="middle"
        fontSize={11}
        fill={C.secondary}
      >
        {label}
      </text>
    </g>
  );
}

function StageBox({
  x,
  y,
  label,
  cmd,
  active,
  error,
}: {
  x: number;
  y: number;
  label: string;
  cmd: string;
  active: boolean;
  error?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={110}
        height={56}
        rx={5}
        fill={active ? C.elevated : C.bg}
        stroke={error ? C.danger : active ? C.accent : C.border}
        strokeWidth={error ? 3 : active ? 2 : 1.5}
      />
      <text
        x={x + 55}
        y={y + 24}
        textAnchor="middle"
        fontSize={13}
        fontWeight={600}
        fill={error ? C.danger : C.primary}
      >
        {label}
      </text>
      <text
        x={x + 55}
        y={y + 44}
        textAnchor="middle"
        fontSize={11}
        fill={C.secondary}
        fontFamily="monospace"
      >
        {cmd}
      </text>
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  active,
  error,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active: boolean;
  error?: boolean;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const endX = x2 - ux * 6;
  const endY = y2 - uy * 6;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={endX}
        y2={endY}
        stroke={error ? C.danger : active ? C.accent : C.border}
        strokeWidth={active ? 2.5 : 1.5}
        markerEnd={
          error
            ? "url(#arrow-danger)"
            : active
              ? "url(#arrow-active)"
              : "url(#arrow)"
        }
      />
    </g>
  );
}

function BuildExperiment({ onReset }: { onReset: () => void }) {
  const [input, setInput] = useState<BuildInput>({ ...INITIAL_BUILD_INPUT });
  const [prediction, setPrediction] = useState<string>("");
  const id = useId();
  const result = compileCase(input);
  const timeline = useTeachingTimeline({ steps: STEPS, build: buildTimeline });
  const pauseRef = useRef(timeline.pause);

  useEffect(() => {
    pauseRef.current = timeline.pause;
  });
  useEffect(() => {
    if (timeline.reducedMotion) pauseRef.current();
  }, [timeline.reducedMotion]);

  const frame = timeline.currentStep;
  const stepLabel = STEPS[frame].label;

  const change = <K extends keyof BuildInput>(key: K, value: BuildInput[K]) => {
    timeline.goToStep(0);
    setInput((prev) => ({ ...prev, [key]: value }));
    setPrediction("");
  };

  const stages = [
    { key: "preprocess", label: "预处理", cmd: "cpp", x: 126 },
    { key: "compile", label: "编译", cmd: "cc1", x: 252 },
    { key: "assemble", label: "汇编", cmd: "as", x: 378 },
    { key: "link", label: "链接", cmd: "ld", x: 504 },
  ] as const;

  const predictionOptions = [
    ["preprocess", "预处理失败"],
    ["compile", "编译失败"],
    ["assemble", "汇编失败"],
    ["link", "链接失败"],
    ["run", "运行崩溃 / 成功"],
  ] as const;

  const failStepIndex = result.failStage
    ? stages.findIndex((s) => s.key === result.failStage) + 1
    : null;

  return (
    <section
      data-testid="programming-environment-lab"
      data-frame={frame}
      data-playing={timeline.isPlaying && !timeline.reducedMotion}
      aria-label="Linux 编程环境：从源码到可执行文件的构建与调试实验"
      className="not-prose my-6 min-w-0 rounded-card border border-border bg-elevated p-3 text-primary sm:p-5"
    >
      <h3 className="text-lg font-semibold">源码 → 可执行文件 → 调试</h3>
      <p className="my-2 text-sm text-secondary">
        有限教学模型，不运行真实
        gcc/gdb。单文件或多文件、是否带调试符号、不同故障注入，
        决定流水线在哪一步停止以及能否定位问题。
      </p>

      <fieldset className="my-3 min-w-0">
        <legend className="mb-2 text-sm font-semibold">1 · 源码与故障</legend>
        <div className="flex flex-wrap gap-2">
          {VARIANTS.map((v) => (
            <button
              key={v.value}
              type="button"
              data-testid={`prog-env-variant-${v.value}`}
              aria-pressed={input.variant === v.value}
              onClick={() => change("variant", v.value)}
              className={`${controlClass} ${input.variant === v.value ? "border-accent text-accent" : "border-border"}`}
            >
              {v.label}
              <span className="ml-2 text-xs text-secondary">{v.desc}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="my-3 flex flex-wrap gap-2">
        <legend className="text-sm font-semibold">2 · 编译选项</legend>
        <button
          type="button"
          data-testid="prog-env-debug"
          aria-pressed={input.debug}
          onClick={() => change("debug", !input.debug)}
          className={`${controlClass} border-border`}
        >
          -g 调试符号 · {input.debug ? "开" : "关"}
        </button>
        <button
          type="button"
          data-testid="prog-env-optimize"
          aria-pressed={input.optimize}
          onClick={() => change("optimize", !input.optimize)}
          className={`${controlClass} border-border`}
        >
          -O2 优化 · {input.optimize ? "开" : "关"}
        </button>
        <button
          type="button"
          data-testid="prog-env-makefile"
          aria-pressed={input.makefile}
          onClick={() => change("makefile", !input.makefile)}
          className={`${controlClass} border-border`}
        >
          Makefile 多文件 · {input.makefile ? "开" : "关"}
        </button>
      </fieldset>

      <p
        className="break-words rounded-control border border-border p-3 font-mono text-sm"
        data-testid="prog-env-command"
      >
        {result.command}
      </p>

      <fieldset className="my-3 min-w-0">
        <legend className="mb-2 text-sm font-semibold">
          3 · 先预测：流水线会在哪一步出问题？
        </legend>
        <div className="flex flex-wrap gap-2">
          {predictionOptions.map(([value, label]) => (
            <button
              key={value}
              type="button"
              data-testid={`prog-env-predict-${value}`}
              aria-pressed={prediction === value}
              disabled={frame > 0}
              onClick={() => setPrediction(value)}
              className={`${controlClass} ${prediction === value ? "border-accent text-accent" : "border-border"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <svg
        viewBox="0 0 760 380"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        className="my-3 block h-auto w-full"
        style={{ fontSize: 14 }}
      >
        <title id={`${id}-title`}>GCC 编译流水线与 GDB 调试示意图</title>
        <desc id={`${id}-desc`}>
          左侧源码经过预处理、编译、汇编、链接四个阶段生成可执行文件；失败阶段用红色高亮。
          右侧显示程序运行结果或 GDB 调用栈。
        </desc>

        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path
              d="M0,0 L6,3 L0,6"
              fill="none"
              stroke={C.border}
              strokeWidth="1.5"
            />
          </marker>
          <marker
            id="arrow-active"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path
              d="M0,0 L6,3 L0,6"
              fill="none"
              stroke={C.accent}
              strokeWidth="2"
            />
          </marker>
          <marker
            id="arrow-danger"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path
              d="M0,0 L6,3 L0,6"
              fill="none"
              stroke={C.danger}
              strokeWidth="2.5"
            />
          </marker>
        </defs>

        <text x="12" y="24" fill={C.primary} fontSize={14} fontWeight={600}>
          编译流水线
        </text>

        <FileBox
          x={20}
          y={48}
          label={input.makefile ? "main.c" : "hello.c"}
          ext={input.makefile ? ".c" : ".c"}
          active={frame >= 0}
        />

        {input.makefile && (
          <FileBox
            x={20}
            y={120}
            label="helper.c"
            ext=".c"
            active={frame >= 0}
          />
        )}

        {stages.map((s, i) => {
          const reached = frame >= i + 1;
          const isFail = result.failStage === s.key;
          const prevX =
            i === 0 ? (input.makefile ? 70 : 56) : stages[i - 1].x + 88;
          const prevY = input.makefile && i === 0 ? 84 : 76;
          return (
            <g key={s.key}>
              <Arrow
                x1={prevX}
                y1={prevY}
                x2={s.x - 12}
                y2={76}
                active={reached}
                error={isFail}
              />
              {input.makefile && i === 0 && (
                <Arrow
                  x1={70}
                  y1={156}
                  x2={s.x - 12}
                  y2={92}
                  active={reached}
                  error={isFail}
                />
              )}
              <StageBox
                x={s.x}
                y={48}
                label={s.label}
                cmd={s.cmd}
                active={reached && !isFail}
                error={isFail}
              />
            </g>
          );
        })}

        <Arrow
          x1={stages[stages.length - 1].x + 110}
          y1={76}
          x2={642}
          y2={76}
          active={frame >= 5}
          error={result.failStage === "run"}
        />

        <FileBox
          x={644}
          y={48}
          label={input.makefile ? "app" : "hello"}
          ext="exec"
          active={frame >= 4 && !result.failStage}
          error={result.failStage === "run"}
        />

        {result.failStage &&
          failStepIndex !== null &&
          frame >= failStepIndex && (
            <g>
              <rect
                x={16}
                y={188}
                width={728}
                height={64}
                rx={6}
                fill={C.bg}
                stroke={C.danger}
                strokeWidth={2}
                strokeDasharray="5 3"
              />
              <text
                x="32"
                y="218"
                fill={C.danger}
                fontSize={13}
                fontWeight={600}
              >
                错误：
                {result.failStage === "preprocess" &&
                  "预处理失败：找不到头文件"}
                {result.failStage === "compile" && "编译失败：语法错误"}
                {result.failStage === "link" && "链接失败：未定义符号"}
                {result.failStage === "run" && "运行崩溃：段错误"}
              </text>
              <text x="32" y="240" fill={C.secondary} fontSize={12}>
                {result.explanation}
              </text>
            </g>
          )}

        {frame >= 5 && !result.failStage && (
          <g>
            <rect
              x={16}
              y={188}
              width={728}
              height={56}
              rx={6}
              fill={C.bg}
              stroke={C.success}
              strokeWidth={2}
            />
            <text
              x="32"
              y="218"
              fill={C.success}
              fontSize={13}
              fontWeight={600}
            >
              运行成功
            </text>
            <text x="32" y="238" fill={C.secondary} fontSize={12}>
              {result.explanation}
            </text>
          </g>
        )}

        {result.gdbRelevant && frame >= 5 && (
          <g>
            <text
              x="16"
              y="286"
              fill={C.primary}
              fontSize={13}
              fontWeight={600}
            >
              GDB 调用栈（需 -g 才有源码行号）
            </text>
            <rect
              x={16}
              y={296}
              width={728}
              height={72}
              rx={6}
              fill={C.bg}
              stroke={C.border}
              strokeWidth={1.5}
            />
            {result.backtrace.map((bt, i) => (
              <g key={i}>
                <text
                  x={32}
                  y={320 + i * 22}
                  fill={C.primary}
                  fontSize={12}
                  fontFamily="monospace"
                >
                  #{bt.frame} {bt.func} at {bt.file}
                </text>
              </g>
            ))}
            <text
              x={32}
              y={320 + result.backtrace.length * 22}
              fill={C.secondary}
              fontSize={11}
            >
              输入 bt（backtrace）可查看完整调用栈。
            </text>
          </g>
        )}

        {!result.gdbRelevant && frame >= 5 && result.failStage === "run" && (
          <g>
            <text x="16" y="286" fill={C.warning} fontSize={12}>
              未加 -g：崩溃时只能看到地址，难以对应源码行。
            </text>
          </g>
        )}
      </svg>

      <p
        role="status"
        data-testid="prog-env-explanation"
        className="my-3 text-sm leading-7"
      >
        当前步骤：{LABELS[stepLabel]}。
        {frame === 0
          ? "选择源码、编译选项与故障，先预测结果，再播放或单步。"
          : result.explanation}
        {frame === 5 && prediction && (
          <>
            {" "}
            预测
            {prediction === (result.failStage ?? "run") ? "正确" : "不符"}。
          </>
        )}
      </p>

      <div
        data-testid="prog-env-timeline"
        className="[&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11"
      >
        <TimelineControls
          timeline={timeline}
          labelText={LABELS}
          caption={
            timeline.reducedMotion
              ? "减少动态效果已开启：自动播放隐藏，仍可逐步或拖动观察。"
              : "共六步；播放、暂停、前后步进或拖进度均可。"
          }
          reset={{
            label: "重置",
            ariaLabel: "重置：恢复源码、选项、预测与播放",
            onClick: onReset,
          }}
        />
      </div>

      <details className="mt-3 text-sm">
        <summary className="min-h-11 cursor-pointer py-3">模型边界</summary>
        <p>
          本模型只演示单文件 hello.c 或双文件 main.c/helper.c 的固定教学路径，
          不执行真实命令。实际 gcc 输出、错误文本和阶段划分可能因版本而异； -O2
          优化可能让调试信息更难对应源码，但不改变 -g 是否存在的根本区别。
        </p>
      </details>
    </section>
  );
}

export function Lop05ProgrammingEnvironmentLab() {
  const [epoch, setEpoch] = useState(0);
  return (
    <BuildExperiment
      key={epoch}
      onReset={() => setEpoch((value) => value + 1)}
    />
  );
}
