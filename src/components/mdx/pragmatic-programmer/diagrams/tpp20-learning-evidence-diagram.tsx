/**
 * Tpp20LearningEvidenceDiagram：从来源到项目复核的证据边界。
 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20LearningEvidenceDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="《程序员修炼之道（第2版）》学习证据链。目录和原书语境定位 Topic，项目实践固定基线与唯一变化，Verification Log 记录首个偏差、回退和独立复核；来源不自动证明当前项目结果。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={32} text="把提示转成可复核证据" />

          <rect
            x={34}
            y={68}
            width={158}
            height={96}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={113}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            来源与目录
          </text>
          <text
            x={113}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            版次 / 节点 / Topic
          </text>
          <text
            x={113}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            支持语境
          </text>

          <line
            x1={192}
            y1={116}
            x2={232}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={232}
            y={58}
            width={178}
            height={116}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={321}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            实践设计
          </text>
          <text
            x={321}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            问题 / 约束
          </text>
          <text
            x={321}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            基线 / 唯一变化
          </text>
          <text
            x={321}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            正常 / 边界 / 故障
          </text>

          <line
            x1={410}
            y1={116}
            x2={450}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={450}
            y={68}
            width={112}
            height={96}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={506}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            Verification Log
          </text>
          <text
            x={506}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            首差 / 结果
          </text>
          <text
            x={506}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            回退动作
          </text>

          <line
            x1={562}
            y1={116}
            x2={592}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={592}
            y={68}
            width={94}
            height={96}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={639}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            独立复核
          </text>
          <text
            x={639}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            重建输入
          </text>
          <text
            x={639}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            接受 / 撤回
          </text>

          <rect
            x={106}
            y={192}
            width={508}
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
            目录支持导航，项目日志支持当前结果，不能互相冒充
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="一次成功不是普遍结论，边界和回退才使实践可迁移"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        把书中提示转成项目证据，需要明确输入、首个偏差、回退和独立复核。
      </figcaption>
    </figure>
  );
}
