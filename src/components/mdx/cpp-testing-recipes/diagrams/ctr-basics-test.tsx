/**
 * <CtrBasicsTestDiagram>：基础语法三大陷阱（UB / const / 类型转换）。
 *
 * 三列面板横向排布，每列展示一类陷阱的要点：
 *   - 未定义行为（danger 红）：有符号溢出、未初始化读取、解引用空指针
 *   - const 正确性（accent 紫）：const 成员函数、mutable 逃生口、const 重载
 *   - 类型转换（warning 暖）：static/const/reinterpret/dynamic_cast 四件套
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const PANEL_W = 208;
const PANEL_GAP = 16;
const PANEL_MARGIN = 32;
const panelX = (i: number) => PANEL_MARGIN + i * (PANEL_W + PANEL_GAP);

interface Panel {
  title: string;
  color: string;
  items: string[];
}

const PANELS: readonly Panel[] = [
  {
    title: "未定义行为 UB",
    color: "var(--danger)",
    items: ["有符号整数溢出", "读取未初始化变量", "解引用空/悬空指针", "修改 const 对象"],
  },
  {
    title: "const 正确性",
    color: "var(--accent)",
    items: ["const 成员函数不改状态", "mutable 逻辑 const 逃生口", "const 参与重载决议", "const T* 与 T* const"],
  },
  {
    title: "类型转换四件套",
    color: "var(--warning)",
    items: ["static_cast 相关类型", "const_cast 增删 const", "reinterpret_cast 位重解释", "dynamic_cast 运行时向下转"],
  },
];

const ITEM_H = 44;
const ITEM_GAP = 10;
const ITEM_START_Y = 140;

export function CtrBasicsTestDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="基础语法三大陷阱。三列面板：第 1 列未定义行为（红色，有符号溢出、未初始化读取、空指针解引用、修改 const 对象）；第 2 列 const 正确性（紫色，const 成员函数、mutable 逃生口、const 重载、const 指针）；第 3 列类型转换四件套（暖色，static_cast、const_cast、reinterpret_cast、dynamic_cast）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            基础语法三大陷阱
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            UB · const 正确性 · 类型转换——面试最常考的语法雷区
          </text>

          {/* 三列面板 */}
          {PANELS.map((p, pi) => {
            const px = panelX(pi);
            const panelH = ITEM_START_Y - 110 + p.items.length * (ITEM_H + ITEM_GAP) + 16;
            return (
              <g key={p.title}>
                {/* 面板背景 */}
                <rect x={px} y={92} width={PANEL_W} height={panelH} rx="10" fill="var(--bg-elevated)" stroke={p.color} strokeWidth="1.6" strokeOpacity="0.5" />
                {/* 面板头 */}
                <rect x={px} y={92} width={PANEL_W} height={36} rx="10" fill={p.color} fillOpacity="0.14" />
                <rect x={px} y={114} width={PANEL_W} height={14} fill={p.color} fillOpacity="0.14" />
                <text x={px + PANEL_W / 2} y={115} textAnchor="middle" fontSize="13" fontWeight="700" fill={p.color}>
                  {p.title}
                </text>
                {/* 条目 */}
                {p.items.map((item, ii) => {
                  const y = ITEM_START_Y + ii * (ITEM_H + ITEM_GAP);
                  return (
                    <g key={item}>
                      <rect x={px + 12} y={y} width={PANEL_W - 24} height={ITEM_H} rx="8" fill={p.color} fillOpacity="0.06" stroke={p.color} strokeWidth="1.2" strokeOpacity="0.4" />
                      <text x={px + PANEL_W / 2} y={y + ITEM_H / 2 + 4} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--text-primary)">
                        {item}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={32} y1={408} x2={VIEW_W - 32} y2={408} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={432} textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            UB 是「标准放弃描述」最危险 · const 把错误提前到编译期 · 转换不是让编译器闭嘴
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        基础语法三大陷阱：未定义行为（标准放弃描述）、const 正确性（编译期拦截误修改）、类型转换四件套（按场景选对工具）。
      </figcaption>
    </figure>
  );
}
