/**
 * Poeaa24Pattern47MoneyDiagram：18.7 货币结构图。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Pattern47MoneyDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="18.7 货币。价格、税额和退款输入进入 Money 值对象，金额以 Minor Unit 和 Currency 组合，Money 只允许同币种算术；显式汇率服务负责换汇和来源记录。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="18.7 货币：金额、币种与算术边界"
          />

          <rect
            x={34}
            y={70}
            width={146}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={107}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            价格 / 税 / 退款
          </text>
          <text
            x={107}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            外部输入
          </text>
          <text
            x={107}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            规范化
          </text>

          <line
            x1={180}
            y1={116}
            x2={222}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={222}
            y={58}
            width={198}
            height={116}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={321}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            Money
          </text>
          <text
            x={321}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Minor Unit + Currency
          </text>
          <text
            x={321}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            加减 / 比较
          </text>
          <text
            x={321}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            跨币种 → 拒绝
          </text>

          <line
            x1={420}
            y1={116}
            x2={462}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={462}
            y={70}
            width={108}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={516}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            结算边界
          </text>
          <text
            x={516}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Rounding Policy
          </text>
          <text
            x={516}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            结算金额
          </text>

          <line
            x1={570}
            y1={116}
            x2={600}
            y2={116}
            stroke={T.border}
            strokeWidth="1.2"
          />
          <rect
            x={600}
            y={70}
            width={86}
            height={92}
            rx="8"
            fill={T.primary}
            fillOpacity="0.04"
            stroke={T.border}
            strokeWidth="1.2"
          />
          <text
            x={643}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            Exchange Rate
          </text>
          <text
            x={643}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            来源 / 时间
          </text>
          <text
            x={643}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            显式换汇
          </text>

          <rect
            x={104}
            y={192}
            width={512}
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
            Money 不猜汇率；舍入与换汇都必须留下可重放证据
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="把货币错误变成边界上的明确拒绝"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        货币对象集中最小单位和同币种算术，舍入与换汇分别由明确策略和服务承担。
      </figcaption>
    </figure>
  );
}
