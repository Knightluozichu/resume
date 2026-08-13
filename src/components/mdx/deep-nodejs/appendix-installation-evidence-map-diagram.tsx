"use client";

import { useEffect, useState } from "react";

const CHAPTER_CONCEPTS =
  "附录A 安装Node; A.1 Windows系统下的Node安装; A.2 macOS系统下Node的安装; A.3 Linux系统下Node的安装; A.4 总结; A.5 参考资源";
const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

const LENSES = [
  {
    id: "evidence",
    label: "安装证据",
    accent: "var(--accent)",
    concepts: [CONCEPTS[0], CONCEPTS[1], CONCEPTS[2]],
    question: "谁能复核这次安装？",
    evidence: "路径、版本、架构、来源与校验记录",
  },
  {
    id: "platform",
    label: "平台边界",
    accent: "var(--success)",
    concepts: [CONCEPTS[1], CONCEPTS[2], CONCEPTS[3]],
    question: "哪一个系统条件改变了行为？",
    evidence: "Shell、权限、ABI、系统库与镜像摘要",
  },
  {
    id: "replay",
    label: "回滚重放",
    accent: "var(--warning)",
    concepts: [CONCEPTS[3], CONCEPTS[4], CONCEPTS[5]],
    question: "失败后怎样证明恢复？",
    evidence: "清理范围、同一锁文件、退出码与重放输出",
  },
] as const;

export function DnjAppendixInstallationEvidenceMapDiagram() {
  const [activeId, setActiveId] = useState<(typeof LENSES)[number]["id"]>("evidence");
  const [failureMode, setFailureMode] = useState(false);
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  const reset = () => {
    setActiveId("evidence");
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
            <p className="text-sm font-semibold text-primary">Node 安装证据地图</p>
            <p className="mt-1 text-xs leading-relaxed text-secondary">
              同一份报告穿过平台、来源、项目与回滚四个边界。
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
              aria-label="重置 Node 安装证据地图"
              onClick={reset}
              className="min-h-11 rounded-control border border-border px-3 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              重置
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Node 安装观察视角" className="grid gap-2 md:grid-cols-3">
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
          viewBox="0 0 560 820"
          role="img"
          aria-label={`Node installation evidence map. Active lens: ${activeLens.label}. Failure mode: ${failureMode ? "on" : "off"}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Node 安装证据地图</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            inspect → source → project → verify → replay
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            path、version、architecture、lock 与 toolchain
          </text>

          {[
            ["平台", "platform / arch"],
            ["来源", "version / path"],
            ["项目", "lock / script"],
            ["验证", "install / exit"],
            ["回滚", "clean / replay"],
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
                  stroke={index === 0 || index === 4 ? activeLens.accent : "var(--border)"}
                  strokeWidth={index === 0 || index === 4 ? "1.8" : "1"}
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
            {failureMode ? "Failure：ABI 或来源不匹配" : "Installation boundary gate"}
          </text>
          <text x="40" y="594" fill="var(--text-secondary)" fontSize="11">
            {failureMode ? "保存首个错误、实际路径、架构与工具链；停止继续编译。" : "版本号必须与路径、架构、来源和项目锁文件一起解释。"}
          </text>
          <text x="40" y="620" fill="var(--text-secondary)" fontSize="11">
            项目依赖来自声明与锁文件，不来自机器上碰巧存在的全局包。
          </text>
          <text x="40" y="646" fill="var(--text-secondary)" fontSize="11">
            回滚先清理错误状态，再以同一输入重放并检查退出码与残留进程。
          </text>
          <text x="280" y="750" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            安装完成 = 可定位、可复现、可失败、可恢复
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 A-1：Node 安装证据地图；同一份记录连接平台差异、项目依赖、工具链失败与回滚重放。
      </figcaption>
    </figure>
  );
}
