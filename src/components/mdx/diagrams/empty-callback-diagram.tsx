/**
 * <EmptyCallbackDiagram>：空 MonoBehaviour 回调仍被引擎每帧调度的示意。
 */

export function EmptyCallbackDiagram() {
  const callbacks = [
    { name: "Update", y: 52, empty: true },
    { name: "LateUpdate", y: 92, empty: true },
    { name: "FixedUpdate", y: 132, empty: false },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 520 200"
          role="img"
          aria-label="空 MonoBehaviour 回调仍被引擎调度"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          <rect x="20" y="20" width="160" height="160" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="100" y="44" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            Unity 引擎
          </text>
          <text x="100" y="62" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            PlayerLoop 调度表
          </text>
          {callbacks.map((cb) => (
            <g key={cb.name}>
              <rect
                x="36"
                y={cb.y}
                width="128"
                height="28"
                rx="6"
                fill={cb.empty ? "var(--bg-elevated)" : "var(--accent)"}
                fillOpacity={cb.empty ? 1 : 0.2}
                stroke={cb.empty ? "var(--border)" : "var(--accent)"}
                strokeWidth={cb.empty ? 1 : 2}
              />
              <text x="100" y={cb.y + 18} textAnchor="middle" fontSize="11" fill="var(--text-primary)">
                {cb.name}()
              </text>
              {cb.empty && (
                <text x="172" y={cb.y + 18} fontSize="10" fill="var(--text-secondary)">
                  空函数仍注册
                </text>
              )}
            </g>
          ))}

          <path d="M180 100 h40" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#ecb-arrow)" />
          <rect x="220" y="60" width="280" height="80" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="360" y="88" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            MonoBehaviour 脚本
          </text>
          <text x="360" y="108" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            void Update() { }
          </text>
          <text x="360" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            void LateUpdate() { } — 体量为零，调度成本不为零
          </text>

          <text x="260" y="175" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            100 个空 Update ≈ 100 次跨边界调用；删掉脚本或改用集中调度
          </text>
          <defs>
            <marker id="ecb-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        即使函数体为空，只要脚本挂着且启用了对应回调，引擎每帧仍会遍历并调用。
      </figcaption>
    </figure>
  );
}
