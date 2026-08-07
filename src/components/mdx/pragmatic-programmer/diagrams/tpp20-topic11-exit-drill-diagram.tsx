/** Tpp20Topic11ExitDrillDiagram：11 可逆性的退出演练回路。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic11ExitDrillDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="11 可逆性退出演练：提示18：不设最终决定与提示19：放弃追逐时尚；从 Decision Deadline 触发 Exit Path，依次关闭新流量、恢复旧路径、重放数据、通知责任人和运行回归，若失败则回到 Adapter Boundary 修复。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="11 可逆性：退出路径必须真的能走"
          />

          <rect
            x={42}
            y={76}
            width={132}
            height={82}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={108}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Decision Deadline
          </text>
          <text
            x={108}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            证据不足 / 失败
          </text>
          <text
            x={108}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            触发退出
          </text>

          <line
            x1={174}
            y1={117}
            x2={214}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={214}
            y={76}
            width={132}
            height={82}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={280}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            关闭流量
          </text>
          <text
            x={280}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            开关 / 租户
          </text>
          <text
            x={280}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            记录时间
          </text>

          <line
            x1={346}
            y1={117}
            x2={386}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={386}
            y={76}
            width={132}
            height={82}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={452}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            恢复旧路径
          </text>
          <text
            x={452}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            旧版本 / 适配器
          </text>
          <text
            x={452}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            安全状态
          </text>

          <line
            x1={518}
            y1={117}
            x2={558}
            y2={117}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={558}
            y={76}
            width={122}
            height={82}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={619}
            y={102}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            数据 / 通知
          </text>
          <text
            x={619}
            y={128}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            重放 / 责任人
          </text>
          <text
            x={619}
            y={148}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            回归 / 结论
          </text>

          <path
            d="M 619 158 C 619 212, 108 212, 108 158"
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
            发现首个失配：回到 Adapter Boundary 修复，不扩大流量
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="退出演练把回滚、数据、通知和回归连成一条责任链"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        能否安全退出，要由真实边界上的演练而不是按钮存在来证明。
      </figcaption>
    </figure>
  );
}
