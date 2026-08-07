/**
 * Tpp20Chapter08ProjectStartDiagram：第8章项目启动因果链。
 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Chapter08ProjectStartDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第8章 项目启动之前。需求学习从用户目标开始，经过 Constraint Frame 识别事实和假设，Pairing 共同构建最小切片，Adaptive Feedback 观察结果，Project Glossary 固定共同语义并促成适应调整。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="第8章：从需求学习到适应调整"
          />

          <rect
            x={34}
            y={70}
            width={142}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={105}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            目标探索
          </text>
          <text
            x={105}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Requirement Discovery
          </text>
          <text
            x={105}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            场景 / 假设
          </text>

          <line
            x1={176}
            y1={116}
            x2={210}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={210}
            y={70}
            width={142}
            height={92}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={281}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            约束识别
          </text>
          <text
            x={281}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Constraint Frame
          </text>
          <text
            x={281}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            事实 / 限制
          </text>

          <line
            x1={352}
            y1={116}
            x2={386}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={386}
            y={70}
            width={142}
            height={92}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={457}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            共同构建
          </text>
          <text
            x={457}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Pairing
          </text>
          <text
            x={457}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            最小切片
          </text>

          <line
            x1={528}
            y1={116}
            x2={562}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={562}
            y={70}
            width={124}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={624}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            反馈调整
          </text>
          <text
            x={624}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Adaptive Feedback
          </text>
          <text
            x={624}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            词义 / 结果
          </text>

          <rect
            x={100}
            y={192}
            width={520}
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
            Project Glossary 让共享语义和拒绝条件可追踪
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="启动项目不是填完需求表，而是建立反馈链"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        第 8 章把需求、约束、共同构建和反馈调整连接成可验证的启动路径。
      </figcaption>
    </figure>
  );
}
