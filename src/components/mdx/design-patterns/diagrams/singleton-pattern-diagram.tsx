/**
 * <SingletonPatternDiagram>：单例模式结构图（design-patterns 课程）。
 *
 * 展示单例模式的核心结构：
 *   - Singleton 类框：private constructor()、private static instance、public static getInstance()
 *   - 右侧「全局唯一实例」徽章（圆点），由 getInstance() 返回
 *   - 底部 3 种实现对比小表格（饿汉 / 懒汉 / 双重检查），每行标注线程安全性
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×400（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 主体 / 底部对比表）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 400;

// Singleton 类框（左）
const SINGLETON = { x: 56, y: 72, w: 252, h: 164 };
// 全局唯一实例徽章（右）
const BADGE = { cx: 548, cy: 150, r: 54 };

// 底部对比表
const TABLE = { x: 48, y: 256, w: 624, h: 112 };
const COL_X = [48, 224, 464]; // 三列起点
const COL_W = [176, 240, 208]; // 三列宽度
const ROW_Y = [256, 284, 312, 340, 368]; // 表格横线 y（含底）

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const success = "var(--success)";
const danger = "var(--danger)";

export function SingletonPatternDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="单例模式结构图。左侧 Singleton 类框包含 private constructor()、private static instance 属性、public static getInstance() 方法。右侧是「全局唯一实例」徽章，由 getInstance() 返回唯一实例（实线箭头标注「getInstance() 返回」）。底部对比表列出三种实现：饿汉式（类加载时创建，线程安全）、懒汉式（首次调用时创建，线程不安全）、双重检查（首次调用加同步锁，线程安全）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 关联 / 返回：实心三角箭头 */}
            <marker
              id="singleton-return-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="40"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            单例模式 · 结构图
          </text>

          {/* ===== Singleton 类框 ===== */}
          <g>
            <rect
              x={SINGLETON.x}
              y={SINGLETON.y}
              width={SINGLETON.w}
              height={SINGLETON.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={SINGLETON.x + SINGLETON.w / 2}
              y={SINGLETON.y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Singleton
            </text>
            <line
              x1={SINGLETON.x}
              y1={SINGLETON.y + 34}
              x2={SINGLETON.x + SINGLETON.w}
              y2={SINGLETON.y + 34}
              stroke={border}
              strokeWidth="1"
            />
            {/* 属性 */}
            <text
              x={SINGLETON.x + 14}
              y={SINGLETON.y + 54}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - instance: Singleton
            </text>
            <text
              x={SINGLETON.x + 14}
              y={SINGLETON.y + 70}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              // private static
            </text>
            <line
              x1={SINGLETON.x}
              y1={SINGLETON.y + 82}
              x2={SINGLETON.x + SINGLETON.w}
              y2={SINGLETON.y + 82}
              stroke={border}
              strokeWidth="1"
            />
            {/* 方法 */}
            <text
              x={SINGLETON.x + 14}
              y={SINGLETON.y + 102}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              - constructor()
            </text>
            <text
              x={SINGLETON.x + 14}
              y={SINGLETON.y + 118}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              // private，禁止外部 new
            </text>
            <text
              x={SINGLETON.x + 14}
              y={SINGLETON.y + 138}
              fontSize="12"
              fontWeight="600"
              fill={accent}
              fontFamily="monospace"
            >
              + getInstance()
            </text>
            <text
              x={SINGLETON.x + 14}
              y={SINGLETON.y + 154}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              // 返回唯一实例
            </text>
          </g>

          {/* ===== getInstance() 返回 → 徽章 ===== */}
          <line
            x1={SINGLETON.x + SINGLETON.w}
            y1={BADGE.cy}
            x2={BADGE.cx - BADGE.r - 2}
            y2={BADGE.cy}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#singleton-return-arrow)"
          />
          <text
            x={(SINGLETON.x + SINGLETON.w + BADGE.cx - BADGE.r) / 2}
            y={BADGE.cy - 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            getInstance() 返回
          </text>

          {/* ===== 全局唯一实例徽章 ===== */}
          <g>
            <circle
              cx={BADGE.cx}
              cy={BADGE.cy}
              r={BADGE.r}
              fill={accent}
              fillOpacity="0.1"
              stroke={accent}
              strokeWidth="1.8"
            />
            <text
              x={BADGE.cx}
              y={BADGE.cy - 4}
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              唯一
            </text>
            <text
              x={BADGE.cx}
              y={BADGE.cy + 18}
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              实例
            </text>
            <text
              x={BADGE.cx}
              y={BADGE.cy + BADGE.r + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill={primary}
            >
              全局唯一实例
            </text>
          </g>

          {/* ===== 底部对比表 ===== */}
          {/* 表格外框 */}
          <rect
            x={TABLE.x}
            y={TABLE.y}
            width={TABLE.w}
            height={TABLE.h}
            rx="8"
            fill={elevated}
            stroke={border}
            strokeWidth="1.4"
          />
          {/* 表头背景 */}
          <rect
            x={TABLE.x}
            y={TABLE.y}
            width={TABLE.w}
            height={ROW_Y[1] - ROW_Y[0]}
            rx="8"
            fill={accent}
            fillOpacity="0.08"
          />
          {/* 列分隔线 */}
          <line
            x1={COL_X[1]}
            y1={TABLE.y}
            x2={COL_X[1]}
            y2={TABLE.y + TABLE.h}
            stroke={border}
            strokeWidth="1"
          />
          <line
            x1={COL_X[2]}
            y1={TABLE.y}
            x2={COL_X[2]}
            y2={TABLE.y + TABLE.h}
            stroke={border}
            strokeWidth="1"
          />
          {/* 行分隔线 */}
          <line
            x1={TABLE.x}
            y1={ROW_Y[1]}
            x2={TABLE.x + TABLE.w}
            y2={ROW_Y[1]}
            stroke={border}
            strokeWidth="1"
          />
          <line
            x1={TABLE.x}
            y1={ROW_Y[2]}
            x2={TABLE.x + TABLE.w}
            y2={ROW_Y[2]}
            stroke={border}
            strokeWidth="1"
          />
          <line
            x1={TABLE.x}
            y1={ROW_Y[3]}
            x2={TABLE.x + TABLE.w}
            y2={ROW_Y[3]}
            stroke={border}
            strokeWidth="1"
          />

          {/* 表头 */}
          <text
            x={COL_X[0] + COL_W[0] / 2}
            y={ROW_Y[0] + 18}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
          >
            方式
          </text>
          <text
            x={COL_X[1] + COL_W[1] / 2}
            y={ROW_Y[0] + 18}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
          >
            初始化时机
          </text>
          <text
            x={COL_X[2] + COL_W[2] / 2}
            y={ROW_Y[0] + 18}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
          >
            线程安全
          </text>

          {/* 行 1：饿汉式 */}
          <text
            x={COL_X[0] + COL_W[0] / 2}
            y={ROW_Y[1] + 18}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={primary}
            fontFamily="monospace"
          >
            饿汉式
          </text>
          <text
            x={COL_X[1] + COL_W[1] / 2}
            y={ROW_Y[1] + 18}
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            类加载时创建
          </text>
          <text
            x={COL_X[2] + COL_W[2] / 2}
            y={ROW_Y[1] + 18}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={success}
          >
            ✓ 安全
          </text>

          {/* 行 2：懒汉式 */}
          <text
            x={COL_X[0] + COL_W[0] / 2}
            y={ROW_Y[2] + 18}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={primary}
            fontFamily="monospace"
          >
            懒汉式
          </text>
          <text
            x={COL_X[1] + COL_W[1] / 2}
            y={ROW_Y[2] + 18}
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            首次调用时创建
          </text>
          <text
            x={COL_X[2] + COL_W[2] / 2}
            y={ROW_Y[2] + 18}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={danger}
          >
            ✗ 不安全
          </text>

          {/* 行 3：双重检查 */}
          <text
            x={COL_X[0] + COL_W[0] / 2}
            y={ROW_Y[3] + 18}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={primary}
            fontFamily="monospace"
          >
            双重检查
          </text>
          <text
            x={COL_X[1] + COL_W[1] / 2}
            y={ROW_Y[3] + 18}
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            首次调用 + 同步锁
          </text>
          <text
            x={COL_X[2] + COL_W[2] / 2}
            y={ROW_Y[3] + 18}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={success}
          >
            ✓ 安全
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        单例模式确保一个类只有一个实例，并提供全局访问点：构造函数私有化，通过静态
        getInstance() 控制创建。饿汉式简单且线程安全；懒汉式延迟创建但需自行加锁；双重检查在延迟创建的同时保证线程安全与性能。
      </figcaption>
    </figure>
  );
}
