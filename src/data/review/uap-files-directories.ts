import type { ReviewQuestion } from "./types";

export const uapFilesDirectoriesQuestions: ReviewQuestion[] = [
  {
    id: "uap-fd-1",
    chapter: "uap-files-directories",
    level: 2,
    question: `stat、fstat、lstat三个函数有什么区别？lstat对符号链接有什么特殊行为？`,
    answer:
      `三个函数都填充struct stat结构获取文件元信息。stat(path, &st)——通过路径名获取；fstat(fd, &st)——通过已打开的文件描述符获取；lstat(path, &st)——通过路径名获取，但对符号链接返回链接自身的信息而非目标文件。关键区别：stat遇到符号链接会跟随（follow）到目标文件返回目标信息；lstat不跟随，返回链接文件自身的信息（如链接文件的大小、时间戳）。用途：lstat可用于检测一个文件是否是符号链接（S_ISLNK(st.st_mode)），这是stat做不到的——stat对符号链接返回的是目标文件的类型。`,
    tags: ["stat", "符号链接"],
  },
  {
    id: "uap-fd-2",
    chapter: "uap-files-directories",
    level: 3,
    question: `硬链接和符号链接的本质区别是什么？删除原始文件后各自会怎样？`,
    answer:
      `硬链接：多个目录项（dentry）指向同一个inode，它们是等价的——没有「原始」和「链接」之分。inode中有st_nlink计数，删除一个硬链接只是减1，减到0才真正释放数据块。硬链接不能跨文件系统（因为inode号是文件系统内的），不能链接目录（防止环路）。删除任一硬链接不影响其他硬链接访问文件。\n符号链接：一个独立的文件，有自己的inode，存放的是目标路径字符串。删除原始文件后，符号链接变成「悬空链接」（dangling link）——指向不存在的目标，访问时返回ENOENT。符号链接可跨文件系统，可链接目录，但需要额外一次路径解析（跟随链接到目标）。`,
    tags: ["硬链接", "符号链接", "inode"],
  },
  {
    id: "uap-fd-3",
    chapter: "uap-files-directories",
    level: 3,
    question: `UNIX文件类型有哪几种？如何用st_mode判断文件类型？`,
    answer:
      `UNIX文件类型有7种：①普通文件（S_ISREG）——常规数据文件；②目录文件（S_ISDIR）——包含其他文件名和inode号的列表；③字符特殊文件（S_ISCHR）——如终端、键盘，提供字符流I/O；④块特殊文件（S_ISBLK）——如磁盘，提供块随机访问；⑤FIFO/管道（S_ISFIFO）——进程间通信；⑥符号链接（S_ISLNK）——指向另一个文件的路径；⑦套接字（S_ISSOCK）——网络通信端点。判断方法：先用stat或lstat获取struct stat，再用宏S_ISxxx(st.st_mode)判断。注意：st_mode同时包含文件类型（高4位）和权限位（低12位），类型宏只检查类型位。`,
    tags: ["文件类型", "st_mode"],
  },
  {
    id: "uap-fd-4",
    chapter: "uap-files-directories",
    level: 4,
    question: `umask、chmod、chown三个函数分别影响文件的什么属性？为什么创建文件时实际权限是(mode & ~umask)？`,
    answer:
      `umask是进程的文件模式创建屏蔽字，影响新建文件的权限。chmod修改已存在文件的权限位。chown修改文件的属主和属组。\n创建文件时（open的mode参数或creat），实际权限是 mode & ~umask。原因：umask是一个安全保护机制——即使程序指定了宽松权限（如0777），umask（如0022）会屏蔽掉组和其他用户的写权限，实际创建为0755。这防止程序意外创建过于宽松的文件。例如open(path, O_CREAT, 0666)在umask=022下实际创建为0644。umask是进程级属性，fork后子进程继承，shell用umask命令设置。设计哲学：默认安全，显式放宽。`,
    tags: ["权限", "umask", "安全机制"],
  },
];
