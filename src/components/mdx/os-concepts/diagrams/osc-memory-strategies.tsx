/**
 * <OscMemoryStrategiesDiagram>：内存管理策略——连续分配碎片与分页翻译图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function OscMemoryStrategiesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内存管理策略图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内存管理策略：连续分配碎片 vs 分页翻译
          </text>

          {/* 左侧：连续分配与碎片 */}
          <text x="170" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">连续分配（碎片问题）</text>

          <rect x="40" y="70" width="260" height="24" rx="3" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="170" y="86" textAnchor="middle" fontSize="9" fill="var(--warning)">进程 A（已分配）</text>

          <rect x="40" y="98" width="260" height="16" rx="3" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" strokeDasharray="2 2" />
          <text x="170" y="110" textAnchor="middle" fontSize="8" fill="var(--danger)">外部碎片（空闲但太小）</text>

          <rect x="40" y="118" width="260" height="24" rx="3" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="170" y="134" textAnchor="middle" fontSize="9" fill="var(--warning)">进程 B（已分配）</text>

          <rect x="40" y="146" width="260" height="16" rx="3" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" strokeDasharray="2 2" />
          <text x="170" y="158" textAnchor="middle" fontSize="8" fill="var(--danger)">外部碎片</text>

          <rect x="40" y="166" width="260" height="24" rx="3" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="170" y="182" textAnchor="middle" fontSize="9" fill="var(--warning)">进程 C（内部有空洞）</text>

          <text x="170" y="210" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">分配策略</text>
          <text x="170" y="226" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">首次适应：找第一个够大的</text>
          <text x="170" y="240" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">最佳适应：找最小的够大的</text>
          <text x="170" y="254" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">最差适应：找最大的（减少碎片）</text>

          <text x="170" y="280" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">碎片处理</text>
          <text x="170" y="296" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">外部碎片 → 压缩（移动合并）</text>
          <text x="170" y="310" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">内部碎片 → 分配单元内浪费</text>

          {/* 右侧：分页翻译 */}
          <text x="530" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">分页（无外部碎片）</text>

          <text x="530" y="78" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">虚拟地址 → 物理地址</text>

          <rect x="420" y="88" width="220" height="40" rx="5" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="470" y="112" textAnchor="middle" fontSize="9" fill="var(--accent)">页号 p</text>
          <text x="580" y="112" textAnchor="middle" fontSize="9" fill="var(--accent)">偏移 d</text>
          <line x1="530" y1="92" x2="530" y2="124" stroke="var(--border)" strokeWidth="1" />
          <text x="530" y="102" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">虚拟地址</text>

          <text x="530" y="144" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">↓ 页表查找</text>

          {/* 页表 */}
          <rect x="420" y="152" width="220" height="80" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="530" y="170" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">页表 Page Table</text>
          <text x="450" y="188" fontSize="8" fill="var(--text-secondary)">页 0 → 帧 5</text>
          <text x="450" y="202" fontSize="8" fill="var(--text-secondary)">页 1 → 帧 3</text>
          <text x="450" y="216" fontSize="8" fill="var(--text-secondary)">页 2 → 帧 9</text>
          <text x="450" y="228" fontSize="8" fill="var(--text-secondary)">页 3 → 帧 1</text>

          <text x="530" y="248" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">↓ 地址翻译</text>

          <rect x="420" y="256" width="220" height="40" rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="470" y="280" textAnchor="middle" fontSize="9" fill="var(--success)">帧号 f</text>
          <text x="580" y="280" textAnchor="middle" fontSize="9" fill="var(--success)">偏移 d</text>
          <line x1="530" y1="260" x2="530" y2="292" stroke="var(--border)" strokeWidth="1" />
          <text x="530" y="270" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">物理地址</text>

          <text x="530" y="312" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">页大小 = 2 的幂（偏移直接拼接）</text>

          {/* 底部对比 */}
          <rect x="30" y="326" width="680" height="124" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="50" y="348" fontSize="13" fontWeight="600" fill="var(--text-primary)">分页 vs 分段 vs 段页式</text>

          <text x="50" y="372" fontSize="10" fontWeight="600" fill="var(--warning)">分页</text>
          <text x="50" y="388" fontSize="9" fill="var(--text-tertiary)">固定大小页 / 无外部碎片 / 有内部碎片</text>
          <text x="50" y="402" fontSize="9" fill="var(--text-tertiary)">对程序员透明 / 一维地址空间</text>

          <text x="280" y="372" fontSize="10" fontWeight="600" fill="var(--accent)">分段</text>
          <text x="280" y="388" fontSize="9" fill="var(--text-tertiary)">按逻辑段划分 / 有外部碎片 / 无内部</text>
          <text x="280" y="402" fontSize="9" fill="var(--text-tertiary)">对程序员可见 / 二维地址（段号+偏移）</text>

          <text x="510" y="372" fontSize="10" fontWeight="600" fill="var(--success)">段页式</text>
          <text x="510" y="388" fontSize="9" fill="var(--text-tertiary)">先分段再分页 / 结合两者优点</text>
          <text x="510" y="402" fontSize="9" fill="var(--text-tertiary)">三维地址（段号+页号+偏移）</text>

          <text x="50" y="432" fontSize="10" fill="var(--text-secondary)">
            TLB（快表）缓存近期页表项，命中率约 95%+，将访存开销从 2 倍降到接近 1 倍
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内存管理策略——连续分配的碎片问题与分页地址翻译机制
      </figcaption>
    </figure>
  );
}
