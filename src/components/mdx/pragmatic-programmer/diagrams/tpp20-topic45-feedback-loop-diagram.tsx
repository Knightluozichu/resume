/**
 * Tpp20Topic45FeedbackLoopDiagram：45 需求之坑的策略、术语和回退边界。
 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic45FeedbackLoopDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="45 需求之坑反馈边界。提示79策略即元数据把撤回窗口和规则阈值外置，提示80使用项目术语表固定取消、撤回、退款的含义，Feedback Loop 记录正常、边界、依赖失效、首个偏差和回退。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="45 需求之坑：策略元数据与反馈回退"
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
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            提示79
          </text>
          <text
            x={109}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Strategy Metadata
          </text>
          <text
            x={109}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            阈值 / 版本
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
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            提示80
          </text>
          <text
            x={293}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Project Glossary
          </text>
          <text
            x={293}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            状态 / 例外
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
            y={58}
            width={150}
            height={116}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={477}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            Feedback Loop
          </text>
          <text
            x={477}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            正常 / 边界
          </text>
          <text
            x={477}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            依赖失效 / 首差
          </text>
          <text
            x={477}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            回退 / 更新
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
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            需求版本
          </text>
          <text
            x={634}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户确认
          </text>
          <text
            x={634}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            再次试验
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
            反馈更快不等于需求更正确：同时检查价值、质量和安全
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="策略可变、术语稳定、反馈可回退"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        提示79和提示80让策略与词义可追踪，Feedback Loop 负责把结果带回需求更新。
      </figcaption>
    </figure>
  );
}
