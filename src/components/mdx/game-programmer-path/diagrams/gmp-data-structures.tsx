/**
 * <GmpDataStructuresDiagram>：数据结构基础图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmpDataStructuresDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数据结构基础图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            数据结构性能对比与游戏场景
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            缓存友好性 &gt; 理论复杂度
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="140" height="100" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">数组</text>
          <text x="140" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">访问 O(1)</text>
          <text x="140" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">插入 O(n)</text>
          <text x="140" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">缓存友好</text>
          <text x="140" y="190" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">渲染对象列表</text>

          <rect x="225" y="100" width="140" height="100" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="295" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">链表</text>
          <text x="295" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">访问 O(n)</text>
          <text x="295" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">插入 O(1)</text>
          <text x="295" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">缓存不友好</text>
          <text x="295" y="190" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">引擎少用</text>

          <rect x="380" y="100" width="140" height="100" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="450" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">哈希表</text>
          <text x="450" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">查找 O(1)</text>
          <text x="450" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无序</text>
          <text x="450" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">冲突 O(n)</text>
          <text x="450" y="190" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">资源管理</text>

          <rect x="535" y="100" width="130" height="100" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="600" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">树</text>
          <text x="600" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">查找 O(log n)</text>
          <text x="600" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">有序</text>
          <text x="600" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">层次结构</text>
          <text x="600" y="190" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">四叉树/八叉树</text>

          <text x={VIEW_W / 2} y="226" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            游戏场景选择指南
          </text>
          <text x={VIEW_W / 2} y="246" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            每帧遍历 → 数组（缓存友好） · 按键查找 → 哈希表
          </text>
          <text x={VIEW_W / 2} y="264" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            空间划分 → 四叉树/八叉树 · 优先级处理 → 优先队列
          </text>

          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="11" fill="var(--warning)">
            常见陷阱：链表理论 O(1) 插入实际比数组 O(n) 慢
          </text>
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            原因：缓存 miss 代价远大于移动几个元素
          </text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            CPU 缓存行 64 字节 → 连续内存一次加载多个元素
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数据结构性能对比——缓存友好性与游戏场景选择
      </figcaption>
    </figure>
  );
}
