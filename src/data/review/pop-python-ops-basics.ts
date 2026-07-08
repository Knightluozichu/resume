import type { ReviewQuestion } from "./types";

/** 运维基础 复习题 */
export const popPythonOpsBasicsQuestions: ReviewQuestion[] = [
  {
    id: "pop-python-ops-basics-1",
    chapter: "pop-python-ops-basics",
    level: 1,
    question: "Python 运维能力栈分哪三层？每层各举两个代表模块。",
    answer:
      "三层及代表：\n1. 标准库层（打底）：`os`/`sys`（环境与系统）、`pathlib`（路径）、`subprocess`（进程）、`shutil`（文件树）。无需安装、跨平台。\n2. 第三方库层（扩展）：`psutil`（系统指标）、`requests`（HTTP）、`paramiko`（SSH）、`BeautifulSoup`（解析）。覆盖运维全链路。\n3. 工程化层（收口）：`venv`/`pip`（依赖管理）、`logging`（日志）、`pytest`（测试）、配置管理。保证可重复、可测试、可维护。\n\n选型口诀：能用标准库就不引第三方，复杂场景上第三方库，用工程化层保证可维护。",
    tags: ["能力栈", "标准库", "第三方库", "工程化"],
  },
  {
    id: "pop-python-ops-basics-2",
    chapter: "pop-python-ops-basics",
    level: 2,
    question: "为什么运维脚本要用虚拟环境（venv）？直接用系统 Python 装依赖有什么风险？",
    answer:
      "虚拟环境为每个项目隔离独立的 Python 解释器和依赖目录，让不同项目的依赖互不干扰。\n\n直接用系统 Python 装依赖的风险：\n1. 版本冲突：项目 A 要 requests 2.20、项目 B 要 2.28，全局只能装一个版本，无法共存。\n2. 污染系统：系统包管理器（apt/yum）依赖系统 Python，全局装包可能破坏系统工具。\n3. 不可复现：换台机器不知道该装哪些包、什么版本，脚本跑不起来。\n4. 权限问题：全局装包常需 sudo，污染 site-packages 难清理。\n\nvenv 解决：每个项目一个独立环境，用 `requirements.txt` 或 `pyproject.toml` 锁定版本，`pip install -r` 一键复现。这是运维脚本「可重复」的第一块基石。",
    tags: ["venv", "虚拟环境", "依赖隔离", "可复现"],
  },
  {
    id: "pop-python-ops-basics-3",
    chapter: "pop-python-ops-basics",
    level: 3,
    question: "请用 `subprocess.run` 执行 `df -h` 并捕获输出，说明 `capture_output`、`text`、`check` 三个参数的作用。",
    answer:
      "```python\nimport subprocess\nresult = subprocess.run(\n    ['df', '-h'],\n    capture_output=True,   # 捕获 stdout/stderr 到结果对象\n    text=True,             # 输出以文本（str）而非字节返回\n    check=True,            # 返回码非 0 时抛 CalledProcessError\n)\nprint(result.stdout)     # df -h 的输出文本\nprint(result.returncode) # 0\n```\n\n各参数作用：\n1. `capture_output=True`：等价于 `stdout=PIPE, stderr=PIPE`，把子进程的输出捕获到 `result.stdout`/`result.stderr`，而非直接打到父进程终端。\n2. `text=True`（旧名 `universal_newlines`）：输出按文本解码为 str，否则是 bytes。运维脚本处理输出（按行 split）时用 str 更方便。\n3. `check=True`：子进程返回码非 0 时自动抛 `CalledProcessError`，便于在 try/except 里统一处理命令失败。不加 check 则需手动判断 `result.returncode`。\n\n这是运维脚本调用系统命令的现代标准写法——比旧的 `os.system`/`subprocess.Popen` 更安全（不经过 shell 解析，避免注入）、更易捕获输出和处理错误。",
    tags: ["subprocess", "capture_output", "text", "check"],
  },
  {
    id: "pop-python-ops-basics-4",
    chapter: "pop-python-ops-basics",
    level: 4,
    question: "运维脚本要长期可靠运行，工程化层应建立哪三件套？请综合说明它们如何支撑「可重复、可监控、可维护」。",
    answer:
      "三件套：venv/pip 依赖管理、logging 日志、pytest 测试。\n\n1. venv/pip 依赖管理支撑「可重复」：用 venv 隔离环境，`requirements.txt`/`pyproject.toml` 锁定版本，`pip install -r` 一键复现。换机器、新人接手都能跑起来，不依赖「我机器上能跑」。配合 `pip freeze` 或锁文件保证版本一致。\n2. logging 日志支撑「可监控」：用标准库 logging 替代 print，按级别（DEBUG/INFO/WARNING/ERROR）输出，可同时写文件和终端、带时间戳。脚本执行有迹可循，出问题能从日志复盘，而非「不知道发生了什么」。可接入告警（ERROR 级触发通知）。logging 是代码化运维「可观测」的基础。\n3. pytest 测试支撑「可维护」：对运维函数（解析输出、判断阈值、生成配置）写单元测试，用 mock 隔离 subprocess 和网络。改代码时 CI 回归，防止「修一个 bug 引入三个」。测试也是活文档，说明函数预期行为。\n\n三者协同：venv 保证环境一致让测试有意义，日志记录测试和执行过程，测试验证日志逻辑正确。没有三件套，运维脚本就是「一次性命令拼盘」；有了它们，运维才从手艺变成工程。这是本书工程化层的核心，贯穿后续所有章节。",
    tags: ["工程化三件套", "venv", "logging", "pytest", "可维护"],
  },
];
