/**
 * <GmpEngineBasicsDiagram>：游戏引擎基础图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmpEngineBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏引擎基础图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏引擎核心架构
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            游戏循环 · 组件系统 · 资源管理
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <text x={VIEW_W / 2} y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">游戏循环（每帧 16ms）</text>

          <rect x="70" y="112" width="100" height="40" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="120" y="136" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">输入</text>

          <text x="185" y="136" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="200" y="112" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="250" y="136" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">逻辑更新</text>

          <text x="315" y="136" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="330" y="112" width="100" height="40" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="380" y="136" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">物理模拟</text>

          <text x="445" y="136" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="460" y="112" width="100" height="40" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="510" y="136" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">渲染</text>

          <text x="575" y="136" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="590" y="112" width="80" height="40" rx="6" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="630" y="136" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">显示</text>

          <text x={VIEW_W / 2} y="176" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">组件系统（组合优于继承）</text>

          <rect x="160" y="188" width="400" height="36" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="360" y="210" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">GameObject（组件容器）</text>

          <rect x="80" y="234" width="120" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="140" y="256" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Transform</text>

          <rect x="210" y="234" width="120" height="36" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="270" y="256" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MeshRenderer</text>

          <rect x="340" y="234" width="120" height="36" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="400" y="256" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Collider</text>

          <rect x="470" y="234" width="120" height="36" rx="6" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="530" y="256" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Rigidbody</text>

          <text x={VIEW_W / 2} y="296" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            资源管理：按需加载 + 引用计数 + 延迟卸载
          </text>
          <text x={VIEW_W / 2} y="314" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            固定步长（物理确定性）+ 可变步长（渲染流畅性）
          </text>
          <text x={VIEW_W / 2} y="332" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            需要什么功能加什么组件，不改动其他功能
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏引擎核心架构——游戏循环、组件系统与资源管理
      </figcaption>
    </figure>
  );
}
