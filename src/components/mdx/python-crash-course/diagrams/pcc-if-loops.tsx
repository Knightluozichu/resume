/**
 * <PccIfLoopsDiagram>：Python 条件判断与循环控制流。
 *
 * if-elif-else 分支结构 + while/for 循环 + break/continue 控制流。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function PccIfLoopsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python 条件与循环：if-elif-else 分支结构，while 和 for 循环，break 跳出循环，continue 跳过当前迭代。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            条件判断与循环：程序的控制流
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            if-elif-else 分支 · while 条件循环 · for 遍历循环
          </text>

          {/* 左侧：if-elif-else */}
          <text x={160} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            if-elif-else 分支
          </text>

          {/* if 判断菱形 */}
          <polygon points="160,92 220,122 160,152 100,122" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={160} y={126} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>if 条件?</text>

          {/* True 分支 */}
          <line x1={100} y1={122} x2={60} y2={122} stroke={success} strokeWidth="1.2" />
          <text x={80} y={116} textAnchor="middle" fontSize="10" fill={success}>True</text>
          <rect x={20} y={160} width={80} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={60} y={178} textAnchor="middle" fontSize="11" fill={primary}>if 块</text>
          <line x1={60} y1={122} x2={60} y2={160} stroke={success} strokeWidth="1.2" />

          {/* False → elif */}
          <line x1={220} y1={122} x2={260} y2={122} stroke={warning} strokeWidth="1.2" />
          <text x={240} y={116} textAnchor="middle" fontSize="10" fill={warning}>False</text>

          <polygon points="320,92 380,122 320,152 260,122" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={320} y={126} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>elif?</text>

          <line x1={260} y1={122} x2={260} y2={190} stroke={warning} strokeWidth="1.2" />
          <rect x={220} y={190} width={80} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={260} y={208} textAnchor="middle" fontSize="11" fill={primary}>elif 块</text>
          <line x1={260} y1={152} x2={260} y2={190} stroke={success} strokeWidth="1.2" />

          <line x1={380} y1={122} x2={420} y2={122} stroke={danger} strokeWidth="1.2" />
          <text x={400} y={116} textAnchor="middle" fontSize="10" fill={danger}>False</text>
          <rect x={380} y={190} width={80} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={420} y={208} textAnchor="middle" fontSize="11" fill={primary}>else 块</text>
          <line x1={420} y1={122} x2={420} y2={190} stroke={danger} strokeWidth="1.2" />

          {/* 分隔线 */}
          <line x1={480} y1={70} x2={480} y2={250} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 右侧：for 循环 */}
          <text x={600} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            for 循环遍历
          </text>

          <rect x={520} y={92} width={160} height={28} rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={600} y={110} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>for item in items</text>

          {/* 循环体 */}
          <rect x={520} y={132} width={160} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={600} y={150} textAnchor="middle" fontSize="11" fill={primary}>循环体（处理 item）</text>

          {/* 循环箭头 */}
          <path d="M 600 160 Q 680 165 680 132" fill="none" stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-il-arrow2)" />
          <text x={700} y={148} textAnchor="middle" fontSize="10" fill={secondary}>下一个</text>

          {/* break / continue */}
          <rect x={520} y={180} width={72} height={24} rx="4" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1" strokeOpacity="0.5" />
          <text x={556} y={196} textAnchor="middle" fontSize="10" fill={danger}>break</text>
          <text x={556} y={220} textAnchor="middle" fontSize="10" fill={secondary}>跳出循环</text>

          <rect x={608} y={180} width={72} height={24} rx="4" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1" strokeOpacity="0.5" />
          <text x={644} y={196} textAnchor="middle" fontSize="10" fill={warning}>continue</text>
          <text x={644} y={220} textAnchor="middle" fontSize="10" fill={secondary}>跳过本轮</text>

          {/* 底部总结 */}
          <line x1={32} y1={250} x2={VIEW_W - 32} y2={250} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          <text x={VIEW_W / 2} y={274} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            循环选择指南
          </text>

          <rect x={60} y={290} width={280} height={84} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x={200} y={312} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>while 循环</text>
          <text x={200} y={332} textAnchor="middle" fontSize="11" fill={secondary}>条件为 True 时重复执行</text>
          <text x={200} y={350} textAnchor="middle" fontSize="11" fill={secondary}>适用：不确定迭代次数</text>
          <text x={200} y={368} textAnchor="middle" fontSize="11" fill={secondary}>例：while running: game_loop()</text>

          <rect x={380} y={290} width={280} height={84} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x={520} y={312} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>for 循环</text>
          <text x={520} y={332} textAnchor="middle" fontSize="11" fill={secondary}>遍历可迭代对象的每个元素</text>
          <text x={520} y={350} textAnchor="middle" fontSize="11" fill={secondary}>适用：已知迭代范围</text>
          <text x={520} y={368} textAnchor="middle" fontSize="11" fill={secondary}>例：for item in range(10):</text>

          <defs>
            <marker id="pcc-il-arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        if-elif-else 实现分支选择，while/for 实现循环，break/continue 控制循环流程。
      </figcaption>
    </figure>
  );
}
