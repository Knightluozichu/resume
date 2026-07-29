"use client";

import { useState } from "react";

export interface AndroidArchitectureStage {
  label: string;
  owner: string;
  flow: string;
  failure: string;
}

interface AndroidArchitectureLabProps {
  title: string;
  question: string;
  stages: readonly AndroidArchitectureStage[];
}

export function AndroidArchitectureLab({
  title,
  question,
  stages,
}: AndroidArchitectureLabProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stages[activeIndex];

  return (
    <figure
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="android-architecture-decision"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-accent">
            Android 架构决策实验
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">{title}</h3>
          <p className="mt-1 text-sm text-secondary">{question}</p>
        </div>
        <button
          type="button"
          className="rounded-control border border-border bg-surface px-3 py-2 text-xs text-secondary transition-colors hover:text-primary"
          onClick={() => setActiveIndex(0)}
        >
          重置实验
        </button>
      </div>

      <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
        <ol
          className="space-y-2 border-b border-border p-4 md:border-r md:border-b-0"
          aria-label="架构检查阶段"
        >
          {stages.map((stage, index) => {
            const selected = index === activeIndex;
            return (
              <li key={stage.label}>
                <button
                  type="button"
                  className={`w-full rounded-control border px-3 py-2 text-left text-sm transition-colors ${
                    selected
                      ? "border-accent bg-accent/10 text-primary"
                      : "border-border bg-surface text-secondary hover:text-primary"
                  }`}
                  aria-pressed={selected}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="mr-2 font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {stage.label}
                </button>
              </li>
            );
          })}
        </ol>

        <div className="p-5" aria-live="polite">
          <div className="grid gap-3 sm:grid-cols-3">
            <section className="rounded-control border border-border bg-surface p-3">
              <p className="text-xs font-semibold text-accent">状态所有者</p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {active.owner}
              </p>
            </section>
            <section className="rounded-control border border-border bg-surface p-3">
              <p className="text-xs font-semibold text-success">可观察数据流</p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {active.flow}
              </p>
            </section>
            <section className="rounded-control border border-border bg-surface p-3">
              <p className="text-xs font-semibold text-warning">失败注入</p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {active.failure}
              </p>
            </section>
          </div>
          <div className="mt-4 flex gap-2" aria-hidden="true">
            {stages.map((stage, index) => (
              <span
                key={stage.label}
                className={`h-1.5 flex-1 rounded-full ${
                  index <= activeIndex ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <figcaption className="border-t border-border px-5 py-3 text-sm text-secondary">
        模式名称只提供检索入口；状态写权限、数据流和失败后的恢复轨迹才是可以复核的架构证据。
      </figcaption>
    </figure>
  );
}

interface AndroidDecisionMapProps {
  title: string;
  input: string;
  owner: string;
  output: string;
}

export function AndroidDecisionMap({
  title,
  input,
  owner,
  output,
}: AndroidDecisionMapProps) {
  const nodes = [
    { label: "输入与约束", value: input, tone: "text-accent" },
    { label: "状态与责任", value: owner, tone: "text-success" },
    { label: "输出与判定", value: output, tone: "text-warning" },
  ] as const;

  return (
    <figure
      className="not-prose my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="android-decision-map"
    >
      <h3 className="text-base font-semibold text-primary">{title}</h3>
      <div
        className="mt-4 grid gap-3 md:grid-cols-3"
        role="img"
        aria-label={`${title}：从输入与约束，经状态与责任，到输出与判定`}
      >
        {nodes.map((node, index) => (
          <section
            key={node.label}
            className="relative rounded-control border border-border bg-surface p-4"
          >
            <p className={`text-xs font-semibold ${node.tone}`}>
              {String(index + 1).padStart(2, "0")} · {node.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-primary">{node.value}</p>
            {index < nodes.length - 1 ? (
              <span
                className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-secondary md:block"
                aria-hidden="true"
              >
                →
              </span>
            ) : null}
          </section>
        ))}
      </div>
      <figcaption className="mt-3 text-sm text-secondary">
        三个框必须能由代码、状态轨迹或团队交付记录分别验证；任一框只写模式名称都不构成证据。
      </figcaption>
    </figure>
  );
}

interface AndroidFailureTimelineProps {
  scenario: string;
  baseline: string;
  fault: string;
  guard: string;
  verdict: string;
}

export function AndroidFailureTimeline({
  scenario,
  baseline,
  fault,
  guard,
  verdict,
}: AndroidFailureTimelineProps) {
  const events = [
    ["基线", baseline, "border-accent text-accent"],
    ["故障", fault, "border-warning text-warning"],
    ["护栏", guard, "border-success text-success"],
    ["判定", verdict, "border-border text-primary"],
  ] as const;

  return (
    <figure
      className="not-prose my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="android-failure-timeline"
    >
      <h3 className="text-base font-semibold text-primary">{scenario}</h3>
      <ol
        className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        aria-label={`${scenario}的基线、故障、护栏与判定时间线`}
      >
        {events.map(([label, detail, tone], index) => (
          <li
            key={label}
            className={`rounded-control border-l-4 bg-surface p-4 ${tone}`}
          >
            <p className="text-xs font-semibold">
              T{index} · {label}
            </p>
            <p className="mt-2 text-sm leading-6 text-primary">{detail}</p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-sm text-secondary">
        时间线把“正常时能用”改写为可证伪命题：故障发生后，护栏必须把系统带到预先声明的判定状态。
      </figcaption>
    </figure>
  );
}
