/**
 * <CtcGenericsDeepDiagram>：C# 泛型深入——参数化、约束、协变逆变。
 *
 * 上半：类型参数化（List<T> 替换 T）与约束（where）。
 * 下半：协变（out，只读安全）与逆变（in，只写安全）对比。
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

export function CtcGenericsDeepDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C# 泛型深入。上半展示类型参数化（List of T 在使用时替换 T 为具体类型）和泛型约束（where T 冒号 class、struct、new、接口）。下半展示协变（out，只读安全）与逆变（in，只写安全）的方向对比。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            泛型深入：参数化 · 约束 · 协变逆变
          </text>

          {/* === 上半：类型参数化 + 约束 === */}
          <text x={180} y={56} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            类型参数化
          </text>
          <text x={540} y={56} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            泛型约束（where）
          </text>

          {/* 参数化 */}
          <rect x={40} y={68} width={280} height={110} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x={56} y={80} width={120} height="26" rx="4" fill={elevated} stroke={accent} strokeWidth="1" />
          <text x={116} y={97} textAnchor="middle" fontSize="11" fill={accent} fontFamily="monospace">{"List<T>"}</text>
          <text x={190} y={97} textAnchor="middle" fontSize="10" fill={secondary}>T 是占位符</text>
          {/* 替换箭头 */}
          <path d="M 116 110 L 116 128" fill="none" stroke={accent} strokeWidth="1.4" markerEnd="url(#ctc-gd-accent)" />
          <text x={145} y={122} textAnchor="middle" fontSize="10" fill={secondary}>替换 T</text>
          <rect x={56} y={130} width={100} height="22" rx="4" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" />
          <text x={106} y={145} textAnchor="middle" fontSize="10" fill={success} fontFamily="monospace">{"List<int>"}</text>
          <rect x={164} y={130} width={120} height="22" rx="4" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" />
          <text x={224} y={145} textAnchor="middle" fontSize="10" fill={success} fontFamily="monospace">{"List<string>"}</text>
          <text x={180} y={168} textAnchor="middle" fontSize="10" fill={secondary}>值类型零装箱 · 运行时保留 T</text>

          {/* 约束 */}
          <rect x={380} y={68} width={300} height={110} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={530} y={86} textAnchor="middle" fontSize="11" fontWeight="600" fill={success} fontFamily="monospace">
            {"where T : IComparable<T>"}
          </text>
          <text x={400} y={104} textAnchor="start" fontSize="10" fill={secondary} fontFamily="monospace">
            <tspan x={400} dy={0}>{"  class   → 引用类型"}</tspan>
            <tspan x={400} dy={16}>{"  struct  → 值类型"}</tspan>
            <tspan x={400} dy={16}>{"  new()   → 有无参构造"}</tspan>
            <tspan x={400} dy={16}>{"  IFoo    → 实现接口"}</tspan>
          </text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>让编译器知道 T 的能力</text>

          {/* 分隔线 */}
          <line x1={32} y1={196} x2={VIEW_W - 32} y2={196} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* === 下半：协变 vs 逆变 === */}
          <text x={180} y={218} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            协变（out）：只读安全
          </text>
          <text x={540} y={218} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
            逆变（in）：只写安全
          </text>

          {/* 协变 */}
          <rect x={40} y={230} width={280} height={140} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={180} y={248} textAnchor="middle" fontSize="11" fontWeight="600" fill={success} fontFamily="monospace">
            {"IEnumerable<out T>"}
          </text>
          <rect x={60} y={258} width={100} height="24" rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={110} y={274} textAnchor="middle" fontSize="10" fill={success} fontFamily="monospace">{"IEnumerable<Dog>"}</text>
          <path d="M 160 270 L 220 270" fill="none" stroke={success} strokeWidth="1.4" markerEnd="url(#ctc-gd-success)" />
          <text x={190} y={265} textAnchor="middle" fontSize="10" fill={success}>赋值</text>
          <rect x={220} y={258} width={100} height="24" rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={270} y={274} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">{"IEnumerable<Animal>"}</text>
          <text x={180} y={300} textAnchor="middle" fontSize="10" fill={secondary}>T 只在返回值位置（只读）</text>
          <text x={180} y={316} textAnchor="middle" fontSize="10" fill={secondary}>读出 Dog 一定是 Animal → 安全</text>
          <text x={180} y={340} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>
            派生类型 → 基类型方向
          </text>
          <text x={180} y={358} textAnchor="middle" fontSize="10" fill={secondary}>Dog 是 Animal 的子类</text>

          {/* 逆变 */}
          <rect x={380} y={230} width={300} height={140} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={530} y={248} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning} fontFamily="monospace">
            {"Action<in T>"}
          </text>
          <rect x={400} y={258} width={120} height="24" rx="4" fill={elevated} stroke={warning} strokeWidth="1" />
          <text x={460} y={274} textAnchor="middle" fontSize="10" fill={warning} fontFamily="monospace">{"Action<Animal>"}</text>
          <path d="M 520 270 L 580 270" fill="none" stroke={warning} strokeWidth="1.4" markerEnd="url(#ctc-gd-warn)" />
          <text x={550} y={265} textAnchor="middle" fontSize="10" fill={warning}>赋值</text>
          <rect x={580} y={258} width={100} height="24" rx="4" fill={elevated} stroke={warning} strokeWidth="1" />
          <text x={630} y={274} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">{"Action<Dog>"}</text>
          <text x={530} y={300} textAnchor="middle" fontSize="10" fill={secondary}>T 只在参数位置（只写）</text>
          <text x={530} y={316} textAnchor="middle" fontSize="10" fill={secondary}>接受 Animal 的函数也能接受 Dog → 安全</text>
          <text x={530} y={340} textAnchor="middle" fontSize="10" fontWeight="600" fill={warning}>
            基类型 → 派生类型方向
          </text>
          <text x={530} y={358} textAnchor="middle" fontSize="10" fill={secondary}>与协变相反</text>

          {/* 底部总结 */}
          <line x1={32} y1={384} x2={VIEW_W - 32} y2={384} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={404} textAnchor="middle" fontSize="11" fill={secondary}>
            协变 out 只读安全 · 逆变 in 只写安全 · List of T 不变（既读又写）
          </text>

          <defs>
            <marker id="ctc-gd-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="ctc-gd-success" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={success} />
            </marker>
            <marker id="ctc-gd-warn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={warning} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        泛型类型参数化让编译器在编译时确定类型，约束让编译器知道 T 的能力。协变（out）适用于只读接口，逆变（in）适用于只写接口。
      </figcaption>
    </figure>
  );
}
