/**
 * Poeaa24Pattern03TableModuleBoundaryDiagram：9.3 表模块事务边界图。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Pattern03TableModuleBoundaryDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="9.3 表模块事务边界。订单集合从读取快照开始，经过折扣计算和授信校验，在全部通过时提交；空集合、恰好额度、超过额度和并发冲突都必须有可观察的首差与回退证据。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="9.3 表模块：验证与回退边界"
          />

          <rect
            x={34}
            y={68}
            width={142}
            height={94}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={105}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            读取快照
          </text>
          <text
            x={105}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Row Set
          </text>
          <text
            x={105}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            版本与筛选
          </text>

          <line
            x1={176}
            y1={116}
            x2={206}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={206}
            y={68}
            width={142}
            height={94}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={277}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            计算规则
          </text>
          <text
            x={277}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            折扣 / 总额
          </text>
          <text
            x={277}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            保留中间证据
          </text>

          <line
            x1={348}
            y1={116}
            x2={378}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={378}
            y={68}
            width={142}
            height={94}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={449}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            授信校验
          </text>
          <text
            x={449}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            正常 / 临界
          </text>
          <text
            x={449}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            超额 → 首差
          </text>

          <line
            x1={520}
            y1={116}
            x2={550}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={550}
            y={68}
            width={136}
            height={94}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={618}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            提交或回退
          </text>
          <text
            x={618}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            全部批准
          </text>
          <text
            x={618}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            冲突 → 不写回
          </text>

          <rect
            x={120}
            y={192}
            width={480}
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
            只改变一个约束：保存首差、版本、回退与补偿证据
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="成功与半失败都必须能重放"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        表模块的选择证据必须覆盖批量成功、临界额度、超额拒绝和并发冲突等边界。
      </figcaption>
    </figure>
  );
}
