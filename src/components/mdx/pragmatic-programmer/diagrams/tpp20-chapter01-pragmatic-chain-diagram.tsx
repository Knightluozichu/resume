/** Tpp20Chapter01PragmaticChainDiagram：第1章务实决策的主链。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Chapter01PragmaticChainDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第1章 务实的哲学决策链：自主选择进入责任承担，控制 Software Entropy，明确 Quality Tradeoff，投资 Knowledge Portfolio，兑现 Communication Contract。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="第1章 务实的哲学：选择到协作"
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
            选择
          </text>
          <text
            x={109}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Practical Autonomy
          </text>
          <text
            x={109}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            选项 / 影响 / 边界
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
            负责
          </text>
          <text
            x={293}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Responsible Ownership
          </text>
          <text
            x={293}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            风险 / 修复 / 升级
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
            取舍
          </text>
          <text
            x={477}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Software Entropy
          </text>
          <text
            x={477}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Quality Tradeoff
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
            协作
          </text>
          <text
            x={634}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Knowledge
          </text>
          <text
            x={634}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            + 沟通
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
            Communication Contract 让判断进入团队与用户结果
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="务实不是永远正确，而是可解释、可恢复、可改进"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        第1章把自主、责任、熵、质量、知识和沟通组织成一条可复核的项目决策链。
      </figcaption>
    </figure>
  );
}
