/**
 * <RubFinalReviewDiagram>：Ruby 基础教程总复习——知识串联图。
 *
 * 四层结构：对象模型 → 核心语法 → 类与模块 → 元编程与实战。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function RubFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img" aria-label="Ruby 基础教程知识串联图。四层结构：对象模型（一切皆对象）、核心语法（字符串控制流）、类与模块（继承 Mixin 块）、元编程与实战（动态方法 Gems）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Ruby 全书知识串联
          </text>
          <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize="11" fill={secondary}>
            对象模型 → 核心语法 → 类与模块 → 元编程与实战
          </text>

          {/* Layer 1: 对象模型 */}
          <rect x={40} y={64} width={640} height={68} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={60} y={86} fontSize="13" fontWeight="700" fill={accent}>第1层：对象模型</text>
          <text x={60} y={104} fontSize="11" fill={primary}>一切皆对象（5.class → Integer）</text>
          <text x={60} y={120} fontSize="11" fill={primary}>变量 = 引用 · 四种作用域（局部/实例/类/全局）· Object → BasicObject 继承链</text>
          <text x={480} y={100} fontSize="11" fontWeight="600" fill={accent}>obj → String</text>
          <text x={480} y={116} fontSize="11" fontWeight="600" fill={accent}>→ Class → Object</text>

          {/* 箭头 */}
          <line x1={360} y1={132} x2={360} y2={146} stroke={secondary} strokeWidth="1.4" markerEnd="url(#rub-fr-arrow)" />

          {/* Layer 2: 核心语法 */}
          <rect x={40} y={146} width={640} height={68} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={60} y={168} fontSize="13" fontWeight="700" fill={success}>第2层：核心语法</text>
          <text x={60} y={186} fontSize="11" fill={primary}>字符串（可变/插值/freeze）· Symbol（不可变/唯一）</text>
          <text x={60} y={202} fontSize="11" fill={primary}>控制流（if/unless/case-when）· 迭代器（each/times/map）· 只有 nil 和 false 为假</text>
          <text x={520} y={184} fontSize="11" fontWeight="600" fill={success}>"#&#123;&#125;"</text>
          <text x={520} y={200} fontSize="11" fontWeight="600" fill={success}>each &#123;&#125;</text>

          {/* 箭头 */}
          <line x1={360} y1={214} x2={360} y2={228} stroke={secondary} strokeWidth="1.4" markerEnd="url(#rub-fr-arrow)" />

          {/* Layer 3: 类与模块 */}
          <rect x={40} y={228} width={640} height={68} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={60} y={250} fontSize="13" fontWeight="700" fill={warning}>第3层：类与模块</text>
          <text x={60} y={268} fontSize="11" fill={primary}>类（initialize/attr_accessor/单继承）· 模块（命名空间 + Mixin）</text>
          <text x={60} y={284} fontSize="11" fill={primary}>块/Proc/Lambda（yield 调用 · Proc 对象化 · Lambda 严格参数）· include/prepend/extend</text>
          <text x={500} y={266} fontSize="11" fontWeight="600" fill={warning}>class Dog</text>
          <text x={500} y={282} fontSize="11" fontWeight="600" fill={warning}>&lt; Animal</text>

          {/* 箭头 */}
          <line x1={360} y1={296} x2={360} y2={310} stroke={secondary} strokeWidth="1.4" markerEnd="url(#rub-fr-arrow)" />

          {/* Layer 4: 元编程与实战 */}
          <rect x={40} y={310} width={640} height={68} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={60} y={332} fontSize="13" fontWeight="700" fill={danger}>第4层：元编程与实战</text>
          <text x={60} y={350} fontSize="11" fill={primary}>Open Class · define_method · method_missing · send</text>
          <text x={60} y={366} fontSize="11" fill={primary}>Gems（包管理）· Bundler（Gemfile + lock 版本锁定）· Rails = 元编程的极致应用</text>
          <text x={500} y={348} fontSize="11" fontWeight="600" fill={danger}>method_missing</text>
          <text x={500} y={364} fontSize="11" fontWeight="600" fill={danger}>bundle exec</text>

          {/* 底部总结 */}
          <line x1={32} y1={392} x2={VIEW_W - 32} y2={392} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={410} textAnchor="middle" fontSize="11" fill={secondary}>
            对象模型是地基 · 块是灵魂 · 模块解决多重继承 · 元编程让 Rails 成为可能
          </text>

          <defs>
            <marker id="rub-fr-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Ruby 全书四层知识串联：对象模型打底、核心语法操作、类与模块抽象、元编程拓展边界。
      </figcaption>
    </figure>
  );
}
