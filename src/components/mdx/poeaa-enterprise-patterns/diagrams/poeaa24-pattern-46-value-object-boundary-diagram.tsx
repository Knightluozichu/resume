/**
 * Poeaa24Pattern46ValueObjectBoundaryDiagram：18.6 值对象变化边界图。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Pattern46ValueObjectBoundaryDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="18.6 值对象变化边界。地址值对象保护字段格式、值相等和不可变更新，订单聚合保护跨对象不变量，映射器负责数据库与 API 的转换；共享引用不会被原地修改。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="18.6 值对象：自身约束与外部协作分层"
          />

          <rect
            x={34}
            y={68}
            width={190}
            height={98}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={129}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            值对象自身
          </text>
          <text
            x={129}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            字段格式 / 组合合法性
          </text>
          <text
            x={129}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            值相等 / 新值更新
          </text>

          <line
            x1={224}
            y1={117}
            x2={270}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={270}
            y={58}
            width={180}
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
            订单聚合
          </text>
          <text
            x={360}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            跨对象不变量
          </text>
          <text
            x={360}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            客户 / 配送 / 库存
          </text>
          <text
            x={360}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            决定是否允许变化
          </text>

          <line
            x1={450}
            y1={117}
            x2={496}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={496}
            y={68}
            width={190}
            height={98}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={591}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            基础设施转换
          </text>
          <text
            x={591}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            DB / API / 消息
          </text>
          <text
            x={591}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            读取与序列化
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
            只读旧值 → 构造新值；跨对象规则不下沉
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="值对象越小越要准确，不是越多越好"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        值对象保护自己的值语义，聚合保护跨对象规则，基础设施只负责表示转换。
      </figcaption>
    </figure>
  );
}
