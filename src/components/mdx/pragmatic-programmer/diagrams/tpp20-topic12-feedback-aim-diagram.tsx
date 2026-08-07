/** Tpp20Topic12FeedbackAimDiagram：12 曳光弹根据着弹点选择下一枪。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic12FeedbackAimDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="12 曳光弹反馈瞄准回路：提示20：使用曳光弹找到目标；Tracer Path 产生 Feedback Signal，定位着弹点后形成 Next Aim，只改变一个条件并重放相同输入，失败时回退到真实边界。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={32} text="提示20：着弹点决定下一枪" />

          <rect
            x={40}
            y={76}
            width={150}
            height={82}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={115}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            Tracer Path
          </text>
          <text
            x={115}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            真实输入 / 运行
          </text>
          <text
            x={115}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户结果
          </text>

          <line
            x1={190}
            y1={117}
            x2={236}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={236}
            y={76}
            width={150}
            height={82}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={311}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Feedback Signal
          </text>
          <text
            x={311}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            成功 / 错误 / 耗时
          </text>
          <text
            x={311}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            证据窗口
          </text>

          <line
            x1={386}
            y1={117}
            x2={432}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={432}
            y={76}
            width={150}
            height={82}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={507}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            着弹点
          </text>
          <text
            x={507}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            首个偏离
          </text>
          <text
            x={507}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            未覆盖边界
          </text>

          <line
            x1={582}
            y1={117}
            x2={628}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={628}
            y={76}
            width={64}
            height={82}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={660}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            Next
          </text>
          <text
            x={660}
            y={124}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            Aim
          </text>
          <text
            x={660}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            单变量
          </text>

          <path
            d="M 660 158 C 660 212, 115 212, 115 158"
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
            重放同一输入；失败先回退，不扩大噪声
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="反馈不是终点，而是选择下一次最小变化的瞄准镜"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每一枪都应减少一个未知，并保留下一次重放的基线。
      </figcaption>
    </figure>
  );
}
