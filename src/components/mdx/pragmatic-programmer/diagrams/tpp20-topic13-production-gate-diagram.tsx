/** Tpp20Topic13ProductionGateDiagram：13 原型进入生产前的门禁。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic13ProductionGateDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="13 原型与便签生产门禁：提示21：用原型学习；原型结论经过 Discard Condition，若要进入 Production Boundary，必须补齐安全、数据、权限、并发、维护和恢复证据，否则丢弃或重写。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="提示21：原型结论必须经过生产门禁"
          />

          <rect
            x={44}
            y={76}
            width={160}
            height={84}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={124}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            原型结论
          </text>
          <text
            x={124}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            支持 / 否定 / 未覆盖
          </text>
          <text
            x={124}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            便签 / 证据
          </text>

          <line
            x1={204}
            y1={118}
            x2={252}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={252}
            y={76}
            width={166}
            height={84}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={335}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            Discard Condition
          </text>
          <text
            x={335}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            时间 / 风险 / 错误
          </text>
          <text
            x={335}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            丢弃或重写
          </text>

          <line
            x1={418}
            y1={118}
            x2={466}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={466}
            y={76}
            width={206}
            height={84}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={569}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            Production Boundary
          </text>
          <text
            x={569}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            安全 / 数据 / 权限
          </text>
          <text
            x={569}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            并发 / 维护 / 恢复
          </text>

          <rect
            x={140}
            y={196}
            width={440}
            height={25}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={360}
            y={213}
            textAnchor="middle"
            fontSize="11"
            fill={T.primary}
          >
            通过：重写后进入；不通过：丢弃并保留学习结论
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="原型成功只说明问题得到部分答案，不等于生产许可"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        生产门禁把可迁移结论与不可继承的临时结构分开。
      </figcaption>
    </figure>
  );
}
