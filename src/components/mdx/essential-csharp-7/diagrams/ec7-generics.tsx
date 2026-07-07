/**
 * <Ec7GenericsDiagram>：泛型——类型参数化。
 *
 * 上半：泛型类 Stack<T> 的定义与实例化
 *   左：原始泛型定义 Stack<T>
 *   中：实例化为 Stack<int>（值类型）
 *   右：实例化为 Stack<string>（引用类型）
 * 下半：泛型约束表 where T : ...
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const CONSTRAINTS: { label: string; desc: string; color: string }[] = [
  { label: "where T : class", desc: "T 必须是引用类型", color: accent },
  { label: "where T : struct", desc: "T 必须是值类型", color: success },
  { label: "where T : new()", desc: "T 必须有无参构造", color: warning },
  { label: "where T : IComparable", desc: "T 必须实现接口", color: accent },
  { label: "where T : Animal", desc: "T 必须继承基类", color: success },
];

export function Ec7GenericsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="泛型类型参数化。上半部分：左侧泛型类定义 Stack T，中间实例化为 Stack int 存值类型，右侧实例化为 Stack string 存引用类型，箭头表示类型替换。下半部分：泛型约束表，where T class 引用类型、where T struct 值类型、where T new 无参构造、where T IComparable 实现接口、where T Animal 继承基类。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ec7-gen-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            泛型：类型参数化与约束
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill={secondary}>
            一份代码 · 多种类型 · 编译期类型安全
          </text>

          {/* 上半：泛型定义与实例化 */}
          {/* 原始定义 */}
          <g>
            <rect x={36} y={74} width={180} height={100} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.6" />
            <text x={126} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>{"class Stack<T>"}</text>
            <line x1={48} y1={104} x2={204} y2={104} stroke={border} strokeWidth="1" />
            <text x={126} y={122} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>Push(T item)</text>
            <text x={126} y={140} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>Pop() : T</text>
            <text x={126} y={158} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>Count : int</text>
            <text x={126} y={172} textAnchor="middle" fontSize="10" fill={secondary}>T = 类型占位符</text>
          </g>

          {/* 箭头到 int */}
          <line x1={216} y1={124} x2={266} y2={124} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ec7-gen-arrow)" />
          <text x={241} y={118} textAnchor="middle" fontSize="10" fill={secondary}>int</text>

          {/* 实例化 int */}
          <g>
            <rect x={270} y={74} width={160} height={100} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.6" />
            <text x={350} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>{"Stack<int>"}</text>
            <line x1={282} y1={104} x2={418} y2={104} stroke={border} strokeWidth="1" />
            <text x={350} y={122} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>Push(42)</text>
            <text x={350} y={140} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>Pop() : int</text>
            <text x={350} y={158} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>无装箱开销</text>
          </g>

          {/* 弧线箭头到 string */}
          <path d="M 216 130 Q 340 60 466 130" fill="none" stroke={secondary} strokeWidth="1.4" markerEnd="url(#ec7-gen-arrow)" strokeDasharray="5 3" />
          <text x={340} y={62} textAnchor="middle" fontSize="10" fill={secondary}>string</text>

          {/* 实例化 string */}
          <g>
            <rect x={470} y={74} width={180} height={100} rx="10" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.6" />
            <text x={560} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>{"Stack<string>"}</text>
            <line x1={482} y1={104} x2={638} y2={104} stroke={border} strokeWidth="1" />
            <text x={560} y={122} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>{"Push(\"hi\")"}</text>
            <text x={560} y={140} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>Pop() : string</text>
            <text x={560} y={158} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>引用类型安全</text>
          </g>

          {/* 下半：约束表 */}
          <text x={VIEW_W / 2} y={202} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            泛型约束（where 子句）
          </text>
          {CONSTRAINTS.map((c, i) => {
            const y = 220 + i * 30;
            return (
              <g key={c.label}>
                <rect x={120} y={y} width={200} height={24} rx="6" fill={c.color} fillOpacity="0.08" stroke={c.color} strokeWidth="1.2" strokeOpacity="0.4" />
                <text x={220} y={y + 17} textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="600" fill={c.color}>
                  {c.label}
                </text>
                <text x={340} y={y + 17} fontSize="11" fill={primary}>
                  {c.desc}
                </text>
              </g>
            );
          })}

          {/* 底部说明 */}
          <line x1={32} y1={382} x2={VIEW_W - 32} y2={382} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={403} textAnchor="middle" fontSize="11" fill={secondary}>
            泛型消除装箱 · 编译期实例化 · 协变 out / 逆变 in 控制类型参数方向
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        泛型类 Stack&lt;T&gt; 用类型占位符 T 定义一次，实例化为 Stack&lt;int&gt; 或 Stack&lt;string&gt; 时编译器生成类型安全的专用版本。
      </figcaption>
    </figure>
  );
}
