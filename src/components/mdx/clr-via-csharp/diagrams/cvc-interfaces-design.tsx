/**
 * <CvcInterfacesDesignDiagram>：接口设计——接口 vs 抽象类与显式实现。
 *
 * 上半：接口（多实现）vs 抽象类（单继承）的对比。
 * 下半：显式接口实现的调用方式差异。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
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

export function CvcInterfacesDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="接口设计。上半对比接口（多实现）与抽象类（单继承），下半展示显式接口实现的调用方式差异。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            接口设计：契约 · 多实现 · 显式实现
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            接口是「能做什么」· 抽象类是「是什么」· 显式实现隐藏非公共 API
          </text>

          {/* 上半：接口 vs 抽象类 */}
          {/* 左侧：接口（多实现） */}
          <text x={160} y={82} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            接口：多实现（能做什么）
          </text>

          <rect x={80} y={94} width={160} height={40} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={160} y={112} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">
            IComparable&lt;T&gt;
          </text>
          <text x={160} y={126} textAnchor="middle" fontSize="10" fill={secondary}>
            CompareTo(T)
          </text>

          <rect x={80} y={144} width={160} height={40} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={160} y={162} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">
            IDisposable
          </text>
          <text x={160} y={176} textAnchor="middle" fontSize="10" fill={secondary}>
            Dispose()
          </text>

          {/* 箭头汇聚到 Student */}
          <line x1={160} y1={184} x2={160} y2={210} stroke={secondary} strokeWidth="1.2" markerEnd="url(#cvc-id-arrow)" />
          <line x1={160} y1={134} x2={160} y2={210} stroke={secondary} strokeWidth="1.2" />

          {/* Student 类 */}
          <rect x={80} y={212} width={160} height={50} rx="6" fill={elevated} stroke={success} strokeWidth="1.4" />
          <text x={160} y={232} textAnchor="middle" fontSize="12" fontWeight="700" fill={success} fontFamily="monospace">
            Student
          </text>
          <text x={160} y={250} textAnchor="middle" fontSize="10" fill={secondary}>
            实现 2 个接口
          </text>

          {/* 右侧：抽象类（单继承） */}
          <text x={560} y={82} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            抽象类：单继承（是什么）
          </text>

          <rect x={480} y={94} width={160} height={40} rx="6" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={560} y={112} textAnchor="middle" fontSize="11" fontWeight="700" fill={success} fontFamily="monospace">
            Person (abstract)
          </text>
          <text x={560} y={126} textAnchor="middle" fontSize="10" fill={secondary}>
            Name · Print()
          </text>

          {/* 箭头 */}
          <line x1={560} y1={134} x2={560} y2={212} stroke={secondary} strokeWidth="1.4" markerEnd="url(#cvc-id-arrow)" />

          {/* Student 继承 Person */}
          <rect x={480} y={212} width={160} height={50} rx="6" fill={elevated} stroke={success} strokeWidth="1.4" />
          <text x={560} y={232} textAnchor="middle" fontSize="12" fontWeight="700" fill={success} fontFamily="monospace">
            Student : Person
          </text>
          <text x={560} y={250} textAnchor="middle" fontSize="10" fill={secondary}>
            继承 1 个基类
          </text>

          {/* 组合：Student 继承 Person + 实现接口 */}
          <line x1={240} y1={237} x2={480} y2={237} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <text x={360} y={230} textAnchor="middle" fontSize="10" fill={secondary}>组合使用</text>

          {/* 分隔线 */}
          <line x1={32} y1={286} x2={VIEW_W - 32} y2={286} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：显式接口实现 */}
          <text x={VIEW_W / 2} y={308} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
            显式接口实现：调用方式差异
          </text>

          {/* 隐式实现 */}
          <rect x={50} y={322} width={300} height={72} rx="8" fill={elevated} stroke={success} strokeWidth="1.2" />
          <text x={200} y={342} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            隐式实现：public void Dispose()
          </text>
          <text x={200} y={360} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">
            obj.Dispose()
          </text>
          <text x={200} y={378} textAnchor="middle" fontSize="10" fill={secondary}>
            通过类引用直接调用 · 出现在 IntelliSense
          </text>

          {/* 显式实现 */}
          <rect x={370} y={322} width={300} height={72} rx="8" fill={elevated} stroke={warning} strokeWidth="1.2" />
          <text x={520} y={342} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>
            显式实现：void IDisposable.Dispose()
          </text>
          <text x={520} y={360} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">
            {"((IDisposable)obj).Dispose()"}
          </text>
          <text x={520} y={378} textAnchor="middle" fontSize="10" fill={secondary}>
            必须通过接口引用调用 · 不出现在 IntelliSense
          </text>

          <defs>
            <marker id="cvc-id-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        接口支持多实现（能力），抽象类提供单继承（身份），显式实现隐藏非公共 API。
      </figcaption>
    </figure>
  );
}
