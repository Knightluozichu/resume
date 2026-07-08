import type { ReviewQuestion } from "./types";

export const lopLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "lop-learning-map-1",
    chapter: "lop-learning-map",
    level: 2,
    question: "全书四阶段递进结构是什么？为什么是这个顺序？",
    answer:
      "命令行与权限（命令行基础 + 文件权限）→ 用户与包管理（用户管理 + 包管理）→ 网络与安全（网络配置 + 防火墙）→ 服务与自动化（systemd + Shell脚本）→ 总复习。顺序由依赖关系决定：先会操作终端、理解权限，才能管理用户和安装软件；软件装好后要联网，联网后要防护；服务跑起来后用脚本自动化运维。先「能操作」，再「能管理」，然后「能联网防护」，接着「能自动化」，最后「能贯通」。",
    tags: ["架构", "学习路径"],
  },
  {
    id: "lop-learning-map-2",
    chapter: "lop-learning-map",
    level: 2,
    question: "Linux 运维的核心视角是什么？Shell 在其中扮演什么角色？",
    answer:
      "Linux 运维的核心视角是「通过命令行高效管理系统资源」。Shell 是用户与内核之间的「命令翻译器」：用户键入命令，Shell 做词法分析、拆分命令和参数、在 PATH 中查找可执行文件，然后调内核系统调用执行，最后把结果回显到终端。运维工程师通过 Shell 完成文件管理、用户管理、网络配置、服务管理、自动化脚本等全部工作。区别于图形界面：命令行可批量、可脚本化、可远程（SSH），是服务器运维的标准方式。",
    tags: ["架构", "Shell"],
  },
  {
    id: "lop-learning-map-3",
    chapter: "lop-learning-map",
    level: 3,
    question: "用「一台服务器从装好到上线」描述全书主线，列出八个步骤。",
    answer:
      "①命令行基础（第1章）——终端操作 ls/cd/grep/管道重定向；②文件权限（第2章）——rwx/UGO/chmod/setfacl 控制访问；③用户管理（第3章）——useradd 创建用户、sudo 提权、SSH 密钥登录；④包管理（第4章）——apt install nginx 安装服务软件；⑤网络配置（第5章）——ip addr/netplan 配置 IP 和网关；⑥防火墙安全（第6章）——ufw allow 22 放行 SSH、deny 3306 拒绝 MySQL 外网；⑦systemd 服务（第7章）——systemctl enable nginx 开机自启；⑧Shell 脚本（第8章）——自动化备份、日志清理、监控。八步串成从裸机到生产级运维的完整链路。",
    tags: ["架构", "运维全链"],
  },
  {
    id: "lop-learning-map-4",
    chapter: "lop-learning-map",
    level: 4,
    question: "会敲命令和懂 Linux 运维有什么本质区别？举例说明。",
    answer:
      "会敲命令是「照着教程执行」——知道 `ls` 列文件、`apt install` 装软件。懂运维是「能解释系统为什么这样工作并排查问题」：为什么 `chmod 755` 比 `777` 更安全（最小权限原则）、为什么 sudo 比 su root 更好（审计+最小权限）、为什么 netplan 比 ifconfig 更可靠（声明式配置+持久化）、为什么 ufw 默认拒绝比默认放行更安全（白名单优先）、为什么 systemd 比 init 脚本更高效（并行启动+依赖管理）、为什么 Shell 脚本要加 `set -e`（遇错即停防止隐患）。只会敲命令的人遇到服务起不来只能重启；懂运维的人能看 systemctl status、查 journalctl 日志、用 strace 排查进程。区分标志：能否解释「系统为什么这样设计」而非只是「能操作它」。",
    tags: ["架构", "工程思维"],
  },
];
