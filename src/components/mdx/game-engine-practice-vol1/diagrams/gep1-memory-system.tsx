/**
 * <Gep1MemorySystemDiagram>：内存分配器对比图解（栈分配器/对象池/单帧分配器）。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 430;

export function Gep1MemorySystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内存分配器对比图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            三种引擎内存分配器对比
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            帧内不用 malloc —— 自定义分配器让分配时间可预测、碎片可控
          </text>

          {/* 栈分配器 */}
          <rect x="40" y="72" width="200" height="300" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">栈分配器</text>
          <rect x="56" y="108" width="168" height="24" rx="4" fill="var(--success)" fillOpacity="0.25" />
          <text x="140" y="124" textAnchor="middle" fontSize="10" fill="var(--text-primary)">已分配（指针上推）</text>
          <rect x="56" y="136" width="168" height="24" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" strokeDasharray="3 3" />
          <text x="140" y="152" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">空闲</text>
          <text x="140" y="180" textAnchor="middle" fontSize="11" fill="var(--text-primary)">特征</text>
          <text x="140" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">LIFO 后进先出</text>
          <text x="140" y="216" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Marker 一次回滚</text>
          <text x="140" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">零碎片</text>
          <text x="140" y="262" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">适用</text>
          <text x="140" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">帧内临时数据</text>
          <text x="140" y="298" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">字符串格式化</text>
          <text x="140" y="314" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">中间计算结果</text>
          <text x="140" y="346" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">O(1) 分配/释放</text>

          {/* 对象池 */}
          <rect x="260" y="72" width="200" height="300" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">对象池</text>
          {Array.from({ length: 4 }).map((_, i) => (
            <g key={i}>
              <rect x="278" y={108 + i * 26} width="80" height="22" rx="4" fill="var(--accent)" fillOpacity={i % 2 === 0 ? 0.25 : 0.1} stroke="var(--accent)" strokeWidth="0.8" />
              <rect x="366" y={108 + i * 26} width="78" height="22" rx="4" fill="var(--accent)" fillOpacity={i % 2 === 1 ? 0.25 : 0.1} stroke="var(--accent)" strokeWidth="0.8" />
            </g>
          ))}
          <text x="318" y="222" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">在用</text>
          <text x="405" y="222" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">空闲</text>
          <text x="360" y="248" textAnchor="middle" fontSize="11" fill="var(--text-primary)">特征</text>
          <text x="360" y="268" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">固定大小槽位</text>
          <text x="360" y="284" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">空闲链表管理</text>
          <text x="360" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">取出/归还复用</text>
          <text x="360" y="330" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">适用</text>
          <text x="360" y="348" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">子弹/粒子/网络包</text>
          <text x="360" y="364" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">无碎片 / O(1)</text>

          {/* 单帧分配器 */}
          <rect x="480" y="72" width="200" height="300" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="580" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">单帧分配器</text>
          <rect x="498" y="108" width="164" height="40" rx="4" fill="var(--warning)" fillOpacity="0.2" />
          <text x="580" y="124" textAnchor="middle" fontSize="10" fill="var(--text-primary)">第 N 帧数据</text>
          <text x="580" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">帧结束自动清零</text>
          <text x="580" y="170" textAnchor="middle" fontSize="22" fill="var(--text-tertiary)">&circlearrow;</text>
          <text x="580" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每帧重置指针</text>
          <text x="580" y="226" textAnchor="middle" fontSize="11" fill="var(--text-primary)">特征</text>
          <text x="580" y="246" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">栈分配器的特例</text>
          <text x="580" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">生命周期 = 一帧</text>
          <text x="580" y="278" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无需手动释放</text>
          <text x="580" y="308" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">适用</text>
          <text x="580" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">逐帧临时缓冲</text>
          <text x="580" y="344" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">事件参数拷贝</text>
          <text x="580" y="360" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">零开销回收</text>

          <text x={VIEW_W / 2} y="402" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            组合策略：临时用栈 / 高频小对象用池 / 逐帧数据用单帧分配器
          </text>
          <text x={VIEW_W / 2} y="420" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            分配器把不可控的 malloc 换成可预测的指针移动 + 链表操作
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种内存分配器对比——栈分配器适合临时数据、对象池适合高频小对象、单帧分配器适合逐帧缓冲
      </figcaption>
    </figure>
  );
}
