/**
 * <DsaListsDiagram>：vector vs list 对比图解（dsa-lists 章）。
 *
 * 左侧：vector 连续内存 + 倍增扩容示意 + 复杂度表。
 * 右侧：list 双向链表 + 复杂度表 + 迭代器失效规则。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function DsaListsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="vector vs list 对比图解。左侧 vector：连续内存方块存数据，倍增扩容策略使 push_back 均摊 O(1)，随机访问 O(1)，中间插入 O(n)。右侧 list：双向链表节点用指针串联，已知位置插入删除 O(1)，随机访问 O(n)。底部列出选择建议。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>vector vs list：实现与复杂度对比</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>连续内存+倍增扩容　vs　分散内存+指针串联</text>

          <line x1="340" y1="74" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== vector ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>vector（动态数组）</text>

          {/* 连续内存方块 */}
          {[10, 20, 30, 40, 50].map((v, i) => (
            <g key={i}>
              <rect x={56 + i * 44} y="104" width="40" height="36" rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" />
              <text x={56 + i * 44 + 20} y="127" textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>{v}</text>
              <text x={56 + i * 44 + 20} y="156" textAnchor="middle" fontSize="11" fill={secondary}>[{i}]</text>
            </g>
          ))}
          {/* 扩容区域 */}
          <rect x="276" y="104" width="40" height="36" rx="4" fill="none" stroke={border} strokeWidth="1" strokeDasharray="3 3" />
          <text x="296" y="127" textAnchor="middle" fontSize="11" fill={secondary}>空闲</text>
          <text x="180" y="176" textAnchor="middle" fontSize="11" fill={success}>连续内存 · capacity=6 · size=5</text>

          {/* 复杂度表 */}
          {[
            { op: "operator[]", c: "O(1)", color: success },
            { op: "push_back", c: "O(1)均摊", color: success },
            { op: "insert(pos)", c: "O(n)", color: danger },
            { op: "erase(pos)", c: "O(n)", color: danger },
          ].map((r, i) => (
            <g key={r.op}>
              <text x="56" y={200 + i * 18} fontSize="11" fill={primary}>{r.op}</text>
              <text x="200" y={200 + i * 18} fontSize="11" fontWeight="600" fill={r.color}>{r.c}</text>
            </g>
          ))}

          {/* 迭代器失效 */}
          <rect x="48" y="288" width="272" height="48" rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="308" fontSize="11" fontWeight="700" fill={danger}>迭代器失效</text>
          <text x="64" y="326" fontSize="11" fill={primary}>扩容/插入/删除 → 相关迭代器全失效</text>

          {/* ===== list ===== */}
          <text x="530" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>list（双向链表）</text>

          {/* 链表节点 */}
          {[10, 20, 30, 40, 50].map((v, i) => {
            const x = 364 + i * 60;
            return (
              <g key={i}>
                <rect x={x} y="104" width="48" height="36" rx="4" fill="var(--bg)" stroke={success} strokeWidth="1.2" />
                <line x1={x + 30} y1="104" x2={x + 30} y2="140" stroke={border} strokeWidth="1" />
                <text x={x + 15} y="127" textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>{v}</text>
                <circle cx={x + 39} cy="122" r="2.5" fill={success} />
                {i < 4 && <line x1={x + 42} y1="122" x2={x + 56} y2="122" stroke={success} strokeWidth="1.4" />}
              </g>
            );
          })}
          <text x="530" y="176" textAnchor="middle" fontSize="11" fill={success}>分散内存 · prev/next 指针串联</text>

          {/* 复杂度表 */}
          {[
            { op: "at(i) / []", c: "O(n)", color: danger },
            { op: "push_back", c: "O(1)", color: success },
            { op: "insert(iter)", c: "O(1)", color: success },
            { op: "erase(iter)", c: "O(1)", color: success },
          ].map((r, i) => (
            <g key={r.op}>
              <text x="360" y={200 + i * 18} fontSize="11" fill={primary}>{r.op}</text>
              <text x="500" y={200 + i * 18} fontSize="11" fontWeight="600" fill={r.color}>{r.c}</text>
            </g>
          ))}

          {/* 迭代器失效 */}
          <rect x="360" y="288" width="312" height="48" rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="308" fontSize="11" fontWeight="700" fill={success}>迭代器稳定性</text>
          <text x="376" y="326" fontSize="11" fill={primary}>仅被删节点失效，其他迭代器不受影响</text>

          {/* 底部总结 */}
          <rect x="48" y="356" width="624" height="36" rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="379" textAnchor="middle" fontSize="11" fill={secondary}>
            随机访问/尾部增删→vector　已知位置频繁增删→list　多数场景优先vector（缓存友好）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        vector 连续内存带来 O(1) 随机访问和缓存友好性，倍增扩容使 push_back 均摊 O(1)。list 分散内存带来 O(1) 已知位置增删，但随机访问 O(n)。选择取决于操作模式。
      </figcaption>
    </figure>
  );
}
