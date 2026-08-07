/** Tpp20Topic09DriftRepairDiagram：9 DRY 的漂移检测与修复回路。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic09DriftRepairDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="9 DRY 漂移修复回路：提示15：DRY——不要重复自己与提示16：让复用变得更容易；Canonical Source 变化后通过 Projection 进入 Drift Check，发现代码、文档或配置分叉，回到源头重新生成投影并执行消费者回归。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="9 DRY：发现漂移，回到源头修复"
          />

          <rect
            x={42}
            y={74}
            width={150}
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
            Canonical Source
          </text>
          <text
            x={117}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            规则更新
          </text>
          <text
            x={117}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            版本 / owner
          </text>

          <line
            x1={192}
            y1={117}
            x2={230}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={230}
            y={74}
            width={150}
            height={86}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={305}
            y={100}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Projection
          </text>
          <text
            x={305}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            生成 / 引用 / 适配
          </text>
          <text
            x={305}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            差异来源
          </text>

          <line
            x1={380}
            y1={117}
            x2={418}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={418}
            y={74}
            width={150}
            height={86}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={493}
            y={100}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            Drift Check
          </text>
          <text
            x={493}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            差异 / 责任人
          </text>
          <text
            x={493}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            阻止 / 告警
          </text>

          <line
            x1={568}
            y1={117}
            x2={606}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={606}
            y={74}
            width={72}
            height={86}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={642}
            y={100}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            回归
          </text>
          <text
            x={642}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            重建
          </text>
          <text
            x={642}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            发布
          </text>

          <path
            d="M 642 160 C 642 212, 117 212, 117 160"
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
            失败时先回到源头，不在错误投影上打补丁
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="漂移检测把源头变化连接到消费者回归"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        及时发现分叉，才能让 DRY 的维护成本低于复制成本。
      </figcaption>
    </figure>
  );
}
