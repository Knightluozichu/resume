/**
 * <RswTraitsGenericsDiagram>：Trait 与泛型的静态分发与动态分发。
 *
 * 展示 trait bound、单态化（静态分发）vs trait 对象（动态分发）。
 * Server Component，viewBox 720×400，CSS 变量配色。
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function RswTraitsGenericsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Trait 与泛型：静态分发单态化在编译期生成特化代码，动态分发 trait 对象通过虚表运行时调用。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Trait 与泛型：静态分发 vs 动态分发
          </text>

          {/* trait 定义 */}
          <rect x={250} y={50} width={220} height={50} rx="8" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.4" />
          <text x={360} y={72} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>trait Summary</text>
          <text x={360} y={90} textAnchor="middle" fontSize="10" fill={secondary}>fn summarize(&amp;self) -&gt; String</text>

          {/* 静态分发（左） */}
          <rect x={36} y={124} width={310} height={232} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={191} y={146} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>静态分发（单态化）</text>
          <text x={191} y={164} textAnchor="middle" fontSize="10" fill={secondary}>fn print&lt;T: Summary&gt;(item: &amp;T)</text>
          <rect x={60} y={180} width={120} height={40} rx="6" fill={elevated} stroke={border} />
          <text x={120} y={204} textAnchor="middle" fontSize="11" fill={primary}>NewsArticle</text>
          <rect x={200} y={180} width={120} height={40} rx="6" fill={elevated} stroke={border} />
          <text x={260} y={204} textAnchor="middle" fontSize="11" fill={primary}>Tweet</text>
          <line x1={120} y1={220} x2={120} y2={246} stroke={success} strokeWidth="1.2" markerEnd="url(#rsw-tg-s)" />
          <line x1={260} y1={220} x2={260} y2={246} stroke={success} strokeWidth="1.2" markerEnd="url(#rsw-tg-s)" />
          <rect x={60} y={246} width={120} height={34} rx="6" fill={success} fillOpacity="0.12" stroke={success} strokeDasharray="3 2" />
          <text x={120} y={267} textAnchor="middle" fontSize="10" fill={success}>print_NewsArticle</text>
          <rect x={200} y={246} width={120} height={34} rx="6" fill={success} fillOpacity="0.12" stroke={success} strokeDasharray="3 2" />
          <text x={260} y={267} textAnchor="middle" fontSize="10" fill={success}>print_Tweet</text>
          <text x={191} y={306} textAnchor="middle" fontSize="10" fill={secondary}>编译期为每个具体类型生成副本</text>
          <text x={191} y={322} textAnchor="middle" fontSize="10" fill={success}>零开销 · 无虚表 · 体积增大</text>
          <text x={191} y={342} textAnchor="middle" fontSize="10" fill={secondary}>调用直达函数地址</text>

          {/* 动态分发（右） */}
          <rect x={374} y={124} width={310} height={232} rx="10" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={529} y={146} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>动态分发（trait 对象）</text>
          <text x={529} y={164} textAnchor="middle" fontSize="10" fill={secondary}>fn print(item: &amp;dyn Summary)</text>
          <rect x={474} y={180} width={110} height={40} rx="6" fill={elevated} stroke={border} />
          <text x={529} y={198} textAnchor="middle" fontSize="11" fill={primary}>&amp;dyn Summary</text>
          <text x={529} y={214} textAnchor="middle" fontSize="9" fill={secondary}>data ptr + vtable ptr</text>
          <line x1={529} y1={220} x2={529} y2={246} stroke={warning} strokeWidth="1.2" markerEnd="url(#rsw-tg-d)" />
          <rect x={414} y={246} width={100} height={34} rx="6" fill={warning} fillOpacity="0.12" stroke={warning} strokeDasharray="3 2" />
          <text x={464} y={267} textAnchor="middle" fontSize="10" fill={warning}>vtable</text>
          <rect x={544} y={246} width={100} height={34} rx="6" fill={elevated} stroke={border} />
          <text x={594} y={267} textAnchor="middle" fontSize="10" fill={primary}>实际数据</text>
          <text x={529} y={306} textAnchor="middle" fontSize="10" fill={secondary}>运行时查虚表找函数地址</text>
          <text x={529} y={322} textAnchor="middle" fontSize="10" fill={warning}>一次间接跳转 · 体积小</text>
          <text x={529} y={342} textAnchor="middle" fontSize="10" fill={secondary}>异构集合可存同一 trait 对象</text>

          <defs>
            <marker id="rsw-tg-s" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
            <marker id="rsw-tg-d" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        泛型 + trait bound 走单态化静态分发；&amp;dyn trait 对象走虚表动态分发。
      </figcaption>
    </figure>
  );
}
