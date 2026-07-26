/**
 * <RubBlocksProcsDiagram>：Ruby 块、Proc、Lambda。
 *
 * 展示块的三种形态（block/proc/lambda）及其差异。
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

export function RubBlocksProcsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Ruby 块、Proc 与 Lambda。块是方法调用的附属代码，Proc 是对象化的块，Lambda 是严格的 Proc。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            Ruby 块、Proc 与 Lambda
          `}</text>
          <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize="11" fill={secondary}>{`
            块不是对象 · Proc 是对象化的块 · Lambda 检查参数且独立返回
          `}</text>

          {/* 三列对比 */}
          {/* Block */}
          <rect x={32} y={72} width={210} height={200} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={137} y={94} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>{`Block（块）`}</text>
          <text x={44} y={116} fontSize="11" fill={primary}>{`[1,2,3].each do |x|`}</text>
          <text x={44} y={132} fontSize="11" fill={primary}>{`  puts x`}</text>
          <text x={44} y={148} fontSize="11" fill={primary}>{`end`}</text>
          <text x={44} y={168} fontSize="11" fill={secondary}>{`--- 特性 ---`}</text>
          <text x={44} y={184} fontSize="11" fill={secondary}>{`不是对象（不能单独存）`}</text>
          <text x={44} y={200} fontSize="11" fill={secondary}>{`通过 yield 调用`}</text>
          <text x={44} y={216} fontSize="11" fill={secondary}>{`通过 &amp;block 捕获`}</text>
          <text x={44} y={232} fontSize="11" fill={secondary}>{`return 退出整个方法`}</text>
          <text x={44} y={248} fontSize="11" fill={secondary}>{`宽松参数检查`}</text>
          <text x={44} y={264} fontSize="11" fill={success}>{`最常用！惯用法核心`}</text>

          {/* Proc */}
          <rect x={255} y={72} width={210} height={200} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={360} y={94} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>{`Proc`}</text>
          <text x={267} y={116} fontSize="11" fill={primary}>{`p = Proc.new do |x|`}</text>
          <text x={267} y={132} fontSize="11" fill={primary}>{`  puts x * 2`}</text>
          <text x={267} y={148} fontSize="11" fill={primary}>{`end`}</text>
          <text x={267} y={168} fontSize={11} fill={primary}>{`p.call(5)  # 10`}</text>
          <text x={267} y={184} fontSize={11} fill={secondary}>{`--- 特性 ---`}</text>
          <text x={267} y={200} fontSize="11" fill={secondary}>{`是对象（可存入变量）`}</text>
          <text x={267} y={216} fontSize="11" fill={secondary}>{`通过 .call / .() 调用`}</text>
          <text x={267} y={232} fontSize="11" fill={secondary}>{`return 退出定义它的方法`}</text>
          <text x={267} y={248} fontSize="11" fill={secondary}>{`宽松参数检查`}</text>
          <text x={267} y={264} fontSize="11" fill={secondary}>{`block 对象化的产物`}</text>

          {/* Lambda */}
          <rect x={478} y={72} width={210} height={200} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={583} y={94} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>{`Lambda`}</text>
          <text x={490} y={116} fontSize="11" fill={primary}>{`l = lambda do |x|`}</text>
          <text x={490} y={132} fontSize="11" fill={primary}>{`  puts x * 2`}</text>
          <text x={490} y={148} fontSize="11" fill={primary}>{`end`}</text>
          <text x={490} y={168} fontSize="11" fill={primary}>{`l = -&gt;(x) { puts x }`}</text>
          <text x={490} y={184} fontSize="11" fill={secondary}>{`--- 特性 ---`}</text>
          <text x={490} y={200} fontSize="11" fill={secondary}>{`是对象（Proc 子类）`}</text>
          <text x={490} y={216} fontSize="11" fill={secondary}>{`严格参数检查`}</text>
          <text x={490} y={232} fontSize="11" fill={secondary}>{`return 只退出自身`}</text>
          <text x={490} y={248} fontSize="11" fill={secondary}>{`行为更像匿名函数`}</text>
          <text x={490} y={264} fontSize="11" fill={success}>{`适合回调、高阶函数`}</text>

          {/* 底部：yield 与 &amp;block */}
          <line x1={32} y1={288} x2={VIEW_W - 32} y2={288} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          <text x={VIEW_W / 2} y={310} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>{`
            yield 与 &amp;block 捕获
          `}</text>

          <rect x={40} y={322} width={320} height={60} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={342} fontSize="11" fill={primary}>{`def map!`}</text>
          <text x={52} y={358} fontSize="11" fill={primary}>{`  each_with_index { |v, i| self[i] = yield(v) }`}</text>
          <text x={52} y={374} fontSize="11" fill={primary}>{`end`}</text>

          <rect x={380} y={322} width={308} height={60} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={392} y={342} fontSize="11" fill={primary}>{`def with_block(&amp;blk)`}</text>
          <text x={392} y={358} fontSize="11" fill={primary}>{`  blk.call  # 块转 Proc 对象`}</text>
          <text x={392} y={374} fontSize="11" fill={primary}>{`end`}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Block 是 Ruby 的灵魂——通过 yield 调用；Proc 是对象化的块；Lambda 是严格的 Proc，检查参数且独立返回。
      </figcaption>
    </figure>
  );
}
