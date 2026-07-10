/** 复习题库 · UNIX 系统接口（krc-unix-interface）。K&R 第 8 章改编。 */

import type { ReviewQuestion } from "./types";

export const krcUnixInterfaceQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "krc-ui-1",
    chapter: "krc-unix-interface",
    level: 1,
    question: `UNIX 中文件描述符（fd）是什么？程序启动时默认打开了哪三个 fd？`,
    answer:
      `文件描述符是一个非负整数，是内核为每个进程维护的「打开文件表」的索引。每次 open 成功返回一个 fd（从最小未使用的整数开始分配）。\n程序启动时默认打开三个：fd 0 = stdin（标准输入）、fd 1 = stdout（标准输出）、fd 2 = stderr（标准错误）。所以第一次 open 返回 fd 3。\nfd 是进程级资源，默认上限 1024（可调）。标准 I/O 的 FILE* 内部就是封装了一个 fd。`,
    tags: ["文件描述符", "fd", "标准流", "内核文件表"],
  },
  // ── L2 理解 ──
  {
    id: "krc-ui-2",
    chapter: "krc-unix-interface",
    level: 2,
    question: `\`read(fd, buf, n)\` 返回值有哪些可能？为什么返回值小于 n 不一定是错误？`,
    answer:
      `返回值三种情况：① > 0：实际读取的字节数 ② = 0：到达文件末尾（EOF）③ = -1：发生错误（errno 设置具体原因）。\n返回值 < n 的原因：① 到达文件末尾，剩余不足 n 字节 ② 从终端读取时遇到换行符就返回（行模式） ③ 从管道/网络套接字读取时，对方只发了部分数据 ④ 被信号中断（EINTR）。\n所以循环读取必须检查返回值累加，不能假设一次 read 就读满 n 字节。这是低级 I/O 比标准 I/O 麻烦的原因之一：fread 会自动循环直到读满或 EOF。`,
    tags: ["read", "返回值", "EOF", "部分读取", "系统调用"],
  },
  // ── L3 应用 ──
  {
    id: "krc-ui-3",
    chapter: "krc-unix-interface",
    level: 3,
    question: `用低级 I/O 实现「把文件 src.txt 的内容复制到 dst.txt」，写出关键代码，并说明每一步的返回值检查。`,
    answer:
      `\`\`\`c\nint in = open(\"src.txt\", O_RDONLY);\nif (in < 0) { perror(\"open src\"); exit(1); }\nint out = open(\"dst.txt\", O_WRONLY | O_CREAT | O_TRUNC, 0644);\nif (out < 0) { perror(\"open dst\"); exit(1); }\nchar buf[4096];\nssize_t n;\nwhile ((n = read(in, buf, sizeof(buf))) > 0) {\n    ssize_t w = write(out, buf, n);\n    if (w != n) { perror(\"write\"); exit(1); }\n}\nif (n < 0) { perror(\"read\"); exit(1); }\nclose(in);\nclose(out);\n\`\`\`\n关键检查：① open 返回值 < 0 = 失败 ② read 返回 0 = EOF 退出循环，< 0 = 错误 ③ write 返回值 != n = 部分写入（磁盘满等），需处理。注意 write 也可能只写一部分，严谨写法要循环写。`,
    tags: ["open", "read", "write", "close", "文件复制", "错误处理"],
  },
  // ── L4 综合 ──
  {
    id: "krc-ui-4",
    chapter: "krc-unix-interface",
    level: 4,
    question: `K&R 第 8 章用 \`fopen\`/\`fread\` 实现 fopen，即「在低级 I/O 之上构建标准 I/O」。分析 FILE* 结构体需要包含哪些核心字段，以及 fopen 相比直接用 open 有哪些优势。`,
    answer:
      `FILE* 核心字段：① 文件描述符 fd（底层 open 返回的整数）② 缓冲区指针及大小（用户态缓冲区，减少 read/write 系统调用）③ 缓冲区当前位置和有效数据长度 ④ 错误标志和 EOF 标志 ⑤ 缓冲模式（全缓冲/行缓冲/无缓冲）⑥ 文件位置偏移（部分实现委托给内核 lseek）。\nfopen 优势：① 缓冲——攒一批数据再调用 read/write，系统调用有上下文切换开销，批量处理远快于逐字节 ② 格式化——fprintf/fscanf 封装了格式解析，低级 I/O 只能读写原始字节 ③ 错误处理——ferror/feof 统一接口 ④ 跨平台——FILE* 抽象了不同 OS 的底层差异。\nK&R 展示这个实现是为了说明：标准库不是魔法，它就是在系统调用之上加了一层缓冲和格式化。理解了 fd 就能理解 FILE* 的底层行为。`,
    tags: ["FILE*", "fopen", "fd", "缓冲", "K&R经典", "标准I/O实现", "综合"],
  },
];

export default krcUnixInterfaceQuestions;
