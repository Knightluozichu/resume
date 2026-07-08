/**
 * <OscFileSystemImplDiagram>：文件系统实现——VFS 层次、inode 结构与日志机制图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function OscFileSystemImplDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="文件系统实现层次与VFS架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            文件系统实现：VFS 层次、inode 结构与日志
          </text>

          {/* VFS 层次架构 */}
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">VFS 虚拟文件系统层次</text>

          <rect x="200" y="64" width="340" height="30" rx="5" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">应用程序（open / read / write / close）</text>

          <rect x="200" y="100" width="340" height="30" rx="5" fill="var(--accent)" fillOpacity="0.20" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">VFS 接口层（统一 API：file_operations）</text>

          <rect x="80" y="136" width="200" height="30" rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="180" y="156" textAnchor="middle" fontSize="10" fill="var(--success)">ext4 文件系统</text>

          <rect x="290" y="136" width="160" height="30" rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="156" textAnchor="middle" fontSize="10" fill="var(--success)">NFS 网络文件</text>

          <rect x="460" y="136" width="200" height="30" rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="560" y="156" textAnchor="middle" fontSize="10" fill="var(--success)">FAT / NTFS</text>

          <rect x="80" y="172" width="580" height="30" rx="5" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">块设备驱动 → 磁盘</text>

          {/* inode 结构 */}
          <text x="170" y="224" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">inode 结构</text>

          <rect x="40" y="238" width="260" height="180" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />

          <text x="60" y="258" fontSize="10" fontWeight="600" fill="var(--accent)">inode（文件元数据）</text>
          <text x="60" y="276" fontSize="9" fill="var(--text-secondary)">文件类型 / 权限</text>
          <text x="60" y="290" fontSize="9" fill="var(--text-secondary)">所有者 UID / GID</text>
          <text x="60" y="304" fontSize="9" fill="var(--text-secondary)">文件大小</text>
          <text x="60" y="318" fontSize="9" fill="var(--text-secondary)">时间戳（创建/修改/访问）</text>
          <text x="60" y="332" fontSize="9" fill="var(--text-secondary)">引用计数</text>

          <text x="60" y="350" fontSize="10" fontWeight="600" fill="var(--warning)">数据块指针</text>
          <text x="60" y="366" fontSize="9" fill="var(--text-secondary)">12 个直接块指针</text>
          <text x="60" y="380" fontSize="9" fill="var(--text-secondary)">1 个一级间接块指针</text>
          <text x="60" y="394" fontSize="9" fill="var(--text-secondary)">1 个二级间接块指针</text>
          <text x="60" y="408" fontSize="9" fill="var(--text-secondary)">1 个三级间接块指针</text>

          {/* 日志机制 */}
          <text x="530" y="224" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">日志文件系统</text>

          <rect x="400" y="238" width="260" height="180" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />

          <text x="530" y="258" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">写操作流程（日志）</text>

          <rect x="420" y="268" width="220" height="24" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="530" y="285" textAnchor="middle" fontSize="9" fill="var(--success)">1. 写日志区（begin + 数据）</text>

          <rect x="420" y="296" width="220" height="24" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="530" y="313" textAnchor="middle" fontSize="9" fill="var(--success)">2. 提交记录（commit）</text>

          <rect x="420" y="324" width="220" height="24" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="530" y="341" textAnchor="middle" fontSize="9" fill="var(--success)">3. 写实际数据块</text>

          <rect x="420" y="352" width="220" height="24" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="530" y="369" textAnchor="middle" fontSize="9" fill="var(--success)">4. 标记日志完成（checkpoint）</text>

          <text x="530" y="392" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">崩溃恢复：检查日志，重做已提交</text>
          <text x="530" y="406" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">未提交的事务直接丢弃</text>

          <text x={VIEW_W / 2} y="440" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            硬链接 = 多个目录项指向同一 inode；软链接 = 独立文件存储目标路径
          </text>
          <text x={VIEW_W / 2} y="456" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            目录 = 特殊文件，内容是文件名 → inode 号的映射表
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        文件系统实现——VFS 虚拟文件系统层次、inode 数据块指针与日志写机制
      </figcaption>
    </figure>
  );
}
