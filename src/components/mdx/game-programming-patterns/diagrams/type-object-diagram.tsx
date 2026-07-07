/**
 * <TypeObjectDiagram>：类型对象模式对比图（game-programming-patterns 课程）。
 *
 * 左右双栏对比：
 *   左 硬编码继承（黄）：Monster 基类 → Dragon / Goblin / Orc 三子类，每子类硬编码
 *     hp/atk 属性；加新怪物必须新增子类、改代码。
 *   右 类型对象（紫）：Monster 类持有一个 Breed 引用，Breed 含 name/hp/attack 字段，
 *     Dragon/Goblin/Orc 退化为 Breed 的多个数据实例——加新怪物只加数据。
 * 中间一个「从继承改为数据驱动」的迁移箭头。底部总结栏。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×400、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 双栏主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const warning = "var(--warning)";
const success = "var(--success)";

// 双栏几何
const LEFT_PANEL = { x: 32, y: 76, w: 300, h: 248 };
const RIGHT_PANEL = { x: 388, y: 76, w: 300, h: 248 };

// 左栏：Monster 基类 + 三个硬编码子类
const LEFT_MONSTER = { x: 104, y: 120, w: 156, h: 48 };
const LEFT_BUS_Y = 186;
const LEFT_SUB_Y = 200;
const LEFT_SUB_H = 68;
const LEFT_SUB_W = 84;
const LEFT_SUBS = [
  { name: "Dragon", x: 44, hp: "hp=100", atk: "atk=20" },
  { name: "Goblin", x: 140, hp: "hp=50", atk: "atk=8" },
  { name: "Orc", x: 236, hp: "hp=80", atk: "atk=15" },
];
const leftSubCx = (x: number) => x + LEFT_SUB_W / 2;

// 右栏：Monster 类 → Breed 类 → 多个数据实例
const RIGHT_MONSTER = { x: 460, y: 112, w: 156, h: 52 };
const RIGHT_BREED = { x: 460, y: 176, w: 156, h: 84 };
const RIGHT_INST_Y = 270;
const RIGHT_NOTE_Y = 282;

export function TypeObjectDiagram() {
  const leftMonsterCx = LEFT_MONSTER.x + LEFT_MONSTER.w / 2; // 182
  const rightMonsterCx = RIGHT_MONSTER.x + RIGHT_MONSTER.w / 2; // 538
  const rightBreedCx = RIGHT_BREED.x + RIGHT_BREED.w / 2; // 538
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类型对象模式对比图。左栏硬编码继承：Monster 基类派生 Dragon、Goblin、Orc 三个子类，每个子类硬编码 hp 与 atk 属性，加新怪物要改代码。右栏类型对象：Monster 类持有一个 Breed 引用，Breed 含 name、hp、attack 字段，Dragon、Goblin、Orc 退化为 Breed 的多个数据实例，加新怪物只加数据。中间箭头标注从继承改为数据驱动。底部总结：类型对象把行为差异从继承体系搬到数据里，新增类型无需改代码。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 继承：空心三角箭头 */}
            <marker
              id="to-impl-arrow"
              markerWidth="12"
              markerHeight="12"
              refX="11"
              refY="6"
              orient="auto"
            >
              <path
                d="M1 1 L11 6 L1 11 z"
                fill={elevated}
                stroke={warning}
                strokeWidth="1"
              />
            </marker>
            {/* 持有：实心三角箭头 */}
            <marker
              id="to-holds-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
            </marker>
            {/* 迁移：大实心三角箭头 */}
            <marker
              id="to-mid-arrow"
              markerWidth="12"
              markerHeight="12"
              refX="10"
              refY="6"
              orient="auto"
            >
              <path d="M0 0 L11 6 L0 12 z" fill={accent} />
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
            类型对象 · 从继承到数据驱动
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            把『类型差异』从子类继承搬到可共享的数据对象里
          </text>

          {/* ===== 左栏面板 ===== */}
          <rect
            x={LEFT_PANEL.x}
            y={LEFT_PANEL.y}
            width={LEFT_PANEL.w}
            height={LEFT_PANEL.h}
            rx="12"
            fill="var(--bg)"
            stroke={border}
            strokeWidth="1.2"
          />
          {/* 左栏头 pill */}
          <rect
            x="120"
            y="84"
            width="144"
            height="22"
            rx="11"
            fill={warning}
            fillOpacity="0.12"
            stroke={warning}
            strokeWidth="1.2"
          />
          <text
            x="192"
            y="100"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={warning}
          >
            硬编码继承
          </text>

          {/* Monster 基类框 */}
          <g>
            <rect
              x={LEFT_MONSTER.x}
              y={LEFT_MONSTER.y}
              width={LEFT_MONSTER.w}
              height={LEFT_MONSTER.h}
              rx="8"
              fill={elevated}
              stroke={border}
              strokeWidth="1.6"
            />
            <text
              x={leftMonsterCx}
              y={LEFT_MONSTER.y + 20}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Monster
            </text>
            <line
              x1={LEFT_MONSTER.x}
              y1={LEFT_MONSTER.y + 28}
              x2={LEFT_MONSTER.x + LEFT_MONSTER.w}
              y2={LEFT_MONSTER.y + 28}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={leftMonsterCx}
              y={LEFT_MONSTER.y + 38}
              textAnchor="middle"
              fontSize="11"
              fontStyle="italic"
              fill={secondary}
            >
              «基类»
            </text>
          </g>

          {/* 左栏继承树干 + bus + risers */}
          <line
            x1={leftMonsterCx}
            y1={LEFT_BUS_Y}
            x2={leftMonsterCx}
            y2={LEFT_MONSTER.y + LEFT_MONSTER.h + 2}
            stroke={warning}
            strokeWidth="1.6"
            markerEnd="url(#to-impl-arrow)"
          />
          <line
            x1={leftSubCx(LEFT_SUBS[0].x)}
            y1={LEFT_BUS_Y}
            x2={leftSubCx(LEFT_SUBS[2].x)}
            y2={LEFT_BUS_Y}
            stroke={warning}
            strokeWidth="1.6"
          />
          {LEFT_SUBS.map((s) => (
            <line
              key={`lriser-${s.name}`}
              x1={leftSubCx(s.x)}
              y1={LEFT_BUS_Y}
              x2={leftSubCx(s.x)}
              y2={LEFT_SUB_Y}
              stroke={warning}
              strokeWidth="1.6"
            />
          ))}

          {/* 左栏三个硬编码子类 */}
          {LEFT_SUBS.map((s) => (
            <g key={s.name}>
              <rect
                x={s.x}
                y={LEFT_SUB_Y}
                width={LEFT_SUB_W}
                height={LEFT_SUB_H}
                rx="6"
                fill={elevated}
                stroke={border}
                strokeWidth="1.4"
              />
              <text
                x={leftSubCx(s.x)}
                y={LEFT_SUB_Y + 18}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={primary}
                fontFamily="monospace"
              >
                {s.name}
              </text>
              <line
                x1={s.x}
                y1={LEFT_SUB_Y + 24}
                x2={s.x + LEFT_SUB_W}
                y2={LEFT_SUB_Y + 24}
                stroke={border}
                strokeWidth="1"
              />
              <text
                x={leftSubCx(s.x)}
                y={LEFT_SUB_Y + 40}
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
                fontFamily="monospace"
              >
                {s.hp}
              </text>
              <text
                x={leftSubCx(s.x)}
                y={LEFT_SUB_Y + 56}
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
                fontFamily="monospace"
              >
                {s.atk}
              </text>
            </g>
          ))}

          {/* 左栏 danger 注 */}
          <rect
            x="92"
            y="284"
            width="180"
            height="22"
            rx="11"
            fill="var(--danger)"
            fillOpacity="0.12"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="182"
            y="300"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--danger)"
          >
            加新怪物要改代码
          </text>

          {/* ===== 中间迁移箭头 ===== */}
          <text
            x="360"
            y="180"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={accent}
          >
            从继承改为
          </text>
          <text
            x="360"
            y="196"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={accent}
          >
            数据驱动
          </text>
          <line
            x1="340"
            y1="208"
            x2="378"
            y2="208"
            stroke={accent}
            strokeWidth="2.4"
            markerEnd="url(#to-mid-arrow)"
          />

          {/* ===== 右栏面板 ===== */}
          <rect
            x={RIGHT_PANEL.x}
            y={RIGHT_PANEL.y}
            width={RIGHT_PANEL.w}
            height={RIGHT_PANEL.h}
            rx="12"
            fill="var(--bg)"
            stroke={border}
            strokeWidth="1.2"
          />
          {/* 右栏头 pill */}
          <rect
            x="476"
            y="84"
            width="124"
            height="22"
            rx="11"
            fill={accent}
            fillOpacity="0.12"
            stroke={accent}
            strokeWidth="1.2"
          />
          <text
            x="538"
            y="100"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={accent}
          >
            类型对象
          </text>

          {/* Monster 类框（持有 Breed 引用） */}
          <g>
            <rect
              x={RIGHT_MONSTER.x}
              y={RIGHT_MONSTER.y}
              width={RIGHT_MONSTER.w}
              height={RIGHT_MONSTER.h}
              rx="8"
              fill={elevated}
              stroke={border}
              strokeWidth="1.6"
            />
            <text
              x={rightMonsterCx}
              y={RIGHT_MONSTER.y + 18}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Monster
            </text>
            <line
              x1={RIGHT_MONSTER.x}
              y1={RIGHT_MONSTER.y + 26}
              x2={RIGHT_MONSTER.x + RIGHT_MONSTER.w}
              y2={RIGHT_MONSTER.y + 26}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={RIGHT_MONSTER.x + 14}
              y={RIGHT_MONSTER.y + 42}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              - breed: Breed
            </text>
          </g>

          {/* 持有箭头：Monster → Breed */}
          <line
            x1={rightMonsterCx}
            y1={RIGHT_MONSTER.y + RIGHT_MONSTER.h}
            x2={rightMonsterCx}
            y2={RIGHT_BREED.y - 2}
            stroke={accent}
            strokeWidth="1.6"
            markerEnd="url(#to-holds-arrow)"
          />
          <text
            x={rightMonsterCx + 8}
            y={(RIGHT_MONSTER.y + RIGHT_MONSTER.h + RIGHT_BREED.y) / 2 + 4}
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            持有
          </text>

          {/* Breed 类型对象框 */}
          <g>
            <rect
              x={RIGHT_BREED.x}
              y={RIGHT_BREED.y}
              width={RIGHT_BREED.w}
              height={RIGHT_BREED.h}
              rx="8"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.6"
            />
            <text
              x={rightBreedCx}
              y={RIGHT_BREED.y + 18}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Breed
            </text>
            <line
              x1={RIGHT_BREED.x}
              y1={RIGHT_BREED.y + 26}
              x2={RIGHT_BREED.x + RIGHT_BREED.w}
              y2={RIGHT_BREED.y + 26}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={RIGHT_BREED.x + 14}
              y={RIGHT_BREED.y + 44}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + name: string
            </text>
            <text
              x={RIGHT_BREED.x + 14}
              y={RIGHT_BREED.y + 60}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + hp: int
            </text>
            <text
              x={RIGHT_BREED.x + 14}
              y={RIGHT_BREED.y + 76}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + attack: int
            </text>
          </g>

          {/* 多个数据实例说明 */}
          <text
            x={rightBreedCx}
            y={RIGHT_INST_Y}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            <tspan fontFamily="monospace">实例：</tspan>
            <tspan fill={primary} fontFamily="monospace">
              {" "}Dragon · Goblin · Orc
            </tspan>
          </text>

          {/* 右栏 success 注 */}
          <rect
            x="444"
            y={RIGHT_NOTE_Y}
            width="188"
            height="22"
            rx="11"
            fill={success}
            fillOpacity="0.12"
            stroke={success}
            strokeWidth="1.2"
          />
          <text
            x="538"
            y={RIGHT_NOTE_Y + 16}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={success}
          >
            加新怪物只加数据
          </text>

          {/* ===== 底部总结栏 ===== */}
          <rect
            x="80"
            y="340"
            width={VIEW_W - 160}
            height="32"
            rx="10"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="361"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
          >
            类型对象：把「类型差异」从继承体系搬到数据里，新增类型无需改代码
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        每种怪物不再是一个硬编码子类，而是一个 Breed 数据对象；Monster 持有对 Breed 的引用，所有同类怪物共享同一份 Breed。新增怪物类型只需新增一条数据，无需重新编译或改动类继承体系——把「开闭原则」做到了数据层。
      </figcaption>
    </figure>
  );
}
