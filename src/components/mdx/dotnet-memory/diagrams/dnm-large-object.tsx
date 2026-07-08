/**
 * <DnmLargeObjectDiagram>：大对象堆（LOH）布局与碎片化。
 *
 * 左侧：SOH（小对象堆）压缩前后对比。
 * 右侧：LOH 不压缩导致碎片化。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function DnmLargeObjectDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="大对象堆 LOH 布局与碎片化。左侧对比 SOH 小对象堆的压缩效果，右侧展示 LOH 不压缩导致的内存碎片。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            大对象堆（LOH）布局与碎片化
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            SOH 压缩整理 · LOH 不压缩 → 碎片化风险
          </text>

          {/* 左侧：SOH 压缩 */}
          <text x={180} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            SOH 小对象堆（Gen0-2）
          </text>

          {/* 压缩前 */}
          <text x={60} y={100} fontSize="11" fill={secondary}>回收前：</text>
          <rect x={60} y={106} width={30} height={24} rx="3" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1" />
          <rect x={90} y={106} width={30} height={24} rx="3" fill={elevated} stroke={danger} strokeWidth="1" strokeDasharray="2 2" />
          <rect x={120} y={106} width={30} height={24} rx="3" fill={success} fillOpacity="0.15" stroke={success} strokeWidth="1" />
          <rect x={150} y={106} width={30} height={24} rx="3" fill={elevated} stroke={danger} strokeWidth="1" strokeDasharray="2 2" />
          <rect x={180} y={106} width={30} height={24} rx="3" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1" />
          <rect x={210} y={106} width={30} height={24} rx="3" fill={success} fillOpacity="0.15" stroke={success} strokeWidth="1" />
          <text x={255} y={122} fontSize="10" fill={danger}>虚线 = 垃圾</text>

          <line x1={120} y1={138} x2={180} y2={138} stroke={accent} strokeWidth="1.2" markerEnd="url(#dnm-lo-a1)" />
          <text x={150} y={132} textAnchor="middle" fontSize="10" fill={secondary}>压缩</text>

          {/* 压缩后 */}
          <text x={60} y={158} fontSize="11" fill={secondary}>回收后：</text>
          <rect x={60} y={164} width={30} height={24} rx="3" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1" />
          <rect x={90} y={164} width={30} height={24} rx="3" fill={success} fillOpacity="0.15" stroke={success} strokeWidth="1" />
          <rect x={120} y={164} width={30} height={24} rx="3" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1" />
          <rect x={150} y={164} width={30} height={24} rx="3" fill={success} fillOpacity="0.15" stroke={success} strokeWidth="1" />
          <rect x={180} y={164} width={60} height={24} rx="3" fill={elevated} stroke={border} strokeWidth="1" strokeDasharray="2 2" />
          <text x={210} y={180} textAnchor="middle" fontSize="10" fill={secondary}>空闲</text>
          <text x={255} y={180} fontSize="10" fill={success}>连续空闲</text>

          {/* 分隔线 */}
          <line x1={360} y1={76} x2={360} y2={200} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 右侧：LOH 碎片化 */}
          <text x={540} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>
            LOH 大对象堆（不压缩）
          </text>

          {/* LOH 回收前 */}
          <text x={400} y={100} fontSize="11" fill={secondary}>回收前：</text>
          <rect x={400} y={106} width={50} height={24} rx="3" fill={warning} fillOpacity="0.15" stroke={warning} strokeWidth="1" />
          <rect x={450} y={106} width={40} height={24} rx="3" fill={elevated} stroke={danger} strokeWidth="1" strokeDasharray="2 2" />
          <rect x={490} y={106} width={60} height={24} rx="3" fill={warning} fillOpacity="0.15" stroke={warning} strokeWidth="1" />
          <rect x={550} y={106} width={45} height={24} rx="3" fill={elevated} stroke={danger} strokeWidth="1" strokeDasharray="2 2" />
          <rect x={595} y={106} width={55} height={24} rx="3" fill={warning} fillOpacity="0.15" stroke={warning} strokeWidth="1" />

          <line x1={520} y1={138} x2={580} y2={138} stroke={danger} strokeWidth="1.2" markerEnd="url(#dnm-lo-a2)" />
          <text x={550} y={132} textAnchor="middle" fontSize="10" fill={secondary}>不压缩</text>

          {/* LOH 回收后 */}
          <text x={400} y={158} fontSize="11" fill={secondary}>回收后：</text>
          <rect x={400} y={164} width={50} height={24} rx="3" fill={warning} fillOpacity="0.15" stroke={warning} strokeWidth="1" />
          <rect x={450} y={164} width={40} height={24} rx="3" fill={elevated} stroke={border} strokeWidth="1" strokeDasharray="2 2" />
          <rect x={490} y={164} width={60} height={24} rx="3" fill={warning} fillOpacity="0.15" stroke={warning} strokeWidth="1" />
          <rect x={550} y={164} width={45} height={24} rx="3" fill={elevated} stroke={border} strokeWidth="1" strokeDasharray="2 2" />
          <rect x={595} y={164} width={55} height={24} rx="3" fill={warning} fillOpacity="0.15" stroke={warning} strokeWidth="1" />
          <text x={400} y={200} fontSize="10" fill={danger}>碎片化：空闲空间不连续</text>

          {/* 下方：LOH 阈值与影响 */}
          <line x1={32} y1={216} x2={VIEW_W - 32} y2={216} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          <text x={VIEW_W / 2} y={238} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            LOH 关键特征
          </text>

          <rect x={50} y={252} width={180} height={120} rx="8" fill={elevated} stroke={warning} strokeWidth="1.2" />
          <text x={140} y={272} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>阈值</text>
          <text x={140} y={292} textAnchor="middle" fontSize="10" fill={secondary}>&gt;= 85,000 字节</text>
          <text x={140} y={308} textAnchor="middle" fontSize="10" fill={secondary}>直接分配到 LOH</text>
          <text x={140} y={328} textAnchor="middle" fontSize="10" fill={secondary}>属 Gen2 视角</text>
          <text x={140} y={348} textAnchor="middle" fontSize="10" fill={secondary}>回收 = Full GC</text>

          <rect x={270} y={252} width={180} height={120} rx="8" fill={elevated} stroke={danger} strokeWidth="1.2" />
          <text x={360} y={272} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>不压缩</text>
          <text x={360} y={292} textAnchor="middle" fontSize="10" fill={secondary}>大对象复制成本高</text>
          <text x={360} y={308} textAnchor="middle" fontSize="10" fill={secondary}>空闲空间碎片化</text>
          <text x={360} y={328} textAnchor="middle" fontSize="10" fill={secondary}>总空闲够但连续不够</text>
          <text x={360} y={348} textAnchor="middle" fontSize="10" fill={secondary}>→ OOM 风险</text>

          <rect x={490} y={252} width={180} height={120} rx="8" fill={elevated} stroke={success} strokeWidth="1.2" />
          <text x={580} y={272} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>优化策略</text>
          <text x={580} y={292} textAnchor="middle" fontSize="10" fill={secondary}>ArrayPool&lt;T&gt; 租用</text>
          <text x={580} y={308} textAnchor="middle" fontSize="10" fill={secondary}>MemoryPool&lt;T&gt;</text>
          <text x={580} y={328} textAnchor="middle" fontSize="10" fill={secondary}>对象池复用</text>
          <text x={580} y={348} textAnchor="middle" fontSize="10" fill={secondary}>避免频繁大分配</text>

          <defs>
            <marker id="dnm-lo-a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="dnm-lo-a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={danger} />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y={396} textAnchor="middle" fontSize="11" fill={secondary}>
            .NET 4.5.1+ 可用 GCSettings.LargeObjectHeapCompactionMode 临时压缩 LOH
          </text>
          <text x={VIEW_W / 2} y={412} textAnchor="middle" fontSize="11" fill={secondary}>
            但代价是 Full GC 停顿——仅在确认碎片严重时使用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SOH 每次回收压缩整理碎片；LOH 不压缩导致碎片化，需用 ArrayPool 或对象池缓解。
      </figcaption>
    </figure>
  );
}
