/**
 * <StringMemoryDiagram>：C 风格 char[]（栈上连续字符 +\0）vs C++ std::string（栈上指针→堆上数据）的内存布局对比图。
 *
 * 左侧：C 风格 char s[] = "Hi";——栈上连续 3 字节 'H' 'i' '\0'
 * 右侧：std::string s = "Hi";——栈上指针 + size + capacity → 指向堆上 "Hi\0" 数据
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary / --text-secondary）。
 */
export function StringMemoryDiagram() {
  const token = {
    accent: "var(--accent)",
    border: "var(--border)",
    bg: "var(--bg)",
    bgElevated: "var(--bg-elevated)",
    textPrimary: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label="C 风格 char[] vs std::string 内存布局对比：左侧栈上连续字符+\0，右侧栈上指针指向堆上数据"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 左侧：C 风格 char[] ===== */}
          {/* 背景 */}
          <rect x="16" y="16" width="330" height="380" rx="8" fill={token.bgElevated} stroke={token.border} />

          {/* 标题 */}
          <text x="181" y="44" fontSize="14" fontWeight="700" fill={token.textPrimary} textAnchor="middle" fontFamily="monospace">C 风格 char s[] = "Hi";</text>

          {/* 栈区标签 */}
          <rect x="36" y="60" width="60" height="20" rx="4" fill={token.accent} opacity="0.15" />
          <text x="66" y="74" fontSize="10" fill={token.accent} textAnchor="middle" fontFamily="monospace">栈 (stack)</text>

          {/* 三个字节格 */}
          <rect x="60" y="96" width="260" height="44" rx="4" fill={token.bg} stroke={token.border} />
          <line x1="146" y1="96" x2="146" y2="140" stroke={token.border} />
          <line x1="233" y1="96" x2="233" y2="140" stroke={token.border} />

          <text x="103" y="122" fontSize="16" fontWeight="700" fill="var(--accent)" textAnchor="middle" fontFamily="monospace">'H'</text>
          <text x="190" y="122" fontSize="16" fontWeight="700" fill="var(--accent)" textAnchor="middle" fontFamily="monospace">'i'</text>
          <text x="276" y="122" fontSize="16" fontWeight="700" fill="rgb(229,181,103)" textAnchor="middle" fontFamily="monospace">\0</text>

          {/* 单元格标注 */}
          <text x="103" y="158" fontSize="10" fill={token.textSecondary} textAnchor="middle">s[0]</text>
          <text x="190" y="158" fontSize="10" fill={token.textSecondary} textAnchor="middle">s[1]</text>
          <text x="276" y="158" fontSize="10" fill={token.textSecondary} textAnchor="middle">s[2]</text>

          {/* 说明 */}
          <text x="190" y="190" fontSize="11" fill={token.textSecondary} textAnchor="middle">3 个字节在栈上连续排列</text>
          <text x="190" y="208" fontSize="11" fill={token.textSecondary} textAnchor="middle">\0 是字符串结束标记</text>

          {/* 缺点提示 */}
          <rect x="50" y="236" width="280" height="56" rx="6" fill="rgb(229,181,103)" opacity="0.08" />
          <text x="60" y="256" fontSize="11" fill="rgb(229,181,103)">⚠ 大小固定，不能动态扩展</text>
          <text x="60" y="274" fontSize="11" fill="rgb(229,181,103)">⚠ s = "Hello World!" 放不下</text>

          {/* ===== 右侧：std::string ===== */}
          <rect x="370" y="16" width="335" height="380" rx="8" fill={token.bgElevated} stroke={token.border} />

          <text x="537" y="44" fontSize="14" fontWeight="700" fill={token.textPrimary} textAnchor="middle" fontFamily="monospace">std::string s = "Hi";</text>

          {/* 栈区 */}
          <rect x="390" y="60" width="60" height="20" rx="4" fill={token.accent} opacity="0.15" />
          <text x="420" y="74" fontSize="10" fill={token.accent} textAnchor="middle" fontFamily="monospace">栈 (stack)</text>

          {/* 栈上三个字段 */}
          <rect x="400" y="96" width="275" height="72" rx="4" fill={token.bg} stroke={token.border} />
          <line x1="490" y1="96" x2="490" y2="168" stroke={token.border} />
          <line x1="575" y1="96" x2="575" y2="168" stroke={token.border} />

          <text x="445" y="118" fontSize="10" fill={token.textSecondary} textAnchor="middle">指针</text>
          <text x="445" y="136" fontSize="13" fontWeight="700" fill="var(--accent)" textAnchor="middle" fontFamily="monospace">→</text>
          <text x="445" y="154" fontSize="10" fill={token.textSecondary} textAnchor="middle">data*</text>

          <text x="532" y="118" fontSize="10" fill={token.textSecondary} textAnchor="middle">大小</text>
          <text x="532" y="138" fontSize="13" fontWeight="600" fill={token.textPrimary} textAnchor="middle" fontFamily="monospace">2</text>
          <text x="532" y="154" fontSize="10" fill={token.textSecondary} textAnchor="middle">size</text>

          <text x="618" y="118" fontSize="10" fill={token.textSecondary} textAnchor="middle">容量</text>
          <text x="618" y="138" fontSize="13" fontWeight="600" fill={token.textPrimary} textAnchor="middle" fontFamily="monospace">2</text>
          <text x="618" y="154" fontSize="10" fill={token.textSecondary} textAnchor="middle">capacity</text>

          {/* 堆区 */}
          <rect x="420" y="190" width="120" height="20" rx="4" fill="rgb(63,185,127)" opacity="0.15" />
          <text x="480" y="204" fontSize="10" fill="rgb(63,185,127)" textAnchor="middle" fontFamily="monospace">堆 (heap)</text>

          {/* 箭头：栈指针 → 堆数据 */}
          <line x1="445" y1="168" x2="445" y2="222" stroke={token.accent} strokeWidth="2" markerEnd="url(#arrowAccent)" />
          <line x1="445" y1="168" x2="465" y2="222" stroke={token.accent} strokeWidth="2" markerEnd="url(#arrowAccent2)" />

          {/* 堆上数据 */}
          <rect x="420" y="230" width="260" height="44" rx="4" fill={token.bg} stroke="rgb(63,185,127)" />
          <line x1="506" y1="230" x2="506" y2="274" stroke={token.border} />
          <line x1="593" y1="230" x2="593" y2="274" stroke={token.border} />

          <text x="463" y="256" fontSize="16" fontWeight="700" fill="var(--accent)" textAnchor="middle" fontFamily="monospace">'H'</text>
          <text x="550" y="256" fontSize="16" fontWeight="700" fill="var(--accent)" textAnchor="middle" fontFamily="monospace">'i'</text>
          <text x="636" y="256" fontSize="16" fontWeight="700" fill="rgb(229,181,103)" textAnchor="middle" fontFamily="monospace">\0</text>

          {/* 优势提示 */}
          <rect x="400" y="296" width="295" height="56" rx="6" fill="rgb(63,185,127)" opacity="0.08" />
          <text x="410" y="316" fontSize="11" fill="rgb(63,185,127)">✓ 堆上分配，大小可动态增长</text>
          <text x="410" y="334" fontSize="11" fill="rgb(63,185,127)">✓ s = "Hello World!" 完全没问题</text>

          {/* 箭头标记定义 */}
          <defs>
            <marker id="arrowAccent" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={token.accent} />
            </marker>
            <marker id="arrowAccent2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={token.accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C 风格数组（左）把字符连续排在栈上，大小写好就定死了。std::string（右）只在栈上存一根指针，实际数据躲在堆里——换一根更长的字符串，只要重新在堆上分配、把指针指过去就行，原来的栈上空间只占那三四个字段。
      </figcaption>
    </figure>
  );
}
