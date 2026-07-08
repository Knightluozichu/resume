/**
 * <UidUitoolkitDiagram>: UI Toolkit 架构
 *
 * UXML(结构) + USS(样式) + C#(逻辑) 三层分离
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function UidUitoolkitDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="UI Toolkit架构。UXML结构层、USS样式层、C#逻辑层三层分离。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            UI Toolkit 架构
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            UXML(结构) + USS(样式) + C#(逻辑) 三层分离
          </text>
          {/* UXML */}
          <g>
            <rect x={36} y={76} width={206} height={120} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={139} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>UXML 结构层</text>
            <text x={52} y={120} fontSize="11" fill={primary}>类似 HTML</text>
            <text x={52} y={138} fontSize="11" fill={secondary}>定义元素层级</text>
            <text x={52} y={156} fontSize="11" fill={primary}>VisualElement 树</text>
            <text x={52} y={174} fontSize="11" fill={secondary}>Label/Button/</text>
            <text x={52} y={188} fontSize="11" fill={secondary}>ListView/Foldout</text>
          </g>
          {/* USS */}
          <g>
            <rect x={257} y={76} width={206} height={120} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={360} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>USS 样式层</text>
            <text x={273} y={120} fontSize="11" fill={primary}>类似 CSS</text>
            <text x={273} y={138} fontSize="11" fill={secondary}>选择器+属性</text>
            <text x={273} y={156} fontSize="11" fill={primary}>支持 Flexbox 布局</text>
            <text x={273} y={174} fontSize="11" fill={secondary}>.class / #name /</text>
            <text x={273} y={188} fontSize="11" fill={secondary}>:hover / :active</text>
          </g>
          {/* C# */}
          <g>
            <rect x={478} y={76} width={206} height={120} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={581} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>C# 逻辑层</text>
            <text x={494} y={120} fontSize="11" fill={primary}>UIDocument 组件</text>
            <text x={494} y={138} fontSize="11" fill={secondary}>Query 查询元素</text>
            <text x={494} y={156} fontSize="11" fill={primary}>事件注册</text>
            <text x={494} y={174} fontSize="11" fill={secondary}>root.Q&lt;Button&gt;()</text>
            <text x={494} y={188} fontSize="11" fill={secondary}>.RegisterCallback()</text>
          </g>
          {/* 对比 UGUI */}
          <g>
            <rect x={36} y={210} width={648} height={86} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={52} y={232} fontSize="12" fontWeight="700" fill={primary}>UI Toolkit vs UGUI</text>
            <text x={52} y={250} fontSize="11" fill={success}>UI Toolkit: 结构/样式/逻辑分离，Flexbox 布局，保留模式渲染，适合编辑器和复杂面板</text>
            <text x={52} y={266} fontSize="11" fill={warning}>UGUI: 基于 GameObject，即时模式渲染，深度集成游戏对象，适合运行时游戏 UI</text>
            <text x={52} y={284} fontSize="11" fill={secondary}>关键区别：UI Toolkit 不创建 GameObject，VisualElement 是轻量数据对象，渲染走保留模式</text>
          </g>
          {/* 底部总结 */}
          <g>
            <rect x={36} y={308} width={648} height={66} rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
            <text x={360} y={330} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>核心优势：UXML/USS 分离关注点，支持 Flexbox 自动布局，保留模式避免每帧重建</text>
            <text x={360} y={350} textAnchor="middle" fontSize="11" fill={secondary}>UI Debugger 实时调试，样式复用率高，适合数据驱动的复杂界面</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        UI Toolkit 三层架构：UXML 定义结构、USS 控制样式、C# 处理逻辑，类似 Web 开发模式。
      </figcaption>
    </figure>
  );
}
