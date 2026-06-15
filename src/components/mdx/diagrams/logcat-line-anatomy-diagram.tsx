/**
 * <LogcatLineAnatomyDiagram />：《Android 编程权威指南》basics/debugging 章「Logcat 过滤」配图（HEL-175）。
 *
 * 画面内容：把一行真实 Logcat 日志横向铺开，逐字段用色块 + 引导线 + 注释标注：
 *  - 时间戳（哪天哪一刻打的）
 *  - PID-TID（哪个进程 / 线程）
 *  - 日志级别（V/D/I/W/E）
 *  - TAG（谁打的，过滤的主抓手）
 *  - 消息正文（具体说了什么）
 * 下方小图例：5 个级别 V/D/I/W/E 各自语义色 + 含义；并标三种过滤方式（按 level / 按 tag / 按 regex）。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * 视觉语言：全部 DESIGN token 配色，无裸 hex，rx 圆角，无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 一条日志被切成的字段：label 注释、color 语义色 token。 ——
type LogField = {
  /** 字段原文（等宽显示）。 */
  text: string;
  /** 该字段名称。 */
  label: string;
  /** 用途说明。 */
  note: string;
  /** 该字段语义色 token。 */
  color: string;
  /** 字符宽度权重（按原文长度，决定色块占比）。 */
  weight: number;
};

const FIELDS: readonly LogField[] = [
  {
    text: "2024-01-15 10:23:45.123",
    label: "时间戳",
    note: "哪天哪一刻打的",
    color: "var(--text-secondary)",
    weight: 23,
  },
  {
    text: "12345-12360",
    label: "PID-TID",
    note: "哪个进程 / 线程",
    color: "var(--text-secondary)",
    weight: 11,
  },
  {
    text: "D",
    label: "级别",
    note: "Verbose…Error",
    color: "var(--accent)",
    weight: 4,
  },
  {
    text: "MainActivity",
    label: "TAG",
    note: "谁打的（过滤主抓手）",
    color: "var(--success)",
    weight: 12,
  },
  {
    text: "onCreate called",
    label: "消息正文",
    note: "具体说了什么",
    color: "var(--text-primary)",
    weight: 15,
  },
];

// —— 5 个日志级别：从最啰嗦到最严重，颜色由弱到强。 ——
type LogLevel = { key: string; name: string; meaning: string; color: string };

const LEVELS: readonly LogLevel[] = [
  { key: "V", name: "Verbose", meaning: "最啰嗦：流水账", color: "var(--text-secondary)" },
  { key: "D", name: "Debug", meaning: "调试：开发期打点", color: "var(--accent)" },
  { key: "I", name: "Info", meaning: "信息：正常事件", color: "var(--success)" },
  { key: "W", name: "Warn", meaning: "警告：可能有问题", color: "var(--warning)" },
  { key: "E", name: "Error", meaning: "错误：崩溃在这", color: "var(--danger)" },
];

// —— 三种过滤方式。 ——
const FILTERS: readonly string[] = [
  "按 level：只看 Error",
  "按 tag：只看本 TAG",
  "按 regex：组合关键字",
];

// —— 布局常量（间距走 4 倍数）。 ——
const VIEW_W = 760;
const PAD_X = 24; // 左右边距
const ROW_Y = 88; // 日志条带基线 y（色块顶部）
const ROW_H = 36; // 日志色块高
const TRACK_W = VIEW_W - PAD_X * 2; // 色块条带总宽
const NOTE_Y = ROW_Y + ROW_H + 48; // 字段注释行 y
const LEGEND_Y = 252; // 级别图例区起点 y
const LEGEND_ROW_H = 28; // 每个级别一行的行高
const FILTER_Y = LEGEND_Y; // 过滤方式块与图例同起点
const VIEW_H = LEGEND_Y + LEVELS.length * LEGEND_ROW_H + 40;

// 各字段在条带中的累计权重（用于横向布局）。
const TOTAL_WEIGHT = FIELDS.reduce((sum, f) => sum + f.weight, 0);

export function LogcatLineAnatomyDiagram() {
  // 预先算好每个字段色块的 x / width。
  let cursor = PAD_X;
  const segments = FIELDS.map((f) => {
    const w = (f.weight / TOTAL_WEIGHT) * TRACK_W;
    const seg = { ...f, x: cursor, w };
    cursor += w;
    return seg;
  });

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Logcat 日志行解剖图。一行样例日志「2024-01-15 10:23:45.123  12345-12360  D  MainActivity: onCreate called」被横向切成五段并逐段标注：时间戳（哪天哪一刻打的）、PID-TID（哪个进程与线程）、日志级别（这里是 D，从 Verbose 到 Error 共五级）、TAG（谁打的，是过滤的主要抓手）、消息正文（具体说了什么）。下方图例列出五个日志级别 V Verbose 最啰嗦、D Debug 开发期打点、I Info 正常事件、W Warn 可能有问题、E Error 错误崩溃，颜色由弱到强；并列出三种过滤方式：按 level 只看 Error、按 tag 只看本 TAG、按 regex 组合关键字。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* 标题 */}
          <text
            x={PAD_X}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            一行 Logcat 日志，拆开看是这五段
          </text>
          <text
            x={PAD_X}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            认清每段的位置，才知道过滤框里该按哪一段筛
          </text>

          {/* —— 日志条带：各字段一个色块 —— */}
          {segments.map((s) => {
            const cx = s.x + s.w / 2;
            return (
              <g key={s.label}>
                {/* 字段色块 */}
                <rect
                  x={s.x}
                  y={ROW_Y}
                  width={s.w}
                  height={ROW_H}
                  rx="6"
                  fill={s.color}
                  fillOpacity="0.12"
                  stroke={s.color}
                  strokeWidth="1.3"
                />
                {/* 字段原文（等宽） */}
                <text
                  x={cx}
                  y={ROW_Y + ROW_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {s.text}
                </text>
                {/* 字段名标签（条带上方） */}
                <text
                  x={cx}
                  y={ROW_Y - 12}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="700"
                  fill={s.color}
                >
                  {s.label}
                </text>
                {/* 引导线 → 下方注释 */}
                <line
                  x1={cx}
                  y1={ROW_Y + ROW_H + 4}
                  x2={cx}
                  y2={NOTE_Y - 14}
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.7"
                />
                {/* 用途注释 */}
                <text
                  x={cx}
                  y={NOTE_Y}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {s.note}
                </text>
              </g>
            );
          })}

          {/* —— 分隔线 —— */}
          <line
            x1={PAD_X}
            y1={LEGEND_Y - 28}
            x2={VIEW_W - PAD_X}
            y2={LEGEND_Y - 28}
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* —— 左半：5 个日志级别图例 —— */}
          <text
            x={PAD_X}
            y={LEGEND_Y - 8}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            日志级别（由弱到强）
          </text>
          {LEVELS.map((lv, i) => {
            const y = LEGEND_Y + 8 + i * LEGEND_ROW_H;
            return (
              <g key={lv.key}>
                {/* 级别字母徽标 */}
                <rect
                  x={PAD_X}
                  y={y}
                  width={20}
                  height={20}
                  rx="4"
                  fill={lv.color}
                  fillOpacity="0.16"
                  stroke={lv.color}
                  strokeWidth="1.3"
                />
                <text
                  x={PAD_X + 10}
                  y={y + 14}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={lv.color}
                >
                  {lv.key}
                </text>
                {/* 全称 */}
                <text
                  x={PAD_X + 32}
                  y={y + 14}
                  fontSize="10.5"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {lv.name}
                </text>
                {/* 含义 */}
                <text
                  x={PAD_X + 96}
                  y={y + 14}
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {lv.meaning}
                </text>
              </g>
            );
          })}

          {/* —— 右半：三种过滤方式 —— */}
          <text
            x={VIEW_W / 2 + 48}
            y={FILTER_Y - 8}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            过滤就靠上面这几段
          </text>
          {FILTERS.map((f, i) => {
            const y = FILTER_Y + 8 + i * LEGEND_ROW_H;
            return (
              <g key={f}>
                <rect
                  x={VIEW_W / 2 + 48}
                  y={y}
                  width={VIEW_W / 2 - 48 - PAD_X}
                  height={20}
                  rx="6"
                  fill="var(--accent)"
                  fillOpacity="0.08"
                  stroke="var(--accent)"
                  strokeWidth="1"
                />
                <text
                  x={VIEW_W / 2 + 60}
                  y={y + 14}
                  fontSize="10.5"
                  fill="var(--text-secondary)"
                >
                  {f}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一行 Logcat 日志由时间戳、PID-TID、级别、TAG、消息正文拼成。看懂分段后，过滤就是
        在「级别 / TAG / 正则」三个维度上筛——把无关噪音挡在外面，崩溃行（Error）一眼可见。
      </figcaption>
    </figure>
  );
}
