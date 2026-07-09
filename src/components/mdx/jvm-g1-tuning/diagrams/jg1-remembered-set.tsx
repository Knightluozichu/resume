/**
 * <Jg1RememberedSetDiagram>：RSet与卡表——反向引用索引与Write Barrier图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function Jg1RememberedSetDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="RSet与卡表——反向引用索引与Write Barrier图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            RSet 与卡表——反向引用索引机制
          </text>

          {/* Region A (被引用) */}
          <rect x="40" y="56" width="280" height="180" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="180" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Region A（被回收）</text>

          {/* 卡表网格 */}
          {Array.from({ length: 6 }, (_, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const x = 60 + col * 84;
            const y = 90 + row * 50;
            const dirty = i === 1 || i === 4;
            return (
              <g key={i}>
                <rect x={x} y={y} width="76" height="42" rx="3" fill={dirty ? "var(--danger)" : "var(--bg-elevated)"} fillOpacity={dirty ? 0.15 : 1} stroke={dirty ? "var(--danger)" : "var(--text-tertiary)"} strokeWidth="1" />
                <text x={x + 38} y={y + 18} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Card {i}</text>
                <text x={x + 38} y={y + 32} textAnchor="middle" fontSize="8" fill={dirty ? "var(--danger)" : "var(--text-tertiary)"}>{dirty ? "dirty" : "clean"}</text>
              </g>
            );
          })}

          {/* RSet(A) */}
          <rect x="60" y="200" width="240" height="28" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="180" y="218" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">RSet(A): {`{B:Card1, C:Card4}`}</text>

          {/* Region B (引用方) */}
          <rect x="380" y="56" width="150" height="100" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.5" />
          <text x="455" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Region B</text>
          <rect x="400" y="92" width="110" height="24" rx="3" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="455" y="108" textAnchor="middle" fontSize="9" fill="var(--danger)">Card1: obj→A</text>
          <text x="455" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">引用 Region A 的对象</text>

          {/* Region C (引用方) */}
          <rect x="560" y="56" width="150" height="100" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.5" />
          <text x="635" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Region C</text>
          <rect x="580" y="92" width="110" height="24" rx="3" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="635" y="108" textAnchor="middle" fontSize="9" fill="var(--danger)">Card4: obj→A</text>
          <text x="635" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">引用 Region A 的对象</text>

          {/* 反向箭头 */}
          <defs>
            <marker id="arrRs" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--warning)" />
            </marker>
          </defs>
          <line x1="400" y1="115" x2="260" y2="115" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrRs)" />
          <line x1="580" y1="115" x2="260" y2="115" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrRs)" />
          <text x="330" y="108" textAnchor="middle" fontSize="9" fill="var(--warning)">RSet记录</text>

          {/* Write Barrier流程 */}
          <text x="40" y="262" fontSize="13" fontWeight="600" fill="var(--accent)">Write Barrier 与 RSet 维护流程</text>

          <rect x="40" y="278" width="140" height="44" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="110" y="298" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">写引用操作</text>
          <text x="110" y="314" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">obj.field = target</text>

          <rect x="220" y="278" width="140" height="44" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="290" y="298" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Write Barrier</text>
          <text x="290" y="314" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">判断跨Region引用</text>

          <rect x="400" y="278" width="140" height="44" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="470" y="298" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">DCQ 队列</text>
          <text x="470" y="314" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Dirty Card Queue</text>

          <rect x="580" y="278" width="140" height="44" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="650" y="298" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Refine 线程</text>
          <text x="650" y="314" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">异步更新 RSet</text>

          <defs>
            <marker id="arrWb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-tertiary)" />
            </marker>
          </defs>
          <line x1="180" y1="300" x2="218" y2="300" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrWb)" />
          <line x1="360" y1="300" x2="398" y2="300" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrWb)" />
          <line x1="540" y1="300" x2="578" y2="300" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrWb)" />

          {/* PRT三级退化 */}
          <text x="40" y="358" fontSize="13" fontWeight="600" fill="var(--accent)">PRT 三级退化（精度↓ 开销↓）</text>

          <rect x="40" y="374" width="210" height="56" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="145" y="394" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Sparse PRT</text>
          <text x="145" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">精确定位每个 Card</text>
          <text x="145" y="424" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">元数据大 / 扫描精确</text>

          <rect x="270" y="374" width="210" height="56" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="375" y="394" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Fine PRT</text>
          <text x="375" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Card 位图按 Region 分组</text>
          <text x="375" y="424" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">中等精度 / 中等开销</text>

          <rect x="500" y="374" width="210" height="56" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="605" y="394" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">Coarse PRT</text>
          <text x="605" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">仅记 Region 级位图</text>
          <text x="605" y="424" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">元数据小 / 扫描放大</text>

          <line x1="250" y1="402" x2="268" y2="402" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrWb)" />
          <line x1="480" y1="402" x2="498" y2="402" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrWb)" />

          {/* 卡表粒度说明 */}
          <rect x="40" y="448" width="670" height="50" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="55" y="470" fontSize="12" fontWeight="600" fill="var(--text-primary)">卡表粒度：512 字节 / Card</text>
          <text x="55" y="488" fontSize="11" fill="var(--text-secondary)">堆按 512B 划分为 Card → 跨 Region 写触发 dirty 标记 → RSet 按 Card 精确记录引用位置 → 回收时只扫 dirty Card</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        G1 RSet与卡表——反向引用索引、Write Barrier/DCQ/Refine维护流程、PRT三级退化机制
      </figcaption>
    </figure>
  );
}
