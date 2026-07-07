/**
 * <McdObjectFactoryDiagram>：基于 typelist 的通用对象工厂。
 *
 * 左侧注册表（typeId → Creator 映射），右侧 CreateObject 流程：查找注册表、
 * 调用 Creator、返回 Product 指针。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

interface Entry {
  id: string;
  creator: string;
}
const ENTRIES: readonly Entry[] = [
  { id: "Button", creator: "CreateButton" },
  { id: "Dialog", creator: "CreateDialog" },
  { id: "Scroll", creator: "CreateScroll" },
  { id: "Menu", creator: "CreateMenu" },
];

const REG_X = 40;
const REG_Y = 84;
const REG_W = 290;
const REG_H = 300;

interface Step {
  label: string;
  color: string;
  y: number;
}
const STEP_X = 400;
const STEP_W = 280;
const STEP_H = 50;
const STEPS: readonly Step[] = [
  { label: "CreateObject(typeId)", color: "var(--accent)", y: 100 },
  { label: "查找注册表", color: "var(--success)", y: 180 },
  { label: "调用 Creator() 构造", color: "var(--warning)", y: 260 },
  { label: "返回 Product* 指针", color: "var(--accent)", y: 340 },
];

export function McdObjectFactoryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="对象工厂示意。左侧注册表四行映射：Button 映射 CreateButton、Dialog 映射 CreateDialog、Scroll 映射 CreateScroll、Menu 映射 CreateMenu。右侧创建流程四步：CreateObject 传入 typeId、查找注册表、调用 Creator 构造、返回 Product 指针。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="mcd-of-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            对象工厂：注册 + 创建
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            typeId 映射 Creator · 按需创建 · 基于 typelist 可批量注册
          </text>

          {/* 注册表框 */}
          <rect x={REG_X} y={REG_Y} width={REG_W} height={REG_H} rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.6" />
          <text x={REG_X + REG_W / 2} y={REG_Y + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">
            Registry 注册表
          </text>
          <line x1={REG_X + 16} y1={REG_Y + 36} x2={REG_X + REG_W - 16} y2={REG_Y + 36} stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          {ENTRIES.map((e, i) => {
            const y = REG_Y + 64 + i * 52;
            return (
              <g key={e.id}>
                <rect x={REG_X + 16} y={y} width={120} height={40} rx="6" fill="var(--bg-elevated)" stroke="var(--text-secondary)" strokeWidth="1.2" strokeOpacity="0.5" />
                <text x={REG_X + 76} y={y + 25} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
                  {e.id}
                </text>
                <text x={REG_X + 150} y={y + 25} textAnchor="middle" fontSize="14" fill="var(--text-secondary)">
                  →
                </text>
                <rect x={REG_X + 168} y={y} width={106} height={40} rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" />
                <text x={REG_X + 221} y={y + 25} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)" fontFamily="monospace">
                  {e.creator}
                </text>
              </g>
            );
          })}

          {/* 注册表 → 流程 箭头 */}
          <line x1={REG_X + REG_W} y1={REG_Y + REG_H / 2} x2={STEP_X - 8} y2={STEPS[1].y + STEP_H / 2} stroke="var(--text-secondary)" strokeWidth="1.6" markerEnd="url(#mcd-of-arrow)" />

          {/* 流程步骤 */}
          {STEPS.map((s, i) => (
            <g key={s.label}>
              <rect x={STEP_X} y={s.y} width={STEP_W} height={STEP_H} rx="8" fill={s.color} fillOpacity="0.10" stroke={s.color} strokeWidth="1.6" />
              <text x={STEP_X + STEP_W / 2} y={s.y + STEP_H / 2 + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={s.color} fontFamily="monospace">
                {s.label}
              </text>
              {i < STEPS.length - 1 && (
                <line x1={STEP_X + STEP_W / 2} y1={s.y + STEP_H} x2={STEP_X + STEP_W / 2} y2={STEPS[i + 1].y} stroke="var(--text-secondary)" strokeWidth="1.6" markerEnd="url(#mcd-of-arrow)" />
              )}
            </g>
          ))}

          {/* 底部说明 */}
          <line x1={32} y1={436} x2={VIEW_W - 32} y2={436} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={452} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            Register(typeId, Creator) 注册 · CreateObject(typeId) 创建 · 解耦创建与使用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        对象工厂用 typeId → Creator 注册表，CreateObject 按标识查找并构造，基于 typelist 可批量注册。
      </figcaption>
    </figure>
  );
}
