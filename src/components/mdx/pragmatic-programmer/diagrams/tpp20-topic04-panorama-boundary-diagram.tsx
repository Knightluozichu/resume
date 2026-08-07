/** Tpp20Topic04PanoramaBoundaryDiagram：4 石头做的汤的全景复核与停止边界。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Topic04PanoramaBoundaryDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="4 石头做的汤的全景边界图：提示7：牢记全景，用 Panorama Check 观察用户、范围、系统、团队和成本，发现 Scope Drift 或风险越界时触发 Stop Rule，选择继续、缩小、回退或暂停。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="4 石头做的汤：全景复核与停止"
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
            提示7：牢记全景
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
            用户 / 系统 / 团队 / 成本
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
            Scope Drift / 风险转移
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
            Panorama Check
          </text>
          <text
            x={356}
            y={134}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            原始范围 / 新增承诺
          </text>
          <text
            x={356}
            y={156}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户结果 / 回滚能力
          </text>
          <text
            x={356}
            y={178}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            成本 / 参与分布
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
            Stop Rule
          </text>
          <text
            x={586}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            继续：信号稳定
          </text>
          <text
            x={586}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            缩小：成本 / 范围上升
          </text>
          <text
            x={586}
            y={166}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            回退：恢复可接受状态
          </text>
          <text
            x={586}
            y={188}
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            暂停：权限 / 安全越界
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="渐进不等于安全：让停止也成为设计的一部分"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        提示7让全景复核能够真正改变方向，发现范围漂移时及时停止而不是被投入绑架。
      </figcaption>
    </figure>
  );
}
