/**
 * <FlpDictSetsDiagram>：字典与集合的哈希表机制。
 *
 * 展示 key → hash → 取模定位桶 的过程，并说明 set 即「只有键的字典」。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const STEPS = [
  { x: 48, w: 150, title: "key", body: "'name'" },
  { x: 238, w: 180, title: "hash(key)", body: "→ 1234567" },
  { x: 458, w: 214, title: "hash % 桶数", body: "→ 桶 0" },
];

const BUCKETS = [
  { i: 0, kv: "name→Bob", hit: true },
  { i: 1, kv: "", hit: false },
  { i: 2, kv: "", hit: false },
  { i: 3, kv: "age→30", hit: false },
  { i: 4, kv: "", hit: false },
  { i: 5, kv: "city→SH", hit: false },
  { i: 6, kv: "", hit: false },
  { i: 7, kv: "", hit: false },
];

const SLOT_W = 64;
const SLOT_GAP = 10;
const SLOT_X0 = 69;
const SLOT_Y = 220;
const SLOT_H = 72;

export function FlpDictSetsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="字典哈希表机制：键 name 经 hash 函数得到哈希值，再对桶数取模定位到桶0，存入键值对 name→Bob。集合则相当于只有键、值为占位的字典。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            字典与集合：哈希表机制
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            key → hash → 取模定位桶；集合 = 只有键的字典
          </text>

          {/* 三步流水线 */}
          {STEPS.map((s, i) => (
            <g key={s.title}>
              <rect x={s.x} y={92} width={s.w} height={64} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
              <text x={s.x + s.w / 2} y={116} textAnchor="middle" fontSize="12" fontWeight="700" fill={secondary}>
                {s.title}
              </text>
              <text x={s.x + s.w / 2} y={140} textAnchor="middle" fontSize="13" fontWeight="600" fill={i === 2 ? accent : primary}>
                {s.body}
              </text>
              {i < STEPS.length - 1 && (
                <line x1={s.x + s.w + 2} y1={124} x2={STEPS[i + 1].x - 6} y2={124} stroke={accent} strokeWidth="1.6" markerEnd="url(#flp-ds-arrow)" />
              )}
            </g>
          ))}

          {/* 桶数组标签 */}
          <text x={48} y={206} fontSize="12" fontWeight="700" fill={primary}>
            桶数组（slots）
          </text>

          {/* 桶数组 */}
          {BUCKETS.map((b) => {
            const x = SLOT_X0 + b.i * (SLOT_W + SLOT_GAP);
            return (
              <g key={b.i}>
                <rect
                  x={x}
                  y={SLOT_Y}
                  width={SLOT_W}
                  height={SLOT_H}
                  rx="6"
                  fill={b.hit ? accent : elevated}
                  fillOpacity={b.hit ? "0.16" : "1"}
                  stroke={b.hit ? accent : border}
                  strokeWidth={b.hit ? "1.6" : "1"}
                />
                <text x={x + SLOT_W / 2} y={SLOT_Y + 20} textAnchor="middle" fontSize="11" fontWeight="700" fill={b.hit ? accent : secondary}>
                  {`桶 ${b.i}`}
                </text>
                <text x={x + SLOT_W / 2} y={SLOT_Y + 44} textAnchor="middle" fontSize="11" fill={primary}>
                  {b.kv || "—"}
                </text>
                <text x={x + SLOT_W / 2} y={SLOT_Y + 60} textAnchor="middle" fontSize="10" fill={secondary}>
                  {b.kv ? "已占" : "空"}
                </text>
              </g>
            );
          })}

          {/* 指向桶0的高亮线 */}
          <line x1={565} y1={156} x2={SLOT_X0 + SLOT_W / 2} y2={SLOT_Y - 4} stroke={accent} strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#flp-ds-arrow)" />

          <defs>
            <marker id="flp-ds-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={332} x2={VIEW_W - 32} y2={332} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={354} textAnchor="middle" fontSize="11" fill={success}>
            集合 set：同样的哈希表，只存键、值用占位——所以成员查找、去重都是 O(1) 均摊
          </text>
          <text x={VIEW_W / 2} y={374} textAnchor="middle" fontSize="11" fill={secondary}>
            哈希冲突用「开放寻址法」向后探测空位；键必须可哈希（不可变对象）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        字典的哈希定位过程与集合的关系。
      </figcaption>
    </figure>
  );
}
