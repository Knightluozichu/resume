/** Tpp20Topic14ErrorLocalizationDiagram：14 领域语言的错误定位路径。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic14ErrorLocalizationDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="14 领域语言错误定位：提示22：靠近问题域编程；输入经过语法解析和 Semantic Boundary 校验，若失败由 Error Localization 指向领域词汇、字段、规则和修复建议，否则进入执行和用户反馈。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="14 领域语言：错误要回到规则位置"
          />

          <rect
            x={38}
            y={76}
            width={142}
            height={82}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={109}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            领域表达
          </text>
          <text
            x={109}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            词汇 / DSL / 输入
          </text>
          <text
            x={109}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            版本 / 位置
          </text>

          <line
            x1={180}
            y1={117}
            x2={224}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={224}
            y={76}
            width={148}
            height={82}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={298}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            解析 + 语义校验
          </text>
          <text
            x={298}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            语法 / 类型
          </text>
          <text
            x={298}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Semantic Boundary
          </text>

          <line
            x1={372}
            y1={117}
            x2={416}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={416}
            y={76}
            width={148}
            height={82}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={490}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            Error Localization
          </text>
          <text
            x={490}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            字段 / 规则 / 位置
          </text>
          <text
            x={490}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            修复建议
          </text>

          <line
            x1={564}
            y1={117}
            x2={608}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={608}
            y={76}
            width={76}
            height={82}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={646}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            执行
          </text>
          <text
            x={646}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            合法
          </text>
          <text
            x={646}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            反馈
          </text>

          <path
            d="M 490 158 C 490 206, 109 206, 109 158"
            fill="none"
            stroke="#D77A61"
            strokeWidth="1.4"
            strokeDasharray="5 4"
          />
          <text
            x={360}
            y={201}
            textAnchor="middle"
            fontSize="11"
            fill="#D77A61"
          >
            非法即回到领域词汇与规则，不吞成通用异常
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="错误定位把技术失败翻译成可行动的领域反馈"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        领域错误应告诉人哪里不符合哪条规则，以及如何继续。
      </figcaption>
    </figure>
  );
}
