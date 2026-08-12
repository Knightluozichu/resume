"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--exception-accent": "#7c3aed",
  "--exception-accent-soft": "#ede9fe",
  "--exception-ink": "#172033",
  "--exception-muted": "#94a3b8",
  "--exception-warning": "#b45309",
  "--exception-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "Defining Exception",
  "Exception-Handling Mechanics",
  "The try Block",
  "The catch Block",
  "The finally Block",
  "The System.Exception Class",
  "FCL-Defined Exception Classes",
  "Throwing an Exception",
  "Defining Your Own Exception Class",
  "Trading Reliability for Productivity",
  "Guidelines and Best Practices",
  "Use finally Blocks Liberally",
  "Don't Catch Everything",
  "Recovering Gracefully from an Exception",
  "Backing Out of a Partially Completed Operation",
  "When an Unrecoverable Exception Occurs: Maintaining State",
  "Hiding an Implementation Detail to Maintain a Contract",
  "Unhandled Exceptions",
  "Debugging Exceptions",
  "Exception-Handling Performance Considerations",
  "Constrained Execution Regions (CERs)",
  "Code Contracts",
] as const;

function ResetButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {label}
    </button>
  );
}

function LabShell({
  label,
  title,
  description,
  onReset,
  children,
}: {
  label: string;
  title: string;
  description: string;
  onReset: () => void;
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
        <ResetButton onClick={onReset} label="重置实验" />
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

type FlowMode = "throw" | "filter" | "catch" | "finally" | "rethrow";

export function CvcExceptionFlowLab() {
  const [mode, setMode] = useState<FlowMode>("throw");
  const details = {
    throw: ["throw site", "search handler", "exception object"],
    filter: ["filter", "before unwind", "side-effect free"],
    catch: ["selected catch", "unwind frames", "typed recovery"],
    finally: ["finally", "release owner", "then handler"],
    rethrow: ["throw;", "same object", "original stack"],
  }[mode];

  return (
    <LabShell
      label="Exception Flow Lab"
      title="观察 search、filter、unwind、finally 与 rethrow 的顺序"
      description="先预测当前步骤是否已经离开 protected region，再切换节点检查谁拥有资源、谁能处理失败，以及 stack 是否仍指向原始 throw site。"
      onReset={() => setMode("throw")}
    >
      <div className="flex flex-wrap gap-2">
        {(["throw", "filter", "catch", "finally", "rethrow"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "throw"
                ? "throw"
                : item === "filter"
                  ? "filter"
                  : item === "catch"
                    ? "catch"
                    : item === "finally"
                      ? "finally"
                      : "throw;"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode}: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Exception search and unwind sequence</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--exception-accent-soft)"
          stroke="var(--exception-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--exception-ink)"
        >
          {details[0]}
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--exception-ink)"
        >
          failure origin
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--exception-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--exception-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--exception-surface)"
          stroke="var(--exception-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--exception-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="105"
          textAnchor="middle"
          fontSize="12"
          fill="var(--exception-ink)"
        >
          protected region
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--exception-warning)"
        >
          {mode === "filter" ? "before unwind" : "frame exit"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--exception-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--exception-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--exception-accent-soft)"
          stroke="var(--exception-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--exception-ink)"
        >
          next action
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--exception-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--exception-accent)"
        >
          {mode === "rethrow"
            ? "throw; preserves the current exception stack; throw ex does not"
            : mode === "finally"
              ? "cleanup is part of the unwind path, but fatal process termination is outside this guarantee"
              : "a handler is selected before the matching finally blocks complete"}
        </text>
      </svg>
    </LabShell>
  );
}

type TaxonomyMode = "argument" | "state" | "external" | "cancellation" | "bug";

export function CvcExceptionTaxonomyLab() {
  const [mode, setMode] = useState<TaxonomyMode>("argument");
  const details = {
    argument: ["ArgumentException", "caller", "fix input"],
    state: ["InvalidOperationException", "object owner", "change order"],
    external: ["IOException", "dependency", "retry policy"],
    cancellation: ["OperationCanceledException", "caller token", "propagate"],
    bug: ["unexpected bug", "host", "isolate/restart"],
  }[mode];
  const warning = mode === "bug";

  return (
    <LabShell
      label="Failure Taxonomy Lab"
      title="把 exception type、owner 与恢复动作绑定"
      description="选择一个 failure category，先写出 owner 与 state guarantee，再决定是修输入、改变调用顺序、按幂等策略重试、传播取消，还是隔离并重启。"
      onReset={() => setMode("argument")}
    >
      <div className="flex flex-wrap gap-2">
        {(
          ["argument", "state", "external", "cancellation", "bug"] as const
        ).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "argument"
              ? "argument"
              : item === "state"
                ? "state"
                : item === "external"
                  ? "external"
                  : item === "cancellation"
                    ? "cancel"
                    : "bug"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} owned by ${details[1]}: ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Exception taxonomy and recovery owner</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill={
            warning
              ? "var(--exception-surface)"
              : "var(--exception-accent-soft)"
          }
          stroke={
            warning ? "var(--exception-warning)" : "var(--exception-accent)"
          }
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--exception-ink)"
        >
          failure type
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--exception-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="218"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--exception-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--exception-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--exception-surface)"
          stroke="var(--exception-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--exception-ink)"
        >
          recovery owner
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--exception-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--exception-warning)"
        >
          {warning ? "unknown state" : "known contract"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--exception-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--exception-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--exception-accent-soft)"
          stroke="var(--exception-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--exception-ink)"
        >
          policy
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--exception-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={
            warning ? "var(--exception-warning)" : "var(--exception-accent)"
          }
        >
          {warning
            ? "unknown or corrupted state is not a retry signal; stop the unit and let the host decide"
            : "the exception is useful only when the owner can prove the resulting state and next action"}
        </text>
      </svg>
    </LabShell>
  );
}

type StateMode = "validate" | "commit" | "compensate" | "journal" | "terminate";

export function CvcStateGuaranteeLab() {
  const [mode, setMode] = useState<StateMode>("validate");
  const details = {
    validate: ["input", "prepared next state", "no mutation"],
    commit: ["next snapshot", "atomic swap", "new state"],
    compensate: ["side effects", "durable saga", "compensation"],
    journal: ["outbox/journal", "restart", "replay safely"],
    terminate: ["unknown state", "supervisor", "process restart"],
  }[mode];

  return (
    <LabShell
      label="State Guarantee Lab"
      title="在 validate、commit-swap、compensation 与 restart 间作出选择"
      description="拖不动的状态保证要写出来：失败后是 unchanged、atomically committed 还是 durably compensatable？切换方案，观察 recovery owner 与持久证据。"
      onReset={() => setMode("validate")}
    >
      <div className="flex flex-wrap gap-2">
        {(
          ["validate", "commit", "compensate", "journal", "terminate"] as const
        ).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "validate"
              ? "validate"
              : item === "commit"
                ? "commit-swap"
                : item === "compensate"
                  ? "saga"
                  : item === "journal"
                    ? "journal"
                    : "terminate"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} to ${details[1]} to ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>State guarantee and recovery path</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--exception-accent-soft)"
          stroke="var(--exception-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--exception-ink)"
        >
          before failure
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--exception-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="218"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--exception-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--exception-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--exception-surface)"
          stroke="var(--exception-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--exception-ink)"
        >
          evidence/owner
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--exception-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--exception-warning)"
        >
          {mode === "terminate" ? "stop accepting work" : "failure boundary"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--exception-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--exception-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--exception-accent-soft)"
          stroke="var(--exception-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--exception-ink)"
        >
          after failure
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--exception-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--exception-accent)"
        >
          {mode === "commit"
            ? "publish once after all validation; Interlocked.Exchange changes the visible snapshot atomically"
            : mode === "compensate"
              ? "a compensation plan is not magic rollback: persist steps, ownership and retry semantics"
              : mode === "journal"
                ? "durable journal/outbox lets a new process recover without replaying a side effect twice"
                : mode === "terminate"
                  ? "unknown state belongs at the process boundary; restart from durable state instead of guessing"
                  : "validate and calculate before mutation so the ordinary failure path preserves the previous state"}
        </text>
      </svg>
    </LabShell>
  );
}

export const cvcExceptionsStateManagementConceptLabels = conceptLabels;
