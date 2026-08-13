/**
 * Chapter 14 execution/wait/continuation map.
 * Static SVG: it separates execution resources from Task completion and
 * makes scheduler, cancellation, fan-out, and lock ownership inspectable.
 */

type ConcurrencyNode = {
  displayLabel: string;
  contract: string;
  evidence: string;
  color: string;
};

const CONCURRENCY_NODES: readonly ConcurrencyNode[] = [
  {
    displayLabel: "Threading",
    contract: "execution resource",
    evidence: "stack · affinity · cost",
    color: "var(--accent)",
  },
  {
    displayLabel: "Synchronization Contexts",
    contract: "continuation target",
    evidence: "UI thread · capture",
    color: "var(--success)",
  },
  {
    displayLabel: "The Thread Pool",
    contract: "shared workers",
    evidence: "queue · starvation · I/O",
    color: "var(--warning)",
  },
  {
    displayLabel: "Tasks",
    contract: "completion object",
    evidence: "result · fault · cancel",
    color: "var(--danger)",
  },
  {
    displayLabel: "Principles of Asynchrony",
    contract: "wait without blocking",
    evidence: "limit · backpressure",
    color: "var(--accent)",
  },
  {
    displayLabel: "Async Functions",
    contract: "state machine",
    evidence: "await · locals · resume",
    color: "var(--success)",
  },
  {
    displayLabel: "Async Streams",
    contract: "pull + disposal",
    evidence: "MoveNext · buffer · owner",
    color: "var(--warning)",
  },
  {
    displayLabel: "Cancellation",
    contract: "cooperative request",
    evidence: "checkpoint · token · commit",
    color: "var(--danger)",
  },
  {
    displayLabel: "TAP",
    contract: "async API shape",
    evidence: "Async · token · Task",
    color: "var(--accent)",
  },
  {
    displayLabel: "Task Combinators",
    contract: "compose outcomes",
    evidence: "WhenAll · WhenAny · loser",
    color: "var(--success)",
  },
  {
    displayLabel: "Asynchronous Locking",
    contract: "awaitable mutex",
    evidence: "WaitAsync · Release",
    color: "var(--warning)",
  },
  {
    displayLabel: "Obsolete Patterns",
    contract: "migration boundary",
    evidence: "APM · EAP · lifecycle",
    color: "var(--danger)",
  },
];

const CHAPTER_CONCEPTS =
  "Threading; Synchronization Contexts; The Thread Pool; Tasks; Principles of Asynchrony; Asynchronous Functions in C#; Asynchronous Streams; Cancellation; The Task-Based Asynchronous Pattern; Task Combinators; Asynchronous Locking; Obsolete Patterns";

export function Ctc10ConcurrencyAsynchronyExecutionFlowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 560 900"
          role="img"
          aria-label={`Concurrency flow: execution resources produce a Task, await schedules a continuation, and cancellation, combinators, locks, and lifecycle policies complete the operation. Formal nodes: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <text
            x="280"
            y="28"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Concurrency · execution, waiting, completion
          </text>
          <text
            x="280"
            y="51"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            separate CPU resources, async waiting, continuation policy, and outcome ownership
          </text>

          <rect
            x="88"
            y="72"
            width="384"
            height="56"
            rx="10"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="280"
            y="96"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            operation ledger
          </text>
          <text
            x="280"
            y="115"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            owner · limit · token · scheduler · observer · loser cleanup
          </text>

          {CONCURRENCY_NODES.map((node, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = 20 + column * 270;
            const y = 155 + row * 108;
            const center = x + 125;
            return (
              <g key={node.displayLabel}>
                {index < 2 ? (
                  <line
                    x1="280"
                    y1="128"
                    x2={center}
                    y2={y}
                    stroke={node.color}
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                ) : null}
                <rect
                  x={x}
                  y={y}
                  width="250"
                  height="88"
                  rx="10"
                  fill="var(--bg)"
                  stroke={node.color}
                  strokeWidth="1.5"
                />
                <circle cx={x + 19} cy={y + 23} r="7" fill={node.color} />
                <text
                  x={x + 34}
                  y={y + 27}
                  fontSize="11"
                  fontWeight="700"
                  fill={node.color}
                  fontFamily="monospace"
                >
                  {node.displayLabel}
                </text>
                <text
                  x={x + 16}
                  y={y + 55}
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {node.contract}
                </text>
                <text
                  x={x + 16}
                  y={y + 75}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {node.evidence}
                </text>
              </g>
            );
          })}

          <line
            x1="24"
            y1="815"
            x2="536"
            y2="815"
            stroke="var(--border)"
            strokeDasharray="5 4"
          />
          <text
            x="280"
            y="840"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            await observes completion; it does not create a thread
          </text>
          <text
            x="280"
            y="866"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            every fan-out, cancellation, and lock needs an owner and a cleanup path
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        并发设计先记录执行资源、等待与完成态，再验证取消、组合、锁和生命周期；覆盖 {CHAPTER_CONCEPTS}。
      </figcaption>
    </figure>
  );
}
