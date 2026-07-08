/**
 * <UscComponentSystemDiagram>: Unity 组件系统架构
 *
 * GameObject(容器) + Component(功能模块) + GetComponent(通信)
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function UscComponentSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity组件系统架构。GameObject容器挂载多个Component组件，通过GetComponent通信。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Unity 组件系统架构
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            GameObject(容器) + Component(功能模块) + GetComponent(通信)
          </text>
          {/* GameObject 容器 */}
          <g>
            <rect x={180} y={76} width={360} height={180} rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.5" strokeDasharray="4 2" />
            <text x={360} y={96} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>GameObject (Player)</text>
            {/* Transform */}
            <rect x={200} y={108} width={150} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={275} y={130} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Transform</text>
            {/* MeshRenderer */}
            <rect x={370} y={108} width={150} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={445} y={130} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>MeshRenderer</text>
            {/* 自定义脚本 */}
            <rect x={200} y={156} width={150} height={36} rx="6" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
            <text x={275} y={178} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>PlayerMovement</text>
            <rect x={370} y={156} width={150} height={36} rx="6" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
            <text x={445} y={178} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>PlayerCombat</text>
            <rect x={200} y={204} width={150} height={36} rx="6" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
            <text x={275} y={226} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>Health</text>
            <rect x={370} y={204} width={150} height={36} rx="6" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
            <text x={445} y={226} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>Inventory</text>
          </g>
          {/* 通信方式 */}
          <g>
            <rect x={36} y={270} width={206} height={80} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={292} fontSize="13" fontWeight="700" fill={warning}>GetComponent</text>
            <text x={52} y={312} fontSize="11" fill={primary}>同对象组件通信</text>
            <text x={52} y={328} fontSize="11" fill={secondary}>GetComponent&lt;T&gt;()</text>
            <text x={52} y={344} fontSize="11" fill={secondary}>GetComponents&lt;T&gt;()</text>
          </g>
          <g>
            <rect x={257} y={270} width={206} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={273} y={292} fontSize="13" fontWeight="700" fill={success}>FindObject</text>
            <text x={273} y={312} fontSize="11" fill={primary}>跨对象通信</text>
            <text x={273} y={328} fontSize="11" fill={secondary}>FindObjectOfType&lt;T&gt;()</text>
            <text x={273} y={344} fontSize="11" fill={secondary}>FindObjectsOfType&lt;T&gt;()</text>
          </g>
          <g>
            <rect x={478} y={270} width={206} height={80} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={494} y={292} fontSize="13" fontWeight="700" fill={accent}>事件系统</text>
            <text x={494} y={312} fontSize="11" fill={primary}>解耦通信</text>
            <text x={494} y={328} fontSize="11" fill={secondary}>UnityEvent / C# event</text>
            <text x={494} y={344} fontSize="11" fill={secondary}>观察者模式</text>
          </g>
          <text x={360} y={374} textAnchor="middle" fontSize="11" fill={secondary}>核心原则：组合优于继承，组件职责单一，通过事件解耦</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        组件系统：GameObject 挂载多个 Component，GetComponent 同对象通信，事件系统跨对象解耦。
      </figcaption>
    </figure>
  );
}
