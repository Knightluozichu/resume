/**
 * <UnorderedMapInternalsDiagram step={n}>：哈希表内部结构 — bucket数组→链表→key-value对。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--xxx)），无阴影。
 *
 * step 支持：
 *   1 — 只展示桶数组（空桶）
 *   2 — 展示桶数组 + 哈希函数（hash→桶）
 *   3 — 展示桶数组 + 链表 + key-value对（完整哈希表结构）
 */

interface Props {
  step?: number;
}

export function UnorderedMapInternalsDiagram({ step = 3 }: Props) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const w = 780;
  const h = 420;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="unordered_map 哈希表内部结构：桶数组 → 链表 → key-value 对"
          className="mx-auto block h-auto w-full max-w-[780px]"
        >
          <text x={w / 2} y="22" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            unordered_map 内部结构：哈希表
          </text>

          {/* === Step 1+：桶数组 === */}
          <g transform="translate(20, 40)">
            <rect x="0" y="0" width="180" height={step >= 2 ? 140 : 310} rx="8" fill={elevated} stroke={border} />
            <text x="90" y="20" fontSize="11" fontWeight="600" fill={accent} textAnchor="middle">
              Bucket Array
            </text>
            <text x="90" y="38" fontSize="10" fill={secondary} textAnchor="middle">
              桶数组 (bucket_count)
            </text>

            {Array.from({ length: 8 }, (_, i) => {
              const y = 48 + i * 32;
              return (
                <g key={i}>
                  <rect x="24" y={y} width="132" height="26" rx="4" fill={bg} stroke={border} />
                  <text x="90" y={y + 18} fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
                    bucket[{i}]
                  </text>
                </g>
              );
            })}
          </g>

          {/* === Step 2+：哈希函数标注 === */}
          {step >= 2 && (
            <g transform="translate(230, 40)">
              {/* 哈希函数框 */}
              <rect x="0" y="40" width="160" height="60" rx="8" fill={accent} opacity="0.06" stroke={accent} strokeWidth="1" />
              <text x="80" y="62" fontSize="11" fontWeight="600" fill={accent} textAnchor="middle">
                哈希函数
              </text>
              <text x="80" y="80" fontSize="10" fill={primary} textAnchor="middle" fontFamily="monospace">
                hash("Alice")
              </text>
              <text x="80" y="94" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
                = 0x3A7F
              </text>

              {/* 函数到桶的箭头 */}
              <line x1="160" y1="60" x2="320" y2="112" stroke={accent} strokeWidth="1.2" markerEnd="url(#arrRight2)" />
              <text x="240" y="100" fontSize="9" fill={accent} textAnchor="middle">
                % bucket_count
              </text>

              {/* 第二个哈希示例 */}
              <rect x="0" y="120" width="160" height="60" rx="8" fill={accent} opacity="0.04" stroke={border} />
              <text x="80" y="142" fontSize="11" fontWeight="600" fill={accent} textAnchor="middle">
                哈希函数
              </text>
              <text x="80" y="160" fontSize="10" fill={primary} textAnchor="middle" fontFamily="monospace">
                hash("Bob")
              </text>
              <text x="80" y="174" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
                = 0x3A7F
              </text>

              <text x="80" y="200" fontSize="10" fill={warn} textAnchor="middle" fontFamily="monospace">
                ← 哈希冲突！
              </text>
              <text x="80" y="216" fontSize="9" fill={secondary} textAnchor="middle">
                不同key→同一桶
              </text>
            </g>
          )}

          {/* === Step 3：链表 + key-value 对 === */}
          {step >= 3 && (
            <g transform="translate(420, 40)">
              <text x="150" y="16" fontSize="11" fontWeight="600" fill={accent} textAnchor="middle">
                桶内拉链法 (Chaining)
              </text>

              {/* 桶2的链表结构 */}
              <g transform="translate(0, 104)">
                <line x1="-20" y1="0" x2="0" y2="0" stroke={accent} strokeWidth="1.5" />

                {/* 节点1：Alice */}
                <rect x="0" y="-16" width="160" height="32" rx="5" fill={accent} opacity="0.12" stroke={accent} />
                <text x="80" y="-2" fontSize="11" fill={accent} textAnchor="middle" fontFamily="monospace">
                  "Alice" → 30
                </text>

                {/* 箭头 */}
                <line x1="160" y1="0" x2="180" y2="0" stroke={accent} strokeWidth="1" markerEnd="url(#arrRight2)" opacity="0.5" />

                {/* 节点2：Bob */}
                <rect x="180" y="-16" width="160" height="32" rx="5" fill={accent} opacity="0.08" stroke={border} />
                <text x="260" y="-2" fontSize="11" fill={secondary} textAnchor="middle" fontFamily="monospace">
                  "Bob" → 25
                </text>

                {/* nullptr */}
                <line x1="340" y1="-6" x2="360" y2="-6" stroke={secondary} strokeWidth="1" opacity="0.4" />
                <text x="370" y="-2" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
                  nullptr
                </text>
              </g>

              {/* 注解 */}
              <g transform="translate(0, 170)">
                <text x="130" y="0" fontSize="10" fill={secondary} textAnchor="middle">
                  同桶内容冲突：用链表串在一起
                </text>
                <text x="130" y="18" fontSize="10" fill={secondary} textAnchor="middle">
                  查找 = 计算桶号 + 遍历链表逐个比key
                </text>
              </g>
            </g>
          )}

          {/* === 底部注解 === */}
          <g transform={`translate(20, ${step >= 2 ? (step >= 3 ? 330 : 360) : 370})`}>
            {/* 操作复杂度 */}
            <text x="0" y="0" fontSize="12" fontWeight="600" fill={primary}>
              关键操作与复杂度
            </text>
            {[
              ["插入 insert", "均摊 O(1)"],
              ["查找 find", "均摊 O(1)"],
              ["删除 erase", "均摊 O(1)"],
              ["rehash", "O(n)"],
            ].map(([label, val], i) => (
              <g key={i} transform={`translate(0, ${16 + i * 18})`}>
                <text x="0" y="0" fontSize="10" fill={secondary}>
                  {label}
                </text>
                <text x="200" y="0" fontSize="10" fill={good} fontFamily="monospace">
                  {val}
                </text>
              </g>
            ))}

            {/* 负载因子 */}
            <g transform="translate(300, 0)">
              <text x="0" y="0" fontSize="12" fontWeight="600" fill={primary}>
                负载因子 (load_factor)
              </text>
              {[
                ["定义", "size / bucket_count"],
                ["超阈值", "触发 rehash（重新分配桶+重新散列）"],
                ["默认", "max_load_factor() ≈ 1.0"],
                ["策略", "rehash(n) 手动设桶数"],
              ].map(([label, val], i) => (
                <g key={i} transform={`translate(0, ${16 + i * 18})`}>
                  <text x="0" y="0" fontSize="10" fill={secondary} fontFamily="monospace">
                    {label}：
                  </text>
                  <text x="50" y="0" fontSize="10" fill={val.startsWith("超") ? warn : secondary}>
                    {val}
                  </text>
                </g>
              ))}
            </g>
          </g>

          <defs>
            <marker id="arrRight2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,1 L6,3.5 L0,6" fill={accent} opacity="0.7" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1
          ? "哈希表的基础：bucket 数组。每个桶是一个槽位，等待放入 key-value 对。"
          : step === 2
            ? "哈希函数将 key 映射到桶号——不同 key 可能落入同一桶（哈希冲突），这是哈希表设计的核心挑战。"
            : "完整哈希表结构：bucket 数组 + 每个桶内的链表（拉链法解决冲突）+ key-value 节点。查找时先算桶号，再遍历链表逐个对比 key。"}
      </figcaption>
    </figure>
  );
}
