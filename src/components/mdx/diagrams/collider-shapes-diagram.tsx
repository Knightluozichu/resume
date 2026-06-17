"use client";

/**
 * <ColliderShapesDiagram>：四种 Collider「碰撞外壳」的形状对照（静态图，HEL-284）。
 *
 * Collider = 给对象套一层「物理形状轮廓」，引擎拿这个轮廓做碰撞检测（不是拿你看到的网格）。
 * 四栏并排，每栏一个被测物体（淡灰），外面罩一层该 collider 的「形状轮廓」（彩色描边）：
 *  ① BoxCollider：长方体盒子——最便宜，方正物体首选。
 *  ② SphereCollider：球——最便宜，球形物体首选。
 *  ③ CapsuleCollider：胶囊（圆柱两端半球）——角色常用。
 *  ④ MeshCollider：贴着网格本身——最贵；动态物体必须勾 Convex（且 Convex 会被简化成凸包）。
 * 底部一条「成本 / 取舍」条点明：primitive（盒/球/胶囊）便宜，MeshCollider 贵、慎用。
 *
 * 纯静态展示组件（无 anime、无交互），因此不加 "use client" 的交互逻辑——但为与本章其它
 * 图统一外观（卡片 + figcaption），仍渲染为同款 figure。无 Math 算坐标（全整数常量）。
 *
 * 视觉：全部 DESIGN token；无裸 hex（硬规则 5）。所有 <text> 距 viewBox 任意边 ≥14px；
 * 四栏互不重叠；轮廓描边均在各自栏框内、留 ≥12px 边距。
 */

// VIEW_W=732 使四栏 + 三 gap + 两侧各 24px 边距正好填满（24+4*162+3*12+24=732），
// 最右栏右缘 708、距右边界 24px ≥14px 安全边距（svg-check 不报贴边）。
const VIEW_W = 732;
const VIEW_H = 372;

// 四栏布局。
const COL_W = 162;
const COL_GAP = 12;
const COL_X0 = 24;
const COL_Y = 70;
const COL_H = 196;
const colX = (i: number) => COL_X0 + i * (COL_W + COL_GAP);
const colCX = (i: number) => colX(i) + COL_W / 2;

// 形状中心（各栏中央偏上，给底部留文字空间）。
const SHAPE_CY = COL_Y + 86;

// 底部成本条。
const COST_Y = COL_Y + COL_H + 18;
const COST_H = 50;

type ColliderKind = {
  key: string;
  name: string;
  cost: string;
  color: string;
};
const KINDS: readonly ColliderKind[] = [
  { key: "box", name: "BoxCollider", cost: "便宜", color: "var(--accent)" },
  {
    key: "sphere",
    name: "SphereCollider",
    cost: "便宜",
    color: "var(--success)",
  },
  {
    key: "capsule",
    name: "CapsuleCollider",
    cost: "便宜",
    color: "var(--warning)",
  },
  { key: "mesh", name: "MeshCollider", cost: "贵", color: "var(--danger)" },
];

export function ColliderShapesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="四种 Collider 碰撞外壳形状的对照图。Collider 是给对象套一层物理形状轮廓，引擎拿这个轮廓做碰撞检测。四栏并排，每栏一个淡灰的被测物体，外面罩一层该 collider 的形状轮廓。第一栏 BoxCollider 是一个长方体盒子，最便宜，方正物体首选。第二栏 SphereCollider 是一个球，最便宜，球形物体首选。第三栏 CapsuleCollider 是一个胶囊也就是圆柱两端加半球，角色常用。第四栏 MeshCollider 贴着网格本身，最贵，动态物体必须勾 Convex 凸包。底部成本条点明：盒、球、胶囊这三种 primitive 便宜，MeshCollider 贵、要慎用。"
          className="mx-auto block h-auto w-full max-w-[732px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Collider：给对象套一层「碰撞外壳」
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            引擎拿这层轮廓（不是你看到的网格）做碰撞检测——形状越简单越便宜
          </text>

          {/* ===== 四栏 ===== */}
          {KINDS.map((k, i) => (
            <g key={k.key}>
              {/* 栏框 */}
              <rect
                x={colX(i)}
                y={COL_Y}
                width={COL_W}
                height={COL_H}
                rx="10"
                fill="var(--text-secondary)"
                fillOpacity="0.05"
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              {/* collider 名 */}
              <text
                x={colCX(i)}
                y={COL_Y + 22}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {k.name}
              </text>
            </g>
          ))}

          {/* ===== ① BoxCollider：淡灰物体 + 盒子轮廓 ===== */}
          {/* 被测物体（淡灰方块） */}
          <rect
            x={colCX(0) - 34}
            y={SHAPE_CY - 34}
            width={68}
            height={68}
            rx="4"
            fill="var(--text-secondary)"
            fillOpacity="0.16"
          />
          {/* 盒子轮廓（略大于物体的描边框） */}
          <rect
            x={colCX(0) - 42}
            y={SHAPE_CY - 42}
            width={84}
            height={84}
            rx="4"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.2"
            strokeDasharray="6 4"
          />

          {/* ===== ② SphereCollider：淡灰球 + 球轮廓 ===== */}
          <circle
            cx={colCX(1)}
            cy={SHAPE_CY}
            r="32"
            fill="var(--text-secondary)"
            fillOpacity="0.16"
          />
          <circle
            cx={colCX(1)}
            cy={SHAPE_CY}
            r="42"
            fill="none"
            stroke="var(--success)"
            strokeWidth="2.2"
            strokeDasharray="6 4"
          />

          {/* ===== ③ CapsuleCollider：淡灰物体（人形示意）+ 胶囊轮廓 ===== */}
          {/* 被测物体：用一个窄圆角矩形示意角色身体 */}
          <rect
            x={colCX(2) - 18}
            y={SHAPE_CY - 44}
            width={36}
            height={88}
            rx="18"
            fill="var(--text-secondary)"
            fillOpacity="0.16"
          />
          {/* 胶囊轮廓：圆角矩形（圆角 = 半径 = 宽度一半，自然成胶囊） */}
          <rect
            x={colCX(2) - 28}
            y={SHAPE_CY - 52}
            width={56}
            height={104}
            rx="28"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="2.2"
            strokeDasharray="6 4"
          />

          {/* ===== ④ MeshCollider：不规则物体 + 贴网格轮廓 ===== */}
          {/* 被测物体：一个不规则多边形（整数坐标，无 Math） */}
          <polygon
            points={`${colCX(3) - 36},${SHAPE_CY + 10} ${colCX(3) - 20},${SHAPE_CY - 36} ${colCX(3) + 10},${SHAPE_CY - 30} ${colCX(3) + 36},${SHAPE_CY + 6} ${colCX(3) + 14},${SHAPE_CY + 38} ${colCX(3) - 18},${SHAPE_CY + 34}`}
            fill="var(--text-secondary)"
            fillOpacity="0.16"
          />
          {/* 贴网格轮廓：同一多边形外扩的描边（紧贴网格本身 = 顶点多 = 贵） */}
          <polygon
            points={`${colCX(3) - 42},${SHAPE_CY + 12} ${colCX(3) - 22},${SHAPE_CY - 44} ${colCX(3) + 12},${SHAPE_CY - 38} ${colCX(3) + 44},${SHAPE_CY + 6} ${colCX(3) + 18},${SHAPE_CY + 46} ${colCX(3) - 22},${SHAPE_CY + 42}`}
            fill="none"
            stroke="var(--danger)"
            strokeWidth="2.2"
            strokeDasharray="6 4"
          />

          {/* ===== 底部成本 / 取舍条 ===== */}
          <rect
            x={COL_X0}
            y={COST_Y}
            width={VIEW_W - 2 * COL_X0}
            height={COST_H}
            rx="9"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={VIEW_W / 2}
            y={COST_Y + 21}
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            盒 / 球 / 胶囊 = primitive（便宜，优先用）　·　MeshCollider =
            贴网格（贵，慎用）
          </text>
          <text
            x={VIEW_W / 2}
            y={COST_Y + 39}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            MeshCollider 用在动态（会动的）物体上必须勾
            Convex，且会被简化成凸包；两个非 Convex 的 MeshCollider
            默认碰不到一起
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Collider 决定「这个对象多大块头、什么形状会撞到东西」。能用
        primitive（盒 / 球 / 胶囊）就别用 MeshCollider——后者贵、且动态物体要勾
        Convex 才能参与碰撞。
      </figcaption>
    </figure>
  );
}
