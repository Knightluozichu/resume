import type { ReviewQuestion } from "./types";

export const lopShellScriptingQuestions: ReviewQuestion[] = [
  {
    id: "lop-shell-scripting-1",
    chapter: "lop-shell-scripting",
    level: 1,
    question: `Shell 脚本第一行 \`#!/bin/bash\` 的作用是什么？不加会怎样？`,
    answer:
      `\`#!/bin/bash\` 是 Shebang 行，告诉系统用 \`/bin/bash\` 解释器执行该脚本。不加 Shebang 的后果：如果用 \`./script.sh\` 执行，系统默认用当前 Shell 解释，如果当前是 zsh 或 sh，语法不完全兼容 bash 可能出错；如果用 \`bash script.sh\` 执行则不受影响（因为已显式指定解释器）。最佳实践：脚本第一行始终写 \`#!/bin/bash\`，并用 \`chmod +x script.sh\` 赋予执行权限后用 \`./script.sh\` 执行。Shebang 通用形式 \`#!/usr/bin/env bash\` 更可移植（不硬编码 bash 路径）。`,
    tags: ["Shebang", "基础"],
  },
  {
    id: "lop-shell-scripting-2",
    chapter: "lop-shell-scripting",
    level: 2,
    question: `Shell 变量赋值时等号两边为什么不能有空格？\`$var\` 和 \`"$var"\` 有什么区别？`,
    answer:
      `等号两边不能有空格是因为 Shell 语法把空格作为词分隔符：\`name="Linux"\` 是赋值，\`name = "Linux"\` 会被解析为执行命令 \`name\` 并传参数 \`=\` 和 \`"Linux"\`。\`$var\` 不加引号时，变量值如果含空格会被拆分成多个词（如 \`path=/a b c; ls $path\` 会 ls 三个目录 a/b/c）。\`"$var"\` 加双引号保持值完整性，空格不被拆分。单引号 \`'$var'\` 则完全不展开变量（字面量）。最佳实践：引用变量始终加双引号 \`"$var"\`，防止空格和通配符问题。命令替换 \`$(command)\` 也应加引号 \`"$(command)"\`。`,
    tags: ["变量", "引号"],
  },
  {
    id: "lop-shell-scripting-3",
    chapter: "lop-shell-scripting",
    level: 3,
    question: `写一个 Shell 脚本：批量备份当前目录所有 .txt 文件到 /backup 目录，并输出每个文件名。`,
    answer:
      `\`\`\`bash\n#!/bin/bash\nset -e  # 遇错即停\nBACKUP_DIR=\"/backup\"\nmkdir -p \"$BACKUP_DIR\"  # 确保备份目录存在\nfor f in *.txt; do\n  if [ -f \"$f\" ]; then\n    cp \"$f\" \"$BACKUP_DIR/\"\n    echo \"backed up: $f\"\n  fi\ndone\necho \"backup complete\"\n\`\`\`\n关键点：\`set -e\` 遇到错误立即退出防止隐患；\`mkdir -p\` 幂等创建目录；\`for f in *.txt\` 通配符匹配所有 .txt 文件；\`[ -f \"$f\" ]\` 确保是普通文件（防止无匹配时 \`*.txt\` 作为字面量）；\`"$f"\` 加引号防止文件名含空格。`,
    tags: ["脚本", "for循环"],
  },
  {
    id: "lop-shell-scripting-4",
    chapter: "lop-shell-scripting",
    level: 4,
    question: `Shell 脚本中 \`set -e\` 的作用是什么？为什么生产脚本应该加它？`,
    answer:
      `\`set -e\`（errexit）使脚本在任一命令返回非零退出码时立即终止执行。不加 \`set -e\` 的脚本即使中间命令失败也会继续执行——例如 \`cd /nonexistent; rm -rf *\` 如果 cd 失败，rm 会在当前目录执行造成灾难。加 \`set -e\` 后 cd 失败即停，不会执行后续 rm。生产脚本应加 \`set -e\` 的原因：①快速失败——问题暴露在出错点而非被后续命令掩盖；②安全——防止在错误状态下执行危险操作；③可调试——配合 \`set -x\`（打印每条执行的命令）可追踪执行路径。进阶用法 \`set -euo pipefail\`：\`-u\` 引用未定义变量报错，\`-o pipefail\` 管道中任一环节失败则整个管道失败（默认只看最后一个命令）。`,
    tags: ["set -e", "安全"],
  },
];
