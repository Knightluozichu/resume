import type { FC } from "react";

const VIEW_W = 760;
const VIEW_H = 380;

interface Layer {
  label: string;
  note: string;
  y: number;
  h: number;
  tone: "data" | "wait" | "output";
}

const LAYERS: Layer[] = [
  { label: "玩法层", note: "脚本、状态机、关卡逻辑 — 变化最快", y: 40, h: 62, tone: "output" },
  { label: "子系统层", note: "渲染、物理、动画、音频 — 稳定接口", y: 122, h: 62, tone: "wait" },
  { label: "核心层", note: "内存管理、容器、数学库 — 几乎不变", y: 204, h: 62, tone: "data" },
  { label: "平台层", note: "OS 适配、文件系统、GPU API — 屏蔽差异", y: 286, h: 62, tone: "data" },
];

const LAYER_X = 50;
const LAYER_W = 500;

export const SoftwareLayersDiagram: FC = () => (
  <figure className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-4">
    <figcaption className="mb-3">
      <p className="text-xs font-medium text-accent">软件分层</p>
      <h4 className="text-base font-semibold text-primary">
        引擎的依赖层次：上层依赖下层，反之不行
      </h4>
      <p className="mt-1 text-xs leading-5 text-secondary">
        好架构的核心纪律：底层不知道上层是谁。平台层不知道上面在跑什么游戏，玩法层不关心下面是什么 GPU。
      </p>
    </figcaption>

    <div className="overflow-x-auto rounded-card border border-border bg-bg">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="引擎分层依赖图"
        className="block w-full min-w-[660px]"
      >
        {LAYERS.map((layer) => {
          const t =
            layer.tone === "data"
              ? { bg: "fill-accent-glow", stroke: "stroke-accent" }
              : layer.tone === "wait"
                ? { bg: "fill-warning/10", stroke: "stroke-warning" }
                : { bg: "fill-success/10", stroke: "stroke-success" };

          return (
            <g key={layer.label}>
              <rect
                x={LAYER_X}
                y={layer.y}
                width={LAYER_W}
                height={layer.h}
                rx="8"
                className={`${t.bg} ${t.stroke}`}
                strokeWidth="1.5"
              />
              <text
                x={LAYER_X + 16}
                y={layer.y + 24}
                className="fill-primary text-[13px] font-semibold"
              >
                {layer.label}
              </text>
              <text
                x={LAYER_X + 16}
                y={layer.y + 44}
                className="fill-secondary text-[11px]"
              >
                {layer.note}
              </text>
            </g>
          );
        })}

        {/* Dependency arrows - pointing UP (upper depends on lower) */}
        {[
          { y1: 172, y2: 194 },
          { y1: 105, y2: 127 },
          { y1: 262, y2: 268 },
        ].map(({ y1, y2 }, i) => (
          <g key={i}>
            <line
              x1={LAYER_X + LAYER_W + 30}
              y1={y1}
              x2={LAYER_X + LAYER_W + 30}
              y2={y2}
              className="stroke-border"
              strokeWidth="1.5"
            />
            <text
              x={LAYER_X + LAYER_W + 42}
              y={(y1 + y2) / 2 + 4}
              className="fill-secondary text-[9px]"
            >
              依赖
            </text>
          </g>
        ))}

        {/* Change frequency annotation */}
        <g transform="translate(600, 40)">
          <text className="fill-secondary text-[10px]">变更频率</text>
          <rect x="0" y="14" width="8" height="8" rx="1" className="fill-success/80" />
          <text x="14" y="21" className="fill-secondary text-[9px]">最高</text>
          <rect x="56" y="14" width="8" height="8" rx="1" className="fill-warning/80" />
          <text x="70" y="21" className="fill-secondary text-[9px]">中等</text>
          <rect x="112" y="14" width="8" height="8" rx="1" className="fill-accent/80" />
          <text x="126" y="21" className="fill-secondary text-[9px]">最低</text>
        </g>

        {/* Key principle annotation */}
        <text x={LAYER_X} y={370} className="fill-accent text-[11px] font-medium">
          核心原则：底层的接口不能因为上层变化而改动。如果玩法改了，核心层和平台层应该完全不受影响。
        </text>
      </svg>
    </div>
  </figure>
);
