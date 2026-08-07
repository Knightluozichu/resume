/** Tpp20Topic11ReversibleDecisionDiagram：11 可逆性的决策合同。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic11ReversibleDecisionDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="11 可逆性决策合同：提示18：不设最终决定与提示19：放弃追逐时尚；从假设进入 Decision Deadline，经由 Adapter Boundary 和替代方案，保留 Lock-in Cost 可见并抵达 Exit Path。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="11 可逆性：把选择权写进决定"
          />

          <rect
            x={28}
            y={72}
            width={134}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={95}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            假设
          </text>
          <text
            x={95}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            未知 / 证据
          </text>
          <text
            x={95}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            提示18
          </text>

          <line
            x1={162}
            y1={118}
            x2={190}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={190}
            y={72}
            width={134}
            height={92}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={257}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Decision Deadline
          </text>
          <text
            x={257}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            有效期 / 观察窗
          </text>
          <text
            x={257}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            owner / 触发器
          </text>

          <line
            x1={324}
            y1={118}
            x2={352}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={352}
            y={72}
            width={134}
            height={92}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={419}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            Adapter Boundary
          </text>
          <text
            x={419}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            稳定协议 / 出口
          </text>
          <text
            x={419}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Lock-in Cost
          </text>

          <line
            x1={486}
            y1={118}
            x2={514}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={514}
            y={72}
            width={178}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={603}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            替代方案 / Exit Path
          </text>
          <text
            x={603}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            旧路径 / 流量开关
          </text>
          <text
            x={603}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            数据 / 通知 / 回归
          </text>

          <rect
            x={132}
            y={194}
            width={456}
            height={26}
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
            提示19：证据优先于工具流行度
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="有效期和出口让未知保持可学习、可撤回"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可逆决策把假设、期限、边界和退出动作放在同一份合同里。
      </figcaption>
    </figure>
  );
}
