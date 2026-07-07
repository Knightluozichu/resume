/**
 * <NamingPrinciplesDiagram>：辅图——「命名原则对比图」。
 *
 * 三行 Bad vs Good 命名对比：
 *  行1 变量名：d vs daysSinceCreation
 *  行2 函数名：process vs processPayment
 *  行3 类名：Data vs CustomerRepository
 *
 * 每行左侧 Bad（danger），中间标注改进方向，右侧 Good（success）。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。
 * Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 380;

const BAD_X = 40;
const BAD_W = 220;
const MID_X = 280;
const MID_W = 160;
const GOOD_X = 480;
const GOOD_W = 200;

const ROW_H = 56;
const ROW_GAP = 16;
const ROW_START_Y = 104;

interface NamingRow {
  category: string;
  bad: string;
  good: string;
  improvement: string;
}

const rows: NamingRow[] = [
  { category: "变量名", bad: "d", good: "daysSinceCreation", improvement: "体现含义" },
  { category: "函数名", bad: "process()", good: "processPayment()", improvement: "动词 + 对象" },
  { category: "类名", bad: "Data", good: "CustomerRepository", improvement: "体现领域" },
];

function rowY(index: number): number {
  return ROW_START_Y + index * (ROW_H + ROW_GAP);
}

export function NamingPrinciplesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="命名原则对比图。三行对比：第一行变量名，Bad 是 d，Good 是 daysSinceCreation，改进方向是体现含义；第二行函数名，Bad 是 process，Good 是 processPayment，改进方向是动词加对象；第三行类名，Bad 是 Data，Good 是 CustomerRepository，改进方向是体现领域。Bad 用红色，Good 用绿色。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            命名原则：Bad vs Good
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            好名字让人不看上下文也能理解意图
          </text>

          {/* 列标题 */}
          <text x={BAD_X + BAD_W / 2} y={84} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">
            Bad 命名
          </text>
          <text x={MID_X + MID_W / 2} y={84} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">
            改进方向
          </text>
          <text x={GOOD_X + GOOD_W / 2} y={84} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">
            Good 命名
          </text>

          {/* 三行对比 */}
          {rows.map((r, i) => {
            const y = rowY(i);
            return (
              <g key={`row-${i}`}>
                {/* Bad 框 */}
                <rect
                  x={BAD_X}
                  y={y}
                  width={BAD_W}
                  height={ROW_H}
                  rx="8"
                  fill="var(--danger)"
                  fillOpacity="0.08"
                  stroke="var(--danger)"
                  strokeWidth="1.5"
                />
                <text x={BAD_X + 16} y={y + 24} fontSize="11" fill="var(--text-secondary)">
                  {r.category}
                </text>
                <text
                  x={BAD_X + 16}
                  y={y + 44}
                  fontSize="15"
                  fontWeight="700"
                  fill="var(--danger)"
                  fontFamily="monospace"
                >
                  {r.bad}
                </text>

                {/* 中间箭头 + 标注 */}
                <line
                  x1={BAD_X + BAD_W + 4}
                  y1={y + ROW_H / 2}
                  x2={MID_X - 4}
                  y2={y + ROW_H / 2}
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  markerEnd="url(#np-arrow-gray)"
                />
                <rect
                  x={MID_X}
                  y={y}
                  width={MID_W}
                  height={ROW_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text x={MID_X + MID_W / 2} y={y + ROW_H / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
                  {r.improvement}
                </text>
                <line
                  x1={MID_X + MID_W + 4}
                  y1={y + ROW_H / 2}
                  x2={GOOD_X - 4}
                  y2={y + ROW_H / 2}
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  markerEnd="url(#np-arrow-gray)"
                />

                {/* Good 框 */}
                <rect
                  x={GOOD_X}
                  y={y}
                  width={GOOD_W}
                  height={ROW_H}
                  rx="8"
                  fill="var(--success)"
                  fillOpacity="0.08"
                  stroke="var(--success)"
                  strokeWidth="1.5"
                />
                <text x={GOOD_X + 16} y={y + 24} fontSize="11" fill="var(--text-secondary)">
                  {r.category}
                </text>
                <text
                  x={GOOD_X + 16}
                  y={y + 44}
                  fontSize="14"
                  fontWeight="700"
                  fill="var(--success)"
                  fontFamily="monospace"
                >
                  {r.good}
                </text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={40} y1={340} x2={VIEW_W - 40} y2={340} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={362} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            名副其实 · 避免误导 · 做有意义的区分 · 使用可读的名称
          </text>

          <defs>
            <marker id="np-arrow-gray" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
              <path d="M0 0 L5 3 L0 6 z" fill="var(--border)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        变量名 d 无法表达含义，改为 daysSinceCreation 后一目了然；函数名 process 太笼统，
        processPayment 明确了动作和对象；类名 Data 毫无信息，CustomerRepository 体现了领域角色。
      </figcaption>
    </figure>
  );
}
