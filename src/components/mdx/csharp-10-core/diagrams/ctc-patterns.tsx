/**
 * <CtcPatternsDiagram>：模式匹配——类型模式、属性模式、switch 表达式、列表模式。
 *
 * 上半：传统 if-else vs 模式匹配的代码对比。
 * 下半：四种模式类型（类型、属性、关系+逻辑、列表）的示意。
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

export function CtcPatternsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="模式匹配。上半对比传统 if-else（命令式，类型检查+转换分离）与模式匹配（声明式，检查+提取一步完成）。下半展示四种模式：类型模式、属性模式、关系与逻辑模式、列表模式。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            模式匹配：声明式条件 · 数据提取
          </text>

          {/* === 上半：传统 vs 模式匹配 === */}
          <text x={180} y={50} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>
            传统 if-else（命令式）
          </text>
          <text x={540} y={50} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            模式匹配（声明式）
          </text>

          {/* 传统 */}
          <rect x="40" y="60" width="280" height="90" rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1.4" strokeOpacity="0.4" />
          <text x="56" y="80" textAnchor="start" fontSize="10" fill={danger} fontFamily="monospace">
            <tspan x="56" dy="0">if (shape is Circle)</tspan>
            <tspan x="56" dy="14">{"{"}</tspan>
            <tspan x="64" dy="14">var c = (Circle)shape;</tspan>
            <tspan x="56" dy="14">{"  ... // 两步：检查+转换"}</tspan>
            <tspan x="56" dy="14">{"}"}</tspan>
          </text>

          {/* 模式匹配 */}
          <rect x="400" y="60" width="280" height="90" rx="8" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.4" strokeOpacity="0.4" />
          <text x="416" y="80" textAnchor="start" fontSize="10" fill={success} fontFamily="monospace">
            <tspan x="416" dy="0">shape switch</tspan>
            <tspan x="416" dy="14">{"{"}</tspan>
            <tspan x="424" dy="14">{"Circle c => ...,"}</tspan>
            <tspan x="424" dy="14">{"Rect r => ...,"}</tspan>
            <tspan x="416" dy="14">{"}  // 一步：检查+提取"}</tspan>
          </text>

          {/* 分隔线 */}
          <line x1="32" y1="168" x2={VIEW_W - 32} y2="168" stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* === 下半：四种模式 === */}
          <text x={VIEW_W / 2} y="188" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            四种模式类型
          </text>

          {/* 类型模式 */}
          <rect x="40" y="200" width="150" height="80" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x="115" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>类型模式</text>
          <text x="115" y="240" textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">is Circle c</text>
          <text x="115" y="256" textAnchor="middle" fontSize="10" fill={secondary}>检查类型</text>
          <text x="115" y="270" textAnchor="middle" fontSize="10" fill={secondary}>+ 提取变量</text>

          {/* 属性模式 */}
          <rect x="210" y="200" width="150" height="80" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x="285" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>属性模式</text>
          <text x="285" y="240" textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">is {"{ Age: >= 18 }"}</text>
          <text x="285" y="256" textAnchor="middle" fontSize="10" fill={secondary}>匹配属性值</text>
          <text x="285" y="270" textAnchor="middle" fontSize="10" fill={secondary}>可嵌套</text>

          {/* 关系+逻辑模式 */}
          <rect x="380" y="200" width="150" height="80" rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x="455" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>关系+逻辑</text>
          <text x="455" y="240" textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">{">= 18 and < 65"}</text>
          <text x="455" y="256" textAnchor="middle" fontSize="10" fill={secondary}>关系比较</text>
          <text x="455" y="270" textAnchor="middle" fontSize="10" fill={secondary}>and / or / not</text>

          {/* 列表模式 */}
          <rect x="550" y="200" width="130" height="80" rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x="615" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>列表模式</text>
          <text x="615" y="240" textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">is [1, .., 3]</text>
          <text x="615" y="256" textAnchor="middle" fontSize="10" fill={secondary}>匹配序列结构</text>
          <text x="615" y="270" textAnchor="middle" fontSize="10" fill={secondary}>C# 10 新增</text>

          {/* switch 表达式说明 */}
          <rect x="40" y="296" width="640" height="56" rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeDasharray="4 3" />
          <text x="60" y="316" textAnchor="start" fontSize="11" fontWeight="600" fill={accent}>switch 表达式（C# 8.0）</text>
          <text x="60" y="334" textAnchor="start" fontSize="10" fill={secondary} fontFamily="monospace">
            type switch {"{ \"vip\" => 0.3m, \"member\" => 0.1m, _ => 0m }"}
          </text>
          <text x="60" y="348" textAnchor="start" fontSize="10" fill={secondary}>
            表达式形式 · 有返回值 · 编译器检查穷尽性 · _ 是弃元
          </text>

          {/* 底部总结 */}
          <line x1="32" y1="368" x2={VIEW_W - 32} y2="368" stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y="388" textAnchor="middle" fontSize="11" fill={secondary}>
            模式匹配 = 声明式数据提取 · 检查+提取一步完成 · 可组合嵌套
          </text>
          <text x={VIEW_W / 2} y="404" textAnchor="middle" fontSize="11" fill={secondary}>
            类型 → 属性 → 关系逻辑 → 列表 · 从 C# 7.0 到 10.0 逐步增强
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模式匹配将类型检查、数据提取和条件判断合为一步。四种模式可组合嵌套，switch 表达式提供声明式分支。C# 10 列表模式匹配序列结构。
      </figcaption>
    </figure>
  );
}
