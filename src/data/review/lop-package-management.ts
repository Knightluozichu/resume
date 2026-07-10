import type { ReviewQuestion } from "./types";

export const lopPackageManagementQuestions: ReviewQuestion[] = [
  {
    id: "lop-package-management-1",
    chapter: "lop-package-management",
    level: 2,
    question: `apt 和 dpkg 的关系是什么？为什么要分两层？`,
    answer:
      `dpkg 是 Debian 系的底层包管理工具，负责单个 .deb 包的安装、卸载和查询，但不处理依赖关系。apt 是高层前端，在 dpkg 之上增加了仓库管理、依赖解析、自动下载等功能。分两层的原因：dpkg 足够轻量可靠，直接操作包文件；apt 处理复杂的依赖树和远程仓库，需要网络和索引。典型流程：\`apt install nginx\` → apt 从仓库索引解析依赖 → 下载所有需要的 .deb → 调用 dpkg 逐个解包安装。用 \`dpkg -l\` 查看已装包，\`apt list --installed\` 也行但信息更全。`,
    tags: ["apt", "dpkg"],
  },
  {
    id: "lop-package-management-2",
    chapter: "lop-package-management",
    level: 2,
    question: `\`apt update\` 和 \`apt upgrade\` 的区别是什么？为什么先 update 再 upgrade？`,
    answer:
      `\`apt update\` 不安装任何软件，只从配置的仓库服务器下载最新的包索引列表（Packages/Sources 文件），更新本地「哪些包有新版本」的信息。\`apt upgrade\` 根据本地索引实际下载并安装所有已安装包的可用更新。必须先 update 再 upgrade：如果本地索引过期，upgrade 不知道有新版本可升级。相当于先刷新目录（update）再按目录购物（upgrade）。\`apt install nginx\` 也依赖最新索引来解析依赖，所以安装前也应先 update。`,
    tags: ["apt", "更新"],
  },
  {
    id: "lop-package-management-3",
    chapter: "lop-package-management",
    level: 3,
    question: `Debian 系（apt/dpkg）和 RHEL 系（dnf/yum/rpm）的包管理有什么对应关系？`,
    answer:
      `高层前端：apt（Debian/Ubuntu）↔ dnf/yum（RHEL/CentOS/Fedora）。底层工具：dpkg ↔ rpm。包格式：.deb ↔ .rpm。仓库配置：\`/etc/apt/sources.list\` ↔ \`/etc/yum.repos.d/\`。常用命令对应：apt update ↔ dnf check-update；apt install ↔ dnf install；apt upgrade ↔ dnf upgrade；apt remove ↔ dnf remove；apt search ↔ dnf search。yum 是 dnf 的前身（CentOS 7 及以前），dnf 是 yum 的改进版（Fedora 18+ / RHEL 8+），命令语法基本兼容。`,
    tags: ["apt", "dnf", "对比"],
  },
  {
    id: "lop-package-management-4",
    chapter: "lop-package-management",
    level: 3,
    question: `包管理器的依赖解析是如何工作的？什么是「依赖地狱」？`,
    answer:
      `依赖解析流程：①读取本地仓库索引，获取每个包的 Depends/Requires 字段；②构建依赖树——安装包 A 需要先安装其依赖 B、C，B 又依赖 D……；③拓扑排序确定安装顺序；④从仓库下载所有需要的包；⑤按顺序解包安装。依赖地狱（dependency hell）：多个包要求不同版本的同一依赖，产生冲突无法同时满足。现代包管理器通过版本范围约束、仓库优先级、模块化（modularity）等机制缓解。\`apt -f install\` 可修复损坏的依赖关系，\`dnf repoquery --requires nginx\` 查看包的依赖列表。`,
    tags: ["依赖解析", "依赖地狱"],
  },
];
