/**
 * <UsgOptimizationDiagram>: 性能优化实践
 *
 * CPU/GPU/内存 三维度优化策略
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

export function UsgOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="性能优化实践。CPU、GPU、内存三个维度的优化策略与对应手段。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            性能优化三维矩阵
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            CPU 脚本 / GPU 渲染 / 内存分配
          </text>
          {/* CPU */}
          <g>
            <rect x={36} y={76} width={208} height={290} rx="8" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={140} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>CPU 脚本优化</text>
            <rect x={52} y={110} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={140} y={128} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>缓存 GetComponent 引用</text>
            <rect x={52} y={144} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={140} y={162} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>对象池复用</text>
            <rect x={52} y={178} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={140} y={196} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>避免每帧 Find</text>
            <rect x={52} y={212} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={140} y={230} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>字符串拼接用 StringBuilder</text>
            <rect x={52} y={246} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={140} y={264} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>LINQ 转手动循环</text>
            <text x={140} y={296} textAnchor="middle" fontSize="10" fill={secondary}>Profiler 定位热点</text>
            <text x={140} y={314} textAnchor="middle" fontSize="10" fill={secondary}>逻辑分帧/协程延迟</text>
            <text x={140} y={342} textAnchor="middle" fontSize="10" fill={danger}>GC: 避免热路径分配</text>
          </g>
          {/* GPU */}
          <g>
            <rect x={256} y={76} width={208} height={290} rx="8" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={360} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>GPU 渲染优化</text>
            <rect x={272} y={110} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={128} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>批处理（静态/动态）</text>
            <rect x={272} y={144} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={162} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>GPU Instancing</text>
            <rect x={272} y={178} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={196} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>LOD 分级</text>
            <rect x={272} y={212} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={230} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>遮挡剔除</text>
            <rect x={272} y={246} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={264} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>纹理压缩/图集</text>
            <text x={360} y={296} textAnchor="middle" fontSize="10" fill={secondary}>减少 Draw Call</text>
            <text x={360} y={314} textAnchor="middle" fontSize="10" fill={secondary}>简化 Shader 复杂度</text>
            <text x={360} y={342} textAnchor="middle" fontSize="10" fill={danger}>Overdraw: 控制透明</text>
          </g>
          {/* 内存 */}
          <g>
            <rect x={476} y={76} width={208} height={290} rx="8" fill={warning} fillOpacity="0.05" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={580} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>内存优化</text>
            <rect x={492} y={110} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={580} y={128} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>Resources.UnloadUnused</text>
            <rect x={492} y={144} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={580} y={162} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>AssetBundle 按需加载</text>
            <rect x={492} y={178} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={580} y={196} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>Addressables</text>
            <rect x={492} y={212} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={580} y={230} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>对象池减少实例化</text>
            <rect x={492} y={246} width={176} height={28} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={580} y={264} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>结构体代替小类</text>
            <text x={580} y={296} textAnchor="middle" fontSize="10" fill={secondary}>减少 GC 堆分配</text>
            <text x={580} y={314} textAnchor="middle" fontSize="10" fill={secondary}>纹理/网格内存预算</text>
            <text x={580} y={342} textAnchor="middle" fontSize="10" fill={danger}>泄漏: 事件未取消订阅</text>
          </g>
          <text x={360} y={386} textAnchor="middle" fontSize="11" fill={secondary}>先用 Profiler 测量，再针对性优化，避免过早优化</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        性能优化三维度：CPU（脚本/对象池）、GPU（批处理/LOD）、内存（资源管理/GC）。
      </figcaption>
    </figure>
  );
}
