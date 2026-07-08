/**
 * <UidOptimizationDiagram>: UI 性能优化策略
 *
 * 合批/图集/Overdraw 三大优化方向
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function UidOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="UI性能优化策略。三大方向：合批优化、图集管理、Overdraw削减。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            UI 性能优化策略
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            三大方向：合批优化 / 图集管理 / Overdraw 削减
          </text>
          {/* 合批优化 */}
          <g>
            <rect x={36} y={76} width={206} height={140} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={139} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>合批优化</text>
            <text x={52} y={120} fontSize="11" fill={primary}>减少 Draw Call</text>
            <text x={52} y={140} fontSize="11" fill={success}>+ 同图集可合并</text>
            <text x={52} y={156} fontSize="11" fill={success}>+ 同材质可合并</text>
            <text x={52} y={176} fontSize="11" fill={danger}>- 不同图集合打断</text>
            <text x={52} y={192} fontSize="11" fill={danger}>- 层级穿插打断</text>
            <text x={52} y={208} fontSize="11" fill={warning}>! Canvas 分组</text>
          </g>
          {/* 图集管理 */}
          <g>
            <rect x={257} y={76} width={206} height={140} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={360} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>图集管理</text>
            <text x={273} y={120} fontSize="11" fill={primary}>Sprite Atlas</text>
            <text x={273} y={140} fontSize="11" fill={success}>+ 合并碎图</text>
            <text x={273} y={156} fontSize="11" fill={success}>+ 减少纹理切换</text>
            <text x={273} y={176} fontSize="11" fill={success}>+ 按模块拆分</text>
            <text x={273} y={192} fontSize="11" fill={danger}>- 图集过大加载慢</text>
            <text x={273} y={208} fontSize="11" fill={warning}>! 运行时变体</text>
          </g>
          {/* Overdraw */}
          <g>
            <rect x={478} y={76} width={206} height={140} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={581} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>Overdraw 削减</text>
            <text x={494} y={120} fontSize="11" fill={primary}>减少重叠绘制</text>
            <text x={494} y={140} fontSize="11" fill={success}>+ 关闭不可见元素</text>
            <text x={494} y={156} fontSize="11" fill={success}>+ 纯色用Color替代</text>
            <text x={494} y={176} fontSize="11" fill={success}>+ 透明区域裁剪</text>
            <text x={494} y={192} fontSize="11" fill={danger}>- 大量Text导致Overdraw</text>
            <text x={494} y={208} fontSize="11" fill={warning}>! RaycastTarget</text>
          </g>
          {/* 性能指标 */}
          <g>
            <rect x={36} y={228} width={648} height={68} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={52} y={250} fontSize="12" fontWeight="700" fill={primary}>关键性能指标</text>
            <text x={52} y={268} fontSize="11" fill={secondary}>Draw Call：移动端 &lt; 100，PC &lt; 500</text>
            <text x={52} y={284} fontSize="11" fill={secondary}>Overdraw：使用 Frame Debugger 检查重叠区域</text>
            <text x={340} y={268} fontSize="11" fill={secondary}>Canvas 重建频率：静态 UI 与动态 UI 分 Canvas</text>
            <text x={340} y={284} fontSize="11" fill={secondary}>RaycastTarget：纯装饰元素一律关闭</text>
          </g>
          {/* 底部总结 */}
          <g>
            <rect x={36} y={310} width={648} height={64} rx="8" fill={danger} fillOpacity="0.04" stroke={border} strokeWidth="1" />
            <text x={360} y={332} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>优化三步法：先查 Draw Call（合批）→ 再查图集（合并）→ 最后查 Overdraw（削减）</text>
            <text x={360} y={352} textAnchor="middle" fontSize="11" fill={secondary}>静态 UI 和动态 UI 分 Canvas，避免频繁重建整个 UI 树</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        UI 性能优化三大方向：合批减少 Draw Call、图集合并纹理、Overdraw 削减重叠绘制。
      </figcaption>
    </figure>
  );
}
