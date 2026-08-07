/**
 * Tpp20Topic15EstimationChainDiagram：把估算拆成可复核的五个节点。
 *
 * 对齐官方单元：15 估算；提示23：通过估算来避免意外；提示24：根据代码不断迭代进度表。
 */
import {
  DiagramCaption,
  DiagramTitle,
  T,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 760;
const VIEW_H = 300;
const NODE_W = 128;
const NODE_H = 102;
const GAP = 22;
const START_X = 18;
const START_Y = 76;

const NODES = [
  { title: "问题拆分", subtitle: "对象 + 边界", evidence: "估算单位" },
  { title: "单位", subtitle: "可数的工作块", evidence: "假设清单" },
  { title: "数量级", subtitle: "先粗后细", evidence: "样本规模" },
  { title: "区间", subtitle: "乐观 / 可能 / 悲观", evidence: "误差区间" },
  { title: "校准", subtitle: "新信息 → 更新", evidence: "进度更新" },
] as const;

export function Tpp20Topic15EstimationChainDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic15-estimation-chain"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="15 估算的五节点复核链：问题拆分确定边界，单位把工作变成可数对象，数量级给出粗粒度规模，区间表达不确定性，校准用真实进度更新估算。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker
              id="tpp20-topic15-chain-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={T.secondary} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="15 估算：把一个日期拆成可校准的证据链"
          />

          {NODES.map((node, index) => {
            const x = START_X + index * (NODE_W + GAP);
            const center = x + NODE_W / 2;
            return (
              <g key={node.title}>
                {index < NODES.length - 1 && (
                  <line
                    x1={x + NODE_W + 4}
                    y1={START_Y + NODE_H / 2}
                    x2={x + NODE_W + GAP - 5}
                    y2={START_Y + NODE_H / 2}
                    stroke={T.secondary}
                    strokeWidth="1.4"
                    markerEnd="url(#tpp20-topic15-chain-arrow)"
                  />
                )}
                <rect
                  x={x}
                  y={START_Y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill={T.accent}
                  fillOpacity="0.06"
                  stroke={T.accent}
                  strokeWidth="1.4"
                />
                <circle
                  cx={x + 18}
                  cy={START_Y + 18}
                  r="10"
                  fill={T.accent}
                  fillOpacity="0.14"
                  stroke={T.accent}
                  strokeWidth="1"
                />
                <text
                  x={x + 18}
                  y={START_Y + 22}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={T.accent}
                >
                  {index + 1}
                </text>
                <text
                  x={center}
                  y={START_Y + 43}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={T.primary}
                >
                  {node.title}
                </text>
                <text
                  x={center}
                  y={START_Y + 65}
                  textAnchor="middle"
                  fontSize="11"
                  fill={T.secondary}
                >
                  {node.subtitle}
                </text>
                <text
                  x={center}
                  y={START_Y + 87}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fill={T.accent}
                >
                  {node.evidence}
                </text>
              </g>
            );
          })}

          <text
            x={START_X}
            y={START_Y + NODE_H + 26}
            fontSize="11"
            fill={T.secondary}
          >
            先写“我在估什么”
          </text>
          <text
            x={VIEW_W - START_X}
            y={START_Y + NODE_H + 26}
            textAnchor="end"
            fontSize="11"
            fill={T.secondary}
          >
            再写“何时必须重估”
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="估算不是承诺一个神奇数字，而是让每个变化都有可追踪的落点"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        五个节点把“多久”变成能被复核、被校准的工作记录。
      </figcaption>
    </figure>
  );
}
