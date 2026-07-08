/**
 * <UhmInputHandlingDiagram>：输入处理与交互响应图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UhmInputHandlingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="输入处理与交互响应图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            HMI 输入处理：多设备统一路由
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            物理输入 → 逻辑动作 → 防抖去重 → UI 响应
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="110" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="125" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">触摸屏</text>
          <text x="125" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Pointer</text>

          <rect x="195" y="100" width="110" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="250" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">物理旋钮</text>
          <text x="250" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Axis</text>

          <rect x="320" y="100" width="110" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="375" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">方向盘键</text>
          <text x="375" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Button</text>

          <rect x="445" y="100" width="110" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="500" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">语音</text>
          <text x="500" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Voice</text>

          <text x="590" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="590" y="144" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">统一</text>

          <rect x="70" y="172" width="580" height="50" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="194" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Input Action Asset（逻辑动作映射）</text>
          <text x={VIEW_W / 2} y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Confirm / Cancel / Navigate / Select / Back</text>

          <text x={VIEW_W / 2} y="240" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="150" y="250" width="420" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="272" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">防抖去重（100-300ms 时间窗口）</text>
          <text x={VIEW_W / 2} y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">同一动作窗口内只处理第一次</text>

          <text x={VIEW_W / 2} y="318" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="200" y="328" width="320" height="36" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="350" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">焦点 UI 元素响应（&lt;50ms）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        HMI 输入处理——多设备统一路由与防抖去重机制
      </figcaption>
    </figure>
  );
}
