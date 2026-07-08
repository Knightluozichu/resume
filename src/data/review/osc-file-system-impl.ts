import type { ReviewQuestion } from "./types";

export const oscFileSystemImplQuestions: ReviewQuestion[] = [
  {
    id: "osc-file-system-impl-1",
    chapter: "osc-file-system-impl",
    level: 2,
    question: "VFS（虚拟文件系统）的作用是什么？它如何让不同文件系统共用统一 API？",
    answer:
      "VFS 是内核中的一个抽象层，为应用程序提供统一的文件操作接口（open/read/write/close），屏蔽底层不同文件系统（ext4、FAT、NFS、NTFS）的实现差异。VFS 定义了四个核心对象：①超级块（superblock）——文件系统整体信息；②inode——文件元数据+数据块指针；③目录项（dentry）——目录到文件的映射；④文件对象（file）——打开文件的上下文（读写位置等）。每种文件系统只需实现这些对象的操作函数集（file_operations/inode_operations）。应用程序调 `read(fd, buf, n)` 时，VFS 通过 fd 找到文件对象，调用其 `read` 方法，底层自动分派到 ext4 或 NFS 的实现。VFS 让「一切皆文件」的 Unix 哲学成为可能——设备、网络套接字、管道都可以用同一套 API 操作。",
    tags: ["VFS", "虚拟文件系统", "抽象层"],
  },
  {
    id: "osc-file-system-impl-2",
    chapter: "osc-file-system-impl",
    level: 3,
    question: "inode 的数据块指针结构（直接/一级/二级/三级间接）如何兼顾小文件和大文件？",
    answer:
      "inode 包含 12 个直接块指针、1 个一级间接块指针、1 个二级间接块指针、1 个三级间接块指针。假设块大小 4KB、指针 4 字节：①12 个直接指针覆盖 12 × 4KB = 48KB——小文件直接存完，一次访盘取数据。②一级间接：一个间接块存 1024 个指针，覆盖 1024 × 4KB = 4MB——中等文件需两次访盘（先取间接块，再取数据块）。③二级间接：1024 × 1024 个指针，覆盖 4GB——大文件需三次访盘。④三级间接：覆盖 4TB——超大文件需四次访盘。这种指数式扩展使小文件极快（直接指针一次访盘），大文件虽慢但能支持到 TB 级。这是一个经典的「分级索引」设计——用少量指针覆盖极大范围，同时在常见情况（小文件）保持高效。",
    tags: ["inode", "数据块指针", "文件系统"],
  },
  {
    id: "osc-file-system-impl-3",
    chapter: "osc-file-system-impl",
    level: 3,
    question: "日志文件系统（如 ext4）如何保证崩溃一致性？日志的写入流程是什么？",
    answer:
      "传统文件系统崩溃时可能半完成：元数据更新了但数据没写，或目录改了但 inode 没改——导致文件系统不一致。日志文件系统的解法是「先写日志再写实际数据」：①写日志区：记录这次修改的事务（begin + 元数据变更 + 数据）；②提交记录：日志区写入 commit 标记，表示事务完整；③写实际位置：把变更写到文件系统的实际位置（数据块、inode、目录项）；④检查点：标记日志中该事务已完成，可覆写。崩溃恢复时扫描日志：有 commit 标记的事务重做（redo），没有 commit 的事务丢弃（undo）。这保证了「要么全做要么全不做」的原子性。代价是写入开销加倍（先日志后实际），所以 ext4 允许选择 journal=ordered（只日志元数据，数据先写）或 journal=writeback（不保证数据顺序）来权衡安全性和性能。",
    tags: ["日志文件系统", "崩溃一致性", "ext4"],
  },
  {
    id: "osc-file-system-impl-4",
    chapter: "osc-file-system-impl",
    level: 4,
    question: "硬链接和软链接（符号链接）在 inode 层面有什么本质区别？删除原文件后各有什么表现？",
    answer:
      "硬链接：多个目录项指向同一个 inode（同一 inode 号）。文件真正删除的条件是 inode 引用计数降为 0——只要还有一个硬链接，文件数据就不会被回收。所以删除原文件后，硬链接仍可正常访问数据（inode 还活着，引用计数减 1）。限制：不能跨文件系统（inode 号是局部的）、不能链接目录（防止循环）。软链接（符号链接）：一个特殊文件，内容是目标文件的路径字符串。软链接有自己的独立 inode，只是存储了目标路径。删除原文件后，软链接变成「悬空链接」——指向的路径不存在了，访问会报错。软链接可以跨文件系统、可以链接目录。本质区别：硬链接是 inode 层面的别名（共享 inode），软链接是路径层面的重定向（独立 inode 存路径）。",
    tags: ["硬链接", "软链接", "inode"],
  },
];
