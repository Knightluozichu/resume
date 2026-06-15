/**
 * <SearchFlowDiagram />：《Android 编程权威指南》background-network/search 章
 * 「应用内搜索流程」配图（HEL-195）。
 *
 * 画面内容：自上而下五步流程，框 + 有向箭头：
 *  ① SearchView（在 AppBar 菜单中，用户输入 query）——输入阶段，accent 色
 *  ② 触发监听 OnQueryTextListener：每次输入回调 onQueryTextChange / 提交触发 ACTION_SEARCH
 *  ③ （可选）debounce 防抖 ~300ms，避免每键一次请求
 *  ④ ViewModel / Repository 按 query 过滤本地数据或发网络请求——处理阶段，success 色
 *  ⑤ 结果列表（RecyclerView）刷新显示——结果阶段，warning 色
 * 右侧三条配置/集成小注：searchable.xml 配置可搜索元数据、menu xml 的
 * app:actionViewClass 集成 SearchView、查询防抖（debounce ~300ms）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent / success / warning / text-primary /
 * text-secondary / border / bg / bg-elevated），无裸 hex，rx 圆角，无阴影，
 * 几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 布局常量（间距走 4 倍数语言）。 ——
const VIEW_W = 720;

const PAD_X = 24; // 左右内边距
const TITLE_Y = 28; // 标题基线 y

const NODE_W = 320; // 流程节点宽
const NODE_H = 60; // 流程节点高
const NODE_X = 48; // 流程节点左边 x（左列）
const ROW_TOP = 52; // 第一个节点顶部 y
const ROW_GAP = 32; // 相邻节点之间的竖向间距（容纳竖向箭头）
const ROW_STRIDE = NODE_H + ROW_GAP; // 每行步进

const NOTE_X = 416; // 右侧小注卡片左边 x
const NOTE_W = 280; // 右侧小注卡片宽
const NOTE_H = 56; // 右侧小注卡片高

const ARROW = 6; // 箭头三角半高

// —— 五步流程：phase 决定配色（输入 accent / 处理 success / 结果 warning）。 ——
type FlowStep = {
  id: string;
  /** 步骤编号文字。 */
  num: string;
  /** 标题行。 */
  title: string;
  /** 一句话说明。 */
  sub: string;
  /** 阶段配色：input=accent / process=success / result=warning。 */
  phase: "input" | "process" | "result";
};

const STEPS: readonly FlowStep[] = [
  {
    id: "s1",
    num: "①",
    title: "SearchView（AppBar 菜单中）",
    sub: "用户输入 query",
    phase: "input",
  },
  {
    id: "s2",
    num: "②",
    title: "OnQueryTextListener 触发",
    sub: "onQueryTextChange / 提交触发 ACTION_SEARCH",
    phase: "input",
  },
  {
    id: "s3",
    num: "③",
    title: "debounce 防抖（可选）",
    sub: "约 300ms 合并连续输入，避免每键一次请求",
    phase: "process",
  },
  {
    id: "s4",
    num: "④",
    title: "ViewModel / Repository 按 query 取数",
    sub: "过滤本地数据 或 发网络请求",
    phase: "process",
  },
  {
    id: "s5",
    num: "⑤",
    title: "结果列表（RecyclerView）",
    sub: "刷新显示搜索结果",
    phase: "result",
  },
];

const PHASE_COLOR: Record<FlowStep["phase"], string> = {
  input: "var(--accent)",
  process: "var(--success)",
  result: "var(--warning)",
};

// —— 右侧三条配置/集成小注（挂在对应节点旁）。 ——
type SideNote = {
  id: string;
  /** 标题行。 */
  head: string;
  /** 一句话说明。 */
  body: string;
  /** 对齐到第几行节点（0..4）。 */
  row: number;
  /** 小注配色。 */
  color: string;
};

const NOTES: readonly SideNote[] = [
  {
    id: "n1",
    head: "menu xml：app:actionViewClass",
    body: "把菜单项渲染成 SearchView 集成进应用栏",
    row: 0,
    color: "var(--accent)",
  },
  {
    id: "n2",
    head: "searchable.xml",
    body: "声明可搜索元数据：提示文字 / 建议提供器",
    row: 1,
    color: "var(--accent)",
  },
  {
    id: "n3",
    head: "查询防抖 debounce ~300ms",
    body: "onQueryTextChange 频率极高，过滤前先去抖",
    row: 2,
    color: "var(--success)",
  },
];

// 计算总高：底部留 28 边距。
const VIEW_H = ROW_TOP + STEPS.length * ROW_STRIDE - ROW_GAP + 28;

export function SearchFlowDiagram() {
  // 第 i 行节点顶部 y。
  const rowTop = (i: number) => ROW_TOP + i * ROW_STRIDE;
  // 节点水平中心。
  const nodeCx = NODE_X + NODE_W / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="应用内搜索流程图。自上而下五个步骤，箭头依次相连。第一步：SearchView，它放在应用栏 AppBar 的菜单里，用户在这里输入查询词 query，用品牌紫标注为输入阶段。第二步：用户输入会触发 OnQueryTextListener 监听器，其中 onQueryTextChange 在每次输入变化时回调，按下搜索键提交则触发 ACTION_SEARCH，仍属输入阶段。第三步：可选的 debounce 防抖，约 300 毫秒合并连续输入，避免用户每敲一个字符就发起一次请求，用绿色标注为处理阶段。第四步：ViewModel 或 Repository 拿到 query 后去取数，要么过滤本地数据，要么发起网络请求，同属处理阶段。第五步：把结果交给结果列表 RecyclerView 刷新显示，用黄色标注为结果阶段。图右侧另有三条配置与集成提示，分别对齐前三步：用 menu xml 的 app:actionViewClass 把菜单项渲染成 SearchView 集成进应用栏；用 searchable.xml 声明可搜索元数据，包括提示文字和搜索建议提供器；以及查询防抖约 300 毫秒，因为 onQueryTextChange 调用频率极高，过滤前先去抖。整体结论是：输入由 SearchView 接住、监听器分发，处理阶段先防抖再取数，最后把结果列表刷新出来。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 箭头 marker：流程主箭头随阶段配色，分三种。 */}
          <defs>
            <marker
              id="sf-arr-input"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="6"
              orient="auto"
            >
              <path d="M0 0 L8 0 L4 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="sf-arr-process"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="6"
              orient="auto"
            >
              <path d="M0 0 L8 0 L4 6 z" fill="var(--success)" />
            </marker>
            <marker
              id="sf-arr-result"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="6"
              orient="auto"
            >
              <path d="M0 0 L8 0 L4 6 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* —— 标题 —— */}
          <text
            x={PAD_X}
            y={TITLE_Y}
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            应用内搜索流程：输入 → 监听 → 防抖 → 取数 → 刷新结果
          </text>

          {/* —— 阶段图例 —— */}
          <g>
            <rect
              x={NOTE_X}
              y={TITLE_Y - 14}
              width="14"
              height="14"
              rx="3"
              fill="var(--accent)"
              fillOpacity="0.18"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            <text x={NOTE_X + 20} y={TITLE_Y - 2} fontSize="9.5" fill="var(--text-secondary)">
              输入
            </text>
            <rect
              x={NOTE_X + 64}
              y={TITLE_Y - 14}
              width="14"
              height="14"
              rx="3"
              fill="var(--success)"
              fillOpacity="0.18"
              stroke="var(--success)"
              strokeWidth="1"
            />
            <text x={NOTE_X + 84} y={TITLE_Y - 2} fontSize="9.5" fill="var(--text-secondary)">
              处理
            </text>
            <rect
              x={NOTE_X + 128}
              y={TITLE_Y - 14}
              width="14"
              height="14"
              rx="3"
              fill="var(--warning)"
              fillOpacity="0.18"
              stroke="var(--warning)"
              strokeWidth="1"
            />
            <text x={NOTE_X + 148} y={TITLE_Y - 2} fontSize="9.5" fill="var(--text-secondary)">
              结果
            </text>
          </g>

          {/* —— 竖向连接箭头（画在节点下层，颜色取下游节点阶段色）—— */}
          {STEPS.slice(0, -1).map((s, i) => {
            const next = STEPS[i + 1];
            const y1 = rowTop(i) + NODE_H;
            const y2 = rowTop(i + 1) - ARROW;
            const marker =
              next.phase === "input"
                ? "url(#sf-arr-input)"
                : next.phase === "process"
                  ? "url(#sf-arr-process)"
                  : "url(#sf-arr-result)";
            return (
              <line
                key={`edge-${s.id}`}
                x1={nodeCx}
                y1={y1}
                x2={nodeCx}
                y2={y2}
                stroke={PHASE_COLOR[next.phase]}
                strokeWidth="1.6"
                markerEnd={marker}
              />
            );
          })}

          {/* —— 五步流程节点 —— */}
          {STEPS.map((s, i) => {
            const y = rowTop(i);
            const color = PHASE_COLOR[s.phase];
            return (
              <g key={s.id}>
                <rect
                  x={NODE_X}
                  y={y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="8"
                  fill={color}
                  fillOpacity="0.08"
                  stroke={color}
                  strokeWidth="1.4"
                />
                <text
                  x={NODE_X + 16}
                  y={y + 26}
                  fontSize="13"
                  fontWeight="700"
                  fill={color}
                >
                  {s.num}
                </text>
                <text
                  x={NODE_X + 36}
                  y={y + 24}
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {s.title}
                </text>
                <text
                  x={NODE_X + 36}
                  y={y + 42}
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {s.sub}
                </text>
              </g>
            );
          })}

          {/* —— 右侧配置 / 集成小注（虚线引到对应节点）—— */}
          {NOTES.map((n) => {
            const rowCy = rowTop(n.row) + NODE_H / 2;
            const noteY = rowCy - NOTE_H / 2;
            return (
              <g key={n.id}>
                {/* 引线：节点右沿 → 小注卡片左沿 */}
                <line
                  x1={NODE_X + NODE_W}
                  y1={rowCy}
                  x2={NOTE_X}
                  y2={rowCy}
                  stroke={n.color}
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <rect
                  x={NOTE_X}
                  y={noteY}
                  width={NOTE_W}
                  height={NOTE_H}
                  rx="6"
                  fill={n.color}
                  fillOpacity="0.06"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={NOTE_X + 12}
                  y={noteY + 22}
                  fontSize="10"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={n.color}
                >
                  {n.head}
                </text>
                <text
                  x={NOTE_X + 12}
                  y={noteY + 40}
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {n.body}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        应用内搜索的完整链路：用户在应用栏的 <code>SearchView</code> 输入 query，
        <code>OnQueryTextListener</code> 把每次输入（<code>onQueryTextChange</code>）和提交
        （<code>ACTION_SEARCH</code>）分发出来；处理阶段先用 ~300ms 防抖合并连续按键，再由
        ViewModel / Repository 过滤本地数据或发网络请求，最后让 RecyclerView 刷新出结果。
        集成靠 menu xml 的 <code>app:actionViewClass</code> 与 <code>searchable.xml</code> 元数据。
      </figcaption>
    </figure>
  );
}
