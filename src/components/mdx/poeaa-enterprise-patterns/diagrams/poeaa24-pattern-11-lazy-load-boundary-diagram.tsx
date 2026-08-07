/**
 * Poeaa24Pattern11LazyLoadBoundaryDiagram：11.3 延迟加载会话边界图。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Pattern11LazyLoadBoundaryDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="11.3 延迟加载会话边界。工作单元从打开开始，读取订单身份，在首次访问时加载关联，完成业务校验后提交；会话关闭后访问代理应明确失败，列表场景应改用批量预取避免 N+1 Query。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="11.3 延迟加载：在有效会话内访问，在边界处停止"
          />

          <rect
            x={34}
            y={70}
            width={146}
            height={94}
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
            打开
          </text>
          <text
            x={107}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            读取身份
          </text>
          <text
            x={107}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            未访问关联
          </text>

          <line
            x1={180}
            y1={117}
            x2={214}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={214}
            y={62}
            width={180}
            height={110}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={304}
            y={88}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            有效工作单元
          </text>
          <text
            x={304}
            y={112}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            首次访问 → 查询
          </text>
          <text
            x={304}
            y={134}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            批量预取防 N+1
          </text>
          <text
            x={304}
            y={156}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            校验并提交
          </text>

          <line
            x1={394}
            y1={117}
            x2={428}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={428}
            y={70}
            width={124}
            height={94}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={490}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            提交
          </text>
          <text
            x={490}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            固化状态
          </text>
          <text
            x={490}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            记录版本
          </text>

          <line
            x1={552}
            y1={117}
            x2={582}
            y2={117}
            stroke="#D77A61"
            strokeWidth="1.4"
          />
          <rect
            x={582}
            y={70}
            width={104}
            height={94}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={634}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            关闭后
          </text>
          <text
            x={634}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            明确失败
          </text>
          <text
            x={634}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            或边界内预取
          </text>

          <rect
            x={96}
            y={192}
            width={528}
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
            查询数量、会话状态、首差与回退必须可重放
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="跨过会话边界的隐式访问不是延迟加载的成功"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        工作单元关闭后，延迟代理必须停止隐式查询；列表读取则应在边界内完成批量预取。
      </figcaption>
    </figure>
  );
}
