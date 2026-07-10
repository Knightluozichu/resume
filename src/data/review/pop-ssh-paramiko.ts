import type { ReviewQuestion } from "./types";

/** SSH 与 Paramiko 复习题 */
export const popSshParamikoQuestions: ReviewQuestion[] = [
  {
    id: "pop-ssh-paramiko-1",
    chapter: "pop-ssh-paramiko",
    level: 1,
    question: `Paramiko 中 SSHClient 和 Transport 两种连接方式的区别和适用场景是什么？`,
    answer: `SSHClient 是高层封装，提供 connect、exec_command 等便捷方法，内置策略自动处理 host key 验证，适合大多数日常运维场景。Transport 是底层通道，手动管理通道和会话，灵活但代码繁琐，适合需要多通道复用、端口转发或 SFTP 等高级操作的场景。一般优先用 SSHClient，需要精细控制时再降级到 Transport。`,
    tags: ["SSHClient", "Transport", "基础"],
  },
  {
    id: "pop-ssh-paramiko-2",
    chapter: "pop-ssh-paramiko",
    level: 2,
    question: `使用 Paramiko 连接时，AutoAddPolicy 设置缺失策略会有什么安全风险？生产环境应如何正确处理 host key？`,
    answer: `AutoAddPolicy 会自动接受未知主机密钥并写入 known_hosts，存在中间人攻击风险——攻击者可伪装目标主机窃取凭据。生产环境应预先收集目标主机的真实 host key 写入 known_hosts 文件，连接时用 RejectPolicy 拒绝未知密钥；或用 ssh-keyscan 批量采集后人工核对再固化。密钥变更需走变更流程，禁止图省事用 AutoAddPolicy。`,
    tags: ["host key", "安全", "AutoAddPolicy", "生产实践"],
  },
  {
    id: "pop-ssh-paramiko-3",
    chapter: "pop-ssh-paramiko",
    level: 3,
    question: `请用 Paramiko 编写一个批量在多台服务器上执行命令并收集结果的功能，要求支持密钥认证和超时控制。`,
    answer: `\`\`\`python\nimport paramiko\n\ndef batch_exec(hosts, command, key_path, timeout=10):\n    client = paramiko.SSHClient()\n    client.set_missing_host_key_policy(paramiko.RejectPolicy())\n    results = {}\n    for host in hosts:\n        try:\n            client.connect(\n                hostname=host,\n                username='ops',\n                key_filename=key_path,\n                timeout=timeout\n            )\n            stdin, stdout, stderr = client.exec_command(command, timeout=timeout)\n            results[host] = {\n                'exit': stdout.channel.recv_exit_status(),\n                'out': stdout.read().decode(),\n                'err': stderr.read().decode()\n            }\n        except Exception as e:\n            results[host] = {'error': str(e)}\n        finally:\n            client.close()\n    return results\n\`\`\`\n\n要点：用密钥而非密码认证，设置 connect 和 exec 双超时，每次用完关闭连接，异常捕获保证一台失败不影响其余。`,
    tags: ["批量执行", "密钥认证", "代码编写"],
  },
  {
    id: "pop-ssh-paramiko-4",
    chapter: "pop-ssh-paramiko",
    level: 4,
    question: `需要在 500 台服务器上并行执行巡检命令，如何设计 SSH 并发方案以兼顾速度、稳定性和安全？`,
    answer: `需要分层设计：1) 并发模型用 ThreadPoolExecutor（Paramiko 是阻塞 IO，线程池即可）或 asyncio+asyncssh，控制并发数 20-50 避免本机资源耗尽；2) 连接管理每任务独立 SSHClient，用完即关，避免长连接状态混乱，或用连接池复用；3) 安全上密钥认证优先，host key 预采集固化，禁止 AutoAddPolicy；4) 稳定性上设连接和执行双超时，单机失败捕获异常不阻塞，结果分级标记成功/失败/超时；5) 结果聚合后分批写入，支持断点续跑。核心权衡是并发越高速度越快但服务器 sshd 连接数压力越大，需根据目标 sshd MaxStartups 调参。`,
    tags: ["并发", "连接池", "架构设计", "综合"],
  },
];
