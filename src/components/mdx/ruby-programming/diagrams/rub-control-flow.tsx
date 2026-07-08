/**
 * <RubControlFlowDiagram>：Ruby 控制流——条件、循环、迭代器。
 *
 * 展示 if/unless/case-when 条件结构和 times/each/while/until 循环。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
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

export function RubControlFlowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Ruby 控制流：条件分支（if/unless/case-when）和循环迭代（times/each/while/until）。Ruby 中只有 nil 和 false 为假。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Ruby 控制流：条件与循环
          </text>
          <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize="11" fill={secondary}>
            只有 nil 和 false 为假 · 一切皆表达式 · 块迭代是惯用法
          </text>

          {/* 左半：条件分支 */}
          <text x={170} y={74} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            条件分支
          </text>

          {/* if/unless */}
          <rect x={32} y={86} width={280} height={56} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={44} y={106} fontSize="11" fontWeight="600" fill={accent}>if / unless</text>
          <text x={44} y={124} fontSize="11" fill={primary}>if x &gt; 0 then ... end</text>
          <text x={44} y={138} fontSize="11" fill={primary}>unless x.nil?  # if 的反面</text>

          {/* case-when */}
          <rect x={32} y={154} width={280} height={72} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={44} y={174} fontSize="11" fontWeight="600" fill={success}>case / when（强大匹配）</text>
          <text x={44} y={192} fontSize="11" fill={primary}>case x</text>
          <text x={44} y={206} fontSize="11" fill={primary}>when 1..10 then "小"</text>
          <text x={44} y={220} fontSize="11" fill={primary}>when String then "字符串"</text>

          {/* 三目运算符 */}
          <rect x={32} y={238} width={280} height={44} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={258} fontSize="11" fontWeight="600" fill={primary}>三目 &amp;&amp; ||</text>
          <text x={44} y={274} fontSize="11" fill={primary}>x &gt; 0 ? "正" : "非正"</text>

          {/* 修饰符形式 */}
          <rect x={32} y={294} width={280} height={44} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={314} fontSize="11" fontWeight="600" fill={primary}>后缀形式</text>
          <text x={44} y={330} fontSize="11" fill={primary}>puts x if x  # 单行条件</text>

          {/* 分隔线 */}
          <line x1={336} y1={64} x2={336} y2={356} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 右半：循环与迭代 */}
          <text x={524} y={74} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            循环与迭代
          </text>

          {/* times/upto */}
          <rect x={360} y={86} width={300} height={56} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={372} y={106} fontSize="11" fontWeight="600" fill={warning}>整数迭代</text>
          <text x={372} y={124} fontSize="11" fill={primary}>5.times {`{ |i| puts i }`}</text>
          <text x={372} y={138} fontSize="11" fill={primary}>1.upto(5) {`{ |i| ... }`}</text>

          {/* each */}
          <rect x={360} y={154} width={300} height={72} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={372} y={174} fontSize="11" fontWeight="600" fill={success}>each 迭代器（最常用）</text>
          <text x={372} y={192} fontSize="11" fill={primary}>[1,2,3].each {`{ |x| puts x }`}</text>
          <text x={372} y={206} fontSize="11" fill={primary}>hash.each {`{ |k, v| ... }`}</text>
          <text x={372} y={220} fontSize="11" fill={primary}>5.times.each {`{ ... }`}</text>

          {/* while/until */}
          <rect x={360} y={238} width={300} height={56} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={372} y={258} fontSize="11" fontWeight="600" fill={danger}>while / until</text>
          <text x={372} y={276} fontSize="11" fill={primary}>while x &gt; 0 do ... end</text>
          <text x={372} y={290} fontSize="11" fill={primary}>until x == 0  # while 的反面</text>

          {/* loop */}
          <rect x={360} y={306} width={300} height={44} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={372} y={326} fontSize="11" fontWeight="600" fill={primary}>loop（无限循环）</text>
          <text x={372} y={342} fontSize="11" fill={primary}>loop {`{ break if done }`}</text>

          {/* 底部说明 */}
          <line x1={32} y1={356} x2={VIEW_W - 32} y2={356} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={378} textAnchor="middle" fontSize="11" fill={secondary}>
            Ruby 倾向用块迭代（each/map）替代 while 循环——更声明式、更安全
          </text>
          <text x={VIEW_W / 2} y={394} textAnchor="middle" fontSize="11" fill={secondary}>
            case-when 用 === 匹配——Range、Class、Proc 都可做条件
          </text>

          <defs>
            <marker id="rub-cf-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Ruby 控制流以 if/case 条件和 each 块迭代为核心，只有 nil 和 false 为假。
      </figcaption>
    </figure>
  );
}
