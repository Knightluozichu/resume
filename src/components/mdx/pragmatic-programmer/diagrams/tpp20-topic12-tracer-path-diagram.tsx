/** Tpp20Topic12TracerPathDiagram：12 曳光弹的真实端到端路径。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic12TracerPathDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="12 曳光弹端到端路径：提示20：使用曳光弹找到目标；从目标进入 Vertical Slice，穿过 Real Boundary 的输入、规则、外部服务和部署，最后产生用户结果与 Feedback Signal。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="12 曳光弹：最小路径必须穿过真实边界"
          />

          <rect
            x={28}
            y={72}
            width={126}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={91}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            目标
          </text>
          <text
            x={91}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户结果
          </text>
          <text
            x={91}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            拒绝条件
          </text>

          <line
            x1={154}
            y1={118}
            x2={178}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={178}
            y={72}
            width={126}
            height={92}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={241}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Vertical Slice
          </text>
          <text
            x={241}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            输入 / 规则
          </text>
          <text
            x={241}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            最小可运行
          </text>

          <line
            x1={304}
            y1={118}
            x2={328}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={328}
            y={72}
            width={142}
            height={92}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={399}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            Real Boundary
          </text>
          <text
            x={399}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            服务 / 权限 / 数据
          </text>
          <text
            x={399}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            部署 / 错误
          </text>

          <line
            x1={470}
            y1={118}
            x2={494}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={494}
            y={72}
            width={198}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={593}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            Feedback Signal
          </text>
          <text
            x={593}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户结果 / 日志
          </text>
          <text
            x={593}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            运行 / 时间 / 错误
          </text>

          <rect
            x={128}
            y={194}
            width={464}
            height={26}
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
            提示20：路径的价值是反馈，不是展示完成度
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="最小切片越早触达真实边界，方向越早可校准"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        曳光路径把层间假设变成可运行、可失败的端到端证据。
      </figcaption>
    </figure>
  );
}
