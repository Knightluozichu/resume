/**
 * <OpcDynAllocDiagram>：动态分配优化（optimized-cpp 动态分配章）。
 *
 * 三列对比：栈分配（绿，最快）/ 堆分配（红，慢）/ 对象池/arena（橙，批量快）。
 * 每列一张卡片，含速度评级、分配成本、适用场景。
 * 底部一条总结栏：减少 malloc/free 调用次数。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 440;

type Alloc = {
  id: string;
  name: string;
  color: string;
  speed: string;
  cost: string;
  scene: string;
  detail: string;
};

const ALLOCS: readonly Alloc[] = [
  {
    id: "stack",
    name: "栈分配",
    color: "var(--success)",
    speed: "最快",
    cost: "移动栈指针（1 条指令）",
    scene: "固定大小、生命周期在作用域内",
    detail: "无 malloc/free 开销\n无内存碎片",
  },
  {
    id: "heap",
    name: "堆分配 (malloc/new)",
    color: "var(--danger)",
    speed: "最慢",
    cost: "搜索空闲块 + 修改页表",
    scene: "动态大小、跨作用域生命周期",
    detail: "每次调用数百纳秒\n产生外部碎片",
  },
  {
    id: "pool",
    name: "对象池 / Arena",
    color: "var(--warning)",
    speed: "批量快",
    cost: "预分配大块，逐个切分",
    scene: "频繁创建销毁同类型对象",
    detail: "一次分配多次复用\n减少 malloc 调用",
  },
];

export function OpcDynAllocDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="动态分配优化对比图。三列：栈分配（绿色，最快，移动栈指针一条指令，适合固定大小作用域内对象）、堆分配（红色，最慢，搜索空闲块修改页表，适合动态大小跨作用域对象）、对象池/Arena（橙色，批量快，预分配大块逐个切分，适合频繁创建销毁同类型对象）。底部总结：减少 malloc/free 调用次数。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            动态分配优化 · 三种分配策略对比
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            malloc/free 是最昂贵的操作之一——能用栈就不用堆，必须用堆就批量分配
          </text>

          {/* ===== 三列卡片 ===== */}
          {ALLOCS.map((a, i) => {
            const x = 44 + i * 220;
            const w = 200;
            return (
              <g key={a.id}>
                {/* 卡片背板 */}
                <rect x={x} y="80" width={w} height="250" rx="10" fill="var(--bg)" stroke={a.color} strokeWidth="1.2" strokeOpacity="0.5" />
                {/* 标题 pill */}
                <rect x={x + 12} y="92" width={w - 24} height="30" rx="8" fill={a.color} fillOpacity="0.12" stroke={a.color} strokeWidth="1.2" />
                <text x={x + w / 2} y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill={a.color}>{a.name}</text>
                {/* 速度评级 */}
                <text x={x + w / 2} y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">速度</text>
                <text x={x + w / 2} y="164" textAnchor="middle" fontSize="16" fontWeight="700" fill={a.color}>{a.speed}</text>
                <line x1={x + 16} y1="178" x2={x + w - 16} y2="178" stroke="var(--border)" strokeWidth="1" />
                {/* 分配成本 */}
                <text x={x + w / 2} y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">分配成本</text>
                <text x={x + w / 2} y="214" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{a.cost}</text>
                <line x1={x + 16} y1="226" x2={x + w - 16} y2="226" stroke="var(--border)" strokeWidth="1" />
                {/* 适用场景 */}
                <text x={x + w / 2} y="244" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">适用场景</text>
                <text x={x + w / 2} y="262" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{a.scene}</text>
                <line x1={x + 16} y1="274" x2={x + w - 16} y2="274" stroke="var(--border)" strokeWidth="1" />
                {/* 细节 */}
                {a.detail.split("\n").map((line, li) => (
                  <text key={li} x={x + w / 2} y={294 + li * 18} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{line}</text>
                ))}
              </g>
            );
          })}

          {/* ===== 底部总结 ===== */}
          <rect x="60" y="360" width={VIEW_W - 120} height="56" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="384" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            核心策略：减少 malloc/free 调用次数
          </text>
          <text x={VIEW_W / 2} y="404" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            栈优先 → 必须堆则预分配批量复用（对象池/arena）→ 避免热路径中的逐次分配
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        动态分配的开销远超栈分配：malloc 要搜索空闲块、可能触发系统调用。优化策略是「能用栈就不用堆，必须用堆就批量分配」——对象池和 arena 把多次 malloc 合并为一次。
      </figcaption>
    </figure>
  );
}
