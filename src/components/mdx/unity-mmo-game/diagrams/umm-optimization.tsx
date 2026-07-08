/**
 * <UmmOptimizationDiagram>：网游性能优化图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function UmmOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="网游性能优化图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Unity MMO 性能优化全景
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            客户端渲染 / 逻辑内存 / 网络带宽 三条优化线
          </text>

          {/* 左列：渲染优化 */}
          <rect x="30" y="70" width="210" height="280" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="135" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">渲染优化</text>

          <rect x="45" y="106" width="180" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="126" textAnchor="middle" fontSize="10" fill="var(--success)">Draw Call 合批（SRP Batcher）</text>

          <rect x="45" y="146" width="180" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="166" textAnchor="middle" fontSize="10" fill="var(--success)">LOD 多层级模型</text>

          <rect x="45" y="186" width="180" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="206" textAnchor="middle" fontSize="10" fill="var(--success)">遮挡剔除（Occlusion Culling）</text>

          <rect x="45" y="226" width="180" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="246" textAnchor="middle" fontSize="10" fill="var(--success)">GPU Instancing</text>

          <rect x="45" y="266" width="180" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="286" textAnchor="middle" fontSize="10" fill="var(--success)">纹理压缩（ASTC/ETC2）</text>

          <rect x="45" y="306" width="180" height="32" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="135" y="326" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">目标：稳定 60 FPS</text>

          {/* 中列：逻辑与内存优化 */}
          <rect x="265" y="70" width="210" height="280" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">逻辑与内存</text>

          <rect x="280" y="106" width="180" height="32" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="126" textAnchor="middle" fontSize="10" fill="var(--warning)">对象池（特效/子弹/UI）</text>

          <rect x="280" y="146" width="180" height="32" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="166" textAnchor="middle" fontSize="10" fill="var(--warning)">字符串池 / StringBuilder</text>

          <rect x="280" y="186" width="180" height="32" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="206" textAnchor="middle" fontSize="10" fill="var(--warning)">GC 控制（避免装箱）</text>

          <rect x="280" y="226" width="180" height="32" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="246" textAnchor="middle" fontSize="10" fill="var(--warning)">ECS/DOTS 重构热点</text>

          <rect x="280" y="266" width="180" height="32" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="286" textAnchor="middle" fontSize="10" fill="var(--warning)">资源卸载（UnloadUnusedAssets）</text>

          <rect x="280" y="306" width="180" height="32" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="370" y="326" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">目标：零 GC Spike</text>

          {/* 右列：网络优化 */}
          <rect x="500" y="70" width="210" height="280" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="605" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">网络带宽</text>

          <rect x="515" y="106" width="180" height="32" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="605" y="126" textAnchor="middle" fontSize="10" fill="var(--accent)">Protobuf 压缩（字段编号）</text>

          <rect x="515" y="146" width="180" height="32" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="605" y="166" textAnchor="middle" fontSize="10" fill="var(--accent)">增量同步（只发变化字段）</text>

          <rect x="515" y="186" width="180" height="32" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="605" y="206" textAnchor="middle" fontSize="10" fill="var(--accent)">AOI 视野裁剪</text>

          <rect x="515" y="226" width="180" height="32" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="605" y="246" textAnchor="middle" fontSize="10" fill="var(--accent)">消息合并（一帧打包发送）</text>

          <rect x="515" y="266" width="180" height="32" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="605" y="286" textAnchor="middle" fontSize="10" fill="var(--accent)">位域压缩（位置量化）</text>

          <rect x="515" y="306" width="180" height="32" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="605" y="326" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">目标：带宽 &lt; 50 KB/s</text>

          {/* 底部总结 */}
          <rect x="30" y="366" width="680" height="56" rx="8" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="386" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：先用 Profiler 量化瓶颈，再按渲染/逻辑/网络三条线分别优化
          </text>
          <text x={VIEW_W / 2} y="404" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            优化原则：不要过早优化——测量 &gt; 猜测，帧时间预算 &gt; 绝对数字
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        网游性能优化全景——渲染、逻辑内存、网络带宽三条优化线
      </figcaption>
    </figure>
  );
}
