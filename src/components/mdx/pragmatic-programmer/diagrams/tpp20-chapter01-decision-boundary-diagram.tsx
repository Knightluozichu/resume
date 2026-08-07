/** Tpp20Chapter01DecisionBoundaryDiagram：第1章的质量取舍与反例边界。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Chapter01DecisionBoundaryDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第1章 务实的哲学决策边界：Quality Tradeoff 由用户结果、质量阈值和剩余风险构成，经过正常、边界和反例样本，决定采纳、缩小、回退或升级。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="第1章 务实的哲学：质量取舍与回退"
          />

          <rect
            x={38}
            y={68}
            width={170}
            height={40}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={123}
            y={93}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#3FB97F"
          >
            用户结果 / Quality Tradeoff
          </text>
          <rect
            x={38}
            y={118}
            width={170}
            height={40}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={123}
            y={143}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#E5B567"
          >
            阈值 / 批准人 / 时间窗
          </text>
          <rect
            x={38}
            y={168}
            width={170}
            height={40}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={123}
            y={193}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#D77A61"
          >
            Software Entropy / 未来成本
          </text>

          <line
            x1={208}
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
            证据检查
          </text>
          <text
            x={356}
            y={134}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            正常：预期结果
          </text>
          <text
            x={356}
            y={156}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            边界：不可接受条件
          </text>
          <text
            x={356}
            y={178}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            反例：首差与恢复
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
            决策边界
          </text>
          <text
            x={586}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            采纳：条件满足
          </text>
          <text
            x={586}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            缩小：风险可控
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
            升级：责任边界越界
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="够好必须说明对谁、在何时、承担什么风险"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        质量取舍不是降低标准，而是让用户结果、阈值、剩余风险和回退成为可审计的需求。
      </figcaption>
    </figure>
  );
}
