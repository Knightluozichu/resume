/** Tpp20Topic07DocumentationLoopDiagram：提示13的嵌入式文档回路。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic07DocumentationLoopDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="提示13：把文档嵌进去，而不要栓在表面：从代码、测试或决策源产生 Embedded Documentation，经过更新检查进入发布与行动，再由反馈回到源头。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="提示13：让文档跟随事实源更新"
          />

          <rect
            x={56}
            y={76}
            width={148}
            height={82}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={130}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            事实源
          </text>
          <text
            x={130}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            代码 / 契约测试
          </text>
          <text
            x={130}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            决策记录 / 配置
          </text>

          <line
            x1={204}
            y1={117}
            x2={242}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={242}
            y={76}
            width={166}
            height={82}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={325}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Embedded Documentation
          </text>
          <text
            x={325}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            说明 / 运行手册
          </text>
          <text
            x={325}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            源头链接 / owner
          </text>

          <line
            x1={408}
            y1={117}
            x2={446}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={446}
            y={76}
            width={218}
            height={82}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={555}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            更新检查
          </text>
          <text
            x={555}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            构建 / 发布 / 评审触发
          </text>
          <text
            x={555}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            过期即阻止或告警
          </text>

          <path
            d="M 555 158 C 555 214, 130 214, 130 158"
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
            反馈与变更回到事实源
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="文档不是表面装饰：源头变化必须能触发更新"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        把文档嵌入交付链，才能让事实变化带着说明一起前进。
      </figcaption>
    </figure>
  );
}
