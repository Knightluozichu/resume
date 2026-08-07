/** Tpp20Topic08DesignComparisonDiagram：8 优秀设计的双路径对照。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic08DesignComparisonDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="8 优秀设计的精髓设计对照：提示14：优秀的设计比糟糕的设计更容易变更；设计 A 让变化穿过业务流程，拥有较大的 Change Surface、较长 Feedback Latency 和较高 Recovery Cost；设计 B 把变化隔在适配边界，使用契约测试和可撤回路由。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="提示14：同一变化检验两种设计"
          />

          <rect
            x={42}
            y={70}
            width={276}
            height={112}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={180}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            设计 A：变化穿过流程
          </text>
          <text
            x={180}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            业务规则 / 全局配置 / 发布状态
          </text>
          <text
            x={180}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Surface 大 · 反馈晚 · 回滚重
          </text>
          <text
            x={180}
            y={170}
            textAnchor="middle"
            fontSize="11"
            fill="#D77A61"
          >
            共享状态扩散变化
          </text>

          <text
            x={360}
            y={128}
            textAnchor="middle"
            fontSize="20"
            fontWeight="700"
            fill={T.accent}
          >
            ⇄
          </text>
          <text
            x={360}
            y={151}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            同一变化请求
          </text>

          <rect
            x={402}
            y={70}
            width={276}
            height={112}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={540}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            设计 B：变化停在边界
          </text>
          <text
            x={540}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            适配器 / 稳定协议 / 契约测试
          </text>
          <text
            x={540}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Surface 小 · 反馈早 · 回滚轻
          </text>
          <text
            x={540}
            y={170}
            textAnchor="middle"
            fontSize="11"
            fill="#3FB97F"
          >
            变化可局部验证
          </text>

          <rect
            x={152}
            y={202}
            width={416}
            height={20}
            rx="7"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={360}
            y={216}
            textAnchor="middle"
            fontSize="11"
            fill={T.primary}
          >
            结论必须绑定约束、输入、反馈与恢复证据
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="比较的是变化行为，不是抽象层数量"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        设计对照把“更容易变更”落实为同一请求下的可观察差异。
      </figcaption>
    </figure>
  );
}
