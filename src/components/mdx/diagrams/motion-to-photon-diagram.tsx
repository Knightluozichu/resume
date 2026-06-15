/**
 * <MotionToPhotonDiagram>：Motion-to-Photon 延迟链四阶段。
 * 传感器→CPU 逻辑→GPU 渲染→合成+显示，每阶段标注优化方向。
 */

export function MotionToPhotonDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 220"
          role="img"
          aria-label="Motion-to-Photon 四阶段延迟链：传感器→CPU→GPU→合成+显示，每阶段有对应优化手段"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x="20" y="28" fontSize="13" fontWeight="600" fill="var(--text-primary)">Motion-to-Photon 延迟链（~7–20ms 目标 ≤15ms）</text>

          {/* Stage 1: Sensor */}
          <rect x="20" y="44" width="140" height="80" rx="6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="90" y="66" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">① 传感器</text>
          <text x="90" y="82" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">IMU 采样姿态</text>
          <text x="90" y="96" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">~1–3ms（硬件固定）</text>
          <text x="90" y="112" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">优化：低延迟 IMU 模式</text>

          {/* Arrow */}
          <line x1="164" y1="84" x2="176" y2="84" stroke="var(--accent)" strokeWidth="2" />
          <polygon points="172,78 182,84 172,90" fill="var(--accent)" />

          {/* Stage 2: CPU */}
          <rect x="180" y="44" width="140" height="80" rx="6" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
          <text x="250" y="66" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">② CPU · 游戏逻辑</text>
          <text x="250" y="82" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Update/物理/AI/输入</text>
          <text x="250" y="96" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">预算 ≤9ms (90FPS)</text>
          <text x="250" y="112" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">优化：缓存引用·分帧执行</text>

          {/* Arrow */}
          <line x1="324" y1="84" x2="336" y2="84" stroke="var(--accent)" strokeWidth="2" />
          <polygon points="332,78 342,84 332,90" fill="var(--accent)" />

          {/* Stage 3: GPU */}
          <rect x="340" y="44" width="140" height="80" rx="6" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
          <text x="410" y="66" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">③ GPU · 渲染双眼</text>
          <text x="410" y="82" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Single Pass × FFR</text>
          <text x="410" y="96" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">预算 ≤8ms (90FPS)</text>
          <text x="410" y="112" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">优化：SPI/FFR/RenderScale</text>

          {/* Arrow */}
          <line x1="484" y1="84" x2="496" y2="84" stroke="var(--accent)" strokeWidth="2" />
          <polygon points="492,78 502,84 492,90" fill="var(--accent)" />

          {/* Stage 4: Comp + Display */}
          <rect x="500" y="44" width="130" height="80" rx="6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="565" y="66" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">④ 合成+显示</text>
          <text x="565" y="82" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">畸变校正·ATW·刷新</text>
          <text x="565" y="96" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">~2–4ms（设备端）</text>
          <text x="565" y="112" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">优化：Late Latch</text>

          {/* Bottom: total chain with critical threshold */}
          <rect x="20" y="140" width="610" height="38" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="40" y="164" fontSize="11" fontWeight="600" fill="var(--text-primary)">总延迟 = ① + ② + ③ + ④ = ≤20ms 为可接受 · ≤15ms 为舒适 · &gt;20ms 引发晕动</text>

          {/* Deadline warning */}
          <rect x="20" y="186" width="610" height="24" rx="4" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1" />
          <text x="325" y="203" textAnchor="middle" fontSize="10" fill="var(--danger)">
            ⚠ 任何阶段超时 → 错过帧提交截止 → 合成重显上一帧 → 视觉跳跃 → 用户晕
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Motion-to-Photon 四个阶段（传感器/CPU/GPU/合成+显示）必须在帧预算内全部完成。
        任何一段超时都会导致合成重显上一帧产生视觉跳跃——是 VR 晕动感的核心来源。
      </figcaption>
    </figure>
  );
}
