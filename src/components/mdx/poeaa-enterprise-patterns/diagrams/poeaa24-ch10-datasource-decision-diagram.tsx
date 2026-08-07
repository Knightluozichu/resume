/**
 * <Poeaa24Ch10DataSourceDecisionDiagram>：数据源模式选择图。Server Component。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Ch10DataSourceDecisionDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数据源模式选择图，覆盖第10章 数据源架构模式。结构化查询使用 Table Data Gateway；一行数据有局部行为时比较 Row Data Gateway 或 Active Record；复杂聚合需要测试隔离和领域独立时使用 Data Mapper；没有真实隔离需求时拒绝额外映射层。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="数据源模式：先看行为，再承担映射成本"
          />

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
            结构化查询
          </text>
          <text
            x={133}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Table Data Gateway
          </text>
          <text
            x={133}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            集中 SQL + 投影
          </text>
          <text
            x={133}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            不拥有领域行为
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
            单行局部行为
          </text>
          <text
            x={359}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Row Gateway / Active Record
          </text>
          <text
            x={359}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            行对象承担有限行为
          </text>
          <text
            x={359}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            评估表结构耦合
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
            复杂聚合与隔离
          </text>
          <text
            x={586}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Data Mapper
          </text>
          <text
            x={586}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            身份 + 工作单元
          </text>
          <text
            x={586}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            领域对象独立测试
          </text>

          <rect
            x={92}
            y={190}
            width={536}
            height={30}
            rx="8"
            fill={T.danger}
            fillOpacity="0.06"
            stroke={T.danger}
            strokeWidth="1"
          />
          <text
            x={360}
            y={210}
            textAnchor="middle"
            fontSize="11"
            fill={T.danger}
          >
            拒绝条件：没有隔离需求却引入完整映射层
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="模式复杂度应由行为、身份和测试隔离证据推动"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从 Gateway 到 Active Record 再到 Data
        Mapper，隔离能力增强的同时也增加身份、事务和映射成本。
      </figcaption>
    </figure>
  );
}
