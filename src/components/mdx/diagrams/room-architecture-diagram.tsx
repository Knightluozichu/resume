/**
 * <RoomArchitectureDiagram />：《Android 编程权威指南》ui-fragment/room-database 章
 * 「Room 三层架构 + 数据流」配图（HEL-180）。
 *
 * 画面内容：Room 持久化库的三大核心组件块 + 它们之间的关系与数据流。
 *  左侧自上而下三块核心组件（用语义色区分职责）：
 *   - @Database（warning 色）：RoomDatabase 子类——持有 DAO、声明 entities 与版本号、单例。
 *   - @Dao（accent 色）：数据访问接口——@Query/@Insert/@Update/@Delete 方法；
 *     @Query 的 SQL 在编译期校验；可返回 LiveData/Flow 实现可观察查询。
 *   - @Entity（success 色）：数据类 ↔ 数据表——一个类 = 一张表，字段 = 列。
 *  组件间关系（带箭头实线 + 标签）：
 *   - @Database --提供--> @Dao（getDao() 返回 DAO 实例）。
 *   - @Dao --操作--> @Entity 对应的表（增删改查作用在 Entity 映射出的行上）。
 *  右侧底层落地 + 数据流：
 *   - @Entity 映射成 SQLite 里的一张表（行 = Entity 实例，列 = 字段）。
 *   - App 代码 → 调 @Dao 方法 → Room 生成的实现 → 读写 SQLite。
 *   - @Dao 的查询返回 LiveData/Flow → 数据一变自动通知 UI（回流箭头）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent / success / warning / text-primary /
 * text-secondary / border / bg），无裸 hex，rx 圆角，无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 核心组件块：role = 三大件之一；color = 语义色 token；note = 职责一句话。 ——
type CoreBlock = {
  /** 注解名（@Entity / @Dao / @Database）。 */
  tag: string;
  /** 副标题：对应的 Kotlin 形态。 */
  kind: string;
  /** 职责说明（多行）。 */
  notes: readonly string[];
  /** 语义色 token。 */
  color: string;
};

const BLOCKS: readonly CoreBlock[] = [
  {
    tag: "@Database",
    kind: "RoomDatabase 子类",
    notes: [
      "持有 DAO、声明 entities 与版本号",
      "单例：全局只开一次数据库文件",
    ],
    color: "var(--warning)",
  },
  {
    tag: "@Dao",
    kind: "数据访问接口",
    notes: [
      "@Query/@Insert/@Update/@Delete 方法",
      "@Query 的 SQL 在编译期校验",
      "返回 LiveData/Flow → 可观察查询",
    ],
    color: "var(--accent)",
  },
  {
    tag: "@Entity",
    kind: "数据类 ↔ 数据表",
    notes: ["一个类 = 一张表，字段 = 列", "@PrimaryKey 标记主键列"],
    color: "var(--success)",
  },
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const BLOCK_X = 24; // 左列组件块左边距
const BLOCK_W = 320; // 组件块宽
const BLOCK_H = 96; // 组件块高
const BLOCK_GAP = 48; // 组件块竖向间距（容纳「提供 / 操作」箭头）
const TOP = 64; // 第一块顶部 y（标题留白）

const REL_LABEL_X = BLOCK_X + BLOCK_W + 12; // 块间关系标签 x（箭头右侧）

// 右侧 SQLite 落地块。
const DB_X = 432; // SQLite 块左边距
const DB_W = 304; // SQLite 块宽
const DB_H = 96; // SQLite 块高

// 底部数据流泳道。
const FLOW_TOP = TOP + 3 * BLOCK_H + 2 * BLOCK_GAP + 40; // 数据流区顶部 y
const FLOW_H = 56; // 数据流卡片高
const FLOW_GAP = 12; // 数据流卡片间距

const ARROW = 5; // 箭头三角半高

const VIEW_W = 760;
const VIEW_H = FLOW_TOP + 2 * FLOW_H + FLOW_GAP + 40;

/** 第 i 块的顶部 y。 */
function blockTop(i: number): number {
  return TOP + i * (BLOCK_H + BLOCK_GAP);
}

export function RoomArchitectureDiagram() {
  // @Entity 块中心 y（用于连到右侧 SQLite 表）。
  const entityTop = blockTop(2);
  const entityCy = entityTop + BLOCK_H / 2;
  // 右侧 SQLite 块与 @Entity 块竖向对齐。
  const dbTop = entityTop;
  const dbCy = dbTop + DB_H / 2;

  // 数据流四段卡片：App → DAO → Room 生成实现 → SQLite。
  const flowSteps: readonly string[] = [
    "App 代码",
    "调 @Dao 方法",
    "Room 生成的实现",
    "读写 SQLite",
  ];
  const flowCardW = (VIEW_W - BLOCK_X * 2 - FLOW_GAP * (flowSteps.length - 1)) / flowSteps.length;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Room 持久化库三层架构与数据流图。左侧自上而下是三个核心组件块，用三种语义色区分职责：第一块 @Database 是 RoomDatabase 的子类，职责是持有 DAO、声明 entities 与版本号，并用单例保证全局只打开一次数据库文件；第二块 @Dao 是数据访问接口，里面声明 @Query、@Insert、@Update、@Delete 方法，其中 @Query 的 SQL 在编译期就会被校验，方法可以返回 LiveData 或 Flow 来实现可观察查询；第三块 @Entity 是把数据类映射成数据表，一个类等于一张表，字段等于列，用 @PrimaryKey 标记主键列。三块之间用带箭头的实线表达关系：@Database 向下提供 @Dao 实例，@Dao 向下操作 @Entity 所对应的那张表。右侧是底层落地：@Entity 映射成 SQLite 里的一张表，表的每一行对应一个 Entity 实例，每一列对应一个字段。图底部是一条数据流泳道，从左到右四段：App 代码调用 @Dao 方法，Room 在编译期生成的实现真正去读写 SQLite 数据库；而 @Dao 的查询返回 LiveData 或 Flow，当 SQLite 里的数据发生变化时会自动沿着回流箭头通知 UI 刷新。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* —— 标题 —— */}
          <text
            x={BLOCK_X}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Room 三层架构：@Entity / @Dao / @Database 各管一摊
          </text>
          <text
            x={BLOCK_X}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Room 在 SQLite 之上加三层抽象，把你从手写胶水代码里解放出来
          </text>

          {/* —— 块间关系箭头（@Database→@Dao「提供」、@Dao→@Entity「操作」）—— */}
          {["提供 DAO 实例", "增删改查作用在表上"].map((label, i) => {
            const fromBottom = blockTop(i) + BLOCK_H;
            const toTop = blockTop(i + 1);
            const x = BLOCK_X + BLOCK_W / 2;
            return (
              <g key={label}>
                <line
                  x1={x}
                  y1={fromBottom}
                  x2={x}
                  y2={toTop - ARROW}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.6"
                />
                <path
                  d={`M ${x} ${toTop}
                      l -${ARROW} -${ARROW * 1.6}
                      l ${ARROW * 2} 0 Z`}
                  fill="var(--text-secondary)"
                />
                <text
                  x={REL_LABEL_X}
                  y={(fromBottom + toTop) / 2 + 4}
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {i === 0 ? "↓ " : "↓ "}
                  {label}
                </text>
              </g>
            );
          })}

          {/* —— 三个核心组件块 —— */}
          {BLOCKS.map((b, i) => {
            const y = blockTop(i);
            return (
              <g key={b.tag}>
                <rect
                  x={BLOCK_X}
                  y={y}
                  width={BLOCK_W}
                  height={BLOCK_H}
                  rx="8"
                  fill={b.color}
                  fillOpacity="0.08"
                  stroke={b.color}
                  strokeWidth="1.4"
                />
                {/* 左侧语义色条 */}
                <rect
                  x={BLOCK_X}
                  y={y}
                  width="4"
                  height={BLOCK_H}
                  rx="2"
                  fill={b.color}
                />
                {/* 注解名 */}
                <text
                  x={BLOCK_X + 16}
                  y={y + 24}
                  fontSize="14"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={b.color}
                >
                  {b.tag}
                </text>
                {/* 副标题（Kotlin 形态） */}
                <text
                  x={BLOCK_X + 16}
                  y={y + 42}
                  fontSize="10.5"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {b.kind}
                </text>
                {/* 职责说明（多行） */}
                {b.notes.map((n, j) => (
                  <text
                    key={n}
                    x={BLOCK_X + 16}
                    y={y + 60 + j * 14}
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    {n}
                  </text>
                ))}
              </g>
            );
          })}

          {/* —— 右侧 SQLite 表（@Entity 落地处）—— */}
          <text
            x={DB_X}
            y={dbTop - 12}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            底层落地：@Entity → SQLite 的一张表
          </text>
          <rect
            x={DB_X}
            y={dbTop}
            width={DB_W}
            height={DB_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {/* 表头行（列名） */}
          <rect
            x={DB_X}
            y={dbTop}
            width={DB_W}
            height="24"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.12"
          />
          <text
            x={DB_X + 12}
            y={dbTop + 16}
            fontSize="10"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            fill="var(--success)"
          >
            id（PK）｜ title ｜ date ｜ solved
          </text>
          {/* 两行数据（= Entity 实例） */}
          {[0, 1].map((r) => (
            <text
              key={`row-${r}`}
              x={DB_X + 12}
              y={dbTop + 44 + r * 20}
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--text-secondary)"
            >
              {r === 0
                ? "u-7f3a… ｜ Bug #12 ｜ 06-15 ｜ true"
                : "a-91c2… ｜ Memo  ｜ 06-14 ｜ false"}
            </text>
          ))}
          <text
            x={DB_X + DB_W - 8}
            y={dbTop + DB_H - 8}
            textAnchor="end"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            一行 = 一个 Entity 实例
          </text>

          {/* —— @Entity 块 → SQLite 表：「映射成」箭头 —— */}
          <line
            x1={BLOCK_X + BLOCK_W}
            y1={entityCy}
            x2={DB_X - ARROW}
            y2={dbCy}
            stroke="var(--success)"
            strokeWidth="1.6"
            strokeDasharray="5 4"
          />
          <path
            d={`M ${DB_X} ${dbCy}
                l -${ARROW * 1.6} -${ARROW}
                l 0 ${ARROW * 2} Z`}
            fill="var(--success)"
          />
          <text
            x={(BLOCK_X + BLOCK_W + DB_X) / 2}
            y={(entityCy + dbCy) / 2 - 6}
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="600"
            fill="var(--success)"
          >
            映射成
          </text>

          {/* —— 底部数据流泳道：App → DAO → Room 实现 → SQLite —— */}
          <text
            x={BLOCK_X}
            y={FLOW_TOP - 14}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            数据流：App 调 DAO，Room 代你读写 SQLite；查询变化自动回流刷新 UI
          </text>
          {flowSteps.map((s, i) => {
            const x = BLOCK_X + i * (flowCardW + FLOW_GAP);
            return (
              <g key={s}>
                <rect
                  x={x}
                  y={FLOW_TOP}
                  width={flowCardW}
                  height={FLOW_H}
                  rx="8"
                  fill="var(--accent)"
                  fillOpacity="0.07"
                  stroke="var(--accent)"
                  strokeWidth="1.3"
                />
                <text
                  x={x + flowCardW / 2}
                  y={FLOW_TOP + FLOW_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {s}
                </text>
                {/* 段间向右箭头 */}
                {i < flowSteps.length - 1 && (
                  <path
                    d={`M ${x + flowCardW + FLOW_GAP / 2 + ARROW} ${FLOW_TOP + FLOW_H / 2}
                        l -${ARROW * 1.6} -${ARROW}
                        l 0 ${ARROW * 2} Z`}
                    fill="var(--accent)"
                  />
                )}
              </g>
            );
          })}

          {/* —— 回流箭头：SQLite 数据变化 → LiveData/Flow → UI 自动刷新 —— */}
          {(() => {
            const lastX = BLOCK_X + 3 * (flowCardW + FLOW_GAP);
            const firstX = BLOCK_X;
            const backY = FLOW_TOP + FLOW_H + 24;
            return (
              <g>
                {/* 从最后一段底部下来 → 横向左拉 → 回到第一段底部 */}
                <path
                  d={`M ${lastX + flowCardW / 2} ${FLOW_TOP + FLOW_H}
                      L ${lastX + flowCardW / 2} ${backY}
                      L ${firstX + flowCardW / 2} ${backY}
                      L ${firstX + flowCardW / 2} ${FLOW_TOP + FLOW_H + ARROW}`}
                  fill="none"
                  stroke="var(--success)"
                  strokeWidth="1.6"
                  strokeDasharray="5 4"
                />
                <path
                  d={`M ${firstX + flowCardW / 2} ${FLOW_TOP + FLOW_H}
                      l -${ARROW} ${ARROW * 1.6}
                      l ${ARROW * 2} 0 Z`}
                  fill="var(--success)"
                />
                <text
                  x={(firstX + lastX + flowCardW) / 2}
                  y={backY + 14}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="600"
                  fill="var(--success)"
                >
                  数据变化 → LiveData/Flow 自动通知 UI 刷新
                </text>
              </g>
            );
          })()}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Room 把 SQLite 包成三层：<code>@Entity</code>（数据类 ↔ 表，类 = 表、字段 = 列）、
        <code> @Dao</code>（增删改查接口，<code>@Query</code> 的 SQL 编译期校验、可返回
        LiveData/Flow）、<code>@Database</code>（持有 DAO、声明 entities 与版本号的单例大门）。App
        调 DAO，Room 代你读写 SQLite；查询结果用 LiveData/Flow 包着——数据一变，界面自动刷新。
      </figcaption>
    </figure>
  );
}
