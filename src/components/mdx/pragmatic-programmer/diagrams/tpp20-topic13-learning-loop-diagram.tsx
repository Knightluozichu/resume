/** Tpp20Topic13LearningLoopDiagram：13 原型与便签的学习回路。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic13LearningLoopDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="13 原型与便签学习回路：提示21：用原型学习；从 Learning Question 进入 Prototype Fidelity，经由 Observation Signal 形成结论，再按 Discard Condition 丢弃、重写或进入 Production Boundary。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="13 原型与便签：先学习，再决定去留"
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
            Learning Question
          </text>
          <text
            x={99}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            未知 / 假设
          </text>
          <text
            x={99}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            可否定
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
            Prototype Fidelity
          </text>
          <text
            x={269}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            纸面 / 交互 / 脚本
          </text>
          <text
            x={269}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            时间盒 / 缺口
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
            Observation Signal
          </text>
          <text
            x={439}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户 / 错误 / 时间
          </text>
          <text
            x={439}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            支持 / 否定
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
            结论 / 去留
          </text>
          <text
            x={615}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Discard Condition
          </text>
          <text
            x={615}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            丢弃 / 重写 / 升级
          </text>

          <path
            d="M 615 164 C 615 214, 99 214, 99 164"
            fill="none"
            stroke={T.accent}
            strokeWidth="1.4"
            strokeDasharray="5 4"
          />
          <text
            x={360}
            y={207}
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            便签保存问题、证据、状态和下一步
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="原型回答未知，结论决定它是否还有下一站"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        原型的价值是学习回路，不是为生产积累临时债务。
      </figcaption>
    </figure>
  );
}
