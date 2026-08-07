/** Tpp20Topic06LearningPortfolioDiagram：6 知识组合的学习投资链。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic06LearningPortfolioDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="6 知识组合学习投资链：提示9：对知识组合做定期投资，从风险盘点进入 Learning Allocation，形成 Practice Artifact，依据反馈和 Rebalance Trigger 更新 Knowledge Asset。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="6 知识组合：投资必须进入实践"
          />

          <rect
            x={34}
            y={70}
            width={150}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={109}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            提示9
          </text>
          <text
            x={109}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            定期投资
          </text>
          <text
            x={109}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            风险 / 折旧盘点
          </text>

          <line
            x1={184}
            y1={116}
            x2={218}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={218}
            y={70}
            width={150}
            height={92}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={293}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Learning Allocation
          </text>
          <text
            x={293}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            时间 / 注意力
          </text>
          <text
            x={293}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            多样性 / 优先级
          </text>

          <line
            x1={368}
            y1={116}
            x2={402}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={402}
            y={70}
            width={150}
            height={92}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={477}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            Practice Artifact
          </text>
          <text
            x={477}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            实验 / 测试 / 复盘
          </text>
          <text
            x={477}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            行为 / 结果变化
          </text>

          <line
            x1={552}
            y1={116}
            x2={582}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={582}
            y={70}
            width={104}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={634}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            反馈
          </text>
          <text
            x={634}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Rebalance
          </text>
          <text
            x={634}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Asset 更新
          </text>

          <rect
            x={106}
            y={192}
            width={508}
            height={28}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={360}
            y={211}
            textAnchor="middle"
            fontSize="11"
            fill={T.primary}
          >
            学习不是消费：必须留下可复用、可反驳的产物
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="风险决定投入，实践决定收益，反馈决定再平衡"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        提示9让知识投资连接风险和实践，避免把收藏数量当成能力增长。
      </figcaption>
    </figure>
  );
}
