/** Tpp20Chapter02ChangeabilityMapDiagram：第2章从目标到可变更边界的地图。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Chapter02ChangeabilityMapDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第2章 务实的方法可变更地图：从第2章 务实的方法与提示14：优秀的设计比糟糕的设计更容易变更开始，经过提示15：DRY——不要重复自己、提示17：消除不相关事物之间的影响、提示18：不设最终决定，连接提示20：使用曳光弹找到目标和提示22：靠近问题域编程，最后由提示23：通过估算来避免意外与提示24：根据代码不断迭代进度表反馈。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="第2章：用可变更性组织设计方法"
          />

          <rect
            x={26}
            y={72}
            width={134}
            height={94}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={93}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            可变更目标
          </text>
          <text
            x={93}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            提示14
          </text>
          <text
            x={93}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            触达 / 反馈 / 恢复
          </text>

          <line
            x1={160}
            y1={119}
            x2={184}
            y2={119}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={184}
            y={72}
            width={134}
            height={94}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={251}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            知识单源
          </text>
          <text
            x={251}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            DRY / 复用
          </text>
          <text
            x={251}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            提示15 / 16
          </text>

          <line
            x1={318}
            y1={119}
            x2={342}
            y2={119}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={342}
            y={72}
            width={134}
            height={94}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={409}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            独立边界
          </text>
          <text
            x={409}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            正交 / 可逆
          </text>
          <text
            x={409}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            提示17 / 18 / 19
          </text>

          <line
            x1={476}
            y1={119}
            x2={500}
            y2={119}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={500}
            y={72}
            width={194}
            height={94}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={597}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            反馈与估算
          </text>
          <text
            x={597}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            曳光 / 原型 / 领域语言
          </text>
          <text
            x={597}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            提示20–24
          </text>

          <rect
            x={118}
            y={192}
            width={484}
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
            方法不是清单：变化必须能被测量、回退和重估
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="从可变更目标出发，用反馈校准下一次承诺"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        第2章的设计方法共同减少变化的触达和未知的代价。
      </figcaption>
    </figure>
  );
}
