/**
 * <GetComponentCacheDiagram mode="slow|fast">：
 * 每帧 GetComponent vs 序列化引用 / Awake 缓存对比。
 */

type Mode = "slow" | "fast";

interface Props {
  /** slow = 每帧查找；fast = 缓存引用；省略则左右对比 */
  mode?: Mode;
}

export function GetComponentCacheDiagram({ mode }: Props) {
  const showSlow = mode === undefined || mode === "slow";
  const showFast = mode === undefined || mode === "fast";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 220"
          role="img"
          aria-label="GetComponent 每帧查找与缓存引用对比"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {showSlow && (
            <g>
              <text x="160" y="24" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">
                ❌ 每帧 GetComponent
              </text>
              <rect x="24" y="36" width="272" height="160" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
              <rect x="44" y="56" width="100" height="36" rx="6" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
              <text x="94" y="78" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Update()</text>
              <path d="M94 92 v16" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="44" y="108" width="120" height="32" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" />
              <text x="104" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">GetComponent&lt;T&gt;()</text>
              <path d="M104 140 v12" stroke="var(--border)" strokeWidth="1.5" />
              <rect x="44" y="152" width="140" height="32" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" />
              <text x="114" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Native 查找 + 装箱</text>
              <text x="200" y="128" fontSize="28" fill="var(--accent)">×60</text>
              <text x="200" y="148" fontSize="10" fill="var(--text-secondary)">fps</text>
            </g>
          )}
          {showFast && (
            <g transform={mode === undefined ? "translate(320,0)" : "translate(184,0)"}>
              <text x="160" y="24" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">
                ✅ 缓存 / 序列化引用
              </text>
              <rect x="24" y="36" width="272" height="160" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
              <rect x="44" y="56" width="100" height="36" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" />
              <text x="94" y="78" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Awake()</text>
              <path d="M94 92 v12" stroke="var(--border)" strokeWidth="1.5" />
              <rect x="44" y="104" width="140" height="28" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" />
              <text x="114" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">_rb = GetComponent 一次</text>
              <rect x="44" y="148" width="100" height="36" rx="6" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
              <text x="94" y="170" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Update()</text>
              <path d="M154 166 h60" stroke="var(--accent)" strokeWidth="2" />
              <rect x="214" y="148" width="72" height="36" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" />
              <text x="250" y="170" textAnchor="middle" fontSize="10" fill="var(--text-primary)">_rb 字段</text>
            </g>
          )}
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
            </marker>
          </defs>
          {mode === undefined && (
            <text x="320" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              在 Awake/Start 或 Inspector 序列化字段缓存引用，Update 里直接读字段
            </text>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        GetComponent 穿越托管/原生边界有固定开销；每帧重复查找会堆成 CPU 热点。
      </figcaption>
    </figure>
  );
}
