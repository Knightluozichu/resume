/**
 * <KrcControlFlowChart>：C 语言控制流结构对比流程图。
 *
 * 五种控制流结构以 3×2 网格排布，每种展示其执行路径：
 *   - if-else：条件二分支
 *   - switch：多路分支
 *   - while：先判断后执行
 *   - for：初始化+判断+更新
 *   - do-while：先执行后判断
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const CELL_W = 208;
const CELL_H = 168;
const CELL_GAP_X = 18;
const CELL_GAP_Y = 16;
const MARGIN_X = 30;
const START_Y = 88;

const cellX = (col: number) => MARGIN_X + col * (CELL_W + CELL_GAP_X);
const cellY = (row: number) => START_Y + row * (CELL_H + CELL_GAP_Y);

interface Cell {
  title: string;
  color: string;
}

const CELLS: readonly Cell[] = [
  { title: "if-else",   color: "var(--accent)" },
  { title: "switch",    color: "var(--accent)" },
  { title: "while",     color: "var(--success)" },
  { title: "for",       color: "var(--success)" },
  { title: "do-while",  color: "var(--warning)" },
];

export function KrcControlFlowChart() {
  // 3 columns, 2 rows; cell index → col/row
  const colOf = (i: number) => i % 3;
  const rowOf = (i: number) => Math.floor(i / 3);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C 语言五种控制流结构的流程图对比：if-else 条件二分支、switch 多路分支、while 先判断后执行、for 初始化加判断加更新、do-while 先执行后判断。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="krc-cf-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C 控制流结构 · 流程图对比
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            菱形 = 判断，矩形 = 执行，箭头 = 流向
          </text>

          {/* ── Cell 0: if-else ── */}
          {(() => {
            const cx = cellX(0), cy = cellY(0);
            const cell = CELLS[0];
            return (
              <g>
                <rect x={cx} y={cy} width={CELL_W} height={CELL_H} rx="10" fill={cell.color} fillOpacity="0.04" stroke={cell.color} strokeWidth="1.2" strokeOpacity="0.4" />
                <text x={cx + CELL_W / 2} y={cy + 20} textAnchor="middle" fontSize="13" fontWeight="700" fill={cell.color}>{cell.title}</text>
                {/* cond diamond */}
                <polygon points={`${cx + CELL_W / 2},${cy + 36} ${cx + CELL_W / 2 + 36},${cy + 58} ${cx + CELL_W / 2},${cy + 80} ${cx + CELL_W / 2 - 36},${cy + 58}`} fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.3" />
                <text x={cx + CELL_W / 2} y={cy + 62} textAnchor="middle" fontSize="11" fill="var(--text-primary)">cond</text>
                {/* T branch */}
                <text x={cx + CELL_W / 2 - 48} y={cy + 54} textAnchor="middle" fontSize="11" fill="var(--success)">T</text>
                <line x1={cx + CELL_W / 2 - 36} y1={cy + 58} x2={cx + 30} y2={cy + 58} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-cf-arrow)" />
                <rect x={cx + 18} y={cy + 68} width={48} height={22} rx="4" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
                <text x={cx + 42} y={cy + 83} textAnchor="middle" fontSize="11" fill="var(--text-primary)">stmt1</text>
                <line x1={cx + CELL_W / 2 - 36} y1={cy + 58} x2={cx + 42} y2={cy + 68} stroke="var(--text-secondary)" strokeWidth="1.2" />
                {/* F branch */}
                <text x={cx + CELL_W / 2 + 48} y={cy + 54} textAnchor="middle" fontSize="11" fill="var(--warning)">F</text>
                <line x1={cx + CELL_W / 2 + 36} y1={cy + 58} x2={cx + CELL_W - 30} y2={cy + 58} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-cf-arrow)" />
                <rect x={cx + CELL_W - 66} y={cy + 68} width={48} height={22} rx="4" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
                <text x={cx + CELL_W - 42} y={cy + 83} textAnchor="middle" fontSize="11" fill="var(--text-primary)">stmt2</text>
                <line x1={cx + CELL_W / 2 + 36} y1={cy + 58} x2={cx + CELL_W - 42} y2={cy + 68} stroke="var(--text-secondary)" strokeWidth="1.2" />
                <text x={cx + CELL_W / 2} y={cy + 110} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">真走 stmt1，假走 stmt2</text>
              </g>
            );
          })()}

          {/* ── Cell 1: switch ── */}
          {(() => {
            const cx = cellX(1), cy = cellY(0);
            const cell = CELLS[1];
            return (
              <g>
                <rect x={cx} y={cy} width={CELL_W} height={CELL_H} rx="10" fill={cell.color} fillOpacity="0.04" stroke={cell.color} strokeWidth="1.2" strokeOpacity="0.4" />
                <text x={cx + CELL_W / 2} y={cy + 20} textAnchor="middle" fontSize="13" fontWeight="700" fill={cell.color}>{cell.title}</text>
                {/* expr box */}
                <rect x={cx + CELL_W / 2 - 34} y={cy + 30} width={68} height={22} rx="4" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.2" />
                <text x={cx + CELL_W / 2} y={cy + 45} textAnchor="middle" fontSize="11" fill="var(--text-primary)">expr</text>
                {/* three cases */}
                {[0, 1, 2].map((ci) => {
                  const ccy = cy + 66 + ci * 30;
                  const label = ci === 2 ? "default" : `case ${ci + 1}`;
                  return (
                    <g key={ci}>
                      <line x1={cx + CELL_W / 2} y1={cy + 52} x2={cx + CELL_W / 2} y2={ccy - 4} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-cf-arrow)" />
                      <rect x={cx + CELL_W / 2 - 44} y={ccy - 2} width={88} height={22} rx="4" fill={cell.color} fillOpacity="0.08" stroke={cell.color} strokeWidth="1" strokeOpacity="0.5" />
                      <text x={cx + CELL_W / 2} y={ccy + 13} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{label}</text>
                    </g>
                  );
                })}
                <text x={cx + CELL_W / 2} y={cy + 156} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">值匹配决定走哪条</text>
              </g>
            );
          })()}

          {/* ── Cell 2: while ── */}
          {(() => {
            const cx = cellX(2), cy = cellY(0);
            const cell = CELLS[2];
            return (
              <g>
                <rect x={cx} y={cy} width={CELL_W} height={CELL_H} rx="10" fill={cell.color} fillOpacity="0.04" stroke={cell.color} strokeWidth="1.2" strokeOpacity="0.4" />
                <text x={cx + CELL_W / 2} y={cy + 20} textAnchor="middle" fontSize="13" fontWeight="700" fill={cell.color}>{cell.title}</text>
                {/* cond diamond */}
                <polygon points={`${cx + CELL_W / 2},${cy + 36} ${cx + CELL_W / 2 + 34},${cy + 56} ${cx + CELL_W / 2},${cy + 76} ${cx + CELL_W / 2 - 34},${cy + 56}`} fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.3" />
                <text x={cx + CELL_W / 2} y={cy + 60} textAnchor="middle" fontSize="11" fill="var(--text-primary)">cond</text>
                {/* T → body → loop back */}
                <text x={cx + CELL_W / 2 + 42} y={cy + 52} fontSize="11" fill="var(--success)">T</text>
                <line x1={cx + CELL_W / 2 + 34} y1={cy + 56} x2={cx + CELL_W - 40} y2={cy + 56} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-cf-arrow)" />
                <rect x={cx + CELL_W - 70} y={cy + 66} width={56} height={22} rx="4" fill={cell.color} fillOpacity="0.08" stroke={cell.color} strokeWidth="1" strokeOpacity="0.5" />
                <text x={cx + CELL_W - 42} y={cy + 81} textAnchor="middle" fontSize="11" fill="var(--text-primary)">body</text>
                {/* loop back arrow */}
                <path d={`M ${cx + CELL_W - 42} ${cy + 66} L ${cx + CELL_W - 42} ${cy + 40} L ${cx + CELL_W / 2} ${cy + 40}`} fill="none" stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-cf-arrow)" />
                {/* F → exit */}
                <text x={cx + CELL_W / 2 - 42} y={cy + 52} textAnchor="end" fontSize="11" fill="var(--warning)">F</text>
                <line x1={cx + CELL_W / 2 - 34} y1={cy + 56} x2={cx + 40} y2={cy + 56} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-cf-arrow)" />
                <text x={cx + 40} y={cy + 50} fontSize="11" fill="var(--text-secondary)">exit</text>
                <text x={cx + CELL_W / 2} y={cy + 110} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">先判断，可能一次都不执行</text>
              </g>
            );
          })()}

          {/* ── Cell 3: for ── */}
          {(() => {
            const cx = cellX(0), cy = cellY(1);
            const cell = CELLS[3];
            return (
              <g>
                <rect x={cx} y={cy} width={CELL_W} height={CELL_H} rx="10" fill={cell.color} fillOpacity="0.04" stroke={cell.color} strokeWidth="1.2" strokeOpacity="0.4" />
                <text x={cx + CELL_W / 2} y={cy + 20} textAnchor="middle" fontSize="13" fontWeight="700" fill={cell.color}>{cell.title}</text>
                {/* init */}
                <rect x={cx + CELL_W / 2 - 34} y={cy + 30} width={68} height={22} rx="4" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.2" />
                <text x={cx + CELL_W / 2} y={cy + 45} textAnchor="middle" fontSize="11" fill="var(--text-primary)">init</text>
                <line x1={cx + CELL_W / 2} y1={cy + 52} x2={cx + CELL_W / 2} y2={cy + 60} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-cf-arrow)" />
                {/* cond diamond */}
                <polygon points={`${cx + CELL_W / 2},${cy + 62} ${cx + CELL_W / 2 + 30},${cy + 78} ${cx + CELL_W / 2},${cy + 94} ${cx + CELL_W / 2 - 30},${cy + 78}`} fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.3" />
                <text x={cx + CELL_W / 2} y={cy + 82} textAnchor="middle" fontSize="11" fill="var(--text-primary)">cond</text>
                {/* T → body → update → loop */}
                <text x={cx + CELL_W / 2 + 38} y={cy + 74} fontSize="11" fill="var(--success)">T</text>
                <line x1={cx + CELL_W / 2 + 30} y1={cy + 78} x2={cx + CELL_W - 40} y2={cy + 78} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-cf-arrow)" />
                <rect x={cx + CELL_W - 66} y={cy + 88} width={52} height={20} rx="4" fill={cell.color} fillOpacity="0.08" stroke={cell.color} strokeWidth="1" strokeOpacity="0.5" />
                <text x={cx + CELL_W - 40} y={cy + 101} textAnchor="middle" fontSize="11" fill="var(--text-primary)">body</text>
                <rect x={cx + CELL_W - 66} y={cy + 112} width={52} height={20} rx="4" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1" />
                <text x={cx + CELL_W - 40} y={cy + 125} textAnchor="middle" fontSize="11" fill="var(--text-primary)">update</text>
                {/* loop back to cond */}
                <path d={`M ${cx + CELL_W - 66} ${cy + 122} L ${cx + 40} ${cy + 122} L ${cx + 40} ${cy + 78} L ${cx + CELL_W / 2 - 30} ${cy + 78}`} fill="none" stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-cf-arrow)" />
                <text x={cx + 44} y={cy + 116} fontSize="11" fill="var(--text-secondary)">F→exit</text>
              </g>
            );
          })()}

          {/* ── Cell 4: do-while ── */}
          {(() => {
            const cx = cellX(1), cy = cellY(1);
            const cell = CELLS[4];
            return (
              <g>
                <rect x={cx} y={cy} width={CELL_W} height={CELL_H} rx="10" fill={cell.color} fillOpacity="0.04" stroke={cell.color} strokeWidth="1.2" strokeOpacity="0.4" />
                <text x={cx + CELL_W / 2} y={cy + 20} textAnchor="middle" fontSize="13" fontWeight="700" fill={cell.color}>{cell.title}</text>
                {/* body first */}
                <rect x={cx + CELL_W / 2 - 34} y={cy + 32} width={68} height={24} rx="4" fill={cell.color} fillOpacity="0.08" stroke={cell.color} strokeWidth="1" strokeOpacity="0.5" />
                <text x={cx + CELL_W / 2} y={cy + 48} textAnchor="middle" fontSize="11" fill="var(--text-primary)">body</text>
                <line x1={cx + CELL_W / 2} y1={cy + 56} x2={cx + CELL_W / 2} y2={cy + 64} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-cf-arrow)" />
                {/* cond diamond */}
                <polygon points={`${cx + CELL_W / 2},${cy + 66} ${cx + CELL_W / 2 + 36},${cy + 86} ${cx + CELL_W / 2},${cy + 106} ${cx + CELL_W / 2 - 36},${cy + 86}`} fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.3" />
                <text x={cx + CELL_W / 2} y={cy + 90} textAnchor="middle" fontSize="11" fill="var(--text-primary)">cond</text>
                {/* T → loop back to body */}
                <text x={cx + CELL_W / 2 + 44} y={cy + 82} fontSize="11" fill="var(--success)">T</text>
                <path d={`M ${cx + CELL_W / 2 + 36} ${cy + 86} L ${cx + CELL_W - 36} ${cy + 86} L ${cx + CELL_W - 36} ${cy + 44} L ${cx + CELL_W / 2 + 34} ${cy + 44}`} fill="none" stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-cf-arrow)" />
                {/* F → exit */}
                <text x={cx + CELL_W / 2 - 44} y={cy + 82} textAnchor="end" fontSize="11" fill="var(--warning)">F</text>
                <line x1={cx + CELL_W / 2 - 36} y1={cy + 86} x2={cx + 36} y2={cy + 86} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-cf-arrow)" />
                <text x={cx + 36} y={cy + 80} fontSize="11" fill="var(--text-secondary)">exit</text>
                <text x={cx + CELL_W / 2} y={cy + 130} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">先执行，至少跑一次</text>
              </g>
            );
          })()}

          {/* ── Cell 5: summary ── */}
          {(() => {
            const cx = cellX(2), cy = cellY(1);
            return (
              <g>
                <rect x={cx} y={cy} width={CELL_W} height={CELL_H} rx="10" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" strokeDasharray="4 3" />
                <text x={cx + CELL_W / 2} y={cy + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">关键区别</text>
                <text x={cx + 16} y={cy + 50} fontSize="11" fill="var(--text-secondary)">• while / for：先判断</text>
                <text x={cx + 16} y={cy + 70} fontSize="11" fill="var(--text-secondary)">  循环体可能 0 次执行</text>
                <text x={cx + 16} y={cy + 94} fontSize="11" fill="var(--text-secondary)">• do-while：先执行</text>
                <text x={cx + 16} y={cy + 114} fontSize="11" fill="var(--text-secondary)">  循环体至少 1 次</text>
                <text x={cx + 16} y={cy + 138} fontSize="11" fill="var(--text-secondary)">• switch 需 break 防穿透</text>
              </g>
            );
          })()}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C 五种控制流结构对比。while/for 先判断后执行（可能 0 次），do-while 先执行后判断（至少 1 次），switch 需用 break 防止 case 穿透。
      </figcaption>
    </figure>
  );
}
