import type { ReviewQuestion } from "./types";

/** 监控与告警 复习题 */
export const popMonitoringAlertingQuestions: ReviewQuestion[] = [
  {
    id: "pop-monitoring-alerting-1",
    chapter: "pop-monitoring-alerting",
    level: 1,
    question: `psutil 库可以采集哪四类系统指标？对应的核心方法是什么？`,
    answer: `四类指标：1) CPU——cpu_percent() 获取使用率；2) 内存——virtual_memory() 获取总量/可用/使用率；3) 磁盘——disk_usage() 获取分区使用情况，disk_io_counters() 获取读写速率；4) 网络——net_io_counters() 获取收发字节数和包数。这四类覆盖了运维监控的核心维度。`,
    tags: ["psutil", "指标采集", "基础"],
  },
  {
    id: "pop-monitoring-alerting-2",
    chapter: "pop-monitoring-alerting",
    level: 2,
    question: `告警系统为什么要支持抑制和聚合？不支持的后果是什么？`,
    answer: `抑制是指同一告警在恢复前不重复发送；聚合是指同一故障引发的多条告警合并为一条。不支持抑制和聚合的后果是告警风暴——一个核心交换机故障会引发上百台服务器的网络不通告警同时涌出，淹没关键信息，导致运维人员告警疲劳、遗漏真正重要的故障。好的告警系统必须能去重、合并、按严重度分级，确保运维收到的是可处理的信息而非噪声。`,
    tags: ["告警抑制", "告警聚合", "告警风暴", "生产实践"],
  },
  {
    id: "pop-monitoring-alerting-3",
    chapter: "pop-monitoring-alerting",
    level: 3,
    question: `请用 psutil 编写一个监控 CPU 和内存使用率并在超阈值时触发告警的函数。`,
    answer: `\`\`\`python\nimport psutil, time\n\ndef monitor(threshold_cpu=80, threshold_mem=85, interval=5):\n    while True:\n        cpu = psutil.cpu_percent(interval=1)\n        mem = psutil.virtual_memory().percent\n        alerts = []\n        if cpu > threshold_cpu:\n            alerts.append(f\"CPU {cpu}% > {threshold_cpu}%\")\n        if mem > threshold_mem:\n            alerts.append(f\"内存 {mem}% > {threshold_mem}%\")\n        if alerts:\n            msg = \" | \".join(alerts)\n            send_alert(msg)  # 发送邮件/钉钉\n            print(f\"[告警] {msg}\")\n        else:\n            print(f\"[正常] CPU {cpu}% | 内存 {mem}%\")\n        time.sleep(interval)\n\ndef send_alert(msg):\n    # 实际调用邮件/钉钉/短信 API\n    pass\n\`\`\`\n\n要点：cpu_percent(interval=1) 阻塞 1 秒采样保证准确；双阈值分别判定；告警消息聚合后发送，避免频繁打扰。`,
    tags: ["psutil", "阈值监控", "代码编写"],
  },
  {
    id: "pop-monitoring-alerting-4",
    chapter: "pop-monitoring-alerting",
    level: 4,
    question: `设计一个生产级监控告警系统，需要包含哪些核心组件？如何避免告警疲劳？`,
    answer: `核心组件：1) 采集层——psutil/Telegraf/Prometheus exporter 定时采集指标；2) 存储层——时序数据库（InfluxDB/Prometheus TSDB）存储历史数据；3) 规则引擎——定义阈值规则、异常检测算法、复合条件；4) 告警层——抑制（同一告警恢复前不重复）、聚合（同源告警合并）、分级（P0-P3 严重度）、升级（超时未处理升级通知）；5) 通知层——多渠道（邮件/短信/钉钉/电话）按级别路由；6) 看板层——Grafana 可视化大盘和告警历史。避免告警疲劳的关键：严格设阈值（基于历史基线而非拍脑袋）、必须支持抑制和聚合、P0/P1 电话通知 P2/P3 仅记录、定期清理无效告警规则、引入告信评分（alert fatigue score）持续优化。`,
    tags: ["监控系统", "告警疲劳", "架构设计", "综合"],
  },
];
