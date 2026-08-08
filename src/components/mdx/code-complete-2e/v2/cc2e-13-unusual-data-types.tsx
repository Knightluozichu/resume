"use client";

import { useState } from "react";

type Focus = "structure" | "pointer" | "global";

type FocusInfo = {
  label: string;
  detail: string;
  owner: string;
  access: string;
  lifetime: string;
};

const FOCUS_INFO: Record<Focus, FocusInfo> = {
  structure: {
    label: "结构",
    detail: "先把不变量放进对象边界",
    owner: "容器对象",
    access: "公开操作",
    lifetime: "构造到析构",
  },
  pointer: {
    label: "指针",
    detail: "先回答谁拥有对象、谁只是借用",
    owner: "拥有者",
    access: "受检访问",
    lifetime: "释放前有效",
  },
  global: {
    label: "全局数据",
    detail: "先把隐藏输入改造成显式接口",
    owner: "模块边界",
    access: "访问子程序",
    lifetime: "可追踪共享状态",
  },
};

const CONCEPT_LABELS = [
  "第13章 不常见的数据类型",
  "13.1 结构",
  "13.2 指针",
  "用来理解指针的例子",
  "使用指针的一般技巧",
  "C++指针",
  "C指针",
  "13.3 全局数据",
  "与全局数据有关的常见问题",
  "使用全局数据的理由",
  "只有万不得已时才使用全局数据",
  "用访问子程序来取代全局数据",
  "如何降低使用全局数据的风险",
  "其他资源",
  "关键点",
] as const;

const COLUMNS = [
  { title: "所有权", value: "谁负责释放", x: 40 },
  { title: "别名", value: "谁可以借用", x: 272 },
  { title: "生命周期", value: "何时仍有效", x: 504 },
] as const;

const FOCUS_ORDER: readonly Focus[] = ["structure", "pointer", "global"];

function StatusMark({ danger }: { danger: boolean }) {
  return (
    <circle
      cx="0"
      cy="0"
      r="8"
      fill={danger ? "var(--danger)" : "var(--success)"}
    />
  );
}

export function Cc2e13UnusualDataTypesDiagram({
  stage,
}: {
  stage: 1 | 2 | 3;
}) {
  const active = FOCUS_ORDER[stage - 1];
  const activeLabel = FOCUS_INFO[active].label;

  return (
    <figure className="mdx-figure not-prose mx-auto my-5 min-w-0">
      <div className="min-w-0 overflow-x-auto rounded-card border border-border bg-elevated p-3 sm:p-5">
        <svg
          viewBox="0 0 760 300"
          role="img"
          aria-label={`第13章机制图：结构、指针和全局数据共同检查所有权、别名与生命周期；当前聚焦${activeLabel}。`}
          className="mx-auto block h-auto min-w-[330px] w-full max-w-[760px]"
        >
          <text x="32" y="28" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            不常见数据类型的安全边界
          </text>
          <text x="32" y="50" fontSize="12" fill="var(--text-secondary)">
            先声明责任，再允许访问；释放不能留下仍可使用的别名
          </text>

          <path
            d="M104 150H656"
            fill="none"
            stroke="var(--border)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {COLUMNS.map((column, index) => {
            const focused = index === stage - 1;
            return (
              <g key={column.title}>
                <rect
                  x={column.x}
                  y="94"
                  width="184"
                  height="112"
                  rx="12"
                  fill={focused ? "var(--accent)" : "var(--bg)"}
                  fillOpacity={focused ? "0.1" : "1"}
                  stroke={focused ? "var(--accent)" : "var(--border)"}
                  strokeWidth={focused ? "2.5" : "1.5"}
                />
                <circle cx={column.x + 24} cy="122" r="12" fill={focused ? "var(--accent)" : "var(--border)"} />
                <text x={column.x + 24} y="127" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--bg)">
                  {index + 1}
                </text>
                <text x={column.x + 48} y="127" fontSize="14" fontWeight="700" fill={focused ? "var(--accent)" : "var(--text-primary)"}>
                  {column.title}
                </text>
                <text x={column.x + 20} y="161" fontSize="12" fill="var(--text-primary)">
                  {column.value}
                </text>
                <text x={column.x + 20} y="185" fontSize="12" fill="var(--text-secondary)">
                  访问前检查合同
                </text>
              </g>
            );
          })}

          <text x="380" y="246" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">
            safe reference = valid owner + live object + permitted access
          </text>
          <text x="380" y="272" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            当前步骤：{activeLabel} · 用一条反例检查责任是否仍然可追踪
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        结构、指针和全局数据不是三张孤立清单，而是同一个引用合同的三个观察面。
      </figcaption>
    </figure>
  );
}

export function Cc2e13UnusualDataTypesLab() {
  const [focus, setFocus] = useState<Focus>("structure");
  const [fault, setFault] = useState(false);
  const current = FOCUS_INFO[focus];
  const status = fault
    ? "拒绝：释放后仍保留别名，访问合同已经失效"
    : "通过：所有权、访问边界和生命周期可以被复述";

  const reset = () => {
    setFocus("structure");
    setFault(false);
  };

  return (
    <section
      aria-label="第13章不常见数据类型引用合同实验"
      data-visual-kind="cc2e-13-unusual-data-types-contract"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第13章 · 引用合同实验
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            一个对象，三种责任检查
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            先猜哪一项会先失效，再切换观察面并注入故障。实验不计算假分数，只展示能否说明责任链。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置第13章引用合同实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div className="flex min-w-0 flex-wrap gap-2" aria-label="选择观察面">
          {FOCUS_ORDER.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={focus === item}
              onClick={() => setFocus(item)}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                focus === item
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {FOCUS_INFO[item].label}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={fault}
            onClick={() => setFault((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              fault
                ? "border-danger bg-danger/10 text-danger"
                : "border-border text-secondary hover:border-danger hover:text-primary"
            }`}
          >
            {fault ? "移除故障" : "注入释放后别名"}
          </button>
        </div>

        <div className="mt-5 min-w-0 overflow-x-auto rounded-card border border-border bg-bg p-3 sm:p-5">
          <svg
            viewBox="0 0 760 360"
            role="img"
            aria-label={`第13章交互实验，当前观察面为${current.label}，${current.detail}。${status}。目录节点包括${CONCEPT_LABELS.join("、")}。`}
            className="mx-auto block h-auto min-w-[330px] w-full max-w-[760px]"
          >
            <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
              {current.detail}
            </text>
            <text x="32" y="54" fontSize="12" fill="var(--text-secondary)">
              观察面：{current.label} · 故障开关只改变一个条件
            </text>

            <path d="M108 148H652" fill="none" stroke="var(--border)" strokeWidth="4" strokeLinecap="round" />
            {COLUMNS.map((column, index) => {
              const focused = index === FOCUS_ORDER.indexOf(focus);
              const danger = fault && focused;
              return (
                <g key={column.title}>
                  <rect
                    x={column.x}
                    y="94"
                    width="184"
                    height="126"
                    rx="12"
                    fill={danger ? "var(--danger)" : focused ? "var(--accent)" : "var(--surface, var(--bg))"}
                    fillOpacity="0.1"
                    stroke={danger ? "var(--danger)" : focused ? "var(--accent)" : "var(--border)"}
                    strokeWidth={focused ? "2.5" : "1.5"}
                  />
                  <text x={column.x + 20} y="124" fontSize="14" fontWeight="700" fill={danger ? "var(--danger)" : focused ? "var(--accent)" : "var(--text-primary)"}>
                    {column.title}
                  </text>
                  <g transform={`translate(${column.x + 28} 158)`}>
                    <StatusMark danger={danger} />
                  </g>
                  <text x={column.x + 48} y="163" fontSize="12" fill="var(--text-primary)">
                    {focused && fault ? "合同失效" : "责任已声明"}
                  </text>
                  <text x={column.x + 20} y="194" fontSize="12" fill="var(--text-secondary)">
                    {focused ? current[column.title === "所有权" ? "owner" : column.title === "别名" ? "access" : "lifetime"] : "等待检查"}
                  </text>
                </g>
              );
            })}

            <rect x="32" y="254" width="696" height="70" rx="10" fill={fault ? "var(--danger)" : "var(--success)"} fillOpacity="0.08" stroke={fault ? "var(--danger)" : "var(--success)"} strokeWidth="1.5" />
            <text x="52" y="282" fontSize="14" fontWeight="700" fill={fault ? "var(--danger)" : "var(--success)"}>
              {fault ? "拒绝" : "通过"}
            </text>
            <text x="112" y="282" fontSize="12" fill="var(--text-primary)">
              {status}
            </text>
            <text x="52" y="306" fontSize="12" fill="var(--text-secondary)">
              记录首个偏离点，然后回到同一基线重放；这才是生命周期验证。
            </text>
          </svg>
        </div>

        <p className="mt-3 text-center text-xs text-secondary" role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </section>
  );
}
