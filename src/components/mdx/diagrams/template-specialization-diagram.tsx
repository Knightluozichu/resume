/**
 * <TemplateSpecializationDiagram>：模板特化层次树与匹配优先级图。
 *
 * 展示三层特化结构：
 *   ① 主模板（Primary Template）——最通用，任何类型都走这里
 *   ② 偏特化（Partial Specialization）——限定部分参数，如 T* 指针版本
 *   ③ 全特化（Full Specialization）——所有参数都固定，如 int 版本
 *
 * 底部标明匹配优先级：全特化 > 偏特化 > 主模板
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */
export function TemplateSpecializationDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const green = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const red = "rgb(229,103,92)";

  const w = 840;
  const h = 480;
  const cx = w / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="模板特化层次树：主模板→偏特化→全特化 + 匹配优先级"
          className="mx-auto block h-auto w-full max-w-[840px]"
        >
          <text x={cx} y="28" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            模板特化层次树（从最通用到最具体）
          </text>

          {/* ── Level 1：主模板 ── */}
          <g transform="translate(cx - 180, 56)">
            <rect x="0" y="0" width="360" height="56" rx="10" fill={green} fillOpacity="0.08" stroke={green} strokeWidth="2" />
            <text x="180" y="22" fontSize="12" fontWeight="700" fill={green} textAnchor="middle">
              主模板（Primary Template）
            </text>
            <text x="180" y="42" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
              template&lt;typename T&gt; struct Remove{'{'}...{'}'};
            </text>
          </g>

          {/* Arrow down */}
          <line x1={cx} y1="120" x2={cx} y2="145" stroke={border} strokeWidth="1.5" markerEnd="url(#arrowAccent)" />

          {/* ── Level 2 标签 ── */}
          <text x={cx} y="170" fontSize="10" fill={secondary} textAnchor="middle">
            更具体
          </text>

          {/* Arrow branching */}
          <line x1={cx} y1="180" x2={cx - 170} y2="210" stroke={border} strokeWidth="1" />
          <line x1={cx} y1="180" x2={cx} y2="210" stroke={border} strokeWidth="1" />
          <line x1={cx} y1="180" x2={cx + 170} y2="210" stroke={border} strokeWidth="1" />

          {/* ── Level 2：偏特化 × 3 ── */}
          <g transform="translate(28, 215)">
            <rect x="0" y="0" width="250" height="70" rx="8" fill={warn} fillOpacity="0.08" stroke={warn} strokeWidth="1.5" />
            <text x="125" y="20" fontSize="11" fontWeight="700" fill={warn} textAnchor="middle">
              偏特化 T*
            </text>
            <text x="125" y="38" fontSize="9" fill={secondary} textAnchor="middle" fontFamily="monospace">
              template&lt;typename T&gt;
            </text>
            <text x="125" y="54" fontSize="9" fill={primary} textAnchor="middle" fontFamily="monospace">
              struct Remove&lt;T*&gt;{'{'}...{'}'};
            </text>
          </g>

          <g transform="translate(295, 215)">
            <rect x="0" y="0" width="250" height="70" rx="8" fill={warn} fillOpacity="0.08" stroke={warn} strokeWidth="1.5" />
            <text x="125" y="20" fontSize="11" fontWeight="700" fill={warn} textAnchor="middle">
              偏特化 T&amp;
            </text>
            <text x="125" y="38" fontSize="9" fill={secondary} textAnchor="middle" fontFamily="monospace">
              template&lt;typename T&gt;
            </text>
            <text x="125" y="54" fontSize="9" fill={primary} textAnchor="middle" fontFamily="monospace">
              struct Remove&lt;T&amp;&gt;{'{'}...{'}'};
            </text>
          </g>

          <g transform="translate(562, 215)">
            <rect x="0" y="0" width="250" height="70" rx="8" fill={warn} fillOpacity="0.08" stroke={warn} strokeWidth="1.5" />
            <text x="125" y="20" fontSize="11" fontWeight="700" fill={warn} textAnchor="middle">
              偏特化 T&amp;&amp;
            </text>
            <text x="125" y="38" fontSize="9" fill={secondary} textAnchor="middle" fontFamily="monospace">
              template&lt;typename T&gt;
            </text>
            <text x="125" y="54" fontSize="9" fill={primary} textAnchor="middle" fontFamily="monospace">
              struct Remove&lt;T&amp;&amp;&gt;{'{'}...{'}'};
            </text>
          </g>

          {/* Lines down from partial specs */}
          <line x1="153" y1="292" x2="153" y2="320" stroke={border} strokeWidth="1" markerEnd="url(#arrowAccent)" />
          <line x1={cx} y1="292" x2={cx} y2="320" stroke={border} strokeWidth="1" markerEnd="url(#arrowAccent)" />
          <line x1="687" y1="292" x2="687" y2="320" stroke={border} strokeWidth="1" markerEnd="url(#arrowAccent)" />

          {/* ── Level 3：全特化 ── */}
          <g transform="translate(cx - 180, 330)">
            <rect x="0" y="0" width="360" height="48" rx="10" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="2" />
            <text x="180" y="20" fontSize="12" fontWeight="700" fill={accent} textAnchor="middle">
              全特化 int
            </text>
            <text x="180" y="38" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
              template&lt;&gt; struct Remove&lt;int&gt;{'{'}...{'}'};
            </text>
          </g>

          {/* ── 优先级规则 ── */}
          <g transform="translate(20, 400)">
            <rect x="0" y="0" width={w - 40} height="56" rx="8" fill={red} fillOpacity="0.04" stroke={red} strokeWidth="1.5" />

            <text x={cx - 20} y="22" fontSize="12" fontWeight="700" fill={red} textAnchor="middle">
              匹配优先级：全特化 &gt; 偏特化 &gt; 主模板
            </text>
            <text x={cx - 20} y="44" fontSize="10" fill={secondary} textAnchor="middle">
              编译器总是选择"最具体"的版本——参数全部固定 &gt; 部分固定 &gt; 全部开放。找不到特化才用主模板。
            </text>
          </g>

          <defs>
            <marker id="arrowAccent" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
              <polygon points="0,1 8,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        主模板是最通用的蓝图。偏特化限定了部分参数模式（如指针版 T*）。全特化固定了所有参数（如 int 版）。编译器总是选择
        最具体的版本——全特化 &gt; 偏特化 &gt; 主模板。找不到特化才用主模板。
      </figcaption>
    </figure>
  );
}
