/**
 * <FlpTypeHintsDiagram>：类型提示的静态/运行时双面。
 *
 * 展示类型注解在运行时被忽略、由静态检查器（mypy/pyright）强制，
 * 以及渐进式类型（gradual typing）的取舍。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function FlpTypeHintsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类型提示在运行时被Python忽略，由静态检查器mypy/pyright强制；渐进式类型允许部分标注。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            类型提示：静态检查，运行时不强制
          `}</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>{`
            注解是给工具看的；Python 解释器依旧按动态类型运行
          `}</text>

          {/* 带注解的函数签名盒 */}
          <rect x={120} y={76} width={480} height={70} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.55" />
          <text x={360} y={104} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>{`
            def greet(name: str, times: int) -> str:
          `}</text>
          <text x={360} y={128} textAnchor="middle" fontSize="11" fill={primary}>{`
            return (name + "!") * times
          `}</text>

          {/* 两条路径 */}
          <line x1={300} y1={146} x2={200} y2={184} stroke={secondary} strokeWidth="1.4" markerEnd="url(#flp-th-arrow)" />
          <line x1={420} y1={146} x2={520} y2={184} stroke={secondary} strokeWidth="1.4" markerEnd="url(#flp-th-arrow)" />

          {/* 左：运行时 */}
          <rect x={48} y={190} width={304} height={132} rx="10" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={200} y={216} textAnchor="middle" fontSize="14" fontWeight="700" fill={danger}>{`
            运行时（CPython）
          `}</text>
          <text x={64} y={244} fontSize="11" fill={primary}>{`· 解释器忽略注解`}</text>
          <text x={64} y={266} fontSize="11" fill={primary}>{`· greet(123, "x") 不会因`}</text>
          <text x={64} y={284} fontSize="11" fill={primary}>{`  类型不符而报错`}</text>
          <text x={64} y={306} fontSize="11" fill={secondary}>{`  （除非手动 isinstance 检查）`}</text>

          {/* 右：静态检查 */}
          <rect x={368} y={190} width={304} height={132} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.55" />
          <text x={520} y={216} textAnchor="middle" fontSize="14" fontWeight="700" fill={success}>{`
            静态检查（mypy / pyright）
          `}</text>
          <text x={384} y={244} fontSize="11" fill={primary}>{`· 扫描注解，对照调用`}</text>
          <text x={384} y={266} fontSize="11" fill={primary}>{`· greet(123, "x") 报错：`}</text>
          <text x={384} y={284} fontSize="11" fill={primary}>{`  Argument 1 has int, expects str`}</text>
          <text x={384} y={306} fontSize="11" fill={secondary}>{`  在运行前就拦截类型 bug`}</text>

          <defs>
            <marker id="flp-th-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={342} x2={VIEW_W - 32} y2={342} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={364} textAnchor="middle" fontSize="11" fill={secondary}>{`
            渐进式类型：可只标注关键函数，未标注处退回动态——既有弹性又能逐步加固
          `}</text>
          <text x={VIEW_W / 2} y={384} textAnchor="middle" fontSize="11" fill={secondary}>{`
            注解存于 __annotations__，运行时可反射读取（框架做依赖注入、序列化）
          `}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类型提示的静态检查与运行时行为。
      </figcaption>
    </figure>
  );
}
