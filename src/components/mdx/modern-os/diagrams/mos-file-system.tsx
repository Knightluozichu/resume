/**
 * <MosFileSystemDiagram>：inode 结构与路径解析链路图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function MosFileSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="inode 结构与路径解析图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            inode 结构与路径解析链路
          </text>

          {/* 左侧：inode 结构 */}
          <text x="180" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">inode 内部结构</text>

          <rect x="40" y="72" width="280" height="230" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />

          <text x="56" y="92" fontSize="10" fontWeight="600" fill="var(--text-secondary)">元数据</text>
          <text x="56" y="108" fontSize="9" fill="var(--text-tertiary)">mode | uid | gid | size | timestamps</text>

          <text x="56" y="132" fontSize="10" fontWeight="600" fill="var(--warning)">12 个直接块指针</text>
          <text x="56" y="146" fontSize="9" fill="var(--text-tertiary)">→ 12 × 4KB = 48KB（小文件直接覆盖）</text>
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={`d-${i}`} x={56 + i * 20} y="154" width="16" height="12" rx="2" fill="var(--warning)" fillOpacity="0.4" stroke="var(--warning)" strokeWidth="0.8" />
          ))}

          <text x="56" y="184" fontSize="10" fontWeight="600" fill="var(--accent)">1 个一级间接指针</text>
          <text x="56" y="198" fontSize="9" fill="var(--text-tertiary)">→ 指针块 1024 项 → 4MB</text>
          <rect x="56" y="206" width="248" height="12" rx="2" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="0.8" />

          <text x="56" y="232" fontSize="10" fontWeight="600" fill="var(--danger)">1 个二级间接指针</text>
          <text x="56" y="246" fontSize="9" fill="var(--text-tertiary)">→ 1024 × 1024 项 → 4GB</text>
          <rect x="56" y="254" width="248" height="12" rx="2" fill="var(--danger)" fillOpacity="0.3" stroke="var(--danger)" strokeWidth="0.8" />

          <text x="56" y="280" fontSize="10" fontWeight="600" fill="var(--success)">1 个三级间接指针</text>
          <text x="56" y="294" fontSize="9" fill="var(--text-tertiary)">→ 1024³ 项 → 4TB</text>
          <rect x="56" y="302" width="248" height="12" rx="2" fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="0.8" />

          {/* 右侧：路径解析 */}
          <text x="540" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">路径解析：open("/home/user/data.txt")</text>

          <rect x="380" y="76" width="320" height="40" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="540" y="100" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">读根目录 inode（约定 #2）</text>

          <text x="540" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">↓ 查 "home"</text>

          <rect x="380" y="138" width="320" height="40" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="540" y="162" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">读 home 目录 → 查 "user"</text>

          <text x="540" y="190" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">↓ 得 user inode 号</text>

          <rect x="380" y="200" width="320" height="40" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="540" y="224" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">读 user 目录 → 查 "data.txt"</text>

          <text x="540" y="252" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">↓ 得目标 inode 号</text>

          <rect x="380" y="262" width="320" height="40" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="286" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">读 inode → 数据块指针 → 读磁盘块</text>

          {/* 底部：硬链接 vs 软链接 */}
          <rect x="40" y="320" width="660" height="130" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="342" fontSize="12" fontWeight="600" fill="var(--text-primary)">硬链接 vs 软链接（目录项不存于 inode，存文件名）</text>

          <text x="60" y="364" fontSize="10" fill="var(--accent)">硬链接：目录项多写一个名字 → 同一 inode，link_count++</text>
          <text x="60" y="380" fontSize="10" fill="var(--text-tertiary)">删一个名字只 link_count--，归零才回收；不能跨文件系统/链接目录</text>

          <text x="60" y="404" fontSize="10" fill="var(--warning)">软链接：一个特殊文件，内容 = 目标路径字符串</text>
          <text x="60" y="420" fontSize="10" fill="var(--text-tertiary)">解析时读路径重新走解析；目标删了则悬空（dangling）；可跨文件系统</text>

          <text x="60" y="442" fontSize="10" fill="var(--danger)">删除文件只解链 inode + 标记数据块空闲，字节未擦 → 可恢复 / 瞬间完成</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        inode 内部结构（直接/间接/二级/三级块指针）与路径解析链路、硬链接与软链接对比
      </figcaption>
    </figure>
  );
}
