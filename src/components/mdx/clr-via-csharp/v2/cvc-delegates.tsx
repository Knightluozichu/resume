"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--delegate-accent": "#2563eb",
  "--delegate-accent-soft": "#dbeafe",
  "--delegate-ink": "#172033",
  "--delegate-muted": "#94a3b8",
  "--delegate-warning": "#b45309",
  "--delegate-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "A First Look at Delegates",
  "Using Delegates to Call Back Static Methods",
  "Using Delegates to Call Back Instance Methods",
  "Demystifying Delegates",
  "Using Delegates to Call Back Many Methods (Chaining)",
  "C#'s Support for Delegate Chains",
  "Having More Control over Delegate Chain Invocation",
  "Enough with the Delegate Definitions Already (Generic Delegates)",
  "C#'s Syntactical Sugar for Delegates",
  "No Need to Construct a Delegate Object",
  "No Need to Define a Callback Method (Lambda Expressions)",
  "No Need to Wrap Local Variables in a Class Manually to Pass Them to a Callback Method",
  "Delegates and Reflection",
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

type AnatomyMode = "static" | "closed" | "open" | "closure";

export function CvcDelegateAnatomyLab() {
  const [mode, setMode] = useState<AnatomyMode>("static");
  const details = {
    static: ["null target", "static method", "type only"],
    closed: ["receiver object", "instance method", "strong root"],
    open: ["receiver parameter", "instance method", "caller supplies T"],
    closure: ["display object", "lambda body", "captured graph"],
  }[mode];
  const warning = mode === "closed" || mode === "closure";

  return (
    <LabShell
      label="Delegate Anatomy and Lifetime"
      title="把 target、method 和 lifetime root 画成同一条链"
      description="先预测：切换 static、closed instance、open instance 与 closure，哪个节点会把 receiver 或 captured graph 留在内存中？"
      onReset={() => setMode("static")}
    >
      <div className="flex flex-wrap gap-2">
        {(["static", "closed", "open", "closure"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "static"
              ? "static"
              : item === "closed"
                ? "closed instance"
                : item === "open"
                  ? "open instance"
                  : "closure"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} delegate anatomy: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Delegate target, method and lifetime root</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--delegate-accent-soft)"
          stroke="var(--delegate-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--delegate-ink)"
        >
          delegate
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--delegate-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--delegate-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--delegate-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--delegate-surface)"
          stroke="var(--delegate-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--delegate-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill="var(--delegate-ink)"
        >
          Invoke signature
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--delegate-warning)" : "var(--delegate-ink)"}
        >
          {details[2]}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--delegate-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--delegate-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={
            warning ? "var(--delegate-surface)" : "var(--delegate-accent-soft)"
          }
          stroke={warning ? "var(--delegate-muted)" : "var(--delegate-accent)"}
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--delegate-ink)"
        >
          lifetime
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--delegate-ink)"
        >
          {warning ? "check root" : "no receiver"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--delegate-warning)" : "var(--delegate-accent)"}
        >
          {mode === "static"
            ? "static delegate 没有 receiver，但仍要定义 callback owner 与 thread contract"
            : mode === "closed"
              ? "closed instance delegate 强引用 target；event、timer、cache owner 必须负责退订"
              : mode === "open"
                ? "open delegate 把 receiver 变成显式参数，缓存 callable 时仍需核对签名"
                : "closure target 是 display object；captured this、scope 或大对象可能一起存活"}
        </text>
      </svg>
    </LabShell>
  );
}

type ChainMode = "combine" | "remove" | "invoke" | "fault";

export function CvcDelegateChainLab() {
  const [mode, setMode] = useState<ChainMode>("combine");
  const details = {
    combine: ["A → B → C", "new immutable chain", "ordered invoke"],
    remove: ["A → B → C", "remove one match", "snapshot matters"],
    invoke: ["A → B → C", "GetInvocationList", "collect results"],
    fault: ["A throws", "default stops", "owner policy"],
  }[mode];
  const warning = mode === "fault";

  return (
    <LabShell
      label="Multicast Chain Policy"
      title="把 combine、remove、invoke 和异常策略从语法糖中拆出来"
      description="动手试：切换链操作，观察 multicast delegate 的顺序、不可变更新、返回值与异常边界，避免把 `+=` 当成完整 policy。"
      onReset={() => setMode("combine")}
    >
      <div className="flex flex-wrap gap-2">
        {(["combine", "remove", "invoke", "fault"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "combine"
              ? "combine"
              : item === "remove"
                ? "remove"
                : item === "invoke"
                  ? "逐项 invoke"
                  : "fault"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} multicast chain: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Multicast delegate chain and invocation policy</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--delegate-accent-soft)"
          stroke="var(--delegate-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--delegate-ink)"
        >
          shared field
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--delegate-ink)"
        >
          delegate chain
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--delegate-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--delegate-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--delegate-surface)"
          stroke="var(--delegate-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--delegate-ink)"
        >
          {details[0]}
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill="var(--delegate-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--delegate-warning)" : "var(--delegate-ink)"}
        >
          {details[2]}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--delegate-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--delegate-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={
            warning ? "var(--delegate-surface)" : "var(--delegate-accent-soft)"
          }
          stroke={warning ? "var(--delegate-muted)" : "var(--delegate-accent)"}
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--delegate-ink)"
        >
          result
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--delegate-ink)"
        >
          {mode === "fault"
            ? "partial effects"
            : mode === "invoke"
              ? "aggregate"
              : "new value"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--delegate-warning)" : "var(--delegate-accent)"}
        >
          {mode === "combine"
            ? "Combine / += 返回新的不可变链；并发更新 shared field 要有同步策略"
            : mode === "remove"
              ? "Remove 只移除一个匹配项；已经取出的 snapshot 仍可能继续调用"
              : mode === "invoke"
                ? "GetInvocationList 让 owner 显式聚合结果、telemetry 与每个 handler 的异常"
                : "普通 Invoke 遇到第一个未处理异常会停止，隔离行为必须由 owner 逐项定义"}
        </text>
      </svg>
    </LabShell>
  );
}

type SyntaxMode =
  | "method-group"
  | "generic"
  | "lambda"
  | "capture"
  | "reflection";

export function CvcDelegateSyntaxLab() {
  const [mode, setMode] = useState<SyntaxMode>("method-group");
  const details = {
    "method-group": ["method group", "target delegate", "compile-time bind"],
    generic: ["Func / Action", "variance", "typed contract"],
    lambda: ["lambda expression", "capture or static", "allocation profile"],
    capture: ["display class", "variable cell", "shared state"],
    reflection: ["MethodInfo", "CreateDelegate", "preserve code"],
  }[mode];
  const warning = mode === "capture" || mode === "reflection";

  return (
    <LabShell
      label="Delegate Syntax, Capture and Binding"
      title="观察语法糖背后的 delegate object、closure cell 与 reflection bind"
      description="先预测：切换 method group、generic delegate、lambda、capture 与 reflection，哪一层决定 allocation、变量共享和 AOT 保留？"
      onReset={() => setMode("method-group")}
    >
      <div className="flex flex-wrap gap-2">
        {(
          [
            "method-group",
            "generic",
            "lambda",
            "capture",
            "reflection",
          ] as const
        ).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "method-group"
              ? "method group"
              : item === "generic"
                ? "Func / Action"
                : item === "lambda"
                  ? "lambda"
                  : item === "capture"
                    ? "capture"
                    : "reflection"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} delegate binding: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Delegate syntax, closure capture and reflection binding</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--delegate-accent-soft)"
          stroke="var(--delegate-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--delegate-ink)"
        >
          source form
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--delegate-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--delegate-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--delegate-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--delegate-surface)"
          stroke="var(--delegate-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--delegate-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--delegate-warning)" : "var(--delegate-ink)"}
        >
          {details[2]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill="var(--delegate-ink)"
        >
          inspect IL / signature
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--delegate-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--delegate-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={
            warning ? "var(--delegate-surface)" : "var(--delegate-accent-soft)"
          }
          stroke={warning ? "var(--delegate-muted)" : "var(--delegate-accent)"}
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--delegate-ink)"
        >
          review
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--delegate-ink)"
        >
          {mode === "capture"
            ? "root + cell"
            : mode === "reflection"
              ? "AOT + cache"
              : "contract"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--delegate-warning)" : "var(--delegate-accent)"}
        >
          {mode === "method-group"
            ? "method group 省略 new，不代表没有目标 delegate；目标类型决定绑定与 overload"
            : mode === "generic"
              ? "Func / Action 提供常用 signature 与 variance，业务 lifetime、async、异常仍需命名 contract"
              : mode === "lambda"
                ? "static lambda 禁止 capture；普通 lambda 是否分配要用生成代码与 profile 验证"
                : mode === "capture"
                  ? "capture 共享 variable cell，不是每次声明时冻结值；display object 会延长 captured graph"
                  : "CreateDelegate 比 MethodInfo.Invoke 更 typed，但要验证 visibility、参数兼容和 trimming preservation"}
        </text>
      </svg>
    </LabShell>
  );
}

export const cvcDelegatesConceptLabels = conceptLabels;
