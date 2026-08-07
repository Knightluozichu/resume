/**
 * <Poeaa24Ch03MappingDecisionDiagram>：映射策略选择图。Server Component。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 220;

export function Poeaa24Ch03MappingDecisionDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="映射策略决策图。简单查询使用投影或记录集，单表行为使用主动记录，复杂聚合与事务使用数据映射器和工作单元。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="映射策略：先看对象行为，再增加间接层"
          />

          <rect
            x={34}
            y={60}
            width={198}
            height={82}
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
            简单查询
          </text>
          <text
            x={133}
            y={106}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            投影 / 记录集
          </text>
          <text
            x={133}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            无独立行为与写回
          </text>

          <line
            x1={232}
            y1={101}
            x2={260}
            y2={101}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={260}
            y={60}
            width={198}
            height={82}
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
            单表行为
          </text>
          <text
            x={359}
            y={106}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            主动记录 / 表数据入口
          </text>
          <text
            x={359}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            行为与一张表紧密对应
          </text>

          <line
            x1={458}
            y1={101}
            x2={486}
            y2={101}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={486}
            y={60}
            width={200}
            height={82}
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
            复杂聚合
          </text>
          <text
            x={586}
            y={106}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Data Mapper + Unit of Work
          </text>
          <text
            x={586}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            身份、事务与对象图独立演化
          </text>

          <rect
            x={104}
            y={164}
            width={512}
            height={34}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={360}
            y={186}
            textAnchor="middle"
            fontSize="11"
            fill={T.primary}
          >
            拒绝条件：没有真实变化轴，却为“未来灵活性”增加完整映射层
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="复杂度应由身份、行为和事务证据推动，而不是由 ORM 功能表推动"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从投影到主动记录，再到数据映射器与工作单元，映射复杂度随对象行为和事务需求递增。
      </figcaption>
    </figure>
  );
}
