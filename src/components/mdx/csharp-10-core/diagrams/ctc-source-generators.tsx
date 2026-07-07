/**
 * <CtcSourceGeneratorsDiagram>：源生成器——编译时代码生成。
 *
 * 上半：反射（运行时）vs 源生成器（编译时）的对比。
 * 下半：增量管线模型与典型应用场景。
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

export function CtcSourceGeneratorsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="源生成器。上半对比反射（运行时检查类型元数据，有开销）与源生成器（编译时生成强类型代码，零反射）。下半展示增量管线模型（ForAttributeWithMetadataName 过滤变化，管线阶段缓存复用）和典型应用场景。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y={26} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            源生成器：编译时代码生成
          </text>

          {/* === 上半：反射 vs 源生成器 === */}
          <text x={180} y={48} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>
            反射（运行时）
          </text>
          <text x={540} y={48} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            源生成器（编译时）
          </text>

          {/* 反射 */}
          <rect x="40" y="58" width="280" height="100" rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1.4" strokeOpacity="0.4" />
          <text x="56" y="76" textAnchor="start" fontSize="10" fill={danger} fontFamily="monospace">type.GetProperties()</text>
          <rect x="56" y="84" width="120" height="22" rx="4" fill={danger} fillOpacity="0.12" stroke={danger} strokeWidth="1" />
          <text x="116" y="99" textAnchor="middle" fontSize="9" fill={danger} fontFamily="monospace">运行时</text>
          <path d="M 176 95 L 230 95" fill="none" stroke={danger} strokeWidth="1.4" markerEnd="url(#ctc-sg-danger)" />
          <text x="200" y="89" textAnchor="middle" fontSize="9" fill={danger}>反射</text>
          <rect x="230" y="84" width="80" height="22" rx="4" fill={danger} fillOpacity="0.12" stroke={danger} strokeWidth="1" />
          <text x="270" y="99" textAnchor="middle" fontSize="9" fill={danger} fontFamily="monospace">元数据</text>
          <text x="180" y="122" textAnchor="middle" fontSize="10" fill={secondary}>每次调用都有开销</text>
          <text x="180" y="138" textAnchor="middle" fontSize="10" fill={secondary}>遍历元数据 + 安全检查</text>
          <text x="180" y="154" textAnchor="middle" fontSize="10" fontWeight="600" fill={danger}>慢 · 有 GC 分配</text>

          {/* 源生成器 */}
          <rect x="400" y="58" width="280" height="100" rx="8" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.4" strokeOpacity="0.4" />
          <text x="416" y="76" textAnchor="start" fontSize="10" fill={success} fontFamily="monospace">JsonSerializerContext</text>
          <rect x="416" y="84" width="120" height="22" rx="4" fill={success} fillOpacity="0.12" stroke={success} strokeWidth="1" />
          <text x="476" y="99" textAnchor="middle" fontSize="9" fill={success} fontFamily="monospace">编译时</text>
          <path d="M 536 95 L 590 95" fill="none" stroke={success} strokeWidth="1.4" markerEnd="url(#ctc-sg-success)" />
          <text x="563" y="89" textAnchor="middle" fontSize="9" fill={success}>生成</text>
          <rect x="590" y="84" width="80" height="22" rx="4" fill={success} fillOpacity="0.12" stroke={success} strokeWidth="1" />
          <text x="630" y="99" textAnchor="middle" fontSize="9" fill={success} fontFamily="monospace">强类型</text>
          <text x="540" y="122" textAnchor="middle" fontSize="10" fill={secondary}>编译时生成调用代码</text>
          <text x="540" y="138" textAnchor="middle" fontSize="10" fill={secondary}>直接字段访问 · 零反射</text>
          <text x="540" y="154" textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>快 · 零 GC 分配</text>

          {/* 分隔线 */}
          <line x1="32" y1="174" x2={VIEW_W - 32} y2="174" stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* === 下半左：增量管线 === */}
          <text x={180} y="194" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            增量管线（IIncrementalGenerator）
          </text>

          <rect x="40" y="206" width="320" height="160" rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.4" strokeOpacity="0.4" />
          {/* 管线阶段 */}
          <rect x="56" y="220" width="280" height="24" rx="4" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" />
          <text x="196" y="236" textAnchor="middle" fontSize="10" fill={accent} fontFamily="monospace">ForAttributeWithMetadataName</text>

          <path d="M 196 246 L 196 256" fill="none" stroke={accent} strokeWidth="1.2" markerEnd="url(#ctc-sg-accent)" />

          <rect x="56" y="258" width="280" height="24" rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
          <text x="196" y="274" textAnchor="middle" fontSize="10" fill={accent} fontFamily="monospace">.Where(...) 过滤</text>

          <path d="M 196 284 L 196 294" fill="none" stroke={accent} strokeWidth="1.2" markerEnd="url(#ctc-sg-accent)" />

          <rect x="56" y="306" width="280" height="24" rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
          <text x="196" y="322" textAnchor="middle" fontSize="10" fill={accent} fontFamily="monospace">.Select(...) 转换 + Collect 缓存</text>

          <text x="196" y="348" textAnchor="middle" fontSize="10" fill={success}>只在输入变化时重新执行</text>
          <text x="196" y="362" textAnchor="middle" fontSize="10" fill={secondary}>未变化阶段复用缓存</text>

          {/* === 下半右：应用场景 === */}
          <text x={540} y="194" textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>
            典型应用场景
          </text>

          <rect x="380" y="206" width="300" height="160" rx="8" fill={warning} fillOpacity="0.04" stroke={warning} strokeWidth="1.4" strokeOpacity="0.4" />
          <text x="396" y="226" textAnchor="start" fontSize="10" fill={primary} fontFamily="monospace">
            <tspan x="396" dy="0" fill={success}>System.Text.Json</tspan>
            <tspan x="396" dy="16" fill={secondary}>  JSON 序列化代码</tspan>
            <tspan x="396" dy="20" fill={success}>LoggerMessage</tspan>
            <tspan x="396" dy="16" fill={secondary}>  高性能日志方法</tspan>
            <tspan x="396" dy="20" fill={success}>CommunityToolkit.Mvvm</tspan>
            <tspan x="396" dy="16" fill={secondary}>  ObservableProperty</tspan>
            <tspan x="396" dy="20" fill={success}>RegexGenerator</tspan>
            <tspan x="396" dy="16" fill={secondary}>  编译时正则代码</tspan>
          </text>

          {/* 底部总结 */}
          <line x1="32" y1="384" x2={VIEW_W - 32} y2="384" stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y="404" textAnchor="middle" fontSize="11" fill={secondary}>
            编译时生成代码 · 零运行时反射 · 只能添加不能修改 · partial class 扩展
          </text>
          <text x={VIEW_W / 2} y="418" textAnchor="middle" fontSize="11" fill={secondary}>
            增量管线缓存复用 · 大项目编译提速 · 不能用运行时信息
          </text>

          <defs>
            <marker id="ctc-sg-danger" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={danger} />
            </marker>
            <marker id="ctc-sg-success" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={success} />
            </marker>
            <marker id="ctc-sg-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        源生成器在编译时分析类型并生成强类型代码，消除运行时反射开销。增量管线只在输入变化时重新执行，未变化阶段复用缓存。只能添加代码不能修改已有代码。
      </figcaption>
    </figure>
  );
}
