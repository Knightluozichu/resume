import type { FC } from "react";

const VIEW_W = 760;
const VIEW_H = 340;
const NODE_W = 108;
const NODE_H = 56;
const START_X = 60;
const NODE_Y = 62;
const NODE_GAP = 48;
const PROC_Y = 180;
const PROC_H = 80;

const PIPELINE_NODES = [
  { id: "source", label: "源资产", note: "FBX·PSD·WAV", tone: "data" as const },
  { id: "import", label: "导入器", note: "校验·元数据", tone: "data" as const },
  { id: "cook", label: "Cook 转换", note: "平台专用格式", tone: "wait" as const },
  { id: "bundle", label: "资源包", note: "打包·寻址", tone: "wait" as const },
  { id: "load", label: "运行时加载", note: "异步 IO·缓存", tone: "wait" as const },
  { id: "runtime", label: "游戏运行时", note: "句柄·消费", tone: "output" as const },
] as const;

function nodeX(i: number) {
  return START_X + i * (NODE_W + NODE_GAP);
}

const TONE_COLORS = {
  data: { bg: "fill-accent-glow", stroke: "stroke-accent" },
  wait: { bg: "fill-warning/10", stroke: "stroke-warning" },
  risk: { bg: "fill-danger/10", stroke: "stroke-danger" },
  output: { bg: "fill-success/10", stroke: "stroke-success" },
};

export const AssetPipelineDiagram: FC = () => (
  <figure className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-4">
    <figcaption className="mb-3">
      <p className="text-xs font-medium text-accent">资产管线</p>
      <h4 className="text-base font-semibold text-primary">
        从创作者工具到玩家屏幕
      </h4>
      <p className="mt-1 text-xs leading-5 text-secondary">
        资产管线是一条把美术产出变成运行时数据的流水线。每一步都有校验、转换和错误上报。
      </p>
    </figcaption>

    <div className="overflow-x-auto rounded-card border border-border bg-bg">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="资产管线流程图"
        className="block w-full min-w-[740px]"
      >
        {/* Title */}
        <text x={32} y={32} className="fill-secondary text-[11px] font-medium">
          制作阶段（编辑器/工具）
        </text>
        <text x={START_X + (NODE_W + NODE_GAP) * 3 + NODE_W / 2} y={32} className="fill-secondary text-[11px] font-medium">
          运行阶段（游戏中）
        </text>

        {/* Phase divider */}
        <line
          x1={START_X + (NODE_W + NODE_GAP) * 2 + NODE_W / 2 + NODE_GAP / 2}
          y1={16}
          x2={START_X + (NODE_W + NODE_GAP) * 2 + NODE_W / 2 + NODE_GAP / 2}
          y2={290}
          className="stroke-border"
          strokeWidth="1"
          strokeDasharray="6,4"
        />

        {/* Pipeline nodes */}
        {PIPELINE_NODES.map((node, i) => {
          const x = nodeX(i);
          const colors = TONE_COLORS[node.tone];
          return (
            <g key={node.id}>
              <rect
                x={x}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                rx="8"
                className={`${colors.bg} ${colors.stroke}`}
                strokeWidth="1.5"
              />
              <text
                x={x + NODE_W / 2}
                y={NODE_Y + 22}
                textAnchor="middle"
                className="fill-primary text-[12px] font-semibold"
              >
                {node.label}
              </text>
              <text
                x={x + NODE_W / 2}
                y={NODE_Y + 42}
                textAnchor="middle"
                className="fill-secondary text-[10px]"
              >
                {node.note}
              </text>
            </g>
          );
        })}

        {/* Arrows between nodes */}
        {PIPELINE_NODES.slice(0, -1).map((node, i) => {
          const x1 = nodeX(i) + NODE_W;
          const x2 = nodeX(i + 1);
          const midY = NODE_Y + NODE_H / 2;
          return (
            <g key={`arrow-${node.id}`}>
              <line
                x1={x1 + 4}
                y1={midY}
                x2={x2 - 4}
                y2={midY}
                className="stroke-accent"
                strokeWidth="2"
                markerEnd="url(#pipeline-arrow)"
              />
            </g>
          );
        })}

        {/* Processing details section */}
        <g>
          <line
            x1={32}
            y1={PROC_Y}
            x2={VIEW_W - 32}
            y2={PROC_Y}
            className="stroke-border"
            strokeWidth="1"
          />

          {/* Cook detail */}
          <rect
            x={nodeX(2)}
            y={PROC_Y + 10}
            width={NODE_W * 2 + NODE_GAP}
            height={PROC_H - 6}
            rx="6"
            className="fill-elevated/30 stroke-border"
            strokeWidth="1"
            strokeDasharray="3,3"
          />
          <text
            x={nodeX(2) + 10}
            y={PROC_Y + 30}
            className="fill-secondary text-[10px]"
          >
            平台 Cook 详解：
          </text>
          <text
            x={nodeX(2) + 10}
            y={PROC_Y + 48}
            className="fill-secondary text-[10px]"
          >
            贴图 → DXT/ASTC 压缩（变 GPU 格式）
          </text>
          <text
            x={nodeX(2) + 10}
            y={PROC_Y + 64}
            className="fill-secondary text-[10px]"
          >
            网格 → 优化顶点布局 + LOD 生成
          </text>
          <text
            x={nodeX(2) + 10}
            y={PROC_Y + 80}
            className="fill-secondary text-[10px]"
          >
            动画 → 压缩关键帧 + 移除冗余通道
          </text>

          {/* Load detail */}
          <rect
            x={nodeX(4)}
            y={PROC_Y + 10}
            width={NODE_W}
            height={PROC_H - 6}
            rx="6"
            className="fill-elevated/30 stroke-border"
            strokeWidth="1"
            strokeDasharray="3,3"
          />
          <text
            x={nodeX(4) + 10}
            y={PROC_Y + 30}
            className="fill-secondary text-[10px]"
          >
            异步加载：
          </text>
          <text
            x={nodeX(4) + 10}
            y={PROC_Y + 48}
            className="fill-secondary text-[10px]"
          >
            背景线程 IO
          </text>
          <text
            x={nodeX(4) + 10}
            y={PROC_Y + 64}
            className="fill-secondary text-[10px]"
          >
            → 主线程回写
          </text>
          <text
            x={nodeX(4) + 10}
            y={PROC_Y + 80}
            className="fill-secondary text-[10px]"
          >
            不卡帧
          </text>
        </g>

        {/* Arrow marker defs */}
        <defs>
          <marker
            id="pipeline-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0 0 8 4 0 8Z" className="fill-accent" />
          </marker>
        </defs>
      </svg>
    </div>
  </figure>
);
