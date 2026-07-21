/**
 * <Poeaa24Pattern28TemplateView>：模板视图结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 300;
export function Poeaa24Pattern28TemplateView() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="模板视图结构图。HTML 模板中嵌入动态标记，渲染时由引擎将 Model 数据填入标记位置，生成最终 HTML。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Template View：HTML + 动态标记" />
          {/* 模板 */}
          <rect x={48} y={64} width={260} height={140} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.5" />
          <rect x={48} y={64} width={260} height={28} rx="8" fill="#E5B567" fillOpacity="0.12" />
          <rect x={48} y={84} width={260} height={8} fill="#E5B567" fillOpacity="0.12" />
          <text x={178} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">order.html（模板）</text>
          <text x={64} y={112} fontSize="9" fontFamily="monospace" fill={T.primary}>&lt;h1&gt;{"{{order.id}}"}&lt;/h1&gt;</text>
          <text x={64} y={130} fontSize="9" fontFamily="monospace" fill={T.primary}>&lt;p&gt;{"{{order.total}}"}&lt;/p&gt;</text>
          <text x={64} y={148} fontSize="9" fontFamily="monospace" fill="#3FB97F">{"{{#each items}}"}</text>
          <text x={64} y={166} fontSize="9" fontFamily="monospace" fill={T.primary}>  &lt;li&gt;{"{{name}}"}&lt;/li&gt;</text>
          <text x={64} y={184} fontSize="9" fontFamily="monospace" fill="#3FB97F">{"{{/each}}"}</text>
          {/* 箭头 */}
          <line x1={308} y1={134} x2={380} y2={134} stroke={T.accent} strokeWidth="1.5" />
          <text x={344} y={126} textAnchor="middle" fontSize="9" fill={T.accent}>渲染引擎</text>
          {/* 输出 */}
          <rect x={380} y={64} width={290} height={140} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <rect x={380} y={64} width={290} height={28} rx="8" fill="#3FB97F" fillOpacity="0.12" />
          <rect x={380} y={84} width={290} height={8} fill="#3FB97F" fillOpacity="0.12" />
          <text x={525} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">最终 HTML（输出）</text>
          <text x={396} y={112} fontSize="9" fontFamily="monospace" fill={T.primary}>&lt;h1&gt;42&lt;/h1&gt;</text>
          <text x={396} y={130} fontSize="9" fontFamily="monospace" fill={T.primary}>&lt;p&gt;¥597.00&lt;/p&gt;</text>
          <text x={396} y={148} fontSize="9" fontFamily="monospace" fill={T.primary}>&lt;li&gt;Widget&lt;/li&gt;</text>
          <text x={396} y={166} fontSize="9" fontFamily="monospace" fill={T.primary}>&lt;li&gt;Gadget&lt;/li&gt;</text>
          <text x={396} y={184} fontSize="9" fill={T.secondary}>标记已替换为实际数据</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="模板 = 静态 HTML + 动态标记，渲染引擎将 Model 数据填入标记" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Template View 在 HTML 中嵌入动态标记（如 {"{{order.id}}"}），
        渲染引擎将 Model 数据填入标记位置生成最终 HTML。
      </figcaption>
    </figure>
  );
}
