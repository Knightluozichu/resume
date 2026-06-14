/**
 * <AssociativeContainerOverviewDiagram>：关联容器全览 — 有序容器（红黑树）vs 无序容器（哈希表）并排对比。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--xxx)），无阴影。
 */

export function AssociativeContainerOverviewDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const w = 960;
  const h = 560;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="关联容器全览：有序容器（红黑树，set/map/multiset/multimap）与无序容器（哈希表，unordered_set/map/multiset/multimap）的内部结构并排对比"
          className="mx-auto block h-auto w-full max-w-[960px]"
        >
          {/* 标题 */}
          <text x={w / 2} y="22" fontSize="15" fontWeight="700" fill={primary} textAnchor="middle">
            关联容器：有序（红黑树）vs 无序（哈希表）
          </text>

          {/* ====== 左边：有序容器 (红黑树) ====== */}
          <g transform="translate(10, 42)">
            <rect x="0" y="0" width="462" height="480" rx="10" fill={bg} stroke={border} />
            <text x="231" y="22" fontSize="13" fontWeight="700" fill={accent} textAnchor="middle">
              有序关联容器（红黑树）
            </text>

            {/* 红黑树结构 */}
            <g transform="translate(20, 40)">
              {/* 树形结构：层级展示 */}
              {/* 第1层：根 */}
              <circle cx="211" cy="20" r="22" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" />
              <text x="211" y="26" fontSize="12" fill={accent} textAnchor="middle" fontFamily="monospace">
                key₃
              </text>

              {/* 第2层：左子、右子 */}
              <circle cx="100" cy="100" r="18" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1" />
              <text x="100" y="105" fontSize="11" fill={accent} textAnchor="middle" fontFamily="monospace">
                key₁
              </text>
              <text x="135" y="104" fontSize="10" fill={secondary} textAnchor="middle">
                &lt;
              </text>

              <circle cx="322" cy="100" r="18" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1" />
              <text x="322" y="105" fontSize="11" fill={accent} textAnchor="middle" fontFamily="monospace">
                key₅
              </text>
              <text x="290" y="104" fontSize="10" fill={secondary} textAnchor="middle">
                &gt;
              </text>

              {/* 第3层 */}
              <circle cx="50" cy="175" r="15" fill={accent} opacity="0.08" stroke={accent} strokeWidth="1" />
              <text x="50" y="179" fontSize="10" fill={accent} textAnchor="middle" fontFamily="monospace">
                key₀
              </text>
              <text x="76" y="178" fontSize="9" fill={secondary} textAnchor="middle">
                &lt;
              </text>

              <circle cx="150" cy="175" r="15" fill={accent} opacity="0.08" stroke={accent} strokeWidth="1" />
              <text x="150" y="179" fontSize="10" fill={accent} textAnchor="middle" fontFamily="monospace">
                key₂
              </text>
              <text x="125" y="178" fontSize="9" fill={secondary} textAnchor="middle">
                &gt;
              </text>

              <circle cx="272" cy="175" r="15" fill={accent} opacity="0.08" stroke={accent} strokeWidth="1" />
              <text x="272" y="179" fontSize="10" fill={accent} textAnchor="middle" fontFamily="monospace">
                key₄
              </text>
              <text x="246" y="178" fontSize="9" fill={secondary} textAnchor="middle">
                &lt;
              </text>

              <circle cx="372" cy="175" r="15" fill={accent} opacity="0.08" stroke={accent} strokeWidth="1" />
              <text x="372" y="179" fontSize="10" fill={accent} textAnchor="middle" fontFamily="monospace">
                key₆
              </text>
              <text x="346" y="178" fontSize="9" fill={secondary} textAnchor="middle">
                &gt;
              </text>

              {/* 连线 */}
              <line x1="200" y1="40" x2="112" y2="84" stroke={accent} strokeWidth="1" opacity="0.4" />
              <line x1="224" y1="40" x2="312" y2="84" stroke={accent} strokeWidth="1" opacity="0.4" />
              <line x1="92" y1="116" x2="60" y2="162" stroke={accent} strokeWidth="1" opacity="0.3" />
              <line x1="108" y1="116" x2="140" y2="162" stroke={accent} strokeWidth="1" opacity="0.3" />
              <line x1="314" y1="116" x2="282" y2="162" stroke={accent} strokeWidth="1" opacity="0.3" />
              <line x1="330" y1="116" x2="362" y2="162" stroke={accent} strokeWidth="1" opacity="0.3" />

              {/* 颜色标记：红/黑 */}
              <circle cx="160" cy="66" r="4" fill="rgb(229,103,92)" />
              <text x="170" y="69" fontSize="9" fill={secondary}>
                红节点
              </text>
              <circle cx="260" cy="66" r="4" fill={primary} />
              <text x="270" y="69" fontSize="9" fill={secondary}>
                黑节点
              </text>
            </g>

            {/* 四种容器名称 + key/value说明 */}
            <g transform="translate(20, 255)">
              <rect x="0" y="0" width="210" height="90" rx="6" fill={elevated} stroke={border} />
              <text x="105" y="18" fontSize="11" fontWeight="600" fill={primary} textAnchor="middle">
                map / set
              </text>
              <text x="105" y="38" fontSize="10" fill={secondary} textAnchor="middle">
                map: key→value键值对
              </text>
              <text x="105" y="54" fontSize="10" fill={secondary} textAnchor="middle">
                set: 只存key（去重判存在）
              </text>
              <text x="105" y="74" fontSize="10" fill={good} textAnchor="middle">
                按key有序排列、不可重复key
              </text>

              <rect x="222" y="0" width="210" height="90" rx="6" fill={elevated} stroke={border} />
              <text x="327" y="18" fontSize="11" fontWeight="600" fill={primary} textAnchor="middle">
                multimap / multiset
              </text>
              <text x="327" y="38" fontSize="10" fill={secondary} textAnchor="middle">
                multimap: 允许重复key
              </text>
              <text x="327" y="54" fontSize="10" fill={secondary} textAnchor="middle">
                multiset: 允许重复key
              </text>
              <text x="327" y="74" fontSize="10" fill={warn} textAnchor="middle">
                仍按key有序，但允许多个同key
              </text>
            </g>

            {/* 性能特征 */}
            <g transform="translate(20, 360)">
              <text x="0" y="15" fontSize="12" fontWeight="600" fill={primary}>
                时间复杂度
              </text>
              {[
                ["插入 insert", "O(log n)"],
                ["删除 erase", "O(log n)"],
                ["查找 find", "O(log n)"],
                ["遍历（中序）", "O(n) 按键序"],
                ["内存结构", "每个节点含left/right/parent+color指针"],
              ].map(([label, val], i) => (
                <g key={i} transform={`translate(0, ${30 + i * 20})`}>
                  <text x="0" y="0" fontSize="10" fill={secondary}>
                    {label}
                  </text>
                  <text x="430" y="0" fontSize="10" fill={good} textAnchor="end" fontFamily="monospace">
                    {val}
                  </text>
                </g>
              ))}
            </g>
          </g>

          {/* ====== 右边：无序容器 (哈希表) ====== */}
          <g transform="translate(486, 42)">
            <rect x="0" y="0" width="462" height="480" rx="10" fill={bg} stroke={border} />
            <text x="231" y="22" fontSize="13" fontWeight="700" fill={accent} textAnchor="middle">
              无序关联容器（哈希表）
            </text>

            {/* 哈希表结构 */}
            <g transform="translate(20, 40)">
              {/* 桶数组 */}
              <rect x="6" y="0" width="110" height="180" rx="6" fill={elevated} stroke={border} />
              <text x="61" y="18" fontSize="10" fontWeight="600" fill={accent} textAnchor="middle">
                桶数组 (buckets)
              </text>

              {[
                ["桶0", "→"],
                ["桶1", "→"],
                ["桶2", "→", true],
                ["桶3", "→"],
                ["桶4", "→"],
                ["桶5", "→"],
                ["桶6", "→"],
                ["桶7", "→"],
              ].map(([label, arrow, active], i) => (
                <g key={i} transform={`translate(14, ${26 + i * 18})`}>
                  <rect x="0" y="-8" width="44" height="18" rx="3" fill={active ? accent : "none"} opacity={active ? 0.12 : 1} stroke={active ? accent : border} />
                  <text x="22" y="5" fontSize="9" fill={active ? accent : secondary} textAnchor="middle">
                    {label}
                  </text>
                  <text x="50" y="5" fontSize="9" fill={secondary} textAnchor="middle">
                    {arrow}
                  </text>
                </g>
              ))}
            </g>

            {/* 链表节点 */}
            <g transform="translate(145, 64)">
              {/* 桶2的链表 */}
              {/* 指向桶2 [0,y=54] */}
              <line x1="-5" y1="0" x2="5" y2="0" stroke={accent} strokeWidth="1" />

              {([
                ["key₂", { accent: true, x: 8, w: 100 }],
                ["key₁₀", { x: 116, w: 100 }],
                ["key₁₈", { x: 224, w: 100 }],
              ] as Array<[string, { accent?: boolean; x: number; w: number }]>).map(([label, cfg], i) => (
                <g key={i} transform={`translate(${cfg.x}, 0)`}>
                  <rect
                    x="0"
                    y="-12"
                    width={cfg.w}
                    height="24"
                    rx="4"
                    fill={cfg.accent ? accent : "none"}
                    opacity={cfg.accent ? 0.2 : 0.08}
                    stroke={cfg.accent ? accent : border}
                  />
                  <text x={cfg.w / 2} y="5" fontSize="10" fill={cfg.accent ? accent : secondary} textAnchor="middle" fontFamily="monospace">
                    {label}
                  </text>
                </g>
              ))}

              {/* 箭头连接节点 */}
              {[0, 1].map((i) => (
                <line key={i} x1={108 + i * 108} y1="0" x2={116 + i * 108} y2="0" stroke={accent} strokeWidth="1" markerEnd="url(#arrRight)" opacity="0.6" />
              ))}
            </g>

            {/* 哈希函数标注 */}
            <g transform="translate(20, 228)">
              <text x="0" y="0" fontSize="10" fill={secondary}>
                hash(key) % bucket_count → 桶索引
              </text>
              <text x="0" y="16" fontSize="10" fill={secondary}>
                同桶内拉链法(chaining)解决冲突
              </text>
            </g>

            {/* 四种容器 + 负载因子 */}
            <g transform="translate(20, 255)">
              <rect x="0" y="0" width="210" height="90" rx="6" fill={elevated} stroke={border} />
              <text x="105" y="18" fontSize="11" fontWeight="600" fill={primary} textAnchor="middle">
                unordered_map / unordered_set
              </text>
              <text x="105" y="38" fontSize="10" fill={secondary} textAnchor="middle">
                unordered_map: key→value
              </text>
              <text x="105" y="54" fontSize="10" fill={secondary} textAnchor="middle">
                unordered_set: 只存key
              </text>
              <text x="105" y="74" fontSize="10" fill={good} textAnchor="middle">
                无序、不可重复key、均摊O(1)
              </text>

              <rect x="222" y="0" width="210" height="90" rx="6" fill={elevated} stroke={border} />
              <text x="327" y="18" fontSize="11" fontWeight="600" fill={primary} textAnchor="middle">
                unordered_multimap / set
              </text>
              <text x="327" y="38" fontSize="10" fill={secondary} textAnchor="middle">
                unordered_multimap: 重复key
              </text>
              <text x="327" y="54" fontSize="10" fill={secondary} textAnchor="middle">
                unordered_multiset: 重复key
              </text>
              <text x="327" y="74" fontSize="10" fill={warn} textAnchor="middle">
                无序、允许重复key、均摊O(1)
              </text>
            </g>

            {/* 性能特征 */}
            <g transform="translate(20, 360)">
              <text x="0" y="15" fontSize="12" fontWeight="600" fill={primary}>
                时间复杂度
              </text>
              {[
                ["插入 insert", "均摊 O(1)"],
                ["删除 erase", "均摊 O(1)"],
                ["查找 find", "均摊 O(1)"],
                ["遍历", "O(n) 无序"],
                ["内存", "桶数组 + 链表/节点"],
              ].map(([label, val], i) => (
                <g key={i} transform={`translate(0, ${30 + i * 20})`}>
                  <text x="0" y="0" fontSize="10" fill={secondary}>
                    {label}
                  </text>
                  <text x="430" y="0" fontSize="10" fill={good} textAnchor="end" fontFamily="monospace">
                    {val}
                  </text>
                </g>
              ))}
            </g>
          </g>

          {/* 底部注释 */}
          <text x={w / 2} y={h - 10} fontSize="10" fill={secondary} textAnchor="middle">
            有序容器底层为红黑树（自平衡二叉搜索树）→ O(log n)；无序容器底层为哈希表（桶+链）→ 均摊 O(1)，但最坏 O(n)
          </text>

          <defs>
            <marker id="arrRight" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,1 L6,3.5 L0,6" fill={accent} opacity="0.6" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        八大关联容器分为两大阵营：有序容器（set/map/multiset/multimap）底层用红黑树，元素按键排序；无序容器（unordered_set/map/multiset/multimap）底层用哈希表，均摊 O(1) 但元素无序。
      </figcaption>
    </figure>
  );
}
