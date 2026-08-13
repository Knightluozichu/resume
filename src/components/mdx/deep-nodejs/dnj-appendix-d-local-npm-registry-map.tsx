"use client";

import { useEffect, useState } from "react";

const CHAPTER_CONCEPTS =
  "附录D 搭建局域npm仓库; D.1 npm仓库的安装; D.1.1 安装Erlang和CouchDB; D.1.2 搭建npm仓库; D.2 高阶应用; D.2.1 镜像仓库; D.2.2 私有模块应用; D.2.3 纯私有仓库; D.3 总结; D.4 参考资源";
const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

const LENSES = [
  {
    id: "route",
    label: "包路由",
    accent: "var(--accent)",
    concepts: [CONCEPTS[0], CONCEPTS[1], CONCEPTS[4], CONCEPTS[5]],
    question: "包应该从哪一个受控来源来？",
    evidence: "作用域、上游、镜像与回退规则",
  },
  {
    id: "trust",
    label: "信任与发布",
    accent: "var(--success)",
    concepts: [CONCEPTS[2], CONCEPTS[3], CONCEPTS[6], CONCEPTS[7]],
    question: "谁能发布，客户端凭什么相信？",
    evidence: "身份、完整性、摘要与可见性",
  },
  {
    id: "recovery",
    label: "恢复证据",
    accent: "var(--warning)",
    concepts: [CONCEPTS[8], CONCEPTS[9]],
    question: "故障后怎样证明结果没有漂移？",
    evidence: "锁文件、备份、重放与关闭状态",
  },
] as const;

export function DnjAppendixDLocalNpmRegistryMap() {
  const [activeId, setActiveId] =
    useState<(typeof LENSES)[number]["id"]>("route");
  const [failureMode, setFailureMode] = useState(false);
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  const reset = () => {
    setActiveId("route");
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
              局域 npm 仓库证据图
            </p>
            <p className="mt-1 text-xs leading-relaxed text-secondary">
              沿包路由、信任发布和恢复证据观察同一条供应链。
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
              aria-label="重置局域 npm 仓库证据图"
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
          aria-label="局域 npm 仓库观察视角"
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
          aria-label={`Local npm registry evidence map. Active lens: ${activeLens.label}. Failure mode: ${failureMode ? "on" : "off"}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>局域 npm 仓库证据图</title>
          <text
            x="280"
            y="28"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="17"
            fontWeight="700"
          >
            client → scope → registry → package → backup
          </text>
          <text
            x="280"
            y="50"
            textAnchor="middle"
            fill="var(--text-secondary)"
            fontSize="12"
          >
            route、trust、integrity 与 recovery
          </text>

          {[
            ["客户端", "input"],
            ["作用域", "route"],
            ["局域源", "serve"],
            ["完整性", "verify"],
            ["备份", "replay"],
          ].map(([title, detail], index) => {
            const x = 20 + (index % 3) * 176;
            const y = 78 + Math.floor(index / 3) * 76;
            const highlighted = index === 1 || index === 3;
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
                {index < 4 && (
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

          {CONCEPTS.map((concept, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = 20 + column * 264;
            const y = 230 + row * 48;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.62}>
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
                  {concept}
                </text>
              </g>
            );
          })}

          <path
            d="M20 486 H540"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
          <text
            x="280"
            y="512"
            textAnchor="middle"
            fill={activeLens.accent}
            fontSize="13"
            fontWeight="700"
          >
            {activeLens.label}
          </text>
          <text
            x="280"
            y="538"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="12"
          >
            {activeLens.question}
          </text>
          <text
            x="280"
            y="564"
            textAnchor="middle"
            fill="var(--text-secondary)"
            fontSize="11"
          >
            {activeLens.evidence}
          </text>

          <rect
            x="20"
            y="604"
            width="520"
            height="158"
            rx="10"
            fill="var(--bg)"
            stroke={failureMode ? "var(--warning)" : "var(--border)"}
            strokeWidth={failureMode ? "1.8" : "1"}
          />
          <text
            x="40"
            y="632"
            fill={failureMode ? "var(--warning)" : "var(--text-primary)"}
            fontSize="13"
            fontWeight="700"
          >
            {failureMode
              ? "Failure：私有作用域触发公共回退"
              : "Registry evidence gate"}
          </text>
          <text x="40" y="658" fill="var(--text-secondary)" fontSize="11">
            {failureMode
              ? "保留请求地址、策略版本、身份与首个拒绝，不要用重试掩盖来源变化。"
              : "来源、作用域、完整性和权限共同决定包是否可以进入依赖树。"}
          </text>
          <text x="40" y="684" fill="var(--text-secondary)" fontSize="11">
            镜像的可用性不能替代发布证明；半成品必须保持不可见。
          </text>
          <text x="40" y="710" fill="var(--text-secondary)" fontSize="11">
            恢复使用同一锁文件和样本重放，并比较来源、摘要、退出码与关闭状态。
          </text>
          <text
            x="280"
            y="824"
            textAnchor="middle"
            fill="var(--text-secondary)"
            fontSize="11"
          >
            通过 = 路由可解释 + 包可验证 + 故障可恢复
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 D-1：局域 npm
        仓库证据图；同一个包流同时接受路由、信任和恢复三种检查。
      </figcaption>
    </figure>
  );
}
