/**
 * <RubClassesDiagram>：Ruby 类——定义、继承、访问控制。
 *
 * 展示类的结构（属性/方法/构造）、继承链、public/protected/private。
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

export function RubClassesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Ruby 类结构：类的定义（属性、方法、构造函数 initialize）、继承（superclass）、访问控制（public/protected/private）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            Ruby 类：定义、继承与访问控制
          `}</text>
          <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize="11" fill={secondary}>{`
            initialize 是构造函数 · attr_accessor 自动生成读写器 · 单继承 + 模块 Mixin
          `}</text>

          {/* 左半：类结构 */}
          <text x={170} y={74} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>{`
            类的定义结构
          `}</text>

          <rect x={32} y={86} width={300} height={256} rx="8" fill={elevated} stroke={border} strokeWidth="1" />

          <text x={44} y={108} fontSize="11" fontWeight="600" fill={accent}>{`class Animal`}</text>
          <text x={56} y={126} fontSize="11" fill={secondary}>{`# --- 属性 ---`}</text>
          <text x={56} y={142} fontSize="11" fill={primary}>{`attr_accessor :name`}</text>
          <text x={56} y={156} fontSize="11" fill={secondary}>{`# 生成 name= 和 name 方法`}</text>

          <text x={56} y={178} fontSize="11" fill={secondary}>{`# --- 构造函数 ---`}</text>
          <text x={56} y={194} fontSize="11" fill={primary}>{`def initialize(name)`}</text>
          <text x={56} y={208} fontSize="11" fill={primary}>{`  @name = name`}</text>
          <text x={56} y={222} fontSize="11" fill={primary}>{`end`}</text>

          <text x={56} y={244} fontSize="11" fill={secondary}>{`# --- 实例方法 ---`}</text>
          <text x={56} y={260} fontSize="11" fill={primary}>{`def speak`}</text>
          <text x={56} y={274} fontSize="11" fill={primary}>{`  "#{@name} speaks"`}</text>
          <text x={56} y={288} fontSize="11" fill={primary}>{`end`}</text>

          <text x={56} y={310} fontSize="11" fill={secondary}>{`# --- 类方法 ---`}</text>
          <text x={56} y={326} fontSize="11" fill={primary}>{`def self.create(...) ... end`}</text>
          <text x={44} y={340} fontSize="11" fontWeight="600" fill={accent}>{`end`}</text>

          {/* 右半上：继承链 */}
          <text x={524} y={74} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>{`
            继承链
          `}</text>

          <rect x={360} y={86} width={300} height={40} rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x={510} y={110} textAnchor="middle" fontSize="11" fontWeight="600" fill={danger}>{`BasicObject（最底层根）`}</text>

          <line x1={510} y1={126} x2={510} y2={140} stroke={secondary} strokeWidth="1.2" markerEnd="url(#rub-cls-arrow)" />
          <text x={530} y={136} fontSize="11" fill={secondary}>{`superclass`}</text>

          <rect x={360} y={140} width={300} height={40} rx="6" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x={510} y={164} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>{`Object（默认父类）`}</text>

          <line x1={510} y1={180} x2={510} y2={194} stroke={secondary} strokeWidth="1.2" markerEnd="url(#rub-cls-arrow)" />

          <rect x={360} y={194} width={300} height={40} rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x={510} y={218} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>{`Animal（自定义基类）`}</text>

          <line x1={510} y1={234} x2={510} y2={248} stroke={secondary} strokeWidth="1.2" markerEnd="url(#rub-cls-arrow)" />
          <text x={530} y={244} fontSize="11" fill={secondary}>{`&lt; (继承)`}</text>

          <rect x={360} y={248} width={300} height={40} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          <text x={510} y={272} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>{`Dog &lt; Animal（子类）`}</text>

          {/* 右半下：访问控制 */}
          <line x1={360} y1={298} x2={660} y2={298} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          <text x={524} y={318} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>{`
            访问控制
          `}</text>

          <rect x={360} y={328} width={96} height={52} rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x={408} y={348} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>{`public`}</text>
          <text x={408} y={368} textAnchor="middle" fontSize="11" fill={secondary}>{`任何人可调用`}</text>

          <rect x={464} y={328} width={96} height={52} rx="6" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x={512} y={348} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>{`protected`}</text>
          <text x={512} y={368} textAnchor="middle" fontSize="11" fill={secondary}>{`同类实例可调`}</text>

          <rect x={568} y={328} width={96} height={52} rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x={616} y={348} textAnchor="middle" fontSize="11" fontWeight="600" fill={danger}>{`private`}</text>
          <text x={616} y={368} textAnchor="middle" fontSize="11" fill={secondary}>{`仅隐式 self`}</text>

          <defs>
            <marker id="rub-cls-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Ruby 类通过 initialize 构造、attr_accessor 生成属性、&lt; 继承，单继承配合模块 Mixin 扩展。
      </figcaption>
    </figure>
  );
}
