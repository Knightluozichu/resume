"use client";

import { useState } from "react";

const OFFICIAL_CONCEPT_LABELS = [
  "compilation dependencies",
  "forward declaration",
  "handle class",
  "interface class",
  "pimpl idiom",
] as const;

const VIEW_W = 960;
const VIEW_H = 430;

type ModeId = "direct" | "pimpl" | "interface";

type Scenario = {
  id: ModeId;
  label: string;
  headerTitle: string;
  headerDetail: string;
  boundaryTitle: string;
  boundaryDetail: string;
  rebuild: string;
  tradeoff: string;
  nodes: readonly string[];
  accent: string;
};

const SCENARIOS: readonly Scenario[] = [
  {
    id: "direct",
    label: "直接 include",
    headerTitle: "person.hpp",
    headerDetail: "完整 Address / Date",
    boundaryTitle: "textual include",
    boundaryDetail: "实现细节进入 public header",
    rebuild: "Address 改一行 → 全部客户 TU",
    tradeoff: "访问直接，但 compilation dependency blast radius 最大。",
    nodes: ["ui.cpp", "service.cpp", "tests.cpp"],
    accent: "var(--warning)",
  },
  {
    id: "pimpl",
    label: "pimpl handle",
    headerTitle: "person.hpp",
    headerDetail: "forward declaration + unique owner",
    boundaryTitle: "PersonImpl",
    boundaryDetail: "完整字段只在 person.cpp",
    rebuild: "Address 改一行 → person.cpp 与其实现依赖",
    tradeoff:
      "保留 handle class 的值语法；支付 indirection 与 allocation 成本。",
    nodes: ["ui.cpp", "service.cpp", "tests.cpp"],
    accent: "var(--success)",
  },
  {
    id: "interface",
    label: "interface factory",
    headerTitle: "person.hpp",
    headerDetail: "pure virtual contract",
    boundaryTitle: "concrete PersonImpl",
    boundaryDetail: "factory 在 source 创建实现",
    rebuild: "实现替换 → factory / plugin 边界内",
    tradeoff: "支持运行期替换；支付 virtual dispatch、heap 与 ownership 成本。",
    nodes: ["plugin-a.cpp", "plugin-b.cpp", "client.cpp"],
    accent: "var(--accent)",
  },
] as const;

function Arrow({
  x1,
  y1,
  x2,
  y2,
  stroke,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
}) {
  return (
    <g aria-hidden="true">
      <path d={`M${x1} ${y1} H${x2}`} stroke={stroke} strokeWidth="2" />
      <path
        d={`M${x2 - 10} ${y2 - 6} L${x2} ${y2} L${x2 - 10} ${y2 + 6}`}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
    </g>
  );
}

function DependencySvg({ scenario }: { scenario: Scenario }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="mx-auto block h-auto w-full max-w-[960px]"
      role="img"
      aria-label={`${scenario.label}：${scenario.headerTitle} 经过 ${scenario.boundaryTitle} 影响 ${scenario.nodes.join("、")}`}
    >
      <text
        x={VIEW_W / 2}
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill="var(--text-primary)"
      >
        编译依赖边界：改动会传到哪里？
      </text>
      <text
        x={VIEW_W / 2}
        y="54"
        textAnchor="middle"
        fontSize="11"
        fill="var(--text-secondary)"
      >
        compilation dependencies 不是 include 数量，而是实现变化触发的可见范围
      </text>

      <rect
        x="36"
        y="92"
        width="226"
        height="112"
        rx="12"
        fill="var(--bg)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <text
        x="149"
        y="124"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="var(--accent)"
      >
        {scenario.headerTitle}
      </text>
      <text
        x="149"
        y="151"
        textAnchor="middle"
        fontSize="11"
        fill="var(--text-primary)"
      >
        {scenario.headerDetail}
      </text>
      <text
        x="149"
        y="178"
        textAnchor="middle"
        fontSize="11"
        fill="var(--text-secondary)"
      >
        public compilation interface
      </text>

      <Arrow x1={262} y1={148} x2={344} y2={148} stroke={scenario.accent} />

      <rect
        x="344"
        y="92"
        width="272"
        height="112"
        rx="12"
        fill={scenario.accent}
        fillOpacity="0.1"
        stroke={scenario.accent}
        strokeWidth="1.8"
      />
      <text
        x="480"
        y="124"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={scenario.accent}
      >
        {scenario.boundaryTitle}
      </text>
      <text
        x="480"
        y="151"
        textAnchor="middle"
        fontSize="11"
        fill="var(--text-primary)"
      >
        {scenario.boundaryDetail}
      </text>
      <text
        x="480"
        y="178"
        textAnchor="middle"
        fontSize="11"
        fill="var(--text-secondary)"
      >
        {scenario.id === "direct" ? "没有隐藏层" : "变化在边界内收敛"}
      </text>

      <Arrow x1={616} y1={148} x2={698} y2={148} stroke={scenario.accent} />

      {scenario.nodes.map((node, index) => {
        const x = 698 + (index % 2) * 126;
        const y = 84 + Math.floor(index / 2) * 86;
        return (
          <g key={`${scenario.id}-${node}`}>
            <rect
              x={x}
              y={y}
              width="112"
              height="58"
              rx="9"
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={x + 56}
              y={y + 26}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              {node}
            </text>
            <text
              x={x + 56}
              y={y + 45}
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              importer
            </text>
          </g>
        );
      })}

      <line
        x1="36"
        y1="252"
        x2="924"
        y2="252"
        stroke="var(--border)"
        strokeDasharray="6 4"
      />
      <text
        x="36"
        y="282"
        fontSize="12"
        fontWeight="700"
        fill={scenario.accent}
      >
        改动实验
      </text>
      <text x="36" y="310" fontSize="12" fill="var(--text-primary)">
        {scenario.rebuild}
      </text>
      <text x="36" y="338" fontSize="11" fill="var(--text-secondary)">
        {scenario.tradeoff}
      </text>
      <text
        x={VIEW_W / 2}
        y="394"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="var(--text-primary)"
      >
        先找 completeness requirement，再选择隔离边界
      </text>
      <text
        x={VIEW_W / 2}
        y="416"
        textAnchor="middle"
        fontSize="11"
        fill="var(--text-secondary)"
      >
        forward declaration · handle class · interface class · pimpl idiom
      </text>
    </svg>
  );
}

export function EcppCompilationDependencyMap() {
  return (
    <figure
      className="mdx-figure not-prose mx-auto my-6"
      data-visual-kind="ecpp-item31-dependency-map"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="mx-auto block h-auto w-full max-w-[960px]"
          role="img"
          aria-label={`Effective C++ Item 31 ${OFFICIAL_CONCEPT_LABELS.join("、")} 依赖边界总览`}
        >
          <text
            x={VIEW_W / 2}
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            从 public header 到客户 TU 的依赖路径
          </text>
          <text
            x={VIEW_W / 2}
            y="54"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            private layout 可见时，implementation change 会沿 textual include
            扩散
          </text>

          <rect
            x="38"
            y="90"
            width="190"
            height="88"
            rx="11"
            fill="var(--warning)"
            fillOpacity="0.1"
            stroke="var(--warning)"
            strokeWidth="1.6"
          />
          <text
            x="133"
            y="123"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--warning)"
          >
            Address.hpp
          </text>
          <text
            x="133"
            y="151"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            private cache 改动
          </text>

          <Arrow x1={228} y1={134} x2={302} y2={134} stroke="var(--warning)" />

          <rect
            x="302"
            y="90"
            width="220"
            height="88"
            rx="11"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.6"
          />
          <text
            x="412"
            y="123"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--accent)"
          >
            person.hpp
          </text>
          <text
            x="412"
            y="151"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            by-value private layout
          </text>

          <Arrow x1={522} y1={134} x2={594} y2={134} stroke="var(--warning)" />

          {[
            [594, 76, "ui.cpp"],
            [594, 130, "service.cpp"],
            [594, 184, "tests.cpp"],
          ].map(([x, y, label]) => (
            <g key={label as string}>
              <rect
                x={x as number}
                y={y as number}
                width="176"
                height="42"
                rx="8"
                fill="var(--warning)"
                fillOpacity="0.08"
                stroke="var(--warning)"
              />
              <text
                x={(x as number) + 88}
                y={(y as number) + 26}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {label}
              </text>
            </g>
          ))}

          <line
            x1="38"
            y1="246"
            x2="922"
            y2="246"
            stroke="var(--border)"
            strokeDasharray="6 4"
          />
          <rect
            x="38"
            y="274"
            width="884"
            height="82"
            rx="11"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="1.6"
          />
          <text
            x="480"
            y="306"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--success)"
          >
            pimpl boundary
          </text>
          <text
            x="480"
            y="333"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            person.hpp 只保留 forward declaration + unique owner；完整
            PersonImpl 留在 source
          </text>
          <text
            x="480"
            y="382"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            目标：实现字段变化不穿透 compilation interface
          </text>
          <text
            x="480"
            y="407"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            隔离 rebuild blast radius，同时保留 self-contained header
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        上图先展示“直接 include”的扩散，再把同一变化收进 pimpl
        的实现边界；真正的成本仍需通过重编译和 ABI 实验验收。
      </figcaption>
    </figure>
  );
}

export function EcppItem31DependencyLab() {
  const [activeId, setActiveId] = useState<ModeId>("direct");
  const active =
    SCENARIOS.find((scenario) => scenario.id === activeId) ?? SCENARIOS[0];

  const reset = () => setActiveId("direct");

  return (
    <section
      aria-label="Item 31 编译依赖边界实验"
      data-visual-kind="ecpp-item31-dependency-lab"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">边界选择实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            先预测：Address.hpp 改一行，谁必须重编译？
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            选择一个 public boundary，观察完整类型、pimpl handle class 和
            interface class 如何改变传播范围。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 31 编译依赖边界实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div
        className="border-b border-border p-4"
        role="tablist"
        aria-label="Item 31 编译依赖方案"
      >
        <div className="grid gap-2 md:grid-cols-3">
          {SCENARIOS.map((scenario) => {
            const selected = scenario.id === activeId;
            return (
              <button
                key={scenario.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-pressed={selected}
                onClick={() => setActiveId(scenario.id)}
                className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {scenario.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="border-b border-border p-3 sm:p-5"
        data-visual-kind="ecpp-item31-active-flow"
      >
        <DependencySvg scenario={active} />
      </div>

      <div className="grid gap-4 p-4 md:grid-cols-2">
        <div className="rounded-card border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            当前证据
          </p>
          <p className="mt-2 font-semibold text-primary">{active.rebuild}</p>
          <p className="mt-3 text-sm leading-relaxed text-secondary">
            {active.tradeoff}
          </p>
        </div>
        <div
          className="rounded-card border border-border p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            验收问题
          </p>
          <p className="mt-2 text-sm leading-relaxed text-primary">
            你的选择是否仍满足 self-contained header？下一步应做 header
            isolation test、touch experiment 和 ABI diff。
          </p>
        </div>
      </div>
    </section>
  );
}
