/**
 * <FindSendMessageDiagram>：Find / SendMessage 运行时场景遍历开销示意。
 */

export function FindSendMessageDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 220"
          role="img"
          aria-label="Find 与 SendMessage 遍历场景层级"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <text x="280" y="22" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            场景层级遍历（O(n) 节点）
          </text>

          {/* Root */}
          <rect x="240" y="36" width="80" height="28" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="280" y="54" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Scene Root</text>

          {/* Children */}
          {[120, 240, 360].map((cx, i) => (
            <g key={cx}>
              <path d={`M280 64 L${cx + 40} 88`} stroke="var(--border)" strokeWidth="1.5" />
              <rect x={cx} y="88" width="80" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" />
              <text x={cx + 40} y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
                Group {i + 1}
              </text>
              <rect x={cx + 8} y="128" width="64" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
              <text x={cx + 40} y="144" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Child</text>
            </g>
          ))}

          {/* Find path highlight */}
          <path
            d="M40 160 Q140 120 280 50 Q420 120 520 160"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <text x="40" y="178" fontSize="11" fontWeight="600" fill="var(--accent)">
            Find("Player")
          </text>
          <text x="400" y="178" fontSize="11" fontWeight="600" fill="var(--accent)">
            SendMessage
          </text>

          <rect x="20" y="188" width="520" height="24" rx="4" fill="var(--bg)" stroke="var(--border)" />
          <text x="280" y="204" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            每次调用从根遍历整棵树 + 字符串匹配；Awake 缓存引用或事件总线替代
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        GameObject.Find、FindWithTag、SendMessage 都依赖运行时搜索，节点越多越慢。
      </figcaption>
    </figure>
  );
}
