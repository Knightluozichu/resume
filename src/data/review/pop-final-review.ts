import type { ReviewQuestion } from "./types";

/** Python 自动化运维 总复习 复习题 */
export const popFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "pop-final-review-1",
    chapter: "pop-final-review",
    level: 1,
    question: `Python 自动化运维全书四大板块的顺序和依赖关系是什么？`,
    answer: `四大板块：运维基础（学习地图、Python 运维思维）→ 系统管理（文件操作、进程管理）→ 网络自动化（HTTP 调用、SSH 运维、网页抓取）→ 高级运维（监控告警、配置管理）。依赖关系是递进的：运维基础建立 Python 工程化思维和标准库认知；系统管理是本地自动化能力（文件+进程）；网络自动化扩展到远程操作（HTTP+SSH+爬虫）；高级运维综合前三者构建可观测和可管理的完整体系。跳过任一层，上层能力会悬空。`,
    tags: ["四大板块", "学习路径", "基础"],
  },
  {
    id: "pop-final-review-2",
    chapter: "pop-final-review",
    level: 2,
    question: `自动化运维的四个核心素质「批量、健壮、安全、可观测」分别指什么？为什么缺一不可？`,
    answer: `批量——能同时处理成百上千台节点，而非逐台手动；健壮——超时重试、异常隔离、幂等执行，不会因个别故障崩溃；安全——密钥认证、host key 验证、最小权限，不引入安全风险；可观测——监控指标、日志记录、告警通知，知道发生了什么。缺一批量则效率低无意义；缺健壮则一崩全崩不可用；缺安全则自动化变成自动化攻击入口；缺可观测则故障黑箱无法排障。四者构成自动化运维的完整能力闭环。`,
    tags: ["核心素质", "能力闭环", "理解"],
  },
  {
    id: "pop-final-review-3",
    chapter: "pop-final-review",
    level: 3,
    question: `请设计一个综合巡检脚本，涵盖文件检查、进程状态、网络连通性和资源监控四个维度。`,
    answer: `\`\`\`python\nimport psutil, subprocess, requests, paramiko\nfrom pathlib import Path\nfrom datetime import datetime\n\ndef full_inspect(host, key_path):\n    report = {\"host\": host, \"time\": datetime.now().isoformat()}\n    client = paramiko.SSHClient()\n    client.set_missing_host_key_policy(paramiko.RejectPolicy())\n    try:\n        client.connect(host, username='ops', key_filename=key_path, timeout=10)\n        # 1. 文件检查：磁盘使用率\n        _, stdout, _ = client.exec_command('df -h /', timeout=10)\n        report['disk'] = stdout.read().decode()\n        # 2. 进程状态：关键服务存活\n        _, stdout, _ = client.exec_command('systemctl is-active nginx', timeout=10)\n        report['nginx'] = stdout.read().decode().strip()\n        # 3. 网络连通性：本地 API\n        _, stdout, _ = client.exec_command('curl -s -o /dev/null -w \"%{http_code}\" http://localhost:8080/health', timeout=10)\n        report['api_status'] = stdout.read().decode().strip()\n        # 4. 资源监控：CPU+内存\n        _, stdout, _ = client.exec_command('top -bn1 | head -5', timeout=10)\n        report['resources'] = stdout.read().decode()\n        report['status'] = 'ok'\n    except Exception as e:\n        report['status'] = 'fail'\n        report['error'] = str(e)\n    finally:\n        client.close()\n    return report\n\n# 批量执行\nhosts = [f'node{i}' for i in range(100)]\nfrom concurrent.futures import ThreadPoolExecutor\nwith ThreadPoolExecutor(max_workers=20) as pool:\n    reports = list(pool.map(lambda h: full_inspect(h, '~/.ssh/id_ed25519'), hosts))\n\n# 汇总\nok = [r for r in reports if r['status'] == 'ok']\nfail = [r for r in reports if r['status'] == 'fail']\nprint(f'巡检完成: {len(ok)} 正常, {len(fail)} 异常')\n\`\`\`\n\n综合了 Paramiko SSH（远程执行）、subprocess（本地命令）、requests（HTTP 检查）、psutil（资源监控），四维度覆盖。`,
    tags: ["综合巡检", "Paramiko", "代码编写", "综合应用"],
  },
  {
    id: "pop-final-review-4",
    chapter: "pop-final-review",
    level: 4,
    question: `如果让你为一家 500 人公司的 IT 基础设施搭建自动化运维体系，你会如何分阶段推进？`,
    answer: `分三阶段推进：**阶段一（1-2月）基础自动化**——先用 Python 脚本解决最痛的重复工作：批量 SSH 巡检（Paramiko）、日志集中收集（rsyslog+脚本）、基础监控（psutil+告警脚本）。目标是把人肉操作降到最低，建立自动化文化。**阶段二（3-4月）体系化**——引入配置管理（Ansible 或自研 YAML+Jinja2 模板）实现配置版本化和幂等分发；搭建监控系统（Prometheus+Grafana）替代脚本监控，支持指标存储和可视化大盘；建立 CI/CD 管道自动化部署。**阶段三（5-6月）智能化**——引入告警智能聚合和根因分析减少告警疲劳；用爬虫+API 对接工单系统实现自动派单；建设运维知识库和 SOP 文档化。核心原则：先解决最痛问题建立信心，再体系化建设，最后智能化提升——不要一上来就上大而全的平台，先让团队尝到自动化的甜头。`,
    tags: ["运维体系", "分阶段建设", "架构设计", "综合"],
  },
];
