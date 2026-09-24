"use client";

import { useId, useState } from "react";
import {
  useTeachingTimeline,
  type BuildTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;

export const FILE_FIXTURES: Readonly<Record<string, string>> = {
  "/lesson/data/note.txt": "茶 tea\ntea\n",
  "/lesson/data/user.json": '{"name":"林"}',
  "/lesson/archive/data/note.txt": "coffee\n",
};
export const PATH_CHOICES = [
  "data/note.txt",
  "./data/user.json",
  "/lesson/data/note.txt",
  "/lesson/data/user.json",
  "data/missing.txt",
] as const;
export type FileFault = "none" | "missing" | "utf8" | "json";
export type FileOperation = "words" | "json";
export type FileLabInput = {
  cwd: "/lesson" | "/lesson/archive";
  path: (typeof PATH_CHOICES)[number];
  operation: FileOperation;
  fault: FileFault;
};
type FileError = "FileNotFoundError" | "UnicodeDecodeError" | "JSONDecodeError";
export const INITIAL_FILE_INPUT: FileLabInput = {
  cwd: "/lesson",
  path: "data/note.txt",
  operation: "words",
  fault: "none",
};

// Deliberately finite POSIX fixture model: no symlinks, permissions, '..',
// arbitrary JSON, or real disk access. Python parity tests exercise every input.
export function runFileModel(input: FileLabInput) {
  const resolved = (
    input.path.startsWith("/") ? input.path : `${input.cwd}/${input.path}`
  )
    .split("/")
    .filter((part) => part && part !== ".")
    .join("/");
  const absolute = `/${resolved}`;
  const original = FILE_FIXTURES[absolute];
  const exists = original !== undefined && input.fault !== "missing";
  const bytes = !exists
    ? []
    : input.fault === "utf8"
      ? [255]
      : Array.from(
          new TextEncoder().encode(
            input.fault === "json" ? '{"name":' : original,
          ),
        );
  let contents: string | null = null;
  let error: FileError | null = null;
  let result: unknown = null;
  let failureStage: "read" | "parse" | null = null;
  if (!exists) {
    error = "FileNotFoundError";
    failureStage = "read";
  } else if (input.fault === "utf8") {
    error = "UnicodeDecodeError";
    failureStage = "read";
  } else {
    contents = new TextDecoder("utf-8", { fatal: true }).decode(
      new Uint8Array(bytes),
    );
    if (input.operation === "words") {
      // Only the fixed samples above: ASCII whitespace plus Chinese letters.
      result = contents.trim() ? contents.trim().split(/\s+/u).length : 0;
    } else {
      try {
        result = JSON.parse(contents);
      } catch {
        error = "JSONDecodeError";
        failureStage = "parse";
      }
    }
  }
  return { absolute, exists, bytes, contents, error, failureStage, result };
}

const STEPS = [
  { label: "path", caption: "定位：工作目录与路径" },
  { label: "read", caption: "读取：字节解码为字符串" },
  { label: "process", caption: "处理：分词或解析 JSON" },
  { label: "route", caption: "收尾：输出或处理异常" },
] as const;
const LABELS = Object.fromEntries(
  STEPS.map(({ label, caption }) => [label, caption]),
);
const buildTimeline: BuildTimeline = (timeline) => {
  const clock = { tick: 0 };
  STEPS.forEach(({ label }, i) => {
    timeline.label(label, i * 1600);
    timeline.add(
      clock,
      { tick: i + 1, duration: 1600, ease: "linear" },
      i * 1600,
    );
  });
};

export function PccFilesExceptionsLab() {
  const [input, setInput] = useState<FileLabInput>(INITIAL_FILE_INPUT);
  const timeline = useTeachingTimeline({ steps: STEPS, build: buildTimeline });
  const arrow = `file-arrow-${useId().replace(/:/g, "")}`;
  const model = runFileModel(input);
  const step = timeline.currentStep;
  const read = step >= 1;
  const processed = step >= 2 && model.contents !== null;
  const failed =
    (read && model.failureStage === "read") ||
    (processed && model.failureStage === "parse");
  const inArchive = model.absolute.startsWith("/lesson/archive/");
  const isJsonFile = model.absolute.endsWith("user.json");
  const missingLeaf = model.absolute.endsWith("missing.txt");
  const absentBranch = missingLeaf || (inArchive && isJsonFile);
  const chars =
    read && model.contents !== null ? Array.from(model.contents) : [];
  const routeX = model.error ? 580 : 200;
  const description = [
    `路径定位为 ${model.absolute}。构造 Path 不会读取文件。`,
    model.failureStage === "read"
      ? `read_text 产生 ${model.error}，没有字符串，也不会开始分词或 JSON 解析。`
      : `磁盘 ${model.bytes.length} 个字节解码成 ${Array.from(model.contents ?? "").length} 个字符；换行显示为 ↵。`,
    model.failureStage === "read"
      ? "读取已经失败，后续处理被跳过。"
      : model.error
        ? "字符串已经读入，但 json.loads 无法解析；它不是文件缺失。"
        : input.operation === "words"
          ? `split() 得到 ${model.result} 个片段；这里只按空白分隔，不做中文分词。`
          : `json.loads 得到对象 ${JSON.stringify(model.result)}，并不检查业务字段。`,
    model.error
      ? `进入 ${model.error} 对应处理分支。正常输出路线不执行。`
      : "进入正常输出路线。磁盘内容没有因为读取而改变。",
  ][step];
  const update = (patch: Partial<FileLabInput>) => {
    timeline.pause();
    setInput((old) => ({ ...old, ...patch }));
  };
  const reset = () => {
    timeline.goToStep(0);
    setInput({ ...INITIAL_FILE_INPUT });
  };
  const controlClass =
    "mt-1 block min-h-11 w-full min-w-0 rounded-control border border-border bg-[var(--bg)] px-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-accent";

  return (
    <section
      aria-label="文件与异常实验：定位文件、解码字节、处理内容并追踪异常路线"
      className="not-prose my-8 min-w-0 max-w-full rounded-card border border-border bg-elevated p-3 sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:whitespace-normal [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-accent [&_input[type=range]]:min-h-11 [&_input[type=range]]:focus-visible:outline-2 [&_input[type=range]]:focus-visible:outline-accent"
    >
      <h3 className="text-base font-semibold text-primary">
        从磁盘到内存：失败停在哪一层？
      </h3>
      <p className="mt-2 text-sm text-secondary">
        先预测：只切换工作目录，会读到“茶”还是“coffee”？路径改为绝对路径后呢？输入改变时保留当前步骤，便于对照；所有内容均为模拟文件，不访问你的磁盘。
      </p>
      <div className="my-4 grid min-w-0 gap-3 sm:grid-cols-2">
        <label className="min-w-0 text-sm text-secondary">
          工作目录
          <select
            className={controlClass}
            value={input.cwd}
            onChange={(e) =>
              update({ cwd: e.target.value as FileLabInput["cwd"] })
            }
          >
            <option value="/lesson">/lesson</option>
            <option value="/lesson/archive">/lesson/archive</option>
          </select>
        </label>
        <label className="min-w-0 text-sm text-secondary">
          传给 Path 的路径
          <select
            className={controlClass}
            value={input.path}
            onChange={(e) =>
              update({ path: e.target.value as FileLabInput["path"] })
            }
          >
            {PATH_CHOICES.map((path) => (
              <option key={path} value={path}>
                {path}
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-0 text-sm text-secondary">
          读取后的处理
          <select
            className={controlClass}
            value={input.operation}
            onChange={(e) =>
              update({ operation: e.target.value as FileOperation })
            }
          >
            <option value="words">len(contents.split())：片段数</option>
            <option value="json">json.loads(contents)：解析对象</option>
          </select>
        </label>
        <label className="min-w-0 text-sm text-secondary">
          故障样本（作用于选中的文件）
          <select
            className={controlClass}
            value={input.fault}
            onChange={(e) => update({ fault: e.target.value as FileFault })}
          >
            <option value="none">无故障</option>
            <option value="missing">文件被移走</option>
            <option value="utf8">非法 UTF-8 字节 FF</option>
            <option value="json">截断为 {`{"name":`}</option>
          </select>
        </label>
      </div>
      <p className="break-all text-sm text-primary">
        定位结果：<code>{model.absolute}</code>
      </p>
      <svg
        viewBox="0 0 780 1300"
        role="img"
        aria-label={`${description} 目录树高亮目标；磁盘格为十六进制字节；内存格为字符；底部分叉为正常和异常路线。`}
        className="mt-3 block h-auto w-full"
        fontSize={32}
        fontFamily="var(--font-mono), monospace"
      >
        <defs>
          <marker
            id={arrow}
            viewBox="0 0 10 10"
            refX={9}
            refY={5}
            markerWidth={8}
            markerHeight={8}
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C.accent} />
          </marker>
        </defs>
        <text x={20} y={38} fill={C.text}>
          目录树
        </text>
        <g fill="none" stroke={C.border} strokeWidth={4}>
          <path d="M390 70 V100 H195 V145 M390 100 H595 V145 M195 180 V215 H90 V260 M195 215 H300 V260 M595 180 V260 M595 300 V355" />
        </g>
        <path
          d={
            absentBranch
              ? inArchive
                ? "M390 70 V100 H595 V315 H370 V348"
                : "M390 70 V100 H195 V215 H370 V348"
              : inArchive
                ? "M390 70 V100 H595 V355"
                : `M390 70 V100 H195 V215 H${isJsonFile ? 300 : 90} V260`
          }
          fill="none"
          stroke={C.accent}
          strokeWidth={7}
          strokeDasharray={absentBranch ? "10 8" : undefined}
        />
        <g fill={C.text} textAnchor="middle">
          <text x={390} y={65}>
            /lesson
          </text>
          <text x={195} y={172}>
            data/
          </text>
          <text x={595} y={172}>
            archive/
          </text>
          <text x={90} y={299}>
            note.txt
          </text>
          <text x={300} y={299}>
            user.json
          </text>
          <text x={595} y={290}>
            data/
          </text>
          <text x={595} y={395}>
            note.txt
          </text>
        </g>
        {[
          [90, 266],
          [300, 266],
          [595, 358],
        ].map(([x, y], i) => {
          const selected =
            !missingLeaf &&
            (inArchive ? i === 2 && !isJsonFile : i === (isJsonFile ? 1 : 0));
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={12}
              fill={selected ? (model.exists ? C.accent : C.danger) : C.border}
            />
          );
        })}
        {!model.exists && (
          <g stroke={C.danger} strokeWidth={6}>
            <path d="M352 330 l36 36 m0 -36 l-36 36" />
            <text x={20} y={405} stroke="none" fill={C.danger}>
              目标文件不存在
            </text>
          </g>
        )}
        <g>
          <path
            d="M25 480 V650 C25 692 755 692 755 650 V480"
            fill={C.bg}
            stroke={C.border}
            strokeWidth={3}
          />
          <ellipse
            cx={390}
            cy={480}
            rx={365}
            ry={30}
            fill={C.elevated}
            stroke={C.border}
            strokeWidth={3}
          />
          <text x={55} y={490} fill={C.text}>
            磁盘：{model.bytes.length} 字节
          </text>
          {model.bytes.map((byte, i) => (
            <g key={i}>
              <rect
                x={55 + (i % 10) * 67}
                y={520 + Math.floor(i / 10) * 66}
                width={60}
                height={55}
                rx={4}
                fill={input.fault === "utf8" ? C.danger : C.accent}
                fillOpacity={0.13}
                stroke={C.border}
              />
              <text
                x={85 + (i % 10) * 67}
                y={559 + Math.floor(i / 10) * 66}
                textAnchor="middle"
                fill={C.text}
              >
                {byte.toString(16).toUpperCase().padStart(2, "0")}
              </text>
            </g>
          ))}
          {!model.exists && (
            <text x={60} y={577} fill={C.secondary}>
              无文件，不能读取
            </text>
          )}
        </g>
        <path
          d="M390 695 V760"
          stroke={read && model.contents !== null ? C.accent : C.border}
          strokeWidth={5}
          markerEnd={
            read && model.contents !== null ? `url(#${arrow})` : undefined
          }
        />
        <text x={420} y={739} fill={C.secondary}>
          UTF-8 解码
        </text>
        <text x={25} y={807} fill={C.text}>
          内存：
          {read && model.contents !== null
            ? `${chars.length} 个字符`
            : "尚无字符串"}
        </text>
        {chars.map((char, i) => (
          <g key={i}>
            <rect
              x={35 + (i % 10) * 72}
              y={830 + Math.floor(i / 10) * 63}
              width={65}
              height={55}
              fill={C.accent}
              fillOpacity={0.13}
              stroke={C.border}
            />
            <text
              x={67 + (i % 10) * 72}
              y={869 + Math.floor(i / 10) * 63}
              textAnchor="middle"
              fill={C.text}
            >
              {char === "\n" ? "↵" : char === " " ? "␠" : char}
            </text>
          </g>
        ))}
        {read && model.failureStage === "read" && (
          <path
            d="M360 830 l60 55 m0 -55 l-60 55"
            stroke={C.danger}
            strokeWidth={6}
          />
        )}
        <g fill="none" stroke={C.border} strokeWidth={5}>
          <path d="M390 968 V1010 L200 1100 V1170 M390 1010 L580 1100 V1170" />
          <path d="M735 715 V1010 L580 1100" strokeDasharray="9 7" />
        </g>
        {step >= 3 && (
          <path
            d={
              model.failureStage === "read"
                ? "M735 715 V1010 L580 1100 V1170"
                : `M390 968 V1010 L${routeX} 1100 V1170`
            }
            fill="none"
            stroke={model.error ? C.danger : C.accent}
            strokeWidth={8}
          />
        )}
        <text x={25} y={1000} fill={C.secondary}>
          处理后分流
        </text>
        <text x={200} y={1210} textAnchor="middle" fill={C.text}>
          正常输出
        </text>
        <text x={580} y={1210} textAnchor="middle" fill={C.text}>
          异常处理
        </text>
        <circle
          cx={routeX}
          cy={1170}
          r={step >= 3 ? 15 : 0}
          fill={model.error ? C.danger : C.accent}
        />
        <text
          x={390}
          y={1270}
          textAnchor="middle"
          fill={failed ? C.danger : C.text}
        >
          {failed
            ? model.error
            : processed
              ? input.operation === "words"
                ? `片段数 = ${model.result}`
                : JSON.stringify(model.result)
              : "等待执行"}
        </text>
      </svg>
      <p
        className="mt-3 min-h-16 break-words text-sm text-primary"
        aria-live="polite"
        aria-atomic="true"
      >
        {description}
      </p>
      <TimelineControls
        timeline={timeline}
        labelText={LABELS}
        reset={{ label: "重置实验", onClick: reset }}
      />
      <p className="mt-4 text-sm text-secondary">
        图例：实线高亮选中的目录分支，格子分别代表字节和字符，叉号表示没有得到字符串；异常线绕过未执行的处理。仅模拟图示的
        POSIX 文件树与固定样本，不模拟权限、符号链接或 Windows
        盘符。改变故障不会创建原本不存在的文件。
      </p>
    </section>
  );
}
