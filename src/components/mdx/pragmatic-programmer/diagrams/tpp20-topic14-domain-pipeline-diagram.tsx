/** Tpp20Topic14DomainPipelineDiagram：14 领域语言从词汇到执行的管线。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic14DomainPipelineDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="14 领域语言管线：提示22：靠近问题域编程；从 Domain Vocabulary 进入 Semantic Boundary，经由 Internal DSL 或 External DSL 执行规则，最后返回领域反馈。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="14 领域语言：规则从词汇走到行为"
          />

          <rect
            x={28}
            y={72}
            width={142}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={99}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            Domain Vocabulary
          </text>
          <text
            x={99}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            对象 / 动作 / 状态
          </text>
          <text
            x={99}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            领域 owner
          </text>

          <line
            x1={170}
            y1={118}
            x2={198}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={198}
            y={72}
            width={142}
            height={92}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={269}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Semantic Boundary
          </text>
          <text
            x={269}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            合法状态 / 转换
          </text>
          <text
            x={269}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            非法即拒绝
          </text>

          <line
            x1={340}
            y1={118}
            x2={368}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={368}
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
            x={439}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            DSL 表达
          </text>
          <text
            x={439}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Internal / External
          </text>
          <text
            x={439}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            代码 / 配置 / 版本
          </text>

          <line
            x1={510}
            y1={118}
            x2={538}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={538}
            y={72}
            width={154}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={615}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            执行与反馈
          </text>
          <text
            x={615}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            行为 / 数据
          </text>
          <text
            x={615}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Error Localization
          </text>

          <rect
            x={136}
            y={194}
            width={448}
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
            提示22：语义比语法更接近问题域
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="领域人员核对语义，代码落实边界，反馈回到词汇"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        领域语言让业务规则在词汇、代码和错误反馈中保持同一含义。
      </figcaption>
    </figure>
  );
}
