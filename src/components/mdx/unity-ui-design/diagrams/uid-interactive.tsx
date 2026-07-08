/**
 * <UidInteractiveDiagram>: UGUI 交互组件体系
 *
 * Selectable基类 -> Button/Toggle/Slider/ScrollBar/ScrollRect/Dropdown
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function UidInteractiveDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="UGUI 交互组件体系。Selectable基类及其派生组件。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            UGUI 交互组件体系
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            Selectable 基类 -> 六大交互组件 + 事件接口
          </text>
          {/* Selectable 基类 */}
          <g>
            <rect x={260} y={76} width={200} height={50} rx="8" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
            <text x={360} y={98} textAnchor="middle" fontSize="14" fontWeight="700" fill={accent}>Selectable</text>
            <text x={360} y={116} textAnchor="middle" fontSize="11" fill={secondary}>状态切换 + 导航 + 过渡</text>
          </g>
          {/* 连接线 */}
          <line x1={360} y1={126} x2={360} y2={142} stroke={border} strokeWidth="1.5" />
          <line x1={90} y1={142} x2={630} y2={142} stroke={border} strokeWidth="1.5" />
          {[90, 234, 378, 522, 630].map((x) => (
            <line key={x} x1={x} y1={142} x2={x} y2={154} stroke={border} strokeWidth="1.5" markerEnd="url(#uidInteractive-arrow)" />
          ))}
          {/* 六大组件 */}
          <g>
            <rect x={36} y={156} width={108} height={56} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={90} y={178} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>Button</text>
            <text x={90} y={196} textAnchor="middle" fontSize="11" fill={secondary}>IPointerClick</text>
          </g>
          <g>
            <rect x={180} y={156} width={108} height={56} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={234} y={178} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>Toggle</text>
            <text x={234} y={196} textAnchor="middle" fontSize="11" fill={secondary}>onValueChanged</text>
          </g>
          <g>
            <rect x={324} y={156} width={108} height={56} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={378} y={178} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>Slider</text>
            <text x={378} y={196} textAnchor="middle" fontSize="11" fill={secondary}>min~max范围</text>
          </g>
          <g>
            <rect x={468} y={156} width={108} height={56} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={522} y={178} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>ScrollBar</text>
            <text x={522} y={196} textAnchor="middle" fontSize="11" fill={secondary}>滚动条</text>
          </g>
          <g>
            <rect x={576} y={156} width={108} height={56} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={630} y={178} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>Dropdown</text>
            <text x={630} y={196} textAnchor="middle" fontSize="11" fill={secondary}>下拉菜单</text>
          </g>
          {/* 事件接口 */}
          <g>
            <rect x={36} y={226} width={324} height={72} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={248} fontSize="13" fontWeight="700" fill={success}>指针事件接口</text>
            <text x={52} y={268} fontSize="11" fill={primary}>IPointerEnter / IPointerExit</text>
            <text x={52} y={284} fontSize="11" fill={primary}>IPointerDown / IPointerUp</text>
            <text x={200} y={268} fontSize="11" fill={primary}>IPointerClick</text>
            <text x={200} y={284} fontSize="11" fill={primary}>IBeginDrag / IDrag / IEndDrag</text>
          </g>
          {/* 过渡模式 */}
          <g>
            <rect x={374} y={226} width={310} height={72} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={390} y={248} fontSize="13" fontWeight="700" fill={warning}>过渡模式 (Transition)</text>
            <text x={390} y={268} fontSize="11" fill={primary}>None / ColorTint</text>
            <text x={390} y={284} fontSize="11" fill={primary}>SpriteSwap / Animation</text>
            <text x={540} y={268} fontSize="11" fill={secondary}>颜色/精灵/动画</text>
            <text x={540} y={284} fontSize="11" fill={secondary}>四种状态切换</text>
          </g>
          {/* 底部总结 */}
          <g>
            <rect x={36} y={312} width={648} height={60} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={334} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>交互组件 = Selectable + 事件接口 + 过渡效果</text>
            <text x={360} y={354} textAnchor="middle" fontSize="11" fill={secondary}>正常(Normal)/高亮(Highlighted)/按下(Pressed)/禁用(Disabled) 四种状态</text>
          </g>
          <defs>
            <marker id="uidInteractive-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        交互组件体系：Selectable 基类提供状态管理，派生组件实现各自事件接口。
      </figcaption>
    </figure>
  );
}
