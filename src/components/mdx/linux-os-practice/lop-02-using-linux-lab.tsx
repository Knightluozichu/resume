"use client";

import { useEffect, useRef, useState } from "react";
import type { Timeline } from "animejs";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

export type SourceMode = "quoted" | "split" | "glob" | "nomatch";
export type CopyInput = {
  mode: SourceMode;
  missingDestination: boolean;
  failglob: boolean;
};
const SOURCES = ["a.txt", "report one.txt"] as const;
const MODES: { value: SourceMode; label: string; text: string }[] = [
  { value: "quoted", label: "保留空格", text: '"report one.txt"' },
  { value: "split", label: "去掉引号", text: "report one.txt" },
  { value: "glob", label: "匹配两份文件", text: "*.txt" },
  { value: "nomatch", label: "边界：没有匹配", text: "*.log" },
];

/** Finite teaching cases only: NOT a shell parser or actual GNU cp execution. */
export function deriveCopyCase(input: CopyInput) {
  const expression = MODES.find((m) => m.value === input.mode)!.text;
  const words = input.mode === "split" ? ["report", "one.txt"] : [expression];
  const shellError = input.mode === "nomatch" && input.failglob;
  const sources =
    input.mode === "quoted"
      ? ["report one.txt"]
      : input.mode === "split"
        ? ["report", "one.txt"]
        : input.mode === "glob"
          ? [...SOURCES]
          : ["*.log"];
  const argv = shellError ? [] : ["cp", "--", ...sources, "out/"];
  const missingSources = sources.filter(
    (name) => !SOURCES.some((s) => s === name),
  );
  const copied =
    shellError || input.missingDestination
      ? []
      : sources.filter((name) => SOURCES.some((s) => s === name));
  const status = shellError
    ? null
    : input.missingDestination || missingSources.length > 0
      ? 1
      : 0;
  const reason = shellError
    ? "Bash 的 failglob 在展开时中止：cp 未启动，out/ 不变。"
    : input.missingDestination
      ? "out/ 不存在；固定案例中的 cp 不能把它当目录，未写入文件。"
      : missingSources.length > 0
        ? `cp 收到字面路径 ${missingSources.join("、")}，查找失败；文件未复制。`
        : `cp 收到 ${sources.length} 个源路径；向已存在的 out/ 写入同名副本，源文件不变。`;
  return {
    command: `cp -- ${expression} out/`,
    words,
    sources,
    argv,
    copied,
    missingSources,
    shellError,
    status,
    reason,
    cpStarted: !shellError,
  };
}

const STEPS = [
  { label: "input", caption: "输入与预测" },
  { label: "parse", caption: "识别词与引号" },
  { label: "argv", caption: "展开为参数" },
  { label: "files", caption: "读取与写入" },
  { label: "status", caption: "观察退出状态" },
] as const;
const LABELS = Object.fromEntries(STEPS.map((s) => [s.label, s.caption]));
const BEAT_MS = 1000;
function buildTimeline(tl: Timeline) {
  const clock = { beat: 0 };
  STEPS.forEach((s, i) => tl.label(s.label, i * BEAT_MS));
  tl.add(clock, { beat: [0, 5], duration: 5 * BEAT_MS, ease: "linear" }, 0);
}
const C = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  accent: "var(--accent)",
  bg: "var(--bg-elevated)",
};
const buttonClass =
  "min-h-11 min-w-11 rounded-control border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function CopyExperiment({ onReset }: { onReset: () => void }) {
  const [mode, setMode] = useState<SourceMode>("quoted");
  const [missingDestination, setMissingDestination] = useState(false);
  const [failglob, setFailglob] = useState(false);
  const [prediction, setPrediction] = useState("unset");
  const timeline = useTeachingTimeline({ steps: STEPS, build: buildTimeline });
  const pauseRef = useRef(timeline.pause);
  useEffect(() => {
    pauseRef.current = timeline.pause;
  });
  useEffect(() => {
    if (timeline.reducedMotion) pauseRef.current();
  }, [timeline.reducedMotion]);
  const frame = timeline.currentStep;
  const result = deriveCopyCase({ mode, missingDestination, failglob });
  const visibleArgv = frame >= 2 ? result.argv : [];
  const visibleCopied = frame >= 3 ? result.copied : [];
  const explain = [
    "先选择预测。此处只编辑一条固定的 cp 示例，不执行命令。源目录固定含两份文件。",
    mode === "split"
      ? "空白把未引用的 report one.txt 分成两个词。不是 cp 把文件名拆开。"
      : mode === "quoted"
        ? "双引号把含空格的字面文件名保留为一个词；本例没有变量或命令替换。"
        : "未引用的星号留给 Bash 路径名展开；它还不是 cp 收到的参数。",
    result.shellError
      ? "failglob 拒绝无匹配模式：不产生 cp 的 argv，也不启动 cp。"
      : `引号已移除，argv 共 ${result.argv.length} 项（含命令名）。-- 由 cp 解释为选项结束。`,
    result.reason,
    `${result.reason} ${result.shellError ? "这里的非零状态属于 Shell 展开错误；不是 cp 的返回值。" : `此固定案例预期退出状态 ${result.status}；错误文字不承诺逐字一致。`}`,
  ][frame];
  const changeInput = (change: () => void) => {
    timeline.goToStep(0);
    change();
    setPrediction("unset");
  };
  const predictionCorrect =
    prediction === (result.copied.length > 0 ? "writes" : "unchanged");

  return (
    <section
      aria-label="Shell 参数到文件副本实验"
      data-testid="using-linux-lab"
      data-frame={frame}
      data-playing={timeline.isPlaying}
      data-reduced-motion={timeline.reducedMotion}
      className="not-prose my-6 min-w-0 rounded-card border border-border bg-elevated p-3 text-primary"
    >
      <h3 className="text-lg font-semibold">一行命令，三位责任者</h3>
      <p className="my-2 text-sm text-secondary">
        有限教学模型 · 不运行
        Linux、不访问本机文件。假定普通可读文件、目录可写、无别名，Bash 未启用
        nullglob，cp 为 GNU 版本。
      </p>
      <fieldset className="my-3 min-w-0">
        <legend className="mb-2 text-sm">
          1. 源路径表达式（改动会停播并回到输入帧）
        </legend>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              data-testid={`using-linux-mode-${m.value}`}
              aria-pressed={mode === m.value}
              onClick={() => changeInput(() => setMode(m.value))}
              className={`${buttonClass} ${mode === m.value ? "border-accent text-accent" : "border-border"}`}
            >
              {m.label}
              <code className="ml-2">{m.text}</code>
            </button>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          data-testid="using-linux-missing-destination"
          aria-pressed={missingDestination}
          className={`${buttonClass} border-border`}
          onClick={() =>
            changeInput(() => setMissingDestination(!missingDestination))
          }
        >
          故障：out/ 不存在 · {missingDestination ? "开" : "关"}
        </button>
        <button
          type="button"
          data-testid="using-linux-failglob"
          aria-pressed={failglob}
          className={`${buttonClass} border-border`}
          onClick={() => changeInput(() => setFailglob(!failglob))}
        >
          Bash failglob · {failglob ? "开" : "关"}
        </button>
      </div>
      <fieldset className="my-3">
        <legend className="mb-2 text-sm">2. 先预测：out/ 会出现副本吗？</legend>
        <div className="flex flex-wrap gap-2">
          {[
            ["writes", "会写入"],
            ["unchanged", "不会写入"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              data-testid={`using-linux-predict-${value}`}
              aria-pressed={prediction === value}
              onClick={() => setPrediction(value)}
              className={`${buttonClass} ${prediction === value ? "border-accent text-accent" : "border-border"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <p
        className="break-words rounded-control border border-border p-3 font-mono text-sm"
        data-testid="using-linux-command"
      >
        {result.command}
      </p>
      <div className="mt-3 grid min-w-0 gap-3 md:grid-cols-2">
        <svg
          viewBox="0 0 280 380"
          role="img"
          aria-label="Bash 分词展开为 cp 参数数组；每个槽位是一个完整参数"
          className="block h-auto w-full"
          style={{ fontSize: 16, color: C.text }}
        >
          <text x="8" y="24" fill="currentColor">
            Bash → argv（参数槽）
          </text>
          <path
            d="M24 40 V92 H52"
            fill="none"
            stroke={C.accent}
            strokeWidth="2"
          />
          <text x="36" y="54" fill={C.muted}>
            {frame >= 1 ? `源表达式：${result.words.length} 个词` : "等待解析"}
          </text>
          {frame >= 1 && (
            <text x="36" y="78" fill={C.text}>
              {result.words.join(" | ")}
            </text>
          )}
          <path
            d="M44 86 l8 6 -8 6"
            fill="none"
            stroke={C.accent}
            strokeWidth="2"
          />
          {visibleArgv.map((arg, i) => (
            <g key={`${i}-${arg}`}>
              <text x="8" y={126 + i * 42} fill={C.muted}>
                {i}
              </text>
              <rect
                x="36"
                y={102 + i * 42}
                width="232"
                height="36"
                rx="4"
                fill={C.bg}
                stroke={i > 1 && i < visibleArgv.length - 1 ? C.accent : C.line}
              />
              <text x="48" y={126 + i * 42} fill={C.text}>
                {arg}
              </text>
            </g>
          ))}
          <text x="8" y="346" fill={C.muted}>
            {frame < 2
              ? "尚未交付 cp"
              : result.shellError
                ? "展开失败；没有 cp 进程"
                : `argc = ${result.argv.length}；无引号字符`}
          </text>
          <text x="8" y="372" fill={C.muted}>
            空格在槽内 ≠ 两个参数
          </text>
        </svg>
        <svg
          viewBox="0 0 280 380"
          role="img"
          aria-label="当前目录树：源文件保持不变；成功后 out 目录新增副本；不存在的目录用虚线标记"
          className="block h-auto w-full"
          style={{ fontSize: 16, color: C.text }}
        >
          <text x="8" y="24" fill="currentColor">
            cp → 文件树 → 状态
          </text>
          <path
            d="M12 50 h30 l8 10 h30 v26 H12 Z"
            fill="none"
            stroke={C.accent}
            strokeWidth="2"
          />
          <text x="96" y="76" fill={C.text}>
            sandbox/
          </text>
          <path
            d="M28 86 V226 M28 112 H48 M28 158 H48 M28 212 H48"
            fill="none"
            stroke={C.line}
            strokeWidth="2"
          />
          {SOURCES.map((name, i) => (
            <g key={name}>
              <path
                d={`M50 ${98 + i * 46} h12 l8 8 v20 H50 Z m12 0 v8 h8`}
                fill="none"
                stroke={
                  frame >= 3 && visibleCopied.includes(name) ? C.accent : C.line
                }
                strokeWidth="2"
              />
              <text x="80" y={119 + i * 46} fill={C.text}>
                {name}
              </text>
            </g>
          ))}
          <path
            d="M50 196 h14 l6 6 h16 v24 H50 Z"
            fill="none"
            stroke={C.accent}
            strokeWidth="2"
            strokeDasharray={missingDestination ? "4 4" : undefined}
          />
          <text x="96" y="217" fill={C.text}>
            {missingDestination ? "out/ 缺失" : "out/"}
          </text>
          {visibleCopied.length > 0 ? (
            <>
              <path
                d="M68 232 V306 M68 258 H86 M68 300 H86"
                stroke={C.accent}
                fill="none"
                strokeWidth="2"
              />
              {visibleCopied.map((name, i) => (
                <g key={name}>
                  <path
                    d={`M88 ${240 + i * 42} h12 l8 8 v20 H88 Z`}
                    stroke={C.accent}
                    fill="none"
                    strokeWidth="2"
                  />
                  <text x="116" y={261 + i * 42} fill={C.text}>
                    {name}
                  </text>
                </g>
              ))}
            </>
          ) : (
            <text x="68" y="260" fill={C.muted}>
              {frame >= 3 ? "没有新增目录项" : "等待 cp"}
            </text>
          )}
          <circle
            cx="20"
            cy="344"
            r="9"
            fill="none"
            stroke={frame >= 4 ? C.accent : C.line}
            strokeWidth="2"
          />
          <text x="40" y="350" fill={C.text}>
            {frame < 4
              ? "退出状态：尚未收集"
              : result.shellError
                ? "Shell 错误；cp 未运行"
                : `cp 退出状态：${result.status}`}
          </text>
          <text x="8" y="376" fill={C.muted}>
            副本只在第 4 帧出现
          </text>
        </svg>
      </div>
      <p
        role="status"
        data-testid="using-linux-explanation"
        className="my-3 text-sm leading-7"
      >
        {explain}
      </p>
      {frame === 4 && (
        <p data-testid="using-linux-feedback" className="my-2 text-sm">
          {prediction === "unset"
            ? "未选择预测；请回到输入帧再试。"
            : predictionCorrect
              ? "预测吻合。检查 argv 的边界与新增目录项是否对应。"
              : "预测不符。请检查：空白是谁处理的？cp 是否真的启动？"}
        </p>
      )}
      <div
        data-testid="using-linux-timeline"
        className="[&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_div.flex]:flex-wrap"
      >
        <TimelineControls
          timeline={timeline}
          labelText={LABELS}
          caption={
            timeline.reducedMotion
              ? "减少动态效果已开启：自动播放隐藏，仍可逐步或拖动观察。"
              : "共五帧；播放、暂停、前后步进或拖进度均可。"
          }
          reset={{
            label: "完整 Reset",
            ariaLabel: "完整 Reset：恢复所有输入、预测、帧与播放",
            onClick: onReset,
          }}
        />
      </div>
      <details className="mt-3 text-sm">
        <summary className="min-h-11 cursor-pointer py-3">
          模型边界与可核查预期
        </summary>
        <p>
          固定文件 a.txt 和 report one.txt；out/
          初始为空。无磁盘满、权限拒绝、符号链接、竞争写入或部分成功的混合源。status=1
          是这些固定 GNU cp 案例的预期，不是所有失败的通用错误码。failglob
          案例只保证 Shell 非零，不承诺其数值。Bash 默认无匹配会保留 *.log
          字面值；zsh 的默认行为不同。
        </p>
        <p>
          引号保留：1 份副本；去引号：0 份；*.txt：2 份；*.log：0 份。完整 Reset
          会重新挂载实验并取消旧时间线，不撤销任何真实文件，因为模型从不访问文件系统。
        </p>
      </details>
    </section>
  );
}

export function Lop02UsingLinuxLab() {
  const [epoch, setEpoch] = useState(0);
  return (
    <CopyExperiment
      key={epoch}
      onReset={() => setEpoch((value) => value + 1)}
    />
  );
}
