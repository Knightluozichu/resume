/**
 * <CtcRecordsStructsDiagram>：Record 与结构体——值语义、不可变性、with 表达式。
 *
 * 上半：class vs record vs record struct vs struct 的对比矩阵。
 * 下半：with 表达式创建副本的过程，以及值相等的行为。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
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

export function CtcRecordsStructsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Record 与结构体。上半展示 class、record、record struct、struct 四种类型的对比矩阵（类型、内存、相等性、可变性、with 表达式）。下半展示 with 表达式创建副本的过程和值相等行为。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y={26} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Record 与结构体：值语义 · 不可变 · with
          </text>

          {/* === 上半：对比矩阵 === */}
          <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            四种类型对比矩阵
          </text>

          {/* 表头 */}
          <rect x="40" y="56" width="120" height="24" rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x="100" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill={secondary}>特性</text>
          <rect x="160" y="56" width="130" height="24" rx="4" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1" />
          <text x="225" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill={danger}>class</text>
          <rect x="290" y="56" width="130" height="24" rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
          <text x="355" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>record</text>
          <rect x="420" y="56" width="140" height="24" rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" />
          <text x="490" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill={success}>record struct</text>
          <rect x="560" y="56" width="120" height="24" rx="4" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1" />
          <text x="620" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill={warning}>struct</text>

          {/* 行：类型 */}
          <rect x="40" y="80" width="120" height="22" rx="2" fill={elevated} stroke={border} strokeWidth="0.8" />
          <text x="100" y="95" textAnchor="middle" fontSize="10" fill={secondary}>类型</text>
          <text x="225" y="95" textAnchor="middle" fontSize="10" fill={primary}>引用</text>
          <text x="355" y="95" textAnchor="middle" fontSize="10" fill={primary}>引用</text>
          <text x="490" y="95" textAnchor="middle" fontSize="10" fill={primary}>值</text>
          <text x="620" y="95" textAnchor="middle" fontSize="10" fill={primary}>值</text>

          {/* 行：内存 */}
          <rect x="40" y="102" width="120" height="22" rx="2" fill={elevated} stroke={border} strokeWidth="0.8" />
          <text x="100" y="117" textAnchor="middle" fontSize="10" fill={secondary}>内存</text>
          <text x="225" y="117" textAnchor="middle" fontSize="10" fill={primary}>堆</text>
          <text x="355" y="117" textAnchor="middle" fontSize="10" fill={primary}>堆</text>
          <text x="490" y="117" textAnchor="middle" fontSize="10" fill={primary}>栈</text>
          <text x="620" y="117" textAnchor="middle" fontSize="10" fill={primary}>栈</text>

          {/* 行：相等性 */}
          <rect x="40" y="124" width="120" height="22" rx="2" fill={elevated} stroke={border} strokeWidth="0.8" />
          <text x="100" y="139" textAnchor="middle" fontSize="10" fill={secondary}>相等性</text>
          <text x="225" y="139" textAnchor="middle" fontSize="10" fill={danger}>引用</text>
          <text x="355" y="139" textAnchor="middle" fontSize="10" fill={success}>值</text>
          <text x="490" y="139" textAnchor="middle" fontSize="10" fill={success}>值</text>
          <text x="620" y="139" textAnchor="middle" fontSize="10" fill={warning}>手动</text>

          {/* 行：可变性 */}
          <rect x="40" y="146" width="120" height="22" rx="2" fill={elevated} stroke={border} strokeWidth="0.8" />
          <text x="100" y="161" textAnchor="middle" fontSize="10" fill={secondary}>默认可变</text>
          <text x="225" y="161" textAnchor="middle" fontSize="10" fill={success}>是</text>
          <text x="355" y="161" textAnchor="middle" fontSize="10" fill={danger}>否(init)</text>
          <text x="490" y="161" textAnchor="middle" fontSize="10" fill={success}>是</text>
          <text x="620" y="161" textAnchor="middle" fontSize="10" fill={success}>是</text>

          {/* 行：with */}
          <rect x="40" y="168" width="120" height="22" rx="2" fill={elevated} stroke={border} strokeWidth="0.8" />
          <text x="100" y="183" textAnchor="middle" fontSize="10" fill={secondary}>with 表达式</text>
          <text x="225" y="183" textAnchor="middle" fontSize="10" fill={danger}>否</text>
          <text x="355" y="183" textAnchor="middle" fontSize="10" fill={success}>是</text>
          <text x="490" y="183" textAnchor="middle" fontSize="10" fill={success}>是</text>
          <text x="620" y="183" textAnchor="middle" fontSize="10" fill={danger}>否</text>

          {/* 分隔线 */}
          <line x1="32" y1="206" x2={VIEW_W - 32} y2="206" stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* === 下半：with 表达式与值相等 === */}
          <text x={VIEW_W / 2} y="226" textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            with 表达式 · 值相等
          </text>

          {/* with 表达式 */}
          <rect x="40" y="238" width="320" height="130" rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.4" strokeOpacity="0.4" />
          <text x="200" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>with：创建副本并修改</text>
          <rect x="56" y="268" width="130" height="24" rx="4" fill={elevated} stroke={accent} strokeWidth="1" />
          <text x="121" y="284" textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">p1 = (Alice, 30)</text>
          <path d="M 186 280 L 230 280" fill="none" stroke={accent} strokeWidth="1.4" markerEnd="url(#ctc-rs-accent)" />
          <text x="208" y="274" textAnchor="middle" fontSize="9" fill={accent} fontFamily="monospace">with</text>
          <rect x="230" y="268" width="120" height="24" rx="4" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" />
          <text x="290" y="284" textAnchor="middle" fontSize="10" fill={success} fontFamily="monospace">p3 = (Alice, 31)</text>
          <text x="56" y="308" textAnchor="start" fontSize="10" fill={secondary} fontFamily="monospace">p with {"{ Age = 31 }"}</text>
          <text x="200" y="326" textAnchor="middle" fontSize="10" fill={success}>原 p1 不变 (Age=30)</text>
          <text x="200" y="342" textAnchor="middle" fontSize="10" fill={success}>新 p3 副本 (Age=31)</text>
          <text x="200" y="358" textAnchor="middle" fontSize="10" fill={secondary}>不可变修改 = 副本+改字段</text>

          {/* 值相等 */}
          <rect x="380" y="238" width="300" height="130" rx="8" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.4" strokeOpacity="0.4" />
          <text x="530" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>值相等：字段相同即相等</text>
          <rect x="400" y="270" width="120" height="24" rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x="460" y="286" textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">(Alice, 30)</text>
          <text x="530" y="286" textAnchor="middle" fontSize="14" fill={success} fontWeight="700">==</text>
          <rect x="540" y="270" width="120" height="24" rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x="600" y="286" textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">(Alice, 30)</text>
          <text x="530" y="312" textAnchor="middle" fontSize="14" fontWeight="700" fill={success}>true</text>
          <text x="530" y="332" textAnchor="middle" fontSize="10" fill={secondary}>record / record struct 自动 ==</text>
          <text x="530" y="348" textAnchor="middle" fontSize="10" fill={danger}>class 默认引用相等（false）</text>
          <text x="530" y="362" textAnchor="middle" fontSize="10" fill={warning}>struct 需手动重写 ==</text>

          {/* 底部总结 */}
          <line x1="32" y1="384" x2={VIEW_W - 32} y2="384" stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y="404" textAnchor="middle" fontSize="11" fill={secondary}>
            record 引用+值语义 · record struct 值+值语义 · with 创建副本 · 编译器合成方法
          </text>

          <defs>
            <marker id="ctc-rs-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        record 是引用类型+值相等，record struct 是值类型+值相等。with 表达式创建副本并修改字段。编译器自动合成 Equals、GetHashCode、ToString、Deconstruct。
      </figcaption>
    </figure>
  );
}
