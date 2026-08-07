/** Tpp20Topic09SingleSourceDiagram：9 DRY 的权威源与投影关系。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic09SingleSourceDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="9 DRY 单一源图：提示15：DRY——不要重复自己与提示16：让复用变得更容易；从 Knowledge Duplication 识别同一知识进入 Canonical Source，再通过 Projection 到达代码、文档、配置和测试。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="9 DRY：一条知识，多个可追踪投影"
          />

          <rect
            x={34}
            y={78}
            width={168}
            height={86}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={118}
            y={104}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            Knowledge Duplication
          </text>
          <text
            x={118}
            y={132}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            规则 / 边界 / 错误语义
          </text>
          <text
            x={118}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            代码相似不等于同一知识
          </text>

          <line
            x1={202}
            y1={121}
            x2={266}
            y2={121}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={266}
            y={68}
            width={188}
            height={108}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={360}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            Canonical Source
          </text>
          <text
            x={360}
            y={126}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            owner / 版本 / 边界
          </text>
          <text
            x={360}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            修改责任集中
          </text>

          <line
            x1={454}
            y1={121}
            x2={500}
            y2={121}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={500}
            y={64}
            width={186}
            height={116}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={593}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Projection
          </text>
          <text
            x={593}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            代码 / 文档 / 配置
          </text>
          <text
            x={593}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            测试 / 示例 / 运营
          </text>
          <text
            x={593}
            y={164}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            引用 / 生成 / 适配
          </text>

          <rect
            x={130}
            y={198}
            width={460}
            height={24}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={360}
            y={215}
            textAnchor="middle"
            fontSize="11"
            fill={T.primary}
          >
            提示15 管知识源，提示16 管复用边界
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="投影可以很多，独立修改同一知识的源头只能清楚且唯一"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DRY 连接的是知识源与投影，不是盲目消除相似字符。
      </figcaption>
    </figure>
  );
}
