/** Tpp20Topic10LocalChangeDiagram：10 正交性的局部变化与首个副作用。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic10LocalChangeDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="10 正交性局部变化实验：提示17：消除不相关事物之间的影响；选择一个 Independent Axis，只替换适配器，先运行 Local Test，再观察首个 Side Effect，若跨越 Orthogonality Boundary 就恢复并修复依赖。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="10 正交性：一次局部变化，定位首个副作用"
          />

          <rect
            x={40}
            y={74}
            width={154}
            height={86}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={117}
            y={100}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            Independent Axis
          </text>
          <text
            x={117}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            只替换适配器
          </text>
          <text
            x={117}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            其他输入不变
          </text>

          <line
            x1={194}
            y1={117}
            x2={240}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={240}
            y={74}
            width={154}
            height={86}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={317}
            y={100}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Local Test
          </text>
          <text
            x={317}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            协议 / 错误映射
          </text>
          <text
            x={317}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            正常 / 乱序 / 超时
          </text>

          <line
            x1={394}
            y1={117}
            x2={440}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={440}
            y={74}
            width={154}
            height={86}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={517}
            y={100}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            首个 Side Effect
          </text>
          <text
            x={517}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            全局状态 / 时序
          </text>
          <text
            x={517}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            停止扩大实验
          </text>

          <line
            x1={594}
            y1={117}
            x2={640}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={640}
            y={74}
            width={48}
            height={86}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={664}
            y={100}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            修复
          </text>
          <text
            x={664}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            隔离
          </text>
          <text
            x={664}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            重放
          </text>

          <path
            d="M 664 160 C 664 212, 117 212, 117 160"
            fill="none"
            stroke={T.accent}
            strokeWidth="1.4"
            strokeDasharray="5 4"
          />
          <text
            x={360}
            y={205}
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            跨边界就回退：先修依赖，再扩大验证
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="局部测试帮助定位首差，回归测试确认影响被隔离"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        单变量实验把正交性从口号变成首个副作用和恢复证据。
      </figcaption>
    </figure>
  );
}
