/** 复习题库 · C 文件输入/输出（cpr-file-io）。C Primer Plus §13 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprFileIoQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "fio-1",
    chapter: "cpr-file-io",
    level: 1,
    question: "fopen 成功和失败分别返回什么？",
    answer: "成功返回指向 **FILE** 的指针 **FILE***；失败返回 **NULL**。使用前必须检查。",
    tags: ["fopen", "FILE"],
  },
  {
    id: "fio-2",
    chapter: "cpr-file-io",
    level: 1,
    question: "fclose 的作用是什么？",
    answer: "**关闭**流、**刷新**输出缓冲区、释放与文件关联的资源；之后不得再使用该 FILE*。",
    tags: ["fclose"],
  },
  {
    id: "fio-3",
    chapter: "cpr-file-io",
    level: 1,
    question: "模式字符串 \"r\" 和 \"w\" 的主要区别？",
    answer: "**\"r\"** 只读，文件须已存在。**\"w\"** 只写，不存在则创建，**存在则清空**原内容。",
    tags: ["fopen", "模式"],
  },
  {
    id: "fio-4",
    chapter: "cpr-file-io",
    level: 1,
    question: "fprintf 与 printf 的第一个参数有何不同？",
    answer: "**fprintf** 第一个参数是 **FILE***，指定写到哪个流；**printf** 默认写到 **stdout**。",
    tags: ["fprintf"],
  },
  {
    id: "fio-5",
    chapter: "cpr-file-io",
    level: 1,
    question: "二进制模式如何在 fopen 中指定？",
    answer: "在模式字母后加 **b**，如 **\"rb\"**、**\"wb\"**、**\"ab\"**；字节原样读写，无换行转换。",
    tags: ["二进制"],
  },

  // ── L2 理解 ──
  {
    id: "fio-6",
    chapter: "cpr-file-io",
    level: 2,
    question: "\"a\" 与 \"w\" 对已存在文件有何不同？",
    answer:
      "**\"w\"** 会**截断**文件从头写。**\"a\"** **不截断**，写操作定位到**文件末尾**追加。",
    tags: ["追加", "模式"],
  },
  {
    id: "fio-7",
    chapter: "cpr-file-io",
    level: 2,
    question: "为什么不应单独用 while (!feof(fp)) 控制读循环？",
    answer:
      "**feof** 在读完导致失败的一次读操作**之后**才为真，会**多循环一次**。应以 **fscanf/fgets 返回值**判断是否读到数据。",
    tags: ["feof", "循环"],
  },
  {
    id: "fio-8",
    chapter: "cpr-file-io",
    level: 2,
    question: "fgets 比 gets 安全在哪里？",
    answer:
      "**fgets** 接受**缓冲区大小**，最多读 size-1 字符并写 **\\0** 结尾，防止溢出；**gets** 无长度限制，已废弃。",
    tags: ["fgets", "安全"],
  },
  {
    id: "fio-9",
    chapter: "cpr-file-io",
    level: 2,
    question: "文本模式与二进制模式在换行处理上有何差异？",
    answer:
      "**文本模式**可能在读写时做 **\\n ↔ \\r\\n** 转换（依平台）。**二进制模式**无转换，字节与磁盘一致。",
    tags: ["文本", "二进制"],
  },
  {
    id: "fio-10",
    chapter: "cpr-file-io",
    level: 2,
    question: "stdin、stdout、stderr 与 fopen 返回的 fp 有何共同点？",
    answer: "都是 **FILE*** 类型的**流**，可用同一套 stdio 函数（如 fprintf、fgets）操作，只是预定义关联键盘/屏幕/诊断输出。",
    tags: ["流", "FILE"],
  },

  // ── L3 应用 ──
  {
    id: "fio-11",
    chapter: "cpr-file-io",
    level: 3,
    question: "要把日志追加到已有 log.txt 且不删旧内容，fopen 用什么模式？",
    answer: "**\"a\"** 或 **\"ab\"**（二进制追加用后者）。不要用 **\"w\"**，会清空文件。",
    tags: ["追加", "排错"],
  },
  {
    id: "fio-12",
    chapter: "cpr-file-io",
    level: 3,
    question: "fwrite(arr, sizeof(int), 10, fp) 各参数含义？",
    answer:
      "**arr** 内存首地址；**sizeof(int)** 每个元素字节数；**10** 元素个数；**fp** 目标流。返回成功写入的元素个数。",
    tags: ["fwrite"],
  },
  {
    id: "fio-13",
    chapter: "cpr-file-io",
    level: 3,
    question: "fseek(fp, 0L, SEEK_SET) 和 rewind(fp) 的关系？",
    answer: "二者都把当前位置移到**文件开头**。**rewind(fp)** 等价于 **fseek(fp, 0L, SEEK_SET)**。",
    tags: ["fseek", "rewind"],
  },
  {
    id: "fio-14",
    chapter: "cpr-file-io",
    level: 3,
    question: "fopen 返回 NULL 后，用 perror(\"open\") 能做什么？",
    answer: "打印自定义前缀 + 系统对 **errno** 的解释（如 No such file），帮助定位路径、权限等问题。",
    tags: ["排错", "perror"],
  },
  {
    id: "fio-15",
    chapter: "cpr-file-io",
    level: 3,
    question: "fputs 与 puts 写字符串时有何区别？",
    answer: "**fputs** 不自动添加换行；**puts** 会在字符串后追加 **\\n**。写文件行通常用 fputs 并自行 fprintf \"\\n\"。",
    tags: ["fputs"],
  },

  // ── L4 综合 ──
  {
    id: "fio-16",
    chapter: "cpr-file-io",
    level: 4,
    question: "写函数把 int 数组 int a[5] 二进制写入 data.bin，再读回到 int b[5]。",
    answer:
      "```c\nFILE *fp = fopen(\"data.bin\", \"wb\");\nfwrite(a, sizeof a[0], 5, fp);\nfclose(fp);\nfp = fopen(\"data.bin\", \"rb\");\nfread(b, sizeof b[0], 5, fp);\nfclose(fp);\n```\n两次 fopen 都要检查 NULL。",
    tags: ["综合实现", "fread"],
  },
  {
    id: "fio-17",
    chapter: "cpr-file-io",
    level: 4,
    question: "对比 fprintf+fscanf 与 fwrite+fread：各适合什么数据、有何优缺点？",
    answer:
      "**fprintf/fscanf**：人类可读、可手工编辑、跨平台文本友好；解析慢、体积大。**fwrite/fread**：紧凑快速；二进制不可读，struct 对齐/字节序可能不可移植。",
    tags: ["综合理解"],
  },
  {
    id: "fio-18",
    chapter: "cpr-file-io",
    level: 4,
    question: "说明含多个 return 的函数如何确保 fopen 后一定 fclose。",
    answer:
      "模式一：每个 return 前 **fclose**。模式二：单一出口 + **goto cleanup**，cleanup 里 if (fp) fclose(fp)。模式三：把读写封装进子函数，子函数内成对关闭。",
    tags: ["资源管理", "最佳实践"],
  },
];

export default cprFileIoQuestions;
