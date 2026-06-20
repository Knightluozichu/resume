"use client";

import { useState } from "react";

const VIEW_W = 700;
const VIEW_H = 480;

type AllocStrategy = "stack" | "pool" | "buddy";

const STRATEGIES: { id: AllocStrategy; label: string; desc: string }[] = [
  { id: "stack", label: "栈分配器", desc: "后进先出，有标记回滚，零碎片。适合关卡临时数据。" },
  { id: "pool", label: "对象池", desc: "预分配固定大小槽位，无碎片，无 malloc。适合子弹/粒子。" },
  { id: "buddy", label: "Buddy 系统", desc: "按 2 的幂分裂和合并，碎片少，回收灵活。适合通用内存。" },
];

export function MemoryAllocationViz() {
  const [strategy, setStrategy] = useState<AllocStrategy>("stack");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-4">
      <figcaption className="mb-3">
        <p className="text-xs font-medium text-accent">分配器可视化</p>
        <h4 className="text-base font-semibold text-primary">
          游戏引擎的三种内存分配策略
        </h4>
      </figcaption>
      <div className="mb-3 flex flex-wrap gap-2">
        {STRATEGIES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStrategy(s.id)}
            className={`rounded-control border px-3 py-1 text-xs transition-colors duration-[120ms] ${
              strategy === s.id
                ? "border-accent bg-accent-glow text-primary"
                : "border-border text-secondary hover:border-accent"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <p className="mb-3 text-xs leading-5 text-secondary">
        {STRATEGIES.find((s) => s.id === strategy)?.desc}
      </p>
      <div className="overflow-x-auto rounded-card border border-border bg-bg">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="内存分配策略可视化" className="block w-full min-w-[600px]">
          {strategy === "stack" && <StackAllocViz />}
          {strategy === "pool" && <PoolAllocViz />}
          {strategy === "buddy" && <BuddyAllocViz />}
        </svg>
      </div>
    </figure>
  );
}

function StackAllocViz() {
  const totalH = 200;
  const usedH = 120;
  const markerY = 220 - usedH + 80;
  return (
    <g>
      <text x="30" y="28" className="fill-primary text-[13px] font-semibold">栈分配器</text>
      <text x="30" y="48" className="fill-secondary text-[11px]">原理：一块大缓冲区，指针从底往顶推进</text>

      {/* Memory block */}
      <rect x="60" y={220 - totalH} width="200" height={totalH} rx="6" className="fill-elevated stroke-border" strokeWidth="1.5" />
      {/* Used portion */}
      <rect x="60" y={220 - usedH} width="200" height={usedH} rx="6" className="fill-accent-glow stroke-accent" strokeWidth="1.5" opacity="0.8" />
      {/* Marker */}
      <rect x="260" y={markerY - 20} width="12" height="24" rx="2" className="fill-accent" />
      <text x="282" y={markerY - 2} className="fill-accent text-[10px] font-semibold">Marker</text>

      {/* Allocated blocks */}
      {[{ y: 100, label: "关卡数据", h: 35 }, { y: 135, label: "临时数组", h: 40 }, { y: 175, label: "字符串缓冲", h: 30 }].map((b) => (
        <g key={b.label}>
          <rect x="66" y={b.y} width="188" height={b.h} rx="3" className="fill-accent/20 stroke-accent" strokeWidth="1" />
          <text x="160" y={b.y + b.h / 2 + 4} textAnchor="middle" className="fill-primary text-[10px]">{b.label}</text>
        </g>
      ))}

      {/* Free portion */}
      <text x="160" y={210} textAnchor="middle" className="fill-secondary text-[10px]">空闲</text>

      {/* Allocate order arrows */}
      <text x="30" y={90} className="fill-secondary text-[10px]">分配顺序：</text>
      <text x="30" y={108} className="fill-secondary text-[10px]">1. 关卡数据</text>
      <text x="30" y={126} className="fill-secondary text-[10px]">2. 临时数组</text>
      <text x="30" y={144} className="fill-secondary text-[10px]">3. 字符串缓冲</text>

      {/* Release: roll back marker */}
      <text x="30" y={180} className="fill-secondary text-[10px]">释放：Marker 回滚</text>
      <text x="30" y={198} className="fill-secondary text-[10px]">→ 一次性释放上面的全部</text>
      <text x="30" y={216} className="fill-secondary text-[10px]">碎片：零</text>

      {/* Arrow showing rollback */}
      <path d="M 240 160 L 270 160" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#rollback-arrow)" strokeDasharray="3,2" />
      <defs><marker id="rollback-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 6 3 0 6Z" className="fill-accent" /></marker></defs>
    </g>
  );
}

function PoolAllocViz() {
  const SLOT_COUNT = 16;
  const slotW = 38;
  const slotH = 28;
  const slotsPerRow = 8;
  const taken = [0,1,3,4,5,7,8,10,12,13];

  return (
    <g>
      <text x="30" y="28" className="fill-primary text-[13px] font-semibold">对象池</text>
      <text x="30" y="48" className="fill-secondary text-[11px]">原理：预分配 N 个固定大小的槽位，需要时取一个空闲的</text>

      {/* Pre-allocated memory block */}
      <rect x="30" y="70" width={slotW * slotsPerRow + 20} height={(slotH + 6) * 2 + 16} rx="6" className="fill-elevated stroke-border" strokeWidth="1.5" />

      {/* Slots */}
      {Array.from({ length: SLOT_COUNT }).map((_, i) => {
        const col = i % slotsPerRow;
        const row = Math.floor(i / slotsPerRow);
        const x = 40 + col * (slotW + 4);
        const y = 82 + row * (slotH + 6);
        const used = taken.includes(i);
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={slotW}
              height={slotH}
              rx="3"
              className={used ? "fill-accent-glow stroke-accent" : "fill-elevated/50 stroke-border"}
              strokeWidth="1"
            />
            <text x={x + slotW / 2} y={y + slotH / 2 + 4} textAnchor="middle" className={used ? "fill-primary text-[10px]" : "fill-secondary text-[10px]"}>
              {used ? "B" : ""}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <text x={380} y="82" className="fill-secondary text-[10px]">特点：</text>
      <text x={380} y="100" className="fill-secondary text-[10px]">- 无 malloc/free</text>
      <text x={380} y="118" className="fill-secondary text-[10px]">- 零碎片（固定大小）</text>
      <text x={380} y="136" className="fill-secondary text-[10px]">- O(1) 分配和释放</text>
      <text x={380} y="154" className="fill-secondary text-[10px]">- 浪费：未用槽位 = 浪费</text>
      <text x={380} y="178" className="fill-accent text-[10px] font-medium">适合：子弹、粒子、</text>
      <text x={380} y="196" className="fill-accent text-[10px] font-medium">      网络包、临时对象</text>
    </g>
  );
}

function BuddyAllocViz() {
  return (
    <g>
      <text x="30" y="28" className="fill-primary text-[13px] font-semibold">Buddy 系统</text>
      <text x="30" y="48" className="fill-secondary text-[11px]">原理：内存按 2 的幂分裂，相邻空闲块自动合并成"伙伴"</text>

      {/* Total memory: 256 units */}
      <rect x="40" y="72" width="512" height="40" rx="4" className="fill-elevated stroke-border" strokeWidth="1.5" />
      <text x="296" y="96" textAnchor="middle" className="fill-secondary text-[11px]">总内存 256 单位（一整块）</text>

      {/* After split: 128 + 128 */}
      <text x="40" y="140" className="fill-secondary text-[10px]">分配 100 单位 → 分裂 256→128+128 → 取一块 128：</text>
      <rect x="40" y="150" width="256" height="36" rx="4" className="fill-accent-glow stroke-accent" strokeWidth="1.5" opacity="0.8" />
      <text x="168" y="172" textAnchor="middle" className="fill-primary text-[11px]">128 (已分配)</text>
      <rect x="300" y="150" width="252" height="36" rx="4" className="fill-elevated stroke-warning" strokeWidth="1" strokeDasharray="4,3" />
      <text x="426" y="172" textAnchor="middle" className="fill-secondary text-[10px]">128 (空闲 Buddy)</text>

      {/* Further split for 40 units */}
      <text x="40" y="214" className="fill-secondary text-[10px]">再分配 40 单位 → 128 Buddy 分裂成 64+64 → 取一块 64：</text>
      <rect x="300" y="224" width="128" height="36" rx="4" className="fill-warning/20 stroke-warning" strokeWidth="1.5" />
      <text x="364" y="246" textAnchor="middle" className="fill-primary text-[11px]">64 (已分配)</text>
      <rect x="432" y="224" width="120" height="36" rx="4" className="fill-elevated stroke-border" strokeWidth="1" strokeDasharray="4,3" />
      <text x="492" y="246" textAnchor="middle" className="fill-secondary text-[10px]">64 (空闲)</text>

      {/* Release: buddies merge */}
      <text x="40" y="288" className="fill-secondary text-[10px]">释放 64：和旁边空闲 Buddy 自动合并回 128：</text>
      <rect x="300" y="298" width="252" height="36" rx="4" className="fill-elevated stroke-warning" strokeWidth="1" strokeDasharray="4,3" />
      <text x="426" y="320" textAnchor="middle" className="fill-secondary text-[10px]">128 (空闲，Buddy 已自动合并)</text>

      <text x="40" y="360" className="fill-accent text-[11px] font-medium">核心优势：相邻空闲块自动合并，碎片极少。约 25% 内部碎片开销。</text>
    </g>
  );
}
