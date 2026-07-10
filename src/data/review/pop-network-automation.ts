import type { ReviewQuestion } from "./types";

/** 网络自动化 复习题 */
export const popNetworkAutomationQuestions: ReviewQuestion[] = [
  {
    id: "pop-network-automation-1",
    chapter: "pop-network-automation",
    level: 1,
    question: `requests 库中 GET 和 POST 请求的核心区别是什么？`,
    answer: `GET 用于从服务器获取资源，参数拼接在 URL 查询串中，幂等且可缓存；POST 用于向服务器提交数据，参数放在请求体中，非幂等且不可缓存。在运维场景中，GET 多用于查询接口状态，POST 多用于触发操作或提交配置。`,
    tags: ["requests", "HTTP方法", "基础"],
  },
  {
    id: "pop-network-automation-2",
    chapter: "pop-network-automation",
    level: 2,
    question: `为什么生产环境的 requests 调用必须设置 timeout 参数？不设置会有什么后果？`,
    answer: `不设置 timeout 时，若目标服务器无响应，requests 会无限期阻塞，导致脚本挂死、占用连接资源、阻塞后续任务队列。设置 timeout 后，超时即抛出 ConnectTimeout 或 ReadTimeout 异常，可被捕获重试，保证脚本可控可恢复。生产环境应同时关注连接超时和读取超时两个值。`,
    tags: ["timeout", "健壮性", "生产实践"],
  },
  {
    id: "pop-network-automation-3",
    chapter: "pop-network-automation",
    level: 3,
    question: `请编写一个带超时、重试和会话复用的 requests 封装函数，用于批量调用 API。`,
    answer: `使用 requests.Session 复用 TCP 连接，配合 try-except 捕获异常后重试。示例：\n\n\`\`\`python\nimport requests, time\nfrom requests.adapters import HTTPAdapter\n\ndef make_session(retries=3):\n    s = requests.Session()\n    s.mount('http://', HTTPAdapter(max_retries=retries))\n    s.mount('https://', HTTPAdapter(max_retries=retries))\n    return s\n\ndef fetch(session, url, timeout=5):\n    for attempt in range(3):\n        try:\n            resp = session.get(url, timeout=timeout)\n            resp.raise_for_status()\n            return resp.json()\n        except requests.RequestException as e:\n            if attempt == 2:\n                raise\n            time.sleep(2 ** attempt)\n\`\`\`\n\nSession 复用连接池减少握手开销，重试用指数退避避免雪崩，timeout 防止挂死。`,
    tags: ["Session", "重试", "指数退避", "代码编写"],
  },
  {
    id: "pop-network-automation-4",
    chapter: "pop-network-automation",
    level: 4,
    question: `在批量监控 200 台设备 API 的场景中，如何设计 requests 调用策略以兼顾速度、稳定性和服务器压力？`,
    answer: `需要综合并发控制、连接复用、限流和容错四方面：1) 用 ThreadPoolExecutor 或 asyncio 控制并发数（如 10-20 并发），避免单线程串行太慢；2) 用 requests.Session 复用连接池，减少 TCP 握手；3) 设置合理 timeout（连接 3s/读取 10s）和指数退避重试，避免个别慢节点拖垮整体；4) 加入限流（信号量或令牌桶）控制 QPS，防止打爆目标服务器；5) 结果分批落盘，单个失败不阻塞其余。核心权衡是并发越高速度越快但服务器压力和失败率也越高，需根据目标承载能力调参。`,
    tags: ["并发", "限流", "架构设计", "综合"],
  },
];
