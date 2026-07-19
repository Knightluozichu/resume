import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-15-replication",
  "unitTitle": "第15章 复制",
  "concepts": [
    "旧版复制功能的实现",
    "旧版复制功能的缺陷",
    "新版复制功能的实现",
    "部分重同步的实现",
    "PSYNC命令的实现",
    "复制的实现",
    "心跳检测",
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
    "旧版复制功能的实现",
    "旧版复制功能的缺陷",
    "新版复制功能的实现",
    "部分重同步的实现",
    "PSYNC命令的实现",
    "复制的实现"
  ],
  "model": {
    "studio": "PSYNC偏移与积压缓冲台",
    "axisA": {
      "label": "断线跨度",
      "levels": [
        "未断线",
        "仍在backlog",
        "超出backlog"
      ]
    },
    "axisB": {
      "label": "身份条件",
      "levels": [
        "runid相同",
        "runid变化",
        "未知偏移"
      ]
    },
    "fault": "在runid或偏移不连续时仍做部分重同步，使副本静默分叉",
    "command": "rg 'syncCommand|masterTryPartialResynchronization|replicationFeedSlaves' src/replication.c",
    "practiceMode": "diagnosis",
    "outcomes": {
      "signal": "PSYNC偏移与积压缓冲台一致率",
      "risk": "身份条件分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "主从偏移与数据一致，断线重连正确选择全量或部分同步，命令传播顺序不分叉",
    "task": "交付复制状态机、偏移与backlog实验、断线重连轨迹和主从对账，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi15ReplicationStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi15ReplicationTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi15ReplicationEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
