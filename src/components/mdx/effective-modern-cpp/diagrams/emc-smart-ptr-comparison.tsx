/**
 * <EmcSmartPtrComparisonDiagram>：unique_ptr / shared_ptr / weak_ptr 对比。
 *
 * 三列对比三种智能指针的所有权语义：
 *   - 第 1 列「unique_ptr」（accent 紫）：独占所有权，零开销，不可拷贝可移动
 *   - 第 2 列「shared_ptr」（success 绿）：共享所有权，引用计数，原子开销
 *   - 第 3 列「weak_ptr」（warning 暖）：观察者，不增引用计数，打破循环引用
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const COL_W = 200;
const COL_GAP = 28;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const ROW_H = 56;
const ROW_GAP = 12;
const ROW_START_Y = 120;
const rowY = (i: number) => ROW_START_Y + i * (ROW_H + ROW_GAP);

interface Row {
  label: string;
  values: string[];
}

const ROWS: readonly Row[] = [
  { label: "所有权", values: ["独占", "共享", "无（观察）"] },
  { label: "拷贝", values: ["禁止", "允许", "允许"] },
  { label: "移动", values: ["允许", "允许", "允许"] },
  { label: "开销", values: ["零开销", "原子计数", "lock 提升开销"] },
  { label: "典型用途", values: ["默认选择", "多所有者", "打破循环"] },
];

const HEADERS: { name: string; color: string }[] = [
  { name: "unique_ptr", color: "var(--accent)" },
  { name: "shared_ptr", color: "var(--success)" },
  { name: "weak_ptr", color: "var(--warning)" },
];

export function EmcSmartPtrComparisonDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="三种智能指针对比表。三列：unique_ptr（紫色，独占所有权、禁止拷贝、允许移动、零开销、默认选择）；shared_ptr（绿色，共享所有权、允许拷贝、原子计数开销、多所有者）；weak_ptr（暖色，无所有权观察者、允许拷贝移动、lock 提升开销、打破循环引用）。五行属性：所有权、拷贝、移动、开销、典型用途。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            三种智能指针所有权对比
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            条款 18-20 · 独占 · 共享 · 观察
          </text>

          {/* 列头 */}
          {HEADERS.map((h, ci) => {
            const cx = colX(ci);
            return (
              <g key={h.name}>
                <rect x={cx} y={78} width={COL_W} height={30} rx="6" fill={h.color} fillOpacity="0.14" stroke={h.color} strokeWidth="1.5" />
                <text x={cx + COL_W / 2} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={h.color} fontFamily="monospace">
                  {h.name}
                </text>
              </g>
            );
          })}

          {/* 行 */}
          {ROWS.map((row, ri) => {
            const y = rowY(ri);
            return (
              <g key={row.label}>
                {/* 属性标签列（在最左列之前） */}
                <text x={COL_MARGIN - 12} y={y + ROW_H / 2 + 4} textAnchor="end" fontSize="11.5" fontWeight="600" fill="var(--text-secondary)">
                  {row.label}
                </text>
                {HEADERS.map((h, ci) => {
                  const cx = colX(ci);
                  return (
                    <g key={`${row.label}-${h.name}`}>
                      <rect x={cx} y={y} width={COL_W} height={ROW_H} rx="8" fill={h.color} fillOpacity="0.05" stroke={h.color} strokeWidth="1.2" strokeOpacity="0.45" />
                      <text x={cx + COL_W / 2} y={y + ROW_H / 2 + 4} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--text-primary)">
                        {row.values[ci]}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={32} y1={448} x2={VIEW_W - 32} y2={448} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={470} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            默认 unique_ptr；需要多所有者才 shared_ptr；循环引用处配 weak_ptr
          </text>
          <text x={VIEW_W / 2} y={488} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
            unique_ptr 可隐式转 shared_ptr，反之不可
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        unique_ptr 独占（默认选择，零开销），shared_ptr 共享（引用计数），weak_ptr 观察（打破循环引用）。三者由所有权语义决定选用。
      </figcaption>
    </figure>
  );
}
