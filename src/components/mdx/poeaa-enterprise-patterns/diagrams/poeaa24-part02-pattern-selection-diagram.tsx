/**
 * Poeaa24Part02PatternSelectionDiagram：第二部分模式选择闭环图。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Part02PatternSelectionDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第二部分 模式。选择闭环从问题与约束开始，定位模式族与模式机制，比较协作模式和替代方案，最后以决策记录、基线、临界样本与受控故障验证并保留撤回路径。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={32} text="第二部分：模式选择闭环" />

          <rect
            x={34}
            y={60}
            width={198}
            height={112}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={133}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            问题与约束
          </text>
          <text
            x={133}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Selection Problem
          </text>
          <text
            x={133}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            所有者 + 失败边界
          </text>
          <text
            x={133}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            冻结应用切片
          </text>

          <line
            x1={232}
            y1={116}
            x2={260}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={260}
            y={60}
            width={198}
            height={112}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.07"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={359}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            模式族与机制
          </text>
          <text
            x={359}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Pattern Family
          </text>
          <text
            x={359}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Pattern Mechanism
          </text>
          <text
            x={359}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            协作关系 + 新成本
          </text>

          <line
            x1={458}
            y1={116}
            x2={486}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={486}
            y={60}
            width={200}
            height={112}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={586}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            验证与撤回
          </text>
          <text
            x={586}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Alternative
          </text>
          <text
            x={586}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Decision Record
          </text>
          <text
            x={586}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            基线 → 临界 → 故障
          </text>

          <rect
            x={88}
            y={190}
            width={544}
            height={30}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={360}
            y={210}
            textAnchor="middle"
            fontSize="11"
            fill={T.primary}
          >
            证据不足时回退到更简单的候选，并记录拒绝理由
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="模式选择是可复核、可撤回的决策闭环"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从问题定位模式族，再比较机制与替代方案，最后用证据决定保留或撤回模式。
      </figcaption>
    </figure>
  );
}
