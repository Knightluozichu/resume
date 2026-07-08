import type { ReviewQuestion } from "./types";

/** 进程管理 复习题 */
export const popProcessMgmtQuestions: ReviewQuestion[] = [
  {
    id: "pop-process-mgmt-1",
    chapter: "pop-process-mgmt",
    level: 1,
    question: "`subprocess.run` 和 `subprocess.Popen` 的核心区别是什么？各适合什么场景？",
    answer:
      "核心区别：`subprocess.run` 是**同步阻塞**的便捷封装——调用后等子进程跑完，返回 `CompletedProcess`（含 stdout/stderr/returncode）。`subprocess.Popen` 是**异步**的底层类——创建子进程后立即返回 Popen 对象，父进程可继续执行，需要时通过 `.communicate()`、`.poll()`、读写管道与子进程交互。\n\n场景：\n- run：一次性调用拿结果，如 `run(['df', '-h'], capture_output=True, text=True, check=True)`。\n- Popen：需要流式读取输出（如 `tail -f`）、与子进程交互（发送输入）、并行启动多个子进程、长时间运行的后台进程。\n\n现代运维优先用 run（更安全简洁），需要异步/管道/交互时才下沉到 Popen。",
    tags: ["subprocess.run", "Popen", "同步异步", "场景"],
  },
  {
    id: "pop-process-mgmt-2",
    chapter: "pop-process-mgmt",
    level: 2,
    question: "为什么不要用 `shell=True` 拼字符串命令？它有什么安全风险？正确做法是什么？",
    answer:
      "`shell=True` 会让参数经 shell 解析，等于把字符串交给 `/bin/sh -c` 执行。安全风险是**命令注入**：若命令含用户输入，攻击者可用 `;`、`$()`、反引号等注入任意命令。例如 `subprocess.run(f\"ping {host}\", shell=True)`，host 传入 `; rm -rf /` 就会执行删除。\n\n即使无恶意输入，shell 解析也会因空格、特殊字符（如文件名含空格或 `$`）误解析。\n\n正确做法：传**列表**参数、`shell=False`（默认）：`subprocess.run(['ping', host])`，每个参数作为独立 argv，不经 shell 解析，注入字符也只是被当作普通字符串。只有确实需要 shell 管道、通配符、变量展开且输入可信时才用 shell=True，并严格校验输入。运维脚本默认 shell=False 是安全基线。",
    tags: ["shell=True", "命令注入", "安全", "列表参数"],
  },
  {
    id: "pop-process-mgmt-3",
    chapter: "pop-process-mgmt",
    level: 3,
    question: "请用 psutil 写一段代码：找出占用 CPU 超过 50% 的进程，打印 PID、名称、CPU 占用。",
    answer:
      "```python\nimport psutil\n\nfor p in psutil.process_iter(['pid', 'name', 'cpu_percent']):\n    cpu = p.info['cpu_percent']\n    if cpu is not None and cpu > 50:\n        print(f\"PID={p.info['pid']}  {p.info['name']}  CPU={cpu:.1f}%\")\n```\n\n要点：\n1. `process_iter(['pid','name','cpu_percent'])` 一次取出需要的字段，比逐个 `p.pid`/`p.name()` 高效（减少系统调用）。\n2. `cpu_percent` 首次调用返回 0.0（需两次采样间隔才有意义）。生产中通常先 `psutil.cpu_percent(interval=None)` 预热，或循环采样两次取第二次值。\n3. 要判断 `cpu is not None`——某些进程可能在迭代中退出，info 字段为 None。\n4. 更严谨的做法是采样两次：第一次遍历初始化 cpu_percent，sleep 一小段，第二次遍历读真实值。\n\npsutil 跨平台（Linux/macOS/Windows），是运维排查「谁在吃 CPU」的标准工具。",
    tags: ["psutil", "process_iter", "cpu_percent", "排查"],
  },
  {
    id: "pop-process-mgmt-4",
    chapter: "pop-process-mgmt",
    level: 4,
    question: "运维中要「启动一个长驻后台服务进程并管理它」，subprocess + Popen 能做到吗？它的局限是什么？生产环境应该用什么？",
    answer:
      "subprocess.Popen 能启动后台进程（`Popen([...], stdout=log, stderr=log, start_new_session=True)`），让父进程退出后子进程继续。配合 `.poll()` 检查存活、`.terminate()`/`.kill()` 停止，可实现简单守护。\n\n但 Popen 管理长驻服务有严重局限：\n1. 无自动重启：进程崩了不会自己起来，要自己写轮询+重启逻辑。\n2. 无开机自启：机器重启后服务不会自动拉起。\n3. 无依赖编排：多个服务的启动顺序、依赖关系要手动管理。\n4. 日志管理弱：要自己处理日志轮转。\n5. 无资源限制：不能方便地限制 CPU/内存。\n6. 父子关系脆弱：父进程被杀可能带走子进程（除非完全 detach）。\n\n生产环境应该用专业进程管理工具：\n- systemd：Linux 标准的 init 系统，写 unit 文件定义服务，支持自动重启、开机自启、依赖编排、资源限制（cgroups）、日志（journald）。这是生产 Linux 服务的首选。\n- supervisord：跨平台的进程管理器，配置简单，支持自动重启和日志，适合非 systemd 环境或容器内多进程。\n- 容器编排（Kubernetes）：云原生场景用 Pod + Deployment + 探针 + 自动重启。\n\n所以 subprocess/Popen 适合「短任务」和「编排其他工具」，不适合直接当生产服务的守护者。运维的工程化思维是：用专业工具做专业的事，Python 脚本负责生成配置、调用 systemctl、轮询健康检查，而非自己 reimplement 进程管理器。",
    tags: ["Popen", "长驻服务", "systemd", "supervisord", "生产环境"],
  },
];
