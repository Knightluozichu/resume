/**
 * <DsaHashTablesDiagram>：散列表冲突处理对比图（dsa-hash-tables 章）。
 *
 * 左侧：分离链接法——每个槽位挂链表，冲突元素追加到链表尾部。
 * 右侧：开放寻址法（线性探测）——冲突时顺序找下一个空槽。
 * 底部：装填因子 λ 与性能曲线对比。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const SLOTS = [
  { idx: 0, items: [] as number[] },
  { idx: 1, items: [11] },
  { idx: 2, items: [22] },
  { idx: 3, items: [33, 43] },
  { idx: 4, items: [] as number[] },
  { idx: 5, items: [55] },
  { idx: 6, items: [16] },
];

const OA_TABLE: { idx: number; val: number | null; probe?: number }[] = [
  { idx: 0, val: null },
  { idx: 1, val: 11 },
  { idx: 2, val: 22 },
  { idx: 3, val: 33 },
  { idx: 4, val: 43, probe: 1 },
  { idx: 5, val: 55 },
  { idx: 6, val: 16 },
];

export function DsaHashTablesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="散列表冲突处理对比。左侧分离链接法：每个槽位挂链表，槽 3 存 33→43 链表。右侧开放寻址法线性探测：43 哈希到槽 3 但冲突，探测到槽 4 存入。底部装填因子 λ：分离链接法 λ=1 时 O(1+λ)，开放寻址法 λ<0.75 才高效，超过需再散列。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`散列表：分离链接 vs 开放寻址`}</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>{`键 43 哈希到槽 3（冲突）——两种方法的处理方式`}</text>

          <line x1="360" y1="74" x2="360" y2="320" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：分离链接法 ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>{`分离链接法（Chaining）`}</text>

          {SLOTS.map((slot, i) => {
            const y = 110 + i * 26;
            return (
              <g key={slot.idx}>
                <rect x="40" y={y} width="56" height="22" rx="4" fill="var(--bg)" stroke={border} strokeWidth="1" />
                <text x="68" y={y + 15} textAnchor="middle" fontSize="11" fill={secondary}>{slot.idx}</text>
                <line x1="96" y1={y + 11} x2="108" y2={y + 11} stroke={border} strokeWidth="1" />
                {slot.items.length === 0 ? (
                  <text x="116" y={y + 15} fontSize="11" fill={secondary}>{`∅`}</text>
                ) : (
                  slot.items.map((v, j) => (
                    <g key={v}>
                      <rect x={108 + j * 44} y={y} width="40" height="22" rx="4" fill={v === 43 ? warning : accent} fillOpacity={v === 43 ? 0.12 : 0.08} stroke={v === 43 ? warning : accent} strokeWidth="1" />
                      <text x={128 + j * 44} y={y + 15} textAnchor="middle" fontSize="11" fill={v === 43 ? warning : accent}>{v}</text>
                      {j < slot.items.length - 1 && <line x1={148 + j * 44} y1={y + 11} x2={152 + j * 44} y2={y + 11} stroke={border} strokeWidth="1" />}
                    </g>
                  ))
                )}
              </g>
            );
          })}

          <text x="180" y="310" textAnchor="middle" fontSize="11" fill={secondary}>{`冲突元素追加到链表尾部`}</text>

          {/* ===== 右侧：开放寻址法 ===== */}
          <text x="540" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>{`开放寻址法（线性探测）`}</text>

          {OA_TABLE.map((cell, i) => {
            const y = 110 + i * 26;
            const isConflict = cell.val === 43;
            const isNormal = cell.val !== null && cell.val !== 43;
            return (
              <g key={cell.idx}>
                <rect x="400" y={y} width="56" height="22" rx="4" fill="var(--bg)" stroke={border} strokeWidth="1" />
                <text x="428" y={y + 15} textAnchor="middle" fontSize="11" fill={secondary}>{cell.idx}</text>
                <line x1="456" y1={y + 11} x2="468" y2={y + 11} stroke={border} strokeWidth="1" />
                <rect x="468" y={y} width="56" height="22" rx="4" fill={isConflict ? warning : isNormal ? success : "var(--bg)"} fillOpacity={isConflict ? 0.12 : isNormal ? 0.08 : 0} stroke={isConflict ? warning : isNormal ? success : border} strokeWidth="1" strokeDasharray={cell.val === null ? "3 3" : "0"} />
                <text x="496" y={y + 15} textAnchor="middle" fontSize="11" fill={isConflict ? warning : isNormal ? success : secondary}>{`{cell.val === null ? "空" : cell.val}`}</text>
                {cell.probe !== undefined && (
                  <text x="536" y={y + 15} fontSize="10" fill={warning}>{`←探测{cell.probe}步`}</text>
                )}
              </g>
            );
          })}

          <text x="540" y="310" textAnchor="middle" fontSize="11" fill={secondary}>{`冲突时顺序找下一个空槽`}</text>

          {/* ===== 底部：装填因子与性能 ===== */}
          <rect x="40" y="338" width={VIEW_W - 80} height="100" rx="10" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="362" textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>{`装填因子 λ = 元素数 / 表长`}</text>

          <text x="70" y="388" fontSize="12" fill={accent} fontWeight="600">{`分离链接：`}</text>
          <text x="150" y="388" fontSize="12" fill={primary}>{`查找 O(1+λ)，λ 可 >1，内存多`}</text>

          <text x="70" y="412" fontSize="12" fill={success} fontWeight="600">{`开放寻址：`}</text>
          <text x="150" y="412" fontSize="12" fill={primary}>{`查找 O(1/(1-λ))，λ &lt; 0.75，缓存友好`}</text>

          <text x="70" y="432" fontSize="11" fill={warning}>{`再散列时机：λ 超过阈值时扩容（通常翻倍），均摊 O(1)`}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分离链接法用链表接住冲突元素，装填因子可超过 1；开放寻址法在表内探测空槽，必须保持 λ &lt; 0.75 才高效。当装填因子过高时需要再散列——分配更大的表并重新哈希所有元素。
      </figcaption>
    </figure>
  );
}
