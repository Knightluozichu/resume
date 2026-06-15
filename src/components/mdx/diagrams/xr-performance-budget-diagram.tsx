/**
 * <XrPerformanceBudgetDiagram target="90|72|120">：
 * XR 帧率目标与每眼/整帧 ms 预算示意。
 */

type XrTarget = "90" | "72" | "120";

interface Props {
  target?: XrTarget;
}

const TARGETS: Record<
  XrTarget,
  { fps: number; ms: number; label: string; note: string }
> = {
  "90": {
    fps: 90,
    ms: 11.1,
    label: "PC VR 主流",
    note: "Quest Link / PCVR 常见目标；余量留给重投影与系统合成",
  },
  "72": {
    fps: 72,
    ms: 13.9,
    label: "Standalone 基线",
    note: "Quest 2/3 默认档；移动 SoC 热节流时先降分辨率再降帧",
  },
  "120": {
    fps: 120,
    ms: 8.3,
    label: "高刷竞技",
    note: "Index / Quest Pro 高刷；GPU 预算更紧，后处理与 Overdraw 空间更小",
  },
};

export function XrPerformanceBudgetDiagram({ target = "90" }: Props) {
  const t = TARGETS[target];
  const budgetW = 320;
  const usedPct = target === "120" ? 0.92 : target === "90" ? 0.78 : 0.85;
  const usedW = budgetW * usedPct;
  const headroom = budgetW - usedW;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 480 240"
          role="img"
          aria-label={`XR ${t.fps} FPS 帧预算示意`}
          className="mx-auto block h-auto w-full max-w-[480px]"
        >
          <text x="24" y="28" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            XR 性能预算 · {t.fps} FPS = {t.ms.toFixed(1)} ms/帧
          </text>
          <text x="24" y="46" fontSize="10" fill="var(--text-secondary)">
            {t.label} · 双眼各需按时提交 · 超预算 → 重投影/插帧/晕动
          </text>

          {/* 整帧预算条 */}
          <rect
            x="24"
            y="68"
            width={budgetW}
            height="28"
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <rect
            x="24"
            y="68"
            width={usedW}
            height="28"
            rx="6"
            fill="var(--accent)"
            opacity="0.75"
          />
          <rect
            x={24 + usedW}
            y="68"
            width={headroom}
            height="28"
            rx="6"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity="0.6"
          />
          <text x="32" y="86" fontSize="10" fill="var(--text-primary)">
            渲染 + 脚本 + XR 合成
          </text>
          <text x={24 + budgetW + 8} y="86" fontSize="9" fill="var(--accent)">
            余量
          </text>

          {/* 双眼拆分 */}
          <text x="24" y="118" fontSize="10" fontWeight="600" fill="var(--text-primary)">
            双眼 ≈ 2× 像素 · 2× Draw（未 Single Pass 时）
          </text>
          <g>
            <rect x="24" y="128" width="148" height="36" rx="6" fill="var(--bg)" stroke="var(--border)" />
            <text x="98" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              左眼 Pass
            </text>
            <rect x="186" y="128" width="148" height="36" rx="6" fill="var(--bg)" stroke="var(--border)" />
            <text x="260" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              右眼 Pass
            </text>
            <text x="350" y="150" fontSize="9" fill="var(--text-secondary)">
              + Late Latch
            </text>
          </g>

          {/* 目标切换指示 */}
          {(["90", "72", "120"] as XrTarget[]).map((key, i) => {
            const active = key === target;
            const x = 24 + i * 72;
            return (
              <g key={key}>
                <rect
                  x={x}
                  y="182"
                  width="64"
                  height="22"
                  rx="4"
                  fill={active ? "var(--accent)" : "var(--bg)"}
                  stroke={active ? "var(--accent)" : "var(--border)"}
                  opacity={active ? 0.2 : 1}
                />
                <text
                  x={x + 32}
                  y="197"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight={active ? "600" : "400"}
                  fill={active ? "var(--accent)" : "var(--text-secondary)"}
                >
                  {TARGETS[key].fps} FPS
                </text>
              </g>
            );
          })}

          <text x="24" y="228" fontSize="9" fill="var(--text-secondary)">
            {t.note}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        XR 必须留帧时间余量给运行时合成与姿态预测；{t.fps} FPS 时整帧仅约 {t.ms.toFixed(1)} ms，比 60 FPS 桌面更苛刻。
      </figcaption>
    </figure>
  );
}
