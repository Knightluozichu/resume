/**
 * <UapFilesDirectoriesDiagram>：文件与目录结构图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function UapFilesDirectoriesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="文件与目录结构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            文件与目录——stat结构与目录遍历
          </text>

          {/* stat 结构体 */}
          <rect x="30" y="48" width="340" height="200" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="200" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">struct stat 成员</text>

          <text x="50" y="90" fontSize="11" fill="var(--text-secondary)">st_mode</text>
          <text x="180" y="90" fontSize="10" fill="var(--text-tertiary)">文件类型 + 权限位</text>
          <text x="50" y="108" fontSize="11" fill="var(--text-secondary)">st_ino</text>
          <text x="180" y="108" fontSize="10" fill="var(--text-tertiary)">inode 编号</text>
          <text x="50" y="126" fontSize="11" fill="var(--text-secondary)">st_dev</text>
          <text x="180" y="126" fontSize="10" fill="var(--text-tertiary)">所在设备号</text>
          <text x="50" y="144" fontSize="11" fill="var(--text-secondary)">st_nlink</text>
          <text x="180" y="144" fontSize="10" fill="var(--text-tertiary)">硬链接数</text>
          <text x="50" y="162" fontSize="11" fill="var(--text-secondary)">st_uid / st_gid</text>
          <text x="180" y="162" fontSize="10" fill="var(--text-tertiary)">属主ID / 属组ID</text>
          <text x="50" y="180" fontSize="11" fill="var(--text-secondary)">st_size</text>
          <text x="180" y="180" fontSize="10" fill="var(--text-tertiary)">文件字节数</text>
          <text x="50" y="198" fontSize="11" fill="var(--text-secondary)">st_atime</text>
          <text x="180" y="198" fontSize="10" fill="var(--text-tertiary)">最后访问时间</text>
          <text x="50" y="216" fontSize="11" fill="var(--text-secondary)">st_mtime</text>
          <text x="180" y="216" fontSize="10" fill="var(--text-tertiary)">最后修改时间</text>
          <text x="50" y="234" fontSize="11" fill="var(--text-secondary)">st_ctime</text>
          <text x="180" y="234" fontSize="10" fill="var(--text-tertiary)">inode最后更改时间</text>

          {/* 文件类型判断 */}
          <rect x="390" y="48" width="320" height="200" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="550" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">文件类型宏</text>

          <text x="410" y="92" fontSize="11" fill="var(--text-secondary)">S_ISREG(m)</text>
          <text x="540" y="92" fontSize="10" fill="var(--text-tertiary)">普通文件</text>
          <text x="410" y="110" fontSize="11" fill="var(--text-secondary)">S_ISDIR(m)</text>
          <text x="540" y="110" fontSize="10" fill="var(--text-tertiary)">目录文件</text>
          <text x="410" y="128" fontSize="11" fill="var(--text-secondary)">S_ISCHR(m)</text>
          <text x="540" y="128" fontSize="10" fill="var(--text-tertiary)">字符特殊文件</text>
          <text x="410" y="146" fontSize="11" fill="var(--text-secondary)">S_ISBLK(m)</text>
          <text x="540" y="146" fontSize="10" fill="var(--text-tertiary)">块特殊文件</text>
          <text x="410" y="164" fontSize="11" fill="var(--text-secondary)">S_ISFIFO(m)</text>
          <text x="540" y="164" fontSize="10" fill="var(--text-tertiary)">管道/FIFO</text>
          <text x="410" y="182" fontSize="11" fill="var(--text-secondary)">S_ISLNK(m)</text>
          <text x="540" y="182" fontSize="10" fill="var(--text-tertiary)">符号链接</text>
          <text x="410" y="200" fontSize="11" fill="var(--text-secondary)">S_ISSOCK(m)</text>
          <text x="540" y="200" fontSize="10" fill="var(--text-tertiary)">套接字</text>

          {/* 权限位 */}
          <rect x="410" y="214" width="280" height="24" rx="4" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="550" y="231" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">rwxrwxrwx = 0777</text>

          {/* 目录操作流程 */}
          <rect x="30" y="264" width="680" height="120" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="284" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">目录遍历流程</text>

          <rect x="50" y="296" width="150" height="40" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="125" y="314" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">opendir</text>
          <text x="125" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">打开目录流</text>

          <text x="215" y="318" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="235" y="296" width="150" height="40" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="310" y="314" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">readdir</text>
          <text x="310" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">逐条返回 dirent</text>

          <text x="400" y="318" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="420" y="296" width="150" height="40" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="495" y="314" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">readdir ...</text>
          <text x="495" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">循环直到 NULL</text>

          <text x="585" y="318" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="605" y="296" width="95" height="40" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="652" y="314" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">closedir</text>
          <text x="652" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">关闭目录流</text>

          <text x="370" y="362" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">dirent.d_name → 文件名  dirent.d_ino → inode号</text>
          <text x="370" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可用 stat(path, &amp;st) 获取每个文件的详细信息</text>

          {/* 链接对比 */}
          <rect x="30" y="398" width="330" height="82" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="418" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">硬链接（hard link）</text>
          <text x="50" y="438" fontSize="10" fill="var(--text-secondary)">link(old, new) 创建</text>
          <text x="50" y="454" fontSize="10" fill="var(--text-secondary)">多个目录项指向同一 inode</text>
          <text x="50" y="470" fontSize="10" fill="var(--text-secondary)">不能跨文件系统，不能链接目录</text>

          <rect x="380" y="398" width="330" height="82" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="418" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">符号链接（symlink）</text>
          <text x="400" y="438" fontSize="10" fill="var(--text-secondary)">symlink(actual, sym) 创建</text>
          <text x="400" y="454" fontSize="10" fill="var(--text-secondary)">独立 inode，存放目标路径字符串</text>
          <text x="400" y="470" fontSize="10" fill="var(--text-secondary)">可跨文件系统，可链接目录</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        文件与目录：stat结构提供文件元信息，opendir/readdir遍历目录条目，硬链接共享inode而符号链接是独立文件
      </figcaption>
    </figure>
  );
}
