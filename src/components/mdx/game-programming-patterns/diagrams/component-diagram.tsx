/**
 * <ComponentDiagram>：组件模式架构图（game-programming-patterns 课程）。
 *
 * 左右对比：
 *   左 深度继承（黄）：GameObject → PhysicalObject → MovingObject → Player 四层
 *     继承链，标注「继承链太长 · 难以维护」。
 *   右 组件模式（紫）：GameObject 持有 components 数组，下接 PhysicsComponent /
 *     RenderComponent / InputComponent 三个并列组件，各实现 update()。GameObject
 *     与组件之间用聚合（空心菱形）连接。
 * 底部总结：用聚合替代继承，GameObject 持有一组可插拔的组件。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×420、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 双栏主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const warning = "var(--warning)";

// 左栏：深度继承链
const LEFT_PANEL = { x: 32, y: 76, w: 200, h: 268 };
const CHAIN_W = 160;
const CHAIN_X = 52;
const CHAIN_H = 32;
const CHAIN = [
  { name: "GameObject", y: 116 },
  { name: "PhysicalObject", y: 164 },
  { name: "MovingObject", y: 212 },
  { name: "Player", y: 260 },
];

// 右栏：组件模式
const RIGHT_PANEL = { x: 252, y: 76, w: 436, h: 268 };
const GO = { x: 372, y: 116, w: 196, h: 84 };
const COMP_BUS_Y = 220;
const COMP_Y = 240;
const COMP_H = 72;
const COMP_W = 120;
const COMPS = [
  { name: "PhysicsComp", x: 270, role: "物理" },
  { name: "RenderComp", x: 410, role: "渲染" },
  { name: "InputComp", x: 550, role: "输入" },
];
const compCx = (x: number) => x + COMP_W / 2;

export function ComponentDiagram() {
  const goCx = GO.x + GO.w / 2; // 470
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="组件模式架构图。左栏深度继承（黄）：GameObject 派生 PhysicalObject，再派生 MovingObject，再派生 Player，四层继承链，标注继承链太长、难以维护、新增行为要改基类。右栏组件模式（紫）：GameObject 持有 components 数组与 addComponent、update、render 方法，下接 PhysicsComponent（物理）、RenderComponent（渲染）、InputComponent（输入）三个并列组件，各实现 update；GameObject 与组件以聚合（空心菱形）连接。底部总结：用聚合替代继承，GameObject 持有一组可插拔的组件。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 继承：空心三角箭头（指向上层父类） */}
            <marker
              id="comp-inherit"
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
            {/* 聚合到组件：实心小三角 */}
            <marker
              id="comp-aggr-arrow"
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
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            组件模式 · 聚合替代继承
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            把「行为」拆成可插拔的组件，而非堆进一根继承链
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
          <rect
            x="72"
            y="84"
            width="120"
            height="22"
            rx="11"
            fill={warning}
            fillOpacity="0.12"
            stroke={warning}
            strokeWidth="1.2"
          />
          <text
            x="132"
            y="100"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={warning}
          >
            深度继承
          </text>

          {/* 继承链：自下而上画箭头（子→父） */}
          {CHAIN.slice(0, 3).map((c, i) => {
            const child = CHAIN[i + 1];
            return (
              <line
                key={`chain-${c.name}`}
                x1={CHAIN_X + CHAIN_W / 2}
                y1={child.y}
                x2={CHAIN_X + CHAIN_W / 2}
                y2={c.y + CHAIN_H + 2}
                stroke={warning}
                strokeWidth="1.6"
                markerEnd="url(#comp-inherit)"
              />
            );
          })}

          {/* 四个继承链节点 */}
          {CHAIN.map((c) => (
            <g key={c.name}>
              <rect
                x={CHAIN_X}
                y={c.y}
                width={CHAIN_W}
                height={CHAIN_H}
                rx="8"
                fill={elevated}
                stroke={border}
                strokeWidth="1.4"
              />
              <text
                x={CHAIN_X + CHAIN_W / 2}
                y={c.y + CHAIN_H / 2 + 4}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={primary}
                fontFamily="monospace"
              >
                {c.name}
              </text>
            </g>
          ))}

          {/* 左栏注 */}
          <text
            x="132"
            y="312"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={warning}
          >
            继承链太长 · 难以维护
          </text>
          <text
            x="132"
            y="328"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            新增行为只能改基类
          </text>

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
          <rect
            x="412"
            y="84"
            width="116"
            height="22"
            rx="11"
            fill={accent}
            fillOpacity="0.12"
            stroke={accent}
            strokeWidth="1.2"
          />
          <text
            x="470"
            y="100"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={accent}
          >
            组件模式
          </text>

          {/* GameObject 类框 */}
          <g>
            <rect
              x={GO.x}
              y={GO.y}
              width={GO.w}
              height={GO.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={goCx}
              y={GO.y + 20}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              GameObject
            </text>
            <line
              x1={GO.x}
              y1={GO.y + 28}
              x2={GO.x + GO.w}
              y2={GO.y + 28}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={GO.x + 14}
              y={GO.y + 46}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              - components: Component[]
            </text>
            <text
              x={GO.x + 14}
              y={GO.y + 62}
              fontSize="11"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              + addComponent()
            </text>
            <text
              x={GO.x + 14}
              y={GO.y + 76}
              fontSize="11"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              + update() + render()
            </text>
          </g>

          {/* 聚合：空心菱形（GameObject 端）+ 主干 + bus + risers */}
          {/* 菱形（聚合，空心）位于 GameObject 底部 */}
          <polygon
            points={`${goCx},${GO.y + GO.h} ${goCx + 6},${GO.y + GO.h + 8} ${goCx},${GO.y + GO.h + 16} ${goCx - 6},${GO.y + GO.h + 8}`}
            fill={elevated}
            stroke={accent}
            strokeWidth="1.4"
          />
          {/* 主干：菱形底 → bus */}
          <line
            x1={goCx}
            y1={GO.y + GO.h + 16}
            x2={goCx}
            y2={COMP_BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
          />
          {/* 水平 bus */}
          <line
            x1={compCx(COMPS[0].x)}
            y1={COMP_BUS_Y}
            x2={compCx(COMPS[2].x)}
            y2={COMP_BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
          />
          {/* risers：bus → 各组件顶部，带箭头 */}
          {COMPS.map((c) => (
            <line
              key={`criser-${c.name}`}
              x1={compCx(c.x)}
              y1={COMP_BUS_Y}
              x2={compCx(c.x)}
              y2={COMP_Y - 2}
              stroke={accent}
              strokeWidth="1.6"
              markerEnd="url(#comp-aggr-arrow)"
            />
          ))}
          <text
            x={goCx + 8}
            y={(GO.y + GO.h + 16 + COMP_BUS_Y) / 2}
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            持有 *
          </text>

          {/* 三个组件框 */}
          {COMPS.map((c) => (
            <g key={c.name}>
              <rect
                x={c.x}
                y={COMP_Y}
                width={COMP_W}
                height={COMP_H}
                rx="10"
                fill={elevated}
                stroke={border}
                strokeWidth="1.8"
              />
              <text
                x={compCx(c.x)}
                y={COMP_Y + 22}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={primary}
                fontFamily="monospace"
              >
                {c.name}
              </text>
              <line
                x1={c.x}
                y1={COMP_Y + 30}
                x2={c.x + COMP_W}
                y2={COMP_Y + 30}
                stroke={border}
                strokeWidth="1"
              />
              <text
                x={compCx(c.x)}
                y={COMP_Y + 48}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={accent}
                fontFamily="monospace"
              >
                + update()
              </text>
              <text
                x={compCx(c.x)}
                y={COMP_Y + 64}
                textAnchor="middle"
                fontSize="11"
                fontStyle="italic"
                fill={secondary}
              >
                // {c.role}
              </text>
            </g>
          ))}

          {/* 右栏注 */}
          <text
            x="470"
            y="332"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={accent}
          >
            组合优于继承 · 行为可插拔
          </text>

          {/* ===== 底部总结栏 ===== */}
          <rect
            x="80"
            y="360"
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
            y="381"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
          >
            组件模式：用聚合替代继承，GameObject 持有一组可插拔的组件
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        深继承把不同维度的能力（物理、渲染、输入）强行塞进一根单链，新增任意维度都要动基类。组件模式把它们拆成独立组件，GameObject 只持有一个组件列表——要什么能力就挂什么组件，互不耦合，也避免了菱形继承。
      </figcaption>
    </figure>
  );
}
