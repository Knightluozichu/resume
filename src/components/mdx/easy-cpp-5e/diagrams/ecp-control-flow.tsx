/**
 * <EcpControlFlowDiagram>：C++ 控制流结构对比图（easy-cpp-5e 控制流章）。
 *
 * 三列分别展示三种控制流结构的流程框图：
 *   if-else 分支（绿）/ for 循环（紫）/ while 循环（橙）
 * 每列用菱形（判断）和矩形（执行）画出流程走向，箭头标注执行顺序。
 * 底部总结三种结构的适用场景。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440、四周留白 ≥32、字号 ≥11、间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 440;

const COL_W = 200;
const COL_GAP = 20;
const COL_MARGIN = 40;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

type FlowCol = {
  id: string;
  name: string;
  color: string;
  code: string;
};

const COLS: readonly FlowCol[] = [
  { id: "if", name: "if-else 分支", color: "var(--success)", code: "if (条件) A\nelse B" },
  { id: "for", name: "for 循环", color: "var(--accent)", code: "for(init; cond; upd)\n  循环体" },
  { id: "while", name: "while 循环", color: "var(--warning)", code: "while (条件)\n  循环体" },
];

export function EcpControlFlowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 控制流结构对比图。三列从左到右：if-else 分支（绿色，条件为真执行 A 为假执行 B）、for 循环（紫色，初始化后判断条件为真执行循环体再更新）、while 循环（橙色，先判断条件为真执行循环体再回到判断）。每列用菱形表示判断、矩形表示执行，箭头标注执行顺序。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 控制流三大结构
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            分支 · 计数循环 · 条件循环
          </text>

          {/* ===== 三列流程图 ===== */}
          {COLS.map((col, ci) => {
            const x = colX(ci);
            const cx = x + COL_W / 2;
            return (
              <g key={col.id}>
                {/* 列头 */}
                <rect x={x} y="76" width={COL_W} height="30" rx="8" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.2" />
                <text x={cx} y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill={col.color}>{col.name}</text>

                {/* 代码示例 */}
                <text x={cx} y="124" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">
                  {col.code.split("\n")[0]}
                </text>
                <text x={cx} y="138" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">
                  {col.code.split("\n")[1]}
                </text>

                {/* 入口箭头 */}
                <line x1={cx} y1="148" x2={cx} y2="160" stroke={col.color} strokeWidth="1.4" strokeOpacity="0.6" />

                {/* 判断菱形 */}
                <polygon points={`${cx - 44},180 ${cx},160 ${cx + 44},180 ${cx},200`} fill={col.color} fillOpacity="0.10" stroke={col.color} strokeWidth="1.2" />
                <text x={cx} y="184" textAnchor="middle" fontSize="11" fill={col.color} fontWeight="700">条件?</text>

                {/* True 分支向下 */}
                <line x1={cx} y1="200" x2={cx} y2="216" stroke={col.color} strokeWidth="1.4" strokeOpacity="0.6" />
                <text x={cx + 8} y="212" fontSize="10" fill="var(--success)">真</text>
                <rect x={x + 20} y="216" width={COL_W - 40} height="28" rx="6" fill="var(--bg)" stroke={col.color} strokeWidth="1" />
                <text x={cx} y="234" textAnchor="middle" fontSize="11" fill="var(--text-primary)">执行 A / 循环体</text>

                {/* False 分支向右下 */}
                {col.id !== "while" && (
                  <>
                    <line x1={cx + 44} y1="180" x2={x + COL_W - 8} y2="180" stroke={col.color} strokeWidth="1.2" strokeOpacity="0.5" />
                    <text x={cx + 48} y="174" fontSize="10" fill="var(--warning)">假</text>
                  </>
                )}

                {/* 循环回退箭头（for / while） */}
                {(col.id === "for" || col.id === "while") && (
                  <>
                    <path d={`M ${x + 20} 230 L ${x} 230 L ${x} 180 L ${cx - 44} 180`} fill="none" stroke={col.color} strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="4 3" />
                    <text x={x - 4} y="208" textAnchor="end" fontSize="10" fill="var(--text-secondary)">回判断</text>
                  </>
                )}

                {/* if-else 的 B 分支 */}
                {col.id === "if" && (
                  <>
                    <rect x={x + 20} y="260" width={COL_W - 40} height="28" rx="6" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1" />
                    <text x={cx} y="278" textAnchor="middle" fontSize="11" fill="var(--text-primary)">执行 B</text>
                    <line x1={cx} y1="244" x2={cx} y2="260" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
                  </>
                )}

                {/* 出口 */}
                <text x={cx} y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">→ 继续</text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="40" y="340" width={VIEW_W - 80} height="68" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="362" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
            适用场景
          </text>
          <text x={VIEW_W / 2} y="382" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            if-else：按条件二选一 · for：已知次数的循环 · while：未知次数按条件循环
          </text>
          <text x={VIEW_W / 2} y="398" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            break 立即终止循环 · continue 跳过本次进入下一轮
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 控制流分分支（if-else / switch）和循环（for / while / do-while）两大类。for 适合已知次数，while 适合条件驱动，break 和 continue 控制循环中断与跳过。
      </figcaption>
    </figure>
  );
}
