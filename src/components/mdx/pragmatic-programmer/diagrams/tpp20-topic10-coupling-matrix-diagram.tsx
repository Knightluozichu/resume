/** Tpp20Topic10CouplingMatrixDiagram：10 正交性的耦合矩阵。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic10CouplingMatrixDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="10 正交性耦合矩阵：提示17：消除不相关事物之间的影响；用 Coupling Matrix 检查数据、控制、时间和环境依赖，在 Orthogonality Boundary 内区分必要协作与隐藏扩散。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="10 正交性：让依赖类型和边界可见"
          />

          <rect
            x={52}
            y={70}
            width={172}
            height={112}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={138}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            Orthogonality
          </text>
          <text
            x={138}
            y={120}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            Boundary
          </text>
          <text
            x={138}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            数据 / 控制
          </text>
          <text
            x={138}
            y={168}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            时间 / 环境
          </text>

          <line
            x1={224}
            y1={126}
            x2={268}
            y2={126}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={268}
            y={64}
            width={190}
            height={124}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={363}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Coupling Matrix
          </text>
          <text
            x={363}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            谁依赖谁
          </text>
          <text
            x={363}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            依赖什么 / 谁负责
          </text>
          <text
            x={363}
            y={166}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            首个副作用在哪里
          </text>

          <line
            x1={458}
            y1={126}
            x2={502}
            y2={126}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={502}
            y={70}
            width={166}
            height={112}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={585}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            影响类型
          </text>
          <text
            x={585}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            必要协议
          </text>
          <text
            x={585}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            隐藏状态 / 时序
          </text>
          <text
            x={585}
            y={168}
            textAnchor="middle"
            fontSize="11"
            fill="#D77A61"
          >
            不相关扩散
          </text>

          <rect
            x={160}
            y={202}
            width={400}
            height={20}
            rx="7"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={360}
            y={216}
            textAnchor="middle"
            fontSize="11"
            fill={T.primary}
          >
            提示17：边界让必要协作留下，不相关影响停下
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="矩阵把模糊的耦合争论变成可定位的依赖"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        正交性不是没有边，而是每条边都有方向、类型和所有者。
      </figcaption>
    </figure>
  );
}
