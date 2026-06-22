import { GAME_ENGINE_ANATOMY } from "./game-engine-anatomy-data";
import type {
  AnatomyEdge,
  AnatomyNode,
  AnatomyRisk,
  AnatomyTone,
  GameEngineChapter,
} from "./game-engine-anatomy-types";

type GameEngineAnatomyDiagramProps = {
  chapter: GameEngineChapter;
  step?: 1 | 2 | 3;
};

const VIEW_W = 920;
const VIEW_H = 438;
const LANE_X = 22;
const LANE_W = 876;
const LANE_H = 74;
const NODE_W = 126;
const NODE_H = 60;
const NODE_EDGE_GAP = 12;

const TONE_CLASS: Record<
  AnatomyTone,
  { fill: string; stroke: string; text: string }
> = {
  data: {
    fill: "fill-accent-glow",
    stroke: "stroke-accent",
    text: "fill-primary",
  },
  risk: {
    fill: "fill-danger/10",
    stroke: "stroke-danger",
    text: "fill-primary",
  },
  wait: {
    fill: "fill-warning/10",
    stroke: "stroke-warning",
    text: "fill-primary",
  },
  output: {
    fill: "fill-success/10",
    stroke: "stroke-success",
    text: "fill-primary",
  },
  neutral: {
    fill: "fill-elevated",
    stroke: "stroke-border",
    text: "fill-primary",
  },
};

const EDGE_CLASS: Record<AnatomyTone, string> = {
  data: "stroke-accent",
  risk: "stroke-danger",
  wait: "stroke-warning",
  output: "stroke-success",
  neutral: "stroke-border",
};

export function GameEngineAnatomyDiagram({
  chapter,
  step,
}: GameEngineAnatomyDiagramProps) {
  const spec = GAME_ENGINE_ANATOMY[chapter];
  const isOverview = step == null;
  const activeStep = step ?? 3;
  const markerId = `gea-anatomy-arrow-${chapter}-${step ?? "all"}`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-4">
      <figcaption className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-accent">Game Engine Anatomy</p>
          <h4 className="text-base font-semibold text-primary">{spec.title}</h4>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-secondary">
            {spec.subtitle}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2 text-[11px] text-secondary">
          <Legend tone="data" label="数据" />
          <Legend tone="wait" label="等待/预算" />
          <Legend tone="risk" label="失败点" />
          <Legend tone="output" label="产物" />
        </div>
      </figcaption>

      <div className="overflow-x-auto rounded-card border border-border bg-bg">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`${spec.title} 解剖图`}
          className="block w-full min-w-[680px]"
        >
          <defs>
            <marker
              id={markerId}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 8 4 0 8Z" className="fill-accent" />
            </marker>
          </defs>

          {spec.lanes.map((lane) => (
            <g key={lane.id}>
              <rect
                x={LANE_X}
                y={lane.y - LANE_H / 2}
                width={LANE_W}
                height={LANE_H}
                rx="10"
                className="fill-elevated/35 stroke-border"
              />
              <text
                x="42"
                y={lane.y - LANE_H / 2 - 6}
                className="fill-secondary text-[12px] font-medium"
              >
                {lane.label}
              </text>
            </g>
          ))}

          {spec.edges.map((edge) => (
            <AnatomyEdgeView
              key={`${edge.from}-${edge.to}`}
              edge={edge}
              nodes={spec.nodes}
              active={isActive(edge.step, activeStep)}
              markerId={markerId}
            />
          ))}

          {spec.nodes.map((node) => (
            <AnatomyNodeView
              key={node.id}
              node={node}
              laneY={spec.lanes.find((lane) => lane.id === node.lane)?.y ?? 156}
              active={isActive(node.step, activeStep)}
            />
          ))}

          {spec.risks.map((risk) => (
            <RiskBadge
              key={risk.label}
              risk={risk}
              active={isActive(risk.step, activeStep)}
            />
          ))}
        </svg>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="rounded-card border border-border bg-bg/60 p-3">
          <p className="text-xs font-medium text-accent">
            {isOverview
              ? `完整链路：${spec.title}`
              : `第 ${activeStep} 步：${spec.steps[activeStep - 1].title}`}
          </p>
          <p className="mt-1 text-xs leading-5 text-secondary">
            {isOverview
              ? spec.steps.map((item) => item.title).join(" -> ")
              : spec.steps[activeStep - 1].focus}
          </p>
        </div>
        <div className="rounded-card border border-border bg-bg/60 p-3">
          <p className="text-xs font-medium text-primary">调试观察点</p>
          <ul className="mt-2 grid gap-1 text-xs leading-5 text-secondary">
            {spec.risks.map((risk) => (
              <li key={risk.label} className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    risk.tone === "risk" ? "bg-danger" : "bg-warning"
                  }`}
                />
                <span>{risk.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}

function AnatomyNodeView({
  node,
  laneY,
  active,
}: {
  node: AnatomyNode;
  laneY: number;
  active: boolean;
}) {
  const tone = TONE_CLASS[node.tone ?? "neutral"];
  const x = node.x - NODE_W / 2;
  const y = laneY - NODE_H / 2;

  return (
    <g className={active ? "opacity-100" : "opacity-35"}>
      <rect
        x={x}
        y={y}
        width={NODE_W}
        height={NODE_H}
        rx="8"
        className={`${tone.fill} ${tone.stroke}`}
        strokeWidth={active ? 2 : 1}
      />
      <text
        x={node.x}
        y={laneY - 10}
        textAnchor="middle"
        className={`${tone.text} text-[12px] font-semibold`}
      >
        {splitLabel(node.label).map((line, i) => (
          <tspan key={line} x={node.x} dy={i === 0 ? 0 : 14}>
            {line}
          </tspan>
        ))}
      </text>
      <text
        x={node.x}
        y={laneY + 18}
        textAnchor="middle"
        className="fill-secondary text-[10px]"
      >
        {splitLabel(node.note).map((line, i) => (
          <tspan key={line} x={node.x} dy={i === 0 ? 0 : 12}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function AnatomyEdgeView({
  edge,
  nodes,
  active,
  markerId,
}: {
  edge: AnatomyEdge;
  nodes: AnatomyNode[];
  active: boolean;
  markerId: string;
}) {
  const from = nodes.find((node) => node.id === edge.from);
  const to = nodes.find((node) => node.id === edge.to);
  if (!from || !to) return null;

  const y1 = laneY(from.lane);
  const y2 = laneY(to.lane);
  const x1 = from.x + NODE_W / 2 + NODE_EDGE_GAP;
  const x2 = to.x - NODE_W / 2 - NODE_EDGE_GAP;
  const mid = (x1 + x2) / 2;
  const tone = edge.tone ?? to.tone ?? "data";

  return (
    <g className={active ? "opacity-100" : "opacity-25"}>
      <path
        d={`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`}
        className={`fill-none ${EDGE_CLASS[tone]}`}
        strokeWidth={active ? 2.5 : 1.5}
        markerEnd={`url(#${markerId})`}
      />
      {edge.label ? (
        <text
          x={mid}
          y={(y1 + y2) / 2 - 6}
          textAnchor="middle"
          className="fill-secondary text-[9px]"
        >
          {edge.label}
        </text>
      ) : null}
    </g>
  );
}

function RiskBadge({ risk, active }: { risk: AnatomyRisk; active: boolean }) {
  const riskClass =
    risk.tone === "risk"
      ? "fill-danger/10 stroke-danger"
      : "fill-warning/10 stroke-warning";

  const lines = splitLabel(risk.label, 15);
  const width = Math.max(
    168,
    Math.min(224, Math.max(...lines.map(measureLabel)) + 28),
  );
  const height = Math.max(34, lines.length * 13 + 14);
  const y = risk.y < 150 ? 142 : 284;

  return (
    <g className={active ? "opacity-100" : "opacity-25"}>
      <rect
        x={risk.x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        rx="16"
        className={riskClass}
      />
      <text
        x={risk.x}
        y={y - (lines.length - 1) * 6 + 4}
        textAnchor="middle"
        className="fill-primary text-[10px] font-medium"
      >
        {lines.map((line, i) => (
          <tspan key={line} x={risk.x} dy={i === 0 ? 0 : 12}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function Legend({ tone, label }: { tone: AnatomyTone; label: string }) {
  const color =
    tone === "data"
      ? "bg-accent"
      : tone === "wait"
        ? "bg-warning"
        : tone === "risk"
          ? "bg-danger"
          : "bg-success";

  return (
    <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1">
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function isActive(step: 1 | 2 | 3 | undefined, activeStep: 1 | 2 | 3) {
  return !step || step <= activeStep;
}

function laneY(lane: string) {
  if (lane === "tools") return 72;
  if (lane === "platform") return 356;
  return 214;
}

function splitLabel(value: string, maxLineLength = 9) {
  if (value.length <= maxLineLength) return [value];
  const normalized = value.replace(/\s*\/\s*/g, " / ");
  const parts = normalized.split(" ");
  if (parts.length > 1) {
    const lines: string[] = [];
    let current = "";
    for (const part of parts) {
      const next = current ? `${current} ${part}` : part;
      if (next.length > maxLineLength + 2 && current) {
        lines.push(current);
        current = part;
      } else {
        current = next;
      }
    }
    if (current) lines.push(current);
    return lines.slice(0, 2);
  }
  const mid = Math.ceil(value.length / 2);
  return [value.slice(0, mid), value.slice(mid)];
}

function measureLabel(value: string) {
  let width = 0;
  for (const char of value) {
    width += /[\u4e00-\u9fff]/.test(char) ? 10 : 6;
  }
  return width;
}
