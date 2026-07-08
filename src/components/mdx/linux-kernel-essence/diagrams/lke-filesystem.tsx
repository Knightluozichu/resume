/**
 * <LkeFilesystemDiagram>：Linux VFS文件系统与Page Cache图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkeFilesystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux VFS文件系统与Page Cache图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            VFS虚拟文件系统——一个read()的全旅程
          </text>

          {/* 用户层 */}
          <rect x="30" y="44" width="680" height="32" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="65" textAnchor="middle" fontSize="11" fill="var(--text-primary)">用户程序：fd = open("/home/file.txt"); read(fd, buf, 4096)</text>

          {/* VFS层 */}
          <rect x="30" y="86" width="680" height="80" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="104" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">VFS 虚拟文件系统层</text>

          {/* VFS四大对象 */}
          <rect x="50" y="112" width="145" height="44" rx="4" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="122" y="127" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">super_block</text>
          <text x="122" y="140" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">文件系统超级块</text>
          <text x="122" y="151" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">s_op 操作表</text>

          <rect x="205" y="112" width="145" height="44" rx="4" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="277" y="127" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">inode</text>
          <text x="277" y="140" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">文件元数据</text>
          <text x="277" y="151" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">i_op / i_fop 操作表</text>

          <rect x="360" y="112" width="145" height="44" rx="4" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="432" y="127" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">dentry</text>
          <text x="432" y="140" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">目录项（路径缓存）</text>
          <text x="432" y="151" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">d_cache 哈希</text>

          <rect x="515" y="112" width="180" height="44" rx="4" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="605" y="127" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">file</text>
          <text x="605" y="140" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">已打开文件实例</text>
          <text x="605" y="151" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">f_op / file.pos 偏移</text>

          {/* Page Cache */}
          <rect x="30" y="176" width="680" height="56" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="194" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Page Cache（页缓存）</text>
          <text x="370" y="210" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">address_space → radix tree / XArray → 以页为单位的缓存</text>
          <text x="370" y="224" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">命中？直接拷贝到用户buf，不命中 → 发起块I/O读请求</text>

          {/* 具体文件系统 */}
          <rect x="30" y="242" width="680" height="50" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">具体文件系统（注册到VFS）</text>
          <rect x="50" y="266" width="95" height="20" rx="3" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="97" y="280" textAnchor="middle" fontSize="8" fill="var(--text-primary)">ext4</text>
          <rect x="155" y="266" width="95" height="20" rx="3" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="202" y="280" textAnchor="middle" fontSize="8" fill="var(--text-primary)">XFS</text>
          <rect x="260" y="266" width="95" height="20" rx="3" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="307" y="280" textAnchor="middle" fontSize="8" fill="var(--text-primary)">Btrfs</text>
          <rect x="365" y="266" width="95" height="20" rx="3" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="412" y="280" textAnchor="middle" fontSize="8" fill="var(--text-primary)">NFS</text>
          <rect x="470" y="266" width="95" height="20" rx="3" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="517" y="280" textAnchor="middle" fontSize="8" fill="var(--text-primary)">F2FS</text>
          <rect x="575" y="266" width="95" height="20" rx="3" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="622" y="280" textAnchor="middle" fontSize="8" fill="var(--text-primary)">proc/sysfs</text>

          {/* 块设备层 */}
          <rect x="30" y="302" width="680" height="56" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="320" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">块设备层（bio → I/O调度 → 设备驱动）</text>
          <text x="370" y="336" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">submit_bio() → I/O调度器（mq-deadline/kyber/none）→ 请求队列 → 设备驱动</text>
          <text x="370" y="350" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">合并相邻请求 / 排序 / 分发到磁盘或SSD</text>

          {/* 流程箭头 */}
          <text x="710" y="60" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">1</text>
          <text x="710" y="124" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">2</text>
          <text x="710" y="204" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">3</text>
          <text x="710" y="266" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">4</text>
          <text x="710" y="330" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">5</text>

          {/* write 路径 */}
          <rect x="30" y="370" width="680" height="65" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="370" y="388" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">write() 路径：先写 Page Cache（标记脏页）→ 异步写回</text>
          <text x="370" y="404" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">write() → 拷贝数据到页缓存 → 标记 dirty → 返回（延迟写）</text>
          <text x="370" y="418" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">写回线程（flusher/kworker）→ writepages() → submit_bio() → 块设备</text>
          <text x="370" y="430" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">fsync() 强制将脏页同步写回磁盘后才返回</text>

          {/* dentry/inode cache */}
          <rect x="30" y="445" width="680" height="42" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="370" y="463" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">目录项缓存（dcache）与inode缓存（icache）</text>
          <text x="370" y="478" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">加速路径查找：open("/a/b/c") → 逐级查dentry → 命中则无需读磁盘</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        VFS用super_block/inode/dentry/file四对象抽象所有文件系统；read经Page Cache加速，write延迟写回；块设备层负责任务调度
      </figcaption>
    </figure>
  );
}
