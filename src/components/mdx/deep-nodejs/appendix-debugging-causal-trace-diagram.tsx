"use client";

import { useEffect, useState } from "react";

const CHAPTER_CONCEPTS =
  "附录B 调试Node; B.1 debugger; B.2 node-inspector; B.2.1 安装node-inspector; B.2.2 错误堆栈; B.3 总结";
const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

const LENSES = [
  {
    id: "reproduce",
    label: "复现",
    accent: "var(--accent)",
    concepts: [CONCEPTS[0], CONCEPTS[1]],
    question: "什么输入能再次触发偏离？",
    evidence: "版本、入口、输入摘要与预期不变量",
  },
  {
    id: "causality",
    label: "因果",
    accent: "var(--success)",
    concepts: [CONCEPTS[2], CONCEPTS[3], CONCEPTS[4]],
    question: "暂停后怎样连接异步证据？",
    evidence: "端口、事件、request id、栈与 source map",
  },
  {
    id: "drain",
    label: "收敛",
    accent: "var(--warning)",
    concepts: [CONCEPTS[4], CONCEPTS[5]],
    question: "诊断结束后还剩什么？",
    evidence: "disconnect、端口、句柄、普通模式重放",
  },
] as const;

export function DnjAppendixDebuggingCausalTraceDiagram() {
  const [activeId, setActiveId] = useState<(typeof LENSES)[number]["id"]>("reproduce");
  const [failureMode, setFailureMode] = useState(false);
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  const reset = () => {
    setActiveId("reproduce");
    setFailureMode(false);
  };

  useEffect(() => {
    const handleStepperReset = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target.closest('button[aria-label="重置分步演示"]')) return;
      reset();
    };

    document.addEventListener("click", handleStepperReset, true);
    return () => document.removeEventListener("click", handleStepperReset, true);
  }, []);

  return (
    <figure className="mdx-figure my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="border-b border-border p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-primary">Node 调试因果图</p>
            <p className="mt-1 text-xs leading-relaxed text-secondary">
              用同一条 trace 连接复现、暂停、异步证据与会话收敛。
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-pressed={failureMode}
              onClick={() => setFailureMode((current) => !current)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                failureMode
                  ? "border-warning bg-warning/10 text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-warning"
              }`}
            >
              {failureMode ? "清除故障" : "注入故障"}
            </button>
            <button
              type="button"
              aria-label="重置 Node 调试因果图"
              onClick={reset}
              className="min-h-11 rounded-control border border-border px-3 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              重置
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Node 调试观察视角" className="grid gap-2 md:grid-cols-3">
          {LENSES.map((lens) => {
            const selected = lens.id === activeId;
            return (
              <button
                key={lens.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-pressed={selected}
                onClick={() => setActiveId(lens.id)}
                className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {lens.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <svg
          viewBox="0 0 560 840"
          role="img"
          aria-label={`Node debugging causal trace. Active lens: ${activeLens.label}. Failure mode: ${failureMode ? "on" : "off"}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Node 调试因果图</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            reproduce → pause → correlate → explain → drain
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            input、breakpoint、event、stack 与 session
          </text>

          {[
            ["复现", "same input"],
            ["暂停", "condition"],
            ["关联", "request id"],
            ["解释", "cause + stack"],
            ["收敛", "disconnect"],
          ].map(([title, detail], index) => {
            const x = 20 + (index % 3) * 176;
            const y = 78 + Math.floor(index / 3) * 76;
            return (
              <g key={title}>
                <rect
                  x={x}
                  y={y}
                  width="160"
                  height="54"
                  rx="9"
                  fill="var(--bg)"
                  stroke={index === 1 || index === 4 ? activeLens.accent : "var(--border)"}
                  strokeWidth={index === 1 || index === 4 ? "1.8" : "1"}
                />
                <text x={x + 14} y={y + 22} fill="var(--text-primary)" fontSize="12" fontWeight="700">
                  {title}
                </text>
                <text x={x + 14} y={y + 41} fill="var(--text-secondary)" fontSize="11">
                  {detail}
                </text>
                {index < 4 && (
                  <path
                    d={index === 2 ? `M${x + 80} ${y + 58} V${y + 72}` : `M${x + 164} ${y + 27} H${x + 172}`}
                    stroke="var(--text-secondary)"
                    strokeWidth="1.5"
                  />
                )}
              </g>
            );
          })}

          {CONCEPTS.map((concept, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = 20 + column * 268;
            const y = 250 + row * 48;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.64}>
                <rect
                  x={x}
                  y={y}
                  width="252"
                  height="36"
                  rx="8"
                  fill={highlighted ? activeLens.accent : "var(--bg)"}
                  fillOpacity={highlighted ? "0.1" : "1"}
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.8" : "1"}
                />
                <circle cx={x + 14} cy={y + 18} r="4.5" fill={highlighted ? activeLens.accent : "var(--border)"} />
                <text x={x + 26} y={y + 23} fill="var(--text-primary)" fontSize="11" fontWeight={highlighted ? "700" : "500"}>
                  {concept}
                </text>
              </g>
            );
          })}

          <path d="M20 420 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="448" textAnchor="middle" fill={activeLens.accent} fontSize="13" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="474" textAnchor="middle" fill="var(--text-primary)" fontSize="12">
            {activeLens.question}
          </text>
          <text x="280" y="498" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect
            x="20"
            y="540"
            width="520"
            height="158"
            rx="10"
            fill="var(--bg)"
            stroke={failureMode ? "var(--warning)" : "var(--border)"}
            strokeWidth={failureMode ? "1.8" : "1"}
          />
          <text x="40" y="568" fill={failureMode ? "var(--warning)" : "var(--text-primary)"} fontSize="13" fontWeight="700">
            {failureMode ? "Failure：端口暴露或会话未收敛" : "Debug boundary gate"}
          </text>
          <text x="40" y="594" fill="var(--text-secondary)" fontSize="11">
            {failureMode ? "限制监听地址和访问策略，保存首个异常后停止继续求值。" : "暂停是观测手段，不能取代输入、事件和资源生命周期证据。"}
          </text>
          <text x="40" y="620" fill="var(--text-secondary)" fontSize="11">
            request id 连接同步栈、Promise、Worker 消息与完整错误 cause。
          </text>
          <text x="40" y="646" fill="var(--text-secondary)" fontSize="11">
            诊断结束要 disconnect、关闭端口，并用无暂停模式重放同一输入。
          </text>
          <text x="280" y="750" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            调试完成 = 找到因果 + 关闭能力 + 没有残留
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 B-1：Node 调试因果图；将复现、断点、异步关联、堆栈来源和会话排空放进同一条证据链。
      </figcaption>
    </figure>
  );
}
