import type { ReviewQuestion } from "./types";

export const lopFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "lop-final-review-1",
    chapter: "lop-final-review",
    level: 3,
    question: "一台新装的 Ubuntu 服务器，从零到上线 Web 服务，列出关键步骤和对应命令。",
    answer:
      "①创建运维用户：`useradd -m -s /bin/bash deploy && usermod -aG sudo deploy`；②配置 SSH 密钥登录，禁用 root 密码登录（编辑 /etc/ssh/sshd_config）；③更新系统：`apt update && apt upgrade`；④安装服务：`apt install nginx`；⑤配置网络（如需固定IP）：编辑 `/etc/netplan/01-net.yaml`，`netplan apply`；⑥配置防火墙：`ufw allow 22/tcp && ufw allow 80/tcp && ufw enable`（默认拒绝，只开 SSH 和 HTTP）；⑦启动服务并自启：`systemctl enable --now nginx`；⑧编写自动化脚本（日志轮转、备份）。每一步都对应书中一个章节的知识。",
    tags: ["运维全链", "上线流程"],
  },
  {
    id: "lop-final-review-2",
    chapter: "lop-final-review",
    level: 3,
    question: "权限系统贯穿全书：从文件权限到用户管理到 sudo，它们如何协作保障安全？",
    answer:
      "三层安全防线协作：①文件权限（rwx/UGO/ACL）——控制「谁能读写执行哪些文件」，是第一道门。每个文件有属主(UID)和属组(GID)，内核比对进程的 UID/GID 决定访问权。②用户管理（UID/组）——控制「系统里有谁」，通过 useradd 创建用户、usermod 管理组成员身份。把用户分到不同组，配合文件属组实现组级权限控制。③sudo 提权——控制「谁能临时获得 root 权限」，遵循最小权限原则：平时以普通用户操作，需要时 sudo 提权，且 sudoers 可限制能执行的命令。三层协作：文件权限做基础隔离，用户/组做身份分组，sudo 做提权审计，共同实现「每个用户只能访问其该访问的资源」。",
    tags: ["安全", "权限系统"],
  },
  {
    id: "lop-final-review-3",
    chapter: "lop-final-review",
    level: 4,
    question: "服务起不来，你如何用全书知识系统排查？列出排查链路。",
    answer:
      "排查链路：①`systemctl status nginx` 看状态和错误摘要——是 failed 还是 inactive？退出码是多少？②`journalctl -u nginx -n 50` 看详细日志——常见错误：配置文件语法错（回到命令行基础：检查配置文件内容）、端口被占（`ss -tlnp | grep 80`）、权限不足（文件权限：检查 nginx 进程用户能否读取配置和 webroot）。③如果服务起来了但访问不了——网络配置：`ip addr` 确认 IP、`ip route` 确认路由；防火墙：`ufw status` 确认端口是否放行（`ufw allow 80`）。④如果是自启没生效——systemd：`systemctl is-enabled nginx` 确认是否 enable。⑤如果定时任务没跑——Shell 脚本：`crontab -l` 查看计划任务，手动执行脚本看是否报错（`set -x` 调试）。全书八章知识形成完整排查链。",
    tags: ["排查", "运维全链"],
  },
  {
    id: "lop-final-review-4",
    chapter: "lop-final-review",
    level: 4,
    question: "为什么说「自动化是运维的终极目标」？Shell 脚本和 systemd 在自动化中各扮演什么角色？",
    answer:
      "运维自动化的核心价值：①一致性——脚本每次执行相同步骤，避免人工操作的随意性和遗忘；②可重复——新机器一键部署，不依赖个人记忆；③可审计——脚本和 Unit 文件可版本控制，变更可追溯。Shell 脚本的角色是「一次性/定时任务自动化」——备份、日志清理、批量配置，配合 crontab 定时执行。systemd 的角色是「长期运行服务管理」——保证服务持续运行、异常自动重启（Restart=on-failure）、开机自启、依赖排序。两者互补：systemd 管理需要持续运行的服务（nginx/mysql），Shell 脚本+crontab 管理周期性维护任务（备份/清理/监控）。更进一步可引入 Ansible 做多机批量自动化，但底层仍然是 Shell 命令的编排。",
    tags: ["自动化", "工程思维"],
  },
];
