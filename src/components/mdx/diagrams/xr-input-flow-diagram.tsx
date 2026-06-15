/**
 * <XrInputFlowDiagram>：XR 输入管线数据流。
 * 展示 HMD/控制器/手部追踪 → Input Subsystem → Poll/缓存 → Update/交互的完整路径。
 */

export function XrInputFlowDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 270"
          role="img"
          aria-label="XR 输入管线：HMD/控制器/手部追踪经 Input Subsystem 轮询后进入游戏逻辑——缓存、合并 Poll、减 Raycast 是关键优化点"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <text x="20" y="28" fontSize="13" fontWeight="600" fill="var(--text-primary)">XR 输入管线 · 每帧 CPU 数据流</text>

          {/* Devices */}
          <rect x="20" y="44" width="100" height="36" rx="4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="70" y="66" textAnchor="middle" fontSize="10" fill="var(--text-primary)">HMD 头显</text>

          <rect x="20" y="90" width="100" height="36" rx="4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="70" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">控制器 L/R</text>

          <rect x="20" y="136" width="100" height="36" rx="4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="70" y="158" textAnchor="middle" fontSize="10" fill="var(--text-primary)">手部追踪</text>

          {/* Arrow to Input Subsystem */}
          <line x1="120" y1="90" x2="164" y2="90" stroke="var(--accent)" strokeWidth="1.5" />
          <polygon points="160,84 170,90 160,96" fill="var(--accent)" />

          {/* Input Subsystem */}
          <rect x="170" y="54" width="130" height="110" rx="6" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
          <text x="235" y="76" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">XR Input</text>
          <text x="235" y="92" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Subsystem</text>
          <text x="235" y="112" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">每帧 Poll 设备</text>
          <text x="235" y="128" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">姿态·按钮·触觉</text>
          <text x="235" y="150" textAnchor="middle" fontSize="8" fill="#e57373">开销 ≈0.3–1.5ms/帧</text>

          {/* Arrow to Caching */}
          <line x1="300" y1="109" x2="344" y2="109" stroke="var(--accent)" strokeWidth="1.5" />
          <polygon points="340,103 350,109 340,115" fill="var(--accent)" />

          {/* Caching */}
          <rect x="350" y="64" width="100" height="90" rx="6" fill="var(--bg-elevated)" stroke="var(--success)" strokeWidth="2" />
          <text x="400" y="86" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">缓存层</text>
          <text x="400" y="104" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Awake() 绑定</text>
          <text x="400" y="120" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">不每帧查 Device</text>
          <text x="400" y="140" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">用 InputAction 引用</text>

          {/* Arrow to Game Logic */}
          <line x1="450" y1="109" x2="500" y2="109" stroke="var(--accent)" strokeWidth="1.5" />
          <polygon points="496,103 506,109 496,115" fill="var(--accent)" />

          {/* Game Logic */}
          <rect x="506" y="74" width="100" height="70" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="556" y="96" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Update()</text>
          <text x="556" y="112" textAnchor="middle" fontSize="9" fill="var(--text-primary)">交互/Raycast</text>
          <text x="556" y="130" textAnchor="middle" fontSize="9" fill="var(--text-primary)">动画/触觉</text>

          {/* Bottom recommendations */}
          <rect x="20" y="190" width="520" height="68" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="36" y="212" fontSize="10" fontWeight="600" fill="var(--text-primary)">三项 CPU 优化建议：</text>
          <text x="36" y="230" fontSize="9" fill="var(--text-secondary)">① 在 Awake() 中缓存 InputDevice/Action 引用——Update 不反复 GetDeviceAtXRNode()</text>
          <text x="36" y="246" fontSize="9" fill="var(--text-secondary)">② XR Interaction Toolkit：减少 XRRayInteractor 的 Raycast 层级和频率</text>
          <text x="36" y="262" fontSize="9" fill="var(--text-secondary)">③ 不需要每帧读的输入（如 Hand Bone）降低 Poll 频率到每 2–3 帧</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        XR 输入管线：设备 Poll → Input Subsystem → 缓存层 → 游戏逻辑。每帧轮询所有
        XR 输入设备在 CPU 端有固定开销；缓存 Device/Action 引用和减少 Raycast 是关键优化点。
      </figcaption>
    </figure>
  );
}
