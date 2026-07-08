/**
 * <NdbgHeapSnapshotDiagram>：堆快照三快照法与 Shallow/Retained Size 图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function NdbgHeapSnapshotDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="堆快照三快照法与 Shallow Retained Size 图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            堆快照：三快照法 + Shallow/Retained Size
          </text>

          {/* 三快照法时间线 */}
          <text x="60" y="56" fontSize="12" fontWeight="600" fill="var(--accent)">三快照法时间线</text>

          <rect x="40" y="64" width="180" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">快照1（基线）</text>
          <text x="130" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">heapUsed = 100MB</text>

          <line x1="222" y1="89" x2="258" y2="89" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="254,85 262,89 254,93" fill="var(--text-tertiary)" />
          <text x="240" y="82" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">操作</text>

          <rect x="264" y="64" width="180" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="354" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">快照2</text>
          <text x="354" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">heapUsed = 120MB</text>

          <line x1="446" y1="89" x2="482" y2="89" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="478,85 486,89 478,93" fill="var(--text-tertiary)" />
          <text x="464" y="82" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">GC+操作</text>

          <rect x="488" y="64" width="180" height="50" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="578" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">快照3</text>
          <text x="578" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">heapUsed = 140MB</text>

          {/* Comparison 标注 */}
          <rect x="264" y="126" width="404" height="28" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="466" y="144" textAnchor="middle" fontSize="10" fill="var(--danger)">Comparison: 快照3 vs 快照2 → Delta = +20MB（泄漏！）</text>

          {/* Shallow vs Retained Size */}
          <text x="60" y="178" fontSize="12" fontWeight="600" fill="var(--accent)">Shallow Size vs Retained Size</text>

          <rect x="40" y="188" width="320" height="120" rx="8" fill="var(--bg-primary)" fillOpacity="0.3" stroke="var(--border)" strokeWidth="1" />
          <text x="200" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">cache = new Map()</text>
          <rect x="60" y="218" width="100" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="110" y="234" textAnchor="middle" fontSize="9" fill="var(--success)">Shallow: 80B</text>
          <rect x="60" y="248" width="280" height="24" rx="4" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="200" y="264" textAnchor="middle" fontSize="9" fill="var(--danger)">Retained: 8MB（独占引用 hugeArray）</text>
          <text x="60" y="290" fontSize="9" fill="var(--text-tertiary)">删掉 cache → 释放 8MB（含 hugeArray）</text>
          <text x="60" y="302" fontSize="9" fill="var(--text-tertiary)">删掉 hugeArray 引用 → 只释放 8MB-80B</text>

          {/* Comparison 视图数据表 */}
          <rect x="380" y="188" width="320" height="120" rx="8" fill="var(--bg-primary)" fillOpacity="0.3" stroke="var(--border)" strokeWidth="1" />
          <text x="540" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Comparison 视图</text>
          <text x="395" y="224" fontSize="9" fontWeight="600" fill="var(--text-secondary)">Constructor    Delta    Size Delta</text>
          <line x1="395" y1="228" x2="690" y2="228" stroke="var(--border)" strokeWidth="0.5" />
          <text x="395" y="242" fontSize="9" fill="var(--danger)">(Array)      +5000     +15MB</text>
          <text x="395" y="256" fontSize="9" fill="var(--danger)">(Object)     +1000     +2MB</text>
          <text x="395" y="270" fontSize="9" fill="var(--danger)">(Map)        +1        +8MB</text>
          <text x="395" y="284" fontSize="9" fill="var(--text-tertiary)">(String)     +200      +0.1MB</text>
          <text x="395" y="300" fontSize="9" fill="var(--text-tertiary)">按 Size Delta 降序找最大</text>

          {/* Retainers 链 */}
          <text x="60" y="334" fontSize="12" fontWeight="600" fill="var(--accent)">Retainers 面板（追溯引用链）</text>
          <rect x="40" y="344" width="660" height="56" rx="8" fill="var(--bg-primary)" fillOpacity="0.3" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="364" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">hugeArray &rarr; Map entry &rarr; cache (global) &rarr; GC Root (global)</text>
          <text x="60" y="382" fontSize="10" fill="var(--danger)">切断：cache.delete(oldestKey) → hugeArray 不可达 → GC 回收</text>
          <text x="60" y="394" fontSize="9" fill="var(--text-tertiary)">三快照法确认持续性泄漏 | Retained Size 定位关键引用 | Retainers 追溯到 GC Root</text>

          <text x={VIEW_W / 2} y="424" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：Retained Size 最大的对象 = 删掉它能释放最多内存的对象
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        堆快照三快照法——Comparison 视图找增量、Retained Size 定位关键引用、Retainers 追溯 GC Root
      </figcaption>
    </figure>
  );
}
