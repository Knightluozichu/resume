/**
 * <UhmDataBindingDiagram>：数据绑定与响应式更新图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UhmDataBindingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数据绑定与响应式更新图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            数据绑定：从数据源到 UI 的自动同步
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            观察者模式 + 脏标记批量更新
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="80" y="110" width="180" height="70" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="170" y="134" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">数据源</text>
          <text x="170" y="150" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ObservableProperty</text>
          <text x="170" y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">setter → 脏标记</text>

          <text x="290" y="148" textAnchor="middle" fontSize="14" fill="var(--accent)">通知</text>
          <line x1="260" y1="145" x2="320" y2="145" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-accent)" />

          <rect x="330" y="110" width="130" height="70" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="395" y="134" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">脏标记队列</text>
          <text x="395" y="150" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">_dirty = true</text>
          <text x="395" y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">帧末 Flush</text>

          <text x="490" y="148" textAnchor="middle" fontSize="14" fill="var(--accent)">批量</text>
          <line x1="460" y1="145" x2="520" y2="145" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-accent)" />

          <rect x="530" y="110" width="130" height="70" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="595" y="134" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">UI 更新</text>
          <text x="595" y="150" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Text/Image</text>
          <text x="595" y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">仅一次/帧</text>

          <defs>
            <marker id="arrow-accent" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--accent)" />
            </marker>
          </defs>

          <rect x="80" y="210" width="260" height="60" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="210" y="232" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">单向绑定</text>
          <text x="210" y="250" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">数据 → UI（只读显示）</text>
          <text x="210" y="264" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">车速/转速/油量</text>

          <rect x="380" y="210" width="260" height="60" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="510" y="232" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">双向绑定</text>
          <text x="510" y="250" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">数据 ↔ UI（可交互）</text>
          <text x="510" y="264" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">滑块/开关/输入框</text>

          <text x={VIEW_W / 2} y="302" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            生命周期：OnEnable 订阅 → OnDisable 取消订阅
          </text>
          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            优化：10 次赋值 → 脏标记 → 帧末 1 次更新
          </text>
          <text x={VIEW_W / 2} y="338" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            数据源是唯一真相，界面只是投影
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数据绑定——观察者模式与脏标记批量更新的完整链路
      </figcaption>
    </figure>
  );
}
