/** Tpp20Topic06SourceCritiqueDiagram：6 知识组合的来源批判与再平衡。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic06SourceCritiqueDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="6 知识组合来源批判图：提示10：批判性地分析你读到和听到的东西，用 Source Critique 检查主张、来源、前提、证据和反例，经过小实验和 Rebalance Trigger 决定采纳、缩小、待验证或淘汰。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="6 知识组合：批判来源与再平衡"
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
            提示10：批判性分析
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
            主张 / 来源 / 前提
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
            证据 / 反例 / 利益关系
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
            Source Critique
          </text>
          <text
            x={356}
            y={134}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            当前项目差异
          </text>
          <text
            x={356}
            y={156}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            低风险实验
          </text>
          <text
            x={356}
            y={178}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            结论状态
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
            Rebalance Trigger
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
            缩小：上下文不同
          </text>
          <text
            x={586}
            y={166}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            待验证：证据不足
          </text>
          <text
            x={586}
            y={188}
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            淘汰：实践失败 / 折旧
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="批判不是拒绝，而是让结论带着条件进入实践"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        提示10把来源分析连接到实验和再平衡，让错误自信尽早被反例打断。
      </figcaption>
    </figure>
  );
}
