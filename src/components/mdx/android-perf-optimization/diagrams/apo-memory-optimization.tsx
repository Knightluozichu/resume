/**
 * <ApoMemoryOptimizationDiagram>：内存优化全景图。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function ApoMemoryOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android内存优化全景图"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android 内存优化全景——泄漏检测/GC/Bitmap/缓存
          </text>

          {/* 堆内存分区图 */}
          <rect x="40" y="60" width="320" height="200" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="200" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">JVM 堆内存结构</text>

          <rect x="60" y="95" width="130" height="50" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="125" y="115" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">新生代</text>
          <text x="125" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Eden + S0 + S1</text>
          <text x="125" y="145" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Minor GC（频繁）</text>

          <rect x="210" y="95" width="130" height="50" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="275" y="115" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">老年代</text>
          <text x="275" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">长期存活对象</text>
          <text x="275" y="145" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Major GC（慢）</text>

          <rect x="60" y="160" width="130" height="45" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="125" y="178" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">元空间</text>
          <text x="125" y="194" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">类元数据</text>

          <rect x="210" y="160" width="130" height="45" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="275" y="178" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">直接内存</text>
          <text x="275" y="194" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Bitmap(8.0前)/NIO</text>

          <text x="200" y="230" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">GC 流程：新生代满 &rarr; Minor GC &rarr; 存活对象晋升老年代 &rarr; 老年代满 &rarr; Major GC（Stop-The-World）</text>

          {/* 右侧：泄漏检测流程 */}
          <rect x="380" y="60" width="320" height="200" rx="8" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="540" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">内存泄漏检测流程</text>

          <rect x="400" y="95" width="280" height="28" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="540" y="113" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">1. Activity.onDestroy() 触发</text>

          <rect x="400" y="131" width="280" height="28" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="540" y="149" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">2. WeakReference 观察回收</text>

          <rect x="400" y="167" width="280" height="28" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="540" y="185" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">3. GC 后仍未回收 &rarr; 疑似泄漏</text>

          <rect x="400" y="203" width="280" height="28" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="540" y="221" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">4. Heap Dump + 引用链分析</text>

          <text x="540" y="248" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">LeakCanary 自动化完成 1-4 步</text>

          {/* 底部：优化策略矩阵 */}
          <rect x="40" y="285" width="660" height="200" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="308" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">内存优化策略矩阵</text>

          <rect x="60" y="320" width="200" height="65" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="160" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Bitmap 优化</text>
          <text x="160" y="356" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">inSampleSize 采样压缩</text>
          <text x="160" y="370" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">RGB_565 / 硬件位图</text>
          <text x="160" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Glide/Fresco 自动管理</text>

          <rect x="270" y="320" width="200" height="65" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="370" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">缓存策略</text>
          <text x="370" y="356" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">LruCache 内存缓存</text>
          <text x="370" y="370" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">DiskLruCache 磁盘缓存</text>
          <text x="370" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">onTrimMemory 释放</text>

          <rect x="480" y="320" width="200" height="65" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="580" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">对象池复用</text>
          <text x="580" y="356" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Message.obtain() 复用</text>
          <text x="580" y="370" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ListView ViewHolder</text>
          <text x="580" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Pools.SynchronizedPool</text>

          <rect x="60" y="400" width="200" height="65" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="160" y="420" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">泄漏修复</text>
          <text x="160" y="436" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">静态内部类+WeakRef</text>
          <text x="160" y="450" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">onDestroy 移除 Handler</text>
          <text x="160" y="460" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">反注册监听器</text>

          <rect x="270" y="400" width="200" height="65" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="370" y="420" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">内存抖动</text>
          <text x="370" y="436" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">避免循环内创建对象</text>
          <text x="370" y="450" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">对象池复用</text>
          <text x="370" y="460" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">StringBuilder 替代拼接</text>

          <rect x="480" y="400" width="200" height="65" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="580" y="420" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">大内存管理</text>
          <text x="580" y="436" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">largeHeap=true</text>
          <text x="580" y="450" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">分页加载/懒加载</text>
          <text x="580" y="460" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Native 内存规避堆限制</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android内存优化全景——JVM堆结构、泄漏检测流程、Bitmap/缓存/对象池/泄漏修复六大策略矩阵
      </figcaption>
    </figure>
  );
}
