/**
 * <Poeaa24OfficialFinalReviewDiagram>：全书架构复核地图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 360;

export function Poeaa24OfficialFinalReviewDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="企业应用架构全书复核地图。请求经过 Web 表示、领域事务、数据映射、并发会话与分布边界，每个模式选择都回到证据卡复核。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={36}
            text="全书复核：问题 → 模式族 → 证据 → 替代"
          />

          <rect
            x={34}
            y={66}
            width={112}
            height={54}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={90}
            y={89}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#E5B567"
          >
            请求入口
          </text>
          <text
            x={90}
            y={107}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            用户问题
          </text>

          <line
            x1={146}
            y1={93}
            x2={176}
            y2={93}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={176}
            y={66}
            width={112}
            height={54}
            rx="8"
            fill={T.accent}
            fillOpacity="0.08"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={232}
            y={89}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={T.accent}
          >
            Web 表示
          </text>
          <text
            x={232}
            y={107}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            输入与输出
          </text>

          <line
            x1={288}
            y1={93}
            x2={318}
            y2={93}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={318}
            y={66}
            width={112}
            height={54}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.08"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={374}
            y={89}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#3FB97F"
          >
            领域事务
          </text>
          <text
            x={374}
            y={107}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            规则与身份
          </text>

          <line
            x1={430}
            y1={93}
            x2={460}
            y2={93}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={460}
            y={66}
            width={112}
            height={54}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={516}
            y={89}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#E5B567"
          >
            数据与并发
          </text>
          <text
            x={516}
            y={107}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            映射与一致性
          </text>

          <line
            x1={572}
            y1={93}
            x2={602}
            y2={93}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={602}
            y={66}
            width={84}
            height={54}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.08"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={644}
            y={89}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#3FB97F"
          >
            分布边界
          </text>
          <text
            x={644}
            y={107}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            远程与会话
          </text>

          <rect
            x={74}
            y={158}
            width={572}
            height={76}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={360}
            y={182}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            每次选择都填写同一张证据卡
          </text>
          <text
            x={360}
            y={204}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            责任 · 变化 · 失败 · 替代 · 可观测结果
          </text>
          <text
            x={360}
            y={222}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            没有证据就不把模式名称当作结论
          </text>

          <line
            x1={360}
            y1={120}
            x2={360}
            y2={158}
            stroke={T.accent}
            strokeWidth="1.4"
            strokeDasharray="5 3"
          />
          <line
            x1={360}
            y1={234}
            x2={360}
            y2={272}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={174}
            y={272}
            width={372}
            height={52}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={360}
            y={295}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#E5B567"
          >
            独立复核：采用、替换或拒绝
          </text>
          <text
            x={360}
            y={313}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            重放故障 · 检查来源 · 验证回滚路径
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="复习的终点不是背诵模式，而是用证据复核架构选择"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书复核把表示、领域、数据、并发、会话和分布串成一条证据链，最终回到采用、替换或拒绝的架构裁决。
      </figcaption>
    </figure>
  );
}
