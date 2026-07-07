/**
 * <McdSmallObjectDiagram>：Loki 小对象分配器层级。
 *
 * 左侧纵向五层：SmallObjectBase → SmallObjAllocator → FixedAllocator →
 * Chunk → Free Blocks，右侧标注每层职责。一次 malloc 切多块，按大小分桶。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

interface Layer {
  name: string;
  duty: string;
  color: string;
}

const LAYERS: readonly Layer[] = [
  { name: "SmallObjectBase", duty: "继承即获得小对象分配", color: "var(--accent)" },
  { name: "SmallObjAllocator", duty: "按对象大小分桶路由", color: "var(--success)" },
  { name: "FixedAllocator", duty: "固定大小块分配器", color: "var(--warning)" },
  { name: "Chunk", duty: "一次 malloc 切成 N 个等大 block", color: "var(--accent)" },
  { name: "Free Blocks", duty: "空闲链表，O(1) 分配与回收", color: "var(--success)" },
];

const BOX_X = 40;
const BOX_W = 320;
const BOX_H = 46;
const BOX_GAP = 14;
const BOX_START_Y = 84;
const layerY = (i: number) => BOX_START_Y + i * (BOX_H + BOX_GAP);

const DUTY_X = 392;

export function McdSmallObjectDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="小对象分配器层级。左侧纵向五层：SmallObjectBase 继承即获得小对象分配；SmallObjAllocator 按对象大小分桶路由；FixedAllocator 固定大小块分配器；Chunk 一次 malloc 切成 N 个等大 block；Free Blocks 空闲链表 O(1) 分配与回收。右侧标注每层职责，层间用箭头连接。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="mcd-so-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Loki 小对象分配器
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            按大小分桶 · 一次切多块 · 空闲链表 O(1)——削减 malloc 开销
          </text>

          {/* 层框 + 职责 + 箭头 */}
          {LAYERS.map((l, i) => {
            const y = layerY(i);
            return (
              <g key={l.name}>
                <rect x={BOX_X} y={y} width={BOX_W} height={BOX_H} rx="8" fill={l.color} fillOpacity="0.10" stroke={l.color} strokeWidth="1.6" />
                <text x={BOX_X + BOX_W / 2} y={y + BOX_H / 2 + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill={l.color} fontFamily="monospace">
                  {l.name}
                </text>
                {/* 职责说明 */}
                <line x1={BOX_X + BOX_W} y1={y + BOX_H / 2} x2={DUTY_X - 6} y2={y + BOX_H / 2} stroke="var(--text-secondary)" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="3 3" />
                <text x={DUTY_X} y={y + BOX_H / 2 + 4.5} textAnchor="start" fontSize="12" fontWeight="600" fill="var(--text-primary)">
                  {l.duty}
                </text>
                {/* 层间向下箭头 */}
                {i < LAYERS.length - 1 && (
                  <line x1={BOX_X + BOX_W / 2} y1={y + BOX_H} x2={BOX_X + BOX_W / 2} y2={layerY(i + 1)} stroke="var(--text-secondary)" strokeWidth="1.6" markerEnd="url(#mcd-so-arrow)" />
                )}
              </g>
            );
          })}

          {/* 底部说明 */}
          <line x1={32} y1={448} x2={VIEW_W - 32} y2={448} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={470} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            小对象频繁 new/delete 时，分桶 + 空闲链表把单次分配压到 O(1)
          </text>
          <text x={VIEW_W / 2} y={488} textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)" fontFamily="monospace">
            适用：节点、迭代器、小策略对象等高频小对象
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        小对象分配器按大小分桶，每桶一次 malloc 切成等大 block，空闲链表实现 O(1) 分配回收。
      </figcaption>
    </figure>
  );
}
