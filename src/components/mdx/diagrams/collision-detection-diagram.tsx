/**
 * <CollisionDetectionDiagram mode="discrete|continuous">：
 * 离散 vs 连续（CCD）碰撞检测——高速子弹穿墙问题。
 */

type Mode = "discrete" | "continuous";

interface Props {
  mode?: Mode;
}

export function CollisionDetectionDiagram({ mode = "discrete" }: Props) {
  const discrete = mode === "discrete";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 480 200"
          role="img"
          aria-label="离散与连续碰撞检测对比"
          className="mx-auto block h-auto w-full max-w-[480px]"
        >
          {/* 墙 */}
          <rect x="220" y="40" width="24" height="120" rx="2" fill="var(--border)" stroke="var(--text-secondary)" strokeWidth="1.5" />
          <text x="232" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            墙
          </text>

          {discrete ? (
            <>
              {/* 帧 t */}
              <circle cx="120" cy="100" r="14" fill="var(--accent)" opacity="0.5" />
              <text x="120" y="76" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
                t
              </text>
              {/* 帧 t+1 穿墙 */}
              <circle cx="280" cy="100" r="14" fill="var(--accent)" opacity="0.9" />
              <text x="280" y="76" textAnchor="middle" fontSize="10" fill="var(--accent)">
                t+1 穿过
              </text>
              <line x1="134" y1="100" x2="266" y2="100" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="4 3" />
              <text x="200" y="130" textAnchor="middle" fontSize="11" fill="var(--accent)">
                Discrete：步间 tunneling
              </text>
            </>
          ) : (
            <>
              <circle cx="120" cy="100" r="14" fill="var(--accent)" opacity="0.5" />
              <line x1="134" y1="100" x2="208" y2="100" stroke="var(--accent)" strokeWidth="3" />
              <circle cx="212" cy="100" r="14" fill="var(--accent)" />
              <text x="168" y="130" textAnchor="middle" fontSize="11" fill="var(--accent)">
                CCD：沿运动扫掠，命中墙面
              </text>
            </>
          )}

          <text x="240" y="28" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            {discrete ? "Discrete（默认）" : "Continuous Dynamic / Speculative"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        CCD 更贵，只给高速小物体（子弹、球）开；静态场景用 Discrete 即可。
      </figcaption>
    </figure>
  );
}
