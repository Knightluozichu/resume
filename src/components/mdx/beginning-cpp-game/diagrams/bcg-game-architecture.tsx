/**
 * <BcgGameArchitectureDiagram>：游戏项目架构图（beginning-cpp-game-programming 综合项目章）。
 *
 * 分层架构：顶层「Game 游戏主类」统管，下分四模块：
 *   实体管理（绿）/ 状态机（紫）/ 资源管理（橙）/ 输入与渲染（红）
 * 每模块画成一张卡，列职责与关键类。模块间用连线表示协作。
 * 底部一行点出「Game 类是骨架，四模块是肌肉」。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 分层主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const TOP_Y = 92;
const TOP_H = 44;

const MOD_TOP = 168;
const MOD_W = 152;
const MOD_H = 168;
const MOD_GAP = 16;
const MOD_MARGIN = 36;
const modX = (i: number) => MOD_MARGIN + i * (MOD_W + MOD_GAP);

type Module = {
  id: string;
  name: string;
  color: string;
  duty: string;
  classes: string[];
};

const MODULES: readonly Module[] = [
  { id: "entity", name: "实体管理", color: "var(--success)", duty: "管所有游戏对象", classes: ["Entity 基类", "Player / Enemy", "vector<Entity*>"] },
  { id: "state", name: "状态机", color: "var(--accent)", duty: "管游戏阶段切换", classes: ["State 基类", "MenuState", "PlayState"] },
  { id: "resource", name: "资源管理", color: "var(--warning)", duty: "加载缓存复用资源", classes: ["TextureHolder", "FontHolder", "按 id 取资源"] },
  { id: "io", name: "输入与渲染", color: "var(--danger)", duty: "读输入、画画面", classes: ["RenderWindow", "InputManager", "draw() 提交"] },
];

export function BcgGameArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏项目架构图。顶层 Game 游戏主类统管，下分四模块：实体管理（绿色，管所有游戏对象，含 Entity 基类、Player/Enemy、vector 容器）；状态机（紫色，管游戏阶段切换，含 State 基类、MenuState、PlayState）；资源管理（橙色，加载缓存复用资源，含 TextureHolder、FontHolder）；输入与渲染（红色，读输入画画面，含 RenderWindow、InputManager）。Game 类与四模块用连线相连。底部总结：Game 类是骨架，四模块是肌肉。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="bcg-arch-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏项目 · 分层架构
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Game 主类统管 · 实体 / 状态 / 资源 / IO 四模块协作
          </text>

          {/* ===== 顶层 Game 主类 ===== */}
          <rect x={VIEW_W / 2 - 110} y={TOP_Y} width="220" height={TOP_H} rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.6" />
          <text x={VIEW_W / 2} y={TOP_Y + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">class Game</text>
          <text x={VIEW_W / 2} y={TOP_Y + 36} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">主循环 · 持有四模块 · 统筹调度</text>

          {/* Game → 四模块 连线 */}
          {MODULES.map((m, i) => {
            const mx = modX(i) + MOD_W / 2;
            return (
              <line key={`l-${m.id}`} x1={VIEW_W / 2} y1={TOP_Y + TOP_H} x2={mx} y2={MOD_TOP} stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" markerEnd="url(#bcg-arch-arrow)" />
            );
          })}

          {/* ===== 四模块卡 ===== */}
          {MODULES.map((m, ci) => {
            const x = modX(ci);
            const cx = x + MOD_W / 2;
            return (
              <g key={m.id}>
                <rect x={x} y={MOD_TOP} width={MOD_W} height={MOD_H} rx="10" fill="var(--bg)" stroke={m.color} strokeWidth="1.6" />
                {/* 模块头 */}
                <rect x={x} y={MOD_TOP} width={MOD_W} height="30" rx="10" fill={m.color} fillOpacity="0.12" stroke={m.color} strokeWidth="1.2" />
                <text x={cx} y={MOD_TOP + 20} textAnchor="middle" fontSize="13" fontWeight="700" fill={m.color}>{m.name}</text>
                {/* 职责 */}
                <text x={cx} y={MOD_TOP + 50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{m.duty}</text>
                {/* 关键类 */}
                <line x1={x + 12} y1={MOD_TOP + 62} x2={x + MOD_W - 12} y2={MOD_TOP + 62} stroke="var(--border)" strokeWidth="0.8" />
                <text x={cx} y={MOD_TOP + 78} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">关键类</text>
                {m.classes.map((cls, ki) => (
                  <text key={cls} x={cx} y={MOD_TOP + 98 + ki * 20} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{cls}</text>
                ))}
              </g>
            );
          })}

          {/* 模块间协作连线（实体 ↔ 状态机 ↔ IO） */}
          <line x1={modX(0) + MOD_W} y1={MOD_TOP + MOD_H / 2} x2={modX(1)} y2={MOD_TOP + MOD_H / 2} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={modX(2) + MOD_W} y1={MOD_TOP + MOD_H / 2} x2={modX(3)} y2={MOD_TOP + MOD_H / 2} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            Game 类是骨架 · 四模块是肌肉——分工清晰才能扩展，新增关卡/敌人不动主循环
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏主类 Game 持有并调度四大模块：实体管理管对象集合，状态机管阶段切换，资源管理管加载复用，输入与渲染管 IO。分层后新增内容只动对应模块，不破坏主循环。
      </figcaption>
    </figure>
  );
}
