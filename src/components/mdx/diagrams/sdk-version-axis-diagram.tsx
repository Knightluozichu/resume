/**
 * <SdkVersionAxisDiagram />：《Android 编程权威指南》basics/sdk-compatibility 章
 * 「compile / min / target 三版本」配图（HEL-176）。
 *
 * 画面内容：一条横向 API Level 数轴（21 … 26 … 28 … 35），上面钉三个标记把三版本讲清：
 *  - minSdk（--success）：数轴左端起点 —— 最低支持，低于此 API 的设备装不了。
 *  - targetSdk（--accent）：数轴中段标记 —— 行为变更基准，系统按此版本行为跑你的 App。
 *  - compileSdk（--warning）：数轴右端 —— 编译可用 API 上限，能调用到的最新 API。
 * 数轴下方一条「设备运行覆盖范围 = minSdk 及以上」的横条，体现常见关系
 * minSdk ≤ targetSdk ≤ compileSdk。
 * 右下小块：运行时 `Build.VERSION.SDK_INT >= X` 分支示意（设备 SDK_INT 落在范围内
 * → 走对应分支），并点明 AndroidX 向后移植让新 API 在老设备也能用。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色，无裸 hex，rx 圆角，无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— API Level 数轴的取值范围（决定刻度到 x 像素的线性映射）。 ——
const API_MIN = 20; // 数轴左边界（留白，使 21 不贴边）
const API_MAX = 36; // 数轴右边界（留白，使 35 不贴边）

// —— 数轴上要画的刻度（与三版本取值对齐）。 ——
const TICKS: readonly number[] = [21, 26, 28, 35];

// —— 三个版本号标记：api 取值、色 token、标题、一句话作用。 ——
type SdkMarker = {
  /** 版本号字段名。 */
  key: string;
  /** 对应 API Level。 */
  api: number;
  /** 语义色 token。 */
  color: string;
  /** 一句话作用说明。 */
  note: string;
  /** 标注放轴上方还是下方（避免三个标签互相压）。 */
  side: "top" | "bottom";
  /** 标签水平对齐：边缘标记靠边对齐，防止长注释溢出画布两侧。 */
  anchor: "start" | "middle" | "end";
};

const MARKERS: readonly SdkMarker[] = [
  {
    key: "minSdk = 21",
    api: 21,
    color: "var(--success)",
    note: "最低支持：低于此 API 的设备装不了",
    side: "top",
    anchor: "start",
  },
  {
    key: "targetSdk = 28",
    api: 28,
    color: "var(--accent)",
    note: "行为基准：系统按此版本行为跑你的 App",
    side: "bottom",
    anchor: "middle",
  },
  {
    key: "compileSdk = 35",
    api: 35,
    color: "var(--warning)",
    note: "编译上限：能调用到的最新 API",
    side: "top",
    anchor: "end",
  },
];

// —— 布局常量（间距走 4 倍数）。 ——
const VIEW_W = 760;
const PAD_X = 56; // 数轴左右内边距
const AXIS_Y = 132; // 主数轴基线 y
const AXIS_X0 = PAD_X; // 数轴左端 x
const AXIS_X1 = VIEW_W - PAD_X; // 数轴右端 x
const AXIS_W = AXIS_X1 - AXIS_X0; // 数轴像素长度
const TICK_H = 8; // 刻度短竖线半高
const MARK_R = 6; // 版本标记圆点半径
const COVER_Y = 192; // 运行覆盖横条 y
const COVER_H = 24; // 运行覆盖横条高
const BRANCH_X = 392; // 右下分支小块左边距
const BRANCH_Y = 268; // 右下分支小块顶部 y
const BRANCH_W = VIEW_W - PAD_X - BRANCH_X; // 分支小块宽
const ROW_H = 28; // 分支行高
const VIEW_H = 416;

/** 把一个 API Level 线性映射到数轴上的 x 像素。 */
function apiToX(api: number): number {
  return AXIS_X0 + ((api - API_MIN) / (API_MAX - API_MIN)) * AXIS_W;
}

export function SdkVersionAxisDiagram() {
  const minX = apiToX(21);
  const targetX = apiToX(28);
  const compileX = apiToX(35);
  // 设备运行覆盖横条：从 minSdk 起一直延伸到数轴右端（minSdk 及以上都能跑）。
  const coverX = minX;
  const coverW = AXIS_X1 - minX;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="SDK 三版本号在 API Level 数轴上的关系图。一条横向 API Level 数轴标了 21、26、28、35 几个刻度，上面钉三个标记：minSdk 等于 21 在数轴左端起点，是最低支持版本，低于此 API 的设备装不了；targetSdk 等于 28 在数轴中段，是行为变更基准，系统按这个版本的行为来跑你的 App；compileSdk 等于 35 在数轴右端，是编译时能调用到的 API 上限，决定你能写哪些最新 API。三者满足常见关系 minSdk 小于等于 targetSdk 小于等于 compileSdk。数轴下方一条横条表示设备运行覆盖范围，从 minSdk 21 一直向右延伸，意为 API 21 及以上的设备都能安装运行。右下小块演示运行时分支：用 Build.VERSION.SDK_INT 大于等于某个版本来判断，设备的 SDK_INT 落在范围内就走对应分支，新设备走新 API、老设备走兼容分支；并说明 AndroidX 把新 API 向后移植，让新能力在老设备上也能用，从而少写 if else 分支。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* 标题 */}
          <text
            x={PAD_X}
            y="32"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            三个版本号钉在同一条 API Level 数轴上
          </text>
          <text
            x={PAD_X}
            y="50"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            常见关系：minSdk ≤ targetSdk ≤ compileSdk —— 装得上、按谁的规则跑、能写到多新
          </text>

          {/* —— 主数轴 —— */}
          <line
            x1={AXIS_X0}
            y1={AXIS_Y}
            x2={AXIS_X1}
            y2={AXIS_Y}
            stroke="var(--border)"
            strokeWidth="2"
          />
          {/* 右端箭头（数轴指向更高 API） */}
          <path
            d={`M ${AXIS_X1} ${AXIS_Y}
                l -8 -5
                l 0 10 Z`}
            fill="var(--border)"
          />
          <text
            x={AXIS_X1 + 4}
            y={AXIS_Y + 4}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            API
          </text>

          {/* —— 刻度 + 刻度值 —— */}
          {TICKS.map((api) => {
            const x = apiToX(api);
            return (
              <g key={api}>
                <line
                  x1={x}
                  y1={AXIS_Y - TICK_H}
                  x2={x}
                  y2={AXIS_Y + TICK_H}
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <text
                  x={x}
                  y={AXIS_Y + 24}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  {api}
                </text>
              </g>
            );
          })}

          {/* —— 三个版本标记（圆点 + 连接线 + 标签卡） —— */}
          {MARKERS.map((m) => {
            const x = apiToX(m.api);
            const isTop = m.side === "top";
            // 标签卡竖直位置：上侧组靠数轴上方，下侧组靠数轴下方。
            const labelY = isTop ? AXIS_Y - 64 : AXIS_Y + 40;
            const lineY1 = isTop ? AXIS_Y - MARK_R : AXIS_Y + MARK_R;
            const lineY2 = isTop ? labelY + 36 : labelY;
            // 标签横坐标：边缘标记靠边对齐并贴住画布内边距，避免长注释裁切。
            const labelX =
              m.anchor === "start"
                ? AXIS_X0
                : m.anchor === "end"
                  ? AXIS_X1
                  : x;
            return (
              <g key={m.key}>
                {/* 标记到标签的连接竖线 */}
                <line
                  x1={x}
                  y1={lineY1}
                  x2={x}
                  y2={lineY2}
                  stroke={m.color}
                  strokeWidth="1.4"
                  strokeDasharray="3 3"
                  opacity="0.8"
                />
                {/* 数轴上的版本标记圆点 */}
                <circle
                  cx={x}
                  cy={AXIS_Y}
                  r={MARK_R}
                  fill={m.color}
                  stroke="var(--bg)"
                  strokeWidth="2"
                />
                {/* 标签卡：版本名（粗、语义色）+ 一句作用 */}
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={m.anchor}
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={m.color}
                >
                  {m.key}
                </text>
                <text
                  x={labelX}
                  y={labelY + 16}
                  textAnchor={m.anchor}
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {m.note}
                </text>
              </g>
            );
          })}

          {/* —— 设备运行覆盖横条：minSdk 及以上都能跑 —— */}
          <rect
            x={coverX}
            y={COVER_Y}
            width={coverW}
            height={COVER_H}
            rx="6"
            fill="var(--success)"
            fillOpacity="0.12"
            stroke="var(--success)"
            strokeWidth="1.3"
          />
          {/* 左端竖封口：覆盖从 minSdk 这一刻开始 */}
          <line
            x1={coverX}
            y1={COVER_Y - 4}
            x2={coverX}
            y2={COVER_Y + COVER_H + 4}
            stroke="var(--success)"
            strokeWidth="1.6"
          />
          <text
            x={coverX + 12}
            y={COVER_Y + COVER_H / 2 + 4}
            fontSize="10.5"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            设备运行覆盖范围：API 21 及以上的设备都装得上、跑得起
          </text>

          {/* —— 左下：minSdk ≤ target ≤ compile 的不等式提示 —— */}
          <text
            x={PAD_X}
            y={BRANCH_Y + 12}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            为什么是这个顺序
          </text>
          {[
            "minSdk 抬高 → 砍掉老设备，换来更少兼容分支",
            "targetSdk 跟新 → 系统按新规则管你（权限 / 后台）",
            "compileSdk 跟新 → 才写得出最新 API（≥ 库要求）",
          ].map((t, i) => (
            <text
              key={t}
              x={PAD_X}
              y={BRANCH_Y + 36 + i * 22}
              fontSize="10"
              fill="var(--text-secondary)"
            >
              {`• ${t}`}
            </text>
          ))}

          {/* —— 右下：运行时 SDK_INT 分支小块 —— */}
          <rect
            x={BRANCH_X}
            y={BRANCH_Y}
            width={BRANCH_W}
            height={ROW_H * 3 + 28}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.3"
          />
          <text
            x={BRANCH_X + 16}
            y={BRANCH_Y + 20}
            fontSize="10.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            运行时按设备 SDK_INT 分支
          </text>
          {/* 分支行：新设备走新 API（accent）/ 老设备走兼容（success） */}
          <g>
            <rect
              x={BRANCH_X + 16}
              y={BRANCH_Y + 32}
              width={BRANCH_W - 32}
              height={ROW_H - 6}
              rx="5"
              fill="var(--accent)"
              fillOpacity="0.1"
              stroke="var(--accent)"
              strokeWidth="1.1"
            />
            <text
              x={BRANCH_X + 26}
              y={BRANCH_Y + 32 + (ROW_H - 6) / 2 + 4}
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--accent)"
            >
              if (SDK_INT &gt;= 33) 用新 API
            </text>
          </g>
          <g>
            <rect
              x={BRANCH_X + 16}
              y={BRANCH_Y + 32 + ROW_H}
              width={BRANCH_W - 32}
              height={ROW_H - 6}
              rx="5"
              fill="var(--success)"
              fillOpacity="0.1"
              stroke="var(--success)"
              strokeWidth="1.1"
            />
            <text
              x={BRANCH_X + 26}
              y={BRANCH_Y + 32 + ROW_H + (ROW_H - 6) / 2 + 4}
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--success)"
            >
              else 走旧 API（老设备）
            </text>
          </g>
          <text
            x={BRANCH_X + 16}
            y={BRANCH_Y + 32 + ROW_H * 2 + 16}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            AndroidX 向后移植新 API → 老设备也能用，少写 if/else
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三个版本号活在同一条 API Level 数轴上：minSdk 决定「多老的机子能装」、targetSdk
        决定「系统按哪代规则管你」、compileSdk 决定「你能写到多新的 API」。运行时再用
        <code> Build.VERSION.SDK_INT </code>
        按设备实际版本分支，AndroidX 则把新能力向后移植到老设备。
      </figcaption>
    </figure>
  );
}
