/**
 * Poeaa24ReferencesTraceabilityDiagram：参考文献主张追踪链。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24ReferencesTraceabilityDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="参考文献。Source Claim 进入 Citation Coordinate，标记 Evidence Level 和 Applicability Boundary，最后连接项目 Verification Log；每一步都能独立复核、质疑和撤回。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="参考文献：从主张到可复核验证"
          />

          <rect
            x={34}
            y={70}
            width={146}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={107}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            Source Claim
          </text>
          <text
            x={107}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            定义 / 建议
          </text>
          <text
            x={107}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            性能 / 故障
          </text>

          <line
            x1={180}
            y1={116}
            x2={220}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={220}
            y={58}
            width={176}
            height={116}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={308}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Citation Coordinate
          </text>
          <text
            x={308}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            标题 / 节点 / 版本
          </text>
          <text
            x={308}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            精确定位
          </text>
          <text
            x={308}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            记录核对日期
          </text>

          <line
            x1={396}
            y1={116}
            x2={436}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={436}
            y={70}
            width={112}
            height={92}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={492}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            Evidence Level
          </text>
          <text
            x={492}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            书 / 目录 / 实验
          </text>
          <text
            x={492}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            支持范围
          </text>

          <line
            x1={548}
            y1={116}
            x2={578}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={578}
            y={70}
            width={108}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={632}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            当前复核
          </text>
          <text
            x={632}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Boundary
          </text>
          <text
            x={632}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Verification Log
          </text>

          <rect
            x={100}
            y={192}
            width={520}
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
            每一步都能质疑、补证据或撤回，不把链接当结论
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="引用链把来源范围和项目结论分开"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可审计的参考文献记录从主张出发，经过精确坐标和证据等级，连接到当前项目验证。
      </figcaption>
    </figure>
  );
}
