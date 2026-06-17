/**
 * <ProcessVsThreadDiagram>：进程 vs 线程的内存模型解剖图（HEL-229）。
 *
 * 左「两个进程」：两个独立大框，各含 代码段 / 全局数据 / 堆 / 栈 四个子块，
 * 中间一道墙隔开，标注「内存互不可见」——进程间地址空间彼此隔离。
 * 右「一个进程 · 两个线程」：一个大框内，代码段 + 全局数据 + 堆 是共享区
 * （accent 底色高亮，标「两线程都能读写」），但有两个独立的栈
 * （线程1栈 / 线程2栈，各自标注）——线程共享同一地址空间、各有自己的栈。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 全部 DESIGN token 配色（var(--accent) / --border / --bg / --bg-elevated /
 * --text-primary / --text-secondary / --warning / --success），无裸 hex、无阴影。
 * 所有框/标签/引线留足间距、不重叠、不越界（遮挡/自适应红线）。
 */

export function ProcessVsThreadDiagram() {
  // —— 布局常量（viewBox 内坐标；间距均 4 的倍数）——
  const VIEW_W = 680;
  // 内容最低点 = max(右框底366, 左墙标注底≈359) = 366；+22 下边距 → 388，
  // 纵向利用率 ≈ 94%，无死空白。
  const VIEW_H = 388;

  // 子块通用尺寸。
  const SEG_W = 132; // 子块宽
  const SEG_H = 40; // 子块高
  const SEG_GAP = 10; // 子块竖直间距

  // 左区：两个进程框。
  const procTop = 84; // 进程框顶部 y（标题下方留白）
  const procInnerTop = procTop + 36; // 框内首个子块 y（框标题下方）
  const proc1X = 28; // 进程1 框左缘
  const proc2X = 196; // 进程2 框左缘
  const procFrameW = 152; // 进程框宽
  const procFrameH = 36 + 4 * (SEG_H + SEG_GAP) + 8; // 标题 + 四子块 + 底留白
  const segX1 = proc1X + (procFrameW - SEG_W) / 2;
  const segX2 = proc2X + (procFrameW - SEG_W) / 2;

  // 四个子块（左区每个进程各一份，互相隔离）。
  const procSegs = [
    { label: "代码段", color: "var(--text-secondary)" },
    { label: "全局数据", color: "var(--text-secondary)" },
    { label: "堆 heap", color: "var(--text-secondary)" },
    { label: "栈 stack", color: "var(--warning)" },
  ];

  // 右区：一个进程框。
  const tProcX = 408;
  const tProcW = 244;
  const tProcInnerTop = procInnerTop;
  // 共享区：代码段 / 全局数据 / 堆（三块，accent 高亮，跨整框宽）。
  const sharedSegs = ["代码段", "全局数据", "堆 heap（共享）"];
  const sharedSegW = tProcW - 40;
  const sharedSegX = tProcX + 20;
  // 两个独立栈：并排放在共享区下方。
  const stackW = (tProcW - 40 - SEG_GAP) / 2;
  const stack1X = tProcX + 20;
  const stack2X = stack1X + stackW + SEG_GAP;
  const sharedBottom = tProcInnerTop + 3 * (SEG_H + SEG_GAP);
  const stackY = sharedBottom + 20; // 共享区下方留白后放两栈
  // 框高显式含「栈下方标注行」：标题36 + 三共享块 + 共享/栈间距20 + 栈高
  // + 标注行高16 + 标注余量8 + 底留白12 = 282 → 框底 procTop+282 = 366，
  // 把「↑各自独立」标注（底≈349）整体包进框内（距框底约17px）。
  const tProcFrameH = 36 + 3 * (SEG_H + SEG_GAP) + 20 + SEG_H + 16 + 8 + 12;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="进程与线程的内存模型对照解剖图。左侧「两个进程」：进程1 和进程2 是两个独立的大框，每个框内各有代码段、全局数据、堆、栈四个子块，两框之间有一道墙隔开，标注内存互不可见——进程之间地址空间彼此隔离，谁也读不到对方的内存。右侧「一个进程·两个线程」：一个大框内，代码段、全局数据、堆是共享区，用强调色底高亮，标注两线程都能读写；共享区下方有两个独立的栈，分别标注线程1栈和线程2栈——同一进程内的多个线程共享同一份代码、全局数据和堆，但各自拥有独立的调用栈。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          {/* ============ 左区标题 ============ */}
          <text
            x={proc1X}
            y="36"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            两个进程：内存互相隔离
          </text>
          <text x={proc1X} y="56" fontSize="11" fill="var(--text-secondary)">
            各有一整套独立地址空间，谁也看不见谁
          </text>

          {/* —— 进程1 框 —— */}
          <rect
            x={proc1X}
            y={procTop}
            width={procFrameW}
            height={procFrameH}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={proc1X + procFrameW / 2}
            y={procTop + 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            进程 1
          </text>
          {procSegs.map((s, i) => {
            const y = procInnerTop + i * (SEG_H + SEG_GAP);
            return (
              <g key={`p1-${s.label}`}>
                <rect
                  x={segX1}
                  y={y}
                  width={SEG_W}
                  height={SEG_H}
                  rx="6"
                  fill={s.color}
                  fillOpacity="0.1"
                  stroke={s.color}
                  strokeWidth="1.2"
                />
                <text
                  x={segX1 + SEG_W / 2}
                  y={y + SEG_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  {s.label}
                </text>
              </g>
            );
          })}

          {/* —— 进程2 框 —— */}
          <rect
            x={proc2X}
            y={procTop}
            width={procFrameW}
            height={procFrameH}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={proc2X + procFrameW / 2}
            y={procTop + 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            进程 2
          </text>
          {procSegs.map((s, i) => {
            const y = procInnerTop + i * (SEG_H + SEG_GAP);
            return (
              <g key={`p2-${s.label}`}>
                <rect
                  x={segX2}
                  y={y}
                  width={SEG_W}
                  height={SEG_H}
                  rx="6"
                  fill={s.color}
                  fillOpacity="0.1"
                  stroke={s.color}
                  strokeWidth="1.2"
                />
                <text
                  x={segX2 + SEG_W / 2}
                  y={y + SEG_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  {s.label}
                </text>
              </g>
            );
          })}

          {/* —— 两进程之间的「墙」+ 隔离标注 —— */}
          <line
            x1={(proc1X + procFrameW + proc2X) / 2}
            y1={procTop - 4}
            x2={(proc1X + procFrameW + proc2X) / 2}
            y2={procTop + procFrameH + 4}
            stroke="var(--warning)"
            strokeWidth="2.4"
            strokeDasharray="6 5"
          />
          <text
            x={(proc1X + procFrameW + proc2X) / 2}
            y={procTop + procFrameH + 28}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            🧱 内存互不可见
          </text>

          {/* ============ 区间分隔竖线 ============ */}
          <line
            x1="376"
            y1="72"
            x2="376"
            y2={VIEW_H - 22}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 5"
          />

          {/* ============ 右区标题 ============ */}
          <text
            x={tProcX}
            y="36"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一个进程 · 两个线程
          </text>
          <text x={tProcX} y="56" fontSize="11" fill="var(--text-secondary)">
            共享同一地址空间，但各有各的栈
          </text>

          {/* —— 进程大框 —— */}
          <rect
            x={tProcX}
            y={procTop}
            width={tProcW}
            height={tProcFrameH}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={tProcX + tProcW / 2}
            y={procTop + 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            进程（一个地址空间）
          </text>

          {/* —— 共享区：代码段 / 全局数据 / 堆（accent 高亮）—— */}
          {sharedSegs.map((label, i) => {
            const y = tProcInnerTop + i * (SEG_H + SEG_GAP);
            return (
              <g key={`shared-${label}`}>
                <rect
                  x={sharedSegX}
                  y={y}
                  width={sharedSegW}
                  height={SEG_H}
                  rx="6"
                  fill="var(--accent)"
                  fillOpacity="0.16"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                />
                <text
                  x={sharedSegX + sharedSegW / 2}
                  y={y + SEG_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {label}
                </text>
              </g>
            );
          })}
          {/* 共享区标注 */}
          <text
            x={tProcX + tProcW / 2}
            y={sharedBottom + 14}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            ↑ 共享区：两线程都能读写
          </text>

          {/* —— 两个独立的栈 —— */}
          <rect
            x={stack1X}
            y={stackY}
            width={stackW}
            height={SEG_H}
            rx="6"
            fill="var(--success)"
            fillOpacity="0.14"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <text
            x={stack1X + stackW / 2}
            y={stackY + SEG_H / 2 + 4}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-primary)"
          >
            线程1 栈
          </text>
          <rect
            x={stack2X}
            y={stackY}
            width={stackW}
            height={SEG_H}
            rx="6"
            fill="var(--success)"
            fillOpacity="0.14"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <text
            x={stack2X + stackW / 2}
            y={stackY + SEG_H / 2 + 4}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-primary)"
          >
            线程2 栈
          </text>
          <text
            x={tProcX + tProcW / 2}
            y={stackY + SEG_H + 16}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--success)"
          >
            ↑ 各自独立：互不干扰
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        进程之间内存彼此隔离（要通信得专门「打电话」）；同一进程内的多个线程共享代码、全局数据和堆，
        但各有独立的栈。线程间共享数据又快又方便，也正是后续「数据竞争」麻烦的根源。
      </figcaption>
    </figure>
  );
}
