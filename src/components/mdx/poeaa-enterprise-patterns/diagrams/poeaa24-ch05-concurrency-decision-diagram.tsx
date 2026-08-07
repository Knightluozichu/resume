/**
 * <Poeaa24Ch05ConcurrencyDecisionDiagram>：并发策略选择图。Server Component。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 220;

export function Poeaa24Ch05ConcurrencyDecisionDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并发策略选择图。低冲突使用乐观版本检查，高冲突短操作比较悲观锁，高损失跨服务操作使用串行化或补偿。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="并发策略：冲突概率 × 损失 × 恢复成本"
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
            低冲突
          </text>
          <text
            x={133}
            y={106}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            乐观版本检查
          </text>
          <text
            x={133}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            拒绝后重读或合并
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
            高冲突短操作
          </text>
          <text
            x={359}
            y={106}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            悲观锁或原子扣减
          </text>
          <text
            x={359}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            控制等待与死锁
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
            高损失跨服务
          </text>
          <text
            x={586}
            y={106}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            串行化、幂等与补偿
          </text>
          <text
            x={586}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            不能靠最后写入者胜出
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
            拒绝条件：没有冲突信号、恢复路径或不变量测试
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="策略由冲突与恢复证据推动，而不是由数据库锁功能推动"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并发策略应结合冲突概率、单次损失与恢复成本选择，避免把长业务事务直接变成长数据库锁。
      </figcaption>
    </figure>
  );
}
