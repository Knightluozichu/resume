"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Timeline } from "animejs";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

export type InputCase =
  | "normal"
  | "empty"
  | "nan"
  | "out-of-range"
  | "cmd-fail";

export type ScriptConfig = {
  strictMode: boolean;
  validateInput: boolean;
  useFunction: boolean;
  trapCleanup: boolean;
};

export const INITIAL_SCRIPT_CONFIG: ScriptConfig = {
  strictMode: true,
  validateInput: true,
  useFunction: true,
  trapCleanup: true,
};

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

const STEPS = [
  { label: "shebang", caption: "shebang：选择解释器" },
  { label: "strict", caption: "strict mode：失败即停、未定义变量、管道错误" },
  { label: "read", caption: "read：读取用户输入" },
  { label: "validate", caption: "输入校验：类型与范围" },
  { label: "branch", caption: "分支/循环：比较猜测值" },
  { label: "function", caption: "函数调用：模块化判断" },
  { label: "trap", caption: "trap EXIT：清理临时目录" },
  { label: "exit", caption: "退出码与副作用" },
] as const;

const LABELS = Object.fromEntries(STEPS.map((s) => [s.label, s.caption]));
const BEAT_MS = 900;

function buildTimeline(tl: Timeline) {
  const clock = { beat: 0 };
  STEPS.forEach((s, i) => tl.label(s.label, i * BEAT_MS));
  tl.add(clock, { beat: [0, 8], duration: 8 * BEAT_MS, ease: "linear" }, 0);
}

const INPUT_CASES: {
  value: InputCase;
  label: string;
  inputText: string;
  hint: string;
}[] = [
  { value: "normal", label: "正常", inputText: "42", hint: "命中 secret" },
  { value: "empty", label: "空输入", inputText: "", hint: "直接回车" },
  { value: "nan", label: "非数字", inputText: "abc", hint: "类型错误" },
  { value: "out-of-range", label: "越界", inputText: "101", hint: "范围错误" },
  {
    value: "cmd-fail",
    label: "前置命令失败",
    inputText: "-",
    hint: "脚本里有一行 false",
  },
];

const PREDICTIONS = [
  { value: "success", label: "状态 0：命中并清理" },
  { value: "validation", label: "校验失败（状态非零）" },
  { value: "runtime", label: "运行时错误/提前退出" },
  { value: "miss", label: "运行但未命中（状态非零）" },
] as const;

export type SimulationOutcome =
  | "success"
  | "validation"
  | "runtime"
  | "miss"
  | "unset";

export type SimulationResult = {
  secret: number;
  inputText: string;
  status: number | null;
  stdout: string[];
  stderr: string[];
  tempRemoved: boolean;
  failedAt: (typeof STEPS)[number]["label"] | null;
  runtimeError: boolean;
  validationError: boolean;
  outcome: SimulationOutcome;
  explanation: string;
};

export function runScriptSimulation(
  config: ScriptConfig,
  inputCase: InputCase,
): SimulationResult {
  const secret = 42;
  const inputText =
    inputCase === "normal"
      ? "42"
      : inputCase === "empty"
        ? ""
        : inputCase === "nan"
          ? "abc"
          : inputCase === "out-of-range"
            ? "101"
            : "42";

  const stdout: string[] = [];
  const stderr: string[] = [];
  const tempRemoved = config.trapCleanup;

  function build(
    outcome: SimulationOutcome,
    explanation: string,
    partial: {
      status?: number | null;
      failedAt?: (typeof STEPS)[number]["label"] | null;
      runtimeError?: boolean;
      validationError?: boolean;
    } = {},
  ): SimulationResult {
    return {
      secret,
      inputText,
      status: partial.status ?? null,
      stdout,
      stderr,
      tempRemoved,
      failedAt: partial.failedAt ?? null,
      runtimeError: partial.runtimeError ?? false,
      validationError: partial.validationError ?? false,
      outcome,
      explanation,
    };
  }

  // 前置命令失败：在 read 之前执行 false
  if (inputCase === "cmd-fail") {
    if (config.strictMode) {
      stderr.push("set -e：false 返回非零，脚本在第 3 行提前退出");
      return build(
        "runtime",
        "strict mode 让命令失败立即终止；trap 仍会在 EXIT 时运行。",
        {
          status: 1,
          failedAt: "strict",
          runtimeError: true,
        },
      );
    }
    stderr.push("false 返回非零，但 strict 关闭，脚本继续执行");
  }

  // 输入校验
  if (inputText === "") {
    if (config.validateInput) {
      stderr.push("输入校验：guess 为空字符串");
      return build(
        "validation",
        "校验在算术比较前拦截空输入；临时目录是否清理取决于 trap。",
        {
          status: 1,
          failedAt: "validate",
          validationError: true,
        },
      );
    }
    stderr.push("((  < 42 ))：空值不是合法算术操作数");
    return build("runtime", "未校验就进入算术表达式，空值导致操作数错误。", {
      status: 1,
      failedAt: "branch",
      runtimeError: true,
    });
  }

  if (inputText === "abc") {
    if (config.validateInput) {
      stderr.push("输入校验：abc 不是整数");
      return build("validation", "正则 ^[0-9]+$ 拒绝非数字输入。", {
        status: 1,
        failedAt: "validate",
        validationError: true,
      });
    }
    stderr.push("(( abc < 42 ))：abc 不是合法算术操作数");
    return build(
      "runtime",
      "未做校验直接进入算术表达式，字符串导致语法错误。",
      {
        status: 1,
        failedAt: "branch",
        runtimeError: true,
      },
    );
  }

  if (inputText === "101") {
    if (config.validateInput) {
      stderr.push("输入校验：101 超出 1-100");
      return build("validation", "范围校验在比较前拦截越界值。", {
        status: 1,
        failedAt: "validate",
        validationError: true,
      });
    }
    const n = 101;
    if (n === secret) {
      stdout.push("命中！");
      return build("success", "输入与 secret 一致，脚本正常退出。", {
        status: 0,
      });
    }
    stdout.push(n < secret ? "太小" : "太大");
    return build(
      "miss",
      "101 是合法整数但比 secret 大；脚本输出 '太大' 并以状态 1 结束，未命中。",
      { status: 1 },
    );
  }

  // 正常输入 42
  stdout.push("命中！");
  return build(
    "success",
    "输入与 secret 一致，脚本正常退出；trap 清理临时目录。",
    {
      status: 0,
    },
  );
}

const buttonClass =
  "min-h-11 min-w-11 rounded-control border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent whitespace-normal break-words";

function StepLine({
  y,
  active,
  error,
  children,
}: {
  y: number;
  active: boolean;
  error?: boolean;
  children: string;
}) {
  return (
    <text
      x={16}
      y={y}
      fill={error ? C.danger : active ? C.primary : C.secondary}
      fontSize={13}
      fontFamily="monospace"
      fontWeight={active ? 600 : 400}
    >
      {children}
    </text>
  );
}

function ScriptSourcePanel({
  config,
  frame,
  failedAt,
}: {
  config: ScriptConfig;
  frame: number;
  failedAt: SimulationResult["failedAt"];
}) {
  const lines: { text: string; step: (typeof STEPS)[number]["label"] }[] = [
    { text: "#!/usr/bin/env bash", step: "shebang" },
    {
      text: config.strictMode
        ? "set -euo pipefail"
        : "# set -euo pipefail 已关闭",
      step: "strict",
    },
    {
      text: config.trapCleanup
        ? `trap 'rm -rf "$workspace"' EXIT`
        : "# trap EXIT 未注册",
      step: "trap",
    },
    { text: "workspace=$(mktemp -d)", step: "read" },
    { text: "read guess", step: "read" },
    {
      text: config.validateInput
        ? 'validate_input "$guess" || exit 1'
        : "# 输入校验已关闭",
      step: "validate",
    },
    { text: "secret=42", step: "branch" },
  ];

  if (config.useFunction) {
    lines.push(
      { text: "check_guess $guess", step: "function" },
      { text: "# 函数 check_guess 在上方定义", step: "function" },
    );
  } else {
    lines.push(
      { text: "if (( guess == secret )); then echo 命中！", step: "branch" },
      { text: "elif (( guess < secret )); then echo 太小", step: "branch" },
      { text: "else echo 太大; fi", step: "branch" },
    );
  }

  lines.push({ text: "# 脚本结束", step: "exit" });

  return (
    <g>
      <rect
        x="8"
        y="8"
        width="344"
        height="320"
        rx="6"
        fill={C.elevated}
        stroke={C.border}
      />
      <text
        x="20"
        y="32"
        fill={C.primary}
        fontSize={13}
        fontWeight={600}
        fontFamily="monospace"
      >
        脚本源码
      </text>
      {lines.map((line, i) => {
        const stepIndex = STEPS.findIndex((s) => s.label === line.step);
        const isActive = frame >= stepIndex;
        const isFailed = failedAt === line.step;
        return (
          <StepLine
            key={`${i}-${line.text}`}
            y={54 + i * 20}
            active={isActive}
            error={isFailed}
          >
            {`${String(i + 1).padStart(2, " ")}  ${line.text}`}
          </StepLine>
        );
      })}
    </g>
  );
}

function ShellProgrammingSession({ onReset }: { onReset: () => void }) {
  const id = useId();
  const [config, setConfig] = useState<ScriptConfig>({
    ...INITIAL_SCRIPT_CONFIG,
  });
  const [inputCase, setInputCase] = useState<InputCase>("normal");
  const [prediction, setPrediction] = useState<SimulationOutcome>("unset");

  const timeline = useTeachingTimeline({ steps: STEPS, build: buildTimeline });
  const pauseRef = useRef(timeline.pause);
  useEffect(() => {
    pauseRef.current = timeline.pause;
  });
  useEffect(() => {
    if (timeline.reducedMotion) pauseRef.current();
  }, [timeline.reducedMotion]);

  const frame = timeline.currentStep;
  const result = runScriptSimulation(config, inputCase);

  function changeConfig(patch: Partial<ScriptConfig>) {
    timeline.goToStep(0);
    setConfig((prev) => ({ ...prev, ...patch }));
    setPrediction("unset");
  }
  function changeInput(value: InputCase) {
    timeline.goToStep(0);
    setInputCase(value);
    setPrediction("unset");
  }

  const caseInfo = INPUT_CASES.find((c) => c.value === inputCase)!;

  // 各帧可见的输出
  const visibleStdout: string[] = [];
  const visibleStderr: string[] = [];
  if (inputCase === "cmd-fail" && !config.strictMode && frame >= 1) {
    visibleStderr.push("false 返回非零，但 strict 关闭，脚本继续执行");
  }
  if (result.validationError && frame >= 3) {
    visibleStderr.push(...result.stderr);
  }
  if (result.runtimeError && frame >= 4) {
    visibleStderr.push(...result.stderr);
  }
  if (
    (result.outcome === "success" || result.outcome === "miss") &&
    frame >= 4
  ) {
    visibleStdout.push(...result.stdout);
  }

  const predictionCorrect =
    prediction !== "unset" && prediction === result.outcome;

  return (
    <section
      data-testid="lop07-shell-lab"
      data-frame={frame}
      data-playing={timeline.isPlaying && !timeline.reducedMotion}
      data-reduced={timeline.reducedMotion}
      aria-label="Shell 脚本执行与输入验证实验"
      className="not-prose my-6 min-w-0 rounded-card border border-border bg-elevated p-3 text-primary sm:p-5"
    >
      <h3 className="text-lg font-semibold">脚本执行链：从 shebang 到退出码</h3>
      <p className="my-2 text-sm text-secondary">
        有限教学模型 · 不运行真实 Linux 命令。用固定输入样本观察 strict
        mode、校验、函数、trap 如何改变失败位置和副作用。
      </p>

      <fieldset className="my-3 min-w-0">
        <legend className="mb-2 text-sm font-semibold">1 · 脚本配置</legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["strictMode", "set -euo pipefail"] as const,
              ["validateInput", "输入校验"] as const,
              ["useFunction", "使用函数"] as const,
              ["trapCleanup", "trap 清理"] as const,
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              data-testid={`lop07-${key}`}
              aria-pressed={config[key]}
              onClick={() => changeConfig({ [key]: !config[key] })}
              className={`${buttonClass} ${config[key] ? "border-accent text-accent" : "border-border"}`}
            >
              {label} · {config[key] ? "开" : "关"}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="my-3 min-w-0">
        <legend className="mb-2 text-sm font-semibold">2 · 输入样本</legend>
        <div className="flex flex-wrap gap-2">
          {INPUT_CASES.map((c) => (
            <button
              key={c.value}
              type="button"
              data-testid={`lop07-case-${c.value}`}
              aria-pressed={inputCase === c.value}
              onClick={() => changeInput(c.value)}
              className={`${buttonClass} ${inputCase === c.value ? "border-accent text-accent" : "border-border"}`}
            >
              {c.label}
              <span className="ml-2 text-xs text-secondary">
                {c.inputText === "" ? "''" : c.inputText}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="my-3 min-w-0">
        <legend className="mb-2 text-sm font-semibold">
          3 · 先预测：脚本会怎样结束？
        </legend>
        <div className="flex flex-wrap gap-2">
          {PREDICTIONS.map((p) => (
            <button
              key={p.value}
              type="button"
              data-testid={`lop07-predict-${p.value}`}
              aria-pressed={prediction === p.value}
              onClick={() => setPrediction(p.value)}
              className={`${buttonClass} ${prediction === p.value ? "border-accent text-accent" : "border-border"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </fieldset>

      <p
        className="break-words rounded-control border border-border p-3 font-mono text-sm"
        data-testid="lop07-command"
      >
        {`./guess.sh < ${caseInfo.inputText === "" ? "(空)" : caseInfo.inputText}`}
      </p>

      <svg
        viewBox="0 0 760 360"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        className="my-3 block h-auto w-full"
        style={{ fontSize: 14 }}
      >
        <title id={`${id}-title`}>Shell 脚本执行链与终端输出</title>
        <desc id={`${id}-desc`}>
          左侧显示脚本源码，高亮当前执行到的行；右侧模拟终端输出、临时目录状态与退出码。
        </desc>

        <ScriptSourcePanel
          config={config}
          frame={frame}
          failedAt={result.failedAt}
        />

        <g transform="translate(372 0)">
          <rect
            x="8"
            y="8"
            width="364"
            height="320"
            rx="6"
            fill={C.elevated}
            stroke={C.border}
          />
          <text
            x="20"
            y="32"
            fill={C.primary}
            fontSize={13}
            fontWeight={600}
            fontFamily="monospace"
          >
            终端 / 状态
          </text>

          <rect
            x="20"
            y="44"
            width="340"
            height="120"
            rx="4"
            fill={C.bg}
            stroke={C.border}
          />
          <text
            x="28"
            y="64"
            fill={C.secondary}
            fontSize={12}
            fontFamily="monospace"
          >
            $ ./guess.sh
          </text>
          {visibleStdout.length === 0 && visibleStderr.length === 0 && (
            <text
              x="28"
              y="88"
              fill={C.secondary}
              fontSize={12}
              fontFamily="monospace"
            >
              {frame < 2 ? "等待输入..." : "暂无输出"}
            </text>
          )}
          {visibleStdout.map((line, i) => (
            <text
              key={`out-${i}`}
              x="28"
              y={88 + i * 20}
              fill={C.success}
              fontSize={12}
              fontFamily="monospace"
            >
              {line}
            </text>
          ))}
          {visibleStderr.map((line, i) => (
            <text
              key={`err-${i}`}
              x="28"
              y={88 + (visibleStdout.length + i) * 20}
              fill={C.danger}
              fontSize={12}
              fontFamily="monospace"
            >
              {line}
            </text>
          ))}

          <text x="20" y="190" fill={C.primary} fontSize={12} fontWeight={600}>
            内部状态
          </text>
          <text
            x="20"
            y="214"
            fill={C.secondary}
            fontSize={12}
            fontFamily="monospace"
          >
            secret = {result.secret}
          </text>
          <text
            x="20"
            y="238"
            fill={C.secondary}
            fontSize={12}
            fontFamily="monospace"
          >
            guess = {result.inputText === "" ? "(空)" : result.inputText}
          </text>
          <text
            x="20"
            y="262"
            fill={
              frame < 7
                ? C.secondary
                : result.status === 0
                  ? C.success
                  : result.status === null
                    ? C.warning
                    : C.danger
            }
            fontSize={12}
            fontFamily="monospace"
          >
            {frame < 7
              ? "exit status: (尚未到达)"
              : result.status === null
                ? "exit status: (Shell 提前中止)"
                : `exit status: ${result.status}`}
          </text>
          <text
            x="20"
            y="286"
            fill={
              frame < 6
                ? C.secondary
                : result.tempRemoved
                  ? C.success
                  : C.warning
            }
            fontSize={12}
            fontFamily="monospace"
          >
            {frame < 6
              ? "workspace: (尚未退出)"
              : result.tempRemoved
                ? "workspace: 已清理 (trap EXIT)"
                : "workspace: 仍保留 (trap 未注册)"}
          </text>

          {frame >= 7 &&
            result.outcome === "success" &&
            !result.tempRemoved && (
              <text x="20" y="310" fill={C.warning} fontSize={12}>
                注意：脚本成功但临时目录未清理
              </text>
            )}
        </g>
      </svg>

      <p
        role="status"
        data-testid="lop07-explanation"
        className="my-3 text-sm leading-7"
      >
        {frame === 0 &&
          "第 1 步：shebang 决定用 /usr/bin/env bash 执行本脚本。"}
        {frame === 1 &&
          (config.strictMode
            ? "第 2 步：strict mode 开启；任何命令返回非零、未绑定变量或管道失败都会提前退出。"
            : "第 2 步：strict mode 关闭；命令失败不会被自动捕获，可能继续执行到后续行。")}
        {frame === 2 && "第 3 步：read 从标准输入读取一行，存入变量 guess。"}
        {frame === 3 &&
          (config.validateInput
            ? "第 4 步：校验块检查非空、整数和范围；失败直接 exit 1。"
            : "第 4 步：输入校验已关闭，任何值都进入下一步算术比较。")}
        {frame === 4 &&
          (config.useFunction
            ? "第 5 步：调用 check_guess 函数；函数把比较逻辑局部化。"
            : "第 5 步：直接在主流程里做 if/elif 分支比较。")}
        {frame === 5 &&
          "第 6 步：函数返回结果；主流程收集输出并决定循环/退出。"}
        {frame === 6 &&
          (config.trapCleanup
            ? "第 7 步：trap EXIT 注册；无论成功或失败，退出时都会清理 workspace。"
            : "第 7 步：trap 未注册；退出时不会自动删除 workspace。")}
        {frame === 7 && result.explanation}
      </p>

      {frame === 7 && prediction !== "unset" && (
        <p data-testid="lop07-feedback" className="my-2 text-sm">
          {predictionCorrect
            ? "预测吻合。请对照左侧高亮行，确认失败发生在哪一层。"
            : `预测为“${PREDICTIONS.find((p) => p.value === prediction)?.label}”，实际为“${PREDICTIONS.find((p) => p.value === result.outcome)?.label ?? result.outcome}”。请检查 strict/校验/输入的相互作用。`}
        </p>
      )}

      <div
        data-testid="lop07-timeline"
        className="[&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_.justify-center]:flex-wrap"
      >
        <TimelineControls
          timeline={timeline}
          labelText={LABELS}
          caption={
            timeline.reducedMotion
              ? "减少动态效果已开启：自动播放隐藏，仍可逐步或拖动观察。"
              : "共八步；播放、暂停、前后步进或拖进度均可。"
          }
          reset={{
            label: "完整 Reset",
            ariaLabel: "完整 Reset：恢复脚本配置、输入、预测、帧与播放",
            onClick: () => {
              timeline.pause();
              onReset();
            },
          }}
        />
      </div>

      <details className="mt-3 text-sm">
        <summary className="min-h-11 cursor-pointer py-3">
          模型边界与可核查预期
        </summary>
        <p>
          本模型只演示单文件 Bash 脚本的教学路径，不执行真实命令。secret 固定为
          42；输入样本固定。 实际 Bash
          版本、语言环境、别名和系统工具会让错误文本与状态码有差异。
        </p>
        <p>
          可核查预期：正常输入 + 完整配置 = 状态 0 且 workspace
          清理；空/非数字/越界 + 校验开 = 校验失败；空/非数字 + 校验关 =
          运行时错误；前置 false + strict 开 = 提前退出。
        </p>
      </details>
    </section>
  );
}

export function Lop07ShellProgrammingLab() {
  const [epoch, setEpoch] = useState(0);
  return (
    <ShellProgrammingSession
      key={epoch}
      onReset={() => setEpoch((value) => value + 1)}
    />
  );
}
