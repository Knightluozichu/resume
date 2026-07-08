import type { ReviewQuestion } from "./types";

/** 配置管理 复习题 */
export const popConfigMgmtQuestions: ReviewQuestion[] = [
  {
    id: "pop-config-mgmt-1",
    chapter: "pop-config-mgmt",
    level: 1,
    question: "声明式配置和命令式配置的核心区别是什么？",
    answer: "声明式配置描述「想要什么状态」（如 YAML 声明 port: 8080, workers: 4），系统自动计算如何达到该状态；命令式配置描述「怎么做什么」（如先停服务、改配置、启服务）。声明式的优势是幂等——多次执行结果一致，安全可重入；状态可审计——配置文件即期望状态的完整描述。命令式则依赖执行顺序，不可重入，状态隐式分散在脚本中。",
    tags: ["声明式", "命令式", "基础"],
  },
  {
    id: "pop-config-mgmt-2",
    chapter: "pop-config-mgmt",
    level: 2,
    question: "什么是配置管理的幂等性？为什么它是生产环境的关键要求？",
    answer: "幂等性指同一配置操作执行一次和执行多次的结果完全一致——不会因为重复执行而产生副作用。例如设置 port=8080，执行 100 次结果仍是 8080。幂等性是生产环境关键要求的原因：1) 安全重试——网络抖动导致部署中断后可重跑，不会产生不一致；2) 定时收敛——可定期执行纠正配置漂移（人工误改）；3) 并行安全——多节点同时配置不会互相干扰。非幂等操作（如 append）重复执行会导致配置累积错误。",
    tags: ["幂等性", "配置漂移", "生产实践"],
  },
  {
    id: "pop-config-mgmt-3",
    chapter: "pop-config-mgmt",
    level: 3,
    question: "请用 Python + Jinja2 编写一个根据 YAML 配置渲染 nginx 配置文件并分发到多节点的功能。",
    answer: "```python\nimport yaml\nfrom jinja2 import Template\nfrom concurrent.futures import ThreadPoolExecutor\n\ndef render_config(yaml_path, template_str):\n    with open(yaml_path) as f:\n        config = yaml.safe_load(f)\n    template = Template(template_str)\n    return template.render(**config)\n\ndef deploy_to_node(node, rendered_config, remote_path):\n    import paramiko\n    client = paramiko.SSHClient()\n    client.set_missing_host_key_policy(paramiko.RejectPolicy())\n    try:\n        client.connect(node, username='ops', key_filename='~/.ssh/id_ed25519')\n        sftp = client.open_sftp()\n        with sftp.file(remote_path, 'w') as f:\n            f.write(rendered_config)\n        client.exec_command(f'nginx -t && systemctl reload nginx')\n        return node, True, None\n    except Exception as e:\n        return node, False, str(e)\n    finally:\n        client.close()\n\n# 使用\ntemplate = \"worker_processes {{ workers }};\\nlisten {{ port }};\\n\"\nrendered = render_config('site.yaml', template)\nnodes = ['node-01', 'node-02', 'node-03']\nwith ThreadPoolExecutor(max_workers=10) as pool:\n    results = list(pool.map(\n        lambda n: deploy_to_node(n, rendered, '/etc/nginx/nginx.conf'),\n        nodes\n    ))\n```\n\n要点：Jinja2 渲染分离配置与模板，SFTP 上传文件，nginx -t 校验后才 reload，并发分发。",
    tags: ["Jinja2", "SFTP", "模板渲染", "代码编写"],
  },
  {
    id: "pop-config-mgmt-4",
    chapter: "pop-config-mgmt",
    level: 4,
    question: "在大规模集群（1000+节点）中推行配置管理，如何解决配置漂移、版本回滚和灰度发布三个问题？",
    answer: "1) **配置漂移**：定期巡检（cron 跑配置比对脚本），发现实际状态与期望状态不一致即标记并自动收敛；用 etcd/Consul 做配置中心，禁止人工直接改节点文件；所有变更走配置管理流程留审计日志。2) **版本回滚**：配置文件用 Git 版本管理，每次部署记录 commit hash；回滚即 checkout 旧版本重新渲染分发；保留最近 N 个版本配置快照，一键回滚。3) **灰度发布**：按批次分阶段部署（1% → 10% → 50% → 100%），每批观察监控指标无异常再推进；用标签/分组控制灰度范围；失败自动暂停并回滚已部署节点。核心是配置即代码（GitOps 思想）+ 声明式幂等 + 分批渐进，三者结合才能在大规模下安全推行。",
    tags: ["配置漂移", "版本回滚", "灰度发布", "架构设计", "综合"],
  },
];
