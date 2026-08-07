/** Tpp20Topic02OptionRecoveryDiagram：2 我的源码被猫吃了的选项、时限与回归边界。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic02OptionRecoveryDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="2 我的源码被猫吃了的恢复边界图：Recovery Options 带着代价和批准边界进入 Recovery Window，经过正常、边界和依赖失效样本形成 Regression Evidence，决定继续、降级、回滚或暂停。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="2 我的源码被猫吃了：选项与回归边界"
          />

          <rect
            x={38}
            y={68}
            width={170}
            height={40}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={123}
            y={93}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#3FB97F"
          >
            Recovery Options：恢复 / 降级
          </text>
          <rect
            x={38}
            y={118}
            width={170}
            height={40}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={123}
            y={143}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#E5B567"
          >
            代价 / 批准人 / 用户动作
          </text>
          <rect
            x={38}
            y={168}
            width={170}
            height={40}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={123}
            y={193}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#D77A61"
          >
            Recovery Window：阶段承诺
          </text>

          <line
            x1={208}
            y1={138}
            x2={266}
            y2={138}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={266}
            y={82}
            width={180}
            height={112}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <text
            x={356}
            y={108}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            样本验证
          </text>
          <text
            x={356}
            y={134}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            正常：服务恢复
          </text>
          <text
            x={356}
            y={156}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            边界：权限 / 数据 / 并发
          </text>
          <text
            x={356}
            y={178}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            失效：回滚 / 防复发
          </text>

          <line
            x1={446}
            y1={138}
            x2={486}
            y2={138}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={486}
            y={68}
            width={200}
            height={140}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1.2"
          />
          <text
            x={586}
            y={94}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            Regression Evidence
          </text>
          <text
            x={586}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            通过：继续并关闭
          </text>
          <text
            x={586}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            缺口：继续观察
          </text>
          <text
            x={586}
            y={166}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            失败：回滚或降级
          </text>
          <text
            x={586}
            y={188}
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            越界：暂停并升级
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="恢复不是一句好了，而是一组可复核证据"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Recovery Options 需要时限与代价，Regression Evidence
        决定能否继续扩大恢复范围。
      </figcaption>
    </figure>
  );
}
