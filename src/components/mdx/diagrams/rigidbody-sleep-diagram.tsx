/**
 * <RigidbodySleepDiagram state="awake|sleep|wake">：
 * Rigidbody 睡眠：静止 → 休眠 → 被唤醒。
 */

type SleepState = "awake" | "sleep" | "wake";

interface Props {
  state?: SleepState;
}

export function RigidbodySleepDiagram({ state = "awake" }: Props) {
  const boxes = [
    { label: "箱子 A", x: 80, awake: state === "awake" || state === "wake" },
    { label: "箱子 B", x: 280, awake: state === "awake" },
    { label: "箱子 C", x: 480, awake: state === "wake" },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 260"
          role="img"
          aria-label="Rigidbody 睡眠与唤醒示意"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 地面 */}
          <line x1="40" y1="180" x2="600" y2="180" stroke="var(--border)" strokeWidth="3" />

          {boxes.map((b) => {
            const sleeping = !b.awake;
            return (
              <g key={b.label}>
                <rect
                  x={b.x}
                  y={sleeping ? 148 : 132}
                  width="80"
                  height="48"
                  rx="6"
                  fill={sleeping ? "var(--border)" : "var(--accent)"}
                  opacity={sleeping ? 0.35 : 0.7}
                  stroke={sleeping ? "var(--text-secondary)" : "var(--accent)"}
                  strokeWidth={2}
                  strokeDasharray={sleeping ? "6 4" : undefined}
                />
                <text x={b.x + 40} y={sleeping ? 174 : 158} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
                  {b.label}
                </text>
                <text x={b.x + 40} y="208" textAnchor="middle" fontSize="10" fill={sleeping ? "var(--text-secondary)" : "var(--accent)"}>
                  {sleeping ? "Sleeping 💤" : "Awake · 每步积分"}
                </text>
              </g>
            );
          })}

          {state === "wake" && (
            <>
              <path d="M 520 120 L 540 100 L 560 120" fill="none" stroke="var(--accent)" strokeWidth="2" />
              <text x="540" y="92" textAnchor="middle" fontSize="10" fill="var(--accent)">
                玩家 bump
              </text>
            </>
          )}

          <text x="320" y="238" textAnchor="middle" fontSize="11" fill="var(--text-primary)">
            {state === "awake" && "刚体运动或受力时保持 Awake，PhysX 每 FixedUpdate 都参与求解"}
            {state === "sleep" && "速度/角速度低于阈值且稳定 → Sleep，不再参与模拟直到被唤醒"}
            {state === "wake" && "碰撞、力、Kinematic 移动、脚本 WakeUp() 会把 Sleep 体拉回 Awake"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        堆满静止道具的场景，睡眠能让大量刚体零成本「挂起」。
      </figcaption>
    </figure>
  );
}
