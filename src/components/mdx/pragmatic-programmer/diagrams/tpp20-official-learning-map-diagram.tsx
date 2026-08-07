/**
 * Tpp20OfficialLearningMapDiagram：程序员修炼之道第2版学习地图。
 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20OfficialLearningMapDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="《程序员修炼之道（第2版）》权威学习地图。69个正式单元组织168个目录节点，9章承载53个Topic，99条提示连接到项目实践与独立复核。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="第2版学习地图：从目录层次到项目实践"
          />

          <rect
            x={34}
            y={70}
            width={126}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={97}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            69 个正式单元
          </text>
          <text
            x={97}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            序 / 前言 / 章节
          </text>
          <text
            x={97}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            后置单元
          </text>

          <line
            x1={160}
            y1={116}
            x2={190}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={190}
            y={70}
            width={126}
            height={92}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={253}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            168 个节点
          </text>
          <text
            x={253}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            目录坐标
          </text>
          <text
            x={253}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            可追溯导航
          </text>

          <line
            x1={316}
            y1={116}
            x2={346}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={346}
            y={70}
            width={126}
            height={92}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={409}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            9 章 + 53 Topic
          </text>
          <text
            x={409}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            语境 / 案例
          </text>
          <text
            x={409}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            变化与边界
          </text>

          <line
            x1={472}
            y1={116}
            x2={502}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={502}
            y={70}
            width={184}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={594}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            99 条提示 → 实践
          </text>
          <text
            x={594}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            基线 / 首差 / 回退
          </text>
          <text
            x={594}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            独立复核
          </text>

          <rect
            x={110}
            y={192}
            width={500}
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
            数字冻结导航分母，不生成学习完成分数
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="目录层次为实践定位服务，而不是替代语境"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        学习地图保留版本、目录、Topic
        和提示之间的层次，让工程问题可以回到具体语境。
      </figcaption>
    </figure>
  );
}
