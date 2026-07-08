/**
 * <UmsPerformanceProfilingDiagram>：性能分析两把手术刀图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UmsPerformanceProfilingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="性能分析两把手术刀图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">性能分析两把手术刀</text>

          {/* Profiler */}
          <rect x="40" y="60" width="310" height="160" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="195" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">Profiler</text>
          <text x="195" y="105" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">逐帧性能时间线分析</text>
          <text x="195" y="128" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">CPU 模块：GC.Alloc / Physics / Scripts</text>
          <text x="195" y="144" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">GPU 模块：渲染耗时</text>
          <text x="195" y="160" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Memory 模块：托管堆 / 原生内存</text>
          <text x="195" y="176" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Rendering 模块：DrawCall / SetPass</text>
          <text x="195" y="196" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Hierarchy 视图按耗时降序</text>
          <text x="195" y="212" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">BeginSample / EndSample 精细标记</text>

          {/* Frame Debugger */}
          <rect x="370" y="60" width="310" height="160" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="525" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">Frame Debugger</text>
          <text x="525" y="105" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">逐 DrawCall 渲染拆解</text>
          <text x="525" y="128" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">每个 DrawCall 的状态</text>
          <text x="525" y="144" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">材质 / 纹理 / Shader</text>
          <text x="525" y="160" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">批处理状态：Batched / Not</text>
          <text x="525" y="176" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">渲染顺序可视化</text>
          <text x="525" y="196" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">排查 "Not Batched" 原因</text>
          <text x="525" y="212" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">材质不同 / 顶点超限 / 光照贴图</text>

          {/* 标准流程 */}
          <rect x="40" y="245" width="640" height="50" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="267" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">标准流程：Profiler 定位瓶颈类型 &rarr; 对应工具深入 &rarr; 优化 &rarr; 验证</text>
          <text x="360" y="285" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CPU 逻辑 &rarr; 查 GC.Alloc | CPU 渲染 &rarr; 查 DrawCall | GPU &rarr; Frame Debugger | 内存 &rarr; Memory Profiler</text>

          {/* GC 陷阱 */}
          <text x="360" y="325" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">关键区分：GC.Alloc（分配）vs GC.Collect（回收）</text>
          <text x="360" y="345" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">GC.Alloc 产生垃圾 &rarr; 积累触发 GC.Collect &rarr; 暂停主线程几十毫秒 &rarr; 帧率暴跌</text>
          <text x="360" y="365" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">热路径目标：零 GC.Alloc（对象池 / StringBuilder / 预分配 / 缓存 LINQ）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        性能分析精要——Profiler + Frame Debugger
      </figcaption>
    </figure>
  );
}
