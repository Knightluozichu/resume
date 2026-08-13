"use client";

import { useState } from "react";

type LensId = "delivery" | "runtime" | "recovery";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "第11章 产品化; 11.1 项目工程化; 11.1.1 目录结构; 11.1.2 构建工具; 11.1.3 编码规范; 11.1.4 代码审查; 11.2 部署流程; 11.2.1 部署环境; 11.2.2 部署操作; 11.3 性能; 11.3.1 动静分离; 11.3.2 启用缓存; 11.3.3 多进程架构; 11.3.4 读写分离; 11.4 日志; 11.4.1 访问日志; 11.4.2 异常日志; 11.4.3 日志与数据库; 11.4.4 分割日志; 11.4.5 小结; 11.5 监控报警; 11.5.1 监控; 11.5.2 报警的实现; 11.5.3 监控系统的稳定性; 11.6 稳定性; 11.7 异构共存; 11.8 总结; 11.9 参考资源";

const LENSES: readonly Lens[] = [
  {
    id: "delivery",
    label: "Engineering / delivery",
    question: "源代码怎样成为可审查、可部署、可回滚的 immutable artifact？",
    evidence: "layout → build → review → manifest → environment → canary → rollback target",
    accent: "var(--accent)",
    concepts: [
      "第11章 产品化",
      "11.1 项目工程化",
      "11.1.1 目录结构",
      "11.1.2 构建工具",
      "11.1.3 编码规范",
      "11.1.4 代码审查",
      "11.2 部署流程",
      "11.2.1 部署环境",
      "11.2.2 部署操作",
    ],
  },
  {
    id: "runtime",
    label: "Performance / runtime",
    question: "流量、缓存、进程和读写路径怎样在预算内运行？",
    evidence: "static/dynamic split + cache scope + worker budget + replica lag + request trace",
    accent: "var(--warning)",
    concepts: [
      "11.3 性能",
      "11.3.1 动静分离",
      "11.3.2 启用缓存",
      "11.3.3 多进程架构",
      "11.3.4 读写分离",
      "11.4 日志",
      "11.4.1 访问日志",
      "11.4.2 异常日志",
      "11.4.3 日志与数据库",
    ],
  },
  {
    id: "recovery",
    label: "Observability / recovery",
    question: "事件、指标和报警怎样帮助责任人隔离故障并完成恢复？",
    evidence: "split/retain logs → metrics → alert/runbook → stability budget → adapter contract → replay",
    accent: "var(--success)",
    concepts: [
      "11.4.4 分割日志",
      "11.4.5 小结",
      "11.5 监控报警",
      "11.5.1 监控",
      "11.5.2 报警的实现",
      "11.5.3 监控系统的稳定性",
      "11.6 稳定性",
      "11.7 异构共存",
      "11.8 总结",
      "11.9 参考资源",
    ],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function DnjProductizationEvidenceMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("delivery");
  const [failureMode, setFailureMode] = useState(false);
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  const reset = () => {
    setActiveId("delivery");
    setFailureMode(false);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Productization 发布图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从提交走到可回滚恢复</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换 engineering/delivery、performance/runtime 或 observability/recovery 视角，观察目录节点如何落到发布证据。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-label="注入产品化失败模式"
            aria-pressed={failureMode}
            onClick={() => setFailureMode((current) => !current)}
            className={`min-h-11 rounded-control border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              failureMode
                ? "border-warning bg-warning/10 text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {failureMode ? "恢复正常" : "注入失败"}
          </button>
          <button
            type="button"
            aria-label="重置 Productization 发布图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            重置
          </button>
        </div>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Productization 验收视角" className="grid gap-2 md:grid-cols-3">
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
          aria-label={`Productization release map. Active lens: ${activeLens.label}. Failure mode: ${failureMode ? "on" : "off"}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Productization release map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            source → artifact → release → observe → recover
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            provenance、budget、trace、owner 与 rollback
          </text>

          {["commit", "artifact", "canary", "healthy"].map((stage, index) => {
            const x = 20 + index * 136;
            return (
              <g key={stage}>
                <rect
                  x={x}
                  y="68"
                  width="112"
                  height="34"
                  rx="9"
                  fill="var(--bg)"
                  stroke={index === 1 ? activeLens.accent : "var(--border)"}
                  strokeWidth={index === 1 ? "1.8" : "1"}
                />
                <text x={x + 56} y="90" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="600">
                  {stage}
                </text>
                {index < 3 && <path d={`M${x + 116} 85 H${x + 130}`} stroke="var(--text-secondary)" strokeWidth="1.5" />}
              </g>
            );
          })}

          {CONCEPTS.map((concept, index) => {
            const column = index % 3;
            const row = Math.floor(index / 3);
            const x = 20 + column * 176;
            const y = 126 + row * 44;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.66}>
                <rect
                  x={x}
                  y={y}
                  width="168"
                  height="34"
                  rx="8"
                  fill={highlighted ? activeLens.accent : "var(--bg)"}
                  fillOpacity={highlighted ? "0.1" : "1"}
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.8" : "1"}
                />
                <circle cx={x + 13} cy={y + 17} r="4.5" fill={highlighted ? activeLens.accent : "var(--border)"} />
                <text x={x + 24} y={y + 22} fill="var(--text-primary)" fontSize="11" fontWeight={highlighted ? "700" : "500"}>
                  {concept}
                </text>
              </g>
            );
          })}

          <path d="M20 566 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="591" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="614" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="638" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect
            x="20"
            y="670"
            width="520"
            height="148"
            rx="10"
            fill="var(--bg)"
            stroke={failureMode ? "var(--warning)" : "var(--border)"}
            strokeWidth={failureMode ? "1.8" : "1"}
          />
          <text x="40" y="696" fill={failureMode ? "var(--warning)" : "var(--text-primary)"} fontSize="12" fontWeight="700">
            {failureMode ? "Failure mode：canary error rises, alert floods" : "Product boundary gate"}
          </text>
          <text x="40" y="720" fill="var(--text-secondary)" fontSize="11">
            delivery：digest、配置、ready、流量窗口和 rollback target 必须同一条 trace。
          </text>
          <text x="40" y="744" fill="var(--text-secondary)" fontSize="11">
            runtime：缓存、worker、读写副本各有预算，优化不能越过权限与一致性边界。
          </text>
          <text x="40" y="768" fill="var(--text-secondary)" fontSize="11">
            recovery：日志、指标、报警和 runbook 绑定 owner，异构 adapter 保留版本与超时。
          </text>
          <text x="40" y="792" fill="var(--text-secondary)" fontSize="11">
            {failureMode ? "先暂停扩大，再保留证据并回滚；不要用重试掩盖确定性发布回归。" : "发布可以暂停，但不能不可追溯、不可观测或不可恢复。"}
          </text>
          <text x="280" y="860" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            产品化不是上线按钮，而是一条能收敛的证据链
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 11-1：产品化发布图；把工程、部署、性能、日志、监控和恢复放进同一张可回放状态图。
      </figcaption>
    </figure>
  );
}
