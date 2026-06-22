/**
 * <AacLifecycleDiagram />：《Android 设计模式》「Android Architecture Components」章配图。
 *
 * 画面内容：三层结构展示 AAC 核心组件的生命周期关系。
 *  上层：Lifecycle 状态机（Created → Started → Resumed → Paused → Stopped → Destroyed），
 *        状态间用箭头连接，Resumed 高亮为 active 状态。
 *  中层：ViewModel 生命周期长条，跨越旋转事件（View 销毁重建，ViewModel 不销毁），
 *        用红色断裂线标注 View 被销毁然后重建的时间点，ViewModel 条在此处「飞跃」不断。
 *  下层：LiveData / Observer 关系——ViewModel 持有 LiveData，View 通过 observe() 订阅，
 *        LifecycleOwner 感知自动在 DESTROYED 时取消订阅。
 *  底部两个关键标签横幅。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 */

// —— 生命周期状态节点 ——
interface LifecycleState {
  label: string;
  description: string;
  color: string;
  isActive?: boolean;
}

const LIFECYCLE_STATES: readonly LifecycleState[] = [
  { label: "Created", description: "onCreate", color: "var(--text-secondary)" },
  { label: "Started", description: "onStart", color: "var(--accent)" },
  { label: "Resumed", description: "onResume", color: "var(--success)", isActive: true },
  { label: "Paused", description: "onPause", color: "var(--warning)" },
  { label: "Stopped", description: "onStop", color: "var(--danger)" },
  { label: "Destroyed", description: "onDestroy", color: "var(--danger)" },
];

// —— 布局常量 ——
const VIEW_W = 720;
const VIEW_H = 520;
const PAD_X = 24;
const LIFECYCLE_Y = 60; // 状态机行 y
const LIFECYCLE_H = 48; // 状态机框高
const LIFECYCLE_W = 96; // 单个状态框宽
const LIFECYCLE_GAP = 12; // 框间距
const ROTATION_ZONE_X = 300; // ViewModel 旋转断裂区域左边界
const ROTATION_ZONE_W = 160; // 旋转断裂区域宽
const VM_Y = 196; // ViewModel 行 y
const VM_H = 36;
const LIVEDATA_Y = 285; // LiveData 行 y
const OBSERVER_Y = 352; // Observer 行 y
const LABEL_BAR_Y = 430; // 底部标签横幅 y

/** 计算第 i 个生命周期状态框的 x。 */
function lifecycleX(index: number): number {
  const totalWidth = LIFECYCLE_STATES.length * LIFECYCLE_W + (LIFECYCLE_STATES.length - 1) * LIFECYCLE_GAP;
  const startX = (VIEW_W - totalWidth) / 2;
  return startX + index * (LIFECYCLE_W + LIFECYCLE_GAP);
}

export function AacLifecycleDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android Architecture Components 生命周期感知组件关系图。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* === 第一层：生命周期状态机 === */}
          <text x={PAD_X} y="30" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            1. Lifecycle 状态机
          </text>

          {LIFECYCLE_STATES.map((state, i) => {
            const sx = lifecycleX(i);
            return (
              <g key={state.label}>
                {/* 状态框 */}
                <rect
                  x={sx}
                  y={LIFECYCLE_Y}
                  width={LIFECYCLE_W}
                  height={LIFECYCLE_H}
                  rx="8"
                  fill={state.isActive ? state.color : "var(--bg)"}
                  fillOpacity={state.isActive ? 0.18 : 1}
                  stroke={state.color}
                  strokeWidth={state.isActive ? 2.4 : 1.4}
                />
                <text x={sx + LIFECYCLE_W / 2} y={LIFECYCLE_Y + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill={state.isActive ? state.color : "var(--text-primary)"}>
                  {state.label}
                </text>
                <text x={sx + LIFECYCLE_W / 2} y={LIFECYCLE_Y + 36} textAnchor="middle" fontSize="11" fill={state.isActive ? state.color : "var(--text-secondary)"}>
                  ({state.description})
                </text>
                {/* 状态间箭头 */}
                {i < LIFECYCLE_STATES.length - 1 && (
                  <g>
                    <line
                      x1={sx + LIFECYCLE_W}
                      y1={LIFECYCLE_Y + LIFECYCLE_H / 2}
                      x2={sx + LIFECYCLE_W + LIFECYCLE_GAP - 2}
                      y2={LIFECYCLE_Y + LIFECYCLE_H / 2}
                      stroke="var(--border)"
                      strokeWidth="1.6"
                    />
                    <path
                      d={`M ${sx + LIFECYCLE_W + LIFECYCLE_GAP - 2} ${LIFECYCLE_Y + LIFECYCLE_H / 2} l -5 -3 l 0 6 z`}
                      fill="var(--border)"
                    />
                  </g>
                )}
              </g>
            );
          })}

          {/* === 第二层：ViewModel 生命周期（跨旋转存活） === */}
          <text x={PAD_X} y={VM_Y - 48} fontSize="13" fontWeight="700" fill="var(--text-primary)">
            2. ViewModel 生命周期
          </text>

          {/* ViewModel 长条：左段（旋转前）、右段（旋转后）、中段断裂 */}
          {/* 左段：从 Created 到旋转前 */}
          <rect x={lifecycleX(0) + 8} y={VM_Y} width={ROTATION_ZONE_X - lifecycleX(0) - 8} height={VM_H} rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="2" />
          <text x={lifecycleX(0) + (ROTATION_ZONE_X - lifecycleX(0)) / 2} y={VM_Y + VM_H / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            ViewModel (存活)
          </text>

          {/* 旋转断裂区域 */}
          <rect x={ROTATION_ZONE_X} y={VM_Y - 14} width={ROTATION_ZONE_W} height={VM_H + 20} rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x={ROTATION_ZONE_X + ROTATION_ZONE_W / 2} y={VM_Y - 20} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">
            🔄 屏幕旋转
          </text>
          <text x={ROTATION_ZONE_X + ROTATION_ZONE_W / 2} y={VM_Y + 8} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            View 销毁 &amp; 重建
          </text>
          <text x={ROTATION_ZONE_X + ROTATION_ZONE_W / 2} y={VM_Y + 22} textAnchor="middle" fontSize="11" fill="var(--warning)">
            ViewModel 飞跃不断
          </text>

          {/* 右段：旋转后到 Destroyed */}
          <rect x={ROTATION_ZONE_X + ROTATION_ZONE_W + 8} y={VM_Y} width={lifecycleX(5) + LIFECYCLE_W - 8 - ROTATION_ZONE_X - ROTATION_ZONE_W - 8} height={VM_H} rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="2" />
          <text x={ROTATION_ZONE_X + ROTATION_ZONE_W + 8 + (lifecycleX(5) + LIFECYCLE_W - 8 - ROTATION_ZONE_X - ROTATION_ZONE_W - 8) / 2} y={VM_Y + VM_H / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            ViewModel (存活)
          </text>

          {/* 两端纵向虚线连接到生命周期状态 */}
          <line x1={lifecycleX(0) + LIFECYCLE_W / 2} y1={LIFECYCLE_Y + LIFECYCLE_H} x2={lifecycleX(0) + LIFECYCLE_W / 2} y2={VM_Y} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <line x1={lifecycleX(5) + LIFECYCLE_W / 2} y1={LIFECYCLE_Y + LIFECYCLE_H} x2={lifecycleX(5) + LIFECYCLE_W / 2} y2={VM_Y} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

          {/* === 第三层：LiveData / Observer === */}
          <text x={PAD_X} y={LIVEDATA_Y - 32} fontSize="13" fontWeight="700" fill="var(--text-primary)">
            3. LiveData &amp; Observer
          </text>

          {/* ViewModel 持有 LiveData */}
          <rect x={lifecycleX(0) + 8} y={LIVEDATA_Y} width={160} height="36" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.6" />
          <text x={lifecycleX(0) + 88} y={LIVEDATA_Y + 22} textAnchor="middle" fontSize="11" fontWeight="600" fontFamily="var(--font-mono)" fill="var(--text-primary)">
            LiveData&lt;T&gt;
          </text>

          {/* 从 ViewModel 长条到 LiveData 框的虚线 */}
          <line x1={lifecycleX(0) + 88} y1={VM_Y + VM_H} x2={lifecycleX(0) + 88} y2={LIVEDATA_Y} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <text x={lifecycleX(0) + 98} y={LIVEDATA_Y - 8} fontSize="11" fill="var(--text-secondary)">
            ViewModel 持有
          </text>

          {/* Observer / LifecycleOwner */}
          <rect x={ROTATION_ZONE_X + ROTATION_ZONE_W + 8} y={OBSERVER_Y} width={200} height="60" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.4" />
          <text x={ROTATION_ZONE_X + ROTATION_ZONE_W + 108} y={OBSERVER_Y + 18} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">
            View (LifecycleOwner)
          </text>
          <text x={ROTATION_ZONE_X + ROTATION_ZONE_W + 108} y={OBSERVER_Y + 36} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            observe(lifecycleOwner) &gt;
          </text>
          <text x={ROTATION_ZONE_X + ROTATION_ZONE_W + 108} y={OBSERVER_Y + 50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            DESTROYED 时自动取消订阅
          </text>

          {/* LiveData → Observer 箭头 */}
          <line x1={210} y1={303} x2={309} y2={333} stroke="var(--success)" strokeWidth="1.8" />
          <line x1={369} y1={352} x2={468} y2={382} stroke="var(--success)" strokeWidth="1.8" />
          <path d={`M ${ROTATION_ZONE_X + ROTATION_ZONE_W + 8} ${OBSERVER_Y + 30} l -6 -3 l 0 6 z`} fill="var(--success)" />
          <text x={339} y={346.5} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            通知更新
          </text>

          {/* === 底部关键标签横幅 === */}
          {/* 标签 1 */}
          <rect x={PAD_X} y={LABEL_BAR_Y} width={(VIEW_W - 48 - 12) / 2} height="36" rx="4" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x={PAD_X + (VIEW_W - 48 - 12) / 4} y={LABEL_BAR_Y + 22} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            ViewModel 跨旋转存活
          </text>

          {/* 标签 2 */}
          <rect x={PAD_X + (VIEW_W - 48 - 12) / 2 + 12} y={LABEL_BAR_Y} width={(VIEW_W - 48 - 12) / 2} height="36" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x={PAD_X + (VIEW_W - 48 - 12) / 2 + 12 + (VIEW_W - 48 - 12) / 4} y={LABEL_BAR_Y + 22} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">
            LiveData 自动管理订阅生命周期
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        AAC 核心组件的三层关系：Lifecycle 状态机驱动 View 的可见性变化；ViewModel 跨旋转存活（View 销毁重建时 ViewModel 不销毁）；
        LiveData 在 ViewModel 和 View 之间传递数据，LifecycleOwner 自动感知生命周期在 DESTROYED 时取消订阅。
      </figcaption>
    </figure>
  );
}
