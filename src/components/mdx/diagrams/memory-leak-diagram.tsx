/**
 * <MemoryLeakDiagram />：《Android 进阶解密》performance-optimization/memory-optimization 章
 * 「内存泄漏 + GC 可达性分析」配图（HEL-214）。
 *
 * 画面内容：用 GC 可达性分析（Reachability Analysis）解释「为什么对象回收不掉」。
 *
 *  顶部 —— GC Roots（--accent）：一排三个根，作为可达性分析的起点：
 *   · 静态变量（类被加载就一直在）
 *   · 活动线程（运行中的栈帧）
 *   · JNI 引用（native 层持有的全局引用）
 *  规则：从 GC Roots 出发，沿引用链能走到的对象 = 存活；走不到的 = 不可达 = 被回收。
 *
 *  中部 —— 三条「引用链不断」导致 Activity 泄漏的典型场景，每条都从某个 GC Root
 *  一路拴到同一个「被泄漏的 Activity」（--danger 高亮，本该被 GC 却被链拴住）：
 *   ① 静态变量持有 Activity：GC Root（静态字段）→ Activity（链不断，销毁后仍存活 = 泄漏）。
 *   ② 非静态内部类 / Handler：延时 Message 在 MessageQueue → Handler（隐式持有外部类）→ Activity。
 *   ③ 未注销监听 / 单例持有 Context：单例(GC Root) → 监听器/Context → Activity。
 *  每条链右侧给 --warning 解法标注（ApplicationContext / WeakReference / 移除回调）。
 *
 *  对照 —— 一个「正常可回收」的对象（--success）：销毁后无 GC Root 可达 → 下次 GC 被回收。
 *
 *  底部 —— LeakCanary 注脚：onDestroy 后用弱引用观察 Activity，等 GC 后仍可达 = 泄漏。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（GC Root accent / 正常对象 success / 泄漏链与泄漏对象 danger /
 * 解法 warning / text-primary / text-secondary / border / bg），无裸 hex，rx 圆角，无阴影，
 * 几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— GC Root 节点：可达性分析的起点。 ——
type GcRoot = {
  /** 根名称。 */
  label: string;
  /** 一句话说明。 */
  note: string;
};

const GC_ROOTS: readonly GcRoot[] = [
  { label: "静态变量", note: "类加载即常驻" },
  { label: "活动线程", note: "运行中的栈帧" },
  { label: "JNI 引用", note: "native 全局引用" },
];

// —— 泄漏链：从某个 GC Root 起，沿 chain 各节点一路拴到「被泄漏的 Activity」。 ——
type LeakChain = {
  /** 场景序号 + 标题。 */
  title: string;
  /** 链上中间节点（从 GC Root 之后到 Activity 之前），按引用方向排列。 */
  links: readonly string[];
  /** 解法标注（warning）。 */
  fix: string;
};

const LEAK_CHAINS: readonly LeakChain[] = [
  {
    title: "① 静态变量持有 Activity",
    links: ["static Activity sActivity"],
    fix: "改用 ApplicationContext / 弱引用",
  },
  {
    title: "② 非静态内部类 / Handler",
    links: ["MessageQueue 里的延时 Message", "Handler（隐式持有外部类）"],
    fix: "static 内部类 + WeakReference；onDestroy 移除回调",
  },
  {
    title: "③ 未注销监听 / 单例持有 Context",
    links: ["单例（GC Root）", "监听器 / Context"],
    fix: "及时 unregister；单例只持 ApplicationContext",
  },
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const MARGIN = 24; // 画布左右内边距
const TOP = 64; // GC Roots 行顶部 y（标题留白）

// GC Roots 行。
const ROOT_W = 152; // 单个 GC Root 方块宽
const ROOT_H = 48; // 单个 GC Root 方块高
const ROOT_GAP = 24; // GC Root 方块横向间距

// 泄漏链区。
const CHAIN_TOP = TOP + ROOT_H + 64; // 第一条链顶部 y（给 GC Root→链的箭头留白）
const CHAIN_H = 56; // 单条链行高
const CHAIN_GAP = 24; // 链行之间的竖向间距
const LINK_W = 168; // 链上单个节点方块宽
const LINK_H = 36; // 链上单个节点方块高
const LINK_GAP = 28; // 链上节点之间的横向间距（容纳箭头）

// 被泄漏的 Activity（所有链的终点，danger 高亮）。
const VICTIM_W = 160; // 泄漏 Activity 方块宽
const VICTIM_H = 96; // 泄漏 Activity 方块高
const VICTIM_X = 552; // 泄漏 Activity 方块左边距

// 正常可回收对象对照块。
const NORMAL_H = 56; // 正常对象对照块高

// 底部 LeakCanary 注脚块。
const FOOT_H = 64; // 注脚块高

const ARROW = 5; // 箭头三角半高

const VIEW_W = 760;
// 三条链总高。
const CHAINS_BLOCK_H =
  LEAK_CHAINS.length * CHAIN_H + (LEAK_CHAINS.length - 1) * CHAIN_GAP;
const NORMAL_TOP = CHAIN_TOP + CHAINS_BLOCK_H + 40; // 正常对照块顶部 y
const FOOT_TOP = NORMAL_TOP + NORMAL_H + 32; // 注脚块顶部 y
const VIEW_H = FOOT_TOP + FOOT_H + 32;

export function MemoryLeakDiagram() {
  // GC Roots 行整体居中铺开。
  const rootsTotalW = GC_ROOTS.length * ROOT_W + (GC_ROOTS.length - 1) * ROOT_GAP;
  const rootsX0 = (VIEW_W - rootsTotalW) / 2;

  // 被泄漏 Activity 竖向居中于三条链区间。
  const victimY = CHAIN_TOP + (CHAINS_BLOCK_H - VICTIM_H) / 2;
  const victimCy = victimY + VICTIM_H / 2;
  const victimCx = VICTIM_X + VICTIM_W / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内存泄漏与 GC 可达性分析示意图。最上面一排是三个 GC Roots，也就是垃圾回收做可达性分析时的起点：第一个是静态变量，类一旦被加载它就一直常驻；第二个是活动线程，也就是运行中的栈帧；第三个是 JNI 引用，是 native 层持有的全局引用。可达性分析的规则是：从这些 GC Roots 出发，沿着引用链能走到的对象就判定为存活，走不到的对象就是不可达，会被回收。图的中间画了三条典型的泄漏链，它们的引用链都没有断，最终都把同一个被泄漏的 Activity 拴住，这个 Activity 用红色高亮，表示它本该在销毁后被 GC 回收，却因为还能从 GC Root 到达而无法回收。第一条链是静态变量持有 Activity：一个 static Activity sActivity 字段直接从 GC Root 指向 Activity，链不断，Activity 销毁后仍然存活，这就是泄漏；解法是改用 ApplicationContext 或弱引用。第二条链是非静态内部类或 Handler：一条延时 Message 还排在 MessageQueue 里，它持有 Handler，而 Handler 作为非静态内部类隐式持有外部的 Activity，延时还没到就无法回收；解法是用静态内部类加 WeakReference，并在 onDestroy 里移除回调。第三条链是未注销监听或单例持有 Context：单例本身就是 GC Root，它持有监听器或 Context，进而持有 Activity；解法是及时注销监听，单例只持有 ApplicationContext。作为对照，图下方画了一个正常可回收的对象，用绿色表示，它在 Activity 销毁后没有任何 GC Root 能到达它，所以下一次 GC 就会被回收。最底部是 LeakCanary 的检测原理注脚：在 Activity 的 onDestroy 之后用一个弱引用观察这个 Activity，触发 GC 之后如果它仍然可达没有被回收，就判定为发生了内存泄漏，并 dump 堆内存分析最短的 GC Root 引用链。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* —— 标题 —— */}
          <text
            x={MARGIN}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            内存泄漏 = 从 GC Root 出发，引用链还没断，对象回收不掉
          </text>
          <text
            x={MARGIN}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            可达性分析：GC Root 走得到 = 存活；走不到 = 不可达 = 被回收
          </text>

          {/* ===================== GC Roots 行 ===================== */}
          <text
            x={rootsX0}
            y={TOP - 10}
            fontSize="10.5"
            fontWeight="700"
            fill="var(--accent)"
          >
            GC Roots（可达性分析的起点）
          </text>
          {GC_ROOTS.map((r, i) => {
            const x = rootsX0 + i * (ROOT_W + ROOT_GAP);
            return (
              <g key={r.label}>
                <rect
                  x={x}
                  y={TOP}
                  width={ROOT_W}
                  height={ROOT_H}
                  rx="8"
                  fill="var(--accent)"
                  fillOpacity="0.1"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                />
                <text
                  x={x + ROOT_W / 2}
                  y={TOP + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  {r.label}
                </text>
                <text
                  x={x + ROOT_W / 2}
                  y={TOP + 37}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  {r.note}
                </text>
              </g>
            );
          })}

          {/* —— GC Roots → 链 的下行总箭头（示意「从根往下追引用」） —— */}
          {(() => {
            const x = VIEW_W / 2;
            const y1 = TOP + ROOT_H;
            const y2 = CHAIN_TOP - 16;
            return (
              <g>
                <line
                  x1={x}
                  y1={y1}
                  x2={x}
                  y2={y2 - ARROW}
                  stroke="var(--accent)"
                  strokeWidth="1.6"
                  strokeDasharray="5 4"
                />
                <path
                  d={`M ${x} ${y2}
                      l -${ARROW} -${ARROW * 1.6}
                      l ${ARROW * 2} 0 Z`}
                  fill="var(--accent)"
                />
                <text
                  x={x + 12}
                  y={(y1 + y2) / 2 + 4}
                  fontSize="9.5"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  沿引用链向下追
                </text>
              </g>
            );
          })()}

          {/* ===================== 被泄漏的 Activity（danger 高亮，三条链共同终点） ===================== */}
          <rect
            x={VICTIM_X}
            y={victimY}
            width={VICTIM_W}
            height={VICTIM_H}
            rx="10"
            fill="var(--danger)"
            fillOpacity="0.12"
            stroke="var(--danger)"
            strokeWidth="2"
          />
          <rect
            x={VICTIM_X}
            y={victimY}
            width="4"
            height={VICTIM_H}
            rx="2"
            fill="var(--danger)"
          />
          <text
            x={victimCx}
            y={victimY + 26}
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--danger)"
          >
            Activity
          </text>
          <text
            x={victimCx}
            y={victimY + 46}
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="600"
            fill="var(--danger)"
          >
            已 onDestroy
          </text>
          {["本该被 GC 回收，", "却被引用链拴住，", "连带整棵 View 树泄漏"].map(
            (line, j) => (
              <text
                key={line}
                x={victimCx}
                y={victimY + 62 + j * 12}
                textAnchor="middle"
                fontSize="8.5"
                fill="var(--text-secondary)"
              >
                {line}
              </text>
            ),
          )}

          {/* ===================== 三条泄漏链 ===================== */}
          {LEAK_CHAINS.map((chain, ci) => {
            const rowY = CHAIN_TOP + ci * (CHAIN_H + CHAIN_GAP);
            const rowCy = rowY + CHAIN_H / 2;
            // 链节点从左侧依次排开；最后一个节点的右缘连到泄漏 Activity 左缘。
            return (
              <g key={chain.title}>
                {/* 场景标题（链上方） */}
                <text
                  x={MARGIN}
                  y={rowY - 6}
                  fontSize="10"
                  fontWeight="700"
                  fill="var(--danger)"
                >
                  {chain.title}
                </text>

                {/* 链节点方块 + 节点间向右箭头（danger 链） */}
                {chain.links.map((link, li) => {
                  const lx = MARGIN + li * (LINK_W + LINK_GAP);
                  const isLast = li === chain.links.length - 1;
                  return (
                    <g key={link}>
                      <rect
                        x={lx}
                        y={rowCy - LINK_H / 2}
                        width={LINK_W}
                        height={LINK_H}
                        rx="6"
                        fill="var(--danger)"
                        fillOpacity="0.06"
                        stroke="var(--danger)"
                        strokeWidth="1.3"
                      />
                      <text
                        x={lx + LINK_W / 2}
                        y={rowCy + 3.5}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="600"
                        fill="var(--text-primary)"
                      >
                        {link}
                      </text>
                      {/* 节点 → 下一节点 的「持有」箭头 */}
                      {!isLast && (
                        <path
                          d={`M ${lx + LINK_W + LINK_GAP / 2 + ARROW} ${rowCy}
                              l -${ARROW * 1.6} -${ARROW}
                              l 0 ${ARROW * 2} Z`}
                          fill="var(--danger)"
                        />
                      )}
                    </g>
                  );
                })}

                {/* 链尾 → 被泄漏 Activity 的「持有」箭头（汇聚到左缘） */}
                {(() => {
                  const tailX =
                    MARGIN +
                    (chain.links.length - 1) * (LINK_W + LINK_GAP) +
                    LINK_W;
                  return (
                    <g>
                      <line
                        x1={tailX}
                        y1={rowCy}
                        x2={VICTIM_X - ARROW}
                        y2={victimCy}
                        stroke="var(--danger)"
                        strokeWidth="1.4"
                      />
                      <path
                        d={`M ${VICTIM_X} ${victimCy}
                            l -${ARROW * 1.6} -${ARROW}
                            l 0 ${ARROW * 2} Z`}
                        fill="var(--danger)"
                      />
                    </g>
                  );
                })()}

                {/* 解法标注（warning），排在该行下方 */}
                <text
                  x={MARGIN + 4}
                  y={rowY + CHAIN_H + 11}
                  fontSize="9"
                  fontWeight="600"
                  fill="var(--warning)"
                >
                  {`修复：${chain.fix}`}
                </text>
              </g>
            );
          })}

          {/* ===================== 正常可回收对象（success 对照） ===================== */}
          <rect
            x={MARGIN}
            y={NORMAL_TOP}
            width={VIEW_W - MARGIN * 2}
            height={NORMAL_H}
            rx="8"
            fill="var(--success)"
            fillOpacity="0.06"
            stroke="var(--success)"
            strokeWidth="1.3"
          />
          <rect
            x={MARGIN}
            y={NORMAL_TOP}
            width="4"
            height={NORMAL_H}
            rx="2"
            fill="var(--success)"
          />
          <text
            x={MARGIN + 16}
            y={NORMAL_TOP + 22}
            fontSize="10.5"
            fontWeight="700"
            fill="var(--success)"
          >
            对照：正常可回收的对象
          </text>
          <text
            x={MARGIN + 16}
            y={NORMAL_TOP + 40}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            Activity 销毁后，没有任何 GC Root 能到达它 → 不可达 → 下次 GC 即被回收（无泄漏）
          </text>

          {/* ===================== 底部 LeakCanary 注脚 ===================== */}
          <rect
            x={MARGIN}
            y={FOOT_TOP}
            width={VIEW_W - MARGIN * 2}
            height={FOOT_H}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.05"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <text
            x={MARGIN + 16}
            y={FOOT_TOP + 22}
            fontSize="10.5"
            fontWeight="700"
            fill="var(--accent)"
          >
            LeakCanary 自动检测原理
          </text>
          <text
            x={MARGIN + 16}
            y={FOOT_TOP + 40}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            onDestroy 后用弱引用观察 Activity → 触发 GC → 仍可达（未回收）= 泄漏
          </text>
          <text
            x={MARGIN + 16}
            y={FOOT_TOP + 54}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            → dump heap 分析，找出从 GC Roots 到 Activity 的最短引用链
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内存泄漏的本质是 <strong>GC 可达性分析</strong>：从 <code>GC Roots</code>
        （静态变量 / 活动线程 / JNI 引用）出发，沿引用链走得到的对象就回收不掉。三条典型链——
        <code>静态变量持有 Activity</code>、<code>非静态内部类 / Handler</code>、
        <code>未注销监听 / 单例持有 Context</code>——都把一个已 <code>onDestroy</code> 的
        Activity 拴住（红色高亮），连带整棵 View 树泄漏。解法是用
        <code> ApplicationContext</code>、<code>WeakReference</code> 和及时移除回调 / 注销监听；
        <code>LeakCanary</code> 则靠弱引用 + 触发 GC 后是否仍可达来自动判定泄漏。
      </figcaption>
    </figure>
  );
}
