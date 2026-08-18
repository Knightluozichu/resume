"use client";

import { useState } from "react";

type LedgerId = "aggregate" | "accounting" | "potential";
type HeapId = "roots" | "links" | "debt";
type SplayId = "zig" | "double" | "access";

const CONCEPTS =
  "amortized analysis · unrelated puzzle · binomial queues · skew heaps · Fibonacci heaps · splay trees";
const buttonClass =
  "min-h-11 rounded-control border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const frameClass =
  "not-prose overflow-hidden rounded-card border border-border bg-elevated";

function VisualHeader({
  title,
  prompt,
  onReset,
}: {
  title: string;
  prompt: string;
  onReset: () => void;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
      <div>
        <p className="text-xs font-medium text-accent">
          Amortized Analysis 证据图
        </p>
        <h3 className="mt-1 text-lg font-semibold text-primary">{title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
          {prompt}
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className={`${buttonClass} border-border font-medium text-secondary hover:border-accent hover:text-accent`}
      >
        重置
      </button>
    </header>
  );
}

function LedgerSvg({ active }: { active: LedgerId }) {
  const rows = [
    { label: "push", actual: 1, delta: 1 },
    { label: "push", actual: 1, delta: 1 },
    { label: "resize", actual: 4, delta: -2 },
    { label: "push", actual: 1, delta: 1 },
  ];
  const method =
    active === "aggregate"
      ? "aggregate method"
      : active === "accounting"
        ? "accounting method"
        : "potential method";
  return (
    <svg
      viewBox="0 0 760 370"
      role="img"
      aria-label={`均摊记账图，当前方法 ${method}`}
      className="mx-auto block h-auto w-full"
    >
      <title>Amortized cost ledger</title>
      <text
        x="380"
        y="28"
        textAnchor="middle"
        fill="var(--text-primary)"
        fontSize="16"
        fontWeight="700"
      >
        一次尖峰成本不等于整串成本失控
      </text>
      <text
        x="380"
        y="52"
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="12"
      >
        actual cost + change of stored work = amortized evidence
      </text>
      {rows.map((row, index) => {
        const x = 54 + index * 166;
        const highlighted =
          active === "potential"
            ? row.delta < 0
            : active === "accounting"
              ? index < 2
              : true;
        return (
          <g key={`${row.label}-${index}`} opacity={highlighted ? 1 : 0.55}>
            <rect
              x={x}
              y="86"
              width="132"
              height="92"
              rx="12"
              fill={highlighted ? "var(--accent)" : "var(--bg)"}
              fillOpacity={highlighted ? "0.14" : "1"}
              stroke={highlighted ? "var(--accent)" : "var(--border)"}
              strokeWidth={highlighted ? "2" : "1"}
            />
            <text
              x={x + 66}
              y="114"
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="13"
              fontWeight="700"
            >
              {row.label}
            </text>
            <text
              x={x + 66}
              y="138"
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize="11"
            >
              actual {row.actual}
            </text>
            <text
              x={x + 66}
              y="160"
              textAnchor="middle"
              fill={row.delta < 0 ? "var(--success)" : "var(--text-secondary)"}
              fontSize="11"
            >
              ΔΦ {row.delta > 0 ? `+${row.delta}` : row.delta}
            </text>
          </g>
        );
      })}
      <path
        d="M54 208 H706"
        stroke="var(--border)"
        strokeWidth="1"
        strokeDasharray="5 5"
      />
      <text x="54" y="238" fill="var(--accent)" fontSize="13" fontWeight="700">
        {method}
      </text>
      <text x="54" y="266" fill="var(--text-primary)" fontSize="12">
        {active === "aggregate"
          ? "直接界定整串 total cost，再除以操作数量。"
          : active === "accounting"
            ? "便宜操作预收 credit，昂贵操作消费之前积累的 credit。"
            : "用势能 Φ 记录尚未支付的工作，尖峰操作让 Φ 下降来支付。"}
      </text>
      <text x="54" y="292" fill="var(--text-secondary)" fontSize="12">
        验证条件：Φ(D0)=0、Φ 始终非负、总 amortized cost 足以覆盖总 actual
        cost。
      </text>
      <text x="54" y="326" fill="var(--text-secondary)" fontSize="12">
        尖峰被解释，不被删除；证明对象是 sequence，而不是一次平均值。
      </text>
    </svg>
  );
}

export function DsaAmortizedPotentialLedgerLab() {
  const [active, setActive] = useState<LedgerId>("potential");
  const options: readonly [LedgerId, string][] = [
    ["aggregate", "聚合总成本"],
    ["accounting", "记账 credit"],
    ["potential", "势能变化"],
  ];
  return (
    <figure
      className={frameClass}
      data-visual-kind="dsa-amortized-potential-ledger"
      data-visual-concepts={CONCEPTS}
    >
      <VisualHeader
        title="三种均摊证明如何记账"
        prompt="切换 aggregate、accounting 或 potential 视角，观察同一串扩容操作的支付责任。"
        onReset={() => setActive("potential")}
      />
      <div
        className="grid gap-2 border-b border-border p-4 sm:grid-cols-3"
        role="tablist"
        aria-label="均摊证明方法"
      >
        {options.map(([id, label]) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(id)}
              className={`${buttonClass} ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="p-4">
        <LedgerSvg active={active} />
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 11-1：aggregate、accounting 和 potential
        都是在解释同一串操作的总责任。
      </figcaption>
    </figure>
  );
}

function HeapSvg({ active }: { active: HeapId }) {
  const roots = active === "roots" ? 5 : active === "links" ? 3 : 2;
  const labels =
    active === "roots"
      ? "binomial queues"
      : active === "links"
        ? "skew heaps"
        : "Fibonacci heaps";
  const detail =
    active === "roots"
      ? "root 数随 binary carry 下降；link 把 credit 变成一次实际工作。"
      : active === "links"
        ? "heavy/right-path 访问可能尖峰，轻边数量提供 logarithmic 证据。"
        : "lazy root list、marked node 和 cascading cut 把整理工作推迟到需要时。";
  return (
    <svg
      viewBox="0 0 760 370"
      role="img"
      aria-label={`堆结构均摊图，当前主题 ${labels}`}
      className="mx-auto block h-auto w-full"
    >
      <title>Heap amortized structures</title>
      <text
        x="380"
        y="28"
        textAnchor="middle"
        fill="var(--text-primary)"
        fontSize="16"
        fontWeight="700"
      >
        把结构债务放在哪里？
      </text>
      <text
        x="380"
        y="52"
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="12"
      >
        roots · links · marked nodes → future operation budget
      </text>
      {Array.from({ length: 6 }, (_, index) => {
        const x = 68 + index * 124;
        const filled = index < roots;
        return (
          <g key={`root-${index}`}>
            <circle
              cx={x}
              cy="112"
              r="22"
              fill={filled ? "var(--accent)" : "var(--bg)"}
              fillOpacity={filled ? "0.18" : "1"}
              stroke={filled ? "var(--accent)" : "var(--border)"}
              strokeWidth={filled ? "2" : "1"}
            />
            <text
              x={x}
              y="116"
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="12"
              fontWeight="700"
            >
              {filled ? "root" : "·"}
            </text>
            {index < 5 && (
              <path
                d={`M${x + 26} 112 H${x + 96}`}
                stroke="var(--border)"
                strokeWidth="1.5"
              />
            )}
          </g>
        );
      })}
      <rect
        x="54"
        y="184"
        width="652"
        height="110"
        rx="12"
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <text x="78" y="216" fill="var(--accent)" fontSize="13" fontWeight="700">
        {labels}
      </text>
      <text x="78" y="244" fill="var(--text-primary)" fontSize="12">
        {detail}
      </text>
      <text x="78" y="270" fill="var(--text-secondary)" fontSize="12">
        不要把一次 merge、consolidate 或 cut 的成本抹平；要写出势能如何变化。
      </text>
      <text
        x="380"
        y="340"
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="12"
      >
        structure invariant + potential change = amortized bound
      </text>
    </svg>
  );
}

export function DsaAmortizedHeapConsolidationLab() {
  const [active, setActive] = useState<HeapId>("roots");
  const options: readonly [HeapId, string][] = [
    ["roots", "二项队列"],
    ["links", "斜堆路径"],
    ["debt", "斐波那契债务"],
  ];
  return (
    <figure
      className={frameClass}
      data-visual-kind="dsa-amortized-heap-consolidation"
      data-visual-concepts={CONCEPTS}
    >
      <VisualHeader
        title="堆的结构债务如何偿还"
        prompt="切换 root、path 或 marked-node 视角，比较不同堆把整理成本延迟到哪里。"
        onReset={() => setActive("roots")}
      />
      <div
        className="grid gap-2 border-b border-border p-4 sm:grid-cols-3"
        role="tablist"
        aria-label="堆均摊视角"
      >
        {options.map(([id, label]) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(id)}
              className={`${buttonClass} ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="p-4">
        <HeapSvg active={active} />
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 11-2：二项队列、斜堆和斐波那契堆用不同状态记录未来工作。
      </figcaption>
    </figure>
  );
}

function SplaySvg({ active }: { active: SplayId }) {
  const title =
    active === "zig"
      ? "zig"
      : active === "double"
        ? "zig-zig / zig-zag"
        : "splay trees";
  const detail =
    active === "zig"
      ? "只有一个 parent 时旋转一次，把访问节点移到 root。"
      : active === "double"
        ? "根据方向连续旋转；势能下降支付长路径上的实际旋转。"
        : "一次 access 可能很贵，但 sequence 的 rank potential 给出均摊边界。";
  const nodes =
    active === "zig"
      ? [
          { x: 380, y: 100, label: "x" },
          { x: 260, y: 190, label: "p" },
          { x: 500, y: 190, label: "r" },
        ]
      : active === "double"
        ? [
            { x: 380, y: 80, label: "g" },
            { x: 260, y: 150, label: "p" },
            { x: 500, y: 150, label: "r" },
            { x: 380, y: 230, label: "x" },
          ]
        : [
            { x: 380, y: 90, label: "root" },
            { x: 250, y: 180, label: "hot" },
            { x: 510, y: 180, label: "cold" },
            { x: 380, y: 270, label: "access" },
          ];
  return (
    <svg
      viewBox="0 0 760 370"
      role="img"
      aria-label={`伸展树访问图，当前阶段 ${title}`}
      className="mx-auto block h-auto w-full"
    >
      <title>Splay tree access map</title>
      <text
        x="380"
        y="28"
        textAnchor="middle"
        fill="var(--text-primary)"
        fontSize="16"
        fontWeight="700"
      >
        伸展树把访问历史写进形状
      </text>
      <text
        x="380"
        y="52"
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="12"
      >
        rank(x)=log₂ subtree-size → rotations → future access cost
      </text>
      {nodes.slice(1).map((node) => (
        <path
          key={`edge-${node.label}`}
          d={`M${nodes[0].x} ${nodes[0].y + 18} L${node.x} ${node.y - 18}`}
          stroke="var(--border)"
          strokeWidth="2"
        />
      ))}
      {nodes.map((node, index) => (
        <g key={node.label}>
          <circle
            cx={node.x}
            cy={node.y}
            r="28"
            fill={index === nodes.length - 1 ? "var(--accent)" : "var(--bg)"}
            fillOpacity={index === nodes.length - 1 ? "0.18" : "1"}
            stroke={
              index === nodes.length - 1 ? "var(--accent)" : "var(--border)"
            }
            strokeWidth={index === nodes.length - 1 ? "2" : "1"}
          />
          <text
            x={node.x}
            y={node.y + 5}
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="12"
            fontWeight="700"
          >
            {node.label}
          </text>
        </g>
      ))}
      <rect
        x="54"
        y="304"
        width="652"
        height="38"
        rx="10"
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <text x="76" y="328" fill="var(--accent)" fontSize="12" fontWeight="700">
        {title}
      </text>
      <text x="190" y="328" fill="var(--text-primary)" fontSize="12">
        {detail}
      </text>
    </svg>
  );
}

export function DsaAmortizedSplayAccessLab() {
  const [active, setActive] = useState<SplayId>("access");
  const options: readonly [SplayId, string][] = [
    ["zig", "单旋转"],
    ["double", "双旋转"],
    ["access", "访问序列"],
  ];
  return (
    <figure
      className={frameClass}
      data-visual-kind="dsa-amortized-splay-access"
      data-visual-concepts={CONCEPTS}
    >
      <VisualHeader
        title="访问序列而不是单次高度"
        prompt="切换旋转阶段，观察 splay trees 如何用 rank potential 解释昂贵访问。"
        onReset={() => setActive("access")}
      />
      <div
        className="grid gap-2 border-b border-border p-4 sm:grid-cols-3"
        role="tablist"
        aria-label="伸展树旋转阶段"
      >
        {options.map(([id, label]) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(id)}
              className={`${buttonClass} ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="p-4">
        <SplaySvg active={active} />
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 11-3：splay trees 不承诺每次访问便宜，而是用序列势能解释总成本。
      </figcaption>
    </figure>
  );
}
