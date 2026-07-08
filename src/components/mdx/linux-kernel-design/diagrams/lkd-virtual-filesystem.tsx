/**
 * <LkdVirtualFilesystemDiagram>：VFS虚拟文件系统——四对象与路径查找图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkdVirtualFilesystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="VFS虚拟文件系统四对象与路径查找图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            VFS虚拟文件系统——四核心对象与路径查找
          </text>

          {/* VFS 抽象层 */}
          <rect x="30" y="46" width="680" height="36" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="69" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">VFS 抽象层（open / read / write / close 统一接口）</text>

          {/* 四个核心对象 */}
          {/* superblock */}
          <rect x="30" y="96" width="160" height="100" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="110" y="116" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">superblock</text>
          <text x="40" y="134" fontSize="9" fill="var(--text-secondary)">已挂载的文件系统</text>
          <text x="40" y="150" fontSize="9" fill="var(--text-secondary)">块大小/总块数</text>
          <text x="40" y="166" fontSize="9" fill="var(--text-secondary)">空闲块/inode数</text>
          <text x="40" y="182" fontSize="9" fill="var(--text-tertiary)">挂载时从磁盘读取</text>

          {/* inode */}
          <rect x="205" y="96" width="160" height="100" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="285" y="116" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">inode</text>
          <text x="215" y="134" fontSize="9" fill="var(--text-secondary)">文件/目录元数据</text>
          <text x="215" y="150" fontSize="9" fill="var(--text-secondary)">大小/权限/时间戳</text>
          <text x="215" y="166" fontSize="9" fill="var(--text-secondary)">数据块位置</text>
          <text x="215" y="182" fontSize="9" fill="var(--text-tertiary)">每个文件唯一inode</text>

          {/* dentry */}
          <rect x="380" y="96" width="160" height="100" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="460" y="116" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">dentry</text>
          <text x="390" y="134" fontSize="9" fill="var(--text-secondary)">目录项(路径分量)</text>
          <text x="390" y="150" fontSize="9" fill="var(--text-secondary)">名字→inode映射</text>
          <text x="390" y="166" fontSize="9" fill="var(--text-secondary)">构成目录树</text>
          <text x="390" y="182" fontSize="9" fill="var(--text-tertiary)">dcache缓存加速查找</text>

          {/* file */}
          <rect x="555" y="96" width="155" height="100" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="632" y="116" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">file</text>
          <text x="565" y="134" fontSize="9" fill="var(--text-secondary)">已打开的文件实例</text>
          <text x="565" y="150" fontSize="9" fill="var(--text-secondary)">偏移量 offset</text>
          <text x="565" y="166" fontSize="9" fill="var(--text-secondary)">打开模式 flags</text>
          <text x="565" y="182" fontSize="9" fill="var(--text-tertiary)">多次打开=多file共1inode</text>

          {/* 关系箭头 */}
          <line x1="190" y1="146" x2="203" y2="146" stroke="var(--text-tertiary)" strokeWidth="1" markerEnd="url(#arr5)" />
          <line x1="365" y1="146" x2="378" y2="146" stroke="var(--text-tertiary)" strokeWidth="1" markerEnd="url(#arr5)" />
          <line x1="540" y1="146" x2="553" y2="146" stroke="var(--text-tertiary)" strokeWidth="1" markerEnd="url(#arr5)" />

          {/* 路径查找流程 */}
          <rect x="30" y="212" width="680" height="200" rx="8" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="232" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">路径查找 open("/home/user/file.txt")</text>

          <rect x="50" y="244" width="150" height="50" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="125" y="264" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">1. 解析 /</text>
          <text x="125" y="280" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">根目录dentry</text>

          <rect x="215" y="244" width="150" height="50" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="290" y="264" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">2. 查 home</text>
          <text x="290" y="280" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">dcache→i_op-&gt;lookup</text>

          <rect x="380" y="244" width="150" height="50" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="455" y="264" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">3. 查 user</text>
          <text x="455" y="280" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">逐级重复</text>

          <rect x="545" y="244" width="150" height="50" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="620" y="264" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">4. 查 file.txt</text>
          <text x="620" y="280" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ dentry+inode</text>

          <line x1="200" y1="269" x2="213" y2="269" stroke="var(--text-tertiary)" strokeWidth="1" markerEnd="url(#arr5)" />
          <line x1="365" y1="269" x2="378" y2="269" stroke="var(--text-tertiary)" strokeWidth="1" markerEnd="url(#arr5)" />
          <line x1="530" y1="269" x2="543" y2="269" stroke="var(--text-tertiary)" strokeWidth="1" markerEnd="url(#arr5)" />

          {/* 创建file对象 */}
          <rect x="50" y="306" width="640" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="326" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">5. 创建 file 对象: 设置 f_op(inode操作函数表) → 分配 fd → 返回给用户</text>
          <text x="370" y="342" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">后续 read(fd,...) → fd找file → file.f_op-&gt;read → VFS路由到ext4/xfs/nfs具体实现</text>

          {/* 一切皆文件 */}
          <rect x="50" y="366" width="640" height="36" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="382" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">「一切皆文件」: /dev/ttyS0(设备) / /proc/cpuinfo(内核信息) / socket(网络) 都是file对象</text>
          <text x="370" y="396" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">只要实现 file_operations 接口, 就能用 open/read/write 统一操作</text>

          {/* 底部 */}
          <rect x="30" y="424" width="680" height="60" rx="6" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="50" y="444" fontSize="10" fontWeight="600" fill="var(--text-primary)">多态分发: VFS调用 file.f_op-&gt;read(), 实际执行ext4或xfs注册的具体函数</text>
          <text x="50" y="460" fontSize="9" fill="var(--text-secondary)">用户无需知道底层文件系统类型; 新文件系统只需实现superblock/inode/dentry/file接口</text>
          <text x="50" y="474" fontSize="9" fill="var(--text-tertiary)">函数指针表 file_operations / inode_operations / super_operations 实现「机制与策略分离」</text>

          <defs>
            <marker id="arr5" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-tertiary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        VFS虚拟文件系统——superblock/inode/dentry/file四核心对象，路径查找经dcache缓存，函数指针表实现多态分发
      </figcaption>
    </figure>
  );
}
