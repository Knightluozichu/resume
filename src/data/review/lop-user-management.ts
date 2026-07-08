import type { ReviewQuestion } from "./types";

export const lopUserManagementQuestions: ReviewQuestion[] = [
  {
    id: "lop-user-management-1",
    chapter: "lop-user-management",
    level: 2,
    question: "UID 和 GID 分别是什么？root 用户的 UID 是多少？",
    answer:
      "UID（User ID）是用户的唯一数字标识，GID（Group ID）是组的唯一数字标识。root（超级用户）的 UID=0，拥有系统最高权限，不受权限检查约束。普通用户 UID 通常从 1000 开始（Ubuntu/CentOS）。系统用户（如 www-data、nginx）UID 在 1-999 之间，用于运行服务。用户信息存在 `/etc/passwd`（用户名:UID:GID:家目录:Shell），密码哈希存在 `/etc/shadow`（仅 root 可读），组信息存在 `/etc/group`。",
    tags: ["UID", "GID"],
  },
  {
    id: "lop-user-management-2",
    chapter: "lop-user-management",
    level: 2,
    question: "主组和附加组的区别是什么？`usermod -aG docker bob` 做了什么？",
    answer:
      "主组（primary group）：用户创建时自动分配的组，每个用户有且只有一个主组，通常与用户名同名。附加组（supplementary group）：用户可加入多个附加组，用于获取额外权限。`usermod -aG docker bob` 把用户 bob 加入 docker 附加组——`-a` 表示追加（不覆盖已有附加组），`-G` 指定附加组。加入后 bob 可无需 sudo 运行 docker 命令（docker.sock 通常属 docker 组）。关键：如果不加 `-a`，`-G` 会覆盖用户的所有附加组，导致丢失已有组成员身份。",
    tags: ["组", "usermod"],
  },
  {
    id: "lop-user-management-3",
    chapter: "lop-user-management",
    level: 3,
    question: "sudo 相比直接用 root 登录有什么优势？sudo 提权流程是怎样的？",
    answer:
      "sudo 的优势：①最小权限原则——平时以普通用户操作，只在需要时提权；②审计追踪——sudo 日志记录谁在何时执行了什么命令（/var/log/auth.log）；③不共享 root 密码——每个用户用自己的密码；④可精细控制——sudoers 可限制用户只能执行特定命令。提权流程：普通用户执行 `sudo command` → 系统查 `/etc/sudoers` 验证该用户是否有提权权限 → 验证用户密码（默认 15 分钟内免密）→ 以 root 身份执行命令。配置用 `visudo` 编辑（语法检查防锁死）。",
    tags: ["sudo", "最小权限"],
  },
  {
    id: "lop-user-management-4",
    chapter: "lop-user-management",
    level: 3,
    question: "`useradd -m -s /bin/bash bob` 中各参数的含义是什么？不加 `-m` 会怎样？",
    answer:
      "`-m` 创建用户家目录 `/home/bob`（不加 `-m` 则不创建家目录，用户登录后无 `~` 可用，很多程序依赖家目录存配置文件会出错）。`-s /bin/bash` 指定默认登录 Shell 为 bash（不加则可能默认 `/bin/sh` 或 `/sbin/nologin`，影响交互体验）。`bob` 是用户名。完整含义：创建用户 bob，建立家目录，设置 bash 为登录 Shell。最佳实践还应 `-G sudo` 加入 sudo 组赋予提权权限。`userdel -r bob` 删除用户时 `-r` 一并删除家目录。",
    tags: ["useradd", "家目录"],
  },
];
