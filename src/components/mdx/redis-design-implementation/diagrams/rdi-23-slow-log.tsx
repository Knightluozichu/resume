import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-23-slow-log",
  "unitTitle": "第23章 慢查询日志",
  "concepts": [
    "慢查询记录的保存",
    "慢查询日志的阅览和删除",
    "添加新日志",
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
    "慢查询记录的保存",
    "慢查询日志的阅览和删除",
    "添加新日志",
    "恢复不变量",
    "结构字段",
    "控制流"
  ],
  "model": {
    "studio": "慢查询阈值与环形记录台",
    "axisA": {
      "label": "执行耗时",
      "levels": [
        "低于阈值",
        "等于阈值",
        "高于阈值"
      ]
    },
    "axisB": {
      "label": "日志容量",
      "levels": [
        "未满",
        "达到上限",
        "清空"
      ]
    },
    "fault": "把网络等待计入命令执行耗时，或无限保留参数导致内存与敏感信息风险",
    "command": "rg 'slowlogPushEntryIfNeeded|slowlogCommand' src/slowlog.c",
    "practiceMode": "diagnosis",
    "outcomes": {
      "signal": "慢查询阈值与环形记录台一致率",
      "risk": "日志容量分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "耗时口径排除网络I/O并按配置阈值记录，日志长度有界，ID与参数可追溯",
    "task": "交付慢日志结构图、阈值实验、截断与清理验证、延迟监控对照，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi23SlowLogStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi23SlowLogTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi23SlowLogEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
