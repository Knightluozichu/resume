"use client";

import { useState } from "react";

type Stage = { id: string; label: string; signal: string; detail: string };

const OFFICIAL_NODES = [
  "第6章 可以工作的类",
  "6.1 类的基础：抽象数据类型",
  "需要用到ADT的例子",
  "使用ADT的益处",
  "更多的ADT示例",
  "在非面向对象环境中用ADT处理多份数据实例",
  "ADT和类",
  "6.2 良好的类接口",
  "好的抽象",
  "良好的封装",
  "6.3 有关设计和实现的问题",
  "包含（“有一个……”的关系）",
  "继承（“是一个……”关系）",
  "成员函数和数据成员",
  "构造函数",
  "6.4 创建类的原因",
  "应该避免的类",
  "总结：创建类的理由",
  "与具体编程语言相关的问题",
  "6.6 超越类：包",
  "更多资源",
  "关键点",
] as const;

const STAGES: readonly Stage[] = [
  {
    id: "construct",
    label: "构造",
    signal: "建立起点",
    detail: "依赖和范围在对象可见之前通过检查。",
  },
  {
    id: "interface",
    label: "最小接口",
    signal: "命名动作",
    detail: "调用者只看到能表达意图的公开操作。",
  },
  {
    id: "state",
    label: "不变量",
    signal: "状态合法",
    detail: "每次公开调用返回后都重新满足合同。",
  },
  {
    id: "composition",
    label: "组合",
    signal: "隔离变化",
    detail: "拥有关系把策略和责任放在各自边界内。",
  },
  {
    id: "verification",
    label: "验收",
    signal: "首差可见",
    detail: "正常、边界、故障和重置都留下可复核结果。",
  },
];

export function Cc2e06WorkingClassesMechanismLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [leaked, setLeaked] = useState(false);
  const active = STAGES[activeIndex];
  const reset = () => {
    setActiveIndex(0);
    setLeaked(false);
  };

  return (
    <section
      aria-label="工作类机制实验"
      data-visual-kind="cc2e-06-working-classes-mechanism"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            第6章 · 生命周期合同
          </p>
          <h3 className="mt-2 text-lg font-semibold text-primary">
            一个可工作的类，如何守住自己的边界？
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            五个节点把构造、接口、状态、组合和验收连起来。切换节点查看证据，再注入一次公开字段泄漏，定位首个失守位置。
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-control border border-border bg-surface px-3 py-2 text-xs text-secondary">
            目录节点 {OFFICIAL_NODES.length}/22
          </span>
          <button
            type="button"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置实验
          </button>
        </div>
      </header>

      <div className="min-w-0 space-y-4 p-5">
        <div
          className="grid min-w-0 gap-2 sm:grid-cols-5"
          aria-label="机制节点"
        >
          {STAGES.map((stage, index) => (
            <button
              key={stage.id}
              type="button"
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors ${activeIndex === index ? "border-accent bg-accent/10 text-primary" : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"}`}
            >
              <span className="block font-mono text-[11px] text-accent">
                0{index + 1}
              </span>
              <span className="mt-1 block truncate font-semibold">
                {stage.label}
              </span>
            </button>
          ))}
        </div>

        <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-control border border-border bg-surface px-3 py-2 text-sm text-primary">
          <input
            type="checkbox"
            checked={leaked}
            onChange={(event) => setLeaked(event.target.checked)}
            className="h-5 w-5 accent-accent"
          />
          <span>注入故障：绕过接口，直接把库存数量改成非法值</span>
        </label>

        <svg
          viewBox="0 0 760 318"
          role="img"
          aria-label={`工作类五节点机制图，当前查看${active.label}。${leaked ? "已注入公开字段泄漏，状态节点显示首个失守。" : "当前为安全路径，所有公开调用都经过不变量检查。"}`}
          className="block h-auto w-full rounded-card border border-border bg-surface"
        >
          <text
            x="28"
            y="31"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            可工作的类：从合法起点到可复核验收
          </text>
          <text x="28" y="54" fontSize="12" fill="var(--text-secondary)">
            公开操作是唯一入口；故障模式会把首个不变量偏离标成警告
          </text>
          <line
            x1="50"
            y1="151"
            x2="710"
            y2="151"
            stroke="var(--border)"
            strokeWidth="3"
          />
          {STAGES.map((stage, index) => {
            const x = 36 + index * 146;
            const selected = activeIndex === index;
            const blocked = leaked && stage.id === "state";
            const color = blocked
              ? "var(--danger)"
              : selected
                ? "var(--accent)"
                : "var(--border)";
            return (
              <g key={`${stage.id}-${index}`}>
                {index < STAGES.length - 1 ? (
                  <path
                    d={`M${x + 114} 151H${x + 140}`}
                    fill="none"
                    stroke={blocked ? "var(--danger)" : "var(--accent)"}
                    strokeWidth="2"
                    strokeDasharray={blocked ? "4 4" : undefined}
                  />
                ) : null}
                <rect
                  x={x}
                  y="91"
                  width="114"
                  height="120"
                  rx="12"
                  fill="var(--bg)"
                  stroke={color}
                  strokeWidth={blocked || selected ? 2.5 : 1.5}
                />
                <circle cx={x + 20} cy="116" r="10" fill={color} />
                <text
                  x={x + 20}
                  y="120"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--bg)"
                >
                  {index + 1}
                </text>
                <text
                  x={x + 66}
                  y="121"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {stage.label}
                </text>
                <text
                  x={x + 57}
                  y="153"
                  textAnchor="middle"
                  fontSize="12"
                  fill={blocked ? "var(--danger)" : "var(--accent)"}
                >
                  {blocked ? "首个失守" : stage.signal}
                </text>
                <text
                  x={x + 57}
                  y="181"
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--text-secondary)"
                >
                  {selected ? "正在观察" : "等待检查"}
                </text>
              </g>
            );
          })}
          <rect
            x="36"
            y="238"
            width="688"
            height="48"
            rx="10"
            fill="var(--bg)"
            stroke={leaked ? "var(--danger)" : "var(--success)"}
            strokeWidth="1.5"
          />
          <text
            x="54"
            y="268"
            fontSize="13"
            fontWeight="700"
            fill={leaked ? "var(--danger)" : "var(--success)"}
          >
            {leaked
              ? "拒绝：公开字段绕过接口，状态在验收前已失去合同"
              : "通过：构造和每次公开调用后都能重新检查不变量"}
          </text>
        </svg>

        <div className="grid gap-3 sm:grid-cols-[1.1fr_1fr]">
          <div className="rounded-control border border-border bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              当前节点：{active.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-primary">
              {active.detail}
            </p>
          </div>
          <div
            role="status"
            aria-live="polite"
            className="rounded-control border border-border bg-surface p-4 text-sm leading-6 text-secondary"
          >
            <span className="font-semibold text-primary">观察结果：</span>
            {leaked
              ? " 首个偏离在不变量节点出现；请回到接口边界修复，而不是在最后输出处掩盖它。"
              : " 当前没有故障；切换到边界或验收节点，检查对象是否仍可被第二位读者重放。"}
          </div>
        </div>
      </div>
    </section>
  );
}
