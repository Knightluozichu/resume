/**
 * <OscMassStorageDiagram>：大容量存储——磁盘结构、RAID 级别与磁盘调度图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function OscMassStorageDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="大容量存储RAID与磁盘调度图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            大容量存储：磁盘调度 + RAID 级别
          </text>

          {/* 左侧：磁盘调度 */}
          <text x="170" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">磁盘调度算法</text>
          <text x="170" y="72" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">请求队列：98, 183, 37, 122, 14, 124, 65, 67</text>
          <text x="170" y="86" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">磁头起始：53</text>

          <text x="40" y="106" fontSize="10" fontWeight="600" fill="var(--warning)">FCFS（先来先服务）</text>
          <text x="40" y="120" fontSize="9" fill="var(--text-tertiary)">53→98→183→37→122→14→124→65→67</text>
          <text x="40" y="134" fontSize="9" fill="var(--text-tertiary)">总寻道 = 640 柱面（来回跳）</text>

          <text x="40" y="156" fontSize="10" fontWeight="600" fill="var(--accent)">SCAN（电梯算法）</text>
          <text x="40" y="170" fontSize="9" fill="var(--text-tertiary)">向 0 扫：53→37→14→0</text>
          <text x="40" y="184" fontSize="9" fill="var(--text-tertiary)">再向 199 扫：0→65→67→98→122→124→183</text>
          <text x="40" y="198" fontSize="9" fill="var(--text-tertiary)">总寻道 = 236 柱面（单向扫）</text>

          <text x="40" y="220" fontSize="10" fontWeight="600" fill="var(--danger)">C-SCAN（循环扫描）</text>
          <text x="40" y="234" fontSize="9" fill="var(--text-tertiary)">只向一个方向扫到头</text>
          <text x="40" y="248" fontSize="9" fill="var(--text-tertiary)">到头后跳回起点重新扫</text>
          <text x="40" y="262" fontSize="9" fill="var(--text-tertiary)">各位置等待时间更均匀</text>

          <text x="40" y="284" fontSize="10" fontWeight="600" fill="var(--success)">LOOK / C-LOOK</text>
          <text x="40" y="298" fontSize="9" fill="var(--text-tertiary)">SCAN 变体：不到端点</text>
          <text x="40" y="312" fontSize="9" fill="var(--text-tertiary)">扫到最远请求即折返</text>

          <text x="170" y="340" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">SSTF 最短寻道时间优先</text>
          <text x="170" y="354" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">选离当前磁头最近的请求</text>
          <text x="170" y="368" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">问题：远端请求可能饥饿</text>

          {/* 右侧：RAID 级别 */}
          <text x="530" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">RAID 磁盘冗余阵列</text>

          <rect x="400" y="70" width="260" height="42" rx="5" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="530" y="88" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">RAID 0 条带化</text>
          <text x="530" y="103" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">无冗余 / 最快 / 无容错</text>

          <rect x="400" y="118" width="260" height="42" rx="5" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="530" y="136" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">RAID 1 镜像</text>
          <text x="530" y="151" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">完全复制 / 容错强 / 利用率 50%</text>

          <rect x="400" y="166" width="260" height="42" rx="5" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="530" y="184" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">RAID 4 奇偶校验</text>
          <text x="530" y="199" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">块级条带 + 专用校验盘 / 写瓶颈</text>

          <rect x="400" y="214" width="260" height="42" rx="5" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="530" y="232" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">RAID 5 分布式校验</text>
          <text x="530" y="247" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">校验分散各盘 / 容错 1 盘 / 最常用</text>

          <rect x="400" y="262" width="260" height="42" rx="5" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="530" y="280" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">RAID 6 双校验</text>
          <text x="530" y="295" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">容错 2 盘 / 校验开销更大</text>

          <rect x="400" y="310" width="260" height="42" rx="5" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="530" y="328" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">RAID 1+0 镜像+条带</text>
          <text x="530" y="343" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">先镜像再条带 / 高性能高可靠</text>

          {/* 底部总结 */}
          <rect x="30" y="370" width="680" height="80" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="50" y="392" fontSize="13" fontWeight="600" fill="var(--text-primary)">磁盘结构与访问时间</text>
          <text x="50" y="412" fontSize="10" fill="var(--text-secondary)">访问时间 = 寻道时间（移动磁臂） + 旋转延迟（等扇区转到磁头下） + 传输时间</text>
          <text x="50" y="430" fontSize="10" fill="var(--text-tertiary)">寻道是最慢的（ms 级），所以调度算法以减少寻道距离为核心目标</text>
          <text x="50" y="445" fontSize="10" fill="var(--text-tertiary)">SSD 无机械寻道，调度算法意义不大，但磨损均衡（wear leveling）成为新课题</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        大容量存储——磁盘调度算法（FCFS/SCAN/C-SCAN）与 RAID 级别对比
      </figcaption>
    </figure>
  );
}
