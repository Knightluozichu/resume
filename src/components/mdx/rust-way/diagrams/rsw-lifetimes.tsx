/**
 * <RswLifetimesDiagram>：生命周期标注与引用有效性。
 *
 * 展示 'a 标注如何约束引用关系，以及悬垂引用为何被编译器拒绝。
 * Server Component，viewBox 720×400，CSS 变量配色。
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const danger = "var(--danger)";
const success = "var(--success)";

export function RswLifetimesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="生命周期标注：函数签名的 'a 约束输入输出引用同寿，悬垂引用被编译器拒绝。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            生命周期：编译期追踪引用有效性
          </text>

          {/* 合法： longest 函数 */}
          <rect x={36} y={54} width={380} height={200} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={226} y={76} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>合法：同寿引用</text>
          <text x={226} y={94} textAnchor="middle" fontSize="10" fill={secondary}>fn longest&lt;&apos;a&gt;(x: &amp;&apos;a str, y: &amp;&apos;a str) -&gt; &amp;&apos;a str</text>
          {/* 时间轴 x */}
          <text x={70} y={124} textAnchor="middle" fontSize="11" fill={accent}>x: &amp;&apos;a</text>
          <line x1={56} y1={140} x2={396} y2={140} stroke={accent} strokeWidth="3" />
          <text x={70} y={158} textAnchor="middle" fontSize="9" fill={secondary}>诞生</text>
          <text x={392} y={158} textAnchor="middle" fontSize="9" fill={secondary}>销毁</text>
          {/* 时间轴 y */}
          <text x={200} y={124} textAnchor="middle" fontSize="11" fill={accent}>y: &amp;&apos;a</text>
          <line x1={150} y1={176} x2={320} y2={176} stroke={accent} strokeWidth="3" />
          <text x={150} y={194} textAnchor="middle" fontSize="9" fill={secondary}>诞生</text>
          <text x={320} y={194} textAnchor="middle" fontSize="9" fill={secondary}>销毁</text>
          {/* 返回值区间 */}
          <line x1={150} y1={214} x2={320} y2={214} stroke={success} strokeWidth="4" />
          <text x={235} y={232} textAnchor="middle" fontSize="10" fill={success}>返回 &amp;&apos;a 有效区间 = x/y 交集</text>
          <text x={226} y={250} textAnchor="middle" fontSize="10" fill={secondary}>输出引用寿命不超过任一输入</text>

          {/* 非法：悬垂引用 */}
          <rect x={434} y={54} width={250} height={200} rx="10" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={559} y={76} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>非法：悬垂引用</text>
          <text x={559} y={96} textAnchor="middle" fontSize="10" fill={secondary}>fn dangle() -&gt; &amp;String</text>
          <rect x={474} y={112} width={170} height={34} rx="6" fill={elevated} stroke={border} />
          <text x={559} y={133} textAnchor="middle" fontSize="10" fill={primary}>let s = String::new()</text>
          <line x1={559} y1={146} x2={559} y2={172} stroke={danger} strokeWidth="1.6" markerEnd="url(#rsw-lf-d)" />
          <rect x={474} y={172} width={170} height={30} rx="6" fill={danger} fillOpacity="0.1" stroke={danger} strokeDasharray="3 3" />
          <text x={559} y={191} textAnchor="middle" fontSize="10" fill={danger}>函数结束 s 被销毁</text>
          <text x={559} y={222} textAnchor="middle" fontSize="10" fill={danger}>返回的 &amp;String 指向已释放内存</text>
          <text x={559} y={240} textAnchor="middle" fontSize="10" fill={secondary}>编译器：missing lifetime</text>

          {/* 省略规则 */}
          <line x1={36} y1={276} x2={684} y2={276} stroke={border} strokeWidth="1" />
          <text x={360} y={298} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>生命周期省略规则（编译器自动补 &apos;a）</text>
          <text x={120} y={324} textAnchor="middle" fontSize="10" fill={accent}>规则 1：每个引用参数独立 &apos;a</text>
          <text x={120} y={340} textAnchor="middle" fontSize="10" fill={secondary}>fn f(&amp;x) → &amp;&apos;a x</text>
          <text x={360} y={324} textAnchor="middle" fontSize="10" fill={accent}>规则 2：若只有一个输入 &apos;a</text>
          <text x={360} y={340} textAnchor="middle" fontSize="10" fill={secondary}>输出赋同寿 &apos;a</text>
          <text x={600} y={324} textAnchor="middle" fontSize="11" fill={accent}>规则 3：方法 &amp;self 优先</text>
          <text x={600} y={340} textAnchor="middle" fontSize="10" fill={secondary}>输出取 &amp;self 的 &apos;a</text>
          <text x={360} y={376} textAnchor="middle" fontSize="11" fill={secondary}>
            三条规则都套不上时，编译器要求显式标注——这就是生命周期语法存在的边界
          </text>

          <defs>
            <marker id="rsw-lf-d" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--danger)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        生命周期 &apos;a 是编译期标注，确保所有引用在有效期内绝不悬垂。
      </figcaption>
    </figure>
  );
}
