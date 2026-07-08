/**
 * <CapVirtualMemoryDiagram>：虚拟内存图解（地址翻译/页表/TLB/缺页）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function CapVirtualMemoryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="虚拟内存图解：三重作用、地址翻译、多级页表与TLB、缺页处理"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            虚拟内存
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            三重作用 · 地址翻译 · 多级页表与 TLB · 缺页与按需调页
          </text>

          {/* 三重作用 */}
          <text x={VIEW_W / 2} y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">虚拟内存的三重作用</text>
          <rect x="30" y="86" width="218" height="80" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="139" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">隔离</text>
          <text x="139" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每进程独立页表</text>
          <text x="139" y="144" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">同虚拟地址→不同物理页</text>
          <text x="139" y="160" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">进程互不可见</text>

          <rect x="261" y="86" width="218" height="80" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">扩展</text>
          <text x="370" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">虚拟(256TB)远大于物理</text>
          <text x="370" y="144" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">未访问页不占物理内存</text>
          <text x="370" y="160" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">按需调页 + 换出</text>

          <rect x="492" y="86" width="218" height="80" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="601" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">共享</text>
          <text x="601" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">共享库映射同一物理页</text>
          <text x="601" y="144" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">千百进程共享一份 libc</text>
          <text x="601" y="160" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">权限位提供保护</text>

          {/* 地址翻译流程 */}
          <rect x="30" y="180" width="335" height="160" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="197" y="202" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">地址翻译流程</text>
          <rect x="50" y="214" width="135" height="26" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="117" y="231" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--danger)">虚拟地址 V</text>
          <text x="197" y="231" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">分两段</text>
          <rect x="50" y="246" width="80" height="24" rx="3" fill="var(--warning)" fillOpacity="0.22" stroke="var(--warning)" strokeWidth="1" />
          <text x="90" y="262" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--warning)">VPN</text>
          <rect x="135" y="246" width="80" height="24" rx="3" fill="var(--success)" fillOpacity="0.22" stroke="var(--success)" strokeWidth="1" />
          <text x="175" y="262" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--success)">VPO</text>
          <text x="197" y="286" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">VPN 查页表 → PFN</text>
          <text x="197" y="304" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PFN + VPO(=PPO) → 物理地址</text>
          <rect x="50" y="312" width="135" height="22" rx="4" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1" />
          <text x="117" y="327" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--success)">PTE: PFN+有效位+权限</text>
          <text x="197" y="334" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">有效位=0 触发缺页</text>

          {/* 多级页表与 TLB */}
          <rect x="380" y="180" width="330" height="160" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="202" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">多级页表 与 TLB</text>
          <rect x="400" y="214" width="290" height="44" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="545" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">多级页表：解决「页表太大」</text>
          <text x="545" y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">单级需 512GB，4 级每级9位按需分配</text>
          <rect x="400" y="266" width="290" height="44" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="284" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">TLB：解决「查表太慢」</text>
          <text x="545" y="302" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">页表项硬件缓存，命中1周期，99%+命中</text>
          <text x="545" y="326" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">miss 走 page table walker</text>
          <text x="545" y="338" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">大页(2MB/1GB)减少项数提升 TLB 命中率</text>

          {/* 缺页与按需调页 */}
          <rect x="30" y="356" width="680" height="76" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="378" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">缺页处理 + 按需调页 + 写时复制</text>
          <text x={VIEW_W / 2} y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">有效位=0 → 异常 → 内核检查合法性 → 读入/零填充页 → 更新PTE → 重执行指令</text>
          <text x={VIEW_W / 2} y="416" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">malloc 只预留虚拟空间，首次写才分配物理页 · fork 父子共享只读页，写时复制</text>
          <text x={VIEW_W / 2} y="456" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：malloc 不立即分配物理内存，首次写入触发缺页才真正占用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        虚拟内存——三重作用、地址翻译、多级页表与 TLB、缺页与按需调页
      </figcaption>
    </figure>
  );
}
