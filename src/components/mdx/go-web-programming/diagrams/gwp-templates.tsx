/**
 * <GwpTemplatesDiagram>: Go 模板渲染流程。
 *
 * 展示 html/template 的解析→执行流程，模板继承/组合，
 * 以及上下文感知转义（Context-Aware Escaping）。
 * 纯静态 SVG，Server Component。viewBox 720x400。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function GwpTemplatesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Go html/template 模板渲染流程图。展示模板解析、数据注入、上下文感知转义到最终 HTML 输出。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            html/template 模板渲染流程
          </text>

          {/* 模板文件 */}
          <rect x={40} y={60} width={150} height={90} rx="8" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x={115} y={84} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>模板文件</text>
          <text x={115} y={102} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={secondary}>&lt;h1&gt;{{.Title}}&lt;/h1&gt;</text>
          <text x={115} y={118} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={secondary}>&lt;p&gt;{{.Body}}&lt;/p&gt;</text>
          <text x={115} y={138} textAnchor="middle" fontSize="9" fill={secondary}>.tmpl / .html</text>

          {/* 数据 */}
          <rect x={40} y={170} width={150} height={60} rx="8" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1.5" />
          <text x={115} y={194} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>数据 (Data)</text>
          <text x={115} y={212} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={secondary}>struct { Title string }</text>

          {/* 解析阶段 */}
          <rect x={240} y={60} width={200} height={90} rx="8" fill={elevated} stroke={success} strokeWidth="1.5" />
          <text x={340} y={84} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>template.Parse()</text>
          <line x1={255} y1={92} x2={425} y2={92} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <text x={340} y={110} textAnchor="middle" fontSize="10" fill={secondary}>词法分析 → 语法树</text>
          <text x={340} y={126} textAnchor="middle" fontSize="10" fill={secondary}>{{}} → Action 节点</text>
          <text x={340} y={142} textAnchor="middle" fontSize="10" fill={secondary}>文本 → Text 节点</text>

          {/* 执行阶段 */}
          <rect x={240} y={170} width={200} height={60} rx="8" fill={elevated} stroke={danger} strokeWidth="1.5" />
          <text x={340} y={194} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>template.Execute()</text>
          <text x={340} y={214} textAnchor="middle" fontSize="10" fill={secondary}>遍历 AST + 注入数据</text>

          {/* 转义层 */}
          <rect x={480} y={60} width={200} height={200} rx="8" fill={elevated} stroke={border} strokeWidth="1.2" />
          <text x={580} y={84} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>上下文感知转义</text>
          <line x1={495} y1={92} x2={665} y2={92} stroke={border} strokeWidth="1" strokeDasharray="3 2" />

          <rect x={495} y={100} width={170} height={28} rx="5" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
          <text x={580} y={118} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={success}>HTML 上下文</text>
          <text x={580} y={240} textAnchor="middle" fontSize="9" fill={secondary}>&lt; → &amp;lt;</text>

          <rect x={495} y={136} width={170} height={28} rx="5" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1" />
          <text x={580} y={154} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={warning}>JS 上下文</text>
          <text x={580} y={224} textAnchor="middle" fontSize="9" fill={secondary}>" → \&quot;</text>

          <rect x={495} y={172} width={170} height={28} rx="5" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1" />
          <text x={580} y={190} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={accent}>URL 上下文</text>
          <text x={580} y={208} textAnchor="middle" fontSize="9" fill={secondary}>&amp; → %26</text>

          {/* 输出 */}
          <rect x={240} y={260} width={440} height={60} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.5" />
          <text x={460} y={284} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>安全 HTML 输出 → http.ResponseWriter</text>
          <text x={460} y={302} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={secondary}>&lt;h1&gt;Hello &amp;amp; World&lt;/h1&gt;</text>

          {/* 箭头 */}
          <line x1={190} y1={105} x2={235} y2={105} stroke={secondary} strokeWidth="1.5" markerEnd="url(#gwp-tpl-a1)" />
          <line x1={190} y1={200} x2={235} y2={200} stroke={secondary} strokeWidth="1.5" markerEnd="url(#gwp-tpl-a1)" />
          <line x1={340} y1={150} x2={340} y2={165} stroke={secondary} strokeWidth="1.5" markerEnd="url(#gwp-tpl-a1)" />
          <line x1={440} y1={200} x2={475} y2={160} stroke={secondary} strokeWidth="1.5" markerEnd="url(#gwp-tpl-a1)" />
          <line x1={460} y1={260} x2={460} y2={255} stroke={secondary} strokeWidth="1.5" />

          {/* 底部提示 */}
          <text x={VIEW_W / 2} y={350} textAnchor="middle" fontSize="10" fill={danger}>关键：html/template 自动转义，text/template 不转义</text>
          <text x={VIEW_W / 2} y={366} textAnchor="middle" fontSize="10" fill={secondary}>模板组合：{{template "name" .}} + {{define "name"}}...{{end}}</text>
          <text x={VIEW_W / 2} y={382} textAnchor="middle" fontSize="10" fill={secondary}>常用函数：range / if / with / index / printf</text>

          <defs>
            <marker id="gwp-tpl-a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        html/template 解析模板为 AST，执行时注入数据并按上下文自动转义。
      </figcaption>
    </figure>
  );
}
