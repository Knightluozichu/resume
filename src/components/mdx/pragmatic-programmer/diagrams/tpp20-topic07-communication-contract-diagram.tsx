/** Tpp20Topic07CommunicationContractDiagram：7 交流！的沟通契约链。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic07CommunicationContractDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="7 交流！沟通契约：提示11：英语就是另一门编程语言；提示12：说什么和怎么说同样重要；提示13：把文档嵌进去，而不要栓在表面；从 Audience Model 和 Communication Intent 进入 Information Shape，经由媒介与时机抵达 Understanding Check。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="7 交流！：从命题到理解证据"
          />

          <rect
            x={28}
            y={72}
            width={148}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={102}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            Audience Model
          </text>
          <text
            x={102}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            角色 / 已有知识
          </text>
          <text
            x={102}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            风险 / 行动
          </text>

          <line
            x1={176}
            y1={118}
            x2={204}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={204}
            y={72}
            width={148}
            height={92}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={278}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Communication Intent
          </text>
          <text
            x={278}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            判断 / 选择
          </text>
          <text
            x={278}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            行动 / 边界
          </text>

          <line
            x1={352}
            y1={118}
            x2={380}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={380}
            y={72}
            width={148}
            height={92}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={454}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            Information Shape
          </text>
          <text
            x={454}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            层级 / 例子
          </text>
          <text
            x={454}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            媒介 / 时机
          </text>

          <line
            x1={528}
            y1={118}
            x2={556}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={556}
            y={72}
            width={136}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={624}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            Understanding
          </text>
          <text
            x={624}
            y={120}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            Check
          </text>
          <text
            x={624}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            复述 / 行动
          </text>

          <rect
            x={124}
            y={192}
            width={472}
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
            内容、表达和理解必须共同闭环
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="受众决定形状，理解证据决定沟通是否完成"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        沟通契约把“说过了”推进到受众完成正确行动。
      </figcaption>
    </figure>
  );
}
