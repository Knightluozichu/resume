import type { ReviewQuestion } from "./types";

export const lopCommandLineQuestions: ReviewQuestion[] = [
  {
    id: "lop-command-line-1",
    chapter: "lop-command-line",
    level: 1,
    question: `Linux 命令的基本结构是什么？以 \`ls -la /home\` 为例拆解。`,
    answer:
      `命令结构为 \`command [options] [arguments]\`。以 \`ls -la /home\` 为例：\`ls\` 是命令名（列出目录内容）；\`-la\` 是选项（\`-l\` 长格式，\`-a\` 显示隐藏文件，可合并写）；\`/home\` 是参数（目标路径）。短选项用单减号 \`-\`，长选项用双减号 \`--\`（如 \`--all\`）。选项改变命令行为，参数指定操作对象。`,
    tags: ["命令行", "基础"],
  },
  {
    id: "lop-command-line-2",
    chapter: "lop-command-line",
    level: 2,
    question: `Shell 如何找到用户输入的命令？PATH 环境变量的作用是什么？`,
    answer:
      `用户键入命令后，Shell 按顺序在 PATH 环境变量列出的目录中查找同名的可执行文件。PATH 是冒号分隔的目录列表，如 \`/usr/local/bin:/usr/bin:/bin\`。Shell 从左到右搜索，找到第一个匹配就执行。如果所有目录都没有该命令，报 \`command not found\`。用 \`which command\` 可查看命令的完整路径，\`echo $PATH\` 查看当前搜索路径。自定义脚本要放进 PATH 目录或用 \`./script\` 指定路径执行。`,
    tags: ["Shell", "PATH"],
  },
  {
    id: "lop-command-line-3",
    chapter: "lop-command-line",
    level: 3,
    question: `管道（pipe）和重定向（redirect）的区别是什么？各举一个例子。`,
    answer:
      `管道 \`|\` 把前一个命令的 stdout 连接到后一个命令的 stdin，用于命令间传递数据。例如 \`ls -la | grep '.txt'\` 把 ls 的输出传给 grep 过滤。重定向改变数据流向：\`>\` 把 stdout 写入文件（覆盖），\`>>\` 追加，\`<\` 从文件读入 stdin，\`2>\` 重定向 stderr。例如 \`ls > files.txt\` 把列出的文件名写入文件，\`sort < unsorted.txt\` 从文件读入排序。核心区别：管道是命令→命令，重定向是命令↔文件。`,
    tags: ["管道", "重定向"],
  },
  {
    id: "lop-command-line-4",
    chapter: "lop-command-line",
    level: 3,
    question: `进程的三个标准流是什么？它们如何与终端交互？`,
    answer:
      `每个进程有三个标准流：stdin（标准输入，fd 0）默认连终端键盘，stdout（标准输出，fd 1）默认连终端屏幕，stderr（标准错误，fd 2）默认也连终端屏幕。用户键入的数据经 stdin 进入进程；进程的正常输出经 stdout 显示在终端；错误信息经 stderr 显示在终端（与 stdout 分开，可独立重定向）。例如 \`command > out.log 2> err.log\` 把正常输出和错误分别写入不同文件。管道只传递 stdout，\`2>&1\` 可把 stderr 合并到 stdout 一起传递。`,
    tags: ["标准流", "fd"],
  },
];
