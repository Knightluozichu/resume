import type { ReviewQuestion } from "./types";

export const lkdVirtualFilesystemQuestions: ReviewQuestion[] = [
  {
    id: "lkd-vfs-1",
    chapter: "lkd-virtual-filesystem",
    level: 2,
    question: `VFS（虚拟文件系统）的核心作用是什么？它如何让不同的文件系统对用户透明？`,
    answer:
      `VFS是内核中的一个抽象层，为用户态提供统一的文件操作接口（open/read/write/close/stat等），屏蔽底层不同文件系统（ext4/xfs/btrfs/nfs/proc等）的实现差异。核心机制：①定义通用对象接口——superblock、inode、dentry、file四个核心对象，每个文件系统实现自己的版本；②通过函数指针表（如 inode_operations、file_operations）实现多态——VFS调用 file.f_op->read()，实际执行的是ext4或xfs注册的具体read函数；③用户调用 open("/home/user/file.txt") 时，VFS逐级解析路径，最终调用对应文件系统的函数创建/查找 file 对象，返回文件描述符 fd；④此后 read/write(fd,...) 通过 fd 找到 file 对象，经VFS路由到具体文件系统的实现。用户完全不需要知道底层是ext4还是nfs。`,
    tags: ["VFS", "抽象层"],
  },
  {
    id: "lkd-vfs-2",
    chapter: "lkd-virtual-filesystem",
    level: 2,
    question: `VFS的四个核心对象（superblock/inode/dentry/file）各自的作用和关系是什么？`,
    answer:
      `①superblock——代表一个已挂载的文件系统实例，存储文件系统元信息（块大小、总块数、空闲块数、inode总数等），挂载时从磁盘读取（或虚拟生成）；②inode——代表一个具体文件/目录的元数据（大小、权限、时间戳、数据块位置），每个文件唯一对应一个inode，存储在磁盘上，访问时缓存在内存；③dentry——代表路径的一个目录项，是路径名到inode的映射，如 /home/user 中 home 和 user 各是一个dentry。dentry构成目录树，内核用dentry缓存（dcache）加速路径查找；④file——代表一个进程打开的文件实例，包含偏移量（offset）、打开模式（flags）、指向dentry/inode的指针。同一个文件被多次打开有多个file对象但共享一个inode。关系：superblock → inode → dentry → file，层层关联。`,
    tags: ["VFS", "核心对象"],
  },
  {
    id: "lkd-vfs-3",
    chapter: "lkd-virtual-filesystem",
    level: 3,
    question: `路径查找（path lookup）的过程是怎样的？从 /home/user/file.txt 到最终file对象。`,
    answer:
      `路径查找过程：①从当前进程的根目录或当前工作目录的dentry开始（绝对路径从根 / 的dentry开始）；②逐级解析路径分量：第一个分量 home，在根目录的dentry下查找名为 home 的子dentry——先查dentry缓存（dcache），命中直接用；未命中则调用父目录inode的 lookup 方法（i_op->lookup），具体文件系统从磁盘读取目录项创建新的dentry并关联到对应inode；③对 home 的dentry重复上述过程，解析下一个分量 user；④再解析 file.txt，最终得到 file.txt 的dentry和inode；⑤open() 时根据inode创建新的file对象，设置 file.f_op（从inode获取操作函数表），分配文件描述符fd返回给用户。整个过程中dentry缓存大幅加速重复路径查找。路径中的 . 和 .. 分别指向当前和父dentry，符号链接需要递归解析。`,
    tags: ["VFS", "路径查找"],
  },
  {
    id: "lkd-vfs-4",
    chapter: "lkd-virtual-filesystem",
    level: 4,
    question: `Linux的「一切皆文件」哲学在VFS中是如何实现的？给三个非普通文件的例子。`,
    answer:
      `「一切皆文件」通过VFS的统一接口实现：任何对象只要实现了 file_operations 和 inode_operations 接口，就可以被当作文件操作。三个例子：①设备文件 /dev/ttyS0——字符设备文件，其file_operations由驱动注册（如tty_fops），read/write最终调用驱动的硬件操作函数，用户用标准 read(fd,...) 即可读串口；②proc文件 /proc/cpuinfo——procfs虚拟文件系统，没有实际磁盘数据，file_operations中的read函数在运行时动态生成内容（如读取CPU信息格式化输出），用户 cat /proc/cpuinfo 就像读普通文件一样；③套接字 socket——虽然不是通过open创建（通过socket()系统调用），但内核内部用file对象表示，有file_operations（如sock_read_iter），可以用read/write或epoll操作。VFS让用户态可以用统一的API操作设备、内核信息、网络连接，极大地简化了编程模型。`,
    tags: ["VFS", "设计哲学"],
  },
];
