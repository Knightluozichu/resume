/**
 * <JvmRuntimeAreasDiagram />：《Android 进阶解密》low-level-tech/java-vm 章
 * 「JVM 运行时数据区解剖」配图（HEL-208）。
 *
 * 画面内容：把 JVM 运行时内存按「谁能看见它」切成两大组，一条竖向边界隔开：
 *
 *  左半 —— 线程共享区（--accent 边界框）：
 *   ① 堆 Heap（--warning：GC 主战场）——所有 new 出来的对象实例都在这；
 *      内部再分新生代（Eden + Survivor S0/S1）与老年代，分代回收。
 *   ② 方法区 Method Area / 元空间（--accent）——类元信息、运行时常量池、静态变量。
 *
 *  右半 —— 线程私有区（--success 边界框）：画 2 个线程，每线程各一套三件套：
 *   ③ 虚拟机栈 VM Stack——一摞栈帧，每个栈帧含 局部变量表 / 操作数栈 /
 *      动态链接 / 返回地址；方法调用即压栈帧、返回即出栈帧。
 *   ④ 本地方法栈 Native Method Stack——给 native 方法用。
 *   ⑤ 程序计数器 PC Register——记当前线程执行到的字节码行号。
 *
 *  标注：① 共享 vs 私有的竖向边界；② 栈帧随方法调用入栈/出栈；③ 堆是 GC 重点。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent / success / warning / text-primary /
 * text-secondary / border / bg），无裸 hex，rx 圆角，无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 线程私有三件套：每个线程内的小块。color = 语义色 token。 ——
type PrivateArea = {
  /** 区名（中文 + 英文）。 */
  name: string;
  /** 一句话职责。 */
  note: string;
  /** 语义色 token。 */
  color: string;
};

const PRIVATE_AREAS: readonly PrivateArea[] = [
  {
    name: "虚拟机栈 VM Stack",
    note: "一摞栈帧，方法调用即压栈",
    color: "var(--success)",
  },
  {
    name: "本地方法栈 Native Stack",
    note: "给 native 方法用",
    color: "var(--success)",
  },
  {
    name: "程序计数器 PC Register",
    note: "当前字节码行号",
    color: "var(--success)",
  },
];

// —— 栈帧内部四件：每个栈帧由这四块组成。 ——
const FRAME_PARTS: readonly string[] = [
  "局部变量表",
  "操作数栈",
  "动态链接",
  "返回地址",
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const MARGIN = 24; // 画布左右内边距
const TOP = 64; // 第一块顶部 y（标题留白）
const GROUP_GAP = 32; // 左右两大组之间的留白（容纳竖向边界）

// 左组：线程共享区。
const SHARED_X = MARGIN;
const SHARED_W = 320; // 共享组外框宽
const SHARED_PAD = 16; // 外框内边距

// 堆块（含分代细分）。
const HEAP_H = 168;
// 方法区块。
const METHOD_H = 72;
const SHARED_BLOCK_GAP = 16; // 堆与方法区之间的竖向间距

// 右组：线程私有区（每线程一套）。
const PRIVATE_X = SHARED_X + SHARED_W + GROUP_GAP;
const THREAD_W = 196; // 单个线程卡片宽
const THREAD_GAP = 16; // 两个线程卡片之间的间距
const THREAD_PAD = 12; // 线程卡片内边距
const AREA_H = 44; // 线程内单个区块高
const AREA_GAP = 8; // 线程内区块竖向间距

const ARROW = 5; // 箭头三角半高

// 共享组外框高（包住「标题行 + 堆 + 间距 + 方法区」）。
const SHARED_INNER_H = HEAP_H + SHARED_BLOCK_GAP + METHOD_H;
const SHARED_TITLE_H = 28; // 组内标题行高
const SHARED_BOX_H = SHARED_TITLE_H + SHARED_INNER_H + SHARED_PAD * 2;

// 单个线程卡片高（标题行 + 三个区块）。
const THREAD_TITLE_H = 24;
const THREAD_BOX_H =
  THREAD_TITLE_H +
  THREAD_PAD * 2 +
  PRIVATE_AREAS.length * AREA_H +
  (PRIVATE_AREAS.length - 1) * AREA_GAP;

// 私有组外框：包住「组标题行 + 两个线程卡片」。
const PRIVATE_GROUP_TITLE_H = 28;
const PRIVATE_GROUP_H = PRIVATE_GROUP_TITLE_H + THREAD_BOX_H + SHARED_PAD * 2;

const VIEW_W = PRIVATE_X + THREAD_W * 2 + THREAD_GAP + SHARED_PAD * 2 + MARGIN;
// 两组高度取较大者，再留底部脚注空间。
const CONTENT_H = Math.max(SHARED_BOX_H, PRIVATE_GROUP_H);
const VIEW_H = TOP + CONTENT_H + 44;

export function JvmRuntimeAreasDiagram() {
  // —— 左组（共享区）几何 ——
  const sharedBoxY = TOP;
  const heapY = sharedBoxY + SHARED_TITLE_H + SHARED_PAD;
  const heapInnerX = SHARED_X + SHARED_PAD;
  const heapInnerW = SHARED_W - SHARED_PAD * 2;
  const methodY = heapY + HEAP_H + SHARED_BLOCK_GAP;

  // 堆内分代：新生代占上 ~60%，老年代占下 ~40%。
  const heapHeaderH = 24;
  const youngY = heapY + heapHeaderH + 8;
  const youngH = 64;
  const oldY = youngY + youngH + 8;
  const oldH = HEAP_H - heapHeaderH - 8 - youngH - 8 - 8;

  // —— 右组（私有区）几何 ——
  const privateBoxX = PRIVATE_X - SHARED_PAD;
  const privateBoxY = TOP;
  const privateBoxW = THREAD_W * 2 + THREAD_GAP + SHARED_PAD * 2;
  const threadTop = privateBoxY + PRIVATE_GROUP_TITLE_H + SHARED_PAD;

  // 竖向边界 x（两大组中线）。
  const boundaryX = (SHARED_X + SHARED_W + PRIVATE_X) / 2 - SHARED_PAD / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JVM 运行时数据区解剖图。整块运行时内存按「线程能否共享」切成左右两大组，中间一条竖向虚线边界隔开。左半是线程共享区，所有线程共用这一份：第一块是堆 Heap，它是垃圾回收 GC 的主战场，所有 new 出来的对象实例都放在这里；堆内部再按对象寿命分代，上方是新生代，含一个 Eden 区和两个 Survivor 区 S0、S1，下方是老年代，活得够久的对象会从新生代晋升到这里。第二块是方法区，也叫元空间 Metaspace，存放类的元信息、运行时常量池和静态变量。右半是线程私有区，每个线程各有独立的一套，图中画了线程一和线程二两套相同结构，每套都包含三件：虚拟机栈 VM Stack，是一摞栈帧，每个栈帧由局部变量表、操作数栈、动态链接、返回地址四部分组成，方法被调用时就压入一个新栈帧、方法返回时栈帧出栈；本地方法栈 Native Method Stack，专供 native 本地方法调用使用；程序计数器 PC Register，记录当前线程执行到的字节码行号。图上标注了三点：线程共享与线程私有之间的竖向边界、栈帧随方法调用入栈与出栈、以及堆是 GC 的重点区域。"
          className="mx-auto block h-auto w-full"
          style={{ maxWidth: VIEW_W }}
        >
          {/* —— 标题 —— */}
          <text
            x={MARGIN}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            JVM 运行时数据区：哪些线程共享，哪些线程各管一份
          </text>
          <text
            x={MARGIN}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            一条边界把内存切两半：左边全线程共用，右边每个线程各来一套
          </text>

          {/* —— 竖向边界：线程共享 | 线程私有 —— */}
          <line
            x1={boundaryX}
            y1={TOP - 8}
            x2={boundaryX}
            y2={TOP + CONTENT_H + 8}
            stroke="var(--border)"
            strokeWidth="1.4"
            strokeDasharray="6 5"
          />
          <text
            x={boundaryX}
            y={TOP - 14}
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            ← 共享 ｜ 私有 →
          </text>

          {/* ===================== 左组：线程共享区 ===================== */}
          <rect
            x={SHARED_X}
            y={sharedBoxY}
            width={SHARED_W}
            height={SHARED_BOX_H}
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.04"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <text
            x={SHARED_X + SHARED_PAD}
            y={sharedBoxY + 19}
            fontSize="11.5"
            fontWeight="700"
            fill="var(--accent)"
          >
            线程共享区（所有线程共用一份）
          </text>

          {/* —— ① 堆 Heap（GC 主战场，--warning）—— */}
          <rect
            x={heapInnerX}
            y={heapY}
            width={heapInnerW}
            height={HEAP_H}
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.06"
            stroke="var(--warning)"
            strokeWidth="1.4"
          />
          <rect
            x={heapInnerX}
            y={heapY}
            width="4"
            height={HEAP_H}
            rx="2"
            fill="var(--warning)"
          />
          <text
            x={heapInnerX + 14}
            y={heapY + 17}
            fontSize="12"
            fontWeight="700"
            fill="var(--warning)"
          >
            ① 堆 Heap
          </text>
          <text
            x={heapInnerX + heapInnerW - 10}
            y={heapY + 17}
            textAnchor="end"
            fontSize="9.5"
            fontWeight="600"
            fill="var(--warning)"
          >
            GC 主战场 · 存所有对象实例
          </text>

          {/* 新生代（Eden + S0 + S1） */}
          <rect
            x={heapInnerX + 12}
            y={youngY}
            width={heapInnerW - 24}
            height={youngH}
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.05"
            stroke="var(--warning)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x={heapInnerX + 20}
            y={youngY + 16}
            fontSize="10"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            新生代 Young（复制算法）
          </text>
          {(() => {
            const innerLeft = heapInnerX + 20;
            const innerRight = heapInnerX + heapInnerW - 20;
            const cellGap = 8;
            const edenW = (innerRight - innerLeft - cellGap * 2) * 0.5;
            const survW = (innerRight - innerLeft - cellGap * 2 - edenW) / 2;
            const cellY = youngY + 26;
            const cellH = 24;
            const cells: readonly { label: string; x: number; w: number }[] = [
              { label: "Eden", x: innerLeft, w: edenW },
              { label: "S0", x: innerLeft + edenW + cellGap, w: survW },
              {
                label: "S1",
                x: innerLeft + edenW + cellGap + survW + cellGap,
                w: survW,
              },
            ];
            return cells.map((c) => (
              <g key={c.label}>
                <rect
                  x={c.x}
                  y={cellY}
                  width={c.w}
                  height={cellH}
                  rx="4"
                  fill="var(--bg)"
                  stroke="var(--warning)"
                  strokeWidth="1"
                />
                <text
                  x={c.x + c.w / 2}
                  y={cellY + cellH / 2 + 4}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  {c.label}
                </text>
              </g>
            ));
          })()}

          {/* 老年代 */}
          <rect
            x={heapInnerX + 12}
            y={oldY}
            width={heapInnerW - 24}
            height={oldH}
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.05"
            stroke="var(--warning)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x={heapInnerX + 20}
            y={oldY + oldH / 2 + 4}
            fontSize="10"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            老年代 Old（标记-整理）· 长寿对象晋升至此
          </text>

          {/* —— ② 方法区 Method Area / 元空间（--accent）—— */}
          <rect
            x={heapInnerX}
            y={methodY}
            width={heapInnerW}
            height={METHOD_H}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <rect
            x={heapInnerX}
            y={methodY}
            width="4"
            height={METHOD_H}
            rx="2"
            fill="var(--accent)"
          />
          <text
            x={heapInnerX + 14}
            y={methodY + 20}
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            ② 方法区 Method Area（元空间）
          </text>
          <text
            x={heapInnerX + 14}
            y={methodY + 38}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            类元信息 · 运行时常量池 · 静态变量
          </text>
          <text
            x={heapInnerX + 14}
            y={methodY + 54}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            （所有线程共享同一份类的「说明书」）
          </text>

          {/* ===================== 右组：线程私有区 ===================== */}
          <rect
            x={privateBoxX}
            y={privateBoxY}
            width={privateBoxW}
            height={PRIVATE_GROUP_H}
            rx="10"
            fill="var(--success)"
            fillOpacity="0.04"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <text
            x={privateBoxX + SHARED_PAD}
            y={privateBoxY + 19}
            fontSize="11.5"
            fontWeight="700"
            fill="var(--success)"
          >
            线程私有区（每个线程各来一套）
          </text>

          {/* 两个线程卡片 */}
          {[0, 1].map((t) => {
            const cardX = PRIVATE_X + t * (THREAD_W + THREAD_GAP);
            return (
              <g key={`thread-${t}`}>
                <rect
                  x={cardX}
                  y={threadTop}
                  width={THREAD_W}
                  height={THREAD_BOX_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--success)"
                  strokeWidth="1.3"
                />
                <text
                  x={cardX + THREAD_PAD}
                  y={threadTop + 16}
                  fontSize="10.5"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--success)"
                >
                  线程 {t + 1}
                </text>

                {/* 三件套区块 */}
                {PRIVATE_AREAS.map((a, i) => {
                  const ay =
                    threadTop + THREAD_TITLE_H + THREAD_PAD + i * (AREA_H + AREA_GAP);
                  const isStack = i === 0; // 第一块是 VM Stack，画栈帧细分
                  return (
                    <g key={a.name}>
                      <rect
                        x={cardX + THREAD_PAD}
                        y={ay}
                        width={THREAD_W - THREAD_PAD * 2}
                        height={AREA_H}
                        rx="6"
                        fill={a.color}
                        fillOpacity="0.08"
                        stroke={a.color}
                        strokeWidth="1.2"
                      />
                      <text
                        x={cardX + THREAD_PAD + 8}
                        y={ay + 17}
                        fontSize="9.5"
                        fontWeight="600"
                        fill="var(--text-primary)"
                      >
                        {`${i + 3}. ${a.name}`}
                      </text>
                      <text
                        x={cardX + THREAD_PAD + 8}
                        y={ay + 32}
                        fontSize="8.5"
                        fill="var(--text-secondary)"
                      >
                        {a.note}
                      </text>
                      {/* VM Stack 块：右侧叠两个迷你栈帧示意「一摞栈帧」 */}
                      {isStack &&
                        [0, 1].map((f) => {
                          const fw = 40;
                          const fh = 12;
                          const fx = cardX + THREAD_W - THREAD_PAD - fw - 4;
                          const fy = ay + 6 + f * (fh + 3);
                          return (
                            <g key={`frame-${t}-${f}`}>
                              <rect
                                x={fx}
                                y={fy}
                                width={fw}
                                height={fh}
                                rx="2"
                                fill="var(--success)"
                                fillOpacity="0.18"
                                stroke="var(--success)"
                                strokeWidth="0.8"
                              />
                              <text
                                x={fx + fw / 2}
                                y={fy + fh - 3}
                                textAnchor="middle"
                                fontSize="6.5"
                                fill="var(--success)"
                              >
                                栈帧
                              </text>
                            </g>
                          );
                        })}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* —— 底部脚注：栈帧组成 + 入栈出栈 + GC 重点 —— */}
          {(() => {
            const footY = TOP + CONTENT_H + 18;
            return (
              <g>
                <text
                  x={MARGIN}
                  y={footY}
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  栈帧 = {FRAME_PARTS.join(" + ")}
                </text>
                <text
                  x={MARGIN}
                  y={footY + 16}
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  方法调用 → 压入新栈帧；方法返回 → 栈帧出栈（后进先出）
                </text>
                <text
                  x={VIEW_W - MARGIN}
                  y={footY}
                  textAnchor="end"
                  fontSize="9.5"
                  fontWeight="600"
                  fill="var(--warning)"
                >
                  ★ 堆是 GC 的重点（最常 OOM）
                </text>
              </g>
            );
          })()}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JVM 运行时数据区按「谁能看见它」分两组：<strong>线程共享区</strong>——
        <code>堆 Heap</code>（所有对象实例、GC 主战场，内部分新生代 Eden+Survivor 与老年代）和
        <code> 方法区</code>（类元信息、运行时常量池、静态变量）；<strong>线程私有区</strong>——每个线程各有一套
        <code> 虚拟机栈</code>（一摞栈帧，方法调用即压栈）、<code>本地方法栈</code>（native 方法用）、
        <code> 程序计数器</code>（当前字节码行号）。
      </figcaption>
    </figure>
  );
}
