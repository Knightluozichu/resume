/**
 * <UsgComponentPatternDiagram>: 组件模式与游戏对象
 *
 * GameObject(容器) + Component(功能) 组合架构
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function UsgComponentPatternDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="组件模式与游戏对象。GameObject 是空容器，挂载多个 Component 组合出完整功能，组合优于继承。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            组件模式：GameObject + Component
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            容器 + 功能模块 = 组合优于继承
          </text>
          {/* GameObject 容器 */}
          <g>
            <rect x={200} y={76} width={320} height={296} rx="10" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={360} y={100} textAnchor="middle" fontSize="14" fontWeight="700" fill={accent}>GameObject "Player"</text>
            <line x1={220} y1={108} x2={500} y2={108} stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          </g>
          {/* Component 节点 */}
          <g>
            <rect x={224} y={120} width={130} height={44} rx="6" fill={elevated} stroke={success} strokeWidth="1.2" />
            <text x={289} y={138} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>Transform</text>
            <text x={289} y={154} textAnchor="middle" fontSize="10" fill={secondary}>位置/旋转/缩放</text>
          </g>
          <g>
            <rect x={366} y={120} width={130} height={44} rx="6" fill={elevated} stroke={success} strokeWidth="1.2" />
            <text x={431} y={138} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>MeshRenderer</text>
            <text x={431} y={154} textAnchor="middle" fontSize="10" fill={secondary}>渲染显示</text>
          </g>
          <g>
            <rect x={224} y={176} width={130} height={44} rx="6" fill={elevated} stroke={warning} strokeWidth="1.2" />
            <text x={289} y={194} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>Rigidbody</text>
            <text x={289} y={210} textAnchor="middle" fontSize="10" fill={secondary}>物理模拟</text>
          </g>
          <g>
            <rect x={366} y={176} width={130} height={44} rx="6" fill={elevated} stroke={warning} strokeWidth="1.2" />
            <text x={431} y={194} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>CapsuleCollider</text>
            <text x={431} y={210} textAnchor="middle" fontSize="10" fill={secondary}>碰撞检测</text>
          </g>
          <g>
            <rect x={224} y={232} width={130} height={44} rx="6" fill={elevated} stroke={accent} strokeWidth="1.2" />
            <text x={289} y={250} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>PlayerMovement</text>
            <text x={289} y={266} textAnchor="middle" fontSize="10" fill={secondary}>自定义脚本</text>
          </g>
          <g>
            <rect x={366} y={232} width={130} height={44} rx="6" fill={elevated} stroke={accent} strokeWidth="1.2" />
            <text x={431} y={250} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>PlayerHealth</text>
            <text x={431} y={266} textAnchor="middle" fontSize="10" fill={secondary}>自定义脚本</text>
          </g>
          {/* 通信说明 */}
          <g>
            <rect x={224} y={292} width={272} height={64} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={310} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>组件间通信：GetComponent&lt;T&gt;()</text>
            <text x={360} y={326} textAnchor="middle" fontSize="10" fill={secondary}>PlayerMovement 获取 Rigidbody 推力</text>
            <text x={360} y={342} textAnchor="middle" fontSize="10" fill={secondary}>PlayerHealth 通知 PlayerMovement 减速</text>
          </g>
          {/* 继承 vs 组合对比 */}
          <text x={360} y={388} textAnchor="middle" fontSize="11" fill={secondary}>继承层级深 = 耦合重；组件组合 = 灵活可拆装</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GameObject 是空容器，挂载不同 Component 组合出功能；GetComponent 实现组件间通信。
      </figcaption>
    </figure>
  );
}
