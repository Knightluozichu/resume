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

  // 画布尺寸
  const w = 760;
  const h = 520;
  const cx = w / 2; // 380

  // 类框样式
  const boxW = 110;
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
  const y2 = 200; // istream(左) / ostream(右)
  const y3 = 300; // 单行布局：istringstream / ifstream / iostream / ofstream / ostringstream
  const y4 = 410; // fstream / stringstream

  // Layer 2 中心
  const xIstream = 160;
  const xOstream = cx + 80; // 460

  // Layer 3 五节点中心 x（间距 145，全部居中）
  const xIstrStream = 90;
  const xIfstream  = 235;
  const xIostream  = cx;       // 380
  const xOfstream  = 525;
  const xOstrStream = 670;

  // Layer 4 节点中心 x
  const xFstream      = 300;
  const xStringstream = 460;

  // 关键中介横线
  const yBus = y2 + boxH + 14; // 248：Layer 2 → Layer 3 汇聚总线
  const yBus4 = y3 + boxH + 22; // 356：Layer 3 → Layer 4 汇聚总线

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ iostream 家族继承树：ios_base 是基类，ios 继承它，istream 和 ostream 继承 ios，iostream 同时继承两者。ifstream 和 istringstream 继承自 istream，ofstream 和 ostringstream 继承自 ostream，fstream 继承自 iostream，stringstream 由 istringstream 和 ostringstream 汇聚"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* ═══════════ Layer 0: ios_base ═══════════ */}
          <rect x={cx - boxW / 2} y={y0} width={boxW} height={boxH} rx={boxRx} fill={baseFill} stroke={baseStroke} strokeWidth="1.5" />
          <text x={cx} y={y0 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">ios_base</text>

          {/* 垂直线 ios_base → ios */}
          <line x1={cx} y1={y0 + boxH} x2={cx} y2={y1} stroke={border} strokeWidth="1.5" />

          {/* ═══════════ Layer 1: ios ═══════════ */}
          <rect x={cx - boxW / 2} y={y1} width={boxW} height={boxH} rx={boxRx} fill={baseFill} stroke={baseStroke} strokeWidth="1.5" />
          <text x={cx} y={y1 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">ios</text>

          {/* 分叉线：ios → istream/ostream */}
          <line x1={cx} y1={y1 + boxH} x2={cx} y2={y1 + boxH + 22} stroke={border} strokeWidth="1.5" />
          <line x1={xIstream} y1={y1 + boxH + 22} x2={xOstream} y2={y1 + boxH + 22} stroke={border} strokeWidth="1.5" />

          {/* ── 左侧 istream ── */}
          <line x1={xIstream} y1={y1 + boxH + 22} x2={xIstream} y2={y2} stroke={border} strokeWidth="1.5" />
          <rect x={xIstream - boxW / 2} y={y2} width={boxW} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={xIstream} y={y2 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">istream</text>

          {/* ── 右侧 ostream ── */}
          <line x1={xOstream} y1={y1 + boxH + 22} x2={xOstream} y2={y2} stroke={border} strokeWidth="1.5" />
          <rect x={xOstream - boxW / 2} y={y2} width={boxW} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={xOstream} y={y2 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">ostream</text>

          {/* ═══════════ Layer 2 → Layer 3 汇聚总线（y=yBus=248）═══════════ */}
          {/* istream 下垂到总线 */}
          <line x1={xIstream} y1={y2 + boxH} x2={xIstream} y2={yBus} stroke={border} strokeWidth="1.5" />
          {/* ostream 下垂到总线 */}
          <line x1={xOstream} y1={y2 + boxH} x2={xOstream} y2={yBus} stroke={border} strokeWidth="1.5" />
          {/* 总线左段：istream → istringstream */}
          <line x1={xIstrStream} y1={yBus} x2={xIstream} y2={yBus} stroke={border} strokeWidth="1.5" />
          {/* 总线右段：ostream → ostringstream */}
          <line x1={xOstream} y1={yBus} x2={xOstrStream} y2={yBus} stroke={border} strokeWidth="1.5" />
          {/* 中段：istream → iostream 中介，ostream → iostream 中介（用于双继承汇聚） */}
          <line x1={xIstream} y1={yBus} x2={xIostream} y2={yBus} stroke={border} strokeWidth="1.5" />
          <line x1={xIostream} y1={yBus} x2={xOstream} y2={yBus} stroke={border} strokeWidth="1.5" />

          {/* ═══════════ Layer 3 五节点垂直下接 ═══════════ */}
          {/* istringstream ← istream */}
          <line x1={xIstrStream} y1={yBus} x2={xIstrStream} y2={y3} stroke={border} strokeWidth="1.5" />
          {/* ifstream ← istream（从总线 xIstream 拐到 xIfstream） */}
          <line x1={xIfstream} y1={yBus} x2={xIfstream} y2={y3} stroke={border} strokeWidth="1.5" />
          {/* iostream ← istream + ostream（中介） */}
          <line x1={xIostream} y1={yBus} x2={xIostream} y2={y3} stroke={border} strokeWidth="2" />
          {/* ofstream ← ostream */}
          <line x1={xOfstream} y1={yBus} x2={xOfstream} y2={y3} stroke={border} strokeWidth="1.5" />
          {/* ostringstream ← ostream */}
          <line x1={xOstrStream} y1={yBus} x2={xOstrStream} y2={y3} stroke={border} strokeWidth="1.5" />

          {/* ── istringstream ── */}
          <rect x={xIstrStream - boxW / 2} y={y3} width={boxW} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={xIstrStream} y={y3 + boxH / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">istringstream</text>

          {/* ── ifstream ── */}
          <rect x={xIfstream - boxW / 2} y={y3} width={boxW} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={xIfstream} y={y3 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">ifstream</text>

          {/* ── iostream（多重继承，高亮） ── */}
          <rect x={xIostream - boxW / 2} y={y3} width={boxW} height={boxH} rx={boxRx} fill={derivedFill} stroke={accent} strokeWidth="2" />
          <text x={xIostream} y={y3 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">iostream</text>

          {/* ── ofstream ── */}
          <rect x={xOfstream - boxW / 2} y={y3} width={boxW} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={xOfstream} y={y3 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">ofstream</text>

          {/* ── ostringstream ── */}
          <rect x={xOstrStream - boxW / 2} y={y3} width={boxW} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={xOstrStream} y={y3 + boxH / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">ostringstream</text>

          {/* ═══════════ Layer 3 → Layer 4 汇聚总线（y=yBus4=356）═══════════ */}
          {/* iostream 下垂到 yBus4（用于 fstream） */}
          <line x1={xIostream} y1={y3 + boxH} x2={xIostream} y2={yBus4} stroke={border} strokeWidth="1.5" />
          {/* istringstream 下垂到 yBus4 */}
          <line x1={xIstrStream} y1={y3 + boxH} x2={xIstrStream} y2={yBus4} stroke={border} strokeWidth="1.5" />
          {/* ostringstream 下垂到 yBus4 */}
          <line x1={xOstrStream} y1={y3 + boxH} x2={xOstrStream} y2={yBus4} stroke={border} strokeWidth="1.5" />
          {/* 总线（istringstream → stringstream ← ostringstream） */}
          <line x1={xIstrStream} y1={yBus4} x2={xOstrStream} y2={yBus4} stroke={border} strokeWidth="1.5" />

          {/* fstream ← iostream */}
          <line x1={xFstream} y1={yBus4} x2={xFstream} y2={y4} stroke={border} strokeWidth="1.5" />
          <line x1={xIostream} y1={yBus4} x2={xFstream} y2={yBus4} stroke={border} strokeWidth="1.5" />
          {/* stringstream ← 总线 */}
          <line x1={xStringstream} y1={yBus4} x2={xStringstream} y2={y4} stroke={border} strokeWidth="1.5" />

          {/* ── fstream ── */}
          <rect x={xFstream - boxW / 2} y={y4} width={boxW} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={xFstream} y={y4 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">fstream</text>

          {/* ── stringstream ── */}
          <rect x={xStringstream - boxW / 2} y={y4} width={boxW} height={boxH} rx={boxRx} fill={derivedFill} stroke={derivedStroke} strokeWidth="1.5" />
          <text x={xStringstream} y={y4 + boxH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">stringstream</text>

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
