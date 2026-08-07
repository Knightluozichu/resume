/** Tpp20FirstPrefaceCraftDiagram：第一版前言的技艺练习链。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20FirstPrefaceCraftDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第一版前言的技艺练习图：提示1：关注你的技艺选择具体对象，经过基线与最小改变，形成工作证据，再检查用户和质量结果。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="第一版前言：从技艺关注到工作证据"
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
            提示1
          </text>
          <text
            x={109}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            关注你的技艺
          </text>
          <text
            x={109}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            选择具体对象
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
            工作协议
          </text>
          <text
            x={293}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            基线 / 边界
          </text>
          <text
            x={293}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            最小改变
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
            Work Evidence
          </text>
          <text
            x={477}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            预期 / 实际首差
          </text>
          <text
            x={477}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户 / 质量结果
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
            复核
          </text>
          <text
            x={634}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            接受 / 回退
          </text>
          <text
            x={634}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            下一次改变
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
            技艺练习必须改变可观察的工作结果
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="对象具体，边界明确，证据可重放"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        提示1：关注你的技艺，要求把学习对象绑定到工作结果，而不是工具数量。
      </figcaption>
    </figure>
  );
}
