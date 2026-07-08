/**
 * <MosDiskSchedulingDiagram>：五种磁盘调度算法的磁臂移动路径图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function MosDiskSchedulingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="五种磁盘调度算法磁臂移动路径图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            磁盘调度五算法：磁臂移动路径对比
          </text>
          <text x={VIEW_W / 2} y="46" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            请求队列 98,183,37,122,14,124,65,67；磁头起始 53；柱面范围 0-199
          </text>

          {/* FCFS 路径 */}
          <text x="60" y="78" fontSize="11" fontWeight="600" fill="var(--warning)">FCFS（640）</text>
          <line x1="60" y1="90" x2="680" y2="90" stroke="var(--border)" strokeWidth="0.6" />
          {[
            { x: 60, y: 90, t: "53" },
            { x: 90, y: 90, t: "98" },
            { x: 150, y: 90, t: "183" },
            { x: 185, y: 90, t: "37" },
            { x: 235, y: 90, t: "122" },
            { x: 270, y: 90, t: "14" },
            { x: 325, y: 90, t: "124" },
            { x: 360, y: 90, t: "65" },
          ].map((p, i) => (
            <g key={`fcfs-${i}`}>
              <circle cx={p.x} cy={p.y} r="3" fill="var(--warning)" />
              <text x={p.x} y={p.y - 6} textAnchor="middle" fontSize="7" fill="var(--text-tertiary)">{p.t}</text>
              {i > 0 && <path d={`M ${p.x - 30} ${p.y} L ${p.x} ${p.y}`} stroke="var(--warning)" strokeWidth="1" fill="none" />}
            </g>
          ))}

          {/* SSTF 路径 */}
          <text x="60" y="118" fontSize="11" fontWeight="600" fill="var(--accent)">SSTF（236）</text>
          <line x1="60" y1="130" x2="680" y2="130" stroke="var(--border)" strokeWidth="0.6" />
          {[
            { x: 60, t: "53" },
            { x: 75, t: "65" },
            { x: 78, t: "67" },
            { x: 95, t: "37" },
            { x: 110, t: "14" },
            { x: 150, t: "98" },
            { x: 190, t: "122" },
            { x: 195, t: "124" },
            { x: 250, t: "183" },
          ].map((p, i) => (
            <g key={`sstf-${i}`}>
              <circle cx={p.x} cy="130" r="3" fill="var(--accent)" />
              <text x={p.x} y="124" textAnchor="middle" fontSize="7" fill="var(--text-tertiary)">{p.t}</text>
            </g>
          ))}

          {/* SCAN 路径 */}
          <text x="60" y="158" fontSize="11" fontWeight="600" fill="var(--danger)">SCAN 电梯</text>
          <line x1="60" y1="170" x2="680" y2="170" stroke="var(--border)" strokeWidth="0.6" />
          <path d="M 60 170 L 75 170 L 78 170 L 110 170 L 150 170 L 155 170 L 200 170 L 210 170" stroke="var(--danger)" strokeWidth="1.2" fill="none" />
          <path d="M 210 170 L 200 170 L 150 170 L 110 170 L 78 170 L 75 170 L 40 170" stroke="var(--danger)" strokeWidth="1" fill="none" strokeDasharray="3 2" />
          <text x="180" y="164" fontSize="8" fill="var(--danger)">→ 向大扫到 183</text>
          <text x="150" y="184" fontSize="8" fill="var(--danger)">← 折返扫到 14</text>

          {/* C-SCAN 路径 */}
          <text x="60" y="198" fontSize="11" fontWeight="600" fill="var(--success)">C-SCAN</text>
          <line x1="60" y1="210" x2="680" y2="210" stroke="var(--border)" strokeWidth="0.6" />
          <path d="M 60 210 L 75 210 L 78 210 L 110 210 L 150 210 L 155 210 L 200 210" stroke="var(--success)" strokeWidth="1.2" fill="none" />
          <path d="M 200 210 L 60 210" stroke="var(--success)" strokeWidth="1" fill="none" strokeDasharray="3 2" />
          <text x="160" y="204" fontSize="8" fill="var(--success)">→ 单向服务</text>
          <text x="150" y="224" fontSize="8" fill="var(--success)">← 快速返回重扫</text>

          {/* 三段时间模型 */}
          <rect x="40" y="250" width="660" height="90" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="272" fontSize="13" fontWeight="600" fill="var(--text-primary)">磁盘访问三段时间（寻道是主要瓶颈）</text>

          <rect x="60" y="286" width="180" height="40" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="150" y="304" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">寻道时间</text>
          <text x="150" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">磁臂移柱面 5-10ms</text>

          <rect x="260" y="286" width="180" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="350" y="304" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">旋转延迟</text>
          <text x="350" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">盘片转半转 4-6ms</text>

          <rect x="460" y="286" width="180" height="40" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="550" y="304" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">传输时间</text>
          <text x="550" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">读扇区 微秒级</text>

          {/* SSD 注记 */}
          <rect x="40" y="356" width="660" height="96" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="60" y="378" fontSize="12" fontWeight="600" fill="var(--accent)">SSD：调度算法意义减弱</text>
          <text x="60" y="398" fontSize="10" fill="var(--text-secondary)">无磁臂 → 任意逻辑块访问时间几乎相同，无寻道几何关系</text>
          <text x="60" y="416" fontSize="10" fill="var(--text-secondary)">关注：磨损均衡（wear leveling）/ 垃圾回收 / TRIM</text>
          <text x="60" y="434" fontSize="10" fill="var(--text-tertiary)">FTL 闪存转换层隐藏真实物理位置，OS 看到的是逻辑地址</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        FCFS/SSTF/SCAN/C-SCAN/LOOK 五种磁盘调度算法磁臂移动路径与三段时间模型、SSD 对比
      </figcaption>
    </figure>
  );
}
