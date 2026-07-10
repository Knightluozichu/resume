import type { ReviewQuestion } from "./types";

/** 文件操作 复习题 */
export const popFileOpsQuestions: ReviewQuestion[] = [
  {
    id: "pop-file-ops-1",
    chapter: "pop-file-ops",
    level: 1,
    question: `pathlib 相对 os.path 字符串拼接有什么优势？写出用 \`/\` 拼接路径的例子。`,
    answer:
      `pathlib 的优势：\n1. 面向对象：\`Path\` 对象有方法（\`.glob\`、\`.read_text\`、\`.stat\`），操作和路径绑定，不必在 os.path 一堆函数间切换。\n2. 用 \`/\` 拼接，跨平台自动处理分隔符：\`Path('/var') / 'log' / 'app.log'\` 在 Linux/Windows 都正确，不用 \`os.path.join\` 手拼。\n3. 可读性好：\`p.with_suffix('.md')\`、\`p.parent\`、\`p.name\` 比 \`os.path.splitext\`、\`os.path.dirname\` 直观。\n\n例子：\n\`\`\`python\nfrom pathlib import Path\np = Path('/var') / 'log' / 'app.log'   # 跨平台拼接\nprint(p.parent, p.name, p.suffix)      # /var/log app.log .log\n\`\`\`\n\n现代运维脚本优先 pathlib，os.path 仅在兼容老代码时用。`,
    tags: ["pathlib", "路径拼接", "跨平台", "os.path"],
  },
  {
    id: "pop-file-ops-2",
    chapter: "pop-file-ops",
    level: 2,
    question: `\`Path.glob('*.log')\` 和 \`Path.rglob('*.log')\` 有什么区别？为什么说它们返回生成器是优点？`,
    answer:
      `区别：\`.glob('*.log')\` 只在当前目录一层查找匹配文件；\`.rglob('*.log')\` **递归**遍历所有子目录查找。等价于 \`.glob('**/*.log')\`。\n\n返回生成器是优点：\n1. 惰性求值：不一次性把所有匹配文件加载到内存，而是逐个产出。目录下有几十万个日志文件时，生成器内存恒定，list 会撑爆。\n2. 可提前终止：找到第一个满足条件的就 break，不必遍历全部。\n3. 可串联处理：\`(f.read_text() for f in Path('logs').rglob('*.log'))\` 组成惰性管道。\n\n代价：生成器只能迭代一次，需要多次遍历或随机访问要转 list。运维场景通常一次遍历处理即可，生成器更合适。`,
    tags: ["glob", "rglob", "生成器", "惰性"],
  },
  {
    id: "pop-file-ops-3",
    chapter: "pop-file-ops",
    level: 3,
    question: `请用 pathlib 写一段代码：递归找出 \`logs/\` 下所有 \`.log\` 文件，按大小排序，把超过 10MB 的文件名写入 \`big.txt\`。`,
    answer:
      `\`\`\`python\nfrom pathlib import Path\n\nlogs = Path('logs')\nbig_files = [\n    f for f in logs.rglob('*.log')\n    if f.is_file() and f.stat().st_size > 10 * 1024 * 1024\n]\nbig_files.sort(key=lambda f: f.stat().st_size, reverse=True)\n\nPath('big.txt').write_text(\n    '\\n'.join(f'{f.name}\\t{f.stat().st_size}' for f in big_files),\n    encoding='utf-8',\n)\n\`\`\`\n\n要点：\n1. \`rglob('*.log')\` 递归查找，返回 Path 生成器。\n2. \`f.is_file()\` 过滤掉目录（rglob 可能匹配同名目录）。\n3. \`f.stat().st_size\` 取字节数，与 10MB 阈值比较。\n4. \`sort(key=...)\` 按大小降序排。\n5. \`Path('big.txt').write_text(...)\` 一行写文件，自动关闭句柄、指定编码避免乱码。\n\n整段没有手拼路径、没有 open/close 样板，全是 pathlib 面向对象操作。`,
    tags: ["rglob", "stat", "排序", "write_text"],
  },
  {
    id: "pop-file-ops-4",
    chapter: "pop-file-ops",
    level: 4,
    question: `运维中常需「批量处理文件」，请对比 pathlib 方案与 shell 方案，并指出批量改名时要注意的幂等性和原子性问题。`,
    answer:
      `pathlib 方案 vs shell 方案：\n- pathlib：\`for f in dir.glob('*.txt'): f.rename(f.with_suffix('.md'))\`，跨平台、可加错误处理（try/except）、可记日志、可单测。\n- shell：\`for f in *.txt; do mv \"$f\" \"\${f%.txt}.md\"; done\`，简洁但依赖 bash 语法、Windows 不通用、错误处理弱。\n\n复杂批量（条件过滤、日志、回滚）pathlib 工程化优势明显；纯一次性简单改名 shell 更快。\n\n批量改名要注意：\n1. 幂等性：脚本重复执行不应再次改名或报错。若第一次把 \`.txt\` 改成 \`.md\`，第二次 \`glob('*.txt')\` 找不到文件不会误操作——这是幂等的。但若改名规则会「链式命中」（如把 \`a\` 改成 \`ab\`，再次运行 \`ab\`→\`abb\`），就破坏幂等，需加标记或判断已处理。\n2. 原子性：批量改名中途失败会留半成品状态。应先收集所有 (src, dst) 对、预检查（dst 不存在、有权限），再逐个 rename 并记录成功/失败，失败可回滚或生成续跑清单。关键场景先 dry-run 打印计划、人工确认后再执行。\n3. 冲突检测：两个文件改同名会互相覆盖，rename 前检查 dst 是否已存在。\n\n所以批量改名不是「一个 for 循环」——幂等、原子、可回滚才是工程化运维的批量处理。`,
    tags: ["批量改名", "pathlib vs shell", "幂等性", "原子性", "dry-run"],
  },
];
