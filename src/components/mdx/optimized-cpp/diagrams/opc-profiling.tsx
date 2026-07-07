/**
 * <OpcProfilingDiagram>：性能分析工具（optimized-cpp 性能分析章）。
 *
 * 四象限矩阵：横轴「开销」从低到高，纵轴「精度」从低到高。
 * 四个工具落在不同象限：perf（低开销中精度）、gprof（中开销中精度）、
 * Valgrind/Callgrind（高开销高精度）、google-benchmark（基准测试）。
 * 底部一条工作流总结栏。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

type Tool = {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  desc: string;
};

const TOOLS: readonly Tool[] = [
  { id: "perf", name: "perf", x: 200, y: 220, color: "var(--success)", desc: "采样剖析\n低开销" },
  { id: "gprof", name: "gprof", x: 340, y: 180, color: "var(--warning)", desc: "插桩剖析\n中开销" },
  { id: "valgrind", name: "Valgrind\nCallgrind", x: 470, y: 120, color: "var(--danger)", desc: "高精度模拟\n高开销" },
  { id: "benchmark", name: "google-\nbenchmark", x: 560, y: 250, color: "var(--accent)", desc: "微基准测试\n量化耗时" },
];

export function OpcProfilingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="性能分析工具矩阵图。横轴开销从低到高，纵轴精度从低到高。perf 采样剖析低开销中精度；gprof 插桩剖析中开销中精度；Valgrind Callgrind 高精度模拟高开销；google-benchmark 微基准测试量化耗时。底部工作流：先 benchmark 建基线，再 perf 定位热点，最后 Valgrind 深挖。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            性能分析工具 · 开销与精度矩阵
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            不同工具有不同的开销与精度权衡——先用低开销工具定位，再用高精度工具深挖
          </text>

          {/* ===== 坐标轴 ===== */}
          <line x1="120" y1="300" x2="620" y2="300" stroke="var(--border)" strokeWidth="1.4" />
          <line x1="120" y1="80" x2="120" y2="300" stroke="var(--border)" strokeWidth="1.4" />
          <text x="370" y="320" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">开销 →</text>
          <text x="100" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)" transform="rotate(-90 100 190)">精度 →</text>

          {/* 象限标签 */}
          <text x="200" y="100" fontSize="11" fill="var(--text-secondary)" fillOpacity="0.7">低开销 · 高精度</text>
          <text x="500" y="100" fontSize="11" fill="var(--text-secondary)" fillOpacity="0.7">高开销 · 高精度</text>
          <text x="200" y="290" fontSize="11" fill="var(--text-secondary)" fillOpacity="0.7">低开销 · 低精度</text>
          <text x="500" y="290" fontSize="11" fill="var(--text-secondary)" fillOpacity="0.7">高开销 · 低精度</text>

          {/* ===== 四个工具节点 ===== */}
          {TOOLS.map((t) => (
            <g key={t.id}>
              <circle cx={t.x} cy={t.y} r="28" fill={t.color} fillOpacity="0.12" stroke={t.color} strokeWidth="1.4" />
              {t.name.split("\n").map((line, li) => (
                <text key={li} x={t.x} y={t.y - 2 + li * 14} textAnchor="middle" fontSize="11" fontWeight="700" fill={t.color}>{line}</text>
              ))}
              <text x={t.x} y={t.y + 44} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{t.desc.split("\n")[0]}</text>
              <text x={t.x} y={t.y + 58} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{t.desc.split("\n")[1]}</text>
            </g>
          ))}

          {/* ===== 底部工作流 ===== */}
          <rect x="60" y="360" width={VIEW_W - 120} height="72" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="384" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            推荐工作流：benchmark 建基线 → perf 定位热点 → Valgrind 深挖
          </text>
          <text x={VIEW_W / 2} y="404" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            先用 google-benchmark 量化当前性能，再用 perf 采样找出热点函数
          </text>
          <text x={VIEW_W / 2} y="420" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            最后用 Valgrind/Callgrind 精确分析热点内部的调用与缓存行为
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        性能分析工具的选择遵循「先粗后细」原则：google-benchmark 量化基线，perf 低开销采样定位热点，Valgrind/Callgrind 高精度模拟深挖细节。开销越高的工具精度越好但运行越慢，按需选择。
      </figcaption>
    </figure>
  );
}
