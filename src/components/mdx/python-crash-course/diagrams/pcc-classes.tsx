/**
 * <PccClassesDiagram>：Python 类与对象——OOP 核心概念。
 *
 * 类定义 → 实例化 → 属性与方法 → 继承与多态。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
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

export function PccClassesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python 类与对象：类是蓝图，实例是具体对象。类包含属性和方法，子类继承父类并可以重写方法实现多态。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            类与对象：面向对象编程
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            类是蓝图 · 实例是对象 · 继承复用代码 · 多态统一接口
          </text>

          {/* 上方：继承关系 */}
          <text x={VIEW_W / 2} y={76} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            继承层次
          </text>

          {/* 父类 Animal */}
          <rect x={280} y={88} width={160} height={64} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={360} y={108} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>Animal</text>
          <text x={360} y={124} textAnchor="middle" fontSize="11" fill={secondary}>name, age</text>
          <text x={360} y={140} textAnchor="middle" fontSize="11" fill={secondary}>speak() · eat()</text>

          {/* 继承箭头 */}
          <line x1={300} y1={152} x2={200} y2={188} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-cl-arrow)" />
          <line x1={360} y1={152} x2={360} y2={188} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-cl-arrow)" />
          <line x1={420} y1={152} x2={520} y2={188} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-cl-arrow)" />

          {/* 子类 Dog */}
          <rect x={120} y={192} width={160} height={64} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={200} y={212} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>Dog</text>
          <text x={200} y={228} textAnchor="middle" fontSize="11" fill={secondary}>breed</text>
          <text x={200} y={244} textAnchor="middle" fontSize="11" fill={secondary}>speak() → "Woof"</text>

          {/* 子类 Cat */}
          <rect x={280} y={192} width={160} height={64} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={360} y={212} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>Cat</text>
          <text x={360} y={228} textAnchor="middle" fontSize="11" fill={secondary}>indoor</text>
          <text x={360} y={244} textAnchor="middle" fontSize="11" fill={secondary}>speak() → "Meow"</text>

          {/* 子类 Bird */}
          <rect x={440} y={192} width={160} height={64} rx="8" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={520} y={212} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>Bird</text>
          <text x={520} y={228} textAnchor="middle" fontSize="11" fill={secondary}>wingspan</text>
          <text x={520} y={244} textAnchor="middle" fontSize="11" fill={secondary}>speak() → "Chirp"</text>

          {/* 分隔线 */}
          <line x1={32} y1={276} x2={VIEW_W - 32} y2={276} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下方：实例化与 __init__ */}
          <text x={180} y={300} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            类 → 实例
          </text>

          <rect x={60} y={310} width={100} height={32} rx="6" fill={elevated} stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          <text x={110} y={330} textAnchor="middle" fontSize="11" fill={accent}>class Dog</text>

          <line x1={160} y1={326} x2={190} y2={326} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-cl-arrow)" />
          <text x={175} y={320} textAnchor="middle" fontSize="10" fill={secondary}>__init__</text>

          <rect x={190} y={310} width={100} height={32} rx="6" fill={elevated} stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          <text x={240} y={330} textAnchor="middle" fontSize="11" fill={success}>my_dog = Dog()</text>

          <line x1={290} y1={326} x2={320} y2={326} stroke={secondary} strokeWidth="1.2" />
          <text x={305} y={320} textAnchor="middle" fontSize="10" fill={secondary}>self</text>

          <rect x={320} y={310} width={120} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={380} y={330} textAnchor="middle" fontSize="11" fill={primary}>name="Rex", age=3</text>

          {/* 右下：特殊方法 */}
          <text x={560} y={300} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            特殊方法
          </text>

          <rect x={460} y={310} width={240} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={472} y={328} fontSize="11" fill={primary}>__init__</text>
          <text x={600} y={328} textAnchor="middle" fontSize="11" fill={secondary}>构造函数</text>

          <rect x={460} y={344} width={240} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={472} y={362} fontSize="11" fill={primary}>__str__</text>
          <text x={600} y={362} textAnchor="middle" fontSize="11" fill={secondary}>print 时的字符串</text>

          <rect x={460} y={378} width={240} height="16" rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={472} y={390} fontSize="11" fill={primary}>__repr__</text>
          <text x={600} y={390} textAnchor="middle" fontSize="11" fill={secondary}>开发者表示</text>

          <defs>
            <marker id="pcc-cl-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类是创建对象的蓝图，子类继承父类属性方法并重写实现多态，__init__ 负责初始化实例。
      </figcaption>
    </figure>
  );
}
