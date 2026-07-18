import type { FC } from "react";

const VIEW_W = 760;
const VIEW_H = 420;
const LAYER_H = 72;
const LAYER_X = 60;
const LAYER_W = 640;
const LABEL_X = 52;

type LayerSpec = {
  y: number;
  label: string;
  sublabel: string;
  className: string;
  accent: string;
};

const LAYERS: LayerSpec[] = [
  {
    y: 36,
    label: "游戏代码",
    sublabel: "玩法逻辑、关卡脚本、UI — 你的创意",
    className: "fill-accent-glow stroke-accent",
    accent: "stroke-accent",
  },
  {
    y: 116,
    label: "游戏引擎",
    sublabel: "渲染、物理、音频、输入、资源 — 复用的能力层",
    className: "fill-elevated stroke-accent",
    accent: "stroke-accent",
  },
  {
    y: 196,
    label: "第三方中间件",
    sublabel: "物理引擎、音频库、AI 框架 — 引擎的引擎",
    className: "fill-elevated stroke-warning",
    accent: "stroke-warning",
  },
  {
    y: 276,
    label: "操作系统 / 驱动",
    sublabel: "Windows、macOS、主机 SDK — 硬件抽象层",
    className: "fill-elevated stroke-border",
    accent: "stroke-border",
  },
  {
    y: 356,
    label: "硬件",
    sublabel: "CPU、GPU、内存、输入设备 — 物理现实",
    className: "fill-elevated/35 stroke-border",
    accent: "stroke-border",
  },
];

export const EngineArchitectureLayersDiagram: FC = () => (
  <figure className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-4">
    <figcaption className="mb-3">
      <p className="text-xs font-medium text-accent">引擎分层架构</p>
      <h4 className="text-base font-semibold text-primary">
        游戏引擎在软件栈中的位置
      </h4>
      <p className="mt-1 text-xs leading-5 text-secondary">
        引擎不是最底层，也不是最顶层——它是游戏代码和硬件之间的&quot;翻译官 +
        工具箱&quot;。
      </p>
    </figcaption>

    <div className="overflow-x-auto rounded-card border border-border bg-bg">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="游戏引擎分层架构图"
        className="block w-full min-w-[660px]"
      >
        {LAYERS.map((layer) => (
          <g key={layer.label}>
            <rect
              x={LAYER_X}
              y={layer.y}
              width={LAYER_W}
              height={LAYER_H}
              rx="10"
              className={layer.className}
              strokeWidth="1.5"
            />
            <text
              x={LABEL_X}
              y={layer.y + 26}
              className="fill-primary text-[14px] font-semibold"
            >
              {layer.label}
            </text>
            <text
              x={LABEL_X}
              y={layer.y + 48}
              className="fill-secondary text-[11px]"
            >
              {layer.sublabel}
            </text>
          </g>
        ))}

        {/* Arrows between layers */}
        {[
          { y1: 108, y2: 116 },
          { y1: 188, y2: 196 },
          { y1: 268, y2: 276 },
          { y1: 348, y2: 356 },
        ].map(({ y1, y2 }, i) => (
          <g key={i}>
            <line
              x1={LAYER_X + LAYER_W / 2 - 42}
              y1={y1}
              x2={LAYER_X + LAYER_W / 2 - 42}
              y2={y2}
              className={LAYERS[i + 1].accent}
              strokeWidth="2"
            />
            <polygon
              points={`${LAYER_X + LAYER_W / 2 - 47},${y2} ${LAYER_X + LAYER_W / 2 - 37},${y2} ${LAYER_X + LAYER_W / 2 - 42},${y2 - 6}`}
              className={`fill-transparent ${LAYERS[i + 1].accent}`}
            />
          </g>
        ))}

        {/* Side annotation: "引擎层是最关键的一层" */}
        <line
          x1={LAYER_X + LAYER_W + 22}
          y1={116 + LAYER_H / 2}
          x2={LAYER_X + LAYER_W + 58}
          y2={116 + LAYER_H / 2}
          className="stroke-accent"
          strokeWidth="1.5"
        />
        <text
          x={LAYER_X + LAYER_W + 62}
          y={116 + LAYER_H / 2 + 4}
          className="fill-accent text-[10px] font-medium"
        >
          本章焦点
        </text>
      </svg>
    </div>
  </figure>
);
