/**
 * <CseBufferDesignDiagram>：缓冲区设计三种方案对比图。
 *
 * 对比三种常见缓冲区设计：
 *   A. 固定大小环形缓冲区（Ring Buffer）
 *   B. 自动扩容的 vector 缓冲区
 *   C. 链表式分块缓冲区
 * 每种方案画出内存布局与读写指针位置，标注优缺点。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function CseBufferDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="三种缓冲区设计对比：环形缓冲区（固定大小，读写指针循环）、vector 缓冲区（自动扩容，可能拷贝）、链表分块缓冲区（无拷贝，内存不连续）。底部总结各自适用场景。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            缓冲区设计：三种方案对比
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            读写指针怎么走，决定了缓冲区的性能特征
          </text>

          {/* ===== 方案 A：环形缓冲区 ===== */}
          <text x="120" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">A. 环形缓冲区</text>
          {/* 环形示意 */}
          <circle cx="120" cy="140" r="36" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
          {/* 写指针 */}
          <circle cx="120" cy="104" r="4" fill="var(--success)" />
          <text x="132" y="106" fontSize="11" fill="var(--success)" fontWeight="600">W</text>
          {/* 读指针 */}
          <circle cx="156" cy="140" r="4" fill="var(--warning)" />
          <text x="166" y="144" fontSize="11" fill="var(--warning)" fontWeight="600">R</text>
          {/* 格子 */}
          <text x="120" y="145" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">8 slots</text>

          {/* 优缺点 */}
          <rect x="48" y="200" width="144" height="84" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="120" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">优点</text>
          <text x="56" y="234" fontSize="11" fill="var(--text-secondary)">- 无内存分配</text>
          <text x="56" y="248" fontSize="11" fill="var(--text-secondary)">- 缓存友好</text>
          <text x="56" y="262" fontSize="11" fill="var(--text-secondary)">- 固定内存</text>
          <text x="120" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">缺点：大小固定</text>

          {/* ===== 方案 B：vector 缓冲区 ===== */}
          <text x="360" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">B. vector 缓冲区</text>
          {/* 线性示意 */}
          <rect x="288" y="120" width="144" height="40" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1={288 + 24 * (i + 1)} y1="120" x2={288 + 24 * (i + 1)} y2="160" stroke="var(--border)" strokeWidth="0.8" />
          ))}
          <text x="300" y="144" fontSize="11" fill="var(--text-secondary)">R</text>
          <text x="396" y="144" fontSize="11" fill="var(--text-secondary)">W</text>
          {/* 扩容箭头 */}
          <path d="M432 140 Q460 140 460 110" fill="none" stroke="var(--warning)" strokeWidth="1.2" markerEnd="url(#bd-arrow)" />
          <text x="468" y="112" fontSize="11" fill="var(--warning)">扩容×2</text>

          {/* 优缺点 */}
          <rect x="288" y="200" width="144" height="84" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">优点</text>
          <text x="296" y="234" fontSize="11" fill="var(--text-secondary)">- 自动扩容</text>
          <text x="296" y="248" fontSize="11" fill="var(--text-secondary)">- 实现简单</text>
          <text x="360" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">缺点：扩容时拷贝</text>

          {/* ===== 方案 C：链表分块 ===== */}
          <text x="600" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">C. 链表分块</text>
          {/* 分块示意 */}
          {[528, 576, 624].map((x, i) => (
            <g key={x}>
              <rect x={x} y="120" width="40" height="40" rx="4" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
              <text x={x + 20} y="144" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`4K`}</text>
              {i < 2 && <line x1={x + 40} y1="140" x2={x + 44} y2="140" stroke="var(--text-secondary)" strokeWidth="1" markerEnd="url(#bd-arrow)" />}
            </g>
          ))}

          {/* 优缺点 */}
          <rect x="528" y="200" width="144" height="84" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="600" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">优点</text>
          <text x="536" y="234" fontSize="11" fill="var(--text-secondary)">- 无拷贝扩容</text>
          <text x="536" y="248" fontSize="11" fill="var(--text-secondary)">- 内存灵活</text>
          <text x="600" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">缺点：缓存不友好</text>

          {/* 箭头标记 */}
          <defs>
            <marker id="bd-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L6,4 L0,8" fill="none" stroke="var(--text-secondary)" strokeWidth="1" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <rect x="60" y="316" width={VIEW_W - 120} height="68" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="338" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">选型建议</text>
          <text x="120" y="360" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">固定大小场景（音视频流）</text>
          <text x="360" y="360" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">通用场景（HTTP 服务）</text>
          <text x="600" y="360" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">大数据量（文件传输）</text>
          <text x={VIEW_W / 2} y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">实际服务器常组合使用：小块用环形，大块用链表</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种缓冲区各有取舍：环形缓冲区零分配但大小固定，vector 简单但扩容有拷贝，链表分块无拷贝但缓存不友好。实际服务器常组合使用。
      </figcaption>
    </figure>
  );
}
