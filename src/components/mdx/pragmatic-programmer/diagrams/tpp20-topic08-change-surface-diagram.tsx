/** Tpp20Topic08ChangeSurfaceDiagram：8 优秀设计的变更触达与反馈链。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic08ChangeSurfaceDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="8 优秀设计的精髓变更链：提示14：优秀的设计比糟糕的设计更容易变更；从变化目标进入 Change Surface，经由最小修改和 Feedback Latency，最后以 Recovery Cost 验证恢复。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="8 优秀设计的精髓：变化必须可观察"
          />

          <rect
            x={30}
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
            x={101}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            变化目标
          </text>
          <text
            x={101}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            提示14
          </text>
          <text
            x={101}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            同一输入 / 边界
          </text>

          <line
            x1={172}
            y1={118}
            x2={202}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={202}
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
            x={273}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Change Surface
          </text>
          <text
            x={273}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            模块 / 数据
          </text>
          <text
            x={273}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            角色 / 工件
          </text>

          <line
            x1={344}
            y1={118}
            x2={374}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={374}
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
            x={445}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            最小修改
          </text>
          <text
            x={445}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            边界 / 所有者
          </text>
          <text
            x={445}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            首个偏离
          </text>

          <line
            x1={516}
            y1={118}
            x2={546}
            y2={118}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={546}
            y={72}
            width={144}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={618}
            y={98}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            反馈与恢复
          </text>
          <text
            x={618}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Feedback Latency
          </text>
          <text
            x={618}
            y={146}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Recovery Cost
          </text>

          <rect
            x={124}
            y={192}
            width={472}
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
            易变更不是感觉：要能测量、复核和回退
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="同一变化请求让设计差异显形"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        变更触达、反馈时间和恢复成本共同构成设计证据。
      </figcaption>
    </figure>
  );
}
