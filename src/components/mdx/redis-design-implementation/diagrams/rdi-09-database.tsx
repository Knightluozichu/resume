import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-09-database",
  "unitTitle": "第9章 数据库",
  "concepts": [
    "服务器中的数据库",
    "切换数据库",
    "数据库键空间",
    "设置键的生存时间或过期时间",
    "过期键删除策略",
    "Redis的过期键删除策略",
    "AOF、RDB和复制功能对过期键的处理",
    "数据库通知",
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
    "服务器中的数据库",
    "切换数据库",
    "数据库键空间",
    "设置键的生存时间或过期时间",
    "过期键删除策略",
    "Redis的过期键删除策略"
  ],
  "model": {
    "studio": "键空间与TTL时钟台",
    "axisA": {
      "label": "过期时点",
      "levels": [
        "未到期",
        "刚到期",
        "长期过期"
      ]
    },
    "axisB": {
      "label": "触发路径",
      "levels": [
        "访问惰性删除",
        "周期采样",
        "持久化或复制"
      ]
    },
    "fault": "只从主键字典删除过期键，或让从节点自行产生与主节点不同的过期决议",
    "command": "rg 'expireIfNeeded|activeExpireCycle|propagateExpire' src/db.c src/server.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "键空间与TTL时钟台一致率",
      "risk": "触发路径分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "键空间和过期字典引用同一键，过期语义在命令、RDB、AOF和复制路径中一致",
    "task": "交付键空间图、TTL时间线、过期采样实验、持久化与复制对照，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi09DatabaseStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi09DatabaseTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi09DatabaseEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
