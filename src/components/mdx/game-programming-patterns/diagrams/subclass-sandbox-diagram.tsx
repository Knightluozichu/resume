/**
 * <SubclassSandboxDiagram>：子类沙箱模式结构图（game-programming-patterns 课程）。
 *
 * 顶部基类 GameEntity 提供三个 protected 沙箱 API（startSound / startEffect / spawnEntity），
 * 底部两个子类 Ghost、Dragon 各自 override update()，在沙箱 API 内组合行为。
 * UML 继承箭头（实线空心三角）从子类经共用树干指向基类。
 * 底部总结：子类通过受保护的沙箱 API 编写行为，无需了解系统全局。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×380、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / UML 主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 380;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

// GameEntity 基类框（顶部居中）
const BASE = { x: 200, y: 70, w: 320, h: 96 };
// 继承树干 bus y
const BUS_Y = 190;
// 两个子类框
const SUB_Y = 210;
const SUB_H = 100;
const SUB_W = 200;
const SUBS = [
  { name: "Ghost", x: 120, calls: ["→ startSound()", "→ spawnEntity()"] },
  { name: "Dragon", x: 400, calls: ["→ startEffect()", "→ startSound()"] },
];
const subCx = (x: number) => x + SUB_W / 2;

export function SubclassSandboxDiagram() {
  const baseCx = BASE.x + BASE.w / 2; // 360
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="子类沙箱模式结构图。顶部基类 GameEntity 提供三个受保护的沙箱 API：startSound、startEffect、spawnEntity。底部两个子类：Ghost 重写 update 调用 startSound 与 spawnEntity；Dragon 重写 update 调用 startEffect 与 startSound。子类以 UML 继承箭头（实线空心三角）经共用树干指向基类。底部总结：子类通过受保护的沙箱 API 编写行为，无需了解系统全局。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 继承：空心三角箭头（指向父类） */}
            <marker
              id="ss-impl-arrow"
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
            子类沙箱 · 结构图
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            基类提供受保护的沙箱 API，子类在其内编写行为
          </text>

          {/* ===== GameEntity 基类框 ===== */}
          <g>
            <rect
              x={BASE.x}
              y={BASE.y}
              width={BASE.w}
              height={BASE.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={BASE.x + 16}
              y={BASE.y + 22}
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              GameEntity
            </text>
            {/* 沙箱 API 标签 pill */}
            <rect
              x={BASE.x + BASE.w - 108}
              y={BASE.y + 10}
              width="92"
              height="18"
              rx="9"
              fill={accent}
              fillOpacity="0.14"
              stroke={accent}
              strokeWidth="1"
            />
            <text
              x={BASE.x + BASE.w - 62}
              y={BASE.y + 23}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={accent}
            >
              沙箱 API
            </text>
            <line
              x1={BASE.x}
              y1={BASE.y + 30}
              x2={BASE.x + BASE.w}
              y2={BASE.y + 30}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={BASE.x + 16}
              y={BASE.y + 50}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              # startSound()
            </text>
            <text
              x={BASE.x + 16}
              y={BASE.y + 68}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              # startEffect()
            </text>
            <text
              x={BASE.x + 16}
              y={BASE.y + 86}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              # spawnEntity()
            </text>
          </g>

          {/* ===== 继承树干 + bus ===== */}
          {/* 主干：bus → GameEntity 底部，箭头指向 GameEntity */}
          <line
            x1={baseCx}
            y1={BUS_Y}
            x2={baseCx}
            y2={BASE.y + BASE.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            markerEnd="url(#ss-impl-arrow)"
          />
          {/* 水平 bus */}
          <line
            x1={subCx(SUBS[0].x)}
            y1={BUS_Y}
            x2={subCx(SUBS[1].x)}
            y2={BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
          />
          {/* 子类 riser（bus → 子类顶部，无箭头） */}
          {SUBS.map((s) => (
            <line
              key={`riser-${s.name}`}
              x1={subCx(s.x)}
              y1={BUS_Y}
              x2={subCx(s.x)}
              y2={SUB_Y}
              stroke={accent}
              strokeWidth="1.6"
            />
          ))}
          <text
            x={baseCx + 8}
            y={(BASE.y + BASE.h + BUS_Y) / 2 + 4}
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            继承
          </text>

          {/* ===== 两个子类框 ===== */}
          {SUBS.map((s) => (
            <g key={s.name}>
              <rect
                x={s.x}
                y={SUB_Y}
                width={SUB_W}
                height={SUB_H}
                rx="10"
                fill={elevated}
                stroke={border}
                strokeWidth="1.8"
              />
              <text
                x={s.x + 16}
                y={SUB_Y + 24}
                fontSize="14"
                fontWeight="700"
                fill={primary}
                fontFamily="monospace"
              >
                {s.name}
              </text>
              <line
                x1={s.x}
                y1={SUB_Y + 32}
                x2={s.x + SUB_W}
                y2={SUB_Y + 32}
                stroke={border}
                strokeWidth="1"
              />
              <text
                x={s.x + 16}
                y={SUB_Y + 52}
                fontSize="12"
                fontWeight="700"
                fill={accent}
                fontFamily="monospace"
              >
                + update() {"{override}"}
              </text>
              <text
                x={s.x + 16}
                y={SUB_Y + 74}
                fontSize="11"
                fill={primary}
                fontFamily="monospace"
              >
                {s.calls[0]}
              </text>
            </g>
          ))}

          {/* 第二条调用（Ghost/Dragon 各第二条） */}
          {SUBS.map((s) => (
            <text
              key={`call2-${s.name}`}
              x={s.x + 16}
              y={SUB_Y + 92}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              {s.calls[1]}
            </text>
          ))}

          {/* ===== 底部总结栏 ===== */}
          <rect
            x="80"
            y="324"
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
            y="345"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
          >
            子类通过受保护的沙箱 API 编写行为，无需了解系统全局
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        基类把「调用引擎子系统」的能力收拢为一组受保护方法，子类只需在这套沙箱 API 内组合行为，不必直接依赖音频、特效、生成等全局系统——既限制了子类的耦合面，也保留了继承带来的多态分发。
      </figcaption>
    </figure>
  );
}
