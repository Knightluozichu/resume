/**
 * <UscScriptableObjectsDiagram>: ScriptableObject 数据架构
 *
 * 数据资产化：配置数据存储在.asset文件中，运行时共享，数据与逻辑分离
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function UscScriptableObjectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="ScriptableObject数据架构。数据资产化、运行时共享、数据与逻辑分离。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            ScriptableObject 数据架构
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            数据资产化(.asset) -> 运行时共享 -> 数据与逻辑分离
          </text>
          {/* ScriptableObject */}
          <g>
            <rect x={220} y={76} width={280} height={56} rx="8" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
            <text x={360} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>ScriptableObject</text>
            <text x={360} y={116} textAnchor="middle" fontSize="11" fill={secondary}>武器配置.asset (数据资产)</text>
          </g>
          {/* 连接线 */}
          <line x1={360} y1={132} x2={360} y2={148} stroke={border} strokeWidth="1.5" />
          <line x1={120} y1={148} x2={600} y2={148} stroke={border} strokeWidth="1.5" />
          <line x1={120} y1={148} x2={120} y2={160} stroke={border} strokeWidth="1.5" markerEnd="url(#uscSO-arrow)" />
          <line x1={360} y1={148} x2={360} y2={160} stroke={border} strokeWidth="1.5" markerEnd="url(#uscSO-arrow)" />
          <line x1={600} y1={148} x2={600} y2={160} stroke={border} strokeWidth="1.5" markerEnd="url(#uscSO-arrow)" />
          {/* 引用方 */}
          <g>
            <rect x={36} y={162} width={168} height={60} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={120} y={184} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>WeaponA</text>
            <text x={120} y={200} textAnchor="middle" fontSize="11" fill={secondary}>引用同一资产</text>
            <text x={120} y={214} textAnchor="middle" fontSize="11" fill={secondary}>damage=50</text>
          </g>
          <g>
            <rect x={276} y={162} width={168} height={60} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={184} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>WeaponB</text>
            <text x={360} y={200} textAnchor="middle" fontSize="11" fill={secondary}>引用同一资产</text>
            <text x={360} y={214} textAnchor="middle" fontSize="11" fill={secondary}>damage=50</text>
          </g>
          <g>
            <rect x={516} y={162} width={168} height={60} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={600} y={184} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>WeaponC</text>
            <text x={600} y={200} textAnchor="middle" fontSize="11" fill={secondary}>引用同一资产</text>
            <text x={600} y={214} textAnchor="middle" fontSize="11" fill={secondary}>damage=50</text>
          </g>
          {/* 优势 */}
          <g>
            <rect x={36} y={236} width={310} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={258} fontSize="13" fontWeight="700" fill={success}>优势</text>
            <text x={52} y={278} fontSize="11" fill={primary}>+ 数据共享，内存只存一份</text>
            <text x={52} y={294} fontSize="11" fill={primary}>+ Inspector 可编辑，无需改代码</text>
            <text x={52} y={310} fontSize="11" fill={primary}>+ 数据与逻辑分离，易维护</text>
          </g>
          {/* 注意事项 */}
          <g>
            <rect x={374} y={236} width={310} height={80} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={390} y={258} fontSize="13" fontWeight="700" fill={warning}>注意事项</text>
            <text x={390} y={278} fontSize="11" fill={primary}>! 运行时修改会持久化(编辑器)</text>
            <text x={390} y={294} fontSize="11" fill={primary}>! 构建后修改不持久化(只内存)</text>
            <text x={390} y={310} fontSize="11" fill={primary}>! 不适合每实例不同的数据</text>
          </g>
          {/* 底部 */}
          <g>
            <rect x={36} y={328} width={648} height={48} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={350} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>适用场景：武器/角色/技能配置、物品定义、关卡参数、事件通道</text>
            <text x={360} y={368} textAnchor="middle" fontSize="11" fill={secondary}>不适合：每实例独立的运行时状态（用 MonoBehaviour 或普通 C# 类）</text>
          </g>
          <defs>
            <marker id="uscSO-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ScriptableObject：数据资产化，多个实例共享同一数据资产，实现数据与逻辑分离。
      </figcaption>
    </figure>
  );
}
