/** Tpp20Topic01FeedbackBoundaryDiagram：1 人生是你的的反馈窗口与授权边界。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic01FeedbackBoundaryDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="1 人生是你的反馈边界图：Agency Boundary 区分能自主决定、需要批准和必须拒绝的范围，Feedback Window 观察用户、质量、协作和恢复结果，依据首个偏差决定扩大、缩小、回退或升级。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="1 人生是你的：反馈窗口与边界"
          />

          <rect
            x={38}
            y={68}
            width={174}
            height={40}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={125}
            y={93}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#3FB97F"
          >
            Agency Boundary：可自主
          </text>
          <rect
            x={38}
            y={118}
            width={174}
            height={40}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={125}
            y={143}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#E5B567"
          >
            需要批准：协商 / 升级
          </text>
          <rect
            x={38}
            y={168}
            width={174}
            height={40}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={125}
            y={193}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#D77A61"
          >
            必须拒绝：越过用户 / 安全
          </text>

          <line
            x1={212}
            y1={138}
            x2={266}
            y2={138}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={266}
            y={82}
            width={180}
            height={112}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <text
            x={356}
            y={108}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            Feedback Window
          </text>
          <text
            x={356}
            y={134}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户结果 / 质量信号
          </text>
          <text
            x={356}
            y={156}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            协作负担 / 恢复时间
          </text>
          <text
            x={356}
            y={178}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            首个偏差 / 观察窗口
          </text>

          <line
            x1={446}
            y1={138}
            x2={486}
            y2={138}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={486}
            y={68}
            width={200}
            height={140}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1.2"
          />
          <text
            x={586}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            下一步裁决
          </text>
          <text
            x={586}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            扩大：信号稳定
          </text>
          <text
            x={586}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            缩小：成本或风险上升
          </text>
          <text
            x={586}
            y={166}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            回退：恢复安全状态
          </text>
          <text
            x={586}
            y={188}
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            升级：边界被越过
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="反馈不只问我感觉如何，也问谁受到影响"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Agency Boundary 保护授权与责任，Feedback Window
        让下一步由证据而不是冲动决定。
      </figcaption>
    </figure>
  );
}
