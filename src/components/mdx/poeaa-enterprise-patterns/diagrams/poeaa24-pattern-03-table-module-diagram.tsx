/**
 * Poeaa24Pattern03TableModuleDiagram：9.3 表模块责任结构图。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Pattern03TableModuleDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="9.3 表模块。多个用例调用同一个表模块实例，由它拥有订单记录集合、折扣计算、授信校验和批量状态更新；应用服务负责事务协调，领域模型负责更复杂的单行生命周期。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="9.3 表模块：集合规则集中，边界责任清楚"
          />

          <rect
            x={34}
            y={70}
            width={166}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={117}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            用例入口
          </text>
          <text
            x={117}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            查询 / 批量折扣
          </text>
          <text
            x={117}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            授信 / 重试
          </text>

          <line
            x1={200}
            y1={116}
            x2={248}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={248}
            y={58}
            width={224}
            height={116}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={360}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Table Module
          </text>
          <text
            x={360}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Table Boundary
          </text>
          <text
            x={360}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            筛选 → 计算 → 校验
          </text>
          <text
            x={360}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            批量状态更新
          </text>

          <line
            x1={472}
            y1={116}
            x2={520}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={520}
            y={70}
            width={166}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={603}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            外部边界
          </text>
          <text
            x={603}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            事务 / 数据库
          </text>
          <text
            x={603}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            消息 / 补偿
          </text>

          <rect
            x={98}
            y={192}
            width={524}
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
            规则围绕记录集合变化；单行生命周期复杂时迁移到领域模型
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="集合责任集中，不等于模块拥有系统所有责任"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        表模块集中一组记录的业务规则，同时把事务协调和更复杂的对象协作留在明确边界之外。
      </figcaption>
    </figure>
  );
}
