/**
 * <ConditionalCompileDiagram>：#ifdef / #ifndef 条件编译分支示意。
 */

export function ConditionalCompileDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const kept = "rgb(237,137,99)";
  const dropped = "rgb(229,103,103)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="条件编译：根据宏是否定义保留或丢弃代码块"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            #ifdef DEBUG ... #else ... #endif
          </text>

          {/* 菱形：条件 */}
          <polygon
            points="320,56 400,96 320,136 240,96"
            fill={bg}
            stroke={accent}
            strokeWidth="2"
          />
          <text x={320} y={92} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} fontFamily="monospace">
            DEBUG
          </text>
          <text x={320} y={108} textAnchor="middle" fontSize="10" fill={secondary}>
            已定义？
          </text>

          {/* 是分支 */}
          <line x1={280} y1={96} x2={120} y2={96} stroke={kept} strokeWidth="1.5" />
          <text x={200} y={88} textAnchor="middle" fontSize="10" fill={kept} fontWeight="600">
            是
          </text>
          <rect x={24} y={148} width={200} height={88} rx="8" fill={bg} stroke={kept} strokeWidth="2" />
          <text x={36} y={172} fontSize="10" fontWeight="600" fill={kept}>
            保留 → 编译进程序
          </text>
          <text x={36} y={196} fontSize="11" fill={primary} fontFamily="monospace">
            #ifdef DEBUG
          </text>
          <text x={36} y={214} fontSize="11" fill={primary} fontFamily="monospace">
            printf(&quot;dbg\n&quot;);
          </text>

          {/* 否分支 */}
          <line x1={360} y1={96} x2={520} y2={96} stroke={dropped} strokeWidth="1.5" strokeDasharray="5 4" />
          <text x={440} y={88} textAnchor="middle" fontSize="10" fill={dropped} fontWeight="600">
            否
          </text>
          <rect x={416} y={148} width={200} height={88} rx="8" fill={bg} stroke={dropped} strokeWidth="1.5" strokeDasharray="6 4" />
          <text x={428} y={172} fontSize="10" fontWeight="600" fill={dropped}>
            丢弃 → 不进 .o
          </text>
          <text x={428} y={196} fontSize="11" fill={secondary} fontFamily="monospace">
            #else
          </text>
          <text x={428} y={214} fontSize="11" fill={secondary} fontFamily="monospace">
            /* 调试关闭 */
          </text>

          {/* include guard */}
          <rect x={24} y={256} width={592} height={72} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={36} y={280} fontSize="11" fontWeight="600" fill={accent} fontFamily="monospace">
            #ifndef GUARD_H
          </text>
          <text x={36} y={300} fontSize="11" fill={primary} fontFamily="monospace">
            #define GUARD_H ... #endif — 首次 include 保留，重复 include 整段跳过
          </text>
          <text x={36} y={318} fontSize="10" fill={secondary} fontFamily="system-ui">
            防止头文件被多次粘贴导致重复定义。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        预处理器根据宏是否定义决定保留哪条分支；#ifndef 常用于头文件包含守卫（include guard）。
      </figcaption>
    </figure>
  );
}
