"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--io-accent": "#0369a1",
  "--io-soft": "#e0f2fe",
  "--io-ink": "#172033",
  "--io-muted": "#94a3b8",
  "--io-warn": "#b45309",
  "--io-surface": "#ffffff",
} as CSSProperties;
const conceptLabels = [
  "How Windows Performs I/O Operations",
  "C#'s Asynchronous Functions",
  "How the Compiler Transforms an Async Function into a State Machine",
  "Async Function Extensibility",
  "Async Functions and Event Handlers",
  "Async Functions in the Framework Class Library",
  "Async Functions and Exception Handling",
  "Other Async Function Features",
  "Applications and Their Threading Models",
  "Implementing a Server Asynchronously",
  "Canceling I/O Operations",
  "Some I/O Operations Must Be Done Synchronously",
  "FileStream-Specific Issues",
  "I/O Request Priorities",
] as const;
function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      重置实验
    </button>
  );
}
function Shell({
  label,
  title,
  description,
  reset,
  children,
}: {
  label: string;
  title: string;
  description: string;
  reset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={label}
      style={shellStyle}
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">{label}</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            {description}
          </p>
        </div>
        <ResetButton onClick={reset} />
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
function Diagram({
  left,
  middle,
  right,
  note,
  warn = false,
}: {
  left: string;
  middle: string;
  right: string;
  note: string;
  warn?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 720 250"
      role="img"
      aria-label={`${left} to ${middle} to ${right}`}
      className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
    >
      <title>I/O async ownership flow</title>
      <rect
        x="24"
        y="62"
        width="160"
        height="84"
        rx="12"
        fill="var(--io-soft)"
        stroke="var(--io-accent)"
        strokeWidth="3"
      />
      <text
        x="104"
        y="94"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="var(--io-ink)"
      >
        input
      </text>
      <text
        x="104"
        y="121"
        textAnchor="middle"
        fontSize="12"
        fill="var(--io-ink)"
      >
        {left}
      </text>
      <line
        x1="208"
        y1="104"
        x2="278"
        y2="104"
        stroke="var(--io-accent)"
        strokeWidth="4"
      />
      <polygon points="278,104 266,97 266,111" fill="var(--io-accent)" />
      <rect
        x="294"
        y="38"
        width="166"
        height="132"
        rx="12"
        fill="var(--io-surface)"
        stroke="var(--io-muted)"
        strokeWidth="3"
      />
      <text
        x="377"
        y="70"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="var(--io-ink)"
      >
        boundary
      </text>
      <text
        x="377"
        y="106"
        textAnchor="middle"
        fontSize="12"
        fill="var(--io-ink)"
      >
        {middle}
      </text>
      <text
        x="377"
        y="136"
        textAnchor="middle"
        fontSize="12"
        fill="var(--io-warn)"
      >
        {warn ? "race / limit" : "ownership"}
      </text>
      <line
        x1="484"
        y1="104"
        x2="538"
        y2="104"
        stroke="var(--io-accent)"
        strokeWidth="4"
      />
      <polygon points="538,104 526,97 526,111" fill="var(--io-accent)" />
      <rect
        x="554"
        y="62"
        width="142"
        height="84"
        rx="12"
        fill="var(--io-soft)"
        stroke="var(--io-accent)"
        strokeWidth="3"
      />
      <text
        x="625"
        y="94"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="var(--io-ink)"
      >
        guarantee
      </text>
      <text
        x="625"
        y="121"
        textAnchor="middle"
        fontSize="12"
        fill="var(--io-ink)"
      >
        {right}
      </text>
      <text
        x="360"
        y="218"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={warn ? "var(--io-warn)" : "var(--io-accent)"}
      >
        {note}
      </text>
    </svg>
  );
}
type IoMode = "submit" | "pending" | "complete" | "buffer" | "cancel";
export function CvcIoLifecycleLab() {
  const [mode, setMode] = useState<IoMode>("submit");
  const d = {
    submit: ["submit", "OS/device", "handle"],
    pending: ["pending", "completion port", "no blocked thread"],
    complete: ["complete", "continuation", "read count"],
    buffer: ["buffer", "operation owner", "valid lifetime"],
    cancel: ["cancel race", "completion", "success or cancel"],
  }[mode];
  return (
    <Shell
      label="I/O Lifecycle Lab"
      title="观察 submit、pending、complete、buffer 与 cancel race"
      description="切换 I/O 阶段，先写出等待期间的 carrier、buffer owner 和合法 terminal outcome，再检查是否会 double-complete 或提前归还 buffer。"
      reset={() => setMode("submit")}
    >
      <div className="flex flex-wrap gap-2">
        {(["submit", "pending", "complete", "buffer", "cancel"] as const).map(
          (x) => (
            <button
              key={x}
              type="button"
              aria-pressed={mode === x}
              onClick={() => setMode(x)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === x ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {x}
            </button>
          ),
        )}
      </div>
      <Diagram
        left={d[0]}
        middle={d[1]}
        right={d[2]}
        warn={mode === "cancel" || mode === "buffer"}
        note={
          mode === "pending"
            ? "true async waits in the OS/device, not on a managed worker"
            : "hold the handle and buffer until the operation reaches one observed terminal state"
        }
      />
    </Shell>
  );
}
type AsyncMode = "entry" | "suspend" | "resume" | "fault" | "value";
export function CvcAsyncStateLab() {
  const [mode, setMode] = useState<AsyncMode>("entry");
  const d = {
    entry: ["method entry", "state machine", "sync prefix"],
    suspend: ["incomplete await", "awaiter", "hoisted locals"],
    resume: ["completion", "MoveNext", "single outcome"],
    fault: ["exception", "Task", "observed fault"],
    value: ["ValueTask", "single consumer", "allocation tradeoff"],
  }[mode];
  return (
    <Shell
      label="Async State Lab"
      title="把 async entry、suspend、resume 与 outcome 画清楚"
      description="切换 state-machine 阶段，先预测 locals、awaiter、context 和 exception 的去向，再验证 Task/ValueTask 的消费规则。"
      reset={() => setMode("entry")}
    >
      <div className="flex flex-wrap gap-2">
        {(["entry", "suspend", "resume", "fault", "value"] as const).map(
          (x) => (
            <button
              key={x}
              type="button"
              aria-pressed={mode === x}
              onClick={() => setMode(x)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === x ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {x}
            </button>
          ),
        )}
      </div>
      <Diagram
        left={d[0]}
        middle={d[1]}
        right={d[2]}
        warn={mode === "fault" || mode === "value"}
        note={
          mode === "suspend"
            ? "only an incomplete await suspends; a completed await may continue synchronously"
            : "a builder completes exactly once; the owner awaits, observes and releases captured resources"
        }
      />
    </Shell>
  );
}
type ServerMode = "accept" | "read" | "process" | "write" | "shutdown";
export function CvcAsyncServerLab() {
  const [mode, setMode] = useState<ServerMode>("accept");
  const d = {
    accept: ["connection", "admission", "capacity"],
    read: ["partial bytes", "frame parser", "deadline"],
    process: ["CPU work", "bounded queue", "parallelism"],
    write: ["outbound data", "backpressure", "flush"],
    shutdown: ["cancel", "drain registry", "no orphan"],
  }[mode];
  return (
    <Shell
      label="Async Server Lab"
      title="沿 accept、read、process、write 与 shutdown 检查容量"
      description="切换服务器阶段，先记录每段的 bytes、tasks、timeout 与 owner，再验证 slow client、backpressure 和收尾不会造成无界增长。"
      reset={() => setMode("accept")}
    >
      <div className="flex flex-wrap gap-2">
        {(["accept", "read", "process", "write", "shutdown"] as const).map(
          (x) => (
            <button
              key={x}
              type="button"
              aria-pressed={mode === x}
              onClick={() => setMode(x)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === x ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {x}
            </button>
          ),
        )}
      </div>
      <Diagram
        left={d[0]}
        middle={d[1]}
        right={d[2]}
        warn={mode === "read" || mode === "shutdown"}
        note={
          mode === "shutdown"
            ? "stop admission, cancel, drain and observe every in-flight task before disposing"
            : "every stage needs a bound; async removes blocked threads but not memory, CPU or queue ownership"
        }
      />
    </Shell>
  );
}
export const cvcIoBoundAsynchronousOperationsConceptLabels = conceptLabels;
