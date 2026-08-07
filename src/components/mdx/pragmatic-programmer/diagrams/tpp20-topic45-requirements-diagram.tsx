/**
 * Tpp20Topic45RequirementsDiagram：45 需求之坑的发现与协作链。
 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic45RequirementsDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="45 需求之坑。提示75无人确切知道自己想要什么，提示76程序员帮助人们理解他们想要什么，提示77需求是从反馈循环中学到的，提示78和用户一起工作以便从用户角度思考；需求发现进入用户协作，再进入可运行样例。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="45 需求之坑：从未知假设到共同样例"
          />

          <rect
            x={34}
            y={70}
            width={150}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={109}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            提示75 / 76
          </text>
          <text
            x={109}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            未知目标
          </text>
          <text
            x={109}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Requirement Discovery
          </text>

          <line
            x1={184}
            y1={116}
            x2={218}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={218}
            y={70}
            width={150}
            height={92}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={293}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            提示78
          </text>
          <text
            x={293}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            User Collaboration
          </text>
          <text
            x={293}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户路径 / 选择
          </text>

          <line
            x1={368}
            y1={116}
            x2={402}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={402}
            y={70}
            width={150}
            height={92}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={477}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            提示77
          </text>
          <text
            x={477}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Feedback Loop
          </text>
          <text
            x={477}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            样例 / 首差
          </text>

          <line
            x1={552}
            y1={116}
            x2={582}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={582}
            y={70}
            width={104}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={634}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            需求更新
          </text>
          <text
            x={634}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            接受 / 拒绝
          </text>
          <text
            x={634}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            回退路径
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
            需求不是终稿：把用户目标变成可观察、可拒绝的样例
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="提示进入实验，用户反馈改变需求模型"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        提示75至提示78共同要求团队把未知需求带进用户协作和可运行反馈。
      </figcaption>
    </figure>
  );
}
