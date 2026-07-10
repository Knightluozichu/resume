import type { ReviewQuestion } from "./types";

export const mosFileSystemQuestions: ReviewQuestion[] = [
  {
    id: "mos-file-system-1",
    chapter: "mos-file-system",
    level: 2,
    question: `为什么 inode 不存文件名？这种设计有什么好处？`,
    answer:
      `文件名存在目录项（dentry）中而非 inode 里，好处有三：①支持硬链接——同一个 inode 可以有多个文件名（多个目录项指向同一 inode），若文件名存在 inode 里则一个文件只能有一个名字。link_count 记录有多少个目录项指向该 inode，归零才真正回收。②解耦元数据与命名——inode 专注存「文件是什么」（大小/权限/块指针），目录专注存「文件叫什么」，职责单一。③路径解析高效——目录项是「名 → inode 号」的小条目，一个 4KB 块能放上百个目录项，解析路径时按块读、按名查，缓存友好。代价是删除文件要扫目录找到所有指向该 inode 的项（硬链接跨目录），但 link_count 让「是否真正回收」的判断 O(1)。`,
    tags: ["inode", "目录项", "硬链接"],
  },
  {
    id: "mos-file-system-2",
    chapter: "mos-file-system",
    level: 3,
    question: `描述 open(\"/home/user/data.txt\") 的路径解析全过程。`,
    answer:
      `①读根目录 inode（约定 inode 2）；②在根目录的数据块里查 \"home\" → 得到 home 的 inode 号；③读 home 的 inode → 读其数据块查 \"user\" → 得 user inode 号；④读 user 的 inode → 读其数据块查 \"data.txt\" → 得目标 inode 号；⑤读目标 inode → 拿到数据块指针 → 读磁盘块 → 返回字节。每一步都是「在目录文件的数据块里查名字对应的 inode 号」，目录的本质是「文件名 → inode 号」的映射表。目录本身也有 inode（特殊文件），根目录 inode 号是约定的（如 ext4 的 2）。这就是为什么路径越深解析越慢（每级一次目录 I/O），也是为什么内核缓存 dentry（目录项缓存）至关重要。`,
    tags: ["路径解析", "目录", "inode"],
  },
  {
    id: "mos-file-system-3",
    chapter: "mos-file-system",
    level: 3,
    question: `硬链接和软链接有什么区别？为什么删除大文件瞬间完成？`,
    answer:
      `硬链接：目录项多写一个名字指向同一 inode，link_count++，共享数据，删一个名字只 link_count--，归零才真正回收 inode 和数据块；不能跨文件系统（inode 号是文件系统内的）、不能链接目录（防环）。软链接（符号链接）：一个特殊文件，内容是「目标路径字符串」，解析时读出路径再重新走路径解析；可跨文件系统、可链接目录，但目标删了则悬空（dangling）。删除大文件瞬间完成的原因：删除只做两件事——①把目录项与 inode 解链（link_count--）；②若归零，把 inode 标记空闲、数据块在位图标记空闲。数据块的字节一个没动——它们还在原位，只是被标记为「可覆盖」。所以误删文件可恢复（扫磁盘找未覆盖旧块），安全擦除要专门覆写（如 shred）。`,
    tags: ["硬链接", "软链接", "文件删除"],
  },
  {
    id: "mos-file-system-4",
    chapter: "mos-file-system",
    level: 4,
    question: `日志结构文件系统（LFS）和传统文件系统的日志（journaling）分别解决什么问题？动机有什么不同？`,
    answer:
      `LFS 的核心动机是「磁盘顺序写远快于随机写」——机械盘随机写要寻道（毫秒级），顺序写接近带宽上限；SSD 随机写也有写放大。LFS 把所有修改顺序追加到日志末尾，让磁盘始终顺序写，用段清理回收旧版本垃圾。它求的是「性能」。传统文件系统引入日志（journaling）的动机是「崩溃一致性」——原地更新时，若写到一半崩溃，文件系统元数据可能不一致，需要 fsck 扫描全盘修复（很慢）。日志的做法：先把修改记录写入日志区（顺序写、快），日志落盘后才更新数据区。崩溃后只需检查日志——完整则重做、不完整则丢弃，恢复从「扫描全盘」降为「回放日志」，秒级恢复。它求的是「一致性」。LFS 是把整个文件系统做成日志求性能，日志是把日志作为崩溃恢复工具求一致性，两者「用顺序写解决不同问题」。`,
    tags: ["LFS", "日志", "崩溃一致性"],
  },
];
