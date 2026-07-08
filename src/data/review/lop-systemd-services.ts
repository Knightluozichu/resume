import type { ReviewQuestion } from "./types";

export const lopSystemdServicesQuestions: ReviewQuestion[] = [
  {
    id: "lop-systemd-services-1",
    chapter: "lop-systemd-services",
    level: 2,
    question: "systemd 相比传统 SysV init 脚本有什么优势？",
    answer:
      "systemd 的优势：①并行启动——init 脚本串行执行，systemd 分析依赖关系后并行启动无依赖的服务，大幅缩短开机时间；②声明式配置——Unit 文件描述「服务怎么启动」，比 init 脚本的命令式逻辑更清晰；③统一管理——service、socket、mount、timer 等都用 systemctl 统一管理；④按需启动——socket activation 让服务在首次请求时才启动，节省资源；⑤日志统一——journalctl 集中收集所有服务日志，可按服务名/时间过滤；⑥依赖管理——Unit 文件声明 After/Requires，systemd 自动排序。systemd 是 PID 1，是现代 Linux 的标准 init 系统。",
    tags: ["systemd", "init"],
  },
  {
    id: "lop-systemd-services-2",
    chapter: "lop-systemd-services",
    level: 2,
    question: "`systemctl enable` 和 `systemctl start` 的区别是什么？",
    answer:
      "`systemctl start nginx` 立即启动 nginx 服务（当前生效，重启后不自动启动）。`systemctl enable nginx` 设置开机自启——创建符号链接从 `/etc/systemd/system/multi-user.target.wants/nginx.service` 指向 Unit 文件，使系统启动到 multi-user.target 时自动启动该服务。`enable` 不启动服务，`start` 不设置自启。要既启动又自启用 `systemctl enable --now nginx`。对应地 `disable` 取消自启（不停止），`stop` 停止服务（不自启取消）。典型流程：装完服务 → `enable --now` → 以后开机自动运行。",
    tags: ["systemctl", "enable"],
  },
  {
    id: "lop-systemd-services-3",
    chapter: "lop-systemd-services",
    level: 3,
    question: "一个 .service Unit 文件有哪些关键段？ExecStart 和 WantedBy 分别是什么意思？",
    answer:
      "Unit 文件三个关键段：①[Unit]——描述信息和依赖关系，`Description=` 是人类可读名称，`After=network.target` 表示在网络启动后才启动本服务。②[Service]——服务启动参数，`ExecStart=/usr/sbin/nginx` 指定启动命令，`ExecStop=` 停止命令，`Restart=on-failure` 异常退出时自动重启，`Type=forking/simple` 进程类型。③[Install]——安装信息，`WantedBy=multi-user.target` 表示 `enable` 时在 multi-user 目标下创建自启链接。`systemctl daemon-reload` 在修改 Unit 文件后重新加载配置。",
    tags: ["Unit文件", "ExecStart"],
  },
  {
    id: "lop-systemd-services-4",
    chapter: "lop-systemd-services",
    level: 3,
    question: "服务启动失败如何排查？列出关键命令。",
    answer:
      "排查步骤：①`systemctl status nginx`——查看服务当前状态、最近几行日志、退出码和主进程 PID。②`journalctl -u nginx -n 50`——查看该服务最近 50 条详细日志（`-u` 按服务名过滤，`-n` 行数，`-f` 跟踪实时日志）。③`journalctl -u nginx --since '10 min ago'`——按时间范围查看。④`systemctl daemon-reload`——如果刚修改了 Unit 文件，先重新加载 systemd 配置。⑤`systemctl restart nginx`——修改配置后重启服务。⑥检查 Unit 文件语法：`systemd-analyze verify /path/to/nginx.service`。⑦检查端口冲突：`ss -tlnp | grep 80` 看端口是否被占。常见原因：配置文件语法错误、端口被占、权限不足、依赖服务未启动。",
    tags: ["排查", "journalctl"],
  },
];
