/** Tpp20ForewordEvidenceBoundaryDiagram：序的证据边界与回退判定。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20ForewordEvidenceBoundaryDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="序的证据边界图：版本事实、作者主张和 Practice Evidence 进入 Review Contract，经过正常、边界和依赖失效样本后，决定采纳、缩小或拒绝，并保留回退动作。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={32} text="序：证据边界与回退判定" />

          <rect
            x={42}
            y={66}
            width={180}
            height={38}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={132}
            y={90}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#3FB97F"
          >
            版本事实 / 目录证据
          </text>
          <rect
            x={42}
            y={116}
            width={180}
            height={38}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={132}
            y={140}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#E5B567"
          >
            作者主张 / 条件边界
          </text>
          <rect
            x={42}
            y={166}
            width={180}
            height={38}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={132}
            y={190}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#D77A61"
          >
            Practice Evidence / 首差
          </text>

          <line
            x1={222}
            y1={135}
            x2={274}
            y2={135}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={274}
            y={84}
            width={176}
            height={102}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <text
            x={362}
            y={110}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            Review Contract
          </text>
          <text
            x={362}
            y={136}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            基线 / 唯一干预
          </text>
          <text
            x={362}
            y={158}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            观察点 / 拒绝条件
          </text>
          <text
            x={362}
            y={180}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            复核者 / 回退动作
          </text>

          <line
            x1={450}
            y1={135}
            x2={486}
            y2={135}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={486}
            y={66}
            width={200}
            height={138}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1.2"
          />
          <text
            x={586}
            y={92}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            三类样本
          </text>
          <text
            x={586}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            正常：主张成立
          </text>
          <text
            x={586}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            边界：接受或拒绝
          </text>
          <text
            x={586}
            y={168}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            失效：首差后回退
          </text>
          <text
            x={586}
            y={192}
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            采纳 / 缩小 / 拒绝
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="没有失败记录，就没有迁移边界"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Review Contract 把阅读判断变成可重放的验收：证据不足时，回退并缩小结论。
      </figcaption>
    </figure>
  );
}
