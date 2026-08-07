/**
 * Poeaa24Pattern46ValueObjectDiagram：18.6 值对象结构图。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Pattern46ValueObjectDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="18.6 值对象。外部字符串或 JSON 进入校验边界，构造成不可变的值对象；订单聚合使用值相等和新值更新，映射器负责数据库与 API 表示转换，值对象不拥有实体身份。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="18.6 值对象：稳定语义位于表示与聚合之间"
          />

          <rect
            x={34}
            y={70}
            width={150}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={109}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            外部表示
          </text>
          <text
            x={109}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            字符串 / JSON
          </text>
          <text
            x={109}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户输入
          </text>

          <line
            x1={184}
            y1={116}
            x2={224}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={224}
            y={58}
            width={184}
            height={116}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={316}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Validation Boundary
          </text>
          <text
            x={316}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            规范化 / 拒绝无效
          </text>
          <text
            x={316}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Value Equality
          </text>
          <text
            x={316}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Immutability
          </text>

          <line
            x1={408}
            y1={116}
            x2={448}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={448}
            y={70}
            width={112}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={504}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            订单聚合
          </text>
          <text
            x={504}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            持有值
          </text>
          <text
            x={504}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            跨对象规则
          </text>

          <line
            x1={560}
            y1={116}
            x2={590}
            y2={116}
            stroke={T.border}
            strokeWidth="1.2"
          />
          <rect
            x={590}
            y={70}
            width={96}
            height={92}
            rx="8"
            fill={T.primary}
            fillOpacity="0.04"
            stroke={T.border}
            strokeWidth="1.2"
          />
          <text
            x={638}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            映射器
          </text>
          <text
            x={638}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            DB / API
          </text>
          <text
            x={638}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            表示转换
          </text>

          <rect
            x={108}
            y={192}
            width={504}
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
            值对象没有独立身份；变化产生新值，不修改旧引用
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="让语义约束离开裸字段，仍不越过聚合边界"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        值对象集中值相等、校验和不可变语义，订单聚合负责跨对象决定，映射器负责表示转换。
      </figcaption>
    </figure>
  );
}
