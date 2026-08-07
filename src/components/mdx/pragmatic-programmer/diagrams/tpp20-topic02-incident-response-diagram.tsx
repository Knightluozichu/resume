/** Tpp20Topic02IncidentResponseDiagram：2 我的源码被猫吃了的事故证据链。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic02IncidentResponseDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="2 我的源码被猫吃了的事故证据链：提示4：提供选择，别找借口，从 Incident Fact 进入 Impact Surface，再进入 Recovery Options、Recovery Window 和 Regression Evidence。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="2 我的源码被猫吃了：从事实到恢复"
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
            提示4
          </text>
          <text
            x={109}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            提供选择
          </text>
          <text
            x={109}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            别找借口
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
            Incident Fact
          </text>
          <text
            x={293}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            时间线 / 当前状态
          </text>
          <text
            x={293}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            未知 / 证据
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
            Impact Surface
          </text>
          <text
            x={477}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户 / 数据 / 合规
          </text>
          <text
            x={477}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            谁需要知道
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
            选项
          </text>
          <text
            x={634}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            恢复 / 降级
          </text>
          <text
            x={634}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            验证 / 防复发
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
            坏消息带着事实、影响、选择和验证到达
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="先服务恢复，再讨论归因"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        提示4把事故沟通从借口变成可行动的选择和可复核的恢复路径。
      </figcaption>
    </figure>
  );
}
