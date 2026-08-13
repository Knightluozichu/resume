"use client";

import { useEffect, useState } from "react";

const CHAPTER_TOPICS =
  "module graph; byte boundary; resource owner; single completion; replayable evidence; shutdown drain";
const TOPICS = CHAPTER_TOPICS.split("; ");

const LENSES = [
  {
    id: "path",
    label: "请求路径",
    accent: "var(--accent)",
    topics: [TOPICS[0], TOPICS[1], TOPICS[2]],
    question: "数据下一步交给谁？",
    evidence: "模块、字节、队列与资源 owner",
  },
  {
    id: "failure",
    label: "首个偏离",
    accent: "var(--warning)",
    topics: [TOPICS[1], TOPICS[2], TOPICS[3]],
    question: "哪一个不变量先被破坏？",
    evidence: "边界、完成次数、错误和取消",
  },
  {
    id: "recovery",
    label: "恢复签发",
    accent: "var(--success)",
    topics: [TOPICS[3], TOPICS[4], TOPICS[5]],
    question: "重放后怎样证明没有漂移？",
    evidence: "事件、输出、退出码与关闭状态",
  },
] as const;

export function DnjOfficialFinalReviewEvidenceMap() {
  const [activeId, setActiveId] =
    useState<(typeof LENSES)[number]["id"]>("path");
  const [failureMode, setFailureMode] = useState(false);
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  const reset = () => {
    setActiveId("path");
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
    return () =>
      document.removeEventListener("click", handleStepperReset, true);
  }, []);

  return (
    <figure className="mdx-figure my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="border-b border-border p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-primary">
              Node 全书回放证据图
            </p>
            <p className="mt-1 text-xs leading-relaxed text-secondary">
              同一条请求沿模块、字节、异步和恢复边界前进。
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
              {failureMode ? "清除偏离" : "注入偏离"}
            </button>
            <button
              type="button"
              aria-label="重置 Node 全书回放证据图"
              onClick={reset}
              className="min-h-11 rounded-control border border-border px-3 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              重置
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-border p-4">
        <div
          role="tablist"
          aria-label="Node 全书复盘观察视角"
          className="grid gap-2 md:grid-cols-3"
        >
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
          aria-label={`Node final review evidence map. Active lens: ${activeLens.label}. Failure mode: ${failureMode ? "on" : "off"}. Topics: ${CHAPTER_TOPICS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Node 全书回放证据图</title>
          <text
            x="280"
            y="28"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="17"
            fontWeight="700"
          >
            input → module → bytes → async → process → evidence
          </text>
          <text
            x="280"
            y="50"
            textAnchor="middle"
            fill="var(--text-secondary)"
            fontSize="12"
          >
            trace the first divergence, then drain and replay
          </text>

          {[
            ["输入", "fixed"],
            ["模块", "resolve"],
            ["字节", "decode"],
            ["异步", "schedule"],
            ["进程", "handoff"],
            ["证据", "replay"],
          ].map(([title, detail], index) => {
            const x = 20 + (index % 3) * 176;
            const y = 78 + Math.floor(index / 3) * 76;
            const highlighted = index === 1 || index === 3 || index === 5;
            return (
              <g key={title}>
                <rect
                  x={x}
                  y={y}
                  width="160"
                  height="54"
                  rx="9"
                  fill="var(--bg)"
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.8" : "1"}
                />
                <text
                  x={x + 14}
                  y={y + 22}
                  fill="var(--text-primary)"
                  fontSize="12"
                  fontWeight="700"
                >
                  {title}
                </text>
                <text
                  x={x + 14}
                  y={y + 41}
                  fill="var(--text-secondary)"
                  fontSize="11"
                >
                  {detail}
                </text>
                {index < 5 && (
                  <path
                    d={
                      index === 2
                        ? `M${x + 80} ${y + 58} V${y + 72}`
                        : `M${x + 164} ${y + 27} H${x + 172}`
                    }
                    stroke="var(--text-secondary)"
                    strokeWidth="1.5"
                  />
                )}
              </g>
            );
          })}

          {TOPICS.map((topic, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = 20 + column * 264;
            const y = 230 + row * 48;
            const highlighted = activeLens.topics.includes(topic);
            return (
              <g key={topic} opacity={highlighted ? 1 : 0.62}>
                <rect
                  x={x}
                  y={y}
                  width="240"
                  height="36"
                  rx="7"
                  fill={highlighted ? activeLens.accent : "var(--bg)"}
                  fillOpacity={highlighted ? "0.1" : "1"}
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.6" : "1"}
                />
                <circle
                  cx={x + 12}
                  cy={y + 18}
                  r="4"
                  fill={highlighted ? activeLens.accent : "var(--border)"}
                />
                <text
                  x={x + 23}
                  y={y + 23}
                  fill="var(--text-primary)"
                  fontSize="11"
                  fontWeight={highlighted ? "700" : "500"}
                >
                  {topic}
                </text>
              </g>
            );
          })}

          <path
            d="M20 390 H540"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
          <text
            x="280"
            y="416"
            textAnchor="middle"
            fill={activeLens.accent}
            fontSize="13"
            fontWeight="700"
          >
            {activeLens.label}
          </text>
          <text
            x="280"
            y="442"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="12"
          >
            {activeLens.question}
          </text>
          <text
            x="280"
            y="468"
            textAnchor="middle"
            fill="var(--text-secondary)"
            fontSize="11"
          >
            {activeLens.evidence}
          </text>

          <rect
            x="20"
            y="508"
            width="520"
            height="174"
            rx="10"
            fill="var(--bg)"
            stroke={failureMode ? "var(--warning)" : "var(--border)"}
            strokeWidth={failureMode ? "1.8" : "1"}
          />
          <text
            x="40"
            y="536"
            fill={failureMode ? "var(--warning)" : "var(--text-primary)"}
            fontSize="13"
            fontWeight="700"
          >
            {failureMode
              ? "Failure：完成出口或资源 owner 已漂移"
              : "Replay evidence gate"}
          </text>
          <text x="40" y="562" fill="var(--text-secondary)" fontSize="11">
            {failureMode
              ? "保留输入、首个错误、关联 id 与资源计数；不要用重试覆盖第一次偏离。"
              : "模块、字节、异步、进程与版本证据共同解释一次请求。"}
          </text>
          <text x="40" y="588" fill="var(--text-secondary)" fontSize="11">
            一次操作只能交付一个结果，迟到消息必须有明确的拒绝或记录路径。
          </text>
          <text x="40" y="614" fill="var(--text-secondary)" fontSize="11">
            shutdown drain
            后以同一输入、锁文件和运行时重放，比较输出与关闭状态。
          </text>
          <text x="40" y="640" fill="var(--text-secondary)" fontSize="11">
            复盘通过 = 首个偏离可定位，恢复结果可比较，资源生命周期可收敛。
          </text>
          <text
            x="280"
            y="760"
            textAnchor="middle"
            fill="var(--text-secondary)"
            fontSize="11"
          >
            通过 = 路径可解释 + 结果可重放 + 结束可验证
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 R-1：Node
        全书回放证据图；从同一输入观察首个偏离，再用排空和重放签发恢复结论。
      </figcaption>
    </figure>
  );
}
