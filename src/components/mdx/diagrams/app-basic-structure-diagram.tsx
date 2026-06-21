/**
 * <AppBasicStructureDiagram>：辅图——「Fat Activity vs 分层架构」对比（HEL-???）。
 *
 * 左侧：一个巨大的 Activity 盒子塞满所有职责（UI、逻辑、网络、数据库……），
 * 表示「一个 Activity 做了所有事」的反模式。
 *
 * 右侧：分层架构——Activity/Fragment → ViewModel/Presenter → Repository → DataSource，
 * 每层一个圆角矩形，向下箭头表示数据流，向上箭头表示事件回调。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。
 * Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 480;

// ---- 左侧：Fat Activity ----
const FAT_X = 25;
const FAT_W = 240;
const FAT_Y = 72;
const FAT_H = 350;

const BAD_LABELS = [
  "UI 布局",
  "点击事件",
  "网络请求",
  "数据库查询",
  "SharedPreferences",
  "业务逻辑",
  "数据转换",
  "线程管理",
];

// ---- 右侧：分层架构 ----
const LAYER_COL_X = 330; // 图层列 X 起始
const LAYER_W = 240;
const LAYER_H = 54;

const L1_Y = 76; // Activity / Fragment
const L2_Y = 168; // ViewModel / Presenter
const L3_Y = 260; // Repository
const L4_Y = 352; // DataSource

const L1_CX = LAYER_COL_X + LAYER_W / 2; // 图层中心 x
const L1_CY = L1_Y + LAYER_H / 2;
const L2_CY = L2_Y + LAYER_H / 2;
const L3_CY = L3_Y + LAYER_H / 2;
const L4_CY = L4_Y + LAYER_H / 2;

export function AppBasicStructureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android 应用分层架构对比图。左侧展示反模式——一个巨大的 Activity 盒子塞满了 UI 布局、点击事件、网络请求、数据库查询、SharedPreferences、业务逻辑、数据转换、线程管理等所有职责，标签标注为「Fat Activity：什么都自己做」。右侧展示正确的分层架构——从上到下四层：Activity / Fragment 负责 UI、ViewModel / Presenter 负责业务逻辑、Repository 负责数据协调、DataSource 负责 API 和数据库。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Fat Activity → 分层架构
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            一个 Activity 什么都做 vs 每层只做一件事
          </text>

          {/* ==== 左侧：Fat Activity（反模式） ==== */}
          {/* 大框 */}
          <rect
            x={FAT_X}
            y={FAT_Y}
            width={FAT_W}
            height={FAT_H}
            rx="12"
            fill="var(--danger)"
            fillOpacity="0.08"
            stroke="var(--danger)"
            strokeWidth="2"
          />
          {/* 框标题 */}
          <text
            x={FAT_X + FAT_W / 2}
            y={FAT_Y + 26}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--danger)"
          >
            Activity
          </text>
          <text
            x={FAT_X + FAT_W / 2}
            y={FAT_Y + 48}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Fat Activity：什么都自己做
          </text>

          {/* 框内标签（两个网格排列 4×2） */}
          {BAD_LABELS.map((label, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const lx = FAT_X + 18 + col * 105;
            const ly = FAT_Y + 70 + row * 62;
            return (
              <g key={label}>
                <rect
                  x={lx}
                  y={ly}
                  width="100"
                  height="36"
                  rx="6"
                  fill="var(--danger)"
                  fillOpacity="0.12"
                  stroke="var(--danger)"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
                <text
                  x={lx + 50}
                  y={ly + 22}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  {label}
                </text>
              </g>
            );
          })}
          {/* 大叉号 */}
          <text
            x={FAT_X + FAT_W / 2}
            y={FAT_Y + FAT_H - 18}
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="var(--danger)"
            fillOpacity="0.5"
          >
            ✕
          </text>

          {/* ==== 中间分隔 + 箭头 ==== */}
          <line
            x1={295}
            y1={FAT_Y}
            x2={295}
            y2={FAT_Y + FAT_H}
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {/* 大箭头从 Fat 指向分层 */}
          <line
            x1={FAT_X + FAT_W + 6}
            y1={FAT_Y + FAT_H / 2 - 18}
            x2={LAYER_COL_X - 6}
            y2={FAT_Y + FAT_H / 2 - 18}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#abs-arrow-accent)"
          />
          <text
            x={295}
            y={FAT_Y + FAT_H / 2 - 28}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--accent)"
          >
            拆分 →
          </text>

          {/* ==== 右侧：分层架构 ==== */}

          {/* L1: Activity / Fragment */}
          <rect
            x={LAYER_COL_X}
            y={L1_Y}
            width={LAYER_W}
            height={LAYER_H}
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={L1_CX}
            y={L1_Y + 22}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Activity / Fragment
          </text>
          <text
            x={L1_CX}
            y={L1_Y + 40}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            只负责 UI，接收用户事件
          </text>

          {/* L1 → L2 向下箭头（数据流） */}
          <line
            x1={L1_CX}
            y1={L1_Y + LAYER_H}
            x2={L1_CX}
            y2={L2_Y}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#abs-arrow-accent)"
          />
          <text
            x={L1_CX + 14}
            y={L1_Y + LAYER_H + 18}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            调用方法 ↓
          </text>

          {/* L2: ViewModel / Presenter */}
          <rect
            x={LAYER_COL_X}
            y={L2_Y}
            width={LAYER_W}
            height={LAYER_H}
            rx="10"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="2"
          />
          <text
            x={L1_CX}
            y={L2_Y + 22}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            ViewModel / Presenter
          </text>
          <text
            x={L1_CX}
            y={L2_Y + 40}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            纯业务逻辑，不依赖 View
          </text>

          {/* L2 → L3 向下箭头（数据流） */}
          <line
            x1={L1_CX}
            y1={L2_Y + LAYER_H}
            x2={L1_CX}
            y2={L3_Y}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#abs-arrow-accent)"
          />
          <text
            x={L1_CX + 14}
            y={L2_Y + LAYER_H + 18}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            请求数据 ↓
          </text>

          {/* L3: Repository */}
          <rect
            x={LAYER_COL_X}
            y={L3_Y}
            width={LAYER_W}
            height={LAYER_H}
            rx="10"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="2"
          />
          <text
            x={L1_CX}
            y={L3_Y + 22}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Repository
          </text>
          <text
            x={L1_CX}
            y={L3_Y + 40}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            数据协调层，封装来源切换
          </text>

          {/* L3 → L4 向下箭头（数据流） */}
          <line
            x1={L1_CX}
            y1={L3_Y + LAYER_H}
            x2={L1_CX}
            y2={L4_Y}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#abs-arrow-accent)"
          />
          <text
            x={L1_CX + 14}
            y={L3_Y + LAYER_H + 18}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            获取原始数据 ↓
          </text>

          {/* L4: DataSource */}
          <rect
            x={LAYER_COL_X}
            y={L4_Y}
            width={LAYER_W}
            height={LAYER_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x={L1_CX}
            y={L4_Y + 22}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            DataSource
          </text>
          <text
            x={L1_CX}
            y={L4_Y + 40}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Retrofit API / Room DB
          </text>

          {/* 向上事件流箭头（右侧标注） */}
          <line
            x1={LAYER_COL_X + LAYER_W + 16}
            y1={L4_CY}
            x2={LAYER_COL_X + LAYER_W + 16}
            y2={L1_CY}
            stroke="var(--success)"
            strokeWidth="1.4"
            strokeDasharray="5 3"
            markerEnd="url(#abs-arrow-success-up)"
          />
          <text
            x={LAYER_COL_X + LAYER_W + 28}
            y={L2_CY - 12}
            fontSize="11"
            fill="var(--success)"
          >
            事件回调
          </text>
          <text
            x={LAYER_COL_X + LAYER_W + 28}
            y={L2_CY + 6}
            fontSize="11"
            fill="var(--success)"
          >
            (LiveData/
          </text>
          <text
            x={LAYER_COL_X + LAYER_W + 28}
            y={L2_CY + 22}
            fontSize="11"
            fill="var(--success)"
          >
             Flow) ↑
          </text>

          {/* ===== 底部一句话总结 ===== */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 24}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            核心：把大 Activity 拆成关注点分离的层级，每层只做一件事
          </text>

          <defs>
            <marker
              id="abs-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="abs-arrow-success-up"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="3"
              orient="auto"
            >
              <path d="M0 6 L6 3 L0 0 z" fill="var(--success)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Fat Activity 把所有职责（UI、逻辑、数据、网络）揉在一起，难以测试和维护。
        分层架构将应用拆为 Activity/Fragment（UI）、ViewModel/Presenter（逻辑）、
        Repository（数据协调）、DataSource（API/DB）四层，
        数据流向下，事件回调向上，实现关注点分离。
      </figcaption>
    </figure>
  );
}
