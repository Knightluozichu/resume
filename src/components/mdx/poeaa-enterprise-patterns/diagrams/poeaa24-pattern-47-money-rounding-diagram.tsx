/**
 * Poeaa24Pattern47MoneyRoundingDiagram：18.7 货币舍入与换汇图。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Pattern47MoneyRoundingDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="18.7 货币舍入与换汇边界。金额先规范化为最小单位，经过税额或除法计算，再由 Rounding Policy 在结算边界舍入；跨币种需要带来源和时间的 Exchange Rate，最后才格式化展示。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="18.7 货币：计算、舍入与换汇顺序"
          />

          <rect
            x={34}
            y={70}
            width={142}
            height={92}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={105}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            Minor Unit
          </text>
          <text
            x={105}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            整数金额
          </text>
          <text
            x={105}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            币种精度
          </text>

          <line
            x1={176}
            y1={116}
            x2={210}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={210}
            y={70}
            width={142}
            height={92}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={281}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            计算
          </text>
          <text
            x={281}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            税 / 折扣 / 除法
          </text>
          <text
            x={281}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            保留中间值
          </text>

          <line
            x1={352}
            y1={116}
            x2={386}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={386}
            y={58}
            width={154}
            height={116}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={463}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            Rounding Policy
          </text>
          <text
            x={463}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            结算边界
          </text>
          <text
            x={463}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            模式 + 归属
          </text>
          <text
            x={463}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            差额可追踪
          </text>

          <line
            x1={540}
            y1={116}
            x2={574}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={574}
            y={70}
            width={112}
            height={92}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={630}
            y={96}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            换汇 / 展示
          </text>
          <text
            x={630}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            汇率来源
          </text>
          <text
            x={630}
            y={144}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            最终格式化
          </text>

          <rect
            x={112}
            y={192}
            width={496}
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
            内部精度、结算精度和展示精度分别声明
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="舍入发生在业务边界，不发生在最后一行格式化"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        最小单位承载精确计算，舍入策略决定结算差额，换汇和展示各有独立证据。
      </figcaption>
    </figure>
  );
}
