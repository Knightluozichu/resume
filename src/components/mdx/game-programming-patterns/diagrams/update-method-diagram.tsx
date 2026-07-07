/**
 * <UpdateMethodDiagram>：更新方法模式图（game-programming-patterns 课程）。
 *
 * UML 类图 + 持有关系：
 *   - 顶部居中 GameWorld 类：持有 entities: Entity[]，update() 遍历调用
 *   - 中部 Entity 抽象基类（«abstract»）：声明 update() {abstract}
 *   - 底部三个子类 Player / Enemy / Particle，各自实现 update()
 *   - 实线实心箭头 = 持有（GameWorld → Entity，标注 entities）
 *   - 虚线空心三角箭头 = 继承（三子类 → Entity，共用一条 UML 继承树干）
 * 底部一句话总结：每帧遍历所有实体，调用各自的 update()——统一更新接口。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×420、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / UML 主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 420;

// GameWorld 类框（顶部居中）
const GAMEWORLD = { x: 260, y: 72, w: 200, h: 80 };
// Entity 抽象类框（中部居中）
const ENTITY = { x: 260, y: 180, w: 200, h: 70 };
// 继承树干 bus y
const BUS_Y = 278;
// 三个子类框（底部）
const SUB_H = 68;
const SUB_Y = 298;
const SUB_W = 160;
const SUB_GAP = 24;
const subX = (i: number) => (VIEW_W - (3 * SUB_W + 2 * SUB_GAP)) / 2 + i * (SUB_W + SUB_GAP);
const subCx = (i: number) => subX(i) + SUB_W / 2;

const SUBCLASSES = [
  { name: "Player", hint: "// 处理输入" },
  { name: "Enemy", hint: "// AI 行为" },
  { name: "Particle", hint: "// 物理模拟" },
];

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function UpdateMethodDiagram() {
  const gwCx = GAMEWORLD.x + GAMEWORLD.w / 2; // 360
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="更新方法模式图。顶部居中 GameWorld 类，持有 entities 即 Entity 数组，update 方法遍历调用。中部 Entity 抽象基类（«abstract»），声明 update 抽象方法。GameWorld 以实线实心箭头指向 Entity 表示持有关系，标注 entities。底部三个子类 Player（update 处理输入）、Enemy（update AI 行为）、Particle（update 物理模拟），以虚线空心三角箭头通过共用树干指向 Entity 表示继承关系。底部总结：每帧遍历所有实体，调用各自的 update——统一更新接口。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 持有：实心三角箭头 */}
            <marker
              id="ump-holds-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
            </marker>
            {/* 继承：空心三角箭头（指向父类） */}
            <marker
              id="ump-impl-arrow"
              markerWidth="12"
              markerHeight="12"
              refX="11"
              refY="6"
              orient="auto"
            >
              <path
                d="M1 1 L11 6 L1 11 z"
                fill={elevated}
                stroke={accent}
                strokeWidth="1"
              />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            更新方法 · 结构图
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            GameWorld 每帧遍历 entities，统一调用 update()
          </text>

          {/* ===== GameWorld 类框 ===== */}
          <g>
            <rect
              x={GAMEWORLD.x}
              y={GAMEWORLD.y}
              width={GAMEWORLD.w}
              height={GAMEWORLD.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={gwCx}
              y={GAMEWORLD.y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              GameWorld
            </text>
            <line
              x1={GAMEWORLD.x}
              y1={GAMEWORLD.y + 34}
              x2={GAMEWORLD.x + GAMEWORLD.w}
              y2={GAMEWORLD.y + 34}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={GAMEWORLD.x + 14}
              y={GAMEWORLD.y + 54}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - entities: Entity[]
            </text>
            <line
              x1={GAMEWORLD.x}
              y1={GAMEWORLD.y + 64}
              x2={GAMEWORLD.x + GAMEWORLD.w}
              y2={GAMEWORLD.y + 64}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={GAMEWORLD.x + 14}
              y={GAMEWORLD.y + 84}
              fontSize="12"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              + update()
            </text>
          </g>

          {/* ===== 持有箭头：GameWorld → Entity ===== */}
          <line
            x1={gwCx}
            y1={GAMEWORLD.y + GAMEWORLD.h}
            x2={gwCx}
            y2={ENTITY.y - 2}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#ump-holds-arrow)"
          />
          <text
            x={gwCx + 8}
            y={(GAMEWORLD.y + GAMEWORLD.h + ENTITY.y) / 2 + 4}
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            entities *
          </text>

          {/* ===== Entity 抽象类框 ===== */}
          <g>
            <rect
              x={ENTITY.x}
              y={ENTITY.y}
              width={ENTITY.w}
              height={ENTITY.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={ENTITY.x + ENTITY.w / 2}
              y={ENTITY.y + 20}
              textAnchor="middle"
              fontSize="11"
              fontStyle="italic"
              fill={secondary}
            >
              «abstract»
            </text>
            <text
              x={ENTITY.x + ENTITY.w / 2}
              y={ENTITY.y + 38}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fontStyle="italic"
              fill={primary}
              fontFamily="monospace"
            >
              Entity
            </text>
            <line
              x1={ENTITY.x}
              y1={ENTITY.y + 48}
              x2={ENTITY.x + ENTITY.w}
              y2={ENTITY.y + 48}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={ENTITY.x + 14}
              y={ENTITY.y + 66}
              fontSize="12"
              fontStyle="italic"
              fill={primary}
              fontFamily="monospace"
            >
              + update() {"{abstract}"}
            </text>
          </g>

          {/* ===== 继承树干 + bus ===== */}
          {/* 主干：bus → Entity 底部，箭头指向 Entity */}
          <line
            x1={gwCx}
            y1={BUS_Y}
            x2={gwCx}
            y2={ENTITY.y + ENTITY.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            markerEnd="url(#ump-impl-arrow)"
          />
          {/* 水平 bus */}
          <line
            x1={subCx(0)}
            y1={BUS_Y}
            x2={subCx(2)}
            y2={BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
          />
          {/* 三个子类 riser（bus → 子类顶部，无箭头） */}
          {SUBCLASSES.map((_, i) => (
            <line
              key={`riser-${i}`}
              x1={subCx(i)}
              y1={BUS_Y}
              x2={subCx(i)}
              y2={SUB_Y}
              stroke={accent}
              strokeWidth="1.6"
            />
          ))}

          {/* ===== 三个子类框 ===== */}
          {SUBCLASSES.map((sub, i) => {
            const x = subX(i);
            return (
              <g key={sub.name}>
                <rect
                  x={x}
                  y={SUB_Y}
                  width={SUB_W}
                  height={SUB_H}
                  rx="10"
                  fill={elevated}
                  stroke={border}
                  strokeWidth="1.8"
                />
                <text
                  x={x + SUB_W / 2}
                  y={SUB_Y + 24}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={primary}
                  fontFamily="monospace"
                >
                  {sub.name}
                </text>
                <line
                  x1={x}
                  y1={SUB_Y + 32}
                  x2={x + SUB_W}
                  y2={SUB_Y + 32}
                  stroke={border}
                  strokeWidth="1"
                />
                <text
                  x={x + 12}
                  y={SUB_Y + 50}
                  fontSize="12"
                  fontWeight="700"
                  fill={accent}
                  fontFamily="monospace"
                >
                  + update()
                </text>
                <text
                  x={x + 12}
                  y={SUB_Y + 64}
                  fontSize="11"
                  fontStyle="italic"
                  fill={secondary}
                  fontFamily="monospace"
                >
                  {sub.hint}
                </text>
              </g>
            );
          })}

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="392"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            每帧遍历所有实体，调用各自的 update()——统一更新接口
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        GameWorld 不关心每个实体具体是什么，只依赖 Entity 的 update() 接口；新增实体类型只需新增一个子类，游戏循环的遍历代码无需改动——开闭原则在每帧更新中的应用。
      </figcaption>
    </figure>
  );
}
