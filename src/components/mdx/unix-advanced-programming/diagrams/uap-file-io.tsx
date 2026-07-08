/**
 * <UapFileIoDiagram>：文件I/O核心流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function UapFileIoDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="文件I/O核心流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            文件I/O——从用户调用到内核缓冲
          </text>

          {/* 用户空间区域 */}
          <rect x="30" y="48" width="680" height="160" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="50" y="68" fontSize="11" fill="var(--text-secondary)">用户空间（Ring 3）</text>

          <rect x="60" y="82" width="180" height="48" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="150" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">open(path, flags)</text>
          <text x="150" y="118" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">返回 fd 或 -1</text>

          <rect x="280" y="82" width="180" height="48" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">read(fd, buf, n)</text>
          <text x="370" y="118" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">返回读取字节数</text>

          <rect x="500" y="82" width="180" height="48" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="590" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">write(fd, buf, n)</text>
          <text x="590" y="118" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">返回写入字节数</text>

          <text x="150" y="150" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="370" y="150" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="590" y="150" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="60" y="162" width="620" height="36" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="185" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">系统调用接口（syscall 指令 → 内核态）</text>

          {/* 内核空间区域 */}
          <rect x="30" y="220" width="680" height="260" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="50" y="240" fontSize="11" fill="var(--text-secondary)">内核空间（Ring 0）</text>

          {/* fd 表 */}
          <rect x="60" y="252" width="200" height="80" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="160" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">文件描述符表</text>
          <text x="160" y="288" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">fd 0 → stdin</text>
          <text x="160" y="302" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">fd 1 → stdout</text>
          <text x="160" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">fd 2 → stderr</text>
          <text x="160" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">fd 3 → open() 返回</text>

          {/* file 对象 */}
          <rect x="290" y="252" width="200" height="80" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="390" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">file 对象</text>
          <text x="390" y="288" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">f_pos（偏移量）</text>
          <text x="390" y="302" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">f_mode（模式）</text>
          <text x="390" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">f_op（操作集）</text>
          <text x="390" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">f_count（引用计数）</text>

          {/* inode */}
          <rect x="520" y="252" width="160" height="80" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="600" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">inode</text>
          <text x="600" y="288" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">i_size（大小）</text>
          <text x="600" y="302" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">i_blocks（块数）</text>
          <text x="600" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">i_fop（文件操作）</text>
          <text x="600" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">i_sb（超级块）</text>

          {/* 连接箭头 */}
          <line x1="260" y1="292" x2="290" y2="292" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arrUap1)" />
          <line x1="490" y1="292" x2="520" y2="292" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arrUap1)" />
          <defs>
            <marker id="arrUap1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 缓冲区 */}
          <rect x="60" y="352" width="310" height="56" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="215" y="372" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">内核高速缓冲（Buffer Cache）</text>
          <text x="215" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">read 命中 → copy_to_user 直接返回</text>
          <text x="215" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">未命中 → 从磁盘读取到缓冲再返回</text>

          <rect x="390" y="352" width="290" height="56" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="535" y="372" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">延迟写（Delayed Write）</text>
          <text x="535" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">write 先写入缓冲，标记 dirty</text>
          <text x="535" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">pdflush/flush 线程异步刷盘</text>

          {/* 底部说明 */}
          <rect x="60" y="424" width="620" height="40" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="442" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">fcntl(fd, F_GETFL/F_SETFL) 修改文件状态标志</text>
          <text x="370" y="458" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">lseek(fd, offset, SEEK_SET) 修改文件偏移量</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        文件I/O流程：用户调用经系统调用进入内核，经fd表→file对象→inode三级间接寻址，数据经缓冲Cache中转
      </figcaption>
    </figure>
  );
}
