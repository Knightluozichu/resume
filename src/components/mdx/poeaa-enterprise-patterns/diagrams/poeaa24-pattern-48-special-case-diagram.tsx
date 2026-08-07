/**
 * <Poeaa24Pattern48SpecialCase>：特例结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720;
const VIEW_H = 300;
export function Poeaa24Pattern48SpecialCaseDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Special Case 结构图。用子类封装特殊情况的行为（如 NullCustomer），调用者无需到处写 null 检查，多态分派自动处理边界。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={36}
            text="Special Case：用子类封装特殊情况"
          />
          {/* 基类 */}
          <rect
            x={270}
            y={64}
            width={180}
            height={56}
            rx="8"
            fill={T.accent}
            fillOpacity="0.06"
            stroke={T.accent}
            strokeWidth="1.5"
          />
          <text
            x={360}
            y={86}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={T.accent}
          >
            Customer
          </text>
          <text
            x={360}
            y={106}
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            getBillingPlan()
          </text>
          {/* 继承箭头 */}
          <line
            x1={310}
            y1={120}
            x2={180}
            y2={152}
            stroke={T.border}
            strokeWidth="1.2"
          />
          <line
            x1={410}
            y1={120}
            x2={540}
            y2={152}
            stroke={T.border}
            strokeWidth="1.2"
          />
          {/* 正常子类 */}
          <rect
            x={80}
            y={152}
            width={200}
            height={56}
            rx="6"
            fill="#3FB97F"
            fillOpacity="0.06"
            stroke="#3FB97F"
            strokeWidth="1"
          />
          <text
            x={180}
            y={174}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="#3FB97F"
          >
            RealCustomer
          </text>
          <text
            x={180}
            y={194}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            正常计费逻辑
          </text>
          {/* 特例子类 */}
          <rect
            x={440}
            y={152}
            width={200}
            height={56}
            rx="6"
            fill="#E5B567"
            fillOpacity="0.06"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={540}
            y={174}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="#E5B567"
          >
            NullCustomer（特例）
          </text>
          <text
            x={540}
            y={194}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            返回默认值，不抛异常
          </text>
          {/* 底部说明 */}
          <rect
            x={48}
            y={228}
            width={624}
            height={48}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text x={64} y={248} fontSize="11" fill={T.secondary}>
            • 调用者：customer.getBillingPlan() — 无需 if (customer == null)
          </text>
          <text x={64} y={266} fontSize="11" fill={T.secondary}>
            • 多态分派自动处理边界，特殊情况的行为集中在一处
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 8}
            text="特例子类封装边界行为，调用者无需到处写 null 检查"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Special Case 用子类封装特殊情况的行为（如 NullCustomer），
        调用者无需到处写 null 检查，多态分派自动处理边界。
      </figcaption>
    </figure>
  );
}
