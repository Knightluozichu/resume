/**
 * <IOClassHierarchyDiagram>：C++ iostream 家族继承树。
 *
 * 展示从 ios_base → ios → istream/ostream → 同时派生的 iostream，
 * 以及通过 istream/ostream 派生的 fstream/sstream 体系。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色（var(--xxx)），无阴影。
 */

export function IOClassHierarchyDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";

  // 三层布局
  const w = 760;
  const h = 520;
  const cx = w / 2;

  // 类框样式
  const boxW = 120;
  const boxH = 34;
  const boxRx = 6;

  // 颜色：基类用较淡、派生类用 accent
  const baseFill = bg;
  const baseStroke = border;
  const derivedFill = elevated;
  const derivedStroke = accent;

  // 层 Y 坐标
  const y0 = 30;  // ios_base
  const y1 = 110; // ios
  const y2 = 200; // istream (左) / ostream (右) / streambuf (中)
  const y3 = 300; // iostream(中) / ifstream(左) / ofstream(右) / istringstream(左2) / ostringstream(右2)
  const y4 = 400; // fstream(左) / stringstream(右)

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ iostream 家族继承树：ios_base 是基类，ios 继承它，istream 和 ostream 继承 ios，iostream 同时继承两者。fstream 和 sstream 从 istream/ostream 分支继承"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* ═══════════ Layer 0: ios_base ═══════════ */}
          <rect x={cx - boxW / 2} y={y0} width={boxW} height={boxH} rx={boxRx} fill={baseFill} stroke={baseStroke} strokeWidth="1.5" />
          <text x={cx} y={y0 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">ios_base</text>

          {/* 垂直线 */}
          <line x1={cx} y1={y0 + boxH} x2={cx} y2={y1} stroke={border} strokeWidth="1.5" />

          {/* ═══════════ Layer 1: ios ═══════════ */}
          <rect x={cx - boxW / 2} y={y1} width={boxW} height={boxH} rx={boxRx} fill={baseFill} stroke={baseStroke} strokeWidth="1.5" />
          <text x={cx} y={y1 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">ios</text>

          {/* 分叉线：ios → istream/ostream + streambuf */}
          <line x1={cx} y1={y1 + boxH} x2={cx} y2={y1 + boxH + 22} stroke={border} strokeWidth="1.5" />
          <line x1={160} y1={y1 + boxH + 22} x2={cx + 80} y2={y1 + boxH + 22} stroke={border} strokeWidth="1.5" />

          {/* ── 左侧 istream ── */}
          <line x1={160} y1={y1 + boxH + 22} x2={160} y2={y2} stroke={border} strokeWidth="1.5" />
          <rect x={160 - boxW / 2 - 10} y={y2} width={boxW + 20} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={160} y={y2 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">istream</text>

          {/* ── 右侧 ostream ── */}
          <line x1={cx + 80} y1={y1 + boxH + 22} x2={cx + 80} y2={y2} stroke={border} strokeWidth="1.5" />
          <rect x={cx + 80 - boxW / 2 - 10} y={y2} width={boxW + 20} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={cx + 80} y={y2 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">ostream</text>

          {/* ═══════════ Layer 3: 中间 iostream = istream + ostream ═══════════ */}
          {/* iostream 同时从 istream(左) 和 ostream(右) 汇聚 */}
          <line x1={160} y1={y2 + boxH} x2={160} y2={y2 + boxH + 14} stroke={border} strokeWidth="1.5" />
          <line x1={160} y1={y2 + boxH + 14} x2={cx} y2={y2 + boxH + 14} stroke={border} strokeWidth="1.5" />
          <line x1={cx + 80} y1={y2 + boxH} x2={cx + 80} y2={y2 + boxH + 14} stroke={border} strokeWidth="1.5" />
          <line x1={cx + 80} y1={y2 + boxH + 14} x2={cx} y2={y2 + boxH + 14} stroke={border} strokeWidth="1.5" />
          <line x1={cx} y1={y2 + boxH + 14} x2={cx} y2={y3} stroke={border} strokeWidth="1.5" />

          <rect x={cx - boxW / 2} y={y3} width={boxW} height={boxH} rx={boxRx} fill={derivedFill} stroke={accent} strokeWidth="2" />
          <text x={cx} y={y3 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">iostream</text>
          <text x={cx} y={y3 + boxH + 16} textAnchor="middle" fontSize="9" fill={secondary}>istream + ostream</text>

          {/* ── 左侧 ifstream 继承 istream ── */}
          <line x1={160} y1={y2 + boxH + 14} x2={160} y2={y3} stroke={border} strokeWidth="1.5" />
          <rect x={160 - boxW / 2 - 10} y={y3} width={boxW + 20} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={160} y={y3 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">ifstream</text>

          {/* ── 右侧 ofstream 继承 ostream ── */}
          <line x1={cx + 80} y1={y2 + boxH + 14} x2={cx + 80} y2={y3} stroke={border} strokeWidth="1.5" />
          <rect x={cx + 80 - boxW / 2 - 10} y={y3} width={boxW + 20} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={cx + 80} y={y3 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">ofstream</text>

          {/* ═══════════ Layer 4: fstream 继承 iostream ═══════════ */}
          <line x1={cx} y1={y3 + boxH + 16} x2={cx} y2={y4} stroke={border} strokeWidth="1.5" />

          {/* fstream（双继承 iostream） */}
          <rect x={cx - boxW / 2 - 80} y={y4} width={boxW + 20} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={cx - 80} y={y4 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">fstream</text>
          {/* 从 iostream 连过来 */}
          <line x1={cx} y1={y4} x2={cx} y2={y4} stroke={border} strokeWidth="1.5" />
          <line x1={cx} y1={y4} x2={cx - 80} y2={y4} stroke={border} strokeWidth="1.5" />

          {/* ═══════════ sstream 分支 ═══════════ */}
          {/* istringstream */}
          <line x1={160} y1={y2 + boxH + 14} x2={160} y2={y3} stroke={border} strokeWidth="1.5" />
          <rect x={90} y={y3} width={boxW + 20} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={100} y={y3 + boxH / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">istringstream</text>

          {/* ostringstream */}
          <rect x={cx + 80 + 120} y={y3} width={boxW + 30} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={cx + 80 + 135} y={y3 + boxH / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">ostringstream</text>

          {/* 连线 */}
          <line x1={100} y1={y3} x2={100} y2={y2 + boxH + 14} stroke={border} strokeWidth="1.5" />
          <line x1={160} y1={y2 + boxH + 14} x2={100} y2={y2 + boxH + 14} stroke={border} strokeWidth="1.5" />

          <line x1={cx + 80 + 135} y1={y3} x2={cx + 80 + 135} y2={y2 + boxH + 14} stroke={border} strokeWidth="1.5" />
          <line x1={cx + 80} y1={y2 + boxH + 14} x2={cx + 80 + 135} y2={y2 + boxH + 14} stroke={border} strokeWidth="1.5" />

          {/* stringstream 从 istringstream + ostringstream 汇聚 */}
          <rect x={cx + 40} y={y4} width={boxW + 30} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={cx + 55} y={y4 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">stringstream</text>

          {/* 图例 */}
          <rect x={20} y={h - 36} width={14} height={14} rx={3} fill={baseFill} stroke={baseStroke} strokeWidth="1.5" />
          <text x={40} y={h - 24} fontSize="10" fill={secondary}>基类</text>
          <rect x={90} y={h - 36} width={14} height={14} rx={3} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={110} y={h - 24} fontSize="10" fill={secondary}>派生类</text>
          <rect x={170} y={h - 36} width={14} height={14} rx={3} fill={derivedFill} stroke={accent} strokeWidth="2" />
          <text x={190} y={h - 24} fontSize="10" fill={secondary}>多重继承</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C++ iostream 继承树：ios_base 是所有流类的根基，ios 管理格式状态，istream 管输入、ostream 管输出。
        iostream 同时从两者继承；ifstream/ofstream/fstream 通过文件流类接管文件读写；istringstream/ostringstream/stringstream 在内存中操作字符串。
      </figcaption>
    </figure>
  );
}
