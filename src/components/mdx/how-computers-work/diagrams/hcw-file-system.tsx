/**
 * <HcwFileSystemDiagram>：文件系统原理图解——目录树、inode 与存储方式。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HcwFileSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="文件系统原理图解——目录树、inode 与存储方式"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            文件系统：目录树、inode 与磁盘存储
          </text>

          {/* 左上：目录树 */}
          <rect x="30" y="48" width="250" height="200" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="155" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">目录树结构</text>

          {/* 根目录 */}
          <rect x="120" y="78" width="70" height="24" rx="6" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1" />
          <text x="155" y="94" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)" fontFamily="monospace">/</text>

          {/* 分支线 */}
          <line x1="155" y1="102" x2="80" y2="118" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="155" y1="102" x2="155" y2="118" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="155" y1="102" x2="230" y2="118" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* home 目录 */}
          <rect x="55" y="118" width="60" height="22" rx="5" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="85" y="133" textAnchor="middle" fontSize="9" fill="var(--warning)" fontFamily="monospace">home/</text>

          {/* etc 目录 */}
          <rect x="130" y="118" width="50" height="22" rx="5" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="155" y="133" textAnchor="middle" fontSize="9" fill="var(--warning)" fontFamily="monospace">etc/</text>

          {/* bin 目录 */}
          <rect x="205" y="118" width="50" height="22" rx="5" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="230" y="133" textAnchor="middle" fontSize="9" fill="var(--warning)" fontFamily="monospace">bin/</text>

          {/* home 下分支 */}
          <line x1="85" y1="140" x2="60" y2="156" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="85" y1="140" x2="110" y2="156" stroke="var(--text-tertiary)" strokeWidth="1" />

          <rect x="40" y="156" width="45" height="20" rx="5" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="62" y="170" textAnchor="middle" fontSize="8" fill="var(--danger)" fontFamily="monospace">a.txt</text>

          <rect x="92" y="156" width="45" height="20" rx="5" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="114" y="170" textAnchor="middle" fontSize="8" fill="var(--danger)" fontFamily="monospace">b.txt</text>

          <text x="155" y="190" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">目录 = 文件名→inode 映射表</text>
          <text x="155" y="206" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">文件名存在目录项中</text>
          <text x="155" y="222" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">inode 存文件元数据+数据块地址</text>
          <text x="155" y="238" textAnchor="middle" fontSize="8" fill="var(--accent)">硬链接 = 多个文件名→同一 inode</text>

          {/* 右上：inode 结构 */}
          <rect x="300" y="48" width="410" height="200" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="505" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">inode（索引节点）结构</text>

          <rect x="320" y="78" width="160" height="160" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="400" y="94" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">inode #42</text>
          <line x1="335" y1="100" x2="465" y2="100" stroke="var(--border)" strokeWidth="0.8" />
          <text x="330" y="114" textAnchor="start" fontSize="8" fill="var(--text-secondary)">大小: 4096B</text>
          <text x="330" y="128" textAnchor="start" fontSize="8" fill="var(--text-secondary)">权限: rw-r--r--</text>
          <text x="330" y="142" textAnchor="start" fontSize="8" fill="var(--text-secondary)">所有者: user</text>
          <text x="330" y="156" textAnchor="start" fontSize="8" fill="var(--text-secondary)">时间: ctime/mtime</text>
          <text x="330" y="170" textAnchor="start" fontSize="8" fill="var(--text-secondary)">引用计数: 2</text>
          <line x1="335" y1="176" x2="465" y2="176" stroke="var(--border)" strokeWidth="0.8" />
          <text x="330" y="190" textAnchor="start" fontSize="8" fill="var(--danger)" fontWeight="600">数据块地址:</text>
          <text x="330" y="204" textAnchor="start" fontSize="8" fill="var(--text-tertiary)" fontFamily="monospace">→ block 1024</text>
          <text x="330" y="218" textAnchor="start" fontSize="8" fill="var(--text-tertiary)" fontFamily="monospace">→ block 2048</text>
          <text x="330" y="232" textAnchor="start" fontSize="8" fill="var(--text-tertiary)" fontFamily="monospace">→ block 3072</text>

          {/* 数据块 */}
          <text x="540" y="94" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">磁盘数据块</text>
          <rect x="500" y="100" width="60" height="30" rx="5" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="530" y="118" textAnchor="middle" fontSize="8" fill="var(--danger)" fontFamily="monospace">blk 1024</text>

          <rect x="570" y="100" width="60" height="30" rx="5" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="600" y="118" textAnchor="middle" fontSize="8" fill="var(--danger)" fontFamily="monospace">blk 2048</text>

          <rect x="640" y="100" width="60" height="30" rx="5" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="670" y="118" textAnchor="middle" fontSize="8" fill="var(--danger)" fontFamily="monospace">blk 3072</text>

          {/* 连接线 */}
          <line x1="465" y1="200" x2="530" y2="130" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="465" y1="214" x2="600" y2="130" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="465" y1="228" x2="670" y2="130" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeDasharray="3 2" />

          <text x="505" y="160" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">inode 不存文件名 · 文件名在目录项</text>
          <text x="505" y="178" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">ls -i 查看 inode 号</text>
          <text x="505" y="196" textAnchor="middle" fontSize="8" fill="var(--accent)">重命名/移动只改目录项，不动数据</text>
          <text x="505" y="214" textAnchor="middle" fontSize="8" fill="var(--accent)">NTFS 用 MFT，概念类似实现不同</text>

          {/* 底部：存储方式 */}
          <rect x="30" y="264" width="680" height="80" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="284" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">磁盘存储方式对比</text>

          <rect x="50" y="294" width="190" height="42" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="145" y="310" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">连续分配</text>
          <text x="145" y="324" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">读快 · 碎片 · 不可增长</text>

          <rect x="260" y="294" width="190" height="42" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="355" y="310" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">链式分配</text>
          <text x="355" y="324" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">无碎片 · 随机慢 · 指针易损</text>

          <rect x="470" y="294" width="190" height="42" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="565" y="310" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">索引分配</text>
          <text x="565" y="324" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">随机快 · 无碎片 · ext4/NTFS</text>

          {/* 日志 */}
          <rect x="30" y="358" width="680" height="82" rx="10" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="378" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">日志文件系统：解决断电一致性</text>
          <text x="50" y="396" textAnchor="start" fontSize="9" fill="var(--text-secondary)">传统 FS：断电后全盘 fsck 扫描，大磁盘数十分钟</text>
          <text x="50" y="412" textAnchor="start" fontSize="9" fill="var(--text-secondary)">日志 FS：写数据前先记日志 → 执行 → 完成后清除日志</text>
          <text x="50" y="428" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">断电重启只需重放/撤销日志，几秒恢复 · ext4(data=ordered) · NTFS(事务日志)</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        文件系统原理图解——目录树结构、inode 索引节点、三种磁盘存储方式、日志文件系统
      </figcaption>
    </figure>
  );
}
