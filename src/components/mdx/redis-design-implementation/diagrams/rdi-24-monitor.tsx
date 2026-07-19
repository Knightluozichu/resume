import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-24-monitor",
  "unitTitle": "第24章 监视器",
  "concepts": [
    "成为监视器",
    "向监视器发送命令信息",
    "重点回顾"
  ],
  "stages": [
    "冻结3.0基线",
    "定位结构入口",
    "执行单变量变更",
    "注入边界故障",
    "恢复并对账"
  ],
  "focuses": [
    "成为监视器",
    "向监视器发送命令信息",
    "运行反例",
    "恢复不变量",
    "结构字段",
    "控制流"
  ],
  "model": {
    "studio": "MONITOR传播与开销台",
    "axisA": {
      "label": "监视客户端",
      "levels": [
        "无",
        "单个",
        "多个慢客户端"
      ]
    },
    "axisB": {
      "label": "命令敏感度",
      "levels": [
        "普通",
        "大流量",
        "含秘密"
      ]
    },
    "fault": "把MONITOR当成低成本审计日志，忽略扇出、慢消费者与敏感参数暴露",
    "command": "rg 'monitorCommand|replicationFeedMonitors' src/server.c src/replication.c",
    "practiceMode": "diagnosis",
    "outcomes": {
      "signal": "MONITOR传播与开销台一致率",
      "risk": "命令敏感度分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "进入监视状态后收到规定命令信息，断开后清理关系，观测不会被误当低成本生产审计",
    "task": "交付监视器状态图、命令格式样本、开销压测与敏感数据评审，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi24MonitorStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi24MonitorTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi24MonitorEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
