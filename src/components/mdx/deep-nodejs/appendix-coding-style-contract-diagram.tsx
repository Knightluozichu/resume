"use client";

import { useEffect, useState } from "react";

const CHAPTER_CONCEPTS =
  "附录C Node编码规范; C.1 根源; C.2 编码规范; C.2.1 空格与格式; C.2.2 命名规范; C.2.3 比较操作; C.2.4 字面量; C.2.5 作用域; C.2.6 数组与对象; C.2.7 异步; C.2.8 类与模块; C.2.9 注解规范; C.3 最佳实践; C.3.1 冲突的解决原则; C.3.2 给编辑器设置检测工具; C.3.3 版本控制中的Hook; C.3.4 持续集成; C.4 总结; C.5 参考资源";
const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

const LENSES = [
  {
    id: "rules",
    label: "规则来源",
    accent: "var(--accent)",
    concepts: [CONCEPTS[0], CONCEPTS[1], CONCEPTS[2], CONCEPTS[3], CONCEPTS[4], CONCEPTS[5]],
    question: "这条规则要保护什么？",
    evidence: "风险、边界、owner 与可自动判断范围",
  },
  {
    id: "runtime",
    label: "运行时契约",
    accent: "var(--success)",
    concepts: [CONCEPTS[6], CONCEPTS[7], CONCEPTS[8], CONCEPTS[9], CONCEPTS[10], CONCEPTS[11]],
    question: "规则怎样影响真实行为？",
    evidence: "值、作用域、异步、模块与错误出口",
  },
  {
    id: "delivery",
    label: "反馈交付",
    accent: "var(--warning)",
    concepts: [CONCEPTS[12], CONCEPTS[13], CONCEPTS[14], CONCEPTS[15], CONCEPTS[16], CONCEPTS[17], CONCEPTS[18]],
    question: "失败怎样被发现和收敛？",
    evidence: "编辑器、Hook、CI、结果与参考依据",
  },
] as const;

export function DnjAppendixCodingStyleContractDiagram() {
  const [activeId, setActiveId] = useState<(typeof LENSES)[number]["id"]>("rules");
  const [failureMode, setFailureMode] = useState(false);
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  const reset = () => {
    setActiveId("rules");
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
            <p className="text-sm font-semibold text-primary">Node 编码规范合同图</p>
            <p className="mt-1 text-xs leading-relaxed text-secondary">
              规则从风险出发，经运行时契约进入编辑器、Hook 与 CI。
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
              aria-label="重置 Node 编码规范合同图"
              onClick={reset}
              className="min-h-11 rounded-control border border-border px-3 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              重置
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Node 编码规范观察视角" className="grid gap-2 md:grid-cols-3">
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
          viewBox="0 0 560 900"
          role="img"
          aria-label={`Node coding style contract map. Active lens: ${activeLens.label}. Failure mode: ${failureMode ? "on" : "off"}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Node 编码规范合同图</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            risk → rule → tool → review → CI
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            contract、runtime、exception 与 feedback
          </text>

          {[
            ["风险", "why"],
            ["规则", "what"],
            ["工具", "auto"],
            ["评审", "human"],
            ["CI", "sign-off"],
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
            const column = index % 3;
            const row = Math.floor(index / 3);
            const x = 20 + column * 176;
            const y = 230 + row * 42;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.64}>
                <rect
                  x={x}
                  y={y}
                  width="160"
                  height="32"
                  rx="7"
                  fill={highlighted ? activeLens.accent : "var(--bg)"}
                  fillOpacity={highlighted ? "0.1" : "1"}
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.6" : "1"}
                />
                <circle cx={x + 11} cy={y + 16} r="4" fill={highlighted ? activeLens.accent : "var(--border)"} />
                <text x={x + 21} y={y + 20} fill="var(--text-primary)" fontSize="11" fontWeight={highlighted ? "700" : "500"}>
                  {concept}
                </text>
              </g>
            );
          })}

          <path d="M20 524 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="550" textAnchor="middle" fill={activeLens.accent} fontSize="13" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="576" textAnchor="middle" fill="var(--text-primary)" fontSize="12">
            {activeLens.question}
          </text>
          <text x="280" y="600" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect
            x="20"
            y="636"
            width="520"
            height="158"
            rx="10"
            fill="var(--bg)"
            stroke={failureMode ? "var(--warning)" : "var(--border)"}
            strokeWidth={failureMode ? "1.8" : "1"}
          />
          <text x="40" y="664" fill={failureMode ? "var(--warning)" : "var(--text-primary)"} fontSize="13" fontWeight="700">
            {failureMode ? "Failure：规则冲突或 CI 漏检" : "Style contract gate"}
          </text>
          <text x="40" y="690" fill="var(--text-secondary)" fontSize="11">
            {failureMode ? "保留首个规则 id、配置版本与例外责任人，不要静默禁用检查。" : "格式自动化只负责文本；正确性、安全和资源生命周期仍需验证。"}
          </text>
          <text x="40" y="716" fill="var(--text-secondary)" fontSize="11">
            编辑器、Hook 与 CI 使用同一契约，例外必须有 owner、期限和补偿测试。
          </text>
          <text x="40" y="742" fill="var(--text-secondary)" fontSize="11">
            首个失败修复后，用同一提交、锁文件和工具版本重跑整条反馈链。
          </text>
          <text x="280" y="846" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            规范完成 = 风险可解释 + 失败可定位 + 例外可到期
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 C-1：Node 编码规范合同图；将规则来源、运行时契约与反馈交付放进同一条可审查回路。
      </figcaption>
    </figure>
  );
}
