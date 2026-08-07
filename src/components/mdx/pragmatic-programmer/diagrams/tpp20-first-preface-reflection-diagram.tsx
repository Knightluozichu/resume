/** Tpp20FirstPrefaceReflectionDiagram：第一版前言的思考、责任与改进回路。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20FirstPrefaceReflectionDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第一版前言的反思回路图：提示2：思考！思考你的工作记录假设和首个偏差，经过 Professional Ownership 的修复与升级，进入 Improvement Loop 的下一次行动。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="第一版前言：思考、承担与改进"
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
            提示2
          </text>
          <text
            x={109}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            思考你的工作
          </text>
          <text
            x={109}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            假设 / 观测点
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
            首个偏差
          </text>
          <text
            x={293}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            结果 / 受影响者
          </text>
          <text
            x={293}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            未识别约束
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
            Professional Ownership
          </text>
          <text
            x={477}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            修复 / 升级
          </text>
          <text
            x={477}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            不能保证的边界
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
            Improvement
          </text>
          <text
            x={634}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Loop
          </text>
          <text
            x={634}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            下一次行为
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
            反思的终点是下一次可观察的改变
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="失败暴露盲区，责任触发修复，改进改变行为"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        提示2：思考！思考你的工作，把结果、责任和下一次行动接成一个可复盘的回路。
      </figcaption>
    </figure>
  );
}
