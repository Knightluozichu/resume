/**
 * <Poeaa24Ch13MetadataPipelineDiagram>：元数据查询流水线。Server Component。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Ch13MetadataPipelineDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="元数据查询流水线，覆盖第13章 对象-关系元数据映射模式。领域意图进入 Query Object，经过元数据校验、参数化 Repository 查询和行到领域类型恢复，最后返回领域结果；配置错误和不安全拼接应在边界被拒绝。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="元数据查询：意图到类型结果的安全流水线"
          />

          <rect
            x={28}
            y={68}
            width={128}
            height={78}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={92}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            领域意图
          </text>
          <text
            x={92}
            y={118}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            条件 + 分页
          </text>
          <text
            x={92}
            y={136}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            不含 SQL
          </text>

          <line
            x1={156}
            y1={107}
            x2={176}
            y2={107}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={176}
            y={68}
            width={128}
            height={78}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.07"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={240}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            元数据校验
          </text>
          <text
            x={240}
            y={118}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            字段 + 类型
          </text>
          <text
            x={240}
            y={136}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            配置错误即失败
          </text>

          <line
            x1={304}
            y1={107}
            x2={324}
            y2={107}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={324}
            y={68}
            width={128}
            height={78}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={388}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            Repository
          </text>
          <text
            x={388}
            y={118}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            参数化 SQL
          </text>
          <text
            x={388}
            y={136}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            查询边界
          </text>

          <line
            x1={452}
            y1={107}
            x2={472}
            y2={107}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={472}
            y={68}
            width={128}
            height={78}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={536}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            类型恢复
          </text>
          <text
            x={536}
            y={118}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Row → Domain
          </text>
          <text
            x={536}
            y={136}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            领域结果
          </text>

          <rect
            x={86}
            y={178}
            width={548}
            height={30}
            rx="8"
            fill={T.danger}
            fillOpacity="0.06"
            stroke={T.danger}
            strokeWidth="1"
          />
          <text
            x={360}
            y={198}
            textAnchor="middle"
            fontSize="11"
            fill={T.danger}
          >
            拒绝条件：配置未校验、用户输入拼接 SQL、领域层依赖列名
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="每一步都要能定位失败，并保持领域意图不依赖数据库语法"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        元数据映射的价值在于集中结构变化，同时保留校验、参数化和类型恢复的明确边界。
      </figcaption>
    </figure>
  );
}
