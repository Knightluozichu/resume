/**
 * Poeaa24Pattern11LazyLoadDiagram：11.3 延迟加载结构图。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Pattern11LazyLoadDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="11.3 延迟加载。订单身份先创建轻量对象，首次访问订单行时由延迟代理向工作单元请求数据，身份映射复用同一实例，数据源负责查询；代理不拥有事务和提交责任。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="11.3 延迟加载：数据按需取得，边界保持显式"
          />

          <rect
            x={34}
            y={68}
            width={156}
            height={96}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={112}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            订单身份
          </text>
          <text
            x={112}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            id + 已知字段
          </text>
          <text
            x={112}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            未访问不查询
          </text>

          <line
            x1={190}
            y1={116}
            x2={232}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={232}
            y={58}
            width={196}
            height={116}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={330}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Lazy Load 代理
          </text>
          <text
            x={330}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            首次访问 → 查询
          </text>
          <text
            x={330}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            重复访问 → 复用
          </text>
          <text
            x={330}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            只延迟数据读取
          </text>

          <line
            x1={428}
            y1={116}
            x2={470}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={470}
            y={68}
            width={104}
            height={96}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={522}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            工作单元
          </text>
          <text
            x={522}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Identity Map
          </text>
          <text
            x={522}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            会话有效
          </text>

          <line
            x1={574}
            y1={116}
            x2={602}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={602}
            y={68}
            width={84}
            height={96}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={644}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            数据源
          </text>
          <text
            x={644}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            批量 / 单次
          </text>
          <text
            x={644}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            查询计数
          </text>

          <rect
            x={104}
            y={192}
            width={512}
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
            代理不拥有事务；工作单元负责生命周期与提交
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="延迟的是关联数据，不是身份和事务边界"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        11.3
        延迟加载将首次访问与数据取得连接，但把身份复用和会话有效性留在工作单元内。
      </figcaption>
    </figure>
  );
}
