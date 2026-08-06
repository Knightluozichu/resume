/**
 * <Poeaa24FiveLayerViz>：本书五层目录结构可视化。Server Component。
 * 展示 76 正式单元 → 119 目录节点 → 18 章 → 51 模式 → 10 模式族的层次堆叠关系。
 */
import { T } from "../poeaa-svg-primitives";

const VIEW_W = 400;
const VIEW_H = 280;

const layers = [
  { label: "10 模式族", sub: "替代与互补关系", y: 40, color: T.accent },
  { label: "51 模式", sub: "可复用方案集合", y: 80, color: "#E5B567" },
  { label: "18 章", sub: "主题组织模式群体", y: 120, color: "#3FB97F" },
  { label: "119 目录节点", sub: "阅读导航骨架", y: 160, color: "#E5B567" },
  { label: "76 正式单元", sub: "最小粒度条目", y: 200, color: "#3FB97F" },
];

export function Poeaa24FiveLayerViz() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="《企业应用架构模式》目录结构的五个层次：76个正式单元、119个目录节点、18章、51个模式、10个模式族，从下到上层层递进。"
          className="mx-auto block h-auto w-full max-w-[400px]"
        >
          {/* 连接线 */}
          <line x1={200} y1={55} x2={200} y2={72} stroke={T.border} strokeWidth="1" />
          <line x1={200} y1={95} x2={200} y2={112} stroke={T.border} strokeWidth="1" />
          <line x1={200} y1={135} x2={200} y2={152} stroke={T.border} strokeWidth="1" />
          <line x1={200} y1={175} x2={200} y2={192} stroke={T.border} strokeWidth="1" />

          {/* 箭头 */}
          <polygon points="195,72 200,78 205,72" fill={T.border} />
          <polygon points="195,112 200,118 205,112" fill={T.border} />
          <polygon points="195,152 200,158 205,152" fill={T.border} />
          <polygon points="195,192 200,198 205,192" fill={T.border} />

          {layers.map((layer) => (
            <g key={layer.label}>
              <rect
                x={80}
                y={layer.y}
                width={240}
                height={28}
                rx="6"
                fill={layer.color}
                fillOpacity="0.1"
                stroke={layer.color}
                strokeWidth="1.2"
              />
              <text
                x={200}
                y={layer.y + 19}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={layer.color}
              >
                {layer.label}
              </text>
              <text
                x={360}
                y={layer.y + 19}
                textAnchor="start"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {layer.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </figure>
  );
}