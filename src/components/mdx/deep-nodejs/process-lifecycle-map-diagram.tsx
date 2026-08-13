"use client";

import { useState } from "react";

type LensId = "lifecycle" | "protocol" | "recovery";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "第9章 玩转进程; 9.1 服务模型的变迁; 9.1.1 石器时代：同步; 9.1.2 青铜时代：复制进程; 9.1.3 白银时代：多线程; 9.1.4 黄金时代：事件驱动; 9.2 多进程架构; 9.2.1 创建子进程; 9.2.2 进程间通信; 9.2.3 句柄传递; 9.2.4 小结; 9.3 集群稳定之路; 9.3.1 进程事件; 9.3.2 自动重启; 9.3.3 负载均衡; 9.3.4 状态共享; 9.4 cluster模块; 9.4.1 cluster工作原理; 9.4.2 cluster事件; 9.5 总结; 9.6 参考资源";

const LENSES: readonly Lens[] = [
  {
    id: "lifecycle",
    label: "Lifecycle / owner",
    question: "谁创建 worker、接收流量、排空连接并确认关闭？",
    evidence: "spawn → ready → accept → drain → close；记录 pid、版本、资源 owner",
    accent: "var(--accent)",
    concepts: [
      "第9章 玩转进程",
      "9.1 服务模型的变迁",
      "9.1.1 石器时代：同步",
      "9.1.2 青铜时代：复制进程",
      "9.1.3 白银时代：多线程",
      "9.1.4 黄金时代：事件驱动",
      "9.2 多进程架构",
    ],
  },
  {
    id: "protocol",
    label: "IPC / scheduling",
    question: "消息、句柄和连接如何被分发，并且不会重复完成？",
    evidence: "typed message + correlation id + handle owner + queue/backpressure + ready gate",
    accent: "var(--warning)",
    concepts: [
      "9.2.1 创建子进程",
      "9.2.2 进程间通信",
      "9.2.3 句柄传递",
      "9.2.4 小结",
      "9.3 集群稳定之路",
      "9.3.1 进程事件",
      "9.3.3 负载均衡",
    ],
  },
  {
    id: "recovery",
    label: "Cluster / recovery",
    question: "worker 退出后怎样限速重启，并恢复跨进程状态？",
    evidence: "exit reason + backoff window + state version + replay + drain timeout",
    accent: "var(--success)",
    concepts: [
      "9.3.2 自动重启",
      "9.3.4 状态共享",
      "9.4 cluster模块",
      "9.4.1 cluster工作原理",
      "9.4.2 cluster事件",
      "9.5 总结",
      "9.6 参考资源",
    ],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function DnjProcessLifecycleMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("lifecycle");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Processes 进程图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从 worker 启动走到可恢复关闭</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换 lifecycle/owner、IPC/scheduling 或 cluster/recovery 视角，观察官方目录如何落到资源、协议与恢复证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Processes 进程图"
          onClick={() => setActiveId("lifecycle")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Processes 验收视角" className="grid gap-2 md:grid-cols-3">
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
          viewBox="0 0 560 860"
          role="img"
          aria-label={`Processes process lifecycle map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Processes process lifecycle map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            spawn → communicate → schedule → recover
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            owner、message、handle、exit、state 与 drain
          </text>

          {["primary", "ready worker", "owned handle", "draining"].map((stage, index) => {
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
                  stroke={index === 2 ? activeLens.accent : "var(--border)"}
                  strokeWidth={index === 2 ? "1.8" : "1"}
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

          <path d="M20 478 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="503" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="526" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="550" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect x="20" y="582" width="520" height="148" rx="10" fill="var(--bg)" stroke="var(--border)" />
          <text x="40" y="608" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Process boundary gate
          </text>
          <text x="40" y="632" fill="var(--text-secondary)" fontSize="11">
            owner：创建、接管和关闭必须各有一个可观察责任者。
          </text>
          <text x="40" y="656" fill="var(--text-secondary)" fontSize="11">
            protocol：消息有类型、id、超时；队列有上限，句柄不等于共享堆。
          </text>
          <text x="40" y="680" fill="var(--text-secondary)" fontSize="11">
            recovery：exit 先分类，再退避或熔断；drain 后重放并检查 state version。
          </text>
          <text x="40" y="704" fill="var(--text-secondary)" fontSize="11">
            cluster：ready 才接流量，关闭中的 worker 不接新任务。
          </text>
          <text x="280" y="770" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            可以并行，但不能无主、无协议或无界重启
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 9-1：进程生命周期图；把服务模型、多进程通信、cluster 调度和恢复状态放入同一张可重放证据图。
      </figcaption>
    </figure>
  );
}
